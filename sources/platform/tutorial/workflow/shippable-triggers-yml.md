page_main_title: Anatomy of shippable.triggers.yml
main_section: Platform
sub_section: Tutorials
sub_sub_section: Workflow
page_title: shippable.triggers.yml
page_description: Structure of shippable.triggers.yml
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# Anatomy of shippable.triggers.yml

## Deprecation Note
This file has been deprecated. Triggers can now be defined in the `resources` section of `shippable.yml`.  See [anatomy of shippable.yml](/platform/tutorial/workflow/shippable-yml/) for more information.

---


[Triggers](/platform/workflow/trigger/overview/) are used to manually start a job. They are very similar to resources, the only difference being that updating a resource in the YML will not start the dependent job(s), but a updating a trigger will.

A YML config file `shippable.triggers.yml` is used to define triggers. Anatomy of the yml is here: [Anatomy of triggers yml](/platform/tutorial/workflow/shippable-triggers-yml/)

This file should be committed to source control in the [Sync Repository](/platform/tutorial/workflow/crud-syncrepo/), along with `shippable.resources.yml` and `shippable.jobs.yml`.

The anatomy of the triggers configuration in `shippable.triggers.yml`  generally follows the structure below

```
triggers:
  - name: 				<string>
    type: 				trigger
    version:
      counter: 			1
```

* **`name`** -- an **alphanumeric** string (underscores are permitted) that makes it easy to infer what the resource represent e.g. `trig_ci`. This name is used to define the `IN` entities to Jobs.

* **`type`** -- is always set to `trigger`

* **`version`** -- changing any value in this tag will fire the trigger, in this case changing counter value will start the Jobs that use this trigger as an `IN`

## Further Reading
* [Integrations](/platform/integration/overview/)
* [Jobs](/platform/workflow/job/overview/)
