page_main_title: Overview
main_section: Platform
sub_section: Tutorials
sub_sub_section: Resources
page_title: DevOps Assembly Line Resources
page_description: How to add, delete and update resources
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# TODO
| Tasks   |      Status    |
|----------|-------------|
| Hotlinking |  Open |
| Further Reading needs thinking|  Open |
| Need to update migration|  Open |

# Working with Resources
Shippable DevOps Platform leverages a declarative syntax for CRUD operations on Resources. A YML `shippable.resources.yml` config file is used to define them. It is added to your the root of your source code repo just like any other piece of code and the platform recognizes the changes you make to it through webhooks and sync the definitions.

## Anatomy of shippable.resources.yml
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

* **`type`** -- Name of the resource type that this resource is an instance of. [Here](workflow/resource/overview#types) is a list of all types

* **`integration`** -- this may be required depending on the resource type. Integrations are an abstraction to 3rd party authentication secrets For e.g. webhook token, Docker hub credentials and so on. Get more infromation [here](int-overview/)

* **`pointer`** -- is an object that stores the information the resource contains. This usually does not change and every unique entity is represented by a resource. For example, in case of `gitRepo` resource pointer will contain `sourceName` that points to the repo name along with other pieces of information like `branch` etc.

* **`seed`** -- is an object that allows users to set an initial version for the resource. For e.g. the initial tag of a docker image resource. When new versions are created, the initial seed values are ignored. If you want to reset the resource to start with a new seed, change the seed in the YML and when sync process executes, it will create a new version on top of all versions as a new starting point

* **`version`** -- is an object that allows you to set the version of resource that dont change dynamically. For example, [dockerOptions](workflow/resource/dockeroptions/) have several tags under the `version` section. Any time the information changes in the YML, a new version of the resource is created

<a name="adding"></a>
## Adding Resources
Resources are defined in a configuration file `shippable.resources.yml` and this file is added to the root of a source control repository. All user permissions that users have on the repo is carried over to the objects defined in the YML. For example, if user 1 has read access he/she will only have read access to Resources defined in the repo.

Once the Resources are defined and added to the repo, you will have to connect it to SPOG by creating a `syncRepo` using the UI. Detailed step by step instructions are [here ](/platform/workflow/resource/syncrepo)

After adding a `syncRepo`, our DevOps Assembly Lines are watching for changes (Resource adds, edits or deleted) through source control webhooks. YML changes are automatically synced and they are reflected in the SPOG immediately

## Migrating a Resource from one YML to another
There are some situations where you might need to reorganize where your Resources are defined. If you delete and recreate, you will lose all the historical versions. If history is important, migration might be a better alternative

Here are the steps to migrate

1.

## Deleting Resources
Deleting Resources is a 2 step process. Deleting from the YML causes it to be soft deleted and then you will have to manually delete it from SPOG view of the UI. The 2 step process is an insurance policy to prevent accidental deletes. Deleting a Resource means all historical versions are deleted permanently and this can really mess up your DevOps Assembly Lines as it is a connected interdependent workflow.

Here are the steps to delete a Resource

1. Delete the Resource definition from the YML and commit the change to the repo. Automatic sync process will execute and mark the removed Resource as soft deleted. All version data is still available and no data is lost at this stage. If any Jobs are still using this deleted Resource and they are still active, those Jobs will be marked inconsistent and will not be triggered until fixed
1. Now log into your SPOG, make sure that you have not hidden deleted Objects from your view. All the soft deleted Resources will appear on the bottom of your SPOG. Right click on each of them and delete. If these Resources are still being used, then delete option is not presented until you make sure there are no references to the soft deleted Resource. Once you delete from the SPOG, all data is permanently destroyed

## Deleting all resources at the same time
If you right click on the `syncRepo` resource you added to create the assembly lines and delete it from the UI, all the resources defined in the YML file will all be marked soft-deleted along with the syncRepo resource. Now hard delete the syncRepo resource as any other resource, Shippable will delete all the resources automatically now. Only the syncRepo resource can be soft-deleted from the UI. All other resources needs to be managed from the YML.


<a name="integration"></a>
## Integrations
Shippable is designed to separate out sensitive authentication information from your resources yml.

This is done to ensure there are no encryption/decryption or permissions issues when you move things around i.e. moving resource definitions from one repository to another, or if the person who created the pipeline is no longer the member of the team etc. Integrations are specified as a property in the YML definition for resources that connect to third party services.

To learn how to create integrations and use them in your ymls, [click here](int-overview/)


# Further Reading
* Working with Resources
* Working with Integrations
* Jobs
