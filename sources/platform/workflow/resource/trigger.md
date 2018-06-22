page_main_title: trigger
main_section: Platform
sub_section: Configuration
sub_sub_section: Resources
page_title: trigger resource reference
page_description: trigger resource reference

# trigger
Adding a `trigger` resource to your `shippable.yml` gives you a way to trigger a job in your Assembly Line whenever you commit a change to that resource. This resource can be used used as an `IN` input for [any job](/platform/workflow/job/overview/).

You can create a `trigger` resource by [adding](/platform/tutorial/workflow/crud-resource#adding) it to `shippable.yml`.

- [Latest Syntax (Shippable v6.1.1 and above)](#latestSyntax)
- [Old Syntax (forward compatible)](#oldSyntax)

<a name="latestSyntax"></a>
### Latest Syntax (Shippable v6.1.1 and above)

```
resources:
  - name:           <string>
    type:           trigger
    versionTemplate:
      counter:      <number>
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `trigger`

* **`versionTemplate`** -- is an object which contains specific properties that apply to this resource

            versionTemplate:
              counter: 1

    The `counter` should be updated each time you want to trigger the jobs that have this resource as an input.

<a name="oldSyntax"></a>
### Old Syntax (forward compatible)

```
resources:
  - name:           <string>
    type:           trigger
    version:
      counter:      <number>
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `trigger`

* **`version`** -- is an object which contains specific properties that apply to this resource

            version:
              counter: 1

    The `counter` should be updated each time you want to trigger the jobs that have this resource as an input.

## Used in Jobs
This resource is used as an `IN` for any type of job.

## Default Environment Variables
Whenever `trigger` is used as an `IN` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. Any numbers at the beginning of the name are also removed to create a valid variable. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_NAME 							| The name of the resource. |
| `<NAME>`\_ID 								| The ID of the resource. |
| `<NAME>`\_TYPE 							| The type of the resource. In this case `trigger`. |
| `<NAME>`\_OPERATION 						| The operation of the resource; either `IN` or `OUT`. |
| `<NAME>`\_PATH 							| The directory containing files for the resource. |
| `<NAME>`\_VERSIONID    					| The ID of the version of the resource being used. |
| `<NAME>`\_VERSIONNUMBER 					| The number of the version of the resource being used. |

## Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Jobs](/platform/workflow/job/overview)
* [Resource](/platform/workflow/resource/overview)
