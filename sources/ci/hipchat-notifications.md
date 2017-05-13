page_main_title: Sending messages to Hipchat
main_section: CI
sub_section: Sending notifications
page_title: Sending Hipchat notifications
page_description: Configure Hipchat to send notifications for Continuous Integration and Delivery actions
page_keywords: hipchat, atlassian, notifications, CI/CD, Continuous Integration, Continuous Deployment, CI/CD, testing, automation

#Sending CI notifications to Hipchat

You can send Hipchat notifications for various events in your CI workflow, including when builds start or finish.

##Setup

Before you start, you will need to connect your Hipchat account with Shippable so we have the credentials to send notifications on your behalf. We do this through [Account Integrations](/reference/integrations-overview/), so that any sensitive information is abstracted from your config file. Once you add an account integration, you can use it for all your projects without needing to add it again.

There are 2 steps to add a Hipchat integration: Generating an API token for Hipchat, , and adding the token to your Shippable account.

###1. Generate a Hipchat API token

1. Sign in to your HipChat account using [this link to generate a token](https://www.hipchat.com/account/api).
     - Provide credentials to your HipChat account, if prompted.
2. Create a token with `Send Message` and `Send Notification` scopes.


###2. Add the Hipchat integration to your Account

* Go to your **Account Settings** by clicking on the gear menu in the top navbar.
* Click on **Integrations** in the sidebar menu.
* Click on **Add Integration**.
* Enter the following:
	* In the **Master Integration** dropdown, choose **HipChat**  
	* Add a friendly name for your integration
	* In the **Token** field, paste the HipChat token
* Click on **Save**. You should now see the integration in your list of integrations.


##Basic config

Once you have completed the Setup steps, you are ready to configure your `shippable.yml` to send Hipchat notifications. The basic configuration looks like this:


```
integrations:
  notifications:
    - integrationName: hipchat-integration   
      type: hipchat
      recipients:
        - "#channelOne"
        - "#channelTwo"
        - "@userOne"
```
Use the descriptions of each field below to modify the `yml` and tailor it to your requirements.

- `integrationName` value is the name of the Hipchat integration you added to your settings. It is important the name matches exactly. If not, the build will fail with error as [described here](/ci/troubleshoot/#integration-name-specified-in-yml-does-not-match).
- `type` is `hipchat`.
- `recipients` is an array that specifies the channels or users you want to send the notification to. If there is just a single recipient, use the format `recipients: "#channelOne"`

And you're done. You will receive Hipchat notifications for all branches when builds fail, or change from failed to passed, or pull requests are built. To change some of these default configs, please see the Advanced config section below.


##Advanced config

###1. Limiting branches

By default, Hipchat notifications are sent for builds for all branches. If you want to only send notifications for specific branch(es), you can do so with the `branches` keyword.

```
integrations:                               
  hub:
    - integrationName: hipchat-integration     #replace with your integration name   
      type: hipchat  
      recipients:
        - "#channelOne"  
        - "#channelTwo"
      branches:
        only:
          - master
```

`branches` allows you to choose the branches you want to send notifications for. The `only` tag should be used when you want to send notifications for builds of specific branches. You can also use the `except` tag to exclude specific branches. [Wildcards](../../ci/advancedOptions/branches/) are also supported.


###2. Customizing notification triggers

By default, Hipchat notifications are sent for the following events:

- <i class="ion-ios-minus-empty"></i> A build fails
- <i class="ion-ios-minus-empty"></i> Build status for a project changes from failed to passed
- <i class="ion-ios-minus-empty"></i> A Pull request is built

<br>
You can further customize these defaults with the following config:

```
integrations:                               
  hub:
    - integrationName: hipchat-integration     #replace with your integration name   
      type: hipchat  
      recipients:
        - "#channelOne"  
        - "#channelTwo"
      on_success: always | change | never
      on_failure: always | change | never
      on_start: always | never
      on_pull_request: always | never

```

You can set the following options for the `on_success`, `on_failure`, `on_start` and `on_pull_request` tags:

- <i class="ion-ios-minus-empty"></i>`always` means that you will always receive a notification for that event.

- <i class="ion-ios-minus-empty"></i> `never` means that you will never receive a notification for that event.

- <i class="ion-ios-minus-empty"></i> `change` for `on_success` or `on_failure` fields means you will receive notifications only when the build status changes to success or failure respectively. This value isn't supported for `on_start` or `on_pull_request`.

If you do not specify any of these tags, the defaults are: `on_success` is set to `change`, `on_failure` is set to `always`, `on_start` is set to `never` and `on_pull_request` is set to `always`.

##Removing Hipchat notifications

To stop sending Hipchat notifications, simply remove the configuration from the `shippable.yml` for that project.

If you are not using your Hipchat notification anywhere else, you can delete it from your Account Integrations list as well.

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
