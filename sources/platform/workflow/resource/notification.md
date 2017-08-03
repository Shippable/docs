page_main_title: notification
main_section: Platform
sub_section: Workflow
sub_sub_section: Resources

# notification
`notification` resource is used to connect DevOps Assembly Lines to notification providers of your choice. These are providers we currently support

* Email
* Hipchat
* IRC
* Slack

You can send notifications upon following events occuring in your workflow:

* Job starts (on_start)
* Job is completed successfully (on_success)
* Job failed (on_failure)
* Job canceled (on_cancel)

You can create a `notification` resource by [adding](/platform/tutorial/workflow/howto-crud-resource#adding) it to `shippable.resources.yml`

```
resources:
  - name: 			<string>
    type: 			notification
    integration: 	<string>
    pointer:		<object>
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `notification`

* **`integration`** -- name of the integration. Currently supported integrations are
	- [Email](integration/email)
	- [HipChat](integration/hipchat)
	- [IRC](integration/irc) - Not required
	- [Slack](integration/slack) - Not required

* **`pointer`** -- is an object which contains integration specific properties
	* in case of email

	```
	  pointer:
		method: email
	     recipients:
	       - "foo@foo.com"
	       - "boo@boo.com"
	```

	* in case of irc

	```
	  pointer:
		method: irc
	     recipients:
	       - "#beta"
	       - "@botnot"
	```

	* in case of slack

	```
	  integration: <slack integration name>
	  pointer:
	     recipients:
	       - "#beta"
	       - "@botnot"
	```
	* in case of hipchat

	```
	  integration: <hipchat integration name>
	  pointer:
	     recipients:
	       - "#beta"
	       - "@botnot"
	```

## Used in JOBs
This resource is used as an IN for the following jobs

* All job types

## Default Environment Variables
Whenever `notification` is used as an `IN` or `OUT` into a Job that can execute user defined scripts, a set of environment variables are configured by the platform that may be useful to set the context before user defined scripts execute as part of the Job. These are variables available when this Resource is used

`<NAME>` is the the friendly name of the Resource

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_NAME 							| The name of the resource. |
| `<NAME>`\_ID 								| The ID of the resource. |
| `<NAME>`\_TYPE 							| The type of the resource. In this case `notification`|
| `<NAME>`\_INTEGRATION\_`<FIELDNAME>`	| Values from the integration that was used. More info on the specific Integration page|
| `<NAME>`\_OPERATION 						| The operation of the resource; either `IN` or `OUT`. |
| `<NAME>`\_PATH 							| The directory containing files for the resource. |
| `<NAME>`\_POINTER\_METHOD 				| Method defined in the pointer. Available if set |
| `<NAME>`\_POINTER\RECIPIENTS_0 			| Recipients array values 0 to N depending on how many of them are set |
| `<NAME>`\_SOURCENAME    					| SourceName defined in the pointer |
| `<NAME>`\_VERSIONID    					| The ID of the version of the resource being used. |
| `<NAME>`\_VERSIONNUMBER 					| The number of the version of the resource being used. |

## Shippable Utility Functions
To make it easy to GET and SET with these Environment Variables, the platform provides a bunch of utility functions so that you don't need to perform string concatenations etc. to work with this values.

These utility functions are [documented here]()

## Further Reading
* [Jobs](/platform/workflow/job/overview)
* [Resource](/platform/workflow/resource/overview)
