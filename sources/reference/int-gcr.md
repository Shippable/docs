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

1. Click on the gear icon for Account Settings in your top navigation bar and then click on the **Integrations** section.

<img src="../../images/reference/integrations/account-settings.png" alt="Add GCR credentials">

2. Click on the **Add Integration** button.
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

You can go to your **Account Settings** at any time, click on **Integrations** in the left sidebar menu, and click the **Edit** button for your GCR integration. You can then change integration name and JSON key.

However, you cannot edit the list of Subscriptions that are allowed to use the integration from this page. To add your integration to additional Subscriptions, read our [Adding your integration to additional Subscriptions section](integrations-overview/#add-subscriptions)

##Deleting your GCR integration

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
