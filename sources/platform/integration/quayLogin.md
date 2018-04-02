page_main_title: Quay.io
main_section: Platform
sub_section: Integrations
page_title: Quay integration
page_description: How to create and use a CoreOs Quay Docker Registry Integration in Shippable

# Quay Integration

The [CoreOs Quay](https://quay.io/) Integration is used to connect Shippable DevOps Assembly Lines platform to Quay Docker Registry so that you can pull and push Docker images.

## Creating an Account Integration

You can add this account integration by following steps on the [Adding an account integration](/platform/tutorial/integration/howto-crud-integration/) page.

Here is the information you need to create this integration:

* **Integration type** -- **Quay.io**
* **Name** -- choose a friendly name for the integration
* **Username** -- login to your Quay Account
* **Password** -- password of your Quay Account
* **Email** -- email of your Quay Account
* **Access Token** -- access token of your Quay Account

Instructions to create access tokens [are here](https://docs.quay.io/glossary/access-token.html).

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
