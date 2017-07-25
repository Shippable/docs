page_main_title: params
main_section: Platform
sub_section: Resources
# TODO
| Tasks   |      Status    | 
|----------|-------------|
| Hotlinking |  Open | 
| Further Reading needs thinking|  Open |
| Need to pointer for each integration type|  Open |

# params
`params` resource stores user defined key-value pairs. This can be then used to inject it into an Job Runtime environment where your DevOps activity runs or can be used to set environment variables of your deploy target (VMs or containers). There are two ways params resources can be used.

You can create a file resource by [adding](resources-working-wth#adding) it to `shippable.resources.yml`

```
resources:
  - name: 			<string>
    type: 			params
    version:		<object>
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `params`

* **`version`** -- is an object which contains specific properties that applies to this resource. A new version is created anytime this section of the YML changes which might trigger your workflow depending on how you have set it up

	```
	  version:
		params:
		  key1: "value1"                     #requires at least one
		  key2: "value2"                     #optional
		  secure: <encrypted value>          #optional 
	```
You can use secure variables to [encrypt](/ci/env-vars/#secure-variables) any key-value pairs that contain sensitive information you don't want to expose as plain text.

# Used in JOBs
This resource is used as an IN for the following jobs

* [runCLI](job-runcli/)
* [runSh](jobs-runsh/)
* [runCI](job-runci/)
* [deploy](job-deploy/)
* [manifest](jobs-manifest/) 

# Further Reading
* JFrog integration
* AWS integration
* runCLI job
* [How to encypt environment variables](/ci/env-vars/#secure-variables)
* cli pre-installed in job runtime
* how to deploy a file to a VM cluster
* Output a file from runSH
