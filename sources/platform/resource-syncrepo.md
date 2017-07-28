page_main_title: syncRepo
main_section: Platform
sub_section: Workflow
sub_sub_section: Resources

# syncRepo

`syncRepo` is a special resource. It is at the heart of Shippable DevOps Assembly Lines. This resource is a pointer to the source control repository containing the files that define your CI/CD workflow namely,  `shippable.resources.yml`, `shippable.jobs.yml` and `shippable.triggers.yml`.

**Note:** Shippable will only read the contents of your `shippable.resources.yml`, `shippable.jobs.yml` and `shippable.triggers.yml` files in the source control repository for which you want to add the syncRepo. If you have a file like `shippable.resources.yml.example` in that repository, then shippable will not parse the contents of those files and it will be ignored in the creation of your pipeline resources.

When you add a `syncRepo`, shippable creates a `syncRepo` resource and a [rSync](/platform/jobs-rSync/) job. By default the name of the rSync job is syncRepo's name + `_rSync`. syncRepo resource has all the details of your repository. [rSync](/platform/jobs-rSync/) job runs and creates all the resources, jobs and triggers specified in `shippable.resources.yml`, `shippable.jobs.yml` and `shippable.triggers.yml`. We also add a webhook on the source repository that notifies Shippable each time anything in the repository is changed. This webhook notification will automatically sync any changes you make to the jobs, resources or triggers ymls and reflect them in your pipeline.

This is the only resource type that can be added from the UI. You should not add the same repository/branch as a sync repo more than once. This can lead to unexpected behavior.

## Adding a syncRepo from the UI

* First, add a subscription integration for the source control provider where your sync repository is located. Instructions are here - [Source Control Provider Integrations](/platform/int-overview#source-control-providers).
* Go to your Organization's page on Shippable. A list of all available Organizations can be accessed by clicking on the Subscriptions menu at the top left of your screen:

<img width="30%" height="30%" src="/images/platform/resources/syncRepo/list-subscriptions.png" alt="List of subscriptions">

* On the top-right corner, click on the `+` icon(`Enable Projects or Add syncRepo`).
* On the enable page, goto the last panel with heading `ADD A SYNC REPOSITORY`.

<img src="/images/platform/resources/syncRepo/add-syncRepo.png" alt="Add a syncRepo">

* Complete the form:
	* `Subscription Integration` dropdown shows the integration you created in the first step. If not, you will need to go through the flow of adding the integration.
	* `Repo` dropdown shows all repositories in the source control you just connected with the integration. Choose your sync repository.
	* `Branch` dropdown shows all the branches for the above selected repository. Select the branch that contains your pipeline configuration files.
	* Name your sync repository with an easy to remember name.
	* In `Flags` options, add flags that you want to add to this syncRepo and the rSync job created for this.
	* `Default Flag` checkbox is checked by default. When this is checked all the resources, jobs or trigger will have a default flag(with same name as the rSync job's name). If this is not checked, then default flag will not be added to any of the resources, jobs or triggers added by this syncRepo.
* Click on **Save** to apply your sync repository configuration.

At this point, Shippable will create `syncRepo` resource and `rSync` job. After that rSync job will parse all configuration files in the  repository and create your pipeline(s). You will see a visualization of the the jobs and resources from your `shippable.jobs.yml`,  `shippable.resources.yml` and `shippable.triggers.yml` in the Single Pane of Glass (SPOG) (click on the `eye` icon on the top-right corner on your organization's page  and choose `Show SPOG view`).
<img src="/images/platform/resources/syncRepo/syncRepo-flag.png" alt="syncRepo flag">

# Further Reading
* JFrog integration
* AWS integration
* runCLI job
* cli pre-installed in job runtime
* how to deploy a file to a VM cluster
* Output a file from runSH
