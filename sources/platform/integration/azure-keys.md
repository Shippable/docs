page_main_title: Azure DC/OS
main_section: Platform
sub_section: Integrations
page_title: Azure DC/OS integration

# Microsoft Azure Integration

The [Microsoft Azure](https://azure.microsoft.com/en-us/) Integration is used to connect Shippable DevOps Assembly Lines platform to Microsoft Azure to manage cloud services and entities.

## Adding account integration

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

### Default Environment Variables
When you create a resource with this integration, and use it as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

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
