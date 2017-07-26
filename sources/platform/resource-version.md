page_main_title: version
main_section: Platform
sub_section: Workflow
sub_sub_section: Resources

# version
`version` resource is used to store <a href="http://www.semver.org/">the semantic version</a> numbers.

You can create a version resource by [adding](resources-working-wth#adding) it to `shippable.resources.yml`

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

* [release](jobs-release/)
* runSH
* runCLI
* runCI

# Further Reading
* How to push semantic tags to Git
* How to tag a docker image with semantic versions
* How to create immutable service definitions with version numbers
