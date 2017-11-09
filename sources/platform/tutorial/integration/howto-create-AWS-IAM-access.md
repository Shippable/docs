page_main_title: Creating an AWS IAM Integration
main_section: Platform
sub_section: Tutorials
sub_sub_section: Integrations
page_title: Creating an AWS IAM Integration
page_description: How to create an Amazon Web Services (AWS) IAM account integration for use in Shippable

### Amazon Web Services (IAM)

1. Click on Integrations in the left sidebar menu followed by the '+' icon in the **Account Integrations** panel.

<img width="75%" height="75%" src="/images/platform/integrations/account-settings.png" alt="Add Azure DC/OS credentials">

2. Choose **AWS (IAM)** from the list of integration types.
3. **Integration Name:** Use a distinctive name that's easy to associate to the integration and recall. Example: **manishas-aws-iam**
4. Enter the ARN for the role **shippable-role-to-allow-ecs-access**. This will be a string with format like this **arn:aws:iam::12345678912:role/shippable-role-to-allow-ecs-access**. This role should be associated with a policy as defined [here](#policy)
5. Click **Save**

<img src="/images/platform/integrations/aws-iam-integration.png" alt="Amazon ECS credentials">

### Amazon EC2 Container Service Using Account Keys

1. Click on the gear icon for Account Settings in your top navigation bar and then click on the **Integrations** section.

<img width="75%" height="75%" src="/images/platform/integrations/account-settings.png" alt="Amazon ECS credentials">

2. Click on the **Add Integration** button.
3. For **Integration type**, locate **AWS-Keys** from the list of integrations.
4. For **Integration Name** use a distinctive name that's easy to associate to the integration and recall. Example: **AWS-Integration**.
5. Enter your access and secret keys provided by AWS. <a href="http://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html#id_root-user_manage_add-key" target="_blank"> See here</a> for info on how to generate them.  These keys should be associated with an account that has access to a policy with rules described [here](#policy).
6. Click on **Save**.

<img src="/images/platform/integrations/ecs-integration.png" alt="Amazon ECS credentials">

Please remember that before you can use this integration to set up your Pipelines, you will need to enable the integration for the Subscription that contains your Pipelines.


## Policy

The following policy document is required for Shippable to manage your deployments to ECS.

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "elasticloadbalancing:ConfigureHealthCheck",
                "elasticloadbalancing:DescribeLoadBalancers",
                "iam:ListRoles",
                "iam:PassRole",
                "ec2:DescribeRegions",
                "ec2:DescribeInstances",
                "ecs:DescribeClusters",
                "ecs:ListClusters",
                "ecs:RegisterTaskDefinition",
                "ecs:DeregisterTaskDefinition",
                "ecs:ListTaskDefinitions",
                "ecs:DescribeServices",
                "ecs:UpdateService",
                "ecs:DeleteService",
                "ecs:CreateService",
                "ecs:ListTasks",
                "ecs:ListContainerInstances",
                "ecs:DescribeContainerInstances"
            ],
            "Resource": "*"
        }
    ]
}
```
