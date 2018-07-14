page_main_title: Platform Overview
main_section: Platform
sub_section: Overview
page_title: Platform Overview
page_description: Overview of Shippable's DevOps Assembly Lines Platform and supported Usecases

# Platform Overview

Shippable's DevOps Assembly Lines platform helps you easily create event-driven, streamlined workflows across your tools and functional silos to help you ship code faster.

Most organizations have a diverse toolchain and several teams are involved in shipping software, such as Dev, Test, Ops, DevOps, SecOps, etc. While there are many tools that help automate activities like CI, infrastructure provisioning, config mgmt, multi-stage deployments, and so on, it is often difficult to connect these silo'ed tools into seamless Continuous Delivery workflows. Shippable's mission is to make that process as simple as possible so that every organization can ship their applications as frequently as a startup does.

Most organizations follow the stages below when maturing their software delivery automation:

<img src="/images/platform/devops-cd-maturity.png" alt="Shippable DevOps Assembly Lines Platform">

Shippable helps you mature through these stages in a systematic fashion.

## Workflow automation

A workflow is an event-driven dependency chart of **jobs**, which execute a DevOps activities (CI, deployments, infrastructure provisioning, etc) and **resources**, which hold the information needed for jobs to execute (credentials, key-value pairs, keys/tokens, etc).

<img src="/images/pipelines-structure.png" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;" alt="DevOps workflows">

Shippable helps you create workflows very easily with a simple declarative YAML-based language. The platform also manages state and job output information across the workflow so that all dependent jobs can access the information they need from upstream jobs in order to execute. This helps co-ordinate activities centrally across diverse DevOps tools and silo'ed teams without custom DIY scripts.

A complete overview of jobs and resources is here:

* [Jobs overview](/platform/workflow/job/overview)
* [Resources overview](/platform/workflow/resource/overview)

Jobs and resources can connect to third party providers or services through [integrations](/platform/integration/overview/).

Workflows can be configured for a variety of scenarios, including:

* Set up simple Continuous Integration for your applications
* Create streamlined Continuous Delivery workflows that connect all your CI/CD and DevOps activities across tools and functional silos
* Automate IT Ops workflows like infrastructure provisioning, security patching, and image building

In addition to the actual workflow logic, the platform also helps you do the following:

* Efficiently managing your DevOps infrastructure
* Securing workflows with abstracted secrets and RBAC
* Measuring the effectiveness of your CI/CD and DevOps processes

### Integrations
[Integrations](/platform/integration/overview) are used to connect your Shippable CI or CD workflows to third party platforms or services and manage secrets like keys, tokens, passwords that are needed for your applications. Integrations are created and owned by users, who then choose to make these integrations available to specific organizations/repositories for use in their CI or CD configuration.  

###Runtime
[Runtime](/platform/runtime/overview/) is used to execute the DevOps activities configured in the Assembly Line. The platform prepares the runtime by installing all packages and dependencies needed by your automation scripts, securely injecting necessary secrets, and configuring any CLIs that are required.

For example, if you have authored a job that copies a file to `S3`, Runtime will automatically spin up an environment that has the AWS CLI and configure it with the supplied AWS credentials. You can just run your `S3` command without worrying about all the prep.  

### Visibility
[Visibility](/platform/visibility/overview) is a critical piece that shows you a real time, interactive, visual representation of all Assembly Lines across your organization in a single view. You can also create custom views that let you focus on specific Assembly Lines. This lets you quickly identify problem areas and bottlenecks and streamline your Continuous Delivery process. It also provides reporting, audit, and analytics on the status and performance of your software delivery workflows.

### Management
[Management](/platform/management/overview) gives you the ability to control the flow of deployable units across your entire Assembly Line. It gives you the option to implement "Automation with a human touch," i.e., **Jidoka**. Management can help with operational tasks like pausing or unpausing activities, rolling back, upgrading your deployment, managing runtime images, etc.

## Configuration

Your Assembly Lines are defined through yml-based configuration files:

### CI config

A YAML based configuration file, **shippable.yml**, is used to configure your continuous integration (CI) workflow. This is the only file you need if you want to only use Shippable for CI. It must reside at the root of your repository. [Read more...](/platform/workflow/config/#ci-configuration)

If you're using Shippable for CI only, follow [these instructions](/ci/enable-project/) to enable your repository.

### Assembly Line config

An Assembly Line is an event-driven dependency workflow composed of **jobs**, **resources**, and **triggers**. If you want to set up workflows that require more complexity than running a small set of commands, or create workflows that are not tightly coupled with a single repository, you should create an Assembly Line to configure it.

The same **shippable.yml** file used for CI also contains definitions of the jobs, resources, and triggers in your Assembly Line. [Read more...](/platform/workflow/config/#assembly-lines-configuration)

Assembly Line configuration files can be committed to any repository in your source control. This repository is called a **Sync repository**. Jobs and resources defined in an Assembly Line are global across the Subscription (i.e. organization or team), so you can define your workflows across several repositories if needed.  

You can add your Assembly Line config to Shippable by following instructions in the [How to work with syncRepo](/platform/tutorial/workflow/add-assembly-line/) tutorial. The platform will then parse the `jobs` and `resources` section of your config to create your workflows.

## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [Quick Start to CD](/getting-started/cd-sample)
* [Platform reference](/platform/reference)
* [Platform tutorials](/platform/tutorials)
