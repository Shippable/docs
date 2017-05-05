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
6. Click on the gear icon for Account Settings in your top navigation bar and then click on the **Integrations** section.

<img src="../../images/reference/integrations/account-settings.png" alt="Add GKE integration">

7. Click on the **Add Integration** button.
8. For **Integration type**, choose **Google Container Engine** from the list of dropdown choices.
9. For **Integration Name** use a distinctive name that's easy to associate to the integration and recall. Example: **GKE-Integration**.
10. Paste your JSON key.
11. Click on **Save**.

<img src="../../images/reference/integrations/gke-integration.png" alt="Add GKE integration">

##Editing your GKE integration

You can go to your **Account Settings** at any time, click on **Integrations** in the left sidebar menu, and click the **Edit** button for your GKE integration. You can then change integration name and JSON key(service account credentials from google developer console).

However, you cannot edit the list of Subscriptions that are allowed to use the integration from this page. To add your integration to additional Subscriptions, read our [Adding your integration to additional Subscriptions section](integrations-overview/#add-subscriptions)

##Deleting your GKE integration

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