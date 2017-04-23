main_section: Reference
sub_section: Integrations
page_title: IRC integration

#IRC integration

You can send notifications to public using Shippable. Support for private IRC rooms coming soon.

To customize the IRC public room notifications, you'll need to configure options in the `shippable.yml` file.

There is no setting up of IRC integration through the UI.

##Configure IRC notification options in the `shippable.yml`
To configure IRC notifications for your project, add the following to the `shippable.yml` file for that project.
```
integrations:
  notifications:
    - integrationName: irc
      type: irc
      recipients:
        - "chat.freenode.net#channel1"
        - "chat.freenode.net#channel2"
      branches:
        only:
          - master
          - dev
      on_success: never
      on_failure: always
```

While the above is a sample code for your `shippable.yml`, use the descriptions of each field below to modify the `yml` and tailor it to your requirements.

- `integrationName` value is always `irc` since it is not configured in the UI - 'Account Settings' and 'Subscription' settings.
- `type` is `irc`.
- `recipients` specifies the IRC public rooms you want to send build status notifications to.
     - For single recipient, use the format `recipients: "chat.freenode.net#channel2"`
- [optional] `branches` allows you to choose the branches you want to send notifications for. By default, notifications are sent for all branches. The `only` tag should be used when you want to send notifications to specific branches. You can also use the `except` tag to exclude specific branches. [Wildcards](../../ci/advancedOptions/branches/) are also supported. [TODO: links to be updated]
- [optional] You can set the following options for the `on_success`, `on_failure` tags:
     - The value `change` for `on_success` or `on_failure` fields means you will receive notifications only when the build status changes to success or failure respectively.
     - `always` means that you will always receive a notification for that build status.
     - `never` means that you will never receive a notification for that build status.
     - By default, `on_success` is set to `change` and `on_failure` is set to `always` when IRC is configured in the `shippable.yml` and these tags have not been specified.
- [optional] You can set the following options for the `on_start`, `on_pull_request` tags:
     - Setting the value to `always` means that you will always receive a notification for build start/pull request.
     - Setting the value to `never` means that you will never receive a notification for that build start/pull request.
     - By default, `on_start` is set to `never` and `on_pull_request` is set to `always` when IRC is configured in the `shippable.yml` and these tags have not been specified.

 ##Pipeline notifications

To use your HipChat integration for your Pipeline workflows, follow the steps below:

Pipeline notifications are sent by defining the [notification resource](../../pipelines/resources/notification/) in your `shippable.resources.yml` and then using it in your `shippable.jobs.yml`. More on this is explained in our [Jobs documentation](../../pipelines/jobs/overview/#jobNotifications). [TODO: when new links are updated]
