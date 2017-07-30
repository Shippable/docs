page_main_title: Azure DC/OS
main_section: Platform
sub_section: Integrations
page_title: Azure DC/OS integration

# Microsoft Azure Integration

Available under the Integration Family: **generic**

`Microsoft Azure` Integration is used to connect Shippable DevOps Assembly Lines platform to Microsoft Azure to manage cloud services and entities

You can create this from the integrations page. This is the information you would require to create this integration

* **Name** -- friendly name for the integration
* **Subscription ID** -- Subscription ID of Microsoft Azure subscription
* **Username** -- Azure Active Directory Username
* **Password** -- Password of Active Directory User

## Resources that use this Integration
Resources are the bulding blocks of assembly lines and some types of resource refer to Integrations by their name. The following Resources Types can created with `Microsoft Azure` Integration 

* [image]()
* [cluster]()
* [integration]()

## Default Environment Variables
When you create a Resource with this integration, and use it as an `IN` or `OUT` into a Job that can execute user defined scripts, a set of environment variables are configured by the platform that may be useful to set the context before user defined scripts execute as part of the Job. These are variables available when this Resource is used

`<NAME>` is the the friendly name of the Resource

| Environment variable						| Description        |
| ------			 							|----------------- |
| `<NAME>`\_INTEGRATION\_NAME   			| Name supplied in the integration |
| `<NAME>`\_INTEGRATION\_SUBSCRIPTIONID	| Subscription ID supplied in the integration |
| `<NAME>`\_INTEGRATION\_USERNAME			| Username supplied in the integration |
| `<NAME>`\_INTEGRATION\_PASSWORD			| Password supplied in the integration |

## Further Reading
* GKE integration
* AWS integration
* runSH job
* runCLI job
* runCI job
* How to setup CI for my git repo

