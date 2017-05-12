page_main_title: Docker Datacenter Basic scenario
main_section: Deploy
sub_section: Docker Datacenter

# Deploying to Docker Data Center
There are many strategies that can be used to deploy containers to [Docker Data Center](https://www.docker.com/enterprise-edition#/container_management) using Shippable Pipelines.  This page will describe how you can take a single docker image and deploy it as an individual container to your cluster on Docker Datacenter.

## Setup

Shippable will use an API token to communicate with Docker Datacenter on your behalf. You can add this to Shippable via Account Integrations, so that we can internally use that token to make API calls to Docker Datacenter.

- Go to your **Account Settings** by clicking on the gear icon in the top navigation bar.
- Click on **Integrations** in the left sidebar menu and then click on **Add Integration**.
- Locate **Docker DataCenter** of type **deploy** in the list and click **Create Integration**.
- Give your integration a name, and provide your Docker Datacenter user name, password and Universal Control Plane URL.
- From the dropdown, select the subscription that you'll be using to create your pipelines.
- Click **Save**

<img src="../../images/deploy/docker-datacenter/docker-datacenter-integration.png" alt="Add Docker Datacenter integration">


Now that the key is added on Shippable, we can reference it when we create pipeline yml blocks.  In this case, we want to create a `cluster` type block in our `shippable.resources.yml` file.  This must reference a cluster that has already been created on Docker Datacenter.

```
resources:

  #Docker Datacenter cluster
  - name: dddcb-cluster
    type: cluster
    integration: dr-docker-datacenter    #replace with your Docker Datacenter integration name
    pointer:
          sourceName: "deploy-docker-datacenter"
    flags:
      - deploy-dockerdatacenter-basic
```

You'll also need to create a type `image` resource.  This will represent your Docker image in your pipeline.  In our example, we're using Docker hub since it integrates nicely with Docker Datacenter.

```
resources:

  #Docker Datacenter cluster
  - name: dddcb-cluster
    type: cluster
    integration: dr-docker-datacenter    #replace with your Docker Datacenter integration name
    pointer:
          sourceName: "deploy-docker-datacenter"
    flags:
      - deploy-dockerdatacenter-basic

    - name: dddcb-image
      type: image
      integration: dr-dockerhub    #replace with your Docker Hub integration name
      pointer:
        sourceName: "devopsrecipes/deploy-dockerdatacenter-basic"  #replace with your image name on Docker Hub
        isPull: false
      seed:
        versionName: "master.1"  #replace with your image tag on Docker Hub
      flags:
        - deploy-dockerdatacenter-basic
```

With those two resources, you're ready to start writing jobs that will help you deploy.


## Managed Deployments
Shippable helps make your deployments easier by providing several types of managed jobs.  Utilizing these jobs, deployments can be easily configured via updates to your declarative yml blocks.

### Basic Configuration
Now that we have a reference to our image, we need to package it in a way that it can easily be deployed to any endpoint.  Shippable provides users with a managed task type `manifest` that accomplishes this goal.  Define this in your `shippable.jobs.yml`.

```
jobs:

  - name: dddcb-manifest
    type: manifest
    steps:
      - IN: dddcb-image
      - TASK: managed
    flags:
      - deploy-dockerdatacenter-basic

```
It's as simple as that.  When this job runs, it will take your image as input, and produce a manifest object as output.  This manifest will contain detailed information about what you're deploying, and any particular settings that you want to take effect once deployed.  The various advanced configuration options that are available are described in [this](/reference/resource-dockeroptions/) section.

Now we can take that manifest, and use it as input to a `deploy` type job.  This is the managed job that will actually result in our container running on Docker Datacenter.

```
jobs:

  - name: dddcb-manifest
    type: manifest
    steps:
      - IN: dddcb-image
      - TASK: managed
    flags:
      - deploy-dockerdatacenter-basic

  #Docker Datacenter deploy job
  - name: dddcb-deploy
    type: deploy
    steps:
      - IN: dddcb-manifest
      - IN: dddcb-cluster
      - TASK: managed
        deployMethod: upgrade
    flags:
      - deploy-dockerdatacenter-basic
```

The deploy job expects a manifest and a cluster as input.  The cluster tells Shippable where the manifest is going, and the manifest tells Shippable which images and settings you'd like to use.

Now you're ready for deployment.  Right-click on the manifest job, and select **Run Job**.  Once you do this, the following steps will be taken:

- The manifest job will package your image with default settings
- The deploy job will upload the image to Docker Datacenter and start the container.

After running, your pipeline will change color:

![Basic Pipeline Scenario](https://github.com/devops-recipes/deploy-dockerdatacenter-basic/raw/master/public/resources/images/pipeline-view.png)

And when you check your cluster on Docker Datacenter, you should see that the container running with the deployed image:

![Docker Datacenter Container](https://github.com/devops-recipes/deploy-dockerdatacenter-basic/raw/master/public/resources/images/ddc-container.png)
![Docker Datacenter Image](https://github.com/devops-recipes/deploy-dockerdatacenter-basic/raw/master/public/resources/images/ddc-deployed-image.png)
![Deploy job Image](https://github.com/devops-recipes/deploy-dockerdatacenter-basic/raw/master/public/resources/images/deploy-job-view.png)

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
- name: deploy-dockerDatacenter-basic-docker-options
  type: dockerOptions
  version:
    memory: 100
    portMappings:
      - 80:80
```
#### params
When [params resources](../reference/resource-params) are added to a manifest, they become environment variables for any container in that manifest.  In this case, we're setting some basic variables to help our application's configuration.

```
  - name: deploy-dockerDatacenter-basic-params
    type: params
    version:
      params:
        PORT: 80
        ENVIRONMENT: "dev"
```

#### replicas
[Replicas](../reference/resource-replicas) is a very simple type of resource. You can use it to define how many copies of a particular manifest you want to be deployed. In this case we'll try to run two copies of our application. Note: since we've specified a port mapping, we can only run one of these containers per container instance.  This means our cluster needs to have at least two container instances for the deployment to succeed.
```
  - name: deploy-dockerDatacenter-basic-replicas
    type: replicas
    version:
      count: 2
```

## Sample project

Here are some links to a working sample of this scenario. This is a simple Node.js application that runs some tests and then pushes
the image to Docker hub. It also contains all of the pipelines configuration files for deploying to Docker Datacenter.

**Source code:**  [devops-recipes/deploy-dockerdatacenter-basic](https://github.com/devops-recipes/deploy-dockerdatacenter-basic).

**Build link:** [CI build on Shippable](https://app.shippable.com/github/devops-recipes/deploy-dockerdatacenter-basic/runs/7/1/console)

**Build status badge:** [![Run Status](https://api.shippable.com/projects/5900dae386175d07005d4890/badge?branch=master)](https://app.shippable.com/github/devops-recipes/deploy-dockerdatacenter-basic)
