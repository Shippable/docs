page_main_title: Bitbucket
main_section: Platform
sub_section: Integrations
page_title: Bitbucket integration

# Bitbucket Integration

Available under the Integration Family: **SCM**

`Bitbucket` Integration is used to connect Shippable DevOps Assembly Lines platform to bitbucket.org. There are 3 ways in which this type of integration can be added:

* You sign in to Shippable with Bitbucket credentials. In this case, we automatically set up an Account Integration named `Bitbucket` for you. This integration is the default one that we use when you enable CI projects for your repos and sync your permissions with Bitbucket.
* Second, you can manually add this to your [account integrations](/platform/management/integrations/#adding-an-account-integration). This takes a Bitbucket APO `Token` value as input and gives you whatever level of access as the token has.
* Third, if you used another method of signing into Shippable, then from your _Account Profile_ you can connect your Bitbucket account to have multi-provider login to your account

## Resources that use this Integration
Resources are the building blocks of assembly lines and some types of resources refer to integrations by their names. The following resource types can be created with a `Bitbucket` integration.

* [gitRepo](/platform/workflow/resource/gitrepo)
* [ciRepo](/platform/workflow/resource/cirepo)
* [syncRepo](/platform/workflow/resource/syncrepo)

## Default Environment Variables
When you create a resource with this integration, and use it as an `IN` or `OUT` for a job that can execute user defined scripts, a set of environment variables are configured by the platform that may be useful to set the context before user defined scripts execute as part of the job. These variables are available when a resource with this integration type is used.

`<NAME>` is the the friendly name of the resource.

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_INTEGRATION\_URL    			| Bitbucket API location |
| `<NAME>`\_INTEGRATION\_TOKEN			| The Token used to connect to Bitbucket |

## Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [RunSh Job](/platform/workflow/job/runsh)
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
