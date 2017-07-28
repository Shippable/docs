page_main_title: Joyent Triton
main_section: Platform
sub_section: Integrations
page_title: Joyent Triton integration

# Joyent Triton integration

Shippable lets you easily deploy your Dockerized applications to popular Container Services like Joyent Triton Public Cloud.

You will first need to configure an account integration with your credentials and/or keys in order to interact with these services using Shippable Pipelines.

To actually use it for CI or Pipelines, you will also need to add this integration to the Subscription that contains your CI or Pipelines.

Follow the steps below to create an account integration with Joyent Triton Public Cloud.

## Adding Joyent Triton integration

- Click on Integrations in the left sidebar menu followed by the '+' icon in the **Account Integrations** panel.

<img width="75%" height="75%" src="../../images/platform/integrations/account-settings.png" alt="Add Joyent Triton Cloud credentials">

- Select **deploy** as the Integration family.
- Choose **Joyent Triton Cloud** from the list of integration types.
2. **Integration type:** Locate and select **Joyent Triton Public Cloud**.
3. **Integration Name:** Use a distinctive name that's easy to associate to the integration and recall. Example: **jatin-tripub**.
4. Enter the username and validity period.
5. Click **Save**. On clicking, it will generate a public key, which will be added in Joyent Triton Account Settings.
6. After the key is added, click on **Done**.

<img src="../../images/platform/integrations/joyent-integration.png" alt="Joyent Triton credentials">

You can now use this integration to set up your Environment and Deployment Pipelines on your Joyent Triton clusters.

##Editing your Joyent Triton integration

Click on **Integrations** in the left sidebar menu and then click on your integration. You can then change integration name, username and validity period.

##Deleting your Joyent Triton integration

If you no longer need the integration, you can delete it by following the steps below.

- Click on **Integrations** in the left sidebar menu, and click on your integration.
- Scroll to the bottom of the page and click on the **Delete** button.
- If there are no Subscriptions using this integration, you will be able to delete it by clicking on **Yes**. You are done at this point.

<img width="50%" height="50%" src="../../images/platform/integrations/confirm-delete-integration.png" alt="Delete integration confirmation screen">

- If your integration is being used by any Subscriptions, you will see a message telling you which Subscriptions are still using the integration.

<img width="50%" height="50%" src="../../images/platform/integrations/cannot-delete-integration.png" alt="Cannot delete integration because of dependencies">

- Go to each Subscription listed in the dependencies and delete it from each.
    - Locate your subscription in the left sidebar menu and click on the dependent Subscription.
    - Click on the **gears** icon and then on **Integrations**.
    - Click on the integration and the **Delete** button.
    - Delete the integration.
- Once you have deleted the integration from all Subscriptions, you can go back to your integration and delete the integration.
