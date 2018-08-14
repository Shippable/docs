page_main_title: Amazon ECR
main_section: Platform
sub_section: Integrations
sub_sub_section: Deprecated
page_title: Amazon ECR integration

# AWS integration (Deprecated)

## Deprecation Note
This integration has been deprecated. A new integration called ["AWS Keys"](/platform/integration/aws-keys) has been introduced which can be used instead. It aims to simplify and unify existing AWS functionalities.

If you have any existing AWS integrations you _can_ continue to use them. New integrations of type AWS _cannot_ be created anymore.

---

Available under the Integration Family: **deploy**

`AWS` Integration is used to connect Shippable DevOps Assembly Lines platform to Amazon Web Services to interact with it cloud services like ECR, ECS, EC2, S3, and so on.

You can create this from the integrations page by following instructions here: [Adding an integration](/platform/tutorial/integration/subscription-integrations/).

This is the information you would require to create this integration

* **Name** -- friendly name for the integration
* **AWS Access Key ID** -- Key ID to AWS IAM Account
* **AWS Secret Access Key** -- Secret Key to AWS IAM Account

## Resources that use this Integration
Resources are the building blocks of assembly lines and some types of resources refer to integrations by their names. The following resource types can be created with an `AWS` integration.

* [image](/platform/workflow/resource/image)
* [cluster](/platform/workflow/resource/cluster)
* [integration](/platform/workflow/resource/integration)

### IAM Policies
There are two ways to use an AWS integration in Shippable Assembly Lines:

1. automated, managed Amazon ECS deployments via managed `deploy` jobs
2. AWS CLI configuration via `cliConfig` resources in a `runSh` job

For managed deployments via [deploy jobs](/platform/workflow/job/deploy), the keys need to belong to a user with a policy attached that will allow Shippable to create, delete, and update services and register task definitions. Here is an example policy:
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

## Default Environment Variables
When you create a resource with this integration, and use it as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. Any numbers at the beginning of the name are also removed to create a valid variable. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

| Environment variable						         | Description        |
| ------			 							         |----------------- |
| `<NAME>`\_INTEGRATION\_AWS\_ACCESS\_KEY\_ID       | Access Key supplied in the integration |
| `<NAME>`\_INTEGRATION\_AWS\_SECRET\_ACCESS\_KEY   | Access Key supplied in the integration |

## Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [RunSh Job](/platform/workflow/job/runsh)
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
