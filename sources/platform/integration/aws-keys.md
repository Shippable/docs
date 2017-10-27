page_main_title: AWS Keys
main_section: Platform
sub_section: Integrations
page_title: AWS Keys Integration

# AWS Keys Integration

AWS Keys integration is used to connect Shippable to AWS services, such as:

* [ECR](https://aws.amazon.com/ecr/)
* [ECS](https://aws.amazon.com/ecs/)
* [EC2](https://aws.amazon.com/ec2/)
* [S3](https://aws.amazon.com/s3/)
* Any other service that needs AWS Access and Secret keys to connect

## Adding account integration

You can add this account integration by following steps on the [Adding an account integration](/platform/management/integrations/#adding-an-account-integration) page.

Here is the information you need to create this integration:

* **Integration Family** -- Generic
* **Integration type** -- AWS Keys
* **Name** -- choose a friendly name for the integration
* **Access Key**: Access key obtained from AWS
* **Secret Key**: Secret key obtained from AWS

## Usage in CI

**Note:** Since this is integration is of generic type, it can be plugged into other sections like hub, deploy in the following use cases:

* [Using a custom image for CI](/ci/custom-docker-image/)
* [Pushing artifacts to Amazon ECR](/ci/push-amazon-ecr/)
* [Deploying to EBS](/ci/deploy-to-aws-beanstalk)

## Usage in Assembly Lines

The AWS Keys integration can be used in the following [resources](/platform/workflow/resource/overview/):

* [image](/platform/workflow/resource/image)
* [cluster](/platform/workflow/resource/cluster)
* [integration](/platform/workflow/resource/integration)

The following scenarios need this integration:

* All [Deploy to Container Orchestration Platforms](/deploy/deploy-docker-overview/) scenarios if you're deploying to Amazon ECS
* Tutorial: [Deploying a Docker application to Amazon ECS](/deploy/amazon-ecs/)

## Default Environment Variables
When you create a resource with this integration, and use it as an `IN` or `OUT` for a job that can execute user defined scripts, a set of environment variables are configured by the platform that may be useful to set the context before user defined scripts execute as part of the job. These variables are available when a resource with this integration type is used.

`<NAME>` is the the friendly name of the resource.

| Environment variable						         | Description        |
| ------			 							         |----------------- |
| `<NAME>`\_INTEGRATION\_ACCESSKEY       | Access key supplied in the integration |
| `<NAME>`\_INTEGRATION\_SECRETKEY   | Secret key supplied in the integration |

## Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values. Usage of the tool is documented [here](/platform/tutorial/workflow/using-shipctl).
