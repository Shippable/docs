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

Jobs are defined in `shippable.yml` as shown below:

```
jobs:
  - name:               <string>
    type:               <job type name>
    dependencyMode:     <chrono/strict/immediate>
    steps:
      - IN:             <job>
      - IN:             <resource>
      - OUT:            <resource>
      - TASK:
        - script: 			<any shell command>
        - script: 			<any shell command>
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
- Replace any [templated values](/platform/tutorial/workflow/crud-resource/#templating-resources) in the `IN` resource details. 
- Execute all commands to perform the activity. The set of commands depends on [job type](#types).
- Update all `OUT` resources


Every time a job executes, a new immutable **version** is created. This makes it easy to 'replay' older job versions, though you should do this only after verifying that the old input values will not create problems in your Assembly Line.

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
