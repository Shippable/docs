page_main_title: Overview
main_section: Platform
sub_section: Workflow
sub_sub_section: Jobs
page_title: Unified Pipeline Jobs
page_description: List of supported jobs
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# TODO
| Tasks   |      Status    |
|----------|-------------|
| Hotlinking |  Open |
| Further Reading needs thinking|  Open |
| Add link to inconsistencies to rSync|  Open |
| Environment variables|  Open |
| Folder Structure|  Open |

# Jobs
Jobs are the executable units of your pipelines. They can execute any DevOps activity and a simple way to think of it is, if something can execute in the shell of your laptop, it can execute as a Job.

Jobs are simple to understand, they take inputs of information in the form of [Resources](/platform/workflow/resource/overview), execute tasks that perform the operations necessary and then produce a result i.e. output of the job. Now these outputs can become inputs to other jobs and so on forming a dependency based, event driven DevOps Assembly Lines.

<img src="/images/platform/jobs/jobWorkflow.png" alt="Connecting jobs into a pipeline" style="width:1000px;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

They are typically used in these cases

* Executing webhook triggered Continuous Integration (CI) on a repo
* Build, Test and Push Docker images to registries like Docker Hub. Quay, JFrog etc.
* Build deployable machine images with tools like Packer etc.
* Provisioning infrastructure using various automation tools like Chef, Puppet, Terraform, Ansible etc.
* Deploying applications to container services like Kubernetes, Google Container Engine, Amazon ECS, Azure Container Service as well as to plain VM based clusters
* Create immutable service definitions so that applications can roll-forward and roll-back
* Deploying applications with Continuous Deployment (CD) tools like Capistrano, Distelli, Ansible etc.
* Implementing deployment strategies like Blue/Green, Upgrades and Replace
* Perform timely backups of DB, key-value stores etc.


## YML Definition
Jobs are defined through the `YML` based code snippets as below

```
jobs:
  - name: 					<string>
    type: 					<job type name>
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
      - IN: 				<params/dockerOption/replicas resource>
        applyTo:
          - 				<image/manifest/release>
          - 				<image/manifest/release>
      - IN: 				<loadBalancer resource>
        applyTo:
          - manifest: 		<manifest>
            image: 			<image>              
            port: 			<number>
      - IN: 				<gitRepoResource with buildOnPullRequest: true>
        showBuildStatus: 	true
      - IN: 				<manifest/release>
        force: 				true
      - TASK:
        - script: 			<any shell command>
        - script: 			<any shell command>
      - OUT: 				<resource>
      - OUT: 				<resource>
        replicate: 			<IN resource>
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

For more information, read [Working with Jobs](/platform/workflow/job/working-with/)

## When does a Job execute?
A Job is queued by the DevOps Assembly Line platform when one of the following cases occur

* A new version was created for the `IN` resource. This might occur due to a `YML` change or some other job updated the state of this resource
* `IN` job executed and successfuly completed it's tasks. This means the preceding job ran and since its an input to this Job, it needs to run. There are some cases due to which the Job does not get triggered, namely
	* If any Jobs defined as `IN`s are currently processing, have queued builds or in a failed state
	* If the Job is in [inconsistent]() state due to dependency failures

<a name="types"></a>
## Types
These are the types of resources that Shippable Workflow supports:

| Job Type   |      Description    |
|----------|-------------|
| [deploy](workflow/job/deploy/) | Deploy apps/services to Container Platforms or VM clusters |
| [manifest](workflow/job/manifest/) | Create App/Service definition (configuration) that is immutable |
| [provision](workflow/job/provision/) | Provision specific resources needed by Container Orchestration Platforms |
| [release](workflow/job/release/) | Release management for Apps/Services |
| [jenkinsJob](workflow/job/jenkinsjob/) | Execute a Jenkins Job from Assembly Lines |
| [runCI](workflow/job/runci/) | Execute Shippable CI Job |
| [runSh](workflow/job/runsh/) | Execute any Shell command |
| [runCLI](workflow/job/runcli/) | Execute any supported Command Line Interface command |

If you need a job that is not listed above, send us an email at [support@shippable.com](mailto:support@shippable.com)

## Folder Structure

## Environment Variables

# Further Reading
* Working with Resources
* Working with Integrations
* Jobs
