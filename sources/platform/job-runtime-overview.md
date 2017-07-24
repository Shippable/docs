page_main_title: Job Runtime Overview
main_section: Platform
sub_section: Job Runtime
page_title: Job Runtime Overview

# Job Runtime

Job Runtime prepares the execution environment for your DevOps activity. This involves setting up the operating system image, installation of packages, CLI's and their dependencies required by the activity. It thus reliably creates your build machine
or your laptop environment that is often manually setup, prior to running your scripts.

Job Runtime consists of the following components -

## [Docker Images](/platform/machine-images-overview)
You can either use Shippable provided images or your own custom image.

## [Nodes](/platform/job-runtime-nodes)
You can run your jobs on Shippable's hosted infrastructure (Dynamic Nodes), or Bring Your Own Node (BYON).

## Inject credentials and authenticate your CLIs with those credentials if needed
Let's take the example of pushing a file to AWS Elastic Container Registry (ECR) after your build completes.
You need to have the AWS CLI credentials and the docker login completed before you can push the docker image that you have
built to ECR. Job Runtime automatically injects your credentials (defined in a resource) and completes the docker login so
that you can focus on simply writing the single of code that pushes the image to ECR.  

## [Environment variables](/platform/job-runtime-environment-variables)
Environment variables give you context of the DevOps activity. We automatically generate and inject environment variables for all your job inputs, which can be used in your automation scripts. A great example of some environment variables is the branch you are building, the commit SHA, the build number, whether the build is running in context of a PR etc.

## [Caching](/platform/job-runtime-caching)
Caching speeds up your build by automatically setting up your static dependencies. Typical usecases are caching node modules,
ruby gems and static binaries.
