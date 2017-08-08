page_main_title: Anatomy of shippable.triggers.yml
main_section: Platform
sub_section: Tutorials
sub_sub_section: Workflow
page_title: shippable.triggers.yml
page_description: Structure of shippable.triggers.yml
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# Anatomy of shippable.triggers.yml

Shippable DevOps Platform leverages a declarative syntax for CRUD operations on Resources. A YML `shippable.triggers.yml` config file is used to define them. It is added to your the root of your source code repo just like any other piece of code and the platform recognizes the changes you make to it through webhooks and sync the definitions.

The anatomy of the triggers configuration generally follows the structure below

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

# Further Reading
* [Integrations](/platform/integration/overview/)
* [Jobs](/platform/workflow/job/overview/)
