main_section: Reference
sub_section: Resources
page_title: Unified Pipeline Resources - cluster
page_description: List of supported resources
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# cluster
This resource type is used to specify a cluster in any Container Service to which you can deploy your application or service.

**A `cluster` resource is an `IN` resource for [a deploy job](job-deploy/). Please note that the resource just points to an existing cluster and does not create a cluster.**


##Configuration reference

You can define a cluster resource by adding it to `shippable.resources.yml`
```
resources:
  - name: <string>                              #required
    type: cluster                               #required
    integration: <integration name>             #required
    pointer:
      sourceName: "<string>"                    #required
      region: "<string>"                        #required for some container services
      namespace: "<string>"                     #optional
```

* resource `name` should be an easy to remember text string. This will appear in the visualization of this resource in the SPOG view. It is also used to refer to this resource in the `shippable.jobs.yml`. If you have spaces in your name, you'll need to surround the value with quotes, however, as a best practice we recommend not including spaces in your names.

* `type` is always set to 'cluster'.

* `integration` should be the name of the Subscription Integration you create for you subscription that leverages the credentials you set up in Account Integrations to connect to the Container Service of your choice. To learn how to create integrations for a specific Container Service, please select from the list below:
	  * [AWS Elastic Container Service (ECS)](int-amazon-ecs/)
    * [Kubernetes](int-kubernetes/)
	  * [Google Container Engine (GKE)](int-gke/)
    * [Docker Cloud](int-docker-cloud/)
    * [Docker Datacenter](int-docker-datacenter/)
	  * Microsoft Azure Container Service(coming soon)

* `sourceName` is the name of the cluster on the Container Service that is represented by this resource. Specify this value in double quotes.

* `region` is the region where the cluster resides, e.g. "us-east-1". Specify this value in double quotes. This is required for the following types of integrations and will take
in the values that the provider supports:
    * AWS Elastic Container Service (ECS)
    * Google Container Engine (GKE)
    * Joyent Triton
    * Microsoft Azure Container Service (ACS)

* `namespace` is an option for deployments to Google Container Engine (GKE). If a namespace is specified, deployments will be made to that namespace. Otherwise deployments will be in the default namespace.
