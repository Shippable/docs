page_main_title: Job Runtime Overview
main_section: Platform
sub_section: Job Runtime
page_title: Job Runtime Overview

# Job Runtime

## Execution environment
Job Runtime prepares the environment in which your DevOps activity executes. This involves installation of all the packages and their dependencies, logging into specific third party services such as AWS with your credentials. It reliably creates your build machine or laptop environment that is often manually setup, prior to running a script that accomplishes a specific task.

For example, if you need to push a docker image to ECR, the Job Runtime will provide an environment which has AWS CLI installed and automatically authenticates to AWS using your credentials.

## Inject credentials and authenticate your CLIs with those credentials if needed
AWS CLI

## Provides environment variables that give you context of the DevOps activity
Branch, Commit SHA

## Caching

Job Runtime comprises of the following components -

* Runtime
  The Runtime consists of two components:

  * Shippable Agent
    Shippable Agent (a.k.a GenExec) is also a Docker Container that is spun up on build node machine. The main function of the Shippable Agent is to interact with the Shippable platform, Build Container and perform actions outside the build container. Within the [shippable.yml file](/platform/shippable-yml/), the pre_ci, pre_ci_boot and the push sections are executed on the Shippable Agent. Some [pipeline jobs](/platform/jobs-unmanaged/) are also executed on the Shippable Agent.

  * Build Container

    A Build Container (a.k.a cexec) is a Docker Container that is spun up on the build node machine that executes the Continuous Integration related tasks. These include installing the required dependencies, cloning information from the source control system repository, executing unit tests and running test/code coverage reports, all of which have to be specified in the [shippable.yml](/platform/shippable-yml/) file.

* Image Library

  You can use our standard, ready-to-go job runtime images or use your own custom images.

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

* Automatic Env Variables

  We automatically generate and inject environment variables for all your job inputs, which can be used in your automation scripts. Learn more [here](/ci/env-vars/#working-with-environment-variables).

* Flexible infrastructure

  Run your jobs on Shippable's hosted infrastructure (Dynamic Nodes), or Bring Your Own Node (BYON).

  * Dynamic nodes
    Shippable offers a free 2 core, 3.75GB RAM node to run your builds. You can also upgrade to a paid plan for more powerful nodes. Learn more [here](https://www.shippable.com/pricing.html).

  * Custom Nodes
    BYON lets you run builds on your own infrastructure, so you can attach your machines to your Shippable subscription and all your builds are routed to those machines. Your code also never leaves your network.
    Learn more [here](/getting-started/byon-overview/).
