page_main_title: version
main_section: Platform
sub_section: Workflow
sub_sub_section: Resources

# version
`version` resource is used to store <a href="http://www.semver.org/">the semantic version</a> numbers.

You can create a version resource by [adding](/platform/workflow/resource/resources-working-wth#adding) it to `shippable.resources.yml`

```
resources:
  - name: 			<string>
    type: 			version
    seed:			<object>
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `version`

* **`seed`** -- is an object which contains specific properties that applies to this resource.

	```
		seed:
		  versionName: "0.0.1"
	```
`versionName` is a string that represents a semantic version that is used as a starting point when used with a release job. You can also also use `0.0.0-alpha`, `0.0.0-beta` & `0.0.0-rc` formats.

# Used in JOBs
This resource is used as an IN for the following jobs

* [deploy](/platform/workflow/job/deploy)
* [runSh](/platform/workflow/job/runsh)
* [release](/platform/workflow/job/release)

## Default Environment Variables
Whenever `version` is used as an `IN` or `OUT` into a Job that can execute user defined scripts, a set of environment variables are configured by the platform that may be useful to set the context before user defined scripts execute as part of the Job. These are variables available when this Resource is used

`<NAME>` is the the friendly name of the Resource

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_NAME 							| The name of the resource. |
| `<NAME>`\_ID 								| The ID of the resource. |
| `<NAME>`\_TYPE 							| The type of the resource. In this case `version`|
| `<NAME>`\_OPERATION 						| The operation of the resource; either `IN` or `OUT`. |
| `<NAME>`\_PATH 							| The directory containing files for the resource. |
| `<NAME>`\_SEED\_VERSIONNAME				| VersionName defined in the seed section |
| `<NAME>`\_SOURCENAME    					| SourceName defined in the pointer |
| `<NAME>`\_VERSIONID    					| The ID of the version of the resource being used. |
| `<NAME>`\_VERSIONNAME						| versionName of the version of the resource being used. |
| `<NAME>`\_VERSIONNUMBER 					| The number of the version of the resource being used. |

## Shippable Utility Functions
To make it easy to GET and SET with these Environment Variables, the platform provides a bunch of utility functions so that you don't need to perform string concatenations etc. to work with this values.

These utility functions are [documented here]()

# Further Reading
* [Jobs](/platform/workflow/job/overview)
* [Resource](/platform/workflow/resource/overview)
