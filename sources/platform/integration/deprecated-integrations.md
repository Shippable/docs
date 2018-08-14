page_main_title: Deprecated integrations
main_section: Platform
sub_section: Configuration
sub_sub_section: Integrations
page_title: Deprecated integrations
page_description: Deprecated integrations

# Deprecated Integrations

We have deprecated some integrations and introduced new ones that are simpler to use and are consolidated per provider. For example, we have consolidated three Google integrations (Cloud, GCR, GKE) into a single integration called "Google Cloud Key".

As a result of this effort, the integrations below have been deprecated. This means the following:

- Your existing integrations will work as-is and no Assembly Lines will break as a result of these deprecations.
- You cannot create new integrations of a deprecated type.
- We recommend you start using the new integrations when you update your Assembly Lines.

 The sections below tell you which integration to use instead of a deprecated type, and also link to the old docs for deprecated integrations in case you need to refer to them.

## Amazon ECR integration

Please use [**AWS Keys**](/platform/integration/aws-keys) instead of this integration.

If you still want to use this integration, the documentation is here: [Amazon ECR integration](/platform/integration/deprecated/aws-ecr/). It will continue to work as-is but will not be officially supported moving forward, so you're advised to start using **AWS Keys** instead.

## AWS integration

Please use [**AWS Keys**](/platform/integration/aws-keys) instead of this integration.

If you still want to use this integration, the documentation is here: [AWS integration](/platform/integration/deprecated/aws/). It will continue to work as-is but will not be officially supported moving forward, so you're advised to start using **AWS Keys** instead.

## Azure DC/OS Integration

Please use [**azureDcosKey**](/platform/integration/azureDcosKey) instead of this integration.

If you still want to use this integration, the documentation is here: [Azure DCOS integration](/platform/integration/deprecated/azure-dcos/). It will continue to work as-is but will not be officially supported moving forward, so you're advised to start using **azureDcosKey** instead.

## Microsoft Azure Integration

Please use [**Azure Keys**](/platform/integration/azure-keys) instead of this integration.

If you still want to use this integration, the documentation is here: [Azure integration](/platform/integration/deprecated/azure/). It will continue to work as-is but will not be officially supported moving forward, so you're advised to start using **Azure Keys** instead.

## Docker Cloud integration

Please use the newer version of [**Docker Cloud integration**](/platform/integration/azure-keys) instead of this integration.

If you still want to use this integration, the documentation is here: [Deprecated Docker Cloud integration](/platform/integration/deprecated/docker-cloud/). It will continue to work as-is but will not be officially supported moving forward, so you're advised to start using the new **Docker Cloud** instead.

## Docker Datacenter Integration

Please use [**Docker Datacenter key**](/platform/integration/ddcKey) instead of this integration.

If you still want to use this integration, the documentation is here: [Docker datacenter integration](/platform/integration/deprecated/docker-datacenter/). It will continue to work as-is but will not be officially supported moving forward, so you're advised to start using the new **Docker Datacenter key** instead.

##Docker Hub Integration

Please use [**Docker Registry**](/platform/integration/dockerRegistryLogin) instead of this integration.

If you still want to use this integration, the documentation is here: [Docker Hub integration](/platform/integration/deprecated/docker-hub/). It will continue to work as-is but will not be officially supported moving forward, so you're advised to start using the new **Docker Registry** instead.

## Docker Private Registry Integration

Please use [**Docker Registry**](/platform/integration/dockerRegistryLogin) instead of this integration.

If you still want to use this integration, the documentation is here: [Docker Private Registry integration](/platform/integration/deprecated/docker-private-registry/). It will continue to work as-is but will not be officially supported moving forward, so you're advised to start using the new **Docker Registry** instead.

## Docker Trusted Registry Integration

Please use [**Docker Registry**](/platform/integration/dockerRegistryLogin) instead of this integration.

If you still want to use this integration, the documentation is here: [Docker Private Registry integration](/platform/integration/deprecated/docker-trusted-registry/). It will continue to work as-is but will not be officially supported moving forward, so you're advised to start using the new **Docker Registry** instead.

## Email Integration

This integration has been deprecated. You can get email notifications in [CI](/ci/email-notifications.md) and [Assembly Lines](/platform/workflow/resource/notification/) by specifying recipients in YAML configuration.

If you still want to use this integration, the documentation is here: [Email integration](/platform/integration/deprecated/email/). It will continue to work as-is but will not be officially supported moving forward.

## Event Trigger Integration

Please use [**Webhook**](/platform/integration/webhook) instead of this integration.

If you still want to use this integration, the documentation is here: [Event Trigger integration](/platform/integration/deprecated/event-trigger/). It will continue to work as-is but will not be officially supported moving forward, so you're advised to start using the new **Webhook** instead.

