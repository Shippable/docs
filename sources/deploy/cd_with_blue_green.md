page_main_title: Using deployment strategies (Blue-green, Replace etc.)
main_section: Deploy
sub_section: CD to Orchestration Platforms

# Using deployment strategies (Blue-green, Replace etc.)

There are many ways to deploy an application on Shippable. This document explains the different strategies that are supported and how to use them.

## Topics Covered

* BlueGreen (default) strategy, where we wait for the new service to reach steady state before deleting the old service.
* Upgrade strategy, where existing services are updated with changes
* Replace strategy, for use with smaller clusters when you are okay with some downtime
* Parallel strategy, for use to deploy multiple containers in parallel.

### BlueGreen deployment strategy (default)

* **Description**: This is the default behavior that the deploy job uses unless otherwise specified. Blue-green deployment is a technique that reduces downtime and risk by running two identical production environments called Blue and Green. At any time, only one of the environments is live, with the live environment serving all production traffic. Only after Shippable validates the health of the green service (newer version), it deletes the blue service (older version). If the green service is found to be unstable, Shippable deletes the green service and rollbacks the application to the stable and prior blue service.

The only catch is that you'll need to have enough capacity on your cluster to run two copies of what you're deploying.  This can be challenging if you're using port mappings and a classic load balancer, since you might run into port conflicts on the host. For ECS, Shippable recommends the use of application load balancers, which you can [read about here](/deploy/amazon-ecs-elb-alb).

* **ECS workflow:**

- register the task definition and create a new service that uses it
- wait for the new service's runningCount to reach the desiredCount
- reduce the old service's desiredCount to 0
- wait for the old service's runningCount to reach 0
- delete the old service

* **GKE workflow:**

- build the new pod template
- POST a new replicationController (RC)
- wait for the new RC to have running pods equal to the replicas requested
- DELETE the old RC. Once this is complete, you'll have a new RC that has replaced the old one.

* **Kubernetes workflow:**

- create a new **deployment** object with appropriate pod template
- wait for the deployment to report a successful rollout
- delete the old deployment

The deployment name will change each time, but each deployment will always contain the same combination of labels that reference the manifest and the deploy job names.  This allows you to create a kubernetes service with a selector that will always match what you're deploying, thus ensuring zero down time.  The only catch is that you'll need to have enough capacity on your cluster to run two full copies of what you're deploying.

### Upgrade deployment strategy

* Description: In this strategy, a new service is created on the orchestration platform on the very first deployment. However every subsequent deployment will just update the existing service. Shippable makes a best effort guarantee for zero downtime in the upgrade method.

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


### Replace deployment strategy

* Description: There are times when you might be working with a limited test environment, where you don't care if there are a few minutes of downtime during deployments. You might also prefer to keep the cluster as small and cost-effective as possible in some environment, thereby making the upgrade deployment not feasible due to limited resources. For such scenarios, the Replace deployment strategy is appropriate. This strategy essentially deletes your existing running tasks / services / deployment objects before updating your service.



### Parallel strategy

A multiple container application can be comprised of multiple manifest jobs, with each manifest job defining a component of the application. When multiple manifests are deployed with the same **deploy** job, deployments can take a long time to complete. This is because manifests are deployed serially by default.

You can greatly speed up deployments for multiple manifests by using a `parallel` deploy strategy, where all manifest deployments are kicked off in parallel.

* Job: [deploy](/platform/workflow/job/deploy) job.
* Yml block:

Update the `app_deploy_job` yml block in your [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/) file.

```
- name: app_deploy_job
  type: deploy
  steps:
    - IN: app_service_a_def # manifest for service A of an app
    - IN: app_service_b_def # manifest for service B of an app
    - IN: app_service_c_def # manifest for service C of an app
    - TASK: managed
      deployMethod: upgrade
      deployOptions:
        - parallel
```

Depending on how many manifests you're deploying, you should notice a significant difference in deployment times by using this option, however this can make the resulting logs a bit more difficult to sift through, since each manifest will be writing results at the same time.


### Validating the health of an blue-green deployment of a single container application deployed to a container orchestration service.

* Description: You might want to validate that your containers are up and running for a certain period of time after deployment before declaring the deployment a success. Typical usecases are that after deployment, you might want to run some acceptance tests. If any of these tests crash one or more of your containers, the deployment should be marked a failure and the application rolled back to the previous (blue) state.
* Job: [deploy](/platform/workflow/job/deploy) job.
* Yml block:

Update the `app_deploy_job` yml block in your [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/) file.

```
jobs:

  - name: app_deploy_job
    type: deploy
    stabilityDuration: 300
    steps:
      - IN: app_service_def
      - IN: op_cluster
      - IN: app_replicas
```

`stabilityDuration` is the amount of time in seconds (0-300) that a new service created in a blueGreen deployment should be stable before marking the deployment as successful. Stable means that the desired number of replicas matches the number that are actually running in the cluster for the timeframe specified. By default, the #replicas is 1.

In this example, we want the actual number of replicas to run continuously for 300 seconds. The deploy job waits for a maximum duration of 15 minutes for this condition to be satisfied. For example, if the one of the containers go down after 3 minutes, the deploy job will wait for the crashed container to restart and once it starts running, it will reset the timer to zero. At this point, all the containers have to again run continuously for 300 seconds.


### Sample project
**Source code:**  [devops-recipes/deploy-ecs-strategy](https://github.com/devops-recipes/deploy-ecs-strategy)

## Ask questions on Chat

Feel free to engage us on Chat if you have any questions about this document. Simply click on the Chat icon on the bottom right corner of this page and someone from our customer success team will get in touch with you.

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
