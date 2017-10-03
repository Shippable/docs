page_main_title: Kubernetes
main_section: Platform
sub_section: Integrations
page_title: Kubernetes integration

# Kubernetes Integration
Available under the Integration Family: **deploy**

`Kubernetes` Integration is used to connect Shippable DevOps Assembly Lines platform to self-hosted Kubernetes so that you can deploy Docker based applications.

You can create this from the integrations page by following instructions here: [Adding an account integration](/platform/management/integrations/#adding-an-account-integration).

This is the information you would require to create this integration:

* **Name** -- friendly name for the integration
* **Cluster Access Type** -- dropdown that sets how Shippable accesses your cluster
	* Kubernetes Master -- when your master server is publicly accessible
		* KubeConfig File -- Configuration file to access Kubernetes cluster
	* Bastion Host -- When you need to access Kube master thats behind a firewall, then you can use a publicly accessible bastion host on the edge to get through the firewall
		* Nodes -- IP address of the Bastion Host
		* KubeConfig File -- Configuration file to access Kubernetes cluster  

## Resources that use this Integration
Resources are the building blocks of assembly lines and some types of resources refer to integrations by their names. The following resource types can be created with a `Kubernetes` integration.

* [cluster](/platform/workflow/resource/cluster)
* [integration](/platform/workflow/resource/integration)

## Default Environment Variables
When you create a resource with this integration, and use it as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

| Environment variable						            | Description      |
| ------			 							            |----------------- |
| `<NAME>`\_INTEGRATION\_NAME          	            | Name supplied in the integration |
| `<NAME>`\_INTEGRATION\_CLUSTERACCESSTYPE          | Access Type supplied in the integration |
| `<NAME>`\_INTEGRATION\_MASTERKUBECONFIGCONTENT    | Kube config when kube master was chosen as access type |
| `<NAME>`\_INTEGRATION\_BASTIONKUBECONFIGCONTENT   | Kube config when bastion was chosen as access type |
| `<NAME>`\_INTEGRATION\_BASTIONHOSTIP              | Bastion Host IP when bastion was chosen as access type |
| `<NAME>`\_INTEGRATION\_BASTIONPRIVATEKEY          | Private Key to access the bastion host |
| `<NAME>`\_INTEGRATION\_BASTIONPUBLICKEY           | Public Key to access the bastion host |

## Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [RunSh Job](/platform/workflow/job/runsh)
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
