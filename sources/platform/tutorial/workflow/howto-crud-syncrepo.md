page_main_title: Working with a syncRepo
main_section: Platform
sub_section: Tutorials
sub_sub_section: Workflow
page_title: DevOps Assembly Line Resources
page_description: How to add, delete and update syncRepo
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# Adding a syncRepo

When you add a `syncRepo`, shippable creates a `syncRepo` resource and a [rSync](/platform/workflow/job/rSync/) Job. We also add a webhook on the source repository that notifies Shippable each time anything in the repository is changed. Any change to your `syncRepo` will trigger the Job through the webhook and make sure your DevOps Assembly Lines are in-sync with your definitions.

The name of the `rSync` Job is `syncRepo`'s name + `_rSync` and it is the only resource type that can be added from the UI. 

**Note** You should not add the same repository/branch as a sync repo more than once as it can lead to unexpected behaviors

## Steps to Add a syncRepo

* First, add a subscription integration for the source control provider where your sync repository is located. Instructions are here - [Source Control Provider Integrations](/platform/integration/overview#source-control-providers).
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
* [Jobs](/platform/workflow/job/overview)
* [Resource](/platform/workflow/resource/overview)
