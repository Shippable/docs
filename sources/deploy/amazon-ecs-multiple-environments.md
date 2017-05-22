page_main_title: Amazon ECS Deploying to multiple environments
main_section: Deploy
sub_section: Amazon ECS

# Deploying to multiple Amazon ECS Environments

Most of the time, you'll want to utilize multiple environments in your pipeline.  One common example would be having automatic deployments to a test environment, followed by a manual deployment to production.  You can easily achieve this using Shippable pipelines, and this page will tell you how.

## The Goal
This page will discuss two examples that utilize multiple environments on Amazon ECS and manage them in the same pipeline.  

- Serial environments (beta->prod)
- Parallel environments (blue/green)

In the end, your pipeline might look like this:
<img src="../../images/deploy/amazon-ecs/multi-env-final-pipeline.png" alt="Final pipeline">


## Serial environments

###1: Set up basic deployment

As a pre-requisite for these instructions, you should already have set up deployment to ECS.

You can follow the tutorial on [Managed deployments](/deploy/amazon-ecs/). This will give you the resources and jobs required to deploy a single container to ECS.

###2: Add a serial environment

A serial environment scenario looks like this:

```
CI -> Amazon ECR -> manifest -> deploy to beta -> deploy to prod
```

If you followed the [Managed deployments](/deploy/amazon-ecs/) docs, you already have a pipeline that deploys to the first environment, beta.

Now let's add the prod environment. We will need a new [cluster](/reference/resource-cluster/) for production, as well as a [deploy](/reference/job-deploy/) job.

Cluster definition in `shippable.resources.yml`:

```
resources:

  - name: deploy-ecs-prodcluster
    type: cluster
    integration: dr-aws
    pointer:
      sourceName : "deploy-ecs-prod" #name of the cluster to which we are deploying
      region: "us-east-1"
```

Now we define the job in `shippable.jobs.yml`. Please note that this job will take the beta deploy job as an IN.

```
jobs:
  - name: deploy-ecs-multi-env-proddeploy
    type: deploy
    steps:
      - IN: deploy-ecs-basic-deploy             #this is your job that deploys to the preceding env
        switch: off
      - IN: deploy-ecs-prodcluster
        switch: off
```

Using `switch: off` prevents automatic deployments to production when the previous job finishes.

Your pipeline should look like this:
<img src="../../images/deploy/amazon-ecs/ecs-multi-env-serial-pipeline.png" alt="serial pipeline">

Notice the dotted lines connecting the resources to production. This is the visual representation of the break in automation that `switch: off` causes.

###3. Specify environment specific settings

To make our scenario more realistic, we're going to configure each environment with its own unique parameters and settings. **This is an optional step.**

In your `shippable.resources.yml`, add two `params` resources, each one having a unique ENV for the cluster it will be deployed to.

```
resources:

  - name: deploy-ecs-betaparams
    type: params
    version:
      params:
        ENVIRONMENT: "beta"

  - name: deploy-ecs-prodparams
    type: params
    version:
      params:
        ENVIRONMENT: "prod"

```

Now, change your `shippable.jobs.yml` to provide these params to your deploy jobs.

```
jobs:

  - name: deploy-ecs-basic-deploy
    type: deploy
    steps:
      - IN: deploy-ecs-basic-manifest
      - IN: deploy-ecs-betaparams
      - IN: deploy-ecs-basic-ecs-cluster

  - name: deploy-ecs-proddeploy
    type: deploy
    steps:
      - IN: deploy-ecs-prodparams
        switch: off
      - IN: deploy-ecs-basic-deploy
        switch: off
      - IN: deploy-ecs-prodcluster
        switch: off

```

With this configuration, your container running in the Beta environment will have the $ENVIRONMENT variable set to "beta", while your container running in the Prod environment will have the $ENVIRONMENT variable set to "prod".

###4. Specify different options

You can set different options for your containers with the `dockerOptions` resource, depending on which environment they are running in.

