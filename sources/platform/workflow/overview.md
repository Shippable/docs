page_main_title: Workflow Overview
main_section: Platform
sub_section: Workflow
page_title: Workflow Overview
page_description: Overview of Workflows in Shippable

# Workflow Overview

Workflow makes it easy to connect your "Islands of Automation" into DevOps Assembly Lines across all environments, projects, and tools. A workflow is a dependency chart where upstream activities broadcast events and job state to downstream activities. This helps co-ordinate tasks centrally across diverse DevOps tools without custom DIY scripts. The platform also manages state and job output information across the workflow so that all dependent jobs can access the information they need in order to execute.  Workflows are authored through a simple declarative yml-based language.

With Workflow, both single step and multi-stage activities are repeatable, reliable, and gracefully handle errors in a stateful manner. Coupled with the ability to control workflows with approval gates and notifications, this helps you achieve truly frictionless CI/CD, i.e. the utopia of DevOps.

## A Simple Workflow

Your Workflow is a bunch of jobs (DevOps activities) that are triggered in sequence or in parallel, depending on how they are configured. A job can be triggered in multiple ways: when a preceding job finishes, when an input resource is updated by an upstream job, or manually.

<img src="/images/pipelines-structure.png" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;" alt="DevOps workflows">

Each of the jobs in your workflow accomplishes a specific task, such as running CI, deploying an application to an environment, provisioning infrastructure, building an AMI, creating or updating a release version, etc. Jobs and resources can connect to third party providers or services through [integrations](/platform/integration/overview/).

A glossary of terms is available [here](/platform/tutorial/glossary/).

## Elements of Workflow
At a very fundamental level, Workflow consists of 4 key elements.

<a name="resource"></a>
### Resources
[Resources](/platform/workflow/resource/overview/) are versioned objects that hold configuration and other information required to execute your DevOps activity. They are inputs for and sometimes outputs from jobs. Examples of resources include source code repositories, docker images, container clusters, and environment variables.

<a name="job"></a>
### Jobs
[Jobs](/platform/workflow/job/overview/) represent DevOps activities, i.e., executable units of your workflow. They take one or more resources as inputs, perform some operation on the inputs, and can output other resources. Jobs can also act as inputs for other jobs, which serves to daisy-chain a series of jobs into a connected workflow. For example, building an Amazon Machine Image using Packer or running CI on your source code.

<a name="state"></a>
### State

[State(ful) workflows](/platform/workflow/state/overview/) are designed to remember information from preceding activities and make it available to dependent activities. The State component is key to frictionless Continuous Delivery since it helps your fragmented DevOps toolchain exchange necessary information across tools without writing custom scripts. This built-in capability also helps avoid sharing this information through external spreadsheets, file storage, ticketing systems, Slack channels, etc.

<a name="trigger-modes"></a>
## Job triggering mechanisms

Once a job completes successfully or a resource is updated, all downstream jobs will be triggered. In some scenarios, you might want your downstream job to run immediately. In others, you might want it to wait until all of the processing upstream jobs are complete. This exact behavior can be controlled using the dependencyMode option. Specifying `dependencyMode` is optional. It defaults to `chrono`, but It can also be `immediate` or `strict`.

```
jobs:
  - name: <job-name>
    type: <job-type>
    dependencyMode: <chrono/immediate/strict>
    steps:
      - IN: <job-name>
      - IN: <job-name>
      - IN: <resource-name>
```

