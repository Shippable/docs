page_main_title: Amazon ECR
main_section: Platform
sub_section: Integrations
page_title: Amazon ECR integration

# Amazon ECR integration

Available under the Integration Family: **Hub**

`Amazon ECR` Integration is used to connect Shippable DevOps Assembly Lines platform to Amazon Elastic Container Registry so that you can pull and push Docker images.

You can create this from the integrations page by following instructions here: [Adding an account integration](/platform/management/integrations/#adding-an-account-integration).

This is the information you would require to create this integration:

* **Name** -- friendly name for the integration
* **AWS Access Key ID** -- Key ID to AWS IAM Account
* **AWS Secret Access Key** -- Secret Key to AWS IAM Account

## Resources that use this Integration
Resources are the building blocks of assembly lines and some types of resources refer to integrations by their names. The following resource types can be created with an `Amazon ECR` integration.

* [image](/platform/workflow/resource/image)
* [cluster](/platform/workflow/resource/cluster)
* [integration](/platform/workflow/resource/integration)

## Default Environment Variables
When you create a resource with this integration, and use it as an `IN` or `OUT` for a job that can execute user defined scripts, a set of environment variables are configured by the platform that may be useful to set the context before user defined scripts execute as part of the job. These variables are available when a resource with this integration type is used.

`<NAME>` is the the friendly name of the resource.

| Environment variable						         | Description        |
| ------			 							         |----------------- |
| `<NAME>`\_INTEGRATION\_AWS\_ACCESS\_KEY\_ID       | Access Key supplied in the integration |
| `<NAME>`\_INTEGRATION\_AWS\_SECRET\_ACCESS\_KEY   | Secret Key supplied in the integration |

## Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [RunSh Job](/platform/workflow/job/runsh)
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
