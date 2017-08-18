page_main_title: replicas
main_section: Platform
sub_section: Workflow
sub_sub_section: Resources

# replicas
`replicas` is a resource that holds the number of instances of the container to deploy. It is used specifically to deploy Docker containers

You can create a `replicas` resource by [adding](/platform/tutorial/workflow/crud-resource#adding) it to `shippable.resources.yml`

```
resources:
  - name:           <string>
    type:           replicas
    version:        <object>
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `replicas`

* **`version`** -- is an object that contains specific properties that apply to this resource. Any time this is changed in the YML, a new version of the resource will be created.

	        version:
	          count: 1          #integer value > 0


## Used in Jobs
This resource is used as an `IN` for the following jobs:

* [deploy jobs](/platform/workflow/job/deploy/)
* [manifest jobs](/platform/workflow/job/manifest/)

## Default Environment Variables
Whenever `replicas` is used as an `IN` or `OUT` for a job that can execute user defined scripts, a set of environment variables are configured by the platform that may be useful to set the context before user defined scripts execute as part of the job. These variables are available when this resource is used.

`<NAME>` is the the friendly name of the resource.

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_NAME 							| The name of the resource. |
| `<NAME>`\_ID 								| The ID of the resource. |
| `<NAME>`\_TYPE 							| The type of the resource. In this case `replicas`. |
| `<NAME>`\_OPERATION 						| The operation of the resource; either `IN` or `OUT`. |
| `<NAME>`\_PATH 							| The directory containing files for the resource. |
| `<NAME>`\_SOURCENAME    					| SourceName defined in the pointer. |
| `<NAME>`\_VERSION\_COUNT 				| The count defined in the version. |
| `<NAME>`\_VERSIONID    					| The ID of the version of the resource being used. |
| `<NAME>`\_VERSIONNUMBER 					| The number of the version of the resource being used. |

## Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Jobs](/platform/workflow/job/overview)
* [Resource](/platform/workflow/resource/overview)
