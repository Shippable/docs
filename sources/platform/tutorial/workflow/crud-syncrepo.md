page_main_title: Working with a syncRepo
main_section: Platform
sub_section: Tutorials
sub_sub_section: Workflow
page_title: DevOps Assembly Line Resources
page_description: How to add, delete and update syncRepo
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# Working with syncRepo

The `syncRepo` resource is the heart of Shippable DevOps Assembly Lines since this resource is a pointer to the source control repository (called Sync repository) containing the files that define your DevOps Assembly Lines, namely, [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml), [shippable.jobs.yml](/platform/tutorial/workflow/shippable-jobs-yml) and [shippable.triggers.yml](/platform/tutorial/workflow/shippable-triggers-yml).

When you add a [syncRepo](/platform/workflow/resource/syncrepo), Shippable creates a resource and an [rSync](/platform/workflow/job/rSync/) Job automatically. We also add a webhook to your source control system for the repo so that we can trigger synchronization if you change the definitions of your Assembly Lines.

The name of the `syncRepo` is the name of the repository appended to name of the branch with an `_`. `rSync` Job is `syncRepo`'s name + `_rSync`

**Note** You should not add the same repository/branch as a sync repo more than once as it can lead to unexpected behaviors.

## Adding a syncRepo

* First, add a Subscription integration for the source control provider where your sync repository is located. Instructions are here for different providers:

	- [GitHub](/platform/integration/github/)
	- [GitHub Enterprise](/platform/integration/github-enterprise/)
	- [Bitbucket](/platform/integration/bitbucket/)
	- [GitLab](/platform/integration/gitlab/)

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
	* In `Flags` options, add flags that you want to add to this syncRepo and the rSync job created. You can add as many as you want
	* `Default Flag` checkbox is checked by default. When this is checked all the resources, jobs or trigger will have a default flag(with same name as the rSync job's name).
	* Click on **Save** to apply your sync repository configuration.

At this point, Shippable will create `syncRepo` resource and `rSync` job. After that rSync job will parse all configuration files in the  repository and create your pipeline(s). You will see a visualization of the the jobs and resources from your `shippable.jobs.yml`,  `shippable.resources.yml` and `shippable.triggers.yml` in the Single Pane of Glass (SPOG) (click on the `eye` icon on the top-right corner on your organization's page  and choose `Show SPOG view`).

<img src="/images/platform/resources/syncRepo/syncRepo-flag.png" alt="syncRepo flag">

## Editing a syncRepo

Once added, you can only edit a syncRepo to add a flag to it. Adding a flag will include that syncRepo in the SPOG view when you filter on that flag.

* Click on the `syncRepo` resource. This will take you the history page:

	<img src="/images/platform/tutorial/workflow/edit-syncRepo-flag.jpg" alt="edit syncRepo flag">

* You can add/change the flags here.

## Deleting a syncRepo

* Upon right-clicking on the `syncRepo` in your SPOG, you will see an option to delete it. This is available only for this type of resource. All other deletes need to happen from the YML first.

	<img src="/images/platform/tutorial/workflow/soft-delete-syncRepo.jpg" alt="soft delete syncRepo">

* Once you delete it, all objects that were defined in this `syncRepo` along with `rSync` job will be soft-deleted.

* Make sure you have **Deleted objects** turned on in your view. Find the `syncRepo` you deleted and then hard delete it. Now all the Resources and Jobs that were defined in this repo are all permanently deleted. You cannot recover any data after this operation.

	<img src="/images/platform/tutorial/workflow/show-deleted-objects.jpg" alt="show deleted objects">

	<img src="/images/platform/tutorial/workflow/hard-delete-syncRepo.jpg" alt="hard delete syncRepo">

## Restoring a syncRepo

* If you accidentally soft deleted a `syncRepo`, you can restore it by going to the **Deleted objects** and clicking on **Restore**. All you objects will be restored. Please note that you cannot restore a `syncRepo` that has been hard-deleted.

# Further Reading
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
