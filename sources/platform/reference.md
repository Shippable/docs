page_main_title: Platform reference
main_section: Platform

# Platform reference

This document points to reference documentation for various parts of the platform, such as workflow configuration, runtime, integrations, and visibility & analytics. While you can get to most of these pages through the left navigation menu, this is a one stop shop for all reference docs.

## Configuration

Workflows are configured with a simple declarative YAML based config. To start configuring workflows, [read more about YAML structure](/platform/workflow/config).

### Jobs

Jobs are executable units of your workflow. Read the [overview of how jobs are defined and how they fit into a workflow.](/platform/workflow/job/overview)

List of supported jobs:

| Job Type   |      Description    |
|----------|-------------|
| [deploy](/platform/workflow/job/deploy/) | Managed job that deploys apps/services to Container Platforms or VM clusters |
| [externalCI](/platform/workflow/job/externalci/) | Managed job for integrating external CI providers, such as Jenkins, with your workflows |
| [manifest](/platform/workflow/job/manifest/) | Managed job that creates an immutable app/Service definition  |
| [provision](/platform/workflow/job/provision/) | Managed job that provisions resources needed (e.g. load balancers) by Container Orchestration Platforms |
| [release](/platform/workflow/job/release/) | Managed job that provides semantic versioning to help with release management for apps/Services |
| [runCI](/platform/workflow/job/runci/) | Unmanaged job that executes configured CI commands |
| [runSh](/platform/workflow/job/runsh/) | Unmanaged job that executes any shell commands, scripts, or supported CLI commands |
| [rSync](/platform/workflow/job/rsync/) | This job is automatically added when you add an Assembly Line to Shippable, and keeps the workflow synced with your yml configuration. |

### Resources

Resources hold information that is required to execute jobs. Read the [overview of how resources are defined and how they fit into a workflow.](/platform/workflow/resource/overview)

List of supported resources:

| Resource Type   |      Description    |
|----------|-------------|
| [ciRepo](/platform/workflow/resource/cirepo/) | Automatically created resource that represents a git repository that has been enabled for CI |
| [cliConfig](/platform/workflow/resource/cliconfig/) | Configuration information for command-line tools |
| [cluster](/platform/workflow/resource/cluster/) | Pointer to a cluster on various cloud providers |
| [dockerOptions](/platform/workflow/resource/dockeroptions/) | Configuration information for a container |
| [externalCIServer](/platform/workflow/resource/externalciserver/) | Resource that points to an external CI server |
| [file](/platform/workflow/resource/file/) | Pointer to a file on JFrog Artifactory |
| [gitRepo](/platform/workflow/resource/gitrepo/) | Pointer to a source code repository |
| [image](/platform/workflow/resource/image/) | Pointer to a Docker image in a registry |
| [integration](/platform/workflow/resource/integration/) | Encrypted connection information to 3rd party services |
| [loadBalancer](/platform/workflow/resource/loadbalancer/) | Represents load-balancer resources offered by cloud providers |
| [notification](/platform/workflow/resource/notification/) | Helps send alerts from jobs |
| [params](/platform/workflow/resource/params/) | Environment variables used to prep your job runtime |
| [replicas](/platform/workflow/resource/replicas/) | Specify number of copies of an app/service to run |
| [state](/platform/workflow/resource/state/) | Store information that is read and updated by several jobs in workflow |
| [syncRepo](/platform/workflow/resource/syncrepo/) | Automatically generated resource that points to the repository containing configuration for your workflows |
| [time](/platform/workflow/resource/time/) | Trigger a job at a specific day and time |
| [trigger](/platform/workflow/resource/trigger/) | Trigger a job by updating this resource |
| [version](/platform/workflow/resource/version/) | Use semantic versions and specify bump logic|
| [webhook](/platform/workflow/resource/webhook/) | Add a webhook from an external provider to trigger a Shippable workflow |

### State

[Read how in-built state management](/platform/workflow/state/overview) helps you easily exchange information with upstream and downstream jobs.