## Google Cloud Integration

Please use [**Google Cloud Key**](/platform/integration/gcloudKey) instead of this integration.

If you still want to use this integration, the documentation is here: [Google Cloud](/platform/integration/deprecated/gce/). It will continue to work as-is but will not be officially supported moving forward, so you're advised to start using the new **Google Cloud Key** instead.

##GCR integration

Please use [**Google Cloud Key**](/platform/integration/gcloudKey) instead of this integration.

If you still want to use this integration, the documentation is here: [GCR](/platform/integration/deprecated/gcr/). It will continue to work as-is but will not be officially supported moving forward, so you're advised to start using the new **Google Cloud Key** instead.

## Google Container Engine Integration

Please use [**Google Cloud Key**](/platform/integration/gcloudKey) instead of this integration.

If you still want to use this integration, the documentation is here: [Google Container Engine](/platform/integration/deprecated/gke/). It will continue to work as-is but will not be officially supported moving forward, so you're advised to start using the new **Google Cloud Key** instead.

## Hipchat Integration

Please use [**Hipchat Key**](/platform/integration/hipchatKey) instead of this integration.

If you still want to use this integration, the documentation is here: [Hipchat](/platform/integration/deprecated/hipchat/). It will continue to work as-is but will not be officially supported moving forward, so you're advised to start using the new **Hipchat Key** instead.

## IRC Integration

This integration has been deprecated. You can get IRC notifications in [CI](/ci/irc-notifications/) and [assembly lines](/platform/workflow/resource/notification/) by specifying recipients in yml files.

If you still want to use this integration, the documentation is here: [IRC integration](/platform/integration/deprecated/irc/). It will continue to work as-is but will not be officially supported moving forward.

## Jenkins integration

Please use the [**externalci**](/platform/workflow/job/externalci) job instead of this integration.

## JFrog Artifactory Integration

Please use [**JFrog Artifactory Key**](/platform/integration/jfrog-artifactoryKey) instead of this integration.

If you still want to use this integration, the documentation is here: [Artifactory](/platform/integration/deprecated/jfrog-artifactory/). It will continue to work as-is but will not be officially supported moving forward, so you're advised to start using the new **JFrog Artifactory Key** instead.

## PEM Key Integration

Please use the newer version of the [**PEM Key**](/platform/integration/pemKey) instead of this integration.

If you still want to use this integration, the documentation is here: [Deprecated PEM Key integration](/platform/integration/deprecated/key-pem/). It will continue to work as-is but will not be officially supported moving forward, so you're advised to start using the new **PEM Key** instead.

## SSH Keys Integration

Please use the newer version of the [**sshKey**](/platform/integration/sshKey) instead of this integration.

If you still want to use this integration, the documentation is here: [Deprecated SSH Key integration](/platform/integration/deprecated/key-ssh/). It will continue to work as-is but will not be officially supported moving forward, so you're advised to start using the new **sshKey** instead.

## Kubernetes Integration

Please use the newer version of the [**Kubernetes**](/platform/integration/kubernetes) instead of this integration.

If you still want to use this integration, the documentation is here: [Deprecated Kubernetes integration](/platform/integration/deprecated/kubernetes/). It will continue to work as-is but will not be officially supported moving forward, so you're advised to start using the new **Kubernetes** instead.

## Node Cluster Integration

Please use the newer version of the [**nodeCluster**](/platform/integration/nodeCluster) instead of this integration.

If you still want to use this integration, the documentation is here: [Deprecated Node Cluster integration](/platform/integration/deprecated/node-cluster/). It will continue to work as-is but will not be officially supported moving forward, so you're advised to start using the new **nodeCluster** instead.

## Quay Integration

Please use [**quayLogin**](/platform/integration/quayLogin) instead of this integration.

If you still want to use this integration, the documentation is here: [Quay](/platform/integration/deprecated/quay/). It will continue to work as-is but will not be officially supported moving forward, so you're advised to start using the new **quayLogin** instead.

## Slack integration

Please use [**Slack Key**](/platform/integration/slackKey) instead of this integration.

If you still want to use this integration, the documentation is here: [Deprecated Slack integration](/platform/integration/deprecated/slack/). It will continue to work as-is but will not be officially supported moving forward, so you're advised to start using the new **slackKey** instead.

# Joyent Triton Integration (Deprecated)

Please use [**Joyent Triton Key**](/platform/integration/joyentTritonKey) instead of this integration.

If you still want to use this integration, the documentation is here: [Deprecated Joyent Triton integration](/platform/integration/deprecated/tripub/). It will continue to work as-is but will not be officially supported moving forward, so you're advised to start using the new **slackKey** instead.
