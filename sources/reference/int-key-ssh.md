main_section: Reference
sub_section: Integrations
page_title: SSH keys integration

# SSH keys integration

You can set up integrations for the keys you use to integrate with third party services that do not have a native Integration with our platform.

This allows you to store your keys in your Shippable account and use them in your yml with the help of environment variables.

##Adding a SSH Key integration
To create an account integration for an SSH key, do the following:

- Go to Account settings by clicking on the gear icon in the top navigation bar.

<img src="../../images/reference/integrations/account-settings.png" alt="Add SSH Key">

- Click on the 'Integrations' section.
- Click on the `Add integration` button.
- From the dropdown, select `SSH key`
- Enter a name for your key and then click on the `Generate keys` button. This will generate an SSH key for your account.
- `Save` the generated key.

<img src="../../images/reference/integrations/ssh-key-int.png" alt="Add SSH Key">

You will need to add this key to both the 'Subscription' Settings **and** the `shippable.yml` of every project you want to use it in.

Example `shippable.yml` integration:
```
integrations:
  key:
    - integrationName: MySSHKeyIntegration
      type: ssh-key
```
 * `integrationName` is the name of the SSH integration you added to the 'Subscription' settings.
 * `type` is ssh-key

Your SSH key will be available on your build minion in the `/tmp/ssh/` directory. You can then use the key for ssh commands in your `shippable.yml`.

##Editing your SSH Keys integration

You can go to your **Account Settings** at any time, click on **Integrations** in the left sidebar menu, and click the **Edit** button for your SSH Key integration. You can then change integration name and ssh key-pair.

However, you cannot edit the list of Subscriptions that are allowed to use the integration from this page. To add your integration to additional Subscriptions, read our [Adding your integration to additional Subscriptions section](integrations-overview/#add-subscriptions)

##Deleting your SSH Keys integration

If you no longer need the integration, you can delete it by following the steps below.

-  Go to your **Account Settings** by clicking on the gear icon in the top navigation bar.

<img src="../../images/reference/integrations/account-settings.png" alt="Account settings">

-  Click on **Integrations** in the left sidebar menu and then click on **Add integration**
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
- Once you have delete the integration from all Subscriptions, you can go back to **Account Settings** and delete the integration.