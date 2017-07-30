page_main_title: Platform Overview
main_section: Platform
sub_section: Overview
page_title: Platform Overview

# Platform Overview
Today, majority of DevOps activities are getting automated in functional silos. The tools and the functional silos are creating what we call as "Islands of Automation". Valuable resources and time is being spent on trying to connect these "Islands of Automation" with adhoc homegrown scripts. This both expensive to build and hard to maintain and scale. So we came up with [Shippable DevOps Assembly Lines Platform](https://www.shippable.com/devops-assembly-lines.html).

Our platform connects all your disparate DevOps activities in a event driven workflows and enables your organization to automate your entire software delivery lifecycle.

<img src="/images/platform/assembly-lines.jpg" alt="Shippable Platform">

The best way to visualize the platform is to think of it as an exploded view of the cube as shown above;

## Use Cases
These are some of the usecases of Software Delivery that the platform enables natively

* [Continuous Integration](/ci/why-continuous-integration/)
* [Validation](/validate/devops-validate/)
* [Deployment](/deploy/why-deploy/)
* [Release management](/release/devops-release-management/)
* [Infrastructure Provisioning](/provision/why-infrastructure-provisioning/)

## Workflow
[Workflow](workflow/overview/) is an event driven dependency management system of all your DevOps activities. It supports most of the popular tools and connects all your automation jobs using a simple declarative language. 

## Runtime
[Runtime](/platform/runtime/overview/) is used to execute the DevOps activities involved in the Assembly Line. The platform prepares the runtime by installing all the packages and their dependencies needed by your automation script, securely injecting the secrets that are necessary and also configuring the CLIs that are needed for the activity. For example, if you are authoring a job that copies a file to `S3`, Runtime will automatically spin up an environment that has AWS CLI, configure it with the supplied AWS credentials and get it fully ready to run your first `S3` command.  

## Visibility
[Visibility]((/platform/visibility-overview/)) offers reporting, audit and analytics on the status and performance of all DevOps activities.

## Management
[Management]((/platform/management-overview/)) is about managing the assembly line. Creating secrets, ability to pause unpause actitvities, rolling back, upgrades etc. are all activities that Management can help with

## Integrations
[Integrations](/platform/integration/overview/) are used to connect your workflows to third party platforms and services.


Now, lets look take a deeper look at a [Workflow](/platform/workflow/overview/).
