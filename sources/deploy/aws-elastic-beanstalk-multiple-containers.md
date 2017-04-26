main_section: Deploy
sub_section: Deploying to AWS Elastic Beanstalk

# Deploying Multiple Containers to Amazon Elastic Beanstalk
This page will describe how to deploy multiple containers to Amazon Elastic Beanstalk

## Setup

Follow the setup section as described in the basic EB scenario located [here](./aws-elastic-beanstalk)

## Managed Deployments
Shippable does not support managed beanstalk deployments at this time.

## Unmanaged Deployments

Shippable allows you to communicate with AWS via a job type called `runCLI`.  You can read the full reference on the job [here](../reference/job-runcli).  This type of job gives you the power to script whatever workflow is necessary for your environment.

On this page, we'll use the basic beanstalk example as a starting point, and simply make some small changes so that it can be used to deploy multiple containers.

**You can fork the code from here:** [devops-recipes/deploy-beanstalk-basic](https://github.com/devops-recipes/deploy-beanstalk-basic).

### Basic Configuration

The first step is to create a new application, or a new environment in an existing application, and select the "multi-container docker" platform.

<img src="../../images/deploy/elasticbeanstalk/multi-cont-new-env.png" alt="Multi Container Beanstalk">

We can leave it on the 'sample application' setting, since we'll be replacing it soon anyway.

In order to switch to multi-container, we'll have to add an extra image, and then use that extra image in our new multi-container runCLI job.

```
resources:
  - name: deploy-eb-nginx-image
    type: image
    integration: dr-ecr
    pointer:
      sourceName: "679404489841.dkr.ecr.us-east-1.amazonaws.com/nginx"
    seed:
      versionName: "1.12.0"
```

```
jobs:
  - name: deploy-eb-multi-deploy
    type: runCLI
    steps:
      - IN: deploy-eb-basic-image
      - IN: deploy-eb-nginx-image
      - IN: deploy-eb-basic-config
        switch: off
      - IN: deploy-eb-env-params
        switch: off
      - IN: deploy-eb-basic-repo
        switch: off
      - TASK:
        - script: cd $DEPLOYEBBASICREPO_STATE
        - script: shippable_replace multi_container/Dockerrun.aws.json
        - script: cat multi_container/Dockerrun.aws.json
        - script: BUCKET_NAME=${DEPLOYEBENVPARAMS_PARAMS_AWS_EB_BUCKET_NAME}
        - script: BUCKET_KEY="${DEPLOYEBENVPARAMS_PARAMS_AWS_EB_APPLICATION}-${DEPLOYEBENVPARAMS_PARAMS_AWS_EB_ENVIRONMENT_MULTI}-${BUILD_NUMBER}.zip"
        - script: sudo apt-get install zip
        - script: pushd multi_container && zip $BUCKET_KEY Dockerrun.aws.json
        - script: aws s3 cp $BUCKET_KEY s3://$BUCKET_NAME/ && popd
        - script: aws elasticbeanstalk create-application-version --application-name ${DEPLOYEBENVPARAMS_PARAMS_AWS_EB_APPLICATION} --version-label $BUCKET_KEY --source-bundle S3Bucket=$BUCKET_NAME,S3Key=$BUCKET_KEY
        - script: aws elasticbeanstalk update-environment --application-name ${DEPLOYEBENVPARAMS_PARAMS_AWS_EB_APPLICATION} --environment-name ${DEPLOYEBENVPARAMS_PARAMS_AWS_EB_ENVIRONMENT_MULTI} --version-label $BUCKET_KEY
```

You'll notice that this job is almost identical to the [basic sample version](./aws-elastic-beanstalk).  This is because the only real difference is in the `Dockerrun.aws.json` file.  [See here](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_docker_v2config.html) for the official multi-container documentation.

We're going to add a new dockerrun file to our `multi_container` directory, and it'll look like this:
```
{
  "AWSEBDockerrunVersion": 2,
  "containerDefinitions": [
    {
      "name": "application",
      "image": "${DEPLOYEBBASICIMAGE_SOURCENAME}:${DEPLOYEBBASICIMAGE_VERSIONNAME}",
      "environment": [
        {
          "name": "ENVIRONMENT",
          "value": "${DEPLOYEBENVPARAMS_PARAMS_ENVIRONMENT}"
        }
      ],
      "essential": true,
      "memory": 128
    },
    {
      "name": "nginx-proxy",
      "image": "${DEPLOYEBNGINXIMAGE_SOURCENAME}:${DEPLOYEBNGINXIMAGE_VERSIONNAME}",
      "essential": true,
      "memory": 128,
      "portMappings": [
        {
          "hostPort": 80,
          "containerPort": 80
        }
      ],
      "links": [
        "application"
      ]
    }
  ]
}

```

Multi-container docker beanstalk is actually using Amazon ECS behind the scenes.  It will convert this dockerrun file into a Task Definition, and then run it on a cluster that was provisioned when you first created the environment.  In this case, whenever our job runs, we'll be creating a new revision of the task definition, which Amazon ECS will then automatically roll out to your cluster.  

<img src="../../images/deploy/elasticbeanstalk/multi-running-on-ecs.png" alt="Multi Container Beanstalk on ECS">

## Sample project

Here are some links to a working sample of this scenario. This is a simple Node.js application that runs some tests and then pushes
the image to Amazon ECR. It also contains all of the pipelines configuration files for deploying to Elastic Beanstalk.

**Source code:**  [devops-recipes/deploy-beanstalk-basic](https://github.com/devops-recipes/deploy-beanstalk-basic).

**Build status badge:** [![Run Status](https://api.shippable.com/projects/58ffa88fd799850b00768021/badge?branch=master)](https://app.shippable.com/github/devops-recipes/deploy-beanstalk-basic)


### Advanced Configuration

Coming soon

- updating images from CI
- private images
- waiting for success
