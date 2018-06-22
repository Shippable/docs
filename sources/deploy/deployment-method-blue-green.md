page_main_title: Blue-green deployment strategy
main_section: CD
sub_section: Deploying containers using Shippable managed jobs
sub_sub_section: Deployment methods
page_title: Blue-green deployment strategy
page_description: Blue-green deployment strategy in Shippable

# Blue-green deployment strategy
This is default strategy that the [deploy](/platform/workflow/job/deploy) job uses, unless otherwise specified. No changes to the yml are needed to use this strategy.

Please ensure that you have enough capacity in your cluster to run two instances of the service being deployed.

## Validating the health of an blue-green deployment.

In some scenarios, you might want to validate that your containers are up and running for a certain period of time after deployment before declaring the deployment a success. For example:

* You're running acceptance tests after deployment, and if the tests crash one or more containers, you want the deployment to be marked a failure and rolled back
* You want to validate that the containers are initializing correctly and not crashing immediately on starting.

The `stabilityDuration` tag on the [deploy](/platform/workflow/job/deploy) job addresses this scenario by allowing you to specify the amount of time in seconds (0-300) that a new service created in a blue-green deployment should be stable before marking the deployment as successful. "Stable" means that the desired number of instances matches the number that are actually running in the cluster for the timeframe specified.

For our [single container application](/deploy/continuous-delivery-single-container-docker-application/), the [shippable.yml](/platform/tutorial/workflow/shippable-yml/) snippet looks like this:

```
jobs:

  - name: app_deploy_job
    type: deploy
    stabilityDuration: 300            # add this to your deploy job
    steps:
      - IN: app_service_def
      - IN: op_cluster
      - IN: app_replicas
```

In this example, we want the actual number of replicas to run continuously for 300 seconds. The deploy job waits for a maximum duration of 15 minutes for this condition to be satisfied. For example, if the one of the containers go down after 3 minutes, the deploy job will wait for the crashed container to restart and once it starts running, it will reset the timer to zero. At this point, all the containers have to again run continuously for 300 seconds.

### Sample project
Here are some links to a working sample of this scenario. This is a simple Node.js application that runs some tests and then pushes the image to Amazon ECR. It also contains all of the pipelines configuration files for deploying to Amazon ECS.

**Source code:**  [devops-recipes/deploy-ecs-strategy](https://github.com/devops-recipes/deploy-ecs-strategy)

## Ask questions on Chat

Feel free to engage us on Chat if you have any questions about this document. Simply click on the Chat icon on the bottom right corner of this page and someone from our customer success team will get in touch with you.

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
