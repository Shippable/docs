main_section: Reference
sub_section: Integrations
page_title: GitHub Enterprise integration

# GitHub Enterprise integration

We support GitHub Enterprise in 2 flavors:

* Using Shippable Hosted, you can sign in to Shippable with your GitHub or Bitbucket credentials, and then add an integration to your account that enables you to build repositories hosted on your GitHub Enterprise instance. This is described in the sections below.

* You can also buy Shippable Server and run it on-premises or behind your firewall in your private cloud. In this setup, we support authenticating against GitHub Enterprise directly. If you are interested in this model, please send us an email to our <a href="mailto:sales@shippable.com" target="_blank"> Sales team</a>.

##Adding a GitHub Enterprise integration

To add an integration for GitHub Enterprise, you will first need to sign in with GitHub or Bitbucket credentials.

Adding an integration is achieved as follows:

* Go to your **Account Settings** by clicking on the gear menu in the top navbar.

<img src="../../images/reference/integrations/account-settings.png" alt="Add GHE credentials">

* Click on **Integrations** in the sidebar menu.
* Click on **Add Integration**.
* Locate **Github Enterprise** in the list and click on **Create Integration**
* Enter the following:
	* Add a friendly name for your integration
	* Enter the URL for your GitHub Enterprise instance. The URL should be in the format `https://(git hub enterprise URL)/api/v3`
	* Create a **GitHub Enterprise API token** with the permissions you need
		- Go to your GitHub Enterprise account settings and in the left menu, select
   **Personal access tokens**
    	- Click on **Generate token** and on the Generate Token page, select the following permissions as shown below:
			<img src="../../images/reference/integrations/permissions.png" alt="Add GHE credentials">
    	- Click on **Generate token**, and copy the generated token immediately. This is important since you will not see the token once you navigate away from this page.
	* Paste it in the **Token** textbox in Shippable
* Click on **Save**. You should now see the integration in your list of integrations.

<img src="../../images/reference/integrations/ghe-integration.png" alt="Add GHE credentials">

##Editing your Github Enterprise Integration

You can go to your **Account Settings** at any time, click on **Integrations** in the left sidebar menu, and click the **Edit** button for your github enterprise integration. You can then change integration name ,url and github enterprise api token.

However, you cannot edit the list of Subscriptions that are allowed to use the integration from this page. To add your integration to additional Subscriptions, read our [Adding your integration to additional Subscriptions section](integrations-overview/#add-subscriptions)

##Deleting your Github Enterprise integration

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
- Once you have deleted the integration from all Subscriptions, you can go back to **Account Settings** and delete the integration.
