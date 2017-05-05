page_main_title: Joyent Triton
main_section: Reference
sub_section: Integrations
page_title: Joyent Triton integration

# Joyent Triton integration

Shippable lets you easily deploy your Dockerized applications to popular Container Services like Joyent Triton Public Cloud.

You will first need to configure an account integration with your credentials and/or keys in order to interact with these services using Shippable Pipelines.

To actually use it for CI or Pipelines, you will also need to add this integration to the Subscription that contains your CI or Pipelines.

Follow the steps below to create an account integration with Joyent Triton Public Cloud.

## Adding Joyent Triton integration

1. Click on the gear icon for Account Settings in your top navigation bar and then click on the **Integrations** tab. Click on **Add Integration**

<img src="../../images/reference/integrations/account-settings.png" alt="Joyent Triton credentials">

2. **Integration type:** Locate and select **Joyent Triton Public Cloud**
3. **Integration Name:** Use a distinctive name that's easy to associate to the integration and recall. Example: **jatin-tripub**
4. Enter the username and validity period.
5. Click **Save**. On clicking, it will generate a public key, which will be added in Joyent Triton Account Settings.
6. After the key is added, click on **Done**.

<img src="../../images/reference/integrations/joyent-integration.png" alt="Joyent Triton credentials">

You can now use this integration to set up your Environment and Deployment Pipelines on your Joyent Triton clusters.

##Editing your Joyent Triton integration

You can go to your **Account Settings** at any time, click on **Integrations** in the left sidebar menu, and click the **Edit** button for your Joyent TRITON integration. You can then change integration name, username and validity period.

However, you cannot edit the list of Subscriptions that are allowed to use the integration from this page. To add your integration to additional Subscriptions, read our [Adding your integration to additional Subscriptions section](integrations-overview/#add-subscriptions)

##Deleting your Joyent Triton integration

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