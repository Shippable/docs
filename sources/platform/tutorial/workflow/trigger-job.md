page_main_title: Testing Assembly Line config
main_section: Platform
sub_section: Workflow
sub_sub_section: Tutorials

# Triggering jobs

Jobs in your workflow can be triggered in multiple ways, both automatically and manually.

As an example, consider the configuration below for the job **Job-4**:

<img src="/images/platform/jobs/jobTriggers.png" alt="How are DevOps activities triggered?" style="width:600px;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

In this configuration, Job-4 will be triggered in one of 4 ways:

* An upstream job in the Assembly Line changes an `IN` resource, i.e. **Job-4** will be triggered every time **Job-3** updates **resource-2**.
* An `IN` job successfully completes execution, i.e. **Job-4** will be triggered every time **Job-2** succeeds. A couple of exceptions to this rule are:
    * If any Jobs defined as `IN`s are currently processing, have queued builds or are in a failed state. So in the example above, if **Job-1** is in failed state or is queued, **Job-4** will not trigger even when **Job-2** completes successfully.
    * If the Job is in [inconsistent](/platform/workflow/job/rsync) state due to dependency failures. Inconsistent jobs are marked with a pink background color.
* You commit to a `trigger` resource that is an `IN` for the job, i.e. **trigger-1** in this example
* Manual trigger: You right click on **Job-4** in the SPOG UI and click on **Play** icon, or click on the **Play** button on the job page.

**Job-1** will not trigger **Job-4** automatically since the dotted line between them indicates that automatic trigger has been [switched off](/platform/tutorial/workflow/crud-job/#switch-off). A dark gray border will appear on **Job-4** after **Job-1** runs until **Job-4** is next triggered.

**Please note that changing some resources like cluster, replicas, or dockerOptions manually through a yml commit will not automatically trigger a job.** This behavior is meant to prevent unexpected pipeline behavior, since a single commit can contains changes to several resources and cause several trigger points in the pipeline. If you want your job to be triggered when resources are manually edited in the yml, you can add a trigger input for the job and include a change to the trigger resource in the commit every time you want to automatically run your job.
