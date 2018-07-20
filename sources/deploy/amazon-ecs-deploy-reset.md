page_main_title: Amazon ECS- Resetting your deployment
main_section: CD
sub_section: Shippable managed deployments
sub_sub_section: Advanced topics
page_title: Resetting an Amazon ECS Deployment
page_description: How to reset an Amazon ECS Deployment in Shippable

# Resetting an Amazon ECS Deployment

Shippable automatically tracks the state of your deployments based on the exchanges with Amazon ECS that occur when a deploy job runs.  However, if you take action directly on your cluster, Shippable won't necessarily know what you've done, and it could impact future deployments.  This is why shippable has implemented the "reset" feature for deploy jobs.

## Assumptions
This page will assume that you're familiar with how to use Shippable Assembly Lines to deploy to Amazone ECS.  If you're not, please check out our [single-container app example](amazon-ecs) as a starting point.

## Setting up for failure

To reproduce a failure that can be corrected by taking a reset action, we start by deploying an application to Amazon ECS.  Please follow the tutorial on deploying a [single-container app](amazon-ecs) to prepare for this example.

Once your single-container application is deployed and working, you can navigate to the Amazon ECS control panel in the AWS console, reduce your desiredCount to 0, and delete the service that Shippable created.

Once you've done this, manually run your deploy job again. If you've recently deleted your service, it will either be completely gone, or in an "inactive" state. Either way, Shippable can no longer update it.  You should see logs that look something like this:
<img src="/images/deploy/amazon-ecs/resetDeployJobConsole.png"/>

If you're in this state, you'll require a reset.

## Resetting the deployment


The reset feature can be accessed from two spots.  The most convenient way to use reset is from the assembly line SPOG view on your subscription dashboard.  Bring up the context menu for your deploy job by right-clicking, then select the "reset" option.  This will trigger a deployment that will reset the state of your job.

<img src="/images/deploy/amazon-ecs/resetDeployJob.png"/>

The second spot is from the custom manual build page for a deploy job.  You can access this page from your job's dashboard page.  Clicking the "build" button in the upper right corner will take you to a page that looks like this:

<img src="/images/deploy/amazon-ecs/resetDeployJob2.png"/>

simply check the 'reset' box and click 'build' to reset your job.


## Ask questions on Chat

Feel free to engage us on Chat if you have any questions about this document. Simply click on the Chat icon on the bottom right corner of this page and someone from our customer success team will get in touch with you.

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
