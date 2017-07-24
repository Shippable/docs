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

## [Provides environment variables that give you context of the DevOps activity](/platform/environment-variables)
We automatically generate and inject environment variables for all your job inputs, which can be used in your automation scripts. A great example of some environment variables is the branch you are building, the commit SHA, the build number, whether the build is running in context of a PR etc.

## [Caching](/platform/job-runtime-caching)
Caching speeds up your build by automatically setting up your static dependencies. Typical usecases are caching node modules,
ruby gems and static binaries.

  * Shippable Official Docker Images

    These are the Docker images used to run your CI jobs. The default image is picked up based on the language specified in your yml. All these images are available on our Docker [drydock Hub](https://hub.docker.com/u/drydock/). The source code is available on our [Github dry-dock org](https://github.com/dry-dock).

    The naming convention of all our Docker images is as follows:

    * Three letter code for the operating system. We offer ubuntu 14 (u14) and ubuntu 16 (u16) images.
    * Three letter code for the language. For example `nod` is the code for NodeJS.
    * Three letter suffix - `all`.
    All supported language versions are published in a single image.

    Thus `u14nodall` is the Docker image for NodeJS for Ubuntu 14.

  * Bring your own Images.

    There are two available options to spin up your CI container with a custom image:

    * Pull an image from a supported Docker registry and use it to spin up your CI container
    * Build an image and use it to spin up your CI container

    For more information, go [here](http://docs.shippable.com/ci/custom-docker-image/).
