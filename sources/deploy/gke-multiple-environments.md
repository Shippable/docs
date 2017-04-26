main_section: Deploy
sub_section: Deploying to GKE

# Deploying to multiple Environments
Most of the time, you'll want to utilize multiple environments in your pipeline.  One common example would be having automatic deployments to a test environment, followed by a manual deployment to production.  You can easily achieve this using Shippable pipelines, and this page will tell you how.

## Setup
Make sure you have a cluster set up on Google Container Engine (GKE), then create an integration and cluster resource [as described in the setup section here](./gke)

Let's keep our example scenario simple.  One image and one manifest to start.

```
resources:

  - name: deploy-gke-multi-env-image
    type: image
    integration: dr-gke
    pointer:
      sourceName: "gcr.io/sample-gke/deploy-gke-multi-env"
    seed:
      versionName: "latest"

```

```
jobs:

  - name: deploy-gke-multi-env-manifest
    type: manifest
    steps:
      - IN: deploy-gke-multi-env-image
```


## Managed deployments
Shippable managed deployments give you a ton of flexibility in how you structure your pipeline.  Deploy jobs accept manifests as inputs, but can also accept other deploy jobs, by themselves or in combination with manifests.  This allows you to put your pipeline together in whatever way works best for your system while maintaining a simple visual on the whole process.  This page will discuss a couple of the most common scenarios involving multiple deployment environments.

### Serial Environments
One common scenario for multiple environments is having a beta environment that receives automatic deployments, and a production environment that is only deployed manually.  Each environment might posses its own unique parameters and settings, and both environments are likely deploying to completely separate clusters (or at least separate namespaces).  Lets set this up in our pipeline so we can see how it works.

Start by adding two `params` resources, each one having a unique ENV for the cluster it will be deployed to.

```
resources:

  - name: deploy-gke-multi-env-betaparams
    type: params
    version:
      params:
        ENVIRONMENT: "beta"

  - name: deploy-gke-multi-env-prodparams
    type: params
    version:
      params:
        ENVIRONMENT: "prod"

```

We'll also need two clusters to deploy to.

```
resources:

  - name: deploy-gke-multi-env-betacluster
    type: cluster
    integration: dr-gke
    pointer:
      sourceName : "deploy-gke-basic" #name of the cluster to which we are deploying
      namespace: "beta"

  - name: deploy-gke-multi-env-prodcluster
    type: cluster
    integration: dr-aws
    pointer:
      sourceName : "deploy-gke-basic" #name of the cluster to which we are deploying
      namespace: "prod"

```

Finally, lets add two deploy jobs. The first one (beta) should take the beta params, beta cluster, and the manifest as `IN` statements.  The second deploy job (prod) should take the beta deploy job, prod params, and prod cluster as `IN` statements.

```
jobs:

  - name: deploy-gke-multi-env-betadeploy
    type: deploy
    steps:
      - IN: deploy-gke-multi-env-betaparams
      - IN: deploy-gke-multi-env-manifest
      - IN: deploy-gke-multi-env-betacluster

  - name: deploy-gke-multi-env-proddeploy
    type: deploy
    steps:
      - IN: deploy-gke-multi-env-prodparams
        switch: off
      - IN: deploy-gke-multi-env-betadeploy
        switch: off
      - IN: deploy-gke-multi-env-prodcluster
        switch: off

```

Notice that the production deploy job has several `switch: off` statements.  We want to make sure that no one accidentally deploys to production by changing one of its inputs!

Your pipeline should look like this:
<img src="../../images/deploy/amazon-ecs/ecs-multi-env-serial-pipeline.png" alt="serial pipeline">

Notice the dotted lines connecting the resources to production. This is the visual representation of the break in automation that `switch: off` causes.

### Parallel Environments
Another common scenario is the blue-green deployment.  In this situation, you essentially have two separate copies of your application, ready to be deployed, with only one environment running at any given time.  When a change is made to your application, you deploy the second environment. Once that environment is running and validated, you can stop the old environment for a seamless transition.

Another scenario is the ability to deploy to multiple regions at the same time. Imagine that your application is running in multiple regions across GCP, and on each region there is a GKE cluster.  Shippable allows you to take the same manifest and send it to as many endpoints as you like.  You can even add extra region-specific ENVs and docker options, while maintaining common core manifest settings.

Lets look at a simple case of parallel deployments.  The concept of an "environment" depends heavily on the application.  Some users might divide their application into multiple environments on the same cluster, multiple clusters in the same region, or multiple regions each with their own set of clusters.  In this example, we're going to deploy to the same cluster endpoint.

