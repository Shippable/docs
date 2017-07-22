page_main_title: cluster
main_section: Platform
sub_section: Resources
page_title: Unified Pipeline Resources - cluster
page_description: List of supported resources
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# TODO
| Tasks   |      Status    | 
|----------|-------------|
| Hotlinking |  Open | 
| Further Reading needs thinking|  Open |
| Need to pointer for each integration type|  Open |

# cluster
`cluster` is used to represent a set of machines or a container orchestration system. It used to predominantly deploy services/apps to it and in some case it can also be used to run certain maintenance activities on the cluster as a whole. 

You can create an cluster resource by [adding](resources-working-wth#adding) it to `shippable.resources.yml`

```
resources:
  - name: 			<string>
    type: 			cluster
    integration: 	<string>
    pointer:		<object>
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `cluster`

* **`integration`** -- name of the integration. Currently supported integrations 
	* [AWS Elastic Container Service (ECS)](int-amazon-ecs/)
	* [Kubernetes](int-kubernetes/)
	* [Google Container Engine (GKE)](int-gke/)
	* [Docker Cloud](int-docker-cloud/)
	* [Docker Datacenter](int-docker-datacenter/)
	* [Microsoft Azure Container Service](int-azure-dcos)
	* Node Cluster
	* AWS

* **`pointer`** -- is an object which contains integration specific properties
	* in case of AWS 
	
	```
	    pointer:
	      region: <aws region for e.g us-east-1, us-west-1 etc.>
	      sourceName: contains ECS cluster name
	```

	* in case of GKE

	```
	    pointer:
	      region: <aws region for e.g us-east-1, us-west-1 etc.>
	      sourceName: <cluster of type Google Container Engine>
	      namespace: optional if you want to specify which namespace you want to deploy to
	```

	* Joyent
	* Azure
	* Custom kubernetes


# Used in JOBs
This resource is used as an IN for the following jobs

* deploy
* runCLI
* runSH

# Further Reading
* GKE integration
* AWS integration
* Azure
* Docker
* deploy job
* runSH
