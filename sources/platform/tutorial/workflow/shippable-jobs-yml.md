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

Jobs can be defined in **shippable.yml** (the preferred approach) or in `shippable.jobs.yml`(the legacy approach) committed to source control in your [Sync repository](/platform/workflow/resource/syncrepo/).

For anatomy of **shippable.yml**, please [read this doc](/platform/workflow/config).

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
      - IN: 				<gitRepo resource with buildOnPullRequest: true>
        showBuildStatus: 	true
      - IN: 				<manifest/release>
        force: 				true
      - TASK:
        - script: 			<any shell command>
        - script: 			<any shell command>
      - OUT: 				<resource>
      - OUT: 				<resource>
        replicate: 			<IN resource>
        replicateOnPullRequest:      <true/false>
	 on_success:
      - script: 			echo "SUCCESS"
	 on_failure:
      - script: 			echo "FAILED"
      - NOTIFY: 			<notification resource name>
	 on_cancel:
      - NOTIFY: 			<notification resource name>
	 always:
      - script: 			pwd
     flags:
      - <flag 1>
      - <flag 2>

```

Any special `YML` tags that are job specific is defined in respective job pages.

* **`name`** -- an **alphanumeric** string (underscores are permitted) that makes it easy to infer what the job does, e.g. `prov_test_env` to represent a job that provisions a test environment.

* **`type`** -- Name of the job type of which this job is an instance. [Here](/platform/workflow/job/overview#types) is a list of all types

* **`steps`** -- is the heart of the job. It is an array of INs, TASK & OUTs.
  * `IN` -- specifies a resource or a preceding job that should be used as an input to this job. Whenever there is a change to an input, this job will be triggered. `IN`s have additional attributes that are used to control the flow.
    * `switch` -- this determines whether a change to this input entity will trigger a new run or not. The default is `on` and `switch` can be set to `off` to turn off auto triggering.

    * `versionName` -- this is used to pin a particular version of the input entity. This is a friendly name and the job will use the most recent matching version. You can pin your job to use a specific `versionName` for any of the `INs` in a job. This is typically used to control which version gets deployed or even [rollback](/deploy/rollback/) if you need to.
    * `versionNumber` -- this is used to pin a particular version of the input entity. Since every `versionNumber` is unique, this is guaranteed to give you predictable results. You can pin your job to use a specific versionNumber of any `INs` that the job uses. This is typically used to control which version gets deployed or even [rollback](/deploy/rollback/) if you need to. Both `versionName` and `versionNumber` cannot be used for the same `IN`.
    * `applyTo` - Optional setting allowed only [loadBalancer](/platform/workflow/resource/loadbalancer/), [image](/platform/workflow/resource/image/) & [dockerOptions](/platform/workflow/resource/dockeroptions/) resources when used in conjunction with a [deploy](/platform/workflow/job/deploy/) or [manifest](/platform/workflow/job/manifest/) job. In all other cases, it is ignored. If it is set in the context of a loadBalancer, it is an object that sets the manifest that the loadBalancer will connect to and the container image and port for the listener. In other cases, it expects either a manifest, release or an image name.
    * `force` -- an optional setting used only in [deploy](/platform/workflow/job/deploy/) jobs when the context is a `manifest` or `release` resource. This setting will force the deployment each time the job is triggered even if the manifest or release entity has not changed. Typically used if your images use static tags.
    * `showBuildStatus ` - this is allowed only for [gitRepo](/platform/workflow/resource/gitrepo/) resources with `buildOnPullRequest` turned on. This setting will push execution status messages to the open PR. For example, the following messages are shown in the GitHub UI:

        * Job is processing
        <img src="/images/platform/jobs/runSh/processingBuildStatus.png" alt="Build Status Processing" style="width:;vertical-align: middle;display: block;margin-right: auto;"/>

        * Job was successful
        <img src="/images/platform/jobs/runSh/successBuildStatus.png" alt="Build Status Success" style="width:800px;vertical-align: middle;display: block;margin-right: auto;"/>

        * Job was canceled or failed
        <img src="/images/platform/jobs/runSh/failedBuildStatus.png" alt="Build Status Failed" style="width:800px;vertical-align: middle;display: block;margin-right: auto;"/>

  * `TASK` -- in a [`runSh`](/platform/workflow/job/runsh/) job, this is an array of single line scripts that are executed as part of the job. These are executed in series and will stop processing the moment an exit code is encountered.  Only `runSh` jobs require a `TASK`.

  * `OUT` -- only resources can be `OUT`s. This is used when the current job is altering the state of the resource that is defined in the `OUT`. Any resource can be used for storing key-value pairs output by a job. The [state](/platform/workflow/resource/state/) resource can be used to store both key-value pairs and files. Only `state` resources can be both IN and OUT for the same job to avoid circular dependencies, which will cause a loop in your DevOps Assembly Lines.
    * `replicate` -- an optional setting that allows you to copy the current version of an `IN` resource in the context of the job to the desired `OUT` resource. This is useful if you need some pre-processing, for example, to validate the commit message of a git commit before you execute the actual job. A word of caution: this, if used improperly, can lead to unexpected behavior in your workflow
    * `replicateOnPullRequest` -- an optional setting that can be used with replicate, specify true to update the replicated `OUT` resource on pull requests.
    * `overwrite` -- an optional setting that allows you to completely replace the state of the `OUT` resource. This is useful, for example, if you have multiple jobs that affect the state of the resource and you want the state of your resource to always reflect the most recent update. The default value is `false`, which means the state of your resource is always appended to by the `OUT`, never replaced.

  * **`on_start `** -- this section is executed before the `steps` are executed. You can send notifications by adding a [notification resource](/platform/workflow/resource/notification/) with `NOTIFY`.
  * **`on_success `** -- this section is executed if the `steps` execution exits with 0 as the exit code. Supports `script` for `runCI` and `runSh` and `NOTIFY` for all jobs.
  * **`on_failure `** -- this section is executed if the `steps` execution exits with non-zero exit code. Supports `script` for `runCI` and `runSh` and `NOTIFY` for all jobs.
  * **`on_cancel `** -- this section is executed if the `steps` execution is cancelled. Supports `NOTIFY` for all jobs.
  * **`always `** -- this section is executed no matter what the status is. Supports `script` for `runCI` and `runSh` and `NOTIFY` for all jobs.
  * **`flags`** -- this section defines a list of flags that can be added to the
      job. The flags are helpful in grouping jobs logically and
      filtering them in SPOG view.


## Further Reading
* [Integrations](/platform/integration/overview/)
* [Jobs](/platform/workflow/job/overview/)
* [Resources](/platform/workflow/resource/overview/)
