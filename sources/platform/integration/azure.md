page_main_title: Microsoft Azure (Deprecated)
main_section: Platform
sub_section: Integrations
sub_sub_section: Deprecated
page_title: Microsoft Azure integration (Deprecated)
page_description: How to create and use a Microsoft Azure Integration in Shippable

# Microsoft Azure Integration

The [Microsoft Azure](https://azure.microsoft.com/en-us/) Integration is used to connect Shippable DevOps Assembly Lines platform to Microsoft Azure to manage cloud services and entities.

## Adding account integration

Since this integration has been deprecated, you cannot create new account integrations for this, you can only edit/delete the exisiting JFrog artifactory integrations. You can use the [Azure Keys](/platform/integration/azure-keys) instead.

## Usage in Assembly Lines

The Microsoft Azure integration can be used in the following [resources](/platform/workflow/resource/overview/):

* [cluster](/platform/workflow/resource/cluster)
* [integration](/platform/workflow/resource/integration)

### Default Environment Variables
When you create a resource with this integration, and use it as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. Any numbers at the beginning of the name are also removed to create a valid variable. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

| Environment variable						| Description        |
| ------			 							|----------------- |
| `<NAME>`\_INTEGRATION\_NAME   			| Name supplied in the integration |
| `<NAME>`\_INTEGRATION\_SUBSCRIPTIONID	| Subscription ID supplied in the integration |
| `<NAME>`\_INTEGRATION\_USERNAME			| Username supplied in the integration |
| `<NAME>`\_INTEGRATION\_PASSWORD			| Password supplied in the integration |

### Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [RunSh Job](/platform/workflow/job/runsh)
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
