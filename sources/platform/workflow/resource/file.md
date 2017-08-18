page_main_title: file
main_section: Platform
sub_section: Workflow
sub_sub_section: Resources

# file
`file` resource is a pointer to a file on an external file share. When used as an `IN` to a job, the file is downloaded and available to be used.

You can create a `file` resource by [adding](/platform/tutorial/workflow/crud-resource#adding) it to `shippable.resources.yml`

```
resources:
  - name:           <string>
    type:           file
    integration:    <string>
    pointer:        <object>
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `file`

* **`integration`** -- name of the subscription integration. Currently supported integration types are:
	* [JFrog Artifactory](/platform/integration/jfrog-artifactory)

* **`pointer`** -- is an object that contains integration specific properties
	* Without an integration:

	        pointer:
	          sourceName: <points to publicly accessible file URI>

	* With a JFrog Artifactory integration:

	        pointer:
	          sourceName: <"repositoryName/path" of an Artifactory repository file>

## Used in Jobs
This resource is used as an `IN` for the following jobs:

* [deploy](/platform/workflow/job/deploy)
* [runSh](/platform/workflow/job/runsh)
* [manifest](/platform/workflow/job/manifest)

## Default Environment Variables
Whenever `file` is used as an `IN` or `OUT` for a job that can execute user defined scripts, a set of environment variables are configured by the platform that may be useful to set the context before user defined scripts execute as part of the job. These variables are available when this resource is used.

`<NAME>` is the the friendly name of the resource.


| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_NAME 							| The name of the resource. |
| `<NAME>`\_ID 								| The ID of the resource. |
| `<NAME>`\_TYPE 							| The type of the resource. In this case `file`. |
| `<NAME>`\_INTEGRATION\_`<FIELDNAME>`	| Values from the integration that was used. More info on the specific integration page. |
| `<NAME>`\_PATH 							| The directory containing files for the resource. |
| `<NAME>`\_OPERATION 						| The operation of the resource; either `IN` or `OUT`. |
| `<NAME>`\_SOURCENAME    					| SourceName defined in the pointer. |
| `<NAME>`\_VERSIONID    					| The ID of the version of the resource being used. |
| `<NAME>`\_VERSIONNAME						| The versionName of the version of the resource being used. |
| `<NAME>`\_VERSIONNUMBER 					| The number of the version of the resource being used. |

## Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Jobs](/platform/workflow/job/overview)
* [Resource](/platform/workflow/resource/overview)
* [Supported CLIs](/platform/runtime/overview#cli)
