page_main_title: Bitbucket
main_section: Platform
sub_section: Integrations
page_title: Bitbucket integration
page_description: How to create and use a Bitbucket Integration in Shippable

# Bitbucket Integration

Available under the Integration Family: **SCM**

`Bitbucket` Integration is used to connect Shippable DevOps Assembly Lines platform to bitbucket.org. There are 3 ways in which this type of integration can be added:

* You sign in to Shippable with Bitbucket credentials. In this case, we automatically set up an Account Integration named `Bitbucket` for you. This integration is the default one that we use when you enable CI projects for your repos and sync your permissions with Bitbucket.
* Second, you can manually add this to your [account integrations](/platform/tutorial/integration/howto-crud-integration/). This takes a Bitbucket APO `Token` value as input and gives you whatever level of access as the token has.
* Third, if you used another method of signing into Shippable, then from your _Account Profile_ you can connect your Bitbucket account to have multi-provider login to your account

## Creating an Account Integration

You can add this account integration by following steps on the [Adding an account integration](/platform/tutorial/integration/howto-crud-integration/) page.

Here is the information you need to create this integration:

* **Integration type** -- **Bitbucket**
* **Name** -- choose a friendly name for the integration
* **URL** -- your Bitbucket API endpoint. This is already hard-coded to https://bitbucket.org
* **Token** -- Your Bitbucket token with the permissions needed to run your jobs

## Usage in Assembly Lines

The Bitbucket integration can be used in the following [resources](/platform/workflow/resource/overview/):

* [gitRepo](/platform/workflow/resource/gitrepo)
* [ciRepo](/platform/workflow/resource/cirepo)
* [syncRepo](/platform/workflow/resource/syncrepo)

### Default Environment Variables
When you create a resource with this integration, and use it as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. Any numbers at the beginning of the name are also removed to create a valid variable. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_INTEGRATION\_URL    			| Bitbucket API location |
| `<NAME>`\_INTEGRATION\_TOKEN			| The Token used to connect to Bitbucket |

### Shippable Utility Functions
The platform also provides a command line utility called [`shipctl`](/platform/tutorial/workflow/using-shipctl/) that can be used to retrieve the values of these environment variables.

The specific function that can be used in the jobs yml is: `shipctl get_integration_resource_field <resource name> <field name>`.

Here is a table that provides the mapping from the environment variable to the field name.

| Environment variable						| Field Name        |
| ------			 							|----------------- |
| `<NAME>`\_INTEGRATION\_URL    			| url |
| `<NAME>`\_INTEGRATION\_TOKEN			| token |

More information on other utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [RunSh Job](/platform/workflow/job/runsh)
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
