page_main_title: CD of a single container application to an orchestration platform.
main_section: Deploy
sub_section: Deploy to Container Orchestration Platforms

# CD of a single container application to an orchestration platform.

A single container application could be a web application, API endpoint or a micro-service or any application component that is packaged as a docker image. This document describes how you can use the [Shippable assembly lines platform](/platform/overview/) to deploy such a single container application to a container orchestration service like Amazon ECS, Kubernetes, GKE or Azure.

## Assumptions

We assume that the application is already packaged as a docker image and available in a Docker registry that Shippable supports. If you want to know how to build, test and push a docker image through CI to a docker registry, go [here](/ci/push-artifacts/).

## Topics Covered
CD of your application is defined in Shippable configuration files in a powerful, flexible YML based language. The specific yml blocks that need to be authored for each of the topics below are covered later in the document. These topics will give you a high level picture of the steps that you will complete to get CD of your application up and running in Shippable.

* Specifying the docker image of your application.
* Specifying application options for the container.
* Specifying application runtime environment variables.
* Service definition of your application.
* Scaling your application.
* Specifying the cluster as your deployment target.
* Deploying your application.

## DevOps Assembly Line

This is a pictorial representation of the continuous deployment process. The green boxes are tasks and the grey boxes are the input resources for the tasks. Both tasks and inputs are specified in Shippable configuration files.

<img src="/images/deploy/usecases/deploy_mvp_1.png"/>

These are the key components of the assembly line diagram -

**Resources (grey boxes)**

