page_main_title: Using Webhook Integration
main_section: CI
sub_section: Advanced config
page_title: Sending Webhook notifications
page_keywords: webhook, Continuous Integration, Continuous Deployment, CI/CD, testing, automation

#Using Webhook Integration in CI

Webhook integration can be used to send payload to external entities for various events in your CI workflow, including when builds start or finish.

##Setup

Before you start, you will need to connect your external entity with Shippable so we have the credentials to send the payload on your behalf. We do this through [Account Integrations](../platform/integration/overview/), so that any sensitive information is abstracted from your config file. Once you add an account integration, you can use it for all your projects without needing to add it again.

###Add the Webhook integration to your Account

-  Go to your **Integrations** in the left sidebar menu and then click on **Add integration**.
-  Locate **Webhook** in the list of integration types and click on **Create Integration**
-  Name your integration with a friendly name and enter the webhook URL endpoint where you want to send the payload to in the 'Webhook URL' field 
-  Choose the Subscription which contains the repository for which you want to send payload. Since you're likely a member of many organizations, you need to specify which of them can use this integration.
-  Click **Save**

##Basic config

Once you have completed the Setup steps, you are ready to configure your `shippable.yml` to send Webhook payload. The basic configuration looks like this:


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

- `integrationName` value is the name of the Webhook integration you added to your settings. It is important the name matches exactly. If not, the build will fail with error as [described here](/ci/troubleshoot/#integration-name-specified-in-yml-does-not-match).
- `type` is `webhook`.
- `payload` is an array that specifies the env's payload you want to send to external entity.

And you're done. You will receive the webhook payload to the endpoint which you have provided while adding account integration for all branches when builds fail, or change from failed to passed. To change some of these default configs, please see the Advanced config section below.

**For example** on your build start or when your build finishes if you want to create a issue on github. Then you need to provide the github specific repository api endpoint in which u want to create issues while adding account integration.

<img src="/images/ci/add-webhook-int.png" alt="Adding webhook integration">

You can configure your `shippable.yml`:

```
integrations:
  notifications:
    - integrationName: webhook-integration   #issue will get created in github specified project
      type: webhook
      payload:
        - title=ShippableBuild - $REPO_FULL_NAME - $BUILD_NUMBER
        - body=Shippable Run $BUILD_NUMBER ($BUILD_URL) for $COMPARE_URL  
```
Use the descriptions of each field below to modify the `yml` and tailor it to your requirements.

- `integrationName` value is the name of the Webhook integration you added to your settings. It is important the name matches exactly. If not, the build will fail with error as [described here](/ci/troubleshoot/#integration-name-specified-in-yml-does-not-match).
- `type` is `webhook`.
- `payload` is an array that specifies the env's payload you want to send to external entity.
  - `title` in payload is to specify the title of the issue
  - `body` in payload is the description of the issue which needs to be created

And you're done. You will receive the webhook payload to the endpoint which you have provided while adding account integration for all branches when builds fail, or change from failed to passed. To change some of these default configs, please see the Advanced config section below.

##Advanced config

###1. Limiting branches

By default, Webhook notifications are sent for builds for all branches. If you want to only send notifications for specific branch(es), you can do so with the `branches` keyword.

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

`branches` allows you to choose the branches you want to send notifications for. The `only` tag should be used when you want to send notifications for builds of specific branches. You can also use the `except` tag to exclude specific branches. [Wildcards](../../ci/advancedOptions/branches/) are also supported.


###2. Customizing notification triggers

By default, Webhook notifications are sent for the following events:

- <i class="ion-ios-minus-empty"></i> A build fails
- <i class="ion-ios-minus-empty"></i> Build status for a project changes from failed to passed

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

- <i class="ion-ios-minus-empty"></i>`always` means that you will always receive a notification for that event.

- <i class="ion-ios-minus-empty"></i> `never` means that you will never receive a notification for that event.

- <i class="ion-ios-minus-empty"></i> `change` for `on_success`, `on_failure` or `on_cancel` fields means you will receive notifications only when the build status changes to success, failure or canceled respectively. This value isn't supported for `on_start`.

If you do not specify any of these tags, the defaults are: `on_success` is set to `change`, `on_failure` is set to `always`, `on_change` is set to `on_failure`, `on_start` is set to `never`.

##Removing Slack notifications

To stop sending Webhook notifications, simply remove the configuration from the `shippable.yml` for that project.

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
