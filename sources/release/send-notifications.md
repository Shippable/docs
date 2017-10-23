page_main_title: Sending notifications
main_section: Release
sub_section: Before you start

# Sending job status notifications

You can send notifications about job status by adding the `on_start`, `on_success`, or `on_failure` tags to any job of any type.

To set up notifications, follow the step below:

###Step 1: Create an account integration

This step is only required for Slack or Hipchat notifications. For email and IRC, skip this step.

Instructions are at :

- [Create Slack integration](/platform/integration/slack/)
- [Create Hipchat integration](/platform/integration/hipchatKey/)


###Step 2: Update shippable.resources.yml

Next, you should define a [notification resource](/platform/workflow/resource/notification/) in your `shippable.resources.yml`.


####Example: Slack

```
resources:
  - name: slack-notif
    type: notification
    integration: ship-slack
    pointer:
      recipients:
        - "#rc"
```

####Example: Hipchat

```
resources:
  - name: hipchat-notif
    type: notification
    integration: ship-hipchat
    pointer:
      recipients:
        - "#rc"
```

####Example: Email

```
resources:
  - name: email-notif
    type: notification
    pointer:
      method: email
      recipients:
        - "abc@foo.com"
        - "def@foo.com"
```

####Example: IRC

```
resources:
  - name: irc-notif
    type: notification
    pointer:          
      method: irc
      recipients:
        - "chat.freenode.net#channel1"
```

###Step 3: Add the resource to jobs yml

You can use your resource in your `shippable.jobs.yml` to configure when notifications are sent:

```
  - name: your-job-name
    type: your-job-type
    on_start:
      - NOTIFY: <notification resource name>
    on_success:
      - NOTIFY: <notification resource name>
    on_failure:
      - NOTIFY: <notification resource name>
    always:
      - NOTIFY: <notification resource name>
```

* `on_start` specifies that notifications are sent when the job starts.
* `on_success` specifies that notifications are sent when the job completes successfully.
* `on_failure` specifies that notifications are sent when the job fails.
* `always` specifies that notifications are sent when the job succeeds or fails.