* `app_image` is a [image](/platform/workflow/resource/image/) resource that represents the docker image of the application.
* `app_options` is a [dockerOptions](/platform/workflow/resource/dockeroptions/#dockeroptions) resource
that represents the options of the application container.
* `app_environment` is a [params](/platform/workflow/resource/params) resource that stores key-value pairs that are set as environment variables for consumption by the application.
* `app_replicas` is a [replicas](/platform/workflow/resource/replicas) resource that specifies the number of instances of the container to deploy.
* `op_cluster` is a [cluster](/platform/workflow/resource/cluster/) resource that represents the orchestration platform where the application is deployed to.

**Jobs (green boxes)**

* `app_service_def` is a [manifest](/platform/workflow/job/manifest) job used to create a service definition of a deployable unit of your application, encompassing the image, options and environment that is versioned and immutable.
* `app_deploy_job` is a [deploy](/platform/workflow/job/deploy) job which deploys a [manifest](/platform/workflow/job/manifest/) to a [cluster](/platform/workflow/resource/cluster/) resource.


## Step by Step instructions

They are two configuration files that are needed to achieve this usecase -

* Resources (grey boxes) are defined in your [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/) file, that should be created at the root of your repository. Please find an overview of resources [here](/platform/workflow/resource/overview/).

* Jobs (green boxes) are defined in your [shippable.jobs.yml](/platform/tutorial/workflow/shippable-jobs-yml/) file, that should be created at the root of your repository. Please find an overview of jobs [here](/platform/workflow/job/overview/).

##1. Define `app_image`.

* **Description:** `app_image` represents your Docker image in your pipeline. In our example, we're using an image hosted on Docker hub.
* **Required:** Yes.
* **Integrations needed:** Docker Hub, or any [supported Docker registry](/platform/integration/overview/#supported-docker-registry-integrations).

**Steps**  

1. Create an account integration using your Shippable account for your docker registry.
    Instructions to create an integration can be found [here](http://docs.shippable.com/platform/tutorial/integration/howto-crud-integration/). Copy the friendly name of the integration.

2. Add the following yml block to your [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/) file.

```
  resources:
    - name: app_image # resource friendly name
      type: image
      integration: app_docker_hub # friendly name of your integration          
      pointer:
        sourceName: devops/deploy_node_app #this will change based on registry
      seed:
        versionName: "master.1"  #Specify the tag of your image.
```

##2. Define `app_options`.

* **Description:** `app_options` represents the options of the application container. Here we demonstrate setting container options such as setting the memory to 1024MB and exposing port 80. Shippable platform supports a vast repertoire of container and orchestration platform options and the complete list can be found [here](/platform/workflow/resource/dockeroptions/#dockeroptions).
* **Required:** No.
* **Defaults:**
If no options are specified, the platform sets the following default options -
    - memory : 400mb
    - desiredCount : 1
    - cpuShares : 0
    - All available CPU.
    - no ENVs are added to the container.

**Steps**

Add the following yml block to your [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/) file.

```
  - name: app_options
    type: dockerOptions
    version:
      memory: 1024
      portMappings:
        - 80:80
```

##3. Define `app_environment`.

* **Description:** `app_environment` is a [params](/platform/workflow/resource/params) resource used to specify key-value pairs that are set as environment variables for consumption by the application. Here we demonstrate setting an environment variable called `ENVIRONMENT` that is available in the running container.
* **Required:** No.

**Steps**

Add the following yml block to your [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/) file.

```
  - name: app_environment
    type: params
    version:
      params:
        ENVIRONMENT: "prod"
```

##4. Define `app_service_def`.

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
     - IN: app_options
     - IN: app_environment
```

##5. Define `app_replicas`.

* **Description:** `app_replicas` is a [replicas](/platform/workflow/resource/replicas) resource that specifies the number of instances of the container you want to deploy. Here we demonstrate running two instances of the container.
* **Required:** No.
* **Default:** 1 (one instance of the container is deployed)

**Steps**

Add the following yml block to your [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/) file.

```
  - name: app_replicas
    type: replicas
    version:
      count: 2
```

##6. Define `op_cluster`.

* **Description:** `op_cluster` is a [cluster](/platform/workflow/resource/cluster/) resource that represents the  cluster in your orchestration platform where your application is deployed to. In our example, the cluster points to a cluster on Amazon ECS.
* **Required:** Yes.
* **Integrations needed:** AWS IAM Integration

The list of supported container orchestration platforms can be found [here](/platform/integration/overview/#supported-orchestration-platform-integrations).

**Steps**

1. Create an account integration using your Shippable account for the orchestration platform. Instructions to create an integration can be found [here](http://docs.shippable.com/platform/tutorial/integration/howto-crud-integration/).

2. Set the friendly name of the integration as `op_int`. If you change the name, please change it also in the yml below.

3. Add the following yml block to your [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/) file.

```
  - name: op_cluster    # resource friendly name
    type: cluster
    integration: op_int            
    pointer:
      sourceName: "deploy-ecs-cluster" # name of the actual cluster in the orchestration service to which we are deploying
      region: "us-east-1" # region where cluster is located. This attribute is optional, depending on the orchestration platform.
```

##7. Define `app_deploy_job`.

* **Description:** `app_deploy_job` is a [deploy](/platform/workflow/job/manifest) job that actually deploys the application manifest to the cluster and starts the container. The number of containers started depends on the `app_replicas` resource defined earlier.
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
        - IN: app_replicas
```

##8. Import configuration into your Shippable account.

Once you have these jobs and resources yml files as described above, commit them to your repository. This repository is called a [Sync repository](/platform/tutorial/workflow/crud-syncrepo/).

Follow [these instructions]((/platform/tutorial/workflow/crud-syncrepo/)) to import your configuration files into your Shippable account.

##9. Trigger your pipeline

When you're ready for deployment, right-click on the manifest job in the [SPOG View](/platform/visibility/single-pane-of-glass-spog/), and select **Run Job**.

## Sample project

Here are some links to a working sample of this scenario. This is a simple Node.js application that runs some tests and then pushes
the image to Amazon ECR. It also contains all of the pipelines configuration files for deploying to Amazon ECS.

**Source code:**  [devops-recipes/deploy-ecs-basic](https://github.com/devops-recipes/deploy-ecs-basic)

## Ask questions on Chat

Feel free to engage us on Chat if you have any questions about this document. Simply click on the Chat icon on the bottom right corner of this page and someone from our customer success team will get in touch with you.

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
