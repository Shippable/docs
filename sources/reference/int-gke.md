page_main_title: Google Container Engine
main_section: Reference
sub_section: Integrations
page_title: GKE integration

# GKE integration

To deploy applications to GKE, you need to configure an account integration with credentials to access your GKE account.

##Adding the GKE Integration

1. Go to your <a href="https://console.cloud.google.com" target="_blank"> Google Cloud Platform (GCP) Console</a>.
2. Create a new Service account by following the instructions in Google's documentation for <a href="https://cloud.google.com/storage/docs/authentication#service_accounts" target="_blank"> generating a service account credential</a>.
3. Generate a private key in JSON format.
4. Copy the JSON key you generated for your Service account.
5. Sign in to <a href="https://app.shippable.com" target="_blank"> Shippable</a>.
6. Click on Integrations in the left sidebar menu followed by the '+' icon in the **Account Integrations** panel.

<img width="75%" height="75%" src="../../images/reference/integrations/account-settings.png" alt="Add Google Container Engine credentials">

7. Select **deploy** as the Integration family.
8. Choose **Google Container Engine** from the list of integration types.
9. For **Integration Name** use a distinctive name that's easy to associate to the integration and recall. Example: **GKE-Integration**.
10. Paste your JSON key.
11. Click on **Save**.

<img src="../../images/reference/integrations/gke-integration.png" alt="Add GKE integration">

##Editing your GKE integration

Click on **Integrations** in the left sidebar menu and then click on your integration. You can then change integration name and JSON key(service account credentials from google developer console).

##Deleting your GKE integration

If you no longer need the integration, you can delete it by following the steps below.

- Click on **Integrations** in the left sidebar menu, and click on your integration.
- Scroll to the bottom of the page and click on the **Delete** button.
- If there are no Subscriptions using this integration, you will be able to delete it by clicking on **Yes**. You are done at this point.

<img width="50%" height="50%" src="../../images/reference/integrations/confirm-delete-integration.png" alt="Delete integration confirmation screen">

- If your integration is being used by any Subscriptions, you will see a message telling you which Subscriptions are still using the integration.

<img width="50%" height="50%" src="../../images/reference/integrations/cannot-delete-integration.png" alt="Cannot delete integration because of dependencies">

- Go to each Subscription listed in the dependencies and delete it from each.
    - Locate your subscription in the left sidebar menu and click on the dependent Subscription.

    <img width="30%" height="30%" src="/images/reference/integrations/list-subscriptions.png" alt="List subscriptions">

    - Click on the **gears** icon and then on **Integrations**.
    - Click on the integration and the **Delete** button.
    - Delete the integration.
- Once you have deleted the integration from all Subscriptions, you can go back to your integration and delete the integration.
