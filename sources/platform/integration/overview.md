page_main_title: Overview
main_section: Platform
sub_section: Integrations
page_title: Integrations overview

# Integrations Overview
Integrations are used to connect your Shippable CI or CD workflows to third party platforms or services and also manage secrets that might be needed by your applications. They are owned by users of our platform and the scope feature allows you to decide which organizations/repos have access to use it in their DevOps activities. 

One the biggest benefits of using Shippable DevOps Assembly Line Integrations as opposed to using encrypted strings that contain the connection information is "Seperation of Concerns". These are the problems of using encrypted strings

* The seed key used to encrypt is a single point of failure

* Rotating the see key means you have to change the encrypted strings wherever they are used
* There is no way to know what was the key that was used to encrypt it, just purely look at the encrypted string. This means aditional DB of what, when, which and how the values were encrypted which is additional work
* Scripts if they contain the encrypeted values cannot participate in fork based development. The reason for this is that unless every fork has access to the seed key, they will need to use their ecryption and replace these values. This means you will have to add it to `gitignore` so that you dont override the parents encryption values. Changing these scripts through PRs is a pain
* It is impossible to know which values are present in which enrypted strings, which means I have to decrypt to know what is present in the encrypted values
* If any one of the values to change, unless you know where its used, there is no way to know which encrypted strings needs to be updated

In case of Shippable Integrations,

* Internally Shippable is managing encryption at rest and flight which means the users are absolved from worrying about seed keys

* Since the Integration is used in scripts by reference pointers, changing the integration value in 1 place, automatically propogates across every script that is using it. Maintenance of these integrations becomes trivial
* Users of these integrations never need to know what the values are and since the integrations are well documented, they can assume what keys to use in their scripts
* When these integrations are using in ceratin contexts, the platform auto-logs your in, or configures the CLI which makes it easy for the script authors to interact with external entities
* Removing access is as simple as removing the scope to a repo and the immediate next run will start to fail
* It is a more secure way of maning secrets

We are big believers of the concept where secrets needs to be seperated from scripts for better security and privacy. All integrations are stored in our <a href="https://www.vaultproject.io/">Vault store</a> for maximum security.


## Supported Integrations 
The following are integrations that Shippable currently supports. Detailed information is available on individual integration pages.

- [AWS](/platform/integration/aws)
- [AWS ECR](/platform/integration/aws-ecr)
- [AWS IAM](/platform/integration/aws-ecs)
- [Azure Container Service](/platform/integration/azure-dcos)
- [Azure DCOS](/platform/integration/azure-dcos)
- [Azure](/platform/integration/azure)
- [Bitbucket](/platform/integration/bitbucket)
- [Digital Ocean](/platform/integration/do)
- [Docker Cloud](/platform/integration/docker-cloud)
- [Docker Datacenter](/platform/integration/docker-datacenter)
- [Docker Hub](/platform/integration/docker-hub)
- [Docker Trusted Registry](/platform/integration/docker-trusted-registry)
- [Docker Private Registry](/platform/integration/docker-private-registry)
- [Email](/platform/integration/email)
- [Event Trigger](/platform/integration/event-trigger)
- [Git Credential](/platform/integration/git-credential)
- [GitHub](/platform/integration/github)
- [GitHub Enterprise](/platform/integration/github-enterprise)
- [GitLab](/platform/integration/gitlab)
- [Google Cloud](/platform/integration/gce) 
- [Google Container Engine](/platform/integration/gke)
- [Google Container Registry](/platform/integration/gcr)
- [HipChat](/platform/integration/hipchat)
- [IRC](/platform/integration/irc)
- [JFrog](/platform/integration/jfrog-artifactory)
- [Joyent Triton](/platform/integration/tripub)
- [Key-Value Pair](/platform/integration/key-value)
- [Kubernetes](/platform/integration/kubernetes)
- [Node Cluster](/platform/integration/node-cluster)
- [PEM keys](/platform/integration/key-pem)
- [Quay](/platform/integration/quay)
- [Slack](/platform/integration/slack)
- [SSH keys](/platform/integration/key-ssh)

