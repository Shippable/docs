page_main_title: GitHub
main_section: Platform
sub_section: Integrations
page_title: GitHub integration

# GitHub Integration

The [GitHub](https://github.com) Integration is used to connect Shippable DevOps Assembly Lines platform to GitHub. There are 3 ways in which this type of integration can be added:

* You sign in to Shippable with GitHub credentials. In this case, we automatically set up an Account Integration named `github` for you. This integration is the default one that we use when you enable CI projects for your repositories and sync your permissions with GitHub.
* Second, you can manually add this to your [account integrations](/platform/tutorial/integration/howto-crud-integration/). This takes in `Token` value as input and gives you whatever level of access as the token has.
* Third, if you used another method of signing into Shippable, then from your **Account Profile** you can connect your GitHub account to have multi-provider login to your account.

## Adding account integration manually

You can add this account integration by following steps on the [Adding an account integration](/platform/tutorial/integration/howto-crud-integration/) page.

Here is the information you need to create this integration:

* **Integration type** -- **GitHub**
* **Name** -- choose a friendly name for the integration
* **URL** -- your GitHub API endpoint. This is already hard-coded to https://api.github.com
* **Token** -- Your GitHub token with the permissions needed to run your jobs

## Usage in Assembly Lines

The GitHub integration can be used in the following [resources](/platform/workflow/resource/overview/):

* [gitRepo](/platform/workflow/resource/gitrepo)
* [ciRepo](/platform/workflow/resource/cirepo)
* [syncRepo](/platform/workflow/resource/syncrepo)

### Default Environment Variables
When you create a resource with this integration, and use it as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_INTEGRATION\_URL    			| GitHub API location |
| `<NAME>`\_INTEGRATION\_TOKEN			| The Token used to connect to GitHub |

### Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [RunSh Job](/platform/workflow/job/runsh)
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
