main_section: Reference
sub_section: Integrations
page_title: Docker Private/Trusted Registry integration

# Docker Private/Trusted Registry integration

An Docker Trusted Registry integration lets you configure the following scenarios:

- Pull an image from Docker Trusted Registry
- Build a Docker image which has a `FROM` that pulls an image from Docker Trusted Registry
- Push an image to Docker Trusted Registry

##Adding the Docker Trusted Registry Integration

You will need to configure this integration in order to pull or push images from a Docker Trusted Registry. To set up this integration, you will need the URL of your Docker Trusted Registry.

1. Click on the gear icon for Account Settings in your top navigation bar and then click on the **Integrations** section.

<img src="../../images/reference/integrations/account-settings.png" alt="Add docker trusted registry credentials">

2. Click on the **Add Integration** button.
3. Choose **Docker Trusted Registry** from the list of integration types.
4. For **Integration Name** use a distinctive name that's easy to associate to the integration and recall. Example: **Docker-Trusted-Registry**.
5. Enter the URL of your trusted registry and your credentials.
6. Click on **Save**.

<img src="../../images/reference/integrations/dtr-integration.png" alt="Add docker trusted registry credentials">

The integration will now be available to all your continuous integration and deployment workflows.

##Editing your Docker Trusted Registry integration

You can go to your **Account Settings** at any time, click on **Integrations** in the left sidebar menu, and click the **Edit** button for your Docker Trusted Registry integration. You can then change integration name, url, username, password and email.

However, you cannot edit the list of Subscriptions that are allowed to use the integration from this page. To add your integration to additional Subscriptions, read our [Adding your integration to additional Subscriptions section](integrations-overview/#add-subscriptions)

##Deleting your Docker Trusted Registry integration

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