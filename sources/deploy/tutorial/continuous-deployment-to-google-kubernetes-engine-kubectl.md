page_main_title: CD to GKE using kubectl
main_section: Tutorial
sub_section: GKE
sub_sub_section: kubectl
page_title: Continuous Deployment to Google Kubernetes Engine using kubectl
page_description: Automated deployments to Google Kubernetes Engine using kubectl commands
page_keywords: Deploy docker containers, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, Google Kubernetes Enginer, GKE

# Continuous Deployment to Google Kubernetes Engine using `kubectl`
This tutorial explains how to continuously deploy a Docker container to Google Kubernetes Engine using native `kubectl` commands. This example continues on the work done in [Build and Push a Docker Image to Docker Hub](/ci/tutorial/build-push-image-to-docker-hub) by adding CD Assembly Line to GKE

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
* [Working with Integrations](/platform/tutorial/integration/howto-crud-integration/)
* [Defining Resources in shippable.yml](/platform/tutorial/workflow/shippable-yml/#resources-config)
* [Defining Jobs in shippable.yml](/platform/tutorial/workflow/shippable-yml/#jobs-config)
* [Sharing information between Jobs](/platform/tutorial/workflow/sharing-data-between-jobs/)
* Using specific version of Google CLI
* Creating parametrized Jobs
* Using templates inside your Job
* Logging into your deployment cluster using CLI

### Kubernetes Concepts
* [kubectl](https://kubernetes.io/docs/reference/kubectl/overview/)
* [Deployment](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.10/#deployment-v1-apps)
* [Services](https://kubernetes.io/docs/concepts/services-networking/service/)

## Step by Step Instructions
The following sections explain the process of setting up a workflow to continuously deploy an image to Google Kubernetes Engine using `kubectl`.

**Source code is available at [devops-recipes/app_be](https://github.com/devops-recipes/cd_gke_kubectl)**

**Complete YML is at [devops-recipes/cd_gke_kubectl/shippable.yml](https://raw.githubusercontent.com/devops-recipes/cd_gke_kubectl/master/shippable.yml)**

###1. Add `Google Cloud Platform` Integration
To be able to interact with GCP, we need an integration. Add `drship_gcp `integration.

Detailed steps on how to add a Google Cloud Platform Integration are [here](/platform/integration/gcloudKey/#creating-an-account-integration).

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step

###2. Add `Docker Registry` Integration
To be able to push and pull images from Docker Hub, we need an integration. Add `drship_dockerhub`integration.

Detailed steps on how to add a Docker Registry Integration are [here](/platform/integration/dockerRegistryLogin/#creating-an-account-integration).

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step

###3. Add `Github` Integration
In order to read your Assembly Line configuration from Github, we need an integration. Add `drship_github` integration.

Detailed steps on how to add a Github Integration are [here](/platform/integration/github/#creating-an-account-integration).

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step

###4. Add Assembly Line to Org
Next, add the configuration to your Shippable subscription. Jobs and resources section from your `shippable.yml` are parsed to create the workflow.

Detailed steps to add an Assembly Line are [here](/deploy/configuration).

###5. Define the `resources` section of the shippable.yml
`resources` section holds the config info that is necessary to deploy to a Kubernetes cluster. shippable.yml has 4 resources defined of type `image`, `gitRepo`, `cliConfig` and `cluster`. 

```
resources:
  - name: node_app_img_dh
    type: image
    integration: drship_dockerhub # replace with your integration name
    versionTemplate:
      sourceName: "devopsrecipes/node_app" # replace with your Hub URL
      isPull: false
      versionName: latest
  
  - name: config_repo
    type: gitRepo
    integration: "dr_github"
    versionTemplate:
      sourceName: "devops-recipes/cd_gke_kubectl"
      branch: master
      
  - name: gcp_cli
    type: cliConfig
    integration: "dr_gcp"
    versionTemplate:
      region: "us-west1-a"
      
  - name: gke_cluster
    type: cluster
    integration: "dr_gcp"
    pointer:
      sourceName: "cluster"
      region: "us-west1-a"            
```

####a. `image` resource named `node_app_img_dh`
The image that you want to deploy to GKE should be available as a resource to the assembly line. Add the following yml to your shippable.yml.

`sourceName` contains the location of the image and the `versionName` contains the tag. `isPull` is used to configure whether the image is automatically pulled or not.

Detailed info about `image` resource is [here](/platform/workflow/resource/image).

> Note: If you have already implemented optional steps from [Build and Push a Docker Image to Docker Hub](/ci/tutorial/build-push-image-to-docker-hub), then skip this step as you already have the image resource defined.

####b. `gitRepo` resource named `config_repo`
Your Kubernetes config files will be placed in a repo and the assembly line needs to know where to find them. Add this yml to resources section of shippable.yml. For this e.g. configs are present in `https://github.com/devops-recipes/cd_gke_kubectl`

Kubernetes config files for this app are [here](https://github.com/devops-recipes/cd_gke_kubectl/tree/master/specs)

Detailed info about `gitRepo` resource is [here](/platform/workflow/resource/gitrepo).

####c. `cliConfig` resource named `gcp_cli`
To be able to interact with Google Cloud Platform, you need to authenticate your gcloud cli. Shippable does this for you automatically when a `cliConfig` resource is present in a job. Create a `gcp_cli` resource by adding the following to the resources section of shippable.yml.

Detailed info about `cliConfig` resource is [here](/platform/workflow/resource/cliconfig).

####d. `cluster` resource named `gke_cluster`
This will contain the location of the Kube cluster. Create `gke_cluster` resource to provide that info by adding to the resources section of shippable.yml.

`sourceName` is the name of the GKE cluster and `region` is where the cluster is present

Detailed info about `cluster` resource is [here](/platform/workflow/resource/cluster).

###6. Define the `jobs` section of the `shippable.yml`
A job is the actual execution unit of the assembly line. Here we are adding `deployBEAppKctl_GKE` by adding this to the jobs section of shippable.yml.

In this job, we are going to do three things

* First, we are going to prep the templatized kube files (wildcards APP_LABEL, APP_IMG & APP_TAG) with actual values from input resouces 
* Second, we are going initialize a connection to the cluster using gcloud
* Lastly, we are going to deploy to the cluster using kubectl

**Kubernetes Deployment template stored in config_repo - appDeploy.yml**

```
apiVersion: apps/v1beta1
kind: Deployment
metadata:
  namespace: default
  name: ${APP_LABEL}
spec:
  replicas: 1
  strategy:
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 1
  minReadySeconds: 5
  template:
    metadata:
      labels:
        app: ${APP_LABEL}
    spec:
      containers:
      - name: ${APP_LABEL}
        image: ${APP_IMG}:${APP_TAG}
        ports:
        - containerPort: 80
        resources:
          requests:
            cpu: 250m
          limits:
            cpu: 500m
```

**Kubernetes Service template stored in config_repo - appSvc.yml**

```
apiVersion: v1
kind: Service
metadata:
  namespace: default
  name: ${APP_LABEL}
spec:
  type: LoadBalancer
  ports:
  - port: 80
  selector:
    app: ${APP_LABEL}

```

**Shippable Jobs configuration stored in config_repo - shippable.yml**

```
jobs:
  - name: deploy_app_kctl_gke
    type: runSh
    steps:
      - IN: node_app_img_dh
      - IN: gcp_cli
        switch: off
      - IN: gke_cluster
        switch: off
      - IN: config_repo
        switch: off
      - TASK:
          name: deploy_app
          runtime:
            options:
              env:
                - APP_LABEL: "kctl-app"
          script:
            # Config file prep section
            - pushd $(shipctl get_resource_state "config_repo")
            - cd specs
            - export APP_IMG=$(shipctl get_resource_version_key node_app_img_dh sourceName)
            - export APP_TAG=$(shipctl get_resource_version_key node_app_img_dh versionName)
            - shipctl replace appDeploy.yml appSvc.yml
            # Cluster login section
            - export CLUST=$(shipctl get_resource_version_key gke_cluster sourceName)
            - export CLUST_REG=$(shipctl get_resource_version_key gke_cluster region)
            - gcloud container clusters get-credentials $CLUST --zone $CLUST_REG
            # App deployment section
            - kubectl delete  -f ./appDeploy.yml 2>/dev/null || echo ""
            - kubectl delete -f ./appSvc.yml  2>/dev/null || echo ""
            - kubectl create -o json -f ./appDeploy.yml >> kube_output.json
            - kubectl create -o json -f ./appSvc.yml >> kube_output.json
            - cat kube_output.json
            - popd
```

* The `name` of the job is `deploy_app_kctl_gke` and the `type` is `runSh`.
* The first section of `steps` defines all the input `IN` resources that are required to execute this job.
  * Image to be deployed is represented by `node_app_img_dh`.
  * Credentials to connect to Google Cloud is in `gcp_cli`. This resource has `switch: off` flag which means any changes to it will not trigger this job automatically
  * Kubernetes cluster location is supplied by `gke_cluster` which is also switched off.
  * Kubernetes config files `appDeploy.yml` & `appSvc.yml` are version controlled in a repo represented by `config_repo`
* The `TASK` section is the actual code that is executed when the job runs. 
  *  Name of the task is `deploy_app`
  *  It sets up an environment variable `APP_LABEL` before executing any code. 
  *  `script` section has the list of commands to execute. The commands are preforming 3 core things
    *  First is the "Config file prep section". Here we are using utility function `get_resource_state` on `config_repo` to get the folder where kube files are stored. We then set the `APP_IMG` & `APP_TAG` values by fetching them from resource `node_app_img_dh` using `get_resource_version_key`. We then run `replace` command on `appDeploy.yml` & `appSvc.yml` files to replace the wildcards with actual values.
    *  Second is the "Cluster login section". Since we added `gcp_cli` as an `IN`, the platform has already authenticated the shell to gcloud and set the default region to `us-west1-a`. Now we use utility `get_resource_version_key` on resource `gke_cluster` to get the location of the cluster and we use gcloud to authenticate to the kube cluster.
    *  Last step is the "App deployment section". Now that we have an active connection to the kube cluster, we delete the app and service if it already exists and deploy the newer version. 

Detailed info about `runSh` job is [here](/platform/workflow/job/runsh).

Detailed info about Shippable Utility functions are [here](/platform/tutorial/workflow/using-shipctl).

###7. Push changes to shippable.yml
Commit and push all the above changes to shippable.yml. This should automatically trigger the sync process to add all the changes to the assembly line. Your view should look something like this. 

<img src="/images/tutorial/continuous-deployment-to-google-kubernetes-engine-kubectl-fig3.png" alt="Assembly Line view">

> Note: This assembly line is incorporating [Build and Push a Docker Image to Docker Hub](/ci/tutorial/build-push-image-to-docker-hub) to dynamically build `app_be_img`, if you are using static image tag, then you will not see the CI section to the left of the image


###8. Run the deploy job `deploy_app_kctl_gke`
You can manually run the job by right clicking on the job or by triggering the CI process to generate a new image tag and deploy that new image to GKE. 

<img src="/images/tutorial/continuous-deployment-to-google-kubernetes-engine-kubectl-fig4.png" alt="Deploy console output">

## Further Reading
* [manifest Job](/platform/workflow/job/manifest)
* [release Job](/platform/workflow/job/release)
