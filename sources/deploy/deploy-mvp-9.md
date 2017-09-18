page_main_title: Sending notifications upon deployments.
main_section: Deploy
sub_section: How To

# Sending notifications upon deployments.

After your application is deployed to a container orchestration platform, you might want to be notified if the application was deployed successfully or on failure of deployment. Shippable supports notifications by email and via popular messaging services such as Slack, HipChat and IRC.

You can send notifications upon the following events in your workflow:

* Deployment started
* Deployment completed successfully
* Deployment failed
* Deployment canceled

## Assumptions

We will use the [Single container application](/deploy/cd_of_single_container_applications_to_orchestration_platforms) as an example and add notifications to it.

## DevOps Assembly Line

**Resources (grey boxes)**

We add the following resource to the [Single container application](/deploy/cd_of_single_container_applications_to_orchestration_platforms)  -

- `app_notification` is a [notification](/platform/workflow/resource/cluster/) resource that is used to connect the DevOps Assembly Line to notification provider of your choice.


## Step by Step instructions

###1.  Define `app_notification`.
* Description: `app_notification` represents the notification provider that sends notifications about the state of your deployment. In our example, we're using Slack.
* Required: Yes.
* Integrations needed: Slack

The following messaging service providers are supported :

- [Slack](/platform/integration/slack/)
- [HipChat](/platform/integration/hipchat/)
- [IIRC](/platform/integration/irc/)

    **Steps**  

    - Create an account integration using your Shippable account for your notification provider.
    Instructions to create an integration can be found [here](http://docs.shippable.com/platform/tutorial/integration/howto-crud-integration/).

    - Set the friendly name of the integration as `app_notification_provider`. If you change the name,
    please change it also in the yml below.

* Yml block

```
resources:
  - name:           app_notification
    type:           notification
    integration:    app_notification_provider
    pointer:
      recipients:
        - "#beta"
        - "@botnot"
```

###2. Add the notification resource to one of the following sections of the deploy job.

* `on_start` specifies that notifications are sent when the job starts.
* `on_success` specifies that notifications are sent when the job completes successfully.
* `on_failure` specifies that notifications are sent when the job fails.
* `on_cancel` specifies that notifications are sent when the job is canceled.
* `always` specifies that notifications are sent when the job succeeds, fails, errors, or is canceled.

```
jobs:

  - name: deploy_job
    type: deploy
    on_start:
      - NOTIFY: deploy_notification
    on_success:
      - NOTIFY: deploy_notification
    on_failure:
      - NOTIFY: deploy_notification
    on_cancel:
      - NOTIFY: deploy_notification
    always:
      - NOTIFY: deploy_notification
    steps:
      - IN: deploy_manifest
      - IN: deploy_cluster
```

## Ask questions on Chat

Feel free to engage us on Chat if you have any questions about this document. Simply click on the Chat icon on the bottom right corner of this page and someone from our customer success team will get in touch with you.

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
