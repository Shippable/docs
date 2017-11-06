page_main_title: Overview
main_section: Platform
sub_section: Integrations
page_title: Integrations overview

# Integrations Overview
Integrations are used to connect your Shippable CI or CD workflows to third party platforms or services and manage secrets that might be needed by your applications. They are owned by users of our platform and the scope feature allows you to decide which organizations/repos have access to use it in their DevOps activities.

One the biggest benefits of using Shippable DevOps Assembly Line Integrations as opposed to using encrypted strings that contain the connection information is "Separation of Concerns." These are the problems of using encrypted strings:

* The seed key used to encrypt is a single point of failure.
* Rotating the seed key means you have to change the encrypted strings wherever they are used.
* There is no way to know which key that was used to encrypt it purely look at the encrypted string. This means additional DB of what, when, which, and how the values were encrypted which is additional work.
* Scripts if they contain the encrypted values cannot participate in fork-based development. The reason for this is that unless every fork has access to the seed key, they will need to encrypt and replace these values. This means you will have to add it to `.gitignore` so that you don't override the parent's encrypted values. Changing these scripts through PRs is a pain.
* It is impossible to know which values are present in which encrypted strings, which means I have to decrypt to know what is present in the encrypted values.
* If any one of the values to change, unless you know where its used, there is no way to know which encrypted strings need to be updated

In case of Shippable Integrations,

* Internally Shippable is managing encryption at rest and flight which means the users are absolved from worrying about seed keys.
* Since the integration is used in scripts by reference pointers, changing the integration value in one place automatically propagates across every script that is using it. Maintenance of these integrations becomes trivial.
* Users of these integrations never need to know what the values are and since the integrations are well documented, they can correctly assume which keys they should use in their scripts.
* When these integrations are used in certain contexts, the platform automatically logs you in, or configures the CLI, which makes it easy for the script authors to interact with external entities.
* Removing access is as simple as removing the a repo from the scope and the immediate next run will start to fail.
* It is a more secure way of maintaining secrets.

We are big believers in the concept that secrets need to be separated from scripts for better security and privacy. All integrations are stored in our <a href="https://www.vaultproject.io/">Vault store</a> for maximum security.

## Supported Orchestration Platform Integrations

- [Amazon ECS](/platform/integration/aws-iam)
- [Kubernetes](/platform/integration/kubernetes)
- [Google Container Engine](/platform/integration/gcloudKey)
- [Azure](/platform/integration/azure/)
- [Azure DC/OS](/platform/integration/azureDcosKey)
- [Docker Cloud](/platform/integration/docker-cloud)
- [Docker Datacenter](/platform/integration/ddcKey)
- [Joyent Triton](/platform/integration/tripub)

## Supported Docker Registry Integrations

- [AWS ECR](/platform/integration/aws-keys)
- [Docker Hub](/platform/integration/dockerRegistryLogin)
- [Docker Trusted Registry](/platform/integration/dockerRegistryLogin)
- [Docker Private Registry](/platform/integration/dockerRegistryLogin)
- [Google Container Registry](/platform/integration/gcloudKey)
- [Quay](/platform/integration/quayLogin)
- [JFrog](/platform/integration/jfrog-artifactoryKey)

## Supported SCM Integrations

- [Bitbucket](/platform/integration/bitbucket)
- [GitHub](/platform/integration/github)
- [GitHub Enterprise](/platform/integration/github-enterprise)
- [GitLab](/platform/integration/gitlab)
- [Git Credential](/platform/integration/git-credential)

## Supported Notification Integrations

- [HipChat](/platform/integration/hipchatKey)
- [Slack](/platform/integration/slackKey)
- [IRC](/integration/irc/)

## Supported Miscellaneous Integrations

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
