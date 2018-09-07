page_main_title: AWS Keys
main_section: Platform
sub_section: Configuration
sub_sub_section: Integrations
page_title: AWS Keys Integration
page_description: How to create and use an AWS Keys Integration in Shippable

# AWS Keys Integration

AWS Keys integration is used to connect Shippable to AWS services, such as:

* [ECR](https://aws.amazon.com/ecr/)
* [ECS](https://aws.amazon.com/ecs/)
* [EC2](https://aws.amazon.com/ec2/)
* [S3](https://aws.amazon.com/s3/)
* Any other service that needs AWS Access and Secret keys to connect

## Creating an Integration

You can add this integration by following steps on the [Adding an integration](/platform/tutorial/integration/subscription-integrations/) page.

Here is the information you need to create this integration:

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

You can use this integration in any workflow where you need to connect to AWS for some reason, such as provisioning infrastructure, deploying to AWS EC2 or Amazon ECS, etc.

### IAM Policies
There are two ways to use an AWS Keys integration in Shippable Assembly Lines:

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

For `cliConfig` resources, you should make sure that your policy allows you to perform whatever actions you plan to take in your custom script.  This could mean ECR actions to pull images, ECS actions to create deployments, EC2 actions to run instances, etc.  Here is an example ECR policy that allows login, pushing, and pulling:
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ecr:GetAuthorizationToken",
                "ecr:BatchCheckLayerAvailability",
                "ecr:GetDownloadUrlForLayer",
                "ecr:GetRepositoryPolicy",
                "ecr:DescribeRepositories",
                "ecr:ListImages",
                "ecr:DescribeImages",
                "ecr:BatchGetImage",
                "ecr:InitiateLayerUpload",
                "ecr:UploadLayerPart",
                "ecr:CompleteLayerUpload",
                "ecr:PutImage"
            ],
            "Resource": "*"
        }
    ]
}
```
These settings come directly from a default AWS policy called "AmazonEC2ContainerRegistryPowerUser", which is described as "Provides full access to Amazon EC2 Container Registry repositories, but does not allow repository deletion or policy changes". A policy like this should allow any typical action you'd like to take for ECR.

## Default Environment Variables
When you create a resource with this integration, and use it as an `IN` or `OUT` for a job that can execute user defined scripts, a set of environment variables are configured by the platform that may be useful to set the context before user defined scripts execute as part of the job. These variables are available when a resource with this integration type is used.

`<NAME>` is the the friendly name of the resource.

| Environment variable						         | Description        |
| ------			 							         |----------------- |
| `<NAME>`\_INTEGRATION\_ACCESSKEY       | Access key supplied in the integration |
| `<NAME>`\_INTEGRATION\_SECRETKEY   | Secret key supplied in the integration |

When you create a resource with this integration, and use it as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

### Shippable Utility Functions
The platform also provides a command line utility called [`shipctl`](/platform/tutorial/workflow/using-shipctl/) that can be used to retrieve the values of these environment variables.

The specific function that can be used in the jobs yml is: `shipctl get_integration_resource_field <resource name> <field name>`.

Here is a table that provides the mapping from the environment variable to the field name.

| Environment variable						| Field Name        |
| ------			 							|----------------- |
| `<NAME>`\_INTEGRATION\_ACCESSKEY			| accessKey |
| `<NAME>`\_INTEGRATION\_SECRETKEY   			| secretKey |

More information on other utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).
