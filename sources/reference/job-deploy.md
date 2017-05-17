page_main_title: deploy
main_section: Reference
sub_section: Jobs
page_title: Unified Pipeline Jobs - deploy
page_description: List of supported jobs
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc


# deploy
This job is used to deploy [a manifest](job-manifest/) to [a cluster](resource-cluster/) on any [supported Container Service](integrations-overview/). As a part of the deployment, you can include any necessary environment parameters.

The definition of a `deploy` job should be included in your `shippable.jobs.yml`.

## Single manifest deploy

If your job takes a single manifest as an input, it is a single manifest deployment.

<img src="../../images/reference/jobs/deploy/singleManifestDeploy.png" alt="Single package manifest" style="width:500px;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

A single manifest deploy is configured in `shippable.jobs.yml` as shown below:

```
jobs:
  - name: <string>                     		#required
    type: deploy                           	#required
    steps:
      - IN: <manifest>                			#required
      - IN: <cluster>                      	#required
      - IN: <dockerOptions>						#optional override
      - IN: <params>                       	#optional override
      - IN: <replicas>							#optional override
```

* `name` should be an easy to remember text string. This will appear in the visualization of this job in the SPOG view.
* `type` is always set to deploy
* You will need one `manifest` job as an input. This tells us what images are to be deployed. Please read documentation on how to [define a manifest](job-manifest/) in your jobs yml.
* `cluster` is also a required input resource. This gives us information about where you want your manifest to be deployed, i.e. your deployment target. Read more on [cluster resource](resource-cluster/).

Additional overrides:
In addition to the inputs above, you can provide `dockerOptions`, `params`, and `replicas` as inputs to your deploy job. If you have defined these resources in your input manifest, you do not need to define them again here. If provided in both manifest and deploy, the values set in deploy override any common options set in your manifest.

* `dockerOptions` is an optional input resource and customizes the memory, cpu shares, port mappings, etc. Read more on [dockerOptions resource](resource-dockeroptions/). If your input manifest also has `dockerOptions`, defining it here will override any common options set in your manifest. You can have one or many dockerOptions resources as inputs.
* `params` is an optional input resource and adds a list of environment params required for the deployment. This can include any key value pairs and lets you override design time configuration for the manifest. Read more on [params resource](resource-params/). You can have one or many params resources as inputs.
* `replicas` is an optional input resource that lets you scale the number of instances of your manifest that you want to deploy. The default value for replicas is 1. Read more on [replicas resource](resource-replicas/).


## Multi manifest deploy

If your job deploys more than one manifest, it is a multi manifest deployment.

<img src="../../images/reference/jobs/deploy/multiManifestDeploy.png" alt="Single package manifest" style="width:500px;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

A multi manifest deploy is configured in `shippable.jobs.yml` as shown below:

```
jobs:
  - name: <string>                     		#required
    type: deploy                           	#required
    steps:
      - IN: manifest-1                        	#required
      - IN: manifest-2                        	#optional
      - IN: <cluster>                      	#required
      - IN: <params>                       	#optional override
        applyTo:
          - image-2
      - IN: <dockerOptions>						#optional override
        applyTo:
          - manifest-2
      - IN: <replicas>							#optional override
        applyTo:
          - manifest-2
```

* `name` should be an easy to remember text string. This will appear in the visualization of this job in the SPOG view.
* `type` is always set to deploy
* You can add any number of `manifest` jobs as an input for this job. This tells us what images are to be deployed. Please read documentation on how to [define a manifest](job-manifest/) in your jobs yml.
* `cluster` is also a required input. This gives us information about where you want your manifest to be deployed, i.e. your deployment target. All manifests from your deploy job will be deployed to a single cluster. Read more on [cluster resource](resource-cluster/).

Additional overrides:
In addition to the inputs above, you can provide `dockerOptions`, `params`, and `replicas` as inputs to your deploy job. If you have defined these resources in your input manifest, you do not need to define them again here. If provided in both manifest and deploy, the values set in deploy override any common options set in your manifest.

* `dockerOptions` is an optional tag and customizes the memory, cpu shares, port mappings, etc. Read more on [dockerOptions resource](resource-dockeroptions/).
	* By default, values specified in dockerOptions apply to all images in all manifests. If you want the custom values to only apply to specific manifests or images, use the `applyTo` tag and provide a list of manifests/images you want to apply them to.
* `params` is an optional input and adds a list of environment params required for the deployment. This can include any key value pairs and lets you override design time configuration for the manifest. Read more on [params resource](resource-params/).
	* 	By default, values specified in params applies to all manifests. Use the `applyTo` tag and provide a list to apply params only to specific manifests.
* `replicas` is an optional input resource that lets you scale the number of instances of your manifest that you want to deploy. The default value for replicas is 1. Read more on [replicas resource](resource-replicas/).
	* 	By default, value specified in replicas applies to all manifests. Use the `applyTo` tag and provide a list to apply replicas only to specific manifests.

## Cascading deployments
Most teams need to create a deployment workflow i.e. move code from from test to production.
You might also want to turn off automatic deployments to production.

<img src="../../images/reference/jobs/deploy/daisyChainDeploys.png" alt="Daisy chaining deploy jobs" style="width:800px;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

To daisy chain 2 deployment jobs, use the snippet below as an example:

