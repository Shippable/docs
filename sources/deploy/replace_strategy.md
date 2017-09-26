page_main_title: Replace deployment strategy
main_section: Deploy
sub_section: Deploy with deployment strategies

# Replace deployment strategy

In this strategy, your existing running tasks / services / deployment objects before updating your service. This results in downtime for your deployed service, but allows you to use the bare minimum resources to bring up your cluster. This strategy is thus useful in scenarios where infrastructure cost saving is more important that service uptime.

## Assumptions

We will use the [Single container application](/deploy/cd_of_single_container_applications_to_orchestration_platforms) as a starting point.

## Steps

The Replace strategy is specified by setting the `deployMethod` attribute on the [deploy](/platform/workflow/job/deploy) to `replace`.

To set this strategy on the [Single container application](/deploy/cd_of_single_container_applications_to_orchestration_platforms), we update the `app_deploy_job` yml block in your [shippable.jobs.yml](/platform/tutorial/workflow/shippable-jobs-yml/) file.

```
jobs:

  - name: app_deploy_job
    type: deploy
    steps:
      - IN: app_service_def
      - IN: op_cluster
      - IN: app_replicas
      - TASK: managed
      deployMethod: replace
```

## Sample project
**Source code:**  [devops-recipes/deploy-ecs-strategy](https://github.com/devops-recipes/deploy-ecs-strategy)

## Ask questions on Chat

Feel free to engage us on Chat if you have any questions about this document. Simply click on the Chat icon on the bottom right corner of this page and someone from our customer success team will get in touch with you.

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
