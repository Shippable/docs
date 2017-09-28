page_main_title: AWS Keys
main_section: Platform
sub_section: Integrations
page_title: AWS Keys Integration

# AWS Keys Integration

Available under the integration family: **Generic**

AWS Keys integration is used to connect Shippable to the AWS services like ECR, ECS, EC2, S3 etc.

You can create this from the integrations page by following instructions [here](/platform/management/integrations/#adding-an-account-integration).

This is the information you would require to create this integration:

* **Name**: A friendly name for the integration
* **Access Key**: Access key obtained from AWS
* **Secret Key**: Secret key obtained from AWS

## Resource That Use This Integration
Resources are the building blocks of "Assembly Lines" and some types of resources refer to integrations by their names.

The following resource types can be created with an AWS Keys integration:

* [image](/platform/workflow/resource/image)
* [cluster](/platform/workflow/resource/cluster)
* [integration](/platform/workflow/resource/integration)

## Default Environment Variables
When you create a resource with this integration, and use it as an `IN` or `OUT` for a job that can execute user defined scripts, a set of environment variables are configured by the platform that may be useful to set the context before user defined scripts execute as part of the job. These variables are available when a resource with this integration type is used.

`<NAME>` is the the friendly name of the resource.

| Environment variable						         | Description        |
| ------			 							         |----------------- |
| `<NAME>`\_INTEGRATION\_ACCESS\_KEY       | Access key supplied in the integration |
| `<NAME>`\_INTEGRATION\_SECRET\_KEY   | Secret key supplied in the integration |

## Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values. Usage of the tool is documented [here](/platform/tutorial/workflow/using-shipctl).
