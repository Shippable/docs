page_main_title: Integrations
main_section: Platform
sub_section: Management

#Integrations

Shippable integrates with many third party services/platforms and you can leverage this by setting up an account integration and then using the integration at any point in your yml configuration.

A complete list of all supported third-party integrations is [available in the integrations overview page](/platform/integration/overview/).

This page shows you how to manage your integrations and perform the following actions:

- [Viewing an account integration](#view-integration)
- [Adding an account integration](#add-integration)
- [Deleting an account integration](#delete-integration)

<a name="view-integration"></a>
##Viewing your account integrations

- Click on **Integrations** in the left sidebar menu.

<img src="/images/getting-started/account-settings.png" alt="Add Account Integration">

This will show you a list of all configured integrations.

<img src="/images/getting-started/list-integrations.png" alt="List of integrations
under Account Settings">

<a name="add-integration"></a>
##Adding an account integration

- Click on **Integrations** in the left sidebar menu.

<img src="/images/getting-started/account-settings.png" alt="Add Account Integration">

This will show you a list of all configured integrations.

- Click on **Add integration** to add a new integration.

<img src="/images/getting-started/add-integration.png" alt="Add Account Integration">

- Select the **Integration Family** and **Integration Type** you want to add from the list. Choose a friendly name for your integration and click on **Create Integration**.

- Proceed with the configuration of that specific integration. You can find instructions for specific instructions by going to our [Integrations overview](/platform/integration/overview/) and selecting the one you're trying to add

- **Please note that while creating the integration, you will need to specify which [Subscriptions](/#subscription) have access to it.** This is a very important step and if you miss it, you will not be able to use it in your ymls.

- After you have completed all fields on the **Add Integration** page, click on **Save**.

The integration should now show up on your **Integrations** page. This integration will be available to all your projects in the subscription(s) you chose and can be used in the configuration yml files.

Further details and examples of how a specific integration is used is available in the
section for each integration.

<a name="delete-integration"></a>
## Deleting an account integration

- Click on **Integrations** in the left sidebar menu.

<img src="/images/getting-started/account-settings.png" alt="Add Account Integration">

This will show you a list of all configured integrations.

- To delete an integration, simply click on the **Delete** button for the integration you want to delete.

<img src="/images/getting-started/delete-integration.png" alt="Delete Account
Integration" style="width:700px;"/>

Delete will fail if there are any projects actively using the integration, so make sure the integration is not being used in any project before deleting it.
