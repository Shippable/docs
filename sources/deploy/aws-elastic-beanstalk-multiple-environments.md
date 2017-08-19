page_main_title: Deploying to multiple environments
main_section: Deploy
sub_section: AWS Elastic Beanstalk

# Deploying to Multiple Amazon Elastic Beanstalk Environments
This page will briefly explain the significance of environments in Amazon Elastic Beanstalk and how they can be used in your Shippable Pipeline.

## The Goal
The goal of this page is to accomplish the following scenario using Shippable Pipelines.

- Build a docker image in Shippable CI
- Push that image to Amazon ECR
- Deploy that image to two different Elastic Beanstalk environments within the same beanstalk application.

In the end, your pipeline will look like this:
<img src="../../images/deploy/elasticbeanstalk/multi-env-final-pipeline.png" alt="Final Pipeline">

## Setup
Follow the setup section as described in the basic EB scenario located [here](./aws-elastic-beanstalk)

## Managed
Shippable does not support managed beanstalk deployments at this time.

## Unmanaged
Shippable allows you to communicate with AWS via a job type called `runSh`.  You can read the full reference on the job [here](../platform/workflow/job/runsh).  This type of job gives you the power to script whatever workflow is necessary for your environment.

This page assumes you're already familiar with the Amazon Beanstalk [basic scenario](./aws-elastic-beanstalk).


### Serial Environments
One common concept for multiple environments is having a beta environment that receives automatic deployments, and a production environment that is only deployed manually.  Each environment might posses its own unique parameters and settings, and both environments are likely deploying to completely separate machines.  Lets set this up in our pipeline so we can see how it works.

First, we're going to make three `params` resources.  One for beta, one for prod, and one to hold common values between the two.

```
resources:

  - name: common-params
    type: params
    version:
      params:
        PORT: 80
        AWS_EB_APPLICATION: "deploy-eb-basic"

  - name: beta-params
    type: params
    version:
      params:
        ENVIRONMENT: "beta"
        AWS_EB_ENVIRONMENT: "beta"

  - name: prod-params
    type: params
    version:
      params:
        ENVIRONMENT: "prod"
        AWS_EB_ENVIRONMENT: "prod"

```
In this case, we have one beanstalk application that has multiple environments.  The application name and the bucket name (where the deployment packages are stored) are common to both environments.

Next, we'll need two separate `runSh` jobs.  One to deploy to beta, which will be triggered by a change in the docker image resource, and one to deploy to prod, which can only be triggered manually from the Pipelines SPOG.

```
jobs:
  - name: deploy-beta
    type: runSh
    steps:
      - IN: deploy-eb-basic-image
      - IN: deploy-eb-basic-config
        switch: off
      - IN: common-params
        switch: off
      - IN: beta-params
        switch: off
      - IN: deploy-eb-basic-repo
        switch: off
      - TASK:
        - script: export IMAGE="${DEPLOYEBBASICIMAGE_SOURCENAME}:${DEPLOYEBBASICIMAGE_VERSIONNAME}"
        - script: export APPLICATION=${COMMONPARAMS_PARAMS_AWS_EB_APPLICATION}
        - script: export ENVIRONMENT=${BETAPARAMS_PARAMS_AWS_EB_ENVIRONMENT}
        - script: eb deploy
        - script: echo "versionName=${DEPLOYEBBASICIMAGE_VERSIONNAME}" >> $JOB_STATE/$JOB_NAME.env

  - name: deploy-prod
    type: runSh
    steps:
      - IN: deploy-eb-basic-image
        switch: off
      - IN: deploy-beta
        switch: off
      - IN: deploy-eb-basic-config
        switch: off
      - IN: common-params
        switch: off
      - IN: prod-params
        switch: off
      - IN: deploy-eb-basic-repo
        switch: off
      - TASK:
        - script: export IMAGE="${DEPLOYEBBASICIMAGE_SOURCENAME}:${DEPLOYBETA_VERSIONNAME}"
        - script: export APPLICATION=${COMMONPARAMS_PARAMS_AWS_EB_APPLICATION}
        - script: export ENVIRONMENT=${BETAPARAMS_PARAMS_AWS_EB_ENVIRONMENT}
        - script: eb deploy

```

