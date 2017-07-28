page_main_title: GitHub
main_section: Platform
sub_section: Integrations
page_title: GitHub integration

# GitHub integration

GitHub integration is enabled for your Shippable account in one of 2 ways:

* You sign in to Shippable with your GitHub credentials. In this case, we automatically set up an Account Integration for you. You can see this integration by going to your Account Settings (gear menu in top navbar) and clicking on **Integrations** in the sidebar menu.

* You sign in to Shippable with another supported source control provider, and add a GitHub integrations through Account Settings -> Integrations. To learn how to do this, read the [Adding a GitHub integration section](#addGithub).

## Signing in with Github

To build repositories hosted on GitHub. you will need to authorize Shippable to access your repositories.

To enable public repositories:

- Log in to <a href="https://app.shippable.com" target="_blank"> Shippable</a>.
- Click on **Authorize application** button to authorize Shippable to access your public
  repositories on GitHub (This is a one-time step). Provide your GitHub password, if prompted.
- Your account is ready to use after this step.
- You can click on the top left menu icon to see a list of your Subscriptions. Choose the subscription you want.
- In the **CI** tab, click the 'Enable Project' section to view all your public and private repositories. Proceed to enabling a project.
- If you don't see your projects in the above step, click on the Account settings (gear icon on the top navigation bar). In the 'Accounts' section click the **Sync** button.

To enable private repositories:

- Go to your **Account Settings** by clicking on the gear icon on the right of the top navbar.
- In the **Git identities** section, authorize Shippable for private repositories.

<a name="addGithub"></a>
## Adding your GitHub integration

- Click on Integrations in the left sidebar menu followed by the '+' icon in the **Account Integrations** panel.

<img width="75%" height="75%" src="../../images/platform/integrations/account-settings.png" alt="Add GitHub credentials">

- Select **scm** as the Integration family.
- Choose **GitHub** from the list of integration types.
-  Name your integration and enter your github api token.
-  Click **Save**

<img src="../../images/platform/integrations/github-integration.png" alt="Add GitHub credentials">

##Editing your GitHub integration

Click on **Integrations** in the left sidebar menu and then click on your integration. You can then change integration name and your github api token.

##Deleting your GitHub integration

If you no longer need the integration, you can delete it by following the steps below.

- Click on **Integrations** in the left sidebar menu, and click on your integration.
- Scroll to the bottom of the page and click on the **Delete** button.
- If there are no Subscriptions using this integration, you will be able to delete it by clicking on **Yes**. You are done at this point.

<img width="50%" height="50%" src="../../images/platform/integrations/confirm-delete-integration.png" alt="Delete integration confirmation screen">

- If your integration is being used by any Subscriptions, you will see a message telling you which Subscriptions are still using the integration.

<img width="50%" height="50%" src="../../images/platform/integrations/cannot-delete-integration.png" alt="Cannot delete integration because of dependencies">

- Go to each Subscription listed in the dependencies and delete it from each.
    - Locate your subscription in the left sidebar menu and click on the dependent Subscription.
    - Click on the **gears** icon and then on **Integrations**.
    - Click on the integration and the **Delete** button.
    - Delete the integration.
- Once you have deleted the integration from all Subscriptions, you can go back to your integration and delete the integration.
