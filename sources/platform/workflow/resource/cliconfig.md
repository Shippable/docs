page_main_title: cliConfig
main_section: Platform
sub_section: Workflow
sub_sub_section: Resources

# cliConfig
`cliConfig` is a resource used to store configuration information needed to setup a Command Line Interface.

You can create a `cliConfig` resource by [adding](/platform/tutorial/workflow/crud-resource#adding) it to `shippable.yml`.

Multiple cliConfig resources may be used as `IN`s and their respective CLIs are configured automatically. If more than one cliConfig of the same integration type is added, the last one used in `IN` statements wins.

```
resources:
  - name:           <string>
    type:           cliConfig
    integration:    <string>
    pointer:        <object>
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `cliConfig`

* **`integration`** -- name of the Subscription integration, i.e. the name of your integration at `https://app.shippable.com/subs/[github or bitbucket]/[Subscription name]/integrations`. Currently supported integration types are:
	* [AWS Keys](/platform/integration/aws-keys)
	* [Azure Keys](/platform/integration/azure-keys)
	* [Docker Registry](/platform/integration/dockerRegistryLogin)
	* [Google Cloud](/platform/integration/gcloudKey)
	* [JFrog Artifactory](/platform/integration/jfrog-artifactoryKey)
	* [Kubernetes](/platform/integration/kubernetes-config)
	* [Quay](/platform/integration/quayLogin)

* **`pointer`** -- is an object that contains integration specific properties
	* For an AWS integration:

	        pointer:
	           region: <AWS region, e.g., us-east-1, us-west-1, etc.>

      * If you need the CLI to also configure ECR, you need to pass it in as a scope in the job. Example:

            jobs:
              - name: runSh-success-1
                type: runSh
                steps:
                  - IN: aws-keys-cliConfig
                    scopes:
                      - ecr
                  - TASK:
                    - script: ls

	* For Google integrations, if no scopes are mentioned just the authentication to Google Cloud is done automatically. If no scopes are passed then, the region and cluster name will be ignored.

	        pointer:
	          region:      <region, e.g., us-central1-a, us-west1-b, etc.>
	          clusterName: <cluster name>

      * If you need the CLI to also configure GKE, you need to pass it in as a scope in the job. if region and clusterName are provided `gcloud` and `kubectl` will be automatically configured to use that region and cluster.  Otherwise, an error will occur when attempting to authenticate. Example:

            jobs:
              - name: runSh-success-1
                type: runSh
                steps:
                  - IN: gcloud-key-cliConfig
                    scopes:
                      - gke  # if present, region and clusterName must exist in the cliConfig resource
                  - TASK:
                    - script: kubectl get namespaces

      * If you need the CLI to also configure GCR, you need to pass it in as a scope in the job. However, if you pass `scopes` as gcr as below , the region and cluster, even if provided, will be ignored.  Example:

            jobs:
              - name: runSh-success-1
                type: runSh
                steps:
                  - IN: gcloud-key-cliConfig
                    scopes:
                      - gcr
                  - TASK:
                    - script: ls


    * For Azure integrations, the pointer section is optional.  If left blank, Shippable will simply perform an `az login` using the credentials in your integration.  If you're planning to use AKS, then your pointer section will need to contain the Azure resource group name, and the cluster name of your AKS cluster.

            pointer:
              groupName:      <your cluster's azure resource group name>
              clusterName:    <name of your aks cluster>

      * To properly configure AKS, you'll also need to add an extra 'scope' option to your cliConfig IN step.  Shippable will attempt to use the `az` cli to authenticate with your cluster using the values provided in the pointer section.  If they are not present, the job will fail with an error.  Once authentication is successful, `kubectl` can be used to issue commands to your cluster.  Example:

            jobs:
              - name: runSh-success-1
                type: runSh
                steps:
                  - IN: azure-key-cliConfig
                    scopes:
                      - aks # if present, groupName and clusterName must exist in the cliConfig resource
                  - TASK:
                    - script: kubectl get namespaces


<a name="cliConfigTools"></a>
## Configured CLI tools

A runSh job uses the subscription integration specified in the
cliConfig to determine which CLI tools to configure.
These tools are configured with the credentials contained in the subscription
integration. Here is a list of the tools configured for each integration type:

| Integration Type                    | Configured Tools           |
| ------------------------------------|-------------|
| AWS                                 | [AWS CLI](/platform/runtime/machine-image/cli-versions/#aws); [AWS Elastic Beanstalk CLI](/platform/runtime/machine-image/cli-versions/#aws-elastic-beanstalk) |
| AWS with `ecr` scope                | [Docker Engine](/platform/runtime/machine-image/cli-versions/#docker) |
| Azure                               | [Azure CLI](/platform/runtime/machine-image/cli-versions/#azure) |
| Azure with `aks` scope              | [Azure CLI](/platform/runtime/machine-image/cli-versions/#azure); [kubectl](/platform/runtime/machine-image/cli-versions/#kubectl) |
| Docker Registry                     | [Docker Engine](/platform/runtime/machine-image/cli-versions/#docker) |
| Google Cloud                        | [gcloud](/platform/runtime/machine-image/cli-versions/#google-cloud-platform); [kubectl](/platform/runtime/machine-image/cli-versions/#kubectl) |
| Google Cloud with `gke` scope       | [gcloud](/platform/runtime/machine-image/cli-versions/#google-cloud-platform); [kubectl](/platform/runtime/machine-image/cli-versions/#kubectl) |
| Google Cloud with `gcr` scope       | [Docker Engine](/platform/runtime/machine-image/cli-versions/#docker) |
| JFrog Artifactory                   | [JFrog CLI](/platform/runtime/machine-image/cli-versions/#jfrog) |
| Kubernetes                          | [kubectl](/platform/runtime/machine-image/cli-versions/#kubectl) |
| Quay.io                             | [Docker Engine](/platform/runtime/machine-image/cli-versions/#docker) |

**Note**: Google Cloud with `gke` scope is used to configure the cluster name and region. For all other google cloud integration type(with no scopes or when scope is `gcr`) the cluster name and region will be ignored.

## Used in Jobs
This resource is used as an `IN` for the following jobs

* [runSh](/platform/workflow/job/runsh/)

## Default Environment Variables
Whenever `cliConfig` is used as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_NAME 							| The name of the resource. |
| `<NAME>`\_ID 								| The ID of the resource. |
| `<NAME>`\_TYPE 							| The type of the resource. In this case `cliConfig`. |
| `<NAME>`\_INTEGRATION\_`<FIELDNAME>`	| Values from the integration that was used. More info on the specific integration page. |
| `<NAME>`\_OPERATION 						| The operation of the resource; either `IN` or `OUT`. |
| `<NAME>`\_PATH 							| The directory containing files for the resource. |
| `<NAME>`\_POINTER\_REGION 				| Region defined in the pointer. Available if the integration is AWS or Google. |
| `<NAME>`\_POINTER\_CLUSTERNAME 			| ClusterName defined in the pointer. Available if the integration is Google. |
| `<NAME>`\_VERSIONNUMBER 					| The number of the version of the resource being used. |
| `<NAME>`\_VERSIONNAME						| The versionName of the version of the resource being used. |
| `<NAME>`\_VERSIONID    					| The ID of the version of the resource being used. |

## Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Jobs](/platform/workflow/job/overview)
* [Resource](/platform/workflow/resource/overview)
* [Supported CLIs](/platform/runtime/overview#cli)
