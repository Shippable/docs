page_main_title: Sending notifications after deploying an application to a container orchestration service.
main_section: Deploy
sub_section: How To

# Sending notifications after deploying an application to a container orchestration service.

After your application is deployed to a container orchestration service, you might want to be notified if the application was deployed successfully or on failure of deployment. Shippable supports notifications by email and via popular messaging services such as Slack, HipChat and IRC.

You can send notifications upon the following events in your workflow:

* Job started
* Job completed successfully
* Job failed
* Job canceled

We will use the single container application deployment usecase defined [here](/deploy/deploy-mvp-1) and add notification to it.

##1. Building blocks

### You will need to get familiar with the following platform building blocks:

**Resources**
  - [notification](/platform/workflow/resource/cluster/) resource that is used to connect the DevOps Assembly Line to notification provider of your choice.

**Jobs**
  - [deploy](/platform/workflow/job/deploy/) which deploys a [manifest](/platform/workflow/job/manifest/) to a cluster.

##2. Setup
You need one or more account integrations for this usecase, depending on which provider you want to use to send the notification. You do not need to create any integration for email notifications.

The following messaging service providers are supported :

- [Slack](/platform/integration/slack/)
- [HipChat](/platform/integration/hipchat/)
- [IIRC](/platform/integration/irc/)

Instructions to create an integration for those providers can be found [here](http://docs.shippable.com/platform/tutorial/integration/howto-crud-integration/). Each integration is given a
friendly name and this name will be used in one of the steps below.

##3. Create resources
Resources are defined in your [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/)file, that should be created at the root of your repository. Please find more information [here](/deploy/configuration/).

- Add a [notification](/platform/workflow/resource/cluster/) resource.

```
resources:
  - name:           deploy_notification
    type:           notification
    integration:    <name of the integration created in step 1>
    pointer:        <object>
```

**pointer** is is an object that contains provider specific properties. Go [here](/platform/workflow/resource/notification/) to learn how to define it.

###4. Add the notification resource to the deploy job.

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

* `on_start` specifies that notifications are sent when the job starts.
* `on_success` specifies that notifications are sent when the job completes successfully.
* `on_failure` specifies that notifications are sent when the job fails.
* `on_cancel` specifies that notifications are sent when the job is canceled.
* `always` specifies that notifications are sent when the job succeeds, fails, errors, or is canceled.

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
