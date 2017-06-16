page_main_title: Docker Trusted Registry
main_section: Reference
sub_section: Integrations
page_title: Docker Private/Trusted Registry integration

# Docker Private/Trusted Registry integration

An Docker Trusted Registry integration lets you configure the following scenarios:

- Pull an image from Docker Trusted Registry
- Build a Docker image which has a `FROM` that pulls an image from Docker Trusted Registry
- Push an image to Docker Trusted Registry

##Adding the Docker Trusted Registry Integration

1. Click on Integrations in the left sidebar menu followed by the '+' icon in the **Account Integrations** panel.

<img width="75%" height="75%" src="../../images/reference/integrations/account-settings.png" alt="Add Docker Private/Trusted Registry credentials">

2. Select **hub** as the Integration family.
3. Choose **Docker Trusted Registry** from the list of integration types.
4. For **Integration Name** use a distinctive name that's easy to associate to the integration and recall. Example: **Docker-Trusted-Registry**.
5. Enter the URL of your trusted registry and your credentials.
6. Click on **Save**.

<img src="../../images/reference/integrations/dtr-integration.png" alt="Add docker trusted registry credentials">

The integration will now be available to all your continuous integration and deployment workflows.

##Editing your Docker Trusted Registry integration

Click on **Integrations** in the left sidebar menu and then click on your integration. You can then change integration name, url, username, password and email.

##Deleting your Docker Trusted Registry integration

If you no longer need the integration, you can delete it by following the steps below.

- Click on **Integrations** in the left sidebar menu, and click on your integration.
- Scroll to the bottom of the page and click on the **Delete** button.
- If there are no Subscriptions using this integration, you will be able to delete it by clicking on **Yes**. You are done at this point.

<img width="50%" height="50%" src="../../images/reference/integrations/confirm-delete-integration.png" alt="Delete integration confirmation screen">

- If your integration is being used by any Subscriptions, you will see a message telling you which Subscriptions are still using the integration.

<img width="50%" height="50%" src="../../images/reference/integrations/cannot-delete-integration.png" alt="Cannot delete integration because of dependencies">

- Go to each Subscription listed in the dependencies and delete it from each.
    - Locate your subscription in the left sidebar menu and click on the dependent Subscription.

    <img width="30%" height="30%" src="../../images/reference/integrations/list-subscriptions.png" alt="List subscriptions">

    - Click on the **gears** icon and then on **Integrations**.
    - Click on the integration and the **Delete** button.
    - Delete the integration.
- Once you have deleted the integration from all Subscriptions, you can go back to your integration and delete the integration.
