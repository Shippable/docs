page_main_title: Amazon ECS Basic scenario
main_section: Deploy
sub_section: Amazon ECS

# Deploying to Amazon ECS

There are many strategies that can be used to deploy containers to [Amazon ECS](https://aws.amazon.com/ecs/) using Shippable Pipelines.  This page will describe how you can use the managed [**deploy job**](/reference/job-deploy/) to take a single Docker image and deploy it as an individual container to your cluster on Amazon ECS.

For unmanaged deployments where you write all the deployment scripts yourself, check out our tutorial on [unmanaged deployments](/deploy/amazon-ecs-unmanaged/).

## The Goal
The goal of this page is to accomplish the following scenario using Shippable Pipelines.

- Create a pipeline manifest using a docker image on Amazon ECR
- Use the manifest as an input for a deploy job
- Deploy the manifest to Amazon ECS

In the end, your pipeline will look like this:
<img src="../../images/deploy/amazon-ecs/basic-deployment-configuration-success.png" alt="Basic Pipeline Scenario">

## Building blocks

To deploy to Amazon ECS, you need the following building blocks:

**Resources**

- [cluster](/reference/resource-cluster/) resource, to point to a cluster
- [image](/reference/resource-image/) resource, pointing to the Docker image

**Jobs**

- [manifest](/reference/job-manifest/) which creates a deployable unit for your application
- [deploy](/reference/job-deploy/), a managed job that does the deployment


## Step-by-step instructions

You will need two configuration files:

- `shippable.resources.yml` which contains resource definitions
- `shippable.jobs.yml` which contains job definitions

These files should be in your [syncRepo](/reference/resource-syncrepo/). Please read the [configuration](/deploy/configuration/) to find out how to add a syncRepo to Shippable.

Follow the steps below to set up a basic deployment to ECS.

###1: Create account integrations

You need two account integrations for this scenario:

####AWS

Shippable will use an AWS key/secret pair to communicate with ECS on your behalf. [See here](../reference/int-amazon-ecs) for directions on adding an ECS account integration to Shippable for this.

This key should have the appropriate permissions and roles described [here](../reference/int-amazon-ecs#policy).  Now that the key is added on Shippable, we can reference it when we create pipeline yml blocks.  

####Amazon ECR
You also need to configure an integration to ECR so that we can pull your image. Follow instructions in the [Amazon ECR integration](/reference/int-amazon-ecr/) page.


###2: Create resources

You need the following three resources in your `shippable.resources.yml` file:

####cluster

First, we need a `cluster` resource which references a cluster that has already been created on Amazon ECS.

```
resources:

  - name: deploy-ecs-basic-ecs-cluster    # resource friendly name
    type: cluster
    integration: dr-aws                   # replace with integration name from step 1          
    pointer:
      sourceName : "deploy-ecs-basic"     # name of the cluster to which we are deploying
      region: "us-east-1"                 # AWS region where cluster is located
```

For a complete reference, check out the [cluster](/reference/resource-cluster/) page.

####image

Next, we need an `image` resource.  This will represent your Docker image in your pipeline.  In our example, we're using Amazon ECR since it integrates nicely with Amazon ECS.

```
resources:

  - name: deploy-ecs-basic-image          # resource friendly name
    type: image
    integration: dr-ecr                   # replace with integration name from step 1          
    pointer:
      sourceName: "679404489841.dkr.ecr.us-east-1.amazonaws.com/deploy-ecs-basic"   # image pointer
    seed:
      versionName: "latest"     # Tag value for first deployment

```

For a complete reference, check out the [image](/reference/resource-image/) page.

###3: Define jobs

Jobs are defined in your `shippable.jobs.yml`.

You need two jobs for this scenario:

####manifest

We need to package the image in a way that it can easily be deployed to any endpoint.  Shippable provides users with a managed task type `manifest` that accomplishes this goal.  Define this in your `shippable.jobs.yml`.

```
jobs:

- name: deploy-ecs-basic-manifest
  type: manifest
  steps:
   - IN: deploy-ecs-basic-image             #friendly name of image created in step 2

```

It's as simple as that.  When this job runs, it will take your image as input, and produce a manifest object as output.  This manifest will contain detailed information about what you're deploying, and any particular settings that you want to take effect once deployed.

####deploy

Now we can take that manifest, and use it as input to a `deploy` type job.  This is the managed job that will actually result in our container running on ECS.

```
jobs:

  - name: deploy-ecs-basic-deploy
    type: deploy
    steps:
      - IN: deploy-ecs-basic-manifest
      - IN: deploy-ecs-basic-ecs-cluster

```

The deploy job expects a manifest and a cluster as input.  The cluster tells Shippable where the manifest is going, and the manifest tells Shippable which images and settings you'd like to use.

###4: Add your pipeline

Once you have these jobs and resources yml files as described above, push to your sync repository. You can then follow instructions to [add your pipeline to Shippable](/deploy/configuration/).

Your pipeline should look like this:
<img src="../../images/deploy/amazon-ecs/basic-deployment-configuration.png" alt="Successful pipeline">

###5: Trigger your pipeline

When you're ready for deployment, right-click on the manifest job, and select **Run Job**.  Once you do this, the following steps will be taken:

- The manifest job will package your image with default settings
- The deploy job will convert your manifest into a task definition and create it on Amazon ECS
- The deploy job will then create a new service object on Amazon ECS
- The deploy job will update the service to reference the new task definition
- The deploy job will monitor the service until the desired number of running tasks is reached.

After running, your pipeline will change color:

<img src="../../images/deploy/amazon-ecs/basic-deployment-configuration-success.png" alt="Basic Pipeline Scenario">

And when you check your cluster on ECS, you should see that a service was created, and that there is one running task:

<img src="../../images/deploy/amazon-ecs/basic-deployment-cluster.png" alt="Cluster stats">

That's all there is to it!

## Advanced Configuration

In the above scenario, several options are set by default that you might want to change.

- memory defaults to 400mb
- desiredCount defaults to 1
- cpuShares defaults to 0
- no ENVs are added to container

These settings can all be customized by creating additional Pipelines Resources.

### Customizing your Task Definitions

You can use the `dockerOptions` resource to customize your task definitions. For example, you can change the memory allocated to the container and expose a port.

```
- name: deploy-ecs-basic-docker-options
  type: dockerOptions
  version:
    memory: 100
    portMappings:
      - 80:80
```
The `dockerOptions` resource can then be an IN for your `manifest` or `deploy` job.

For a complete reference of all customizable options, check out our [dockerOptions reference](/reference/resource-dockeroptions/)

### params

When [params resources](../reference/resource-params) are added as an IN to a `manifest`, they become environment variables for containers in that manifest.  In this case, we're setting some basic variables to help our application's configuration.

```
  - name: deploy-ecs-basic-params
    type: params
    version:
      params:
        PORT: 80
        ENVIRONMENT: "dev"
```

These environment variables will be available in the running container.

### Scaling instances

You can use the [replicas resource](../reference/resource-replicas) to scale the number of instances of your manifest. You can define how many copies of a particular manifest you want to be deployed. In this case we'll try to run two copies of our application.

```
  - name: deploy-ecs-basic-replicas
    type: replicas
    version:
      count: 2
```

The `replicas` resource can then be an IN for your `manifest` or `deploy` job.

If you specify a port mapping, we can only run one of these containers per container instance.  This means our cluster needs to have at least two container instances for the deployment to succeed.

If you update your manifest to request a different number of replicas without changing any other settings, we perform a "scale" action which simply updates the Amazon ECS service's desiredCount.  This makes the deployment much faster and doesn't perform any unnecessary steps.

###Customizing service names

We use a default naming convention for service names:

| Deploy Method | Default Naming Convention |
|--------------|---------------------------|
| blueGreen (default) | <ul><li>taskDefinition : deployJobName-manifestJobName</li><li>service : deployJobName-manifestJobName-buildNumber<ul> |
| upgrade | <ul><li>taskDefinition : deployJobName-manifestJobName</li><li>service : deployJobName-manifestJobName<ul> |
| replace | <ul><li>taskDefinition : deployJobName-manifestJobName</li><li>service : deployJobName-manifestJobName<ul> |

Read more on [deployment strategies](/deploy/amazon-ecs-strategy/) to understand them in detail.

To override the default name, you can use the `deployName` tag.

```
jobs:
  - name: deploy-ecs-basic-deploy
    type: deploy
    steps:
      - IN: deploy-ecs-basic-manifest                  #required
        deployName: myApplication
      - IN: deploy-ecs-basic-cluster                         #required
      - TASK: managed
        deployMethod: upgrade | replace | blueGreen
```

Some things to remember:

- The name generated with the [default deployment strategy](/deploy/amazon-ecs-strategy/), **blue-green**, will include a suffix of build number. So the service name will be of format deployName-buildNumber.

- **upgrade** and **replace** deployments expect `deployName` to be present during the first deployment. The name of the first deployed service will be the name that will be used in subsequent deployments for upgrade/replace deploy methods. Hence, modifying the deployName will not take effect in a job for those types.

### Forcing deployments for static tags

Shippable assumes that your images are versioned with unique names (we recommend tagging with `$BRANCH.$BUILD_NUMBER`). When your deploy job is triggered, it will deploy the latest version of the IN manifests if something has changed in the manifest, i.e. image tag, dockerOptions settings, or params.

If you tag your images with static tags like `latest` or `$BRANCH_NAME`, Shippable cannot detect if the underlying image has changed, and hence it is not deployed. To force deployments in this scenario, you need to set a flag in your deploy job that tells Shippable to deploy the image each time the job is triggered, regardless of whether anything has changed in the manifest.

You can set the `force` flag for a manifest in your deploy job as shown below:

```
jobs:
  - name: deploy-ecs-basic-deploy
    type: deploy
    steps:
      - IN: deploy-ecs-basic-manifest         #required
        force: true
      - IN: deploy-ecs-basic-cluster          #required
```

## Sample project

Here are some links to a working sample of this scenario. This is a simple Node.js application that runs some tests and then pushes
the image to Amazon ECR. It also contains all of the pipelines configuration files for deploying to Amazon ECS.

**Source code:**  [devops-recipes/deploy-ecs-basic](https://github.com/devops-recipes/deploy-ecs-basic)

**Application running on Amazon ECS:** [link](http://52.87.153.126/)

**Build status badge:** [![Run Status](https://api.shippable.com/projects/58f6fcddd1780a07007bba3f/badge?branch=master)](https://app.shippable.com/github/devops-recipes/deploy-ecs-basic)
