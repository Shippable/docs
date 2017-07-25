page_main_title: manifest
main_section: Platform
sub_section: Jobs
page_title: Unified Pipeline Jobs - manifest
page_description: List of supported jobs
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# TODO
| Tasks   |      Status    | 
|----------|-------------|
| Hotlinking |  Open | 
| Further Reading needs thinking|  Open |

# manifest
`manifest` is Job that is used to create a versioned immutable service definition of your app. It is the definition of a deployment unit. This can be then supplied as an input to a [deploy]() Job which will then deploy the app to the desired target. A `manifest` is made up of either an [image]() or a [file]() Resources as the basic deployable unit. It can be appended with [params]() to inject environment variables during deployment in both cases and [dockerOptions]() in case its using a Docker iamge. A manifest is deployed as a whole i.e. if it contains multiple images/files, all the images/files will be deployed even if only one of it changed. If you want them to deployed independently, then create multiple manifests to represent them. 

A new version is created anytime this Job is executed

You can create a `manifest` Job by [adding](jobs-working-wth#adding) it to `shippable.jobs.yml` and these Jobs execute on Shippable provided [Shared Nodes]()

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
          - <image> 
          - <image>
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
A full detailed description of each tag is available on the [Job Anatomy](jobs-working-with#jobanatomy) page

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `manifest`

* **`steps `** -- is an object which contains specific instructions to run this Job
	* `IN` -- You need atleast 1 `image` or 1 `file` as an input. You have can more than one, but they all need to be of the same type. If you use multiple of them, then they will be deployed as a whole. Below is the list of all Resources and Jobs that can be supplied as `IN`
		* [image]() -- Required input, You can add 1 or many of it

		* [file]() -- Required input if `image` is not used, otherwise invalid. You can add 1 or many of it

		* [dockerOptions]() -- Optional input, but invalid if the manifest is not for an image. It is used to set specific container options. If more than 1 is provided, an UNION operation is performed to create an unique set and applied to all the `image` resources. If you want `dockerOptions` Resource to apply to only 1 then use `applyTo` tag

		* [replicas]() -- Optional input, but invalid if the manifest is not for an image. It is used to set number of containers to spin up for an image. If more than 1 is provided, the last one gets applied to all the `image` resources. If you want `replicas` Resource to apply to only 1 then use `applyTo` tag

		* [params]() -- Optional input, and it works for both `image` and `file` based Job. It is used to set environment variables during deployment. If more than 1 is provided, an UNION operation is performed to create an unique set and applied to all the `image` or `file` resources. If you want `params` Resource to apply to only 1 then use `applyTo` tag

		* Any other Job or Resource will only participate in triggering `manifest` Job but not in of the processing of it

	
Note: Since `manifest` Jobs run on [Shared Nodes](), free-form scripting is not allowed. `on_start`, `on_success`, `on_failure`, `on_cancel` and `always` only support `NOTIFY` tag

# Further Reading
* Working with Resources
* Working with Integrations
* Jobs

