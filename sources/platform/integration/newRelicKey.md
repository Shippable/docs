page_main_title: NewRelic
main_section: Platform
sub_section: Configuration
sub_sub_section: Integrations
page_title: NewRelic Integration
page_description: How to create and use an NewRelic Integration in Shippable

# NewRelic Integration

NewRelic integration is used to connect Shippable to [NewRelic](https://newrelic.com/) for recording deployments done via Shippable.

## Creating an Integration

You can add this integration by following steps on the [Adding an integration](/platform/tutorial/integration/subscription-integrations/) page.

Here is the information you need to create this integration:

* **Integration type** -- NewRelic
* **Name** -- choose a friendly name for the integration
* **Url**: NewRelic API Endpoint
* **Token**: NewRelic API Token

## Usage in Assembly Lines

The NewRelic integration can be used in the following [resources](/platform/workflow/resource/overview/):

* [integration](/platform/workflow/resource/integration)
* [notification](/platform/workflow/resource/notification)

## Default Environment Variables
When you create a resource with this integration, and use it as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. Any numbers at the beginning of the name are also removed to create a valid variable. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

| Environment variable					| Description                         |
| ------------- 						|------------------------------------ |
| `<NAME>`\_INTEGRATION\_URL			| The API Endpoint used to connect to NewRelic |
| `<NAME>`\_INTEGRATION\_TOKEN			| The Token used to connect to NewRelic |

## Shippable Utility Functions
The platform also provides a command line utility called [`shipctl`](/platform/tutorial/workflow/using-shipctl/) that can be used to retrieve the values of these environment variables.

The specific function that can be used in the jobs yml is: `shipctl get_integration_resource_field <resource name> <field name>`.

Here is a table that provides the mapping from the environment variable to the field name.

| Environment variable					| Field Name        |
| ------			 					|----------------- |
| `<NAME>`\_INTEGRATION\_URL			| url |
| `<NAME>`\_INTEGRATION\_TOKEN			| token |

More information on other utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [RunSh Job](/platform/workflow/job/runsh)
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)