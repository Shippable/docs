page_main_title: Working with Resources
main_section: Platform
sub_section: Tutorials
sub_sub_section: Workflow
page_title: DevOps Assembly Line Resources
page_description: How to add, delete and update resources
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# Working with Resources
Shippable DevOps Platform leverages a declarative syntax for CRUD operations on [Resources](/platform/workflow/resource/overview). A YML `shippable.resources.yml` config file is used to define them. It is added to your the root of your source code repo just like any other piece of code and the platform recognizes the changes you make to it through webhooks and sync the definitions.

<a name="adding"></a>
## Adding Resources
Resources are defined in a configuration file `shippable.resources.yml` and this file is added to the root of a source control repository. All user permissions that users have on the repo is carried over to the objects defined in the YML. For example, if user 1 has read access he/she will only have read access to Resources defined in the repo.

Once the Resources are defined and added to the repo, you will have to connect it to SPOG by creating a `syncRepo` using the UI. Detailed step by step instructions are [here ](/platform/workflow/resource/syncrepo).

After adding a `syncRepo`, our DevOps Assembly Lines are watching for changes (Resource adds, edits or deleted) through source control webhooks. YML changes are automatically synced and they are reflected in the SPOG immediately.

## Migrating a Resource from one YML to another
There are some situations where you might need to reorganize where your Resources are defined. If you delete and recreate, you will lose all the historical versions. If history is important, migration might be a better alternative.

Here are the steps to migrate -

1. Goto the SPOG page and pause the rSync job for the source repository from where you want to migrate resources, jobs or triggers. Steps for pausing the rSync jobs can be found [here](/platform//tutorial/workflow/crud-job#pausing-jobs).

2. Add the resources you want to migrate to the destination repository's yml files.

3. Run the rSync job of the destination repository. Once the rSync job completes, migration will be complete. Your SPOG will however not change as no dependency has changed. Therefore, to verify this you can check the logs of the rSync job.
<img src="/images/pipelines/migrationConsoleLog.png" alt="See the version list of your resource from the SPOG view" style="width:800px;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

4. From the source repository, delete all the migrated resources. This will automatically trigger the rSync job and it should succeed.
<img src="/images/pipelines/resumeJob.png" alt="See the version list of your resource from the SPOG view" style="width:800px;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

5. Now, your resources are migrated to the destination repository. You can add, remove or update them there.

## Deleting Resources
Deleting Resources is a 2 step process. Deleting from the YML causes it to be soft deleted and then you will have to manually delete it from SPOG view of the UI. The 2 step process is an insurance policy to prevent accidental deletes. Deleting a Resource means all historical versions are deleted permanently and this can really mess up your DevOps Assembly Lines as it is a connected interdependent workflow.

Here are the steps to delete a Resource

1. Delete the Resource definition from the YML and commit the change to the repo. Automatic sync process will execute and mark the removed Resource as soft deleted. All version data is still available and no data is lost at this stage. If any Jobs are still using this deleted Resource and they are still active, those Jobs will be marked inconsistent and will not be triggered until fixed
1. Now log into your SPOG, make sure that you have not hidden deleted Objects from your view. All the soft deleted Resources will appear on the bottom of your SPOG. Right click on each of them and delete. If these Resources are still being used, then delete option is not presented until you make sure there are no references to the soft deleted Resource. Once you delete from the SPOG, all data is permanently destroyed

## Deleting all resources at the same time
If you right click on the `syncRepo` resource you added to create the assembly lines and delete it from the UI, all the resources defined in the YML file will all be marked soft-deleted along with the syncRepo resource. Now hard delete the syncRepo resource as any other resource, Shippable will delete all the resources automatically now. Only the syncRepo resource can be soft-deleted from the UI. All other resources needs to be managed from the YML.

## Further Reading
* [Jobs](/platform/workflow/job/overview)
* [Integrations](/platform/workflow/integration/overview)
