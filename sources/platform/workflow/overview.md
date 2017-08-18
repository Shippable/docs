page_main_title: Workflow Overview
main_section: Platform
sub_section: Workflow
page_title: Workflow Overview

# Workflow Overview

Workflow makes it easy to connect your "Islands of Automation" into DevOps Assembly Lines across all environments, projects, and tools. A workflow is a dependency chart where upstream activities broadcast events and job state to downstream activities. This helps co-ordinate tasks centrally across diverse DevOps tools without custom DIY scripts. The platform also manages state and job output information across the workflow so that all dependent jobs can access the information they need in order to execute.  Workflows are authored through a simple declarative yml-based language.

With Workflow, both single step and multi-stage activities are repeatable, reliable, and gracefully handle errors in a stateful manner. Coupled with the ability to control workflows with approval gates and notifications, this helps you achieve truly frictionless CI/CD, i.e. the utopia of DevOps.

## A Simple Workflow

Your Workflow is a bunch of jobs (DevOps activities) that are triggered in sequence or in parallel, depending on how they are configured. A job can be triggered in multiple ways: when a preceding job finishes, when an input resource is updated by an upstream job, or manually.

<img src="/images/pipelines-structure.png" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;" alt="DevOps workflows">

Each of the jobs in your workflow accomplishes a specific task, such as running CI, deploying an application to an environment, provisioning infrastructure, building an AMI, creating or updating a release version, etc. Jobs and resources can connect to third party providers or services through [integrations](/platform/integration/overview/).

A glossary of terms is available [here](/platform/tutorial/glossary/).

## Elements of Workflow
At a very fundamental level, Workflow consists of 4 key elements.

<a name="resource"></a>
### Resources
[Resources](/platform/workflow/resource/overview/) are versioned objects that hold configuration and other information required to execute your DevOps activity. They are inputs for and sometimes outputs from jobs. Examples of resources include source code repositories, docker images, container clusters, and environment variables.

<a name="job"></a>
### Jobs
[Jobs](/platform/workflow/job/overview/) represent DevOps activities, i.e., executable units of your workflow. They take one or more resources as inputs, perform some operation on the inputs, and can output other resources. Jobs can also act as inputs for other jobs, which serves to daisy-chain a series of jobs into a connected workflow. For example, building an Amazon Machine Image using Packer or running CI on your source code.

<a name="state"></a>
### State
[State(ful)](/platform/workflow/state/overview) workflow means that it is designed to remember information from preceding activities and make it available to dependent activities. The State component is key to frictionless Continuous Delivery since it helps your fragmented DevOps toolchain exchange necessary information across tools without writing custom scripts. This built-in capability also helps avoid sharing this information through external spreadsheets, file storage, ticketing systems, Slack channels, etc.

<a name="trigger"></a>
### Triggers
[Triggers](/platform/workflow/trigger/overview/) are used to manually start a job. You can also trigger jobs through the UI, but this is a nice-to-have capability for those who like to do it with code.

## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [Quick Start to CD](/getting-started/cd-sample)
