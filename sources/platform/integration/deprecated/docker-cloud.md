page_main_title: Docker Cloud (Deprecated)
main_section: Platform
sub_section: Integrations
sub_sub_section: Deprecated
page_title: Docker cloud integration (Deprecated)

# Docker Cloud integration (Deprecated)

The [Docker Cloud](https://cloud.docker.com/) Integration is used to connect Shippable DevOps Assembly Lines platform to Docker Cloud so that you can deploy Docker based apps to Docker Cloud.

## Deprecation Note
This integration has been deprecated. A new generic integration called [Docker Cloud](/platform/integration/dclKey) has been introduced which can be used instead.

If you have any existing deprecated Docker Cloud integrations, you can continue to use them in your Assembly lines.

## Creating an Account Integration

Since this integration has been deprecated, you cannot create new account integrations for this, you can only edit/delete the exisiting Docker Cloud integrations. You can use the new generic [Docker Cloud](/platform/integration/dclKey) instead.

## Usage in Assembly Lines

The Docker Cloud integration can be used in the following [resources](/platform/workflow/resource/overview/):

* [cluster](/platform/workflow/resource/cluster)
* [integration](/platform/workflow/resource/integration)

The main scenario for using this integration is to [Deploy an application to Docker Cloud](/deploy/docker-cloud/).

### Default Environment Variables
When you create a resource with this integration, and use it as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. Any numbers at the beginning of the name are also removed to create a valid variable. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_INTEGRATION\_USERNAME   		| Username supplied in the integration |
| `<NAME>`\_INTEGRATION\_TOKEN			| Password supplied in the integration |

### Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading

* [Deploy an application to Docker Cloud](/deploy/docker-cloud/)
