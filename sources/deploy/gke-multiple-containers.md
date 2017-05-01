main_section: Deploy
sub_section: GKE

# Deploying Multiple Containers to Google Container Engine
The strength of Google Container Engine (GKE) is in its ability to orchestrate multi-container applications across a cluster of machines. There are several ways to accomplish this on Shippable.

## The Goal

This page will discuss the three most common ways to use Shippable to deploy multiple containers to GKE:

- Separate parallel pipelines
- Adding two images to a single manifest
- Multi-manifest deployment

In the end, if you try each of these scenarios, your pipeline might look something like this:
<img src="../../images/deploy/amazon-ecs/multi-cont-final-pipeline.png" alt="Final pipeline">


## The Setup
Make sure you have a cluster set up on GKE, then create an integration and cluster resource [as described in the setup section here](./gke)

We'll start with some basic pipeline building blocks: one image, one manifest, one deploy job.

`shippable.resources.yml`
```
resources:

  - name: deploy-gke-multi-container-image
    type: image
    integration: dr-gke
    pointer:
      sourceName: "gcr.io/sample-gke/deploy-gke-multi-container"
    seed:
      versionName: "latest"


  - name: deploy-gke-multi-container-gke-cluster
    type: cluster
    integration: dr-gke
    pointer:
      sourceName : "deploy-gke-basic" #name of the cluster to which we are deploying
      namespace: "shippable" # optional. deploys to 'default' if not specified
```

`shippable.jobs.yml`
```
jobs:

  - name: deploy-gke-multi-container-manifest
    type: manifest
    flags:
      - deploy-gke-multi-container
    steps:
     - IN: deploy-gke-multi-container-image

 - name: deploy-gke-multi-container-deploy
   type: deploy
   flags:
     - deploy-gke-multi-container
   steps:
     - IN: deploy-gke-multi-container-manifest
     - IN: deploy-gke-multi-container-gke-cluster

```

## Managed Deployments
Managed deployments allow you to skip the scripting and let Shippable take control of building the appropriate objects and issuing the various commands.

### Basic Configuration

The main idea behind the basic configuration is that since the cluster resource is reusable, we can keep our workflows separate while deploying to the same endpoint.

To accomplish this, we'll simply add another image, manifest, and deploy job in parallel to the original, while keeping the cluster input the same.

Now the updated ymls should look like this:

```
resources:

  - name: deploy-gke-multi-container-image
    type: image
    integration: dr-gke
    pointer:
      sourceName: "679404489841.dkr.ecr.us-east-1.amazonaws.com/deploy-gke-multi-container"
    seed:
      versionName: "latest"

  - name: deploy-gke-multi-container-nginx
    type: image
    integration: dr-gke
    pointer:
      sourceName: "library/nginx"
    seed:
      versionName: "1.12.0"

  - name: deploy-gke-multi-container-gke-cluster
    type: cluster
    integration: dr-gke
    pointer:
      sourceName: "deploy-gke-basic" #name of the cluster to which we are deploying
      namespace: "shippable"

```

```
jobs:

  - name: deploy-gke-multi-container-manifest-3a
    type: manifest
    steps:
     - IN: deploy-gke-multi-container-image

  - name: deploy-gke-multi-container-manifest-3b
    type: manifest
    steps:
      - IN: deploy-gke-multi-container-nginx

  - name: deploy-gke-multi-container-deploy-3a
    type: deploy
    steps:
      - IN: deploy-gke-multi-container-manifest-3a
      - IN: deploy-gke-multi-container-gke-cluster

  - name: deploy-gke-multi-container-deploy-3b
    type: deploy
    steps:
      - IN: deploy-gke-multi-container-manifest-3b
      - IN: deploy-gke-multi-container-gke-cluster
```

Once you push these changes, your pipeline should look like this:

<img src="../../images/deploy/amazon-ecs/ecs-parallel-pipeline.png" alt="Parallel pipeline">

Now each pipeline is handled separately, but is being deployed to the same cluster and namespace.  Each deploy job will create its own replicationController.  When you run each manifest job, you can see the results of the subsequent deploy jobs by issuing `kubectl get rc --namespace=shippable`

