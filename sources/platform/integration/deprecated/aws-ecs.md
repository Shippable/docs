page_main_title: AWS IAM integration for your deployment pipelines
main_section: Platform
sub_section: Integrations
sub_sub_section: Deprecated
page_title: Amazon ECS integration

# AWS IAM Integration (Deprecated)

The [AWS IAM](https://aws.amazon.com/iam/) Integration is used to connect the Shippable DevOps Assembly Lines platform to Amazon Web Services to interact with its cloud services like ECR, ECS, EC2, S3, and so on.

## Creating an Integration

Since this integration has been deprecated, you cannot create new integrations for this, you can only edit/delete the exisiting Amazon Web Services (IAM) integrations. You can use the [AWS IAM](/platform/integration/aws-iam) instead.

## Usage in Assembly Lines

The AWS IAM integration can be used in the following [resources](/platform/workflow/resource/overview/):

* [cluster](/platform/workflow/resource/cluster)
* [integration](/platform/workflow/resource/integration)

The main scenarios for using this integration are:

* [Deploy a single container Docker application to Amazon ECS](/deploy/amazon-ecs/)
* [Deploy a multiple container Docker application to Amazon ECS](/deploy/continuous-delivery-multi-container-docker-application/)

### IAM Policies
There are two ways to use an AWS IAM integration in Shippable Assembly Lines:

1. automated, managed Amazon ECS deployments via managed `deploy` jobs
2. AWS CLI configuration via `cliConfig` resources in a `runSh` job

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

For `cliConfig` resources, you should make sure that your policy allows you to perform whatever actions you plan to take in your custom script.  This could mean ECR actions to pull images, ECS actions to create deployments, EC2 actions to run instances, etc.

### Default Environment Variables
When you create a resource with this integration, and use it as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. Any numbers at the beginning of the name are also removed to create a valid variable. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

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
