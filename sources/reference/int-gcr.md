page_main_title: Google Container Registry
main_section: Reference
sub_section: Integrations
page_title: GCR integration

# GCR integration

An GCR integration lets you configure the following scenarios:

- Pull a private image for your CI workflow
- Build a Docker image which has a `FROM` that pulls a private image
- Push an image as part of CI
- Use an [image resource](resource-image/) as part of your CD pipeline.

##Adding the Account Integration

1. Click on Integrations in the left sidebar menu followed by the '+' icon in the **Account Integrations** panel.

<img width="75%" height="75%" src="../../images/reference/integrations/account-settings.png" alt="Add GCR credentials">

2. Select **hub** as the Integration family.
3. Choose **GCR** from the list of integration types.
4. For **Integration Name** use a distinctive name that's easy to associate to the integration and recall. Example: **gcr_integration**
5. Enter your JSON key that you have create on Google Developer Console. For more on JSON keys and Service accounts, read <a href="https://cloud.google.com/container-registry/docs/auth#using_a_json_key_file target="_blank"> Google's docs</a>.
6. Assign this integration to the Subscription(s) you want to use it in. Since you're likely a member of many organizations, you need to specify which of them can use this integration.
7. Click on **Save**

<img src="../../images/reference/integrations/gcr-integration.png" alt="Add GCR credentials">

The integration will now be available to all your continuous integration and deployment workflows.

To learn how to use the integration for your scenario, check out the tutorials below.

* [Pulling and building a docker image from any registry](/ci/custom-docker-image)

* [Push a Docker image to GCR](../ci/push-gcr/)

##Editing your GCR integration

Click on **Integrations** in the left sidebar menu and then click on your integration. You can then change integration name and JSON key.

##Deleting your GCR integration

If you no longer need the integration, you can delete it by following the steps below.

- Click on **Integrations** in the left sidebar menu, and click on your integration.
- Scroll to the bottom of the page and click on the **Delete** button.
- If there are no Subscriptions using this integration, you will be able to delete it by clicking on **Yes**. You are done at this point.

<img width="50%" height="50%" src="../../images/reference/integrations/confirm-delete-integration.png" alt="Delete integration confirmation screen">

- If your integration is being used by any Subscriptions, you will see a message telling you which Subscriptions are still using the integration.

<img width="50%" height="50%" src="../../images/reference/integrations/cannot-delete-integration.png" alt="Cannot delete integration because of dependencies">

- Go to each Subscription listed in the dependencies and delete it from each.
    - Locate your subscription in the left sidebar menu and click on the dependent Subscription.

    <img width="30%" height="30%" src="/images/reference/integrations/list-subscriptions.png" alt="List subscriptions">

    - Click on the **gears** icon and then on **Integrations**.
    - Click on the integration and the **Delete** button.
    - Delete the integration.
- Once you have deleted the integration from all Subscriptions, you can go back to your integration and delete the integration.
