main_section: Deploy
sub_section: Deploying to Kubernetes


# Deploying to multiple Kubernetes Environments
Most of the time, you'll want to utilize multiple environments in your pipeline.  One common example would be having automatic deployments to a test environment, followed by a manual deployment to production.  You can easily achieve this using Shippable pipelines, and this page will tell you how.

## Setup
Make sure you have a Kubernetes cluster set up, then create an integration and cluster resource [as described in the setup section here](./kubernetes)

Let's keep our example scenario simple.  One image and one manifest to start.

```
resources:

  - name: deploy-kubernetes-multi-env-image
      type: image
      integration: dr-dockerhub    #replace with your Docker Hub integration name
      pointer:
        sourceName: "docker.io/devopsrecipes/deploy-kubernetes-multi-env"  #replace with your image name on Docker Hub
        isPull: false
      seed:
        versionName: "master.1"  #replace with your image tag on Docker Hub
      flags:
        - deploy-kubernetes-multi-env
```

```
jobs:

  - name: deploy-kubernetes-multi-env-manifest
    type: manifest
    steps:
      - IN: deploy-kubernetes-multi-env-image
```


## Managed deployments
Shippable managed deployments give you a ton of flexibility in how you structure your pipeline.  Deploy jobs accept manifests as inputs, but can also accept other deploy jobs, by themselves or in combination with manifests.  This allows you to put your pipeline together in whatever way works best for your system while maintaining a simple visual on the whole process.  This page will discuss a couple of the most common scenarios invovling multiple deployment environments.

### Serial Environments
One common scenario for multiple environments is having a beta environment that receives automatic deployments, and a production environment that is only deployed manually.  Each environment might posses its own unique parameters and settings, and both environments are likely deploying to completely separate clusters.  Lets set this up in our pipeline so we can see how it works.

Start by adding two `params` resources, each one having a unique ENV for the cluster it will be deployed to.

```
resources:

  - name: deploy-kubernetes-multi-env-betaparams
    type: params
    version:
      params:
        ENVIRONMENT: "beta"

  - name: deploy-kubernetes-multi-env-prodparams
    type: params
    version:
      params:
        ENVIRONMENT: "prod"

```

We'll also need two clusters to deploy to.

```
resources:

  - name: deploy-kubernetes-multi-env-betacluster
    type: cluster
    integration: dr-kube-cluster    #replace with your Kubernetes integration name
    flags:
      - deploy-kubernetes-multi-env

  - name: deploy-kubernetes-multi-env-prodcluster
    type: cluster
    integration: dr-kube-prod-cluster    #replace with your Kubernetes integration name
    flags:
      - deploy-kubernetes-multi-env
```

Finally, lets add two deploy jobs. The first one (beta) should take the beta params, beta cluster, and the manifest as `IN` statements.  The second deploy job (prod) should take the beta deploy job, prod params, and prod cluster as `IN` statements.

```
jobs:

  - name: dkme-betadeploy
      type: deploy
      flags:
        - deploy-kubernetes-multi-env
      steps:
        - IN: deploy-kubernetes-multi-env-betaopts
        - IN: deploy-kubernetes-multi-env-betaparams
        - IN: deploy-kubernetes-multi-env-manifest-2
        - IN: deploy-kubernetes-multi-env-betacluster

    - name: dkme-proddeploy
      type: deploy
      flags:
        - deploy-kubernetes-multi-env
      steps:
        - IN: deploy-kubernetes-multi-env-prodopts
          switch: off
        - IN: deploy-kubernetes-multi-env-prodparams
          switch: off
        - IN: dkme-betadeploy
          switch: off
        - IN: deploy-kubernetes-multi-env-prodcluster
          switch: off

```

Notice that the production deploy job has several `switch: off` statements.  We want to make sure that no one accidentally deploys to production by changing one of its inputs!

