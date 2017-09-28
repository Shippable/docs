page_main_title: Upgrade deployment strategy
main_section: Deploy
sub_section: Deploy to Container Orchestration Platforms
sub_sub_section: Deployment methods

# Upgrade deployment strategy

In this strategy, a new service is only created on the orchestration platform for the very first deployment. Every subsequent deployment will just update the existing service. Shippable makes a best effort guarantee for zero downtime in the upgrade method.

## Assumptions

We will use the [single container application](/deploy/cd_of_single_container_applications_to_orchestration_platforms) as a starting point.

## Steps

The upgrade strategy is specified by setting the `method` attribute on the [deploy](/platform/workflow/job/deploy) to `upgrade`.

To set this strategy on the [single container application](/deploy/cd_of_single_container_applications_to_orchestration_platforms), we update the `app_deploy_job` yml block in the [shippable.jobs.yml](/platform/tutorial/workflow/shippable-jobs-yml/) file.

```
  jobs:

    - name: app_deploy_job
      type: deploy
      method: upgrade
      steps:
        - IN: app_service_def
        - IN: op_cluster
        - IN: app_replicas
```

## Sample project
**Source code:**  [devops-recipes/deploy-ecs-strategy](https://github.com/devops-recipes/deploy-ecs-strategy)

## Ask questions on Chat

Feel free to engage us on Chat if you have any questions about this document. Simply click on the Chat icon on the bottom right corner of this page and someone from our customer success team will get in touch with you.

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
