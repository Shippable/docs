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


<a name="listIntegrations"></a>
##List of available integrations

### Source control providers
You need a source control integration if:

- You want to build repositories on Bitbucket Server, Gitlab, or GitHub Enterprise using Shippable Hosted
- You want to set up Continuous Deployment pipelines

We currently support the following source control providers:

- [GitHub](/platform/int-github/)
- [GitHub Enterprise](/platform/int-github-enterprise/)
- [Bitbucket](/platform/int-bitbucket/)
- [GitLab](/platform/int-gitlab/)

### Notification Providers

You need a Slack or Hipchat integration if you want to send notifications for your CI or CD workflows through these providers.

- [Slack](int-slack/)
- [HipChat](int-hipchat/)

### Docker registries
You will need Docker registry integration if you want to do the following -

- Pull a private image  
- Build a Docker image which has a `FROM` that pulls a private image
- Push an image
- Use an [image resource](resource-image/) as part of your CD pipelines

We support the following Docker registries:

- [Docker Hub](int-docker-hub/)
- [Amazon EC2 Container Registry (ECR)](int-amazon-ecr/)
- [Google Container Registry](int-gcr/)
- [Quay](int-quay/)
- [Docker Trusted Registry](int-docker-trusted-registry/)
- [Any private registry](int-docker-trusted-registry/)

### Container Services

You need a Container Service integration if you want to push your application to a container service as part of your CD workflow.

We support the following Container Services:

- [Amazon EC2 Container Service (ECS)](int-amazon-ecs/)
- [Kubernetes](int-kubernetes/)
- [Google Container Engine (GKE)](int-gke/)
- [Docker Cloud](int-docker-cloud/)
- [Docker Datacenter](int-docker-datacenter/)

### Deploy

You can push to Amazon elastic beanstalk as part of your CI workflow by adding the integration:

- [Amazon Elastic Beanstalk](../deploy/aws-elastic-beanstalk/)

### Keys

You need a key integration if you want to integrate with a third party service that is not natively supported with Shippable. You should use these integrations so that you don't have to expose your keys in your CI yml configuration:

- [PEM keys](int-key-pem/)
- [SSH keys](int-key-ssh/)
