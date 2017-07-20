page_main_title: PEM Keys
main_section: Platform
sub_section: Integrations
page_title: PEM integration

# PEM keys integration

##Adding a PEM key integration
To create an account integration for a PEM key, do the following:

- Click on Integrations in the left sidebar menu followed by the '+' icon in the **Account Integrations** panel.

<img width="75%" height="75%" src="../../images/platform/integrations/account-settings.png" alt="Add PEM Key credentials">

- Select **key** as the Integration family.
- Choose **PEM Key** from the list of integration types.
- Enter a name for your key and then paste your key into the textbox labeled `key`.
- `Save` your key.

<img src="../../images/platform/integrations/pem-key-int.png" alt="Add PEM Key">

You will need to add this key to both the 'Subscription' Settings **and** the `shippable.yml` of every project you want to use it in.

Example `shippable.yml` integration:
```
integrations:
  key:
    - integrationName: MyPEMKeyIntegration
      type: pem-key
```
 * `integrationName` is the name of the PEM integration you added to the 'Subscription' settings.
 * `type` is pem-key

Your PEM key will be available on your build minion in the `/tmp/ssh/` directory, and can be used in your `shippable.yml`.

##Editing your PEM Keys

Click on **Integrations** in the left sidebar menu and then click on your integration. You can then change integration name and pem key.

##Deleting your PEM Keys integration

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
