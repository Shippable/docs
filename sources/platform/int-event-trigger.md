page_main_title: Event Trigger
main_section: Platform
sub_section: Integrations
page_title: Event Trigger integration

# Event Trigger Integration
Available under the Integration Family: **Notifications**

`Event Trigger` Integration is used to connect Shippable DevOps Assembly Lines platform so that you can

* Create daisy chain of projects, so that you can trigger one from another
* Send a webhook to an external service with custom payloads 

You can create this from the integrations page. This is the information you would require to create this integration

* **Name** -- friendly name for the integration
* **Trigger endpoint** -- Dropdown with following values
	* project -- used to trigger other CI projects on Shippable. (Deprecated feature - You can achieve this more easily with Assembly Lines)
		* Authorization -- Shippable API Token. Format `apiToken ae45edaa-adfa-bgdf-ae45edaaae45`
	* Generic Webhook -- used to send payload to external entities
		* WebhookURL -- endpoint to send payload to
		* Authorization -- Token based auth to the external URL

## Resources that use this Integration
Resources are the bulding blocks of assembly lines and some types of resource refer to Integrations by their name. The following Resources Types can created with `Event Trigger` Integration 

* [notification]()
* [ciRepo]()

## Default Environment Variables
When you create a Resource with this integration, and use it as an `IN` or `OUT` into a Job that can execute user defined scripts, a set of environment variables are configured by the platform that may be useful to set the context before user defined scripts execute as part of the Job. These are variables available when this Resource is used

`<NAME>` is the the friendly name of the Resource

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_INTEGRATION\_PROJECT			| Shippable Project ID  |
| `<NAME>`\_INTEGRATION\_WEBHOOKURL		| Webhook URL, it is available for Generic Webhooks only |
| `<NAME>`\_INTEGRATION\_AUTHORIZATION	| Authorization token that was set in the integration  |

## Further Reading
* GKE integration
* AWS integration
* runSH job
* runCLI job
* runCI job
* How to setup CI for my git repo

## TODO
| Tasks   |      Status    |
|----------|-------------|
| Hotlinking |  Open |
| Further Reading needs thinking|  Open |
