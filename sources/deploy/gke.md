main_section: Deploy
sub_section: Deploying to Google Container Engine

# Deploying with Google Container Engine (GKE)

NOTE: [This page on kubernetes](./kubernetes) is the preferred way to deploy to a k8s cluster on Shippable, as it communicates directly with the cluster.  The Shippable `kubernetes` integration also utilizes `deployment` objects, while the `gke` integration uses `replicationControllers` (RC).

## Setup

Shippable will use Google Cloud service account credentials to communicate with GKE on your behalf. You can add this to Shippable via [Account Integrations](../../getting-started/integrations), so that we can internally use those keys to issue commands to GKE.

- Go to your **Account Settings** by clicking on the gear icon in the top navigation bar.
- Click on **Integrations** in the left sidebar menu and then click on **Add Integration**.
- Locate **Google Container Engine** of type **deploy** in the list and click **Create Integration**.
- Give your integration a name, and provide your JSON key for your service accont
- From the dropdown, select the subscription that you'll be using to create your pipelines.
- Click **Save**

<img src="../../images/deploy/gke/create-gke-deploy-integration.png" alt="Add GKE credentials">


This key should have the appropriate permissions and roles described [TODO add reference link] here.  Now that the key is added on Shippable, we can reference it when we create pipeline yml blocks.  In this case, we want to create a `cluster` type block in our `shippable.resources.yml` file.  This must reference a cluster that has already been created on GKE.

```
resources:

  - name: deploy-gke-basic-gke-cluster
    type: cluster
    integration: dr-gke
    pointer:
      sourceName : "deploy-gke-basic" #name of the cluster to which we are deploying
```

You'll also need to create a type `image` resource.  This will represent your Docker image in your pipeline.  In our example, we're using Google Container Registry since it integrates nicely with GKE.

```
resources:

  - name: deploy-gke-basic-gke-cluster
    type: cluster
    integration: dr-gke
    pointer:
      sourceName : "deploy-gke-basic" #name of the cluster to which we are deploying

  - name: deploy-gke-basic-image
    type: image
    integration: dr-gcr
    pointer:
      sourceName: gcr.io/sample-gke/basic-node-deploy-gke
    seed:
      versionName: "latest"

```

With those two resources, you're ready to start writing jobs that will help you deploy.

## Managed Deployments
Shippable helps make your deployments easier by providing several types of managed jobs.  Utilizing these jobs, deployments can be easily configured via updates to your declarative yml blocks.

### Basic Configuration
Now that we have a reference to our image, we need to package it in a way that it can easily be deployed to any endpoint.  Shippable provides users with a managed task type `manifest` that accomplishes this goal.  Define this in your `shippable.jobs.yml`.

```
jobs:

- name: deploy-gke-basic-manifest
  type: manifest
  steps:
   - IN: deploy-gke-basic-image

```
It's as simple as that.  When this job runs, it will take your image as input, and produce a manifest object as output.  This manifest will contain detailed information about what you're deploying, and any particular settings that you want to take effect once deployed.  The various advanced configuration options that are available are described [TODO add link] in this section.

Now we can take that manifest, and use it as input to a `deploy` type job.  This is the managed job that will actually result in our container running on GKE.

```
jobs:

  - name: deploy-gke-basic-manifest
    type: manifest
    steps:
      - IN: deploy-gke-basic-image

  - name: deploy-gke-basic-deploy
    type: deploy
    steps:
      - IN: deploy-gke-basic-manifest
      - IN: deploy-gke-basic-gke-cluster

```

The deploy job expects a manifest and a cluster as input.  The cluster tells Shippable where the manifest is going, and the manifest tells Shippable which images and settings you'd like to use.

With these jobs and resources created, your pipeline should look something like this:

<img src="../../images/deploy/gke/basic-deployment-configuration.png" alt="Basic GKE pipeline">


Now you're ready for deployment.  Right-click on the manifest job, and select **Run Job**.  Once you do this, the following steps will be taken:

- The manifest job will package your image with default settings
- The deploy job will convert your manifest into a pod template
- The deploy job will add the template to an RC and POST the RC to the cluster
- The deploy job will monitor the RC until the desired number of running pods is reached.

