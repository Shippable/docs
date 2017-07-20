page_main_title: Overview
main_section: Platform
sub_section: Jobs
page_title: Unified Pipeline Jobs
page_description: List of supported jobs
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# Jobs
Jobs are the executable units of your pipelines. They take one or more [resources](resources-overview/) as inputs, perform some operation on the inputs, and can output to other resources. Jobs can also act as inputs for other jobs, which serves to daisy-chain a series of jobs into a pipeline.

<img src="/images/platform/jobs/jobWorkflow.png" alt="Connecting jobs into a pipeline" style="width:1000px;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

Shippable supports jobs in two ways - **managed** and **unmanaged**.

**Managed jobs** are available to use as-is and do not need additional scripting to perform the intended operation. With a few parameters specified declaratively in a yml block, Shippable will perform a set of standard use case actions automatically.

**Unmanaged jobs** are available for you to provide you complete flexibility to do pretty much anything you need by configuring the job with custom shell scripts. These jobs can take any supported resource as an input and can output to any resource depending on your configuration.

We currently support the following jobs:

**Managed**

- [deploy](job-deploy/): This managed job type is used to for deploying your application or service to any supported Container Service, including Amazon Elastic Compute Service (ECS), Google Container Engine (GKE), Joyent Triton, Azure Container Service (ACS), Docker Cloud and Docker Data Center.

- [manifest](job-manifest/): This managed job type is used for creating and versioning an application or service definition. Your service definition consists of one or more Docker images, options you want to run your containers with, and environment parameters.

- [provision](job-provision/): This managed job type is used to create objects on a supported Container Service.

- [release](job-release/): This managed job type is used to perform release management. You can apply semantic versioning to your services or entire application at any stage of your pipeline.

- [jenkinsJob](job-jenkinsJob/): This managed job type allows you to connect an existing Jenkins job to your Shippable pipeline.

**Unmanaged**

- [runCI](job-runci/): This unmanaged job is used to connect Shippable CI to the rest of your pipeline.

- [runSh](job-runsh/): This is an unmanaged job that can be configured to do almost anything with custom shell scripts.

- [runCLI](job-runcli/): This unmanaged job is like runSh, but with the addition of automatically configured CLI tools.


Jobs, [resources](resources-overview/), and triggers together can be used to model any deployment pipeline, regardless of the complexity of your application.

## Adding Jobs
Jobs are defined in a configuration file `shippable.jobs.yml` present in a source control repository. Any repo can contain this file but only one of it can be used. If more than 1 job files are present in the repository, the first one is used. This is done in order to reduce conflict due to the same job being defined in multiple places.

To learn how to add this file and connect it to pipelines, [click here](/tutorials/pipelines/howToAddSyncRepos/)

## Deleting Jobs
Since pipelines are all about dependencies and deployable units are flowing through these pipelines at all times, deleting a job can significantly alter or irreversibly change the pipeline in unexpected ways. To avoid accidental deletion of job(s) in ymls, we have made deletion of job a 2 step process.

First, you need to soft-delete a job by removing it from your `shippable.jobs.yml` file. This removes it from the pipeline, but does not remove it from the database. You can see a list of soft-deleted jobs at the bottom of the `Jobs` tab. If soft-deleted jobs are added back to the jobs yml, the system will undelete them and you will retain version history for the undeleted jobs.

To completely remove a job from the system, you need to hard delete it through the UI. To do this:

* Go to your Subscription page and click on the `Pipelines` tab
* You will find a list of soft deleted jobs at the bottom of your SPOG. To hard delete, just right click on the job and click `Delete`.

A job must be soft deleted before it can be hard deleted.

## Anatomy of a Job YML
Jobs are defined through the YML and they all follow a similar format irrespective of the type of job.

```
jobs:
  - name: <string>
    type: manifest | deploy | release | runSh
    steps:
      - IN: <resource>
      - IN: <resource>

```
This a very simple job which needs 2 INput resources to perform whatever that job is designed to do.


* `name` should be an easy to remember text string. This will appear in the visualization of this job in the SPOG view and in the list of jobs in the Pipelines `Resources` tab.

* `type` is always set to type of job - manifest, deploy, release, runSh, provision, runCLI, or jenkinsJob.

* `steps` is an array of instructions consisting of `IN`, `OUT` & `TASK` objects.

	* `IN` is the name of the resource or job that is an input, i.e. information from the resource or job is required to run this job.

	* `OUT` is the name of the resource which is output from this job. Only certain job types support `OUT`: runSh, runCI, and runCLI.

	* `TASK` is an operation that is executed as part of this job. For runSh and runCLI jobs, these can be custom shell scripts. For other job types, specific configs are done through the TASK section.

