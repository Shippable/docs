page_main_title: Sending messages to IRC
main_section: CI
sub_section: Configuration
sub_sub_section: Sending notifications
page_title: Sending IRC notifications
page_description: Configure IRC to send notifications for Continuous Integration and Delivery actions
page_keywords: irc, Continuous Integration, Continuous Deployment, CI/CD, testing, automation

#Sending CI notifications to IRC

You can send IRC notifications for various events in your CI workflow, including when builds start or finish.

##Basic config

The basic configuration looks like this:

```
integrations:
  notifications:
    - integrationName: irc
      type: irc
      recipients:
        - "chat.freenode.net#channel1"
        - "chat.freenode.net#channel2"
```
Use the descriptions of each field below to modify the `yml` and tailor it to your requirements.

- `integrationName` value is always `irc` since no account or subscription integration is required.
- `type` is `irc`.
- `recipients` is an array that specifies the channels you want to send the notification to. If there is just a single recipient, use the format `recipients: "chat.freenode.net#channel1"`

And you're done. You will receive IRC notifications for all branches when builds fail, or change from failed to passed, or pull requests are built. To change some of these default configs, please see the advanced config section below.


##Advanced config

###1. Limiting branches

By default, IRC notifications are sent for builds for all branches. If you want to only send notifications for specific branches, you can do so with the `branches` keyword.

```
integrations:                               
  hub:
    - integrationName: irc   
      type: irc  
      recipients:
        - "chat.freenode.net#channel1"
        - "chat.freenode.net#channel2"
      branches:
        only:
          - master
```

`branches` allows you to choose the branches for which you want to send notifications. The `only` tag should be used when you only want to send notifications for builds of specific branches. You can also use the `except` tag to exclude specific branches. Wildcards are also supported.


###2. Customizing notification triggers

By default, IRC notifications are sent for the following events:

- <i class="ion-ios-minus-empty"></i> A build fails
- <i class="ion-ios-minus-empty"></i> Build status for a project changes from failed to passed
- <i class="ion-ios-minus-empty"></i> A pull request is built

<br>
You can further customize these defaults with the following config:

```
integrations:                               
  hub:
    - integrationName: irc
      type: irc  
      recipients:
        - "chat.freenode.net#channel1"
        - "chat.freenode.net#channel2"
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

If you do not specify any of these tags, the defaults are: `on_success` is set to `change`, `on_failure` is set to `always`, `on_cancel` is set to `on_failure`, `on_start` is set to `never` and `on_pull_request` is set to `always`.

##Removing IRC notifications

To stop sending IRC notifications, simply remove the configuration from the `shippable.yml` for that project.

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
