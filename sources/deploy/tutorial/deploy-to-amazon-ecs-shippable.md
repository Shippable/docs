main_section: Deploy
sub_section: Deploy to ECS
page_description: Deploying a Dockerized Node.js app to AWS ECS cluster using Shippable managed jobs

# Deploy to Amazon ECS using Shippable managed jobs

This tutorial explains how to continuously deploy a Docker container to Amazon Elastic Container Service using Shippable's managed jobs.

If you want to use AWS native ECS templates and AWS CLI, you should go here....[]()

The idea behind Shippable's managed jobs is to use generic definitions that will create the ECS specs at runtime automatically. One of the main advantages of this is that you are not tighltly coupled to the Orchestraction service. For e.g. the same definitions can be used to deploy to Kubernetes also, without changing any of the pipeline code

This document assumes you're familiar with the following concepts:

* [Getting Started with AWS ECS](https://aws.amazon.com/ecs/getting-started/)
* [Docker Getting Started](https://docs.docker.com/v17.09/get-started/part1/)


If you're unfamiliar with Docker or AWS ECS, you should start with learning how to deploy Docker containers manually. Refer to our blog for a step-by-step tutorial: [Deploy a Docker container to ECS using AWS CLI](http://blog.shippable.com/deploy-docker-container-to-ecs-using-aws-cli).

There are many challenges with manually doing Docker deployments. In short, you will struggle with making your ECS specs reusable and injecting the right values for wildcards at runtime, and managing security and accounts on the machine used to run the deployments. Also, if you have dependent workflows, you will have to manually go trigger each one.

If you want to achieve frictionless Docker deployments with modular, reusable specs, you need to templatize your specs and automate the workflow used to execute them.

## Automating ECS deployments

You can easily automate your workflow using Shippable's Assembly Lines. The following Assembly Line features are particularly noteworthy for this scenario:

* Creating an event-driven workflow that automates the entire software delivery lifecycle
* Securing workflow jobs with RBAC and contextually injecting credentials based on who/what is running the deployment job
* Dynamically injecting wildcard values in template spec files, depending on the state of the workflow
* Visualize your workflow and it's current status in a graphical view

To jump into this tutorial, you will need to familiarize yourself with a few platform concepts.

### Concepts

* [Workflow overview](/platform/workflow/overview/)
* [Integrations](/platform/integration/overview/)
  * [AWS](/platform/integration/aws-keys)
  * [Docker Registry](/platform/integration/dockerRegistryLogin)
* [Resources](/platform/workflow/resource/overview/)
  * [image](/platform/workflow/resource/image)
  * [cluster](/platform/workflow/resource/cluster)
  * [dockerOptions](/platform/workflow/resource/dockerOptions)
* [Jobs](/platform/workflow/job/overview/)
  * [manifest](/platform/workflow/job/manifest)
  * [deploy](/platform/workflow/job/deploy)

This example extends the work done in our CI tutorial to [Build and Push a Docker Image to Docker Hub](/ci/tutorial/build-push-image-to-docker-hub) by adding an Assembly Line that deploys the application to AWS ECS. The output of this is a docker image resouce `node_app_img_dh` which is what we deploy to ECS

It also extends the work done in our Provisioning tutorial to [Provision AWS ECS Cluster using Terraform](/provision/tutorial/provision-aws-ecs-terraform). The output of this tutorial is a cluster resource called `aws_ecs_cluster` which is used in the deploy job. 

### Step by step instructions

The following sections explain the process of automating a workflow to continuously deploy an app to AWS ECS using Shippable managed jobs. We will demonstrate this with our sample application.

**Source code is available at [devops-recipes/cd_ecs_ship](https://github.com/devops-recipes/cd_ecs_ship)**

**Complete YML is at [devops-recipes/cd_ecs_ship/shippable.yml](https://raw.githubusercontent.com/devops-recipes/cd_ecs_ship/master/shippable.yml)**

####1. Author Assembly Line configuration

The platform is built with "Everything as Code" philosophy, so all configuration is in a YAML-based file called **shippable.yml**, which is parsed to create your Assembly Line workflow.

Detailed documentation on **shippable.yml** is [here](/deploy/configuration).

#####3a. Add empty shippable.yml to your repo

Add an empty **shippable.yml** file to the the root of repository.

#####3b. Add `resources` section of the config

`resources` section holds the information that is necessary to deploy to a Kubernetes cluster. In this case we have 4 resources defined of type `dockerOptions`, `replicas`, and `params`.

Add the following to your `shippable.yml`:

```
resources:
  - name: cd_ecs_docker_opts
    type: dockerOptions
    versionTemplate:
      linuxParameters:
        initProcessEnabled: true
      memory: 100
      portMappings:
        - 80:80

  - name: cd_ecs_env
    type: params
    version:
      params:
        ENVIRONMENT: "test"

# resources from other tutorials used here to build end to end assembly lines
# node_app_img_dh # defined here https://github.com/devops-recipes/node_app/blob/master/shippable.yml
# aws_ecs_cluster # defined here https://github.com/devops-recipes/prov_aws_ecs_terraform/blob/master/shippable.yml
```

######i.`dockerOptions` resource named `cd_ecs_docker_opts`

All the Docker settings that your application requires need to be available as a resource to the Assembly Line. In this example, we using a very small subset of the settings (memory, ports etc.)

Detailed info about `dockerOptions` resource is [here](/platform/workflow/resource/dockeroptions).

######ii. params resource named `cd_ecs_env `

If additional environment variables need to be set into the app, we can use the params resource to supply them. 

Detailed info about `params` resource is [here](/platform/workflow/resource/params).

######iii.`image` resource named `node_app_img_dh`

The Docker image that you want to deploy to ECS should be available as a resource to the Assembly Line. In this example, this resource was created [here](https://github.com/devops-recipes/node_app/blob/master/shippable.yml). You can hard code it here if you do not wannt to automate the creation of the image

`sourceName` contains the location of the image and the `versionName` contains the tag. 

Detailed info about `image` resource is [here](/platform/workflow/resource/image).

######iv. `cluster` resource named `aws_ecs_cluster`

This resource contains the location of your ECS cluster. In this example, this resource was created [here](https://github.com/devops-recipes/prov_aws_ecs_terraform/blob/master/shippable.yml). You can hard code it here if you do not wannt to automate the creation of the cluster

`sourceName` is the name of the GKE cluster and `region` is the region where the cluster is present.

Detailed info about `cluster` resource is [here](/platform/workflow/resource/cluster).

#####3c. Add `jobs` section of the config

A job is an execution unit of the Assembly Line. There are 2 things that we need to accomplish:

* Create a manifest that defines your application using the `manifest` job
* Deploy the manifest into ECS using `deploy` job

Add the following to your `shippable.yml`:

```
jobs:
  - name: cd_ecs_manifest
    type: manifest
    steps:
     - IN: node_app_img_dh # defined here https://github.com/devops-recipes/node_app/blob/master/shippable.yml
     - IN: cd_ecs_docker_opts
     - IN: cd_ecs_env

  - name: cd_ecs_deploy
    type: deploy
    steps:
      - IN: cd_ecs_manifest
      - IN: aws_ecs_cluster # defined here https://github.com/devops-recipes/prov_aws_ecs_terraform/blob/master/shippable.yml
      - TASK: managed
        deployMethod: replace
```

* Adding the above config to the jobs section of shippable.yml will create 2 jobs

* The first job `cd_ecs_manifest` is used to create a template/manifest of your application definition
  * The `steps` section  defines all the input `IN` resources that are required to execute this job
    * `node_app_img_dh` is an **image** resource that will be deployed
    * `cd_ecs_env` binds the env vars to the deployed app
  * Since this is a managed job, TASK section is not required and the platform creates the manifest automatically

* The second job `cd_ecs_deploy` is the jobs that deploys the container to ECS
  * The `steps` section  defines all the input `IN` resources that are required to execute this job
    * `cd_ecs_manifest` is the manifest that is created from previous job
    * `aws_ecs_cluster` contains the cluster and the keys to connect to the ECS cluster
  * For this job, we want to replace the service with a new version. Hence the deployMethod is set to replace. For all the supported deployment methods, refer to detailed docs

Detailed info about `manifest` job is [here](/platform/workflow/job/manifest).
Detailed info about `deploy` job is [here](/platform/workflow/job/deploy).

#####3d. Push changes to shippable.yml

Commit and push all the above changes to `shippable.yml`.

####4. Add the Assembly Line to your Shippable organization

In Shippable's world, a Subscription maps to an Organization or a Team, depending on the source control provider. An Assembly Line workflow is defined at a Subscription level and all jobs are resources are global to your subscription.

To add your Assembly Line to Shippable, you need to add the repository containing the configuration as a "sync repository" by [following instructions here](/deploy/configuration/#adding-a-syncrepo). This automatically parses your `shippable.yml` config and adds your workflow to Shippable. Your workflow will always be kept in sync with the config in this repository, and be automatically updated every time you push a change to `shippable.yml`.

Your view will look something like this:

<img src="/images/tutorial/deploy-to-amazon-ecs-shippable-fig1.png" alt="Assembly Line view">

> Note: This assembly line is incorporating [Build and Push a Docker Image to Docker Hub](/ci/tutorial/build-push-image-to-docker-hub) to dynamically build `app_be_img`, if you are using static image tag, then you will not see the CI section to the left of the image

####5. Run the deploy job `cd_ecs_manifest`

You can manually run the job by right clicking on the job or by triggering the job to generate a new manifest. This should then trigger the deploy job which will deploy the app to AWS ECS. You can verify it by going to AWS web console

<img src="/images/tutorial/deploy-to-amazon-ecs-shippable-fig2.png" alt="Deploy console output">

<img src="/images/tutorial/deploy-to-amazon-ecs-shippable-fig3.png" alt="Deploy console output">

## Further Reading
* [Build and Push a Docker Image to Docker Hub](/ci/tutorial/build-push-image-to-docker-hub)
* [Working with Integrations](/platform/tutorial/integration/howto-crud-integration/)
* [Defining Resources in shippable.yml](/platform/tutorial/workflow/shippable-yml/#resources-config)
* [Defining Jobs in shippable.yml](/platform/tutorial/workflow/shippable-yml/#jobs-config)
* [Sharing information between Jobs](/platform/tutorial/workflow/sharing-data-between-jobs/)
