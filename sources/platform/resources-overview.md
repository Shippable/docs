page_main_title: Overview
main_section: Platform
sub_section: Resources
page_title: Unified Pipeline Resources
page_description: List of supported resources
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# TODO
| Tasks   |      Status    | 
|----------|-------------|
| Hotlinking |  Open | 
| Further Reading needs thinking|  Open |

# Resources
Resources are the basic building blocks of your pipelines. They are inputs for and sometimes outputs from the executable units of your pipeline, aka [Jobs](/platform/jobs-overview/).

A key characteristic of resources is that they can be versioned and are immutable. A specific version of a resource is idempotent. i.e. it returns the same result every single time it is fetched. For e.g., git commit sha is always idempotent.

## Definition
Resources can be defined using declarative `YML` based code snippets as below

```
resources:
  - name: 				<string>
    type: 				<resource type name>
    integration: 		<string>
    pointer:			<object>
    seed:				<object>
    version:			<object>
```
For more information, read [Working with Resources](/platform/resources-working-with/)

## Versions
A key strength of a resource is that it is versioned. Any change made to the resource definition is stored as a new version with a unique identifier. This is critical if you want to be able to roll back, upgrades or pin the resource to a particular point of time. User-defined key-value pairs can be stored as part of resource versions. 

<a name="types"></a>
## Types
These are the types of resources that Shippable Workflow supports:

| Resource Type   |      Description    | 
|----------|-------------|
| [ciRepo](resource-cirepo/) | Represents a CI project for a git repo | 
| [cliConfig](resource-cliconfig/) | Configuration information for command-line tools |
| [cluster](resource-cluster/) | Cluster defines a collection of servers |
| [dockerOptions](resource-dockeroptions/) | Configuration information for a container |
| [file](resource-file/) | Location of a file |
| [gitRepo](resource-gitrepo/) | Represents a source code repo |
| [image](resource-image/) | Represents a package on a registry |
| [integration](resource-integration/) | Encrypted connection information to 3rd party services |
| [loadBalancer](resource-loadbalancer/) | Represents load-balancer resources offered by cloud providers |
| [notification](resource-notification/) | Resource to send alerts from the workflow |
| [params](resource-params/) | Environment variables used to prime your job runtime |
| [replicas](resource-replicas/) | Number of copies of the service to run |
| [syncRepo](resource-gitrepo/) | Used to define DevOps Assembly Lines |
| [time](resource-time/) | Trigger a job at a specific day and time |
| [version](resource-version/) | Semantic versions |

If you need a resource that is not listed above, send us an email at [support@shippable.com](mailto:support@shippable.com)

## Further Reading
* [Working with Resources](/platform/resources-working-with/)
* How to store custom key-values in resource versions
* Working with Integrations
* Jobs
