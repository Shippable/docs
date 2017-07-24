page_main_title: Job Runtime Overview
main_section: Platform
sub_section: Job Runtime
page_title: Job Runtime Overview

# Job Runtime

Job Runtime sets up the execution environment for your DevOps activity. This involves
selecting the image which has the packages, CLI's and their dependencies required by your job. It thus reliably mirrors your build machine or your laptop environment in which your tasks / scripts run.

Job Runtime consists of the following components -

## [Nodes](/platform/job-runtime-nodes)
You can run your jobs on Shippable's hosted infrastructure (Dynamic Nodes), or Bring Your Own Node (BYON).

## [Job Images](/platform/machine-images-overview)
runCI jobs can either use Shippable provided images or your own custom image. runSH and runCLI jobs always use a
shippable provided image. Additional packages can be added to this image via script.

## [Environment variables](/platform/job-runtime-environment-variables)
Environment variables give you context of the DevOps activity. We automatically generate and
inject environment variables for all your job inputs, which can be used in your automation scripts. A great example of some environment variables is the branch you are building, the commit SHA, the build number, whether the build is running in context of a PR etc.

## [Caching](/platform/job-runtime-caching)
Caching speeds up your build by automatically setting up your static dependencies. Typical usecases are caching node modules,
ruby gems and static binaries.
