page_main_title: Docker Hub
main_section: Platform
sub_section: Integrations
page_title: Docker Hub integration

# Docker Hub Integration

The [Docker Hub](https://hub.docker.com/) Integration is used to connect Shippable DevOps Assembly Lines platform to Docker Hub so that you can pull and push Docker images.

## Adding account integration

You can add this account integration by following steps on the [Adding an account integration](/platform/management/integrations/#adding-an-account-integration) page.

Here is the information you need to create this integration:

* **Integration Family** -- **hub**
* **Integration type** -- **Docker Hub**
* **Name** -- choose a friendly name for the integration
* **Username** -- login to your Docker Hub Account
* **Password** -- password of your Docker Hub Account
* **Email** -- email of your Docker Hub Account

## Usage in CI

* [Using a custom image for CI](/ci/custom-docker-image/)
* [Pushing artifacts to Docker Hub](/ci/push-to-docker-hub/)

## Usage in Assembly Lines

The Docker Hub integration can be used in the following [resources](/platform/workflow/resource/overview/):

* [image](/platform/workflow/resource/image)
* [integration](/platform/workflow/resource/integration)

This integration can be used for the scenarios listed in [Deploy to Container Orchestration Platforms](/deploy/deploy-docker-overview/) if you're using Docker Hub as your Docker registry. 

### Default Environment Variables
When you create a resource with this integration, and use it as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_INTEGRATION\_USERNAME   		| Username supplied in the integration |
| `<NAME>`\_INTEGRATION\_PASSWORD			| Password supplied in the integration |
| `<NAME>`\_INTEGRATION\_EMAIL			| Email supplied in the integration |

### Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [RunSh Job](/platform/workflow/job/runsh)
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
