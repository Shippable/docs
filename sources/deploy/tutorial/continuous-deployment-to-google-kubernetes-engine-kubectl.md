page_main_title: CD to GKE using kubectl
main_section: Tutorial
sub_section: GKE
sub_sub_section: kubectl
page_title: Continuous Deployment to Google Kubernetes Engine using kubectl
page_description: Automated deployments to Google Kubernetes Engine using kubectl commands
page_keywords: Deploy docker containers, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, Google Kubernetes Engine, GKE

# Continuous Deployment to Google Kubernetes Engine using kubectl
This tutorial explains how to continuously deploy a Docker container to Google Kubernetes Engine using native `kubectl` commands. It also assumes that you have working knowledge of Docker and Kubernetes and undestand the following concepts.

* [GCloud and it's SDK](https://cloud.google.com/sdk/gcloud/)
* [Kubernetes Deployment Spec](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.10/#deployment-v1-apps)
* [Kubernetes Services Spec](https://kubernetes.io/docs/concepts/services-networking/service/)
* [kubectl command](https://kubernetes.io/docs/reference/kubectl/overview/)

## Manual Steps to Deploy
This section covers step by step instructions to manually deploy your image to Google Kubernetes Engine

* Create a project on Google Cloud Platform and note down the `Project ID`. [GCP Info](https://cloud.google.com/resource-manager/docs/creating-managing-projects)
* Install the version of `gcloud` CLI based on the OS of the machine from which you plan to deploy your application. [GCP Info](https://cloud.google.com/sdk/gcloud/)
* Create a Kubernetes Cluster on GCP and node down the `Name` and `Region`. [GCP Info](https://cloud.google.com/kubernetes-engine/)
* Build and Push the Docker image of the application that you want to deploy to a registry of your choice. You could use our sample Node.js app in case you dont have one. [Docker Image](https://hub.docker.com/r/devopsrecipes/node_app/tags/) & [How to Build and Push a Docker Image to Docker Hub](/ci/tutorial/build-push-image-to-docker-hub)
* Create Kubernetes Deployment Spec to deploy your app. Your spec will look something like this,

**Kubernetes Deployment Spec**

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

* If you don't have one you can use our sample [appDeploy.yml](https://github.com/devops-recipes/cd_gke_kubectl/blob/master/specs/appDeploy.yml). Make sure you replace the wildcards `${APP_LABEL}`, `${APP_IMG}` and `${APP_TAG}` in the file with information that applies to your scenario.
* Create Kubernetes Service Spec to deploy your app. This is needed to expose your app to the internet. Your spec will look something like this,

**Kubernetes Service Spec**

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

* If you don't have one you can use our sample [appDeploy.yml](https://github.com/devops-recipes/cd_gke_kubectl/blob/master/specs/appSvc.yml). Make sure you replace the wildcards `${APP_LABEL}` in the file with information that applies to your scenario. Make sure that you use the same label as above, otherwise the service will not bind to your app as your can see from the `selector` setting. If you change it, make sure the right values are set.
* Authenticate the newly installed gcloud to GCP. You do this with the following command `gcloud auth login`. [GCP Info](https://cloud.google.com/sdk/gcloud/reference/auth/login)
* Now connect to the Kubernetes cluster by executing this command `gcloud container clusters get-credentials $CLUST --zone $CLUST_REG`. Here `$CLUST` & `$CLUST_REG` represents the name and region of the cluster your created above.
* `cd` to the location of your kube spec files are run the following commands.
  * `kubectl delete  -f ./appDeploy.yml` to delete the app if it already exists.
  * `kubectl delete -f ./appSvc.yml` to delete the service if it already exists.
  * `kubectl create -o json -f ./appDeploy.yml` to deploy a new version of the app.
  * `kubectl create -o json -f ./appSvc.yml` to provision a new service to the app.
* Now execute `kubectl get svc ${APP_LABEL}` with your service label, to get the IP address of your endpoint.

## Challenges with manual deployments
There are a few challenges with manual deployment

* Kube Spec files are templatized and you need some programmatic way to supply those values. Creating static files will reduce re-usability and even with Helm, the variables file needs to be created. Helm just moves the wildcards into a single file, doesn't really solve the problem of how to supply it.
* Automating the build, test and deploy into a streamlined workflow when multiple components need to be tested before deployment is going to be very challenging to achieve. Continuous Delivery is not just about deploying one repo to Kube, it is about deploying multiple components that make up an app together.
* RBAC is going to be a huge problem. The machine used to deploy is authenticated to a project (even in the case of service accounts). This means that the only way you can implement RBAC across multiple projects/teams is to use multiple accounts on the machine. This is messy and painful to maintain at scale.
* The machine has to be prepped with the right version of the CLI. If multiple teams are deploying and they have a need to use different versions of the CLI, you will need different deployment machines

## Automating Kubernetes deployments
We are going to address the challenges above in a systematic way by using Assembly Lines (AL) that Shippable provides. AL offers a variety of benefits, the prominent being

* Capability to create an event driven workflow that automates the entire software delivery lifecycle
* Ability to create RBAC and contextually inject credentials based on who/what is running the deployment job
* Using templatized spec files and dynamically inject wildcard values depending on the state of the workflow
* A graphical way to visualize your workflow and it's current status

To jump into this tutorial, you will need to familiarize yourself with a few platform concepts.

### Concepts

* [Integrations](/platform/integration/overview/)
  * [Google Cloud](/platform/integration/gcloudKey)
  * [Docker Registry](/platform/integration/dockerRegistryLogin)
  * [Github](/platform/integration/github)
* [Resources](/platform/workflow/resource/overview/)
  * [image](/platform/workflow/resource/image)
  * [gitRepo](/platform/workflow/resource/gitrepo)
  * [cliConfig](/platform/workflow/resource/cliconfig)
  * [cluster](/platform/workflow/resource/cluster)
* [Jobs](/platform/workflow/job/overview/)
  * [runSh](/platform/workflow/job/runsh)

This example extends the work done in [Build and Push a Docker Image to Docker Hub](/ci/tutorial/build-push-image-to-docker-hub) by adding an Assembly Line that deploys the application to GKE

### Step by step instructions
The following sections explain the process of setting up an AL to continuously deploy an image to Google Kubernetes Engine using `kubectl`.

**Source code is available at [devops-recipes/cd_gke_kubectl](https://github.com/devops-recipes/cd_gke_kubectl)**

**Complete YML is at [devops-recipes/cd_gke_kubectl/shippable.yml](https://raw.githubusercontent.com/devops-recipes/cd_gke_kubectl/master/shippable.yml)**

####1. Setup Google Cloud Platform and Kubernetes
If you have already done the manual steps, you might not need these, except for creating a service account

* Create a project on GCP
* Create a service account for your project, download and store the `JSON` security key in a secure place. [GCP Info](https://cloud.google.com/compute/docs/access/service-accounts)
* Create a Kubernetes cluster and note down the name and region. Make sure the service account has write access to this cluster

####2. Add necessary Account Integrations
Integrations are used to connect Shippable Platform with external providers. More information about integrations is [here](/platform/tutorial/integration/howto-crud-integration/). The following are the integrations that we will use in this sample

**2a. Add `Google Cloud Platform` Integration**

To be able to interact with GCP, we add `drship_gcp `integration.

Detailed steps on how to add a Google Cloud Platform Integration are [here](/platform/integration/gcloudKey/#creating-an-account-integration).

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step

**2b. Add `Docker Registry` Integration**

To be able to push and pull images from Docker Hub, we add `drship_dockerhub` integration.

Detailed steps on how to add a Docker Registry Integration are [here](/platform/integration/dockerRegistryLogin/#creating-an-account-integration).

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step

**2c. Add `Github` Integration**

In order to read your AL configuration from Github, we add `drship_github` integration. This is the repo where you are going to store your AL config file (`shippable.yml`) and Kubernetes config files.

In this case this we are using repo [`devops-recipes/cd_gke_kubectl`](https://github.com/devops-recipes/cd_gke_kubectl).

Detailed steps on how to add a Github Integration are [here](/platform/integration/github/#creating-an-account-integration).

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step

####3. Author Assembly Line configuration
The platform is built with "Everything as Code" philosophy and it uses YAML based configuration file called `shippable.yml`. Jobs and Resources section from your `shippable.yml` are parsed to create the AL.

Detailed AL configuration info is [here](/deploy/configuration).

**3a. Add empty shippable.yml to your repo**

Add an empty config file to the the root of your repo.

**3b. Add `resources` section of the config**

`resources` section holds the config info that is necessary to deploy to a Kubernetes cluster. In this case we have 4 resources defined of type `image`, `gitRepo`, `cliConfig` and `cluster`.

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

######i.`image` resource named `node_app_img_dh`

The image that you want to deploy to GKE should be available as a resource to the assembly line.

`sourceName` contains the location of the image and the `versionName` contains the tag. `isPull` is used to configure whether the image is automatically pulled or not.

Detailed info about `image` resource is [here](/platform/workflow/resource/image).

> Note: If you have already implemented optional steps from [Build and Push a Docker Image to Docker Hub](/ci/tutorial/build-push-image-to-docker-hub), then skip this step as you already have the image resource defined.

######ii. `gitRepo` resource named `config_repo`
Your Kubernetes config files will be placed in a repo and the assembly line needs to know where to find them. For this e.g. configs are present in `https://github.com/devops-recipes/cd_gke_kubectl`

Kubernetes config files for this app are [here](https://github.com/devops-recipes/cd_gke_kubectl/tree/master/specs)

Detailed info about `gitRepo` resource is [here](/platform/workflow/resource/gitrepo).

######iii. `cliConfig` resource named `gcp_cli`
To be able to interact with Google Cloud Platform, you need to authenticate your gcloud cli. Shippable does this for you automatically when a `cliConfig` resource is present in a job.

Detailed info about `cliConfig` resource is [here](/platform/workflow/resource/cliconfig).

######iv. `cluster` resource named `gke_cluster`
This will contain the location of the Kube cluster.

`sourceName` is the name of the GKE cluster and `region` is where the cluster is present

Detailed info about `cluster` resource is [here](/platform/workflow/resource/cluster).

**3c. Add `jobs` section of the config**

A job is the actual execution unit of the assembly line. In this job, we are going to do three things

* First, we are going to prep the templatized kube files (wildcards APP_LABEL, APP_IMG & APP_TAG) with actual values from input resouces
* Second, we are going initialize a connection to the cluster using gcloud
* Lastly, we are going to deploy to the cluster using kubectl

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
* Adding the above config to the jobs section of shippable.yml will create a `runSh` job called `deploy_app_kctl_gke`.
* The first section of `steps` defines all the input `IN` resources that are required to execute this job.
  * Image to be deployed is represented by `node_app_img_dh`.
  * Credentials to connect to Google Cloud is in `gcp_cli`. This resource has `switch: off` flag which means any changes to it will not trigger this job automatically
  * Kubernetes cluster location is supplied by `gke_cluster` which is also switched off.
  * Kubernetes config files `appDeploy.yml` & `appSvc.yml` are version controlled in a repo represented by `config_repo`
* The `TASK` section is the actual code that is executed when the job runs.
  *  Name of the task is `deploy_app`
  *  It sets up an environment variable `APP_LABEL` before executing any code.
  *  `script` section has the list of commands to execute. The commands are preforming 3 core things
    *  First is the "Config file prep section". Here we are using utility function `get_resource_state` on `config_repo` to get the folder where kube files are stored. We then set the `APP_IMG` & `APP_TAG` values by fetching them from resource `node_app_img_dh` using `get_resource_version_key`. We then run `replace` command on `appDeploy.yml` & `appSvc.yml` files (shown below) to replace the wildcards with actual values.
    *  Second is the "Cluster login section". Since we added `gcp_cli` as an `IN`, the platform has already authenticated the shell to gcloud and set the default region to `us-west1-a`. Now we use utility `get_resource_version_key` on resource `gke_cluster` to get the location of the cluster and we use gcloud to authenticate to the kube cluster.
    *  Last step is the "App deployment section". Now that we have an active connection to the kube cluster, we delete the app and service if it already exists and deploy the newer version.

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

Detailed info about `runSh` job is [here](/platform/workflow/job/runsh).

Detailed info about Shippable Utility functions are [here](/platform/tutorial/workflow/using-shipctl).

**3d. Push changes to shippable.yml**

Commit and push all the above changes to shippable.yml.

####4. Attach the AL to your Repo's Subscription
In Shippable's world, an Org or a Group depending on the SCM system you are using equate to a Subscription. We will hook the YML so that the platform can render the AL.

This should automatically trigger the sync process to add all the changes to the assembly line. Your view should look something like this.

<img src="/images/tutorial/continuous-deployment-to-google-kubernetes-engine-kubectl-fig3.png" alt="Assembly Line view">

> Note: This assembly line is incorporating [Build and Push a Docker Image to Docker Hub](/ci/tutorial/build-push-image-to-docker-hub) to dynamically build `app_be_img`, if you are using static image tag, then you will not see the CI section to the left of the image

Detailed info to hook your AL is [here](/deploy/configuration/#adding-a-syncrepo).

####5. Run the deploy job `deploy_app_kctl_gke`
You can manually run the job by right clicking on the job or by triggering the CI process to generate a new image tag and deploy that new image to GKE. You should see your app & service deployed to the Kubernetes cluster you created on GCP

<img src="/images/tutorial/continuous-deployment-to-google-kubernetes-engine-kubectl-fig4.png" alt="Deploy console output">


## Further Reading
* [Build and Push a Docker Image to Docker Hub](/ci/tutorial/build-push-image-to-docker-hub)
* [Working with Integrations](/platform/tutorial/integration/howto-crud-integration/)
* [Defining Resources in shippable.yml](/platform/tutorial/workflow/shippable-yml/#resources-config)
* [Defining Jobs in shippable.yml](/platform/tutorial/workflow/shippable-yml/#jobs-config)
* [Sharing information between Jobs](/platform/tutorial/workflow/sharing-data-between-jobs/)
* Using specific version of Google CLI
* Creating parametrized Jobs
* Using templates inside your Job
* Logging into your deployment cluster using CLI
