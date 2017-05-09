page_main_title: Deploying to multiple environments
main_section: Deploy
sub_section: Node Cluster on any cloud

# Deploying to Multiple Node Cluster Environments

## The Goal
The goal of this page is to accomplish the following scenario using Shippable Pipelines.

- Create a nodeCluster integration and resource
- Deploy your app to multiple parallel environments
- Deploy your app to multiple serial environments

In the end, your pipeline will look something like this:
<img src="../../images/deploy/amazon-ecs/multi-env-final-pipeline.png" alt="Final pipeline">

## The Setup
For nodeClusters, the most logic divide is to say that one nodeCluster = 1 environment.  A nodeCluster is a group of machines, so deploying your application to different environments should be a simple as just changing the machine that the deployment points to.  To get started with nodeClusters, please see our [basic scenario](./vm-basic)

Let's keep our example scenario simple.  One file and one manifest to start.

```
resources:

  - name: deploy-nodeCluster-multi-env-file
    type: file
    pointer:
      sourceName: https://s3.amazonaws.com/devops.recipes.nodecluster.packages/deploy-nodecluster-basic-appfile.tar.gz
      # points directly to publicly available file
    seed:
      versionName: foo # dummy starting point. we'll use commitsha from CI to populate this field

```

```
jobs:

  - name: deploy-nodeCluster-multi-env-manifest
    type: manifest
    steps:
      - IN: deploy-nodeCluster-multi-env-file
```


## Managed deployments
Shippable managed deployments give you a ton of flexibility in how you structure your pipeline.  Deploy jobs accept manifests, releases, and other deploy jobs as inputs.  This allows you to put your pipeline together in whatever way works best for your system while maintaining a simple visual on the whole process.  This page will discuss a couple of the most common scenarios involving multiple deployment environments.

### Serial Environments

```
CI -> Amazon S3 -> manifest -> deploy to beta -> deploy to production
```

- each environment gets its own unique parameters and settings
- environments each deploy to a different node cluster
- beta environment is automatically triggered
- production environment is manual-deploy only


Add two `params` resources, each one having a unique ENV for the cluster it will be deployed to.

```
resources:

  - name: deploy-nodeCluster-multi-env-betaparams
    type: params
    version:
      params:
        ENVIRONMENT: "beta"

  - name: deploy-nodeCluster-multi-env-prodparams
    type: params
    version:
      params:
        ENVIRONMENT: "prod"

```

Add two clusters to deploy to.

```
resources:

  - name: deploy-nodeCluster-multi-env-betacluster
    type: cluster
    integration: dr-nodeCluster

  - name: deploy-nodeCluster-multi-env-prodcluster
    type: cluster
    integration: dr-nodeCluster

```

Add two deploy jobs:

- The beta job should take the beta params, beta cluster, and the manifest as `IN` statements.  
- The prod job should take the beta deploy job, prod params, and prod cluster as `IN` statements.

```
jobs:

  - name: deploy-nodeCluster-multi-env-betadeploy
    type: deploy
    steps:
      - IN: deploy-nodeCluster-multi-env-betaparams
      - IN: deploy-nodeCluster-multi-env-manifest
      - IN: deploy-nodeCluster-multi-env-betacluster
      - TASK:
        - script: forever stopall
        - script: mkdir -p ~/deploy-nodecluster-multi-env-manifest && mkdir -p deploy-nodecluster-multi-env-manifest-2
        - script: cd ~/deploy-nodecluster-multi-env-manifest
        - script: source /tmp/shippable/deploy-nodecluster-multi-env-manifest/deploy-nodecluster-multi-env-appfile/package.env
        - script: tar zxf /tmp/shippable/deploy-nodecluster-multi-env-manifest/deploy-nodecluster-multi-env-appfile/deploy-nodecluster-multi-env-appfile.tar.gz
        - script: forever start ./bin/www

  - name: deploy-nodeCluster-multi-env-proddeploy
    type: deploy
    steps:
      - IN: deploy-nodeCluster-multi-env-prodparams
        switch: off
      - IN: deploy-nodeCluster-multi-env-betadeploy
        switch: off
      - IN: deploy-nodeCluster-multi-env-prodcluster
        switch: off
      - TASK:
        - script: forever stopall
        - script: mkdir -p ~/deploy-nodecluster-multi-env-manifest && mkdir -p deploy-nodecluster-multi-env-manifest-2
        - script: cd ~/deploy-nodecluster-multi-env-manifest
        - script: source /tmp/shippable/deploy-nodecluster-multi-env-manifest/deploy-nodecluster-multi-env-appfile/package.env
        - script: tar zxf /tmp/shippable/deploy-nodecluster-multi-env-manifest/deploy-nodecluster-multi-env-appfile/deploy-nodecluster-multi-env-appfile.tar.gz
        - script: forever start ./bin/www

```

Using `switch: off` prevents accidental deployments to production.

Your pipeline should look like this:
<img src="../../images/deploy/amazon-ecs/ecs-multi-env-serial-pipeline.png" alt="serial pipeline">

Notice the dotted lines connecting the resources to production. This is the visual representation of the break in automation that `switch: off` causes.

### Parallel Environments

```
CI -> Amazon S3 -> manifest -> blue
                            -> green
```

- both environments will be connected to the same manifest job
- each environment has its own nodeCluster
- since nodeClusters are your own machines, they can be divided however you'd like
    - same machines with different parameters and settings
    - different machines in the same region
    - different machines on different regions
    - different cloud providers (AWS, Digital Ocean, Azure, etc)


