main_section: Deploy
sub_section: Deploying to Amazon ECS

# amazon-ecs-multiple-containers
The strength of ECS is in its ability to orchestrate multi-container applications across a cluster of machines. There are several way to accomplish this on Shippable.  This page will discuss some of the most common ways to use Shippable to deploy multiple containers to ECS.

1. separate pipelines
2. two images, one manifest
3. multi-manifest deployment
4. two clusters, one manifest

## Setup

We'll start with some basic pipeline building blocks: one image, one manifest, one deploy job.

`shippable.resources.yml`
```
resources:

  - name: MyECSCluster
    type: cluster
    integration: MyECSCredentials
    pointer:
      sourceName: cluster-test-1
      region: us-west-2

  - name: MyNginxImage
    type: image
    pointer:
      sourceName: library/nginx
    seed:
      versionName: latest

```

`shippable.jobs.yml`
```
jobs:

  - name: MyNginxManifest
    type: manifest
    steps:
      - IN: MyNginxImage

  - name: DeployTo_cluster-test-1
    type: deploy
    steps:
      - IN: MyECSCluster
      - IN: MyNginxManifest

```



## Managed Deployments


### Basic Configuration

The main idea behind the basic configuration is that since the cluster resource is reusable, we can keep our workflows separate while deploying to the same endpoint.

To accomplish this, we'll simply add another image, manifest, and deploy job in parallel to the original, while keeping the cluster input the same.

Now the updated ymls should look like this:

```
resources:

  - name: MyECSCluster
    type: cluster
    integration: MyECSCredentials
    pointer:
      sourceName: cluster-test-1
      region: us-west-2

  - name: MyNginxImage
    type: image
    pointer:
      sourceName: library/nginx
    seed:
      versionName: latest

  - name: MyRedisImage
    type: image
    pointer:
      sourceName: library/redis
    seed:
      versionName: latest

```

```
jobs:

  - name: MyNginxManifest
    type: manifest
    steps:
      - IN: MyNginxImage

  - name: MyRedisManifest
    type: manifest
    steps:
      - IN: MyRedisImage


  - name: DeployNginx
    type: deploy
    steps:
      - IN: MyECSCluster
      - IN: MyNginxManifest

  - name: DeployRedis
    type: deploy
    steps:
      - IN: MyECSCluster
      - IN: MyRedisManifest

```

Once you push these changes, your pipeline should look like this:

<img src="../../images/spog/ecs-parallel-pipeline.png" alt="Parallel pipeline">

Now each pipeline is handled separately, but is being deployed to the same cluster.  Each deploy job will create its own service and task definition.  When you run each manifest job, you can see the results on ECS:


<img src="../../images/aws/ecs-parallel-pipeline-results.png" alt="Parallel pipeline results">

### Advanced Configuration: two images in one manifest

When two images depend on each other, it might make more sense to combine them into the same manifest. This will guarantee that they will run on the same machine and be able to directly communicate via localhost or container linking.

Shippable natively supports this, and it's quite simple to implement.  In your manifest job, just include both images as separate IN statements like this:

```
jobs:

  - name: MyAppManifest
    type: manifest
    steps:
      - IN: MyNginxImage
      - IN: MyRedisImage


  - name: DeployApp
    type: deploy
    steps:
      - IN: MyECSCluster
      - IN: MyAppManifest

```

This will result in a single service being created or updated with a single task definition that contains two container definitions.  The pipeline should look like this:

<img src="../../images/spog/ecs-multi-manifest-pipeline.png" alt="Multi-manifest pipeline">

And deployment to Amazon ECS should result in a task definition that looks like this:

<img src="../../images/aws/ecs-multi-manifest-pipeline-results.png" alt="Multi-manifest pipeline results">

Now, any time either image is updated with a new version, the pipeline will be triggered, and your combined manifest will always be up-to-date.


### Advanced Configuration: multiple manifest deployment

It is also possible to deploy several manifests in the same deploy job.  Shippable by default will deploy them in the order that they are supplied in the steps section of the job.  This is a nice way to organize your pipeline and keep together manifests that end up on the same cluster.


Lets start with our two images and our cluster:

```
resources:

  - name: MyECSCluster
    type: cluster
    integration: MyECSCredentials
    pointer:
      sourceName: cluster-test-1
      region: us-west-2

  - name: MyNginxImage
    type: image
    pointer:
      sourceName: library/nginx
    seed:
      versionName: latest

  - name: MyRedisImage
    type: image
    pointer:
      sourceName: library/redis
    seed:
      versionName: latest

```

And now lets add a second manifest job and modify the deploy job to take both manifests as INs

```
jobs:

  - name: MyNginxManifest
    type: manifest
    steps:
      - IN: MyNginxImage

  - name: MyRedisManifest
    type: manifest
    steps:
      - IN: MyRedisImage

  - name: DeployTo_cluster-test-1
    type: deploy
    steps:
      - IN: MyECSCluster
      - IN: MyNginxManifest
      - IN: MyRedisManifest

```

Once these changes are pushed, your pipeline will look like this:

<img src="../../images/spog/ecs-multi-mani-single-deploy-pipeline.png" alt="Multi-manifest pipeline with single deploy job">

When you run the deploy job, the following steps will be taken:

  - register new task definition for nginx manifest
  - create or update service with nginx task definition
  - wait for runningCount to reach desiredCount
  - register new task definition for redis manifest
  - create or update service with redis task definition
  - wait for runningCount to reach desiredCount
  - complete successfully

Once the deploy job completes, your Amazon ECS cluster should show two new services, each one running a task with one of the images.

<img src="../../images/aws/ecs-multi-mani-single-deploy-pipeline-results.png" alt="Multi-manifest pipeline with single deploy results">

You'll see in the logs that each manifest is deployed in turn, and the deploy job waits for each service to be running steadily before moving on to the next manifest.

<img src="../../images/spog/ecs-multi-manifest-single-deploy-pipeline-logs.png" alt="Multi-manifest pipeline with single deploy logs">

## Unmanaged Deployments

coming soon
