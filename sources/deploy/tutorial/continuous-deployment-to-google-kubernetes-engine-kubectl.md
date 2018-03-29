page_main_title: CD to GKE using kubectl
main_section: Tutorial
sub_section: GKE
sub_sub_section: kubectl
page_title: Continuous Deployment to Google Kubernetes Engine using kubectl
page_description: Automated deployments to Google Kubernetes Engine using kubectl commands
page_keywords: Deploy docker containers, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, Google Kubernetes Enginer, GKE

# Continuous Deployment to Google Kubernetes Engine using `kubectl`
This tutorial explains how to continuously deploy a Docker container to Google Kubernetes Engine using native `kubectl` commands

## Introduction

Here is why you should be using Shippable. 

## Pre-requisites
To jump into this tutorial, you will need to familiarize yourself with the platform as well some of the pre-requisite usecases

### Platform Features
* [Google Cloud integration](/platform/integration/gcloudKey)
* [image resource](/platform/workflow/resource/image)
* [gitRepo resource](/platform/workflow/resource/gitrepo)
* [cliConfig resource](/platform/workflow/resource/cliconfig)
* [cluster resource](/platform/workflow/resource/cluster)
* [runSh job](/platform/workflow/job/runsh)

### Usecases
* [Build and Push a Docker Image to Docker Hub](/ci/tutorial/build-push-image-to-docker-hub)
* Defining Jobs and Resources using `shippable.yml`
* Sharing information between Jobs
* Using specific version of Google CLI
* Creating parametrized Jobs
* Logging into your deployment cluster using CLI
* Using templates inside your Job