## Runtime

Jobs need a machine or container to execute a set of commands. Our job runtime provides an environment that is already prepped with the necessary OS, software tools and packages, runtime configurations, and secrets to authenticate with 3rd party services that the activity might interact with.

Read the [Runtime overview](/platform/runtime/overview) to learn more.

### Nodes

We offer on-demand nodes with and without node caching, as well as a unique Bring-Your-Own-Node offering which lets you run jobs on your nodes that can be behind your firewall.

You can also create node pools, which let you route specific jobs to a subset of nodes. This is immensely helpful if you have a few jobs that are resource intensive and need bigger nodes, or if you want to run specific jobs on a separate pool for security reasons.

[Read more about Node types and pools](/platform/runtime/nodes).

### Caching

We support two types of caching:

* Node caching, where the entire node is paused between jobs, instead of being restarted, and,
* Artifact caching, which allows you to cache specific folders between jobs

[Read more about caching types](/platform/runtime/caching)

### Machine images

Our machine images are used to spin up job nodes. These images come prepped with many popular tools and packages, as well as a set of Docker images that are used to run your jobs.

We publish machine images every month or couple of months to make sure we already have the latest and greatest versions of installed components.

For a complete list of machine images and more details on how they work, [read the machine images overview](/platform/runtime/machine-image/ami-overview)

## Security

Read our [Security overview](/platform/security/overview) to understand how we handle various aspects of security, such as [Role-Based Access Control](/platform/security/ci-cd-permissions) and [Credentials management](/platform/security/credential-mgmt)

## Integrations

Integrations are used to connect your Shippable CI or CD workflows to third party platforms or services and manage secrets that might be needed by your workflows. An individual user owns each integration and can define scope for it, i.e. restrict access to specific organizations and repositories.

### Cloud providers

- [AWS IAM](/platform/integration/aws-iam)
- [AWS Keys](/platform/integration/aws-keys)
- [Kubernetes](/platform/integration/kubernetes)
- [Google Cloud](/platform/integration/gcloudKey)
- [Azure](/platform/integration/azure-keys/)
- [Azure DC/OS](/platform/integration/azureDcosKey)
- [Docker Cloud](/platform/integration/dclKey)
- [Docker Datacenter](/platform/integration/ddcKey)
- [Joyent Triton](/platform/integration/joyentTritonKey)
- [Quay](/platform/integration/quayLogin)
- [Digital Ocean](/platform/integration/do)
- [Node cluster on any cloud](/platform/integration/nodeCluster)


### Docker and artifact repositories

- [Docker Registry (Hub, Private, Trusted)](/platform/integration/dockerRegistryLogin)
- [JFrog Artifactory](/platform/integration/jfrog-artifactoryKey)
- [JFrog Artifactory (Docker)](/platform/integration/dockerRegistryLogin)

### Source Control Providers

- [Bitbucket](/platform/integration/bitbucket)
- [GitHub](/platform/integration/github)
- [GitHub Enterprise](/platform/integration/github-enterprise)
- [GitLab](/platform/integration/gitlab)
- [Git Credential](/platform/integration/git-credential)

### Notifications

- [HipChat](/platform/integration/hipchatKey)
- [Slack](/platform/integration/slackKey)
- Email
- IRC

### Project Mgmt

- [JIRA](/platform/integration/jira)

### Miscellaneous

- [Key-Value Pair](/platform/integration/key-value)
- [PEM keys](/platform/integration/pemKey)
- [SSH keys](/platform/integration/sshKey)
- [Webhook](/platform/integration/webhook)

## Single Pane of Glass

Your workflows can be viewed graphically in our real-time, interactive dashboard called a **Single Pane of Glass**. You can view jobs in a dependency graph view or grid view, as well as take actions such as trigger or pause jobs, pin specific resource versions, view trace and audit information, etc.

[Read more on the Single Pane of Glass](/platform/visibility/single-pane-of-glass-spog).
