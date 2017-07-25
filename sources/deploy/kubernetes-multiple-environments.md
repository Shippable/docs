page_main_title: Kubernetes Deploying to multiple environments
main_section: Deploy
sub_section: Kubernetes


# Deploying to multiple Kubernetes Environments
Most of the time, you'll want to utilize multiple environments in your pipeline.  One common example would be having automatic deployments to a test environment, followed by a manual deployment to production.  You can easily achieve this using Shippable pipelines, and this page will tell you how.

## The Goal
This page will discuss two examples that utilize multiple environments on Kubernetes and manage them in the same pipeline.  

- Serial environments (beta->prod)
- Parallel environments (blue/green)

In the end, your pipeline might look like this:
![Pipeline](https://github.com/devops-recipes/deploy-kubernetes-multi-env/raw/master/public/resources/images/dkme-pipeline-view.png)

## Serial environments

###1. Set up basic deployment

As a pre-requisite for these instructions, you should already have set up a basic pipeline that deploys to Kubernetes.

You can follow the tutorial on [Managed deployments](/deploy/kubernetes/). This will give you the resources and jobs required to deploy a single container to Kubernetes.

###2: Add a serial environment

A serial environment scenario looks like this:

```
CI -> Docker hub -> manifest -> deploy to beta -> deploy to prod
```

If you followed the [Managed deployments](/deploy/kubernetes/) docs, you already have a pipeline that deploys to the first environment, beta.

Now let's add the prod environment. We will need a new [cluster](/platform/resource-cluster/) for production, as well as a [deploy](/platform/jobs-deploy/) job.

Cluster definition in `shippable.resources.yml`:
```
resources:
  - name: deploy-kubernetes-multi-env-prodcluster
    type: cluster
    integration: dr-kube-prod-cluster    #replace with your Kubernetes integration name
    flags:
      - deploy-kubernetes-multi-env
```

Now we define the job in `shippable.jobs.yml`. Please note that this job will take the beta deploy job as an IN.

```
jobs:
    - name: dkme-proddeploy
      type: deploy
      flags:
        - deploy-kubernetes-multi-env
      steps:
        - IN: dkme-betadeploy
          switch: off
        - IN: deploy-kubernetes-multi-env-prodcluster
          switch: off
```
Using `switch: off` prevents automatic deployments to production when the previous job finishes.

Your pipeline should look like this:
![Pipeline](https://github.com/devops-recipes/deploy-kubernetes-multi-env/raw/master/public/resources/images/dkme-pipeline-view.png)

###3. Specify environment specific settings

To make our scenario more realistic, we're going to configure each environment with its own unique parameters and settings. **This is an optional step.**

In your `shippable.resources.yml`, add two `params` resources, each one having a unique ENV for the cluster it will be deployed to.

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

Now, change your `shippable.jobs.yml` to provide these params to your deploy jobs.

```
jobs:
- name: dkme-betadeploy
  type: deploy
  flags:
    - deploy-kubernetes-multi-env
  steps:
    - IN: deploy-kubernetes-multi-env-betaparams
    - IN: deploy-kubernetes-multi-env-manifest-2
    - IN: deploy-kubernetes-multi-env-betacluster

- name: dkme-proddeploy
  type: deploy
  flags:
    - deploy-kubernetes-multi-env
  steps:
    - IN: deploy-kubernetes-multi-env-prodparams
      switch: off
    - IN: dkme-betadeploy
      switch: off
    - IN: deploy-kubernetes-multi-env-prodcluster
      switch: off
```

With this configuration, your container running in the Beta environment will have the $ENVIRONMENT variable set to "beta", while your container running in the Prod environment will have the $ENVIRONMENT variable set to "prod".

###4. Specify different options

You can set different options for your containers with the `dockerOptions` resource, depending on which environment they are running in.

Add two [dockerOptions resources](../platform/resource-dockeroptions), one for each deploy job, to the pipeline in `shippable.resources.yml`. Here, we're allocating more memory for production since it runs with much higher load.

```
resources:

- name: deploy-kubernetes-multi-env-prodopts
  type: dockerOptions
  flags:
    - deploy-kubernetes-multi-env
  version:
    memory: 512
    labels:
      environment: prod

- name: deploy-kubernetes-multi-env-betaopts
  type: dockerOptions
  flags:
    - deploy-kubernetes-multi-env
  version:
    memory: 128
    labels:
      environment: beta
```

These can be used as an IN to your deploy jobs in `shippable.jobs.yml`

```
jobs:
- name: dkme-betadeploy
  type: deploy
  flags:
    - deploy-kubernetes-multi-env
  steps:
    - IN: deploy-kubernetes-multi-env-betaopts
    - IN: deploy-kubernetes-multi-env-manifest-2
    - IN: deploy-kubernetes-multi-env-betacluster

- name: dkme-proddeploy
  type: deploy
  flags:
    - deploy-kubernetes-multi-env
  steps:
    - IN: deploy-kubernetes-multi-env-prodopts
      switch: off
    - IN: dkme-betadeploy
      switch: off
    - IN: deploy-kubernetes-multi-env-prodcluster
      switch: off
```

### Parallel Environments
A parallel environment scenario looks like this:

```
CI -> Docker Hub -> manifest -> blue
                             -> green
```

Some points to note:

- Both environments will be connected to the same manifest job
- Each environment has its own cluster

###1. Set up basic deployment

As a pre-requisite for these instructions, you should already have set up a basic pipeline that deploys to Kubernetes.

You can follow the tutorial on [Managed deployments](/deploy/kubernetes/). This will give you the resources and jobs required to deploy a single container to Kubernetes.

###2. Add params

Add a `params` resource to distinguish the different environments within the containers.  We'll deploy both images to the same cluster using different parameters.

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
```

###3. Add deploy job

Create a deploy job for the "blue" environment `dkme-bluedeploy` to accept `deploy-kubernetes-multi-env-blueparams` as input. Also, add another deploy job `dkme-greendeploy` that takes the same manifest and `deploy-kubernetes-multi-env-greenparams` as input.

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

Use `switch: off` if you want to prevent auto-deployments. In this case, we want both environments to be manual deployments.

Once you add these to your pipeline and push your changes, check out your SPOG. It should look something like this:
![Pipeline](https://github.com/devops-recipes/deploy-kubernetes-multi-env/raw/master/public/resources/images/dkme-pipeline-view.png)

First, run the manifest job. Right-click the dkme-bluedeploy deploy job, and click "run job" when you are ready for deployment.  Once the deployment has finished, you can examine the console log for it.
![Beta deploy job](https://github.com/devops-recipes/deploy-kubernetes-multi-env/raw/master/public/resources/images/dkme-beta-deploy-view.png)

Right-click the dkme-greendeploy deploy job, and click "run job" when you are ready for deployment.  Once the deployment has finished, you can examine the console log for it.
![Prod deploy job](https://github.com/devops-recipes/deploy-kubernetes-multi-env/raw/master/public/resources/images/dkme-prod-deploy-view.png)

## Sample project

Here are some links to a working sample of this scenario. This is a simple Node.js application that runs some tests and then pushes
the image to Docker hub. It also contains all of the pipelines configuration files for deploying to kubernetes for all of the scenarios described above.

**Source code:**  [devops-recipes/deploy-kubernetes-multi-env](https://github.com/devops-recipes/deploy-kubernetes-multi-env)

**Build link:** [CI build on Shippable](https://app.shippable.com/github/devops-recipes/deploy-kubernetes-multi-env/runs/8/1/console)

**Build status badge:** [![Run Status](https://api.shippable.com/projects/58ff7b2e28b7f006008c7b72/badge?branch=master
)](https://app.shippable.com/github/devops-recipes/deploy-kubernetes-multi-env

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
