page_main_title: Amazon ECR
main_section: Platform
sub_section: Integrations
page_title: Amazon ECR integration
page_description: How to create and use a Digital Ocean Integration in Shippable

# Digital Ocean Integration

Available under the Integration Family: **generic**

`Digital Ocean` Integration is used to connect Shippable DevOps Assembly Lines platform to [Digital Ocean](https://www.digitalocean.com/) to interact with its cloud services in order to provision machines.

You can add this account integration by following steps on the [Adding an account integration](/platform/tutorial/integration/howto-crud-integration/) page.

Here is the information you need to create this integration:

* **Name** -- friendly name for the integration
* **API Token** -- Token to connect to the Digital Ocean API

## Usage

After you create the account integration, it can be used in the following scenarios:

**Assembly Lines**

The following [resource](/platform/workflow/resource/overview/) types can be created with an `Digital Ocean` integration for use in Assembly Lines config.

* [integration](/platform/workflow/resource/integration)

## Default Environment Variables
When you create a resource with this integration, and use it as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. Any numbers at the beginning of the name are also removed to create a valid variable. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

| Environment variable						         | Description        |
| ------			 							         |----------------- |
| `<NAME>`\_INTEGRATION\_NAME       | Name supplied in the integration |
| `<NAME>`\_INTEGRATION\_APITOKEN   | API Token supplied in the integration |

## Shippable Utility Functions
The platform also provides a command line utility called [`shipctl`](/platform/tutorial/workflow/using-shipctl/) that can be used to retrieve the values of these environment variables.

The specific function that can be used in the jobs yml is: `shipctl get_integration_resource_field <resource name> <field name>`.

Here is a table that provides the mapping from the environment variable to the field name.

| Environment variable						| Field Name        |
| ------			 							|----------------- |
| `<NAME>`\_INTEGRATION\_APITOKEN   | apiToken |

More information on other utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [RunSh Job](/platform/workflow/job/runsh)
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
