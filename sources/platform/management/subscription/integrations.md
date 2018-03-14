page_main_title: Integrations
main_section: Platform
sub_section: Management
sub_sub_section: Subscription
page_title: Subscription Integrations
page_description: How to view, add, edit and delete Subscription Integrations in your Shippable account

# Subscription Integrations

Shippable integrates with many third party services/platforms through [integrations](/platform/integration/overview). You can also use integrations to store any sensitive information like tokens, keys, passwords, or simply any key-value pair that is essential for your jobs.

The process of adding an integration is 3 steps:

- [Add an account integration](/platform/tutorial/integration/howto-crud-integration/#creating-an-integration)
- [Add account integration to your subscription](/platform/tutorial/integration/howto-crud-integration/#adding-integration-to-a-subscription) to give the a particular Subscription permission to use your account integration. (Please note that this step can be completed as part of adding an account integration).
- Using it in your yaml configuration for any project in the subscription

A complete list of all supported integrations is [available in the integrations overview page](/platform/integration/overview/).

## Viewing your Subscription Integrations

* Click on your Subscription in the left navbar.

<img src="/images/getting-started/subscriptions.png" alt="Subscription Integration">

* On the Subscription page, click on the **Gears** icon and click on **Integrations**.

<img src="/images/getting-started/subsetting.png" width="400" alt="Subscription Integration Setting">

* You'll be taken to the Integrations page that shows you all integrations that are available for this Subscription.

<img src="/images/platform/management/subscription-integrations.png" alt="Show billing page">

## Adding an integration to your Subscription

If you want to add an existing account integration to your Subscription, please follow [instructions here](/platform/tutorial/integration/howto-crud-integration/#adding-integration-to-a-subscription).

## Edit your Subscription integration

You can click on the integration name and make the following edits to your Subscription integration:

* Change integration name: This does not affect your account integration name, but just changes the name at a Subscription level. Please note that your project YAML files should use the Subscription integration name.
* Change underlying account integration : This is a handy way to start using new credentials for your workflows without needing to change the integration name in the YAML. For example, if Tom added all integrations and then leaves the company, Mary can add her own account integrations, and then change all Subscription integrations to start using her account integrations instead of Tom's.
* Restrict use of the integration to specific projects in the Subscription as a security measure.  

## Deleting an integration from a Subscription

To delete an integration from a Subscription, you can click on the integration name and then click on **Delete** on the next page.

Please note that this step does not delete the integration from your account, but just prevents any projects in that Subscription from using the integration.
