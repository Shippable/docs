page_main_title: Multi-stage CD through Dev/Test/Prod.
main_section: Deploy
sub_section: CD to Orchestration Platforms

# Multi-stage CD through Dev/Test/Prod

Most of the time, you will want to setup continuous deployment to multiple environments, with deployments progressing sequentially in stages from one environment to another. One example would be having automated deployments to a dev environment after running unit tests in CI, followed by an CD to the test environment where integration tests are run, followed by a manual deployment to production. You can easily achieve this using Shippable pipelines, and this page will explain the steps.

A Multi-stage CD through Dev/Test/Prod looks like this:

```
CI -> push image to Docker Registry -> CD to Dev cluster -> CD to Test cluster -> manual deployment to Prod cluster.
```

## Assumptions

We assume that the application is already packaged as a docker image and available in a Docker registry that Shippable supports. If you want to know how to build, test and push a docker image through CI to a docker registry, go [here](/ci/push-artifacts/).

## Topics Covered
CD of your application is defined in Shippable configuration files in a powerful, flexible YML based language. The specific yml blocks that need to be authored for each of the topics below are covered later in the document. These topics will give you a high level picture of the steps that you will complete to get CD of your application up and running in Shippable.

* Specifying the docker image of your application.
* Specifying application options for the container.
* Specifying the environment configuration for dev, test and prod environments.
* Service definition of your application.
* Specifying the dev, test and prod clusters as your deployment target.
* Deploying your application to the dev, test and prod clusters.

## DevOps Assembly Line

This is a pictorial representation of the continuous deployment process. The green boxes are tasks and the grey boxes are the input resources for the tasks. Both tasks and inputs are specified in Shippable configuration files.

<img src="/images/deploy/usecases/deploy_multi_stage.png"/>

These are the key components of the assembly line diagram -

**Resources (grey boxes)**

