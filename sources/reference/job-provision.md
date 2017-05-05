page_main_title: provision
main_section: Reference
sub_section: Jobs
page_title: Unified Pipeline Jobs - provision
page_description: List of supported jobs
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# provision

Provision jobs are used to create objects on a [supported Container Service](integrations-overview/#container-services). When provision jobs are deleted, the resulting objects are also deleted from the container service.

Provision jobs are supported for

- Google Container Engine (GKE) services.
- Kubernetes services.

A provision job is configured in the `shippable.jobs.yml` file. Here is an example:

```
jobs:
  - name: <string>                                                   #required
    type: provision                                                  #required
    steps:
      - IN: <name of the resource to be provisioned>                 #required
      - IN: <additional resource to be provisioned>                  #optional

```
- `name` is a text string of your choice. This will appear in the visualization of this job in the SPOG view.  If you have spaces in your name, you'll need to surround the value with quotes. However, as a best practice, we recommend not including spaces in your names.
- `type` is always set to `provision`.
- `IN` steps: Each `IN` step specifies the `name` of a resource you wish to provision. Provision jobs take one or more resources as inputs. The resource to be provisioned is defined in the `shippable.resources.yml` file, and must be one of our supported objects (listed below).


## Supported Objects

The resources you can provision vary by container service. Below is a list of currently supported objects for each service.

### Google Container Engine
#### Services
All four Kubernetes [service](https://kubernetes.io/docs/user-guide/services/) types are supported: LoadBalancer, NodePort, ExternalName, and ClusterIP. Services are configured as [loadBalancer](resource-loadbalancer/) resources in the `shippable.resources.yml`.

### Kubernetes
#### Services
All four Kubernetes [service](https://kubernetes.io/docs/user-guide/services/) types are supported: LoadBalancer, NodePort, ExternalName, and ClusterIP. Services are configured as [loadBalancer](resource-loadbalancer/) resources in the `shippable.resources.yml`.