### Kubernetes Concepts
* [kubectl](https://kubernetes.io/docs/reference/kubectl/overview/)
* [Deployment](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.10/#deployment-v1-apps)
* [Services](https://kubernetes.io/docs/concepts/services-networking/service/)

## Step by Step Instructions
The following sections explain the process of setting up a workflow to continuously deploy an image to Google Kubernetes Engine using `kubectl`.

**Source code is available at [devops-recipes/app_be](https://github.com/devops-recipes/cd_gke_kubectl)**

**Complete YML is at [devops-recipes/cd_gke_kubectl/shippable.yml](https://raw.githubusercontent.com/devops-recipes/cd_gke_kubectl/master/shippable.yml)**

###1. Add [Google Cloud Platform](/platform/integration/gcloudKey) Integration
To be able to interact with GCP, we need to add an integration named `drship_gcp`. Set permissions to allow the Org that contains your `shippable.yml` repo to be able to use it. Alternatively, you could just permit the repo to have access rather than the whole Org. 

<img src="/images/tutorial/continuous-deployment-to-google-kubernetes-engine-kubectl-fig1.png" alt="Add Integration">

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step

[Working with Integrations](platform/tutorial/howto-crud-integration) tutorial has more details.

###2. Add [Docker Registry]((/platform/integration/dockerRegistryLogin)) Integration
To be able to push and pull images from Docker Hub, we need to add an integration named `drship_dockerhub`. Set permissions to allow the Org that contains your `Dockerfile` repo to be able to use it. Alternatively, you could just permit the repo to have access rather than the whole Org. 

<img src="/images/tutorial/build-push-docker-image-fig1.png" alt="Add Integration">

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step

###3. Add [Github](/platform/integration/github) Integration
To add assembly lines, Shippable needs source control credentials. We do not automatically use the users token as in the case of CI. Hence this needs to added to the account. Add and integration named `drship_github` add permissions to the Org that containes the repo with the yml file.

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step

###4. Add Assembly Line to Org
`shippable.yml` is a declarative way to configure your assembly line config that enables CD. Add this file to the repo where you want to store your configurations. For this e.g. it is `https://github.com/devops-recipes/cd_gke_kubectl`. Add assembly lines to Org which contains this repo

<img src="/images/tutorial/continuous-deployment-to-google-kubernetes-engine-kubectl-fig2.png" alt="Add Assembly Lines">

[Adding Assemnly Lines](deploy/configuration/) has more detailed instructions

###5. Add [image](/platform/workflow/resource/image) resource that is deployed
The image that you want to deploy to GKE should be available as a resource to the assembly line. Add the following yml to your `shippable.yml`.

```
resources:
  - name: app_be_img
    type: image
    integration: drship_dockerhub # replace with your integration name
    versionTemplate:
      sourceName: "devopsrecipes/app_be" # replace with your Hub URL
      isPull: false
      versionName: latest
```
`sourceName` contains the location of the image and the `versionName` contains the tag. `isPull` is used to configure whether the image is automatically pulled or not.

> Note: If you have already done [Build and Push a Docker Image to Docker Hub](/ci/tutorial/build-push-image-to-docker-hub), then skip this step as you already have the image resource defined.

###6. Add [gitRepo](/platform/workflow/resource/gitrepo) that has your Kubernetes config files
Your Kubernetes config files will be placed in a repo and the assembly line needs to know where to find them. Add this yml to `resources` section of `shippable.yml`. For this e.g. the configs are present in `https://github.com/devops-recipes/cd_gke_kubectl`

```
  - name: config_repo
    type: gitRepo
    integration: "dr_github"
    versionTemplate:
      sourceName: "devops-recipes/cd_gke_kubectl"
      branch: master
```
The actual config files are [here](https://github.com/devops-recipes/cd_gke_kubectl/tree/master/specs)

###7. Add [cliConfig](/platform/workflow/resource/cliconfig) that authenticates you to GCP
To be able to interact with Google Cloud Platform, you need to authenticate your `gcloud` cli. Shippable does this for you automatically when a `cliConfig` resource is present in a job. Create a `gcp_cli` resource by adding the following to the `resources` section of `shippable.yml`.

```
  - name: gcp_cli
    type: cliConfig
    integration: "dr_gcp"
    versionTemplate:
      region: "us-west1-a"
```

###8. Add [cluster](/platform/workflow/resource/cluster) that represents GKE cluster
Assembly line needs to know the location of the Kube cluster. Create `gke_cluster` resource to provide that info by adding to the `resources` section of `shippable.yml`.

```
  - name: gke_cluster
    type: cluster
    integration: "dr_gcp"
    pointer:
      sourceName: "cluster"
      region: "us-west1-a"
```

`sourceName` is the name of the GKE cluster and `region` is where the cluster is present

###9. Define a [runSh](/platform/workflow/job/runsh) job that does the deployment
A job is actually the execution unit of the assembly line. Here we are adding `deployBEAppKctl_GKE` by adding this to the `jobs` section of `shippable.yml`.

```
jobs:
  - name: deployBEAppKctl_GKE
    type: runSh
    dependencyMode: strict
    steps:
      - IN: app_be_img
      - IN: gcp_cli
        switch: off
      - IN: gke_cluster
        switch: off
      - IN: config_repo
        switch: off
      - TASK:
          name: backend_app_svc
          script:
            - pushd $(shipctl get_resource_state "config_repo")
            - cd specs
            - export BE_LABEL="kctl-be-app"
            - export BE_IMG=$(shipctl get_resource_version_key app_be_img sourceName)
            - export BE_TAG=$(shipctl get_resource_version_name app_be_img)
            - shipctl replace beDeploy.yml beSvc.yml
            - export CLUST=$(shipctl get_resource_version_key gke_cluster sourceName)
            - export CLUST_REG=$(shipctl get_resource_version_key gke_cluster region)
            - gcloud container clusters get-credentials $CLUST --zone $CLUST_REG
            - kubectl delete  -f ./beDeploy.yml 2>/dev/null || echo ""
            - kubectl delete -f ./beSvc.yml  2>/dev/null || echo ""
            - kubectl create -o json -f ./beDeploy.yml >> kube_output.json
            - kubectl create -o json -f ./beSvc.yml >> kube_output.json
            - cat kube_output.json
            - popd
    flags:
      - gke
      - cd
      - kctl
```
The above YML block does a few interesting things. 

* First, the `dependencyMode` is strict which means all the IN resources needs to be in a consistent state i.e. their version information does not have any wildcards or the jobs that produce those resources are not in a failed or cancelled state. The following resources are being used as INs `app_be_img`, `gcp_cli`, `gke_cluster` and `config_repo`. `switch: off` means that if a new version is posted to the resource, it does not trigger downstream dependency jobs. In our case, only changes to `app_be_img` will automatically trigger `deployBEAppKctl_GKE`.

* The `TASK` section defines the scripts that are going to be executed. `get_resource_state` utility get the path where the resource content is stored, in this case the clone of `config_repo` as we need the kube config files. We change the path to `specs` which is were the config files are present. These configs have wildcards in them so that we can reuse them for other deployments too. Hence we need to set those variables which is what next 3 commands are to set `$BE_LABEL`, `$BE_IMG` and `$BE_TAG`. The image information is in resource `app_be_img` and we are using Shippable utility functions `get_resource_version_key` and `get_resource_version_name` to get image name and image tag values. We then use `replace` utility to replace the wildcards in the configs. for e.g. in `beDeploy.yml`, `${BE_LABEL}` is replaced with `kctl-be-app`, `${BE_IMG}` and `${BE_TAG}` are replaced with the whatever `app_be_img` resource had in the latest version.

	```
	apiVersion: apps/v1beta1
	kind: Deployment
	metadata:
	  namespace: default
	  name: ${BE_LABEL}
	spec:
	  replicas: 1
	  template:
	    metadata:
	      labels:
	        app: ${BE_LABEL}
	    spec:
	      containers:
	      - name: ${BE_LABEL}
	        image: ${BE_IMG}:${BE_TAG}
	        ports:
	        - containerPort: 6379
	```

* Now the files are prepped with the right tag info, it is time to deploy. Since we added `gcp_cli` as an IN to the job, the platform has already authenticated the shell to gcloud and set the default region to `us-west1-a`. Now using the utility function `get_resource_version_key` we get the cluster info from `gke_cluster` and we authenticate to kube cluster. 

* Now we have an active connection to GKE, we delete the service and pod if they exist and then do a deployment. Print the log out to make sure there are no errors. 

###10. Push changes to `shippable.yml`
Commit and push all the above changes to `shippable.yml`. This should automatically trigger the sync process to add all the changes to the assembly line. Your view should look something like this. 

<img src="/images/tutorial/continuous-deployment-to-google-kubernetes-engine-kubectl-fig3.png" alt="Assembly Line view">

> Note: This assembly line is incorporating [Build and Push a Docker Image to Docker Hub](/ci/tutorial/build-push-image-to-docker-hub) to dynamically build `app_be_img`, if you are using static image tag, then you will not see the CI section to the left of the image


###11. Run the deploy job `deployBEAppKctl_GKE`
You can manually run the job by right clicking on the job or by triggering the CI process to generate a new image tag and deploy that new image to GKE. 

<img src="/images/tutorial/continuous-deployment-to-google-kubernetes-engine-kubectl-fig4.png" alt="Deploy console output">

## Further Reading
* [manifest Job](/platform/workflow/job/manifest)
* [release Job](/platform/workflow/job/release)
