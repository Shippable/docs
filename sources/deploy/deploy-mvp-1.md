page_main_title: CD of a single container application to a container orchestration platform.
main_section: Deploy
sub_section: CD to Orchestration Platforms

# Continuous Deployment (CD) of a single container application to a container orchestration platform.

A single container application could be a web application, API endpoint or a micro-service or any application component that is packaged as a docker image. This page describes how you can use the [Shippable assembly lines platform](/platform/overview/) to deploy such a single container application to a container orchestration service like Amazon ECS, Kubernetes, GKE or Azure.

## Assumptions

We assume that the application is already packaged as a docker image and available in a Docker registry that Shippable supports. If you want to know how to build, test and push a docker image through CI to a docker registry, go [here](/ci/enable-project/).

## Topics Covered

* Specifying the docker image of the application.
* Setting the Docker registry and specifying its credentials
* Setting the orchestration platform and specifying its credentials.
* Configuring application options for the orchestration platform and the container.
* Setting the environment variables for your application.
* Scaling your application.
* Service definition of your application.
* Deploying the application.

## DevOps Assembly Line

<img src="/images/deploy/usecases/deploy_mvp_1.png" alt="Triggering deployments" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

These are the key components of the assembly line diagram -

**Resources**

* `orchestration_platform` is a resource of type [cluster](/platform/workflow/resource/cluster/) that represents the orchestration platform where the application is deployed to.
* `app_image` is a resource of type [image](/platform/workflow/resource/image/) that represents the docker image of the application.
* `app_options` is a resource of type [dockerOptions](/platform/workflow/resource/dockeroptions/#dockeroptions)
that represents the docker options of the application.
* `app_environment` is a resource of type [params](/platform/workflow/resource/params) that stores key-value pairs that are set as environment variables for consumption by the application.
* `app_replicas` is a resource of type [replicas](/platform/workflow/resource/replicas) that specifies the number of instances of the container to deploy.

Resources are defined in your [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/) file, that should be created at the root of your repository. Please find an overview of resources [here](/platform/workflow/resource/overview/).

**Jobs**

* `app_service_definition` is a job of type [manifest](/platform/workflow/job/manifest) used to create a service definition of a deployable unit of your application, encompassing the image, options and environment that is versioned and immutable.
* `app_deploy_job` is a job of type [deploy](/platform/workflow/job/deploy) which deploys a [manifest](/platform/workflow/job/manifest/)  to a [cluster](/platform/workflow/resource/cluster/).

Jobs are defined in your [shippable.jobs.yml](/platform/tutorial/workflow/shippable-jobs-yml/) file, that should be created at the root of your repository. Please find an overview of jobs [here](/platform/workflow/job/overview/).

**Now, lets go step by step and put all these pieces together.**

##1. Setting the application docker image.
Add the following yml block to your [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/) file.

```
resources:
  - name: app_image # resource friendly name
    type: image
    integration: docker_registry_integration           
    pointer:
      sourceName:  <specify the complete path of your docker image here hosted on a supported docker registry>
      # This is an image pointer, for example this would be 679404489841.dkr.ecr.us-east-1.amazonaws.com/deploy-ecs-basic for ECR.
    seed:
      versionName: "1.12.0"  #Tag of this image.
```

##2. Configure the Docker registry and its credentials.

The list of supported Docker registries can be found [here](/platform/integration/overview/#supported-docker-registry-integrations).

**Steps**  

- Create an account integration using your Shippable account for the docker registry.
Instructions to create an integration can be found [here](http://docs.shippable.com/platform/tutorial/integration/howto-crud-integration/).

- Set the friendly name of the integration as `docker_registry_integration`. If you change the name,
please change change it also in step 1.

##3. Setting the orchestration platform cluster.
Add the following yml block to your [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/) file.

```
  - name: op_cluster    # resource friendly name
    type: cluster
    integration: op_int  # replace with actual integration name          
    pointer:
      sourceName: "cluster_name" # name of the actual cluster in the orchestration service to which we are deploying
      region: "svc_region" # region where cluster is located. This attribute is optional, depending on the orchestration service.
```

##4. Configuring the orchestration platform and its credentials.
The list of supported container orchestration platforms can be found [here](/platform/integration/overview/#supported-orchestration-platform-integrations).

**Steps**  

- Create an account integration using your Shippable account for the orchestration platform.
Instructions to create an integration can be found [here](http://docs.shippable.com/platform/tutorial/integration/howto-crud-integration/).

- Set the friendly name of the integration as `op_int`. If you change the name,
please change change it also in step 3.

##5. Configuring application options for the orchestration platform and the container.
Add the following yml block to your [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/) file.

```
- name: app_options
  type: dockerOptions
  version:
    memory: 1024
    portMappings:
      - 80:80
```
As an example, here we have set the memory allocated to 1024MB and expose port 80.

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
Add the following yml block to your [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/) file.

```
  - name: app_replicas
    type: replicas
    version:
      count: 2
```
We scale the application to 2 replicas.

##8. Create the service definition of the application.
Add the following yml block to your [shippable.jobs.yml](/platform/tutorial/workflow/shippable-jobs-yml/) file.

```
jobs:

- name: app_service_def
  type: manifest
  steps:
   - IN: app_image
   - IN: app_options
   - IN: app_environment
   - IN: app_replicas
```

##9. Deploying the application.
Add the following yml block to your [shippable.jobs.yml](/platform/tutorial/workflow/shippable-jobs-yml/) file.

```
jobs:

  - name: app_deploy_job
    type: deploy
    steps:
      - IN: app_service_def
      - IN: op_cluster
```

##10. Import the configuration into your Shippable account to create the assembly line for the application.

Once you have these jobs and resources yml files as described above, commit them to your repository. You can then follow instructions to [add your assembly line to Shippable](/platform/tutorial/workflow/crud-syncrepo/).

##11. Trigger your pipeline

When you're ready for deployment, right-click on the manifest job in the [SPOG View](/platform/visibility/single-pane-of-glass-spog/), and select **Run Job**.

## Sample project

Here are some links to a working sample of this scenario. This is a simple Node.js application that runs some tests and then pushes
the image to Amazon ECR. It also contains all of the pipelines configuration files for deploying to Amazon ECS.

**Source code:**  [devops-recipes/deploy-ecs-basic](https://github.com/devops-recipes/deploy-ecs-basic)

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
