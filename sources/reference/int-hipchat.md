main_section: Reference
sub_section: Integrations
page_title: Hipchat integration

# Hipchat integration

You can send HipChat notifications for any status changes for CI and monitored Docker images.

To send these notifications to HipChat channel(s), you will first need to add an integration to your Account Integrations.

##Adding a HipChat integration

There are two actions to set up the HipChat integration through the UI. They are:

- Generate a token for API access
- Add the Hipchat integration to your subscription

###Generate a token for API access

1. Sign in to your HipChat account using [this link to generate a token](https://www.hipchat.com/account/api).
     - Provide credentials to your HipChat account, if prompted.
2. Create a token with `Send Message` and `Send Notification` scopes.

###Add the HipChat integration to your Account
* Go to your **Account Settings** by clicking on the gear menu in the top navbar.

<img src="../../images/reference/integrations/account-settings.png" alt="Add Hipchat credentials">

* Click on **Integrations** in the sidebar menu.
* Click on **Add Integration**.
* Name your integration and enter the HipChat token.
* Click on **Save**. You should now see the integration in your list of integrations.

<img src="../../images/reference/integrations/hipchat-integration.png" alt="Add Hipchat credentials">

##CI notifications

To use your HipChat integration for your CI workflows, follow the steps below:

* First, add the [HipChat integration to your Account](#addHipchatToAccount)
* Go to your Subscription's Settings tab. This should be the Subscription containing the project you want to send HipChat notifications for.
* Click on **Integrations** in the sidebar menu.
* Click on **Add Integration**.
* Name your HipChat integration with a friendly name. This can be the same name as the one in your account integration.
* From the dropdown, choose the account integration you just created in the step above.
* Click on **Save**.

To enable HipChat notifications for your project, use the following format in the `shippable.yml` file for that project:

```
integrations:
  notifications:
    - integrationName: hipchat-integration
      type: hipchat
      recipients:
        - "#roomOne"
        - "#roomTwo"
        - "@userOne"
      branches:
        only:
          - master
          - dev
      on_success: never
      on_failure: always
```
While the above is a sample code for your `shippable.yml`, use the descriptions of each field below to modify the `yml` and tailor it to your requirements.

- `integrationName` value is the name of the HipChat integration you added to the 'Subscription' settings. It is important the name matches exactly. If not, the build will fail with error as [described here](/ci/troubleshoot/#integration-name-specified-in-yml-does-not-match). [TODO: new links when updated]
- `type` is `hipchat`.
- `recipients` specifies the rooms and/or users you want to send the notification to. Please note this is a required field for HipChat notifications to work.
     - Even if there is a single recipient, use the format `recipients: "#roomOne"` for rooms and `@userOne` for users.
- [optional] `branches` allows you to choose the branches you want to send notifications for. By default, notifications are sent for all branches. The `only` tag should be used when you want to send notifications to specific branches. You can also use the `except` tag to exclude specific branches. [Wildcards](../../ci/advancedOptions/branches/) are also supported. [TODO: new links when updated]
- [optional] You can set the following options for the `on_success`, `on_failure` tags:
     - The value `change` for `on_success` or `on_failure` fields means you will receive notifications only when the build status changes to success or failure respectively.
     - `always` means that you will always receive a notification for that build status.
     - `never` means that you will never receive a notification for that build status.
     - By default, `on_success` is set to `change` and `on_failure` is set to `always` when HipChat is configured in the yml and you have not specified these tags.
- [optional] You can set the following options for the `on_start`, `on_pull_request` tags:
     - Setting the value to `always` means that you will always receive a notification for build start/pull request.
     - Setting the value to `never` means that you will never receive a notification for that build start/pull request.
     - By default, `on_start` is set to `never` and `on_pull_request` is set to `always` when HipChat is configured in the yml and you have not specified these tags.

Check our blog [on configuring HipChat for both CI and Pipelines](http://blog.shippable.com/hipchat-integration-is-here).

##Pipeline notifications

To use your HipChat integration for your Pipeline workflows, follow the steps below:

* First, add the [HipChat integration to your Account](#addHipchatToAccount)
* Select your Subscription from the top left menu dropdown on your dashboard. This should be the Subscription containing the project you want to send HipChat notifications for.
* Go to the **Settings** tab and click on **Integrations** in the sidebar menu.
* If you find your integration in the list, you're good to go to the next step. If not, add the account integration to the Subscription by clicking on the `Add Integration` button and completing the required fields.

Pipeline notifications are sent by defining the [notification resource](../../pipelines/resources/notification/) in your `shippable.resources.yml` and then using it in your `shippable.jobs.yml`. More on this is explained in our [Jobs documentation](../../pipelines/jobs/overview/#jobNotifications). [TODO: when new links are updated]

##Editing your Hipchat integration

You can go to your **Account Settings** at any time, click on **Integrations** in the left sidebar menu, and click the **Edit** button for your Hipchat integration. You can then change integration name and your hipchat token.

However, you cannot edit the list of Subscriptions that are allowed to use the integration from this page. To add your integration to additional Subscriptions, read our [Adding your integration to additional Subscriptions section](integrations-overview/#add-subscriptions)

##Deleting your Hipchat integration

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