page_main_title: Amazon ECS Deploying multi-container services
main_section: Deploy
sub_section: Amazon ECS

# Deploying Multiple Containers to Amazon ECS

The strength of Amazon ECS is in its ability to orchestrate multi-container applications across a cluster of machines. There are several ways to accomplish this on Shippable.  

This page will discuss the three most common ways to use Shippable to deploy multiple containers to ECS:

- **Parallel pipelines:** You can define one container per manifest and have separate deploy jobs for each manifest. In this scenario, each container will be deployed independently when its pipeline is triggered.

<img src="../../images/deploy/amazon-ecs/ecs-parallel-pipeline.png" alt="Parallel pipeline"y>

- **Multiple images in a single [manifest](/platform/workflow/job/manifest/):** In this scenario, all containers in the manifest will be deployed at the same time and on the same node. This will guarantee that they will be able to directly communicate on ECS via localhost or container linking.

<img src="../../images/deploy/amazon-ecs/ecs-multi-image-manifest-pipeline.png" alt="Multi-image-manifest pipeline">

- **Multi-manifest deployment:** You can include one image per manifest, but choose to deploy several manifests together. In this scenario, all containers will be deployed at the same time, but only containers in the same manifest are guaranteed to be deployed on the same node.

<img src="../../images/deploy/amazon-ecs/ecs-multi-mani-single-deploy-pipeline.png" alt="Multi-manifest pipeline with single deploy job">

##Parallel pipelines

###1: Set up basic deployment

As a pre-requisite for these instructions, you should already have set up deployment to ECS.

You can follow the tutorial on [Managed deployments](/deploy/amazon-ecs/). This will give you the resources and jobs required to deploy a single container to ECS.

###2. Add a second pipeline

Update `shippable.resources.yml` with an additional `image`. We're just using a standard nginx image here, but you can use the image you need.

```
resources:

  - name: deploy-ecs-image-nginx     #image resource for nginx
    type: image
    integration: dr-ecr              #ECR integration that has permissions to pull the image
    pointer:
      sourceName: "679404489841.dkr.ecr.us-east-1.amazonaws.com/nginx"
    seed:
      versionName: "1.12.0"

```

Update `shippable.jobs.yml` with the new `manifest` and `deploy` jobs. We are adding a manifest for the nginx image, and updating the deploy job to accept the new manifest as an IN:

```
jobs:

  - name: deploy-ecs-nginx         #manifest for nginx image
    type: manifest
    steps:
      - IN: deploy-ecs-image-nginx

  - name: deploy-ecs-multi-container-deploy-3b
    type: deploy
    steps:
      - IN: deploy-ecs-nginx
      - IN: deploy-ecs-basic-cluster

```

Push your changes to your **syncRepo** and your your pipeline will be updated to look like this:

<img src="../../images/deploy/amazon-ecs/ecs-parallel-pipeline.png" alt="Parallel pipeline">

Now each pipeline is handled separately, but is being deployed to the same cluster.  Each deploy job will create its own service and task definition.  When you run each manifest job, you can see the results on ECS:

<img src="../../images/deploy/amazon-ecs/ecs-parallel-pipeline-results.png" alt="Parallel pipeline results">

## Multiple images in one manifest

When two containers depend on each other, it might make more sense to combine them into the same manifest. This will guarantee that they will run on the same machine and be able to directly communicate on ECS via localhost or container linking.

Shippable natively supports this, and it's quite simple to implement.  In your manifest job, just include both images as separate IN statements like this:

```
jobs:

  - name: deploy-ecs-multi-container-manifest-1
    type: manifest
    steps:
     - IN: deploy-ecs-multi-container-image
     - IN: deploy-ecs-multi-container-nginx

  - name: deploy-ecs-multi-container-deploy-1
    type: deploy
    steps:
      - IN: deploy-ecs-multi-container-manifest-1
      - IN: deploy-ecs-multi-container-ecs-cluster

```

