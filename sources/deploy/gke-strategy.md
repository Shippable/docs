page_main_title: GKE Specifying deployment strategy
main_section: Deploy
sub_section: GKE

# Google Container Engine Deployment Strategies
There are many ways to deploy a manifest on Shippable. This page will explain each method and how it impacts deployments to Google Container Engine (GKE).

## The Goal
This page will take you through each deploy method that Shippable supports in managed deploy jobs:

- blueGreen
- upgrade
- replace
- serial/parallel

We'll describe exactly how these methods impact deployments to GKE.

## The Setup
Make sure you have a cluster set up on GKE, then create an integration and cluster resource [as described in the setup section here](./gke)

For this example, we're going to use two docker images, two Shippable manifests, and one Shippable deploy job.

```
resources:
  - name: deploy-gke-strategy-gke-cluster
    type: cluster

    integration: dr-aws
    pointer:
      sourceName : "deploy-gke-basic" #name of the cluster to which we are deploying
      region: "us-east-1"

  - name: deploy-gke-strategy-image
    type: image
    integration: dr-ecr
    pointer:
      sourceName: "679404489841.dkr.ecr.us-east-1.amazonaws.com/deploy-gke-strategy"
    seed:
      versionName: "latest"

  - name: deploy-gke-strategy-nginx
    type: image
    integration: dr-ecr
    pointer:
      sourceName: "679404489841.dkr.ecr.us-east-1.amazonaws.com/nginx"
    seed:
      versionName: "1.12.0"

```

```
jobs:

  - name: deploy-gke-strategy-manifest
    type: manifest
    steps:
     - IN: deploy-gke-strategy-image

  - name: deploy-gke-strategy-nginx-manifest
    type: manifest
    steps:
      - IN: deploy-gke-strategy-nginx


  - name: deploy-gke-strategy-deploy
    type: deploy
    steps:
      - IN: deploy-gke-strategy-manifest
      - IN: deploy-gke-strategy-nginx-manifest
      - IN: deploy-gke-strategy-gke-cluster

```

## Managed Deployments
When using Shippable managed deployments, there are several deployment strategies available to you. This section will discuss these options and the impact that they have on GKE deployments.

### Basic Configuration
These options are controlled through the `TASK` section of the job steps.  By default, most jobs do not require this section, but if you're looking to use one of the non-default options, then your deploy job steps should be updated to contain this section.  It should look like this:

```
- name: deploy-gke-strategy-deploy
  type: deploy
  steps:
    - IN: deploy-gke-strategy-gke-cluster
    - IN: deploy-gke-strategy-manifest
    - IN: deploy-gke-strategy-nginx-manifest
    - TASK: managed
      deployMethod: blueGreen # (blueGreen, upgrade, replace)
      deployOptions:
        - serial # (serial, parallel)
```
These are the default values that take effect even if you don't add this section to your deploy job.

### deployMethod: blueGreen (default)
This is the default behavior that the deploy job uses unless otherwise specified.  The idea behind Shippable's `blueGreen` deployment method is to try to eliminate any risk of down time.  On GKE, we accomplish this with the following workflow:

- build the new pod template
- POST a new replicationController (RC)
- wait for the new RC to have running pods equal to the replicas requested
- DELETE the old RC

Once this is complete, you'll have a new RC that has replaced the old one.  The only catch is that you'll need to have enough capacity on your cluster to run two copies of what you're deploying.  This can be challenging depending on what kind of resources you've allocated to the cluster.  Every time you deploy with blueGreen method, Shippable will create a new RC and destroy the old one.

### deployMethod: upgrade
When deploying to GKE, Shippable's `upgrade` goal is to make a smooth transition to the new deployment with minimal or no down time.  Typically the workflow looks something like this:

- reduce existing RC replicas to 0
- wait for the pods to begin terminating
- update the RC with the latest pod spec
- scale the RC back up to the desired number of replicas
- wait for the correct number of pods to be in running state

On the very first deployment, a new RC will be created, but every subsequent deployment will just update the existing RC with the modified pod spec.

To use this method, update your deploy job to specify `deployMethod: upgrade`

```
- name: deploy-gke-strategy-deploy
  type: deploy
  steps:
    - IN: deploy-gke-strategy-gke-cluster
    - IN: deploy-gke-strategy-manifest
    - IN: deploy-gke-strategy-nginx-manifest
    - TASK: managed
      deployMethod: upgrade
```

### deployMethod: replace
There are times when you might be working with a limited test environment where you don't care if there are a few minutes of downtime during deployments, and you'd prefer to keep the cluster small and cost-effective.  If this describes your environment, then it's possible that even the `upgrade` method can have trouble placing your tasks due to limited resources.  In this case, Shippable provides the `replace` method.  This will essentially delete your existing running pods before updating the pod spec.  The workflow looks like this:

- if an RC has already been deployed, reduce its replicas to 0
- wait for the pods to completely terminate
- update the RC with the new pod spec
- increase replicas to desired number
- wait for the new pods to start to verify the deployment's success


To use this method, update your deploy job to specify `deployMethod: replace`

```
- name: deploy-gke-strategy-deploy
  type: deploy
  steps:
    - IN: deploy-gke-strategy-gke-cluster
    - IN: deploy-gke-strategy-manifest
    - IN: deploy-gke-strategy-nginx-manifest
    - TASK: managed
      deployMethod: replace
```

### deployMethod: scale
Scale is unique in that you cannot specify it in your deploy job yml.  Instead, the act of scaling is determined automatically during deployment, and can apply to any of the above deploy methods.  Scale is used only when Shippable detects that no change has occurred to any aspect of the manifest other than the 'replicas' field.  

For example, if a user updates their manifest to request 5 replicas instead of 2, but doesn't change any other setting (envs, image tags, docker options, etc), instead of performing a full deployment, Shippable performs the action 'scale' which simply updates the Amazon gke service's desiredCount.  This makes the deployment much faster and doesn't perform any unnecessary steps.

### parallel: true
There's one additional deploy option that advanced users might want to try.  You may have noticed while running the above scenarios that your deployment workflow always happens one manifest at a time.  Once one manifest's deployment completes, we move onto the next one.  If you have many manifests to deploy, and each of them is pulling a new tag or starting multiple replicas, deployments can take a long time to reach a steady state.  Instead of waiting for each manifest individually, you can kick off the deployments of each manifest in parallel simply by adding this option to your job.  It looks like this:

```
- name: deploy-gke-strategy-deploy
  type: deploy
  steps:
    - IN: deploy-gke-strategy-gke-cluster
    - IN: deploy-gke-strategy-manifest
    - IN: deploy-gke-strategy-nginx-manifest
    - TASK: managed
      deployMethod: upgrade
      deployOptions:
        - parallel

```

Depending on how many manifests you're deploying, you should notice a significant difference in deployment times by using this option, however this can make the resulting logs a bit more difficult to sift through, since each manifest will be writing results at the same time.


## Unmanaged Deployments

In an unmanaged scenario, you'll be using a runCLI job with a GKE cliConfig [as described in the unmanaged section of our basic scenario](./gke#unmanaged-deployments).

From that starting point, there are no pre-built deployment strategies for GKE for unmanaged jobs, however the power and flexibility of Shippable pipelines is available to you to script whatever deployment behavior works best for your environment.