With these changes made to the basic pipeline, your new pipeline should look like this:

<img src="../../images/deploy/elasticbeanstalk/eb-serial-envs.png" alt="Serial environments on beanstalk">

Notice that the deploy-prod job has all dotted lines as input.  This means that it will never be automatically triggered, and a user must manually run it from the UI.

### Parallel Environments

There are also times when you might want to have parallel environments.  Perhaps you're deploying separate versions of your application to perform some A/B testing. Perhaps you have one test environment per team, and want each team's environment to deploy simultaneously when a change is made to the core application.

Whatever the reason, the method of deployment is fully in your control.  For this exmaple, I'm just going to slightly modify the above beta/prod jobs, so that they deploy to beta-A and beta-B, and both are deployed whenever the application image is changed.

Start with params again, slightly modified:
```
resources:

  - name: common-params
    type: params
    version:
      params:
        PORT: 80
        AWS_EB_APPLICATION: "deploy-eb-basic"
        AWS_EB_BUCKET_NAME: "shippable-deploy-eb"

  - name: beta-A-params
    type: params
    version:
      params:
        AWS_EB_ENVIRONMENT: "beta-A"

  - name: beta-B-params
    type: params
    version:
      params:
        AWS_EB_ENVIRONMENT: "beta-B"

```

And now adjust the INs of the jobs:
```
jobs:


  - name: deploy-beta-a
    type: runSh
    steps:
      - IN: deploy-eb-basic-image
      - IN: deploy-eb-basic-config
        switch: off
      - IN: common-params
        switch: off
      - IN: beta-A-params
        switch: off
      - IN: deploy-eb-basic-repo
        switch: off
      - TASK:
        - script: export IMAGE="${DEPLOYEBBASICIMAGE_SOURCENAME}:${DEPLOYEBBASICIMAGE_VERSIONNAME}"
        - script: export APPLICATION=${COMMONPARAMS_PARAMS_AWS_EB_APPLICATION}
        - script: export ENVIRONMENT=${BETAAPARAMS_PARAMS_AWS_EB_ENVIRONMENT}
        - script: eb deploy
        - script: echo "versionName=${DEPLOYEBBASICIMAGE_VERSIONNAME}" >> $JOB_STATE/$JOB_NAME.env

  - name: deploy-beta-b
    type: runSh
    steps:
      - IN: deploy-eb-basic-image
      - IN: deploy-eb-basic-config
        switch: off
      - IN: common-params
        switch: off
      - IN: beta-B-params
        switch: off
      - IN: deploy-eb-basic-repo
        switch: off
      - TASK:
        - script: export IMAGE="${DEPLOYEBBASICIMAGE_SOURCENAME}:${DEPLOYEBBASICIMAGE_VERSIONNAME}"
        - script: export APPLICATION=${COMMONPARAMS_PARAMS_AWS_EB_APPLICATION}
        - script: export ENVIRONMENT=${BETABPARAMS_PARAMS_AWS_EB_ENVIRONMENT}
        - script: eb deploy

```

As a result, your pipeline should look like this:

<img src="../../images/deploy/elasticbeanstalk/eb-parallel-envs.png" alt="Parallel environments on beanstalk">

Now, any time your deploy-eb-basic-image has its version updated, it will trigger both of these jobs in parallel, which will result in a deployment to both environments.

### Advanced

Since unmanaged jobs allow for unlimited scripting, there's no reason why your environments have to be restricted to the same EB application.  By splitting up your deployments across multiple applications, you can deploy to different AWS regions.  The workflow wouldn't be much different from what is described above, but you would need a few new environment variables to represent the different application names, and the different regions.
