page_main_title: state
main_section: Platform
sub_section: Workflow
sub_sub_section: Resources

# state
`state` resource is a special resource used to store data that can be shared between jobs. Shippable DevOps Assembly lines do not allow workflow that have circular dependency. There are certain situations where data needs to be passed back and forth between Jobs. For e.g. Terraform tasks create a state that needs to be persisted across the jobs. `state` resource was specifically designed to achieve circular dependencies in DevOps Assembly Lines.

You can create a replicas resource by [adding](resources-working-wth#adding) it to `shippable.resources.yml`

```
resources:
  - name: 			<string>
    type: 			state
    version:		<object>
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `state`


# Used in JOBs
This resource is used as an IN or OUT in any of the jobs


# Further Reading
* How to pass data between jobs
