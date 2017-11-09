page_main_title: Joyent Triton
main_section: Platform
sub_section: Integrations
page_title: Joyent Triton integration

# Joyent Triton Integration

The [Joyent Triton](https://www.joyent.com/triton/compute) Integration is used to connect Shippable DevOps Assembly Lines platform to Joyent Triton Container Service to deploy Docker-based applications.

## Adding account integration

You can add this account integration by following steps on the [Adding an account integration](/platform/management/integrations/#adding-an-account-integration) page.

Here is the information you need to create this integration:

* **Integration type** -- **Joyent Triton**
* **Name** -- choose a friendly name for the integration
* **Username** -- Username to login to Mesos master VM
* **Validity Period** -- Certificate validity in number of days

## Usage in Assembly Lines

The Joyent Triton integration can be used in the following [resources](/platform/workflow/resource/overview/):

* [cluster](/platform/workflow/resource/cluster)
* [integration](/platform/workflow/resource/integration)

## Default Environment Variables
When you create a resource with this integration, and use it as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

| Environment variable						| Description      |
| ------			 							|----------------- |
| `<NAME>`\_INTEGRATION\_USERNAME			| Username supplied in the integration |
| `<NAME>`\_INTEGRATION\_VALIDITYPERIOD | Validity period supplied in the integration |
| `<NAME>`\_INTEGRATION\_CERTIFICATES   | Certificates created internally to connect to Triton |
| `<NAME>`\_INTEGRATION\_PRIVATEKEY		| Private key used to access Triton |

## Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [RunSh Job](/platform/workflow/job/runsh)
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
