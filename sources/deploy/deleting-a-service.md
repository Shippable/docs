page_main_title: Deleting a deployed service.
main_section: Deploy
sub_section: Deploy to Container Orchestration Platforms
sub_sub_section: Advanced topics
page_title: Deleting a deployed service
page_description: How to delete a deployed service in Shippable

# Deleting a deployed service.

You might have deployed an application to an orchestration platform like Amazon ECS, Kubernetes, GKE, or Azure using Shippable Assembly Lines. If the application is decommissioned or if you do not need it in any particular environment, this document will describe the steps to delete the application. These steps will stop and remove the container from the cluster.

## Instructions

###1. Update the deploy job.

Locate your `deploy` job in your [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file and comment it out or delete it from your yml. For example:

```
jobs:

#  - name: app_deploy_job
#    type: deploy
#    steps:
#      - IN: app_service_def
#      - IN: op_cluster
#      - IN: app_replicas

```

Please make sure you make the necessary adjustments to your Assembly Line, i.e. if your deploy job was an IN to another job, then that job yml needs to be adjusted accordingly:

<img src="/images/deploy/usecases/delete-deployed-service.png"/>

###2. Commit the file

Once the file is committed, the [rSync](/platform/workflow/job/rsync) job will run and Shippable will detect that the deploy job was deleted. **Please note that this will delete your service on your orchestration platform.**

This step soft-deletes the deploy job, so it still shows in the **Deleted Resources list** in your SPOG view.

###3. Hard delete the deploy job (optional)

If you are fairly certain that you will not need to re-deploy the deleted service, you should hard delete the deploy job by following the steps below:

- Go to your Subscription dashboard, click on the eye icon, click on **Show Deleted Objects**.
- Find your job in the **DELETED OBJECTS** grid at the bottom of the screen.
- Click on the **Delete** button.

## Ask questions on Chat

Feel free to engage us on Chat if you have any questions about this document. Simply click on the Chat icon on the bottom right corner of this page and someone from our customer success team will get in touch with you.

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
