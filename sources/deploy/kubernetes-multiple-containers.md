page_main_title: Kubernetes- Deploying multi-container services
main_section: Deploy
sub_section: Tutorials
sub_sub_section: Kubernetes
page_title: Deploying Multiple Containers to Kubernetes
page_description: How to deploy multiple Containers to Kubernetes in Shippable

# Deploying Multiple Containers to Kubernetes

The strength of Kubernetes is in its ability to orchestrate multi-container applications across a cluster of machines. There are several ways to accomplish this on Shippable.  

A multiple container application could be a web application, API endpoint, microservice, or any application component that is packaged as multiple docker images. This page describes how you can use the [Shippable assembly lines platform](/platform/overview/) to deploy such a multiple container application to Kubernetes.

## Assumptions

We assume that all Docker images for the application are already available in a Docker registry that [Shippable supports](/platform/integration/overview/#supported-docker-registry-integrations). If you want to know how to build, test and push a Docker image through CI to a Docker registry, these links will help:

* [Getting started with CI](/ci/why-continuous-integration/)
* [CI configuration](/ci/yml-structure/)
* [Pushing artifacts after CI](/ci/push-artifacts/)
* [Sample application](/getting-started/ci-sample/)

If you're not familiar with Shippable, it is also recommended that you read the [Platform overview doc](/platform/overview/) to understand the overall structure of Shippable's DevOps Assembly Lines platform.

## Deployment workflow

You can configure your deployment with Shippable's configuration files in a powerful, flexible YAML based language. The specific `YAML` blocks that need to be authored for each of the topics below are covered in the document.

This is a pictorial representation of the workflow required to deploy your application. The green boxes are jobs and the grey boxes are the input resources for the jobs. Both jobs and input resources are specified in Shippable configuration files.

<img src="/images/deploy/usecases/amazon-ecs-deploy-multi-container-docker-app.png"/>

These are the key components of the Assembly Lines picture -

**Resources (grey boxes)**

* `app_image_1` is a **required** [image](/platform/workflow/resource/image/) resource that represents the first Docker image
* `app_image_2` is a **required** [image](/platform/workflow/resource/image/) resource that represents the second Docker image
* `op_cluster` is a **required** [cluster](/platform/workflow/resource/cluster/) resource that represents the Kubernetes cluster to which the application will be deployed to.
* `app_opts_1` and `app_opts_2` are **optional** [dockerOptions](/platform/workflow/resource/dockeroptions/#dockeroptions) resources
that represents the options of the application container for `app_image_1` and `app_image_2` respectively.
* `app_env` is an **optional** [params](/platform/workflow/resource/params) resource that stores environment variables needed by the application.
* `app_replicas` is an **optional** [replicas](/platform/workflow/resource/replicas) resource that specifies the number of instances to be deployed


**Jobs (green boxes)**

* `app_service_def` is a **required** [manifest](/platform/workflow/job/manifest) job used to create a service definition of a deployable unit of your application, encompassing the image, options and environment that is versioned and immutable.
* `app_deploy_job` is a **required** [deploy](/platform/workflow/job/deploy) job which deploys a [manifest](/platform/workflow/job/manifest/) to a [cluster](/platform/workflow/resource/cluster/) resource.

## Configuration

The configuration for this Assembly Line is in the [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file at the root of the repository -

* [Resources](/platform/workflow/resource/overview/) (grey boxes) are defined in the `resources` section of the`shippable.yml` file.

* [Jobs](/platform/workflow/job/overview/) (green boxes) are defined in the `jobs` section of the`shippable.yml` file.

This file should be committed to your source control. Step 5 of the workflow below will describe how to add the config to Shippable.

## Instructions

###1. Define Docker images

* **Description:** `app_image_1` and `app_image_2` are [image](/platform/workflow/resource/image/) resources that represent the Docker images of your application. In our example, we're using a Node.js image and an nginx image, hosted on Docker hub.
* **Required:** Yes.
* **Integrations needed:** any [supported Docker registry](/platform/integration/overview/#supported-docker-registry-integrations).

**Steps**  

1. Create an account integration for Docker Hub in your Shippable UI. Instructions to create an integration are here:

    * [Adding an account integration](/platform/tutorial/integration/howto-crud-integration/) and
    * [Docker Registry integration](/platform/integration/dockerRegistryLogin/)

    Copy the friendly name of the integration, in our case we named it **app_docker_hub**.

2. Add the following yml block to your [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file.

```
resources:
  - name: app_image_1     # resource friendly name
    type: image
    integration: app_docker_hub    # friendly name of integration created in step 1           
    pointer:
      sourceName: devopsrecipes/app-service-1    # replace with yor image name
    seed:
      versionName: "master.1"    #specify the tag of your image.

  - name: app_image_2     # resource friendly name
    type: image
    integration: app_docker_hub    # friendly name of integration created in step 1            
    pointer:
      sourceName: devopsrecipes/app-service-2     # replace with yor image name
    seed:
      versionName: "master.1"    #specify the tag of your image.
```

###2. Create service definition

* **Description:** `app_service_def` is a [manifest](/platform/workflow/job/manifest) job used to create a service definition of a deployable unit of your application. The service definition consists of the images that compose your application. The definition is also versioned (any change to the inputs of the manifest creates a new semantic version of the manifest) and is immutable.
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
```

For a complete reference for `manifest`, read the [job page](/platform/workflow/job/manifest).

###3. Define cluster

* **Description:** `op_cluster` is a [cluster](/platform/workflow/resource/cluster/) resource that represents the  cluster in Kubernetes where your application is deployed to.
* **Required:** Yes.
* **Integrations needed:**  Kubernetes Integration

**Steps**

1. Create an account integration for Kubernetes in your Shippable UI. Instructions to create an integration are here:

    * [Adding an account integration](/platform/tutorial/integration/howto-crud-integration/) and
    * [Kubernetes integration](/platform/integration/kubernetes/)

    Copy the friendly name of the integration, in our case we named it `op_int`.

2. Add the following yml block to the existing `resources` section of your [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file.

```
resources:

  - name: op_cluster    # resource friendly name
    type: cluster
    integration: op_int    # friendly name from step 1         
    pointer:
      sourceName: "kubernetes-test-cluster"    # name of the actual cluster
```

###4. Create deployment job

* **Description:** `app_deploy_job` is a [deploy](/platform/workflow/job/manifest) job that actually deploys a single instance of the application manifest to the cluster.
* **Required:** Yes.

**Steps**

Add the following yml block to the existing `jobs` section of your [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file.

```
jobs:

  - name: app-deploy-job
    type: deploy
    steps:
      - IN: app_service_def
      - IN: op_cluster
      - IN: key_integration_resource # If using bastion host for configuring kubernetes clusters
```

###5. Add config to Shippable

Once you have the `shippable.yml` file as described above, commit it to your repository. This repository is called a [sync repository](/platform/tutorial/workflow/crud-syncrepo/).

Follow [these instructions](/platform/tutorial/workflow/crud-syncrepo/) to import your configuration files into your Shippable account.

###6. Trigger your workflow

When you're ready for deployment, right-click on the manifest job in the [SPOG View](/platform/visibility/single-pane-of-glass-spog/), and select **Run Job**. Your Assembly Line will also trigger automatically every time the any of the input Docker images.

## Customizing container options

By default, we set the following options while deploying a container:

- memory : 400mb
- desiredCount : 1
- cpuShares : 0
- All available CPU
- no ENVs are added to the container

However, you can customize these and many other options for each container by including a [dockerOptions](/platform/workflow/resource/dockeroptions/#dockeroptions) resource in your service definition.

###1. Add dockerOptions resources

Add a `dockerOptions` resource to your [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file for each container you want to customize.

For example, to set memory to 1024MB and exposing port 80 for the `app_image_1` image and set the memory to 2048MB and exposing port 8080 for the `app_image_2` image., you would write the following snippet:

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

For a complete reference for `dockerOptions`, read the [resource page](/platform/workflow/resource/dockeroptions/#dockeroptions).

###2. Update service definition

Next, you should update your `manifest` with this new resource:

```
jobs:

  - name: app-service-def
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
```

## Setting env vars

You can also include environment variables needed by your application in your service definition `manifest`. To do this, you need a [params](/platform/workflow/resource/params) resource that lets you include key-value pairs.


###1. Add a params resource

Add a `params` resource to your [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file. For example, to set environment variables needed to connect to your database:

```
resources:

  - name: app_env
    type: params
    version:
      params:
        DB_URL: "my.database.local"
        DB_PORT: 3306
        DB_NAME: "foo"
```

For a complete reference for `params`, read the [resource page](/platform/workflow/resource/params).

###2. Update service definition

Next, you should update your `manifest` with this new resource:

```
jobs:

  - name: app-service-def
    type: manifest
    steps:
     - IN: app_image_1
     - IN: app_image_2
     - IN: app_env

```

## Scaling app instances

By default, we always deploy one instance of your application. You can scale it as needed by including a  [replicas](/platform/workflow/resource/replicas) resource in your `deploy` job.

###1. Add a replicas resource

Add a `replicas` resource to your [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file. For example, to scale your application to 5 instances:

```
resources:

  - name: app_replicas
    type: replicas
    version:
      count: 5
```

For a complete reference for `replicas`, read the [resource page](/platform/workflow/resource/replicas).

###2. Update deploy job

Next, you should update your `deploy` with this new resource:

```
jobs:

  - name: app-deploy-job
    type: deploy
    steps:
      - IN: app-service-def
      - IN: op_cluster
      - IN: app_replicas
```

For a complete reference for `deploy`, read the [job page](/platform/workflow/job/deploy).

## Sample project

Here are some links to a working sample of this scenario. This is a simple Node.js application that runs some tests and then pushes
the image to Docker Hub. It also contains all of the pipelines configuration files for deploying to Kubernetes for all of the scenarios described above.

**Source code:**  [devops-recipes/deploy-kubernetes-multi-container](https://github.com/devops-recipes/deploy-kubernetes-multi-container)

**Build link:** [CI build on Shippable](https://app.shippable.com/github/devops-recipes/deploy-kubernetes-multi-container/runs/6/1/console)

**Build status badge:** [![Run Status](https://api.shippable.com/projects/58f98b298c0a6707003b237a/badge?branch=master)](https://app.shippable.com/github/devops-recipes/deploy-kubernetes-multi-container)

## Ask questions on Chat

Feel free to engage us on Chat if you have any questions about this document. Simply click on the Chat icon on the bottom right corner of this page and someone from our customer success team will get in touch with you.

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
