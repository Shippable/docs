page_main_title: time
main_section: Platform
sub_section: Workflow
sub_sub_section: Resources


# time
`time` resource provides cron like functionality. It is used to to trigger a job in a cron like manner. This resource can be used used as an IN input for [any job](/platform/workflow/job/overview/). The timezone used for triggering jobs is UTC.

You can create a `time` resource by [adding](/platform/workflow/resource/working-with#adding) it to `shippable.resources.yml`

```
resources:
  - name: 			<string>
    type: 			time
    seed:			<object>
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `time`

* **`seed`** -- is an object which contains specific properties that applies to this resource.

	```
		seed:
		  interval: "*/2 * * * *"
	```
The `interval` follows the [standard Cron format](https://en.wikipedia.org/wiki/Cron). For example, the snippet above will trigger the job at 2 min intervals.

## Used in JOBs
This resource is used as an IN for any type of Job

## Default Environment Variables
Whenever `time` is used as an `IN` or `OUT` into a Job that can execute user defined scripts, a set of environment variables are configured by the platform that may be useful to set the context before user defined scripts execute as part of the Job. These are variables available when this Resource is used

`<NAME>` is the the friendly name of the Resource

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_NAME 							| The name of the resource. |
| `<NAME>`\_ID 								| The ID of the resource. |
| `<NAME>`\_TYPE 							| The type of the resource. In this case `time`|
| `<NAME>`\_OPERATION 						| The operation of the resource; either `IN` or `OUT`. |
| `<NAME>`\_PATH 							| The directory containing files for the resource. |
| `<NAME>`\_SEED\_INTERVAL 				| Interval defined in the seed section |
| `<NAME>`\_SOURCENAME    					| SourceName defined in the pointer |
| `<NAME>`\_VERSIONID    					| The ID of the version of the resource being used. |
| `<NAME>`\_VERSIONNUMBER 					| The number of the version of the resource being used. |

## Shippable Utility Functions
To make it easy to GET and SET with these Environment Variables, the platform provides a bunch of utility functions so that you don't need to perform string concatenations etc. to work with this values.

These utility functions are [documented here]()

## Further Reading
* [Jobs](/platform/workflow/job/overview)
* [Resource](/platform/workflow/resource/overview)
