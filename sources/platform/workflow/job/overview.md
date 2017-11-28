page_main_title: Overview
main_section: Platform
sub_section: Workflow
sub_sub_section: Jobs
page_title: Unified Pipeline Jobs
page_description: List of supported DevOps activities
page_keywords: DevOps, Continuous Delivery, microservices, Continuous Integration, Continuous Deployment, CI/CD

# Jobs

Jobs are the executable units of your pipelines that can execute any DevOps activity. A simple way to think of it is, if something can execute in the shell of your laptop, it can execute as a Job.

Jobs take Inputs in the form of [Resources](/platform/workflow/resource/overview), execute tasks that perform the operations necessary and then produce a result i.e. Output(s). Now these Outputs can become Inputs to other jobs and so on forming a dependency-based, event-driven DevOps Assembly Line.

Please note that each job runs on a separate node, but can [share information with other jobs](/platform/workflow/state/overview/).

<img src="/images/platform/jobs/jobWorkflow.png" alt="Connecting jobs into a DevOps Assembly Line" style="width:1000px;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

Typical examples of jobs are:

* Execute Continuous Integration (CI) on a repository
* Build, Test and Push Docker images to registries like Docker Hub. Quay, JFrog etc.
* Build deployable machine images with tools like Packer
* Provisioning infrastructure using various automation tools like Ansible, Terraform, Chef, Puppet, etc.
* Deploy applications to Container Orchestration Services like Kubernetes, Amazon ECS, Google Container Engine, Azure Container Service,
* Deploy an application version to a VM cluster
* Execute a functional/integration test suite
* Create immutable service definitions so that applications can roll-forward and roll-back
* Deploy applications with Continuous Deployment(CD) tools like Capistrano, Distelli, Ansible etc.
* Implementing deployment strategies like Blue/Green, Upgrades and Replace
* Perform timely backups of DB, key-value stores etc.
* Create or update an application release version

## YML Definition

Jobs are defined in the `shippable.yml` config file with the syntax below. Please note that this is the complete syntax and an actual job definition is much smaller than shown here.

