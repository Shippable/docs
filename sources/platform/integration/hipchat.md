page_main_title: Hipchat
main_section: Platform
sub_section: Integrations
page_title: Hipchat integration

# Hipchat Integration (Deprecated)

## Deprecation Note
This integration has been marked deprecated. Existing integrations will continue to work as expected. You cannot create any new integrations of this type. Use [Hipchat Key](/platform/integration/hipchatKey) integration instead.

---

The **Hipchat** Integration is used to connect Shippable DevOps Assembly Lines platform so that you can send notifications to channels or rooms.

## Adding account integration

You can add this account integration by following steps on the [Adding an account integration](/platform/management/integrations/#adding-an-account-integration) page.

Here is the information you need to create this integration:

* **Integration type** -- **Hipchat**
* **Name** -- choose a friendly name for the integration
* **Token** -- HipChat account token

Here is how you can get your [Hipchat account token](https://developer.atlassian.com/hipchat/guide/hipchat-rest-api/api-access-tokens).

## Usage

After you create the account integration, it can be used in the following scenarios:

### CI

* [Sending Hipchat notifications](/ci/hipchat-notifications/)

### Assembly Lines

The Hipchat integration can be used in the following [resources](/platform/workflow/resource/overview/):

* [ciRepo](/platform/workflow/resource/cirepo)
* [integration](/platform/workflow/resource/integration)
* [notification](/platform/workflow/resource/notification)

## Default Environment Variables
When you create a resource with this integration, and use it as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_INTEGRATION\_TOKEN			| The Token used to connect to HipChat |

## Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [RunSh Job](/platform/workflow/job/runsh)
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
