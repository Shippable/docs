page_main_title: Docker Datacenter
main_section: Platform
sub_section: Integrations
page_title: Docker Datacenter integration

# Docker Datacenter Integration

Available under the Integration Family: **Deploy**

`Docker Datacenter` Integration is used to connect Shippable DevOps Assembly Lines platform to Docker Datacenter Server so that you cn deploy Docker based applications. 

You can create this from the integrations page. This is the information you would require to create this integration

* **Name** -- friendly name for the integration
* **Username** -- login to your Docker Datacenter
* **Password** -- password of your Docker Datacenter
* **URL** -- publicly accessible URL of your Docker Datacenter

## Resources that use this Integration
Resources are the bulding blocks of assembly lines and some types of resource refer to Integrations by their name. The following Resources Types can created with `Docker Datacenter` Integration 

* [image]()
* [cluster]()
* [integration]()

## Default Environment Variables
When you create a Resource with this integration, and use it as an `IN` or `OUT` into a Job that can execute user defined scripts, a set of environment variables are configured by the platform that may be useful to set the context before user defined scripts execute as part of the Job. These are variables available when this Resource is used

`<NAME>` is the the friendly name of the Resource

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_INTEGRATION\_USERNAME   		| Username supplied in the integration |
| `<NAME>`\_INTEGRATION\_PASSWORD			| Password supplied in the integration |
| `<NAME>`\_INTEGRATION\_URL				| URL supplied in the integration |

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
