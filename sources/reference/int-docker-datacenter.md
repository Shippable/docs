page_main_title: Docker Datacenter
main_section: Reference
sub_section: Integrations
page_title: Docker Datacenter integration

# Docker Datacenter integration
The Docker Datacenter integration is required if you want to deploy the
containers to Docker Datacenter.

This page explains how you can add a Docker Datacenter integration to your
account by providing the credentials to access your Docker Cloud account.

##Adding your Docker Datacenter integration

- Click on Integrations in the left sidebar menu followed by the '+' icon in the **Account Integrations** panel.

<img width="75%" height="75%" src="../../images/reference/integrations/account-settings.png" alt="Add Docker Datacenter credentials">

- Select **deploy** as the Integration family.
- Choose **Docker Datacenter** from the list of integration types.
-  Name your integration and enter your Docker Datacenter username, password, and the url to access the Universal Control Plane.
-  Choose the Subscription which contains the repository for which you want to deploy the containers.
-  Click **Save**

<img src="../../images/reference/integrations/docker-datacenter-integration.png" alt="Add Docker Datacenter credentials">

##Editing your Docker Datacenter integration

Click on **Integrations** in the left sidebar menu and then click on your integration. You can then change integration name, Docker Datacenter username, password, and url.

##Deleting your Docker Hub integration

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

-----------

For more information, check our blog [Getting started with Docker Datacenter](http://blog.shippable.com/getting-started-with-docker-datacenter).
