page_main_title: Replace deployment strategy
main_section: CD
sub_section: Deploying containers using Shippable managed jobs
sub_sub_section: Deployment methods
page_title: Replace deployments
page_description: How to do replace deployments in Shippable

# Replace deployments

In this strategy, your existing running tasks / services / deployment objects are stopped or removed before updating your service. This results in downtime for your deployed service, but allows your cluster to use the bare minimum resources to run your deployments. This strategy is thus useful in scenarios where infrastructure cost savings are more important than service uptime.

## Instructions

The replace strategy is specified by setting the `method` attribute on the [deploy](/platform/workflow/job/deploy) job to `replace`.

As an example, the [shippable.yml](/platform/workflow/config/) file for our standard [single container application](/deploy/continuous-delivery-single-container-docker-application/) looks like this:

```
jobs:

  - name: app_deploy_job
    type: deploy
    method: replace
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
