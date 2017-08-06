page_main_title: GitHub Enterprise
main_section: Platform
sub_section: Integrations
page_title: GitHub Enterprise integration

# GitHub Enterprise Integration

Available under the Integration Family: **SCM**

`Github Enterprise` Integration is used to connect Shippable DevOps Assembly Lines platform to your instance of Github Enterprise Server. 

You can create this from the integrations page. This is the information you would require to create this integration

* **Name** -- friendly name for the integration
* **URL** -- location of your GHE server API. The format is in `https://(Github Enterprise URL)/api/v3`
* **Token** -- personal access token with the right levels of permission

## Resources that use this Integration
Resources are the bulding blocks of assembly lines and some types of resource refer to Integrations by their name. The following Resources Types can created with `Github Enterprise` Integration 

* [gitRepo](/workflow/platform/resource/gitRepo)
* [ciRepo](/workflow/platform/resource/ciRepo)
* [syncRepo](/workflow/platform/resource/syncRepo)

## Default Environment Variables
When you create a Resource with this integration, and use it as an `IN` or `OUT` into a Job that can execute user defined scripts, a set of environment variables are configured by the platform that may be useful to set the context before user defined scripts execute as part of the Job. These are variables available when this Resource is used

`<NAME>` is the the friendly name of the Resource

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_INTEGRATION\_URL    			| Github Enterprise API location |
| `<NAME>`\_INTEGRATION\_TOKEN			| The Token used to connect to Github Enterprise |

## Shippable Utility Functions
To make it easy to GET and SET with these Environment Variables, the platform provides a bunch of utility functions so that you don't need to perform string concatenations etc. to work with this values.

How to use these utility functions are [documented here](/platform/tutorial/workflow/howto-use-shipctl)

## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [RunSh Job](/platform/workflow/job/runsh)
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)