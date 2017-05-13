page_main_title: Amazon ECS: Unmanaged deployments
main_section: Deploy
sub_section: Amazon ECS

# Custom deployments to Amazon ECS

The managed [deploy job](/reference/job-deploy) helps make your deployments very easy and quick to configure. However, you might want to write your deployment scripts yourself for added control and customization.

These are called "unmanaged" or "custom" deployments and are implemented with a [runCLI job](/reference/job-runcli/).

This page walks through an example of deploying to Amazon ECS using runCLI.

## Building blocks

You need the following building blocks for this scenario:

**Resources**

- [cliConfig](/reference/resource-cliconfig/) resource, to configure the aws cli
- [image](/reference/resource-image/) resource, pointing to the Docker image
- [gitRepo](/reference/resource-gitrepo/) resource, pointing to the Git repository containing your task definitions

**Jobs**

- [runCLI](/reference/job-runcli/)

## Basic deployment

You will need two configuration files:

- `shippable.resources.yml` which contains resource definitions
- `shippable.jobs.yml` which contains job definitions

These files should be in your [syncRepo](/reference/resource-syncrepo/). Please read the [configuration](/deploy/configuration/) to find out how to add a syncRepo to Shippable.

Follow the steps below to set up a basic deployment to ECS.

###1: Create account integrations

You need the following two account integrations:

####Amazon ECS
Shippable will use an AWS key/secret pair to communicate with ECS on your behalf. [See here](../reference/int-amazon-ecs) for directions on adding an ECS account integration to Shippable for this.

