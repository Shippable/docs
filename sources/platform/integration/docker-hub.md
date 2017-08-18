page_main_title: Docker Hub
main_section: Platform
sub_section: Integrations
page_title: Docker Hub integration

# Docker Hub Integration

Available under the Integration Family: **Hub**

`Docker Hub` Integration is used to connect Shippable DevOps Assembly Lines platform to Docker Hub so that you can pull and push Docker images.

You can create this from the integrations page. This is the information you would require to create this integration:

* **Name** -- friendly name for the integration
* **Username** -- login to your Docker Hub Account
* **Password** -- password of your Docker Hub Account
* **Email** -- email of your Docker Hub Account

## Resources that use this Integration
Resources are the building blocks of assembly lines and some types of resources refer to integrations by their names. The following resource types can be created with a `Docker Hub` integration.

* [image](/platform/workflow/resource/image)
* [integration](/platform/workflow/resource/integration)

## Default Environment Variables
When you create a resource with this integration, and use it as an `IN` or `OUT` for a job that can execute user defined scripts, a set of environment variables are configured by the platform that may be useful to set the context before user defined scripts execute as part of the job. These variables are available when a resource with this integration type is used.

`<NAME>` is the the friendly name of the resource.

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_INTEGRATION\_USERNAME   		| Username supplied in the integration |
| `<NAME>`\_INTEGRATION\_PASSWORD			| Password supplied in the integration |
| `<NAME>`\_INTEGRATION\_EMAIL			| Email supplied in the integration |

## Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [RunSh Job](/platform/workflow/job/runsh)
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