For a detailed explanation of the yml for each job type, visit the page for that specific job.

## Triggering jobs

Jobs can be triggered in multiple ways, including both automated and manual triggers. For example, consider the configuration below for Job-3:

<img src="/images/platform/jobs/jobTrigger.png" alt="Connecting jobs into a pipeline" style="width:600px;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>


In this configuration, Job-3 will be triggered in one of 4 ways:

1. Job-1, which is an `IN` for Job-3 finishes running and triggers Job-3. This trigger can be [switched off](#switchOff) if needed.
- Job-2 changes resource-2, which is an `IN` for Job-3 , and hence triggers Job-3. This trigger can be [switched off](#switchOff) if needed.
- User commits to the [trigger resource](/platform/shippable-triggers-yml/), which is an `IN` for Job-3 , and hence triggers Job-3.
- User right clicks on Job-3 in the SPOG UI and clicks on `Run` or selects `Run` for Job-3 in the Jobs list on the Jobs tab.

**Please note that changing resource-1 or resource-2 manually through a yml commit will not automatically trigger Job-3.** This behavior is meant to prevent unexpected pipeline behavior, since a single commit can contains changes to several resources and cause several trigger points in the pipeline. If you want your job to be triggered when resources are manually edited in the yml, you can add a `trigger` input for the job and include a change to the trigger resource in the commit every time you want to automaticallly run your job.

<a name="switchOff"></a>
###Switching triggers off
You can switch off a job being triggered automatically in situations (1) and (2) as described in the section above.

```
jobs:
  - name: Job-3
    type: release
    steps:
      - IN: resource-2
        switch: off
      - IN: Job-1
        switch: off
```

As shown above, the `switch: off` tag can be defined for IN resources or jobs in order to turn off automatic triggering of a job when the inputs change. Note that these switches are specific to the input and should be set accordingly for each input.

## Pausing jobs

You can pause any jobs in your pipeline by right-clicking on the job, and clicking `Pause Jobs`. Paused jobs are never triggered automatically, irrespective of yml configuration. You can unpause a paused job to resume any automatic triggers.

## Pinning specific resource versions
By default, Shippable uses information from the most recent or latest version of an `IN` input when running a job. However, you might want to 'pin' a specific version of an input for some reason.

You can pin a specific input version with the yml below:

```
jobs:
  - name: job_name
    type: job_type
    steps:
      - IN: resource-1
        versionName: "user friendly version e.g tag or commitSha"
      - IN: resource-2
        versionNumber: "shippable's internal version number"
```

You can use `versionName` to pin `gitRepo` and `image` resources. The versionName contains:

* gitRepo: commit SHA
* image: tag


You can use `versionNumber`, Shippable's internal incremental numbering system, to pin the following resources:

* dockerOptions
* params
* replicas

##Viewing job console output

Just like resources, Jobs are also versioned on Shippable. Every run of a job creates a new version of the job, including a unique build object which stores the console output of the Job run.

You can view console output for a job by clicking on it in the SPOG view. The job console looks like this:

<img src="../../images/platform/jobs/jobModal.png" alt="Console output and trace, properties, run, and pause buttons for a job" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

Please note that in most cases, the logs you are interested in will be under the **Executing Task -> /home/shippable/micro/nod/stepExec/managed/run.sh** section. This section is shown as expanded in the screenshot above.

In addition to viewing logs for the latest run, you can also view logs for historical runs by choosing a past run in the UI.

<a name="jobNotifications"></a>
## Sending job status notifications

You can send notifications about job status by adding the `on_start`, `on_success`, `on_failure`, or `on_cancel` tags to any job of any type.

You will first need to define a [notification resource](/pipelines/resources/notification/) in your `shippable.resources.yml`.

Then, you can use that resource in your `shippable.jobs.yml` to configure when notifications are sent:

```
  - name: jobName
    type: jobType
    on_start:
      - NOTIFY: <notification resource name>
    on_success:
      - NOTIFY: <notification resource name>
    on_failure:
      - NOTIFY: <notification resource name>
    on_cancel:
      - NOTIFY: <notification resource name>
    always:
      - NOTIFY: <notification resource name>
```

* `on_start` specifies that notifications are sent when the job starts.
* `on_success` specifies that notifications are sent when the job completes successfully.
* `on_failure` specifies that notifications are sent when the job fails.
* `on_cancel` specifies that notifications are sent when the job is canceled.
* `always` specifies that notifications are sent when the job succeeds, fails, errors, or is canceled.
