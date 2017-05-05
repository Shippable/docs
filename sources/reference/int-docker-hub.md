page_main_title: Docker Hub
main_section: Reference
sub_section: Integrations
page_title: Docker Hub integration

# Docker Hub integration

The Docker Hub integration is required if you want to configure any of the following scenarios:

- Pull a private image, e.g. [to use as custom image](../ci/custom-docker-image/) to spin up your CI container
- Build a Docker image which has a `FROM` that pulls a private image
- [Push an image](../ci/push-docker-hub/)
- Use an image from Docker Hub as a [resource](resource-image/) as part of your DevOps pipeline

This page explains how you can add a Docker Hub integration to your account so that we can authenticate against it when working with images stored there. The actual `yml` configuration is covered in the relevant docs sections.

##Adding your Docker Hub integration

-  Go to your **Account Settings** by clicking on the gear icon in the top navigation bar.

<img src="../../images/reference/integrations/account-settings.png" alt="Add Docker Hub credentials">

-  Click on **Integrations** in the left sidebar menu and then click on **Add integration**
-  Locate **Docker** in the list and click on **Create Integration**
-  Name your integration and enter your Docker Hub username, password, and the email with which you registered there.
-  Choose the Subscription which contains the repository for which you want to push the image
-  Click **Save**

<img src="../../images/reference/integrations/docker-hub-integration.png" alt="Add Docker Hub credentials">

##Editing your Docker Hub integration

You can go to your **Account Settings** at any time, click on **Integrations** in the left sidebar menu, and click the **Edit** button for your Docker Hub integration. You can then change integration name, Docker Hub username, password, and email.

However, you cannot edit the list of Subscriptions that are allowed to use the integration from this page. To add your integration to additional Subscriptions, read our [Adding your integration to additional Subscriptions section](integrations-overview/#add-subscriptions)

##Deleting your Docker Hub integration

If you no longer need the integration, you can delete it by following the steps below. Please note that if any projects are using this integration in their `yml` files, builds will fail after deleting the integration:

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
- Once you have delete the integration from all Subscriptions, you can go back to **Account Settings** and delete the integration.
