page_main_title: replicas
main_section: Platform
sub_section: Workflow
sub_sub_section: Resources

# replicas
`replicas` is a resource holds the number of instances of the container to deploy. It is used specifically to deploy Docker containers

You can create a replicas resource by [adding](resources-working-wth#adding) it to `shippable.resources.yml`

```
resources:
  - name: 			<string>
    type: 			replicas
    version:		<object>
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `replicas`

* **`version`** -- is an object which contains specific properties that applies to this resource. Anytime this is changed in the YML a new version of the resource get created and it might trigger your workflow depending on how it is setup

	```
	    version:
	      count: 1			#integer value > 0
	```

## Used in JOBs
This resource is used as an IN for the following jobs

* [deploy jobs](workflow/job/deploy/)
* [manifest jobs](workflow/job/manifest/)

## Default Environment Variables
Whenever `replicas` is used as an `IN` or `OUT` into a Job that can execute user defined scripts, a set of environment variables are configured by the platform that may be useful to set the context before user defined scripts execute as part of the Job. These are variables available when this Resource is used

`<NAME>` is the the friendly name of the Resource

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_NAME 							| The name of the resource. |
| `<NAME>`\_ID 								| The ID of the resource. |
| `<NAME>`\_TYPE 							| The type of the resource. In this case `replicas`|
| `<NAME>`\_INTEGRATION\_`<FIELDNAME>`	| Values from the [Integration]() depending on which was used. More info on integration page |
| `<NAME>`\_OPERATION 						| The operation of the resource; either `IN` or `OUT`. |
| `<NAME>`\_PATH 							| The directory containing files for the resource. |
| `<NAME>`\_SOURCENAME    					| SourceName defined in the pointer |
| `<NAME>`\_VERSION\_COUNT 				| count defined in the version |
| `<NAME>`\_VERSIONID    					| The ID of the version of the resource being used. |
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