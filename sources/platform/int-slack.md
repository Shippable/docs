page_main_title: Slack
main_section: Platform
sub_section: Integrations
page_title: Slack integration

# Slack integration

You can send Slack notifications for any status changes for CI, pipelines, and monitored Docker images.

To send these notifications to Slack channel(s), you will first need to add an integration to your Account Integrations.

##Adding a Slack integration

There are two actions to set up the Slack integration through the UI. They are:

- Configure an incoming webhook on Slack
- Add the Slack integration to your subscription

###Configure an incoming webhook on Slack

* Sign in to your Slack account and [go to this link to create an incoming webhook](https://my.slack.com/services/new/incoming-webhook/).
     - Provide credentials to your Slack account, if prompted.
* In the `Post Channel` section, use the dropdown and select a channel to create the webhook. It does not matter which channel you choose while creating the webhook. We will override it when you configure the integration on Shippable.
* Click the 'Add Incoming Webhook integration' button.
* Copy the text in the 'Webhook URL' section. It looks like this: `https://hooks.slack.com/services/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`.
* Click the `Save Settings` button.

###Add the Slack integration to your Account
- Click on Integrations in the left sidebar menu followed by the '+' icon in the **Account Integrations** panel.

<img width="75%" height="75%" src="../../images/platform/integrations/account-settings.png" alt="Add Slack credentials">

- Select **Notification** as the Integration family.
- Choose **Slack** from the list of integration types.
- Name your integration and enter the Slack webhook URL.
- Assign this integration to the Subscription(s) you want to use it in. Since you're likely a member of many organizations, you need to specify which of them can use this integration.
- Click on **Save**. You should now see the integration in your list of integrations.

<img src="../../images/platform/integrations/slack-integration.png" alt="Add Slack credentials">

##Editing your Slack integration

Click on **Integrations** in the left sidebar menu and then click on your integration. You can then change integration name and your slack webhook URL.

##Deleting your Slack integration

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
