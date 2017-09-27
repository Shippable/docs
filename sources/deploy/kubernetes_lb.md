page_main_title: Attaching a load balancer to a Kubernetes cluster
main_section: Deploy
sub_section: Using load balancers

# Attaching a load balancer to a Kubernetes cluster
Load balancers are a must-have for any containerized application that wants to run on a cluster.
You can easily add a load balancer and specify the pods to which it should direct traffic. This makes it easy to repeatedly deploy new services while always making them accessible via the load balancer, thus reducing down time.

## Steps for attaching a Load balancer

<img src="/images/deploy/usecases/deploy_kube_lb.png"/>

###1. Add a load balancer resource called `app_lb`.

* **Description:** `app_lb` represent a [loadbalancer](/platform/workflow/resource/loadbalancer/#loadbalancer) resource. The loadBalancer resource supports a range of fields in this case, allowing you to set almost any field that you'd want.

    Shippable adds the following two labels to every pod spec for Kubernetes clusters:

    ```
    "shippable.manifestName": "<name of your manifest job that was deployed>"
    "shippable.jobName": "<name of the deploy job that deployed your manifest>"
    ```

    Shippable adds the following two labels to every pod spec for GKE:

    ```
    "name": "<name of your manifest job that was deployed>"
    "jobName": "<name of the deploy job that deployed your manifest>"
    ```

    By using both the manifestName and jobName as selectors, the GKE service will always pinpoint the exact pods from the replicationController that was deployed.

* **Required:** Yes.

**Steps**

Add the following yml block to your [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/) file.

**Kubernetes**
```
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
    selector:
      shippable.manifestName: "app_service_def"
      shippable.jobName: "app_deploy_job"
```

**GKE**
```
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
    selector:
      name: "app_service_def"
      jobName: "app_deploy_job"
```

## Specifying different labels

If you have another set of labels that you'd like to use instead, you can use a [dockerOptions resource](/platform/workflow/resource/dockeroptions) to set your own labels.

**Steps**

- Add the following yml block to your [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/) file.

```
- name: app_labels
  type: dockerOptions
  version:
    labels:
      name: "api"
      environment: "test"
```

- Specify `app_labels` as an additional input to [app_service_def](/deploy/deploy-mvp-1/#4-define-app_service_def).

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

- Update the selector in the `app_lb` load balancer resource.

```
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
    selector:
      name: "api"
      environment: "test"
```

###2. Add the `app_provision` job.

* **Description:** app_provision is a [Provision](/platform/workflow/job/provision/) job used to create ancillary objects like load balancers on Container Orchestration Platforms like GKE and Kubernetes.

* **Required:** Yes.

**Steps**

Add the following yml block to your [shippable.jobs.yml](/platform/tutorial/workflow/shippable-jobs-yml/) file.

```
- name: app_provision
  type: provision
  steps:
    - IN: app_lb
```

## Ask questions on Chat

Feel free to engage us on Chat if you have any questions about this document. Simply click on the Chat icon on the bottom right corner of this page and someone from our customer success team will get in touch with you.

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
