page_description: Deploying a Dockerized Node.js app to GKE with kubectl
main_section: Deploy
sub_section: Kubernetes

# Deploy to Google Kubernetes Engine using kubectl

This tutorial explains how to continuously deploy a Docker container to Google Kubernetes Engine using native `kubectl` commands.

This document assumes you're familiar with the following concepts:

* [GCloud and it's SDK](https://cloud.google.com/sdk/gcloud/)
* [Docker Getting Started](https://docs.docker.com/v17.09/get-started/part1/)
* [Kubernetes Intro](https://kubernetes.io/docs/user-journeys/users/application-developer/foundational/)
* [Kubernetes Deployment Spec](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.10/#deployment-v1-apps)
* [Kubernetes Services Spec](https://kubernetes.io/docs/concepts/services-networking/service/)
* [kubectl command](https://kubernetes.io/docs/reference/kubectl/overview/)

If you're unfamiliar with Docker or kubectl, you should start with learning how to deploy Docker containers manually. Refer to our blog for a step-by-step tutorial: [Deploy a Docker container to GKE using kubectl](http://blog.shippable.com/deploy-docker-container-to-gke-using-kubectl).

There are many challenges with manually doing Docker deployments. In short, you will struggle with making your Kubernetes specs reusable and injecting the right values for wildcards at runtime, and managing security and accounts on the machine used to run the deployments. Also, if you have dependent workflows, you will have to manually go trigger each one.

If you want to achieve frictionless Docker deployments with modular, reusable specs, you need to templatize your specs and automate the workflow used to execute them.

## Automating GKE deployments

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

Add the following to your `shippable.yml`:

```
jobs:
  - name: deploy_app_kctl_gke
    type: runSh
    steps:
      # The node_app_img_dh image resource is defined in the CI tutorial which pushed this image to Docker Hub: http://docs.shippable.com/ci/tutorial/build-push-image-to-docker-hub
      # If you have not followed that tutorial, please delete this resource
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
                # Uncomment and replace values with hardcoded values if you deleted the node_app_img_dh resource  
                # - APP_IMG: "image name"
                # - APP_TAG: "image tag"                
          script:
            # Config file prep section
            - pushd $(shipctl get_resource_state "config_repo")
            - cd specs

            # Delete the 2 lines below if you deleted the node_app_img_dh resource     
            - export APP_IMG=$(shipctl get_resource_version_key node_app_img_dh sourceName)
            - export APP_TAG=$(shipctl get_resource_version_key node_app_img_dh versionName)

            # Replace wildcards in spec
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

* Adding the above config to the jobs section of shippable.yml will create a `runSh` job called `deploy_app_kctl_kube`.

* The first section of `steps` defines all the input `IN` resources that are required to execute this job.
  * Kubernetes spec files are version controlled in a repo represented by `cd_k8s_repo`.
  * Credentials to connect to Cluster are in `cd_k8s_kube_config`. This resource has `switch: off` flag which means any changes to it will not trigger this job automatically
  * `node_app_img_dh` is an **image** resource that comes from another tutorial [which explains how to build and push a Docker image](/ci/tutorial/build-push-image-to-docker-hub) and contains the image name and tag in `sourceName & versionName ` fields, which are required by this job. If you already have this and just want to use this tutorial to deploy, just delete this resource and hardcode the values APP_IMG and APP_TAG in the **TASK.runtime.options.env** section.
* The `TASK` section contains actual code that is executed when the job runs. We have just one task named `deploy_app` which does the following:
  * First, we define environment variables required by the scripts-
    * `APP_LABEL` which is the label we use to the tie the service and the app
  *  `script` section has a list of commands to execute sequentially.
    * First, we use the Shippable utility function `get_resource_state` to go to the folder where scripts are stored
    * Next, we extract the image info and set APP_IMG and APP_TAG from the `node_app_img_dh` resource, again using shipctl functions
    * Next, we replace all wildcards in appDeploy.yml appSvc.yml files
    * Last, we execute kubectl commands to create the app and the service



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

<img src="/images/tutorial/deploy-to-google-kubernetes-engine-kubectl-fig1.png" alt="Assembly Line view">

> Note: This assembly line is incorporating [Build and Push a Docker Image to Docker Hub](/ci/tutorial/build-push-image-to-docker-hub) to dynamically build `app_be_img`, if you are using static image tag, then you will not see the CI section to the left of the image

####5. Run the deploy job `deploy_app_kctl_gke`

You can manually run the job by right clicking on the job or by triggering the CI process to generate a new image tag and deploy that new image to GKE. You should see your app & service deployed to the Kubernetes cluster you created on GCP.

<img src="/images/tutorial/deploy-to-google-kubernetes-engine-kubectl-fig2.png" alt="Deploy console output">

## Further Reading
* [Build and Push a Docker Image to Docker Hub](/ci/tutorial/build-push-image-to-docker-hub)
* [Working with Integrations](/platform/tutorial/integration/howto-crud-integration/)
* [Defining Resources in shippable.yml](/platform/tutorial/workflow/shippable-yml/#resources-config)
* [Defining Jobs in shippable.yml](/platform/tutorial/workflow/shippable-yml/#jobs-config)
* [Sharing information between Jobs](/platform/tutorial/workflow/sharing-data-between-jobs/)
