page_main_title: Managing secrets in Shippable using Integrations
main_section: Platform
sub_section: Security
page_title: Managing secrets in Shippable using Integrations
page_description: How to manage secrets in Shippable using Integrations

# Secrets

Most CI/CD providers offer a way for you to encrypt your secrets so that you're not forced to include passwords, token, and other sensitive information in plain text in your automation scripts. At Shippable as well, we support [secure environment variables](/platform/tutorial/security/encrypt-vars) which are encrypted key:value pairs you can use in your configuration.

However, we believe that encrypted strings are problematic due to the unwieldiness of managing a completely meaningless sequence of characters. For example:

<img src="/images/platform/security/ugly-secure-var.png" alt="Secure variables are very inflexible to use">

As an example, consider the following scenarios:

1. Paul, the Engineering Lead for AmazingFoo, has used secure variables to encrypt his credentials to integrate various cloud providers and third-party tools with their deployment pipelines. Paul gets an offer from EvenMoreAmazingFoo and switches jobs. As a security measure and because Paul's account will soon be deactivated, the AmazingFoo team now wants to use new credentials. Finding all instances where Paul used the original credentials is painful, and so is the process of generating new secrets and replacing them all over automation scripts.

2. John realizes he has to reset the key used to encrypt secrets as a mitigation for a security issue. This means he has to regenerate all secure variables with the new key and then update all automation scripts with the new secure variables.

3. Mary is a newly hired developer at AmazingFoo. She reads the existing automation scripts and sees a bunch of secure variables which mean nothing to her and make the scripts harder to understand.

To improve the experience around handling secrets, we have introduced the concept of **Integrations** described below.

##How integrations work on Shippable

Integrations allow users to store their sensitive information with a friendly name that can be used to configure CI or Assembly Line workflows. These Integrations are encrypted at rest and in flight, and are stored in our Vault.

Here is how integrations work at a high level:

- You add your secrets as integrations to your account and set permissions on those secrets. This means that only the subscriptions or repositories you choose will have access to your integrations.
- You refer to the integrations with their friendly name in your YAML.

<img src="/images/platform/security/adding-integrations.png" alt="Adding integrations">

Let's see how the scenarios above will play out with integrations:

1. The team at AmazingFoo follows [instructions to update the integration](/platform/tutorial/integration/howto-crud-integration/#updating-a-subscription-integrations-underlying-account-integration) in one place. No automation scripts have to be changed.

2. There is no action required for this scenario since integrations are not encrypted with project/subscription keys. Everything will work as expected.

3. Mary can easily read automation scripts since friendly names tell her exactly what the credentials are. For example, she can easily understand that `prodAzureCreds` means production credentials for Azure. If a friend;y name is not-so-friendly, she can go to the Shippable UI and see the type of integration as well as who added it.

Integrations protect your sensitive information while still providing transparency and being much easier to manage.

For a list of supported Integrations, [read our docs here](/platform/integration/overview).

##Further Reading

- [Integrations overview](/platform/integration/overview)
- [Working with Integrations](/platform/tutorial/integration/howto-crud-integration)
- [Encryption with secure variables](/platform/tutorial/security/encrypt-vars)
