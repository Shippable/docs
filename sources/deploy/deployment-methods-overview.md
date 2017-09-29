page_main_title: Using deployment strategies (Blue-green, Replace etc.)
main_section: Deploy
sub_section: Deploy to Container Orchestration Platforms
sub_sub_section: Deployment methods

# Using deployment methods (Blue-green, Replace etc.)

There are many ways to deploy an application on Shippable. This document explains the different strategies that are supported and how to use them.

## Topics Covered

* [Blue-Green deployments](#blue-green) (default), where we wait for the new service to reach steady state before deleting the old service
* [Upgrade deployments](#upgrade), where existing services are updated with changes
* [Replace deployments](#replace), for use with smaller clusters when you are okay with some downtime
* [Parallel deployments](#parallel), for use to deploy multiple containers in parallel

<a name="blue-green"></a>
## Blue-Green deployments (default)

This is the default behavior that the deploy job uses unless otherwise specified. Blue-green deployment is a technique that reduces downtime and risk by running two identical production environments called Blue and Green. At any time, only one of the environments is live, with the live environment serving all production traffic. Only after Shippable validates the health of the green service (newer version), it deletes the blue service (older version). If the green service is found to be unstable, Shippable deletes the green service and rollbacks the application to the stable and prior blue service.

The only catch is that you'll need to have enough capacity on your cluster to run two copies of what you're deploying.  This can be challenging if you're using port mappings and a classic load balancer, since you might run into port conflicts on the host. For ECS, Shippable recommends the use of application load balancers, which you can [read about here](/deploy/amazon-ecs-elb-alb).

To configure blue-green deployments, read the [Blue-Green deployments](/deploy/deployment-method-blue-green) doc.

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

The deployment name will change each time, but each deployment will always contain the same combination of labels that reference the manifest and the deploy job names.  This allows you to create a kubernetes service with a selector that will always match what you're deploying, thus ensuring zero down time.  The only catch is that you'll need to have enough capacity on your cluster to run two full copies of what you're deploying.

<a name="upgrade"></a>
## Upgrade deployments

In this strategy, a new service is created on the orchestration platform on the very first deployment. However every subsequent deployment will just update the existing service. Shippable makes a best effort guarantee for zero downtime in the upgrade method.

To configure blue-green deployments, read the [Upgrade deployments](/deploy/deployment-method-upgrade) doc.

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

<a name="replace"></a>
## Replace deployments

There are times when you might be working with a limited test environment, where you don't care if there are a few minutes of downtime during deployments. You might also prefer to keep the cluster as small and cost-effective as possible in some environment, thereby making the upgrade deployment not feasible due to limited resources.

For such scenarios, the Replace deployment strategy is appropriate. This strategy essentially deletes your existing running tasks / services / deployment objects before updating your service.

To configure blue-green deployments, read the [Replace deployments](/deploy/deployment-method-replace) doc.

<a name="parallel"></a>
## Deploying multiple containers in parallel

If your **deploy** job is deploying multiple manifests, it deploys them serially by default. This can take a long time, especially for a large number of manifests.

You can greatly speed up deployments for multiple manifests by configuring deployments to be kicked off in parallel.

Depending on how many manifests you're deploying, you should notice a significant difference in deployment times by using this option, however this can make the resulting logs a bit more difficult to sift through, since each manifest will be writing results at the same time.

**You can deploy manifests in parallel regardless of the deployment method (blue-green/upgrade/replace) you're using.**

To configure parallel deployments, read the [Deploying manifests in parallel](/deploy/deployment-method-parallel) doc.


## Ask questions on Chat

Feel free to engage us on Chat if you have any questions about this document. Simply click on the Chat icon on the bottom right corner of this page and someone from our customer success team will get in touch with you.

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
