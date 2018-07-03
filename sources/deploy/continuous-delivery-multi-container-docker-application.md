page_main_title: Deploying a multi container Docker application atomically to a single node of an Orchestration Platform
main_section: CD
sub_section: Deploying containers using Shippable managed jobs
page_title: Continuous Delivery of a multi-container Docker application
page_description: How to continuously deliver a multi-container Docker application in Shippable

# Continuous Delivery of a multi-container Docker application

A multiple container application could be a web application, API endpoint, microservice, or any application component that is packaged as multiple Docker images. This page describes how you can use the [Shippable Assembly Lines platform](/platform/overview/) to deploy such a multiple container application to a Container Orchestration Service like Amazon ECS, Kubernetes, GKE or Azure.

## Assumptions

We assume that all Docker images for the application are already available in a Docker registry that [Shippable supports](/platform/integration/overview/#supported-docker-registry-integrations). If you want to know how to build, test and push a Docker image through CI to a Docker registry, these links will help:

* [Getting started with CI](/ci/why-continuous-integration/)
* [CI configuration](/ci/yml-structure/)
* [Pushing artifacts after CI](/ci/push-artifacts/)
* [Sample application](/getting-started/ci-sample/)

If you're not familiar with Shippable, it is also recommended that you read the [Platform overview doc](/platform/overview/) to understand the overall structure of Shippable's DevOps Assembly Lines platform.

## Topics Covered

You can configure your deployment with Shippable's configuration files in a powerful, flexible YAML based language. The specific `YAML` blocks that need to be authored for each of the topics below are covered in the document. These topics will give you a high level picture of the steps that you will complete to get CD of your application up and running in Shippable.

* Creating a pointer to the Docker images of your application
* Specifying application options for the container
* Specifying application runtime environment variables
* Creating a Service definition for your application
* Scaling your application.
* Creating a pointer to the cluster you want to deploy to
* Deploying your application.

## Deployment workflow

This is a pictorial representation of the workflow required to deploy your application. The green boxes are jobs and the grey boxes are the input resources for the jobs. Both jobs and input resources are specified in Shippable configuration files.

<img src="/images/deploy/usecases/deploy-multi-container-docker-app.png"/>

These are the key components of the assembly line diagram -

**Resources (grey boxes)**

* `app_image_1` is a **required** [image](/platform/workflow/resource/image/) resource that represents the first docker image of the application.
* `app_image_2` is a **required** [image](/platform/workflow/resource/image/) resource that represents the second docker image of the application.
* `app_opts_1` and `app_opts_2` are **optional** [dockerOptions](/platform/workflow/resource/dockeroptions/#dockeroptions) resources
that represents the options of the application container for `app_image_1` and `app_image_2` respectively.
* `app_env` is an **optional** [params](/platform/workflow/resource/params) resource that stores key-value pairs that are set as environment variables for consumption by the application.
* `app_replicas` is an **optional** [replicas](/platform/workflow/resource/replicas) resource that specifies the number of instances of the container to deploy.
* `op_cluster` is a **required** [cluster](/platform/workflow/resource/cluster/) resource that represents the orchestration platform where the application is deployed to.

**Jobs (green boxes)**

* `app_service_def` is a **required** [manifest](/platform/workflow/job/manifest) job used to create a service definition of a deployable unit of your application, encompassing the image, options and environment that is versioned and immutable.
* `app_deploy_job` is a **required** [deploy](/platform/workflow/job/deploy) job which deploys a [manifest](/platform/workflow/job/manifest/) to a [cluster](/platform/workflow/resource/cluster/) resource.

## Configuration

The configuration for this Assembly Line is in the [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file at the root of the repository -

* [Resources](/platform/workflow/resource/overview/) (grey boxes) are defined in the `resources` section of the**shippable.yml** file.

* [Jobs](/platform/workflow/job/overview/) (green boxes) are defined in the `jobs` section of the**shippable.yml** file.

This file should be committed to your source control. Step 8 of the workflow below will describe how to add the config to Shippable.

## Instructions

###1. Define `app_image_1` and `app_image_2`.

* **Description:** `app_image_1` and `app_image_2` are [image](/platform/workflow/resource/image/) resources that represent the Docker images of your application. In our example, we're using a Node.js image and an nginx image, hosted on Docker hub.
* **Required:** Yes.
* **Integrations needed:** any [supported Docker registry](/platform/integration/overview/#supported-docker-registry-integrations).

**Steps**  

1. Create an account integration using your Shippable account for your docker registry.
    Instructions to create an integration can be found [here](http://docs.shippable.com/platform/tutorial/integration/howto-crud-integration/).

2. Set the friendly name of the integration as `app_docker_hub`. If you change the name,
    please change it also in the yml below.

3. Add the following yml block to your [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file.

```
resources:
  - name: app_image_1 # resource friendly name
    type: image
    integration: app_docker_hub           
    pointer:
      sourceName: devops/deploy_app_service_1 #this will change based on registry
    seed:
      versionName: "master.1"  #Specify the tag of your image.

  - name: app_image_2 # resource friendly name
    type: image
    integration: app_docker_hub           
    pointer:
      sourceName: devops/deploy_app_service_2 #this will change based on registry
    seed:
      versionName: "master.1"  #Specify the tag of your image.
```

###2. Define `app_opts_1` and `app_opts_2`.

* **Description:** `app_opts_1` and `app_opts_2` are [dockerOptions](/platform/workflow/resource/dockeroptions/#dockeroptions) resources
that represent the options of the application containers. Here, we demonstrate a couple of options such as setting the memory to 1024MB and exposing port 80 for the `deploy_app_service_1` image and setting the memory to 2048MB and exposing port 8080 for the `deploy_app_service_2` image. Shippable supports a vast repertoire of container and orchestration platform options and the complete list can be found [here](/platform/workflow/resource/dockeroptions/#dockeroptions).
* **Required:** No.
* **Defaults:**
If no options are specified, the platform sets the following default options -
    - memory : 400mb
    - desiredCount : 1
    - cpuShares : 0
    - All available CPU.
    - no ENVs are added to the container.

**Steps**

Add the following yml block to the existing `resources` section of your [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file.

```
resources:

  - name: app_opts_1
    type: dockerOptions
    version:
      memory: 1024
      portMappings:
        - 80:80

  - name: app_opts_2
    type: dockerOptions
    version:
      memory: 2048
      portMappings:
        - 8080:80
```

###3. Define `app_env`.

* **Description:** `app_env` is a [params](/platform/workflow/resource/params) resource used to specify key-value pairs that are set as environment variables for consumption by the application. Here we demonstrate setting an environment variable called `ENVIRONMENT` that is available in the running container.
* **Required:** No.

**Steps**

Add the following yml block to the `resources` section of your [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file.

```
resources:

  - name: app_env
    type: params
    version:
      params:
        ENVIRONMENT: "prod"
```

###4. Define `app_service_def`.

* **Description:** `app_service_def` is a [manifest](/platform/workflow/job/manifest) job used to create a service definition of a deployable unit of your application. The service definition consists of the image, options and environment. The definition is also versioned (any change to the inputs of the manifest creates a new semantic version of the manifest) and is immutable.
* **Required:** Yes.

**Steps**

Add the following yml block to your [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file.

```
jobs:

- name: app_service_def
  type: manifest
  steps:
   - IN: app_image_1
   - IN: app_image_2
   - IN: app_opts_1
     applyTo:
       - app_image_1
   - IN: app_opts_2
     applyTo:
       - app_image_2
   - IN: app_env
```

###5. Define `app_replicas`.

* **Description:** `app_replicas` is a [replicas](/platform/workflow/resource/replicas) resource that specifies the number of instances of the containers you want to deploy. Here we demonstrate running two instances for each container. It is also possible to specify the number of instances to run for each container. We will cover that config later in the document.
* **Required:** No.
* **Default:** 1 (one instance of the container is deployed)

**Steps**

Add the following yml block to the `resources` section of your [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file.

```
resources:

  - name: app_replicas
    type: replicas
    version:
      count: 2
```

###6. Define `op_cluster`.

* **Description:** `op_cluster` is a [cluster](/platform/workflow/resource/cluster/) resource that represents the  cluster in your orchestration platform where your application is deployed to. In our example, the cluster points to a cluster on Amazon ECS.
* **Required:** Yes.
* **Integrations needed:**  AWS IAM Integration

The list of supported container orchestration platforms can be found [here](/platform/integration/overview/#supported-orchestration-platform-integrations).

**Steps**

1. Create an account integration using your Shippable account for the orchestration platform. Instructions to create an integration can be found [here](http://docs.shippable.com/platform/tutorial/integration/howto-crud-integration/).

2. Set the friendly name of the integration as `op_int`. If you change the name, please change it also in the yml below.

3. Add the following yml block to the `resources` section of your [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file.

```
resources:

  - name: op_cluster    # resource friendly name
    type: cluster
    integration: op_int            
    pointer:
      sourceName: "deploy-ecs-cluster" # name of the actual cluster in the orchestration service to which we are deploying
      region: "us-east-1" # region where cluster is located. This attribute is optional, depending on the orchestration platform.
```

###7. Define `app_deploy_job`.

* **Description:** `app_deploy_job` is a [deploy](/platform/workflow/job/manifest) job that actually deploys the application manifest to the cluster and starts the container. The number of containers started depends on the `app_replicas` resource defined earlier.
* **Required:** Yes.

**Steps**

Add the following yml block to the existing `jobs` section of your [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file.

```
jobs:

  - name: app_deploy_job
    type: deploy
    steps:
      - IN: app_service_def
      - IN: op_cluster
      - IN: app_replicas
```

###8. Add config to Shippable

Once you have the **shippable.yml** file as described above, commit it to your repository. This repository is called a [sync repository](/platform/tutorial/workflow/crud-syncrepo/).

Follow [these instructions](/platform/tutorial/workflow/crud-syncrepo/) to import your configuration files into your Shippable account.

###9. Trigger your pipeline

When you're ready for deployment, right-click on the manifest job in the [SPOG View](/platform/visibility/single-pane-of-glass-spog/), and select **Run Job**. Your Assembly Line will also trigger automatically every time the any of the input Docker images.

## Sample project

Here are some links to a working sample of this scenario. This is a multi container Node.js application that runs some tests and then pushes the image to Amazon ECR as part of CI. It also contains all of the pipelines configuration files for deploying two images to Amazon ECS.

**Source code:** [devops-recipes/deploy-ecs-multi-container](https://github.com/devops-recipes/deploy-ecs-multi-container)

## Ask questions on Chat

Feel free to engage us on Chat if you have any questions about this document. Simply click on the Chat icon on the bottom right corner of this page and someone from our customer success team will get in touch with you.

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
