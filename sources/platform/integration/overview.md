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

To learn how to create and manage integrations, read our tutorial on [Managing integrations](/platform/tutorial/integration/subscription-integrations).

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
