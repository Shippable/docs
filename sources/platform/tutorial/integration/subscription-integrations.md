page_main_title: Managing Subscription Integrations
main_section: Platform
sub_section: Tutorials
sub_sub_section: Integrations
page_title: Managing Subscription Integrations
page_description: Add, update, and manage Subscription Integrations
page_keywords: Managing Subscription Integrations

# Managing Subscription Integrations

A Subscription integration can be created by anyone with access to the Subscription. They are owned by the Subscription, regardless of who created them. Subscription integrations can be scoped to be used by a subset (or all) of repositories within that Subscription.

You need a Subscription integration in order to use the integration in your CI and Assembly Lines configuration file **shippable.yml**.

<a name="create-sub-integration"></a>
## Creating Subscription Integrations

You can create a Subscription integration in one of two ways:

- Creating a new integration at a Subscription level (**recommended**): Do this if you want to created a shared integration that can be viewed and updated by multiple people in your organization, depending on their roles.

- Creating an integration from an [Account Integration](/platform/tutorial/integration/howto-crud-integration): Do this if you do not want anyone else to access what's stored in the integration, or if you want to use the same integration in multiple Subscriptions.

### Creating a new integration at the Subscription level (Recommended approach)

- [Go to your Subscription integrations dashboard](#view-sub-integrations) by selecting your Subscription from the left navigation bar, clicking on the **Gear** icon at the top right of your Subscription dashboard, and selecting **Integrations**.

- To add a new integration, click on the **+** icon in the top right corner.

<img width="85%" height="85%" src="/images/platform/tutorial/integrations/create-integration.png" alt="Subscription integrations">

- Select the **Create a subscription integration** tab.

- Give your integration a friendly name and select the type of integration you want to create. Please note that the friendly name specified here should be used in your CI and Assembly Lines config.

<img src="/images/platform/tutorial/integrations/create_integration_at_subscription_level.png" alt="Subscription integrations">

- Complete all integration-specific fields. For instructions, go to the [Integrations overview doc](/platform/integration/overview/) and select the specific third-party integration you're configuring.

- For the **Edit Permissions** dropdown, choose the Roles that can update this integration.

- Select the repositories that can use this integration. Default is **All projects**.

- Click on **Save**.

### Creating an integration from an Account Integration

- [Go to your Subscription integrations dashboard](#view-sub-integrations) by selecting your Subscription from the left navigation bar, clicking on the **Gear** icon at the top right of your Subscription dashboard, and selecting **Integrations**.

- First, look at the list of Subscription integrations to make sure the one you need isn't already part of your Subscription. If you granted access to this Subscription while [creating the account integration](/platform/tutorial/integration/howto-crud-integration), a corresponding Subscription integration is auto-created and should already be present in the list.

- If you don't see the integration you need, click on the **+** icon in the top right corner.

<img src="/images/platform/tutorial/integrations/create-integration.png" alt="Subscription integrations">

- Select the **Use an account integration** tab.

- Give your integration a friendly name, select the type of integration you want to create, and the account integration. If you do not already have the account integration created, you can also create it from here by choosing **Add account integration**. Please also note that the friendly name specified here should be used in your CI and Assembly Lines config.

<img src="/images/platform/tutorial/integrations/create_integration_from_account_int.png" alt="Subscription integrations">

- Select the repositories that can use this integration. Default is **All projects**.

- Click on **Save**.

<a name="view-sub-integrations"></a>
## View Subscription integration dashboard

You can manage Subscription integrations in one place by going to your Subscription Integration dashboard.

- Select your Subscription from the left navigation bar.

<img width="30%" height="30%" src="/images/platform/resources/syncRepo/list-subscriptions.png" alt="Subscription integrations">

- Click on the **Gear** icon in the top right menu, and select **Integrations**

<img src="/images/platform/tutorial/integrations/subscription_gear_menu_integrations.png" alt="Subscription integrations">

- You will see a list of your Subscription integrations. This list contains integrations that were created at a Subscription level, as well as ones that were created from an account integration. The two types are distinguished by icons as shown below:

<img src="/images/platform/tutorial/integrations/subscription-integrations-list.png" alt="Subscription integrations">

<a name="update-sub-integrations"></a>
## Updating Subscription integrations

- [Go to your Subscription integrations dashboard](#view-sub-integrations) by selecting your Subscription from the left navigation bar, clicking on the **Gear** icon at the top right of your Subscription dashboard, and selecting **Integrations**.

- Click on the integration you want to update to go to the **Edit** page.

- For integrations that were created at a Subscription level, you can update any field that you have permissions to.  

- For integrations that were created at an Account level, you can update the following:
    - Integration name, which is used to reference this integration in your YAML config for CI and Assembly Lines
    - Associated Account integration. This is a great way to update your secrets without needing to touch YAML config.

- Make the updates and click on **Save**.

## Deleting Subscription integrations

- [Go to your Subscription integrations dashboard](#view-sub-integrations) by selecting your Subscription from the left navigation bar, clicking on the **Gear** icon at the top right of your Subscription dashboard, and selecting **Integrations**.

- Click on the integration you want to delete. On the Integration Edit page, click on **Delete** in the **Delete Integration** panel.

Please note the following:

- If this integration is being used in any resources or jobs that are in your CI or Assembly Line workflows, you will see a list of these instead of the **Delete button**. Remove the integration from the jobs and resources, and then delete the integration.

- If the integration was created at an Account level, deleting it at the Subscription level will not delete the user's Account integration. It will just remove scopes, so that it cannot be used in that Subscription.  
