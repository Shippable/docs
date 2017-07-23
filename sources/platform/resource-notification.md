page_main_title: notification
main_section: Platform
sub_section: Resources

#TODO
| Tasks   |      Status    | 
|----------|-------------|
| Hotlinking |  Open | 
| Further Reading needs thinking|  Open |
| Need to pointer for each integration type|  Open |

# notification
`notification` resource is used to connect DevOps Assembly Lines to notification providers of your choice. These are providers we currently support

* E-mail
* Hipchat
* Slack
* IRC

You can send notifications upon following events occuring in your workflow:

* Job starts (on_start)
* Job is completed successfully (on_success)
* Job failed (on_failure)
* Job canceled (on_cancel)

You can create a notification resource by [adding](resources-working-wth#adding) it to `shippable.resources.yml`

```
resources:
  - name: 			<string>
    type: 			notification
    integration: 	<string>
    pointer:		<object>
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `cliConfig`

* **`integration`** -- name of the integration. Currently supported integrations are 
	* Slack
	* Hipchat
	* Email - no integration is required
	* IRC - no integration is required

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

# Used in JOBs
This resource is used as an IN for the following jobs

* All job types

# Further Reading
* Integrations overview
* AWS integration
* runCLI job
* Sending notifications when a Job starts, finishes or errors
* Alerting teams with key metrics from CI
