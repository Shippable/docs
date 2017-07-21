page_main_title: Workflow Overview
main_section: Platform
sub_section: Overview
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
Workflow is made up of 3 key elements; Resources, Jobs and State.

### Resources
[Resources](/platform/resources-overview/) are objects that can be supplied as inputs and outputs to your activities, in our case Jobs e.g params resource stores environmental variables that are injected to Job Runtime if used as an input to a job. Every change made to the resource is persisted as an immutable version and. This is similar to creting a SHA on git. 


### Jobs
[Jobs](/platform/jobs-overview/) represent DevOps activities in your workflows. For e.g. building an Amazon Machine Image using Packer or running CI on your source code. Jobs can take Resources as inputs or other even other Jobs the result of a job could affect the state of a Resource persisted as a version. Jobs can also act as inputs to other jobs.


### State
State(ful) workflow means that it is designed to remember the data from preceding events. Since DevOps automation is creating "Islands of Automation" due to fragmented tools, this component is a key element to achieve frictionless CI/CD. 

Shippable Assembly Lines platform has three forms of state; Key-Value, file based and central state. 

Key-value is stored as a property in the immutable version of the Resource or a Job. Every Job that uses the resoruce will have access to the version and in turn has access to the Kev-value that was stored in that version. 

File based state is available only in Jobs and state files upto 1MB can be stored for every version i.e. run of a Job. Every subsequent Job that has this as an input has access to those files. This makes it easy to trasfer stateful data from one Job to another

State always flows from left to right. However, there are some scenarios where a shared state is needed. FOr e.g. Terraform creates a statefile when `terraform apply` is run. But if you need to run this in a mult-stage manner where subsequent Jobs make changes to this state, it some needs to flow back to the first job that created it. Our Assembly Lines has a special `state resource` that allows this state to be stored centrally and shared across the jobs.  

## Further Reading
* Job Runtime
* Resources
* Simple E2E sample using Assembly lines