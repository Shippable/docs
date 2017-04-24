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

1. Click on the gear icon for Account Settings in your top navigation bar and then click on the **Integrations** tab. Click on **Add Integration**

<img src="../../images/reference/integrations/account-settings.png" alt="Amazon ECS credentials">

2. **Integration type:** Locate and select `AWS (IAM)`
3. **Integration Name:** Use a distinctive name that's easy to associate to the integration and recall. Example: **manishas-aws-iam**
4. Enter the ARN for the role **shippable-role-to-allow-ecs-access**. This will be a string with format like this **arn:aws:iam::12345678912:role/shippable-role-to-allow-ecs-access**. This role should be associated with a policy as defined [here](#policy)
5. Click **Save**

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

You can go to your **Account Settings** at any time, click on **Integrations** in the left sidebar menu, and click the **Edit** button for your Amazon ECS integration. You can then change integration name and aws_access_key and aws_secret_id.

However, you cannot edit the list of Subscriptions that are allowed to use the integration from this page. To add your integration to additional Subscriptions, read our [Adding your integration to additional Subscriptions section](integrations-overview/#add-subscriptions)

##Deleting your Amazon ECS integration

If you no longer need the integration, you can delete it by following the steps below.

-  Go to your **Account Settings** by clicking on the gear icon in the top navigation bar.

<img src="../../images/reference/integrations/account-settings.png" alt="Account settings">

-  Click on **Integrations** in the left sidebar menu
- Locate the integration you want to delete and click on the **Delete** button.
- If there are no Subscriptions using this integration, you will be able to delete it by clicking on **Yes**. You are done at this point.

<img src="../../images/reference/integrations/confirm-delete-integration.png" alt="Delete integration confirmation screen">

- If your integration is being used by any Subscriptions, you will see a message telling you which Subscriptions are still using the integration.

<img src="../../images/reference/integrations/cannot-delete-integration.png" alt="Cannot delete integration because of dependencies">

- Go to each Subscription listed in the dependencies and delete it from each.
    - From the Subsciption dropdown menu at the top left of your Dashboard, click on the dependent Subscription.

    <img src="../../images/reference/integrations/list-subscriptions.png" alt="List subscriptions">

    - Go to the **Settings** tab and click on **Integrations** in the left sidebar.
    - Delete the integration.
- Once you have deleted the integration from all Subscriptions, you can go back to **Account Settings** and delete the integration.

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
