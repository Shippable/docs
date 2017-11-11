page_main_title: Anatomy of shippable.resources.yml
main_section: Platform
sub_section: Tutorials
sub_sub_section: Workflow
page_title: shippable.resources.yml
page_description: Structure of shippable.resources.yml
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# Anatomy of shippable.resources.yml

[Resources](/platform/workflow/resource/overview/) are the basic building blocks of your pipelines. They typically contain information needed for [jobs](/platform/workflow/job/overview/) to execute and sometimes they also are used to store information produced by a job.

Resources can be defined in `shippable.yml` (the preferred approach) or in `shippable.resources.yml`(the legacy approach) committed to source control in your [Sync repository](/platform/workflow/resource/syncrepo/).

For anatomy of `shippable.yml`, please [read this doc](/platform/tutorial/workflow/shippable-yml).

The anatomy of the resources configuration in `shippable.resources.yml` generally follows the structure below:

```
resources:
  - name: 			<string>
    type: 			<resource type name>
    integration: 	<string>				
    pointer:		<object>
    seed:			<object>
    version:		<object>
```

* **`name`** -- an **alphanumeric** string (underscores are permitted) that makes it easy to infer what the resource represents, e.g., `aws_creds` to represent AWS keys. This name is used to define the IN or OUT entities to jobs.

* **`type`** -- Name of the resource type that this resource is an instance of. [Here](/platform/workflow/resource/overview#types) is a list of all types.

* **`integration`** -- this may be required depending on the resource type. Integrations are an abstraction to 3rd party authentication secrets. For example, webhook token, Docker Hub credentials, and so on.


* **`pointer`** -- section is used when the resource needs to reference something, usually on a third-party provider. For example, a [cluster](/platform/workflow/resource/cluster/) resource has a pointer section which needs cluster name, region name, etc. A [gitRepo](/platform/workflow/resource/gitrepo/) pointer contains `sourceName` to point to the repository along with other pieces of information like `branch`.

* **`seed`** -- section is used to specify a starting value for a resource. This is relevant for resources like [image](/platform/workflow/resource/image/) since this tells Shippable what value to use for this resource when running the connected job for the first time. After the first run, the seed values are ignored. However, you can still use `seed` to reset the resource to start with a new value by changing it and committing the yml. This will create a new resource version as a new starting point.

* **`version`** -- section contains information is not expected to change dynamically during a job run. For example, [dockerOptions](/platform/workflow/resource/dockeroptions/) and [params](/platform/workflow/resource/params/) have several tags under the version section. Any time information changes in this section, a new version of the resource is created.

## Further Reading
* [Integrations](/platform/integration/overview/)
* [Jobs](/platform/workflow/job/overview/)
