page_main_title: Attaching a load balancer to a single container application deployed to Google Container Engine (GKE).
main_section: Deploy
sub_section: How To

# Attaching a load balancer to a single container application deployed to Google Container Engine (GKE).

Load balancers are a must-have for any containerized application. In Kubernetes, load balancers take the form of an object called a 'service'.

##1. Building blocks

You will need to get familiar with the following platform building blocks:

**Resources**

- [cluster](/platform/workflow/resource/cluster/) resource that represents a set of machines on a container orchestration system.
- [image](/platform/workflow/resource/image/) resource that references a Docker image on a specific docker registry.
- [dockerOptions](/platform/workflow/resource/dockeroptions/) resource used to add a list of docker options that can be appended to a docker image.
- [replicas](/platform/workflow/resource/replicas/) resource that holds the number of instances of the container to deploy. It is used specifically to deploy Docker containers.
- [loadBalancer](/platform/workflow/resource/loadbalancer/) resource.

**Jobs**

- [manifest](/platform/workflow/job/manifest/) which creates a versioned, immutable service definition of a deployable unit for your application.
- [deploy](/platform/workflow/job/deploy/) which deploys a [manifest](/platform/workflow/job/manifest/) to a cluster.

##2. Create account integrations
You need two account integrations for this scenario:

###GKE
Shippable will use Google Cloud service account credentials to communicate with GKE on your behalf. Get started by creating a [Google Container Engine Integration](/platform/integration/gke).

###GCR
You also need to configure an integration to GCR so that we can pull your image. Follow instructions in the [GCR integration](/platform/integration/gcr/) page.

##3. Create resources

You need the following three resources in your `shippable.resources.yml` file:

###cluster

First, we need a `cluster` resource which references a cluster that has already been created on GKE.

```
resources:

  - name: deploy_gke_cluster    # resource friendly name
    type: cluster
    integration: int_gke        # replace with integration name from step 1          
    pointer:
      sourceName: "deploy_gke"     # name of the cluster to which we are deploying
      region: "gke_cluster_region" # AWS region where cluster is located
```

For a complete reference, check out the [cluster](/platform/workflow/resource/cluster/) page.

###image

Next, we need an `image` resource.  This will represent your Docker image in your pipeline.  In our example, we're using GCR since it integrates nicely with GKE.

```
resources:

  - name: deploy_gke_image          # resource friendly name
    type: image
    integration: int_gcr                      # replace with integration name from step 1          
    pointer:
      sourceName: "gcr.io/sample_gke/deploy_gke"   # image pointer
    seed:
      versionName: "latest"     # Tag value for first deployment
```

For a complete reference, check out the [image](/platform/workflow/resource/image/) page.

###Labels

Shippable does not directly integrate GKE load balancers (services) with Shippable managed deploy jobs.  The main reason for this is that GKE's labeling system makes it unnecessary to couple the two pieces.

Instead, you can connect a GKE service to your replicationController at any time by referencing the Shippable pod labels, or by adding your own custom labels to your manifest.

Shippable adds 3 labels to every pod spec:
```
"name": "<manifestName>",
"jobName": "<jobName>",
"rcName": "<rcName>"
```

- manifestName is the name of your manifest resource that was deployed
- jobName is the name of the deploy job that deployed your manifest
- rcName contains a unique identifier that might change during each deployment, so this label is not recommended for use.

By using a combination of manifestName and jobName, you can be certain that your GKE service will always pinpoint the exact pods from the replicationController that was deployed.  Shippable recommends using these two labels in your service selector.

If you have another set of labels that you'd like to use instead, you can use a [dockerOptions resource](/platform/workflow/resource/dockeroptions) to set your own labels.  It might look something like this:

```
- name: myLabels
  type: dockerOptions
  version:
    labels:
      name: "api"
      environment: "test"
```
If you use this resource as an IN to your manifest job, these labels will be added to your manifest, and will be present in the pod when your manifest is deployed.

###loadBalancer

Add the load balancer resource:

```
- name: application_service
  type: loadBalancer
  integration: int_gke
  pointer:
    sourceName: desired-name-of-service-on-cluster
    method: LoadBalancer
    namespace: shippable
  version:
    ports:
      - name: testPort
        protocol: TCP
        port: 80
    selector:
      name: "api"
      environment: "test"
```

The loadBalancer resource supports a range of fields in this case, allowing you to set almost any field that you'd want.  [See here](/platform/workflow/resource/loadbalancer) for the full reference page.

###replicas

Even though we're exposing a port, we can run multiple copies of the service on a single box, and all traffic will be directed through the ALB by way of whichever random port was assigned.  Lets add a `replicas` resource to test this:

```
- name: deploy_gke_lb_replicas
  type: replicas
    version:
      count: 3
```

##4. Define jobs

Jobs are defined in your `shippable.jobs.yml`.

You need two jobs for this scenario:

###[Manifest](/platform/workflow/job/manifest/)

We need to package the image in a way that it can easily be deployed to any endpoint.  Shippable provides users with a managed task type `manifest` that accomplishes this goal.  Define this in your `shippable.jobs.yml`.

```
jobs:

- name: deploy_gke_manifest
  type: manifest
  steps:
   - IN: deploy_gke_image             #friendly name of image created in step 2
   - IN: deploy_gke_lb_replicas
   - IN: deploy_gke_docker_options
```

###[Deploy](/platform/workflow/job/deploy/)

Now we can take that manifest, and use it as input to a `deploy` type job.

```
jobs:
  - name: deploy_gke_deploy
    type: deploy
    steps:
      - IN: deploy_gke_manifest
      - IN: deploy_gke_cluster
```
###[Provision](/platform/workflow/job/provision/)

```
- name: create_service
  type: provision
  steps:
    - IN: application_service
```

This job will use the integration associated with your loadBalancer resource to make API calls to your cluster to POST your kubernetes service with all of the settings you requested.

##4. Add your pipeline

Once you have these jobs and resources yml files as described above, commit them to your repository. You can then follow instructions to [add your assembly line to Shippable](/platform/tutorial/workflow/crud-syncrepo/).

##5. Trigger your pipeline

When you're ready for deployment, right-click on the manifest job, and select **Run Job**.

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
