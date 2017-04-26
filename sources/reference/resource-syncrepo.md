main_section: Reference
sub_section: Resources

# syncRepo

The `syncRepo` resource is at the heart of your deployment pipelines. This resource is a pointer to the source control repository containing the files that define your pipelines:  `shippable.resources.yml` and `shippable.jobs.yml`.

When you add a `syncRepo`, Shippable will read the jobs and resources ymls and create your pipeline. We also add a webhook on the source repository that notifies Shippable each time anything in the repository is changed. This webhook notification will automatically sync any changes you make to the jobs and resources ymls and reflect them in your pipeline.

**You need to add at least one syncRepo resource from the Shippable UI.** Subsequent sync repositories can also be added through the UI following the same process.

This is the only resource type that can be added from the UI. You should not add the same repository as a sync repo more than once. This can lead to unexpected behavior.

## Adding a syncRepo from the UI

* Go to your Subscription's page and click on `Pipelines`
* Click on the `+` button in the upper right corner
* You will first need to select a subscription integration. This should point to the source control system where the repository containing your pipeline definitions is located. To learn how to create subcription integrations for source control, read the [SCM section of integrations overview page](integrations-overview/).
* Once you add the integration, you will see a list of repositories in your subscription.
* Select the repository and branch that contains your shippable.jobs.yml and shippable.resources.yml files
* Name your sync repository and click on `Save`. This should seed your pipeline.

Once you have added a syncRepo, you will see a visualization of the the jobs and resources from your `shippable.jobs.yml` and your `shippable.resources.yml`.
