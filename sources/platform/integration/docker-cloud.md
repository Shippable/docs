page_main_title: Docker Cloud
main_section: Platform
sub_section: Integrations
page_title: Docker cloud integration

# Docker Cloud integration

The [Docker Cloud](https://cloud.docker.com/) Integration is used to connect Shippable DevOps Assembly Lines platform to Docker Cloud so that you can deploy Docker based apps to Docker Cloud.

## Adding account integration

You can add this account integration by following steps on the [Adding an account integration](/platform/management/integrations/#adding-an-account-integration) page.

Here is the information you need to create this integration:

* **Integration Family** -- **deploy**
* **Integration type** -- **Docker Cloud**
* **Name** -- choose a friendly name for the integration
* **Username** -- login to your Docker Cloud Account
* **Token** -- API Token to deploy to your Docker Cloud Account


## Usage in Assembly Lines

The Docker Cloud integration can be used in the following [resources](/platform/workflow/resource/overview/):

* [cluster](/platform/workflow/resource/cluster)
* [integration](/platform/workflow/resource/integration)

The main scenario for using this integration is to [Deploy an application to Docker Cloud](/deploy/docker-cloud/).

### Default Environment Variables
When you create a resource with this integration, and use it as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_INTEGRATION\_USERNAME   		| Username supplied in the integration |
| `<NAME>`\_INTEGRATION\_TOKEN			| Password supplied in the integration |

### Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading

* [Deploy an application to Docker Cloud](/deploy/docker-cloud/)
