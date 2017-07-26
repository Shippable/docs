page_main_title: file
main_section: Platform
sub_section: Workflow
sub_sub_section: Resources

# TODO
| Tasks   |      Status    |
|----------|-------------|
| Hotlinking |  Open |
| Further Reading needs thinking|  Open |
| Need to pointer for each integration type|  Open |


# file
`file` resource is a pointer to a file on an external file share. When used as an IN to a job, the file is downloaded and available to be used.

You can create a file resource by [adding](resources-working-wth#adding) it to `shippable.resources.yml`

```
resources:
  - name: 			<string>
    type: 			file
    integration: 	<string>
    pointer:		<object>
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `file`

* **`integration`** -- name of the integration. Currently supported integrations are
	* JFrog

* **`pointer`** -- is an object which contains integration specific properties
	* in case of empty integration

	```
	    pointer:
	      sourceName: <points to publicly accessible file URI>
	```
	* in case of JFrog

	```
	    pointer:
	      sourceName: <in format "repositoryName/path" of a artifactory respository file>
	```

# Used in JOBs
This resource is used as an IN for the following jobs

* runCLI
* runSH
* deploy
* manifest

# Further Reading
* JFrog integration
* AWS integration
* runCLI job
* cli pre-installed in job runtime
* how to deploy a file to a VM cluster
* Output a file from runSH
