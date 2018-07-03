page_main_title: Moving jobs and resources to a different config file
main_section: Platform
sub_section: Tutorials
sub_sub_section: Workflow

# Moving Assembly Line jobs/resources to a different repository

Shippable's Assembly Line definitions for `job` and `resource` sections are global across a Subscription (i.e. GitHub organization or Bitbucket team), so you can move some jobs and resources to a different repository if needed. Typically, you'd do this because you want to change the way config files are organized, such as consolidating multiple config files into a single **shippable.yml**, or breaking up your config across several repositories to better manage permissions.

The following steps will help you move jobs or resources between repositories without affecting your workflow:

1. [Pause the `rSync` job](/platform/tutorial/workflow/crud-job/#pausing-jobs) for the source repository from where you want to migrate resources, jobs, or triggers.

2. Add the resources, jobs or triggers you want to migrate to the destination repository's **shippable.yml**.

3. If you have added the destination repository's config as an Assembly Line, go to the next step. Otherwise, add the destination repository [as a Sync repository](/platform/tutorial/workflow/crud-syncrepo/#adding-a-syncrepo) so that Shippable can parse the Assembly Line config.      

4. Commit the changes to **shippable.yml** to the destination repository. This will run the `rSync` job of the destination repository. If the job completes successfully, the jobs and resources you moved are now read from the destination repository. Your SPOG view will not change as no dependency has changed. To verify this you can view logs of the rSync job.
<img src="/images/pipelines/migrationConsoleLog.png" alt="See the version list of your resource from the SPOG view" style="width:800px;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

4. From the source repository, delete all migrated resources and jobs and commit your config. This will automatically trigger the `rSync` job and it should succeed.
<img src="/images/pipelines/resumeJob.png" alt="See the version list of your resource from the SPOG view" style="width:800px;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

5. Your resources and jobs have been moved to the destination repository. You can add, remove or update them there.

**NOTE:** While moving a job you should copy it exactly as it is in the source repository. You can add or remove dependencies only once the resource is successfully migrated to destination repository.
