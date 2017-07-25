page_main_title: runCI
main_section: Platform
sub_section: Jobs
page_title: DevOps pipeline runCI job
page_description: Description of the runCI job
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# TODO
| Tasks   |      Status    | 
|----------|-------------|
| Hotlinking |  Open | 
| Further Reading needs thinking|  Open |
| Add Environment variables|  Open |
| Add Folder Structure|  Open |

# runCI
`runCI` is a job that represents a repo that is enabled for CI on Shippable. This is how Shippable was started before we realized that trying to create a complex workflows in 1 single YML was impossible and we needed DevOps Assembly Lines. As a result, this job is somewhat different from other Jobs since the actual configuration is driven through [`shippable.yml`](/platform/shippable-yml/). The runCI job is just a wrapper that lets you easily integrate your CI workflow with the rest of your pipeline.

`runCI` Jobs execute on Shippable provided [Dynamic Nodes]() or [Custom Nodes]()

## How do you create a runCI Job?
When you enable your repo for [CI](/ci/enable-project/), an internal representation of `runCI` job is automatically created along with [ciRepo]() as an `IN`

Note: If your `CI` project was enabled before March 2017, you can create these objects by clicking on **Hook** button on the Project Settings page.

<img src="/images/platform/jobs/runCI/hookPipeline.png" alt="Hook button on project settings page." style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>


## How do you use it in Assembly Lines?
Now if you want to interact with your **runCI** Job with other entities of the Assembly line, you can add a `runCI` Job by [adding](jobs-working-wth#adding) it to `shippable.jobs.yml`. This creates a wrapper around your existing job.


## YML Definition

```
jobs:
  - name: <name of the runCI>				
    type: runCI
	 on_start:
	   - NOTIFY: <notification resource name>
    steps:
      - IN: <resource>
        switch: off
      - IN: <job>
      - IN: <resource>
        versionName: <name of the version you want to pin>
      - IN: <resource>
        versionNumber: <number of the version you want to pin>        
      - IN: <gitRepoResource with buildOnPullRequest: true>
        showBuildStatus: true       
      - OUT: <resource>
      - OUT: <resource>
        replicate: <resource>
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
A full detailed description of each tag is available on the [Job Anatomy](jobs-working-with#jobanatomy) page

* **`name`** -- Required, and needs to match whatever got created automatically when you enabled the repo for CI. It typically is in the format of `<repo name>_runCI`. You can find the exact name from the SPOG view

* **`type`** -- Required, is set to `runCI`

* **`on_start `** -- Optional, and both `script` and `NOTIFY` types can be used

* **`steps `** -- is an object which contains specific instructions to run this Job
	* `IN` -- Optional, any Resource or Job can be used here and as many of them as you need. `switch`, `versionNumber`, `versionName` and `showBuildStatus` is supported too. `applyTo` is not supported
	
	* `TASK` -- is not allowed in this job. It is done through [`shippable.yml`](/platform/shippable-yml/)
	* `OUT` -- Optional, any Resource can be used here and as many as you need
		* `replicate` -- Optional, any `IN` Resource of same type can be used 

* **`on_success `** -- Optional, and both `script` and `NOTIFY` types can be used

* **`on_failure `** -- Optional, and both `script` and `NOTIFY` types can be used

* **`on_cancel `** -- Optional, and both `script` and `NOTIFY` types can be used

* **`always `** -- Optional, and both `script` and `NOTIFY` types can be used

## Environment variables
In order to make it easier to write your scripts and work with `IN` and `OUT` resources, we have made several environment variables available for use within your `TASK` section of your `runCI` job.

A complete list of these variables is available in the [Environment variables for unmanaged jobs docs](/platform/jobs-unmanaged/), along with simple tutorials showing how you can work with `IN` and `OUT` resources in your scripts.  

Please note that the environment variables for a `runCI` job are in addition to the [standard variables available for every CI job](/ci/env-vars/).

# Further Reading
* Working with Resources
* Working with Integrations
* Jobs
* [How to connect CI with Assembly Lines](/ci/trigger-pipeline-jobs/)