Add two [dockerOptions resources](../reference/resource-dockeroptions), one for each deploy job, to the pipeline in `shippable.resources.yml`. Here, we're allocating more memory for production since it runs with much higher load.

```
resources:

  - name: deploy-ecs-prodopts
    type: dockerOptions
    version:
      memory: 512

  - name: deploy-ecs-betaopts
    type: dockerOptions
    version:
      memory: 128

```

These can be used as an IN to your deploy jobs in `shippable.jobs.yml`

```
jobs:

  - name: deploy-ecs-basic-deploy
    type: deploy
    steps:
      - IN: deploy-ecs-basic-manifest
      - IN: deploy-ecs-betaopts
      - IN: deploy-ecs-basic-ecs-cluster

  - name: deploy-ecs-proddeploy
    type: deploy
    steps:
      - IN: deploy-ecs-prodopts
        switch: off
      - IN: deploy-ecs-basic-deploy
        switch: off
      - IN: deploy-ecs-prodcluster
        switch: off

```

## Parallel Environments

A parallel environment scenario looks like this:

```
CI -> Amazon ECR -> manifest -> blue
                             -> green
```

Some points to note:

- Both environments will be connected to the same manifest job
- Each environment has its own cluster
- Clusters can be divided in a variety of ways:
    - Different parameters on same physical cluster
    - Different clusters on same region
    - Different clusters on different regions
    - Different clusters on different cloud providers

###1: Set up basic deployment

As a pre-requisite for these instructions, you should already have set up deployment to ECS.

You can follow the tutorial on [Managed deployments](/deploy/amazon-ecs/). This will give you the resources and jobs required to deploy a single container to ECS.

###2. Add params

Add a `params` resource to distinguish the different environments within the containers.  We'll deploy both images to the same cluster using different parameters.

```
resources:
  - name: deploy-ecs-blueparams
    type: params
    version:
      params:
        ENVIRONMENT: "blue"

  - name: deploy-ecs-greenparams
    type: params
    version:
      params:
        ENVIRONMENT: "green"

```

###3. Add deploy job

Edit your deploy job for the "blue" environment `deploy-ecs-basic-deploy` to accept `deploy-ecs-blueparams` as input. Also, add another deploy job that takes the same manifest and `deploy-ecs-greenparams` as input.

```
jobs:

  - name: deploy-ecs-basic-deploy
    type: deploy
    steps:
      - IN: deploy-ecs-blueparams
      - IN: deploy-ecs-basic-manifest
        switch: off      
      - IN: deploy-ecs-basic-ecs-cluster

  - name: deploy-ecs-greendeploy
    type: deploy
    steps:
      - IN: deploy-ecs-greenparams
      - IN: deploy-ecs-basic-manifest
        switch: off
      - IN: deploy-ecs-basic-ecs-cluster
```

Use `switch: off` if you want to prevent auto-deployments. In this case, we want both environments to be manual deployments.

Once you add these to your pipeline and push your changes, check out your SPOG. It should look something like this:

<img src="../../images/deploy/amazon-ecs/ecs-multi-env-parallel-pipeline.png" alt="blue-green pipeline">

First, run the manifest job.  Then, since `switch: off` is present on the manifest input, you'll have to right-click on the deploy jobs and select **Run Job** to start the deployment.

If you're following along with our sample app, you should be able to access the page, on which you can see the environment, injected by the `params` resource.

<img src="../../images/deploy/amazon-ecs/ecs-multi-env-parallel-blue.png" alt="blue-green pipeline">


## Sample project

Here are some links to a working sample of this scenario. This is a simple Node.js application that runs some tests and then pushes
the image to Amazon ECR. It also contains all of the pipelines configuration files for deploying to Amazon ECS for all of the scenarios described above.

**Source code:**  [devops-recipes/deploy-ecs-multi-env](https://github.com/devops-recipes/deploy-ecs-multi-env)

**Build status badge:** [![Run Status](https://api.shippable.com/projects/58fa52452ddacd090043d8a2/badge?branch=master)](https://app.shippable.com/github/devops-recipes/deploy-ecs-multi-env)

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
