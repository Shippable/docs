page_main_title: GitHub
main_section: Platform
sub_section: Integrations
page_title: GitHub integration

# GitHub Integration

Available under the Integration Family: **SCM**

`Github` Integration is used to connect Shippable DevOps Assembly Lines platform to github.com. There are 3 ways in which this type of integration can be added

* You sign in to Shippable with Github credentials. In this case, we automatically set up an Account Integration named `Github` for you. This integration is the default one that we use when you enable CI projects for your repos and sync your permissions with github
* Second, you can manually add this to your account integrations. This takes in `Token` value as input and gives you whatever level of access as the token has
* Third, if you used another method of signing into Shippable, then from your _Account Profile_ you can connect your github account to have multi-provider login to your account

## Resources that use this Integration
Resources are the bulding blocks of assembly lines and some types of resource refer to Integrations by their name. The following Resources Types can created with `github` Integration 

* [gitRepo](/workflow/platform/resource/gitRepo)
* [ciRepo](/workflow/platform/resource/ciRepo)
* [syncRepo](/workflow/platform/resource/syncRepo)

## Default Environment Variables
When you create a Resource with this integration, and use it as an `IN` or `OUT` into a Job that can execute user defined scripts, a set of environment variables are configured by the platform that may be useful to set the context before user defined scripts execute as part of the Job. These are variables available when this Resource is used

`<NAME>` is the the friendly name of the Resource

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_INTEGRATION\_URL    			| Github API location |
| `<NAME>`\_INTEGRATION\_TOKEN			| The Token used to correct to Github |

## Shippable Utility Functions
To make it easy to GET and SET with these Environment Variables, the platform provides a bunch of utility functions so that you don't need to perform string concatenations etc. to work with this values.

How to use these utility functions are [documented here](/platform/tutorial/workflow/howto-use-shipctl)

## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [RunSh Job](/platform/workflow/job/runsh)
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)

