page_main_title: Overview
main_section: Platform
sub_section: Workflow
sub_sub_section: Resources
page_title: DevOps Assembly Line Resources
page_description: List of supported resources
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# Resources
Resources are the basic building blocks of your pipelines. They typically contain information needed for [jobs](/platform/workflow/job/overview/) to execute and sometimes they also are used to store information produced by a job.

A key characteristic of resources is that they can be versioned. A specific version of a resource is immutable, i.e. it returns the same result every single time it is fetched.

They are predominantly used for the following reasons:

* Provide 3rd party secrets to the job runtime so that environment is configured with the right level of access rights to connect to external services. E.g., integration or cliConfig resources can be used to provide credentials safely.
* Supply information to set the context for the jobs to execute. E.g., params resources commonly store environment variables and version resources keep track of changing versions.
* A trigger to changes to the repo on the source control system. E.g., a gitRepo, ciRepo, or syncRepo can trigger jobs whenever the source code is updated.
* A trigger to execute a job. E.g., a time resource will trigger a job at set times.
* Act as an entity to store stateful information produced during the execution of a job. E.g., state resources are commonly used to share information between jobs.  A job will also often update an image resource with a new tag.

## Definition
Resources can be defined using declarative YML-based code snippets as below:

```
resources:
  - name:               <string>
    type:               <resource type name>
    integration:        <string>
    pointer:            <object>
    seed:               <object>
    version:            <object>
```
For more information, read [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml).

## Versions
A key strength of a resource is that it is versioned. This is critical if you want to be able to roll back, upgrade, or pin the resource to a particular point of time. User-defined key-value pairs can be stored as part of resource versions.

<a name="types"></a>
## Types
These are the types of resources that Shippable Workflow supports:

| Resource Type   |      Description    |
|----------|-------------|
| [ciRepo](/platform/workflow/resource/cirepo/) | Represents a CI project for a git repo |
| [cliConfig](/platform/workflow/resource/cliconfig/) | Configuration information for command-line tools |
| [cluster](/platform/workflow/resource/cluster/) | Cluster defines a collection of servers |
| [dockerOptions](/platform/workflow/resource/dockeroptions/) | Configuration information for a container |
| [file](/platform/workflow/resource/file/) | Location of a file |
| [gitRepo](/platform/workflow/resource/gitrepo/) | Represents a source code repo |
| [image](/platform/workflow/resource/image/) | Represents a package on a registry |
| [integration](/platform/workflow/resource/integration/) | Encrypted connection information to 3rd party services |
| [loadBalancer](/platform/workflow/resource/loadbalancer/) | Represents load-balancer resources offered by cloud providers |
| [notification](/platform/workflow/resource/notification/) | Resource to send alerts from the workflow |
| [params](/platform/workflow/resource/params/) | Environment variables used to prime your job runtime |
| [replicas](/platform/workflow/resource/replicas/) | Number of copies of the service to run |
| [syncRepo](/platform/workflow/resource/syncrepo/) | Used to define DevOps Assembly Lines |
| [time](/platform/workflow/resource/time/) | Trigger a job at a specific day and time |
| [version](/platform/workflow/resource/version/) | Semantic versions |

If you need a resource that is not listed above, send us an email at [support@shippable.com](mailto:support@shippable.com).

## Further Reading
* [Working with Resources](/platform/tutorial/workflow/crud-resource)
* [Jobs](/platform/workflow/job/overview)
* [Integrations](/platform/integration/overview)
