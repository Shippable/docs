page_main_title: Git Credential
main_section: Platform
sub_section: Integrations
page_title: Git credential integration

# Git Credential Integration

Available under the Integration Family: **generic**

`Git Credential` Integration is used to connect Shippable DevOps Assembly Lines platform to Source Control Systems over HTTP protocol. Typically this happens for public projects by default, but for private projects we always use SSH. In some cases, especially using Git LFS on Bitbucket, it breaks. Hence this is a way you can override the default cloning method

You can create this from the integrations page. This is the information you would require to create this integration

* **Name** -- friendly name for the integration
* **Host** -- Http/s address to your source control system
* **Port** -- Connection Port on your host
* **Username** -- Username to connect to your SCM
* **Password** -- Password to connect to your SCM

## Resources that use this Integration
Resources are the bulding blocks of assembly lines and some types of resource refer to Integrations by their name. The following Resources Types can created with `Git Credential` Integration 

* [ciRepo](/workflow/platform/resource/ciRepo)

## Default Environment Variables
When you create a Resource with this integration, and use it as an `IN` or `OUT` into a Job that can execute user defined scripts, a set of environment variables are configured by the platform that may be useful to set the context before user defined scripts execute as part of the Job. These are variables available when this Resource is used

`<NAME>` is the the friendly name of the Resource

| Environment variable						         | Description        |
| ------			 							         |----------------- |
| `<NAME>`\_INTEGRATION\_NAME       	| Name supplied in the integration |
| `<NAME>`\_INTEGRATION\_HOST   		| Host supplied in the integration |
| `<NAME>`\_INTEGRATION\_PORT   		| Port supplied in the integration |
| `<NAME>`\_INTEGRATION\_USERNAME   	| Username supplied in the integration |
| `<NAME>`\_INTEGRATION\_PASSWORD   	| Password supplied in the integration |

## Shippable Utility Functions
To make it easy to GET and SET with these Environment Variables, the platform provides a bunch of utility functions so that you don't need to perform string concatenations etc. to work with this values.

How to use these utility functions are [documented here](/platform/tutorial/workflow/howto-use-shipctl)

## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [RunSh Job](/platform/workflow/job/runsh)
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
