page_main_title: webhook
main_section: Platform
sub_section: Configuration
sub_sub_section: Resources
page_title: webhook resource reference
page_description: webhook resource reference

# webhook
Adding a `webhook` resource to your **shippable.yml** gives you a way to trigger one or more jobs in your Assembly Line whenever the associated URL is called using the HTTP POST method.  Any JSON payload that is passed in via the POST call will be stored in the version of the resource.  This resource can be used used as an `IN` input for [any job](/platform/workflow/job/overview/), thus providing access to the received payload.

You can create a `webhook` resource by [adding](/platform/tutorial/workflow/crud-resource#adding) it to your **shippable.yml**.


## YML Definition

```
resources:
  - name:            <string>
    type:            webhook
    versionTemplate: <object>
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `webhook`

* **`versionTemplate`** -- is an object which contains specific properties that apply to this resource.

          versionTemplate:
            webhookKey: "abcd_efgh"

    `webhookKey` can be any valid basic auth password string.  The `name` of the resource acts as the basic auth username.  These values are used in the construction of the `webhookUrl` field which is automatically added by Shippable when the resource is created.

### Usage

Once your new webhook resource has been added to your Assembly Line via your [sync repo](/platform/tutorial/workflow/crud-syncrepo), you can access the generated webhook url by going to the resource page and clicking the "more" button next to the first version.

<img src="/images/platform/resources/webhook/webhookVersion-sanitized.png" alt="webhook resource page">

Any time this url is hit with the appropriate credentials, it will create a new version of the resource and store the passed-in payload. If the authorization and processing is successful, the caller will receive this response with 200 status:
```
{"message":"Webhook processed"}
```

<img src="/images/platform/resources/webhook/webhookNewPayload-sanitized.png" alt="custom payload">

Once the new version is created, all attached jobs will automatically be triggered.


## Examples

You can give this URL to any provider that supports webhooks.  Some examples:

  - [Docker Hub](https://docs.docker.com/docker-hub/webhooks/): receive a payload whenever an image tag is pushed
  - [GitHub](https://developer.github.com/webhooks/): receive a payload for any customizable set of actions taken on a repo
  - [Slack](https://api.slack.com/slash-commands): build your own slash commands to trigger various Assembly Lines

Or, you can simply use a tool like `curl` to post your own payloads

```
curl -XPOST -H "content-type: application/json" https://<resourcename>:<webhookKey>@api.shippable.com/subscriptions/:id/hook -d '{"foo": "hello", "bar": "world"}'
```

If your resource is listed as an `IN` to any job, that job will be triggered once the payload is posted.  If your job is runSh or runCI, then you can write a script that uses the `shipctl` utility to access the payload. For example, a command like this will pretty-print your payload:

```
shipctl get_resource_version_key <webhook_resource_name> payload | jq '.'
```

## Default Environment Variables
Whenever `webhook` is used as an `IN` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers, or underscores removed. Any numbers at the beginning of the name are also removed to create a valid variable. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

| Environment variable            | Description                         |
| -------------                 |------------------------------------ |
| `<NAME>`\_NAME              | The name of the resource. |
| `<NAME>`\_ID                | The ID of the resource. |
| `<NAME>`\_TYPE              | The type of the resource. In this case `time`. |
| `<NAME>`\_OPERATION             | The operation of the resource; either `IN` or `OUT`. |
| `<NAME>`\_PATH              | The directory containing files for the resource. |
| `<NAME>`\_VERSIONID             | The ID of the version of the resource being used. |
| `<NAME>`\_VERSIONNUMBER           | The number of the version of the resource being used. |

## Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Jobs](/platform/workflow/job/overview)
* [Resource](/platform/workflow/resource/overview)
