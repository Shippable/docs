page_main_title: manifest
main_section: Platform
sub_section: Workflow
sub_sub_section: Jobs
page_title: Unified Pipeline Jobs - manifest
page_description: List of supported jobs
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# manifest

The `manifest` job is used to create a versioned, immutable service definition of a deployable unit of your application. Depending on your use case, the deployment unit could be a service, microservice, or the entire application.

A  `manifest` can be supplied as an input to a [deploy](/platform/workflow/job/deploy) Job which will then deploy it to the desired target.

A `manifest` can contain the following:

- One or more [Docker image Resources](/platform/workflow/resource/image) OR one or more [file Resources](/platform/workflow/resource/file) as the basic deployable unit.
- optional [params](/platform/workflow/resource/params) Resource to inject environment variables during deployment.
- optional [dockerOptions](/platform/workflow/resource/dockeroptions) resource for Docker manifests. This helps specify options for the deployed container.

A `manifest` is always deployed as a whole i.e. if it contains multiple images/files, all the images/files will be deployed even if only one changed. If you want them to deployed independently, you should create multiple manifests to represent them.

You can create a `manifest` Job by [adding](/platform/tutorial/workflow/howto-crud-job#adding) it to `shippable.jobs.yml`.

## YML Definition

```
jobs:
  - name: 			<string>				# required
    type: 			manifest				# required
	 on_start:								# optional
	   - NOTIFY: <notification resource name>
    steps:
      - IN: 		<image/file>			# required
      - IN: 		<image/file>			# optional
      - IN: 		<dockerOptions> 		# optional
      - IN: 		<dockerOptions> 		# optional
        applyTo:
          - <image>
          - <image>
      - IN: 		<params> 				# optional
      - IN: 		<params> 				# optional
        applyTo:
          - <image/file>
          - <image/file>
      - IN: 		<replicas> 				# optional
      - IN: 		<replicas> 				# optional
        applyTo:
          - <image>
          - <image>
      - IN: 		<any job or resource>  	# optional
	 on_success:							# optional
	   - NOTIFY: <notification resource name>
	 on_failure:							# optional
	   - NOTIFY: <notification resource name>
	 on_cancel:								# optional
	   - NOTIFY: <notification resource name>
	 always:								# optional
	   - NOTIFY: <notification resource name>
```

* **`name`** -- should be an easy to remember text string.

* **`type`** -- is set to `manifest`.

* **`steps `** -- is an object which contains specific instructions to run this Job.

	  * `IN` -- You need at least one [**image**](/platform/workflow/resource/image/) or one [**file**](/platform/workflow/resource/file/) as an input. You cannot mix `image` and `file` resources in the same manifest.

		* [dockerOptions](/platform/workflow/resource/dockeroptions) -- Optional input for manifests containing image resource. It is used to set specific container options. If more than one is provided, a UNION operation is performed to create an unique set and applied to all the `image` resources. Items are applied in the order they are provided in `steps`. If you want `dockerOptions` resource to modify specific entities, use `applyTo` tag.

		* [replicas](/platform/workflow/resource/replicas) -- Optional input for manifests containing image resource. It is used to set number of containers to spin up for an image. If you specify more than one `replicas`, the last one gets applied to all the `image` resources in the manifest. If you want the `replicas` resource to apply to a specific image only, you can use the `applyTo` tag.

		* [params](/platform/workflow/resource/params) -- Optional input, and it works for both `image` and `file` inputs. It is used to set environment variables during deployment. If more than one is provided, a UNION operation is performed to create an unique set and applied to all the `image` or `file` resources. Items are applied in the order they are provided in `steps`. If you want `params` resource to be associated with specific entities, use `applyTo` tag.

		* Any other Job or Resource will only participate in triggering `manifest` Job but not in of the processing of it

* **`on_start`**, **`on_success`**, **`on_failure`**, **`on_cancel`**, **`always`** are used to send notifications for those events. You need to provide a [**notification**](/platform/workflow/resource/notification) resource pointing to the provider like Slack, Email, IRC, Hipchat, etc.

A full detailed description of each tag is available on the [Job Anatomy](/platform/tutorial/workflow/shippable-jobs-yml) page.

**Notes:**

- Since `manifest` jobs are managed jobs, free-form scripting is not allowed. `on_start`, `on_success`, `on_failure`, `on_cancel` and `always` only support `NOTIFY` tag.

- A new version of the `manifest` job is created every time it is executed. Since the job executions are versioned, it is easy to **Replay** an old version to trigger your Assembly Line with the old settings. However, you should only do so if you understand the impact to your Assembly Lines.


## Further Reading
* [job](/platform/workflow/job/overview)
* [resource](/platform/workflow/resource/overview)
* [image](/platform/workflow/resource/image/)
* [file](/platform/workflow/resource/file/)
* [dockerOptions](/platform/workflow/resource/dockeroptions)
* [replicas](/platform/workflow/resource/replicas)
* [params](/platform/workflow/resource/params)
* [notification](/platform/workflow/resource/notification/)
