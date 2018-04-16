page_main_title: Azure DC/OS
main_section: Platform
sub_section: Integrations
page_title: Azure DC/OS integration
page_description: How to create and use an Azure DC/OS Integration in Shippable

# Azure DC/OS Integration

The [Azure DC/OS](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/mesosphere.dcos) integration is used to connect Shippable DevOps Assembly Lines platform to Azure DC/OS to deploy Docker based applications.

## Creating an Account Integration

You can add an account integration to Shippable by following steps on the [Adding an account integration](/platform/tutorial/integration/howto-crud-integration/) page.

Here is the information you need to create this integration:

* **Integration type** -- **Azure DC/OS**
* **Name** -- choose a friendly name for the integration
* **Username** -- Username to login to Mesos master VM
* **URL** -- DNS or IP address of Mesos master VM


## Usage in Assembly Lines

The Azure DC/OS integration can be used in the following [resources](/platform/workflow/resource/overview/):

* [cluster](/platform/workflow/resource/cluster)
* [integration](/platform/workflow/resource/integration)

The main scenarios for using this integration can be found in the [Deploy Docker applications docs](http://docs.shippable.com/deploy/deploy-docker-overview/).

### Default Environment Variables
When you create a resource with this integration, and use it as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. Any numbers at the beginning of the name are also removed to create a valid variable. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

| Environment variable						| Description        |
| ------			 							|----------------- |
| `<NAME>`\_INTEGRATION\_USERNAME			| Username supplied in the integration |
| `<NAME>`\_INTEGRATION\_URL   			| URL supplied in the integration |

### Shippable Utility Functions
The platform also provides a command line utility called [`shipctl`](/platform/tutorial/workflow/using-shipctl/) that can be used to retrieve the values of these environment variables.

The specific function that can be used in the jobs yml is: `shipctl get_integration_resource_field <resource name> <field name>`.

Here is a table that provides the mapping from the environment variable to the field name.

| Environment variable						| Field Name        |
| ------			 							|----------------- |
| `<NAME>`\_INTEGRATION\_USERNAME			| username |
| `<NAME>`\_INTEGRATION\_URL   			| url |

More information on other utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [RunSh Job](/platform/workflow/job/runsh)
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