### Advanced Configuration: two images in one manifest

When two containers depend on each other, it might make more sense to combine them into the same manifest. This will guarantee that they will run on the same machine and be able to directly communicate inside the pod via localhost.

Shippable natively supports this, and it's quite simple to implement.  In your manifest job, just include both images as separate IN statements like this:

```
jobs:

  - name: deploy-gke-multi-container-manifest-1
    type: manifest
    steps:
     - IN: deploy-gke-multi-container-image
     - IN: deploy-gke-multi-container-nginx

  - name: deploy-gke-multi-container-deploy-1
    type: deploy
    steps:
      - IN: deploy-gke-multi-container-manifest-1
      - IN: deploy-gke-multi-container-gke-cluster

```

This will result in a replicationController being created or updated with a single pod spec that contains two container definitions.  The pipeline should look like this:

<img src="../../images/deploy/amazon-ecs/ecs-multi-image-manifest-pipeline.png" alt="Multi-image-manifest pipeline">

And deployment to GKE should result in a pod that contains both images.

Now, any time either image is updated with a new version, the pipeline will be triggered, and your combined manifest will always be up-to-date in your RC.


### Advanced Configuration: multiple manifest deployment

It is also possible to deploy several manifests in the same deploy job.  Shippable by default will deploy them in the order that they are supplied in the steps section of the job.  This is a nice way to organize your pipeline and keep together manifests that end up on the same cluster.

Lets start with our two images and our cluster:

```
resources:

  - name: deploy-gke-multi-container-image
    type: image
    integration: dr-gke
    pointer:
      sourceName: "gcr.io/sample-gke/deploy-gke-multi-container"
    seed:
      versionName: "latest"

  - name: deploy-gke-multi-container-nginx
    type: image
    integration: dr-gke
    pointer:
      sourceName: "gcr.io/sample-gke/nginx"
    seed:
      versionName: "1.12.0"

  - name: deploy-gke-multi-container-gke-cluster
    type: cluster
    integration: dr-gke
    pointer:
      sourceName : "deploy-gke-basic" #name of the cluster to which we are deploying
      namespace: "shippable"
```

And now lets add a second manifest job and modify the deploy job to take both manifests as INs

```
jobs:

  - name: deploy-gke-multi-container-manifest-2a
    type: manifest
    steps:
     - IN: deploy-gke-multi-container-image

  - name: deploy-gke-multi-container-manifest-2b
    type: manifest
    steps:
      - IN: deploy-gke-multi-container-nginx

  - name: deploy-gke-multi-container-deploy
    type: deploy
    steps:
      - IN: deploy-gke-multi-container-manifest-2a
      - IN: deploy-gke-multi-container-manifest-2b
      - IN: deploy-gke-multi-container-gke-cluster

```

Once these changes are pushed, your pipeline will look like this:

<img src="../../images/deploy/amazon-ecs/ecs-multi-mani-single-deploy-pipeline.png" alt="Multi-manifest pipeline with single deploy job">

When you run the deploy job, the following steps will be taken:

  - create or update replicationController with application pod spec
  - wait for running pod count to reach specified replicas value  
  - create or update replicationController with nginx pod spec
  - wait for running pod count to reach specified replicas value  
  - complete successfully

Once the deploy job completes, your GKE cluster should show two new replicationControllers, each one running a pod with one of the images.

You'll see in the logs that each manifest is deployed in turn, and the deploy job waits for each service to be running steadily before moving on to the next manifest.


## Unmanaged Deployments

In an unmanaged scenario, you'll be using a runCLI job with an GKE cliConfig [as described in the unmanaged section of our basic scenario](./gke#unmanaged-deployments).

For unamanged jobs, the deployment workflow is under your control, but here is a description of how shippable treats different scenarios in the managed jobs.  You can duplicate this functionlity in your own scripts and even discover ways of improving the logic.

two manifests into a single deploy job:

- create two replicationControllers, each with a pod spec that corresponds to one of the manifests

two images in one manifest:

- create one replicationController with two items in the containers array.

one manifest used by two deploy jobs:

- create one replicationController per deploy job. Each one takes its pod spec from the manifest.
