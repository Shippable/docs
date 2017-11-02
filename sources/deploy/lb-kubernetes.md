page_main_title: Attaching a load balancer to a Kubernetes cluster
main_section: Deploy
sub_section: Deploy to Container Orchestration Platforms
sub_sub_section: Using load balancers

# Attaching a load balancer to a Kubernetes cluster

Load balancers are a must-have for any containerized application that wants to run on a cluster. You can easily add a load balancer and specify the pods to which it should direct traffic. This makes it easy to repeatedly deploy new services while always making them accessible via the load balancer, thus reducing down time.

Shippable does not directly integrate Kubernetes load balancers (services) with `deploy` jobs. The main reason for this is that Kubernetes's labeling system makes it unnecessary to couple the two pieces. Instead, you can connect a Kubernetes service to your replicationController at any time by referencing the Shippable pod labels, or by adding your own custom labels to your manifest.

## Instructions

<img src="/images/deploy/usecases/deploy_kube_lb.png"/>

###1. Add a loadBalancer resource.

Add a [loadBalancer](/platform/workflow/resource/loadbalancer/#loadbalancer) resource to your [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file. As an example:

```
resources:

  - name: app_lb
    type: loadBalancer
    integration: op_int
    pointer:
      sourceName: "apploadbalancer"
      method: LoadBalancer
      namespace: shippable
      clusterName: "multiple-zones-cluster"
    version:
      ports:
        - name: testport
          protocol: TCP
          port: 80
      selector:
        shippable.manifestName: "app_service_def"
        shippable.jobName: "app_deploy_job"
```

The loadBalancer resource supports a range of fields, allowing you to set almost any field that you'd want. Complete reference [is here](/platform/workflow/resource/loadbalancer/#loadbalancer).

Shippable adds the values of `shippable.manifestName` and `shippable.jobName` as labels to every pod spec for Kubernetes. These need to be set as follows:

* `shippable.manifestName`: "name of your manifest job that was deployed"
* `shippable.jobName`: "name of the deploy job that deployed your manifest"

By using both the manifest name and job name as selectors, Kubernetes will always pinpoint the exact pods from the replicationController that was deployed.

If you want to set custom labels for your loadBalancer, check out [instructions for specifying custom labels](#custom-labels).

###2. Add a `provision` job.

The [provision](/platform/workflow/job/provision/) job is used to create ancillary objects like load balancers on Container Orchestration Platforms like GKE and Kubernetes.

Add the following yml block to your [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file.

```
jobs:

  - name: app_provision   #friendly name for job
    type: provision
    steps:
      - IN: app_lb        #name of load balancer you created in step 1
```

This job will use the `integration` associated with your `loadBalancer` resource to make API calls to your cluster to create the loadBalancer on your Kubernetes cluster with all of the settings you requested.

You can use a single provision job to provision multiple loadBalancers. Just include a separate `IN` statement with a separate resource for each service you plan to create.

## Specifying different labels

If you have another set of labels that you'd like to use instead, you can use a [dockerOptions resource](/platform/workflow/resource/dockeroptions) to set your own labels. Labels will be set on the pods.

**Steps**

* Add a [dockerOptions resource](/platform/workflow/resource/dockeroptions) to your [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file.

```
resources:

  - name: app_labels
    type: dockerOptions
    version:
      labels:
        name: "api"
        environment: "test"
```

* Specify `app_labels` as an additional input to the [manifest job](/platform/workflow/job/manifest). For example, the yml snippet for our [single container application](/deploy/continuous-delivery-single-container-docker-application/) would look like this:

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

* Update the `selector` section in the `loadBalancer` resource to match the labels you used in `dockerOptions`. The yml snippet for our [single container application](/deploy/continuous-delivery-single-container-docker-application/) would look like this:

```
resources:

  - name: app_lb
    type: loadBalancer
    integration: op_int
    pointer:
      sourceName: "apploadbalancer"
      method: LoadBalancer
      namespace: shippable
      clusterName: "multiple-zones-cluster"
    version:
      ports:
        - name: testport
          protocol: TCP
          port: 80
      selector:
        name: "api"
        environment: "test"
```

## Ask questions on Chat

Feel free to engage us on Chat if you have any questions about this document. Simply click on the Chat icon on the bottom right corner of this page and someone from our customer success team will get in touch with you.

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
