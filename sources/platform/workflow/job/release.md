page_main_title: release
main_section: Platform
sub_section: Workflow
sub_sub_section: Jobs
page_title: Unified Pipeline Jobs - release
page_description: List of supported jobs
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

| Tasks   |      Status    |
|----------|-------------|
| Hotlinking |  Open |
| Further Reading needs thinking|  Open |

# Release
`release` is a Job that is used to create a semantically versioned object that represents and immutable list of service definitions, in our case a [manifest](). This big benefit of using this job would be if you have multiple services that make up your application and you want them all to be deployed as a unit.

Shippable DevOps Assembly Lines stores the service definition in the versions of the following Jobs

* [manifest]() as this is the Job that generates a service definition
* [deploy]() as this needs manifests to deploy and the deploy job stores the manifests it deploys for ability to roll-back
* [release]() as this is what tags a semantic version number for the service definition

All of the above jobs can be used as `IN`s to create a new release. A new version is created anytime this Job is executed

You can create a `deploy` Job by [adding](jobs-working-wth#adding) it to `shippable.jobs.yml` and these Jobs execute on Shippable provided [Shared Nodes]()

## YML Definition

```
jobs:
  - name: 				<string>					#required
    type: 				release		  				#required
	 on_start:										# optional
	   - NOTIFY: 		<notification resource name>
    steps:
      - IN: 			<version>					# required
      - IN: 			<manifest/release/deploy> 	# required
      - IN: 			<manifest/release/deploy> 	# optional
      - IN: 			<manifest/release> 			# optional
      - IN: 			<any job or resource>  		# optional
      - TASK: 			managed
        bump:			<bump strategies> 			# required
	 on_success:									# optional
	   - NOTIFY: 		<notification resource name>
	 on_failure:									# optional
	   - NOTIFY: 		<notification resource name>
	 on_cancel:										# optional
	   - NOTIFY: 		<notification resource name>
	 always:										# optional
	   - NOTIFY:		<notification resource name>
```
A full detailed description of each tag is available on the [Job Anatomy](workflow/job/working-with#jobanatomy) page

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `manifest`

* **`steps `** -- is an object which contains specific instructions to run this Job
	* `IN` -- You need atleast 1 `image` or 1 `file` as an input. You have can more than one, but they all need to be of the same type. If you use multiple of them, then they will be deployed as a whole. Below is the list of all Resources and Jobs that can be supplied as `IN`
		* [version]() -- Required input, what is the seed version you want to start from.
			* `force` -- Optional input, if you need to deploy the `release` even if nothing has changed. Deployment could have been triggered by some other change		
		* [manifest]()/[release]()/[deploy]() -- Required input, you can add 1 or many of it. If you add more than 1, they will all be packaged into a single release

		* Any other Job or Resource will only participate in triggering `release` Job but not in of the processing of it

	* `TASK` -- Required, but needs to be set to value `managed` is used
		* `bump` -- This is used to control the strategy used to bump your seed version. Subsequent executions of this Job will increment the last bumped value if its semantically greater than the `seed`. If you want to reset, then jump change the seed and it start from the new seed again. Below is a list of accepted stategies and how they behave if a seed version of `v1.0.0` was used
			* `major` -- this increments the major bit of the supplied version. So, first pass it will be `v2.0.0` and next one will be `v3.0.0`
			* `minor` -- this increments the minor bit of the supplied version. So, first pass it will be `v1.1.0` and next one will be `v1.2.0`
			* `patch` -- this increments the patch bit of the supplied version. So, first pass it will be `v1.0.1` and next one will be `v1.0.2`
			* `alpha` -- this increments the alpha bit of the supplied version. So, first pass it will be `v1.0.0-alpha` and next one will be `v1.0.0-alpha.1`
			* `beta` -- this increments the beta bit of the supplied version. So, first pass it will be `v1.0.0-beta` and next one will be `v1.0.0-beta.1`
			* `rc` -- this increments the alpha bit of the supplied version. So, first pass it will be `v1.0.0-rc` and next one will be `v1.0.0-rc.1`
			* `final` -- any pre-release flags on your incoming version will be removed, so if your input was `v4.0.0-rc.5`, then output version would be `v4.0.0`

Note: Since `release` Jobs run on [Shared Nodes](), free-form scripting is not allowed. `on_start`, `on_success`, `on_failure`, `on_cancel` and `always` only support `NOTIFY` tag

# Further Reading
* Working with Resources
* Working with Integrations
* [Rolling back deployments](/deploy/rollback)
* Using load balancers in docker based deployments
