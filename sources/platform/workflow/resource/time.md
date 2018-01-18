page_main_title: time
main_section: Platform
sub_section: Workflow
sub_sub_section: Resources


# time
`time` resource provides cron-like functionality. It is used to to trigger a job in a cron-like manner. This resource can be used used as an `IN` input for [any job](/platform/workflow/job/overview/). The timezone used for triggering jobs is UTC.

You can create a `time` resource by [adding](/platform/tutorial/workflow/crud-resource#adding) it to `shippable.yml`.

- [Latest Syntax (Shippable v6.1.1 and above)](#latestSyntax)
- [Old Syntax (forward compatible)](#oldSyntax)

<a name="latestSyntax"></a>
### Latest Syntax (Shippable v6.1.1 and above)


```
resources:
  - name:             <string>
    type:             time
    versionTemplate:  <object>
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `time`

* **`versionTemplate`** -- is an object which contains specific properties that apply to this resource

	        versionTemplate:
	          interval: "*/2 * * * *"

    The `interval` follows the [standard Cron format](https://en.wikipedia.org/wiki/Cron). For example, the snippet above will trigger the job at 2 min intervals.

<a name="oldSyntax"></a>
### Old Syntax (forward compatible)


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
Whenever `time` is used as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. Any numbers at the beginning of the name are also removed to create a valid variable. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_NAME 							| The name of the resource. |
| `<NAME>`\_ID 								| The ID of the resource. |
| `<NAME>`\_TYPE 							| The type of the resource. In this case `time`. |
| `<NAME>`\_OPERATION 						| The operation of the resource; either `IN` or `OUT`. |
| `<NAME>`\_PATH 							| The directory containing files for the resource. |
| `<NAME>`\_SEED\_INTERVAL 				| Interval defined in the seed section. |
| `<NAME>`\_VERSIONID    					| The ID of the version of the resource being used. |
| `<NAME>`\_VERSIONNUMBER 					| The number of the version of the resource being used. |

## Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Jobs](/platform/workflow/job/overview)
* [Resource](/platform/workflow/resource/overview)
