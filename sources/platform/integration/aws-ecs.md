page_main_title: AWS IAM integration for your deployment pipelines
main_section: Platform
sub_section: Integrations
sub_sub_section: Deprecated
page_title: Amazon ECS integration

# AWS IAM Integration

The [AWS IAM](https://aws.amazon.com/iam/) Integration is used to connect the Shippable DevOps Assembly Lines platform to Amazon Web Services to interact with its cloud services like ECR, ECS, EC2, S3, and so on.

## Adding account integration

Since this integration has been deprecated, you cannot create new account integrations for this, you can only edit/delete the exisiting Amazon Web Services (IAM) integrations. You can use the [AWS IAM](/platform/integration/aws-iam) instead.

## Usage in Assembly Lines

The AWS IAM integration can be used in the following [resources](/platform/workflow/resource/overview/):

* [cluster](/platform/workflow/resource/cluster)
* [integration](/platform/workflow/resource/integration)

The main scenarios for using this integration are:

* [Deploy a single container Docker application to Amazon ECS](/deploy/amazon-ecs/)
* [Deploy a multiple container Docker application to Amazon ECS](/deploy/amazon-ecs-multiple-containers/)

### Default Environment Variables
When you create a resource with this integration, and use it as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

| Environment variable						         | Description        |
| ------			 							         |----------------- |
| `<NAME>`\_INTEGRATION\_NAME       		| Name supplied in the integration |
| `<NAME>`\_INTEGRATION\_ASSUMEROLEARN 	| ARN Role supplied in the integration |

### Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [RunSh Job](/platform/workflow/job/runsh)
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
