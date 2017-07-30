page_main_title: loadBalancer
main_section: Platform
sub_section: Workflow
sub_sub_section: Resources

# loadBalancer
`loadBalancer` resource is used to represent a loadbalancer as the name suggests.

You can create a loadbalancer resource by [adding](resources-working-wth#adding) it to `shippable.resources.yml`

```
resources:
  - name: 			<string>
    type: 			loadBalancer
    integration: 	<string>
    pointer:		<object>
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `file`

* **`integration`** -- name of the integration. Currently supported integrations are
	* AWS
	* Google Cloud

* **`pointer`** -- is an object which contains integration specific properties
	* in case of [AWS Classic Load Balancers](https://aws.amazon.com/elasticloadbalancing/classicloadbalancer/)		

	```
	    pointer:
	      sourceName: 	<name of the Classic Load Balancer>
	      method: 		classic
	      role: 		<AWS IAM role used to update the Load Balancer>

	```
	Note: `role` is and optional setting and if set, the role should have trust relationship allowing "ecs.amazonaws.com", if this is left blank, shippable will search for one that has the right level of trust automatically. If none found, the job where this resource is used will fail

	* in case of [AWS Application Load Balancers](https://aws.amazon.com/elasticloadbalancing/applicationloadbalancer/)

	```
	    pointer:
	      sourceName: 	<name of the target group ARN>
	      method: 		application
	      role: 		<AWS IAM role used to update the Load Balancer>

	```
	Note: `role` is and optional setting and if set, the role should have trust relationship allowing "ecs.amazonaws.com", if this is left blank, shippable will search for one that has the right level of trust automatically. If none found, the job where this resource is used will fail

	* in case of [GKE loadbalancers](https://kubernetes.io/docs/user-guide/services/) used in `deploy` jobs

	```
	  pointer:
		sourceName: 	<name of GKE loadbalancer>
		method: 		clusterIP | ExternalName | LoadBalancer | NodePort  #default is clusterIP
		namespace: 		<name of the namespace where pod is deployed on>    #optional
	```

* in case of [GKE loadbalancers](https://kubernetes.io/docs/user-guide/services/) used in `provision` jobs

	```
	  pointer:
		sourceName: 				<lowecase alphanumeric name only>
		method: 					clusterIP | ExternalName | LoadBalancer | NodePort  #default is clusterIP
		namespace: 					<name of the namespace where pod is deployed on>    #optional
		clusterName: 				<name of the GKE cluster>
		region: 					<name of the region>
	  version:
	    ports:
	      - name: 					<string>
	        protocol: 				TCP | UDP #default TCP
	        port: 					<integer>
	        targetPort: 			<string>
	        nodePort: 				<integer>
	    selector:
	    							<string> : <string>
	    clusterIP: 					None | "" | <string>
	    externalIPs:
	      - 						<string>
	    sessionAffinity: 			ClientIP | None
	    loadBalancerIP: 			<string>
	    loadBalancerSourceRanges:
	      - 						<string>
	    externalName: 				<string>
	```

## Used in JOBs
This resource is used as an IN for the following jobs

* [deploy](jobs-deploy/)
* [provision](jobs-provision/)

## Default Environment Variables
Whenever `loadBalancer` is used as an `IN` or `OUT` into a Job that can execute user defined scripts, a set of environment variables are configured by the platform that may be useful to set the context before user defined scripts execute as part of the Job. These are variables available when this Resource is used

`<NAME>` is the the friendly name of the Resource

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_NAME 							| The name of the resource. |
| `<NAME>`\_ID 								| The ID of the resource. |
| `<NAME>`\_TYPE 							| The type of the resource. In this case `loadBalancer`|
| `<NAME>`\_INTEGRATION\_`<FIELDNAME>`	| Values from the [Integration]() depending on which was used. More info on integration page |
| `<NAME>`\_OPERATION 						| The operation of the resource; either `IN` or `OUT`. |
| `<NAME>`\_PATH 							| The directory containing files for the resource. |
| `<NAME>`\_POINTER\_METHOD 				| Region defined in the pointer. Available if the integration is AWS or Google |
| `<NAME>`\_POINTER\_ROLE 					| ClusterName defined in the pointer. Available if the integration is AWS |
| `<NAME>`\_POINTER\_NAMESPACE 			| Namespace defined in the pointer. Available if the integration is Google |
| `<NAME>`\_SOURCENAME    					| SourceName defined in the pointer |
| `<NAME>`\_VERSIONID    					| The ID of the version of the resource being used. |
| `<NAME>`\_VERSIONNAME						| versionName of the version of the resource being used. |
| `<NAME>`\_VERSIONNUMBER 					| The number of the version of the resource being used. |

## Shippable Utility Functions
To make it easy to GET and SET with these Environment Variables, the platform provides a bunch of utility functions so that you don't need to perform string concatenations etc. to work with this values. 

These utility functions are [documented here]()

## Further Reading
* JFrog integration
* AWS integration
* runCLI job
* cli pre-installed in job runtime
* how to deploy a file to a VM cluster
* Output a file from runSH

## TODO
| Tasks   |      Status    |
|----------|-------------|
| Hotlinking |  Open |
| Further Reading needs thinking|  Open |
| Need to pointer for each integration type|  Open |