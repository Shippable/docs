page_main_title: Git Credential
main_section: Platform
sub_section: Integrations
page_title: Git credential integration
page_description: How to create and use a Git Credential Integration to connect Shippable DevOps Assembly Lines platform to Source Control Systems over HTTP protocol.

# Git Credential Integration

Available under the Integration Family: **generic**

`Git Credential` Integration is used to connect Shippable DevOps Assembly Lines platform to Source Control Systems over HTTP protocol. Typically this happens for public projects by default, but for private projects we always use SSH. In some cases, especially using Git LFS on Bitbucket, it breaks. Hence this is a way you can override the default cloning method

You can create this from the integrations page by following instructions here: [Adding an account integration](/platform/tutorial/integration/howto-crud-integration/).

This is the information you would require to create this integration:

* **Name** -- friendly name for the integration
* **Host** -- Http/s address to your source control system
* **Port** -- Connection Port on your host
* **Username** -- Username to connect to your SCM
* **Password** -- Password to connect to your SCM

## Resources that use this Integration
Resources are the building blocks of assembly lines and some types of resources refer to integrations by their names. The following resource types can be created with a `Git Credential` integration.

* [ciRepo](/platform/workflow/resource/cirepo)

## Default Environment Variables
When you create a resource with this integration, and use it as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. Any numbers at the beginning of the name are also removed to create a valid variable. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

| Environment variable						         | Description        |
| ------			 							         |----------------- |
| `<NAME>`\_INTEGRATION\_NAME       	| Name supplied in the integration |
| `<NAME>`\_INTEGRATION\_HOST   		| Host supplied in the integration |
| `<NAME>`\_INTEGRATION\_PORT   		| Port supplied in the integration |
| `<NAME>`\_INTEGRATION\_USERNAME   	| Username supplied in the integration |
| `<NAME>`\_INTEGRATION\_PASSWORD   	| Password supplied in the integration |

## Shippable Utility Functions
The platform also provides a command line utility called [`shipctl`](/platform/tutorial/workflow/using-shipctl/) that can be used to retrieve the values of these environment variables.

The specific function that can be used in the jobs yml is: `shipctl get_integration_resource_field <resource name> <field name>`.

Here is a table that provides the mapping from the environment variable to the field name.

| Environment variable						| Field Name        |
| ------			 							|----------------- |
| `<NAME>`\_INTEGRATION\_HOST   		| host |
| `<NAME>`\_INTEGRATION\_PORT   		| port |
| `<NAME>`\_INTEGRATION\_USERNAME   	| username |
| `<NAME>`\_INTEGRATION\_PASSWORD   	| password |

More information on other utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [RunSh Job](/platform/workflow/job/runsh)
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
