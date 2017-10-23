page_main_title: notification
main_section: Platform
sub_section: Workflow
sub_sub_section: Resources

# notification
`notification` resource is used to connect DevOps Assembly Lines to notification providers of your choice. These are providers we currently support:

* Email
* Hipchat
* IRC
* Slack

You can send notifications upon the following events in your workflow:

* Job started (on_start)
* Job completed successfully (on_success)
* Job failed (on_failure)
* Job canceled (on_cancel)

You can create a `notification` resource by [adding](/platform/tutorial/workflow/crud-resource#adding) it to `shippable.resources.yml`

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
	- Email - No integration required
	- [HipChat](/platform/integration/hipchatKey)
	- IRC - No integration required
	- [Slack](/platform/integration/slack)

* **`pointer`** -- is an object that contains provider specific properties
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
	            - "#beta"
	            - "@botnot"

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

## Used in Jobs
This resource is used as a `NOTIFY` for all jobs.  For more information, see the [jobs overview](/platform/workflow/job/overview).


## Default Environment Variables
Whenever `notification` is used as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

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
