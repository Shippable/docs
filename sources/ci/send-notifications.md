main_section: CI
sub_section: Sending build notifications

#Notifications overview

Shippable supports sending email, Slack, HipChat and IRC notifications. You can configure these notifications in your `shippable.yml` file. Notifications are highly customizable and can be sent for all branches and events, or a subset of both.

For more information and a detailed tutorial on sending notifications, please select your notification provider below:

- <i class="ion-ios-minus-empty"> </i>  [Sending Slack notifications](slack-notifications/)
- <i class="ion-ios-minus-empty"> </i>  [Sending Hipchat notifications](hipchat-notifications/)
- <i class="ion-ios-minus-empty"> </i>  [Sending Email notifications](email-notifications/)
- <i class="ion-ios-minus-empty"> </i>  [Sending IRC notifications](irc-notifications/)

## Default behavior

By default, email notifications are sent to the committer and commit author if they are 'members' of the repository, i.e. they have admin or push permissions to the repository. These default notifications are sent if:

- <i class="ion-ios-minus-empty"> </i>  a build fails
- <i class="ion-ios-minus-empty"> </i>  a previously failing build is now successful

<br>
To send Slack, HipChat, or IRC notifications or to modify the default setting for email notifications, you will need to add some config your yml.
