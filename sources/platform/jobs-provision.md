page_main_title: provision
main_section: Platform
sub_section: Workflow
sub_sub_section: Jobs
page_title: Unified Pipeline Jobs - provision
page_description: List of supported jobs
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

| Tasks   |      Status    |
|----------|-------------|
| Hotlinking |  Open |
| Further Reading needs thinking|  Open |

# provision
`provision` is a Job that is used to create ancillary objects like load-balancers on Container Orchestration Platform.

Currently we support provisioning of load-balancers on clusters that are hosted on

- Google Container Engine (GKE) services.
- Kubernetes services.

When provision jobs are deleted, the resulting objects are also deleted from the container service.

A new version is created anytime this Job is executed

You can create a `provision` Job by [adding](jobs-working-wth#adding) it to `shippable.jobs.yml` and these Jobs execute on Shippable provided [Shared Nodes]()

```
jobs:
  - name: 				<string>			# required
    type: 				provision			# required
	 on_start:								# optional
	   - NOTIFY: 		<notification resource name>
    steps:
      - IN: 			<loadBalancer>		# required
      - IN: 			<loadBalancer>		# optional
      - IN: 			<any job or resource>  # optional
	 on_success:							# optional
	   - NOTIFY: 		<notification resource name>
	 on_failure:							# optional
	   - NOTIFY: 		<notification resource name>
	 on_cancel:								# optional
	   - NOTIFY: 		<notification resource name>
	 always:								# optional
	   - NOTIFY:		<notification resource name>
```

A full detailed description of each tag is available on the [Job Anatomy](jobs-working-with#jobanatomy) page

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `provision`

* **`steps `** -- is an object which contains specific instructions to run this Job
	* `IN` -- You need atleast 1 or more `loadBalancer` Resource as an input. Currently we only support `loadBalancer`  Resource on GKE or Kubernetes services. If you need other entities please let us know

Note: Since `provision` Jobs run on [Shared Nodes](), free-form scripting is not allowed. `on_start`, `on_success`, `on_failure`, `on_cancel` and `always` only support `NOTIFY` tag

# Further Reading
* JFrog integration
* AWS integration
* runCLI job
* cli pre-installed in job runtime
* how to deploy a file to a VM cluster
* Output a file from runSH
