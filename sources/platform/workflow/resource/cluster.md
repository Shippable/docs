page_main_title: cluster
main_section: Platform
sub_section: Workflow
sub_sub_section: Resources
page_title: Unified Pipeline Resources - cluster
page_description: List of supported resources
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# cluster
`cluster` is used to represent a set of machines or a container orchestration system. It used to predominantly deploy services/apps to it and in some case it can also be used to run certain maintenance activities on the cluster as a whole.

You can create a `cluster` resource by [adding](/platform/workflow/resource/resources-working-wth#adding) it to `shippable.resources.yml`

```
resources:
  - name: 			<string>
    type: 			cluster
    integration: 	<string>
    pointer:		<object>
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `cluster`

* **`integration`** -- name of the integration. Currently supported integrations
	* [AWS](/platform/integration/aws)
	* [AWS Elastic Container Service (ECS)](/platform/integration/aws-ecs)
	* [Azure Container Service](/platform/integration/azure-dcos)
	* [Docker Cloud](/platform/integration/docker-cloud)
	* [Docker Datacenter](/platform/integration/docker-datacenter)
	* [Google Container Engine (GKE)](/platform/integration/gke)
	* [Kubernetes](/platform/integration/kubernetes)
	* [Node Cluster](/platform/integration/node-cluster)

* **`pointer`** -- is an object which contains integration specific properties
	* For AWS integration

	```
	    pointer:
	      region: <aws region for e.g us-east-1, us-west-1 etc.>
	      sourceName: contains ECS cluster name
	```

	* For Azure integration - NA
	* For Kubernetes integration - NA
	* For Docker Cloud integration

	```
	    pointer:
	      sourceName: <Docker Cloud Cluster Name>
	```

	* For Docker Datacenter - NA
	* For Kubernetes integration - NA
	* For GKE integration

	```
	    pointer:
	      region: <aws region for e.g us-east-1, us-west-1 etc.>
	      sourceName: <cluster of type Google Container Engine>
	      namespace: optional if you want to specify which namespace you want to deploy to
	```

	* For node Cluster - NA

## Used in JOBs
This resource is used as an IN for the following jobs

* [deploy](/platform/workflow/job/deploy)
* [runSh](/platform/workflow/job/runSh)

## Default Environment Variables
Whenever `cluster` is used as an `IN` or `OUT` into a Job that can execute user defined scripts, a set of environment variables are configured by the platform that may be useful to set the context before user defined scripts execute as part of the Job. These are variables available when this Resource is used

`<NAME>` is the the friendly name of the Resource

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_NAME 							| The name of the resource. |
| `<NAME>`\_ID 								| The ID of the resource. |
| `<NAME>`\_TYPE 							| The type of the resource. In this case `cluster`|
| `<NAME>`\_INTEGRATION\_`<FIELDNAME>`	| Values from the integration that was used. More info on the specific Integration page|
| `<NAME>`\_OPERATION 						| The operation of the resource; either `IN` or `OUT`. |
| `<NAME>`\_PATH 							| The directory containing files for the resource. |
| `<NAME>`\_POINTER\_REGION 				| Region defined in the pointer. Available if the integration is AWS or Google |
| `<NAME>`\_POINTER\_CLUSTERNAME 			| ClusterName defined in the pointer. Available if the integration is Google |
| `<NAME>`\_POINTER\_NAMESPACE 			| Namespace defined in the pointer. Available if the integration is Google |
| `<NAME>`\_SOURCENAME    					| SourceName defined in the pointer |
| `<NAME>`\_VERSIONID    					| The ID of the version of the resource being used. |
| `<NAME>`\_VERSIONNAME						| versionName of the version of the resource being used. |
| `<NAME>`\_VERSIONNUMBER 					| The number of the version of the resource being used. |

## Shippable Utility Functions
To make it easy to GET and SET with these Environment Variables, the platform provides a bunch of utility functions so that you don't need to perform string concatenations etc. to work with this values.

These utility functions are [documented here]()

## Further Reading
* [manifest Job](/platform/workflow/job/manifest)
* [release Job](/platform/workflow/job/release)
