page_main_title: AWS IAM integration for your deployment pipelines
main_section: Platform
sub_section: Configuration
sub_sub_section: Integrations
page_title: AWS IAM Integration
page_description: How to create and use an AWS IAM Integration in Shippable

# AWS IAM Integration

The [AWS IAM](https://aws.amazon.com/iam/) Integration is used to connect the Shippable DevOps Assembly Lines platform to Amazon Web Services to interact with its cloud services like ECR, ECS, EC2, S3, and so on.

## Creating an Integration

You will need to add an IAM user to your AWS account to create this integration. Instructions are in the [AWS docs](http://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html).

You can add an integration to Shippable by following steps on the [Managing integrations](/platform/tutorial/integration/subscription-integrations/) page.

Here is the information you need to create this integration:

* **Integration type** -- **AWS IAM**
* **Name** -- choose a friendly name for the integration
* **Assume Role ARN** -- Role to Assume when connecting to AWS

## Usage in Assembly Lines

The AWS IAM integration can be used in the following [resources](/platform/workflow/resource/overview/):

* [cluster](/platform/workflow/resource/cluster)
* [integration](/platform/workflow/resource/integration)

### IAM Policies

You can use this integration to create a workflow for automated, managed Amazon ECS deployments via managed `deploy` jobs


For managed deployments via [deploy jobs](/platform/workflow/job/deploy), the role needs to have a policy attached that will allow Shippable to create, delete, and update services and register task definitions. Here is an example policy:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ecs:DeregisterTaskDefinition",
                "ecs:UpdateService",
                "ecs:CreateService",
                "ecs:RegisterTaskDefinition",
                "ecs:DeleteService",
                "ecs:DescribeServices",
                "ecs:ListTaskDefinitions"
            ],
            "Resource": "*"
        }
    ]
}
```

If your managed deployment includes a [loadBalancer](/platform/workflow/resource/loadbalancer), the policy will also need permission to assume a role for the load balancer:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ecs:DeregisterTaskDefinition",
                "ecs:UpdateService",
                "ecs:CreateService",
                "ecs:RegisterTaskDefinition",
                "ecs:DeleteService",
                "ecs:DescribeServices",
                "ecs:ListTaskDefinitions"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "iam:PassRole",
                "iam:ListRoles"
            ],
            "Resource": "arn:aws:iam::*:*"
        }
    ]
}
```

And if you are adding scaling policies or AWS CloudWatch metric alarms, you will need additional permissions for that as well.

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "application-autoscaling:RegisterScalableTarget",
                "application-autoscaling:DeregisterScalableTarget",
                "application-autoscaling:PutScalingPolicy",
                "application-autoscaling:DeleteScalingPolicy",
                "cloudwatch:PutMetricAlarm",
                "cloudwatch:DeleteAlarms",
                "ecs:DeregisterTaskDefinition",
                "ecs:UpdateService",
                "ecs:CreateService",
                "ecs:RegisterTaskDefinition",
                "ecs:DeleteService",
                "ecs:DescribeServices",
                "ecs:ListTaskDefinitions"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "iam:PassRole",
                "iam:ListRoles"
            ],
            "Resource": "arn:aws:iam::*:*"
        }
    ]
}
```

### Default Environment Variables
When you create a resource with this integration, and use it as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. Any numbers at the beginning of the name are also removed to create a valid variable. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

| Environment variable						         | Description        |
| ------			 							         |----------------- |
| `<NAME>`\_INTEGRATION\_AWSACCOUNTID       		| AWS account ID |
| `<NAME>`\_INTEGRATION\_ASSUMEROLEARN 	| ARN Role supplied in the integration |


### Shippable Utility Functions
The platform also provides a command line utility called [`shipctl`](/platform/tutorial/workflow/using-shipctl/) that can be used to retrieve the values of these environment variables.

The specific function that can be used in the jobs yml is: `shipctl get_integration_resource_field <resource name> <field name>`.

Here is a table that provides the mapping from the environment variable to the field name.

| Environment variable						| Field Name        |
| ------			 							|----------------- |
| `<NAME>`\_INTEGRATION\_AWSACCOUNTID			| awsAccountId |
| `<NAME>`\_INTEGRATION\_ASSUMEROLEARN   			| assumeRoleARN |

More information on other utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [RunSh Job](/platform/workflow/job/runsh)
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
