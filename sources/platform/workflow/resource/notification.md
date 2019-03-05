page_main_title: notification
main_section: Platform
sub_section: Configuration
sub_sub_section: Resources
page_title: notification resource reference
page_description: notification resource reference

# notification
`notification` resource is used to connect DevOps Assembly Lines to notification providers of your choice. These are providers we currently support:

* Airbrake
* Email
* Hipchat
* IRC
* Slack

You can send notifications upon the following events in your workflow:

* Job started (on_start)
* Job completed successfully (on_success)
* Job failed (on_failure)
* Job canceled (on_cancel)

You can create a `notification` resource by [adding](/platform/tutorial/workflow/crud-resource#adding) it to **shippable.yml**.

- [Latest Syntax (Shippable v6.1.1 and above)](#latestSyntax)
- [Old Syntax (forward compatible)](#oldSyntax)

<a name="latestSyntax"></a>
### Latest Syntax (Shippable v6.1.1 and above)


```
resources:
  - name:             <string>
    type:             notification
    integration:      <string>
    versionTemplate:  <object>
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `notification`

* **`integration`** -- name of the subscription integration, i.e. the name of your integration at `https://app.shippable.com/subs/[github or bitbucket]/[Subscription name]/integrations`. Currently supported providers are:
	- [Airbrake](/platform/integration/airBrakeKey)
	- Email - No integration required
	- [HipChat](/platform/integration/hipchatKey)
	- IRC - No integration required
	- [Slack](/platform/integration/slackKey)

* **`versionTemplate`** -- is an object that contains provider specific properties	
	* For Airbrake,

	        integration: <airbrake integration name>
	        versionTemplate:  # optional
	          recipients:
	            - "12345"  # only one Project ID is allowed

	* For email,

	        versionTemplate:
	          method: email
	          recipients:
	            - "foo@foo.com"
	            - "boo@boo.com"

	* For IRC,

	        versionTemplate:
	          method: irc
	          recipients:
	            - "irc.freenode.net#beta"

	* For Slack

	        integration: <slack integration name>
	        versionTemplate:
	          recipients:
	            - "#beta"
	            - "@botnot"

	* For HipChat,

	        integration: <hipchat integration name>
	        versionTemplate:
	          recipients:
	            - "#beta"
	            - "@botnot"


<a name="oldSyntax"></a>
### Old Syntax (forward compatible)

```
resources:
  - name:           <string>
    type:           notification
    integration:    <string>
    pointer:        <object>
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `notification`

* **`integration`** -- name of the subscription integration, i.e. the name of your integration at `https://app.shippable.com/subs/[github or bitbucket]/[Subscription name]/integrations`. Currently supported providers are:
	- [Airbrake](/platform/integration/airBrakeKey)
	- Email - No integration required
	- [HipChat](/platform/integration/hipchatKey)
	- IRC - No integration required
	- [Slack](/platform/integration/slackKey)

* **`pointer`** -- is an object that contains provider specific properties
	* For Airbrake

	        integration: <airbrake integration name>
	        pointer:
	          recipients:
	            - "12345"  # only one Project ID is allowed

	* For email,

	        pointer:
	          method: email
	          recipients:
	            - "foo@foo.com"
	            - "boo@boo.com"

	* For IRC,

	        pointer:
	          method: irc
	          recipients:
	            - "irc.freenode.net#beta"

	* For Slack

	        integration: <slack integration name>
	        pointer:
	          recipients:
	            - "#beta"
	            - "@botnot"

	* For HipChat,

	        integration: <hipchat integration name>
	        pointer:
	          recipients:
	            - "#beta"
	            - "@botnot"

## Usage in Jobs
This resource can be used as a `NOTIFY` for all job types.  For more information, see the [jobs overview](/platform/workflow/job/overview).

## Usage in shipctl
Instead of including a notification resource as a `NOTIFY` step in one or more of your jobs, you can include it as an `IN` step, and then use [shipctl notify](/platform/tutorial/workflow/using-shipctl/#notify) to utilize it to send custom notifications throughout the build.

At this time, `shipctl notify` only supports notification resources that utilize "Slack" or "webhook" type integrations or have `method: irc` in the resource `versionTemplate` or `pointer`.

### Airbrake
`shipctl notify` can be used with an Airbrake integration to post new deploys to Airbrake. Currently only one Airbrake project ID is supported in the `recipients` section. If more are specified, only the first one will be used by `shipctl notify`. The project ID can also be passed directly to  `shipctl notify` using the `--project-id` option.

For example:
```
- >
	shipctl notify myAirbrakeNotifier --project-id="12345" --type="deploy"  --environment="prod" --username="admin" --repository="$REPO" --revision="$COMMIT" --version="v4" --email="$EMAIL"
```

### Slack
By default, `shipctl notify` will send a simple Slack message payload to the configured recipients.  This payload includes the current date/time and a link back to the current job on Shippable.  Each component of the payload can be individually customized.  For example, options like `--username` or `--icon-url` can be changed to show the name and icon of your own organization rather than Shippable.  The payload will be sent for each recipient defined in the resource.  However, the resource settings can be overridden by using the `--recipient` option, which accepts a single recipient.

For example:
```
- >
	if [ -z "$goals" ]; then
		shipctl notify mySlackNotifier --recipient="#support" --color="#FF3333" --text="goals are not properly defined"
	fi
```
This gives you much more flexibility in how and when your notifications are sent, as well as who receives them under which conditions.

### Webhook
By default, `shiptcl notify` commands that target a resource with a webhook integration will send a default payload to the endpoint defined in the integration.  It is recommended to use the `--payload` option to specify your own customized payload.  This will allow you to configure your build to communicate successfully with any external service that accepts webhooks.

For example:
```
- >
	if [ -z "$goals" ]; then
		shipctl notify myWebhookNotifier --payload=badPayload.json
	else
		shipctl notify myWebhookNotifier --payload=goodPayload.json
	fi
```
Different payloads can be sent under different conditions, and can be filled in using values from the environment.

This gives you much more flexibility in how and when your notifications are sent, as well as who receives them under which conditions.

### IRC
By default, `shipctl notify` will send a simple message payload to the configured channels.  This includes a link back to the current job on Shippable.  The content can be customized.  For example, options like `--username` or `--text` can be changed to configure the nickname used to send the message and the message contents.  The payload will be sent for each recipient defined in the resource.  However, the resource settings can be overridden by using the `--recipient` option, which accepts a single recipient.

For example:
```
- >
	if [ -z "$goals" ]; then
		shipctl notify myIRCNotifier --recipient="irc.freenode.net#support" --text="goals are not properly defined"
	fi
```

This gives you much more flexibility in how and when your notifications are sent, as well as who receives them under which conditions.

## Default Environment Variables
Whenever a `notification` resource is used as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. Any numbers at the beginning of the name are also removed to create a valid variable. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_NAME 							| The name of the resource. |
| `<NAME>`\_ID 								| The ID of the resource. |
| `<NAME>`\_TYPE 							| The type of the resource. In this case `notification`. |
| `<NAME>`\_INTEGRATION\_`<FIELDNAME>`	| Values from the integration that was used. More info on the specific integration page. |
| `<NAME>`\_OPERATION 						| The operation of the resource; either `IN` or `OUT`. |
| `<NAME>`\_PATH 							| The directory containing files for the resource. |
| `<NAME>`\_POINTER\_METHOD 				| Method defined in the pointer. Available if set. |
| `<NAME>`\_POINTER\_RECIPIENTS_0 			| Recipients array values 0 to N depending on how many of them are set |
| `<NAME>`\_SOURCENAME    					| SourceName defined in the pointer. |
| `<NAME>`\_VERSIONID    					| The ID of the version of the resource being used. |
| `<NAME>`\_VERSIONNUMBER 					| The number of the version of the resource being used. |

## Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Jobs](/platform/workflow/job/overview)
* [Resource](/platform/workflow/resource/overview)
