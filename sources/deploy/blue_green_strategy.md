page_main_title: Blue-green deployment strategy
main_section: Deploy
sub_section: Deploy with deployment strategies

# Blue-green deployment strategy
This is default strategy that the [deploy](/platform/workflow/job/deploy) job uses unless otherwise specified. Thus no changes to the yml are needed to use this strategy.

## Assumptions

We will use the [Single container application](/deploy/cd_of_single_container_applications_to_orchestration_platforms) as a starting point.

## Validating the health of an blue-green deployment.

You might want to validate that your containers are up and running for a certain period of time after deployment before declaring the deployment a success. Typical usecases are that after deployment, you might want to run some acceptance tests. If any of these tests crash one or more of your containers, the deployment should be marked a failure and the application rolled back to the previous (blue) state. Alternatively, you might want to validate that the containers are initializing correctly and not crashing immediately on starting.

**Job:** We set a specific attribute called `stabilityDuration` on the [deploy](/platform/workflow/job/deploy) job.

`stabilityDuration` is the amount of time in seconds (0-300) that a new service created in a blueGreen deployment should be stable before marking the deployment as successful. Stable means that the desired number of replicas matches the number that are actually running in the cluster for the timeframe specified. By default, the #replicas is 1.

In this example, we want the actual number of replicas to run continuously for 300 seconds. The deploy job waits for a maximum duration of 15 minutes for this condition to be satisfied. For example, if the one of the containers go down after 3 minutes, the deploy job will wait for the crashed container to restart and once it starts running, it will reset the timer to zero. At this point, all the containers have to again run continuously for 300 seconds.

**Steps**

In the context of the [Single container application](/deploy/cd_of_single_container_applications_to_orchestration_platforms), update the `app_deploy_job` yml block in your [shippable.jobs.yml](/platform/tutorial/workflow/shippable-jobs-yml/) file.

```
jobs:

  - name: app_deploy_job
    type: deploy
    stabilityDuration: 300
    steps:
      - IN: app_service_def
      - IN: op_cluster
      - IN: app_replicas
```

### Sample project
Here are some links to a working sample of this scenario. This is a simple Node.js application that runs some tests and then pushes the image to Amazon ECR. It also contains all of the pipelines configuration files for deploying to Amazon ECS.

**Source code:**  [devops-recipes/deploy-ecs-strategy](https://github.com/devops-recipes/deploy-ecs-strategy)

## Ask questions on Chat

Feel free to engage us on Chat if you have any questions about this document. Simply click on the Chat icon on the bottom right corner of this page and someone from our customer success team will get in touch with you.

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
