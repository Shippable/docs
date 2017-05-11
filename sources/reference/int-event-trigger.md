page_main_title: Event Trigger
main_section: Reference
sub_section: Integrations
page_title: Event Trigger integration

# Event Trigger integration
Shippable supports triggers on user-specified webhook URLs or other enabled projects.
By default, configured triggers are hit only if a commit build succeeds.

This page explains how you can add a Event Trigger integration to your
account by providing the Project name or Webhook URL and the Authorization.

##Adding an Event Trigger integration
You can add the integration for a Project or for a Generic Webhook.

###Adding the Account Integration for a Project
-  Go to your **Account Settings** by clicking on the gear icon in the top navigation bar.

<img src="../../images/reference/integrations/account-settings.png" alt="Add Private registry credentials">

-  Click on **Integrations** in the left sidebar menu and then click on **Add integration**
-  Locate **Event Trigger** in the list and click on **Create Integration**
-  Name your integration..
-  Under 'What would you like to trigger?' select `Project` from the dropdown choices.
-  [Optional] Select the Project that you want to associate the integration.
-  In the 'Authorization' field, you'll need to specify the Shippable API Token.
-  Assign this integration to the Subscription(s) you want to use it in. Since you're likely a member of many organizations, you need to specify which of them can use this integration.
-  Click on `Save`.

<img src="../../images/reference/integrations/event-trigger-project-integration.png" alt="Add Event Trigger Project">

The integration will now be available to all your Continuous Integration and Pipelines settings within the Shippable portal.

###Adding the Account Integration for a Generic Webhook

-  Click on **Integrations** in the left sidebar menu and then click on **Add integration**
-  Locate **Event Trigger** in the list and click on **Create Integration**
-  Name your integration..
-  Under 'What would you like to trigger?' select `Generic Webhook` from the dropdown choices.
-  Specify a webhook URL you want to trigger in the 'WebhookURL' field.
-  In the Authorization field, specify the HTTP Authorization Header required to hit the specified webhook URL. If no authorization is required, this field can be left blank.
-  Assign this integration to the Subscription(s) you want to use it in. Since you're likely a member of many organizations, you need to specify which of them can use this integration.
-  Click on `Save`.

<img src="../../images/reference/integrations/event-trigger-webhook-integration.png" alt="Add Event Trigger WebhookURL">

The integration will now be available to all your Continuous Integration and Pipelines settings within the Shippable portal.

##Editing your Event Trigger integration

You can go to your **Account Settings** at any time, click on **Integrations** in the left sidebar menu, and click the **Edit** button for your Event Trigger integration. You can then change integration name, URL, Event Trigger username and API key/token.

However, you cannot edit the list of Subscriptions that are allowed to use the integration from this page. To add your integration to additional Subscriptions, read our [Adding your integration to additional Subscriptions section](integrations-overview/#add-subscriptions)

##Deleting your Event Trigger integration

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
