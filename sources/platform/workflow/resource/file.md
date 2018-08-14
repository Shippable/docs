page_main_title: file
main_section: Platform
sub_section: Configuration
sub_sub_section: Resources
page_title: file resource reference
page_description: file resource reference

# file

A `file` resource is a pointer to a file on an external file share. It can be used as an `IN` for `manifest` jobs to create a service definition with a file, or in a `runSh` job that needs the file to run scripts.

You can create a `file` resource by [adding](/platform/tutorial/workflow/crud-resource#adding) it to **shippable.yml**.

- [Latest Syntax (Shippable v6.1.1 and above)](#latestSyntax)
- [Old Syntax (forward compatible)](#oldSyntax)

<a name="latestSyntax"></a>
### Latest Syntax (Shippable v6.1.1 and above)

```
resources:
  - name:           <string>
    type:           file
    integration:    <string>
    versionTemplate:
      sourceName:   <string>        
      versionName:  <string>
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `file`

* **`integration`** -- name of the subscription integration, i.e. the name of your integration at `https://app.shippable.com/subs/[github or bitbucket]/[Subscription name]/integrations`. Currently supported integration types are:
	* [JFrog Artifactory](/platform/integration/jfrog-artifactoryKey)

* **`versionTemplate`** -- is an object that contains integration specific properties as well as a seed name that you'd like your file version to be tagged with.
	* Without an integration:

	        versionTemplate:
	          sourceName: <points to publicly accessible file URI>
            versionName: <any uniquely identifying label, such as a commit sha>

	* With a JFrog Artifactory integration:

	        versionTemplate:
	          sourceName: <"repositoryName/path" of an Artifactory repository file>
            versionName: <any uniquely identifying label, such as a commit sha>

<a name="oldSyntax"></a>
### Old Syntax (forward compatible)

```
resources:
  - name:           <string>
    type:           file
    integration:    <string>
    pointer:        <object>
      sourceName:   <string>
    seed:
      versionName:  <string>
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `file`

* **`integration`** -- name of the subscription integration, i.e. the name of your integration at `https://app.shippable.com/subs/[github or bitbucket]/[Subscription name]/integrations`. Currently supported integration types are:
	* [JFrog Artifactory](/platform/integration/jfrog-artifactoryKey)

* **`pointer`** -- is an object that contains integration specific properties
	* Without an integration:

	        pointer:
	          sourceName: <points to publicly accessible file URI>

	* With a JFrog Artifactory integration:

	        pointer:
	          sourceName: <"repositoryName/path" of an Artifactory repository file>

* **`seed`** -- is an object that can contain any information that's relevant to the file. For example, the commitSHA. This is currently a required field, so you should set thr `versionName` to a dummy value like `none` if you do not want to use this field. We are working on making this field optional.

## Used in Assembly Lines

A `file` resource can be used as an `IN` for a [manifest](/platform/workflow/job/manifest) job and [runSh](/platform/workflow/job/runsh) job, or as an `OUT` for a `runSh` job.

### Default Environment Variables
Whenever `file` is used as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. Any numbers at the beginning of the name are also removed to create a valid variable. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.


| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_NAME 							| The name of the resource. |
| `<NAME>`\_ID 								| The ID of the resource. |
| `<NAME>`\_TYPE 							| The type of the resource. In this case `file`. |
| `<NAME>`\_INTEGRATION\_`<FIELDNAME>`	| Values from the integration that was used. More info on the specific integration page. |
| `<NAME>`\_PATH 							| The directory containing files for the resource. |
| `<NAME>`\_OPERATION 						| The operation of the resource; either `IN` or `OUT`. |
| `<NAME>`\_SOURCENAME    					| SourceName defined in the pointer. |
| `<NAME>`\_VERSIONID    					| The ID of the version of the resource being used. |
| `<NAME>`\_VERSIONNAME						| The versionName of the version of the resource being used. |
| `<NAME>`\_VERSIONNUMBER 					| The number of the version of the resource being used. |

### Shippable Utility Functions

To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Jobs](/platform/workflow/job/overview)
* [Resource](/platform/workflow/resource/overview)
* [Supported CLIs](/platform/runtime/overview#cli)
