page_main_title: Overriding application configuration through various deployment stages (DEV, TEST, STAGING, PROD) for a single container application deployed to a container orchestration service
main_section: Deploy
sub_section: How To

# Overriding application configuration through various deployment stages (DEV, TEST, STAGING, PROD) for a single container application deployed to a container orchestration service.

A serial environment usecase looks like this:

```
CI -> push image to Docker Registry -> deploy to beta -> deploy to prod
```

In this usecase, we will assume that the image has already been available on a Docker registry by a previous CI step. We now demonstrate how you can change the application configuration such as docker options, environment variables in beta and prod environments.

##1. Building blocks and Setup

### You will need to get familiar with the following platform building blocks:

**Resources**
  - [cluster](/platform/workflow/resource/cluster/) resource that represents a set of machines on a container orchestration system.
  - [image](/platform/workflow/resource/image/) resource that references a Docker image on a specific docker registry.
  - [params](/platform/workflow/job/params/) resource to set environment variables for beta and prod environments.

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

* Instructions to create an integration can be found [here](http://docs.shippable.com/platform/tutorial/integration/howto-crud-integration/). Each integration is given a
friendly name and this name will be used in one of the steps below.

* You will need to create two integrations, one for the beta environment and the other for the production environment.

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

- Add two [Cluster](/platform/workflow/resource/cluster/) resources.

```
resources:

  - name: deploy_beta_cluster    # resource friendly name
    type: cluster
    integration: beta_svc_integration  # replace with actual beta integration created in step 1        
    pointer:
      sourceName: "cluster_name" # name of the actual beta cluster in the orchestration service to which we are deploying
      region: "svc_region" # region where cluster is located. This attribute is optional, depending on the orchestration service.

  - name: prod_beta_cluster    # resource friendly name
    type: cluster
    integration: prod_svc_integration  # replace with actual prod integration created in step 1        
    pointer:
      sourceName: "cluster_name" # name of the actual prod cluster in the orchestration service to which we are deploying
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

Several docker options are set by default that we might want to change. We will change the ports and memory allocated to the beta and prod environments. Since prod presumably has beefier machines, we will allocate more memory to the application in production.

```
- name: docker_options_beta
  type: dockerOptions
  version:
    memory: 512
    portMappings:
      - 80:80

- name: docker_options_prod
  type: dockerOptions
  version:
    memory: 2048
    portMappings:
      - 80:80
```

For Kubernetes deployments, we can also set labels on the beta and prod deployments so that the load balancer's selector can be updated to use the appropriate label after deployment is completed, depending on which environment is deployed to production.

```
- name: deploy_beta_opts
    type: dockerOptions
    version:
      labels:
        color: beta

  - name: deploy_prod_opts
    type: dockerOptions
    version:
      labels:
        color: prod
```

- Add a [params](/platform/workflow/job/params/) resource to distinguish the different environments within the containers.  
```
  - name: deploy_beta_params
    type: params
    version:
      params:
        ENVIRONMENT: "beta"

  - name: deploy_prod_params
    type: params
    version:
      params:
        ENVIRONMENT: "prod"
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

Add two jobs, one for each environment. We turn continuous deployment off for production.

```
jobs:

- name: deploy_beta
    type: deploy
    steps:
      - IN: docker_options_beta
      - IN: deploy_beta_params
      - IN: deploy_manifest
      - IN: deploy_beta_opts #This is only for Kubernetes deployments

- name: deploy_prod
    type: deploy
    steps:
      - IN: docker_options_prod
      - IN: deploy_prod_params
      - IN: deploy_beta
        switch: off
      - IN: deploy_prod_opts #This is only for Kubernetes deployments
```


###4. Add your pipeline

Once you have these jobs and resources yml files as described above, commit them to your repository. You can then follow instructions to [add your assembly line to Shippable](/platform/tutorial/workflow/crud-syncrepo/).

###5. Trigger your pipeline

When you're ready for deployment, right-click on the manifest job, and select **Run Job**. Once the manifest job completes, the deploy jobs will run in parallel and deploy the beta and prod environments.


## Sample project

Here are some links to a working sample of this scenario. This is a simple Node.js application that runs some tests and then pushes
the image to Amazon ECR. It also contains all of the pipelines configuration files for deploying to Amazon ECS.

**Source code:**  
[devops-recipes/deploy-ecs-multi-env](https://github.com/devops-recipes/deploy-ecs-multi-env)
[devops-recipes/deploy-kubernetes-multi-env](https://github.com/devops-recipes/deploy-kubernetes-multi-env)

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
