page_main_title: Using Webhook Integration
main_section: CI
sub_section: Configuration
sub_sub_section: Advanced config
page_title: Sending Webhook notifications
page_keywords: webhook, Continuous Integration, Continuous Deployment, CI/CD, testing, automation

#Using a Webhook Integration in CI

Webhook integrations can be used to send payloads to external entities for various events in your CI workflow, including when builds start or finish.

##Setup

Before you start, you will need to connect your external entity with Shippable so that we have the credentials to send the payload on your behalf. We do this through [integrations](/platform/integration/overview/), so that any sensitive information is abstracted from your config file.

###Add a Webhook integration to Shippable

- Follow instructions in the [Webhook integration document](/platform/integration/webhook) to add a webhook integration.

##Basic config

Once you have added the integration to Shippable, you are ready to configure your **shippable.yml** to send the webhook payload. The basic configuration looks like this:


```
integrations:
  notifications:
    - integrationName: webhook-integration   
      type: webhook
      payload:
        - foo=$FOO
        - bar=$BAR
```
Use the descriptions of each field below to modify the `yml` and tailor it to your requirements.

- `integrationName` value is the name of the webhook integration you added. It is important the name matches exactly. If not, the build will fail with error as [described here](/ci/troubleshooting/#integration-name-specified-in-yml-does-not-match).
- `type` is `webhook`.
- `payload` is an array specifying the payload you want to send to the external entity.

And you're done. The webhook payload will be sent to the endpoint in the integration for all branches when builds fail or change from failure to success. To further configure when the webhook is sent, see the advanced config section below.


##Creating GitHub issues with a webhook integration

If you want to create a issue on GitHub when your build fails, you can provide the GitHub repository API endpoint to create an issue in your integration.

<img src="/images/ci/add-webhook-int.png" alt="Adding webhook integration">

You can configure your **shippable.yml**:

```
integrations:
  notifications:
    - integrationName: webhook-integration   #issues will be created in the specified GitHub project
      type: webhook
      payload:
        - title=ShippableBuild - $REPO_FULL_NAME - $BUILD_NUMBER
        - body=Shippable Run $BUILD_NUMBER ($BUILD_URL) for $COMPARE_URL  
      on_success: never
      on_failure: always
      on_cancel: never
```
Use the descriptions of each field below to modify the `yml` and tailor it to your requirements.

- `integrationName` value is the name of the webhook integration you added to your settings. It is important the name matches exactly. If not, the build will fail with error as [described here](/ci/troubleshooting/#integration-name-specified-in-yml-does-not-match).
- `type` is `webhook`.
- `payload` is an array specifying the payload you want to send to GitHub.
  - `title` in payload is to specify the title of the issue.
  - `body` in payload is the description of the issue to be created.
- `on_success` is set to `never` so that issues will not be created for successful builds.
- `on_failure` is set to `always` so that issues will always be created for failing builds.  This could also be set to `change` if you only want to open an issue when the previous build in that branch did not fail.
- `on_cancel` is set to `never` so that issues will not be created for canceled builds.

And you're done. A GitHub issue will be created when builds fail. To further configure when the webhook is sent, see the advanced config section below.

##Advanced config

###1. Limiting branches

By default, webhook notifications are sent for builds for all branches. If you want to only send notifications for specific branches, you can do so with the `branches` keyword.

```
integrations:                               
  notifications:
    - integrationName: webhook-integration     #replace with your integration name   
      type: webhook  
      payload:
        - foo=$FOO
        - bar=$BAR
      branches:
        only:
          - master
```

`branches` allows you to choose the branches for which you want to send notifications. The `only` tag should be used when you want to send notifications for builds of specific branches. You can also use the `except` tag to exclude specific branches. [Wildcards](/ci/specify-branches/) are also supported.


###2. Customizing notification triggers

By default, webhook notifications are sent for the following events:

- A build fails
- Build status for a project changes from failure to success

<br>
You can further customize these defaults with the following config:

```
integrations:                               
  notifications:
    - integrationName: webhook-integration     #replace with your integration name   
      type: webhook  
      payload:
        - foo=$FOO
        - bar=$BAR
      on_success: always | change | never
      on_failure: always | change | never
      on_cancel: always | change | never
      on_start: always | never
```

You can set the following options for the `on_success`, `on_failure`, `on_cancel`, `on_start` tags:

- `always` means that you will always receive a notification for that event.

- `never` means that you will never receive a notification for that event.

- `change` for `on_success`, `on_failure` or `on_cancel` fields means you will receive notifications only when the build status changes to success, failure or canceled respectively. This value isn't supported for `on_start`.

If you do not specify any of these tags, the defaults are: `on_success` is set to `change`, `on_failure` is set to `always`, `on_cancel` is set to `always`, and `on_start` is set to `never`.

##Removing webhook notifications

To stop sending webhook notifications, simply remove the configuration from the **shippable.yml** for that project.

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
