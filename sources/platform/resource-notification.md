page_main_title: notification
main_section: Platform
sub_section: Resources

# notification
A `notification` resource is used to add a notification type so that you can send our notifications for the following events:

* Job starts (on_start)
* Job is completed successfully (on_success)
* Job failed (on_failure)
* Job canceled (on_cancel)

Email, Hipchat, IRC and Slack notifications are supported for all job types as of now.

## Configuration reference
You can create a notification resource by adding it to `shippable.resources.yml`

```
resources:
  - name: <string>              #required
    type: notification          #required
    integration: <string>       #required for Slack and Hipchat
    pointer:
      method: email | irc       #required for email and IRC
      recipients:
        - "#beta"               #required
        - "@trriplejay"         #optional
```

The events for which this notification is sent out are configured in the jobs yml.


* `name` should be an easy to remember text string. This will appear in the visualization of this resource in the SPOG view. It is also used to refer to this resource in the `shippable.jobs.yml`. If you have spaces in your name, you'll need to surround the value with quotes, however, as a best practice we recommend not including spaces in your names.

* `type` is always set to 'notification'.

* `integration` is only required for sending Slack and Hipchat notifications. The value should be set to the name of the integration that contains your credentials to connect to Slack or Hipchat.
	* To learn how to add a Slack integration to your subscription, read the **Adding a Slack Integration** section on our [Slack integrations page](int-slack/)
	* To learn how to add a Hipchat integration to your subscription, read the **Adding a Hipchat Integration** section on our [Hipchat integrations page](int-hipchat/)

* `pointer` section provides information about recipients.

	* `method` is required for **email and irc only** and should always be set to `email` if you want to send notifications to an email address or `irc` if you want to send it to a particular irc room.

	* `recipients` is an array specifying who should receive notifications. For email notifications, include email addresses where you want to send notifications. For irc notifications, include the public rooms you want to send the notifications to. Say you have a channel named `shippable` hosted on a server `webchat.freenode.net` then your recipients should look like this: `"webchat.freenode.net#shippable"`. For Slack notifications, include channel names or slack usernames where notifications should be sent. Slack channels/users should be entered in double quotes, with a leading # for channels and @ for users. For example, to send to a Slack room foo, specify `"#foo"` and to send to a person tom, specify `"@tom"`.Similarly, for Hipchat notifications, include channel names or Hipchat usernames where notifications should be sent. Hipchat channels/users should be entered in double quotes, with a leading # for channels and @ for users. For example, to send to a Hipchat channel named foo, specify `"#foo"` and to send to a personal message to someone,say tom, specify `"@tom"`.
