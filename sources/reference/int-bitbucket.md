page_main_title: Bitbucket
main_section: Reference
sub_section: Integrations
page_title: Bitbucket integration

# Bitbucket integration

Bitbucket integration is enabled for your Shippable account in one of 2 ways:

* You sign in to Shippable with your Bitbucket credentials. In this case, we automatically set up an Account Integration for you. You can see this integration by going to your Account Settings (gear menu in top navbar) and clicking on **Integrations** in the sidebar menu.

* You sign in to Shippable with another supported source control provider, and add a Bitbucket integrations through Account Settings -> Integrations. To learn how to do this, read the [Adding a Bitbucket integration section](#addBitbucket).

##Signing in with Bitbucket
To build repositories hosted on Bitbucket. you will need to authorize Shippable to access your repositories.

To enable Bitbucket for public and private repositories:

- Log in to <a href="https://app.shippable.com" target="_blank"> Shippable</a>.
- Click on **Authorize application** button to authorize Shippable to access your public and private  repositories on Bitbucket (This is a one-time step). Provide your Bitbucket password, if prompted.
- Your subscription is ready to use after this step.
- You can click on the top left menu icon to see a list of your Subscriptions. Choose the subscription you want.
- In the **CI** tab, click the **Enable Project** section to view all your public and private repositories in Bitbucket.
- If you don't see your projects in the above step, click on the Account settings (gear icon on the top navigation bar). In the **Accounts** section click the **Sync** button.
- No additional step required for private repositories as the above step provides access to both public and private repositories hosted on Bitbucket.

<a name="addBitbucket"></a>
##Adding a Bitbucket integration

If you did not sign in to Shippable with Bitbucket credentials but want to connect to your Bitbucket account for CI or Pipelines, you should add an account integration for Bitbucket.

- Click on Integrations in the left sidebar menu followed by the '+' icon in the **Account Integrations** panel.

<img src="../../images/reference/integrations/account-settings.png" alt="Add Bitbucket credentials">

- Select **scm** as the Integration family.
- Choose **Bitbucket** from the list of integration types.
- Enter the following:
	- Add a friendly name for your integration
	- Create a **Bitbucket API token** with the right settings and paste it in the **Token** textbox
- Click on **Save**. You should now see the integration in your list of integrations.

<img src="../../images/reference/integrations/bitbucket-integration.png" alt="Add bitbucket integration">

##Editing your Bitbucket integration

You can go to your **Account Settings** at any time, click on **Integrations** in the left sidebar menu, and click the **Edit** button for your Bitbucket integration. You can then change integration name and bitbucket api token.

##Deleting your Bitbucket integration

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
