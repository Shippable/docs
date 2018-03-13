page_main_title: Deploying multiple manifests  in parallel
main_section: Deploy
sub_section: Deploy to Container Orchestration Platforms
sub_sub_section: Deployment methods
page_title: Deploying multiple manifests in parallel
page_description: How to deploy multiple manifests in parallel in Shippable

# Deploying multiple manifests in parallel

If your **deploy** job is deploying multiple manifests, it can take some time to deploy them serially. You can greatly speed up deployments for multiple manifests by configuring deployments to be kicked off in parallel.

You can deploy manifests in parallel regardless of the deployment method (blue-green/upgrade/replace) you're using.

## Instructions

You can set the `workflow` attribute on the [deploy](/platform/workflow/job/deploy) job to `parallel` in order to deploy multiple manifests in parallel.

As an example:

```
jobs:

  - name: app_deploy_job
    type: deploy
    workflow: parallel            # add this to your deploy job
    method: upgrade               
    steps:
      - IN: app_service_def_1     # first manifest
      - IN: app_service_def_2     # second manifest
      - IN: op_cluster
      - IN: app_replicas
```


## Ask questions on Chat

Feel free to engage us on Chat if you have any questions about this document. Simply click on the Chat icon on the bottom right corner of this page and someone from our customer success team will get in touch with you.

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