This key should have the appropriate permissions and roles described [here](../reference/int-amazon-ecs#policy).  Now that the key is added on Shippable, we can reference it when we create pipeline yml blocks.  

####GitHub (or your source control provider)

Create an account integration for GitHub by following [instructions here](/reference/int-github/).

For other source control providers, go to one of these:

- [Bitbucket](/reference/int-bitbucket/)
- [Gitlab](/reference/int-gitlab/)
- [GitHub Enterprise](/reference/int-github-enterprise/)


###2: Create resources

You need the following three resources in your `shippable.resources.yml` file:

####cliConfig
First, we need a `cliConfig` resource, which will help configure the aws cli with your integration.

```
resources:
  - name: my-aws-config                 # resource friendly name
    type: cliConfig
    integration: my-ecs-creds           # integration created in step 1
    pointer:
      region: us-west-2                 # region where you want to deploy
```
For a complete reference, check out the [cliConfig](/reference/resource-cliconfig/) page.


####image
Next, we need an `image` resource.  This will represent your Docker image in your pipeline.  In our example, we're using Amazon ECR since it integrates nicely with Amazon ECS.

```
resources:

  - name: deploy-ecs-basic-image          # resource friendly name
    type: image
    pointer:
      sourceName: "679404489841.dkr.ecr.us-east-1.amazonaws.com/deploy-ecs-basic"   # image pointer
    seed:
      versionName: "latest"     # Tag value for first deployment

```
For a complete reference, check out the [image](/reference/resource-image/) page.

####gitRepo

Finally, we need a `gitRepo` resource which is a pointer to the git repository that contains your static task definition json object, which we update any time we want to deploy a new image version.  

```
resources:
  - name: my-static-taskdef-repo           # resource friendly name
    type: gitRepo
    integration: my-github                 # github integration created in step 1
    pointer:
      sourceName: shippablesamples/taskDefinitions  #repository containing task defs
      branch: master                                # branch of repository

```

For a complete reference, check out the [gitRepo](/reference/resource-gitrepo/) page.


###3: Define jobs

Jobs are defined in your `shippable.jobs.yml`.

Let's add a basic **runCLI** job which takes in the resources we created above.


```
jobs:
  - name: my-custom-ecs-deployment
    type: runCLI
    steps:
      - IN: my-aws-config
      - IN: my-static-taskdef-repo
      - IN: deploy-ecs-basic-image
      - TASK:
        - script: aws ecs describe-clusters
        - script: aws ecs register-task-definition --cli-input-json file://${MYSTATICTASKDEFREPO_STATE}/taskdefinitions/sample.json > output.json
        - script: REVISION=$(cat output.json | jq '.taskDefinition.revision')
        - script: echo "revision is $REVISION"
        - script: aws ecs update-service --cluster cluster-test-1 --service ${JOB_NAME} --task-definition shippable:${REVISION} --desired-count 2

```

The snippet below does the following:

- register a new task definition from a json file and capture the revision number
- update the service using the `--task-definition family:revision` syntax

Please note this assumes that a service already exists on the cluster with the same name as this job (myCustomDeployment).

Inside the `taskdefinitions` directory in my `gitRepo`, I have a file called `sample.json` that contains this task definition:

```
{
    "family": "shippable",
    "containerDefinitions": [
        {
            "name": "myapp",
            "image": "trriplejay/simpleserver:master.58",
            "cpu": 0,
            "memory": 125,
            "essential": true,
            "privileged": true
        }
    ]
}

```

###4: Add your pipeline

Once you have these jobs and resources yml files as described above, push to your sync repository. You can then follow instructions to [add your pipeline to Shippable](/deploy/configuration/).

Your pipeline should look like this:
<img src="../../images/deploy/amazon-ecs/basic-deployment-unmanaged.png" alt="Alternate Pipeline">

###5: Trigger your pipeline

Right click on the **runCLI** job, and you should get some output from AWS like this:
<img src="../../images/deploy/amazon-ecs/basic-deployment-runcli-output.png" alt="runCLI Output">

And if you check ECS, you should see your service running your task definition!
<img src="../../images/deploy/amazon-ecs/basic-deployment-service.png" alt="Running service">


##Deploying to multiple environments

You can run your awscli commands against any cluster and region that you want. Deploying to one or more environments can be as easy as changing your default region on the awscli, or simply specifying a different `--cluster` when creating a service.

##Attaching a load balancer

If your load balancer is already created on AWS, deploying with it in a **runCLI** job should be as simple as just adding the `LoadBalancers` array to your service template as described [here](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/create-service.html).

Note that a service that's already running cannot be updated with a load balancer.  You'll have to destroy/create the service from scratch with the load balancer for it to take effect.  Shippable managed deploy jobs handle these scenarios automatically for you.

## Using custom service names

You can specify the name of the task definition in **taskDefinition.json**. Service name can be changed via `--service` option in aws command line.

## Using custom task definition templates

Update your **taskDefinition.json** to include any additional settings you'd like, and when you register the task definition and update your service to use it, your settings should take effect! Refer directly to the Amazon ECS documentation for all possible available options.

## Using State and Environment Variables

Managing state and utilizing ENVs is a critical part of writing robust runCLI and runSh scripts. This section will give a simple example of using state and ENVs to deploy to two Amazon ECS environments.

First, we'll need an image to deploy.  This image will be updated automatically via Shippable CI.  You can check the [documentation](../ci/trigger-pipeline-jobs) for instructions on how to set that up.

```
resources:
  - name: MyAppImage
    type: image
    pointer:
      sourceName: devopsrecipes/basic-node-deploy-ecs
    version:
      versionName: master.7
```

Now we should add this image as an IN to our runCLI job.

```
jobs:
  - name: myCustomDeployment
    type: runCLI
    steps:
      - IN: MyAwsConfig
      - IN: MyAppImage
      - IN: MyStaticTaskDefRepo
      - TASK:
        - script: printenv
```

### Environment Variables

By adding resources as `IN` steps, we have automatic access to several environment variables that will be useful for writing generic scripts.  Let's look at an excerpt of a printenv from this runCLI job so that we can see what is available.

Resource-specific ENVs always start with the resource name. Job specific ENVs always start with the word `JOB`.  Shippable-added ENVs are always in all caps.

Here are the ENVs generated for MyAppImage in the example above:
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

Or, you can add them to your task definition template and use `shippable_replace` to fill in the values:

from a `sample.json` file in the `MyStaticTaskDefRepo` resource described in the [basic scenario page here](./amazon-ecs):
```
{
    "family": "shippable",
    "containerDefinitions": [
        {
            "name": "myapp",
            "image": "${MYAPPIMAGE_SOURCENAME}:${MYAPPIMAGE_VERSIONNAME}",
            "cpu": 0,
            "memory": 125,
            "essential": true,
            "privileged": true
        }
    ]
}
```

Then in your script:
```
steps:
  - script: shippable_replace ./taskdefinitions/sample.json
```

Now your task definition is using the latest image tag, and you can update your ECS service to use it.

All resources have environment variables like this. We've documented the list of possibilities [in our references section](../reference/job-runcli).

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

Then add it as an OUT of one runCLI job that determines what the value should be, like this:

```
name: MyLoadChecker
type: runCLI
steps:
  - IN: MyAwsConfig
  - IN: MyECSCluster
  - TASK:
    - script: NEW_COUNT=$(checkload) # assume this script returns an integer
                                     # based on some metric being queried
    - script: echo "desiredCount=$NEW_COUNT" >> $JOB_STATE/MyCountParams.env
  - OUT: MyCountParams
```

When this job completes, it will detect if a change was made to the desiredCount value, and if so, it will post a new version of the params resource with the new value.

Now, you'll want a second job that uses the `params` resource as an IN step.

```
name: MyServiceUpdater
type: runCLI
steps:
  - IN: MyAwsConfig
  - IN: MyECSCluster
  - IN: MyCountParams
  - IN: MyStaticTaskDefRepo
  - TASK:
    - script: JSON_FILE=$MYSTATICTASKDEFREPO_STATE/taskdefinitions/sample.json
    - script: shippable_replace $JSON_FILE
    - script: aws ecs update-cluster --cli-input-json file://${JSON_FILE} > output.json
```

Finally, make sure that your JSON file represents a service object with an environment variable that corresponds to your params resource like this:

```
{
    "cluster": "${MYECSCLUSTER_SOURCENAME}",
    "service": "node_app",
    "desiredCount": ${MYCOUNTPARAMS_DESIREDCOUNT},
    "deploymentConfiguration": {
        "maximumPercent": 0,
        "minimumHealthyPercent": 0
    }
}

```

`shippable_replace` will automatically replace the variables with the values in the environment, and the `aws ecs update-cluster` command will send it to Amazon ECS.

### Job State Management

You don't have to rely on other resources to transfer information from one job to the next. You can also accomplish this by writing information directly to one or more files in the job's state directory (located at `$JOB_STATE`)

Instead of writing to a `<resourceName>.env` file, just write any file you want to that same state directory, and use the job itself as input to the next job.

Here's an example of a runCLI job that takes another job as IN, and references the previous job's state directory.

```
name: MyServiceUpdater
type: runCLI
steps:
  - IN: MyAwsConfig
  - IN: MyECSCluster
  - IN: MyLoadChecker  #another runCLI job
  - TASK:
    - script: ls $MYLOADCHECKER_STATE
    - script: JSON_FILE=$MYLOADCHECKER_STATE/taskdefinitions/sample.json
    - script: shippable_replace $JSON_FILE
    - script: aws ecs update-cluster --cli-input-json file://${JSON_FILE} > output.json

```

Using this strategy, you could have the first job write the entire service JSON to a file with the appropriate `desiredCount`, then have this job simply send the update to aws.  In this example, any files that were written to the state directory in the job `MyLoadChecker` should also be visible in this job (`MyServiceUpdater`) when doing an `ls` on the incoming job's state directory.
