page_main_title: image
main_section: Platform
sub_section: Workflow
sub_sub_section: Resources

# image
`image` resource is used to add a reference to a docker image to your pipeline.

You can create an cliConfig resource by [adding](resources-working-wth#adding) it to `shippable.resources.yml`

```
resources:
  - name: 			<string>
    type: 			image
    integration: 	<string>
    pointer:		<object>
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `image`

* **`integration`** -- name of the integration. Currently supported integrations are
	- [Docker Hub](integration/docker-hub/)
	- [Docker Private Registry](integration/docker-trusted-registry/)
	- [Docker Trusted Registry](integration/docker-trusted-registry/)
	- [Google Container Registry (GCR)](integration/gcr/)
	- [Amazon Elastic Container Registry (ECR)](integration/aws-ecr/)
	- [Quay.io](integration/quay/)

* **`pointer`** -- is an object which contains integration specific properties

```
  pointer:
    sourceName: < Fully Qualified Name of the image, can be just repo/image in case of Docker Hub
```
* **`seed`** -- is an object which contains initial version properties

```
  seed:
    versionName: <Name of the image tag>
```

## Used in JOBs
This resource is used as an IN for the following jobs

* runCLI
* runSH
* runCI
* manifest

## Default Environment Variables
Whenever `image` is used as an `IN` or `OUT` into a Job that can execute user defined scripts, a set of environment variables are configured by the platform that may be useful to set the context before user defined scripts execute as part of the Job. These are variables available when this Resource is used

`<NAME>` is the the friendly name of the Resource

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_NAME 							| The name of the resource. |
| `<NAME>`\_ID 								| The ID of the resource. |
| `<NAME>`\_TYPE 							| The type of the resource. In this case `image`|
| `<NAME>`\_INTEGRATION\_`<FIELDNAME>`	| Values from the [Integration]() depending on which was used. More info on integration page |
| `<NAME>`\_PATH 							| The directory containing files for the resource. |
| `<NAME>`\_OPERATION 						| The operation of the resource; either `IN` or `OUT`. |
| `<NAME>`\_SOURCENAME    					| SourceName defined in the pointer |
| `<NAME>`\_SEED\_VERSIONNAME 			| VersionName defined in the seed |
| `<NAME>`\_VERSIONID    					| The ID of the version of the resource being used. |
| `<NAME>`\_VERSIONNAME						| versionName which is the tag of the version of the resource being used. |
| `<NAME>`\_VERSIONNUMBER 					| The number of the version of the resource being used. |

## Shippable Utility Functions
To make it easy to GET and SET with these Environment Variables, the platform provides a bunch of utility functions so that you don't need to perform string concatenations etc. to work with this values. 

These utility functions are [documented here]()

## Further Reading
* GKE integration
* AWS integration
* how to ourput image tag from runCI or runSH

## TODO
| Tasks   |      Status    |
|----------|-------------|
| Hotlinking |  Open |
| Further Reading needs thinking|  Open |
| Need to pointer for each integration type|  Open |
