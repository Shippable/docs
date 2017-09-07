page_main_title: Deploying a multi container application in parallel to a container orchestration service.
main_section: Deploy
sub_section: How To

# Deploying a multi container application in parallel to a container orchestration service.

This page describes how you can use the [Shippable assembly lines platform](/platform/overview/) to deploy a multi container application to a container orchestration service like Amazon ECS, GKE or Docker Cloud. In this usecase, every container is deployed independently and in parallel whenever its image changes. This strategy is very useful when each micro-service or service is modeled as an image and you only want to deploy the micro-service / service that has changed. In addition, if multiple micro-service/service images change, those deployments happen faster since they are parallelized.

##1. Building blocks

**Resources**

- [cluster](/platform/workflow/resource/cluster/) resource that represents a set of machines on a container orchestration system.
- [image](/platform/workflow/resource/image/) resource that references a Docker image on a specific docker registry.

**Jobs**

- [manifest](/platform/workflow/job/manifest/) which creates a versioned, immutable service definition of a deployable unit for your application.
- [deploy](/platform/workflow/job/deploy/) which deploys a [manifest](/platform/workflow/job/manifest/) to a cluster.

##2. Setup
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

##3. Create resources
Resources are defined in your [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/)file, that should be created at the root of your repository. Please find more information [here](/deploy/configuration/).

- Add a [Cluster](/platform/workflow/resource/cluster/) resource.
```
resources:

  - name: deploy_cluster    # resource friendly name
    type: cluster
    integration: svc_integration  
    # replace with actual integration created in step 1          
    pointer:
      sourceName: "cluster_name"
      # name of the actual cluster in the orchestration service to which we are deploying
      region: "svc_region"
      # region where cluster is located. This attribute is optional, depending on the orchestration service.
```

- Add [Image](/platform/workflow/resource/image/) resources.

```
  - name: deploy_image_1 #resource friendly name
    type: image
    integration: docker_registry_integration  #replace with integration created in step 2          
    pointer:
      sourceName:  <specify the complete path of your docker image here hosted on a supported docker registry>
      # This is an image pointer, for example this would be 679404489841.dkr.ecr.us-east-1.amazonaws.com/deploy-ecs-basic for ECR.
    seed:
      versionName: "1.12.0"  # Image Tag.

  - name: deploy_image_2          # resource friendly name
    type: image
    integration: docker_registry_integration  # replace with integration created in step 2          
    pointer:
      sourceName:  <specify the complete path of your docker image here hosted on a supported docker registry>
      # This is an image pointer, for example this would be gcr.io/sample-gke/basic-node-deploy-gke for GCR.
    seed:
      versionName: "1.14.0"  # Image Tag.
```

- Add [dockerOptions](/platform/workflow/resource/dockeroptions/#dockeroptions) resource for each image.

Several docker options are set by default that you might want to change.

- `memory` defaults to 400mb
- `desiredCount` defaults to 1
- `cpuShares` defaults to 0

These settings can all be customized by creating a [dockerOptions](/platform/workflow/resource/dockeroptions/#dockeroptions) resource. For example, you can change the memory allocated to 1024MB and expose port 80 by doing the following -

```
- name: docker_options_image_1
  type: dockerOptions
  version:
    memory: 1024
    portMappings:
      - 80:80

- name: docker_options_image_2
  type: dockerOptions
  version:
    memory: 256
    desiredCount: 2
```

##4. Define jobs

Jobs are defined in your [shippable.jobs.yml](/platform/tutorial/workflow/shippable-jobs-yml/) file, that should be created at the root of your repository. Please find more information [here](/deploy/configuration/).

You need two jobs for this scenario:

- Manifest

We add add two [manifest](/platform/workflow/job/manifest/) jobs to [shippable.jobs.yml](/platform/tutorial/workflow/shippable-jobs-yml/) file. Each manifest job references a single image.

```
jobs:

- name: deploy_manifest_1
  type: manifest
  steps:
   - IN: deploy_image_1
   - IN: docker_options_image_1

 - name: deploy_manifest_2
   type: manifest
   steps:
    - IN: deploy_image_2
    - IN: docker_options_image_2
```

- Deploy

Now we can take that manifest, and use it as input to a `deploy` type job.  This is the job that will actually result in our container running on the orchestration service. We will use two deploy jobs, one per manifest. This will allow each deploy job to deploy one and only one container independently as when the image changes.

```
jobs:

  - name: deploy_job_1
    type: deploy
    steps:
      - IN: deploy_manifest_1
      - IN: deploy_cluster

  - name: deploy_job_2
    type: deploy
    steps:
      - IN: deploy_manifest_2
      - IN: deploy_cluster
```

##5. Commit your assembly line resource files

Once you have these jobs and resources yml files as described above, commit them to your repository. Follow these instructions to [add your assembly line to Shippable](/platform/tutorial/workflow/crud-syncrepo/).

##6. Trigger your pipeline

When you're ready for deployment, right-click on the manifest job, and select **Run Job**.


## Sample project

Here are some links to a working sample of this scenario. This is a simple Node.js application that runs some tests and then pushes
the image to Amazon ECR. It also contains all of the pipelines configuration files for deploying to Amazon ECS.

**Source code:**  [devops-recipes/deploy-ecs-multi-container](https://github.com/devops-recipes/deploy-ecs-multi-container)

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
