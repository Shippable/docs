main_section: Reference
sub_section: Resources
page_title: Email integration

# Email integration

By default, we send email notifications to the last committer and project owner when a build fails, or the status changes from failed to passed.

We get your email address from your source control management system (GitHub/Bitbucket).

To customize email notifications, you'll need to configure options in the `shippable.yml` file.

##CI notifications

Follow instructions below to configure email notifications for your CI workflows. This is configured in `shippable.yml`.

The yml format looks like this:

```
integrations:
  notifications:
    - integrationName: email
      type: email
      recipients:
        - exampleone@org.com
        - exampletwo@org.com
      branches:
        only:
          - master
          - dev
      on_success: always
      on_failure: always
```

Use the descriptions of each field below to modify the `yml` above and tailor it to your requirements.

- `integrationName` value is always `email` since it is not configured in the UI - 'Account Settings' and 'Subscription' settings.
- `type` is `email`.
- `recipients` specifies the email addresses you want to send build status notifications to. This overrides the default setting of 'last committer' and 'project owner(s)' email address that we get from your source control management system (GitHub/Bitbucket). NOTE: We do not use the email address specified in your 'Account Settings' for notifications.
     - To specify 'last committer' and 'project owner(s)' as part of this list, you can use --last_committer and --owners.
     - For single recipient, use the format `recipients: example@org.com`
- [optional] `branches` allows you to choose the branches you want to send notifications for. By default, notifications are sent for all branches. The `only` tag should be used when you want to send notifications to specific branches. You can also use the `except` tag to exclude specific branches. [Wildcards](../../ci/advancedOptions/branches/) are also supported. [TODO: when new links are updated]
- [optional] You can set the following options for the `on_success`, `on_failure` tags:
     - The value `change` for `on_success` or `on_failure` fields means you will receive notifications only when the build status changes to success or failure respectively.
     - `always` means that you will always receive a notification for that build status.
     - `never` means that you will never receive a notification for that build status.
     - By default, `on_success` is set to `change` and `on_failure` is set to `always` when these tags have not been specified in the `shippable.yml` file.
- [optional] You can set the following options for the `on_start`, `on_pull_request` tags:
     - Setting the value to `always` means that you will always receive a notification for build start/pull request.
     - Setting the value to `never` means that you will never receive a notification for that build start/pull request.
     - By default, `on_start` is set to `never` and `on_pull_request` is set to `always` when these tags have not been specified in the `shippable.yml` file.

You can set `sendConsoleLogs: true` in your email notification configuration in shippable.yml to receive console logs as attachments in build emails.

```yaml
notifications:
    - integrationName: email
      type: email
      recipients:
        - deepika@shippable.com
      sendConsoleLogs: true
```

You can set `sendCoverageReports: true` in your email notification configuration in shippable.yml to receive coverage reports as attachments in build emails.

```yaml
notifications:
    - integrationName: email
      type: email
      recipients:
        - deepika@shippable.com
      sendCoverageReports: true
```

Your coverage report should not contain following file types:

```
.ADE, .ADP, .BAT, .CHM, .CMD, .COM, .CPL, .EXE, .HTA, .INS, .ISP, .JAR, .JS (NEW), .JSE, .LIB, .LNK, .MDE, .MSC, .MSI, .MSP, .MST, .NSH .PIF, .SCR, .SCT, .SHB, .SYS, .VB, .VBE, .VBS, .VXD, .WSC, .WSF, .WSH
```
 else GMAIL will block your message. Reference: [Google blocked messages](https://support.google.com/mail/answer/6590?p=BlockedMessage&visit_id=1-636281843547523379-1154082219&rd=1)

Check our blog ["Notifying CI failure/success status on Email and Slack"](http://blog.shippable.com/notifying-ci-failure/success-status-on-email-slack) for multiple scenarios.

###Turn off email notifications
If you do not want to get notified for any reason, you can turn off email notifications with the following in your `shippable.yml`:

```
notifications:
  - integrationName: email
    type: email
    on_success: never
    on_failure: never
    on_pull_request: never
```
## Pipeline notifications

Pipeline notifications are sent by defining the [notification resource](../../pipelines/resources/notification/) in your `shippable.resources.yml` and then using it in your `shippable.jobs.yml`. More on this is explained in our [Jobs documentation](../../pipelines/jobs/overview/#jobNotifications). [TODO: when new links are updated]
