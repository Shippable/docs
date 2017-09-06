page_main_title: Validating the health of an blue-green deployment of a Node.js application deployed to a container orchestration service.
main_section: Deploy
sub_section: How To

# Validating the health of an blue-green deployment of a single container application deployed to a container orchestration service.

You might want to validate that your containers are up and running for a certain period of time after deployment before declaring the deployment a success. Typical usecases are that after deployment, you might want to run some acceptance tests. If any of these tests crash one or more of your containers, the deployment should be marked a failure and the application rolled back to the previous (blue) state.

We will use the single container application deployment usecase defined [here](/deploy/deploy-mvp-1) and demonstrate health validation.

##1. Building blocks
**Jobs**
  - [deploy](/platform/workflow/job/deploy/) which deploys a [manifest](/platform/workflow/job/manifest/) to a cluster.

##2. Configure [deploy](/platform/workflow/job/deploy/) job for health validation.

```
jobs:

  - name: deploy_job
    type: deploy
    stabilityDuration: 300
    steps:
      - IN: deploy_manifest
      - IN: deploy_cluster
```

`stabilityDuration` is the amount of time in seconds (0-300) that a new service created in a blueGreen deployment should be stable before marking the deployment as successful. Stable means that the desired number of replicas matches the number that are actually running in the cluster for the timeframe specified. By default, the #replicas is 1.

In this example, we want the actual number of replicas to run continuously for 300 seconds. The deploy job waits for a maximum duration of 15 minutes for this condition to be satisfied. For example, if the one of the containers go down after 3 minutes, the deploy job will wait for the crashed container to restart and once it starts running, it will reset the timer to zero. At this point, all the containers have to again run continuously for 300 seconds.

## Improve this page
We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
