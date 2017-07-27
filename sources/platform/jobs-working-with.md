page_main_title: Overview
main_section: Platform
sub_section: Tutorials
sub_sub_section: Jobs
page_title: DevOps Assembly Line Jobs
page_description: How to add, delete and update resources
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# TODO
| Tasks   |      Status    |
|----------|-------------|
| Hotlinking |  Open |
| Further Reading needs thinking|  Open |
| Need to update migration|  Open |

# Working with Jobs
Shippable DevOps Platform leverages a declarative syntax for CRUD operations on Jobs. A YML `shippable.jobs.yml` config file is used to define them. It is added to your the root of your source code repo just like any other piece of code and the platform recognizes the changes you make to it through webhooks and sync the definitions.

<a name="jobanatomy"></a>
## Anatomy of shippable.jobs.yml
The anatomy of the jobs configuration generally follows the structure below

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

* **`type`** -- Name of the job type that this job is an instance of. [Here](jobs-overview#types) is a list of all types

* **`steps`** -- is an object that is the heart of the Job. It usually is made up of and array of INs, TASK & OUTs
	* `IN` -- represents the input Resource or a preceding Job. Whenever there is a change to these inputs, this job will be triggered to run. `IN`s have attributes that are used to control the flow
		* `switch` -- this determines whether a chance to the input entity will trigger a new run or not. default is `on` and can be set to `off` to turn of auto triggering

		* `versionName` -- this is used to pin a particular version of the input entity. This is a friendly name and will take in the first matching one from the list of versions chronologically descending
		* `versionNumber` -- this is a special used to pin a particular version of the input entity. Since every versionNumber is unique, this is guaranteed to give you predictable results. Both `versionName` and `versionNumber` cannot be used for the same `IN`
		* `applyTo` - Optional setting and this is allowed only for [loadBalancer]() [image]() & [dockerOptions]() Resources when used in conjuction with a [deploy]() or [manifest]() Job. In all other cases, it is ignored. If it is set in the context of a loadBalancer, it takes in an object which sets the manifest that the loadBalancer connects to, the container image and port to create is listner to needs to be set. In other cases, it expects either a manifest, release or an image name.
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
		* `replicate` -- an optional setting, that allows you to copy the current version of an `IN` Resource in the context of the Job to the desired `OUT` Resource. This is useful if you need some pre-processing for example "validate commit message of a git commit before you execute the actual Job". A word of caution; this if used improperly can lead to unexpected behaviour in your workflow

* **`on_start `** -- this section is executed before the `steps` are executed. You can run two types of activities here
	* `script` -- any single line shell script can be executed here
	* `NOTIFY` -- a Resource of type [notification]() can be added to send alerts about the Job
* **`on_success `** -- this section is executed if the `steps` execution exits with 0 as the exit code. Supports both `script` and `NOTIFY` tags
* **`on_failure `** -- this section is executed if the `steps` execution exits with non-zero exit code. Supports both `script` and `NOTIFY` tags
* **`on_cancel `** -- this section is executed if the `steps` execution is cancelled. Supports both `script` and `NOTIFY` tags
* **`always `** -- this section is executed no matter what the status is. Supports both `script` and `NOTIFY` tags

## Folder structure of a Job
When Jobs execute in the minion (instance of Job Runtime) the underly create a specific set of folders on disk

<a name="adding"></a>
## Adding Jobs
Jobs are defined in a configuration file `shippable.jobs.yml` and this file is added to the root of a source control repository. All user permissions that users have on the repo is carried over to the objects defined in the YML. For example, if user 1 has read access he/she will only have read access to Jobs defined in the repo.

Once the Jobs are defined and added to the repo, you will have to connect it to SPOG by creating a `syncRepo` using the UI. Detailed step by step instructions are [here ](/platform/resource-syncrepo)

After adding a `syncRepo`, our DevOps Assembly Lines are watching for changes (Job adds, edits or deleted) through source control webhooks. YML changes are automatically synced and they are reflected in the SPOG immediately

## Migrating a Job from one YML to another
There are some situations where you might need to reorganize where your Jobs are defined. If you delete and recreate, you will lose all the historical versions. If history is important, migration might be a better alternative

Here are the steps to migrate


## Deleting Jobs
Deleting Job is a 2 step process. Deleting from the YML causes it to be soft deleted and then you will have to manually delete it from SPOG view of the UI. The 2 step process is an insurance policy to prevent accidental deletes. Deleting a Job means all historical versions are deleted permanently and this can really mess up your DevOps Assembly Lines as it is a connected interdependent workflow.

Here are the steps to delete a Job

1. Delete the Job definition from the YML and commit the change to the repo. Automatic sync process will execute and mark the removed Job as soft deleted. All version data is still available and no data is lost at this stage. If any Jobs are still using this deleted Job and they are still active, those Jobs will be marked inconsistent and will not be triggered until fixed
1. Now log into your SPOG, make sure that you have not hidden deleted Job from your view. All the soft deleted Jobs will appear on the bottom of your SPOG. Right click on each of them and delete. If these Jobs are still being used, then delete option is not presented until you make sure there are no references to the soft deleted Job. Once you delete from the SPOG, all data is permanently destroyed


# Further Reading
* Working with Resources
* Working with Integrations
* Jobs