Add a `params` resource to distinguish the different environments within the containers.  We'll deploy both packages to the same cluster using different parameters.

```
resources:
  - name: deploy-nodeCluster-multi-env-blueparams
    type: params
    version:
      params:
        ENVIRONMENT: "blue"

  - name: deploy-nodeCluster-multi-env-greenparams
    type: params
    version:
      params:
        ENVIRONMENT: "green"

  - name: deploy-nodeCluster-multi-env-maincluster
    type: cluster
    integration: dr-nodeCluster

```


Add two deploy jobs: one for "blue" and one for "green".  Both will take the same manifest as input.
```
jobs:

  - name: deploy-nodeCluster-multi-env-bluedeploy
    type: deploy
    steps:
      - IN: deploy-nodeCluster-multi-env-blueparams
      - IN: deploy-nodeCluster-multi-env-manifest
        switch: off
      - IN: deploy-nodeCluster-multi-env-maincluster
      - TASK:
        - script: forever stopall
        - script: mkdir -p ~/deploy-nodecluster-multi-env-manifest && mkdir -p deploy-nodecluster-multi-env-manifest-2
        - script: cd ~/deploy-nodecluster-multi-env-manifest
        - script: source /tmp/shippable/deploy-nodecluster-multi-env-manifest/deploy-nodecluster-multi-env-appfile/package.env
        - script: tar zxf /tmp/shippable/deploy-nodecluster-multi-env-manifest/deploy-nodecluster-multi-env-appfile/deploy-nodecluster-multi-env-appfile.tar.gz
        - script: forever start ./bin/www

  - name: deploy-nodeCluster-multi-env-greendeploy
    type: deploy
    steps:
      - IN: deploy-nodeCluster-multi-env-greenparams
      - IN: deploy-nodeCluster-multi-env-manifest
        switch: off
      - IN: deploy-nodeCluster-multi-env-maincluster
      - TASK:
        - script: forever stopall
        - script: mkdir -p ~/deploy-nodecluster-multi-env-manifest && mkdir -p deploy-nodecluster-multi-env-manifest-2
        - script: cd ~/deploy-nodecluster-multi-env-manifest
        - script: source /tmp/shippable/deploy-nodecluster-multi-env-manifest/deploy-nodecluster-multi-env-appfile/package.env
        - script: tar zxf /tmp/shippable/deploy-nodecluster-multi-env-manifest/deploy-nodecluster-basic-appfile/deploy-nodecluster-multi-env-appfile.tar.gz
        - script: forever start ./bin/www
```

Use `switch: off` to prevent auto-deployments.  In this case, we want both environments to be manual deployments.

Once you add these to your pipeline, check out your SPOG. It should look something like this:

<img src="../../images/deploy/amazon-ecs/ecs-multi-env-parallel-pipeline.png" alt="blue-green pipeline">

First, run the manifest job.  Then, since `switch: off` is present on the manifest input, you'll have to right-click and select **Run Job** to start the deployment.

If you're following along with our sample app, you should be able to access the page, on which you can see the environment, injected by the `params` resource.

<img src="../../images/deploy/amazon-ecs/ecs-multi-env-parallel-blue.png" alt="blue-green pipeline">


### Advanced
The differences between environments often go beyond a simple cluster change.  Shippable lets you set and override a variety of options via `params` resources.

Lets see some of these in action.  Start by using our sample pipeline from the 'serial environments' section of this page.

Modify our existing params resource to help us [integrate with Slack](../reference/int-slack).  We'll want to send messages to a different channel depending on which environment we're in.

```
resources:

  - name: deploy-nodeCluster-multi-env-commonparams
    type: params
    version:
      params:
        SLACK_TOKEN: "abc123"

  - name: deploy-nodeCluster-multi-env-betaparams
    type: params
    version:
      params:
        ENVIRONMENT: "beta"
        SLACK_CHANNEL: "beta_status"

  - name: deploy-nodeCluster-multi-env-betaparams
    type: params
    version:
      params:
        ENVIRONMENT: "prod"
        SLACK_CHANNEL: "prod_status"
```

Shippable by default implements a pattern of overrides for `params`.  When these resources are added to a manifest, the settings pass forward through each step of the pipeline until the pipeline ends or they are overwritten by some other resource.  

In this case, we will add our common slack token to the original manifest, and each relevant deploy job will have its own `params` resource attached.  When deploying to prod, the `ENVIRONMENT` and `SLACK_CHANNEL` parameters that were carried forward from the beta environment will be overwritten to match the new settings added to the prod deploy job, and the `SLACK_TOKEN` will carry forward from the original manifest all the way through to the production deployment.  The final set of parameters for the manifest will end up in the `package.env` file.

With these new items, the pipeline should look like this:

<img src="../../images/deploy/amazon-ecs/ecs-multi-env-serial-advanced.png" alt="serial params pipeline">

After deploying beta to the nodeCluster, you can check out the files in `/tmp/shippable` to verify the correct values.

Now run the production deploy job.  Once the deployment has finished, you can again examine files in `/tmp/shippable`. You should see that the `package.env` has been properly modified to reflect the environment, while the token from the original manifest remains unchanged.

*NOTE: Directly committing a private token is not recommended. Instead, the same functionality can be achieved by using [secure environment variables](../../ci/env-vars/#secure-variables) in your params resource.*


## Unmanaged deployments

In an unmanaged scenario, you'll be using a runCLI or runSh job where you can directly add ssh keys that allow you to connect to your nodeClusters.  You're free to do any scripting you want within these job types.  [See here](../reference/jobs-unmanaged) for more information on unmanaged jobs.
