main_section: Reference
sub_section: CI

# Third-party integrations

Integrations are used to connect your Shippable CI or CD workflows to third party platforms and services. We believe in separating authentication credentials from your yml definitions for better security and privacy. All integrations are stored in our <a href="https://www.vaultproject.io/">Vault store</a> for maximum security.

Using an integration is a two step process:

<img src="../../images/reference/account-integrations-explained.png" alt="Google Container Registry integration">

###1. Adding an integration to your account

To add an account integration:

- Click on the gear icon at the right of your top navigation bar to open **Account Settings**
- Click on **Integrations** in the left sidebar menu. This will show you a list of your integrations.
- Click on **Add integration** to add a new integration.
- Select the one you want from the list, complete all fields, and click on **Save**
- Please note that while creating the integration, you will need to specify which Subscriptions have access to it. This is a very important step and if you miss it, you will not be able to use it in your ymls.


###2. Using the integration in your yml
Once an integration is enabled for a Subscription, you can use it in any project in that Subscription with a few lines of yml configuration. Please note that the integration name in your yml should be same as the one configured in your integration.

<a name="listIntegrations"></a>
##List of available integrations

### Source control providers
You need a source control integration if:

- You want to build repositories on Bitbucket Server, Gitlab, or GitHub Enterprise using Shippable Hosted
- You want to set up Continuous Deployment pipelines

We currently support the following source control providers:

- GitHub
- GitHub Enterprise
- Bitbucket
- Bitbucket Server
- GitLab

### Notification Providers

You need a notification integration if you want to send notifications for your CI or CD workflows.

- [Slack](../ci/slack-notifications/)
- [IRC](../ci/irc-notifications/)
- [Email](../ci/email-notifications/)
- [HipChat](../ci/hipchat-notifications/)
- [Event triggers](../ci/event-trigger-notifications/)

### Docker registries
You will need Docker registry integration if you want to do the following -

- Pull a private image  
- Build a Docker image which has a `FROM` that pulls a private image
- Push an image
- Use an [image resource](resource-image/) as part of your CD pipelines

We support the following Docker registries:

- Docker Hub
- Amazon EC2 Container Registry (ECR)
- Google Container Registry
- Quay
- Docker Trusted Registry
- Any private registry

---

### Container Services

You need a Container Service integration if you want to push your application to a container service as part of your CD workflow.

We support the following Container Services:

- [Amazon EC2 Container Service (ECS)](../deploy/amazon-ecs/)
- [Kubernetes](../deploy/kubernetes/)
- [Google Container Engine (GKE)](../deploy/gke/)
- [Docker Cloud](../deploy/docker-cloud/)
- [Docker Datacenter](../deploy/docker-datacenter/)

---

### Deploy

You can push to Amazon elastic beanstalk as part of your CI workflow by adding the integration:

- [Amazon Elastic Beanstalk](../deploy/aws-elastic-beanstalk/)

---
### Keys

You need a key integration if you want to integrate with a third party service that is not natively supported with Shippable. You should use these integrations so that you don't have to expose your keys in your CI yml configuration:

- PEM
- SSH

---
