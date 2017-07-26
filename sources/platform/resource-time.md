page_main_title: time
main_section: Platform
sub_section: Workflow
sub_sub_section: Resources

# TODO
| Tasks   |      Status    |
|----------|-------------|
| Hotlinking |  Open |
| Further Reading needs thinking|  Open |

# time
`time` resource provides cron like functionality. It is used to to trigger a job in a cron like manner. This resource can be used used as an IN input for [any job](jobs-overview/). The timezone used for triggering jobs is UTC.

You can create a replicas resource by [adding](resources-working-wth#adding) it to `shippable.resources.yml`

```
resources:
  - name: 			<string>
    type: 			time
    seed:		<object>
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `time`

* **`seed`** -- is an object which contains specific properties that applies to this resource.

	```
		seed:
		  interval: "*/2 * * * *"
	```
The `interval` follows the [standard Cron format](https://en.wikipedia.org/wiki/Cron). For example, the snippet above will trigger the job at 2 min intervals.

# Used in JOBs
This resource is used as an IN for any type of Job

# Further Reading
* How to run schedule CI runs
