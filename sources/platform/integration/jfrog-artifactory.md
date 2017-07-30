page_main_title: JFrog Artifactory
main_section: Platform
sub_section: Integrations
page_title: JFrog Artifactory integration

# JFrog Artifactory Integration

Available under the Integration Family: **hub**

`JFrog Artifactory` Integration is used to connect Shippable DevOps Assembly Lines platform to Google Container Registry so that you can pull and push artifacts including Docker images.

You can create this from the integrations page. This is the information you would require to create this integration

* **Name** -- friendly name for the integration
* **HTTP Endpoint** -- Enter the HTTP Endpoint(url) of your artifact repository
* **Username** -- Username of your JFrog account 
* **Password** -- Password of your JFrog account

## Resources that use this Integration
Resources are the bulding blocks of assembly lines and some types of resource refer to Integrations by their name. The following Resources Types can created with `JFrog Artifactory` Integration 

* [image]()
* [integration]()

## Default Environment Variables
When you create a Resource with this integration, and use it as an `IN` or `OUT` into a Job that can execute user defined scripts, a set of environment variables are configured by the platform that may be useful to set the context before user defined scripts execute as part of the Job. These are variables available when this Resource is used

`<NAME>` is the the friendly name of the Resource

| Environment variable						| Description      |
| ------			 							|----------------- |
| `<NAME>`\_INTEGRATION\_URL				| URL supplied in the integration |
| `<NAME>`\_INTEGRATION\_USERNAME			| USERNAME supplied in the integration |
| `<NAME>`\_INTEGRATION\_PASSWORD			| PASSWORD supplied in the integration |

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
