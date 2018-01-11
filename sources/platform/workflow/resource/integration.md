page_main_title: integration
main_section: Platform
sub_section: Workflow
sub_sub_section: Resources

# integration
`integration` resource is used to represent credentials that have been encrypted using Shippable Integrations.

You can create a `integration` resource by [adding](/platform/tutorial/workflow/crud-resource#adding) it to `shippable.yml`.

- [Latest Syntax (Shippable v6.1.1 and above)](#latestSyntax)
- [Old Syntax (forward compatible)](#oldSyntax)

<a name="latestSyntax"></a>
## Latest Syntax (Shippable v6.1.1 and above)

```
resources:
  - name:           <string>
    type:           integration
    integration:    <string>
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `integration`

* **`integration`** -- name of the subscription integration, i.e. the name of your integration at `https://app.shippable.com/subs/[github or bitbucket]/[Subscription name]/integrations`. All [Shippable Integrations](/platform/integration/overview/) can be used here


<a name="oldSyntax"></a>
## Old Syntax (forward compatible)

```
resources:
  - name:           <string>
    type:           integration
    integration:    <string>
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `integration`

* **`integration`** -- name of the subscription integration, i.e. the name of your integration at `https://app.shippable.com/subs/[github or bitbucket]/[Subscription name]/integrations`. All [Shippable Integrations](/platform/integration/overview/) can be used here

## Used in Jobs
This resource is used as an IN for the following jobs

* [runSh](/platform/workflow/job/runsh)
* [runCI](/platform/workflow/job/runci)

## Default Environment Variables
Whenever `integration` is used as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_NAME 							| The name of the resource. |
| `<NAME>`\_ID 								| The ID of the resource. |
| `<NAME>`\_TYPE 							| The type of the resource. In this case `integration`. |
| `<NAME>`\_INTEGRATION\_`<FIELDNAME>`	| Values from the integration that was used. More info on the specific integration page. |
| `<NAME>`\_PATH 							| The directory containing files for the resource. |
| `<NAME>`\_OPERATION 						| The operation of the resource; either `IN` or `OUT`. |
| `<NAME>`\_VERSIONID    					| The ID of the version of the resource being used. |
| `<NAME>`\_VERSIONNUMBER 					| The number of the version of the resource being used. |

**Some special cases depending on the `integration` used**

* If the integration is of type [Key-Value pair](/platform/integration/key-value), the key-values are exported as-is without adding `RESOURCENAME_INTEGRATION_` in the key name. They act like [params](/platform/workflow/resource/params) resources, but are stored encrypted for security reasons.

* If the integration of type [sshKey](/platform/integration/sshKey) or [pemKey](/platform/integration/pemKey) is used, the environment variable will mess up the key structure due to carriage returns. Hence the platform will extract the private key into a file and puts the location in the environment variable below.

	| Environment variable        |  Description                               |
	|-----------------------------|--------------------------------------------|
	| `<NAME>`\_KEYPATH           | points directly to the private key file.   |


## Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Jobs](/platform/workflow/job/overview)
* [Resource](/platform/workflow/resource/overview)
* [Supported CLIs](/platform/runtime/overview#cli)
