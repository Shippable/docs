page_main_title: GitHub Enterprise
main_section: Platform
sub_section: Integrations
page_title: GitHub Enterprise integration

# GitHub Enterprise Integration

The [GitHub Enterprise](https://enterprise.github.com) Integration is used to connect Shippable DevOps Assembly Lines platform to your instance of GitHub Enterprise Server.

## Adding account integration manually

You can add this account integration by following steps on the [Adding an account integration](/platform/management/integrations/#adding-an-account-integration) page.

Here is the information you need to create this integration:

* **Integration type** -- **GitHub Enterprise**
* **Name** -- choose a friendly name for the integration
* **URL** -- location of your GHE server API. The format is in `https://(GitHub Enterprise URL)/api/v3`
* **Token** -- personal access token with the right levels of permission

## Usage in Assembly Lines

The GitHub Enterprise integration can be used in the following [resources](/platform/workflow/resource/overview/):

* [gitRepo](/platform/workflow/resource/gitrepo)
* [ciRepo](/platform/workflow/resource/cirepo)
* [syncRepo](/platform/workflow/resource/syncrepo)

### Default Environment Variables
When you create a resource with this integration, and use it as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_INTEGRATION\_URL    			| GitHub Enterprise API location |
| `<NAME>`\_INTEGRATION\_TOKEN			| The Token used to connect to GitHub Enterprise |

### Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [RunSh Job](/platform/workflow/job/runsh)
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
