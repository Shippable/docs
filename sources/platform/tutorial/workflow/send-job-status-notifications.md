page_main_title: Sending job status notifications
main_section: Platform
sub_section: Workflow
sub_sub_section: Tutorials

# Sending job status notifications

You might want to notify someone over email or send a message to a Slack room when specific events occur. Shippable offers a way to send notifications for the following events:

* When a job starts
* When a job is successful
* When a job fails
* When a job is canceled
* When a job completes executing, regardless of success or failure

We support the following notification types:

* Slack
* Email
* Hipchat
* IRC public channels
* Webhooks, which can be used to notify most notification providers

The instructions below show how you can configure a `runSh` job to send notifications. All workflow jobs support a similar configuration. To learn how to send notifications from a CI job, please refer to the [CI notifications](/ci/send-notifications) docs.

## Instructions

* Identify the job you want to send notifications from.

* In you want to send Slack or Hipchat notifications, create an integration for the notification type you want to send. Instructions to add an integration are [here](/platform/tutorial/integration/subscription-integrations/#create-sub-integration). For help with completing the integration input fields for a specific provider, refer to the relevant document below:
    * [Slack](/platform/integration/slackKey)
    * [Hipchat](/platform/integration/hipchatKey)

While creating the integration, please ensure that you set scopes to include the project(s) that contains your **shippable.yml** config.

* Define a `notification` resource in **shippable.yml**. The config shown below is for Slack, but config for other providers is available in the [notification resource reference document](/platform/workflow/resource/notification):

```
resources:
  - name: slack_notif
    type: notification
    integration: mySlackIntegration # Replace with name of your integration
    versionTemplate:
      recipients:
        - "#prod-notifications"  # Replace with the Slack room name you want
```

* Update your job configuration in **shippable.yml**. The snippet below shows all possible configurations (`on_start`, `on_success`, `on_failure`, `on_cancel`, `always`), but you can configure the ones you need:

```
jobs:
  - name: prod_deploy
    type: runSh
    on_start:                                    
      - NOTIFY: slack_notif  # name of the resource created in earlier step    
    steps:
      - IN: staging_deploy
        switch: off
      - TASK:
          name: print_hello_world
          script:
            - echo "Hello world"  
    on_success:                                    
      - NOTIFY: slack_notif  # name of the resource created in earlier step
    on_failure:                                    
      - NOTIFY: slack_notif  # name of the resource created in earlier step    
    on_cancel:                                    
      - NOTIFY: slack_notif  # name of the resource created in earlier step    
    always:                                    
      - NOTIFY: slack_notif  # name of the resource created in earlier step }            
```

* Commit the changes above to **shippable.yml**. This will automatically update your existing workflow to include the notifications. If this is a brand new workflow, you can add your config to Shippable by following [instructions here](/platform/tutorial/workflow/add-assembly-line).

 * Next time your job runs, check to see if notifications work as expected.
