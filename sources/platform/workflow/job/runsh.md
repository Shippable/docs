page_main_title: runSH
main_section: Platform
sub_section: Workflow
sub_sub_section: Jobs
page_title: Unified Pipeline Jobs - runSh
page_description: List of supported jobs
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# runSh
`runSh` is a Job that lets you run any `shell` script as part of your DevOps Assembly Line. It is one of the most versatile Jobs in the arsenal and can be used to pretty much execute any DevOps activity that can be scripted. With a combination of `IN`s like `params`, `integration`, `gitRepo` etc. the vision of "Everything as Code" can be realized.

You should use this job type if you need the freedom that some of the pre-packaged Jobs like [deploy](/platform/workflow/job/deploy) and [manifest](/platform/workflow/job/manifest) do not provide the flexibility that you need or do not support the 3rd party end-point you want to integrate to. For example, pushing to Heroku is not yet natively supported through a managed job type, so you can write the scripts needed to do this and add it to your workflow as a Job of type `runSh`.

You can also add [cliConfig](/platform/workflow/resource/cliconfig) resources as inputs to this job. The relevant CLI tools will be preconfigured for your scripts to use. For a complete list of supported cliConfig integrations see [here](/platform/workflow/resource/cliconfig#cliConfigTools).

A new version is created anytime this Job is executed.

You can create a `runSh` Job by [adding](/platform/tutorial/workflow/howto-crud-job#adding) it to `shippable.jobs.yml` and it executes on Shippable provided [Dynamic Nodes](/platform/runtime/overview#nodes) or [Custom Nodes](/platform/runtime/overview#nodes)

## YML Definition
```
jobs:
  - name: 					<string>
    type: 					runSh
	 on_start:
	   - NOTIFY: 			<notification resource name>
    steps:
      - IN: 				<resource>
        switch: 			off
      - IN: 				<job>
      - IN: 				<resource>
        versionName: 		<name of the version you want to pin>
      - IN: 				<resource>
        versionNumber: 		<number of the version you want to pin>        
      - IN: 				<gitRepoResource with buildOnPullRequest: true>
        showBuildStatus:	true       
      - TASK:
        - script: 			<any shell command>
        - script: 			<any shell command>
      - OUT: 				<resource>
      - OUT: 				<resource>
        replicate: 			<resource>
      - OUT: 				<resource>
        overwrite: 			true
	 on_success:
      - script: 			echo "SUCCESS"
	 on_failure:
      - script: 			echo "FAILED"
      - NOTIFY: 			<notification resource name>
	 on_cancel:
      - script: 			echo "CANCEL"
	 always:
      - script: 			pwd
```
A full detailed description of each tag is available on the [Job Anatomy](/platform/tutorial/workflow/shippable-jobs-yml) page

* **`name`** -- Required, should be an easy to remember text string

* **`type`** -- Required, is set to `runSh`

* **`on_start `** -- Optional, and both `script` and `NOTIFY` types can be used

* **`steps `** -- is an object which contains specific instructions to run this Job
	* `IN` -- Optional, any Resource or Job can be used here and as many of them as you need. `switch`, `versionNumber`, `versionName` and `showBuildStatus` is supported too. `applyTo` is not supported

	* `TASK` -- Required, atleast 1 script needs to be present
	* `OUT` -- Optional, any Resource can be used here and as many as you need
		* `replicate` -- Optional, any `IN` Resource of same type can be used
		* `overwrite` -- Optional, default is `false`

* **`on_success `** -- Optional, and both `script` and `NOTIFY` types can be used

* **`on_failure `** -- Optional, and both `script` and `NOTIFY` types can be used

* **`on_cancel `** -- Optional, and both `script` and `NOTIFY` types can be used

* **`always `** -- Optional, and both `script` and `NOTIFY` types can be used

## cliConfig special handling
If a Resource of type [cliConfig](/platform/workflow/resource/cliconfig) based Resource is added an `IN` into `runSh`, then the corresponding CLI is automatically configured and prepared for you to execute CLI specific commands. The runCLI job uses the subscription integration specified in `cliConfig` to determine which CLI tools to configure. For e.g. if you use a `cliConfig` that uses Docker based integration, then we will automatically log you into the hub based on the configuration. This removes the need for you to having to do this manually. 

Here is a list of the tools configured for each integration type:

| Integration Type                    | Configured Tools|
| ------------------------------------|-------------|
| [AWS](/platform/integration/aws) | [AWS](/platform/runtime/cli/aws) & [Elastic Beanstalk](/platform/runtime/cli/awseb) |
| [AWS ECR](/platform/integration/aws-ecr) | [Docker](/platform/runtime/cli/docker) |
| [Azure](/platform/integration/azure) | [Azure](/platform/runtime/cli/azure) |
| [Docker Hub](/platform/integration/docker-hub) | [Docker](/platform/runtime/cli/docker) |
| [Docker Private Registry](/platform/integration/docker-private-registry) | [Docker](/platform/runtime/cli/docker) |
| [Docker Trusted Registry](/platform/integration/docker-trusted-registry) | [Docker](/platform/runtime/cli/docker) |
| [Google Container Engine](/platform/integration/gke) | [Google Cloud](/platform/runtime/cli/gke) & [Kubectl](/platform/runtime/cli/kubectl) |
| [Google Container Registry](/platform/integration/gcr) | [Docker](/platform/runtime/cli/docker) |
| [JFrog](/platform/integration/jfrog-artifactory) | [JFrog](/platform/runtime/cli/jfrog) |
| [Kubernetes](/platform/integration/kubernetes) | [Kubectl](/platform/runtime/cli/kubectl) |
| [Quay](/platform/integration/quay) | [Docker](/platform/runtime/cli/docker) |
| For all Integrations above | [Packer](/platform/runtime/cli/packer) & [Terraform](/platform/runtime/cli/terraform)| 

## Default Environment Variables
In order to make it easier to write your scripts and work with `IN` and `OUT` resources, we have made several environment variables available for use within your `TASK` section of your `runSh` job. Visit the Resource page for each type, to get the list of environment variables that get set depending on the Resource type thats either `IN` or `OUT`

In addition, the Job itself comes with its own default set of variables. This is the list for this Job type

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| JOB_NAME 									| The name of the Job, given in the YML |
| JOB_TYPE 									| The type of the Job. In this case `runSh`|
| BUILD_ID 									| Internal Id of the current build thats executing|
| BUILD_NUMBER 								| Sequentional number for the Job thats executing|
| BUILD_JOB_ID    							| Internal ID of the currently running Job |
| BUILD_JOB_NUMBER    						| Sequential number of the Job |
| SUBSCRIPTION_ID    						| Shippable ID that represents git organization uniquely |
| JOB_PATH    								| The path of the directory containing files critical for this job |
| JOB_STATE      							| The location of the `state` directory for this job|
| JOB_PREVIOUS_STATE 						| The location of the directory containing the `state` information from when the job last ran. |

## Shippable Utility Functions
To make it easy to GET and SET with these Environment Variables, the platform provides a bunch of utility functions so that you don't need to perform string concatenations etc. to work with this values.

How to use these utility functions are [documented here](/platform/tutorial/workflow/howto-use-shipctl)

## Further Reading
* [Jobs](/platform/workflow/job/overview)
* [Resource](/platform/workflow/resource/overview)
