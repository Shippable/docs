page_main_title: Anatomy of shippable.jobs.yml
main_section: Platform
sub_section: Tutorials
sub_sub_section: Workflow
page_title: shippable.jobs.yml
page_description: Structure of shippable.jobs.yml
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# Anatomy of shippable.jobs.yml

[Jobs](/platform/workflow/job/overview/) are the executable units of your pipelines that can execute any DevOps activity. A simple way to think of it is, if something can execute in the shell of your laptop, it can execute as a Job.

Jobs take Inputs in the form of [Resources](/platform/workflow/resource/overview), execute tasks that perform the operations necessary and then produce a result i.e. Output(s). Now these Outputs can become Inputs to other jobs and so on forming a dependency-based, event-driven DevOps Assembly Line.

Jobs are defined in a yml-based configuration file `shippable.jobs.yml` that is committed to source control in your [Sync repository](/platform/workflow/resource/syncrepo/).

The anatomy of the jobs configuration in `shippable.jobs.yml` generally follows the structure below:

```
jobs:
  - name: 					<string>
    type: 					<job type name>
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
      - IN: 				<params/dockerOption/replicas resource>
        applyTo:
          - 				<image/manifest/release>
          - 				<image/manifest/release>
      - IN: 				<loadBalancer resource>
        applyTo:
          - manifest: 		<manifest>
            image: 			<image>              
            port: 			<number>
      - IN: 				<gitRepoResource with buildOnPullRequest: true>
        showBuildStatus: 	true
      - IN: 				<manifest/release>
        force: 				true
      - TASK:
        - script: 			<any shell command>
        - script: 			<any shell command>
      - OUT: 				<resource>
      - OUT: 				<resource>
        replicate: 			<IN resource>
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

Any special `YML` tags that are job specific is defined in respective job pages.

* **`name`** -- an **alphanumeric** string (underscores are permitted) that makes it easy to infer what the job does e.g. `prov_test_env` to represent a job that provisions test environment.

* **`type`** -- Name of the job type that this job is an instance of. [Here](/platform/workflow/job/overview#types) is a list of all types

* **`steps`** -- is an object that is the heart of the Job. It usually is made up of and array of INs, TASK & OUTs
	* `IN` -- represents the input Resource or a preceding Job. Whenever there is a change to these inputs, this job will be triggered to run. `IN`s have attributes that are used to control the flow
		* `switch` -- this determines whether a chance to the input entity will trigger a new run or not. default is `on` and can be set to `off` to turn of auto triggering

		* `versionName` -- this is used to pin a particular version of the input entity. This is a friendly name and will take in the first matching one from the list of versions chronologically descending. You can pin your Job to use specific versionName of the `INs` that the job takes in as inputs. This is typically used to control which version gets deployed etc. or even [rollback](/deploy/rollback/) if you need to.
		* `versionNumber` -- this is a special used to pin a particular version of the input entity. Since every versionNumber is unique, this is guaranteed to give you predictable results. You can pin your Job to use specific versionNumber of the `INs` that the job takes in as inputs. This is typically used to control which version gets deployed etc. or even [rollback](/deploy/rollback/) if you need to. Both `versionName` and `versionNumber` cannot be used for the same `IN`
		* `applyTo` - Optional setting and this is allowed only for [loadBalancer]() [image]() & [dockerOptions]() Resources when used in conjunction with a [deploy]() or [manifest]() Job. In all other cases, it is ignored. If it is set in the context of a loadBalancer, it takes in an object which sets the manifest that the loadBalancer connects to, the container image and port to create is listner to needs to be set. In other cases, it expects either a manifest, release or an image name.
		* `force` -- and Optional setting and it is used only when the context is a `manifest` or `release` Resource and its used in a [deploy]() Job. This setting will force the deployment even if the manifest or release entity has not change. Typically used if your images use static tags.
		* `showBuildStatus ` - this is allowed only for [gitRepo]() Resource with `buildOnPullRequest` option turned on. This setting will push execution status message to the open PR. For example, the following messages are shown in the GitHub UI:

			* Job is processing
			<img src="/images/platform/jobs/runSh/processingBuildStatus.png" alt="Build Status Processing" style="width:800px;vertical-align: middle;display: block;margin-right: auto;"/>

			* Job was successful
			<img src="/images/platform/jobs/runSh/successBuildStatus.png" alt="Build Status Success" style="width:800px;vertical-align: middle;display: block;margin-right: auto;"/>

			* Job was canceled or failed
			<img src="/images/platform/jobs/runSh/failedBuildStatus.png" alt="Build Status Failed" style="width:800px;vertical-align: middle;display: block;margin-right: auto;"/>

	* `TASK` -- is an array of single line scripts that are executed as part of the Job. These are executed in series and will stop processing the moment an exit code is encountered
	* `OUT` -- only Resources can be `OUT`s. This means the current Job is altering the state of the Resource that is defined in the `OUT`. Any Resource can be used for storing key-value pairs are output of the Job. But a special Resource [state]() can be used for both key-value pairs and files. A Resource cannot both IN and OUT for the same Job unless it is a `state` Resource. This is to avoid circular dependencies which will cause a loop in your DevOps Assembly Lines
		* `replicate` -- an optional setting, that allows you to copy the current version of an `IN` Resource in the context of the Job to the desired `OUT` Resource. This is useful if you need some pre-processing for example "validate commit message of a git commit before you execute the actual Job". A word of caution; this if used improperly can lead to unexpected behavior in your workflow
		* `overwrite` -- an optional setting, that allows you to completely replace the state of the `OUT` Resource. This is useful, for example, if you have multiple jobs that affect the state of the Resource and you want the state of your Resource to always reflect the most recent update. The default value is `false`, which means the state of your Resource is always appended to by the `OUT`, never replaced.

* **`on_start `** -- this section is executed before the `steps` are executed. You can run two types of activities here
	* `script` -- any single line shell script can be executed here. This section is only available to `runCI` and `runSh`
	* `NOTIFY` -- a Resource of type [notification]() can be added to send alerts about the Job
* **`on_success `** -- this section is executed if the `steps` execution exits with 0 as the exit code. Supports `script` for `runCI` and `runSh` and `NOTIFY` for all jobs
* **`on_failure `** -- this section is executed if the `steps` execution exits with non-zero exit code. Supports `script` for `runCI` and `runSh` and `NOTIFY` for all jobs
* **`on_cancel `** -- this section is executed if the `steps` execution is cancelled. Supports `script` for `runCI` and `runSh` and `NOTIFY` for all jobs
* **`always `** -- this section is executed no matter what the status is. Supports `script` for `runCI` and `runSh` and `NOTIFY` for all jobs


## Further Reading
* [Integrations](/platform/integration/overview/)
* [Jobs](/platform/workflow/job/overview/)
* [Resources](/platform/workflow/resource/overview/)
