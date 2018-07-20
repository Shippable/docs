page_main_title: Deploying multiple Docker containers to Kubernetes or similar platforms
page_description: Deploying multiple Docker containers to Kubernetes or similar platforms
main_section: CD
sub_section: Shippable managed deployments
sub_sub_section: Advanced topics

# Deploying multiple Docker containers to Kubernetes or similar platforms

In our [quickstart tutorial showing how you can deploy a Docker container using Shippable managed jobs](/deploy/continuous-delivery-single-container-docker-application), we walked through an example of how you can deploy your application which is packaged as a single Docker image.

In this tutorial we will show you several ways you can deploy multiple containers.

## Using a single service definition

If your application needs two Docker containers that are tightly coupled, i.e. they are packaged in a single service definition, versioned together, and deployed together on the same machine.

In this case, your workflow would look something like this:

<img src="/images/deploy/deploy-multiple-containers-fig1.png" alt="Deploying multiple containers together">

The configuration for the `manifest` and `deploy` jobs in this scenario would look something like this:

```
resources:
  - name: node_app_fe_img_dh
    type: image
    pointer:
      sourceName: "FQ_fe_image_name"
    seed:
      versionName: "fe_image_tag"

  - name: node_app_be_img_dh
    type: image
    pointer:
      sourceName: "FQ_be_image_name"
    seed:
      versionName: "be_image_tag"

  - name: gcp_gke_cluster
    type: cluster
    integration: drship_gcp  # replace with cloud integration name
    pointer:
      sourceName : "node_app_cluster" # name of the cluster to which we are deploying
      region: "us-east-1"


jobs:
  - name: node_app_manifest
    type: manifest
    steps:
     - IN: node_app_fe_img_dh
     - IN: node_app_be_img_dh

  - name: node_app_deploy
    type: deploy
    steps:
      - IN: node_app_manifest
      - IN: gcp_gke_cluster

```

The config above does not show `dockerOptions` and `params`, but you can specify them for both or either image by referring to [manifest yml reference](/platform/workflow/job/manifest).

The reference for `deploy` job is [here](/platform/workflow/job/deploy).

## Two service definitions, deployed together

You can also specify your service definitions independently and still deploy all containers together. This means you will have two `manifest` jobs and one `deploy` job. Use this approach if you want to preserve manifest versioning independently for both containers, but still want to deploy them at the same time and on the same machine.

In this case, your workflow would look something like this:

<img src="/images/deploy/deploy-multiple-containers-fig2.png" alt="Deploying multiple containers together">

The configuration for the `manifest` and `deploy` jobs in this scenario would look something like this:

```
resources:
  - name: node_app_fe_img_dh
    type: image
    pointer:
      sourceName: "FQ_fe_image_name"
    seed:
      versionName: "fe_image_tag"

  - name: node_app_be_img_dh
    type: image
    pointer:
      sourceName: "FQ_be_image_name"
    seed:
      versionName: "be_image_tag"

  - name: gcp_gke_cluster
    type: cluster
    integration: drship_gcp  # replace with cloud integration name
    pointer:
      sourceName : "node_app_cluster" # name of the cluster to which we are deploying
      region: "us-east-1"


jobs:
  - name: node_app_fe_manifest
    type: manifest
    steps:
     - IN: node_app_fe_img_dh

 - name: node_app_be_manifest
   type: manifest
   steps:
    - IN: node_app_be_img_dh

  - name: node_app_deploy
    type: deploy
    steps:
      - IN: node_app_fe_manifest
      - IN: node_app_be_manifest
      - IN: gcp_gke_cluster

```

The config above does not show `dockerOptions` and `params`, but you can specify them for both or either image by referring to [manifest yml reference](/platform/workflow/job/manifest).

The reference for `deploy` job is [here](/platform/workflow/job/deploy).

## Two service definitions, deployed separately

If your multiple containers are actually multiple services and are loosely coupled, you can deploy them independently. This means that each container might be deployed on a separate machine, depending on your cluster capacity. Also, only the Docker image that changed is deployed at any given time.

In this case, your workflow would look something like this:

<img src="/images/deploy/deploy-multiple-containers-fig3.png" alt="Deploying multiple containers separately">

The configuration for the `manifest` and `deploy` jobs in this scenario would look something like this:

```
resources:
  - name: node_app_fe_img_dh
    type: image
    pointer:
      sourceName: "FQ_fe_image_name"
    seed:
      versionName: "fe_image_tag"

  - name: node_app_be_img_dh
    type: image
    pointer:
      sourceName: "FQ_be_image_name"
    seed:
      versionName: "be_image_tag"

  - name: gcp_gke_cluster
    type: cluster
    integration: drship_gcp  # replace with cloud integration name
    pointer:
      sourceName : "node_app_cluster" # name of the cluster to which we are deploying
      region: "us-east-1"


jobs:
  - name: node_app_fe_manifest
    type: manifest
    steps:
     - IN: node_app_fe_img_dh

 - name: node_app_be_manifest
   type: manifest
   steps:
    - IN: node_app_be_img_dh

  - name: node_app_fe_deploy
    type: deploy
    steps:
      - IN: node_app_fe_manifest
      - IN: gcp_gke_cluster

  - name: node_app_be_deploy
    type: deploy
    steps:
      - IN: node_app_be_manifest
      - IN: gcp_gke_cluster
```

The config above does not show `dockerOptions` and `params`, but you can specify them for both or either image by referring to [manifest yml reference](/platform/workflow/job/manifest).

The reference for `deploy` job is [here](/platform/workflow/job/deploy).
