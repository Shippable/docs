page_main_title: Overview
main_section: Platform
sub_section: Configuration
sub_sub_section: Integrations
page_title: Integrations overview
page_description: Overview of all supported Integrations that connect your Shippable CI or CD workflows to third party platforms or services and manage secrets that might be needed by your applications

# Integrations Overview

Integrations are used to connect your Shippable CI or CD workflows to third party platforms or services and manage secrets that might be needed by your applications. Examples are tokens, keys, passwords, or even key-value pairs.

The biggest advantages of our design for integrations are:

* Integrations are created in the UI and used with friendly names in your YAML config. This means you do not have to touch your automation scripts when an integration is updated.
* Integrations are securely stored in a <a href="https://www.vaultproject.io/">Vault store</a> and encrypted at rest and in-flight. Since you do not have to encrypt anything yourself, they are human readable by those who have been granted access.
* Integrations values are not revealed in logs unless you choose to print them out as part of your workflow.
* You can scope each integration to allow or deny access for repositories or roles.

We are big believers in the concept that secrets need to be separated from scripts for better security and privacy.

## Managing integrations

You can create integrations at a **Subscription level** or an **Account Level**.

### Subscription integrations (recommended for teams)

A Subscription integration is owned by the Subscription and not by a specific user. A Subscription admin can set role-based access at an Admin, Member, or Collaborator levels. Subscription integrations can be scoped to be used by a subset (or all) of repositories within that Subscription.

You need a Subscription integration in order to use the integration in your CI and Assembly Lines configuration file **shippable.yml**.

To learn more about creating and managing subscription integrations, please read our documentation on [Subscription integrations](/platform/tutorial/integration/subscription-integrations).

### Account integrations

An Account integration is owned by the user who creates it in their Shippable account. No other person can view the values for these integrations or update them, other than the owner. Account integrations can be scoped to be used across several subscriptions (i.e. Github organizations or Bitbucket teams) that you have access to.

To learn more about creating and managing account integrations, please read our documentation on [Account integrations](/platform/tutorial/integration/howto-crud-integration).

## Supported integration types

### Orchestration Platform Integrations

- [Amazon ECS](/platform/integration/aws-iam)
- [Kubernetes](/platform/integration/kubernetes)
- [Google Container Engine](/platform/integration/gcloudKey)
- [Azure](/platform/integration/azure-keys/)
- [Azure DC/OS](/platform/integration/azureDcosKey)
- [Docker Cloud](/platform/integration/dclKey)
- [Docker Datacenter](/platform/integration/ddcKey)
- [Joyent Triton](/platform/integration/joyentTritonKey)

### Docker Registry Integrations

- [AWS ECR](/platform/integration/aws-keys)
- [Docker Hub](/platform/integration/dockerRegistryLogin)
- [Docker Trusted Registry](/platform/integration/dockerRegistryLogin)
- [Docker Private Registry](/platform/integration/dockerRegistryLogin)
- [Google Container Registry](/platform/integration/gcloudKey)
- [Quay](/platform/integration/quayLogin)
- [JFrog](/platform/integration/jfrog-artifactoryKey)

### SCM Integrations

- [Bitbucket](/platform/integration/bitbucket)
- [GitHub](/platform/integration/github)
- [GitHub Enterprise](/platform/integration/github-enterprise)
- [GitLab](/platform/integration/gitlab)
- [Git Credential](/platform/integration/git-credential)

### Notification Integrations

- [HipChat](/platform/integration/hipchatKey)
- [Slack](/platform/integration/slackKey)

### Miscellaneous Integrations

- [Key-Value Pair](/platform/integration/key-value)
- [PEM keys](/platform/integration/pemKey)
- [SSH keys](/platform/integration/sshKey)
- [Digital Ocean](/platform/integration/do)
- [Google Cloud](/platform/integration/gcloudKey)
- [Webhook](/platform/integration/webhook)

## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [RunSh Job](/platform/workflow/job/runsh)
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
