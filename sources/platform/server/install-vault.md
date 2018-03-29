page_main_title: Shippable Server - Install Vault for secrets
main_section: Platform
sub_section: Shippable Server
sub_sub_section: Configuration
page_title: Shippable Server - Vault Configuration
page_description: Admiral Vault Configuration
page_keywords: install, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc, vault

# Secrets Store (Vault) Configuration

Shippable Server uses Vault as a secrets store, so that your sensitive information like passwords, tokens, keys, etc is stored safely and securely.

You have a few choices of where you want to run your Vault instance:

* Fresh installation on the same machine as Installer
* Fresh installation on a different machine from the Installer (**Recommended**)
* Use an existing Vault instance, either from a previous Shippable installation, or your own instance

Our recommended approach is to do a fresh installation on a machine separate from the installer for space and performance reasons, as well as to avoid port conflicts arising from running too many services on the same machine. Vault can easily be installed on a separate supported OS machine with the Admiral installer by configuring the **Secrets** section.

<img src="/images/platform/server/admiral-vault-config.png" alt="Configuring Vault for secrets store">

## Installing Secrets

When you first log in to the [Admiral UI](/platform/server/install/#the-admiral-ui), Vault will not yet be installed or initialized. Follow the instructions below, depending on where you want to install Vault. The Shippable Server installer installs Vault version **v0.6.0** by default

### Fresh instance on the same machine

To install Vault on the same machine as the one where Admiral is installed, select  **This Node** from the dropdown under `Install secrets on` in the **Secrets** section of the **Control plane** panel in the Admiral UI.

<img src="/images/platform/server/vault-this-node.png" alt="Installing Vault on the current node">

You will need to click the **Apply** button after completing other sections.

### Fresh instance on a new machine

You can choose to install Vault on a separate server from the one where Admiral is installed. This is our recommended approach.

<img src="/images/platform/server/vault-new-node.png" alt="Installing Vault on the current node">

- Select **New Node** from the dropdown under `Install secrets on` for **Secrets** in the **Control plane** panel.
- Enter the IP address where you would like to install Vault.  This should be a supported OS machine with port 8200 accessible to the other Shippable components and services.
- Run the command displayed to allow Admiral SSH access to the machine on the machine chosen and check the box to confirm that this step was completed. SSH access is required to run the installation scripts.

You will need to click the **Apply** button after completing other sections. Installation progress will be shown on the right side of the Control plane panel.

### Connecting to an existing instance

If you have an existing instance of Vault, either left over from a previous Shippable installation or your own instance, you can reuse that with Shippable Server.

To configure this:

<img src="/images/platform/server/vault-existing.png" alt="Reusing an existing Vault instance">

- Select **Existing** for **Secrets** in the **Control plane** panel.
- Enter the IP address of your Vault instance.  This should be a supported OS machine with ports 8200 accessible to the other Shippable components and services.

You will need to click the **Apply** button after completing other sections. Installation progress will be shown on the right side of the Control plane panel.

## Viewing configuration

Once Vault is initializing, you'll be able to view the configuration and logs.

<img src="/images/platform/admiral/admiral-vault-config.png" alt="vault config">

## Viewing logs

The **logs** button (paper clip icon) for **Secrets** will show the logs from installation and initialization.

<img src="/images/platform/admiral/admiral-vault-logs.png" alt="vault logs">

## Unsealing Vault

If the server reboots or vault goes in a [**sealed**](https://www.vaultproject.io/docs/concepts/seal.html) state, it needs to be **unsealed** manually (for now). The following steps unseal the vault server.

- `ssh` into the machine that is running vault server.

- Run the following commands. Since three keys are required to
  unseal vault, the command to unseal has to be run three times with different
  keys.

```bash
$ export VAULT_ADDR='http://127.0.0.1:8200'

$ vault status # this should show `Sealed true`

$ vault unseal # this will prompt for an unseal key. copy and enter UNSEAL_KEY1 from /etc/shippable/admiral.env

$ vault unseal # copy and enter UNSEAL_KEY2 from /etc/shippable/admiral.env

$ vault unseal # copy and enter UNSEAL_KEY3 from /etc/shippable/admiral.env

$ vault status # this should now show `Sealed false`
```
