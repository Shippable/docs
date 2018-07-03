page_main_title: Working with Jobs
main_section: Platform
sub_section: Tutorials
sub_sub_section: Workflow
page_title: DevOps Assembly Line Jobs
page_description: How to add, delete and update jobs
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc


# Working with Jobs

[Jobs](/platform/workflow/job/overview/) are the executable units of your pipelines that can execute any DevOps activity. A simple way to think of it is, if something can execute in the shell of your laptop, it can execute as a Job.

Jobs take Inputs in the form of [Resources](/platform/workflow/resource/overview), execute tasks that perform the operations necessary and then produce a result i.e. Output(s). Now these Outputs can become Inputs to other jobs and so on forming a dependency-based, event-driven DevOps Assembly Line.

Jobs are defined in a yml-based configuration file, **shippable.yml**, that is committed to source control in your [sync repository](/platform/workflow/resource/syncrepo/).

<a name="adding"></a>
## Adding Jobs
Jobs are defined in a configuration file, **shippable.yml**, and this file is added to a source control repository, which we call your [sync repository](/platform/workflow/resource/syncrepo).. All user permissions that users have on the repo is carried over to the objects defined in the YML. For example, if user 1 has read access he/she will only have read access to jobs defined in the repo.

Once **shippable.yml** is committed to a repository, you will have to add it to Shippable through the UI. Detailed step by step instructions are [here](/platform/tutorial/workflow/crud-syncrepo/#adding-a-syncrepo).

Once your sync repository is added, the platform watches for changes (job additions, edits or deletions) through source control webhooks. YML changes are automatically synced and they are reflected in the SPOG immediately.

<a name="pause"></a>
## Pausing jobs

You can pause any jobs in your pipeline by right-clicking on the job, and clicking **Pause Jobs**. Paused jobs are never triggered automatically, irrespective of yml configuration. You can unpause a paused job to resume automatic triggers.

<img src="/images/pipelines/pause-job.png" alt="Pause job" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

<a name="switch-off"></a>
## Turning off automatic job execution

You can insert a manual approval gate by preventing a job from being triggered automatically. The config for this is shown below:

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

As shown above, the `switch: off` tag can be defined for `IN` resources or jobs in order to turn off automatic triggering of a job when the inputs change. Note that these switches are specific to the input and should be set accordingly for each input.

When `switch: off` is applied to an input, the job will be displayed with a dark gray border when an update to the input would have otherwise triggered the job. Triggering the job will reset the border.

## Viewing job information

You can see what's included in each job version through the Shippable UI.

* Navigate to the [Subscription dashboard](/platform/visibility/subscription/dashboard/) and scroll down to view the list of Jobs in Grid View
* Search for your Job and click on it. This will show you a historical list of all versions and you can drill down to see additional information.

## Sharing information across jobs and runs

Please refer to these tutorials:

* [Read information from an `IN` resource](/platform/tutorial/workflow/access-resource-data)
* [Write to an `OUT` resource](/platform/tutorial/workflow/writing-keyvalues-to-output-resource)
* [Sharing information across jobs](/platform/tutorial/workflow/share-info-across-jobs)
* [Using central state](/platform/tutorial/workflow/share-info-across-jobs/#central-state)

<a name="pin"></a>
## Pinning specific resource versions

By default, Shippable uses information from the most recent or latest version of an `IN` input when running a job. However, you might want to 'pin' a specific version of an input for some reason. Input versions may be pinned either though the yml configuration or in the UI.

### Pinning resource versions in shippable.yml
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

You can use versionName to pin gitRepo and image resources. The versionName contains:

* gitRepo: commit SHA
* image: tag

You can use versionNumber, Shippable's internal incremental numbering system, to pin the following resources:

* dockerOptions
* params
* replicas

###Pinning versions in the UI
To pin a version of an input resource in the UI, first right-click on the job and click **Configure Job**. This will open a configuration page where you can select a version to pin for any of the inputs. Versions may be unpinned on the same page by selecting Latest version.

<a name="delete"></a>
## Deleting Jobs
Deleting Job is a 2 step process. Deleting from the YML causes it to be soft deleted and then you will have to manually delete it from SPOG view of the UI. The 2 step process is an insurance policy to prevent accidental deletes. Deleting a Job means all historical versions are deleted permanently and this can really mess up your DevOps Assembly Lines as it is a connected interdependent workflow.

Here are the steps to delete a Job

1. Delete the Job definition from the YML and commit the change to the repo. Automatic sync process will execute and mark the removed Job as soft deleted. All version data is still available and no data is lost at this stage. If any Jobs are still using this deleted Job and they are still active, those Jobs will be marked inconsistent and will not be triggered until fixed
1. Now log into your SPOG, make sure that you have not hidden deleted Job from your view. All the soft deleted Jobs will appear on the bottom of your SPOG. Right click on each of them and delete. If these Jobs are still being used, then delete option is not presented until you make sure there are no references to the soft deleted Job. Once you delete from the SPOG, all data is permanently destroyed

<a name="migrate"></a>
## Migrating a Job from one YML to another
There are some situations where you might need to reorganize where your Jobs are defined. If you delete and recreate, you will lose all the historical versions. If history is important, migration might be a better alternative

Here are the steps to migrate -

Here are the steps to migrate -

1. Goto the SPOG page and pause the rSync job for the source repository from where you want to migrate resources, jobs or triggers. Steps for pausing the rSync jobs can be found [here](/platform/tutorial/workflow/crud-job#pausing-jobs).

2. Add the jobs you want to migrate to the destination repository's yml files.

3. Run the rSync job of the destination repository. Once the rSync job completes, migration will be complete. Your SPOG will however not change as no dependency has changed. Therefore, to verify this you can check the logs of the rSync job.
<img src="/images/pipelines/migrationConsoleLog.png" alt="See the version list of your resource from the SPOG view" style="width:800px;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

4. From the source repository, delete all the migrated jobs. This will automatically trigger the rSync job and it should succeed.
<img src="/images/pipelines/resumeJob.png" alt="See the version list of your resource from the SPOG view" style="width:800px;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

5. Now, your jobs are migrated to the destination repository. You can add, remove or update them there.

**NOTE:** While migrating a job you should copy it exactly as it is in the source repository. You can add or remove dependencies only once the job is successfully migrated to destination repository.

## Further Reading
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
* [Integrations](/platform/integration/overview)
