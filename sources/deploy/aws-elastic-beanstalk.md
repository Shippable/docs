page_main_title: Deploying single-container environments
main_section: Deploy
sub_section: AWS Elastic Beanstalk

# Deploying to Amazon Elastic Beanstalk
Deploying to [Amazon Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/) is easily automated using Shippable Pipelines.  This page will describe how you can take a single docker image and update your existing Elastic Beanstalk (EB) environment.

## The Goal
The goal of this page is to accomplish the following scenario using Shippable Pipelines.

- Build a docker image in Shippable CI
- Push that image to Amazon ECR
- Deploy that image to a single-container Elastic Beanstalk environment

In the end, your pipeline will look like this:
<img src="../../images/deploy/elasticbeanstalk/single-final-pipeline.png" alt="Final Pipeline">


## The Setup

This sample will use Shippable CI to build and push an image to ECR, which will also trigger our pipeline. Check out our page on [triggering pipeline jobs from CI](../ci/trigger-pipeline-jobs) for a description of how that works.  You can also use the sample repo for this scenario as an example.

We are going to need an AWS key/secret pair to communicate with EB on our behalf. You can add this to Shippable via [Account Integrations](../../getting-started/integrations), so that we can internally configure the aws cli.

In our example, we're using an [Amazon ECR integration](../platform/int-amazon-ecr) since it works nicely with EB.  You'll have to make sure you use an integration that has appropriate permissions for the different actions required for beantaslk deployments.


Now we can set up our pipeline objects.  Start by adding a type `image` resource.  This will represent your Docker image in your pipeline.  

```
resources:

  - name: deploy-eb-basic-image
    type: image
    pointer:
      sourceName: "679404489841.dkr.ecr.us-east-1.amazonaws.com/nodeapp"
    seed:
      versionName: "latest"

```

That's the main core building block. Now let's see what we can use it for.

## Managed Deployments
Shippable does not support managed beanstalk deployments at this time.

## Unmanaged Deployments
Shippable gives you the ability to fully customize exactly how you want your deployments to behave.  By using an unmanaged job type, you have full control over the commands and options passed in to EB.

### Basic Configuration

First, we should create a beanstalk application and environment to deploy to.  If you've already got an environment ready to go, you can skip this step.

**create the application**.  It's OK to select the "sample application", because we'll be updating it with our own image pretty soon anyway. It'll take a few minutes to start.

<img src="../../images/deploy/elasticbeanstalk/create-a-web-app.png" alt="create a new beanstalk app">
<img src="../../images/deploy/elasticbeanstalk/creating-app.png" alt="waiting to create application">

once the creation is done, you should see this:
<img src="../../images/deploy/elasticbeanstalk/completed-creation.png" alt="application created">



Now, we'll need to create a resource that helps configure the aws cli with the integration you created.

```
resources:
  - name: deploy-eb-basic-config
    type: cliConfig
    integration: dr-aws
    pointer:
      region: us-east-1
```
For more details on the `cliConfig` resource, [see here](../platform/workflow/resource/cliconfig).
Next you'll need a particular job that can utilize that resource. [runCLI jobs](../platform/job-runcli) consume `cliConfig` resource and use them to set up various tools with your included credentials,

```
jobs:
  - name: deploy-eb-basic-deploy
    type: runCLI
    steps:
      - IN: deploy-eb-basic-config
      - TASK:
        - script: aws elasticbeanstalk describe-applications
```
For now, we'll just add a simple command to describe our applications.  If you run this job, you should see some output in the logs like this:
```
{
    "Applications": [
        {
            "ApplicationName": "deploy-eb-basic",
            "Versions": [
                "Sample Application"
            ],
            "DateCreated": "2017-04-25T19:08:44.004Z",
            "ConfigurationTemplates": [],
            "DateUpdated": "2017-04-25T19:08:44.004Z",
            "ResourceLifecycleConfig": {
                "VersionLifecycleConfig": {
                    "MaxCountRule": {
                        "DeleteSourceFromS3": false,
                        "Enabled": false,
                        "MaxCount": 200
                    },
                    "MaxAgeRule": {
                        "DeleteSourceFromS3": false,
                        "Enabled": false,
                        "MaxAgeInDays": 180
                    }
                }
            }
        }
    ]
}
```
This indicates that your credentials were properly recognized and integrated into the job. Hopefully you see output from the application we created at the beginning.  If not, you might want to make sure that you've given the correct region in your `cliConfig` resource.


Next, we'll update the job to include a `gitRepo` that contains a `Dockerrun.aws.json` file, which we will modify any time we want to deploy a new image to our environment.  To add this resource, you'll need a subscription integration for your github credentials.  This can be the same repo that contains your pipelines configuration, but you'll still have to create a `gitRepo` resource to represent it.
```
resources:
  - name: deploy-eb-basic-repo
    type: gitRepo
    integration: dr-github
    pointer:
      sourceName: devops-recipes/deploy-beanstalk-basic
      branch: master

```

Finally, lets add a `params` resource in case there are any environment variables we want to make easily configurable.  Since this sample has source code for both single and [multi-container](./aws-elastic-beanstalk-multiple-containers) deployments, you'll see references to both here.
```
  - name: deploy-eb-basic-params
    type: params
    version:
      params:
        ENVIRONMENT: "sample" # used inside our sample image
        PORT: 80  # tells app which port to listen to
        AWS_EB_ENVIRONMENT_SINGLE: "Sample-env" # for the single-container example
        AWS_EB_ENVIRONMENT_MULTI: "Sample-env-1" # for the multi-container example
        AWS_EB_APPLICATION: "deploy-eb-basic" # the name you gave your eb application


```

