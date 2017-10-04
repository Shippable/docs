page_main_title: Amazon ECS: Unmanaged deployments
main_section: Deploy
sub_section: Amazon ECS

# Custom deployments to Amazon ECS

The managed [deploy job](/platform/workflow/job/deploy) helps make your deployments very easy and quick to configure. However, you might want to write your deployment scripts yourself for added control and customization.

These are called "unmanaged" or "custom" deployments and are implemented with a [runSh job](/platform/workflow/job/runsh/).

This page walks through an example of deploying to Amazon ECS using runSh.

## Building blocks

You need the following building blocks for this scenario:

**Resources**

- [cliConfig](/platform/workflow/resource/cliconfig/) resource, to configure the aws cli
- [image](/platform/workflow/resource/image/) resource, pointing to the Docker image
- [gitRepo](/platform/workflow/resource/gitrepo/) resource, pointing to the Git repository containing your task definitions

**Jobs**

- [runSh](/platform/workflow/job/runsh/)

## Basic deployment

You will need two configuration files:

- `shippable.resources.yml`, which contains resource definitions
- `shippable.jobs.yml`, which contains job definitions

These files should be in your [syncRepo](/platform/workflow/resource/syncrepo/). Please read the [configuration](/deploy/configuration/) to find out how to add a syncRepo to Shippable.

Follow the steps below to set up a basic deployment to ECS.

###1: Create account integrations and add them to the subscription

You need the following two account integrations.  Once created, make sure to add them to the subscription that will contain your pipeline.  You can do this at the time of creation, or you can later navigate to your subscription settings page and add them from the "integrations" tab.

####Amazon ECS
Shippable will use an AWS key/secret pair to communicate with ECS on your behalf. [See here](../platform/integration/aws-ecs) for directions on adding an ECS account integration to Shippable for this.  Make sure to specify the subscription that you'd like to use this integration with.

