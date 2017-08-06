page_main_title: Kubernetes
main_section: Platform
sub_section: Integrations
page_title: Kubernetes integration

# Kubernetes Integration
Available under the Integration Family: **deploy**

`Kubernetes` Integration is used to connect Shippable DevOps Assembly Lines platform to self-hosted Kubernetes so that you can deploy Docker based applications

You can create this from the integrations page. This is the information you would require to create this integration

* **Name** -- friendly name for the integration
* **Cluster Access Type** -- dropdown that sets how Shippables accesses your cluster
	* Kubernetes Master -- when your master server is publicly accessible
		* KubeConfig File -- Configuration file to access Kubernetes cluster
	* Bastion Host -- When you need to access Kube master thats behind a firewall, then you can use a bastion host on the edge publicly accessible to get through the firewall
		* Nodes -- IP address of the Bastion Host
		* KubeConfig File -- Configuration file to access Kubernetes cluster  

## Resources that use this Integration
Resources are the bulding blocks of assembly lines and some types of resource refer to Integrations by their name. The following Resources Types can created with `Kubernetes` Integration 

* [cluster](/workflow/platform/resource/cluster)
* [provision](/workflow/platform/resource/provision)
* [integration](/workflow/platform/resource/integration)

## Default Environment Variables
When you create a Resource with this integration, and use it as an `IN` or `OUT` into a Job that can execute user defined scripts, a set of environment variables are configured by the platform that may be useful to set the context before user defined scripts execute as part of the Job. These are variables available when this Resource is used

`<NAME>` is the the friendly name of the Resource

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
To make it easy to GET and SET with these Environment Variables, the platform provides a bunch of utility functions so that you don't need to perform string concatenations etc. to work with this values.

How to use these utility functions are [documented here](/platform/tutorial/workflow/howto-use-shipctl)

## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [RunSh Job](/platform/workflow/job/runsh)
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
