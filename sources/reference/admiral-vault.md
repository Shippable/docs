page_main_title: Shippable installer
main_section: Reference
sub_section: Admiral
page_title: Admiral - Vault Configuration
page_description: Admiral Vault Configuration
page_keywords: install, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc, vault

# Admiral Vault Configuration
After running the CLI portion of the Admiral installer, you can visit the UI at the provided URL with the provided token to continue setting up Shippable.

## Admiral UI
When you first log in to the Admiral UI, Vault will not yet be installed or initialized.  Shippable gives you the opportunity to decide if you'd like to install on a single box, connect to an existing instance of Vault, or install a brand new copy of Vault on a separate machine.  This page will discuss installing a new copy on a separate machine.

## Configuration

Once you're in the Admiral UI, you should see a table of options in the "intiialize infrastructure" section.  After the database, there is a section called "secrets".  Vault is the encryption provider that Shippable utilizes, so this is the section we will modify to get Vault set up on a new machine.  Shippable utilizes version `v0.6.0` of vault.

Select the "New Node" radio button, enter the IP address of your machine, and run the command that is displayed.  Once the command is run, check the box beneath it so that we know you've made it far enough in the workflow to proceed with the initialization.

<img src="../../images/reference/admiral/admiral-vault-ui-setup.png" alt="Vault machine setup">

## Installation

You will need to fill in values for the other services listed on the page inside the "initialize infrastructure" section (messaging, state, redis, swarm).  Much like Vault, these services can also be started on the same machine, or on their own machines.

After you've successfully configured all of the services, click the "initialize" button at the bottom of the panel.  This may take a few minutes, as Shippable will be pulling images, installing remote services, and getting the configurations set up.  Clicking the button should set the right-most column to "initializing...", and once the workflow is completed, it should look something like this:

<img src="../../images/reference/admiral/admiral-vault-initialized.png" alt="Finished">

##  Viewing logs and configs

Now that initialization is complete, you can view the logs of the installation, as well as the configurations by selecting the "logs" or "config" buttons.

<img src="../../images/reference/admiral/admiral-vault-logs.png" alt="Vault logs">

<img src="../../images/reference/admiral/admiral-vault-config.png" alt="Vault configuration">


## Unsealing Vault

If the server reboots or vault goes in a [sealed](https://www.vaultproject.io/docs/concepts/seal.html) state, it will be required to
`unseal` it manually (for now). The following steps unseal the vault server.

- `ssh` into the machine that is running vault server.

- run the following commands. Since three keys are required to
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
