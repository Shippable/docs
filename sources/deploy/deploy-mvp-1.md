page_main_title: Deploying a single container application to a container orchestration service.
main_section: Deploy
sub_section: Usecases

# Deploying a single container application to a container orchestration service.

This page will describe how you can use the [Shippable assembly lines platform](/platform/overview/) to deploy a single container application to a container orchestration service like Amazon ECS, GKE or Docker Cloud. The
image for this application is located on a public or private cloud registry like Docker hub, Amazon's ECR or Google's GCR.

## Building blocks

To deploy, you need the following building blocks:

**Resources**

- [cluster](/platform/workflow/resource/cluster/) resource that represents a set of machines on a container orchestration system.
- [image](/platform/workflow/resource/image/) resource that references a Docker image on a specific docker registry.

**Jobs**

- [manifest](/platform/workflow/job/manifest/) which creates a versioned, immutable service definition of a deployable unit for your application.
- [deploy](/platform/workflow/job/deploy/) which deploys a [manifest](/platform/workflow/job/manifest/) to a cluster.


## Step-by-step instructions

You will need to create two configuration files:

- [shippable.resources.yml](/tutorial/workflow/shippable-resources-yml/) which contains resource definitions.
- [shippable.jobs.yml](/platform/tutorial/workflow/shippable-jobs-yml/) which contains job definitions.

These files should be in your [syncRepo](/platform/workflow/resource/syncrepo/). Please read the [configuration](/deploy/configuration/) to find out how to add a syncRepo to Shippable.

Follow the steps below to set up a basic deployment to ECS.

###1: Create account integrations

You need two account integrations for this scenario:

####Orchestration service
This integration configures the credentials needed to access the container orchestration service.

The following container orchestration services are supported as endpoints:

- [Azure Container Service](/platform/integration/azure-dcos)
- [Azure DC/OS](/platform/integration/azure-dcos)
- [Docker Cloud](/platform/integration/docker-cloud)
- [Docker Datacenter](/platform/integration/docker-datacenter)
- [Google Container Engine](/platform/integration/gke)
- [Kubernetes](/platform/integration/kubernetes)
- [Node Cluster](/platform/integration/node-cluster)

Instructions to create an integration can be found [here](http://docs.shippable.com/platform/tutorial/integration/howto-crud-integration/). Each integration is given a
friendly name and this name will be used in one of the steps below.

####Docker registry
This integration configures the credentials needed to access the public or private registry that contains the docker image of the application to be deployed.  

The following registries are supported as endpoints:

- [AWS ECR](/platform/integration/aws-ecr)
- [Docker Hub](/platform/integration/docker-hub)
- [Docker Trusted Registry](/platform/integration/docker-trusted-registry)
- [Docker Private Registry](/platform/integration/docker-private-registry)
- [Quay](/platform/integration/quay)
- [JFrog](/platform/integration/jfrog-artifactory)

###2: Create resources
You need the following three resources in your `shippable.resources.yml` file:

####cluster

First, we need a [cluster](/platform/workflow/resource/cluster/) resource which references a cluster that has already been created on the container orchestration service.

```
resources:

  - name: deploy_cluster    # resource friendly name
    type: cluster
    integration: orchestration_service_integration  # replace with actual integration created in          
    pointer:
      sourceName: "cluster_name" # name of the actual cluster in the orchestration service to which we are deploying
      region: "orchestration_service_region" # region where cluster is located. This attribute is optional, depending on the orchestration service.
```

####image

Next, we need an [image](/platform/workflow/resource/image/) resource.

```
resources:

  - name: deploy_image          # resource friendly name
    type: image
    integration: docker_registry_integration  # replace with integration created in step 2          
    pointer:
      sourceName:  # image pointer, for example this would be 679404489841.dkr.ecr.us-east-1.amazonaws.com/deploy-ecs-basic for ECR.
    seed:
      versionName: "latest"  #Tag value for first deployment.

```

###3: Define jobs

Jobs are defined in your [shippable.jobs.yml](/platform/tutorial/workflow/shippable-jobs-yml/) file, that should be created at the root of your repository.

You need two jobs for this scenario:

####manifest
We add a [manifest](/platform/workflow/job/manifest/) job to [shippable.jobs.yml](/platform/tutorial/workflow/shippable-jobs-yml/) file.

```
jobs:

- name: deploy_manifest
  type: manifest
  steps:
   - IN: deploy_image

```

When this job runs, it will take your image as input, and produce a manifest object as output.  This manifest will contain detailed information about what you're deploying, and any particular settings that you want to take effect once deployed. Manifest

####deploy

Now we can take that manifest, and use it as input to a `deploy` type job.  This is the managed job that will actually result in our container running on ECS.

```
jobs:

  - name: deploy_job
    type: deploy
    steps:
      - IN: deploy_manifest
      - IN: deploy_cluster

```

The deploy job expects a manifest and a cluster as input.  The cluster tells Shippable where the manifest is going, and the manifest tells Shippable which images and settings you'd like to use.

###4: Add your pipeline

Once you have these jobs and resources yml files as described above, commit them to your repository. You can then follow instructions to [add your assembly line to Shippable](/platform/tutorial/workflow/crud-syncrepo/).

###5: Trigger your pipeline

When you're ready for deployment, right-click on the manifest job, and select **Run Job**.

## Advanced Configuration

In the above scenario, several docker options are set by default that you might want to change.

- `memory` defaults to 400mb
- `desiredCount` defaults to 1
- `cpuShares` defaults to 0
- no environment variables are added to container

These settings can all be customized by creating additional Resources. To learn more, please go [here]().

## Sample project

Here are some links to a working sample of this scenario. This is a simple Node.js application that runs some tests and then pushes
the image to Amazon ECR. It also contains all of the pipelines configuration files for deploying to Amazon ECS.

**Source code:**  [devops-recipes/deploy-ecs-basic](https://github.com/devops-recipes/deploy-ecs-basic)

**Application running on Amazon ECS:** [link](http://52.87.153.126/)

**Build status badge:** [![Run Status](https://api.shippable.com/projects/58f6fcddd1780a07007bba3f/badge?branch=master)](https://app.shippable.com/github/devops-recipes/deploy-ecs-basic)

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
