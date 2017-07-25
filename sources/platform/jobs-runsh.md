page_main_title: runSH
main_section: Platform
sub_section: Jobs
page_title: Unified Pipeline Jobs - runSh
page_description: List of supported jobs
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# TODO
| Tasks   |      Status    | 
|----------|-------------|
| Hotlinking |  Open | 
| Further Reading needs thinking|  Open |
| Add Environment variables|  Open |
| Add Folder Structure|  Open |

# runSh
`runSh` is a Job that lets you run any `shell` script as part of your DevOps Assembly Line. It is one of the most versatile Jobs in the arsenal and can be used to pretty much execute any DevOps activity that can be scripted. With a combination of `IN`s like `params`, `integration`, `gitRepo` etc. the vision of "Everything as Code" can be realized. 

You should use this job type if you need the freedom that some of the pre-packaged Jobs like `deploy`, `manifest` do not provide the flexibility that you need or do not support the 3rd party end-point you want to integrate to. For example, pushing to Heroku is not yet natively supported through a managed job type, so you can write the scripts needed to do this and add it to your workflow as a Job of type `runSh`.

A new version is created anytime this Job is executed

You can create a `runSh` Job by [adding](jobs-working-wth#adding) it to `shippable.jobs.yml` and it executes on Shippable provided [Dynamic Nodes]() or [Custom Nodes]()


## YML Definition
```
jobs:
  - name: 					<string>
    type: 					runSh
	 on_start:
	   - NOTIFY: 			<notification resource name>
    steps:
      - IN: 				<resource>
        switch: 			off
      - IN: 				<job>
      - IN: 				<resource>
        versionName: 		<name of the version you want to pin>
      - IN: 				<resource>
        versionNumber: 		<number of the version you want to pin>        
      - IN: 				<gitRepoResource with buildOnPullRequest: true>
        showBuildStatus:	true       
      - TASK: 
        - script: 			<any shell command>
        - script: 			<any shell command>
      - OUT: 				<resource>
      - OUT: 				<resource>
        replicate: 			<resource>
	 on_success:
      - script: 			echo "SUCCESS"
	 on_failure:
      - script: 			echo "FAILED"
      - NOTIFY: 			<notification resource name>
	 on_cancel:
      - script: 			echo "CANCEL"
	 always:
      - script: 			pwd
```
A full detailed description of each tag is available on the [Job Anatomy](jobs-working-with#jobanatomy) page

* **`name`** -- Required, should be an easy to remember text string

* **`type`** -- Required, is set to `runSh`

* **`on_start `** -- Optional, and both `script` and `NOTIFY` types can be used

* **`steps `** -- is an object which contains specific instructions to run this Job
	* `IN` -- Optional, any Resource or Job can be used here and as many of them as you need. `switch`, `versionNumber`, `versionName` and `showBuildStatus` is supported too. `applyTo` is not supported
	
	* `TASK` -- Required, atleast 1 script needs to be present 
	* `OUT` -- Optional, any Resource can be used here and as many as you need
		* `replicate` -- Optional, any `IN` Resource of same type can be used 

* **`on_success `** -- Optional, and both `script` and `NOTIFY` types can be used

* **`on_failure `** -- Optional, and both `script` and `NOTIFY` types can be used

* **`on_cancel `** -- Optional, and both `script` and `NOTIFY` types can be used

* **`always `** -- Optional, and both `script` and `NOTIFY` types can be used

## Environment variables

In order to make it easier to write your scripts and work with `IN` and `OUT` resources, we have made several environment variables available for use within your `TASK` section of your `runSh` job.

A complete list of these variables is available in the [Environment variables for unmanaged jobs docs](/platform/jobs-unmanaged/), along with simple tutorials showing how you can work with `IN` and `OUT` resources in your scripts.  

# Further Reading
* Working with Resources
* Working with Integrations
* Jobs

