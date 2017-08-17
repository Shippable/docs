page_main_title: image
main_section: Platform
sub_section: Workflow
sub_sub_section: Resources

# image
`image` resource is used to add a reference to a Docker image to your pipeline.

You can create a `image` resource by [adding](/platform/tutorial/workflow/howto-crud-resource#adding) it to `shippable.resources.yml`

```
resources:
  - name:           <string>
    type:           image
    integration:    <string>
    pointer:        <object>
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `image`

* **`integration`** -- name of the subscription integration. Currently supported integration types are
	- [Amazon Elastic Container Registry (ECR)](/platform/integration/aws-ecr)
	- [Docker Hub](/platform/integration/docker-hub)
	- [Docker Trusted Registry](/platform/integration/docker-trusted-registry)
	- [Docker Private Registry](/platform/integration/docker-private-registry)
	- [Google Container Registry (GCR)](/platform/integration/gcr)
	- [JFrog Artifactory](/platform/integration/jfrog-artifactory)
	- [Quay.io](/platform/integration/quay)

* **`pointer`** -- is an object that contains integration specific properties

          pointer:
            sourceName: <fully qualified image name, can be just repo/image for Docker Hub>

* **`seed`** -- is an object that contains initial version properties

          seed:
            versionName: <image tag>

## Used in Jobs
This resource is used as an IN for the following jobs

* [deploy](/platform/workflow/job/deploy)
* [runSh](/platform/workflow/job/runsh)
* [manifest](/platform/workflow/job/manifest)

## Default Environment Variables
Whenever `image` is used as an `IN` or `OUT` for a job that can execute user defined scripts, a set of environment variables are configured by the platform that may be useful to set the context before user defined scripts execute as part of the job. These variables are available when this resource is used.

`<NAME>` is the the friendly name of the resource.

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_NAME 							| The name of the resource. |
| `<NAME>`\_ID 								| The ID of the resource. |
| `<NAME>`\_TYPE 							| The type of the resource. In this case `image`. |
| `<NAME>`\_INTEGRATION\_`<FIELDNAME>`	| Values from the integration that was used. More info on the specific integration page. |
| `<NAME>`\_PATH 							| The directory containing files for the resource. |
| `<NAME>`\_OPERATION 						| The operation of the resource; either `IN` or `OUT`. |
| `<NAME>`\_SOURCENAME    					| SourceName defined in the pointer. |
| `<NAME>`\_SEED\_VERSIONNAME 			| VersionName defined in the seed. |
| `<NAME>`\_VERSIONID    					| The ID of the version of the resource being used. |
| `<NAME>`\_VERSIONNAME						| The versionName, which is the image tag for the version used. |
| `<NAME>`\_VERSIONNUMBER 					| The number of the version of the resource being used. |

## Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/howto-use-shipctl).

## Further Reading
* [Jobs](/platform/workflow/job/overview)
* [Resource](/platform/workflow/resource/overview)