This will result in a single service being created or updated with a single task definition that contains two container definitions.  The pipeline should look like this:

<img src="../../images/deploy/amazon-ecs/ecs-multi-image-manifest-pipeline.png" alt="Multi-image-manifest pipeline">

And deployment to Amazon ECS should result in a task definition that looks like this:

<img src="../../images/deploy/amazon-ecs/ecs-multi-image-manifest-pipeline-results.png" alt="Multi-image-manifest pipeline results">

Now, any time either image is updated with a new version, the pipeline will be triggered, and your combined manifest will always be up-to-date.


## Multi-manifest deployment

It is also possible to deploy several manifests in the same deploy job.  Shippable by default will deploy them in the order that they are supplied in the steps section of the job.  This is a nice way to organize your pipeline and keep together manifests that end up on the same cluster.

###1: Lets start with our two images and our cluster:

```
resources:

  - name: deploy-ecs-multi-container-image
    type: image
    integration: dr-ecr
    pointer:
      sourceName: "679404489841.dkr.ecr.us-east-1.amazonaws.com/deploy-ecs-multi-container"
    seed:
      versionName: "latest"

  - name: deploy-ecs-multi-container-nginx
    type: image
    integration: dr-ecr
    pointer:
      sourceName: "679404489841.dkr.ecr.us-east-1.amazonaws.com/nginx"
    seed:
      versionName: "1.12.0"

  - name: deploy-ecs-multi-container-ecs-cluster
    type: cluster
    integration: dr-aws
    pointer:
      sourceName: "deploy-ecs-basic" #name of the cluster to which we are deploying
      region: "us-east-1"
```

###2: Add a second manifest job and modify the deploy job to take both manifests as INs.

```
jobs:

  - name: deploy-ecs-multi-container-manifest-2a
    type: manifest
    steps:
     - IN: deploy-ecs-multi-container-image

  - name: deploy-ecs-multi-container-manifest-2b
    type: manifest
    steps:
      - IN: deploy-ecs-multi-container-nginx

  - name: deploy-ecs-multi-container-deploy
    type: deploy
    steps:
      - IN: deploy-ecs-multi-container-manifest-2a
      - IN: deploy-ecs-multi-container-manifest-2b
      - IN: deploy-ecs-multi-container-ecs-cluster

```

Once these changes are pushed, your pipeline will look like this:

<img src="../../images/deploy/amazon-ecs/ecs-multi-mani-single-deploy-pipeline.png" alt="Multi-manifest pipeline with single deploy job">

When you run the deploy job, the following steps will be taken:

  - register new task definition for application manifest
  - create or update service with application task definition
  - wait for runningCount to reach desiredCount
  - register new task definition for nginx manifest
  - create or update service with nginx task definition
  - wait for runningCount to reach desiredCount
  - complete successfully

Once the deploy job completes, your Amazon ECS cluster should show two new services, each one running a task with one of the images.

<img src="../../images/deploy/amazon-ecs/ecs-multi-mani-single-deploy-pipeline-results.png" alt="Multi-manifest pipeline with single deploy results">

You'll see in the logs that each manifest is deployed in turn, and the deploy job waits for each service to be running steadily before moving on to the next manifest.

<img src="../../images/deploy/amazon-ecs/ecs-multi-manifest-single-deploy-pipeline-logs.png" alt="Multi-manifest pipeline with single deploy logs">


## Sample project

Here are some links to a working sample of this scenario. This is a simple Node.js application that runs some tests and then pushes
the image to Amazon ECR. It also contains all of the pipelines configuration files for deploying to Amazon ECS for all of the scenarios described above.

**Source code:**  [devops-recipes/deploy-ecs-multi-container](https://github.com/devops-recipes/deploy-ecs-multi-container)

**Build status badge:** [![Run Status](https://api.shippable.com/projects/58f98b298c0a6707003b237a/badge?branch=master)](https://app.shippable.com/github/devops-recipes/deploy-ecs-multi-container)

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
