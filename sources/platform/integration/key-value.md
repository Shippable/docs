page_main_title: Key-value
main_section: Platform
sub_section: Integrations
page_title: Key-value integration

# Key-Value Pair Integration

Available under the Integration Family: **Generic**

`Key-Value Pair` Integration is used to inject configurations into Shippable DevOps Assembly Lines activities.

You can create this from the integrations page. This is the information you would require to create this integration

* **Name** -- friendly name for the integration
* **Key Values** -- A collection of Key-Values

## Resources that use this Integration
Resources are the bulding blocks of assembly lines and some types of resource refer to Integrations by their name. The following Resources Types can created with `Key-Value Pair` Integration 

* [integration]()

## Default Environment Variables
When you create a Resource with this integration, and use it as an `IN` or `OUT` into a Job that can execute user defined scripts, a set of environment variables are configured by the platform that may be useful to set the context before user defined scripts execute as part of the Job. These are variables available when this Resource is used

`<NAME>` is the the friendly name of the Resource

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_INTEGRATION\_NAME   			| Name supplied in the integration |
| KEY											| Name of the First Key defined and will have value set |
| KEY											| Name of the Nth Key defined and will have value set |

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

