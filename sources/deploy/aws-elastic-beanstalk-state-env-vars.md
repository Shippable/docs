page_main_title: Working with state and environment variables
main_section: Deploy
sub_section: AWS Elastic Beanstalk

# Using State and Environment Variables with Amazon Elastic Beanstalk

## Setup

Follow the setup section as described in the basic EB scenario located [here](./aws-elastic-beanstalk)

This page will refer to the jobs and resources found in the [devops-recipes/deploy-beanstalk-basic](https://github.com/devops-recipes/deploy-beanstalk-basic) sample repository.

## Managed
Shippable does not support managed beanstalk deployments at this time.

## Unmanaged

In an unmanaged scenario, you'll be using a runCLI job with an AWS cliConfig.

Managing state and utilizing ENVs is a critical part of writing robust runCLI and runSh scripts. This section will explain how these are used in the sample project.

First, lets look at our application image.  This image will be updated automatically via Shippable CI.  You can check the [documentation](../ci/trigger-pipeline-jobs) for instructions on how to configure a shippable.yml to accomplish that.

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

Now we should add this image as an IN to our runCLI job.

```
jobs:
  - name: deploy-eb-basic-deploy
    type: runCLI
    steps:
      - IN: deploy-eb-basic-image
      - TASK:
        - script: printenv

```

### Environment Variables

By adding resources as `IN` steps, we have automatic access to several environment variables that will be useful for writing generic scripts.  Let's look at an excerpt of a printenv from this runCLI job so that we can see what is available.

Resource-specific ENVs always start with the resource name. Job specific ENVs always start with the word `JOB`.  Shippable-added ENVs are always in all caps.

Here are the ENVs generated for MyAppImage in the example above:
```
DEPLOYEBBASICIMAGE_SOURCENAME=devopsrecipes/deploy-beanstalk-basic
DEPLOYEBBASICIMAGE_NAME=MyAppImage
DEPLOYEBBASICIMAGE_VERSIONID=510638
DEPLOYEBBASICIMAGE_TYPE=image
DEPLOYEBBASICIMAGE_OPERATION=IN
DEPLOYEBBASICIMAGE_VERSIONNUMBER=1
DEPLOYEBBASICIMAGE_POINTER_SOURCENAME=devopsrecipes/deploy-beanstalk-basic
DEPLOYEBBASICIMAGE_ID=23323
DEPLOYEBBASICIMAGE_STATE=/build/IN/MyAppImage/image
DEPLOYEBBASICIMAGE_META=/build/IN/MyAppImage
DEPLOYEBBASICIMAGE_VERSIONNAME=master.7
DEPLOYEBBASICIMAGE_SEED_VERSIONNAME=master.7
DEPLOYEBBASICIMAGE_PATH=/build/IN/deploy-eb-basic-image
```

The most critical values here are `DEPLOYEBBASICIMAGE_SOURCENAME` and `DEPLOYEBBASICIMAGE_VERSIONNAME`.  Using these, you can perform generic tasks like:

```
docker pull ${DEPLOYEBBASICIMAGE_SOURCENAME}:${DEPLOYEBBASICIMAGE_VERSIONNAME}
```
This way, every time your image tag is updated, the newest tag is pulled for use in the job.

Or, you can add them to your dockerrun file and use `shippable_replace` to fill in the values:

from a `Dockerrun.aws.json` file in the `single_container` directory described in the [basic scenario page here](./aws-elastic-beanstalk):
```
{
  "AWSEBDockerrunVersion": "1",
  "Image": {
    "Name": "${DEPLOYEBBASICIMAGE_SOURCENAME}:${DEPLOYEBBASICIMAGE_VERSIONNAME}",
    "Update": "true"
  },
  "Ports": [
    {
      "ContainerPort": "80"
    }
  ],
  "environment": [
    {
      "name": "ENVIRONMENT",
      "value": "prod"
    },
    {
      "name": "PORT",
      "value": "80"
    }
  ]
}

```

Then in your script:
```
steps:
  - script: shippable_replace single_container/Dockerrun.aws.json
```
Make sure you're in the correct location to access the directory!

Now your Dockerrun file is using the latest image tag, and you can update your beanstalk environment to deploy it.

All resources have environment variables like this. We've documented the list of possibilities [in our references section](../platform/workflow/job/runcli).

### Resource State Management

Every job in Shippable Pipelines has a `state` directory where information is written to be stored for use later on in the pipeline.  The location of this directory is found in the environment as `$JOB_STATE`.  

When you list a resource as an `OUT`, a `<resourcename>.env` file is created in the `$JOB_STATE` directory. This is the file that you need to write to if you want to update the state of that resource.

For example, lets say you want to update an environment variable in your application based on the results of some previous job.  To do this in an unmanaged job, you'll first want to create a `params` resource. We'll use the existing params resource from the sample project:

```
  - name: deploy-eb-env-params
    type: params
    version:
      params:
        ENVIRONMENT: "dev"
        PORT: 80
        AWS_EB_ENVIRONMENT_SINGLE: "Sample-env"
        AWS_EB_ENVIRONMENT_MULTI: "Sample-env-1"
        AWS_EB_APPLICATION: "deploy-eb-basic"
        AWS_EB_BUCKET_NAME: "shippable-deploy-eb"
```

Then add it as an OUT of one runCLI job that determines what the value should be, like this:

```
name: MyLoadChecker
type: runCLI
steps:
  - IN: MyAwsConfig
  - IN: MyECSCluster
  - TASK:
    - script: NEW_ENV=$(checkenv) # assume this script returns a string
                                  # based on some condition in the job.
    - script: echo "ENVIRONMENT=$NEW_COUNT" >> $JOB_STATE/deploy-eb-env-params.env
  - OUT: deploy-eb-env-params
```

When this job completes, it will detect if a change was made to the ENVIRONMENT value, and if so, it will post a new version of the params resource with the new value.

Now, you'll want a second job that uses the `params` resource as an IN step.

```
name: MyBeanstalkUpdater
type: runCLI
steps:
  - IN: MyAwsConfig
  - IN: deploy-eb-env-params
  - IN: deploy-eb-basic-repo
    switch: off
  - TASK:
    - script: JSON_FILE=$DEPLOYEBBASICREPO_STATE/single_container/Dockerrun.aws.json
    - script: shippable_replace $JSON_FILE
```
Refer to the basic example for the recommended way to script your EB deployment.

Finally, make sure that your JSON file follows the correct Dockerrun.aws.json format with an environment variable that corresponds to your params resource like this:

```
{
  "AWSEBDockerrunVersion": "1",
  "Image": {
    "Name": "${DEPLOYEBBASICIMAGE_SOURCENAME}:${DEPLOYEBBASICIMAGE_VERSIONNAME}",
    "Update": "true"
  },
  "Ports": [
    {
      "ContainerPort": 80
    }
  ],
  "environment": [
    {
      "name": "ENVIRONMENT",
      "value": "${DEPLOYEBENVPARAMS_PARAMS_ENVIRONMENT}"
    },
    {
      "name": "PORT",
      "value": 80
    }
  ]
}

```

`shippable_replace` will automatically replace the variables with the values in the environment.  Then, when you send the package to beanstalk, it will deploy the dockerrun with the replaced values.

### Job State Management

You don't have to rely on other resources to transfer information from one job to the next. You can also accomplish this by writing information directly to one or more files in the job's state directory (located at `$JOB_STATE`)

Instead of writing to a `<resourceName>.env` file, just write any file you want to that same state directory, and use the job itself as input to the next job.

Here's an example of a runCLI job that takes another job as IN, and references the previous job's state directory.

```
name: MyBeanstalkDeployer
type: runCLI
steps:
  - IN: MyAwsConfig
  - IN: MyLoadChecker  #another runCLI job
  - TASK:
    - script: ls $MYLOADCHECKER_STATE
    - script: JSON_FILE=$MYLOADCHECKER_STATE/single_container/Dockerrun.aws.json
    - script: shippable_replace $JSON_FILE
    - script: aws elasticbeanstalk update-environment

```

Using this strategy, you could have the first job write the entire Dockerrun.aws.json to a file with the appropriate `ENVIRONMENT` and any other settings you'd like, then have this second job simply send the update to aws.  In this example, any files that were written to the state directory in the job `MyLoadChecker` should also be visible in this job (`MyBeanstalkDeployer`) when doing an `ls` on the incoming job's state directory.
