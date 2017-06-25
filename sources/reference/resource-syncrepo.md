page_main_title: syncRepo
main_section: Reference
sub_section: Resources

# syncRepo

The `syncRepo` resource is at the heart of your deployment pipelines. This resource is a pointer to the source control repository containing the files that define your pipelines:  `shippable.resources.yml` and `shippable.jobs.yml`.

When you add a `syncRepo`, Shippable will read the jobs and resources ymls and create your pipeline. We also add a webhook on the source repository that notifies Shippable each time anything in the repository is changed. This webhook notification will automatically sync any changes you make to the jobs and resources ymls and reflect them in your pipeline.

**You need to add at least one syncRepo resource from the Shippable UI.** Subsequent sync repositories can also be added through the UI following the same process.

This is the only resource type that can be added from the UI. You should not add the same repository as a sync repo more than once. This can lead to unexpected behavior.

## Adding a syncRepo from the UI

* First, add a subscription integration for the source control provider where your sync repository is located. Instructions are here - [Source Control Provider Integrations](/reference/integrations-overview#source-control-providers).
* Go to your Organization's page on Shippable. A list of all available Organizations can be accessed by clicking on the Subscriptions menu at the top left of your screen:

<img width="30%" height="30%" src="/images/reference/integrations/list-subscriptions.png" alt="List of subscriptions">

* Click on the **Pipelines** tab
* If you have never added a sync repository, your Single Pane of Glass will be empty. Click the **+** button at upper right to add a sync repository.
* Complete the **Add Resource** fields:
	* The subscription integration dropdown should show the integration you created in the first step. If not, you will need to go through the flow of adding the integration.
	* The **Select Project** dropdown will show all repositories in the source control you just connected with the integration. Choose your sync repository.
	* Select the branch of the sync repository that contains your pipeline configuration files.
	* Name your sync repository with an easy to remember name.
* Click on **Save** to apply your sync repository configuration.

At this point, Shippable will parse all configuration files in the sync repository and create your pipeline(s). You will see a visualization of the the jobs and resources from your `shippable.jobs.yml` and your `shippable.resources.yml` in the Single Pane of Glass (SPOG).
