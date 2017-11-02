page_main_title: Amazon ECS- Deploying a Docker application
main_section: Deploy
sub_section: Tutorials
sub_sub_section: Amazon ECS

# Deploying to Amazon ECS

There are many strategies that can be used to deploy containers to [Amazon ECS](https://aws.amazon.com/ecs/) using Shippable Assembly Lines.  This page will describe how you can use the managed [**deploy job**](/platform/workflow/job/deploy/) to take a single Docker image and deploy it as an individual container to your cluster on Amazon ECS.

For custom deployments using cloud-native CLIs, where you write all the deployment scripts yourself, check out our document on [Deploying to Amazon ECS with Cloud-Native CLI](/deploy/deploy-amazon-ecs-cloud-native-cli/).

## Assumptions

We assume that the application is already packaged as a Docker image and available in a Docker registry that [Shippable supports](/platform/integration/overview/#supported-docker-registry-integrations). If you want to know how to build, test and push a Docker image through CI to a Docker registry, these links will help:

* [Getting started with CI](/ci/why-continuous-integration/)
* [CI configuration](/ci/yml-structure/)
* [Pushing artifacts after CI](/ci/push-artifacts/)
* [Sample application](/getting-started/ci-sample/)

If you're not familiar with Shippable, it is also recommended that you read the [Platform overview doc](/platform/overview/) to understand the overall structure of Shippable's DevOps Assembly Lines platform.

## Deployment workflow

You can configure your deployment with Shippable's configuration files in a powerful, flexible YAML based language. The specific `YAML` blocks that need to be authored are covered in the document.

This is a pictorial representation of the workflow required to deploy your application. The green boxes are jobs and the grey boxes are the input resources for the jobs. Both jobs and inputs are specified in Shippable configuration files.

<img src="/images/deploy/usecases/amazon-ecs-deploy-single-container-docker-app.png"/>

These are the key components of the assembly line diagram -

**Resources (grey boxes)**

* `app_image` is a **required** [image](/platform/workflow/resource/image/) resource that represents the Docker image of the app stored in Amazon ECR.
* `op_cluster` is a **required** [cluster](/platform/workflow/resource/cluster/) resource that represents Amazon ECS cluster to which you're deploying the application.
* `app_options` is an **optional** [dockerOptions](/platform/workflow/resource/dockeroptions/#dockeroptions) resource
that represents the options of the application container.
* `app_env` is an **optional** [params](/platform/workflow/resource/params) resource that stores key-value pairs that are set as environment variables for consumption by the application.
* `app_replicas` is an **optional** [replicas](/platform/workflow/resource/replicas) resource that specifies the number of instances of the container to deploy.

**Jobs (green boxes)**

* `app_service_def` is a **required** [manifest](/platform/workflow/job/manifest) job used to create a service definition of a deployable unit of your application, encompassing the image, options and environment that is versioned and immutable.
* `app_deploy_job` is a **required** [deploy](/platform/workflow/job/deploy) job which deploys a [manifest](/platform/workflow/job/manifest/) to a [cluster](/platform/workflow/resource/cluster/) resource.

## Configuration

They are two configuration files that are needed to achieve this usecase -

* [Resources](/platform/workflow/resource/overview/) (grey boxes) are defined in your [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/) file, that should be created at the root of your repository.

* [Jobs](/platform/workflow/job/overview/) (green boxes) are defined in your [shippable.jobs.yml](/platform/tutorial/workflow/shippable-jobs-yml/) file, that should be created at the root of your repository.

These files should be committed to your source control. Step 5 of the workflow below will describe how to add the config to Shippable.

## Deployment instructions

###1. Define Docker image

* **Description:** `app_image` is an [image resource](/platform/workflow/resource/image/) that represents your Docker image stored in Amazon ECR
* **Required:** Yes.
* **Integrations needed:** Amazon ECR, or any [supported Docker registry](/platform/integration/overview/#supported-docker-registry-integrations) if your image isn't stored in ECR.

**Steps**  

1. Create an account integration for Amazon ECR in your Shippable UI. Instructions to create an integration are here:

    * [Adding an account integration](/platform/tutorial/integration/howto-crud-integration/) and .
    * [Amazon ECR integration](/platform/integration/aws-keys/)

    Copy the friendly name of the integration.

2. Add the following yml block to your [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/) file.

```
resources:

  - name: app_image # resource friendly name
    type: image
    integration: app_ecr    #friendly name of your integration          
    pointer:
      sourceName: "679404489841.dkr.ecr.us-east-1.amazonaws.com/deploy-ecs-basic"    #image name
    seed:
      versionName: "master.1"  #Specify the tag of your image.
```

###2. Create service definition

* **Description:** `app_service_def` is a [manifest](/platform/workflow/job/manifest) job used to create a service definition of a deployable unit of your application. The service definition consists of the image, options and environment. The definition is also versioned (any change to the inputs of the manifest creates a new semantic version of the manifest) and is immutable.
* **Required:** Yes.

**Steps**

Add the following yml block to your [shippable.jobs.yml](/platform/tutorial/workflow/shippable-jobs-yml/) file.

```
jobs:

  - name: app_service_def
    type: manifest
    steps:
     - IN: app_image
```

###3. Define cluster

* **Description:** `op_cluster` is a [cluster](/platform/workflow/resource/cluster/) resource that represents the  cluster on Amazon ECS where your application is deployed to.
* **Required:** Yes.
* **Integrations needed:** AWS IAM Integration

**Steps**

1. Create an account integration for Amazon ECR in your Shippable UI. Instructions to create an integration are here:

    * [Adding an account integration](/platform/tutorial/integration/howto-crud-integration/) and .
    * [Amazon ECS integration](/platform/integration/aws-iam/)

    Copy the friendly name of the integration. We're using `op_int` for our sample snippet in the next step.

2. Add the following yml block to your [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/) file.

```
resources:

  - name: op_cluster    # resource friendly name
    type: cluster
    integration: op_int   # friendly name of integration from step 1          
    pointer:
      sourceName: "deploy-ecs-cluster" # name of the actual cluster in ECS
      region: "us-east-1" # AWS region where cluster is located.
```

###4. Create deployment job

* **Description:** `app_deploy_job` is a [deploy](/platform/workflow/job/deploy) job that actually deploys the application manifest to the cluster and starts the container.
* **Required:** Yes.

**Steps**

Add the following yml block to your [shippable.jobs.yml](/platform/tutorial/workflow/shippable-jobs-yml/) file.

```
jobs:

  - name: app_deploy_job
    type: deploy
    steps:
      - IN: app_service_def
      - IN: op_cluster
```

###5. Add config to Shippable

Once you have these jobs and resources yml files as described above, commit them to your repository. This repository is called a [Sync repository](/platform/tutorial/workflow/crud-syncrepo/).

Follow [these instructions](/platform/tutorial/workflow/crud-syncrepo/) to import your configuration files into your Shippable account.

###6. Trigger your workflow

When you're ready for deployment, right-click on the manifest job in the [SPOG View](/platform/visibility/single-pane-of-glass-spog/), and select **Run Job**. Your Assembly Line will also trigger every time the `app_image` changes, i.e. each time you have a new Docker image.


## Customizing container options

By default, we set the following options while deploying your container:

- memory : 400mb
- desiredCount : 1
- cpuShares : 0
- All available CPU
- no ENVs are added to the container

However, you can customize these and many other options by including a [dockerOptions](/platform/workflow/resource/dockeroptions/#dockeroptions) resource in your service definition.

**Steps**

###1. Add a dockerOptions resource

Add a `dockerOptions` resource to your [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/) file. For example, to set memory to 1024MB and expose port 80, you would write the following snippet:

```
resources:

  - name: app_options
    type: dockerOptions
    version:
      memory: 1024
      portMappings:
        - 80:80
```
For a complete reference for `dockerOptions`, read the [resource page](/platform/workflow/resource/dockeroptions/#dockeroptions).

###2. Update service definition

Next, you should update your `manifest` with this new resource:

```
jobs:

  - name: app_service_def
    type: manifest
    steps:
     - IN: app_image
     - IN: app_options
```

## Setting env vars

You can also include environment variables needed by your application in your service definition `manifest`. To do this, you need a [params](/platform/workflow/resource/params) resource that lets you include key-value pairs.

**Steps**

###1. Add a params resource

Add a `params` resource to your [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/) file. For example, to set environment variables needed to connect to your database:

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

  - name: app_service_def
    type: manifest
    steps:
     - IN: app_image
     - IN: app_env
```

For a complete reference for `manifest`, read the [job page](/platform/workflow/job/manifest).

## Scaling app instances

By default, we always deploy one instance of your application. You can scale it as needed by including a  [replicas](/platform/workflow/resource/replicas) resource in your service definition `manifest`.

**Steps**

###1. Add a replicas resource

Add a `replicas` resource to your [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/) file. For example, to scale your application to 5 instances:

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

  - name: app_deploy_job
    type: deploy
    steps:
      - IN: app_service_def
      - IN: op_cluster
      - IN: app_replicas
```

For a complete reference for `deploy`, read the [job page](/platform/workflow/job/deploy).

## Sample project

Here are some links to a working sample of this scenario. This is a simple Node.js application that runs some tests and then pushes
the image to Amazon ECR. It also contains all of the pipelines configuration files for deploying to Amazon ECS.

**Source code:**  [devops-recipes/deploy-ecs-basic](https://github.com/devops-recipes/deploy-ecs-basic)

## Ask questions on Chat

Feel free to engage us on Chat if you have any questions about this document. Simply click on the Chat icon on the bottom right corner of this page and someone from our customer success team will get in touch with you.

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
