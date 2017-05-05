page_main_title: Gitlab
main_section: Reference
sub_section: Integrations
page_title: Gitlab integration

# Gitlab integration

In order to integrate with GitLab, you need to sign into Shippable using your GitHub/Bitbucket account and then add GitLab as an account integration.

If you did not sign in to Shippable with GitLab credentials but want to connect to your Gitlab account for CI or Pipelines, you should add an account integration for Gitlab.

##Adding a Gitlab integration

To add an integration for Gitlab, you will first need to sign in with GitHub or Bitbucket credentials.

* Go to your **Account Settings** by clicking on the gear menu in the top navbar.

<img src="../../images/reference/integrations/account-settings.png" alt="Add Gitlab credentials">

* Click on **Integrations** in the sidebar menu.
* Click on **Add Integration**.
* Locate **Gitlab** in the list and click on **Create Integration**
* Enter the following:
	* Add a friendly name for your integration
	* Enter the URL for your GitLab instance. The URL should be in the format `https://(GitLab URL)/api/v3`. For example, if you're using gitlab.com, this will `https://gitlab.com/api/v3`
	* Copy your **Gitlab private token** and paste it in the **Token** textbox. To get your token,  go to your GitLab profile settings, select **Account** from the left menu, and copy the private token provided
* Click on **Save**. You should now see the integration in your list of integrations.

##Editing your Gitlab integration

You can go to your **Account Settings** at any time, click on **Integrations** in the left sidebar menu, and click the **Edit** button for your Gitlab integration. You can then change integration name ,url and gitlab api token.

However, you cannot edit the list of Subscriptions that are allowed to use the integration from this page. To add your integration to additional Subscriptions, read our [Adding your integration to additional Subscriptions section](integrations-overview/#add-subscriptions)

##Deleting your Gitlab integration

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