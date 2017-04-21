main_section: Deploy
sub_section: Deploying to Amazon ECS

# Amazon ECS Deployment Strategies
There are many ways to deploy a manifest on Shippable. This page will explain each method and how it impacts deployments to Amazon ECS.

## Setup
For this example, we're going to use two docker images, two Shippable manifests, and one Shippable deploy job.

```
resources:
  - name: deploy-ecs-strategy-ecs-cluster
    type: cluster

    integration: dr-aws
    pointer:
      sourceName : "deploy-ecs-basic" #name of the cluster to which we are deploying
      region: "us-east-1"      

  - name: deploy-ecs-strategy-image
    type: image
    integration: dr-ecr
    pointer:
      sourceName: "679404489841.dkr.ecr.us-east-1.amazonaws.com/deploy-ecs-strategy"
    seed:
      versionName: "latest"

  - name: deploy-ecs-strategy-nginx
    type: image
    integration: dr-ecr
    pointer:
      sourceName: "679404489841.dkr.ecr.us-east-1.amazonaws.com/nginx"
    seed:
      versionName: "1.12.0"

```

```
jobs:

  - name: deploy-ecs-strategy-manifest
    type: manifest
    steps:
     - IN: deploy-ecs-strategy-image

  - name: deploy-ecs-strategy-nginx-manifest
    type: manifest
    steps:
      - IN: deploy-ecs-strategy-nginx


  - name: deploy-ecs-strategy-deploy
    type: deploy
    steps:
      - IN: deploy-ecs-strategy-manifest
      - IN: deploy-ecs-strategy-nginx-manifest
      - IN: deploy-ecs-strategy-ecs-cluster

```

## Managed Deployments
When using Shippable managed deployments, there are several deployment strategies available to you. This section will discuss these options and the impact that they have on Amazon ECS deployments.

### Basic Configuration
These options are controlled through the `TASK` section of the job steps.  By default, most jobs do not require this section, but if you're looking to use one of the non-default options, then your deploy job steps should be updated to contain this section.  It should look like this:

```
- name: deploy-ecs-strategy-deploy
  type: deploy
  steps:
    - IN: deploy-ecs-strategy-ecs-cluster
    - IN: deploy-ecs-strategy-manifest
    - IN: deploy-ecs-strategy-nginx-manifest
    - TASK: managed
      deployMethod: blueGreen # (blueGreen, upgrade, replace)
      deployOptions:
        - serial # (serial, parallel)
```
These are the default values that take effect even if you don't add this section to your deploy job.

### deployMethod: blueGreen (default)
This is the default behavior that the deploy job uses unless otherwise specified.  The idea behind Shippable's `blueGreen` deployment method is to try to eliminate any risk of down time.  On ECS, we accomplish this with the following workflow:

- register the task definition and create a new service that uses it
- wait for the new service's runningCount to reach the desiredCount
- reduce the old service's desiredCount to 0
- wait for the old service's runningCount to reach 0
- delete the old service

Once this is complete, you'll have a new service that has replaced the old one.  The only catch is that you'll need to have enough capacity on your cluster to run two copies of what you're deploying.  This can be challenging if you're using port mappings and a classic load balancer, since you might run into port conflicts on the host.  Shippable recommends the use of application load balancers, which you can read about here [TODO: add link].

### deployMethod: upgrade
When deploying to Amazon ECS, Shippable's `upgrade` method relies on the default behavior of Amazon ECS.  Typically the workflow looks something like this:

- register the task definition
- create a new service OR update the existing service to reference the new task definition
- update replicas if necessary (based on the manifest)

On the very first deployment, a new service will be created, but every subsequent deployment will just update the existing service with the modified task definition.

To use this method, update your deploy job to specify `deployMethod: upgrade`

```
- name: deploy-ecs-strategy-deploy
  type: deploy
  steps:
    - IN: deploy-ecs-strategy-ecs-cluster
    - IN: deploy-ecs-strategy-manifest
    - IN: deploy-ecs-strategy-nginx-manifest
    - TASK: managed
      deployMethod: upgrade
```

### deployMethod: replace
There are times when you might be working with a limited test environment where you don't care if there are a few minutes of downtime during deployments, and you'd prefer to keep the cluster small and cost-effective.  If this describes your environment, then it's possible that even the `upgrade` method can have trouble placing your tasks due to limited resources.  In this case, Shippable provides the `replace` method.  This will essentially delete your existing running tasks before updating your service.  The workflow looks like this:

- if a service has already been deployed, reduce its desiredCount to 0
- wait for the runningCount to reach 0
- register the new task definition
- update the service to reference the new task definition
- change the service's desiredCount to match the supplied manifest.
- wait for the new tasks to start to verify the deployment's success


To use this method, update your deploy job to specify `deployMethod: replace`

```
- name: deploy-ecs-strategy-deploy
  type: deploy
  steps:
    - IN: deploy-ecs-strategy-ecs-cluster
    - IN: deploy-ecs-strategy-manifest
    - IN: deploy-ecs-strategy-nginx-manifest
    - TASK: managed
      deployMethod: replace
```

### deployMethod: scale
Scale is unique in that you cannot specify it in your deploy job yml.  Instead, the act of scaling is determined automatically during deployment, and can apply to any of the above deploy methods.  Scale is used only when Shippable detects that no change has occurred to any aspect of the manifest other than the 'replicas'.  

For example, if a user updates their manifest to request 5 replicas instead of 2, but doesn't change any other setting (envs, image tags, docker options, etc), instead of performing a full deployment, Shippable performs the action 'scale' which simply updates the Amazon ECS service's desiredCount.  This makes the deployment much faster and doesn't perform any unnecessary steps.

### parallel: true
There's one additional deploy option that advanced users might want to try.  You may have noticed while running the above scenarios that your deployment workflow always happens one manifest at a time.  Once one manifest's deployment completes, we move onto the next one.  If you have many manifests to deploy, and each of them is pulling a new tag or starting multiple replicas, deployments can take a long time to reach a steady state.  Instead of waiting for each manifest individually, you can kick off the deployments of each manifest in parallel simply by adding this option to your job.  It looks like this:

```
- name: deploy-ecs-strategy-deploy
  type: deploy
  steps:
    - IN: deploy-ecs-strategy-ecs-cluster
    - IN: deploy-ecs-strategy-manifest
    - IN: deploy-ecs-strategy-nginx-manifest
    - TASK: managed
      deployMethod: upgrade
      deployOptions:
        - parallel

```

Depending on how many manifests you're deploying, you should notice a significant difference in deployment times by using this option, however this can make the resulting logs a bit more difficult to sift through, since each manifest will be writing results at the same time.

## Sample project

Here are some links to a working sample of this scenario. This is a simple Node.js application that runs some tests and then pushes
the image to Amazon ECR. It also contains all of the pipelines configuration files for deploying to Amazon ECS.

**Source code:**  [devops-recipes/deploy-ecs-strategy](https://github.com/devops-recipes/deploy-ecs-strategy).

**Build link:** [CI build on Shippable](https://app.shippable.com/github/devops-recipes/deploy-ecs-strategy/runs/2/1/console)

**Build status badge:** [![Run Status](https://api.shippable.com/projects/58f94cc57e84cc070041e5a0/badge?branch=master)](https://app.shippable.com/github/devops-recipes/deploy-ecs-strategy)

## Unmanaged Deployments
coming soon