Start by adding some new resources.  We're going to use a `params` resource to distinguish the environments. Both environments will be deployed to the same cluster.

```
resources:
  - name: deploy-gke-multi-env-blueparams
    type: params
    version:
      params:
        ENVIRONMENT: "blue"

  - name: deploy-gke-multi-env-greenparams
    type: params
    version:
      params:
        ENVIRONMENT: "green"

  - name: deploy-gke-multi-env-maincluster
    type: cluster
    integration: dr-aws
    pointer:
      sourceName : "deploy-gke-basic" #name of the cluster to which we are deploying
      namespace: "shippable"

```

Now we should add two deploy jobs. One for our "blue" environment and one for our "green" environment.  These jobs will both take the same manifest as input.
```
jobs:

  - name: deploy-gke-multi-env-bluedeploy
    type: deploy
    steps:
      - IN: deploy-gke-multi-env-blueparams
      - IN: deploy-gke-multi-env-manifest
        switch: off
      - IN: deploy-gke-multi-env-maincluster

  - name: deploy-gke-multi-env-greendeploy
    type: deploy
    steps:
      - IN: deploy-gke-multi-env-greenparams
      - IN: deploy-gke-multi-env-manifest
        switch: off
      - IN: deploy-gke-multi-env-maincluster
```

Notice that on each deploy job, beneath the `IN` statement for the manifest there is a section that says `switch: off`.  This is how to tell Shippable not to automatically run the deployment on every change.  For this simple blue-green setup, we want to manually tell Shippable when each environment should be deployed, rather than have them both be deployed automatically on every change.

Once you add these to your pipeline, check out your SPOG. It should look something like this:

<img src="../../images/deploy/amazon-ecs/ecs-multi-env-parallel-pipeline.png" alt="blue-green pipeline">

Since `switch: off` is present on the manifest input, you'll have to right-click and select 'Run Job' to start the deployment. Make sure that the manifest job has run first so that the latest version is available for deployment.

If you're following along with our sample app, you should be able to access the page, on which you can see the environment, injected by the `params` resource.

<img src="../../images/deploy/amazon-ecs/ecs-multi-env-parallel-blue.png" alt="blue-green pipeline">



### Advanced
The differences between environments often go beyond a simple cluster change.  Shippable lets you set and override a variety of options via `params` and `dockerOptions` resources.

Lets see some of these in action.  Start by using our sample pipeline from the 'serial environments' section of this page.

We'll add two more resources to the list which allow us to modify the different docker options.  In production, we want to allocate more memory to our container, since the usage is much higher. For a full list of available options, see the [reference page](../reference/resource-dockeroptions).
```
resources:

  - name: deploy-gke-multi-env-prodopts
    type: dockerOptions
    version:
      memory: 512

  - name: deploy-gke-multi-env-betaopts
    type: dockerOptions
    version:
      memory: 128

```

We should also modify our params resources.  We're going to add some settings to help our container integrate with slack. [Here are some instructions for creating the integration](../reference/int-slack).  We want our application to communicate with a different channel based on whether its running in beta or in production, but in both cases, the token being used is the same.

```
resources:

  - name: deploy-gke-multi-env-commonparams
    type: params
    version:
      params:
        SLACK_TOKEN: "abc123"

  - name: deploy-gke-multi-env-betaparams
    type: params
    version:
      params:
        ENVIRONMENT: "beta"
        SLACK_CHANNEL: "beta_status"

  - name: deploy-gke-multi-env-betaparams
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

After deploying beta to the GKE cluster, you can look up the running pod. Inside, you should see the ENVs that were set via params, as well as the memory setting from the `dockerOptions`.

Now, switch back to your SPOG view, right-click the production deploy job, and click "run job".  Once the deployment has finished, you can examine the pod. You should see that its settings are properly modified to reflect the environment, while the token from the original manifest remains unchanged.

NOTE: It's not recommended to directly commit tokens of any kind to source control, even when using a private repository. Shippable solves this by providing users the opportunity to securely encrypt their params on the project settings page, so that you can still configure your deployment in your yml without the risk of exposing private keys to anyone. [Check here for instructions on using secure encrypted variables](TODO: add link)


## Unmanaged deployments

In an unmanaged scenario, you'll be using a runCLI job with a GKE cliConfig [as described in the unmanaged section of our basic scenario](./gke#unmanaged-deployments).

For unmanaged jobs, you can run your kubectl and gcloud commands against any cluster and region that you want.
