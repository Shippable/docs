page_main_title: rSync Job
main_section: Platform
sub_section: Workflow
sub_sub_section: Jobs
page_title: Shippable DevOps Assembly Lines - rSync
page_description: List of supported jobs
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc


# rSync

`rSync` is a job that is created internally by shippable when you add a [syncRepo](/platform/workflow/resource/syncrepo/). Whenever you make changes to your `syncRepo`, we automatically execute this job to synchronize your changes to DevOps Assembly Lines. The name of the rSync job is the syncRepo's name + `_rSync`.

When an `rSync` job runs, it evaluates the entire collection of [resources](/platform/workflow/resource/overview) and [jobs](/platform/workflow/job/overview) in the subscription.  It figures out which items have changed based on the commit that triggered its execution, and then decides if it can successfully make the updates or not.  If there is any item that cannot be updated, or is missing critical information, the `rSync` job will be marked as failing, and logs will be printed showing the reason for failure.  In most cases, resources that cannot pass rSync's check are marked as `inconsistent`.  This means that any jobs attempting to utilize those resources will be skipped.  Resources can be marked inconsistent for one or more of the following reasons:

  *  Invalid integration name present in resource definitions.
  *  Invalid `IN` or `OUT` definition (referencing a resource that doesn't exist, often occurs due to a typo in resource name).
  *  The dependent `resource` or `job` was removed making the once-valid object invalid.
  *  The integration it points to is no longer valid, maybe due to invalid credentials, or the user who owns the credentials is no longer a member of the organization

In most cases, these can be resolved by updating the integrations, or fixing the typos and re-running `rSync` manually from the UI
	<img src="/images/platform/jobs/rSync/rsync-job.png" alt="rSync job">

## Further Reading
* [Working with syncRepo](/platform/tutorial/workflow/crud-syncrepo)
* [jobs](/platform/workflow/job/overview)
* [resources](/platform/workflow/resource/overview)
