page_main_title: Docker Registry
main_section: Platform
sub_section: Integrations
page_title: Docker Registry integration
page_description: How to create and use a Docker Registry Integration in Shippable

# Docker Registry Integration

The [Docker Registry](https://docs.docker.com/registry/deploying/) Integration is used to connect Shippable DevOps Assembly Lines platform to Docker Hub, Docker Trusted Registry or privately hosted Docker Hub so that you can pull and push Docker images.

## Creating an Account Integration

You can add this account integration by following steps on the [Adding an account integration](/platform/tutorial/integration/howto-crud-integration/) page.

Here is the information you need to create this integration:

* **Integration type** -- **Docker Registry**
* **Name** -- choose a friendly name for the integration
* **URL** -- an optional field which will default to Docker Hub if left empty. To use with Docker Trusted Registry or Docker Private Registry fill with the location of your private registry. Format `https://foo.com`
* **Username** -- login to your Docker Registry Account
* **Password** -- password of your Docker Registry Account
* **Email** -- email of your Docker Registry Account

## Usage in CI

* [Using a custom image for CI](/ci/custom-docker-image/)
* [Pushing artifacts to Docker Hub](/ci/push-docker-registry/)

## Usage in Assembly Lines

The Docker Registry integration can be used in the following [resources](/platform/workflow/resource/overview/):

* [image](/platform/workflow/resource/image)
* [integration](/platform/workflow/resource/integration)

### Default Environment Variables
When you create a resource with this integration, and use it as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. Any numbers at the beginning of the name are also removed to create a valid variable. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_INTEGRATION\_URL   			| URL supplied in the integration |
| `<NAME>`\_INTEGRATION\_USERNAME   		| Username supplied in the integration |
| `<NAME>`\_INTEGRATION\_PASSWORD			| Password supplied in the integration |
| `<NAME>`\_INTEGRATION\_EMAIL			| Email supplied in the integration |

### Shippable Utility Functions
The platform also provides a command line utility called [`shipctl`](/platform/tutorial/workflow/using-shipctl/) that can be used to retrieve the values of these environment variables.

The specific function that can be used in the jobs yml is: `shipctl get_integration_resource_field <resource name> <field name>`.

Here is a table that provides the mapping from the environment variable to the field name.

| Environment variable						| Field Name        |
| ------			 							|----------------- |
| `<NAME>`\_INTEGRATION\_URL   			| url |
| `<NAME>`\_INTEGRATION\_USERNAME   		| username |
| `<NAME>`\_INTEGRATION\_PASSWORD			| password |
| `<NAME>`\_INTEGRATION\_EMAIL			| email |

More information on other utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [RunSh Job](/platform/workflow/job/runsh)
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
