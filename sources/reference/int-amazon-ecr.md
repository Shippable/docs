page_main_title: Amazon ECR
main_section: Reference
sub_section: Integrations
page_title: Amazon ECR integration

# Amazon ECR integration

An ECR integration lets you configure the following scenarios:

- Pull a private image for your CI workflow
- Build a Docker image which has a `FROM` that pulls a private image
- Push an image as part of CI
- Use an [image resource](resource-image/) as part of your CD pipeline.

##Adding the ECR Integration

You will need to configure this integration to pull from or push images to Amazon ECR.

1. Click on Integrations in the left sidebar menu followed by the '+' icon in the **Account Integrations** panel.

<img src="../../images/reference/integrations/account-settings.png" alt="Add ECR credentials">

2. Select **hub** as the Integration family.
3. Choose **Amazon ECR** from the list of integration types.
4. For **Integration Name** use a distinctive name that's easy to associate to the integration and recall. Example: **ecr-integration**
5. Enter your aws_access_key_id and aws_secret_access_key. You can follow instructions in <a href="http://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html"> Amazon's guide for Creating and Managing access keys</a>.
6. Assign this integration to either all Subscription(s) or the subscriptions you want to use it in from the **Selected Subscriptions** dropdown's in the Subscription scopes. section Since you're likely a member of many organizations, you need to specify which of them can use this integration.
7. Assign this integration to the Projects in the chosen Subscription(s).
8. Click on **Create**

The integration will now be available to all your Continuous Integration and Deployment workflows.

<img src="../../images/reference/integrations/ecr-integration.png" alt="Add ECR credentials">

To learn how to use the integration for your scenario, check out the tutorials below.

* [Pulling and building a docker image from any registry](/ci/custom-docker-image)

* [Push a Docker image to ECR](../ci/push-amazon-ecr/)

##Editing your ECR integration

Click on **Integrations** in the left sidebar menu and then click on your integration. You can then change integration name ,aws access key id and secret access key.


##Deleting your ECR integration

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
