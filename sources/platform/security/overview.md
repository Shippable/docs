page_main_title: Security and permissions features of the Shippable DevOps Assembly Lines Platform
main_section: Platform
sub_section: Security
page_title: Security & Permissions Overview
page_description: Security and permissions features of the Shippable DevOps Assembly Lines Platform

# Security & Permissions

The Shippable DevOps Assembly Lines Platform is built keeping in mind that any security lapses are unforgivable and damaging to all organizations. This includes our own organization, since our customers trust us with their intellectual property.

Please read our blog on [Security best practices at Shippable](http://blog.shippable.com/security-best-practices-shippable-ci-cd-devops) for an overview of how we handle security at Shippable.

The sections below talk about security and permissions feature built into the product to ensure that your automation scripts are secure and you can grant the right level of access to every team member.

## Abstraction of secrets

Shippable provides a couple of ways to abstract your secrets from your automation scripts so that you don't accidentally disclose sensitive information like keys, passwords, tokens, etc.

We support secure environment variables like most CI/CD providers, as well as our preferred method with **Integrations**.

To understand both approaches, please read the docs on [Credentials management](/platform/security/credential-mgmt).

## User permissions

We support the following levels of permissions for your Assembly Lines and jobs:

* Ability to view a job or Assembly Line
* Ability to take an action , e.g. run a job or pin a version of a resource
* No ability to view or take an action

You can configure these permissions through your source control provider and the Shippable platform will respect them.

For more information, read our document on [Managing permissions with RBAC](/platform/security/ci-cd-permissions).

## Additional security considerations

### No separate Shippable Account

We do not require you to create a separate account for Shippable, and instead support sign-in through OAuth with GitHub, Bitbucket, and Gitlab.  As a result, we do not request any sensitive information or store anything unless it been allowed to be publicly shared as part of your source control system.

We do cache the authorization token provided by  GitHub/Bitbucket/Gitlab, but this can be invalidated with a single action which will force you to redo the authentication process. We also store SSH keys that can access your source control repositories, but they are encrypted at rest in Vault and only available during the build process on the builder node.

### No storage of credit card information

If you want to [upgrade your Subscription](/platform/management/subscription/billing/) to a paid plan, someone with Admin privileges for that  Subscription needs to set up billing/payment processing. Nobody else from your organization has any access to billing information.
To handle payments, we use Braintree, which is a PCI compliant 3rd party service. Shippable does not store any information pertaining to credit cards other than a Transaction ID which is used to identity the information on Braintree.

### Build security

When a build is triggered, we spin up a build node and pull your source code on your build node. This is a transient node that is permanently destroyed if there is more than a maximum of 50 minutes of idle time.

Results of a build like logs, reports etc. are stored in our DB or S3 bucket. S3 buckets are secured for every single customer with separate keys and the DB is not accessible to anyone other than the API and operations team.

All build artifacts are deleted permanently when a repo is disabled or a build is deleted.

### BYON Nodes and Shippable Server

For customers who cannot use a SaaS service for compliance reasons or personal preference, we offer two alternatives:

- [BYON Nodes](/platform/runtime/nodes/#custom-nodes), where all the build orchestration happens through SaaS but the actual build nodes can be on-premises behind your firewall with no incoming traffic initiated from our SaaS service, and,
- [Shippable Server](/platform/server/install/), our Enterprise solution that you can install and manage behind your firewall
