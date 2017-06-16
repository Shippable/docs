page_main_title: Hipchat
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
- Click on Integrations in the left sidebar menu followed by the '+' icon in the **Account Integrations** panel.

<img width="75%" height="75%" src="../../images/reference/integrations/account-settings.png" alt="Add HipChat credentials">

- Select **Notification** as the Integration family.
- Choose **HipChat** from the list of integration types.
- Name your integration and enter the HipChat token.
- Click on **Save**. You should now see the integration in your list of integrations.

<img src="../../images/reference/integrations/hipchat-integration.png" alt="Add Hipchat credentials">

##Editing your Hipchat integration

YClick on **Integrations** in the left sidebar menu and then click on your integration. You can then change integration name and your hipchat token.

##Deleting your Hipchat integration

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
