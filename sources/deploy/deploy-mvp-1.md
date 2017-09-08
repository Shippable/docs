page_main_title: Continuous Deployment (CD) of a single container application to a container orchestration platform.
main_section: Deploy
sub_section: CD to Orchestration Platforms

# Continuous Deployment (CD) of a single container application to a container orchestration platform.

A single container application could be an web application, API endpoint or a micro-service or any component that is packaged as a docker image. This page describes how you can use the [Shippable assembly lines platform](/platform/overview/) to deploy a single container application to a container orchestration service like Amazon ECS, Kubernetes, GKE or Azure.

We assume that the application is already packaged as a docker image and available in a Docker registry that Shippable supports. If you want to know how to build, test and push a docker image through CI to a docker registry, go [here](/ci/enable-project/).

This document covers the following topics -
* Service definition of your application.
* Defining the orchestration platform.
* Defining the location of the image and credentials of the Docker registry.
* Configuring docker options.
* Setting environment variables for your application.
* Scaling your application.

<DIAGRAM>

These are the key components of the diagram -

**Resources**

* `orchestration_platform` is a resource of type [cluster](/platform/workflow/resource/cluster/) resource that represents the orchestration system where the application is deployed to.
* `app_image` is a resource of type [image](/platform/workflow/resource/image/) that represents the docker image of the application.
* `app_options` is a resource of type [dockerOptions](/platform/workflow/resource/dockeroptions/#dockeroptions)
that represents the docker options of the application.
* `app_environment` is a resource of type [params](/platform/workflow/resource/params) that stores key-value pairs that are set as environment variables for consumption by the application.
* `app_replicas` is a resource of type [replicas](/platform/workflow/resource/replicas) that that specifies the number of instances of the container to deploy.

Resources are defined in your [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/) file, that should be created at the root of your repository. Please find an overview of resources [here](/platform/workflow/resource/overview/).

**Jobs**

* `app_service_definition` is a job of type [manifest](/platform/workflow/job/manifest) used to create a service definition of a deployable unit of your application, encompassing the image, options and environment that is versioned and immutable.
* `app_deploy_job` is a job of type [deploy](/platform/workflow/job/deploy) which deploys a [manifest](/platform/workflow/job/manifest/)  to a [cluster](/platform/workflow/resource/cluster/).

Jobs are defined in your [shippable.jobs.yml](/platform/tutorial/workflow/shippable-jobs-yml/) file, that should be created at the root of your repository. Please find an overview of jobs [here](/platform/workflow/job/overview/).


**Now, lets go step by step and put all these pieces together.**

##1. Define the orchestration platform resource.

```
resources:

  - name: orchestration_platform    # resource friendly name
    type: cluster
    integration: op_integration  # replace with actual integration name          
    pointer:
      sourceName: "cluster_name" # name of the actual cluster in the orchestration service to which we are deploying
      region: "svc_region" # region where cluster is located. This attribute is optional, depending on the orchestration service.
```
Resources are defined in your [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/) file.

###2. Create the orchestration platform account integration.

The following container orchestration platforms are supported as endpoints:

- [Amazone ECS](/platform/integration/amazon-ecs)
- [Kubernetes](/platform/integration/kubernetes)
- [Google Container Engine](/platform/integration/gke)
- [Azure Container Service](/platform/integration/azure-dcos)
- [Azure DC/OS](/platform/integration/azure-dcos)
- [Docker Cloud](/platform/integration/docker-cloud)
- [Docker Datacenter](/platform/integration/docker-datacenter)

You will create an account integration using your Shippable account for the orchestration platform.
Instructions to create an integration can be found [here](http://docs.shippable.com/platform/tutorial/integration/howto-crud-integration/). Remember the integration
friendly name as this name will be used in one of the steps below.

##3. Define the application docker image.
Add the following yml block to your [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/) file.

```
  - name: app_image          # resource friendly name
    type: image
    integration: image_integration  # replace with actual integration name          
    pointer:
      sourceName:  <specify the complete path of your docker image here hosted on a supported docker registry>
      # This is an image pointer, for example this would be 679404489841.dkr.ecr.us-east-1.amazonaws.com/deploy-ecs-basic for ECR.
    seed:
      versionName: "1.12.0"  #Tag of this image.
```

###4. Create the application docker image account integration.

This integration configures the credentials needed to access the public or private registry that contains the docker image of the application to be deployed.  

The following docker registries are supported:

- [AWS ECR](/platform/integration/aws-ecr)
- [Docker Hub](/platform/integration/docker-hub)
- [Docker Trusted Registry](/platform/integration/docker-trusted-registry)
- [Docker Private Registry](/platform/integration/docker-private-registry)
- [Quay](/platform/integration/quay)
- [JFrog](/platform/integration/jfrog-artifactory)

You will create an account integration using your Shippable account for the docker registry.
Instructions to create an integration can be found [here](http://docs.shippable.com/platform/tutorial/integration/howto-crud-integration/). Remember the integration
friendly name as this name will be used in one of the steps below.

##5. Configure the docker options of the application.
Add the following yml block to your [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/) file.
```
- name: app_options
  type: dockerOptions
  version:
    memory: 1024
    portMappings:
      - 80:80
```
We set the memory allocated to 1024MB and expose port 80.

##6. Set the environment variables for the application.
Add the following yml block to your [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/) file.
```
- name: app_environment
  type: params
  version:
    params:
      ENVIRONMENT: "prod"
```
Here we set an environment variable called `ENVIRONMENT`.

##7. Scale the application.
```
  - name: app_replicas
    type: replicas
    version:
      count: 2
```
We scale the application to 2 replicas.

##8. Create the service definition of the application.
```
jobs:

- name: app_service_definition
  type: manifest
  steps:
   - IN: app_image
   - IN: app_options
   - IN: app_environment
   - IN: app_replicas
```

##9. Define the deploy job.
```
jobs:

  - name: app_deploy_job
    type: deploy
    steps:
      - IN: app_service_definition
      - IN: orchestration_platform
```

###10. Import the configuration into your Shippable account to create the assembly line for the application.

Once you have these jobs and resources yml files as described above, commit them to your repository. You can then follow instructions to [add your assembly line to Shippable](/platform/tutorial/workflow/crud-syncrepo/).

###11. Trigger your pipeline

When you're ready for deployment, right-click on the manifest job in the [SPOG View](/platform/visibility/single-pane-of-glass-spog/), and select **Run Job**.

## Sample project

Here are some links to a working sample of this scenario. This is a simple Node.js application that runs some tests and then pushes
the image to Amazon ECR. It also contains all of the pipelines configuration files for deploying to Amazon ECS.

**Source code:**  [devops-recipes/deploy-ecs-basic](https://github.com/devops-recipes/deploy-ecs-basic)

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
