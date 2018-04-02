page_main_title: Google CLoud
main_section: Platform
sub_section: Integrations
page_title: Google Cloud integration
page_description: How to create and use a Google Cloud Integration in Shippable

# Google Cloud Integration

`Google Cloud` Integration is used to connect Shippable DevOps Assembly Lines platform to Google Cloud and manage entities and services provided by Google Cloud.

## Creating an Account Integration

You can create this from the integrations page by following instructions here: [Adding an account integration](/platform/tutorial/integration/howto-crud-integration/).

This is the information you would require to create this integration:

* **Integration Type** -- **Google Cloud**
* **Name** -- Friendly name for the integration
* **JSON Key** -- JSON Security Key for Google Cloud

## Usage in CI
**Note:** Since this is integration is of generic type, it can be plugged into hub section in the following use cases:

* [Using a custom image for CI](/ci/custom-docker-image/)
* [Pushing artifacts to GCR](/ci/push-gcr/)

## Resources that use this Integration in Assembly Lines
Resources are the building blocks of assembly lines and some types of resources refer to integrations by their names. The following resource types can be created with a `Google Cloud` integration.

* [cluster](/platform/workflow/resource/cluster)
* [image](/platform/workflow/resource/image)
* [integration](/platform/workflow/resource/integration)
* [loadbalancer](/platform/workflow/resource/loadbalancer)

### Service Account Permissions
There are three ways to use a Google Cloud integration in Shippable Assembly Lines:

1. automated, managed Kubernetes deployments via managed `deploy` jobs
2. provisioning services in managed `provision` jobs
3. gcloud CLI configuration via `cliConfig` resources in a `runSh` job

For managed [deploy](/platform/workflow/job/deploy) and [provision](/platform/workflow/job/provision) jobs, the key should belong to a service account with a role that has `container.clusters.get` and `container.clusters.getCredentials` permissions. This will allow Shippable to connect to the Kubernetes cluster.

For `cliConfig` resources, you should make sure that your policy allows you to perform whatever actions you plan to take in your custom script.  This could mean permissions to pull images, create clusters, etc.

## Default Environment Variables
When you create a resource with this integration, and use it as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. Any numbers at the beginning of the name are also removed to create a valid variable. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

| Environment variable						| Description      |
| ------			 							|----------------- |
| `<NAME>`\_INTEGRATION\_JSON_KEY		      | JSON key supplied in the integration |

## Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [RunSh Job](/platform/workflow/job/runsh)
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
