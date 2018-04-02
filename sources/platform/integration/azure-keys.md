page_main_title: Microsoft Azure
main_section: Platform
sub_section: Integrations
page_title: Microsoft Azure integration
page_description: How to create and use a Microsoft Azure Integration in Shippable

# Microsoft Azure Integration

The [Microsoft Azure](https://azure.microsoft.com/en-us/) Integration is used to connect Shippable DevOps Assembly Lines platform to Microsoft Azure to manage cloud services and entities.

## Creating an Account Integration

You can add this account integration by following steps on the [Adding an account integration](/platform/tutorial/integration/howto-crud-integration/) page.

Here is the information you need to create this integration:

* **Integration type** -- Microsoft Azure
* **Name** -- choose a friendly name for the integration
* **AppId** -- AppId of your application.
* **Password** -- Password of Active Directory User
* **Tenant** -- Active Directory Tenant name

This integration uses service principal for configuring cli. [Here](https://docs.microsoft.com/en-us/cli/azure/create-an-azure-service-principal-azure-cli?view=azure-cli-latest) is some more info about service principal and how to create them.

## Usage in Assembly Lines

The Microsoft Azure integration can be used in the following [resources](/platform/workflow/resource/overview/):

* [integration](/platform/workflow/resource/integration)
* [cliConfig](/platform/workflow/resource/cliconfig/)
* [cluster](/platform/workflow/resource/cluster/)
* [loadBalancer](/platform/workflow/resource/loadbalancer/)

### Roles
There are two main ways to use Azure Keys on Shippable:
1. automated, managed Kubernetes deployments (and load balancing) via `deploy` or `provision` jobs
2. Azure CLI configuration via `cliConfig` resources

For managed Kubernetes deployments via [deploy jobs](/platform/workflow/job/deploy), Shippable assumes that the service principal given has the equivalent of a "Contributor" role on the application that contains the AKS cluster.  Shippable will use the Azure CLI to perform a `get-credentials` call, after which all deployment management will happen via `kubectl` commands.

For `cliConfig` resources, you should make sure that your service principal has adequate permission to perform whatever actions you plan to take in your custom script.  This could mean ACR reader role to pull images, AKS contributor to create deployments, etc.  If your `cliConfig` is using the `aks` scope, then Shippable will automatically perform an `aks get-credentials` call, so your active directory role needs provide adequate permission (such as "Contributor").

### Default Environment Variables
When you create a resource with this integration, and use it as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. Any numbers at the beginning of the name are also removed to create a valid variable. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

| Environment variable						| Description        |
| ------			 							|----------------- |
| `<NAME>`\_INTEGRATION\_NAME   			| Name supplied in the integration |
| `<NAME>`\_INTEGRATION\_APPID	| AppId supplied in the integration |
| `<NAME>`\_INTEGRATION\_PASSWORD			| Password supplied in the integration |
| `<NAME>`\_INTEGRATION\_TENANT			| Tenant supplied in the integration |

### Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [RunSh Job](/platform/workflow/job/runsh)
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
