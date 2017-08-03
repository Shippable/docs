page_main_title: cliConfig
main_section: Platform
sub_section: Workflow
sub_sub_section: Resources

# cliconfig
`cliConfig` is a resource used to store configuration information needed to setup a Command Line Interface.

You can create a `cliConfig` resource by [adding](/platform/workflow/resource/working-with#adding) it to `shippable.resources.yml`

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
	* [AWS](integration/aws)
	* [AWS ECR](integration/aws-ecr)
	* [Docker Hub](integration/docker-hub)
	* [Docker Trusted Registry](integration/docker-trusted-registry)
	* [Docker Private Registry](integration/docker-private-registry)
	* [Google Cloud](integration/gce)
	* [Google Container Registry](integration/gcr)
	* [Google Container Engine](integration/gke)
	* [JFrog](integration/jfrog-artifactory)
	* [Kubernetes](integration/kubernetes)
	* [Quay](integration/quay)

* **`pointer`** -- is an object which contains integration specific properties
	* in case of AWS

	```
	    pointer:
	      region: <aws region for e.g us-east-1, us-west-1 etc.>
	```

	* in case of Google Integrations, if region and clusterName is provided `gcloud` and `kubectl` will be sutomatically configured to use it. If not provided, just the authentication to google cloud is done automatically

	```
	    pointer:
	      region: <aws region for e.g us-east-1, us-west-1 etc.>
	      clusterName: <cluster of type Google Container Engine>
	```

<a name="cliConfigTools"></a>
## Configured CLI tools

The runCLI and runSh job uses the subscription integration specified in the
cliConfig to determine which CLI tools to configure.
These tools are configured with the credentials contained in the subscription
integration. Here is a list of the tools configured for each integration type:

| Integration Type                    | Configured Tools           |
| ------------------------------------|-------------|
| AWS                                 | [AWS CLI](/platform/runtime/cli/aws); [AWS Elastic Beanstalk CLI](/platform/runtime/cli/awseb) |
| Amazon EC2 Container Registry (ECR) | [Docker Engine](/platform/runtime/cli/docker) |
| Docker Hub                          | [Docker Engine](/platform/runtime/cli/docker) |
| Docker Private Registry             | [Docker Engine](/platform/runtime/cli/docker) |
| Docker Trusted Registry             | [Docker Engine](/platform/runtime/cli/docker) |
| Google Container Engine             | [gcloud](/platform/runtime/cli/gke); [kubectl](/platform/runtime/cli/kubectl) |
| Google Container Registry (GCR)     | [Docker Engine](/platform/runtime/cli/docker) |
| JFrog Artifactory                   | [JFrog CLI](/platform/runtime/cli/jfrog) |
| Kubernetes                          | [kubectl](/platform/runtime/cli/kubectl) |
| Quay.io                             | [Docker Engine](/platform/runtime/cli/docker) |

## Used in JOBs
This resource is used as an IN for the following jobs

* [runCI](workflow/job/runci/)
* [runSh](workflow/job/runsh/)

## Default Environment Variables
Whenever `cliConfig` is used as an `IN` or `OUT` into a Job that can execute user defined scripts, a set of environment variables are configured by the platform that may be useful to set the context before user defined scripts execute as part of the Job. These are variables available when this Resource is used

`<NAME>` is the the friendly name of the Resource

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_NAME 							| The name of the resource. |
| `<NAME>`\_ID 								| The ID of the resource. |
| `<NAME>`\_TYPE 							| The type of the resource. In this case `cliConfig`|
| `<NAME>`\_INTEGRATION\_`<FIELDNAME>`	| Values from the integration that was used. More info on the specific Integration page|
| `<NAME>`\_OPERATION 						| The operation of the resource; either `IN` or `OUT`. |
| `<NAME>`\_PATH 							| The directory containing files for the resource. |
| `<NAME>`\_POINTER\_REGION 				| Region defined in the pointer. Available if the integration is AWS or Google |
| `<NAME>`\_POINTER\_CLUSTERNAME 			| ClusterName defined in the pointer. Available if the integration is Google |
| `<NAME>`\_VERSIONNUMBER 					| The number of the version of the resource being used. |
| `<NAME>`\_VERSIONNAME						| versionName of the version of the resource being used. |
| `<NAME>`\_VERSIONID    					| The ID of the version of the resource being used. |

## Shippable Utility Functions
To make it easy to GET and SET with these Environment Variables, the platform provides a bunch of utility functions so that you don't need to perform string concatenations etc. to work with this values.

These utility functions are [documented here]()

## Further Reading
* [Jobs](/platform/workflow/job/overview)
* [Resource](/platform/workflow/resource/overview)
* [Supported CLIs](/platform/runtime/overview#cli)

## TODO
| Tasks   |      Status    |
|----------|-------------|
| Update Utility functions section|  Open |
