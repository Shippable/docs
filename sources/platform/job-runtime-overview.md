page_main_title: Job Runtime Overview
main_section: Platform
sub_section: Job Runtime
page_title: Job Runtime Overview

# Job Runtime

Job Runtime sets up the execution environment for your DevOps activity. This involves
selecting the image which has the OS, language, packages, CLI's and their dependencies required by your job. It thus reliably mirrors your build machine or your laptop environment in which your tasks / scripts run.

Job Runtime consists of the following components -
## Operating System
All jobs run on supported [Operating Systems](/platform/job-runtime-os).
## Language
Platform supports a wide variety of [language](platform/language-overview) runtimes and language versions.
## Preinstalled Software packages
To make it easier to run your Jobs, the Platform also supports popular [Preinstalled software packages](/platform/services-overview) and CLIs.
## Nodes
[Nodes](/platform/job-runtime-nodes) are machines where the Job Runtime is instantiated. You can run your jobs on Shippable's hosted infrastructure (Dynamic Nodes), or Bring Your Own Node (BYON).
## Environment variables
[Environment variables](/platform/job-runtime-environment-variables) give you context of the DevOps activity. We automatically generate and inject environment variables for all your job inputs, which can be used in your automation scripts. A great example of some environment variables is the branch you are building, the commit SHA, the build number, whether the build is running in context of a PR etc.
## Caching
[Caching](/platform/job-runtime-caching) speeds up your build by automatically setting up your static dependencies. Typical usecases are caching node modules, ruby gems and static binaries.
