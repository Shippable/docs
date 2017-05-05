page_main_title: Slack
main_section: Reference
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
* Go to your **Account Settings** by clicking on the gear menu in the top navbar.

<img src="../../images/reference/integrations/account-settings.png" alt="Add Slack credentials">

* Click on **Integrations** in the sidebar menu.
* Click on **Add Integration** and choose **Slack** from the list of available integrations
* Name your integration and enter the Slack webhook URL.
* Assign this integration to the Subscription(s) you want to use it in. Since you're likely a member of many organizations, you need to specify which of them can use this integration.
* Click on **Save**. You should now see the integration in your list of integrations.

<img src="../../images/reference/integrations/slack-integration.png" alt="Add Slack credentials">

##Editing your Slack integration

You can go to your **Account Settings** at any time, click on **Integrations** in the left sidebar menu, and click the **Edit** button for your Slack integration. You can then change integration name and your slack webhook URL.

However, you cannot edit the list of Subscriptions that are allowed to use the integration from this page. To add your integration to additional Subscriptions, read our [Adding your integration to additional Subscriptions section](integrations-overview/#add-subscriptions)

##Deleting your Slack integration

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
- Once you have delete the integration from all Subscriptions, you can go back to **Account Settings** and delete the integration.