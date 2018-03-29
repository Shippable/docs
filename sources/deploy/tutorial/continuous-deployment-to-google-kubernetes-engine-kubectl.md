page_main_title: CD to GKE using kubectl
main_section: Tutorial
sub_section: GKE
sub_sub_section: kubectl
page_title: Continuous Deployment to Google Kubernetes Engine using kubectl
page_description: Automated deployments to Google Kubernetes Engine using kubectl commands
page_keywords: Deploy docker containers, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, Google Kubernetes Enginer, GKE

# Continuous Deployment to Google Kubernetes Engine with `kubectl`
This tutorial explains how to continuously deploy a Docker container to Google Kubernetes Engine using native `kubectl` commands

## Introduction

Here is why you should be using Shippable. 


## Building Blocks

### Shippable Components
* [Google Cloud integration](/platform/integration/gcloudKey)
* [image resource](/platform/workflow/resource/image)
* [gitRepo resource](/platform/workflow/resource/gitrepo)
* [cliConfig resource](/platform/workflow/resource/cliconfig)
* [params resource](/platform/workflow/resource/params)
* [cluster resource](/platform/workflow/resource/cluster)
* [runSh job](/platform/workflow/job/runsh)

### Kube Docs
* [kubectl](https://kubernetes.io/docs/reference/kubectl/overview/)
* [Deployment](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.10/#deployment-v1-apps)
* [Services](https://kubernetes.io/docs/concepts/services-networking/service/)

## Shippable Concepts
* Defining Jobs and Resources using `shippable.yml`
* Sharing information between Jobs
* Using specific version of Google CLI
* Creating parametrized Jobs
* Logging into your deployment cluster using CLI
* Using templates inside your Job
* [Build and Push a Docker Image to Docker Hub](/tutorial/build-push-image-to-docker-hub)

## Detailed Instructions

### Step 1
Log into shippable. 

### Step 2
Add `shippable.yml` to a repo that will contain the definitions of your continuous deployment pipelines. In this case this is `https://github.com/devops-recipes/cd_gke_kubectl`

### Step 3
Add an account integration named `dr_gcp` of type `Google Cloud` and allow this integration to be used by the Org that contains your `shippable.yml` repo. Alternatively, you could just permit the repo to have access rather than the whole Org

<img src="/images/tutorial/continuous-deployment-to-google-kubernetes-engine-kubectl-fig1.png" alt="Add Account Integration">

> Note: If you have already done [Build and Push a Docker Image to Docker Hub](/tutorial/build-push-image-to-docker-hub), then skip steps 4, 5 and 6

### Step 4
Add an account integration named `dr_dh` of type `Docker Registry` and allow this integration to be used by the Org that contains your `Dockerfile` repo. Alternatively, you could just permit the repo to have access rather than the whole Org

<img src="/images/tutorial/build-push-docker-image-fig1.png" alt="Add Account Integration">

### Step 5
Add and `image` resource to `shippable.yml` created in step 2. `versionName` is the name of the image tag that you want to deploy

```
resources:
  - name: app_be_img
    type: image
    integration: dr_dh # replace with your integration name
    versionTemplate:
      sourceName: "devopsrecipes/app_be" # replace with your Hub URL
      isPull: false
      versionName: latest
```

### Step 6
Add an account integration name `dr_github` of type `Github` and allow this integration to be used by the Org that contains the `shippable.yml` repo. Github creds used should have access to this repo

### Step 7
Add a `gitRepo` resource that contains the kubernetes config files which defines the pods and services, to the `resources` section of `shippable.yml` 

```
  - name: config_repo
    type: gitRepo
    integration: "dr_github"
    versionTemplate:
      sourceName: "devops-recipes/cd_gke_kubectl"
      branch: master
```

### Step 8
Add a `cliConfig` resource that contains that contains gcp auth info, to the `resources` section of `shippable.yml` 

```
  - name: gcp_cli
    type: cliConfig
    integration: "dr_gcp"
    versionTemplate:
      region: "us-west1-a"
```

### Step 9
Add a `cluster` resource that contains information of your GKE cluster, to the `resources` section of `shippable.yml` 

```
  - name: gke_cluster
    type: cluster
    integration: "dr_gcp"
    pointer:
      sourceName: "cluster"
      region: "us-west1-a"
```

### Step 9
Add a `runSh` job that deploys the `app_be_img ` to GKE cluster, to the `jobs` section of `shippable.yml` 

```
jobs:
  - name: deployBEAppKctl_GKE
    type: runSh
    dependencyMode: strict
    steps:
      - IN: gcp_cli
      - IN: app_be_img
      - IN: gke_cluster
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

### Step 10
Commit and push all the above changes to `shippable.yml`

### Step 11
Now add assembly lines to the repo to which you pushed your yml

<img src="/images/tutorial/continuous-deployment-to-google-kubernetes-engine-kubectl-fig2.png" alt="Add Assembly Lines">

### Step 12
The assembly line view will look something like this

<img src="/images/tutorial/continuous-deployment-to-google-kubernetes-engine-kubectl-fig3.png" alt="Assembly Line view">

> Note: The above image is incorporating [Build and Push a Docker Image to Docker Hub](/tutorial/build-push-image-to-docker-hub) to dynamically build `app_be_img`, if you are using static image tag, then you will not see the CI section to the left of the image

### Step 13
You can manually run the `deployBEAppKctl_GKE` job by right clicking on the job or by triggering the CI process to generate a new image tag and deploy that new image to GKE

## Further Reading
* [manifest Job](/platform/workflow/job/manifest)
* [release Job](/platform/workflow/job/release)
