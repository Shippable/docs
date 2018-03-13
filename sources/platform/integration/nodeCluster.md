page_main_title: Node Cluster
main_section: Platform
sub_section: Integrations
page_title: Node cluster integration
page_description: How to create and use a Node Cluster Integration that is used to connect Shippable DevOps Assembly Lines platform to a cluster of VMs and deploy apps to the entire cluster

# Node Cluster Integration

The **Node Cluster** Integration is used to connect Shippable DevOps Assembly Lines platform to a cluster of VMs and deploy apps to the entire cluster.

## Adding account integration

You can add this account integration by following steps on the [Adding an account integration](/platform/tutorial/integration/howto-crud-integration/) page.

Here is the information you need to create this integration:

* **Integration type** -- **Node Cluster**
* **Name** -- choose a friendly name for the integration
* **Nodes** -- The IP addresses of the nodes in the cluster

## Usage in Assembly Lines

The Node Cluster integration can be used in the following [resources](/platform/workflow/resource/overview/):

* [integration](/platform/workflow/resource/integration)
* [cluster](/platform/workflow/resource/cluster)


### Default Environment Variables
When you create a resource with this integration, and use it as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. Any numbers at the beginning of the name are also removed to create a valid variable. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

| Environment variable						| Description      |
| ------			 							|----------------- |
| `<NAME>`\_INTEGRATION\_NAME				| Name supplied in the integration |
| `<NAME>`\_INTEGRATION\_NODES_0        | List of Nodes 0 to N supplied in the integration |
| `<NAME>`\_INTEGRATION\_PRIVATEKEY		| Private key used to access VMs |
| `<NAME>`\_INTEGRATION\_PUBLIKEY			| Public key used to access VMs |

### Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [RunSh Job](/platform/workflow/job/runsh)
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
