page_main_title: Working with a syncRepo
main_section: Platform
sub_section: Tutorials
sub_sub_section: Workflow
page_title: DevOps Assembly Line Resources
page_description: How to add, delete and update syncRepo
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# Adding/Updating an Assembly Line

The `syncRepo` resource is the heart of Shippable DevOps Assembly Lines since this resource is a pointer to the source control repository (called sync repository) containing the files that define your DevOps Assembly Lines, namely, [shippable.yml](/platform/tutorial/workflow/shippable-yml) files.

When you add a [syncRepo](/platform/workflow/resource/syncrepo), Shippable creates a resource and an [rSync](/platform/workflow/job/rsync/) job automatically. We also add a webhook to your source control system for the repo so that we can trigger synchronization if you change the definitions of your Assembly Lines.

The name of the `syncRepo` is the name of the repository with the name of the branch appended with an `_`. The `rSync` job name is the `syncRepo`'s name + `_rSync`

**Note** You should not add the same repository/branch as a sync repo more than once.

## Adding a syncRepo

* First, add a Subscription integration for the source control provider where your sync repository is located. Instructions are here for different providers:

	- [GitHub](/platform/integration/github/)
	- [GitHub Enterprise](/platform/integration/github-enterprise/)
	- [Bitbucket](/platform/integration/bitbucket/)
	- [GitLab](/platform/integration/gitlab/)

* Go to your Organization's page on Shippable. A list of all available Organizations can be accessed by clicking on the Subscriptions menu at the top left of your screen:

<img width="30%" height="30%" src="/images/platform/resources/syncRepo/list-subscriptions.png" alt="List of subscriptions">

* On the top-right corner, click on the `+` icon(`Enable Projects or Add syncRepo`).
* On the enable page, click on `+` button in last column of the project that you want to add sync repo. It will open a modal window with a form where syncRepo can be created.

<img src="/images/platform/tutorial/workflow/add-syncRepo.png" alt="Add a syncRepo">

* Complete the form:
	* `Subscription Integration` dropdown shows the integration you created in the first step. If not, you will need to go through the flow of adding the integration.
	* `Branch` dropdown shows all the branches for the above selected repository. Select the branch that contains your pipeline configuration files.
	* Name your sync repository with an easy to remember name.
	* `Default Flag` checkbox is checked by default. When this is checked a default flag, the rSync job's name, is added to all the resources and jobs in this `syncRepo`.
	* Click on **Save** to apply your sync repository configuration.

At this point, Shippable will create `syncRepo` resource and `rSync` job. After that rSync job will parse all configuration files in the  repository and create your pipeline(s). You will see a visualization of the the jobs and resources from your configuration files in the Single Pane of Glass (SPOG) (click on the `eye` icon on the top-right corner on your organization's page  and choose `Show SPOG view`).

<img src="/images/platform/resources/syncRepo/syncRepo-flag.png" alt="syncRepo flag">

## Editing a syncRepo

Once added, you can edit the name, subscription interation used and flags of syncRepo.

<img src="/images/platform/tutorial/workflow/list-syncRepo.png" alt="List of syncRepo's">

To change the syncRepo name and subscription integration used:

* Click on the `+` button in your subscription dashboard and thereafter on the syncRepo you want to edit. You can either search for the syncRepo or use the pagination controls to find it.

* Click on the syncRepo and on `Edit` in the rendered popup.

<img src="/images/platform/tutorial/workflow/syncRepo-info.png" alt="Info of syncRepo">

* You can now add/change the subscription integration used by the syncRepo.

<img src="/images/platform/tutorial/workflow/edit-syncRepo.png" alt="Edit syncRepo">

The default flag may be changed in the UI and additional flags added in your `shippable.yml`. Adding a flag will include that syncRepo, and all of its resources and jobs, in the SPOG view when you filter on that flag.

To change the default flag:

* Click on the `syncRepo` resource from subscription dashboard. This will take you the history page:

	<img src="/images/platform/tutorial/workflow/edit-syncRepo-flag.png" alt="edit syncRepo flag">

* You can add/change the default flag here.

To add additional flags:

* Add your syncRepo to the `resources` section of the [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file in that syncRepo with the additional flags:
```
resources:
  - name: mySyncRepo
    type: syncRepo
    flags:
      - additionalFlag1
      - additionalFlag2
```
* Make sure that the name matches the name of your syncRepo in the UI.

## Deleting a syncRepo

* Upon right-clicking on the `syncRepo` in your SPOG, you will see an option to delete it. This is available only for this type of resource. All other deletes need to happen from the YML first.

	<img src="/images/platform/tutorial/workflow/soft-delete-syncRepo.jpg" alt="soft delete syncRepo">

* When removing a `syncRepo`, you will be prompted with a confirmation dialog.  If your `syncRepo` has any children that are `deploy` type jobs, the default behavior is for Shippable to delete any active deployments from the associated provider.  In some cases, you might want your deployments to remain active.  In that case, you can uncheck the box in the confirmation to tell Shippable to leave the providers alone. The Shippable `deploy` job itself will still be removed, since it's a child of the `syncRepo`.

  <img src="/images/platform/tutorial/workflow/syncRepo-delete-confirmation.png" alt="delete confirmation">

* Once you confirm the delete, all objects that were defined in this `syncRepo` along with `rSync` job will be soft-deleted.

* Make sure you have **Deleted objects** turned on in your view. Find the `syncRepo` you deleted and then hard delete it. Now all the Resources and Jobs that were defined in this repo are all permanently deleted. You cannot recover any data after this operation.

	<img src="/images/platform/tutorial/workflow/show-deleted-objects.jpg" alt="show deleted objects">

	<img src="/images/platform/tutorial/workflow/hard-delete-syncRepo.jpg" alt="hard delete syncRepo">

## Restoring a syncRepo

* If you accidentally soft deleted a `syncRepo`, you can restore it by going to the **Deleted objects** and clicking on **Restore**. All you objects will be restored. Please note that you cannot restore a `syncRepo` that has been hard-deleted.

# Further Reading
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