Now, in order to have smooth automation utilizing the EBCLI tool, we're going to have to create one more configuration file.  In your source code, along side the `Dockerrun.aws.json` file, you should make a `.elasticbeanstalk` directory and create a `config.yml` file inside it.  In our case, we have a `single_container` folder that contains our dockerrun for this example. The file tree looks like this:
```
single_container/
├── Dockerrun.aws.json
└── .elasticbeanstalk
    └── config.yml

1 directory, 2 files
```

Inside our `config.yml`, we'll replace several of the fields with environment variable placeholders.  This gives us a lot of flexibility to change our application, environment, or region for any given deployment.
```
branch-defaults:
  default:
    environment: ${DEPLOYEBENVPARAMS_PARAMS_AWS_EB_ENVIRONMENT_SINGLE}
environment-defaults:
  ${DEPLOYEBENVPARAMS_PARAMS_AWS_EB_ENVIRONMENT_SINGLE}:
    branch: null
    repository: null
global:
  application_name: ${DEPLOYEBENVPARAMS_PARAMS_AWS_EB_APPLICATION}
  default_ec2_keyname: null
  default_platform: null
  default_region: ${DEPLOYEBBASICCONFIG_POINTER_REGION}
  instance_profile: null
  platform_name: null
  platform_version: null
  profile: null
  sc: null
  workspace_type: Application

```
Note that some of these are taken from our params object that we created earlier.
We'll also be using several placeholders in our `Dockerrun.aws.json` file.
```
{
  "AWSEBDockerrunVersion": "1",
  "Image": {
    "Name": "${DEPLOYEBBASICIMAGE_SOURCENAME}:${DEPLOYEBBASICIMAGE_VERSIONNAME}",
    "Update": "true"
  },
  "Ports": [
    {
      "ContainerPort": "${DEPLOYEBENVPARAMS_PARAMS_PORT}"
    }
  ],
  "environment": [
    {
      "name": "ENVIRONMENT",
      "value": "${DEPLOYEBENVPARAMS_PARAMS_ENVIRONMENT}"
    },
    {
      "name": "PORT",
      "value": "${DEPLOYEBENVPARAMS_PARAMS_PORT}"
    }
  ]
}
```

Now that we're all set up, we can create our runCLI job to make use of these components.  For now we want our job to do the following:

- Utilize the built-in `shippable_replace` utility on the `Dockerrun.aws.json` file as well as the `config.yml` file
- Print the modified files so we can make sure they're being properly updated
- Make sure all inputs have `switch: off` except the image. We only want to deploy when the image changes.

```
jobs:
  - name: deploy-eb-basic-deploy
    type: runCLI
    steps:
      - IN: deploy-eb-basic-image
      - IN: deploy-eb-basic-config
        switch: off
      - IN: deploy-eb-env-params
        switch: off
      - IN: deploy-eb-basic-repo
        switch: off
      - TASK:
        - script: pushd $DEPLOYEBBASICREPO_STATE/single_container && ls -al
        - script: shippable_replace Dockerrun.aws.json .elasticbeanstalk/config.yml
        - script: echo "========================== dockerrun" && cat Dockerrun.aws.json
        - script: echo "========================== config.yml" && cat .elasticbeanstalk/config.yml

```

Note that these variables come automatically from the `params` resource that we created earlier. Check out [this page](../platform/job-runcli#resource-variables) to learn all of the different supported environment variables in `runCLI` jobs.


Run your job, and you should see your modified files in the console output like this:
<img src="../../images/deploy/elasticbeanstalk/dockerrun-updated.png" alt="templated files">

Now that our Dockerrun and config.yml are looking good, we're ready to add some commands to perform the actual deployment.  Update your job to look like this:
```
- name: deploy-eb-basic-deploy
  type: runCLI
  steps:
    - IN: deploy-eb-basic-image
    - IN: deploy-eb-basic-config
      switch: off
    - IN: deploy-eb-env-params
      switch: off
    - IN: deploy-eb-basic-repo
      switch: off
    - TASK:
      - script: pushd $DEPLOYEBBASICREPO_STATE/single_container && ls -al
      - script: shippable_replace Dockerrun.aws.json .elasticbeanstalk/config.yml
      - script: eb deploy -v
```
We're going to use the ebcli to perform the deployment, since it comes pre-installed on the build image, and it takes care of a lot of the work for us.  Since we've manually added the config.yml, and our aws cli is already configured with our credentials, all we have to do is execute `eb deploy` (-v for verbose mode). This will package and deploy our code automatically based on the settings in our config.yml.

<img src="../../images/deploy/elasticbeanstalk/completed-deployment.png" alt="Finished Deployment">

## Sample project

Here are some links to a working sample of this scenario. This is a simple Node.js application that runs some tests and then pushes
the image to Amazon ECR. It also contains all of the pipelines configuration files for deploying to Elastic Beanstalk.

**Source code:**  [devops-recipes/deploy-beanstalk-basic](https://github.com/devops-recipes/deploy-beanstalk-basic).

**Build status badge:** [![Run Status](https://api.shippable.com/projects/58ffa88fd799850b00768021/badge?branch=master)](https://app.shippable.com/github/devops-recipes/deploy-beanstalk-basic)


## Advanced configuration

Coming soon

- private images
