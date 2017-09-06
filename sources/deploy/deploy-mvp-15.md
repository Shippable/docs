page_main_title: Deploying a single container application in parallel to multiple environments on a container orchestration service using blueGreen strategy.
main_section: Deploy
sub_section: How To

# Deploying a single container application in parallel to multiple environments on a container orchestration service using blueGreen strategy.

A parallel environment usecase looks like this:

```
CI -> push image to Docker Registry -> deploy to blue
                                    -> deploy to green    
```

In this usecase, we will assume that the image has already been available on a Docker registry by a previous CI step

Some points to note:

* Both environments will be connected to the same manifest job
* Each environment has its own cluster
* Clusters can be divided in a variety of ways:
  * Different parameters on same physical cluster
  * Different clusters on same region
  * Different clusters on different regions
  * Different clusters on different cloud providers

In this usecase, we will deploy two environments on the same physical cluster.

##1. Building blocks and Setup

### You will need to get familiar with the following platform building blocks:

**Resources**
  - [cluster](/platform/workflow/resource/cluster/) resource that represents a set of machines on a container orchestration system.
  - [image](/platform/workflow/resource/image/) resource that references a Docker image on a specific docker registry.
  - [params](/platform/workflow/job/params/) resource to set environment variables for blue and green environments.

**Jobs**
  - [manifest](/platform/workflow/job/manifest/) which creates a versioned, immutable service definition of a deployable unit for your application.
  - [deploy](/platform/workflow/job/deploy/) which deploys a [manifest](/platform/workflow/job/manifest/) to a cluster.

### Create account integrations
You need two account integrations for this scenario:

#### Orchestration service account integration
This integration configures the credentials needed to access the container orchestration service.

The following container orchestration services are supported as endpoints:

- [Azure Container Service](/platform/integration/azure-dcos)
- [Azure DC/OS](/platform/integration/azure-dcos)
- [Docker Cloud](/platform/integration/docker-cloud)
- [Docker Datacenter](/platform/integration/docker-datacenter)
- [Google Container Engine](/platform/integration/gke)
- [Kubernetes](/platform/integration/kubernetes)

Instructions to create an integration can be found [here](http://docs.shippable.com/platform/tutorial/integration/howto-crud-integration/). Each integration is given a
friendly name and this name will be used in one of the steps below.

#### Docker registry account integration
This integration configures the credentials needed to access the public or private registry that contains the docker image of the application to be deployed.  

The following registries are supported as endpoints:

- [AWS ECR](/platform/integration/aws-ecr)
- [Docker Hub](/platform/integration/docker-hub)
- [Docker Trusted Registry](/platform/integration/docker-trusted-registry)
- [Docker Private Registry](/platform/integration/docker-private-registry)
- [Quay](/platform/integration/quay)
- [JFrog](/platform/integration/jfrog-artifactory)

If the images are hosted on different accounts or different cloud registries, create an integration per account / registry.

##2. Create resources
Resources are defined in your [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/)file, that should be created at the root of your repository. Please find more information [here](/deploy/configuration/).

- Add a [Cluster](/platform/workflow/resource/cluster/) resource.

```
resources:

  - name: deploy_cluster    # resource friendly name
    type: cluster
    integration: svc_integration  # replace with actual integration created in step 1        
    pointer:
      sourceName: "cluster_name" # name of the actual cluster in the orchestration service to which we are deploying
      region: "svc_region" # region where cluster is located. This attribute is optional, depending on the orchestration service.
```

- Add an [Image](/platform/workflow/resource/image/) resource.

```
resources:

  - name: deploy_image          # resource friendly name
    type: image
    integration: dr_integration  # replace with integration created in step 2          
    pointer:
      sourceName:  <specify the complete path of your docker image here hosted on a supported docker registry>
      # This is an image pointer, for example this would be 679404489841.dkr.ecr.us-east-1.amazonaws.com/deploy-ecs-basic for ECR.
    seed:
      versionName: "1.12.0"  #Tag of this image.
```

- Add [dockerOptions](/platform/workflow/resource/dockeroptions/#dockeroptions) resource for each environment.

Several docker options are set by default that we might want to change. We will change the ports and memory allocated to the blue and green environments.

```
- name: docker_options_blue
  type: dockerOptions
  version:
    memory: 1024
    portMappings:
      - 80:80

- name: docker_options_green
  type: dockerOptions
  version:
    memory: 512
    portMappings:
      - 1080:80
```

For Kubernetes deployments, we can also set labels on the blue and green deployments so that the load balancer's selector can be updated to use the appropriate label after deployment is completed, depending on which environment is deployed to production.

```
- name: deploy_blue_opts
    type: dockerOptions
    version:
      labels:
        color: blue

  - name: deploy_green_opts
    type: dockerOptions
    version:
      labels:
        color: green
```

- Add a [params](/platform/workflow/job/params/) resource to distinguish the different environments within the containers.  We'll deploy both images to the same cluster using different parameters.

```
  - name: deploy_blue_params
    type: params
    version:
      params:
        ENVIRONMENT: "blue"

  - name: deploy_green_params
    type: params
    version:
      params:
        ENVIRONMENT: "green"
```

###3. Define jobs
Jobs are defined in your [shippable.jobs.yml](/platform/tutorial/workflow/shippable-jobs-yml/) file, that should be created at the root of your repository.

You need two jobs for this scenario:

- [Manifest](/platform/workflow/job/manifest/)

We add a [manifest](/platform/workflow/job/manifest/) job to [shippable.jobs.yml](/platform/tutorial/workflow/shippable-jobs-yml/) file.

```
jobs:

- name: deploy_manifest
  type: manifest
  steps:
   - IN: deploy_image
   - IN: docker_options_image
```

- [Deploy](/platform/workflow/job/deploy/)

Add two jobs, one for each environment.

```
jobs:

- name: deploy_blue
    type: deploy
    steps:
      - IN: docker_options_blue
      - IN: deploy_blue_params
      - IN: deploy_manifest
      - IN: deploy_blue_opts #This is only for Kubernetes deployments

- name: deploy_green
    type: deploy
    steps:
      - IN: docker_options_green
      - IN: deploy_green_params
      - IN: deploy_manifest
      - IN: deploy_green_opts #This is only for Kubernetes deployments
```


###4. Add your pipeline

Once you have these jobs and resources yml files as described above, commit them to your repository. You can then follow instructions to [add your assembly line to Shippable](/platform/tutorial/workflow/crud-syncrepo/).

###5. Trigger your pipeline

When you're ready for deployment, right-click on the manifest job, and select **Run Job**. Once the manifest job completes, the deploy jobs will run in parallel and deploy the blue and green environments.


## Sample project

Here are some links to a working sample of this scenario. This is a simple Node.js application that runs some tests and then pushes
the image to Amazon ECR. It also contains all of the pipelines configuration files for deploying to Amazon ECS.

**Source code:**  
[devops-recipes/deploy-ecs-multi-env](https://github.com/devops-recipes/deploy-ecs-multi-env)
[devops-recipes/deploy-kubernetes-multi-env](https://github.com/devops-recipes/deploy-kubernetes-multi-env)

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
