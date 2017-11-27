page_main_title: runCI
main_section: Platform
sub_section: Workflow
sub_sub_section: Jobs
page_title: DevOps pipeline runCI job
page_description: Description of the runCI job
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# runCI

`runCI` is a job that represents a repo that is enabled for CI on Shippable. This is how Shippable was started before we realized that trying to create complex workflows in one single YML script was impossible and we needed DevOps Assembly Lines. As a result, this job is somewhat different from other jobs since the actual configuration is driven through the CI sections of [`shippable.yml`](/platform/tutorial/workflow/shippable-yml/). The runCI job is just a wrapper that lets you easily integrate your CI workflow with the rest of your assembly line.

`runCI` jobs execute on Shippable provided [Dynamic Nodes or Custom Nodes](/platform/runtime/overview#nodes)

## How do you create a runCI Job?
When you [enable your repo for CI](/ci/enable-project/), an internal representation of `runCI` job is automatically created along with [ciRepo](/platform/workflow/resource/cirepo/) as an `IN`.

Note: If your `CI` project was enabled before March 2017, you can create these objects by clicking on **Hook** button on the Project Settings page.

<img src="/images/platform/jobs/runCI/hookPipeline.png" alt="Hook button on project settings page." style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

## How do you use it in Assembly Lines?

Now if you want your `runCI` job to interact with other entities of the Assembly line, you can fully customize it by [adding](/platform/tutorial/workflow/crud-job#adding) it as a job in `shippable.yml`. This creates a wrapper around your existing job.  You can also use this pre-defined job as an `IN` to any other job in your pipeline without having to explicitly define it in `shippable.yml`.

## YML Definition

```
jobs:
  - name: <name of the runCI>
    type: runCI
    steps:
      - IN: <resource>
        switch: off
      - IN: <job>
      - IN: <resource>
        versionName: <name of the version you want to pin>
      - IN: <resource>
        versionNumber: <number of the version you want to pin>        
      - OUT: <resource>
      - OUT: <resource>
        replicate: <resource>
```
A description of the job YML structure and the tags available is in the [jobs section of the anatomy of shippable.yml](/platform/tutorial/workflow/shippable-yml/#jobs) page.

* **`name`** -- Required, and needs to match whatever got created automatically when you enabled the repo for CI. It typically is in the format of `<repo name>_runCI`. You can find the exact name from the SPOG view.

* **`type`** -- Required, is set to `runCI`

* **`steps `** -- is an object which contains specific instructions to run this Job
    * `IN` -- Optional, any Resource or Job can be used here and as many of them as you need. `switch`, `versionNumber`, and `versionName` are supported too but `applyTo` is not supported.
    * `TASK` -- is not allowed in this job. It is done through [`shippable.yml`](/platform/tutorial/workflow/shippable-yml/)
    * `OUT` -- Optional, any Resource can be used here and as many as you need.
        * `replicate` -- Optional, any `IN` Resource of same type can be used.

The [jobs section of the anatomy of shippable.yml](/platform/tutorial/workflow/shippable-yml/#jobs) page contains additional descriptions of these tags.

## Default Environment Variables
In order to make it easier to write your scripts and work with `IN` and `OUT` resources, we have made several environment variables available for use within your `TASK` section of your `runCI` job. Visit the Resource page for each type, to get the list of environment variables that get set depending on the Resource type thats either `IN` or `OUT`.

In addition, the Job itself comes with its own default set of variables. This is the list for this Job type

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| JOB_NAME 									| The name of the Job, given in the YML |
| JOB_TYPE 									| The type of the Job. In this case `runCI`|
| BUILD_ID 									| Internal Id of the current build thats executing|
| BUILD_NUMBER 								| Sequentional number for the Job thats executing|
| BUILD_JOB_ID    							| Internal ID of the currently running Job |
| BUILD_JOB_NUMBER    						| Sequential number of the Job |
| SUBSCRIPTION_ID    						| Shippable ID that represents git organization uniquely |
| JOB_PATH    								| The path of the directory containing files critical for this job |
| JOB_STATE      							| The location of the `state` directory for this job|
| JOB_PREVIOUS_STATE 						| The location of the directory containing the `state` information from when the job last ran. |

Please note that the environment variables for a `runCI` job are in addition to the [standard variables available for every CI job](/ci/env-vars/).

## Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading

* [jobs](/platform/workflow/job/overview)
* [resources](/platform/workflow/resource/overview)
* [CI configuration](/platform/tutorial/workflow/shippable-yml/)
