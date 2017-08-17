page_main_title: time
main_section: Platform
sub_section: Workflow
sub_sub_section: Resources


# time
`time` resource provides cron-like functionality. It is used to to trigger a job in a cron-like manner. This resource can be used used as an `IN` input for [any job](/platform/workflow/job/overview/). The timezone used for triggering jobs is UTC.

You can create a `time` resource by [adding](/platform/tutorial/workflow/howto-crud-resource#adding) it to `shippable.resources.yml`

```
resources:
  - name:           <string>
    type:           time
    seed:           <object>
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `time`

* **`seed`** -- is an object which contains specific properties that apply to this resource

	        seed:
	          interval: "*/2 * * * *"

    The `interval` follows the [standard Cron format](https://en.wikipedia.org/wiki/Cron). For example, the snippet above will trigger the job at 2 min intervals.

## Used in Jobs
This resource is used as an `IN` for any type of job.

## Default Environment Variables
Whenever `time` is used as an `IN` or `OUT` for a job that can execute user defined scripts, a set of environment variables are configured by the platform that may be useful to set the context before user defined scripts execute as part of the job. These variables are available when this resource is used.

`<NAME>` is the the friendly name of the resource.

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_NAME 							| The name of the resource. |
| `<NAME>`\_ID 								| The ID of the resource. |
| `<NAME>`\_TYPE 							| The type of the resource. In this case `time`. |
| `<NAME>`\_OPERATION 						| The operation of the resource; either `IN` or `OUT`. |
| `<NAME>`\_PATH 							| The directory containing files for the resource. |
| `<NAME>`\_SEED\_INTERVAL 				| Interval defined in the seed section. |
| `<NAME>`\_SOURCENAME    					| SourceName defined in the pointer. |
| `<NAME>`\_VERSIONID    					| The ID of the version of the resource being used. |
| `<NAME>`\_VERSIONNUMBER 					| The number of the version of the resource being used. |

## Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/howto-use-shipctl).

## Further Reading
* [Jobs](/platform/workflow/job/overview)
* [Resource](/platform/workflow/resource/overview)
