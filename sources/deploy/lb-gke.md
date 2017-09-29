page_main_title: Attaching a load balancer to a GKE cluster
main_section: Deploy
sub_section: Deploy to Container Orchestration Platforms
sub_sub_section: Using load balancers

# Attaching a load balancer to a GKE cluster

Load balancers are a must-have for any containerized application that wants to run on a cluster. You can easily add a load balancer and specify the pods to which it should direct traffic. This makes it easy to repeatedly deploy new services while always making them accessible via the load balancer, thus reducing down time.

Shippable does not directly integrate GKE load balancers (services) with `deploy` jobs. The main reason for this is that GKE's labeling system makes it unnecessary to couple the two pieces. Instead, you can connect a GKE service to your replicationController at any time by referencing the Shippable pod labels, or by adding your own custom labels to your manifest.

## Instructions

<img src="/images/deploy/usecases/deploy_kube_lb.png"/>

###1. Add a load balancer resource

Add a [loadbalancer](/platform/workflow/resource/loadbalancer/#loadbalancer) resource to your [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/) file. As an example:

```
- name: app_lb
  type: loadBalancer
  integration: op_int
  pointer:
    sourceName: "app_load_balancer"
    method: LoadBalancer
    namespace: shippable
    clusterName: "test"
    region: "us-east-1b"
  version:
    ports:
      - name: testPort
        protocol: TCP
        port: 80
    selector:
      name: "app_service_def"
      jobName: "app_deploy_job"
```

The loadBalancer resource supports a range of fields, allowing you to set almost any field that you'd want. Complete reference [is here](/platform/workflow/resource/loadbalancer/#loadbalancer).

Shippable adds the values of `name` and `jobName` as labels to every pod spec for GKE. These need to be set as follows:

* `name`: "name of your manifest job that was deployed"
* `jobName`: "name of the deploy job that deployed your manifest"

By using both the manifest name and job name as selectors, the GKE service will always pinpoint the exact pods from the replicationController that was deployed.

If you want to set custom labels for your loadBalancer, check out the [Specifying custom labels](#custom-labels) instructions below.

###2. Add a `provision` job.

The [provision](/platform/workflow/job/provision/) job is used to create ancillary objects like load balancers on Container Orchestration Platforms like GKE and Kubernetes.

Add the following yml block to your [shippable.jobs.yml](/platform/tutorial/workflow/shippable-jobs-yml/) file.

```
- name: app_provision        #friendly name for job
  type: provision
  steps:
    - IN: app_lb             #name of load balancer you created in step 1
```

This job will use the `integration` associated with your `loadBalancer` resource to make API calls to your cluster to POST to your GKE service with all of the settings you requested.

You can use a single provision job to provision multiple services. Just include a separate `IN` statement with a separate resource for each service you plan to create.

<a name="custom-labels"></a>
## Setting custom labels

If you have another set of labels that you'd like to use instead, you can use a [dockerOptions resource](/platform/workflow/resource/dockeroptions) to set your own labels.

**Steps**

* Add a [dockerOptions resource](/platform/workflow/resource/dockeroptions) to your [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/) file.

```
resources:
  - name: app_labels
    type: dockerOptions
    version:
      labels:
        name: "api"
        environment: "test"
```

* Specify `app_labels` as an additional input to the [manifest job](/platform/workflow/job/manifest). For example, the yml snippet for our [Single container application](/deploy/cd_of_single_container_applications_to_orchestration_platforms) would look like this:

```
jobs:

  - name: app_service_def
    type: manifest
    steps:
      - IN: app_image
      - IN: app_options
      - IN: app_environment
      - IN: app_labels
```

* Update the `selector` section in the `loadBalancer` resource to match the labels you used in `dockerOptions`. The yml snippet for our [Single container application](/deploy/cd_of_single_container_applications_to_orchestration_platforms) would look like this:

```
resouces:

  - name: app_lb
    type: loadBalancer
    integration: op_int
    pointer:
      sourceName: desired-name-of-service-on-cluster
      method: LoadBalancer
      namespace: shippable
    version:
      ports:
        - name: testPort
          protocol: TCP
          port: 80
      selector:                 #this should match the labels in dockerOptions
        name: "api"
        environment: "test"
```

## Ask questions on Chat

Feel free to engage us on Chat if you have any questions about this document. Simply click on the Chat icon on the bottom right corner of this page and someone from our customer success team will get in touch with you.

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
