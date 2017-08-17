page_main_title: rSync Job
main_section: Platform
sub_section: Workflow
sub_sub_section: Jobs
page_title: Shippable DevOps Assembly Lines - rSync
page_description: List of supported jobs
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc


# rSync

The `rSync` Job is created internally by Shippable when you add a [**syncRepo**](/platform/workflow/resource/syncrepo/). Whenever you make changes to your **syncRepo**, we automatically execute this job to synchronize your changes to your Assembly Lines. The name of the rSync job is a concatenation of the syncRepo's name and `_rSync`.

<a name="inconsistent"></a>
If your `rSync` job fails due to any reason, the affected [Resources](/platform/workflow/resource/overview) and [Jobs](/platform/workflow/job/overview) are marked inconsistent. They will no longer trigger until their definition in the rSync job is fixed. The main reasons why Resources and Jobs become inconsistent are:

*  Invalid integration name present in resource definitions
*  Invalid `IN` or `OUT` definition, in most cases typos
*  The dependent `Resource` or `Job` was removed making once valid object invalid
*  The integration it points to is no longer valid, maybe due to invalid credentials and the user who owns the credentials is no longer a member of the organization

In most cases, these can be resolved by updating the integrations or fixing the typos and rerunning `rSync` manually from the UI.

	<img src="/images/platform/jobs/rSync/rsync-job.png" alt="rSync job">

## Further Reading
* [Working with syncRepo](/platform/tutorial/workflow/howto-crud-syncrepo)
* [Jobs](/platform/workflow/job/overview)
* [Resource](/platform/workflow/resource/overview)
