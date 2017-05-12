page_main_title: Docker Cloud Basic scenario
main_section: Deploy
sub_section: Docker cloud

# Deploying to Docker Cloud
There are many strategies that can be used to deploy containers to [Docker Cloud](https://cloud.docker.com) using Shippable Pipelines.  This page will describe how you can take a single docker image and deploy it as an individual container to your cluster on Docker Cloud.

## Setup

Shippable will use an API token to communicate with Docker Cloud on your behalf. You can add this to Shippable via Account Integrations, so that we can internally use that token to make API calls to Docker cloud.

- [Generate an API key](https://cloud.docker.com/account/#container-api-key) in your Docker Cloud account to use with Shippable.
- Go to your **Account Settings** by clicking on the gear icon in the top navigation bar.
- Click on **Integrations** in the left sidebar menu and then click on **Add Integration**.
- Locate **Docker Cloud** of type **deploy** in the list and click **Create Integration**.
- Give your integration a name, and provide your Docker cloud user name and token.
- From the dropdown, select the subscription that you'll be using to create your pipelines.
- Click **Save**

<img src="../images/deploy/docker-cloud/docker-cloud-integration.png" alt="Add Docker Cloud token">


Now that the key is added on Shippable, we can reference it when we create pipeline yml blocks.  In this case, we want to create a `cluster` type block in our `shippable.resources.yml` file.  This must reference a cluster that has already been created on Docker Cloud.

```
resources:

  #docker cloud cluster
  - name: ddcb-cluster
    type: cluster
    integration: dr-docker-cloud    #replace with your docker cloud integration name
    pointer:
          sourceName: "deploy-docker-cloud" #node cluster name
    flags:
      - deploy-dockercloud-basic
```

You'll also need to create a type `image` resource.  This will represent your Docker image in your pipeline.  In our example, we're using Docker hub since it integrates nicely with Docker Cloud.

```
resources:

  #docker cloud cluster
  - name: ddcb-cluster
    type: cluster
    integration: dr-docker-cloud    #replace with your docker cloud integration name
    pointer:
          sourceName: "deploy-docker-cloud" #node cluster name
    flags:
      - deploy-dockercloud-basic

  - name: ddcb-image
    type: image
    integration: dr-dockerhub    #replace with your Docker Hub integration name
    pointer:
      sourceName: "devopsrecipes/deploy-dockercloud-basic"  #replace with your image name on Docker Hub
      isPull: false
    seed:
      versionName: "master.1"  #replace with your image tag on Docker Hub
    flags:
      - deploy-dockercloud-basic
```

With those two resources, you're ready to start writing jobs that will help you deploy.


## Managed Deployments
Shippable helps make your deployments easier by providing several types of managed jobs.  Utilizing these jobs, deployments can be easily configured via updates to your declarative yml blocks.

### Basic Configuration
Now that we have a reference to our image, we need to package it in a way that it can easily be deployed to any endpoint.  Shippable provides users with a managed task type `manifest` that accomplishes this goal.  Define this in your `shippable.jobs.yml`.

```
jobs:

  - name: ddcb-manifest
    type: manifest
    steps:
      - IN: ddcb-image
      - TASK: managed
    flags:
      - deploy-dockercloud-basic

```
It's as simple as that.  When this job runs, it will take your image as input, and produce a manifest object as output.  This manifest will contain detailed information about what you're deploying, and any particular settings that you want to take effect once deployed.  The various advanced configuration options that are available are described in [this](/reference/resource-dockeroptions/) section.

Now we can take that manifest, and use it as input to a `deploy` type job.  This is the managed job that will actually result in our container running on Docker Cloud.

```
jobs:

  - name: ddcb-manifest
    type: manifest
    steps:
      - IN: ddcb-image
      - TASK: managed
    flags:
      - deploy-dockercloud-basic

  #Docker Cloud deploy job
  - name: ddcb-deploy
    type: deploy
    steps:
      - IN: ddcb-manifest
      - IN: ddcb-cluster
      - TASK: managed
        deployMethod: upgrade
    flags:
      - deploy-dockercloud-basic
```

The deploy job expects a manifest and a cluster as input.  The cluster tells Shippable where the manifest is going, and the manifest tells Shippable which images and settings you'd like to use.

Now you're ready for deployment.  Right-click on the manifest job, and select **Run Job**.  Once you do this, the following steps will be taken:

- The manifest job will package your image with default settings
- The deploy job will create a service and a stack and deploy it to the node cluster.

After running, your pipeline will change color:

![Basic Pipeline Scenario](https://github.com/devops-recipes/deploy-dockercloud-basic/raw/master/public/resources/images/pipeline-view.png)

And when you check your cluster on Docker Cloud, you should see that a service and a stack was created, and their state is set to running:

![Docker Cloud Service](https://github.com/devops-recipes/deploy-dockercloud-basic/raw/master/public/resources/images/docker-cloud-service.png)
![Docker Cloud Stack](https://github.com/devops-recipes/deploy-dockercloud-basic/raw/master/public/resources/images/docker-cloud-stack.png)

That's all there is to it!

### Advanced Configuration
In the above scenario, several options are set by default that you might want to change.

- memory defaults to 400mb
- desiredCount defaults to 1
- cpuShares defaults to 0
- no ENVs are added to container

These settings can all be customized by creating additional Pipelines Resources.

#### dockerOptions
Using [dockerOptions](../reference/resource-dockeroptions), all of the advanced configurations of docker are available to you. Check out our dockerOptions reference to see all of the possibilities. In this example, we're simply changing the memory allocated to the container and exposing a port.
```
- name: deploy-dockercloud-basic-docker-options
  type: dockerOptions
  version:
    memory: 100
    portMappings:
      - 80:80
```
#### params
When [params resources](../reference/resource-params) are added to a manifest, they become environment variables for any container in that manifest.  In this case, we're setting some basic variables to help our application's configuration.

```
  - name: deploy-dockercloud-basic-params
    type: params
    version:
      params:
        PORT: 80
        ENVIRONMENT: "dev"
```

#### replicas
[Replicas](../reference/resource-replicas) is a very simple type of resource. You can use it to define how many copies of a particular manifest you want to be deployed. In this case we'll try to run two copies of our application. Note: since we've specified a port mapping, we can only run one of these containers per container instance.  This means our cluster needs to have at least two container instances for the deployment to succeed.
```
  - name: deploy-dockercloud-basic-replicas
    type: replicas
    version:
      count: 2
```

## Sample project

Here are some links to a working sample of this scenario. This is a simple Node.js application that runs some tests and then pushes
the image to Docker hub. It also contains all of the pipelines configuration files for deploying to Docker Cloud.

**Source code:**  [devops-recipes/deploy-dockercloud-basic](https://github.com/devops-recipes/deploy-dockercloud-basic).

**Build link:** [CI build on Shippable](https://app.shippable.com/github/devops-recipes/deploy-dockercloud-basic/runs/6/1/console)

**Build status badge:** [![Run Status](https://api.shippable.com/projects/58ffe3dd2ddacd0900466a39/badge?branch=master)](https://app.shippable.com/github/devops-recipes/deploy-dockercloud-basic)
