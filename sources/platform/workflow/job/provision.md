page_main_title: provision
main_section: Platform
sub_section: Workflow
sub_sub_section: Jobs
page_title: Unified Pipeline Jobs - provision
page_description: List of supported jobs
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# provision

The `provision` job is used to create ancillary objects like load balancers on Container Orchestration Platforms. Currently we support provisioning of load balancers on clusters hosted on:

- Google Container Engine (GKE)
- Kubernetes

**Please note that when `provision` jobs are deleted, the resulting objects are also deleted from the container service.**

You can create a `provision` Job by [adding](/platform/tutorial/workflow/crud-job#adding) it to `shippable.jobs.yml`:


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

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `provision`

* **`steps`** -- is an object which contains specific instructions to run this Job
    * `IN` -- You need at least 1 or more [**loadBalancer**](/platform/workflow/resource/loadBalancer/) Resource(s) as an input. Currently we only support `loadBalancer` Resource on GKE or Kubernetes services. If you need other entities [please let us know](https://www.github.com/Shippable/support/new).
        * [loadBalancer](/platform/workflow/resource/loadbalancer/) -- If a `loadBalancer` is provided, the `provision` job will attempt to create a loadBalancer based on the integration associated with the resource.
  * Any other Job or Resource will only participate in triggering the `provision` job, but not in of the processing of it.

* **`on_start`**, **`on_success`**, **`on_failure`**, **`on_cancel`**, **`always`** are used to send notifications for those events. You need to provide a [**notification**](/platform/workflow/resource/notification) resource pointing to the provider like Slack, Email, IRC, Hipchat, etc.

A full detailed description of each tag is available on the [Job Anatomy](/platform/tutorial/workflow/shippable-jobs-yml) page


**Notes:**

- Since `provision` jobs are managed jobs, free-form scripting is not allowed. `on_start`, `on_success`, `on_failure`, `on_cancel` and `always` only support `NOTIFY` tag.

- A new version of the `provision` job is created every time it is executed. Since the job executions are versioned, it is easy to **Replay** an old version to trigger your Assembly Line with the old settings. However, you should only do so if you understand the impact to your Assembly Lines.

## Further Reading
* [jobs](/platform/workflow/job/overview)
* [resources](/platform/workflow/resource/overview)
* [loadBalancer](/platform/workflow/resource/loadbalancer/)
* [notification](/platform/workflow/resource/notification/)