This key should have the appropriate permissions and roles described [here](../platform/integration/aws-ecs#policy).  Now that the key is added on Shippable, we can reference it when we create pipeline yml blocks.  

####GitHub (or your source control provider)

Create an account integration for GitHub by following [instructions here](/platform/integration/github/).  By default, you will already have an account integration with whichever SCM provider you've used to log into Shippable.

For other source control providers, go to one of these:

- [Bitbucket](/platform/integration/bitbucket/)
- [GitLab](/platform/integration/gitlab/)
- [GitHub Enterprise](/platform/integration/github-enterprise/)


###2: Create resources

You need the following three resources in your `shippable.resources.yml` file:

####cliConfig
First, we need a `cliConfig` resource, which will help configure the aws cli with your integration.

```
resources:
  - name: deploy-ecs-unmanaged-config   # resource friendly name
    type: cliConfig
    integration: dr-aws                 # The Amazon ECS integration created in step 1
    pointer:
      region: us-east-1                 # region where you want to deploy

```
For a complete reference, check out the [cliConfig](/platform/workflow/resource/cliconfig/) page.


####image
Next, we need an `image` resource.  This will represent your Docker image in your pipeline.  In our example, we're using Amazon ECR since it integrates nicely with Amazon ECS.

```
resources:
  - name: deploy-ecs-unmanaged-image      # resource friendly name
    type: image
    pointer:
      sourceName: "679404489841.dkr.ecr.us-east-1.amazonaws.com/deploy-ecs-basic"   # image pointer
    seed:
      versionName: "latest"               # Tag value for first deployment


```
For a complete reference, check out the [image](/platform/workflow/resource/image/) page.

####gitRepo

Finally, we need a `gitRepo` resource which is a pointer to the git repository that contains your task definition json object, which we update any time we want to deploy a new image version.  In this example, we'll just use the same repo that we're using for our pipeline objects.

```
resources:
  - name: deploy-ecs-unmanaged-repo       # resource friendly name
    type: gitRepo
    integration: dr-github                # github integration from step 1
    pointer:
      sourceName: devops-recipes/deploy-ecs-unmanaged #repository containing task defs
      branch: master                      # branch of repository

```

For a complete reference, check out the [gitRepo](/platform/workflow/resource/gitrepo/) page.


###3: Define jobs

Jobs are defined in your `shippable.jobs.yml`.

Let's add a basic **runSh** job which takes in the resources we created above.


```
jobs:
  - name: deploy-ecs-unmanaged-cli
    type: runSh
    steps:
      - IN: deploy-ecs-unmanaged-config
      - IN: deploy-ecs-unmanaged-image
      - IN: deploy-ecs-unmanaged-repo
        switch: off
      - TASK:
        - script: shippable_replace ${DEPLOYECSUNMANAGEDREPO_STATE}/taskDefinitions/sampleTaskDef.json
        - script: aws ecs register-task-definition --cli-input-json file://${DEPLOYECSUNMANAGEDREPO_STATE}/taskDefinitions/sampleTaskDef.json > output.json
        - script: REVISION=$(cat output.json | jq '.taskDefinition.revision')
        - script: echo "revision is $REVISION"
        - script: aws ecs update-service --cluster deploy-ecs-basic --service ${JOB_NAME} --task-definition shippable:${REVISION} --desired-count 1
```

The snippet above does the following:

- use `shippable_replace` utility to fill in environment variables for our task definition template
- register a new task definition on Amazon ECS based on our json file
- capture the revision number from the output, store it in the ENV, and echo it to the console
- update the service using the `--task-definition family:revision` syntax

Please note this assumes that a service already exists on the cluster with the same name as this job (deploy-ecs-unmanaged-cli).

Inside the `taskDefinitions` directory in my `gitRepo`, I have a file called `sampleTaskDef.json` that contains this task definition:

```
{
    "family": "shippable",
    "containerDefinitions": [
        {
            "name": "node-app",
            "image": "${DEPLOYECSUNMANAGEDIMAGE_SOURCENAME}/${DEPLOYECSUNMANAGEDIMAGE_VERSIONNAME}",

            "portMappings": [
                {
                    "containerPort": 80,
                    "hostPort": 80
                }
            ],
            "memory": 100,
            "essential": true,
            "environment": [
                {
                    "name": "ENVIRONMENT",
                    "value": "unmanaged"
                }
            ]
        }
    ]
}


```

###4: Add your pipeline

Once you have these jobs and resources yml files as described above, push to your sync repository. You can then follow instructions to [add your pipeline to Shippable](/deploy/configuration/).

Your pipeline should look like this:
<img src="../../images/deploy/amazon-ecs/basic-deployment-unmanaged.png" alt="Alternate Pipeline">

###5: Trigger your pipeline

Right click on the **runSh** job, select "run job", and you should get some output from AWS like this:
<img src="../../images/deploy/amazon-ecs/basic-deployment-runcli-output.png" alt="runCLI Output">

And if you check ECS, you should see your service running your task definition!
<img src="../../images/deploy/amazon-ecs/basic-deployment-service.png" alt="Running service">

## Sample project

Here are some links to a working sample of this scenario. This is a simple Node.js application that runs some tests and then pushes
the image to Amazon ECR. It also contains all of the pipelines configuration files for deploying to Amazon ECS via runSh job.

**Source code:**  [devops-recipes/deploy-ecs-unmanaged](https://github.com/devops-recipes/deploy-ecs-unmanaged)

**Build status badge:** [![Run Status](https://api.shippable.com/projects/591920dcc8458b0700d166f7/badge?branch=master)](https://app.shippable.com/github/devops-recipes/deploy-ecs-unmanaged)



##Deploying to multiple environments

You can run your awscli commands against any cluster and region that you want. Deploying to one or more environments can be as easy as changing your default region on the awscli, or simply specifying a different `--cluster` when creating a service.

##Attaching a load balancer

If your load balancer is already created on AWS, deploying with it in a **runSh** job should be as simple as just adding the `LoadBalancers` array to your service template as described [here](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/create-service.html).

Note that a service that's already running cannot be updated with a load balancer.  You'll have to destroy/create the service from scratch with the load balancer for it to take effect.  Shippable's [managed deploy jobs](../platform/workflow/job/deploy) handle scenarios like this automatically for you.

## Using custom service names

You can specify the name of the task definition in **sampleTaskDef.json**. Service name can be changed via `--service` option in aws command line.  In the example, we created the service ahead of time, so you're welcome to name it anything you'd like.

## Using custom task definition templates

Update your **sampleTaskDef.json** to include any additional settings you'd like, and when you register the task definition and update your service to use it, your settings should take effect! Refer directly to the Amazon ECS [task defintion documentation](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html) for all possible available options.

## Using State and Environment Variables

Managing state and utilizing ENVs is a critical part of writing robust runSh scripts. This section will give a simple example of using state and ENVs to deploy to two Amazon ECS environments.

In the above sample project, we used an image IN along with `shippable_replace` to fill in our task definition on the fly.  This is utilizing Shippable's built-in resource ENVs.


### Environment Variables

By adding resources as `IN` steps, we have automatic access to several environment variables that will be useful for writing generic scripts.  Let's look at an excerpt of a printenv from this runSh job so that we can see what is available.

Resource-specific ENVs always start with the resource name. Job specific ENVs always start with the word `JOB`.  Shippable-added ENVs are always in all caps.

Here are the ENVs that would be generated for an `image` type resource called MyAppImage:
```
MYAPPIMAGE_SOURCENAME=devopsrecipes/basic-node-deploy-ecs
MYAPPIMAGE_NAME=MyAppImage
MYAPPIMAGE_VERSIONID=510638
MYAPPIMAGE_TYPE=image
MYAPPIMAGE_OPERATION=IN
MYAPPIMAGE_VERSIONNUMBER=1
MYAPPIMAGE_POINTER_SOURCENAME=devopsrecipes/basic-node-deploy-ecs
MYAPPIMAGE_ID=23323
MYAPPIMAGE_STATE=/build/IN/MyAppImage/image
MYAPPIMAGE_META=/build/IN/MyAppImage
MYAPPIMAGE_VERSIONNAME=master.7
MYAPPIMAGE_SEED_VERSIONNAME=master.7
MYAPPIMAGE_PATH=/build/IN/MyAppImage
```

The most critical values here are `MYAPPIMAGE_SOURCENAME` and `MYAPPIMAGE_VERSIONNAME`.  Using these, you can perform generic tasks like:

```
docker pull ${MYAPPIMAGE_SOURCENAME}:${MYAPPIMAGE_VERSIONNAME}
```
This way, every time your image tag is updated, the newest tag is pulled for use in the job.

Or, you can add them to your task definition template and use `shippable_replace` to fill in the values as we showed above.  This is a great way to ensure that your deployment is always using the most recent tag for your image.

All resources have environment variables like this. We've documented the list of possibilities [in our references section](/platform/workflow/job/overview/).

### Resource State Management

Every job in Shippable Pipelines has a `state` directory where information is written to be stored for use later on in the pipeline.  The location of this directory is found in the environment as `$JOB_STATE`.  

When you list a resource as an `OUT`, a `<resourcename>.env` file is created in the `$JOB_STATE` directory. This is the file that you need to write to if you want to update the state of that resource.

For example, lets say you want to update the desiredCount of your task definition based on the output of some previous job.  To do this in an unmanaged job, you'll want to create a `params` resource like this:

```
name: MyCountParams
type: params
version:
  params:
    desiredCount: 1
```

Then add it as an OUT of one runSh job that determines what the value should be, like this:

```
name: MyLoadChecker
type: runSh
steps:
  - IN: MyAwsConfig
  - IN: MyECSCluster
  - TASK:
    - script: NEW_COUNT=$(checkload) # assume this command returns an integer
                                     # based on some metric being queried
    - script: echo "desiredCount=$NEW_COUNT" >> $JOB_STATE/MyCountParams.env
  - OUT: MyCountParams
```

When this job completes, it will detect if a change was made to the desiredCount value, and if so, it will post a new version of the params resource with the new value.  This action will trigger any subsequent pipeline jobs that use the params resource as an IN.

Now, you'll want a second job that uses the `params` resource as an IN step.

```
name: MyServiceUpdater
type: runSh
steps:
  - IN: deploy-ecs-unmanaged-config
  - IN: deploy-ecs-unmanaged-image
  - IN: deploy-ecs-unmanaged-repo
  switch: off
  - IN: MyCountParams
  - TASK:
    - script: JSON_FILE=$MYSTATICTASKDEFREPO_STATE/taskDefinitions/sampleService.json
    - script: shippable_replace $JSON_FILE
    - script: aws ecs update-service --cli-input-json file://${JSON_FILE}
```

Finally, make sure that your service JSON file represents a service object with an environment variable that corresponds to your params resource like this:

```
{
    "cluster": "deploy-ecs-basic",
    "service": "${JOB_NAME}",
    "desiredCount": ${MYCOUNTPARAMS_DESIREDCOUNT},
    "deploymentConfiguration": {
        "maximumPercent": 0,
        "minimumHealthyPercent": 0
    }
}

```

`shippable_replace` will automatically replace the variables with the values in the environment, and the `aws ecs update-service` command will send it to Amazon ECS.

### Job State Management

You don't have to rely on other resources to transfer information from one job to the next. You can also accomplish this by writing information directly to one or more files in the job's state directory (located at `$JOB_STATE`)

Instead of writing to a `<resourceName>.env` file, just write any file you want to that same state directory, and use the job itself as input to the next job.

Here's an example of a runSh job that takes another job as IN, and references the previous job's state directory.

```
name: MyServiceUpdater
type: runSh
steps:
  - IN: MyAwsConfig
  - IN: MyLoadChecker  #another runSh job
  - TASK:
    - script: ls $MYLOADCHECKER_STATE
    - script: JSON_FILE=$MYLOADCHECKER_STATE/myService.json
    - script: aws ecs update-service --cli-input-json file://${JSON_FILE}

```

Using this strategy, you could have the `MyLoadChecker` job write the entire service JSON with whatever settings you'd like to a file in that job's `state` directory, then have this job simply read the result and send the update to aws.  In this example, any files that were written to the state directory in the job `MyLoadChecker` should also be visible in this job (`MyServiceUpdater`) when doing an `ls` on the incoming job's state directory.  We don't use `shippable_replace` here because we're assuming the first job has passed us a completed JSON with all appropriate values filled in.  Using this strategy, you could have one "service updater" job that takes input from multiple loadCheck jobs, each one responsible for a difference Amazon ECS service, and updates whichever one has changed.