```
jobs:
  - name: deploy-2	                     		#required
    type: deploy                              	#required
    steps:
      - IN: deploy-1                   		#required, type deploy
        switch: off                        	#optional
      - IN: <cluster>                      	#required
      - IN: <params>                       	#optional override
        applyTo:
          - image-2
      - IN: <dockerOptions>						#optional override
        applyTo:
          - manifest-2
      - IN: <replicas>							#optional override
        applyTo:
          - manifest-1
```

Instead of taking a manifest job as an input, this uses another `deploy` job as an input.

This means that by default, anytime the input deploy job finishes executing, it will trigger this job automatically. You can change this behavior with the `switch: off` setting as shown in the snippet above. If switch is turned off, deploy-2 is not automatically triggered after deploy-1 finishes. You can go to the Shippable SPOG view for Pipelines and run the job manually. You can also add a trigger resource to run the job manually without going to the Shippable UI.
Read more [on triggers here](shippable-triggers-yml/).

## Deployment types
Shippable supports 3 types of deployments:

* The first type is **blue-green** deployments, where the newer version of the application or service is brought up and runs side by side with the older version for a brief amount of time. Once the new version is completely up, the older version is stopped. Shippable handles this scenario gracefully and these deployments are zero downtime deployments.

By default, deployments to Amazon ECS, Google Container Engine and Joyent Triton are blue-green deployments.

* The second type is **upgrade** deployments where we deploy the newer version of the service and bring down the older version without waiting for the newer version to be up and running. Depending on how your Container Service handles this scenario, there might be some downtime with this type of deployment. In our experience, Amazon ECS handles this with no downtime, but with Google Container Engine and Joyent Triton, there might be a brief hiccup if the new container takes some time to come up.

* The third type is **replace** deployments where we bring down the old version and wait until the application is stopped successfully before deploying the new version. This type of deployment always has some downtime, depending on how quickly the Container Service is able to stop and start applications. It is mostly intended to be used for deployments to clusters where it's not possible to run more than one instance of the same task in parallel due to a limited number of machines.

If you want to specify upgrade or replace deployment instead of the default blueGreen, you can do it in your `shippable.jobs.yml`:

```
jobs:
  - name: <job name>
    type: deploy
    steps:
      #first include all the IN inputs
      - TASK: managed
        deployMethod: upgrade | replace | blueGreen
```

Please make sure the `TASK` tag is the last one in the list of steps.

##Attaching a Load Balancer
As part of your job, you can choose to deploy an image in your manifest behind a load balancer. Please note that this option currently only works with AWS Classic and Application Load Balancers. (Google Container Engine load balancer-type services can be created using a [provision](job-provision/) job.) Also, the load balancer must be already created on AWS and then configured on Shippable. We do not handle creation of the load balancer as part of deploy jobs.

```
jobs:
  - name: <job name>
    type: deploy
    steps:
      - IN: <manifest>                        #required
      - IN: <cluster>                         #required
      - IN: <loadBalancer>                    #optional
        applyTo:
          - manifest: <manifest name>         #required for load balancer
            image: <image>                    #required for load balancer
            port: <number>                    #required for load balancer
```

* `loadBalancer` should be the name of your [loadBalancer resource](resource-loadbalancer/) as defined in your shippable.resources.yml
* In the `applyTo` section, you need the following:
    * `manifest` should be the manifest containing the image you want to connect your load balancer to
    * `image` should be the image resource name in the manifest
    * `port` is the containerPort to be exposed

## Forcing deployments for static tags

Shippable assumes that your images are versioned with unique names (we recommend tagging with `$BRANCH.$BUILD_NUMBER`). When your deploy job is triggered, it will deploy the latest version of the IN manifests if something has changed in the manifest, i.e. image tag, dockerOptions settings, or params.

If you tag your images with static tags like `latest` or `$BRANCH_NAME`, Shippable cannot detect if the underlying image has changed, and hence it is not deployed. To force deployments in this scenario, you need to set a flag in your deploy job that tells Shippable to deploy the image each time the job is triggered, regardless of whether anything has changed in the manifest.

You can set the `force` flag for a manifest in your deploy job as shown below:

```
jobs:
  - name: <job name>
    type: deploy
    steps:
      - IN: <manifest>                        #required
        force: true
      - IN: <cluster>                         #required
```

## Executing scripts after deployment
This feature is supported only for `deploy` jobs obeying the following conditions.

* Must have a [cluster resource](resource-cluster/) with [Node Cluster integration](int-node-cluster/)
* Must have a [manifest](job-manifest/) with a [file resource](resource-file/).

After the file is deployed to the node cluster successfully, one or more scripts can be run on the nodes by defining a `TASK` in the deploy job.

```
jobs:
  - name: <job name>
    type: deploy
    steps:
      - IN: <manifest>            # with file resource
      - IN: <cluster>             # with Node Cluster integration
      - TASK:
          - script: <bash script>
          - script: <bash script>
```

The above job will transfer the files mentioned in `manifest` and execute the scripts mentioned in `TASK` sequentially.

## Rolling back your deployments
As much as we want our code to work perfectly, there are situations when major bugs are discovered in a release after it is already deployed to an environment. In such cases, rolling back the deployment is the best way to recover while you fix the problems.

 Check out our [tutorial on rolling back deployments](/deploy/rollback) to handle this.
