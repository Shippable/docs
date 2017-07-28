page_main_title: cliConfig
main_section: Platform
sub_section: Workflow
sub_sub_section: Resources

# TODO
| Tasks   |      Status    |
|----------|-------------|
| Hotlinking |  Open |
| Further Reading needs thinking|  Open |
| Need to pointer for each integration type|  Open |
| Update Utility functions section|  Open |

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
	* Amazon EC2 Container Registry (ECR)
	* Docker Hub
	* Docker Trusted Registry
	* Google Container Engine (GKE)
	* Google Container Registry (GCR)
	* JFrog Artifactory
	* Kubernetes
	* Private Docker Registry
	* Quay.io

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

<a name="cliConfigTools"></a>
## Configured CLI tools

The runCLI and runSh job uses the subscription integration specified in the
cliConfig to determine which CLI tools to configure.
These tools are configured with the credentials contained in the subscription
integration. Here is a list of the tools configured for each integration type:

| Integration Type                    | Configured Tools           |
| ------------------------------------|-------------|
| AWS                                 | [AWS CLI](https://aws.amazon.com/cli/); [EB (Elastic Beanstalk) CLI](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3.html) |
| Amazon EC2 Container Registry (ECR) | [Docker Engine](https://docs.docker.com/engine/platform/commandline/docker/) |
| Docker Hub                          | [Docker Engine](https://docs.docker.com/engine/platform/commandline/docker/) |
| Docker Trusted Registry             | [Docker Engine](https://docs.docker.com/engine/platform/commandline/docker/) |
| Google Container Engine             | [gcloud](https://cloud.google.com/sdk/gcloud/); [kubectl](https://kubernetes.io/docs/user-guide/kubectl/) |
| Google Container Registry (GCR)     | [Docker Engine](https://docs.docker.com/engine/platform/commandline/docker/) |
| JFrog Artifactory                   | [JFrog CLI](https://www.jfrog.com/confluence/display/CLI/CLI+for+JFrog+Artifactory) |
| Kubernetes                          | [kubectl](https://kubernetes.io/docs/user-guide/kubectl/) |
| Private Docker Registry             | [Docker Engine](https://docs.docker.com/engine/platform/commandline/docker/) |
| Quay.io                             | [Docker Engine](https://docs.docker.com/engine/platform/commandline/docker/) |

## Used in JOBs
This resource is used as an IN for the following jobs

* [runCLI](job-runcli/)
* [runSH](jobs-runsh/)

## Default Environment Variables
Whenever `cliConfig` is used as an `IN` or `OUT` into a Job that can execute user defined scripts, a set of environment variables are configured by the platform that may be useful to set the context before user defined scripts execute as part of the Job. These are variables available when this Resource is used

`<NAME>` is the the friendly name of the Resource

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`_NAME 								| The name of the resource. |
| `<NAME>`_ID 								| The ID of the resource. |
| `<NAME>`_TYPE 								| The type of the resource. In this case `cliConfig`|
| `<NAME>`_PATH 								| The directory containing files for the resource. |
| `<NAME>`_OPERATION 						| The operation of the resource; either `IN` or `OUT`. |
| `<NAME>`_VERSIONNUMBER 					| The number of the version of the resource being used. |
| `<NAME>`_VERSIONID    					| The ID of the version of the resource being used. |
| `<NAME>`_POINTER\_REGION 				| Available only if the integration is AWS or Google |
| `<NAME>`_POINTER\_CLUSTERNAME 			| Available only if the integration is Google |
| `<NAME>`_INTEGRATION\_`<FIELDNAME>`	| Depends on the [Integration]() used. Look at Integration page|

## Shippable Utility Functions
To make it easy to GET and SET with these Environment Variables, the platform provides a bunch of utility functions so that you don't need to perform string concatenations etc. to work with this values. 

These utility functions are [documented here]()

## Further Reading
* GKE integration
* AWS integration
* runCLI job
* cli pre-installed in job runtime
