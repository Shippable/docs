page_main_title: Sending messages to Slack
main_section: CI
sub_section: Sending notifications
page_title: Sending slack notifications
page_description: Configure Slack to send notifications for Continuous Integration and Delivery actions
page_keywords: slack, Continuous Integration, Continuous Deployment, CI/CD, testing, automation

#Sending CI notifications to Slack

You can send Slack notifications for various events in your CI workflow, including when builds start or finish.

##Setup

Before you start, you will need to connect your Slack account with Shippable so we have the credentials to send notifications on your behalf. We do this through [Account Integrations](../platform/integration/overview/), so that any sensitive information is abstracted from your config file. Once you add an account integration, you can use it for all your projects without needing to add it again.

There are 2 steps to add a Slack integration: Configuring the webhook on Slack, and adding the webhook to your Shippable account.

###1. Configure an incoming webhook on Slack

*  Sign in to your Slack account and [go to this link to create an incoming webhook](https://my.slack.com/services/new/incoming-webhook/).
     -  Provide credentials to your Slack account, if prompted.
*  In the **Post Channel** section, use the dropdown and select a channel to create the webhook. It does not matter which channel you choose while creating the webhook. We will override it when you configure the integration on Shippable.
*  Click the 'Add Incoming Webhook integration' button.
*  Copy the text in the 'Webhook URL' section. It looks like this: `https://hooks.slack.com/services/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`.
*  Click the **Save Settings** button.


###2. Add the Slack integration to your Account

-  Go to your **Account Settings** by clicking on the gear icon in the top navigation bar.
-  Click on **Integrations** in the left sidebar menu and then click on **Add integration**
-  Locate **Slack** in the list and click on **Create Integration**
-  Name your integration with a friendly name and enter the Slack webhook URL in the 'Webhook URL' field
-  Choose the Subscription which contains the repository for which you want to send notifications. Since you're likely a member of many organizations, you need to specify which of them can use this integration.
-  Click **Save**

##Basic config

Once you have completed the Setup steps, you are ready to configure your `shippable.yml` to send Slack notifications. The basic configuration looks like this:


```
integrations:
  notifications:
    - integrationName: slack-integration   
      type: slack
      recipients:
        - "#channelOne"
        - "#channelTwo"
```
Use the descriptions of each field below to modify the `yml` and tailor it to your requirements.

- `integrationName` value is the name of the Slack integration you added to your settings. It is important the name matches exactly. If not, the build will fail with error as [described here](/ci/troubleshooting/#integration-name-specified-in-yml-does-not-match).
- `type` is `slack`.
- `recipients` is an array that specifies the channels you want to send the notification to. If there is just a single recipient, use the format `recipients: "#channelOne"`

And you're done. You will receive Slack notifications for all branches when builds fail, or change from failed to passed, or pull requests are built. To change some of these default configs, please see the Advanced config section below.


##Advanced config

###1. Limiting branches

By default, Slack notifications are sent for builds for all branches. If you want to only send notifications for specific branch(es), you can do so with the `branches` keyword.

```
integrations:                               
  notifications:
    - integrationName: slack-integration     #replace with your integration name   
      type: slack  
      recipients:
        - "#channelOne"  
        - "#channelTwo"
      branches:
        only:
          - master
```

`branches` allows you to choose the branches you want to send notifications for. The `only` tag should be used when you want to send notifications for builds of specific branches. You can also use the `except` tag to exclude specific branches. [Wildcards](/ci/specify-branches/) are also supported.


###2. Customizing notification triggers

By default, Slack notifications are sent for the following events:

- <i class="ion-ios-minus-empty"></i> A build fails
- <i class="ion-ios-minus-empty"></i> Build status for a project changes from failed to passed
- <i class="ion-ios-minus-empty"></i> A Pull request is built

<br>
You can further customize these defaults with the following config:

```
integrations:                               
  notifications:
    - integrationName: slack-integration     #replace with your integration name   
      type: slack  
      recipients:
        - "#channelOne"  
        - "#channelTwo"
      on_success: always | change | never
      on_failure: always | change | never
      on_cancel: always | change | never
      on_start: always | never
      on_pull_request: always | never

```

You can set the following options for the `on_success`, `on_failure`, `on_cancel`, `on_start` and `on_pull_request` tags:

- <i class="ion-ios-minus-empty"></i>`always` means that you will always receive a notification for that event.

- <i class="ion-ios-minus-empty"></i> `never` means that you will never receive a notification for that event.

- <i class="ion-ios-minus-empty"></i> `change` for `on_success`, `on_failure` or `on_cancel` fields means you will receive notifications only when the build status changes to success, failure or canceled respectively. This value isn't supported for `on_start` or `on_pull_request`.

If you do not specify any of these tags, the defaults are: `on_success` is set to `change`, `on_failure` is set to `always`, `on_change` is set to `on_failure`, `on_start` is set to `never` and `on_pull_request` is set to `always`.

##Removing Slack notifications

To stop sending Slack notifications, simply remove the configuration from the `shippable.yml` for that project.

If you are not using your Slack notification anywhere else, you can delete it from your Account Integrations list as well.

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