After running, your pipeline should turn green if it was successful.  If you see any red, click on the box to open the logs and discover what the error was.

If everything was successful, then you should see that a replicationController was created, and that there is one running pod on your cluster.

That's all there is to it!

### Advanced Configuration
In the above scenario, several options are set by default that you might want to change.

- memory defaults to 400mb
- replicas defaults to 1
- cpu defaults to 0
- no ENVs are added to container

These settings (and more) can all be customized by creating additional Pipelines Resources.

#### dockerOptions
Using dockerOptions, all of the advanced configurations of docker are available to you.  Check out our [dockerOptions reference](../reference/resource-dockeroptions) to see all of the possibilities. In this example, we're simply changing the memory allocated to the container and exposing a port.
```
- name: deploy-gke-basic-docker-options
  type: dockerOptions
  version:
    memory: 100
    portMappings:
      - 80:80
```
#### params
When [params resources](../reference/resource-params) are added to a manifest, they become environment variables for any container in that manifest.  In this case, we're setting some basic variables to help our application's configuration.

```
  - name: deploy-gke-basic-params
    type: params
    version:
      params:
        PORT: 80
        ENVIRONMENT: "dev"


```

#### replicas

Using the [replicas resource](../reference/resource-replicas) is quite simple. You can define how many copies of a particular manifest you want to be deployed. In this case we'll try to run two copies of our application.
```
  - name: deploy-gke-basic-replicas
    type: replicas
    version:
      count: 2
```

## Sample project

Here are some links to a sample project for this scenario. This is a simple Node.js application that runs some tests and then pushes
the image to Google Container Registry. It also contains all of the pipelines configuration files for deploying to GKE.

**Source code:**  [devops-recipes/deploy-ecs-basic](https://github.com/devops-recipes/deploy-gke-basic).


## Unmanaged Deployments
If managed jobs don't work for your scenario, Shippable also gives you the ability to fully customize exactly how you want your deployments to behave.  By using an unmanaged job type, you have full control over the commands and options passed in to GKE via gcloud and kubctl utilities.

### Basic Configuration

First, you'll want to create a resource that helps configure the gcloud and kbuectl tools with your integration.

```
resources:
  - name: MyGkeConfig
    type: cliConfig
    integration: MyGKECredentials
```
For more details on the `cliConfig` resource, [see here]('../reference/resource-cliconfig.md'). Now you'll need a particular job that can utilize that resource

```
jobs:
  - name: myCustomDeployment
    type: runCLI
    steps:
      - IN: MyGkeConfig
      - TASK:
        - script: kubectl get namespaces
```
For now, we'll just add a simple command to list our namespaces.


In your job's logs, you should see the results of the `get namespaces` command.

Next, we'll include a gitRepo that contains a static pod spec json object, which we update any time we want to deploy a new image version.  To add this resource, you'll need a subscription integration for your github credentials.
```
resources:
  - name: MyPodSpecRepo
    type: gitRepo
    integration: MyGithubIntegration
    pointer:
      sourceName: shippablesamples/podTemplates
      branch: master

```

Now your pipeline should look something like this:
<img src="../../images/deploy/gke/basic-deployment-unmanaged.png" alt="Alternate Pipeline">

Now, update the job to use this gitRepo as an `IN`, and add some extra commands to create the replicationController on the cluster.

- list the namespaces
- use kubectl to create the controller
- describe the RCs in the namespace

```
jobs:
  - name: myCustomDeployment
    type: runCLI
    steps:
      - IN: MyAwsConfig
      - IN: MyPodSpecRepo
      - TASK:
        - script: kubectl get namespaces
        - script: kubectl create -f ${MYPODSPECREPO}/templates/sample.yaml --namespace=shippable
        - script: kubectl describe replicationControllers --namespace=shippable

```

Inside the 'templates' directory in my `gitRepo`, I have a file called `sample.yaml` that contains this task definition:

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

The `runCLI` job will automatically configure kubectl based on the json key associated with your GKE integration.  This means that you don't have to do any setup yourself. Your script can be focused on the actions you want to take.  In this case, we are creating a new replication controller in the `shippable` namespace to run our sample app and expose it on port 80.
