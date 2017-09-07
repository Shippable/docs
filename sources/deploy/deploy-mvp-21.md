page_main_title: Using Kubernetes CLI to deploy a single container application to GKE

main_section: Deploy
sub_section: Amazon ECS

# Using Kubernetes CLI to deploy a single container application to GKE

The [deploy job](/platform/workflow/job/deploy) helps make your deployments very easy and quick to configure. However, you might want to write your deployment scripts yourself for added control and customization.

These are called "cli" or "custom" deployments and are implemented with a [runSH job](/platform/workflow/job/runsh/).

This page walks through an example of deploying to Google Container Engine (GKE) using runSH.

## Building blocks

You need the following building blocks for this scenario:

**Resources**

- [cliConfig](/platform/workflow/resource/cliconfig/) resource, to configure the kubernetes cli
- [image](/platform/workflow/resource/image/) resource, pointing to the Docker image
- [gitRepo](/platform/workflow/resource/gitrepo/) resource, pointing to the Git repository containing your task definitions

**Jobs**

- [runSH](/platform/workflow/job/runsh/)

## Basic deployment

You will need two configuration files:

- `shippable.resources.yml` which contains resource definitions
- `shippable.jobs.yml` which contains job definitions

These files should be in your [syncRepo](/platform/workflow/resource/syncrepo/). Please read the [configuration](/deploy/configuration/) to find out how to add a syncRepo to Shippable.

Follow the steps below to set up a basic deployment to ECS.

###1: Create account integrations and add them to the subscription

You need the following two account integrations.  Once created, make sure to add them to the subscription that will contain your pipeline.  You can do this at the time of creation, or you can later navigate to your subscription settings page and add them from the "integrations" tab.

####GKE
Shippable will use the JSON key specified in the integration to communicate with GKE on your behalf. [See here](/platform/integration/gke) for directions on adding a GKE account integration to Shippable for this.  Make sure to specify the subscription that you'd like to use this integration with.

The `runCLI` job will automatically configure kubectl based on the json key associated with your GKE integration.  This means that you don't have to do any setup yourself. Your script can be focused on the actions you want to take.

####GCR
You also need to configure an integration to GCR so that we can pull your image. Follow instructions in the [GCR integration](/platform/integration/gcr/) page.

####GitHub (or your source control provider)

Create an account integration for GitHub by following [instructions here](/platform/integration/github/).  By default, you will already have an account integration with whichever SCM provider you've used to log into Shippable.

For other source control providers, go to one of these:

- [Bitbucket](/platform/integration/bitbucket/)
- [Gitlab](/platform/integration/gitlab/)
- [GitHub Enterprise](/platform/integration/github-enterprise/)

###2: Create resources

You need the following three resources in your `shippable.resources.yml` file:

####cliConfig
First, we need a `cliConfig` resource, which will help configure the kubernetes cli with your integration.

```
resources:
  - name: MyGkeConfig   # resource friendly name
    type: cliConfig
    integration: int_gke               # The GKE integration created in step 1
```
For a complete reference, check out the [cliConfig](/platform/workflow/resource/cliconfig/) page.

####gitRepo

Finally, we'll include a gitRepo that contains a static pod spec json object, which we update any time we want to deploy a new image version.

```
resources:
  - name: MyPodSpecRepo       # resource friendly name
    type: gitRepo
    integration: int_github                # github integration from step 1
    pointer:
      sourceName: gkedeploy/podTemplates #repository containing task defs
      branch: master                      # branch of repository

```

Inside the 'templates' directory in the podTemplates repository, we have a file called `sample.yaml` that contains this task definition:

```
apiVersion: v1
kind: ReplicationController
metadata:
  name: sample-app
spec:
  replicas: 2
  selector:
    app: sample
  template:
    metadata:
      name: sample-app
      labels:
        app: sample
    spec:
      containers:
      - name: node-app
        image: gcr.io/sample-gke/basic-node-deploy-gke
        ports:
        - containerPort: 80
```


For a complete reference, check out the [gitRepo](/platform/workflow/resource/gitrepo/) page.

###3: Define jobs
Jobs are defined in your `shippable.jobs.yml`.

Let's add a basic **runSH** job which takes in the resources we created above. The job will specify the gitRepo as an `IN`, and add some extra commands to create the replicationController on the cluster.

```
jobs:
  - name: myCustomDeployment
    type: runCLI
    steps:
      - IN: MyGkeConfig
      - IN: MyPodSpecRepo
      - TASK:
        - script: kubectl get namespaces
        - script: kubectl create -f ${MYPODSPECREPO}/templates/sample.yaml --namespace=shippable
        - script: kubectl describe replicationControllers --namespace=shippable
```

The snippet above does the following:

- list the namespaces
- use kubectl to create the controller
- describe the RCs in the namespace

###4: Add your pipeline

Once you have these jobs and resources yml files as described above, push to your sync repository. You can then follow instructions to [add your pipeline to Shippable](/deploy/configuration/).

Now your pipeline should look something like this:
<img src="/images/deploy/gke/basic-deployment-unmanaged.png" alt="Alternate Pipeline">

###5: Trigger your pipeline

