main_section: Deploy
sub_section: Deploy to GKE
page_description: Deploying a Dockerized Node.js app to GCP GKE cluster using Shippable managed jobs

# Deploy to Google GKE using Shippable managed jobs

This tutorial explains how to continuously deploy a Docker container to Google Kubernetes Engine using Shippable's managed jobs.

If you want to use `kubectl` templates, you should go here....[Deploying to Google Kubernetes Engine (GKE) using kubectl](/deploy/tutorial/deploy-to-gcp-gke-kubectl)

The idea behind Shippable's managed jobs is to use generic definitions that will create the GKE specs at runtime automatically. One of the main advantages of this is that you are not tighltly coupled to the Orchestraction service. For e.g. the same definitions can be used to deploy to ECS also, without changing any of the pipeline code

This document assumes you're familiar with the following concepts:

* [Kubernetes Intro](https://kubernetes.io/docs/user-journeys/users/application-developer/foundational/)
* [Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine)
* [Docker Getting Started](https://docs.docker.com/v17.09/get-started/part1/)

If you're unfamiliar with Docker or GKE, you should start with learning how to deploy Docker containers manually. Refer to our blog for a step-by-step tutorial: [Deploy a Docker container to GKE using kubectl](http://blog.shippable.com/deploy-docker-container-to-gke-using-kubectl).

There are many challenges with manually doing Docker deployments. In short, you will struggle with making your kubectl specs reusable and injecting the right values for wildcards at runtime, and managing security and accounts on the machine used to run the deployments. Also, if you have dependent workflows, you will have to manually go trigger each one.

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
* [Resources](/platform/workflow/resource/overview/)
  * [image](/platform/workflow/resource/image)
  * [cluster](/platform/workflow/resource/cluster)
  * [params](/platform/workflow/resource/params)
  * [dockerOptions](/platform/workflow/resource/dockerOptions)
* [Jobs](/platform/workflow/job/overview/)
  * [manifest](/platform/workflow/job/manifest)
  * [deploy](/platform/workflow/job/deploy)

This example extends the work done in our CI tutorial to [Build and Push a Docker Image to Docker Hub](/ci/tutorial/build-push-image-to-docker-hub) by adding an Assembly Line that deploys the application to GCP GKE. The output of this is a docker image resouce `node_app_img_dh` which is what we deploy to GKE

It also extends the work done in our Provisioning tutorial to [Provision GCP GKE using gcloud](/provision/tutorial/provision-gcp-gke-gcloud). The output of this tutorial is a cluster resource called `gcp_gke_cluster` which is used in the deploy job. 

### Step by step instructions

The following sections explain the process of automating a workflow to continuously deploy an app to GCP GKE using Shippable managed jobs. We will demonstrate this with our sample application.

**Source code is available at [devops-recipes/cd_gke_ship](https://github.com/devops-recipes/cd_gke_ship)**

**Complete YML is at [devops-recipes/cd_gke_ship/shippable.yml](https://raw.githubusercontent.com/devops-recipes/cd_gke_ship/master/shippable.yml)**

####1. Author Assembly Line configuration

The platform is built with "Everything as Code" philosophy, so all configuration is in a YAML-based file called **shippable.yml**, which is parsed to create your Assembly Line workflow.

Detailed documentation on **shippable.yml** is [here](/deploy/configuration).

#####3a. Add empty shippable.yml to your repo

Add an empty **shippable.yml** file to the the root of repository.

#####3b. Add `resources` section of the config

`resources` section holds the information that is necessary to deploy to a Kubernetes cluster. In this case we have 2 resources defined of type `dockerOptions` and `params`.

Add the following to your `shippable.yml`:

```
resources:
  - name: cd_gke_docker_opts
    type: dockerOptions
    versionTemplate:
      workingDir: "/tmp"
      memory: 100
      portMappings:
        - 80:80

  - name: cd_gke_env
    type: params
    version:
      params:
        ENVIRONMENT: "test"

# resources from other tutorials used here to build end to end assembly lines
# node_app_img_dh # defined here https://github.com/devops-recipes/node_app/blob/master/shippable.yml
# gcp__cluster # defined here https://github.com/devops-recipes/prov_gcp_gke_gcloud/blob/master/shippable.yml
```

######i.`dockerOptions` resource named `cd_gke_docker_opts`

All the Docker settings that your application requires need to be available as a resource to the Assembly Line. In this example, we using a very small subset of the settings (memory, ports etc.)

Detailed info about `dockerOptions` resource is [here](/platform/workflow/resource/dockeroptions).

######ii. params resource named `cd_gke_env `

If additional environment variables need to be set into the app, we can use the params resource to supply them. 

Detailed info about `params` resource is [here](/platform/workflow/resource/params).

######iii.`image` resource named `node_app_img_dh`

The Docker image that you want to deploy to GKE should be available as a resource to the Assembly Line. In this example, this resource was created [here](https://github.com/devops-recipes/node_app/blob/master/shippable.yml). You can hard code it here if you do not wannt to automate the creation of the image

`sourceName` contains the location of the image and the `versionName` contains the tag. 

Detailed info about `image` resource is [here](/platform/workflow/resource/image).

######iv. `cluster` resource named `gcp_gke_cluster`

This resource contains the location of your GKE cluster. In this example, this resource was created [here](https://github.com/devops-recipes/prov_gcp_gke_gcloud/blob/master/shippable.yml). You can hard code it here if you do not wannt to automate the creation of the cluster

`sourceName` is the name of the GKE cluster and `region` is the region where the cluster is present.

Detailed info about `cluster` resource is [here](/platform/workflow/resource/cluster).

#####3c. Add `jobs` section of the config

A job is an execution unit of the Assembly Line. There are 2 things that we need to accomplish:

* Create a manifest that defines your application using the `manifest` job
* Deploy the manifest into GKE using `deploy` job

Add the following to your `shippable.yml`:

```
jobs:
  - name: cd_gke_manifest
    type: manifest
    steps:
     - IN: node_app_img_dh # defined here https://github.com/devops-recipes/node_app/blob/master/shippable.yml
     - IN: cd_gke_docker_opts
     - IN: cd_gke_env

  - name: cd_gke_deploy
    type: deploy
    steps:
      - IN: cd_gke_manifest
      - IN: gcp_gke_cluster # defined here https://github.com/devops-recipes/prov_gcp_gke_gcloud/blob/master/shippable.yml
      - TASK: managed
        deployMethod: replace
```

* Adding the above config to the jobs section of shippable.yml will create 2 jobs

* The first job `cd_gke_manifest` is used to create a template/manifest of your application definition
  * The `steps` section  defines all the input `IN` resources that are required to execute this job
    * `node_app_img_dh` is an **image** resource that will be deployed
    * `cd_gke_env` binds the env vars to the deployed app
  * Since this is a managed job, TASK section is not required and the platform creates the manifest automatically

* The second job `cd_gke_deploy` is the jobs that deploys the container to GKE
  * The `steps` section  defines all the input `IN` resources that are required to execute this job
    * `cd_gke_manifest` is the manifest that is created from previous job
    * `gcp_gke_cluster` contains the cluster and the keys to connect to the GKE cluster
  * For this job, we want to replace the service with a new version. Hence the deployMethod is set to replace. For all the supported deployment methods, refer to detailed docs

Detailed info about `manifest` job is [here](/platform/workflow/job/manifest).
Detailed info about `deploy` job is [here](/platform/workflow/job/deploy).

#####3d. Push changes to shippable.yml

Commit and push all the above changes to `shippable.yml`.

####4. Add the Assembly Line to your Shippable organization

In Shippable's world, a Subscription maps to an Organization or a Team, depending on the source control provider. An Assembly Line workflow is defined at a Subscription level and all jobs are resources are global to your subscription.

To add your Assembly Line to Shippable, you need to add the repository containing the configuration as a "sync repository" by [following instructions here](/deploy/configuration/#adding-a-syncrepo). This automatically parses your `shippable.yml` config and adds your workflow to Shippable. Your workflow will always be kept in sync with the config in this repository, and be automatically updated every time you push a change to `shippable.yml`.

Your view will look something like this:

<img src="/images/tutorial/deploy-to-gcp-gke-shippable-fig1.png" alt="Assembly Line view">

> Note: This assembly line is incorporating [Build and Push a Docker Image to Docker Hub](/ci/tutorial/build-push-image-to-docker-hub) to dynamically build `app_be_img`, if you are using static image tag, then you will not see the CI section to the left of the image

####5. Run the deploy job `cd_gke_manifest`

You can manually run the job by right clicking on the job or by triggering the job to generate a new manifest. This should then trigger the deploy job which will deploy the app to GCP GKE. You can verify it by going to GCP web console

<img src="/images/tutorial/deploy-to-gcp-gke-shippable-fig2.png" alt="Deploy console output">

<img src="/images/tutorial/deploy-to-gcp-gke-shippable-fig3.png" alt="Deploy console output">

## Further Reading
* [Build and Push a Docker Image to Docker Hub](/ci/tutorial/build-push-image-to-docker-hub)
* [Working with Integrations](/platform/tutorial/integration/howto-crud-integration/)
* [Defining Resources in shippable.yml](/platform/tutorial/workflow/shippable-yml/#resources-config)
* [Defining Jobs in shippable.yml](/platform/tutorial/workflow/shippable-yml/#jobs-config)
* [Sharing information between Jobs](/platform/tutorial/workflow/share-info-across-jobs/)
