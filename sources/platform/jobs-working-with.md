page_main_title: Overview
main_section: Platform
sub_section: Jobs
page_title: DevOps Assembly Line Jobs
page_description: How to add, delete and update resources
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# TODO
| Tasks   |      Status    | 
|----------|-------------|
| Hotlinking |  Open | 
| Further Reading needs thinking|  Open |
| Need to update migration|  Open |

# Working with Jobs
Shippable DevOps Platform leverages a declarative syntax for CRUD operations on Jobs. A YML `shippable.jobs.yml` config file is used to define them. It is added to your the root of your source code repo just like any other piece of code and the platform recognizes the changes you make to it through webhooks and sync the definitions. 

## Anatomy of shippable.jobs.yml
The anatomy of the jobs configuration generally follows the structure below

```
jobs:
  - name: <string>
    type: <job type name>
    steps:
      - IN: <resource>
        switch: off
      - IN: <job>
      - IN: <resource>
        versionName: <name of the version you want to pin>
      - IN: <resource>
        versionNumber: <number of the version you want to pin>
      - TASK: 
        - script: <any shell command>
        - script: <any shell command>
      - OUT: <resource>
	 on_start:
	   - NOTIFY: <notification resource name>
	 on_success:
      - script: echo "SUCCESS"
	 on_failure:
      - script: echo "FAILED"
      - NOTIFY: <notification resource name>
	 on_cancel:
      - script: echo "CANCEL"
	 always:
      - script: pwd
```
Any special `YML` tags that are job specific is defined in respective job pages. 

* **`name`** -- an **alphanumeric** string (underscores are permitted) that makes it easy to infer what the job does e.g. `prov_test_env` to represent a job that provisions test environment. 

* **`type`** -- Name of the job type that this job is an instance of. [Here](jobs-overview#types) is a list of all types

* **`steps`** -- is an object that is the heart of the Job. It usually is made up of and array of INs, TASK & OUTs
	* `IN` -- represents the input Resource or a preceding Job. Whenever there is a change to these inputs, this job will be triggered to run. `IN`s have attributes that are used to control the flow
		* `switch` -- this determines whether a chance to the input entity will trigger a new run or not. default is `on` and can be set to `off` to turn of auto triggering
		* `versionName` -- this is used to pin a particular version of the input entity. This is a friendly name and will take in the first matching one from the list of versions chronologically descending
		* `versionNumber` -- this is used to pin a particular version of the input entity. Since every versionNumber is unique, this is guaranteed to give you predictable results
	
		Note: `versionName` or `versionNumber` are mutually exclusive, in other words only one of them can be used
	
	* `TASK` -- is an array of single line scripts that are executed as part of the Job. These are executed in series and will stop processing the moment an exit code is encountered
	* `OUT` -- only Resources can be `OUT`s. This means the current Job is altering the state of the Resource that is defined in the `OUT`. Any Resource can be used for storing key-value pairs are output of the Job. But a special Resource [state]() can be used for both key-value pairs and files. A Resource cannot both IN and OUT for the same Job unless it is a `state` Resource. This is to avoid circular dependencies which will cause a loop in your DevOps Assembly Lines. 
 
* **`on_start `** -- this section is executed before the `steps` are executed. You can run two types of activities here
	* `script` -- any single line shell script can be executed here
	* `NOTIFY` -- a Resource of type [notification]() can be added to send alerts about the Job
* **`on_success `** -- this section is executed if the `steps` execution exits with 0 as the exit code. Supports both `script` and `NOTIFY` tags
* **`on_failure `** -- this section is executed if the `steps` execution exits with non-zero exit code. Supports both `script` and `NOTIFY` tags
* **`on_cancel `** -- this section is executed if the `steps` execution is cancelled. Supports both `script` and `NOTIFY` tags
* **`always `** -- this section is executed no matter what the status is. Supports both `script` and `NOTIFY` tags


<a name="adding"></a>
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


## Pausing jobs

You can pause any jobs in your pipeline by right-clicking on the job, and clicking `Pause Jobs`. Paused jobs are never triggered automatically, irrespective of yml configuration. You can unpause a paused job to resume any automatic triggers.


##Viewing job console output

Just like resources, Jobs are also versioned on Shippable. Every run of a job creates a new version of the job, including a unique build object which stores the console output of the Job run.

You can view console output for a job by clicking on it in the SPOG view. The job console looks like this:

<img src="../../images/platform/jobs/jobModal.png" alt="Console output and trace, properties, run, and pause buttons for a job" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

Please note that in most cases, the logs you are interested in will be under the **Executing Task -> /home/shippable/micro/nod/stepExec/managed/run.sh** section. This section is shown as expanded in the screenshot above.

In addition to viewing logs for the latest run, you can also view logs for historical runs by choosing a past run in the UI.


# Further Reading
* Working with Resources
* Working with Integrations
* Jobs