* `app_image` is a [image](/platform/workflow/resource/image/) resource that represents the docker image of the application.
* `app_dev_options` is a [dockerOptions](/platform/workflow/resource/dockeroptions/#dockeroptions) resource
that represents the options of the application container.
* `app_test_options` is a [dockerOptions](/platform/workflow/resource/dockeroptions/#dockeroptions) resource
that represents the options of the application container.
* `app_prod_options` is a [dockerOptions](/platform/workflow/resource/dockeroptions/#dockeroptions) resource
that represents the options of the application container.
* `app_dev_environment` is a [params](/platform/workflow/resource/params) resource that stores key-value pairs that are set as environment variables for consumption by the application in the dev environment.
* `app_test_environment` is a [params](/platform/workflow/resource/params) resource that stores key-value pairs that are set as environment variables for consumption by the application in the dev environment.
* `app_prod_environment` is a [params](/platform/workflow/resource/params) resource that stores key-value pairs that are set as environment variables for consumption by the application in the dev environment.
* `app_replicas` is a [replicas](/platform/workflow/resource/replicas) resource that specifies the number of instances of the container to deploy.
* `op_dev_cluster` is a [cluster](/platform/workflow/resource/cluster/) resource that represents the development environment cluster in the orchestration platform where the application is deployed to.
* `op_test_cluster` is a [cluster](/platform/workflow/resource/cluster/) resource that represents the test environment cluster in the orchestration platform where the application is deployed to.
* `op_prod_cluster` is a [cluster](/platform/workflow/resource/cluster/) resource that represents the prod environment cluster in the orchestration platform where the application is deployed to.

**Jobs (green boxes)**

* `app_dev_service_def` is a [manifest](/platform/workflow/job/manifest) job used to create a service definition of your application for the dev environment, encompassing the image, options and environment that is versioned and immutable.
* `app_test_service_def` is a [manifest](/platform/workflow/job/manifest) job used to create a service definition of your application for the test environment, encompassing the image, options and environment that is versioned and immutable.
* `app_prod_service_def` is a [manifest](/platform/workflow/job/manifest) job used to create a service definition of your application for the prod environment, encompassing the image, options and environment that is versioned and immutable.
* `app_dev_deploy_job` is a [deploy](/platform/workflow/job/deploy) job which deploys `app_service_def` to the development cluster.
* `app_test_deploy_job` is a [deploy](/platform/workflow/job/deploy) job which deploys `app_service_def` to the test cluster.
* `app_prod_deploy_job` is a [deploy](/platform/workflow/job/deploy) job which deploys `app_service_def` to the prod cluster.

## Step by Step instructions

They are two configuration files that are needed to achieve this usecase -

* Resources (grey boxes) are defined in your [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/) file, that should be created at the root of your repository. Please find an overview of resources [here](/platform/workflow/resource/overview/).

* Jobs (green boxes) are defined in your [shippable.jobs.yml](/platform/tutorial/workflow/shippable-jobs-yml/) file, that should be created at the root of your repository. Please find an overview of jobs [here](/platform/workflow/job/overview/).

##1. Define `app_image`.

* **Description:** `app_image` represents your Docker image in your pipeline. In our example, we're using an image hosted on Docker hub.
* **Required:** Yes.
* **Integrations needed:** Docker Hub
The list of supported Docker registries can be found [here](/platform/integration/overview/#supported-docker-registry-integrations).

**Steps**  

1. Create an account integration using your Shippable account for your docker registry.
Instructions to create an integration can be found [here](http://docs.shippable.com/platform/tutorial/integration/howto-crud-integration/).

2. Set the friendly name of the integration as `app_docker_hub`. If you change the name,
please change it also in the yml below.

3. Add the following yml block to your [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/) file.

```
  resources:
    - name: app_image # resource friendly name
      type: image
      integration: app_docker_hub           
      pointer:
        sourceName: devops/deploy_node_app #this will change based on registry
      seed:
        versionName: "master.1"  #Specify the tag of your image.
```

##2. Define `app_dev_options`, `app_test_options` and `app_prod_options`.

* **Description:** `app_dev_options`, `app_test_options` and `app_prod_options` represents the options of the application container in their respective environments. Here we demonstrate setting container options such as memory and the exposed container port. Shippable platform supports a vast repertoire of container and orchestration platform options and the complete list can be found [here](/platform/workflow/resource/dockeroptions/#dockeroptions).
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
  - name: app_dev_options
    type: dockerOptions
    version:
      memory: 512
      portMappings:
        - 80:80
  - name: app_test_options
    type: dockerOptions
    version:
      memory: 1024
      portMappings:
        - 80:80
  - name: app_prod_options
    type: dockerOptions
    version:
      memory: 2048
      portMappings:
        - 80:80
```

##3. Define `app_dev_environment`, `app_test_environment` and `app_prod_environment`.

* **Description:** `app_dev_environment`, `app_test_environment` and `app_prod_environment` are [params](/platform/workflow/resource/params) resources used to specify key-value pairs that are set as environment variables for consumption by the application in the specific environment. Here we demonstrate setting an environment variable called `ENVIRONMENT` that is available in the running container and that is environment specific.
* **Required:** No.

**Steps**  

Add the following yml block to your [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/) file.

```
  - name: app_dev_environment
    type: params
    version:
      params:
        ENVIRONMENT: "dev"
  - name: app_test_environment
    type: params
    version:
      params:
        ENVIRONMENT: "test"
  - name: app_prod_environment
    type: params
    version:
      params:
        ENVIRONMENT: "prod"              
```

##4. Define `app_dev_service_def`, `app_test_service_def` and `app_prod_service_def`.

* **Description:** `app_dev_service_def`, `app_test_service_def` and `app_prod_service_def` are [manifest](/platform/workflow/job/manifest) jobs used to create a service definition of a deployable unit of your application. The service definition consists of the image, options and environment and is environment specific. The definition is also versioned (any change to the inputs of the manifest creates a new semantic version of the manifest) and is immutable.
* **Required:** Yes.

**Steps**  

Add the following yml block to your [shippable.jobs.yml](/platform/tutorial/workflow/shippable-jobs-yml/) file.

```
  jobs:

  - name: app_dev_service_def
    type: manifest
    steps:
     - IN: app_image
     - IN: app_dev_options
     - IN: app_dev_environment
  - name: app_test_service_def
    type: manifest
    steps:
      - IN: app_image
      - IN: app_test_options
      - IN: app_test_environment
  - name: app_prod_service_def
    type: manifest
    steps:
     - IN: app_image
     - IN: app_prod_options
     - IN: app_prod_environment
```

##5. Define `app_replicas`.

* **Description:** `app_replicas` is a [replicas](/platform/workflow/resource/replicas) resource that specifies the number of instances of the container you want to deploy. Here we demonstrate running two instances of the container.
* **Required:** No.
* Default: 1 (one instance of the container is deployed)

**Steps**  

Add the following yml block to your [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/) file.

```
  - name: app_replicas
    type: replicas
    version:
      count: 2
```

##6. Define `op_dev_cluster`, `op_test_cluster` and `op_prod_cluster`.

* **Description:** `op_dev_cluster`, `op_test_cluster` and `op_prod_cluster` are [cluster](/platform/workflow/resource/cluster/) resources that represents the Dev/Test/Prod clusters in your orchestration platform where your application is deployed to. In our example, the cluster points to a cluster on Amazon ECS.
* **Required:** Yes.
* Integrations needed: AWS IAM Integration

The list of supported container orchestration platforms can be found [here](/platform/integration/overview/#supported-orchestration-platform-integrations).

**Steps**

1. Create an account integration using your Shippable account for the orchestration platform. Instructions to create an integration can be found [here](http://docs.shippable.com/platform/tutorial/integration/howto-crud-integration/).

2. Set the friendly name of the integration as `op_int`. If you change the name, please change it also in the yml below.

3. Add the following yml block to your [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/) file.

```
  - name: op_dev_cluster    # resource friendly name
    type: cluster
    integration: op_int            
    pointer:
      sourceName: "deploy-ecs-dev-cluster" # name of the actual cluster in the orchestration service to which we are deploying
      region: "us-east-1" # region where cluster is located. This attribute is optional, depending on the orchestration platform.

  - name: op_test_cluster    # resource friendly name
    type: cluster
    integration: op_int            
    pointer:
      sourceName: "deploy-ecs-test-cluster" # name of the actual cluster in the orchestration service to which we are deploying
      region: "us-east-1" # region where cluster is located. This attribute is optional, depending on the orchestration platform.

  - name: op_prod_cluster    # resource friendly name
    type: cluster
    integration: op_int            
    pointer:
      sourceName: "deploy-ecs-prod-cluster" # name of the actual cluster in the orchestration service to which we are deploying
      region: "us-east-1" # region where cluster is located. This attribute is optional, depending on the orchestration platform.
```

##7. Define `app_dev_deploy_job`, `app_test_deploy_job` and `app_prod_deploy_job`.

* **Description:** `app_dev_deploy_job`, `app_test_deploy_job` and `app_prod_deploy_job` are [deploy](/platform/workflow/job/manifest) jobs that actually deploys the application manifest to the cluster and starts the container. The number of containers started depends on the `app_replicas` resource defined earlier.

Notice how we specify the `app_dev_deploy_job` as an input to the `app_test_deploy_job`. This essentially sets up staged deployment in the sense that once `app_dev_deploy_job` completes, it triggers `app_test_deploy_job`, which is the next job in the devops assembly line downstream.

We also set `switch: off` for app_test_service_def so that the both the dev and test deploy jobs do not start simulatenously when the service defintions get built once the image is built by CI.

**Required:** Yes.

**Steps**  

Add the following yml block to your [shippable.jobs.yml](/platform/tutorial/workflow/shippable-jobs-yml/) file.

```
  jobs:

  - name: app_dev_deploy_job
    type: deploy
    steps:
      - IN: app_dev_service_def
      - IN: op_dev_cluster
      - IN: app_replicas

  - name: app_test_deploy_job
    type: deploy
    steps:
      - IN: app_test_service_def
        switch: off
      - IN: op_test_cluster
      - IN: app_dev_deploy_job
      - IN: app_replicas

  - name: app_prod_deploy_job
    type: deploy
    steps:
      - IN: app_prod_service_def
        switch: off
      - IN: op_prod_cluster
      - IN: app_test_deploy_job
      - IN: app_replicas
```

##8. Import the configuration into your Shippable account to create the assembly line for the application.

Once you have these jobs and resources yml files as described above, commit them to your repository. You can then follow instructions to [add your assembly line to Shippable](/platform/tutorial/workflow/crud-syncrepo/).

##9. Trigger your pipeline

When you're ready for deployment, right-click on the manifest job in the [SPOG View](/platform/visibility/single-pane-of-glass-spog/), and select **Run Job**.

## Sample project

Here are some links to a working sample of this scenario.

**Source code:**  [devops-recipes/deploy-ecs-multi-env](https://github.com/devops-recipes/deploy-ecs-multi-env)

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
