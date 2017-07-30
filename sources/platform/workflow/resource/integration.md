page_main_title: integration
main_section: Platform
sub_section: Workflow
sub_sub_section: Resources

# integration
`integration` resource is used to represent credentials that has been encrypted using Shippable Integrations.

You can create an cliConfig resource by [adding](resources-working-wth#adding) it to `shippable.resources.yml`

```
resources:
  - name: 			<string>
    type: 			integration
    integration: 	<string>
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `integration`

* **`integration`** -- name of the integration. All [Shippable Integrations](integration/overview/) can be used here

* `name` should be an easy to remember text string. This will appear in the visualization of this resource in the SPOG view. It is also used to refer to this resource in the `shippable.jobs.yml`. If you have spaces in your name, you'll need to surround the value with quotes, however, as a best practice we recommend not including spaces in your names.

## Used in JOBs
This resource is used as an IN for the following jobs

* runCLI
* runSH
* runCI

## Default Environment Variables
Whenever `integration` is used as an `IN` or `OUT` into a Job that can execute user defined scripts, a set of environment variables are configured by the platform that may be useful to set the context before user defined scripts execute as part of the Job. These are variables available when this Resource is used

`<NAME>` is the the friendly name of the Resource

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_NAME 							| The name of the resource. |
| `<NAME>`\_ID 								| The ID of the resource. |
| `<NAME>`\_TYPE 							| The type of the resource. In this case `integration`|
| `<NAME>`\_INTEGRATION\_`<FIELDNAME>`	| Values from the [Integration]() depending on which was used. More info on integration page |
| `<NAME>`\_PATH 							| The directory containing files for the resource. |
| `<NAME>`\_OPERATION 						| The operation of the resource; either `IN` or `OUT`. |
| `<NAME>`\_VERSIONID    					| The ID of the version of the resource being used. |
| `<NAME>`\_VERSIONNUMBER 					| The number of the version of the resource being used. |

**Some special cases depending on the `integration` used**

* If the integration of type [Key-Value pair](/platform/integration/key-value.md), the key-values are exported as it is without adding `RESOURCENAME_INTEGRATION_` in the key name. They act like [params]() resource, but in this case they are stored encrypted for security reasons

* If the integration of type [ssh-key]() or [pem-key]() is used, the environment variable will mess up the key structure due to carriage returns. Hence the platform will extract the private key into a file and puts the location in the environment variable below

	| Environment variable        |  Description                               |
	|-----------------------------|--------------------------------------------|
	| `<NAME>`\_KEYPATH      		| points directly to the private key file. |


## Shippable Utility Functions
To make it easy to GET and SET with these Environment Variables, the platform provides a bunch of utility functions so that you don't need to perform string concatenations etc. to work with this values. 

These utility functions are [documented here]()

## Further Reading
* GKE integration
* AWS integration
* runCLI job
* cli pre-installed in job runtime

## TODO
| Tasks   |      Status    |
|----------|-------------|
| Hotlinking |  Open |
| Further Reading needs thinking|  Open |
| Need to pointer for each integration type|  Open |