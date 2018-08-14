page_main_title: Continuous Deployment of a single container Docker application to an Orchestration Platform.
main_section: CD
sub_section: Shippable managed deployments
page_title: Continuous Deployment for a single container Docker application
page_description: How to continuously deploy a single container Docker application

# Deploy to a Docker orchestration platform using Shippable managed jobs

This tutorial explains how to continuously deploy a Docker container to a container orchestration platform like Amazon ECS, Kubernetes, GKE, and Azure, using Shippable's managed jobs (`deploy`, `manifest`). The container could be a web application, API endpoint, microservice, or any application component that is packaged as a single Docker image.

Before you start, you should familiarize yourself with the following concepts:

* [Shippable platform overview](/platform/overview/)
* [Docker Getting Started](https://docs.docker.com/v17.09/get-started/part1/)
* Concepts of the container orchestration platform you're deploying to, for example [Kubernetes Intro](https://kubernetes.io/docs/user-journeys/users/application-developer/foundational/)

The main advantages of using Shippable's managed jobs are:

* You can get started very quickly, since you don't have to write any scripts to deploy your application. With managed jobs, you tell us **what** you want to deploy, and all the magic of **how** is handled by Shippable
* Since the service definition is written in Shippable's native format, you can deploy to a different deployment target with just a couple of line changes in YAML

If you have simple deployments that do not have a bunch of custom requirements, managed jobs are the best way to start deploying Docker containers. If you need custom handling, such as running a script as part of the deployment, or automatic rollbacks, you should do [custom deployments](/deploy/custom-deployments-overview) using the `runSh` job, where you can use the cloud-native CLIs/SDKs or other popular tools to script the deployments yourself.

## Concepts

To jump into this tutorial, you will need to familiarize yourself with a few platform concepts. For the sample example, we will deploy the application to GKE, but you can deploy to Amazon ECS or self-hosted Kubernetes just by changing the `cluster` resource.

* [Platform overview](/platform/overview/)
* [Integrations](/platform/integration/overview/)
* [Resources](/platform/workflow/resource/overview/)
    * [image](/platform/workflow/resource/image)
    * [cluster](/platform/workflow/resource/cluster)
* [Jobs](/platform/workflow/job/overview/)
    * [manifest](/platform/workflow/job/manifest)
    * [deploy](/platform/workflow/job/deploy)

We assume that the application is already packaged as a Docker image and available in a Docker registry that [Shippable supports](/platform/integration/overview/#supported-docker-registry-integrations). If you want to first learn how to build and push a Docker image to a registry, please [read this tutorial](/ci/tutorial/build-push-image-to-docker-hub/).

If you're not familiar with Shippable, it is also recommended that you read the [Platform overview doc](/platform/overview/) to understand the overall structure of Shippable's DevOps Assembly Lines platform.

## Step-by-step instructions

We will demonstrate the deployment workflow with our sample application.

**Source code is available at [devops-recipes/cd_docker_platform_ship](https://github.com/devops-recipes/cd_docker_platform_ship)**

**Complete YML is at [devops-recipes/cd_docker_platform_ship/shippable.yml](https://raw.githubusercontent.com/devops-recipes/cd_docker_platform_ship/master/shippable.yml)**

###1. Setup Google Cloud Platform and Kubernetes

If you have already followed the manual steps, you might not need these except for creating a service account.

* [Create a project on GCP](https://cloud.google.com/resource-manager/docs/creating-managing-projects)
* [Create a service account for your project](https://cloud.google.com/compute/docs/access/service-accounts). Download and store the `JSON` security key in a secure place.
* [Create a Kubernetes container cluster](https://cloud.google.com/kubernetes-engine/docs/how-to/creating-a-container-cluster) and note down the name and region. Make sure your service account has **Write** access to this cluster.

If you're not deploying to GKE, you can set up a cluster on the platform of your choice.

###2. Add Integrations

Integrations are used to connect your Shippable workflow with external providers. More information about integrations is [here](/platform/integration/overview/). We will use an integration for GCP for this sample.

####2a. Add `Google Cloud Platform` Integration

To be able to interact with GCP, we need to add the `drship_gcp `integration.

Detailed steps on how to add a Google Cloud Platform Integration are [here](/platform/integration/gcloudKey/). Make sure you name the integration `drship_gcp` since that is the name we're using in our sample automation scripts.

If you're deploying to another orchestration service, please add the following integrations instead:

* Amazon ECS: [AWS Keys](/platform/integration/aws-keys/) or [AWS IAM](/platform/integration/aws-iam/)
* Self-hosted Kubernetes: [Kubernetes](/platform/integration/kubernetes/)

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step.

###3. Author Assembly Line configuration

The platform is built with "Everything as Code" philosophy, so all configuration is in a YAML-based file called **shippable.yml**, which is parsed to create your Assembly Line workflow.

Detailed documentation on **shippable.yml** is [here](/platform/workflow/config/#assembly-lines-config).

####3a. Add empty shippable.yml to your repo

Add an empty **shippable.yml** file to the repository where you want to store the config.

####3b. Add `resources` section of the config

`resources` section holds the information that is necessary to deploy the application, such as cluster and a pointer to the Docker image.

Add the following to your **shippable.yml**:

```
resources:
# required: this points to the image to be deployed, which can be in any supported registry
  - name: cd_docker_platform_image
    type: image
    versionTemplate:
      sourceName: "devopsrecipes/node_app" # replace with your fully qualified image URL
      isPull: false
      versionName: "master.10"

# required: this points to the cluster where you want to deploy, which can be in any supported container orchestration platform
  - name: cd_docker_platform_cluster
    type: cluster
    integration: "drship_gcp"
    versionTemplate:
      sourceName : "cd_docker_platform_ship_cluster"  # replace with your cluster name
      region: "us-central-1f"         # replace with your region
      namespace: "shippable"          # replace with your namespace

##optional: use this resource if you want to specify options for deployed container
  - name: cd_docker_platform_options
    type: dockerOptions
    versionTemplate:
      workingDir: "/tmp"
      memory: 100
      portMappings:
        - 80:80

# optional: use this if you want to set environment in the deployed container
  - name: cd_docker_platform_params
    type: params
    versionTemplate:
      params:
        ENVIRONMENT: "test"

```

#####i.`image` resource named `cd_docker_platform_image`

**cd_docker_platform_image** is an `image` resource that points to the Docker image to be deployed.

`sourceName` contains the location of the image and `versionName` contains the tag. `isPull` is used to configure whether the image is automatically pulled or not. Each time the `versionName` is updated with a new tag, a new version of this resource will be created.

The image in this sample application is public, but if you replace `sourceName` with your own private image, you should read the [Deploying private images](/deploy/deploy-private-images) tutorial to make sure your cluster knows how to authenticate against the private registry.

Detailed info about `image` resource is [here](/platform/workflow/resource/image).

#####ii. `cluster` resource named `cd_docker_platform_cluster`

This resource contains the location of your GKE cluster where you want to deploy the container. Replace the `sourceName` and `region` with the name and region of the cluster you created in Step 1. You will also need to replace the value of `integration` with the name of the integration you created in Step 2a.

Detailed info about `cluster` resource is [here](/platform/workflow/resource/cluster).

#####iii.`dockerOptions` resource named `cd_docker_platform_options`

All the Docker settings that your application requires need to be available as a resource to the Assembly Line. In this example, we are using a very small subset of the settings (memory, ports etc.). This is an **optional** resource.

Detailed info about `dockerOptions` resource is [here](/platform/workflow/resource/dockeroptions). That document also talks about the defaults that are set if this resource isn't specified.

#####iv. params resource named `cd_docker_platform_params `

If additional environment variables need to be set into the app, we can use the `params` resource to supply them. This is an **optional** resource.

Detailed info about `params` resource is [here](/platform/workflow/resource/params).

####3c. Add `jobs` section of the config

A job is an execution unit of the Assembly Line. There are 2 things that we need to accomplish:

* Create a service definition that defines the application/service using the `manifest` job
* Deploy the manifest into GKE using `deploy` job

Add the following to your **shippable.yml**:

```
jobs:
# required: The manifest job is your service definition
  - name: cd_docker_platform_manifest
    type: manifest
    steps:
     - IN: cd_docker_platform_image
     - IN: cd_docker_platform_options
     - IN: cd_docker_platform_params

# required: The deploy job deploys your application as specified in the manifest
  - name: cd_docker_platform_deploy
    type: deploy
    steps:
      - IN: cd_docker_platform_manifest
      - IN: cd_docker_platform_cluster
      - TASK: managed
        deployMethod: replace
```

* Adding the above config to the jobs section of **shippable.yml** will create 2 jobs.

* The first job `cd_docker_platform_manifest` is a [manifest](/platform/workflow/job/manifest) job that creates a template/manifest of your application definition.
    * The `steps` section  defines all the input `IN` resources that are required to execute this job
        * `cd_docker_platform_image` is an **image** resource that will be deployed
        * `cd_docker_platform_options` sets runtime options for the container    
        * `cd_docker_platform_params` binds the env vars to the deployed app
    * Since this is a managed job, `TASK` section is not required and the platform creates the manifest automatically

* The second job `cd_docker_platform_deploy` is a [deploy](/platform/workflow/job/deploy) job that deploys the container to GKE
    * The `steps` section  defines all the input `IN` resources that are required to execute this job
        * `cd_docker_platform_manifest` is the manifest that is created from previous job
        * `cd_docker_platform_cluster` contains the cluster information and keys to connect to the GKE cluster
    * For this job, we want to replace the service with a new version. Hence the `deployMethod` is set to `replace`.

Detailed info about `manifest` job is [here](/platform/workflow/job/manifest).
Detailed info about `deploy` job is [here](/platform/workflow/job/deploy).

#####3d. Push changes to shippable.yml

Commit and push all the above changes to **shippable.yml**.

####4. Add the Assembly Line to your Shippable organization

In Shippable's world, a Subscription maps to an Organization or a Team, depending on the source control provider. An Assembly Line workflow is defined at a Subscription level and all jobs are resources are global to your subscription.

To add your Assembly Line to Shippable, you need to add the repository containing the configuration as a "sync repository" by [following instructions here](/platform/tutorial/workflow/add-assembly-line). This automatically parses your **shippable.yml** config and adds your workflow to Shippable. Your workflow will always be kept in sync with the config in this repository, and be automatically updated every time you push a change to **shippable.yml**.

Your workflow will be similar to this:

<img src="/images/deploy/deploy-docker-apps-fig1.png" alt="Deploy docker application to GKE">

> Note: This assembly line is incorporating [Build and Push a Docker Image to Docker Hub](/ci/tutorial/build-push-image-to-docker-hub) to dynamically build `node_app_img_dh`, if you are using static image tag, then you will not see the CI section to the left of the image

####5. Run the deploy job `cd_docker_platform_manifest`

You can manually run the job by right clicking on the job or by triggering the job to generate a new manifest. This should then trigger the deploy job which will deploy the app to GKE. You can verify it by going to GCP web console:

<img src="/images/tutorial/deploy-to-gcp-gke-shippable-fig2.png" alt="Deploy console output">

<img src="/images/tutorial/deploy-to-gcp-gke-shippable-fig3.png" alt="Deploy console output">

## Connecting CI and Cluster provisioning workflows

* If you want to automate how the Docker image is pushed to Docker Hub, please read our tutorial [Build and Push an image to Docker Hub](http://docs.shippable.com/ci/tutorial/build-push-image-to-docker-hub/). Please note that you will need to make the following changes to this sample once you have that workflow set up:
    * In the **cd_docker_platform_manifest** job, replace the `IN` image resource **cd_docker_platform_image** with **node_app_img_dh**, which is defined in the "Build and Push an image to Docker Hub" tutorial to create a continuous workflow from that tutorial to this.
    * Remove the `image` resource **cd_docker_platform_image** from this sample
After making these changes, you will have a continuous workflow which builds a Docker image of the sample application, pushes it to Docker Hub, and deploys it to GKE. Your workflow will be similar to this:

<img src="/images/deploy/deploy-docker-apps-fig2.png" alt="Deploy docker application to GKE">

* If you want to automate GKE cluster provisioning and connect it to this workflow, please read our tutorial
[Provision GKE Cluster using gcloud SDK](/provision/tutorial/provision-gcp-gke-gcloud/). Please note that you will need to make the following changes to this sample once you have that workflow set up:
    * In the **cd_docker_platform_deploy** job, replace the `IN` cluster resource **cd_docker_platform_cluster** with **gcp_gke_cluster**, which is defined in the "Provision GKE Cluster using gcloud SDK" tutorial. This means this tutorial will deploy to the cluster created in that tutorial.
    * Remove the `cluster` resource **cd_docker_platform_cluster** from this sample
After making these changes, you will have a workflow that provisions a GKE cluster, and then deploys the sample application to that cluster. Your workflow will be similar to this:

<img src="/images/deploy/deploy-docker-apps-fig3.png" alt="Deploy docker application to GKE">

## Additional reading

The scenario shown in this tutorial was very basic. There are many additional things you can configure as part of your deployment, such as setting container options, scaling service instances, inserting approval gates, defining a multi-stage workflow, etc. Please refer to the tutorials below:

- [Deploying private images](/deploy/deploy-private-images)
- [Deploying multiple containers](/deploy/deploy-multiple-containers)
- [Multi-stage deployments](/deploy/multi-stage-deployments)
- [Gated deployments](/deploy/gated-deployments)
- [Specifying deployment methods](/deploy/deployment-methods-overview)
- [Customizing container options](/deploy/tutorial/customizing-container-options)
- [Setting environment variables inside deployed container](/deploy/tutorial/set-environment-deployed-container)
- [Scaling service instances](/deploy/tutorial/scaling-services)
- [Specifying the version to deploy](/deploy/deploying-specific-version)
- [Managing releases with semantic versioning](/release/devops-release-management)
- [Rolling back deployments](/deploy/rollback)
- [Sending notifications upon deployments](/deploy/deployment-notifications)
- [Customizing deployed service names](/deploy/customize-service-names)
- [Pausing deployments](/deploy/pause-deployments)
- [Deleting a deployed service](/deploy/deleting-a-service)
- [Resetting a deploy job](/deploy/amazon-ecs-deploy-reset)
