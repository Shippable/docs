page_description: Continuously deploying to GKE with Helm
main_section: Deploy
sub_section: Kubernetes

# Deploy to Google Kubernetes Engine using Helm

This tutorial explains how to continuously deploy a Docker container to Google Kubernetes Engine using native Helm Charts.

This document assumes you're familiar with the following concepts:

* [GCloud and it's SDK](https://cloud.google.com/sdk/gcloud/)
* [Docker Getting Started](https://docs.docker.com/v17.09/get-started/part1/)
* [Kubernetes Intro](https://kubernetes.io/docs/user-journeys/users/application-developer/foundational/)
* [Kubernetes Deployment Spec](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.10/#deployment-v1-apps)
* [Getting Started with Helm](https://docs.helm.sh/using_helm/#quickstart-guide)
* [kubectl command](https://kubernetes.io/docs/reference/kubectl/overview/)

If you're unfamiliar with Docker or Helm, you should start with learning how to deploy Docker containers manually. Refer to our blog for a step-by-step tutorial: [Deploy a Docker container to GKE using Helm](http://blog.shippable.com/deploy-docker-container-to-gke-using-helm).

## Step by Step instructions
This tutorial explains how to deploy a Docker container to Google Kubernetes Engine (GKE) using Helm Charts. It assumes that you have working knowledge of Docker and Kubernetes and understand the following concepts: 

The best way to get started is to install the gcloud CLI and run scripts manually on your local machine to deploy a container. Once you understand the mechanics of it, you should consider automating your workflow by following our documentation on [Automatically deploying a Docker container to GKE]().

Follow the steps below in order to manually deploy a Docker image to Google Kubernetes Engine


### Step 1: Setup your machine and Kubernetes cluster

* Create a project on Google Cloud Platform and note down the `Project ID`. To do this, refer to [GCP instructions](https://cloud.google.com/resource-manager/docs/creating-managing-projects).

* Install the version of `gcloud` CLI based on the OS of the machine from which you plan to deploy your application. To do this, refer to [GCP instructions](https://cloud.google.com/sdk/gcloud/).

* Authenticate gcloud to GCP. You do this with the following command `gcloud auth login`. To do this, refer to [GCP instructions](https://cloud.google.com/sdk/gcloud/reference/auth/login).

* Create a Kubernetes Cluster on GCP and node down the `Name` and `Region`. Refer to [GCP instructions](https://cloud.google.com/kubernetes-engine/docs/how-to/creating-a-container-cluster).

* Connect to your Kubernetes cluster by executing this command `gcloud container clusters get-credentials $CLUST --zone $CLUST_REG`. Here, `$CLUST & $CLUST_REG` represents the name and region of the cluster you created above.

### Step 2: Install and configure Helm

* Install Helm on to your local machine depending on your local OS. To do this, refer to [Helm install steps](https://docs.helm.sh/using_helm/#installing-helm)

* Initialize Helm on both your server and client with this command `helm init`. Please make sure your local system is authenticated to use `kubectl`. This will install tiller on the Kubernetes cluster which is a server side component that stores all your deployment version for easy rollbacks or rollforwards

### Step 3: Configure Service Account on GKE
* Run the following commands to setup and configure tiller to use this service account

```
kubectl create serviceaccount --namespace kube-system tiller

```
```
kubectl create clusterrolebinding tiller-cluster-rule --clusterrole=cluster-admin --serviceaccount=kube-system:tiller

```
```
kubectl patch deploy --namespace kube-system tiller-deploy -p '{"spec":{"template":{"spec":{"serviceAccount":"tiller"}}}}'
```
```
helm init --service-account tiller --upgrade
```


### Step 4: Prep Helm Charts

* Build and Push the Docker image of your application to a Docker registry of your choice. You can do this manually, or reference our guide on doing this with Shippable: [How to Build and Push a Docker Image to Docker Hub](http://docs.shippable.com/ci/tutorial/build-push-image-to-docker-hub/). The Docker image for our sample Node.js app is here: [Docker Image](https://hub.docker.com/r/devopsrecipes/node_app/tags/), so you can directly reference it in your Kubernetes spec if you don't have your own app image.

* Create a Helm Chart to deploy your app. To do this, refer to [Helm instructions](https://docs.helm.sh/developing_charts/#charts).

* If you don't want to create your own charts, you can use our sample repository at [https://github.com/devops-recipes/cd_gke_helm](https://github.com/devops-recipes/cd_gke_helm). 

* If you're using our sample application, the deployment chart [appDeploy.yaml[(https://github.com/devops-recipes/cd_gke_helm/blob/master/helmCharts/app/templates/appDeploy.yaml) is shown below. 

```
apiVersion: apps/v1beta1
kind: Deployment
metadata:
  namespace: {{ .Values.feApp.namespace }}
  name: {{ .Values.feApp.label }}
spec:
  replicas: {{ .Values.feApp.replicaCount }}
  revisionHistoryLimit: 10
  strategy:
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 1
  minReadySeconds: 5
  template:
    metadata:
      labels:
        app: {{ .Values.feApp.label }}
    spec:
      containers:
      - name: {{ .Values.feApp.label }}
        image: {{ .Values.feApp.image.repo }}:{{ .Values.feApp.image.tag }}
        ports:
        - containerPort: {{ .Values.feApp.port }}
        resources:
          requests:
            cpu: {{ .Values.feApp.resources.requests.cpu }}
          limits:
            cpu: {{ .Values.feApp.resources.limits.cpu }}
```

* To expose this app to the internet, we also need a [Kubenetes service](https://kubernetes.io/docs/concepts/services-networking/service/). The chart [appSvc.yaml](https://github.com/devops-recipes/cd_gke_helm/blob/master/helmCharts/app/templates/appSvc.yaml) is shown below

```
apiVersion: v1
kind: Service
metadata:
  namespace: {{ .Values.feSvc.namespace }}
  name: {{ .Values.feSvc.label }}
spec:
  type: LoadBalancer
  ports:
  - port: {{ .Values.feSvc.port }}
  selector:
    app: {{ .Values.feSvc.label }}

```

* If you look a little deeply into the charts, there is a reference to `.Values` objects which contain the variables needed to create the app and the service. Helm charts use a file called [values.yaml](https://github.com/devops-recipes/cd_gke_helm/blob/master/helmCharts/app/values.yaml) to seperate runtime values from design time definition of the charts. The values used in our sample is below

```
environment: ${ENVIRONMENT}
appVersion: ${APP_VERSION}

feApp:
  namespace: ${NAMESPACE}
  label: ${APP_LABEL}
  replicaCount: 1
  image:
    repo: ${APP_IMG}
    tag: ${APP_IMG_TAG}
  resources:
    requests:
      cpu: 250m
    limits:
      cpu: 500m
  port: 80

feSvc:
  namespace: ${NAMESPACE}
  label: ${APP_LABEL}
  port: 80

```

Make sure you replace the wildcards `${ENVIRONMENT}`, `${APP_VERSION}`, `${NAMESPACE}`, `${APP_LABEL}`, `${APP_IMG}` and `${APP_IMG_TAG}` in the file with information that applies to your scenario.

* Helm also uses a configuration file called [Chart.yaml](https://github.com/devops-recipes/cd_gke_helm/blob/master/helmCharts/app/Chart.yaml) which is below

```
apiVersion: v1
description: A Helm chart based deplyoment for GKE
name: ${APP_LABEL}
version: ${APP_VERSION}
```
Make sure you replace the wildcards `${APP_VERSION}` & `${APP_LABEL}` in the file also, with information that applies to your scenario.

### Step 5: Deploy your container!

* cd to the location of your Helm charts (in our case `helmCharts/app`)  files and run the following commands:

```
 helm init --client-only
```
```
 helm list -a
```
```
 helm upgrade --install --namespace $NAMESPACE $APP_LABEL .
```

* Execute `kubectl get svc ${APP_LABEL}` with your service label, to get the IP address of your endpoint. 

* Your application is now deployed! Check it out and confirm that the deployment was successful.

### Challenges with manual deployments 

There are many challenges with manually doing Docker deployments. In short, you will struggle with making your Kubernetes specs reusable and injecting the right values for wildcards at runtime, and managing security and accounts on the machine used to run the deployments. Also, if you have dependent workflows, you will have to manually go trigger each one.

If you want to achieve frictionless Docker deployments with modular, reusable specs, you need to templatize your specs and automate the workflow used to execute them.

## Automated deployments to Kubernetes with Helm 

You can easily automate your workflow using Shippable's Assembly Lines. The following Assembly Line features are particularly noteworthy for this scenario:

* Creating an event-driven workflow that automates the entire software delivery lifecycle
* Securing workflow jobs with RBAC and contextually injecting credentials based on who/what is running the deployment job
* Dynamically injecting wildcard values in template spec files, depending on the state of the workflow
* Visualize your workflow and it's current status in a graphical view

To jump into this tutorial, you will need to familiarize yourself with a few platform concepts.

### Concepts

* [Workflow overview](/platform/workflow/overview/)
* [Integrations](/platform/integration/overview/)
  * [Google Cloud](/platform/integration/gcloudKey)
  * [Docker Registry](/platform/integration/dockerRegistryLogin)
  * [Github](/platform/integration/github)
* [Resources](/platform/workflow/resource/overview/)
  * [image](/platform/workflow/resource/image)
  * [gitRepo](/platform/workflow/resource/gitrepo)
  * [cliConfig](/platform/workflow/resource/cliconfig)
* [Jobs](/platform/workflow/job/overview/)
  * [runSh](/platform/workflow/job/runsh)

This example extends the work done in our CI tutorial to [Build and Push a Docker Image to Docker Hub](/ci/tutorial/build-push-image-to-docker-hub) by adding an Assembly Line that deploys the application to GKE.

### Step by step instructions

The following sections explain the process of automating a workflow to continuously deploy an image to Google Kubernetes Engine using `Helm Charts`. We will demonstrate this with our sample application.

**Source code is available at [devops-recipes/cd_gke_helm](https://github.com/devops-recipes/cd_gke_helm)**

**Complete YML is at [devops-recipes/cd_gke_helm/shippable.yml](https://raw.githubusercontent.com/devops-recipes/cd_gke_helm/master/shippable.yml)**

####1. Setup Google Cloud Platform and Kubernetes

If you have already followed the manual steps, you might not need these except for creating a service account.

* [Create a project on GCP](https://cloud.google.com/resource-manager/docs/creating-managing-projects)
* [Create a service account for your project](https://cloud.google.com/compute/docs/access/service-accounts). Download and store the `JSON` security key in a secure place.
* [Create a Kubernetes container cluster](https://cloud.google.com/kubernetes-engine/docs/how-to/creating-a-container-cluster) and note down the name and region. Make sure your service account has **Write** access to this cluster.

####2. Add necessary Account Integrations

Integrations are used to connect your Shippable workflow with external providers. More information about integrations is [here](/platform/tutorial/integration/howto-crud-integration/). We will use integrations for GCP, Docker registry, and Github for this sample.

#####2a. Add `Google Cloud Platform` Integration

To be able to interact with GCP, we need to add the `drship_gcp `integration.

Detailed steps on how to add a Google Cloud Platform Integration are [here](/platform/integration/gcloudKey/#creating-an-account-integration). Make sure you name the integration `drship_gcp` since that is the name we're using in our sample automation scripts.

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step.

#####2b. Add `Docker Registry` Integration

To be able to push and pull images from Docker Hub, we need to add the `drship_dockerhub` integration.

Detailed steps on how to add a Docker Registry Integration are [here](/platform/integration/dockerRegistryLogin/#creating-an-account-integration). Make sure you name the integration `drship_dockerhub` since that is the name we're using in our sample automation scripts.

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step.

#####2c. Add `Github` Integration

In order to read your workflow configuration from Github, we need to add the `drship_github` integration. This points to the repository containing your Shippable workflow config file (`shippable.yml`) and Kubernetes config files.

In our case, we're using the repository [`devops-recipes/cd_gke_kubectl`](https://github.com/devops-recipes/cd_gke_kubectl).

Detailed steps on how to add a Github Integration are [here](/platform/integration/github/#creating-an-account-integration). Make sure you name the integration `drship_github` since that is the name we're using in our sample automation scripts.

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step.

####3. Author Assembly Line configuration

The platform is built with "Everything as Code" philosophy, so all configuration is in a YAML-based file called **shippable.yml**, which is parsed to create your Assembly Line workflow.

Detailed documentation on **shippable.yml** is [here](/deploy/configuration).

#####3a. Add empty shippable.yml to your repo

Add an empty **shippable.yml** file to the the root of repository.

#####3b. Add `resources` section of the config

`resources` section holds the information that is necessary to deploy to a Kubernetes cluster. In this case we have 4 resources defined of type `image`, `gitRepo`, `cliConfig` and `cluster`.

Add the following to your `shippable.yml`:

```
resources:
  - name: node_app_img_dh
    type: image
    integration: drship_dockerhub # replace with your integration name
    versionTemplate:
      sourceName: "devopsrecipes/node_app" # replace with your Hub URL
      isPull: false
      versionName: latest

# REPO of helm Charts
  - name: helm_gke_repo
    type: gitRepo
    integration: "drship_github"
    versionTemplate:
      sourceName: "devops-recipes/cd_gke_helm"
      branch: master

# gcloud CLI Config
  - name: helm_gcp_cli
    type: cliConfig
    integration: "drship_gcp"
    versionTemplate:
      region: "us-west1-a"
       
```

######i.`image` resource named `node_app_img_dh`

The Docker image that you want to deploy to GKE should be available as a resource to the Assembly Line.

`sourceName` contains the location of the image and the `versionName` contains the tag. `isPull` is used to configure whether the image is automatically pulled or not.

Detailed info about `image` resource is [here](/platform/workflow/resource/image).

> Note: If you have already implemented optional steps from [Build and Push a Docker Image to Docker Hub](/ci/tutorial/build-push-image-to-docker-hub), then skip this step as you already have the image resource defined.

######ii. `gitRepo` resource named `helm_gke_repo`

This resource points to the repository that contains your Kubernetes spec files, so that they are accessible to your Assembly Line. For our example, these files are present in the repository `https://github.com/devops-recipes/cd_gke_helm`, namely, [here](https://github.com/devops-recipes/cd_gke_helm/tree/master/specs).

Detailed info about `gitRepo` resource is [here](/platform/workflow/resource/gitrepo).

######iii. `cliConfig` resource named `helm_gcp_cli`

To be able to interact with Google Cloud Platform, you need to authenticate your `gcloud` CLI. Shippable does this for you automatically with the `cliConfig` resource.

Detailed info about `cliConfig` resource is [here](/platform/workflow/resource/cliconfig).

#####3c. Add `jobs` section of the config

A job is an execution unit of the Assembly Line. Our job has to perform three tasks:

* Prep the template Kubernetes deployment and service specs (wildcards APP_LABEL, APP_IMG & APP_TAG) with actual values from input resources. For our sample, here are the specs:
    * [Deployment spec](https://github.com/devops-recipes/cd_gke_kubectl/blob/master/specs/appDeploy.yml)
    * [Service spec](https://github.com/devops-recipes/cd_gke_kubectl/blob/master/specs/appSvc.yml)
* Initialize a connection to the cluster using `gcloud`
* Deploy to the cluster using `kubectl`

Add the following to your `shippable.yml`:

```
jobs:
  - name: deploy_app_helm_gke
    type: runSh
    dependencyMode: strict
    steps:
      - IN: node_app_img_dh # defined here https://github.com/devops-recipes/node_app/blob/master/shippable.yml
      - IN: helm_gcp_cli
        switch: off
      - IN: helm_gke_repo
        switch: off
      - TASK:
          name: deploy_app
          runtime:
            options:
              env:
                - CLUSTER_NAME: "cluster"
                - REGION: "us-west1-a"
                - APP_LABEL: "helm-app"
                - APP_VERSION: "latest"
                - ENVIRONMENT: "test"
                - NAMESPACE: "default"
          script:
            - gcloud container clusters get-credentials $CLUSTER_NAME --zone $REGION
            - |
               export APP_IMG=$(shipctl get_resource_version_key "node_app_img_dh" sourceName)
               export APP_IMG_TAG=$(shipctl get_resource_version_key "node_app_img_dh" "versionName")
            - pushd $(shipctl get_resource_state "helm_gke_repo")/helmCharts
            - shipctl replace app/Chart.yaml app/values.yaml
            - helm init --client-only
            - helm list -a
            - helm upgrade --install --namespace $NAMESPACE $APP_LABEL ./app
    on_success:
      script:
        - shipctl put_resource_state $JOB_NAME versionName $APP_VERSION
```

* Adding the above config to the jobs section of shippable.yml will create a `runSh` job called `deploy_app_helm_gke`.

* The first section of `steps` defines all the input `IN` resources that are required to execute this job.
  * Helm chart files are version controlled in a repo represented by `helm_gke_repo`.
  * Credentials to connect to Cluster are in `helm_gcp_cli`. This resource has `switch: off` flag which means any changes to it will not trigger this job automatically
  * `node_app_img_dh` is an **image** resource that comes from another tutorial [which explains how to build and push a Docker image](/ci/tutorial/build-push-image-to-docker-hub) and contains the image name and tag in `sourceName & versionName ` fields, which are required by this job. If you already have this and just want to use this tutorial to deploy, just delete this resource and hardcode the values APP_IMG and APP_TAG in the **TASK.runtime.options.env** section.
* The `TASK` section contains actual code that is executed when the job runs. We have just one task named `deploy_app` which does the following:
  * First, we define environment variables required by the scripts-
    * `CLUSTER_NAME` which is the name of your GKE cluster
    * `REGION` is the region where your cluster is provisioned
    * `APP_LABEL` which is the label we use to the tie the service and the app
    * `APP_VERSION` is the version of the app you are currently deploying. Helm maintains the history so that you could roll-back if necessary
    * `ENVIRONMENT` represents the stage of your software delivery
    * `NAMESPACE` is the name of the namespace on your cluster in which this app will be deployed in
  *  `script` section has a list of commands to execute sequentially.
    * First, we authenticate to session to the GKE cluster. Since `cliConfig` resource was used the platform has already done `gcloud auth login` step, we can directly run `gcloud container clusters get-credentials` to get kube credentials
    * Next, we extract the image info and set APP_IMG and APP_TAG from the `node_app_img_dh` resource, again using shipctl functions
    * Next, we change the `pwd` by using shipctl function `get_resource_state`
    * Then, we replace all wildcards in Chart.yaml & values.yaml files
    * Last, we execute helm commands to initialize the client, and then create the app and the service. Please make sure you have configured the GKE cluster to use `Helm` as described in Section 3 of Manual steps

Detailed info about `runSh` job is [here](/platform/workflow/job/runsh).

Detailed info about Shippable Utility functions are [here](/platform/tutorial/workflow/using-shipctl).

#####3d. Push changes to shippable.yml

Commit and push all the above changes to `shippable.yml`.

####4. Add the Assembly Line to your Shippable organization

In Shippable's world, a Subscription maps to an Organization or a Team, depending on the source control provider. An Assembly Line workflow is defined at a Subscription level and all jobs are resources are global to your subscription.

To add your Assembly Line to Shippable, you need to add the repository containing the configuration as a "sync repository" by [following instructions here](/deploy/configuration/#adding-a-syncrepo). This automatically parses your `shippable.yml` config and adds your workflow to Shippable. Your workflow will always be kept in sync with the config in this repository, and be automatically updated every time you push a change to `shippable.yml`.

Your view will look something like this:

<img src="/images/tutorial/deploy-to-google-kubernetes-engine-helm-fig1.png" alt="Assembly Line view">

> Note: This assembly line is incorporating [Build and Push a Docker Image to Docker Hub](/ci/tutorial/build-push-image-to-docker-hub) to dynamically build `node_app_img_dh`, if you are using static image tag, then you will not see the CI section to the left of the image

####5. Run the deploy job `deploy_app_helm_gke`

You can manually run the job by right clicking on the job or by triggering the CI process to generate a new image tag and deploy that new image to GKE. You should see your app & service deployed to the Kubernetes cluster you created on GCP.

<img src="/images/tutorial/deploy-to-google-kubernetes-engine-helm-fig2.png" alt="Deploy console output">

## Further Reading
* [Build and Push a Docker Image to Docker Hub](/ci/tutorial/build-push-image-to-docker-hub)
* [Working with Integrations](/platform/tutorial/integration/howto-crud-integration/)
* [Defining Resources in shippable.yml](/platform/tutorial/workflow/shippable-yml/#resources-config)
* [Defining Jobs in shippable.yml](/platform/tutorial/workflow/shippable-yml/#jobs-config)
* [Sharing information between Jobs](/platform/tutorial/workflow/share-info-across-jobs/)
