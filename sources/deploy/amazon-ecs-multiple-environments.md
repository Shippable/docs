main_section: Deploy
sub_section: Amazon ECS

# Deploying to multiple Amazon ECS Environments
Most of the time, you'll want to utilize multiple environments in your pipeline.  One common example would be having automatic deployments to a test environment, followed by a manual deployment to production.  You can easily achieve this using Shippable pipelines, and this page will tell you how.

## The Goal
This page will discuss two examples that utilize multiple environments on Amazon ECS and manage them in the same pipeline.  

- serial environments (beta->prod)
- parallel environments (blue/green)

In the end, your pipeline might look like this:
<img src="../../images/deploy/amazon-ecs/multi-env-final-pipeline.png" alt="Final pipeline">


## Setup
Make sure you have a cluster set up on Amazon ECS, then create an integration and cluster resource [as described in the setup section here](./amazon-ecs)

Let's keep our example scenario simple.  One image and one manifest to start.

```
resources:

  - name: deploy-ecs-multi-env-image
    type: image
    integration: dr-ecr
    pointer:
      sourceName: "679404489841.dkr.ecr.us-east-1.amazonaws.com/deploy-ecs-multi-env"
    seed:
      versionName: "latest"

```

```
jobs:

  - name: deploy-ecs-multi-env-manifest
    type: manifest
    steps:
      - IN: deploy-ecs-multi-env-image
```


## Managed deployments
Shippable managed deployments give you a ton of flexibility in how you structure your pipeline.  Deploy jobs accept manifests as inputs, but can also accept other deploy jobs, by themselves or in combination with manifests.  This allows you to put your pipeline together in whatever way works best for your system while maintaining a simple visual on the whole process.  This page will discuss a couple of the most common scenarios involving multiple deployment environments.

### Serial Environments

```
CI -> Amazon ECR -> manifest -> deploy to beta -> deploy to production
```

- each environment gets its own unique parameters and settings
- environments each deploy to a different cluster
- beta environment is automatically triggered
- production environment is manual-deploy only


Add two `params` resources, each one having a unique ENV for the cluster it will be deployed to.

```
resources:

  - name: deploy-ecs-multi-env-betaparams
    type: params
    version:
      params:
        ENVIRONMENT: "beta"

  - name: deploy-ecs-multi-env-prodparams
    type: params
    version:
      params:
        ENVIRONMENT: "prod"

```

Add two clusters to deploy to.

```
resources:

  - name: deploy-ecs-multi-env-betacluster
    type: cluster
    integration: dr-aws
    pointer:
      sourceName : "deploy-ecs-beta" #name of the cluster to which we are deploying
      region: "us-east-1"

  - name: deploy-ecs-multi-env-prodcluster
    type: cluster
    integration: dr-aws
    pointer:
      sourceName : "deploy-ecs-prod" #name of the cluster to which we are deploying
      region: "us-east-1"

```

Add two deploy jobs:

- The beta job should take the beta params, beta cluster, and the manifest as `IN` statements.  
- The prod job should take the beta deploy job, prod params, and prod cluster as `IN` statements.

```
jobs:

  - name: deploy-ecs-multi-env-betadeploy
    type: deploy
    steps:
      - IN: deploy-ecs-multi-env-betaparams
      - IN: deploy-ecs-multi-env-manifest
      - IN: deploy-ecs-multi-env-betacluster

  - name: deploy-ecs-multi-env-proddeploy
    type: deploy
    steps:
      - IN: deploy-ecs-multi-env-prodparams
        switch: off
      - IN: deploy-ecs-multi-env-betadeploy
        switch: off
      - IN: deploy-ecs-multi-env-prodcluster
        switch: off

```

Using `switch: off` prevents accidental deployments to production.

Your pipeline should look like this:
<img src="../../images/deploy/amazon-ecs/ecs-multi-env-serial-pipeline.png" alt="serial pipeline">

Notice the dotted lines connecting the resources to production. This is the visual representation of the break in automation that `switch: off` causes.

### Parallel Environments

```
CI -> Amazon ECR -> manifest -> blue
                             -> green
```

- both environments will be connected to the same manifest job
- each environment has its own cluster
- clusters can be divided in a variety of ways:
    - different parameters on same physical cluster
    - different clusters on same region
    - different clusters on different regions
    - different clusters on different cloud providers


Add a `params` resource to distinguish the different environments within the containers.  We'll deploy both images to the same cluster using different parameters.

```
resources:
  - name: deploy-ecs-multi-env-blueparams
    type: params
    version:
      params:
        ENVIRONMENT: "blue"

  - name: deploy-ecs-multi-env-greenparams
    type: params
    version:
      params:
        ENVIRONMENT: "green"

  - name: deploy-ecs-multi-env-maincluster
    type: cluster
    integration: dr-aws
    pointer:
      sourceName : "deploy-ecs-basic" #name of the cluster to which we are deploying
      region: "us-east-1"

```


