page_main_title: file
main_section: Platform
sub_section: Workflow
sub_sub_section: Resources

# file
`file` resource is a pointer to a file on an external file share. When used as an IN to a job, the file is downloaded and available to be used.

You can create a file resource by [adding](resources-working-wth#adding) it to `shippable.resources.yml`

```
resources:
  - name: 			<string>
    type: 			file
    integration: 	<string>
    pointer:		<object>
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `file`

* **`integration`** -- name of the integration. Currently supported integrations are
	* JFrog

* **`pointer`** -- is an object which contains integration specific properties
	* in case of empty integration

	```
	    pointer:
	      sourceName: <points to publicly accessible file URI>
	```
	* in case of JFrog

	```
	    pointer:
	      sourceName: <in format "repositoryName/path" of a artifactory respository file>
	```

## Used in JOBs
This resource is used as an IN for the following jobs

* runCLI
* runSH
* deploy
* manifest

## Default Environment Variables
Whenever `file` is used as an `IN` or `OUT` into a Job that can execute user defined scripts, a set of environment variables are configured by the platform that may be useful to set the context before user defined scripts execute as part of the Job. These are variables available when this Resource is used

`<NAME>` is the the friendly name of the Resource

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_NAME 							| The name of the resource. |
| `<NAME>`\_ID 								| The ID of the resource. |
| `<NAME>`\_TYPE 							| The type of the resource. In this case `file`|
| `<NAME>`\_INTEGRATION\_`<FIELDNAME>`	| Values from the [Integration]() depending on which was used. More info on integration page |
| `<NAME>`\_PATH 							| The directory containing files for the resource. |
| `<NAME>`\_OPERATION 						| The operation of the resource; either `IN` or `OUT`. |
| `<NAME>`\_SOURCENAME    					| SourceName defined in the pointer |
| `<NAME>`\_VERSIONID    					| The ID of the version of the resource being used. |
| `<NAME>`\_VERSIONNAME						| versionName of the version of the resource being used. |
| `<NAME>`\_VERSIONNUMBER 					| The number of the version of the resource being used. |

## Shippable Utility Functions
To make it easy to GET and SET with these Environment Variables, the platform provides a bunch of utility functions so that you don't need to perform string concatenations etc. to work with this values. 

These utility functions are [documented here]()

## Further Reading
* JFrog integration
* AWS integration
* runCLI job
* cli pre-installed in job runtime
* how to deploy a file to a VM cluster
* Output a file from runSH

## TODO
| Tasks   |      Status    |
|----------|-------------|
| Hotlinking |  Open |
| Further Reading needs thinking|  Open |
| Need to pointer for each integration type|  Open |
