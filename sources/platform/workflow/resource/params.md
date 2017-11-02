page_main_title: params
main_section: Platform
sub_section: Workflow
sub_sub_section: Resources

# params
`params` resource stores user defined key-value pairs. This can be then be injected into a job runtime environment where your DevOps activity runs or can set environment variables of your deploy target (VMs or containers).

You can create a `params` resource by [adding](/platform/tutorial/workflow/crud-resource#adding) it to `shippable.yml`.

```
resources:
  - name:           <string>
    type:           params
    version:        <object>
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `params`

* **`version`** -- is an object that contains specific properties that apply to this resource. A new version is created any time this section of the YML changes.

          version:
            params:
              KEY1: "value1"                     #requires at least one
              KEY2: "value2"                     #optional
              secure: <encrypted value>          #optional

    You can use secure variables to [encrypt](/ci/env-vars/#secure-variables) any key-value pairs that contain sensitive information you don't want to expose as plain text.

## Used in Jobs
This resource is used as an `IN` for the following jobs

* [runSh](/platform/workflow/job/runsh)
* [runCI](/platform/workflow/job/runci)
* [deploy](/platform/workflow/job/deploy)
* [manifest](/platform/workflow/job/manifest)

## Default Environment Variables
Whenever `params` is used as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_NAME 							| The name of the resource. |
| `<NAME>`\_ID 								| The ID of the resource. |
| `<NAME>`\_TYPE 							| The type of the resource. In this case `params`. |
| `<NAME>`\_OPERATION 						| The operation of the resource; either `IN` or `OUT`. |
| `<NAME>`\_PATH 							| The directory containing files for the resource. |
| `<NAME>`\_SOURCENAME    					| SourceName defined in the pointer. |
| `<NAME>`\_VERSIONID    					| The ID of the version of the resource being used. |
| `<NAME>`\_VERSIONNUMBER 					| The number of the version of the resource being used. |
| KEY1    									| params section of the version is parsed and values are sourced. From above, e.g., KEY1 will be set to `value1`. |
| KEY2    									| params section of the version is parsed and values are sourced. From above, e.g., KEY2 will be set to `value2`. |

## Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Jobs](/platform/workflow/job/overview)
* [Resource](/platform/workflow/resource/overview)
