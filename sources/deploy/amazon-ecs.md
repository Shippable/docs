main_section: Deploy
sub_section: Deploying to Amazon ECS

# Deploying to Amazon ECS
There are many strategies that can be used to deploy containers to [Amazon ECS](https://aws.amazon.com/ecs/) using Shippable Pipelines.  This page will describe how you can take a single docker image and deploy it as an individual container to your cluster on Amazon ECS.

## Setup

Shippable will use an AWS key/secret pair to communicate with ECS on your behalf. You can add this to Shippable via [TODO Add link] Account Integrations, so that we can internally use those keys to issue commands to ECS.

- Go to your **Account Settings** by clicking on the gear icon in the top navigation bar.
- Click on **Integrations** in the left sidebar menu and then click on **Add Integration**.
- Locate **AWS** of type **deploy** in the list and click **Create Integration**.
- Give your integration a name, and provide your AWS access key and AWS secret key
- From the dropdown, select the subscription that you'll be using to create your pipelines.
- Click **Save**

<img src="../../images/integrations/create-aws-deploy-integration.png" alt="Add AWS credentials">


This key should have the appropriate permissions and roles described [TODO add reference link] here.  Now that the key is added on Shippable, we can reference it when we create pipeline yml blocks.  In this case, we want to create a `cluster` type block in our `shippable.resources.yml` file.  This must reference a cluster that has already been created on Amazon ECS.

```
resources:
  #############################
  # Basic resource configuration
  #############################

  - name: MyECSCluster
    type: cluster
    integration: MyECSCredentials
    pointer:
      sourceName: cluster-test-1
      region: us-west-2
```

You'll also need to create a type `image` resource.  This will represent your Docker image in your pipeline.

```
resources:
  #############################
  # Basic resource configuration
  #############################

  - name: MyECSCluster
    type: cluster
    integration: MyECSCredentials
    pointer:
      sourceName: cluster-test-1
      region: us-west-2

  - name: MyAppImage
    type: image
    pointer:
      sourceName: shippablesamples/samplepipelinesdemo
    seed:
      versionName: latest

```

With those two resources, you're ready to start writing jobs that will help you deploy.


## Managed Deployments
Shippable helps make your deployments easier by providing several types of managed jobs.  Utilizing these jobs, deployments can be easily configured via updates to your declarative yml blocks.

### Basic Configuration
Now that we have a reference to our image, we need to package it in a way that it can easily be deployed to any endpoint.  Shippable provides users with a managed task type `manifest` that accomplishes this goal.  Define this in your `shippable.jobs.yml`.

```
jobs:
  ##########################
  # Basic jobs configuration
  ##########################

  - name: MyFirstManifest
    type: manifest
    steps:
      - IN: MyAppImage
```
It's as simple as that.  When this job runs, it will take your image as input, and produce a manifest object as output.  This manifest will contain detailed information about what you're deploying, and any particular settings that you want to take effect once deployed.  The various advanced configuration options that are available are described [TODO add link] in this section.

Now we can take that manifest, and use it as input to a `deploy` type job.  This is the managed job that will actually result in our container running on ECS.

```
jobs:
  ##########################
  # Basic jobs configuration
  ##########################

  - name: MyFirstManifest
    type: manifest
    steps:
      - IN: MyAppImage

  - name: DeployTo_cluster-test-1
    type: deploy
    steps:
      - IN: MyECSCluster
      - IN: MyFirstManifest
```

The deploy job expects a manifest and a cluster as input.  The cluster tells Shippable where the manifest is going, and the manifest tells Shippable which images and settings you'd like to use.

With these jobs and resources created, your pipeline should look something like this:

<img src="../../images/spog/basic-deployment-configuration.png" alt="Successful pipeline">


Now you're ready for deployment.  Right-click on the manifest job, and select **Run Job**.  Once you do this, the following steps will be taken:

- The manifest job will package your image with default settings
- The deploy job will convert your manifest into a task definition and create it on Amazon ECS
- The deploy job will then create a new service object on Amazon ECS
- The deploy job will update the service to reference the new task definition
- The deploy job will monitor the service until the desired number of running tasks is reached.

After running, your pipeline will hopefully change color:

<img src="../../images/spog/basic-deployment-configuration-success.png" alt="Basic Pipeline Scenario">

And when you check your cluster on ECS, you should see that a service was created, and that there is one running task:

<img src="../../images/aws/basic-deployment-cluster.png" alt="Cluster stats">

That's all there is to it!

### Advanced Configuration
In the above scenario, several options are set by default that you might want to change.

- memory defaults to 400mb
- desiredCount defaults to 1
- cpuShares defaults to 0
- no ENVs are added to container

These settings can all be customized by creating additional Pipelines Resources.

#### dockerOptions
Using [TODO: add link] dockerOptions, all of the advanced configurations of docker are available to you. [TODO add link] Check out our dockerOptions reference to see all of the possibilities. In this example, we're simply changing the memory allocated to the container and exposing a port.
```
  - name: myBasicOptions
    type: dockerOptions
    version:
      memory: 100
      portMappings:
        - "80:8888"
```
#### params
When [TODO: add link] params resources are added to a manifest, they become environment variables for any container in that manifest.  In this case, we're setting some basic variables to help our application's configuration.

```
  - name: myBasicParams
    type: params
    version:
      params:
        DB_URL: "http://example.com:5432"
        MODE: "beta"

```

#### replicas

Replicas [TODO: add link] is a very simple type of resource. You can use it to define how many copies of a particular manifest you want to be deployed. In this case we'll try to run two copies of our application. Note: since we've specified a port mapping, we can only run one of these containers per container instance.  This means our cluster needs to have at least two container instances for the deployment to succeed.
```
  - name: myBasicReplicas
    type: replicas
    version:
      count: 2
```

## Unmanaged Deployments
If managed jobs don't work for your scenario, Shippable also gives you the ability to fully customize exactly how you want your deployments to behave.  By using an unmanaged job type, you have full control over the commands and options passed in to ECS.

### Basic Configuration
- create CLIconfig resource
- create runCLI job
- create a gitRepo
- deploy an existing task definition hardcoded in the repo

### advanced Configuration
- use image resource that is created in CI
- use a generic taskdef template with placeholders filled in via shippable_replace
- pass ENVs and state from CI to build the task definition
- deploy task definition via awscli
- use params resource to pass state info from CI to runCLI
