page_main_title: Amazon ECS
main_section: Reference
sub_section: Integrations
page_title: Amazon ECS integration

# Amazon ECS integration

Shippable lets you easily deploy your Dockerized applications to popular Container Services like Amazon EC2 Container Service (ECS).

You will first need to configure an account integration with your credentials and/or keys in order to interact with these services using Shippable Pipelines.

To actually use it for CI or Pipelines, you will also need to add this integration to the Subscription that contains your CI or Pipelines.

Follow the steps below to create an account integration with AWS ECS.

## Adding Amazon ECS integration

### Amazon Web Services (IAM)

1. Click on Integrations in the left sidebar menu followed by the '+' icon in the **Account Integrations** panel.

<img src="../../images/reference/integrations/account-settings.png" alt="Add Azure DC/OS credentials">

2. Select **deploy** as the Integration family.
3. Choose **AWS (IAM)** from the list of integration types.
4. **Integration Name:** Use a distinctive name that's easy to associate to the integration and recall. Example: **manishas-aws-iam**
5. Enter the ARN for the role **shippable-role-to-allow-ecs-access**. This will be a string with format like this **arn:aws:iam::12345678912:role/shippable-role-to-allow-ecs-access**. This role should be associated with a policy as defined [here](#policy)
6. Click **Save**

<img src="../../images/reference/integrations/aws-iam-integration.png" alt="Amazon ECS credentials">

### Amazon EC2 Container Service Using Account Keys

1. Click on the gear icon for Account Settings in your top navigation bar and then click on the **Integrations** section.

<img src="../../images/reference/integrations/account-settings.png" alt="Amazon ECS credentials">

2. Click on the **Add Integration** button.
3. For **Integration type**, locate **AWS** from the list of integrations.
4. For **Integration Name** use a distinctive name that's easy to associate to the integration and recall. Example: **AWS-Integration**.
5. Enter your access and secret keys provided by AWS. <a href="http://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html#id_root-user_manage_add-key" target="_blank"> See here</a> for info on how to generate them.  These keys should be associated with an account that has access to a policy with rules described [here](#policy).
6. Click on **Save**.

<img src="../../images/reference/integrations/ecs-integration.png" alt="Amazon ECS credentials">

Please remember that before you can use this integration to set up your Pipelines, you will need to enable the integration for the Subscription that contains your Pipelines.


##Editing your Amazon ECS integration

Click on **Integrations** in the left sidebar menu and then click on your integration. You can then change integration name and aws_access_key and aws_secret_id.

##Deleting your Amazon ECS integration

If you no longer need the integration, you can delete it by following the steps below.

- Click on **Integrations** in the left sidebar menu, and click on your integration.
- Scroll to the bottom of the page and click on the **Delete** button.
- If there are no Subscriptions using this integration, you will be able to delete it by clicking on **Yes**. You are done at this point.

<img src="../../images/reference/integrations/confirm-delete-integration.png" alt="Delete integration confirmation screen">

- If your integration is being used by any Subscriptions, you will see a message telling you which Subscriptions are still using the integration.

<img src="../../images/reference/integrations/cannot-delete-integration.png" alt="Cannot delete integration because of dependencies">

- Go to each Subscription listed in the dependencies and delete it from each.
    - Locate your subscription in the left sidebar menu and click on the dependent Subscription.

    <img src="../../images/reference/integrations/list-subscriptions.png" alt="List subscriptions">

    - Click on the **gears** icon and then on **Integrations**.
    - Click on the integration and the **Delete** button.
    - Delete the integration.
- Once you have deleted the integration from all Subscriptions, you can go back to your integration and delete the integration.

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
