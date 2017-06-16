page_main_title: Docker Cloud
main_section: Reference
sub_section: Integrations
page_title: Docker cloud integration

# Docker Cloud integration
The Docker Cloud integration is required if you want to deploy the
containers to Docker Cloud.

This page explains how you can add a Docker Cloud integration to your
account by providing the credentials to access your Docker Cloud account.

##Adding your Docker Cloud integration

- Click on Integrations in the left sidebar menu followed by the '+' icon in the **Account Integrations** panel.

<img src="../../images/reference/integrations/account-settings.png" alt="Add Docker Cloud credentials">

- Select **deploy** as the Integration family.
- Choose **Docker Cloud** from the list of integration types.
-  You need to [generate an API key](https://docs.docker.com/apidocs/docker-cloud/#rest-api) in your Docker Cloud account to use with shippable.
-  Name your integration and enter your Docker Cloud username and the API key/token.
-  Choose the Subscription which contains the repository for which you want to deploy the containers.
-  Click **Save**

<img src="../../images/reference/integrations/docker-cloud-integration.png" alt="Add Docker Cloud credentials">

##Editing your Docker Cloud integration

Click on **Integrations** in the left sidebar menu and then click on your integration. You can then change integration name, Docker Cloud username and API key/token.

##Deleting your Docker Cloud integration

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
