page_main_title: deploy
main_section: Platform
sub_section: Workflow
sub_sub_section: Jobs
page_title: Unified Pipeline Jobs - deploy
page_description: List of supported jobs
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# deploy
`deploy` is a job that deploys an app/service definition ([manifest](/platform/workflow/job/manifest)) to a [cluster](/platform/workflow/resource/cluster). One very powerful concept with this job is that if you add resources like [params](/platform/workflow/resource/params), [dockerOptions](/platform/workflow/resource/dockeroptions) and [replicas](/platform/workflow/resource/replicas), it can override the service definition from the manifest. This is very useful in multi-environment deployments, e.g., pushing a Docker-based app through Dev, Test, and Prod.

A new version is created anytime this job is executed.

You can create a `deploy` job by [adding](/platform/tutorial/workflow/crud-job#adding) it to `shippable.jobs.yml`. These jobs execute on Shippable provided runtime.

## YML Definition

```
jobs:
  - name:               <string>                  # required
    type:               deploy                    # required
    stabilityDuration:  <0-300 seconds>           # optional, blueGreen only
    method:             <deploy strategies>       # optional
    workflow:           <workflow options>        # optional
    on_start:                                     # optional
      - NOTIFY:         <notification resource name>
    steps:
      - IN:             <cluster>                 # required
      - IN:             <manifest/release/deploy> # required
      - IN:             <manifest/release/deploy> # optional
        force:          true
      - IN:             <dockerOptions>           # optional
      - IN:             <dockerOptions>           # optional
        applyTo:
          -             <image/manifest>
          -             <image/manifest>
      - IN:             <params>                  # optional
      - IN:             <params>                  # optional
        applyTo:
          -             <image/manifest>
          -             <image/manifest>
      - IN:             <replicas>                # optional
      - IN:             <replicas>                # optional
        applyTo:
          -             <image/manifest>
          -             <image/manifest>
      - IN:             <loadBalancer>            # optional
        applyTo:
          - manifest:   <manifest>
            image:      <image>         
            port:       <number>
      - IN:             <any job or resource>     # optional
      - TASK:                                     # optional
        - script:       <bash script>             # optional
        - script:       <bash script>             # optional
     on_success:                                  # optional
       - NOTIFY:        <notification resource name>
     on_failure:                                  # optional
       - NOTIFY:        <notification resource name>
     on_cancel:                                   # optional
       - NOTIFY:        <notification resource name>
     always:                                      # optional
       - NOTIFY:        <notification resource name>
```
A full detailed description of each tag is available on the [Job Anatomy](/platform/tutorial/workflow/shippable-jobs-yml) page

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `deploy`
* **`stabilityDuration`** -- Optional. The amount of time in seconds (0-300) that a new service created in a blueGreen deployment should be stable before marking the deployment as successful.  Stable means that the desired number of replicas matches the number that are actually running in the cluster. This setting is ignored if deployment method is not blueGreen.

* **`method`** -- Optional. This is used to control the strategy used to deploy the service. The following are accepted values:
    * `blueGreen` -- This is the default method. The newer version of the the service is brought up and runs side by side with the older version for a brief amount of time. Once the new version is completely up, the older version is stopped. Shippable handles this scenario gracefully and these deployments are zero downtime deployments.

    * `upgrade` -- If possible, the deployment is updated in-place.  Otherwise, the newer version of the service is deployed and the older version is brought down without waiting for the newer version to complete its deployment.  Ideally this will not create downtime, but the exact behavior depends on the cluster provider being used.  See our [deploy scenarios](http://docs.shippable.com/deploy/why-deploy/) for some details about the upgrade workflow for particular providers.

    * `replace` -- The old version of the service is brought down before deploying the new version. This type of deployment always has some downtime, depending on how quickly the container service is able to stop and start applications. It is mostly intended to be used for deployments to clusters with limited resources, where it's not possible to run more than one instance of the same task in parallel.

* **`workflow`** -- Optional. This may be set to either `serial` (default) or `parallel`.  If it is `parallel`, manifests will be deployed in parallel.

* **`steps`** -- is an object which contains specific instructions to run this job
    * `IN` -- You need one `cluster` and at least one `manifest`-based input (`manifest`, `release`, or `deploy`). You have can have more than one of these and if you use multiple, each `manifest` will be deployed as a separate service. Below is the list of all resources and jobs that can be supplied as `IN`.
        * [cluster](/platform/workflow/resource/cluster) -- Required input, location where you want your services to be deployed.

        * [manifest](/platform/workflow/job/manifest) -- You can add zero or more of these. If you add more than one, they will be deployed as separate entities. This means if only one of the manifests changes, only that one will be deployed.
            * `force` -- (default `false`) Optional input. Set to `true` if you need to deploy the `manifest` even when it hasn't changed (deployment could have been triggered by some other change).

        * [release](/platform/workflow/job/release) -- You can add zero or more of these. `release` jobs can also contain zero or more `manifests` that have been semantically tagged with a release version number. If you have more than one `release` job as `IN` they are deployed seperately and only the ones that change are deployed.
            * `force` -- (default `false`) Optional input. Set to `true` if you need to deploy the `release` manifests even if nothing has changed.

        * [deploy](/platform/workflow/job/deploy) -- You can add zero or more of these. `deploy` jobs can be `IN`s to other deploy jobs.  They contain a list of `manifests` that were deployed.  This same list can be augmented with new `params` or `dockerOptions` and deployed in a new job.
            * `force` -- (default `false`) Optional input. Set to `true` if you need to deploy the `deploy` manifests even if nothing has changed.

        * [dockerOptions](/platform/workflow/resource/dockeroptions) -- Optional input, but invalid if the manifest is not for an image. It is used to set specific container options. If more than one is provided, a UNION operation is performed to create an unique set and applied to all the `image` resources. Items are applied in the order they are provided in `steps`. If you want a `dockerOptions` resource to modify specific entities, use an `applyTo` tag.

        * [replicas](/platform/workflow/resource/replicas) -- Optional input, but invalid if the manifest is not for an image. It is used to set number of containers to spin up for all images in a `manifest` or `release`. If you want a `replicas` resource to apply to specific entities, use an `applyTo` tag.

        * [params](/platform/workflow/resource/params) -- Optional input, and it works for both `image` and `file` based jobs. It is used to set environment variables during deployment. If more than one is provided, an UNION operation is performed to create an unique set and applied to all the `image` or `file` resources in a`manifest`, `release`, or `deploy` input. Items are applied in the order they are provided in `steps`. If you want a `params` resource to apply to specific entities, use an `applyTo` tag.

        * [loadBalancer](/platform/workflow/resource/loadbalancer) -- Optional input,  applies only to `image` based deploys. If provided, the below attributes are required. It is used to attach a load balancer to a particular service and automatically update routing information upon subsequent deployments.
            * `manifest` -- Required for loadBalancer. Name of the manifest, i.e., service to which the loadBalancer will be attached.
            * `image` -- Required for loadBalancer. Name of the image, i.e., container running the Docker image within the manifest.
            * `port` -- Required for loadBalancer. The container port that will be exposed to the load balancer.

        * Any other job or resource will only participate in triggering the `deploy` job, not in the processing of it.

    * `TASK` -- Optional, this should only be used for scripts following deployment of files to a [Node Cluster](/platform/integration/node-cluster/).
        * `script` -- Optional input. This is used to run a script after deployment, but this can be used only if the `deploy` is for a `file`-based `manifest` and the `cluster` resource has an integration of type [Node Cluster](/platform/integration/node-cluster/).


* **`on_start`**, **`on_success`**, **`on_failure`**, **`on_cancel`**, **`always`** are used to send notifications for those events. You need to provide a [**notification**](/platform/workflow/resource/notification) resource pointing to a provider like Slack, Email, IRC, Hipchat, etc.

**Note:** Since `deploy` jobs are managed, free-form scripting is not allowed. `on_start`, `on_success`, `on_failure`, `on_cancel` and `always` only support `NOTIFY` tags.

## Further Reading
* [jobs](/platform/workflow/job/overview)
* [resources](/platform/workflow/resource/overview)
