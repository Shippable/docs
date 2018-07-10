page_main_title: Deleting an Assembly Line
main_section: Platform
sub_section: Workflow
sub_sub_section: Tutorials

# Deleting an Assembly Line or syncRepo

This document will explain how you can remove a `syncRepo` from Shippable, which will also remove all jobs and resources defined in that repository.

To delete individual jobs from your workflow, please read the document on [removing jobs](/platform/tutorial/workflow/crud-job/#deleting-jobs). To delete individual resources from your workflow, please read the document on [removing resources](/platform/tutorial/workflow/crud-resource/#deleting-resources).

## Instructions

* Right-click on the `syncRepo` you want to delete in your [SPOG view](/platform/visibility/single-pane-of-glass-spog), you will see a **trash can** icon. Clicking on the icon will delete all `jobs` and `resources` defined in that repository.

<img src="/images/platform/tutorial/workflow/soft-delete-syncRepo.jpg" alt="soft delete syncRepo">

Please note that the trash can icon is only available for this type of resource. All other deletes need to happen from the YML first.

* When removing the `syncRepo`, you will be prompted with a confirmation dialog.

<img src="/images/platform/tutorial/workflow/syncRepo-delete-confirmation.png" alt="delete confirmation">

If your `syncRepo` defines any `deploy` jobs, our default behavior is to delete any active deployments from the associated provider. **If you want your deployments to stay active, you should uncheck the box to prevent removing associated developments.** The `deploy` job will still be removed in this case, but your deployed applications will not be deleted.

* Once you confirm the delete, all objects that were defined in this `syncRepo` along with `rSync` job will be soft-deleted.

* In your SPOG view, click on the **Eye** icon and turn **Deleted objects** ON. Find the `syncRepo` you deleted and hard-delete it. At this point, `resources` and `jobs` that were defined in this repo are all permanently deleted. You cannot recover any data after this operation.

<img src="/images/platform/tutorial/workflow/show-deleted-objects.jpg" alt="show deleted objects">

<img src="/images/platform/tutorial/workflow/hard-delete-syncRepo.jpg" alt="hard delete syncRepo">

## Restoring a syncRepo

* If you accidentally soft-deleted a `syncRepo`, you can restore it by going to the **Deleted objects** and clicking on **Restore**. All `jobs` and `resources` defined in the repository will be restored. Please note that you cannot restore a `syncRepo` that has been hard-deleted.
