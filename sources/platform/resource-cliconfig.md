page_main_title: cliConfig
main_section: Platform
sub_section: Resources

# TODO
| Tasks   |      Status    | 
|----------|-------------|
| Hotlinking |  Open | 
| Further Reading needs thinking|  Open |
| Need to pointer for each integration type|  Open |

# cliconfig
`cliConfig` resource is used to supply configuration information required to setup Command Line Interface (CLI) so that commands can be executed by a [runCLI job](job-runcli/). Multiple cliConfig resources may be used as INs to a single runCLI job and the respective CLIs are configured. If more than one cliConfig resource for the same integration type is added, the last one IN wins. 

You can create an cliConfig resource by [adding](resources-working-wth#adding) it to `shippable.resources.yml`

```
resources:
  - name: 			<string>
    type: 			cliConfig
    integration: 	<string>
    pointer:		<object>
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `cliConfig`

* **`integration`** -- name of the integration. Currently supported integrations are 
	* AWS
	* GKE

* **`pointer`** -- is an object which contains integration specific properties
	* in case of AWS 
	
	```
	    pointer:
	      region: <aws region for e.g us-east-1, us-west-1 etc.>
	```

	* in case of GKE, if region and clusterName is provided `gcloud` and `kubectl` will be sutomatically configured to use it. If not provided, just the authentication to google cloud is done automatically

	```
	    pointer:
	      region: <aws region for e.g us-east-1, us-west-1 etc.>
	      clusterName: <cluster of type Google Container Engine>
	```

# Used in JOBs
This resource is used as an IN for the following jobs

* runCLI
* runSH

# Further Reading
* GKE integration
* AWS integration
* runCLI job
* cli pre-installed in job runtime