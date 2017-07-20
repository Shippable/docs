page_main_title: Quay.io
main_section: Platform
sub_section: Integrations
page_title: Quay integration

# Quay integration

You will need to configure this integration in order to pull or push images to Quay.io.

##Adding Quay.io Integration on Shippable

1. Click on Integrations in the left sidebar menu followed by the '+' icon in the **Account Integrations** panel.

<img width="75%" height="75%" src="../../images/platform/integrations/account-settings.png" alt="Add Quay credentials">

2. Select **hub** as the Integration family.
3. Choose **Quay.io** from the list of integration types.
4. For **Integration Name**, use a distinctive name that's easy to associate to the integration and recall. Example: **quay_integration**.
5. Enter your credentials.
6. Assign this integration to the Subscription(s) you want to use it in. Since you're likely a member of many organizations, you need to specify which of them can use this integration.
7. Click on `Save`.

<img src="../../images/platform/integrations/quay-integration.png" alt="Add Quay credentials">

The integration will now be available to all your continuous integration and deployment workflows.

##Editing your Quay.io integration

Click on **Integrations** in the left sidebar menu and then click on your integration. You can then change integration name, username, password, email and accessToken.

##Deleting your Quay.io integration

If you no longer need the integration, you can delete it by following the steps below.

- Click on **Integrations** in the left sidebar menu, and click on your integration.
- Scroll to the bottom of the page and click on the **Delete** button.
- If there are no Subscriptions using this integration, you will be able to delete it by clicking on **Yes**. You are done at this point.

<img width="50%" height="50%" src="../../images/platform/integrations/confirm-delete-integration.png" alt="Delete integration confirmation screen">

- If your integration is being used by any Subscriptions, you will see a message telling you which Subscriptions are still using the integration.

<img width="50%" height="50%" src="../../images/platform/integrations/cannot-delete-integration.png" alt="Cannot delete integration because of dependencies">

- Go to each Subscription listed in the dependencies and delete it from each.
    - Locate your subscription in the left sidebar menu and click on the dependent Subscription.

    <img width="30%" height="30%" src="/images/platform/integrations/list-subscriptions.png" alt="List subscriptions">

    - Click on the **gears** icon and then on **Integrations**.
    - Click on the integration and the **Delete** button.
    - Delete the integration.
- Once you have deleted the integration from all Subscriptions, you can go back to your integration and delete the integration.
