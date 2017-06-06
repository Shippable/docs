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

- Click on Integrations in the left sidebar menu followed by the '+' icon in the **Account Integrations** panel.

<img src="../../images/reference/integrations/account-settings.png" alt="Add Docker Hub credentials">

- Select **hub** as the Integration family.
- Choose **Docker** from the list of integration types.
-  Name your integration and enter your Docker Hub username, password, and the email with which you registered there.
-  Choose the Subscription which contains the repository for which you want to push the image
-  Click **Save**

<img src="../../images/reference/integrations/docker-hub-integration.png" alt="Add Docker Hub credentials">

##Editing your Docker Hub integration

Click on **Integrations** in the left sidebar menu and then click on your integration. You can then change integration name, Docker Hub username, password, and email.

##Deleting your Docker Hub integration

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
