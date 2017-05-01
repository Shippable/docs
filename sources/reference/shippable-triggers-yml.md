main_section: Reference
sub_section: Configuration

# shippable.triggers.yml reference

Triggers are used to manually trigger a workflow by running a job. Manual run for jobs is also available through the SPOG UI. However, triggers allow you to manually run jobs using a `trigger` defined in a versioned yml file in your source control.

<img src="/images/reference/configuration/triggerJob.png" alt="Triggering a manual job through a resource" style="width:400px;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

## Adding Triggers

All triggers should be configured in `shippable.triggers.yml` and be committed to a sync repository. You cannot have more than one `shippable.triggers.yml` per subscription. If more than 1 triggers yml is detected in the sync repo, the first one is used. This is done in order to reduce conflicts due to the same trigger being defined in multiple places.

## Anatomy of a Trigger YML
All triggers follow a similar format.

You can define a trigger as follows:

```
- name: <string>
  type: trigger
  version:
    counter: 1
```

`name` should be an easy to remember text string. This will appear in the visualization of this trigger in the SPOG view.
`type` is always set to trigger
Changing the value of the `counter` tag and pushing `shippable.triggers.yml` will trigger the job for which this trigger resource is an input.

Triggers work with [all job types](/reference/jobs-overview/).

## Deleting Triggers

Since pipelines are all about dependencies and deployable units are flowing through these pipelines at all times, deleting a trigger can significantly alter or irreversibly change the pipeline in unexpected ways. To avoid accidental deletion of trigger(s) in ymls, we have made deletion of triggers a 2 step process.

First, you need to soft-delete a trigger by removing it from your `shippable.triggers.yml` file. This removes it from the pipeline, but does not remove it from the database. You can see a list of soft-deleted triggers at the bottom of the Single Pane of Glass. If soft-deleted triggers are added back to the triggers yml, the system will undelete them and you will retain version history for the undeleted trigger.

To completely remove a trigger from the system, you need to hard delete it through the UI. To do this:

* Go to your Subscription page and click on the `Pipelines` tab
* Select "Soft Deleted Resources" from the arrow dropdown in the upper right. This will display soft-deleted triggers at the bottom of the SPOG view.
* Right-click on the trigger, and click `remove`. This will permanently delete the trigger from the Shippable database. This action cannot be undone.

A trigger must be soft deleted before it can be hard deleted.
