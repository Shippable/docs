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

## YML Definition

Resources are defined in `shippable.yml` as shown below:

```
resources:
  - name:               <string>
    type:               <resource type name>
    integration:        <string>
    pointer:            <object>
    seed:               <object>
    version:            <object>
```
For an explanation of each field, read the [resources section of the anatomy of shippable.yml](/platform/tutorial/workflow/shippable-yml/#resources) page.

## Resource structure

<img src="/images/platform/resources/resource-description.png" alt="DevOps resources">

A resource consists of the following components:

* `resourceID` which uniquely identifies the resource. This is unique across the entire platform and is auto-generated when a resource is added.
* `versionNumber` which is created every time the resource is updated, resulting in a new versionNumber
* `versionName` which is an optional user-defined name.
* `meta` which is a json object containing the resource definition and information. For example, if you have a cluster resource, the pointer information is stored in this json object.
* `state` which stores user-defined key-value pairs, if any, for the resource. For the `state` resource, this can also contain files in addition to key-value pairs
* `path` which stores data that was pulled by the resource. For example, for a `gitRepo` resource, this contains a clone of the Git repository.

To understand how you can access the above components through your job scripts, read our tutorial on [Accessing resource data](/platform/tutorial/workflow/access-resource-data/)

## Resource versioning

All resources are versioned. A new resource version is created in two ways:

* When you update the resource definition in `shippable.yml`
* When a job updates an `OUT` resource

This is critical if you want to be able to roll back, upgrade, or [pin the resource](/platform/tutorial/workflow/crud-job/#pin) to a particular point of time.

<a name="types"></a>
## Resource types

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
