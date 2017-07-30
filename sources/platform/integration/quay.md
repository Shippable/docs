page_main_title: Quay.io
main_section: Platform
sub_section: Integrations
page_title: Quay integration

# Quay Integration

Available under the Integration Family: **Hub**

`Quay` Integration is used to connect Shippable DevOps Assembly Lines platform to Quay Docker Registry so that you can pull and push Docker images. 

You can create this from the integrations page. This is the information you would require to create this integration

* **Name** -- friendly name for the integration
* **Username** -- login to your Quay Account
* **Password** -- password of your Quay Account
* **Email** -- email of your Quay Account
* **Access Token** -- access token of your Quay Account

## Resources that use this Integration
Resources are the bulding blocks of assembly lines and some types of resource refer to Integrations by their name. The following Resources Types can created with `Docker Hub` Integration 

* [image]()
* [cluster]()

## Default Environment Variables
When you create a Resource with this integration, and use it as an `IN` or `OUT` into a Job that can execute user defined scripts, a set of environment variables are configured by the platform that may be useful to set the context before user defined scripts execute as part of the Job. These are variables available when this Resource is used

`<NAME>` is the the friendly name of the Resource

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_INTEGRATION\_USERNAME   		| Username supplied in the integration |
| `<NAME>`\_INTEGRATION\_PASSWORD			| Password supplied in the integration |
| `<NAME>`\_INTEGRATION\_EMAIL			| Email supplied in the integration |
| `<NAME>`\_INTEGRATION\_ACCESSTOKEN		| Access Token supplied in the integration |

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
