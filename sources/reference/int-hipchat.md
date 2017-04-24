main_section: Reference
sub_section: Integrations
page_title: Hipchat integration

# Hipchat integration

You can send HipChat notifications for any status changes for CI and monitored Docker images.

To send these notifications to HipChat channel(s), you will first need to add an integration to your Account Integrations.

##Adding a HipChat integration

There are two actions to set up the HipChat integration through the UI. They are:

- Generate a token for API access
- Add the Hipchat integration to your subscription

###Generate a token for API access

1. Sign in to your HipChat account using [this link to generate a token](https://www.hipchat.com/account/api).
     - Provide credentials to your HipChat account, if prompted.
2. Create a token with `Send Message` and `Send Notification` scopes.

###Add the HipChat integration to your Account
* Go to your **Account Settings** by clicking on the gear menu in the top navbar.

<img src="../../images/reference/integrations/account-settings.png" alt="Add Hipchat credentials">

* Click on **Integrations** in the sidebar menu.
* Click on **Add Integration**.
* Name your integration and enter the HipChat token.
* Click on **Save**. You should now see the integration in your list of integrations.

<img src="../../images/reference/integrations/hipchat-integration.png" alt="Add Hipchat credentials">

##Editing your Hipchat integration

You can go to your **Account Settings** at any time, click on **Integrations** in the left sidebar menu, and click the **Edit** button for your Hipchat integration. You can then change integration name and your hipchat token.

However, you cannot edit the list of Subscriptions that are allowed to use the integration from this page. To add your integration to additional Subscriptions, read our [Adding your integration to additional Subscriptions section](integrations-overview/#add-subscriptions)

##Deleting your Hipchat integration

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