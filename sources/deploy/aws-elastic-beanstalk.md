main_section: Deploy
sub_section: Deploying to Amazon Elastic Beanstalk

# Deploying to Amazon Elastic Beanstalk
Deploying to [Amazon Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/) is easily automated using Shippable Pipelines.  This page will describe how you can take a single docker image and update your existing Elastic Beanstalk (EB) environment.

## Setup

Shippable will use an AWS key/secret pair to communicate with EB on your behalf. You can add this to Shippable via [Account Integrations](../../getting-started/integrations), so that we can internally use those keys to issue commands to ECS.

- Go to your **Account Settings** by clicking on the gear icon in the top navigation bar.
- Click on **Integrations** in the left sidebar menu and then click on **Add Integration**.
- Locate **AWS** of type **deploy** in the list and click **Create Integration**.
- Give your integration a name, and provide your AWS access key and AWS secret key
- From the dropdown, select the subscription that you'll be using to create your pipelines.
- Click **Save**

<img src="../../images/deploy/elasticbeanstalk/create-aws-deploy-integration.png" alt="Add AWS credentials">


We'll use a type `image` resource.  This will represent your Docker image in your pipeline.  In our example, we're using Amazon ECR since it integrates nicely with EB.

```
resources:

  - name: deploy-eb-basic-image
    type: image
    integration: dr-ecr
    pointer:
      sourceName: "679404489841.dkr.ecr.us-east-1.amazonaws.com/nodeapp"
    seed:
      versionName: "latest"

```




## Managed Deployments
Shippable does not currently support managed beanstalk deployments, however we do expect to introduce this functionality in the future.

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
For more details on the `cliConfig` resource, [see here](../reference/resource-cliconfig). Next you'll need a particular job that can utilize that resource.

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

Finally, lets add a `params` resource in case there are any environment variables we want to make easily configurable.
```
  - name: deploy-eb-basic-params
    type: params
    version:
      params:
        ENVIRONMENT: "sample" # used inside our sample image
        PORT: 80  # tells app which port to listen to
        AWS_EB_ENVIRONMENT: "Sample-env"      # for use with the EB commands
        AWS_EB_APPLICATION: "deploy-eb-basic" # for use with the EB commands

```

Now, update the job to use this gitRepo as an `IN`, and add some extra commands.  We need to update our` Dockerrun.aws.json` file, and then deploy it.

- utilize the built-in `shippable_replace` utility on the `Dockerrun.aws.json` file
- use the preconfigured eb cli to init and deploy.
- make sure everything has `switch: off` except the image. We only want to deploy when the image changes.

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
        - script: cd $DEPLOYEBBASICREPO_STATE # the dir where our gitRepo files are cloned
        - script: shippable_replace Dockerrun.aws.json
        - script: cat Dockerrun.aws.json

```

In this example, we should have a `Dockerrun.aws.json` file at the root of our repo that looks like this:

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
Note that these variables come directly from the `params` resource that we created earlier. Check out [this page](../reference/job-runcli#resource-variables) to learn all of the different supported environment variables in `runCLI` jobs.

Your pipeline should look like this now:
<img src="../../images/deploy/elasticbeanstalk/deploy-eb-finalpipe.png" alt="Final pipeline">


Run your job, and you should see your modified `Dockerrun.aws.json` in the console output like this:
<img src="../../images/deploy/elasticbeanstalk/dockerrun-updated.png" alt="Updated dockerrun">

Now that our Dockerrun is looking good, we're ready to add some commands to perform the actual deployment.  First we'll need to initialize the EBCLI:

```
- script: echo \"\" | eb init ${DEPLOYEBENVPARAMS_PARAMS_AWS_EB_APPLICATION} -r ${DEPLOYEBBASICCONFIG_POINTER_REGION}
```
NOTE: the `echo \"\" |` is required to get around how the latest versions of ebcli have `eb init` prompt for whether or not you want to use code commit. It's a bit hacky, but ebcli seems to offer no other way around it.

Once that's complete, we'll issue the deploy command:
```
- script: eb deploy ${DEPLOYEBENVPARAMS_PARAMS_AWS_EB_ENVIRONMENT}
```

This will send your modified code up to EB, where it will automatically detect the changed dockerrun file, pull the latest image, setup the environments, and run your application.
<img src="../../images/deploy/elasticbeanstalk/completed-deployment.png" alt="Updated dockerrun">

## Sample project

Here are some links to a working sample of this scenario. This is a simple Node.js application that runs some tests and then pushes
the image to Amazon ECR. It also contains all of the pipelines configuration files for deploying to Elastic Beanstalk.

**Source code:**  [devops-recipes/deploy-beanstalk-basic](https://github.com/devops-recipes/deploy-beanstalk-basic).

**Build status badge:** [![Run Status](https://api.shippable.com/projects/58ffa88fd799850b00768021/badge?branch=master)](https://app.shippable.com/github/devops-recipes/deploy-beanstalk-basic)


## Advanced configuration

Coming soon
- updating image from CI
- private images
- direct aws commands instead of ebcli