```
jobs:
  - name: 					<string>
    type: 					<job type name>
    triggerMode: 		    <parallel/serial; only for runSh jobs>
    dependencyMode:         <chrono, strict or immediate>
    on_start:
      - NOTIFY: 			<notification resource name>
    steps:
      - IN: 				<resource>
        switch: 			off
      - IN: 				<job>
      - IN: 				<resource>
        dependencyMode:     <chrono, strict or immediate; to override dependencyMode at job level>
      - IN: 				<job>
        dependencyMode:     <chrono, strict or immediate; to override dependencyMode at job level>
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

For more information, read the [jobs section of the anatomy of shippable.yml](/platform/tutorial/workflow/shippable-yml/#jobs) page.

## When does a Job execute?

Jobs can be triggered in multiple ways, including both automated and manual triggers. For example, consider the configuration below for my-deploy:

<img src="/images/platform/jobs/jobTriggers.png" alt="How are DevOps activities triggered?" style="width:600px;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

In this configuration, Job-4 will be triggered in one of 4 ways:

* A previous job in the Assembly Line changes an `IN` resource, i.e. **Job-4** will be triggered every time **Job-3** updates **resource-2**.
* An `IN` job successfully completed execution, i.e. **Job-4** will be triggered every time **Job-2** succeeds. A couple of exceptions to this rule are:
    * If any Jobs defined as `IN`s are currently processing, have queued builds or are in a failed state. So in the example above, if Job-1 is in failed state or is queued, **Job-4** will not trigger even when **Job-2** completes successfully.
    * If the Job is in [inconsistent](/platform/workflow/job/rsync) state due to dependency failures
* You commit to a trigger that is an `IN` for the job, i.e. **trigger-1** in this example
* Manual trigger: You right click on **Job-4** in the SPOG UI and click on Run or Select Run for **Job-4** in the Jobs list in the Grid view.

**Job-1** will not trigger **Job-4** automatically since the dotted line between them indicates that automatic trigger has been [switched off](/platform/tutorial/workflow/crud-job/#switch-off).

**Please note that changing some resources like cluster, replicas, or dockerOptions manually through a yml commit will not automatically trigger a job.** This behavior is meant to prevent unexpected pipeline behavior, since a single commit can contains changes to several resources and cause several trigger points in the pipeline. If you want your job to be triggered when resources are manually edited in the yml, you can add a trigger input for the job and include a change to the trigger resource in the commit every time you want to automatically run your job.

## What happens when a Job executes?

When triggered, a Job does the following:

- Get the latest versions of `IN` resources or latest state information from an `IN` job. If an input resource version is [**pinned**](/platform/tutorial/workflow/crud-job/#pinning-specific-resource-versions), then use that version instead of latest.
- Execute all commands to perform the activity. The set of commands depends on [job type](#types).
- Update all `OUT` resources


Every time a job executes, a new immutable **version** is created. This makes it easy to 'replay' older job versions, though you should do this only after verifying that the old input values will not create problems in your Assembly Line.

<a name="trigger-modes"></a>
## Job triggering modes

Once a job completes successfully or a resource is updated, all downstream jobs will be triggered. In some scenarios, you might want your downstream job to run immediately. In others, you might want it to wait until all of the processing upstream jobs are complete. This exact behavior can be controlled using the dependencyMode option. Specifying `dependencyMode` is optional. It defaults to `chrono`, but It can also be `immediate` or `strict`.

<img src="/images/platform/jobs/dependencyMode.png" alt="How are DevOps activities triggered?" style="width:100%;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

* **dependencyMode: chrono**

    This is the default dependencyMode. When an upstream job completes or resource is updated, this job will be triggered if all of its dependencies are consistent and in a successful state. However, the job won't run at the same time as any of its directly connected upstream or downstream jobs. Instead, the job will enter a 'queued' state. It will be picked up when its dependencies have stopped processing and when its chronological turn has arrived.

    Example:

    In the above assembly line, `job-2` and `job-3` are triggered manually. Suppose `job-2` completes first. It will trigger `job-5` once but not `job-4`, since `job-1` is an inconsistent dependency. As `job-3` is still in processing state, `job-5` will remain in queued state until `job-3` is complete. Once `job-3` completes it will trigger `job-5` again. `job-5` will have 2 queued builds created for it. If `job-7` is in processing state, then `job-5` will also wait for that to complete and then both of its builds will go to processing state one by one.

* **dependencyMode: immediate**

    In this mode, jobs are triggered without waiting for any incomplete dependencies to reach a final state. Jobs will also be triggered even if IN resources are inconsistent. When a job completes or a resource is updated, all the consistent downstream jobs are triggered.

    Example:

    In the above assembly line, `job-2` and `job-3` are triggered manually. Suppose `job-2` completes first. It will trigger both `job-5` and `job-4`, even though `job-1` is an inconsistent dependency for `job-4`. While `job-3` is still in processing state, `job-5` and `job-4` will immediately go to a processing state as well as long as there are available minions. This mode also disregards the state of downstream jobs, so if `job-7` and `job-6` are processing, `job-4` and `job-5` will still be triggered. Now, when job `job-3` completes, it will trigger `job-5` again and this build will go to processing state as soon as first build for `job-5` is complete.

* **dependencyMode: strict**

    In the `chrono` and `immediate` modes, dependent jobs end up running multiple times when more than one IN dependency completes. In strict mode, the goal is to only trigger the job once when all of the upstream dependencies have reached a final state. When a job completes or a resource is updated, all the consistent jobs which are using this resource/job as IN are evaluated, and the ones which have are consistent with no waiting or processing upstream dependencies are triggered. If there are processing or waiting upstream dependencies, `waiting jobs` are created, which will be resolved once all of the processing/waiting upstream dependencies have reached a final state.

    You can see the waiting jobs on dashboards' grid-view. In case your waiting job is not getting processed and all the IN jobs are in a final state then you can delete them.

    <img src="/images/platform/jobs/waiting-jobs.png" alt="How are DevOps activities triggered?" style="width:100%;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

    Example:

    In the above assembly line, `job-2` and `job-3` are triggered manually. Suppose `job-2` completes first. In this case, it will not trigger any subsequent job. It will not trigger `job-5` since `job-3` is still running and it will not trigger `job-4` since it has an inconsistent IN `job-1`. Instead, a waiting job is created for `job-5`. Once `job-3` completes it will trigger `job-5`. `job-5` will then be removed from the waiting jobs list and move to a queued state even if `job-7` is processing. Once in a queued state, the job will be picked up to run as soon as minions are available.

You can also control which mode a job should follow once a particular IN job completes by specifying the dependencyMode at IN dependency level.

```
jobs:
  - name: job-5
    type: runSh
    dependencyMode: strict
    steps:
      - IN: resource-1
      - IN: job-2
        dependencyMode: immediate   
      - IN: job-3
      - TASK:
        - script: echo "do something";
```
Here, if `job-5` is triggered by `job-2` then it'll follow `immediate` mode even though it has `strict` mode at job level. When triggered by resource `resource-1` or job `job-3`, it will follow `strict` mode.

<a name="types"></a>
## Supported job types
Shippable supports the following jobs types:

| Job Type   |      Description    |
|----------|-------------|
| [deploy](/platform/workflow/job/deploy/) | Deploy apps/services to Container Platforms or VM clusters |
| [manifest](/platform/workflow/job/manifest/) | Create App/Service definition (configuration) that is immutable |
| [provision](/platform/workflow/job/provision/) | Provision specific resources needed by Container Orchestration Platforms |
| [release](/platform/workflow/job/release/) | Release management for Apps/Services |
| [runCI](/platform/workflow/job/runci/) | Execute Shippable CI Job |
| [runSh](/platform/workflow/job/runsh/) | Execute any Shell command or scripts or supported Command Line Interface commands |

If you need a job that is not listed above, send us an email at [support@shippable.com](mailto:support@shippable.com)

## Further Reading
* [Anatomy of shippable.yml](/platform/tutorial/workflow/shippable-yml/)
* [Working with jobs](/platform/tutorial/workflow/crud-job/)
