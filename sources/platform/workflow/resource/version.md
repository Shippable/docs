page_main_title: version
main_section: Platform
sub_section: Configuration
sub_sub_section: Resources
page_title: version resource reference
page_description: version resource reference

# version
`version` resource is used to store <a href="http://www.semver.org/">semantic version</a> numbers.

You can create a `version` resource by [adding](/platform/tutorial/workflow/crud-resource#adding) it to **shippable.yml**.

- [Latest Syntax (Shippable v6.1.1 and above)](#latestSyntax)
- [Old Syntax (forward compatible)](#oldSyntax)

<a name="latestSyntax"></a>
### Latest Syntax (Shippable v6.1.1 and above)

```
resources:
  - name:             <string>
    type:             version
    versionTemplate: <object>
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `version`

* **`versionTemplate`** -- is an object which contains specific properties that applies to this resource.

	        versionTemplate:
	          versionName: "0.0.1"

    `versionName` is a string that represents a semantic version that is used as a starting point when used with a release job. You can also also use `0.0.0-alpha`, `0.0.0-beta` & `0.0.0-rc` formats.

<a name="oldSyntax"></a>
### Old Syntax (forward compatible)

```
resources:
  - name:           <string>
    type:           version
    seed:           <object>
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `version`

* **`seed`** -- is an object which contains specific properties that applies to this resource.

	        seed:
	          versionName: "0.0.1"

    `versionName` is a string that represents a semantic version that is used as a starting point when used with a release job. You can also also use `0.0.0-alpha`, `0.0.0-beta` & `0.0.0-rc` formats.

## Used in Jobs
This resource is used as an `IN` for the following jobs:

* [deploy](/platform/workflow/job/deploy)
* [runSh](/platform/workflow/job/runsh)
* [release](/platform/workflow/job/release)

## Default Environment Variables
Whenever `version` is used as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. Any numbers at the beginning of the name are also removed to create a valid variable. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_NAME 							| The name of the resource. |
| `<NAME>`\_ID 								| The ID of the resource. |
| `<NAME>`\_TYPE 							| The type of the resource. In this case `version`. |
| `<NAME>`\_OPERATION 						| The operation of the resource; either `IN` or `OUT`. |
| `<NAME>`\_PATH 							| The directory containing files for the resource. |
| `<NAME>`\_SEED\_VERSIONNAME				| VersionName defined in the seed section. |
| `<NAME>`\_SOURCENAME    					| SourceName defined in the pointer. |
| `<NAME>`\_VERSIONID    					| The ID of the version of the resource being used. |
| `<NAME>`\_VERSIONNAME						| versionName of the version of the resource being used. |
| `<NAME>`\_VERSIONNUMBER 					| The number of the version of the resource being used. |

## Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Jobs](/platform/workflow/job/overview)
* [Resource](/platform/workflow/resource/overview)