Right click on the **runSH** job, select "run job".

# Advanced topics

## Environment Variables

By adding resources as `IN` steps, we have automatic access to several environment variables that will be useful for writing generic scripts.  Let's look at an excerpt of a printenv from this runCLI job so that we can see what is available.

Resource-specific ENVs always start with the resource name. Job specific ENVs always start with the word `JOB`.  Shippable-added ENVs are always in all caps.

Here are the ENVs generated for MyAppImage in the example above:
```
MYAPPIMAGE_SOURCENAME=devopsrecipes/basic-node-deploy-gke
MYAPPIMAGE_NAME=MyAppImage
MYAPPIMAGE_VERSIONID=510638
MYAPPIMAGE_TYPE=image
MYAPPIMAGE_OPERATION=IN
MYAPPIMAGE_VERSIONNUMBER=1
MYAPPIMAGE_POINTER_SOURCENAME=devopsrecipes/basic-node-deploy-gke
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

Or, you can add them to your pod spec yaml, and use `shippable_replace` to fill in the values:

from a `sample.yaml` file in the `MyPodSpecRepo` resource described in the [basic scenario page here](./gke):
```
apiVersion: v1
kind: ReplicationController
metadata:
  name: sample-app
spec:
  replicas: 2
  selector:
    app: sample
  template:
    metadata:
      name: sample-app
      labels:
        app: sample
    spec:
      containers:
      - name: node-app
        image: ${MYAPPIMAGE_SOURCENAME}:${MYAPPIMAGE_VERSIONNAME}
        ports:
        - containerPort: 80

```

Then in your script:
```
steps:
  - script: shippable_replace ./templates/sample.yaml
```

Now your pod spec is using the latest image tag, and you can update your replicationController to use it.

All resources have environment variables like this. We've documented the list of possibilities [in our references section](../platform/workflow/job/runsh).  

## Resource State Management

Every job in Shippable Pipelines has a `state` directory where information is written to be stored for use later on in the pipeline.  The location of this directory is found in the environment as `$JOB_STATE`.  

When you list a resource as an `OUT`, a `<resourcename>.env` file is created in the `$JOB_STATE` directory. This is the file that you need to write to if you want to update the state of that resource.

For example, lets say you want to update the replicas of your RC based on the output of some previous job.  To do this in an unmanaged job, you'll want to create a `params` resource like this:

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
  - IN: MyGkeConfig
  - IN: MyGKECluster
  - TASK:
    - script: NEW_COUNT=$(checkload) # assume this script returns an integer
                                     # based on some metric being queried
    - script: echo "replicas=$NEW_COUNT" >> $JOB_STATE/MyCountParams.env
  - OUT: MyCountParams
```

When this job completes, it will detect if a change was made to the desiredCount value, and if so, it will post a new version of the params resource with the new value.

Now, you'll want a second job that uses the `params` resource as an IN step.

```
name: MyServiceUpdater
type: runCLI
steps:
  - IN: MyGkeConfig
  - IN: MyGKECluster
  - IN: MyCountParams
  - IN: MyStaticTaskDefRepo
  - TASK:
    - script: YAML_FILE=$MYPODSPECREPO_STATE/templates/sample.yaml
    - script: shippable_replace $YAML_FILE
    - script: kubectl update rc -f ${YAML_FILE} --namespace=shippable
```

Finally, make sure that your YAML file represents a replicationController object with an environment variable that corresponds to your params resource like this:
```
apiVersion: v1
kind: ReplicationController
metadata:
  name: sample-app
spec:
  replicas: ${MYCOUNTPARAMS_REPLICAS}
  selector:
    app: sample
  template:
    metadata:
      name: sample-app
      labels:
        app: sample
    spec:
      containers:
      - name: node-app
        image: ${MYAPPIMAGE_SOURCENAME}:${MYAPPIMAGE_VERSIONNAME}
        ports:
        - containerPort: 80

```

`shippable_replace` will automatically replace the variables with the values in the environment, and the `kubectl update rc` command will send it to your cluster.

## Job State Management

You don't have to rely on other resources to transfer information from one job to the next. You can also accomplish this by writing information directly to one or more files in the job's state directory (located at `$JOB_STATE`)

Instead of writing to a `<resourceName>.env` file, just write any file you want to that same state directory, and use the job itself as input to the next job.

Here's an example of a runCLI job that takes another job as IN, and references the previous job's state directory.

```
name: MyServiceUpdater
type: runCLI
steps:
  - IN: MyGkeConfig
  - IN: MyGKECluster
  - IN: MyLoadChecker  #another runCLI job
  - TASK:
    - script: ls $MYLOADCHECKER_STATE
    - script: YAML_FILE=$MYLOADCHECKER_STATE/templates/sample.yaml
    - script: shippable_replace $YAML_FILE
    - script: kubectl update rc -f ${YAML_FILE} --namespace=shippable

```

Using this strategy, you could have the first job write the entire RC yaml to a file with the appropriate `replicas`, then have this job simply send the update to GKE.  In this example, any files that were written to the state directory in the job `MyLoadChecker` should also be visible in this job (`MyServiceUpdater`) when doing an `ls` on the incoming job's state directory.