* **dependencyMode: chrono**

    This is the default dependencyMode. When an upstream job completes or resource is updated, this job will be triggered if all of its dependencies are consistent and in a successful state. However, the job won't run at the same time as any of its directly connected upstream or downstream jobs. Instead, the job will enter a 'queued' state. It will be picked up when its dependencies have stopped processing and when its chronological turn has arrived.

    Example:

    <img src="/images/platform/workflow/chrono-mode.png" alt="chrono-mode" style="width:100%;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

    In the above assembly line, `job-2` and `job-3` are triggered manually. Suppose `job-2` completes first. It will trigger `chrono-job-2` once but not `chrono-job-1`, since `job-1` is an inconsistent dependency. As `job-3` is still in processing state, `chrono-job-2` will remain in queued state until `job-3` is complete. Once `job-3` completes it will trigger `chrono-job-2` again. `chrono-job-2` will have 2 queued builds created for it. If `job-6` is in processing state, then `chrono-job-2` will also wait for that to complete and then both of its builds will go to processing state one by one.

* **dependencyMode: immediate**

    In this mode, jobs are triggered without waiting for any incomplete dependencies to reach a final state. Jobs will also be triggered even if IN resources are inconsistent. When a job completes or a resource is updated, all the consistent downstream jobs are triggered.

    Example:

    <img src="/images/platform/workflow/immediate-mode.png" alt="immediate-mode" style="width:100%;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

    In the above assembly line, `job-2` and `job-3` are triggered manually. Suppose `job-2` completes first. It will trigger both `immediate-job-2` and `immediate-job-1`, even though `job-1` is an inconsistent dependency for `immediate-job-1`. While `job-3` is still in processing state, `immediate-job-2` and `immediate-job-1` will immediately go to a processing state as well as long as there are available minions. This mode also disregards the state of downstream jobs, so if `job-6` and `job-5` are processing, `immediate-job-2` and `immediate-job-1` will still be triggered. Now, when job `job-3` completes, it will trigger `immediate-job-2` again and this build will go to processing state as soon as first build for `immediate-job-2` is complete.

* **dependencyMode: strict**

    In the `chrono` and `immediate` modes, dependent jobs end up running multiple times when more than one IN dependency completes. In strict mode, the goal is to only trigger the job once when all of the upstream dependencies have reached a final state. When a job completes or a resource is updated, all the consistent jobs which are using this resource/job as IN are evaluated, and the ones which have are consistent with no waiting or processing upstream dependencies are triggered. In this mode, we also check the status of jobs whose OUT resources are IN to the job. If there are processing or waiting upstream dependencies, `waiting jobs` are created, which will be resolved once all of the processing/waiting upstream dependencies have reached a final state.

    You can see the waiting jobs on dashboards' grid-view. In case your waiting job is not getting processed and all the IN jobs are in a final state then you can delete them.

    <img src="/images/platform/workflow/waiting-jobs.png" alt="waiting-jobs" style="width:100%;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

    Example:

    <img src="/images/platform/workflow/strict-mode.png" alt="strict-mode" style="width:100%;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>    

    In the above assembly line, `job-2` and `job-3` are triggered manually. Suppose `job-2` completes first. In this case, it will not trigger any subsequent job. It will not trigger `strict-job-2` since `job-3` is still running and it will not trigger `strict-job-1` since it has an inconsistent IN `job-1`. Instead, a waiting job is created for `strict-job-2`. Once `job-3` completes it will trigger `strict-job-2`. `strict-job-2` will then be removed from the waiting jobs list and move to a queued state even if `job-6` is processing. Once in a queued state, the job will be picked up to run as soon as minions are available. If `job-4` is in inconsistent or processing state, then `strict-job-2` will not be triggered.

You can also control which mode a job should follow once a particular IN job completes by specifying the dependencyMode at IN dependency level.

```
jobs:
  - name: strict-job
    type: runSh
    dependencyMode: strict
    steps:
      - IN: resource-1
      - IN: Job-1
        dependencyMode: immediate   
      - IN: job-2
      - TASK:
        - script: echo "do something";
```
Here, if `strict-job` is triggered by `job-1` then it'll follow `immediate` mode even though it has `strict` mode at job level. When triggered by resource `resource-1` or job `job-2`, it will follow `strict` mode.

## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [Quick Start to CD](/getting-started/cd-sample)
