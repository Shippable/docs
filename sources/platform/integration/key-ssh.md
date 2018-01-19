page_main_title: SSH Keys (Deprecated)
main_section: Platform
sub_section: Integrations
sub_sub_section: Deprecated
page_title: SSH keys integration (Deprecated)

# SSH Keys Integration (Deprecated)

## Deprecation Note
This integration has been deprecated. A new integration called [sshKey](/platform/integration/sshKey) of type generic has been introduced which can be used instead.

If you have any existing SSH Key account integrations of type hub, you can continue to use them.

---

**SSH Key** Integration is used to connect Shippable DevOps Assembly Lines platform to VMs that allow SSH based auth. This is typically used to SSH in and then run activities on the machine. Tools like Terraform and Ansible use this to execute scripts on a machine.

## Adding account integration

Since this integration has been deprecated, you cannot create new account integrations for it, but can only edit/delete the exisiting ssh-key integrations. You can use the [sshKey](/platform/integration/sshKey) integration instead which will work exactly the same way as the deprecated ssh-key integration.

## Usage in CI

* [Using SSH keys in your CI workflow](/ci/ssh-keys/)

## Usage in Assembly Lines

The SSH key integration can be used in the following [resources](/platform/workflow/resource/overview/):

* [integration](/platform/workflow/resource/integration)

### Default Environment Variables
When you create a resource with this integration, and use it as an `IN` or `OUT` for a `runSh` or `runCI` job, a set of environment variables is automatically made available that you can use in your scripts.

`<NAME>` is the the friendly name of the resource with all letters capitalized and all characters that are not letters, numbers or underscores removed. Any numbers at the beginning of the name are also removed to create a valid variable. For example, `my-key-1` will be converted to `MYKEY1`, and `my_key_1` will be converted to `MY_KEY_1`.

| Environment variable						| Description                         |
| ------------- 								|------------------------------------ |
| `<NAME>`\_INTEGRATION\_NAME   			| Name supplied in the integration |
| `<NAME>`\_INTEGRATION\_PUBLICKEY		| Public Key supplied in the integration |
| `<NAME>`\_INTEGRATION\_PRIVATEKEY		| Private Key supplied in the integration |
| `<NAME>`\_INTEGRATION\_PUBLIC\_KEY\_PATH		| Path of a file containing the public key supplied in the integration |
| `<NAME>`\_INTEGRATION\_PRIVATE\_KEY\_PATH		| Path of a file containing the private key supplied in the integration |

### Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [RunSh Job](/platform/workflow/job/runsh)
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
