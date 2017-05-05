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

-  Go to your **Account Settings** by clicking on the gear icon in the top navigation bar.

<img src="../../images/reference/integrations/account-settings.png" alt="Add Docker Datacenter credentials">

-  Click on **Integrations** in the left sidebar menu and then click on **Add integration**
-  Locate **Docker Datacenter** in the list and click on **Create Integration**
-  Name your integration and enter your Docker Datacenter username, password, and the url to access the Universal Control Plane.
-  Choose the Subscription which contains the repository for which you want to deploy the containers.
-  Click **Save**

<img src="../../images/reference/integrations/docker-datacenter-integration.png" alt="Add Docker Datacenter credentials">

##Editing your Docker Datacenter integration

You can go to your **Account Settings** at any time, click on **Integrations** in the left sidebar menu, and click the **Edit** button for your Docker Datacenter integration. You can then change integration name, Docker Datacenter username, password, and url.

However, you cannot edit the list of Subscriptions that are allowed to use the integration from this page. To add your integration to additional Subscriptions, read our [Adding your integration to additional Subscriptions section](integrations-overview/#add-subscriptions)

##Deleting your Docker Datacenter integration

If you no longer need the integration, you can delete it by following the steps below. Please note that if any projects are using this integration in their `yml` files, builds will fail after deleting the integration:

- Go to your **Account Settings** by clicking on the gear icon in the top navigation bar.

<img src="../../images/reference/integrations/account-settings.png" alt="Account settings">

- Click on **Integrations** in the left sidebar menu.
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

-----------

For more information, check our blog [Getting started with Docker Datacenter](http://blog.shippable.com/getting-started-with-docker-datacenter).
