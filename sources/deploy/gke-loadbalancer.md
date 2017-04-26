main_section: Deploy
sub_section: Load Balancing with Google Container Engine

# Load Balancing with Google Container Engine

## Setup
Start with our [basic configuration](./gke) for gke.

## Managed


### Using Labels

Shippable does not directly integrate GKE load balancers (services) with Shippable managed deploy jobs.  The main reason for this is that GKE's labeling system makes it unnecessary to couple the two pieces.

Instead, you can connect a GKE service to your replicationController at any time by referencing the Shippable pod labels, or by adding your own custom labels to your manifest.

Shippable adds 3 labels to every pod spec:
```
"name": "<manifestName>",
"jobName": "<jobName>",
"rcName": "<rcName>"
```

- rcName contains a unique identifier that might change during each deployment, so this label is not recommended for use.
- manifestName is the name of your manifest resource that was deployed
- jobName is the name of the deploy job that deployed your manifestName

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
If you use this resource as an IN to your manifest job, these labels will be added to your manifest, and will be present in the pod spec when your manifest is deployed.

### Provision Jobs

Shippable has a job type called `provision`.  One of the objects that this job type can provision is a kubernetes service.

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



## Unmanaged
coming soon

- set labels via runCLI.
- connect to existing service or use kubectl to provision in runCLI.
- use params to get labels into the ENV for easy usage across jobs.
