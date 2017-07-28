page_main_title: Platform Overview
main_section: Platform
sub_section: Overview
page_title: Platform Overview

# Overview
Shippable provides an [Assembly Lines Platform](https://www.shippable.com/devops-assembly-lines.html) that connects all your disparate DevOps activities. The Platform allows you to automate in code your entire software delivery lifecycle.

The Platform allows you automate the following activities in your software delivery lifecycle  -

* [Continuous Integration](/ci/why-continuous-integration/)
* [Validation](/validate/devops-validate/)
* [Deployment](/deploy/why-deploy/)
* [Release management](/release/devops-release-management/)
* [Infrastructure Provisioning](/provision/why-infrastructure-provisioning/)

`TODO: Replace State with Workflow in the diagram.`
<img src="/images/platform/platform/devops-cube.png" alt="Shippable Platform">

## Job Runtime
[Job Runtime](/platform/job-runtime-overview/) prepares the environment, installs all the packages and their dependencies required by the scripts in your job. For example, if you are authoring a job that copies a file to S3, the Job Runtime
will automatically install the AWS CLI, and login to the CLI using your AWS credentials.  

## Workflow
[Workflow](/platform/workflow-overview/) connects all your jobs using a simple declarative language.

## Visibility
[Visibility]((/platform/visibility-overview/)) offers reporting, audit and analytics on the status and performance of all DevOps activities.

## Integrations
[Integrations](/platform/int-overview/) are used to connect your workflows to third party platforms and services.


Now, lets look take a deeper look at a [Workflow](/platform/workflow-overview/).
