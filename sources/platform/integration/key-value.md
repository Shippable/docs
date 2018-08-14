page_main_title: Key-value
main_section: Platform
sub_section: Configuration
sub_sub_section: Integrations
page_title: Key-value integration
page_description: How to create and use a Key-Value Pair Integration in Shippable

# Key-Value Pair Integration

`Key-Value Pair` Integration is used to inject configurations into Shippable DevOps Assembly Lines activities.

## Creating an Integration

You can add this integration by following steps on the [Adding an integration](/platform/tutorial/integration/subscription-integrations/) page.

Here is the information you need to create this integration:

* **Integration type** -- **Key-value**
* **Name** -- choose a friendly name for the integration
* **Key Values** -- A collection of Key-Values

## Usage in CI

You can use a Key-value integration with CI by adding it as an `IN` to the `runCI` job or by adding it to your **shippable.yml** as described [here](/platform/tutorial/integration/howto-use-key-value-in-runci/).

You can also set key-value pairs as [environment variables in CI](/ci/env-vars/#usrEnv).

## Usage in Assembly Lines

The Key-value integration can be used in the following [resources](/platform/workflow/resource/overview/):

* [integration](/platform/workflow/resource/integration)

### Default Env Vars

When you create a resource with this integration, and use it as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. Any numbers at the beginning of the name are also removed to create a valid variable. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_INTEGRATION\_NAME   			| Name supplied in the integration |
| MY_KEY_1											| Name of the First Key defined and will have value set |
| MY_KEY_N											| Name of the Nth Key defined and will have value set |

### Shippable Utility Functions
The platform also provides a command line utility called [`shipctl`](/platform/tutorial/workflow/using-shipctl/) that can be used to retrieve the values of these environment variables.

The specific function that can be used in the jobs yml is: `shipctl get_integration_resource_field <resource name> <field name>`.

Here is a table that provides the mapping from the environment variable to the field name.

| Environment variable						| Field Name        |
| ------			 							|----------------- |
| MY_KEY_1											| keyValue_key_1 |
| MY_KEY_N											| keyValue_key_N |

More information on other utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [RunSh Job](/platform/workflow/job/runsh)
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
