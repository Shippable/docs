page_main_title: Jira
main_section: Platform
sub_section: Integrations
page_title: jira integration
page_description: How to create and use a Jira Integration in Shippable to create issues on jira server.

# Jira integration

A Jira integration is required to create issues on jira server from Shippable jobs and builds page.

## Adding the account integration

You can add this account integration by following steps on the [Adding an account integration](/platform/tutorial/integration/howto-crud-integration/) page.

Here is the information you need to create this integration:

* **Integration type** -- **Jira**
* **Name** -- choose a friendly name for the integration
* **Url** -- your jira API endpoint
* **Username** -- login to your jira server
* **Token** -- your token token with the permissions needed to access jira rest apis

## Usage in CI

* [Creating Jira issues](/platform/tutorial/integration/howto-create-jira-issues.md)

## Usage in Assembly Lines

* [Creating Jira issues](/platform/tutorial/integration/howto-create-jira-issues.md)

### Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [RunSh Job](/platform/workflow/job/runsh)
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
