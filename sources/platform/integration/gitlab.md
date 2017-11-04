page_main_title: Gitlab
main_section: Platform
sub_section: Integrations
page_title: Gitlab integration

# GitLab Integration

The **GitLab** Integration is used to connect Shippable DevOps Assembly Lines platform to your instance of GitLab so that you can run builds for your repositories hosted there.

## Adding account integration

You can add this account integration by following steps on the [Adding an account integration](/platform/management/integrations/#adding-an-account-integration) page.

Here is the information you need to create this integration:

* **Integration Family** -- **SCM**
* **Integration type** -- **Gitlab**
* **Name** -- choose a friendly name for the integration
* **URL** -- location of your GitLab API. The URL should be in the format `https://(GitLab URL)/api/(api version)`. For example, if you're using gitlab.com, this will be `https://gitlab.com/api/v4`. Please note that if you're using Gitlab version 9.0 or later, you should use `v4` for api version. If you're using Gitlab version 8.17 or earlier, you should use `v3` for api version. API v3 is unsupported from Gitlab 9.5 according to this [Gitlab notice](https://docs.gitlab.com/ce/api/v3_to_v4.html)
* **Token** -- GitLab private token with the right levels of permission

## Usage in Assembly Lines

The Gitlab integration can be used in the following [resources](/platform/workflow/resource/overview/):

* [gitRepo](/platform/workflow/resource/gitrepo)
* [ciRepo](/platform/workflow/resource/cirepo)
* [syncRepo](/platform/workflow/resource/syncrepo)

### Default Environment Variables
When you create a resource with this integration, and use it as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_INTEGRATION\_URL    			| GitLab API location |
| `<NAME>`\_INTEGRATION\_TOKEN			| The Token used to connect to GitLab |

### Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [RunSh Job](/platform/workflow/job/runsh)
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
