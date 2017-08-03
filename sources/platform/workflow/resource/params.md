page_main_title: params
main_section: Platform
sub_section: Workflow
sub_sub_section: Resources

# params
`params` resource stores user defined key-value pairs. This can be then used to inject it into an Job Runtime environment where your DevOps activity runs or can be used to set environment variables of your deploy target (VMs or containers). There are two ways params resources can be used.

You can create a `params` resource by [adding](/platform/workflow/resource/resources-working-with#adding) it to `shippable.resources.yml`

```
resources:
  - name: 			<string>
    type: 			params
    version:		<object>
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `params`

* **`version`** -- is an object which contains specific properties that applies to this resource. A new version is created anytime this section of the YML changes which might trigger your workflow depending on how you have set it up

	```
	  version:
		params:
		  KEY1: "value1"                     #requires at least one
		  KEY2: "value2"                     #optional
		  secure: <encrypted value>          #optional
	```
You can use secure variables to [encrypt](/ci/env-vars/#secure-variables) any key-value pairs that contain sensitive information you don't want to expose as plain text.

## Used in JOBs
This resource is used as an IN for the following jobs

* [runSh](/platform/workflow/job/runsh)
* [runCI](/platform/workflow/job/runci)
* [deploy](/platform/workflow/job/deploy)
* [manifest](/platform/workflow/job/manifest)

## Default Environment Variables
Whenever `params` is used as an `IN` or `OUT` into a Job that can execute user defined scripts, a set of environment variables are configured by the platform that may be useful to set the context before user defined scripts execute as part of the Job. These are variables available when this Resource is used

`<NAME>` is the the friendly name of the Resource

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_NAME 							| The name of the resource. |
| `<NAME>`\_ID 								| The ID of the resource. |
| `<NAME>`\_TYPE 							| The type of the resource. In this case `params`|
| `<NAME>`\_OPERATION 						| The operation of the resource; either `IN` or `OUT`. |
| `<NAME>`\_PATH 							| The directory containing files for the resource. |
| `<NAME>`\_SOURCENAME    					| SourceName defined in the pointer |
| `<NAME>`\_VERSIONID    					| The ID of the version of the resource being used. |
| `<NAME>`\_VERSIONNUMBER 					| The number of the version of the resource being used. |
| KEY1    									| params section of the version is parsed and values are sourced. From above e.g. KEY1 will be set to `value1` |
| KEY1    									| params section of the version is parsed and values are sourced. From above e.g. KEY2 will be set to `value2` |

## Shippable Utility Functions
To make it easy to GET and SET with these Environment Variables, the platform provides a bunch of utility functions so that you don't need to perform string concatenations etc. to work with this values.

How to use these utility functions are [documented here](/platform/tutorial/workflow/howto-use-shipctl)

## Further Reading
* [Jobs](/platform/workflow/job/overview)
* [Resource](/platform/workflow/resource/overview)
