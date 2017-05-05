page_main_title: Triggering jobs
main_section: Validate
sub_section: Before you start

# Triggering your jobs

Jobs can be triggered in multiple ways, including both automated and manual triggers. For example, consider the configuration below for **my-runCLI**:

<img src="/images/validate/trigger-runSh.png" alt="Triggering releases" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

In this configuration, **my-runSh** will be triggered in one of 4 ways:

1. **my-job**, which is an `IN` for **my-runSh** finishes running and triggers it. This trigger can be [switched off](#switchOff) if needed.
- User commits to the TODO Update link [trigger resource](../triggers/), which is an `IN` for **my-runSh**, and hence triggers it.
- User right clicks on **my-runSh** in the SPOG UI and clicks on `Run` or selects `Run` for **my-runSh** in the Jobs list in the [Grid view](/validate/single-pane-of-glass-spog/#grid-view).

**Please note that changing the params resource manually through a yml commit will not automatically trigger my-runSh.** This behavior is meant to prevent unexpected pipeline behavior, since a single commit can contains changes to several resources and cause several trigger points in the pipeline. If you want your job to be triggered when resources are manually edited in the yml, you can add a `trigger` input for the job and include a change to the trigger resource in the commit every time you want to automatically run your job.

<a name="switchOff"></a>
##Switching triggers off
You can switch off a job being triggered automatically in the section above.

```
jobs:
  - name: Job-3
    type: release
    steps:
      - IN: resource-2
        switch: off
      - IN: Job-1
        switch: off
```

As shown above, the `switch: off` tag can be defined for IN resources or jobs in order to turn off automatic triggering of a job when the inputs change. Note that these switches are specific to the input and should be set accordingly for each input.

## Pausing jobs

You can pause any jobs in your pipeline by right-clicking on the job, and clicking **Pause Jobs**. Paused jobs are never triggered automatically, irrespective of yml configuration. You can unpause a paused job to resume automatic triggers.

<a name="trigger-pipes"></a>
##Triggering pipelines after CI

If you want to trigger your pipeline workflow after CI is complete, follow instructions in our [Triggering pipeline jobs after CI docs](/ci/trigger-pipeline-jobs/)
