page_main_title: Event Trigger (Deprecated)
main_section: Platform
sub_section: Integrations
page_title: Event Trigger integration (Deprecated)

# Event Trigger Integration (Deprecated)

## Deprecation Note
This integration has been deprecated. A new integration called [Webhook](/platform/integration/webhook) of type generic has been introduced which can be used instead.

If you have any existing Event Trigger account integrations of type notification, you can continue to use them.

---

**Event Trigger** Integration is used to connect Shippable DevOps Assembly Lines platform so that you can

* Create a daisy chain of projects, so that you can trigger one from another
* Send a webhook to an external service with custom payloads

## Adding the account integration

Since this integration has been deprecated, you cannot create new account integrations for it, but can only edit/delete the exisiting Event Trigger integrations. You can use the [Webhook](/platform/integration/webhook) integration instead which will work exactly the same way as the typed `Generic Webhook` of deprecated Event Trigger integration.

Here is the information you need to create this integration:

* **Integration Family** -- **Notifications**
* **Integration type** -- **Event Trigger**
* **Name** -- choose a friendly name for the integration
* **Trigger endpoint** -- Dropdown with following values
	* project -- used to trigger other CI projects on Shippable. (Deprecated feature - You can achieve this more easily with Assembly Lines)
		* Authorization -- Shippable API Token. Format `apiToken ae45edaa-adfa-bgdf-ae45edaaae45`
	* Generic Webhook -- used to send payload to external entities
		* WebhookURL -- endpoint to send payload to
		* Authorization -- Token based auth to the external URL

## Usage in CI

* [Triggering sequential, parameterized builds](http://blog.shippable.com/triggering-a-parameterized-build-after-continuous-integration)

## Usage in Assembly Lines

Event triggers can be used in the following [resources](/platform/workflow/resource/overview/):

* [notification](/platform/workflow/resource/notification)
* [ciRepo](/platform/workflow/resource/cirepo)

### Default Environment Variables
When you create a resource with this integration, and use it as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_INTEGRATION\_PROJECT			| Shippable Project ID, for project webhooks  |
| `<NAME>`\_INTEGRATION\_WEBHOOKURL		| Webhook URL, it is available for Generic Webhooks only |
| `<NAME>`\_INTEGRATION\_AUTHORIZATION	| Authorization token that was set in the integration  |

### Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [RunSh Job](/platform/workflow/job/runsh)
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
