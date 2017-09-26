page_main_title: Deleting a deployed service.
main_section: Deploy
sub_section: CD to Orchestration Platforms

# Deleting a deployed service.

You might have deployed an application to an orchestration platform like Amazon ECS, Kubernetes, GKE or Azure using Shippable assembly lines. If the application is decommissioned or if you do not need it in any particular environment, this document will describe the steps to delete the application. These steps will stop and remove the container from the cluster.

## Assumptions

We assume that the application is already deployed to a cluster in an orchestration platform. We will use the [Single container application](/deploy/cd_of_single_container_applications_to_orchestration_platforms) as an example.

## Step by Step instructions

###1. Locate `app_deploy_job` in your [shippable.jobs.yml](/platform/tutorial/workflow/shippable-jobs-yml/) file and set `deployMethod` attribute to `remove`.

```
  jobs:

  - name: app_deploy_job
    type: deploy
    steps:
      - IN: app_service_def
      - IN: op_cluster
      - IN: app_replicas
      - TASK: managed
        deployMethod: remove
```

###2. Commit the file.

Once the file is committed, the [rSync](platform/workflow/job/rsync/#rsync) job will run and remove the application deployed to your orchestration platform.

## Removing `app_deploy_job` from [shippable.jobs.yml](/platform/tutorial/workflow/shippable-jobs-yml/).
If you remove or comment out `app_deploy_job` and commit, the deployed service will also get removed. The job is soft deleted and to completely remove the job, you will need to hard delete the job using the steps below.

- Go to your subscription dashboard, click on the eye icon, click on `Show Deleted Objects`.
- Find your job in the `DELETED OBJECTS` grid at the bottom of the screen.
- Click on the `Delete` button.

## Ask questions on Chat

Feel free to engage us on Chat if you have any questions about this document. Simply click on the Chat icon on the bottom right corner of this page and someone from our customer success team will get in touch with you.

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
