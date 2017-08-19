page_main_title: Working with Triggers
main_section: Platform
sub_section: Tutorials
sub_sub_section: Workflow
page_title: DevOps Assembly Line Triggers
page_description: How to add, delete and update triggers
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# Working with Triggers

[Triggers](/platform/workflow/trigger/overview/) are used to manually start a job. They are very similar to resources, the only difference being that updating a resource in the YML will not start the dependent job(s), but a updating a trigger will.

A YML config file `shippable.triggers.yml` is used to define triggers. Anatomy of the yml is here: [Anatomy of triggers yml](/platform/tutorial/workflow/shippable-triggers-yml/)

This file should be committed to source control in the [Sync Repository](/platform/tutorial/workflow/crud-syncrepo/), along with `shippable.resources.yml` and `shippable.jobs.yml`.

<a name="adding"></a>
## Adding Triggers

[Adding a Sync Repository](/platform/tutorial/workflow/crud-syncrepo/) to your Shippable subscription will automatically add all triggers defined in the `shippable.triggers.yml` in that repository. User permissions on the repo are carried over to the objects defined in the YML. For example, if a user has read access, he/she will only have read access to Triggers defined in the repo.

After adding the Sync Repository, your DevOps Assembly Lines will watch for changes (added, edited or deleted triggers) through source control webhooks. YML changes are automatically synced and immediately reflected in the [SPOG](/platform/visibility/single-pane-of-glass-spog/).

## Migrating a Trigger from one YML to another
There are some situations where you might need to reorganize where your Triggers are defined. If you delete and recreate, you will lose all the historical versions. If history is important, migration might be a better alternative.

Here are the steps to migrate -

1. Go to the [SPOG page](/platform/visibility/single-pane-of-glass-spog/) and [pause the rSync job](/platform//tutorial/workflow/crud-job#pausing-jobs) for the source repository from where you want to migrate resources, jobs or triggers.

2. Add the Triggers you want to migrate to the destination repository's yml files.

3. Run the [`rSync`](/platform/workflow/job/rsync/) job of the destination repository. Once the rSync job completes, migration will be complete. Your SPOG will however not change as no dependency has changed. Therefore, to verify this you can check the logs of the rSync job.
<img src="/images/pipelines/migrationConsoleLog.png" alt="See the version list of your resource from the SPOG view" style="width:800px;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

4. From the source repository, delete all the migrated triggers. This will automatically trigger the rSync job and it should succeed.
<img src="/images/pipelines/resumeJob.png" alt="See the version list of your resource from the SPOG view" style="width:800px;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

5. Now, your triggers are migrated to the destination repository. You can add, remove or update them there.

## Deleting Triggers

Deleting Triggers is a two step process. Deleting from the YML causes it to be soft deleted and then you will have to manually delete it from SPOG view of the UI. The two-step process is an insurance policy to prevent accidental deletes. Deleting a Trigger means all historical versions are deleted permanently and this can really mess up your DevOps Assembly Lines as it is a connected inter-dependent workflow.

Here are the steps to delete a Trigger:

1. Delete the Trigger definition from the YML and commit the change to the repo. Your rSync job will execute automatically and mark the removed Trigger as soft deleted. All version data is still available and no data is lost at this stage. If any Jobs are still using this deleted Trigger and they are still active, those Jobs will be marked inconsistent and will not be triggered until fixed.

1. Now go to your [SPOG page](/platform/visibility/single-pane-of-glass-spog/), make sure that you have not [hidden deleted Objects from your view](/platform/visibility/single-pane-of-glass-spog/#view-orphaned-and-soft-deleted-resources). All the soft deleted Trigger will appear on the bottom of your SPOG. Right click on each of them and delete. If these Triggers are still being used, then delete option is not presented until you make sure there are no references to the soft deleted Trigger. Once you delete from the SPOG, all version information is permanently destroyed.

### Deleting all Triggers at the same time

If you right click on the `syncRepo` resource you added to create the Assembly Lines and delete it from the UI, all Triggers defined in the `shippable.triggers.yml` file in that repository will all be marked soft-deleted along with the `syncRepo` resource. Now, hard delete the `syncRepo` resource as any other resource. All triggers will be deleted automatically now.

**Please note that this will also delete all jobs and resources defined through that Sync repository.**

## Further Reading
* [Anatomy of shippable.triggers.yml](/platform/tutorial/workflow/shippable-triggers-yml/)
* [Sync repository](/platform/workflow/resource/syncrepo/)
* [rSync job](/platform/workflow/job/rsync/)
* [Jobs](/platform/workflow/job/overview)
* [Integrations](/platform/workflow/integration/overview)
