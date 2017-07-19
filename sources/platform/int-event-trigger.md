page_main_title: Event Trigger
main_section: Platform
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
- Click on Integrations in the left sidebar menu followed by the '+' icon in the **Event Trigger** panel.

<img width="75%" height="75%" src="../../images/platform/integrations/account-settings.png" alt="Add Event Trigger">

- Select **Notification** as the Integration family.
- Choose **Event Trigger** from the list of integration types.
-  Name your integration..
-  Under 'What would you like to trigger?' select `Project` from the dropdown choices.
-  [Optional] Select the Project that you want to associate the integration.
-  In the 'Authorization' field, you'll need to specify the Shippable API Token.
-  Assign this integration to the Subscription(s) you want to use it in. Since you're likely a member of many organizations, you need to specify which of them can use this integration.
-  Click on `Save`.

<img src="../../images/platform/integrations/event-trigger-project-integration.png" alt="Add Event Trigger Project">

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

<img src="../../images/platform/integrations/event-trigger-webhook-integration.png" alt="Add Event Trigger WebhookURL">

The integration will now be available to all your Continuous Integration and Pipelines settings within the Shippable portal.

##Editing your Event Trigger integration

Click on **Integrations** in the left sidebar menu and then click on your integration. You can then change integration name, URL, Event Trigger username and API key/token.

##Deleting your Event Trigger integration

If you no longer need the integration, you can delete it by following the steps below.

- Click on **Integrations** in the left sidebar menu, and click on your integration.
- Scroll to the bottom of the page and click on the **Delete** button.
- If there are no Subscriptions using this integration, you will be able to delete it by clicking on **Yes**. You are done at this point.

<img width="50%" height="50%" src="../../images/platform/integrations/confirm-delete-integration.png" alt="Delete integration confirmation screen">

- If your integration is being used by any Subscriptions, you will see a message telling you which Subscriptions are still using the integration.

<img width="50%" height="50%" src="../../images/platform/integrations/cannot-delete-integration.png" alt="Cannot delete integration because of dependencies">

- Go to each Subscription listed in the dependencies and delete it from each.
    - Locate your subscription in the left sidebar menu and click on the dependent Subscription.

    <img width="30%" height="30%" src="/images/platform/integrations/list-subscriptions.png" alt="List subscriptions">

    - Click on the **gears** icon and then on **Integrations**.
    - Click on the integration and the **Delete** button.
    - Delete the integration.
- Once you have deleted the integration from all Subscriptions, you can go back to your integration and delete the integration.
