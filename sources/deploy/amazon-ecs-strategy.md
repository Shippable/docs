page_main_title: Amazon ECS Specifying deployment strategy
main_section: Deploy
sub_section: Amazon ECS

# Amazon ECS Deployment Strategies

There are many ways to deploy a manifest on Shippable. This page will explain each method and how it impacts deployments to Amazon ECS.

If you are deploying to Amazon ECS using the managed [deploy job](/platform/workflow/job/deploy/), you can specify one of the strategies below:

- blueGreen (default), where we wait for the new service to reach steady state before deleting the old service
- upgrade, where existing services are updated with changes
- replace, for use with smaller clusters when you are okay with some downtime

##Instructions

###1: Set up basic deployment

As a prerequisite for these instructions, you should already have set up deployment to ECS.

You can follow the tutorial on [Managed deployments](/deploy/amazon-ecs/). This will give you the resources and jobs required to deploy a single container to ECS.

###2: Specify deployment strategy

You can specify the strategy you want in your **deploy** job as shown below:

```
jobs:

  - name: deploy-ecs-basic-deploy
    type: deploy
    method: blueGreen | upgrade | replace
    steps:
      - IN: deploy-ecs-basic-manifest
      - IN: deploy-ecs-basic-ecs-cluster
```

Push your changes to your **syncRepo** and your next deployment will follow the specified strategy!

A description of various strategies is given below.

####a. method: blueGreen (default)

Unless otherwise specified, a deploy job will use the `blueGreen` method.  The idea behind Shippable's `blueGreen` deployment method is to try to eliminate any risk of down time.  On ECS, we accomplish this with the following workflow:

- register the task definition and create a new service that uses it
- wait for the new service's runningCount to reach the desiredCount
- reduce the old service's desiredCount to 0
- wait for the old service's runningCount to reach 0
- delete the old service

Once this is complete, you'll have a new service that has replaced the old one.  The only catch is that you'll need to have enough capacity on your cluster to run two copies of what you're deploying.  This can be challenging if you're using port mappings and a classic load balancer, since you might run into port conflicts on the host.  Shippable recommends the use of application load balancers, which you can [read about here](/deploy/amazon-ecs-elb-alb).

####b. method: upgrade

When deploying to Amazon ECS, Shippable's `upgrade` method relies on the default behavior of Amazon ECS.  Typically the workflow looks something like this:

- register the task definition
- create a new service OR update the existing service to reference the new task definition
- update replicas if necessary (based on the manifest)

On the very first deployment, a new service will be created, but every subsequent deployment will just update the existing service with the modified task definition.

####c. method: replace

There are times when you might be working with a limited test environment where you don't care if there are a few minutes of downtime during deployments, and you'd prefer to keep the cluster small and cost-effective.  If this describes your environment, then it's possible that even the `upgrade` method can have trouble placing your tasks due to limited resources.  In this case, Shippable provides the `replace` method.  This will essentially delete your existing running tasks before updating your service.  The workflow looks like this:

- if a service has already been deployed, reduce its desiredCount to 0
- wait for the runningCount to reach 0
- register the new task definition
- update the service to reference the new task definition
- change the service's desiredCount to match the supplied manifest.
- wait for the new tasks to start to verify the deployment's success


## Deploying manifests in parallel

If you are deploying multiple manifests with the same **deploy** job, you might notice that deployments can take a long time to reach steady state. This is because manifests are deployed serially by default.

You can greatly speed up deployments for multiple manifests by using a `parallel` deploy strategy, where all manifest deployments are kicked off in parallel.

You can set the workflow tag to enable this:

```
- name: deploy-ecs-basic-deploy
  type: deploy
  method: upgrade
  workflow: parallel
  steps:
    - IN: deploy-ecs-basic-manifest
    - IN: deploy-ecs-basic-ecs-cluster
```

Depending on how many manifests you're deploying, you should notice a significant difference in deployment times by using this option, however this can make the resulting logs a bit more difficult to sift through, since each manifest will be writing results at the same time.

## Sample project

Here are some links to a working sample of this scenario. This is a simple Node.js application that runs some tests and then pushes
the image to Amazon ECR. It also contains all of the pipelines configuration files for deploying to Amazon ECS.

**Source code:**  [devops-recipes/deploy-ecs-strategy](https://github.com/devops-recipes/deploy-ecs-strategy)

**Build status badge:** [![Run Status](https://api.shippable.com/projects/58f94cc57e84cc070041e5a0/badge?branch=master)](https://app.shippable.com/github/devops-recipes/deploy-ecs-strategy)
