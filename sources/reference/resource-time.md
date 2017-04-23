main_section: Reference
sub_section: Resources

# resource-time
A `time` resource type is used to to trigger a job based on a specific day and time. This resource can be used used as an IN input for [any job](jobs-overview/).

You can create this resource by adding it to `shippable.resources.yml`

```
resources:
  # This time resource posts new versions for it, every 2 minutes
  - name: nightly-trigger
    type: time
    seed:
      interval: "*/2 * * * *"
```

* `name` should be an easy to remember text string. This will appear in the visualization of this resource in the SPOG view. It is also used to refer to this resource in the `shippable.jobs.yml`. If you have spaces in your name, you'll need to surround the value with quotes, however, as a best practice we recommend not including spaces in your names.

* `type` is always set to 'time'.

* The `seed` section specifies the interval at which the job should be triggered. The `interval` follows the [standard Cron format](https://en.wikipedia.org/wiki/Cron). For example, the snippet above will trigger the job at 2 min intervals.

You can use the time resource as an input for any job you want to trigger at that interval:

```
jobs:
  - name: nightly-builds
    type: runSh
    steps:
      - IN: nightly-trigger
      - TASK:
        - script: ./doSomething.sh

```