Your pipeline should look like this:
![Pipeline](https://github.com/devops-recipes/deploy-kubernetes-multi-env/blob/master/public/resources/images/dkme-pipeline-view.png)

Notice the dotted lines connecting the resources to production. This is the visual representation of the break in automation that `switch: off` causes.

Now, switch back to your SPOG view, right-click the dkme-betadeploy deploy job when you are ready for deployment, and click "run job".  Once the deployment has finished, you can examine the console log for it.
![Beta deploy job](https://github.com/devops-recipes/deploy-kubernetes-multi-env/blob/master/public/resources/images/dkme-beta-deploy-view.png)

Right-click the dkme-proddeploy deploy job when you are ready for deployment, and click "run job".  Once the deployment has finished, you can examine the console log for it.
![Prod deploy job](https://github.com/devops-recipes/deploy-kubernetes-multi-env/blob/master/public/resources/images/dkme-prod-deploy-view.png)

### Parallel Environments
Another common scenario is the blue-green deployment.  In this situation, you essentially have two separate copies of your application, ready to be deployed, with only one environment running at any given time.  When a change is made to your application, you deploy the second environment. Once that environment is running and validated, you can stop the old environment for a seamless transition.

Another scenario is the ability to deploy to multiple regions at the same time. Imagine that your application is running in multiple regions across AWS, and on each region there is an kubernetes cluster.  Shippable allows you to take the same manifest and send it to as many endpoints as you like.  You can even add extra region-specific ENVs and docker options, while maintaining common core manifest settings.

Lets look at a simple case of parallel deployments.  The concept of an "environment" depends heavily on the application.  Some users might divide their application into multiple environments on the same cluster, multiple clusters in the same region, or multiple regions each with their own set of clusters.  In this example, we're going to deploy to the same cluster endpoint.

Start by adding some new resources.  We're going to use a `params` resource to distinguish the environments. Both environments will be deployed to the same cluster.

We are also going to set labels on the blue and green deployments so that the load balancer's selector can be updated to use the appropriate label after deployment is completed, depending on which environment is deployed to production.
```
resources:
- name: deploy-kubernetes-multi-env-blueopts
    type: dockerOptions
    flags:
      - deploy-kubernetes-multi-env
    version:
      labels:
        color: blue

  - name: deploy-kubernetes-multi-env-greenopts
    type: dockerOptions
    flags:
      - deploy-kubernetes-multi-env
    version:
      labels:
        color: green

  - name: deploy-kubernetes-multi-env-blueparams
    type: params
    flags:
      - deploy-kubernetes-multi-env
    version:
      params:
        ENVIRONMENT: "blue"

  - name: deploy-kubernetes-multi-env-greenparams
    type: params
    flags:
      - deploy-kubernetes-multi-env
    version:
      params:
        ENVIRONMENT: "green"

 - name: deploy-kubernetes-multi-env-maincluster
    type: cluster
    integration: dr-kube-prod-cluster    #replace with your Kubernetes integration name
    flags:
      - deploy-kubernetes-multi-env

```

Now we should add two deploy jobs. One for our "blue" environment and one for our "green" environment.  These jobs will both take the same manifest as input.
```
jobs:

  - name: dkme-bluedeploy
    type: deploy
    flags:
      - deploy-kubernetes-multi-env
    steps:
      - IN: deploy-kubernetes-multi-env-blueparams
      - IN: deploy-kubernetes-multi-env-blueopts
      - IN: deploy-kubernetes-multi-env-manifest-1
        switch: off
      - IN: deploy-kubernetes-multi-env-maincluster

  - name: dkme-greendeploy
    type: deploy
    flags:
      - deploy-kubernetes-multi-env
    steps:
      - IN: deploy-kubernetes-multi-env-greenparams
      - IN: deploy-kubernetes-multi-env-greenopts
      - IN: deploy-kubernetes-multi-env-manifest-1
        switch: off
      - IN: deploy-kubernetes-multi-env-maincluster

```

Notice that on each deploy job, beneath the `IN` statement for the manifest there is a section that says `switch: off`.  This is how to tell Shippable not to automatically run the deployment on every change.  For this simple blue-green setup, we want to manually tell Shippable when each environment should be deployed, rather than have them both be deployed automatically on every change.

Once you add these to your pipeline, check out your SPOG. It should look something like this:

![Pipeline](https://github.com/devops-recipes/deploy-kubernetes-multi-env/blob/master/public/resources/images/dkme-pipeline-view.png)

Since `switch: off` is present on the manifest input, you'll have to right-click and select 'Run Job' to start the deployment. Make sure that the manifest job has run first so that the latest version is available for deployment.

Right-click the dkme-bluedeploy deploy job, and click "run job" when you are ready for deployment.  Once the deployment has finished, you can examine the console log for it.
![Beta deploy job](https://github.com/devops-recipes/deploy-kubernetes-multi-env/blob/master/public/resources/images/dkme-beta-deploy-view.png)

Right-click the dkme-greendeploy deploy job, and click "run job" when you are ready for deployment.  Once the deployment has finished, you can examine the console log for it.
![Prod deploy job](https://github.com/devops-recipes/deploy-kubernetes-multi-env/blob/master/public/resources/images/dkme-prod-deploy-view.png)


### Advanced
The differences between environments often go beyond a simple cluster change.  Shippable lets you set and override a variety of options via `params` and `dockerOptions` resources.

Lets see some of these in action.  Start by using our sample pipeline from the 'serial environments' section of this page.

We'll add two more resources to the list which allow us to modify the different docker options.  In production, we want to allocate more memory to our container, since the usage is much higher. For a full list of available options, see the reference page [TODO: add link to dockerOptions]
```
resources:

  - name: deploy-kubernetes-multi-env-prodopts
    type: dockerOptions
    version:
      memory: 512

  - name: deploy-kubernetes-multi-env-betaopts
    type: dockerOptions
    version:
      memory: 128

```

We should also modify our params resources.

```
resources:

  - name: deploy-kubernetes-multi-env-betaparams
    type: params
    version:
      params:
        ENVIRONMENT: "beta"

  - name: deploy-kubernetes-multi-env-betaparams
    type: params
    version:
      params:
        ENVIRONMENT: "prod"
```

Shippable by default implements a pattern of overrides for both `params` and `dockerOptions`. When these resources are added to a manifest, the settings pass forward through each step of the pipeline until the pipeline ends or they are overwritten by some other resource.  

When deploying to prod, the `ENVIRONMENT` parameter that was carried forward from the beta environment will be overwritten to match the new settings added to the prod deploy job, and the `SLACK_TOKEN` will carry forward from the original manifest all the way through to the production deployment.

With these new items, the pipeline should look like this:

![Pipeline](https://github.com/devops-recipes/deploy-kubernetes-multi-env/blob/master/public/resources/images/dkme-pipeline-view.png)


## Sample project

Here are some links to a working sample of this scenario. This is a simple Node.js application that runs some tests and then pushes
the image to Docker hub. It also contains all of the pipelines configuration files for deploying to kubernetes for all of the scenarios described above.

**Source code:**  [devops-recipes/deploy-kubernetes-multi-env](https://github.com/devops-recipes/deploy-kubernetes-multi-env)

**Build link:** [CI build on Shippable](https://app.shippable.com/github/devops-recipes/deploy-kubernetes-multi-env/runs/8/1/console)

**Build status badge:** [![Run Status](https://api.shippable.com/projects/58ff7b2e28b7f006008c7b72/badge?branch=master
)](https://app.shippable.com/github/devops-recipes/deploy-kubernetes-multi-env)
