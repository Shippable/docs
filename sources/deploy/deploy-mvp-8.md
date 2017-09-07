page_main_title: Deployment strategies for a single container application deployed to a container orchestration service.
main_section: Deploy
sub_section: How To

# Deployment strategies for a single container application deployed to a container orchestration service.

There are many ways to deploy a single container application on Shippable.

Using the [deploy job](/platform/workflow/job/deploy/), you can specify one of the strategies below:

- blueGreen (default), where we wait for the new service to reach steady state before deleting the old service
- upgrade, where existing services are updated with changes
- replace, for use with smaller clusters when you are okay with some downtime
- parallel, for use to deploy multiple containers in parallel.

##1. Building blocks

**Resources**

- [cluster](/platform/workflow/resource/cluster/) resource that represents a set of machines on a container orchestration system.
- [image](/platform/workflow/resource/image/) resource that references a Docker image on a specific docker registry.

**Jobs**

- [manifest](/platform/workflow/job/manifest/) which creates a versioned, immutable service definition of a deployable unit for your application.
- [deploy](/platform/workflow/job/deploy/) which deploys a [manifest](/platform/workflow/job/manifest/) to a cluster.

##2. Setup
You need to create two account integrations for this scenario:

### Orchestration service account integration
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

### Docker registry account integration
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
    integration: svc_integration  # replace with actual integration created in          
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

###4. Define jobs
Jobs are defined in your [shippable.jobs.yml](/platform/tutorial/workflow/shippable-jobs-yml/) file, that should be created at the root of your repository.

You need two jobs for this scenario:

- [Manifest](/platform/workflow/job/manifest/)

```
jobs:

- name: deploy_manifest
  type: manifest
  steps:
   - IN: deploy_image
   - IN: docker_options_image
```

- [Deploy](/platform/workflow/job/deploy/)

Now we can take that manifest, and use it as input to a `deploy` job.

```
jobs:

  - name: deploy_job
    type: deploy
    steps:
      - IN: deploy_manifest
      - IN: deploy_cluster
      - TASK: managed
        deployMethod: blueGreen | upgrade | replace
```

A description of various strategies is given below.

####a. deployMethod: blueGreen (default)
This is the default behavior that the deploy job uses unless otherwise specified. Blue-green deployment is a technique that reduces downtime and risk by running two identical production environments called Blue and Green. At any time, only one of the environments is live, with the live environment serving all production traffic. Only after Shippable validates the health of the green service (newer version), it deletes the blue service (older version). If the green service is found to be unstable, Shippable deletes the green service and rollbacks the application to the stable and prior blue service.

The only catch is that you'll need to have enough capacity on your cluster to run two copies of what you're deploying.  This can be challenging if you're using port mappings and a classic load balancer, since you might run into port conflicts on the host.  

For ECS, Shippable recommends the use of application load balancers, which you can [read about here](/deploy/amazon-ecs-elb-alb).

***On ECS, we accomplish this with the following workflow:***

- register the task definition and create a new service that uses it
- wait for the new service's runningCount to reach the desiredCount
- reduce the old service's desiredCount to 0
- wait for the old service's runningCount to reach 0
- delete the old service

***On GKE, we accomplish this with the following workflow:***

- build the new pod template
- POST a new replicationController (RC)
- wait for the new RC to have running pods equal to the replicas requested
- DELETE the old RC. Once this is complete, you'll have a new RC that has replaced the old one.

***On Kubernetes, we accomplish this with the following workflow:***

- create a new **deployment** object with appropriate pod template
- wait for the deployment to report a successful rollout
- delete the old deployment

The deployment name will change each time, but each deployment will always contain the same combination of labels that reference the manifest and the deploy job names.  This allows you to create a kubernetes service with a selector that will always match what you're deploying, thus ensuring zero down time.  The only catch is that you'll need to have enough capacity on your cluster to run two full copies of what you're deploying.  

####b. deployMethod: upgrade
On the very first deployment, a new service will be created, but every subsequent deployment will just update the existing service with the modified task definition. Shippable makes a best effort guarantee for zero downtime in the upgrade method.

***On ECS, we accomplish this with the following workflow:***

- register the task definition
- create a new service OR update the existing service to reference the new task definition
- update replicas if necessary (based on the manifest)

***On GKE, we accomplish this with the following workflow:***

- reduce existing RC replicas to 0
- wait for the pods to begin terminating
- update the RC with the latest pod spec
- scale the RC back up to the desired number of replicas
- wait for the correct number of pods to be in running state

***On Kubernetes, we accomplish this with the following workflow:***

When deploying to Kubernetes, Shippable's `upgrade` method relies on the default behavior of [Kubernetes Deployment objects](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/). Typically the workflow looks something like this:

- create/update the deployment object with the latest pod template
- wait for deployment rollout to complete
- The first time the job runs, a new deployment object will be created, but every subsequent deployment will just update the existing object with the modified pod template.

####c. deployMethod: replace
There are times when you might be working with a limited test environment where you don't care if there are a few minutes of downtime during deployments, and you'd prefer to keep the cluster small and cost-effective.  If this describes your environment, then it's possible that even the `upgrade` method can have trouble placing your tasks due to limited resources.  In this case, Shippable provides the `replace` method.  This will essentially delete your existing running tasks before updating your service.

####d. Deploying manifests in parallel
If you are deploying multiple manifests with the same **deploy** job, you might notice that deployments can take a long time to reach steady state. This is because manifests are deployed serially by default.

You can greatly speed up deployments for multiple manifests by using a `parallel` deploy strategy, where all manifest deployments are kicked off in parallel.

You can set the deployOptions tag to enable this:

```
- name: deploy-ecs-basic-deploy
  type: deploy
  steps:
    - IN: deploy-ecs-basic-manifest
    - IN: deploy-ecs-basic-ecs-cluster
    - TASK: managed
      deployMethod: upgrade
      deployOptions:
        - parallel
```

Depending on how many manifests you're deploying, you should notice a significant difference in deployment times by using this option, however this can make the resulting logs a bit more difficult to sift through, since each manifest will be writing results at the same time.

###5. Add your pipeline
Once you have these jobs and resources yml files as described above, commit them to your repository. You can then follow instructions to [add your assembly line to Shippable](/platform/tutorial/workflow/crud-syncrepo/).

###6. Trigger your pipeline
When you're ready for deployment, right-click on the manifest job, and select **Run Job**.

### Sample project
Here are some links to a working sample of this scenario. This is a simple Node.js application that runs some tests and then pushes the image to Amazon ECR. It also contains all of the pipelines configuration files for deploying to Amazon ECS.

**Source code:**  [devops-recipes/deploy-ecs-strategy](https://github.com/devops-recipes/deploy-ecs-strategy)
