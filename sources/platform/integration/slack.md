page_main_title: Slack
main_section: Platform
sub_section: Integrations
page_title: Slack integration

# Slack integration

A Slack integration is required to send notifications to channels or rooms for CI and Assembly Line events.

## Adding the account integration

You can add this account integration by following steps on the [Adding an account integration](/platform/management/integrations/#adding-an-account-integration) page.

Here is the information you need to create this integration:

* **Integration Family** -- **Notifications**
* **Integration type** -- **Slack**
* **Name** -- choose a friendly name for the integration
* **WebhookUrl** -- Webhook URL to your Slack channel. This can be overridden when creating a resource. This looks like this: `https://hooks.slack.com/services/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`

## Usage in CI

* [Sending Slack notifications](/ci/slack-notifications/)

## Usage in Assembly Lines

The Slack integration can be used in the following [resources](/platform/workflow/resource/overview/):

* [ciRepo](/platform/workflow/resource/cirepo)
* [integration](/platform/workflow/resource/integration)
* [notification](/platform/workflow/resource/notification)

### Default Environment Variables
When you create a resource with this integration, and use it as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_INTEGRATION\_WEBHOOKURL		| Webhook URL of the Integration|

### Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [RunSh Job](/platform/workflow/job/runsh)
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
