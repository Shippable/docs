page_main_title: Email
main_section: Platform
sub_section: Integrations
sub_sub_section: Deprecated
page_title: EMail integration

# Email Integration (Deprecated)

## Deprecation Note
This integration has been deprecated. You can get email notifications in [CI](/ci/email-notifications.md) and [assembly lines](/platform/workflow/resource/notification/) by specifying recipients in yml files.

If you have any existing Email integrations you _can_ continue to use them. New integrations of type Email _cannot_ be created anymore.

---

The **Email** Integration is used to connect Shippable DevOps Assembly Lines platform so that you can send notifications to an email address.

## Creating an Account Integration

You do not need to add an email account integration if you're just configuring `shippable.yml` for CI workflows.

If you're configuring notifications for Assembly Lines, you will need this integration. You can add this account integration by following steps on the [Adding an account integration](/platform/tutorial/integration/howto-crud-integration/) page.

Here is the information you need to create this integration:

* **Integration type** -- **Email**
* **Name** -- choose a friendly name for the integration
* **Email Address** -- email address you want to send notifications to. You can add additional addresses when used in a resource.

## Usage in CI

* [Sending Email notifications](/ci/email-notifications/)

## Usage in Assembly Lines

Email can be used in the following [resources](/platform/workflow/resource/overview/):

* [ciRepo](/platform/workflow/resource/cirepo)
* [notification](/platform/workflow/resource/notification)

## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [RunSh Job](/platform/workflow/job/runsh)
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
