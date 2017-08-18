page_main_title: SSH Keys
main_section: Platform
sub_section: Integrations
page_title: SSH keys integration

# SSH Keys Integration

Available under the Integration Family: **Keys**

`SSH Key` Integration is used to connect Shippable DevOps Assembly Lines platform to VMs that allow SSH based auth. This is typically used to SSH in and then run activities on the machine. Tools like Terraform and Ansible use this to execute scripts on a machine.

You can create this from the integrations page. This is the information you would require to create this integration:

* **Name** -- friendly name for the integration
* **Public Key** -- Public SSH Key
* **Private Key** -- Private SSH Key

You can create your own keys and store them here or use the Generate Keys button to create a new one.

## Resources that use this Integration
Resources are the building blocks of assembly lines and some types of resources refer to integrations by their names. The following resource types can be created with an `SSH Key` integration.

* [integration](/platform/workflow/resource/integration)

## Default Environment Variables
When you create a resource with this integration, and use it as an `IN` or `OUT` for a job that can execute user defined scripts, a set of environment variables are configured by the platform that may be useful to set the context before user defined scripts execute as part of the job. These variables are available when a resource with this integration type is used.

`<NAME>` is the the friendly name of the resource.

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_INTEGRATION\_NAME   			| Name supplied in the integration |
| `<NAME>`\_INTEGRATION\_PUBLICKEY		| Public Key supplied in the integration |
| `<NAME>`\_INTEGRATION\_PRIVATEKEY		| Private Key supplied in the integration |
| `<NAME>`\_INTEGRATION\_PUBLIC\_KEY\_PATH		| Path of a file containing the public key supplied in the integration |
| `<NAME>`\_INTEGRATION\_PRIVATE\_KEY\_PATH		| Path of a file containing the private key supplied in the integration |

## Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/howto-use-shipctl).

## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [RunSh Job](/platform/workflow/job/runsh)
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
