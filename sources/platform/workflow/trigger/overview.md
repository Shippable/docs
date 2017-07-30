page_main_title: Overview
main_section: Platform
sub_section: Workflow
sub_sub_section: Triggers
page_title: Unified Pipeline Jobs
page_description: Triggers are used to manually start a Job.
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# TODO
| Tasks   |      Status    |
|----------|-------------|
| Hotlinking |  Open |
| Further Reading needs thinking|  Open |
| Add link to inconsistencies to rSync|  Open |
| Environment variables|  Open |
| Folder Structure|  Open |


# Triggers
Triggers are used to manually start a Job. They are very similar to Resources, the only difference being updating a Resource might not always start the dependent Job/s, but a trigger will always do. 

<img src="/images/platform/configuration/triggerJob.png" alt="Triggering a manual job through a resource" style="width:400px;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

You could also achive this by triggering through UI, but this is for those who like to do it with code.

They are typically used in these cases

* A manual CI build
* User driven Release Management process
* Backups
* Scale the service up or down


## YML Definition
Triggers are defined through the `YML` based code snippets as below

```
triggers:
  - name: 				<string>
    type: 				trigger
	 version:
      counter: 			1
```
* **`name`** -- an **alphanumeric** string (underscores are permitted) that makes it easy to infer what the resource represent e.g. `trig_ci`. This name is used to define the IN entities to Jobs.

* **`type`** -- is always set to trigger

* **`version`** -- changing any value in this tag will fire the trigger, in this case changing counter value will start the Jobs that use this trigger as an `IN`

<a name="adding"></a>
## Adding Triggers
Triggers are defined in a configuration file `shippable.triggers.yml` and this file is added to the root of a source control repository. All user permissions that users have on the repo is carried over to the objects defined in the YML. For example, if user 1 has read access he/she will only have read access to Trigger defined in the repo.


## Deleting Triggers
Deleting Triggers is a 2 step process. Deleting from the YML causes it to be soft deleted and then you will have to manually delete it from SPOG view of the UI. The 2 step process is an insurance policy to prevent accidental deletes. Deleting a Trigger means all historical versions are deleted permanently and this can really mess up your DevOps Assembly Lines as it is a connected interdependent workflow.

Here are the steps to delete a Trigger

1. Delete the Trigger definition from the YML and commit the change to the repo. Automatic sync process will execute and mark the removed Resource as soft deleted. All version data is still available and no data is lost at this stage. If any Jobs are still using this deleted Trigger and they are still active, those Jobs will be marked inconsistent and will not be triggered until fixed
1. Now log into your SPOG, make sure that you have not hidden deleted Objects from your view. All the soft deleted Triggers will appear on the bottom of your SPOG. Right click on each of them and delete. If these Triggers are still being used, then delete option is not presented until you make sure there are no references to the soft deleted Trigger. Once you delete from the SPOG, all data is permanently destroyed


# Further Reading
* Working with Resources
* Working with Integrations
* Jobs
