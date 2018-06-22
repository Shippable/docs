page_main_title: Docker Cloud
main_section: Platform
sub_section: Integrations
page_title: Docker cloud integration
page_description: How to create and use a Docker Cloud Integration in Shippable

# Docker Cloud integration

The [Docker Cloud](https://cloud.docker.com/) Integration is used to connect Shippable DevOps Assembly Lines platform to Docker Cloud so that you can deploy Docker based apps to Docker Cloud.

## Creating an Account Integration

You can add this account integration by following steps on the [Adding an account integration](/platform/tutorial/integration/howto-crud-integration/) page.

Here is the information you need to create this integration:

* **Integration type** -- **Docker Cloud**
* **Name** -- choose a friendly name for the integration
* **Username** -- login to your Docker Cloud Account
* **Token** -- API Token to deploy to your Docker Cloud Account

## Usage in Assembly Lines

The Docker Cloud integration can be used in the following [resources](/platform/workflow/resource/overview/):

* [cluster](/platform/workflow/resource/cluster)
* [integration](/platform/workflow/resource/integration)

The main scenario for using this integration is to [Deploy an application to Docker Cloud](/deploy/continuous-delivery-single-container-docker-application/).

### Default Environment Variables
When you create a resource with this integration, and use it as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. Any numbers at the beginning of the name are also removed to create a valid variable. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_INTEGRATION\_USERNAME   		| Username supplied in the integration |
| `<NAME>`\_INTEGRATION\_TOKEN			| Password supplied in the integration |

### Shippable Utility Functions
The platform also provides a command line utility called [`shipctl`](/platform/tutorial/workflow/using-shipctl/) that can be used to retrieve the values of these environment variables.

The specific function that can be used in the jobs yml is: `shipctl get_integration_resource_field <resource name> <field name>`.

Here is a table that provides the mapping from the environment variable to the field name.

| Environment variable						| Field Name        |
| ------			 							|----------------- |
| `<NAME>`\_INTEGRATION\_USERNAME   		| username |
| `<NAME>`\_INTEGRATION\_TOKEN			| token |

More information on other utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading

* [Deploy an application to Docker Cloud](/deploy/continuous-delivery-single-container-docker-application/)
