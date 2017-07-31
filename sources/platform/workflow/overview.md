page_main_title: Workflow Overview
main_section: Platform
sub_section: Workflow
page_title: Workflow Overview


#TODO
| Tasks   |      Status    |
|----------|-------------|
| Hotlinking |  Open |
| State Page creation|  Open |
| Further Reading needs thinking|  Open |

# Workflow Overview

Workflow makes it easy to connect all of the "Islands of Automation" into DevOps assembly lines across all environments, projects, and tools. They are actually dependency charts where upstream activities broadcast events and job state to downstream relying activities. This helps co-ordinate tasks centrally across diverse DevOps activities without having to custom build custom DIY scripts to integrate them along with a state database to persist the job output information. Workflows are authored through a simple declarative language

With workflow, both single step and multi-stage actitvites are repeatable, reliable and gracefully handle errors in a stateful manner. This coupled with the ability to control the workflow with necessary approval gates and notifications helps you achieve truly frictionless CI/CD, i.e. utopia of DevOps

## A Simple Workflow
Your Workflow is a bunch of Jobs (DevOps activities) that are triggered in sequence or in parallel, depending on how they are configured. A Job can be triggered in multiple ways: when a preceding Job finishes, when an input resource is updated by an upstream Job, or manually.

<img src="/images/pipelines-structure.png" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;" alt="listing subscriptions">

A glossary of terms is available [here](/platform/tutorial/glossary/).

## Elements of Workflow
At a very fundamental level, Workflow is made up of 4 key elements.

<a name="resource"></a>
### Resources
[Resources](/platform/workflow/resource/overview/) are versioned objects that hold configuration and other information required to execute your DevOps activity. They are inputs for and sometimes outputs from Jobs. Examples of resources include source code repositories, docker images, container clusters, environment variables, etc.

<a name="job"></a>
### Jobs
[Jobs](/platform/workflow/job/overview/) represent DevOps activities i.e. executable units of your workflow. They take one or more Resources as inputs, perform some operation on the inputs, and can output to other Resources. Jobs can also act as inputs for other Jobs, which serve to daisy-chain a series of Jobs into a connected workflow. For e.g. building an Amazon Machine Image using Packer or running CI on your source code.

<a name="state"></a>
### State
State(ful) workflow means that it is designed to remember the data from preceding events. Since DevOps automation is creating "Islands of Automation" due to fragmented tools, this component is a key element to achieve frictionless CI/CD. The platform has this capability built-in so that you dont need to maintain external spreadsheets, file storage, slack rooms etc. to share this information

<a name="trigger"></a>
### Trigger
[Triggers](/platform/workflow/trigger/overview/) are used to manually start a Job. You could also achive this by triggering through UI, but this is for those who like to do it with code

## Further Reading
* Job Runtime
* Resources
* Simple E2E sample using Assembly lines
