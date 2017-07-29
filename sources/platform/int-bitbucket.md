page_main_title: Bitbucket
main_section: Platform
sub_section: Integrations
page_title: Bitbucket integration

# Bitbucket Integration

Available under the Integration Family: **SCM**

`Bitbucket` Integration is used to connect Shippable DevOps Assembly Lines platform to bitbucket.org. There are 3 ways in which this type of integration can be added

* You sign in to Shippable with Bitbucket credentials. In this case, we automatically set up an Account Integration named `Bitbucket` for you. This integration is the default one that we use when you enable CI projects for your repos and sync your permissions with github
* Second, you can manually add this to your account integrations. This takes in Bitbucket APO `Token` value as input and gives you whatever level of access as the token has
* Third, if you used another method of signing into Shippable, then from your _Account Profile_ you can connect your Bitbucket account to have multi-provider login to your account

## Resources that use this Integration
Resources are the bulding blocks of assembly lines and some types of resource refer to Integrations by their name. The following Resources Types can created with `Bitbucket` Integration 

* [gitRepo]()
* [ciRepo]()
* [syncRepo]()

## Default Environment Variables
When you create a Resource with this integration, and use it as an `IN` or `OUT` into a Job that can execute user defined scripts, a set of environment variables are configured by the platform that may be useful to set the context before user defined scripts execute as part of the Job. These are variables available when this Resource is used

`<NAME>` is the the friendly name of the Resource

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_INTEGRATION\_URL    			| Bitbucket API location |
| `<NAME>`\_INTEGRATION\_TOKEN			| The Token used to connect to Bitbucket |


## Further Reading
* GKE integration
* AWS integration
* runSH job
* runCLI job
* runCI job
* How to setup CI for my git repo

## TODO
| Tasks   |      Status    |
|----------|-------------|
| Hotlinking |  Open |
| Further Reading needs thinking|  Open |

