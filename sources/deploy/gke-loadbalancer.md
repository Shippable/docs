page_main_title: GKE Using a load balancer
main_section: Deploy
sub_section: GKE

# Load Balancing with Google Container Engine
Load balancers are a must-have for any containerized application that wants to run on a Kubernetes cluster.  In Kubernetes, load balancers take the form of an object called a 'service'.

## The Goal
This page will explain how you can connect a Kubernetes service with a replicationController created by a managed GKE deployment in Shippable Pipelines

- deploy to GKE from Shippable pipelines
- create a service manually or via [provision job](../reference/job-provision).
- connect that service with your deployed RC

This is an enhancement to the pipeline described in the basic GKE scenario.

## The Setup
Start with our [basic configuration](./gke) for gke.

## Managed
There are a few methods that will allow you to implement this functionality through Shippable managed tasks.

### Using Labels

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

If you have another set of labels that you'd like to use instead, you can use a [dockerOptions resource](../reference/resource-dockeroptions) to set your own labels.  It might look something like this:

```
- name: myLabels
  type: dockerOptions
  version:
    labels:
      name: "api"
      environment: "test"
```
If you use this resource as an IN to your manifest job, these labels will be added to your manifest, and will be present in the pod when your manifest is deployed.

### Provision Jobs

Shippable has a job type called `provision`.  One of the objects that this job type can create is a Kubernetes service.

First, you should create a loadBalancer resource to represent your service:
```
- name: test-service
  type: loadBalancer
  integration: MyGkeCredentials
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

The loadBalancer resource supports a range of fields in this case, allowing you to set almost any field that you'd want.  [See here](../reference/resource-loadbalancer) for the full reference page.

Now you have a representation of your loadBalancer in Shippable, but you haven't actually created it on your kube cluster yet.  For that you need a provision job:

```
- name: create-service
  type: provision
  steps:
    - IN: test-service
```
That's it.  This job will use the integration associated with your loadBalancer resource to make API calls to your cluster to POST your kubernetes service with all of the settings you requested.

You can use a single provision job to provision multiple services. Just include a separate `IN` statement with a separate resource for each service you plan to create.



## Unmanaged
Unmanaged refers to the use of [runCLI jobs](../reference/job-runcli), which will automatically configure gcloud and kubectl for you when you provide your gke credentials in the [cliConfig resource](../reference/resource-cliconfig).

These unmanaged jobs provide you with unlimited scripting ability which you can use to do the following:

- set labels directly when creating your own RCs or pods.
- create services on the command line via auto-configured kubectl
- use a [params resource](../reference/resource-params) to get labels into the job environment for easy usage across jobs.
