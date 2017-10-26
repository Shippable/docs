page_main_title: loadBalancer
main_section: Platform
sub_section: Workflow
sub_sub_section: Resources

# loadBalancer
`loadBalancer` resource is used to represent a loadbalancer as the name suggests.

You can create a `loadBalancer` resource by [adding](/platform/tutorial/workflow/crud-resource#adding) it to `shippable.resources.yml`

```
resources:
  - name:           <string>
    type:           loadBalancer
    integration:    <string>
    pointer:        <object>
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `loadBalancer`

* **`integration`** -- name of the subscription integration, i.e. the name of your integration at `https://app.shippable.com/subs/[github or bitbucket]/[Subscription name]/integrations`. The integration is only used when this resource is an input for a [provision](/platform/workflow/job/provision) job. Currently supported integration types are:
	* [Google Cloud](/platform/integration/gcloudKey)

* **`pointer`** -- is an object that contains provider specific properties
	* For [AWS Classic Load Balancers](https://aws.amazon.com/elasticloadbalancing/classicloadbalancer/),

	        pointer:
	          sourceName:   <name of the Classic Load Balancer>
	          method:       classic
	          role:         <AWS IAM role used to update the Load Balancer>

	    Note: `role` is and optional setting and if set, the role should have trust relationship allowing "ecs.amazonaws.com", if this is left blank, Shippable will search for one that has the right level of trust automatically. If none is found, the job where this resource is used will fail.

	* For [AWS Application Load Balancers](https://aws.amazon.com/elasticloadbalancing/applicationloadbalancer/),

	        pointer:
	          sourceName:   <name of the target group ARN>
	          method:       application
	          role:         <AWS IAM role used to update the Load Balancer>

	    Note: `role` is and optional setting and if set, the role should have trust relationship allowing "ecs.amazonaws.com", if this is left blank, Shippable will search for one that has the right level of trust automatically. If none is found, the job where this resource is used will fail.

	* For [Google Cloud Load Balancers](https://kubernetes.io/docs/user-guide/services/) used in `provision` jobs,

	        pointer:
	          sourceName:           <lowercase alphanumeric name only>
	          method:               clusterIP | ExternalName | LoadBalancer | NodePort  #default is clusterIP
	          namespace:            <name of the namespace where pod is deployed>       #optional
	          clusterName:          <name of the GKE cluster>
	          region:               <name of the region>
	        version:
	          ports:
	            - name:             <string>
	              protocol:         TCP | UDP #default TCP
	              port:             <integer>
	              targetPort:       <string>
	              nodePort:         <integer>
	          selector:
	            <string> : <string>
	          clusterIP:            None | "" | <string>
	          externalIPs:
	            - <string>
	          sessionAffinity:      ClientIP | None
	          loadBalancerIP:       <string>
	          loadBalancerSourceRanges:
	            - <string>
	          externalName:         <string>

## Used in Jobs
This resource is used as an `IN` for the following jobs:

* [deploy](/platform/workflow/job/deploy/)
* [provision](/platform/workflow/job/provision/)

## Default Environment Variables
Whenever `loadBalancer` is used as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.


| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_NAME 							| The name of the resource. |
| `<NAME>`\_ID 								| The ID of the resource. |
| `<NAME>`\_TYPE 							| The type of the resource. In this case `loadBalancer`. |
| `<NAME>`\_INTEGRATION\_`<FIELDNAME>`	| Values from the integration that was used. More info on the specific integration page. |
| `<NAME>`\_OPERATION 						| The operation of the resource; either `IN` or `OUT`. |
| `<NAME>`\_PATH 							| The directory containing files for the resource. |
| `<NAME>`\_POINTER\_METHOD 				| Region defined in the pointer. Available if the integration is AWS or Google. |
| `<NAME>`\_POINTER\_ROLE 					| ClusterName defined in the pointer. Available if the integration is AWS. |
| `<NAME>`\_POINTER\_NAMESPACE 			| Namespace defined in the pointer. Available if the integration is Google. |
| `<NAME>`\_SOURCENAME    					| SourceName defined in the pointer. |
| `<NAME>`\_VERSIONID    					| The ID of the version of the resource being used. |
| `<NAME>`\_VERSIONNAME						| The versionName of the version of the resource being used. |
| `<NAME>`\_VERSIONNUMBER 					| The number of the version of the resource being used. |

## Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Jobs](/platform/workflow/job/overview)
* [Resource](/platform/workflow/resource/overview)
