page_main_title: Working with Resources
main_section: Platform
sub_section: Tutorials
sub_sub_section: Workflow
page_title: DevOps Assembly Line Resources
page_description: How to add, delete and update resources
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# Working with Resources

[Resources](/platform/workflow/resource/overview/) are the basic building blocks of your pipelines. They typically contain information needed for [jobs](/platform/workflow/job/overview/) to execute and sometimes they also are used to store information produced by a job.

Resources are defined in a yml-based `shippable.yml` configuration file that is committed to source control in your [sync repository](/platform/workflow/resource/syncrepo/).

<a name="adding"></a>
## Adding Resources
Resources are defined in a configuration file, `shippable.yml`, and this file is added to a source control repository, which we call your [sync repository](/platform/workflow/resource/syncrepo). All user permissions that users have on the repo is carried over to the objects defined in the YML. For example, if user 1 has read access he/she will only have read access to resources defined in the repo.

Once `shippable.yml` is committed to a repository, you will have to add the repository to Shippable through the UI. Detailed step by step instructions are [here ](/platform/tutorial/workflow/crud-syncrepo/#adding-a-syncrepo).

Once your sync repository is added, the platform watches for changes (job additions, edits or deletes) through source control webhooks. YML changes are automatically synced and they are reflected in the SPOG immediately.

<a name="viewing"></a>
## Viewing resource information

You can see what's included in each resource version through the Shippable UI.

* Navigate to the [Subscription dashboard](/platform/visibility/subscription/dashboard/) and scroll down to view the list of Resources in Grid View
* Search for your resource and click on it. This will show you a historical list of all resource versions with additional information.

<a name="templating"></a>
## Templating Resources

Instead of providing exact details for your resource in your `shippable.yml` file, you can instead use shell notation to "template" your resources.  For example:

```
- name: kube-prod
  type: cluster
  pointer:
    sourceName: "prod-cluster"
    region: "us-central1-f"
    namespace: "${NAMESPACE}"
```

When you use this resource in a job, Shippable will automatically attempt to fill in your placeholder with a value from the environment.  These environment values can be set and controlled using a [params resource](/platform/workflow/resource/params/#resource-templating).  This allows you to reuse the same resource across multiple environments with attributes specific to each environment.  The params resource is not required.  By default, Shippable adds [environment variables](/platform/workflow/job/runsh/#default-environment-variables) based on the current job and its inputs.  As long as you know the name of the environment variable, you can use it in your templating.

The pool of available variables is based on the job and any resources included as `IN` steps before the templated resource.  If the variable is not present in the environment when the templated resouce is processed, the placeholder will be replaced with emptiness.

**Note**:  Templating a `params` resource is not supported.  Any placeholders in a `params` resource will not be replaced.

<a name="deleting"></a>
## Deleting Resources
Deleting Resources is a 2 step process. Deleting from the YML causes it to be soft deleted and then you will have to manually delete it from SPOG view of the UI. The 2 step process is an insurance policy to prevent accidental deletes. Deleting a Resource means all historical versions are deleted permanently and this can really mess up your DevOps Assembly Lines as it is a connected interdependent workflow.

Here are the steps to delete a Resource

1. Delete the Resource definition from the YML and commit the change to the repo. Automatic sync process will execute and mark the removed Resource as soft deleted. All version data is still available and no data is lost at this stage. If any Jobs are still using this deleted Resource and they are still active, those Jobs will be marked inconsistent and will not be triggered until fixed
1. Now log into your SPOG, make sure that you have not hidden deleted Objects from your view. All the soft deleted Resources will appear on the bottom of your SPOG. Right click on each of them and delete. If these Resources are still being used, then delete option is not presented until you make sure there are no references to the soft deleted Resource. Once you delete from the SPOG, all data is permanently destroyed

### Deleting all resources at the same time
If you right click on the `syncRepo` resource you added to create the assembly lines and delete it from the UI, all the resources defined in the YML file will all be marked soft-deleted along with the syncRepo resource. Now hard delete the syncRepo resource as any other resource, Shippable will delete all the resources automatically now. Only the syncRepo resource can be soft-deleted from the UI. All other resources needs to be managed from the YML.

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

## Further Reading
* [Jobs](/platform/workflow/job/overview)
* [Integrations](/platform/integration/overview)
