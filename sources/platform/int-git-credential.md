page_main_title: Git Credential
main_section: Platform
sub_section: Integrations
page_title: Git credential integration

# Git credential integration

You can setup a Git credential integration to be used by Git operations which specifically need to happen over HTTP(S).

For CI, this applies to the `git_sync` section which Shippable runs. This is not available beyond this section.


## Adding a Git credential integration
To create an account integration for a Git credential, do the following:

- Click on Integrations in the left sidebar menu followed by the '+' icon in the **Account Integrations** panel.

<img width="75%" height="75%" src="../../images/reference/integrations/account-settings.png" alt="Add SSH Key credentials">

- Select **generic** as the integration family.
- Choose **Git Credential** from the list of integration types.
- Enter a name of the integration.
- Enter the following fields:
    - **Host:** This is the SCM host. For Github, this will be `github.com` and for Bitbucket, this is `bitbucket.org`.
    - **Port:** Port used to connect to the SCM host. Generally this is 443 if the connection is HTTPS.
    - **Username:** The username used to connect to the Git host.
    - **Password:** The secure password used to connect to the Git host.
- Click **Save**

<img width="75%" height="75%" src="../../images/reference/integrations/int-git-credential.png" alt="Add Git credential integration">

You can also pick the subscriptions/projects that have access to this integration. You can do this later too.

### Usage

Example `shippable.yml` integration:
```
integrations:
  generic:
    - integrationName: git-cred-1
```

* `integrationName` is the name of the Git integration you added to the 'Subscription' settings.
* This credential will then be available to the `git_sync` steps.

## Editing your Git credential integration

Click on **Integrations** in the left sidebar menu and then click on your integration. You can then change integration name and Git credential.

## Deleting your Git credential integration

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
