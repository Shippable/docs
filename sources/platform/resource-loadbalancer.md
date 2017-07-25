page_main_title: loadBalancer
main_section: Platform
sub_section: Resources

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
	      sourceName: <name of the Classic Load Balancer>
	      method: classic
	      role: <AWS IAM role used to update the Load Balancer> 
	      
	```
	Note: `role` is and optional setting and if set, the role should have trust relationship allowing "ecs.amazonaws.com", if this is left blank, shippable will search for one that has the right level of trust automatically. If none found, the job where this resource is used will fail

	* in case of [AWS Application Load Balancers](https://aws.amazon.com/elasticloadbalancing/applicationloadbalancer/)
		
	```
	    pointer:
	      sourceName: <name of the target group ARN>
	      method: application
	      role: <AWS IAM role used to update the Load Balancer> 
	      
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
		sourceName: 	<lowecase alphanumeric name only>
		method: 		clusterIP | ExternalName | LoadBalancer | NodePort  #default is clusterIP
		namespace: 		<name of the namespace where pod is deployed on>    #optional
		clusterName: 	<name of the GKE cluster>
		region: <name of the region>	
		version:
		  ports:
		    - name: 			<string>
		      protocol: 		TCP | UDP		#default TCP
		      port: 			<integer>
		      targetPort: 		<string>
		      nodePort: 		<integer>
		  selector:
		    					<string> : <string>
		  clusterIP: 			None | "" | <string>
		  externalIPs:
		    - 					<string>
		  sessionAffinity: 		ClientIP | None
		  loadBalancerIP: 		<string>
		  loadBalancerSourceRanges:
		    - 					<string>
		  externalName: 		<string>
	```

# Used in JOBs
This resource is used as an IN for the following jobs

* [deploy](jobs-deploy/)
* [provision](job-provision/)

# Further Reading
* JFrog integration
* AWS integration
* runCLI job
* cli pre-installed in job runtime
* how to deploy a file to a VM cluster
* Output a file from runSH
