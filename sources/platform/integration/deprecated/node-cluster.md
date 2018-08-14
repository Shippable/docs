page_main_title: Node Cluster (Deprecated)
main_section: Platform
sub_section: Integrations
sub_sub_section: Deprecated
page_title: Node cluster integration (Deprecated)

# Node Cluster Integration (Deprecated)

## Deprecation Note
This integration has been deprecated. A new integration called [nodeCluster](/platform/integration/nodeCluster) of type generic has been introduced which can be used instead.

If you have any existing Node Cluster integrations of type deploy, you can continue to use them.

---

The **Node Cluster** Integration is used to connect Shippable DevOps Assembly Lines platform to a cluster of VMs and deploy apps to the entire cluster.

## Creating an Integration

Since this integration has been deprecated, you cannot create new integrations for it, but can only edit/delete the exisiting Node Cluster integrations. You can use the [nodeCluster](/platform/integration/nodeCluster) integration of type generic instead which will work exactly the same way as the deprecated Node Cluster integration of type deploy.


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
