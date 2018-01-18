page_main_title: Quay.io (Deprecated)
main_section: Platform
sub_section: Integrations
sub_sub_section: Deprecated
page_title: Quay integration (Deprecated)

# Quay Integration (Deprecated)

## Deprecation Note
This integration has been deprecated. A new integration called [Quay.io quayLogin](/platform/integration/quayLogin) of type generic has been introduced which can be used instead.

If you have any existing Quay account integrations of type hub, you can continue to use them.

---

The [CoreOs Quay](https://quay.io/) Integration is used to connect Shippable DevOps Assembly Lines platform to Quay Docker Registry so that you can pull and push Docker images.

## Adding account integration

Since this integration has been deprecated, you cannot create new account integrations for this, you can only edit/delete the exisiting Quay.io integrations. You can use the new [Quay.io quayLogin](/platform/integration/quayLogin) instead.

## Usage in CI

* [Using a custom image for CI](/ci/custom-docker-image/)
* [Pushing artifacts to Quay](/ci/push-quay/)

## Usage in Assembly Lines

The Quay integration can be used in the following [resources](/platform/workflow/resource/overview/):

* [image](/platform/workflow/resource/image)
* [integration](/platform/workflow/resource/integration)

### Default Environment Variables
When you create a resource with this integration, and use it as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. Any numbers at the beginning of the name are also removed to create a valid variable. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_INTEGRATION\_USERNAME   		| Username supplied in the integration |
| `<NAME>`\_INTEGRATION\_PASSWORD			| Password supplied in the integration |
| `<NAME>`\_INTEGRATION\_EMAIL			| Email supplied in the integration |
| `<NAME>`\_INTEGRATION\_ACCESSTOKEN		| Access Token supplied in the integration |

### Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [RunSh Job](/platform/workflow/job/runsh)
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
