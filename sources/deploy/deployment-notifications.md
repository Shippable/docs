page_main_title: Sending notifications upon deployments.
main_section: Deploy
sub_section: Deploy to Container Orchestration Platforms
sub_sub_section: Advanced topics

# Sending notifications upon deployments

After your application is deployed to a container orchestration platform, you might want to be notified if the application was deployed successfully or on failure of deployment. Shippable supports notifications by email and via popular messaging services such as Slack, HipChat and IRC.

You can send notifications upon the following events in your workflow:

* Deployment started
* Deployment completed successfully
* Deployment failed
* Deployment canceled

## Instructions

###1. Create an account integration

If you're using Slack or HipChat to send deploy status notifications, you need to create an account integration. Instructions to create an integration can be found [here](/platform/tutorial/integration/howto-crud-integration/).

You can also send email or IRC notifications, for which you do not need an account integration. Proceed to step 2 in this case.

For help with completing the fields needed for each provider, select your provider below:

* [Slack](/platform/integration/slack/)
* [HipChat](/platform/integration/hipchatKey/)

Set the friendly name of the integration as `app_notification_provider`. If you change the name, you'll need to change it in the yml snippet in the step below.

###2. Add a notification resource

Next, you need a [notification](/platform/workflow/resource/notification/) resource to configure the recipients of your notifications. In our example, we're using Slack and specifying the channel and the users who will receive the automated notifications, so  our [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/) looks like this:

```
resources:
  - name: app_deploy_notification
    type: notification
    integration: app_notification_provider      # this needs to match integration name from step 1
    pointer:
      recipients:
        - "#beta"
        - "@botnot"
```
For a complete reference on how to configure the `pointer` section for each provider, [go here](/platform/workflow/resource/notification/).

###3. Add the notification resource to deploy job

You can now add the notification resource using the `NOTIFY` tag to any of the following sections of your [deploy](/platform/workflow/job/deploy/) job :

* `on_start` specifies that notifications are sent when the job starts.
* `on_success` specifies that notifications are sent when the job completes successfully.
* `on_failure` specifies that notifications are sent when the job fails.
* `on_cancel` specifies that notifications are sent when the job is canceled.
* `always` specifies that notifications are sent when the job succeeds, fails, errors, or is canceled.

For our [Single container application](/deploy/cd_of_single_container_applications_to_orchestration_platforms), the deploy job would look like this if we wanted to send notifications for all the events above. You can customize this based on your requirements:

```
jobs:

  - name: app_deploy_job
    type: deploy
    on_start:
      - NOTIFY: app_deploy_notification   # set to name of notification resource created in step 2
    on_success:
      - NOTIFY: app_deploy_notification   # set to name of notification resource created in step 2
    on_failure:
      - NOTIFY: app_deploy_notification   # set to name of notification resource created in step 2
    on_cancel:
      - NOTIFY: app_deploy_notification   # set to name of notification resource created in step 2
    always:
      - NOTIFY: app_deploy_notification   # set to name of notification resource created in step 2
    steps:
      - IN: deploy_manifest
      - IN: deploy_cluster
```

## Ask questions on Chat

Feel free to engage us on Chat if you have any questions about this document. Simply click on the Chat icon on the bottom right corner of this page and someone from our customer success team will get in touch with you.

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
