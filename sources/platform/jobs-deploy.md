page_main_title: deploy
main_section: Platform
sub_section: Workflow
sub_sub_section: Jobs
page_title: Unified Pipeline Jobs - deploy
page_description: List of supported jobs
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

| Tasks   |      Status    |
|----------|-------------|
| Hotlinking |  Open |
| Further Reading needs thinking|  Open |

# deploy
`deploy` is a Job that deploys a app/service definition ([manifest](jobs-manifest/)) to a [cluster](resource-cluster/). One very powerful concept with this Job is that if you add resources like [params](), [dockerOptions]() and [replicas](), it can override the service definition from the manifest. This is very useful in multi-environment deployments e.g. pushing a Docker based app through Dev, Test and Prod

A new version is created anytime this Job is executed

You can create a `deploy` Job by [adding](jobs-working-wth#adding) it to `shippable.jobs.yml` and these Jobs execute on Shippable provided [Shared Nodes]()

## YML Definition

```
jobs:
  - name: 				<string>			# required
    type: 				deploy				# required
	 on_start:								# optional
	   - NOTIFY: 		<notification resource name>
    steps:
      - IN: 			<cluster>			# required
      - IN: 			<manifest/release> 	# required
      - IN: 			<manifest/release> 	# optional
        force: 			true
      - IN: 			<image>				# optional
      - IN: 			<dockerOptions> 	# optional
      - IN: 			<dockerOptions> 	# optional
        applyTo:
          - 			<image/manifest/release>
          - 			<image/manifest/release>
      - IN: 			<params> 			# optional
      - IN: 			<params> 			# optional
        applyTo:
          - 			<image/manifest/release>
          - 			<image/manifest/release>
      - IN: 			<replicas> 			# optional
      - IN: 			<replicas> 			# optional
        applyTo:
          - 			<image/manifest/release>
          - 			<image/manifest/release>
      - IN: 			<loadBalancer>		#optional
        applyTo:
          - manifest: 	<manifest>  		
            image: 		<image>              
            port: 		<number>              
      - IN: 			<release job> 		# optional
      - IN: 			<any job or resource>  # optional
      - TASK: managed
        deployMethod:	<deploy strategies> # optional
          - script: 	<bash script>		# optional
          - script: 	<bash script>		# optional
	 on_success:							# optional
	   - NOTIFY: 		<notification resource name>
	 on_failure:							# optional
	   - NOTIFY: 		<notification resource name>
	 on_cancel:							# optional
	   - NOTIFY: 		<notification resource name>
	 always:								# optional
	   - NOTIFY:		<notification resource name>
```
A full detailed description of each tag is available on the [Job Anatomy](jobs-working-with#jobanatomy) page

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `manifest`

* **`steps `** -- is an object which contains specific instructions to run this Job
	* `IN` -- You need atleast 1 `image` or 1 `file` as an input. You have can more than one, but they all need to be of the same type. If you use multiple of them, then they will be deployed as a whole. Below is the list of all Resources and Jobs that can be supplied as `IN`
		* [cluster]() -- Required input, location of where you want your services to be deployed
			* `force` -- Optional input, if you need to deploy the `release` even if nothing has changed. Deployment could have been triggered by some other change		
		* [manifest]() -- Required input, you can add 1 or many of it. If you add more than 1, they will be deployed as seperate entities. This means if only 1 of the manifest changes, only that one will be deployed
			* `force` -- Optional input, if you need to deploy the `manifest` even if nothing has changed. Deployment could have been triggered by some other change

		* [release]() -- Required input, you can add 1 or many of it. `release` Jobs could also contain 1 or many `manifests` that have been semantically tagged with a release version number. If you have more than 1 `release` Jobs as `IN` they are deployed as seperately and only the ones that change are deployed

		* [image]() -- Optional input, but invalid if the manifest is not for an image. You can add 1 or many of it and this will override the references to this Resource in all `manifest`/`release` inputs. The `versionName` of this Resources contains the tag, so all references to this `image` in the `manifest` is replaced with the new tag.

		* [dockerOptions]() -- Optional input, but invalid if the manifest is not for an image. It is used to set specific container options. If more than 1 is provided, an UNION operation is performed to create an unique set and applied to all the `image` resources. If you want `dockerOptions` Resource to specific entities use `applyTo` tag

		* [replicas]() -- Optional input, but invalid if the manifest is not for an image. It is used to set number of containers to spin up for all images in a`manifest` or `release`. If you want `replicas` Resource to apply to specific entities use `applyTo` tag

		* [params]() -- Optional input, and it works for both `image` and `file` based Job. It is used to set environment variables during deployment. If more than 1 is provided, an UNION operation is performed to create an unique set and applied to all the `image` or `file` resources in a`manifest` or in a `release`. If you want `params` Resource to apply to specific entities use `applyTo` tag

		* [loadBalancer]() -- Optional input,  applies only to `image` based deploys. If provided the below attributes are required. It is used to attach a load balancer to a particular service and automatically update routing information upon subsequent deployments
			* `manifest` -- Required for loadBalancer. Name of the manifest i.e. service to which the loadBalancer will be attached to

			* `image` -- Required for loadBalancer. Name of the image i.e. container running the Docker image within the manifest.
			* `port` -- Required for loadBalancer. The container port that will be exposed to the load balancer

		* Any other Job or Resource will only participate in triggering `deploy` Job but not in of the processing of it

	* `TASK` -- Optional, but needs to be set to value `managed` is used. It is needed in case you want to control `deployMethod`
		* `deployMethod` -- This is used to control the strategy used to deploy the service. The following are accepted values
			* `blue-green` -- this is the default method of `deploy` Job. The newer version of the the service is brought up and runs side by side with the older version for a brief amount of time. Once the new version is completely up, the older version is stopped. Shippable handles this scenario gracefully and these deployments are zero downtime deployments

			* `upgrade` -- the newer version of the service is deployed and the older version is brought down without waiting for the newer version to be up and running. Depending on how your Container Service handles this scenario, there might be some downtime with this type of deployment. In our experience, Amazon ECS handles this with no downtime, but with Google Container Engine and Joyent Triton, there might be a brief hiccup if the new container takes some time to come up.

			* `replace` -- the old version of the service is brought down before deploying the new version. This type of deployment always has some downtime, depending on how quickly the Container Service is able to stop and start applications. It is mostly intended to be used for deployments to clusters where it's not possible to run more than one instance of the same task in parallel

		* `script` -- Optional input, used to run a script after deployment. But this can be used only if the `deploy` is for a `file` based `manifest` and the `cluster` resource has an integration of type [Node Cluster](int-node-cluster/)

Note: Since `deploy` Jobs run on [Shared Nodes](), free-form scripting is not allowed. `on_start`, `on_success`, `on_failure`, `on_cancel` and `always` only support `NOTIFY` tag

# Further Reading
* Working with Resources
* Working with Integrations
* [Rolling back deployments](/deploy/rollback)
* Using load balancers in docker based deployments
