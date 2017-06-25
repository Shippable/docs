page_main_title: SSH Keys
main_section: Reference
sub_section: Integrations
page_title: SSH keys integration

# SSH keys integration

You can set up integrations for the keys you use to integrate with third party services that do not have a native Integration with our platform.

This allows you to store your keys in your Shippable account and use them in your yml with the help of environment variables.

# SSH keys

SSH keys are used to access your projects on the source control. Shippable provides two SSH keys.

* A subscription SSH key is created when a subscription is created on shippable and the public key for it is the one on the subscription settings tab. By default this key does not have access to any projects. Adding the deploy key to your account on source control gives this key access to all the projects in your account.

* Project SSH key is created when a project is enabled on shippable. Any private project will have a deploy key added to the repository and all the private projects are cloned using this key. Public projects will not have this key added to the repository. This key has access to only a particular project and cannot be used to pull or push to/from other repositories.

Every command that runs in your build is executed within an ssh-agent session that contains all the keys present in /tmp/ssh. The subscription key and the project key is also present at this location. 00_sub is the subscription key and 01_deploy is the project key.The sequence of the keys offered for any SSH operation is strictly in alphabetical order. Besides 00_sub and 01_deploy, /tmp/ssh/ will also contain all of the SSH and PEM key subscription integrations enabled . If there are no such integrations, the sequence is to offer 00_sub first, and 01_deploy next.

```
We recommend you use the subscription SSH key to pull other repositories (for example, private submodules) and Project SSH key to pull or push to the same repository.
You may sometimes want to force a key when performing a SSH operation. For example, to force the project key when cloning a repository you can use the following command.
ssh-agent bash -c 'ssh-add /tmp/ssh/01_deploy; git clone git@github.com/orgName/repoName.git /path/to/clone/
```

Apart from these two keys you can also set up key integrations and use those keys to access your projects on source control.For example, create a ["SSH key integration"](../../integrations/keys/ssh). Add this newly created key integration to both the 'Subscription' Settings and the shippable.yml of every project you want to use it in.

Your SSH key will be available on your build container in the `/tmp/ssh/` directory.
<img src="../../images/reference/integrations/viewKeys.png" alt="SSH Keys list" style="width:700px;"/>

You can use this key in the similarly as you use subsbscription key or project key.
You can force this key when performing a SSH operations. For example, to force your custom key when cloning a repository you can use the following command.
```
ssh-agent bash -c 'ssh-add /tmp/ssh/my_custom_key; git clone git@github.com/orgName/repoName.git /path/to/clone/
```

##Adding a SSH Key integration
To create an account integration for an SSH key, do the following:

- Click on Integrations in the left sidebar menu followed by the '+' icon in the **Account Integrations** panel.

<img width="75%" height="75%" src="../../images/reference/integrations/account-settings.png" alt="Add SSH Key credentials">

- Select **key** as the Integration family.
- Choose **SSH Key** from the list of integration types.
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

Click on **Integrations** in the left sidebar menu and then click on your integration. You can then change integration name and ssh key-pair.

##Deleting your SSH Keys integration

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
