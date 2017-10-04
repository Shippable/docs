page_main_title: Amazon ECR
main_section: Platform
sub_section: Integrations
page_title: Amazon ECR integration

# Digital Ocean Integration

Available under the Integration Family: **generic**

`Digital Ocean` Integration is used to connect Shippable DevOps Assembly Lines platform to [Digital Ocean](https://www.digitalocean.com/) to interact with its cloud services in order to provision machines.

You can add this account integration by following steps on the [Adding an account integration](/platform/management/integrations/#adding-an-account-integration) page.

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

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

| Environment variable						         | Description        |
| ------			 							         |----------------- |
| `<NAME>`\_INTEGRATION\_NAME       | Name supplied in the integration |
| `<NAME>`\_INTEGRATION\_APITOKEN   | API Token supplied in the integration |

## Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [RunSh Job](/platform/workflow/job/runsh)
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
