main_section: Deploy
sub_section: Amazon ECS

# Deploying Multiple Containers to Amazon ECS
The strength of ECS is in its ability to orchestrate multi-container applications across a cluster of machines. There are several ways to accomplish this on Shippable.  

## The Goal

This page will discuss the three most common ways to use Shippable to deploy multiple containers to ECS:

- Separate parallel pipelines
- Adding two images to a single manifest
- Multi-manifest deployment

In the end, if you try each of these scenarios, your pipeline might look something like this:
<img src="../../images/deploy/amazon-ecs/multi-cont-final-pipeline.png" alt="Final pipeline">


## The Setup
Make sure you have a cluster set up on Amazon ECS, then create an integration and cluster resource [as described in the setup section here](./amazon-ecs)

We'll start with some basic pipeline building blocks: one image, one manifest, one deploy job.

`shippable.resources.yml`
```
resources:

  - name: deploy-ecs-multi-container-image
    type: image
    integration: dr-ecr
    pointer:
      sourceName: "679404489841.dkr.ecr.us-east-1.amazonaws.com/deploy-ecs-multi-container"
    seed:
      versionName: "latest"


  - name: deploy-ecs-multi-container-ecs-cluster
    type: cluster
    integration: dr-aws
    pointer:
      sourceName : "deploy-ecs-basic" #name of the cluster to which we are deploying
      region: "us-east-1"
```

`shippable.jobs.yml`
```
jobs:

  - name: deploy-ecs-multi-container-manifest
    type: manifest
    flags:
      - deploy-ecs-multi-container
    steps:
     - IN: deploy-ecs-multi-container-image

 - name: deploy-ecs-multi-container-deploy
   type: deploy
   flags:
     - deploy-ecs-multi-container
   steps:
     - IN: deploy-ecs-multi-container-manifest
     - IN: deploy-ecs-multi-container-ecs-cluster

```

## Managed Deployments
Managed deployments allow you to skip the scripting and let Shippable take control of building the appropriate objects and issuing the various commands.

### Basic Configuration

The main idea behind the basic configuration is that since the cluster resource is reusable, we can keep our workflows separate while deploying to the same endpoint.

To accomplish this, we'll simply add another image, manifest, and deploy job in parallel to the original, while keeping the cluster input the same.

Now the updated ymls should look like this:

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
      sourceName : "deploy-ecs-basic" #name of the cluster to which we are deploying
      region: "us-east-1"

```

```
jobs:

  - name: deploy-ecs-multi-container-manifest-3a
    type: manifest
    steps:
     - IN: deploy-ecs-multi-container-image

  - name: deploy-ecs-multi-container-manifest-3b
    type: manifest
    steps:
      - IN: deploy-ecs-multi-container-nginx

  - name: deploy-ecs-multi-container-deploy-3a
    type: deploy
    steps:
      - IN: deploy-ecs-multi-container-manifest-3a
      - IN: deploy-ecs-multi-container-ecs-cluster

  - name: deploy-ecs-multi-container-deploy-3b
    type: deploy
    steps:
      - IN: deploy-ecs-multi-container-manifest-3b
      - IN: deploy-ecs-multi-container-ecs-cluster
```

Once you push these changes, your pipeline should look like this:

<img src="../../images/deploy/amazon-ecs/ecs-parallel-pipeline.png" alt="Parallel pipeline">

Now each pipeline is handled separately, but is being deployed to the same cluster.  Each deploy job will create its own service and task definition.  When you run each manifest job, you can see the results on ECS:

<img src="../../images/deploy/amazon-ecs/ecs-parallel-pipeline-results.png" alt="Parallel pipeline results">

### Advanced Configuration: two images in one manifest

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


### Advanced Configuration: multiple manifest deployment

It is also possible to deploy several manifests in the same deploy job.  Shippable by default will deploy them in the order that they are supplied in the steps section of the job.  This is a nice way to organize your pipeline and keep together manifests that end up on the same cluster.

Lets start with our two images and our cluster:

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
      sourceName : "deploy-ecs-basic" #name of the cluster to which we are deploying
      region: "us-east-1"
```

And now lets add a second manifest job and modify the deploy job to take both manifests as INs

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


## Unmanaged Deployments

In an unmanaged scenario, you'll be using a runCLI job with an AWS cliConfig [as described in the unmanaged section of our basic scenario](./amazon-ecs).

For unamanged jobs, the deployment workflow is under your control, but here is a description of how shippable treats different scenarios in the managed jobs.  You can duplicate this functionlity in your own scripts and even discover ways of improving the logic.

two manifests into a single deploy job:

- create two services and two task definitions, each task definition corresponds to one of the manifests

two images in one manifest:

- create one task definition with two items in the container definitions array. create one service to use the task definition.

one manifest used by two deploy jobs:

- create one task definition. create two services. update each service to use the same task definition.
