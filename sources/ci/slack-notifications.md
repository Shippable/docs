page_main_title: Sending messages to Slack
main_section: CI
sub_section: Configuration
sub_sub_section: Sending notifications
page_title: Sending slack notifications
page_description: Configure Slack to send notifications for Continuous Integration and Delivery actions
page_keywords: slack, Continuous Integration, Continuous Deployment, CI/CD, testing, automation

#Sending CI notifications to Slack

You can send Slack notifications for various events in your CI workflow, including when builds start or finish.

##Setup

Before you start, you will need to connect your Slack account with Shippable so we have the credentials to send notifications on your behalf. We do this through [Integrations](../platform/integration/overview/), so that any sensitive information is abstracted from your config file.

There are 2 steps to add a Slack integration: Configuring the webhook on Slack, and adding the webhook to your Shippable account.

###1. Configure an incoming webhook on Slack

* Follow instructions in the Slack docs to [create an incoming webhook](https://get.slack.help/hc/en-us/articles/115005265063-Incoming-WebHooks-for-Slack).
*  Copy the text in the 'Webhook URL' section. It looks like this: `https://hooks.slack.com/services/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`.

###2. Add the Slack integration to Shippable

-  Follow instructions in the [Slack integration doc](/platform/integration/slackKey) to create a Slack integration. You will need the Webhook URL from the previous step.

##Basic config

Once you have completed the Setup steps, you are ready to configure your **shippable.yml** to send Slack notifications. The basic configuration looks like this:


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

If you do not specify any of these tags, the defaults are: `on_success` is set to `change`, `on_failure` is set to `always`, `on_cancel` is set to `change`, `on_start` is set to `never` and `on_pull_request` is set to `always`.

##Removing Slack notifications

To stop sending Slack notifications, simply remove the configuration from the **shippable.yml** for that project.

If you are not using your Slack notification anywhere else, you can delete it from your Integrations list as well.
