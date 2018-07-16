page_main_title: Using deployment strategies (Blue-green, Replace etc.)
main_section: CD
sub_section: Deploying containers using Shippable managed jobs
sub_sub_section: Deployment methods
page_title: Using deployment methods like Blue-green, Replace and Upgrade
page_description: How to use deployment methods like Blue-green, Replace and Upgrade in Shippable

# Using deployment methods (Blue-green, Replace etc.)

There are many ways to deploy an application on Shippable. This document explains the different strategies that are supported and how to use them.

## Topics Covered

* [Blue-Green deployments](#blue-green) (default), where we wait for the new service to reach steady state before deleting the old service
* [Upgrade deployments](#upgrade), where existing services are updated with changes
* [Replace deployments](#replace), for use with smaller clusters when you are okay with some downtime
* [Parallel deployments](#parallel), for use to deploy multiple containers in parallel

<a name="blue-green"></a>
## Blue-Green deployments (default)

This is the default deployment strategy when you use the managed `deploy` job  Blue-green deployment is a technique that reduces downtime and risk by running two identical production environments called **Blue** and **Green**. At any time, only one of the environments is live, with the live environment serving all production traffic. Shippable validates the health of the **Green** service (newer version), and if healthy, it deletes the **Blue** service (older version). If the **Green** service is unstable, Shippable deletes the it and roll backs the application to the stable and prior **Blue** service.

To use blue-green deployments, you need to have enough capacity on your cluster to run two copies of what you're deploying.  This can be challenging if you're using port mappings and a classic load balancer, since you might run into port conflicts on the host. For ECS, Shippable recommends the use of application load balancers, which you can [read about here](/deploy/lb-amazon-ecs-app).

The following explains the actual behavior for different orchestration platforms:

**ECS workflow:**

1. Register the task definition and create a new service that uses it.
2. Wait for the new service's runningCount to reach the desiredCount.
3. Reduce the old service's desiredCount to 0.
4. Wait for the old service's runningCount to reach 0.
5. Delete the old service.

**GKE workflow:**

1. Build the new pod template.
2. POST a new replicationController (RC).
3. Wait for the new RC to have running pods equal to the replicas requested.
4. Delete the old RC. Once this is complete, you'll have a new RC that has replaced the old one.

**Kubernetes workflow:**

1. Create a new **deployment** object with appropriate pod template.
2. Wait for the deployment to report a successful rollout.
3. Delete the old deployment.

The deployment name will change each time, but each deployment will always contain the same combination of labels that reference the manifest and the deploy job names.  This allows you to create a Kubernetes service with a selector that will always match what you're deploying, thus ensuring zero down time.  

If the green service is found to be unstable, Shippable deletes the green service and rollbacks the application to the stable and prior blue service.

### Instructions

Follow the steps below to configure blue-green deployments using the managed `deploy` job:

* Ensure that your cluster has enough capacity to deploy two copies of your service or application.

* Since blue-green is the default deployment strategy, you do not have to specify anything specific in the **shippable.yml**.

* In some scenarios, you might want to ensure that your containers stay up for a specific period of time after deployment before declaring the deployment a success. For example, you could want to run some acceptance tests or ensure that the containers aren't crashing after starting.
The `stabilityDuration` tag on the [deploy](/platform/workflow/job/deploy) job addresses this scenario by allowing you to specify the amount of time in seconds (0-300) that a new service created in a blue-green deployment should be stable before marking the deployment as successful. "Stable" means that the desired number of instances matches the number that are actually running in the cluster for the timeframe specified.
You can set the `stabilityDuration` tag in your YAML to configure this as shown below:

```
jobs:

  - name: app_deploy_job
    type: deploy
    stabilityDuration: 300            # add this to your deploy job
    steps:
      #Rest of deploy job definition...
```
In this example, we want the actual number of replicas to run continuously for 300 seconds. The deploy job waits for a maximum duration of 15 minutes for this condition to be satisfied. For example, if the one of the containers go down after 3 minutes, the deploy job will wait for the crashed container to restart and once it starts running, it will reset the timer to zero. At this point, all the containers have to again run continuously for 300 seconds.

<a name="upgrade"></a>
## Upgrade deployments

In this strategy, a new service is created on the orchestration platform on the very first deployment. Every subsequent deployment will just update the existing service. Shippable makes a best effort guarantee for zero downtime in the upgrade method.

The following explains the actual behavior for different orchestration platforms:

**ECS workflow:**

1. Register the task definition.
2. Create a new service OR update the existing service to reference the new task definition.
3. Update replicas if necessary (based on the manifest).

**GKE workflow:**

1. Reduce existing RC replicas to 0.
2. Wait for the pods to begin terminating.
3. Update the RC with the latest pod spec.
4. Scale the RC back up to the desired number of replicas.
5. Wait for the correct number of pods to be in running state.

**Kubernetes,workflow:**

When deploying to Kubernetes, Shippable's `upgrade` method relies on the default behavior of [Kubernetes Deployment objects](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/). Typically the workflow looks something like this:

1. Create/update the deployment object with the latest pod template.
2. Wait for deployment rollout to complete.
3. The first time the job runs, a new deployment object will be created, but every subsequent deployment will just update the existing object with the modified pod template.

### Instructions

The upgrade strategy is specified by setting the `method` attribute on the [deploy](/platform/workflow/job/deploy) to `upgrade` as shown below:

```
jobs:

  - name: app_deploy_job
    type: deploy
    method: upgrade               # add this to your deploy job
    steps:
      #Rest of deploy job definition...
```

<a name="replace"></a>
## Replace deployments

There are times when you might be working with a limited test environment, where you don't care if there are a few minutes of downtime during deployments. You might also prefer to keep the cluster as small and cost-effective as possible in some environment, thereby making the upgrade deployment not feasible due to limited resources.

For such scenarios, the Replace deployment strategy is appropriate. This strategy essentially deletes your existing running tasks / services / deployment objects before updating your service.

### Instructions

The replace strategy is specified by setting the `method` attribute on the [deploy](/platform/workflow/job/deploy) job to `replace` as shown below:

```
jobs:

  - name: app_deploy_job
    type: deploy
    method: replace
    steps:
      #Rest of deploy job definition...
```

<a name="parallel"></a>
## Deploying multiple containers in parallel

If your **deploy** job is deploying multiple manifests, it deploys them serially by default. This can take a long time, especially for a large number of manifests.

You can greatly speed up deployments for multiple manifests by configuring deployments to be kicked off in parallel.

Depending on how many manifests you're deploying, you should notice a significant difference in deployment times by using this option, however this can make the resulting logs a bit more difficult to sift through, since each manifest will be writing results at the same time.

**You can deploy manifests in parallel regardless of the deployment method (blue-green/upgrade/replace) you're using.**

### Instructions

You can set the `workflow` attribute on the [deploy](/platform/workflow/job/deploy) job to `parallel` in order to deploy multiple manifests in parallel.

As an example:

```
jobs:

  - name: app_deploy_job
    type: deploy
    workflow: parallel            # add this to your deploy job
    method: upgrage               # this can be any method               
    steps:
      #Rest of deploy job definition...
```

## Ask questions on Chat

Feel free to engage us on Chat if you have any questions about this document. Simply click on the Chat icon on the bottom right corner of this page and someone from our customer success team will get in touch with you.

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
