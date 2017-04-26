main_section: Deploy
sub_section: Deploying to AWS Elastic Beanstalk

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
        AWS_EB_ENVIRONMENT_SINGLE: "Sample-env" # for the single-container example
        AWS_EB_ENVIRONMENT_MULTI: "Sample-env-1" # for the multi-container example
        AWS_EB_APPLICATION: "deploy-eb-basic" # the name you gave your eb application
        AWS_EB_BUCKET_NAME: "shippable-deploy-eb" # a pre-existing s3 bucket to store the eb packages


```

Now, update the job to use these new resources as `IN` statements, and add some extra commands.  We need to update our` Dockerrun.aws.json` file to have the latest image tag.

- utilize the built-in `shippable_replace` utility on the `Dockerrun.aws.json` file
- `cat` the modified file so we can make sure it's being properly updated
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
        - script: shippable_replace single_container/Dockerrun.aws.json # path to the dockerrun file
        - script: cat single_container/Dockerrun.aws.json

```

In this example, we have a `Dockerrun.aws.json` file inside the "single_container" directory:

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
Note that these variables come automatically from the `params` resource that we created earlier. Check out [this page](../reference/job-runcli#resource-variables) to learn all of the different supported environment variables in `runCLI` jobs.

Your pipeline should look like this now:
<img src="../../images/deploy/elasticbeanstalk/deploy-eb-finalpipe.png" alt="Final pipeline">


Run your job, and you should see your modified `Dockerrun.aws.json` in the console output like this:
<img src="../../images/deploy/elasticbeanstalk/dockerrun-updated.png" alt="Updated dockerrun">

Now that our Dockerrun is looking good, we're ready to add some commands to perform the actual deployment.  Update your job to look like this:
```
- name: deploy-eb-basic-deploy
    type: runCLI
    flags:
      - deploy-eb-basic
    steps:
      - IN: deploy-eb-basic-image
      - IN: deploy-eb-basic-config
        switch: off
      - IN: deploy-eb-env-params
        switch: off
      - IN: deploy-eb-basic-repo
        switch: off
      - TASK:
        - script: cd $DEPLOYEBBASICREPO_STATE
        - script: shippable_replace single_container/Dockerrun.aws.json
        - script: cat single_container/Dockerrun.aws.json
        - script: BUCKET_NAME=${DEPLOYEBENVPARAMS_PARAMS_AWS_EB_BUCKET_NAME}
        - script: BUCKET_KEY="${DEPLOYEBENVPARAMS_PARAMS_AWS_EB_APPLICATION}-${DEPLOYEBENVPARAMS_PARAMS_AWS_EB_ENVIRONMENT_SINGLE}-${BUILD_NUMBER}.zip"
        - script: sudo apt-get install zip
        - script: pushd single_container && tar -czvf $BUCKET_KEY Dockerrun.aws.json
        - script: aws s3 cp $BUCKET_KEY s3://$BUCKET_NAME/
        - script: aws elasticbeanstalk create-application-version --application-name ${DEPLOYEBENVPARAMS_PARAMS_AWS_EB_APPLICATION} --version-label $BUCKET_KEY --source-bundle S3Bucket=$BUCKET_NAME,S3Key=$BUCKET_KEY
        - script: aws elasticbeanstalk update-environment --application-name ${DEPLOYEBENVPARAMS_PARAMS_AWS_EB_APPLICATION} --environment-name ${DEPLOYEBENVPARAMS_PARAMS_AWS_EB_ENVIRONMENT_SINGLE} --version-label $BUCKET_KEY
```
We're going to use the awscli to perform a number of commands that will result in an update to our EB application/environment.  Let's break it down one script line at a time:

```
- script: BUCKET_NAME=${DEPLOYEBENVPARAMS_PARAMS_AWS_EB_BUCKET_NAME}
```
This is the name of the bucket that we're going to upload our `Dockerrun.aws.json` to.  You can use whatever name you want.  You should create this bucket in advance.  In this case, we've added the bucket name to our `params` object. This will allow it to be easily reused across multiple jobs without having to hard-code it in each script.

```
- script: BUCKET_KEY="${DEPLOYEBENVPARAMS_PARAMS_AWS_EB_APPLICATION}-${DEPLOYEBENVPARAMS_PARAMS_AWS_EB_ENVIRONMENT_SINGLE}-${BUILD_NUMBER}.zip"
```
This should be a unique name. Every time this job runs, a package will be uploaded to your s3 bucket, and the name must be unique so that the upload doesn't fail.  We've used a combination of application name, environment name, and the built-in `$BUILD_NUMBER` environment variable, which is guaranteed to be unique.  You can use whatever unique identifier works best for you.

```
- script: sudo apt-get install zip
```
Beanstalk requires package uploads to be in the zip format, and this utility is not installed by default unfortunately, so add a step here to install it.

```
- script: pushd single_container && zip $BUCKET_KEY Dockerrun.aws.json
```
In order to deploy from s3, we need to upload a packaged version of the source.  However, since we're using docker images, the only file that needs to be in the package is the `Dockerrun.aws.json`, so we `pushd` into the directory (single_container), and issue our archive command.  If your `Dockerrun.aws.json` file is in the root of your repo, then you won't need the pushd, but you might want to make sure you're only archiving that one file, to avoid unnecessary s3 usage.

```
- script: aws s3 cp $BUCKET_KEY s3://$BUCKET_NAME/ && popd
```
Copy the archive to s3 using the appropriate bucket key and bucket name.  Then issue `popd` to undo our earlier `pushd`.

```
- script: aws elasticbeanstalk create-application-version --application-name ${DEPLOYEBENVPARAMS_PARAMS_AWS_EB_APPLICATION} --version-label $BUCKET_KEY --source-bundle S3Bucket=$BUCKET_NAME,S3Key=$BUCKET_KEY
```
This creates a new version of your application based on the archive you just uploaded.  This is tracked internally by beanstalk.  At this point, you could deploy the version manually via the beanstalk UI if you wanted to.

```
- script: aws elasticbeanstalk update-environment --application-name ${DEPLOYEBENVPARAMS_PARAMS_AWS_EB_APPLICATION} --environment-name ${DEPLOYEBENVPARAMS_PARAMS_AWS_EB_ENVIRONMENT_SINGLE} --version-label $BUCKET_KEY
```
Finally, this command tells a particular environment to update to the application version that you created.  Once this command is issued, you should see your beanstalk dashboard automatically deploy your new version.  Eventually your deployment should complete successfully and you'll see something like this:

<img src="../../images/deploy/elasticbeanstalk/completed-deployment.png" alt="Updated dockerrun">

One caveat of this method is that your script doesn't know if your deployment succeeded or failed. It's quite possible that your `update environment` command succeeds, but then the update itself fails at some step (fails to pull the image, cannot find the dockerrun file, etc).  You may want to enhance your script to perform some kind of query using something like `aws elasticbeanstalk --describe-events`.  See the advanced section for an example on how to do that.

## Sample project

Here are some links to a working sample of this scenario. This is a simple Node.js application that runs some tests and then pushes
the image to Amazon ECR. It also contains all of the pipelines configuration files for deploying to Elastic Beanstalk.

**Source code:**  [devops-recipes/deploy-beanstalk-basic](https://github.com/devops-recipes/deploy-beanstalk-basic).

**Build status badge:** [![Run Status](https://api.shippable.com/projects/58ffa88fd799850b00768021/badge?branch=master)](https://app.shippable.com/github/devops-recipes/deploy-beanstalk-basic)


## Advanced configuration

Coming soon

- updating image from CI
- private images
- waiting for success
