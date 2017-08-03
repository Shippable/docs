page_main_title: image
main_section: Platform
sub_section: Workflow
sub_sub_section: Resources

# image
`image` resource is used to add a reference to a docker image to your pipeline.

You can create a `image` resource by [adding](/platform/workflow/resource/resources-working-wth#adding) it to `shippable.resources.yml`

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
	- [Amazon Elastic Container Registry (ECR)](/platform/integration/aws-ecr)
	- [Docker Hub](/platform/integration/docker-hub)
	- [Docker Trusted Registry](/platform/integration/docker-trusted-registry)
	- [Docker Private Registry](/platform/integration/docker-private-registry)
	- [Google Container Registry (GCR)](/platform/integration/gcr)
	- [JFrog Artifactory](/platform/integration/jfrog-artifactory)
	- [Quay.io](/platform/integration/quay)

* **`pointer`** -- is an object which contains integration specific properties

```
  pointer:
    sourceName: < Fully Qualified Name of the image, can be just repo/image in case of Docker Hub
    isPull: <boolean - default is false, but if true, then then image is pulled into your runSh runntime>
```
* **`seed`** -- is an object which contains initial version properties

```
  seed:
    versionName: <Name of the image tag>
```

## Used in JOBs
This resource is used as an IN for the following jobs

* [deploy](/platform/workflow/job/deploy)
* [runSh](/platform/workflow/job/runSh)
* [manifest](/platform/workflow/job/manifest)

## Default Environment Variables
Whenever `image` is used as an `IN` or `OUT` into a Job that can execute user defined scripts, a set of environment variables are configured by the platform that may be useful to set the context before user defined scripts execute as part of the Job. These are variables available when this Resource is used

`<NAME>` is the the friendly name of the Resource

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_NAME 							| The name of the resource. |
| `<NAME>`\_ID 								| The ID of the resource. |
| `<NAME>`\_TYPE 							| The type of the resource. In this case `image`|
| `<NAME>`\_INTEGRATION\_`<FIELDNAME>`	| Values from the integration that was used. More info on the specific Integration page|
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
* [Jobs](/platform/workflow/job/overview)
* [Resource](/platform/workflow/resource/overview)
