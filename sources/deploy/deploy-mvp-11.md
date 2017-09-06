page_main_title: Manually triggering the deployment of a Node.js application deployed to a container orchestration service.
main_section: Deploy
sub_section: How To

# Manually triggering the deployment of a single container application deployed to a container orchestration service.

You might have a need to manually trigger the deployment of your application to certain sensitive environments such as pre-prod and prod. This document goes over the specific steps to setup manual triggering of your deployment.
We will use the single container application deployment usecase defined [here](/deploy/deploy-mvp-1) and configure it for manual triggering.

After manual triggering is configured, you will need to use the [SPOG](/platform/visibility/single-pane-of-glass-spog/) UI to pause/run the specific [deploy](/platform/workflow/job/deploy/) job in your assembly line. Specific instructions to pause/run can be found [here](/platform/visibility/single-pane-of-glass-spog/#runpause-job).

##1. Building blocks
**Jobs**
  - [deploy](/platform/workflow/job/deploy/) which deploys a [manifest](/platform/workflow/job/manifest/) to a cluster.

##2. Configure [deploy](/platform/workflow/job/deploy/) job for manual triggering.

```
jobs:

  - name: deploy_job
    type: deploy
    steps:
      - IN: deploy_manifest
        switch: off
      - IN: deploy_cluster
```

## Improve this page
We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
