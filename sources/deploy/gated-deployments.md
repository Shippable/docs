page_main_title: Gated deployments
main_section: Deploy
sub_section: Deploy to Container Orchestration Platforms
sub_sub_section: Advanced topics
page_title: Gated deployments
page_description: How to do Gated deployments in Shippable

# Gated deployments

You might have a need to manually trigger the deployment of your application to certain sensitive environments such as Pre-production and Production. In addition, there are times when you might want to pause / resume deployments for your application. This document goes over the specific steps to set up this manual, UI-based triggering of your deployment.

## Instructions to set up manual triggers

1. Locate the [deploy job](/platform/workflow/job/deploy) defined in your [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file that you want to turn off automatic triggers for.

2. Specify `switch: off` for the input [manifest](/platform/workflow/job/manifest). This essentially prevents a new version of the manifest from triggering an automated deployment. Your code block should look similar to this:

```
jobs:
  - name: app_deploy_job
    type: deploy
    steps:
      - IN: app_service_def       # input manifest
        switch: off               # Add this to turn off automatic job trigger when this input changes
      - IN: op_cluster
      - IN: app_replicas
```

3. Commit the file. Your [rSync job](/platform/workflow/job/rsync) will execute and update the Assembly Line. Further changes to the input `manifest` will not trigger an automatic deployment.

You can manually run the `deploy` job using the [SPOG](/platform/visibility/single-pane-of-glass-spog/) UI from your Subscription dashboard. Click on the eye icon, click on `Show SPOG View`, then right click on the `deploy` job name and click `Build Job`. Detailed instructions are here: [Run a job](/platform/visibility/single-pane-of-glass-spog/#runpause-job).


## Ask questions on Chat

Feel free to engage us on Chat if you have any questions about this document. Simply click on the Chat icon on the bottom right corner of this page and someone from our customer success team will get in touch with you.

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
