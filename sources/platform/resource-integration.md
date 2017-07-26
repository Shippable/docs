page_main_title: integration
main_section: Platform
sub_section: Workflow
sub_sub_section: Resources

# TODO
| Tasks   |      Status    |
|----------|-------------|
| Hotlinking |  Open |
| Further Reading needs thinking|  Open |
| Need to pointer for each integration type|  Open |

# integration
`integration` resource is used to represent credentials that has been encrypted using Shippable Integrations.

You can create an cliConfig resource by [adding](resources-working-wth#adding) it to `shippable.resources.yml`

```
resources:
  - name: 			<string>
    type: 			integration
    integration: 	<string>
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `integration`

* **`integration`** -- name of the integration. All [Shippable Integrations](integrations-overview/) can be used here

* `name` should be an easy to remember text string. This will appear in the visualization of this resource in the SPOG view. It is also used to refer to this resource in the `shippable.jobs.yml`. If you have spaces in your name, you'll need to surround the value with quotes, however, as a best practice we recommend not including spaces in your names.

# Used in JOBs
This resource is used as an IN for the following jobs

* runCLI
* runSH
* runCI

# Further Reading
* GKE integration
* AWS integration
* runCLI job
* cli pre-installed in job runtime
