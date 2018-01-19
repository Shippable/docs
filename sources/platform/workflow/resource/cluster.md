page_main_title: cluster
main_section: Platform
sub_section: Workflow
sub_sub_section: Resources
page_title: Unified Pipeline Resources - cluster
page_description: List of supported resources
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# cluster

`cluster` is used to represent a set of machines or a container orchestration system. It is predominantly used to deploy services/apps to the specified cluster and in some cases it can also be used to run certain maintenance activities on the cluster as a whole.

You can create a `cluster` resource by [adding](/platform/tutorial/workflow/crud-resource#adding) it to `shippable.yml`.

- [Latest Syntax (Shippable v6.1.1 and above)](#latestSyntax)
- [Old Syntax (forward compatible)](#oldSyntax)

<a name="latestSyntax"></a>
### Latest Syntax (Shippable v6.1.1 and above)

```
resources:
  - name:             <string>
    type:             cluster
    integration:      <string>
    versionTemplate:  <object>
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `cluster`

* **`integration`** -- name of the subscription integration, i.e. the name of your integration at `https://app.shippable.com/subs/[github or bitbucket]/[Subscription name]/integrations`. Currently supported integration types are:
	* [AWS Keys](/platform/integration/aws-keys)
	* [Azure Container Service](/platform/integration/azureDcosKey)
	* [Azure Container Service (AKS)](/platform/integration/azure-keys)
	* [Amazon ECS](/platform/integration/aws-iam)
	* [Docker Cloud](/platform/integration/dclKey)
	* [Docker Datacenter](/platform/integration/ddcKey)
	* [Google Cloud](/platform/integration/gcloudKey)
	* [Kubernetes](/platform/integration/kubernetes-config)
	* [Node Cluster](/platform/integration/nodeCluster)
	* [Joyent Triton](/platform/integration/joyentTritonKey)

* **`versionTemplate`** -- is an object that contains integration specific properties
	* For AWS integrations:

	        versionTemplate:
	          region:     <AWS region, e.g., us-east-1, us-west-1, etc.>
	          sourceName: <Amazon ECS cluster name>

	* For Azure DC/OS integrations - N/A
	* For Azure Container Service (AKS) integrations:
	    If you are using a bastion host, include the `bastionHost` information in the versionTemplate section

              versionTemplate:
                  bastionHost:
                    address:        <public address of your bastion host>
                    user:           <bastionHost user>
                    keyIntegration: <key_integration_resource> # Can be an sshKey or pemKey integration resource

	* For Kubernetes integrations:

		In Kubernetes you can specify the bastionHost information in the versionTemplate section

		     versionTemplate:
			   bastionHost:
			     address:        <public address of your bastion host>
			     user:           <bastionHost user>
			     keyIntegration: <key_integration_resource> # Can be an sshKey or pemKey integration resource

	* For Docker Cloud integrations,

	        versionTemplate:
	          sourceName: <Docker Cloud Cluster Name>

	* For Docker Datacenter integrations - N/A
	* For Google Cloud integrations:

	        versionTemplate:
	          region:     <region, e.g., us-central1-a, us-west1-b, etc.>
	          sourceName: <Google Container Engine cluster name>
	          namespace:  <optional namespace you want to deploy to>

        You can also specify a bastion host to use when connecting to the cluster in the versionTemplate section:

             versionTemplate:
               region:     <region, e.g., us-central1-a, us-west1-b, etc.>
               sourceName: <Google Container Engine cluster name>
               namespace:  <optional namespace you want to deploy to>
               bastionHost:
                 address:        <public address of your bastion host>
                 user:           <bastionHost user>
                 keyIntegration: <key_integration_resource> # Can be an sshKey or pemKey integration resource

    * For Node Cluster integrations:

        If you are using a bastion host, include the `bastionHost` information in the versionTemplate section

            versionTemplate:
                bastionHost:
                    address:        <public address of your bastion host>
                    user:           <bastionHost user>
                    keyIntegration: <key_integration_resource> # Can be an sshKey or pemKey integration resource>

	* For Joyent Triton integrations:

	        versionTemplate:
	          region: <region eg., us-east-1, us-east-2, eu-ams-1, etc.>


<a name="oldSyntax"></a>
### Old Syntax (forward compatible)

```
resources:
  - name:           <string>
    type:           cluster
    integration:    <string>
    pointer:        <object>
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `cluster`

* **`integration`** -- name of the subscription integration, i.e. the name of your integration at `https://app.shippable.com/subs/[github or bitbucket]/[Subscription name]/integrations`. Currently supported integration types are:
	* [AWS Keys](/platform/integration/aws-keys)
	* [Azure Container Service](/platform/integration/azureDcosKey)
	* [Azure Container Service (AKS)](/platform/integration/azure-keys)
	* [Amazon ECS](/platform/integration/aws-iam)
	* [Docker Cloud](/platform/integration/dclKey)
	* [Docker Datacenter](/platform/integration/ddcKey)
	* [Google Cloud](/platform/integration/gcloudKey)
	* [Kubernetes](/platform/integration/kubernetes-config)
	* [Node Cluster](/platform/integration/nodeCluster)
	* [Joyent Triton](/platform/integration/joyentTritonKey)

* **`pointer`** -- is an object that contains integration specific properties
	* For AWS integrations:

	        pointer:
	          region:     <AWS region, e.g., us-east-1, us-west-1, etc.>
	          sourceName: <Amazon ECS cluster name>

	* For Azure DC/OS integrations - N/A
	* For Azure Container Service (AKS) integrations:
	    If you are using a bastion host, include the `bastionHost` information in the pointer section

              pointer:
                  bastionHost:
                    address:        <public address of your bastion host>
                    user:           <bastionHost user>
                    keyIntegration: <key_integration_resource> # Can be an sshKey or pemKey integration resource

	* For Kubernetes integrations:

		In Kubernetes you can specify the bastionHost information in the pointer section

		     pointer:
			   bastionHost:
			     address:        <public address of your bastion host>
			     user:           <bastionHost user>
			     keyIntegration: <key_integration_resource> # Can be an sshKey or pemKey integration resource

	* For Docker Cloud integrations,

	        pointer:
	          sourceName: <Docker Cloud Cluster Name>

	* For Docker Datacenter integrations - N/A
	* For Google Cloud integrations:

	        pointer:
	          region:     <region, e.g., us-central1-a, us-west1-b, etc.>
	          sourceName: <Google Container Engine cluster name>
	          namespace:  <optional namespace you want to deploy to>

        You can also specify a bastion host to use when connecting to the cluster in the pointer section:

             pointer:
               region:     <region, e.g., us-central1-a, us-west1-b, etc.>
               sourceName: <Google Container Engine cluster name>
               namespace:  <optional namespace you want to deploy to>
               bastionHost:
                 address:        <public address of your bastion host>
                 user:           <bastionHost user>
                 keyIntegration: <key_integration_resource> # Can be an sshKey or pemKey integration resource

	* For Node Cluster integrations - N/A
	* For Joyent Triton integrations,

	        pointer:
	          region: <region eg., us-east-1, us-east-2, eu-ams-1, etc.>

## Used in Jobs
This resource is used as an `IN` for the following jobs:

* [deploy](/platform/workflow/job/deploy)
* [runSh](/platform/workflow/job/runSh)

## Default Environment Variables
Whenever `cluster` is used as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_NAME 							| The name of the resource. |
| `<NAME>`\_ID 								| The ID of the resource. |
| `<NAME>`\_TYPE 							| The type of the resource. In this case `cluster`. |
| `<NAME>`\_INTEGRATION\_`<FIELDNAME>`	| Values from the integration that was used. More info on the specific integration page. |
| `<NAME>`\_OPERATION 						| The operation of the resource; either `IN` or `OUT`. |
| `<NAME>`\_PATH 							| The directory containing files for the resource. |
| `<NAME>`\_POINTER\_REGION 				| Region defined in the pointer. Available if the integration is AWS or Google. |
| `<NAME>`\_POINTER\_CLUSTERNAME 			| ClusterName defined in the pointer. Available if the integration is Google. |
| `<NAME>`\_POINTER\_NAMESPACE 			| Namespace defined in the pointer. Available if the integration is Google. |
| `<NAME>`\_SOURCENAME    					| SourceName defined in the pointer. |
| `<NAME>`\_VERSIONID    					| The ID of the version of the resource being used. |
| `<NAME>`\_VERSIONNAME						| The versionName of the version of the resource being used. |
| `<NAME>`\_VERSIONNUMBER 					| The number of the version of the resource being used. |

## Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [manifest Job](/platform/workflow/job/manifest)
* [release Job](/platform/workflow/job/release)