Add two deploy jobs: one for "blue" and one for "green".  Both will take the same manifest as input.
```
jobs:

  - name: deploy-ecs-multi-env-bluedeploy
    type: deploy
    steps:
      - IN: deploy-ecs-multi-env-blueparams
      - IN: deploy-ecs-multi-env-manifest
        switch: off
      - IN: deploy-ecs-multi-env-maincluster

  - name: deploy-ecs-multi-env-greendeploy
    type: deploy
    steps:
      - IN: deploy-ecs-multi-env-greenparams
      - IN: deploy-ecs-multi-env-manifest
        switch: off
      - IN: deploy-ecs-multi-env-maincluster
```

Use `switch: off` to prevent auto-deployments.  In this case, we want both environments to be manual deployments.

Once you add these to your pipeline, check out your SPOG. It should look something like this:

<img src="../../images/deploy/amazon-ecs/ecs-multi-env-parallel-pipeline.png" alt="blue-green pipeline">

First, run the manifest job.  Then, since `switch: off` is present on the manifest input, you'll have to right-click and select **Run Job** to start the deployment.

If you're following along with our sample app, you should be able to access the page, on which you can see the environment, injected by the `params` resource.

<img src="../../images/deploy/amazon-ecs/ecs-multi-env-parallel-blue.png" alt="blue-green pipeline">


### Advanced
The differences between environments often go beyond a simple cluster change.  Shippable lets you set and override a variety of options via `params` and `dockerOptions` resources.

Lets see some of these in action.  Start by using our sample pipeline from the 'serial environments' section of this page.

Add two [dockerOptions resources](../reference/resource-dockeroptions) to the pipeline. One for each deploy job.
```
resources:

  - name: deploy-ecs-multi-env-prodopts
    type: dockerOptions
    version:
      memory: 512

  - name: deploy-ecs-multi-env-betaopts
    type: dockerOptions
    version:
      memory: 128

```
We're allocating more memory for production since it runs with much higher load.

Modify our existing params resource to help us [integrate with Slack](../reference/int-slack).  We'll want to send messages to a different channel depending on which environment we're in.

```
resources:

  - name: deploy-ecs-multi-env-commonparams
    type: params
    version:
      params:
        SLACK_TOKEN: "abc123"

  - name: deploy-ecs-multi-env-betaparams
    type: params
    version:
      params:
        ENVIRONMENT: "beta"
        SLACK_CHANNEL: "beta_status"

  - name: deploy-ecs-multi-env-betaparams
    type: params
    version:
      params:
        ENVIRONMENT: "prod"
        SLACK_CHANNEL: "prod_status"
```

Shippable by default implements a pattern of overrides for both `params` and `dockerOptions`.  When these resources are added to a manifest, the settings pass forward through each step of the pipeline until the pipeline ends or they are overwritten by some other resource.  

In this case, we will add our common slack token to the original manifest, and each relevant deploy job will have its own `params` resource attached.  When deploying to prod, the `ENVIRONMENT` and `SLACK_CHANNEL` parameters that were carried forward from the beta environment will be overwritten to match the new settings added to the prod deploy job, and the `SLACK_TOKEN` will carry forward from the original manifest all the way through to the production deployment.

With these new items, the pipeline should look like this:

<img src="../../images/deploy/amazon-ecs/ecs-multi-env-serial-advanced.png" alt="serial params pipeline">

After deploying beta to the Amazon ECS cluster, you can look up the running task definition. Inside, you should see the ENVs that were set via params, as well as the memory setting from the `dockerOptions`.

<img src="../../images/deploy/amazon-ecs/ecs-multi-env-serial-beta-results.png" alt="serial beta task definition">


Now run the production deploy job.  Once the deployment has finished, you can examine the task definition. You should see that its settings are properly modified to reflect the environment, while the token from the original manifest remains unchanged.

<img src="../../images/deploy/amazon-ecs/ecs-multi-env-serial-prod-results.png" alt="serial prod task definition">

*NOTE: Directly committing a private token is not recommended. Instead, the same functionality can be achieved by using [secure environment variables](../../ci/env-vars/#secure-variables) in your params resource.*

## Sample project

Here are some links to a working sample of this scenario. This is a simple Node.js application that runs some tests and then pushes
the image to Amazon ECR. It also contains all of the pipelines configuration files for deploying to Amazon ECS for all of the scenarios described above.

**Source code:**  [devops-recipes/deploy-ecs-multi-env](https://github.com/devops-recipes/deploy-ecs-multi-env)

**Build status badge:** [![Run Status](https://api.shippable.com/projects/58fa52452ddacd090043d8a2/badge?branch=master)](https://app.shippable.com/github/devops-recipes/deploy-ecs-multi-env)


## Unmanaged deployments

In an unmanaged scenario, you'll be using a runCLI job with an AWS cliConfig [as described in the unmanaged section of our basic scenario](./amazon-ecs#unmanaged-deployments).

For unmanaged jobs, you can run your awscli commands against any cluster and region that you want. Deploying to one or more environments can be as easy as changing your default region on the awscli, or simply specifying a different `--cluster` when creating a service.
