page_main_title: Sending CI notifications to Slack and other notification providers
main_section: CI
sub_section: Configuration
sub_sub_section: Sending build notifications

# Sending notifications

Shippable supports sending email, Slack, HipChat and IRC notifications for the following events:

* When the build starts
* When build succeeds, or status changes from failure to success
* When the build fails, or status changes from success to failure
* When a build is canceled

You can configure these notifications in your **shippable.yml** file. Notifications are highly customizable and can be sent for all branches and events, or a subset of both.

For more information and a detailed tutorial on sending notifications, please select your notification provider below:

-  [Sending Slack notifications](/ci/slack-notifications/)
-  [Sending Hipchat notifications](/ci/hipchat-notifications/)
-  [Sending Email notifications](/ci/email-notifications/)
-  [Sending IRC notifications](/ci/irc-notifications/)

For providers that are not supported natively, you can still use [webhook notifications](/ci/webhook/) to send notifications for events.

## Default behavior

By default, email notifications are sent to the committer and commit author if they are 'members' of the repository, i.e. they have admin or push permissions to the repository. These default notifications are sent if:

*  a build fails
*  a previously failing build is now successful


## Basic configuration

To configure notifications, follow the steps below:

* If you're configuring Slack, Hipchat, or Webhook notifications, create an Account integration with your credentials, URL, etc.
* Configure the `integrations` section of your **shippable.yml** to specify notification targets and filters

###1. Create an account integration

Please skip this section if you are configuring email or IRC notifications.

For Slack, Hipchat, or Webhook, choose your provider and follow step for **Creating an Account Integration**:
    * [Slack integration](/platform/integration/slackKey)
    * [Hipchat integration](/platform/integration/hipchatKey)
    * [Webhook integration](/platform/integration/webhook)

Write down the integration name since you will need it for the YAML config below.

###2. Add CI config

Add the following snippet to **shippable.yml** to configure what you need:

```
integrations:
  notifications:
    - integrationName: <integration name>   
      type: <type of notification>
      recipients:                          
        - recipient1
        - recipient2
```

* `integrationName` should be the same as what you created in step 1.
*  `type` can be set to `slack`, `hipchat`, `irc`, `email`, or `webhook`. The `webhook` type is a generic type through which you can send notifications to any providers not supported natively, such as Microsoft Teams.
* `recipients` is an array of recipients.
    * For `slack`, each recipient is a channel, specified in the format `"#channel1"`
    * For `hipchat`, each recipient can be a channel, specified as `"#channel1"`, or a user, specified as `"@user1"`
    * For `email`, each recipient is an email address, such as `foo@example.com`
    * For `irc`, each recipient is a channel, such as `"chat.freenode.net#channel1"`
    * For `webhook`, there are no `recipients`, but you can instead include a `payload` section with a similar structure, where you can pass an array of key value pairs in the format `bar=$BAR`

##Advanced config

###1. Limiting branches

By default, notifications are sent for builds for all branches. If you want to only send notifications for specific branch(es), you can do so with the `branches` keyword.

```
integrations:
  notifications:
    - integrationName: <integration name>   
      type: <type of notification>
      recipients:                          
        - recipient1
        - recipient2
      branches:
        only:
          - master
```

`branches` allows you to choose the branches you want to send notifications for. The `only` tag should be used when you want to send notifications for builds of specific branches. You can also use the `except` tag to exclude specific branches. [Wildcards](/ci/specify-branches/) are also supported.

###2. Customizing notification triggers

By default, notifications are sent for the following events:

* A build fails
* Build status for a project changes from failed to passed
* A Pull request is built

You can further customize these defaults with the following config:

```
integrations:
  notifications:
    - integrationName: <integration name>   
      type: <type of notification>
      recipients:                          
        - recipient1
        - recipient2
      on_success: always | change | never
      on_failure: always | change | never
      on_cancel: always | change | never
      on_start: always | never
      on_pull_request: always | never

```

You can set the following options for the `on_success`, `on_failure`, `on_cancel`, `on_start` and `on_pull_request` tags:

* `always` means that you will always receive a notification for that event.

* `never` means that you will never receive a notification for that event.

* `change` for `on_success`, `on_failure` or `on_cancel` fields means you will receive notifications only when the build status changes to success, failure or canceled respectively. This value isn't supported for `on_start` or `on_pull_request`.

If you do not specify any of these tags, the defaults are: `on_success` is set to `change`, `on_failure` is set to `always`, `on_change` is set to `on_failure`, `on_start` is set to `never` and `on_pull_request` is set to `always`.

##Removing notifications

To stop sending notifications, simply remove the configuration from the **shippable.yml** for that project.

For Slack and Hipchat, if you are not using your notification integration anywhere else, you can delete it from your Account Integrations as well.

##Further Reading

- [Sending Slack notifications](/ci/slack-notifications/)
- [Sending Hipchat notifications](/ci/hipchat-notifications/)
- [Sending Email notifications](/ci/email-notifications/)
- [Sending IRC notifications](/ci/irc-notifications/)
- [Sending webhooks](/ci/webhook)
