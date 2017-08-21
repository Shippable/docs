page_main_title: Gitlab
main_section: Platform
sub_section: Integrations
page_title: Gitlab integration

# GitLab Integration

Available under the Integration Family: **SCM**

`GitLab` Integration is used to connect Shippable DevOps Assembly Lines platform to your instance of GitLab.

You can create this from the integrations page by following instructions here: [Adding an account integration](/platform/management/integrations/#adding-an-account-integration).

This is the information you would require to create this integration:

* **Name** -- friendly name for the integration
* **URL** -- location of your GitLab API. The URL should be in the format `https://(GitLab URL)/api/v4`. For example, if you're using gitlab.com, this will `https://gitlab.com/api/v4`. API v3 will be unsupported from Gitlab 9.5, to be released on August 22, 2017. [Gitlab notice](https://docs.gitlab.com/ce/api/v3_to_v4.html)
* **Token** -- GitLab private token with the right levels of permission

## Resources that use this Integration
Resources are the building blocks of assembly lines and some types of resources refer to integrations by their names. The following resource types can be created with a `GitLab` integration.

* [gitRepo](/platform/workflow/resource/gitrepo)
* [ciRepo](/platform/workflow/resource/cirepo)
* [syncRepo](/platform/workflow/resource/syncrepo)

## Default Environment Variables
When you create a resource with this integration, and use it as an `IN` or `OUT` for a job that can execute user defined scripts, a set of environment variables are configured by the platform that may be useful to set the context before user defined scripts execute as part of the job. These variables are available when a resource with this integration type is used.

`<NAME>` is the the friendly name of the resource.

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_INTEGRATION\_URL    			| GitLab API location |
| `<NAME>`\_INTEGRATION\_TOKEN			| The Token used to connect to GitLab |

## Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [RunSh Job](/platform/workflow/job/runsh)
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
