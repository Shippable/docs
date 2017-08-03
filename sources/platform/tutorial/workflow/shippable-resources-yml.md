page_main_title: Anatomy of shippable.resources.yml
main_section: Platform
sub_section: Tutorials
sub_sub_section: Workflow
page_title: shippable.resources.yml
page_description: How to add, delete and update resources
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# Anatomy of shippable.resources.yml

Shippable DevOps Platform leverages a declarative syntax for CRUD operations on Resources. A YML `shippable.resources.yml` config file is used to define them. It is added to your the root of your source code repo just like any other piece of code and the platform recognizes the changes you make to it through webhooks and sync the definitions.

The anatomy of the resources configuration generally follows the structure below

```
resources:
  - name: 			<string>
    type: 			<resource type name>
    integration: 	<string>				
    pointer:		<object>
    seed:			<object>
    version:		<object>
```

* **`name`** -- an **alphanumeric** string (underscores are permitted) that makes it easy to infer what the resource represent e.g. `aws_creds` to represent AWS keys. This name is used to define the IN or OUT entities to Jobs.

* **`type`** -- Name of the resource type that this resource is an instance of. [Here](/platform/workflow/resource/overview#types) is a list of all types

* **`integration`** -- this may be required depending on the resource type. Integrations are an abstraction to 3rd party authentication secrets For e.g. webhook token, Docker hub credentials and so on

* **`pointer`** -- is an object that stores the information the resource contains. This usually does not change and every unique entity is represented by a resource. For example, in case of `gitRepo` resource pointer will contain `sourceName` that points to the repo name along with other pieces of information like `branch` etc.

* **`seed`** -- is an object that allows users to set an initial version for the resource. For e.g. the initial tag of a docker image resource. When new versions are created, the initial seed values are ignored. If you want to reset the resource to start with a new seed, change the seed in the YML and when sync process executes, it will create a new version on top of all versions as a new starting point

* **`version`** -- is an object that allows you to set the version of resource that dont change dynamically. For example, [dockerOptions](/platformworkflow/resource/dockeroptions/) have several tags under the `version` section. Any time the information changes in the YML, a new version of the resource is created

# Further Reading
* Working with Resources
* [Integrations](/platform/integration/overview/)
* [Jobs](/platform/workflow/job/overview/)
