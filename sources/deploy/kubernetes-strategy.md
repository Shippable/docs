page_main_title: Kubernetes Deployment Strategies
main_section: Deploy
sub_section: Kubernetes

# Kubernetes Deployment strategies

There are many ways to deploy a manifest on Shippable. This page will explain each method and how it impacts deployments to Kubernetes.

If you are deploying to Kubernetes using the managed [deploy job](/platform/job-deploy/), you can specify one of the strategies below:

- blueGreen (default), where we wait for the new deployment to reach steady state before removing the old deployment
- upgrade, where the pod template is updated within the existing deployment object
- replace, for use with smaller clusters when you are okay with some downtime

##Instructions

###1: Set up basic deployment

As a pre-requisite for these instructions, you should already have set up deployment to Kubernetes.

You can follow the tutorial on [Managed deployments](/deploy/kubernetes/). This will give you the resources and jobs required to deploy a single container to Kubernetes.

###2: Specify deployment strategy

You can specify the strategy you want in the `TASK` section of your **deploy** job as shown below:

```
jobs:

  - name: deploy-kubernetes-basic-deploy
    type: deploy
    steps:
      - IN: deploy-kubernetes-basic-manifest
      - IN: deploy-kubernetes-basic-kubernetes-cluster
      - TASK: managed
        deployMethod: blueGreen | upgrade | replace     # choose one
```

Push your changes to your **syncRepo** and your next deployment will follow the specified strategy!

A description of various strategies is given below.

####a. deployMethod: blueGreen (default)

This is the default behavior that the deploy job uses unless otherwise specified.  The idea behind Shippable's `blueGreen` deployment method is to try to eliminate any risk of down time.  On Kubernetes, we accomplish this with the following workflow:

- create a new **deployment** object with appropriate pod template 
- wait for the deployment to report a successful rollout
- delete the old deployment

The deployment name will change each time, but each deployment will always contain the same combination of labels that reference the manifest and the deploy job names.  This allows you to create a kubernetes service with a selector that will always match what you're deploying, thus ensuring zero down time.  The only catch is that you'll need to have enough capacity on your cluster to run two full copies of what you're deploying.  

####b. deployMethod: upgrade

When deploying to Kubernetes, Shippable's `upgrade` method relies on the default behavior of [Kubernetes Deployment objects](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/).  Typically the workflow looks something like this:

- create/update the deployment object with the latest pod template
- wait for deployment rollout to complete

The first time the job runs, a new deployment object will be created, but every subsequent deployment will just update the existing object with the modified pod template.

####c. deployMethod: replace

There are times when you might be working in a limited environment where you don't care if there are a few minutes of downtime during deployments, and you'd prefer to keep the cluster small and cost-effective.  If this describes your environment, then it's possible that even the `upgrade` method can have trouble placing your pods due to limited resources.  In this case, Shippable provides the `replace` method.  This will essentially delete your existing running pods before rolling out your changes.  The workflow looks like this:

- if a deployment is already active, delete it
- create a new deployment with the latest pod template spec
- wait for the rollout to complete


## Deploying manifests in parallel

If you are deploying multiple manifests with the same **deploy** job, you might notice that deployments can take a long time to reach steady state. This is because manifests are deployed serially by default.

You can greatly speed up deployments for multiple manifests by using a `parallel` deploy strategy, where all manifest deployments are kicked off in parallel.

You can set the deployOptions tag to enable this:

```
- name: deploy-kubernetes-basic-deploy
  type: deploy
  steps:
    - IN: deploy-kubernetes-basic-manifest
    - IN: deploy-kubernetes-basic-kubernetes-cluster
    - TASK: managed
      deployMethod: upgrade
      deployOptions:
        - parallel

```

Depending on how many manifests you're deploying, you should notice a significant difference in deployment times by using this option, however this can make the resulting job logs a bit more difficult to sift through, since each manifest will be writing results at the same time.
