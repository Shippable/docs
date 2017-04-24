main_section: Deploy
sub_section: Deploying to Google Container Engine

# Using State and Environment Variables with Google Container Engine

## Setup

Make sure you have a cluster set up on Google Container Engine (GKE), then create an integration and cluster resource [as described in the setup section here](./gke)


## Managed

Managed jobs maintain their own state, and it cannot be customized.  To set environment variables for managed jobs, use the `params` resource.  This resource type can be applied to manifests or individual images within a manifest.  They can be overridden as your pipeline moves from one environment to another, and they have support for secure encrypted variables.

## Unmanaged

In an unmanaged scenario, you'll be using a runCLI job with a GKE cliConfig [as described in the unmanaged section of our basic scenario](./gke#unmanaged-deployments).

Managing state and utilizing ENVs is a critical part of writing robust runCLI and runSh scripts. This section will give a simple example of using state and ENVs to deploy to two GKE environments.

First, we'll need an image to deploy.  This image will be updated automatically via Shippable CI.  You can check the [TODO: add link] documentation for instructions on how to set that up.

```
resources:
  - name: MyAppImage
    type: image
    pointer:
      sourceName: devopsrecipes/basic-node-deploy-gke
    version:
      versionName: master.7
```

Now we should add this image as an IN to our runCLI job.

```
jobs:
  - name: myCustomDeployment
    type: runCLI
    steps:
      - IN: MyGkeConfig
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

All resources have environment variables like this. We've documented the list of possibilities [in our references section](../reference/job-runcli).  

### Resource State Management

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

### Job State Management

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
