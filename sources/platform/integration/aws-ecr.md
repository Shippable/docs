page_main_title: Amazon ECR
main_section: Platform
sub_section: Integrations
sub_sub_section: Deprecated
page_title: Amazon ECR integration

# Amazon ECR integration (Deprecated)

## Deprecation Note
This integration has been deprecated. A new integration called ["AWS Keys"](/platform/integration/aws-keys) has been introduced which can be used instead. It aims to simplify and unify existing AWS functionalities.

If you have any existing ECR integrations you _can_ continue to use them. New integrations of type ECR _cannot_ be created anymore.

---

The **Amazon ECR** Integration is used to connect Shippable DevOps Assembly Lines platform to [Amazon EC2 Container Registry](https://aws.amazon.com/ecr/) so that you can pull and push Docker images.

## Adding account integration

You can add this account integration by following steps on the [Adding an account integration](/platform/tutorial/integration/howto-crud-integration/) page.

Here is the information you need to create this integration:

* **Integration type** -- **Amazon ECR**
* **Name** -- choose a friendly name for the integration
* **AWS Access Key ID** -- Key ID to AWS IAM Account
* **AWS Secret Access Key** -- Secret Key to AWS IAM Account

## Usage in CI

* [Using a custom image for CI](/ci/custom-docker-image/)
* [Pushing a Docker image to Amazon ECR](/ci/push-amazon-ecr/)

## Usage in Assembly Lines

The following [resource](/platform/workflow/resource/overview/) types can be created with an `Amazon ECR` integration for use in Assembly Lines config.

* [image](/platform/workflow/resource/image)
* [cluster](/platform/workflow/resource/cluster)
* [integration](/platform/workflow/resource/integration)

### Default Environment Variables
When you create a resource with this integration, and use it as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

| Environment variable						         | Description        |
| ------			 							         |----------------- |
| `<NAME>`\_INTEGRATION\_AWS\_ACCESS\_KEY\_ID       | Access Key supplied in the integration |
| `<NAME>`\_INTEGRATION\_AWS\_SECRET\_ACCESS\_KEY   | Secret Key supplied in the integration |

### Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [RunSh Job](/platform/workflow/job/runsh)
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
