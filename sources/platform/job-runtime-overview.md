page_main_title: Job Runtime Overview
main_section: Platform
sub_section: Job Runtime
page_title: Job Runtime Overview

# Job Runtime

Job Runtime sets up the execution environment for your DevOps activity. This involves
selecting the image which has the packages, CLI's and their dependencies required by your job. It thus reliably mirrors your build machine or your laptop environment in which your tasks / scripts run.

Job Runtime consists of the following components -
## Nodes
[Nodes](/platform/job-runtime-nodes) are machines where the Job Runtime is instantiated. You can run your jobs on Shippable's hosted infrastructure (Dynamic Nodes), or Bring Your Own Node (BYON).
## Job Image
[Job Image](/platform/machine-images-overview) is the operating system and package in which your Job executes. Different jobs
provide different capabilities. Some jobs always use a Shippable provided image whereas others can run in a custom image.
## Environment variables
[Environment variables](/platform/job-runtime-environment-variables) give you context of the DevOps activity. We automatically generate and inject environment variables for all your job inputs, which can be used in your automation scripts. A great example of some environment variables is the branch you are building, the commit SHA, the build number, whether the build is running in context of a PR etc.
## Caching
[Caching](/platform/job-runtime-caching) speeds up your build by automatically setting up your static dependencies. Typical usecases are caching node modules,
ruby gems and static binaries.
