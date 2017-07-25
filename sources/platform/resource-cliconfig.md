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
`cliConfig` is a resource used to store configuration information needed to setup a Command Line Interface. 

You can create an cliConfig resource by [adding](resources-working-wth#adding) it to `shippable.resources.yml`

Multiple cliConfig resources may be used as INs and their respective CLIs are configured automatically. If more than one cliConfig of the same integration type is added, the last one used in `IN` statements, wins. 

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

* [runCLI](job-runcli/)
* [runSH](jobs-runsh/)

# Further Reading
* GKE integration
* AWS integration
* runCLI job
* cli pre-installed in job runtime