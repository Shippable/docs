page_main_title: JFrog Artifactory
main_section: Platform
sub_section: Integrations
page_title: JFrog Artifactory integration

# JFrog Artifactory Integration

[JFrog Artifactory](https://www.jfrog.com/artifactory/) Integration is used to connect Shippable DevOps Assembly Lines platform to JFrog Artifactory so that you can pull and push artifacts, including Docker images.

## Adding account integration

Since this integration has been deprecated, you cannot create new account integrations for this, you can only edit/delete the exisiting JFrog artifactory integrations. You can use the [JFrog artifactoryKey](/platform/integration/jfrog-artifactoryKey) instead.

## Usage in CI

* [Pushing artifacts to JFrog Artifactory](/ci/push-to-artifactory/)

## Usage in Assembly Lines

The JFrog Artifactory integration can be used in the following [resources](/platform/workflow/resource/overview/):

* [file](/platform/workflow/resource/file)
* [integration](/platform/workflow/resource/integration)

### Default Environment Variables
When you create a resource with this integration, and use it as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

| Environment variable						| Description      |
| ------			 							|----------------- |
| `<NAME>`\_INTEGRATION\_URL				| URL supplied in the integration |
| `<NAME>`\_INTEGRATION\_USERNAME			| Username supplied in the integration |
| `<NAME>`\_INTEGRATION\_PASSWORD			| Password supplied in the integration |

### Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [RunSh Job](/platform/workflow/job/runsh)
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
