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
There are a plethora of DevOps tools for provisioning, configuration management, CI/CD and so on. Today, custom DIY scripts are the only option to bridge all these "Islands of Automation". These solutions are brittle and cumbersome to create and maintain. More importantly they add friction to your Continuous Delivery initiatives.

Workflow makes it easy to connect all of these fragmented tools into DevOps assembly lines across all environments, projects, and tools. They are actually dependency charts where upstream activities broadcast events and job state to downstream relying activities. This helps co-ordinate tasks centrally across diverse DevOps activities without having to custom build custom DIY scripts to integrate them along with a state database to persist the job output information.

With workflow, both single step and multi-stage actitvites are repeatable, reliable and gracefully handle errors in a stateful manner. This coupled with the ability to control the workflow with necessary approval gates and notifications helps you achieve truly frictionless CI/CD, i.e. utopia of DevOps


## Elements of Workflow
Workflow is made up of 4 key elements

### Resources
[Resources](/platform/workflow/resource/overview/) are objects that can be supplied as inputs and outputs to your activities, in our case Jobs e.g params resource stores environmental variables that are injected to Job Runtime if used as an input to a job. Every change made to the resource is persisted as an immutable version. This is similar to creting a SHA on git.

### Jobs
[Jobs](/platform/workflow/job/overview/) represent DevOps activities in your workflows. For e.g. building an Amazon Machine Image using Packer or running CI on your source code. Jobs can take Resources as inputs or other even other Jobs the result of a job could affect the state of a Resource persisted as a version. Jobs can also act as inputs to other jobs.

### State
State(ful) workflow means that it is designed to remember the data from preceding events. Since DevOps automation is creating "Islands of Automation" due to fragmented tools, this component is a key element to achieve frictionless CI/CD. The platform has this capability built-in so that you dont need to maintain external spreadsheets, file storage, slack rooms etc. to share this information

### Trigger
[Triggers](/platform/workflow/trigger/overview/) are used to manually start a Job. You could also achive this by triggering through UI, but this is for those who like to do it with code

## Further Reading
* Job Runtime
* Resources
* Simple E2E sample using Assembly lines
