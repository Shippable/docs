page_main_title: state
main_section: Platform
sub_section: Workflow
sub_sub_section: Resources

# state
`state` resource is a special resource used to store data that can be shared between jobs. Shippable DevOps Assembly lines do not allow workflows that have circular dependencies. There are certain situations where data needs to be passed back and forth between jobs. For example, Terraform tasks create a state that needs to be persisted each time the job runs. `state` resource was specifically designed to achieve circular dependencies in DevOps Assembly Lines.

You can create a `state` resource by [adding](/platform/tutorial/workflow/crud-resource#adding) it to `shippable.resources.yml`

```
resources:
  - name:           <string>
    type: 			state
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `state`

## Used in Jobs
This resource is used as an `IN` or `OUT` of any of job.

## Default Environment Variables
Whenever `state` is used as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_NAME 							| The name of the resource. |
| `<NAME>`\_ID 								| The ID of the resource. |
| `<NAME>`\_TYPE 							| The type of the resource. In this case `state`. |
| `<NAME>`\_OPERATION 						| The operation of the resource; either `IN` or `OUT`. |
| `<NAME>`\_PATH 							| The directory containing files for the resource. |
| `<NAME>`\_SOURCENAME    					| SourceName defined in the pointer. |
| `<NAME>`\_VERSIONID    					| The ID of the version of the resource being used. |
| `<NAME>`\_VERSIONNUMBER 					| The number of the version of the resource being used. |


## Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Jobs](/platform/workflow/job/overview)
* [Resource](/platform/workflow/resource/overview)
