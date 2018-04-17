page_main_title: Deploy to GKE using kubectl
main_section: Tutorial
sub_section: GKE
sub_sub_section: kubectl
page_title: Continuous Deployment to Google Kubernetes Engine using kubectl
page_description: Automated deployments to Google Kubernetes Engine using kubectl commands
page_keywords: Deploy docker containers, Kubernetes, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, Google Kubernetes Engine, GKE

# Continuous Deployment to Google Kubernetes Engine using kubectl

This tutorial explains how to continuously deploy a Docker container to Google Kubernetes Engine using native `kubectl` commands. It assumes that you have working knowledge of Docker and Kubernetes and understand the following concepts:

* [GCloud and it's SDK](https://cloud.google.com/sdk/gcloud/)
* [Kubernetes Deployment Spec](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.10/#deployment-v1-apps)
* [Kubernetes Services Spec](https://kubernetes.io/docs/concepts/services-networking/service/)
* [kubectl command](https://kubernetes.io/docs/reference/kubectl/overview/)

## Manual Steps to Deploy

First, we will walk through a step-by-step guide on how to manually deploy a Docker image to Google Kubernetes Engine.

* Create a project on Google Cloud Platform and note down the `Project ID`.  To do this, [refer to GCP instructions.](https://cloud.google.com/resource-manager/docs/creating-managing-projects)

* Install the version of `gcloud` CLI based on the OS of the machine from which you plan to deploy your application. To do this, [refer to GCP instructions.](https://cloud.google.com/sdk/gcloud/)

* Authenticate gcloud to GCP. You do this with the following command `gcloud auth login`.  To do this, [refer to GCP instructions.](https://cloud.google.com/sdk/gcloud/reference/auth/login)

* Create a Kubernetes Cluster on GCP and node down the `Name` and `Region`. [Refer to GCP instructions.](https://cloud.google.com/kubernetes-engine/docs/how-to/creating-a-container-cluster)

* Connect to your Kubernetes cluster by executing this command `gcloud container clusters get-credentials $CLUST --zone $CLUST_REG`. Here, `$CLUST` & `$CLUST_REG` represents the name and region of the cluster you created above.

* Build and Push the Docker image of your application to a registry of your choice. You can do this manually, or reference our guide on doing this with Shippable: [How to Build and Push a Docker Image to Docker Hub](/ci/tutorial/build-push-image-to-docker-hub). The Docker image for our sample Node.js app is here: [Docker Image](https://hub.docker.com/r/devopsrecipes/node_app/tags/)

* Create a Kubernetes Deployment Spec to deploy your app. To do this, [refer to Kubernetes instructions.](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.10/#deployment-v1-apps)

If you're using our sample application, the deployment spec [appDeploy.yml](https://github.com/devops-recipes/cd_gke_kubectl/blob/master/specs/appDeploy.yml) is shown below. Make sure you replace the wildcards `${APP_LABEL}`, `${APP_IMG}` and `${APP_TAG}` in the file with information that applies to your scenario.

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

* Create a Kubernetes Service Spec to expose your application to the internet or to other internal applications. To do this, refer to [Kubernetes Services Spec docs.](https://kubernetes.io/docs/concepts/services-networking/service/)

If you're using our sample application, the Service spec [appSvc.yml](https://github.com/devops-recipes/cd_gke_kubectl/blob/master/specs/appSvc.yml) is shown below. Make sure you replace the wildcards `${APP_LABEL}` in the file with information that applies to your scenario. Also, **ensure that you use the same label as the one in your deployment spec**, otherwise the service will not bind to your application.  

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

* `cd` to the location of your Kubernetes deployment and service spec files and run the following commands:
      * `kubectl delete  -f ./appDeploy.yml` to delete the app if it already exists.
      * `kubectl delete -f ./appSvc.yml` to delete the service if it already exists.
      * `kubectl create -o json -f ./appDeploy.yml` to deploy a new version of the app.
      * `kubectl create -o json -f ./appSvc.yml` to provision a new service to the app.


* Execute `kubectl get svc ${APP_LABEL}` with your service label, to get the IP address of your endpoint. Your application is now deployed!

## Challenges with manual deployments

While manual deployments are great while getting started with Kubernetes, there are a few challenges:

* Unless you create templates for your Kubernetes spec files, you'll end up with a file per application/service per environment, which adds up very quickly. However, the problem
with template files is that you now need a programmatic way to inject environment specific values during runtime. Even with Helm, the variables file needs to be created. Helm just moves the wildcards into a single file, doesn't really solve the problem of how to supply it.
* Without automation in place, someone on your team will need to deploy manually multiple times a day and maintain a history of what is deployed in each environment, and by whom. This creates inefficiency and a reliance on people.
* Security with RBAC is a problem. The machine used to deploy is authenticated to a project (even in the case of service accounts). This means that the only way you can implement RBAC across multiple projects/teams is to use multiple accounts on the machine. This is messy and painful to maintain at scale.
* The machine has to be prepped with the right version of the CLI. If multiple teams are deploying and they have a need to use different versions of the CLI, you will need different deployment machines for each team.

In a nutshell, if you want to achieve frictionless deployments to Kubernetes, you need to templatize your Kubernetes specs and automate your multi-stage build, test and deployment workflow.

## Automating Kubernetes deployments

Next, we will demonstrate how you can easily automate your workflow using Shippable's Assembly Lines. The following Assembly Line features are particularly noteworthy for this scenario:

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
      * [cluster](/platform/workflow/resource/cluster)
* [Jobs](/platform/workflow/job/overview/)
      * [runSh](/platform/workflow/job/runsh)

This example extends the work done in our CI tutorial to [Build and Push a Docker Image to Docker Hub](/ci/tutorial/build-push-image-to-docker-hub) by adding an Assembly Line that deploys the application to GKE.

### Step by step instructions

The following sections explain the process of automating a workflow to continuously deploy an image to Google Kubernetes Engine using `kubectl`. We will demonstrate this with our sample application.

**Source code is available at [devops-recipes/cd_gke_kubectl](https://github.com/devops-recipes/cd_gke_kubectl)**

**Complete YML is at [devops-recipes/cd_gke_kubectl/shippable.yml](https://raw.githubusercontent.com/devops-recipes/cd_gke_kubectl/master/shippable.yml)**

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

The platform is built with "Everything as Code" philosophy, so all configuration is in a YAML-based file called `shippable.yml`, which is parsed to create your Assembly Line workflow.

Detailed documentation on `shippable.yml` is [here](/deploy/configuration).

#####3a. Add empty shippable.yml to your repo

Add an empty config file to the the root of your repo.

#####3b. Add `resources` section of the config

`resources` section holds the information that is necessary to deploy to a Kubernetes cluster. In this case we have 4 resources defined of type `image`, `gitRepo`, `cliConfig` and `cluster`.

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

The Docker image that you want to deploy to GKE should be available as a resource to the Assembly Line.

`sourceName` contains the location of the image and the `versionName` contains the tag. `isPull` is used to configure whether the image is automatically pulled or not.

Detailed info about `image` resource is [here](/platform/workflow/resource/image).

> Note: If you have already implemented optional steps from [Build and Push a Docker Image to Docker Hub](/ci/tutorial/build-push-image-to-docker-hub), then skip this step as you already have the image resource defined.

######ii. `gitRepo` resource named `config_repo`

This resource points to the repository that contains your Kubernetes spec files, so that they are accessible to your Assembly Line. For our example, these files are present in the repository `https://github.com/devops-recipes/cd_gke_kubectl`, namely, [here](https://github.com/devops-recipes/cd_gke_kubectl/tree/master/specs).

Detailed info about `gitRepo` resource is [here](/platform/workflow/resource/gitrepo).

######iii. `cliConfig` resource named `gcp_cli`

To be able to interact with Google Cloud Platform, you need to authenticate your `gcloud` CLI. Shippable does this for you automatically with the `cliConfig` resource.

Detailed info about `cliConfig` resource is [here](/platform/workflow/resource/cliconfig).

######iv. `cluster` resource named `gke_cluster`

This resource contains the location of your Kube cluster.

`sourceName` is the name of the GKE cluster and `region` is the region where the cluster is present.

Detailed info about `cluster` resource is [here](/platform/workflow/resource/cluster).

#####3c. Add `jobs` section of the config

A job is an execution unit of the Assembly Line. Our job has to perform three tasks:

* Prep the template Kubernetes deployment and service specs (wildcards APP_LABEL, APP_IMG & APP_TAG) with actual values from input resources. For our sample, here are the specs:
    * [Deployment spec](https://github.com/devops-recipes/cd_gke_kubectl/blob/master/specs/appDeploy.yml)
    * [Service spec](https://github.com/devops-recipes/cd_gke_kubectl/blob/master/specs/appSvc.yml)
* Initialize a connection to the cluster using `gcloud`
* Deploy to the cluster using `kubectl`

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
* The first section of `steps` defines all the input `IN` resources that are required to execute this job. These are the resources we defined in the previous step. The interesting thing to note in this section is that many IN resources have been configured with `switch: off` flag, which means any changes to these resources will not trigger this job automatically. However, when the job does trigger, it will use the latest versions of these resources.
* The `TASK` section contains the commands that are executed when the job runs.
    *  Name of the task is `deploy_app`.
    *  It sets up an environment variable `APP_LABEL` before executing any code. This is required for the Kubernetes service spec.
    *  `script` section contains commands that do the following:
        *  The "Config file prep section" uses Shippable Utility functions to replace all wildcards in the Kubernetes deployment and service specs. The function `get_resource_state` on `config_repo` retrieves the folder where spec files are stored. The `APP_IMG` & `APP_TAG` values are set by fetching them from resource `node_app_img_dh` using `get_resource_version_key`. Next, the `replace` command on `appDeploy.yml` & `appSvc.yml` files replaces wildcards with actual values.
        *  The "Cluster login section" logs you into the actual cluster. Since `gcp_cli` is an `IN` resource, the platform has already authenticated the shell to gcloud and set the default region to `us-west1-a`. Now, we use utility `get_resource_version_key` on resource `gke_cluster` to get the location of the cluster and we use gcloud to authenticate to the kube cluster.
        *  The "App deployment section" runs the deployment commands. The app and service are deleted if they already exist, and the newer version is deployed.

Detailed info about `runSh` job is [here](/platform/workflow/job/runsh).

Detailed info about Shippable Utility functions are [here](/platform/tutorial/workflow/using-shipctl).

#####3d. Push changes to shippable.yml

Commit and push all the above changes to `shippable.yml`.

####4. Add the Assembly Line to your Shippable organization

In Shippable's world, a Subscription maps to an Organization or a Team, depending on the source control provider. An Assembly Line workflow is defined at a Subscription level and all jobs are resources are global to your subscription.

To add your Assembly Line to Shippable, you need to add the repository containing the configuration as a "sync repository" by [following instructions here](/deploy/configuration/#adding-a-syncrepo). This automatically parses your `shippable.yml` config and adds your workflow to Shippable. Your workflow will always be kept in sync with the config in this repository, and be automatically updated every time you push a change to `shippable.yml`.

Your view will look something like this:

<img src="/images/tutorial/continuous-deployment-to-google-kubernetes-engine-kubectl-fig3.png" alt="Assembly Line view">

> Note: This assembly line is incorporating [Build and Push a Docker Image to Docker Hub](/ci/tutorial/build-push-image-to-docker-hub) to dynamically build `app_be_img`, if you are using static image tag, then you will not see the CI section to the left of the image

####5. Run the deploy job `deploy_app_kctl_gke`

You can manually run the job by right clicking on the job or by triggering the CI process to generate a new image tag and deploy that new image to GKE. You should see your app & service deployed to the Kubernetes cluster you created on GCP.

<img src="/images/tutorial/continuous-deployment-to-google-kubernetes-engine-kubectl-fig4.png" alt="Deploy console output">


## Further Reading
* [Build and Push a Docker Image to Docker Hub](/ci/tutorial/build-push-image-to-docker-hub)
* [Working with Integrations](/platform/tutorial/integration/howto-crud-integration/)
* [Defining Resources in shippable.yml](/platform/tutorial/workflow/shippable-yml/#resources-config)
* [Defining Jobs in shippable.yml](/platform/tutorial/workflow/shippable-yml/#jobs-config)
* [Sharing information between Jobs](/platform/tutorial/workflow/sharing-data-between-jobs/)
