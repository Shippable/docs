page_main_title: Managing Subscription Integrations
main_section: Platform
sub_section: Tutorials
sub_sub_section: Integrations
page_title: Managing Subscription Integrations
page_description: Add, update, and manage Subscription Integrations
page_keywords: Managing Subscription Integrations

# Managing Integrations

Integrations let you store secrets securely and use them during your CI and Assembly Line workflows. These secrets could be passwords, keys, tokens, key-value pairs, etc, and can be used to connect your workflows with third-party services or just to store sensitive information that shouldn't be exposed. A list of supported integrations is available in our [Integrations overview](/platform/integration/overview) document.

While creating an integration, you are asked to give it a friendly name which can then be referenced as needed in the YAML configuration file **shippable.yml**.

<a name="create-sub-integration"></a>
## Creating an integration

You can create an integration in one of two ways:

- **[Org integrations](#create-shared-integration) (recommended for teams)**: These are integrations that are created at a Subscription level, and can be scoped to be used by a subset (or all) of repositories within that Subscription. Access to these integrations is controlled based on Admin, Member, and Collaborator roles. A user that has access to an org integration also has permissions to view and update it in the Shippable UI.  

- **[Personal integrations](#create-personal-integration)**: These are integrations that are created at an Account level, and can be scoped to be used by repositories across several Subscriptions. Only the user who creates a Personal integration is allowed to view integration details or update it.

<a name="create-shared-integrations"></a>
### Creating an org integration (recommended for teams)

- [Go to your Subscription integrations dashboard](#view-sub-integrations) by selecting your Subscription from the left navigation bar, clicking on the **Gear** icon at the top right of your Subscription dashboard, and selecting **Integrations**.

- To add a new integration, click on the **+** icon in the top right corner.

<img width="85%" height="85%" src="/images/platform/tutorial/integrations/create-integration.png" alt="Subscription integrations">

- Select the **Create a subscription integration** tab.

- Give your integration a friendly name and select the type of integration you want to create. Please note that the friendly name specified here should be used in your CI and Assembly Lines config.

<img src="/images/platform/tutorial/integrations/create_integration_at_subscription_level.png" alt="Subscription integrations">

- Complete all integration-specific fields. For instructions, go to the [Integrations overview doc](/platform/integration/overview/) and select the specific third-party integration you're configuring.

- For the **Edit Permissions** dropdown, choose the Roles that can update this integration. For an explanation of how your Source Control Provider organization/team roles map to Shippable roles, please read our [roles and permissions doc](/ci/permissions/#userorg-permissions-mapping-to-shippable-roles). If a user's role is allowed access to this integration, they can view integration details and modify the integration.

- Select the repositories that can use this integration. This means that any **shippable.yml** files in these repositories can reference this integration. Default is **All projects**.

- Click on **Save**.

<a name="create-personal-integration"></a>
### Creating a personal integration

- From the left navigation bar, click on **Integrations**. This will take you to your **Account integrations dashboard**, which shows all the personal integrations you've created.

<img src="/images/platform/tutorial/integrations/create-account-integration.png" alt="Account integrations">

- Click on **+** icon at the top right.

- Give your integration a friendly name.

- Choose the right **Integration type**, depending on what you're trying to configure. Complete all integration-specific fields and click on **Save**. For instructions on how to complete the fields for a specific integration, go to the [Integrations overview doc](/platform/integration/overview/) and select the specific third-party integration you're configuring.

<img src="/images/platform/tutorial/integrations/create-account-integration-2.png" alt="Account integrations">

- Please note that while creating the integration, **you will need to specify which Subscriptions and/or Projects have access to it**.

You can also create a personal integration by going to your [Subscription integrations dashboard](#view-sub-integrations), clicking on **+** to add an integration, selecting the **Use an account integration** tab, and creating an integration.

## Viewing integrations

You can view a list integrations at the following places:

* [Subscription integration dashboard](#view-sub-integrations), that shows you a list of integrations are available to that specific Subscription. Subscription integrations can be org integrations, or personal integrations that were scoped to include that Subscription.

* [Account integrations dashboard](#view-account-integrations), that shows your personal integrations.

<a name="view-sub-integrations"></a>
### Subscription integrations dashboard

Your Subscription integrations dashboard shows you a list of integrations are available to that specific Subscription. Subscription integrations can be org integrations, or personal integrations that were scoped to include that Subscription.

To view Subscription integrations:

- Select your Subscription from the left navigation bar.

<img width="30%" height="30%" src="/images/platform/resources/syncRepo/list-subscriptions.png" alt="Subscription integrations">

- Click on the **Gear** icon in the top right menu, and select **Integrations**

<img src="/images/platform/tutorial/integrations/subscription_gear_menu_integrations.png" alt="Subscription integrations">

- You will see a list of your Subscription integrations. Shared and personal integrations are distinguished by icons as shown below:

<img src="/images/platform/tutorial/integrations/subscription-integrations-list.png" alt="Subscription integrations">

<a name="view-account-integrations"></a>
### Account integrations dashboard

Account integrations dashboard shows you a list of your personal integrations.

- From the left navigation bar, click on **Integrations**.

<img src="/images/platform/tutorial/integrations/create-account-integration.png" alt="Account integrations">

Clicking on any individual integration will show you details for that integration.

<a name="update-sub-integrations"></a>
## Updating integrations

You can update org integrations by going to the specific Subscription integration dashboard, and personal integrations from the Account integration dashboard.

### Updating org integrations

- [Go to your Subscription integrations dashboard](#view-sub-integrations) by selecting your Subscription from the left navigation bar, clicking on the **Gear** icon at the top right of your Subscription dashboard, and selecting **Integrations**.

- Click on the integration you want to update to go to the **Edit** page. Here, you can update any field that you have permissions to.  

- Make the updates and click on **Save**.

### Updating personal integrations

- From the left navigation bar, click on **Integrations**. This will take you to your **Account integrations dashboard**, which shows all the personal integrations you've created.

- Click on the integration you want to update to go to the **Edit** page.

- Make your updates and click on **Save**.

### Updating a Subscription integration created from a personal integration

If you have a Subscription integration that was created as a result of a personal integration being scoped to include that Subscription, you can change it to point to another personal integration if needed.

This is very useful in scenarios where an employee creates a personal integration and uses it in CI/Assembly Line workflows for your organization, and then leaves the company or somehow loses access to the organization. To avoid a situation where you need to create a new integration and update your YAML config everywhere, we let you point the same Subscription integration to a different personal integration.

**Please note that this functionality is only available for Subscription Admins.**

To do this:

- [Go to your Subscription integrations dashboard](#view-sub-integrations) by selecting your Subscription from the left navigation bar, clicking on the **Gear** icon at the top right of your Subscription dashboard, and selecting **Integrations**.

- Click on the integration you want to update to go to the **Edit** page. Here, you can update the following:
    - Integration name, which is used to reference this integration in your YAML config for CI and Assembly Lines
    - Associated personal (i.e. Account) integration. This is a great way to update your secrets without needing to touch YAML config.

- Make your updates and click on **Save**.

## Deleting integrations

Depending on the type of integration, instructions to delete are given below.

### Deleting org integrations

- [Go to your Subscription integrations dashboard](#view-sub-integrations) by selecting your Subscription from the left navigation bar, clicking on the **Gear** icon at the top right of your Subscription dashboard, and selecting **Integrations**.

- Click on the integration you want to delete. On the Integration Edit page, click on **Delete** in the **Delete Integration** panel.

Please note that if this integration is being used in any resources or jobs that are in your CI or Assembly Line workflows, you will see a list of these instead of the **Delete button**. Remove the integration from the jobs and resources, and then delete the integration.

### Deleting personal integrations

- [Go to your Subscription integrations dashboard](#view-sub-integrations) by selecting your Subscription from the left navigation bar, clicking on the **Gear** icon at the top right of your Subscription dashboard, and selecting **Integrations**.

- Click on the integration you want to delete. On the Integration Edit page, click on **Delete** in the **Delete Integration** panel.

Please note that if this integration is being used in any resources or jobs that are in your CI or Assembly Line workflows, you will see a list of these instead of the **Delete button**. Remove the integration from the jobs and resources, and then delete the integration.

### Deleting Subscription integration created from a personal integration

If you delete a Subscription integration that was created as a result of a personal integration being scoped to include that Subscription, deleting it just alters the personal integration scope to exclude that Subscription. It does not actually delete the personal integration from the account of the person who created it.
