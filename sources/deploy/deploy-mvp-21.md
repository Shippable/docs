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
