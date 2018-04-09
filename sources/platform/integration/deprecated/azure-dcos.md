page_main_title: Azure DC/OS (Deprecated)
main_section: Platform
sub_section: Integrations
sub_sub_section: Deprecated
page_title: Azure DC/OS integration (Deprecated)
page_description: How to create and use an AWS IAM Integration in Shippable

# Azure DC/OS Integration (Deprecated)

## Deprecation Note
This integration has been deprecated. A new integration called [azureDcosKey](/platform/integration/azureDcosKey) of type generic has been introduced which can be used instead.

If you have any existing Azure DC/OS account integrations of type deploy, you can continue to use them.

---

The [Azure DC/OS](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/mesosphere.dcos) integration is used to connect Shippable DevOps Assembly Lines platform to Azure DC/OS to deploy Docker based applications.

## Creating an Account Integration

Since this integration has been deprecated, you cannot create new account integrations for it, but can only edit/delete the exisiting AZURE_DCOS integrations. You can use the [azureDcosKey](/platform/integration/azureDcosKey) integration instead which will work exactly the same way as the deprecated AZURE DC/OS integration.

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
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [RunSh Job](/platform/workflow/job/runsh)
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
