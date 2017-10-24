page_main_title: Job Runtime Overview
main_section: Platform
sub_section: Runtime
page_title: Job Runtime Overview

# Runtime

Every activity in your DevOps Assembly Line requires a place to execute that activity. Job Runtime provides that so that the environment is prepped with the necessary OS, software tools and packages, runtime configurations, and secrets to authenticate with 3rd party services that the activity might interact with.

Some of the key benefits of this are:

* You don't need to constantly change your build environment configuration every time a different DevOps activity needs to be performed. For example,
	* Re-configuring your AWS keys depending on whether it's a Dev, Test or Prod environment.
	* Constantly having to change environment variables as we work with different tools and software packages.
	* Having to install multiple different tools/versions like Chef, Puppet, and Terraform as different teams use different tools.
* Reduce build time by leveraging caching instead of constantly prepping the environment to run your job.
* Not worrying about repeatability in the process as all the config and settings are not ad hoc, i.e. error prone.
* Reduce the cost of build infrastructure by leveraging dynamic node creation. Most organizations have less than 5% utilization of their build environment.
* Ability to run your build environment behind a firewall and still leverage the SaaS-based DevOps Assembly Line platform.

## Components of Job Runtime

Job Runtime consists of the following components:

<a name="nodes"></a>
### Nodes
To run your DevOps activities, you need a node (virtual machine). Shippable supports 2 types of nodes:

#### [Dedicated Dynamic Nodes](/platform/tutorial/runtime/dynamic-nodes)
These are managed and dynamically provisioned by Shippable Platform. There is no need to worry about managing build infrastructure. There are multiple sizes that you can use depending on your need:
	* 2 core, 3.75GB RAM (default) -- this is equivalent to AWS c4.large instance type
	* 4 core, 7.5GB RAM -- this is equivalent to AWS c4.xlarge instance type
	* 8 core, 15GB RAM -- this is equivalent to AWS c4.2xlarge instance type

[Read more on Dynamic Nodes](/platform/tutorial/runtime/dynamic-nodes/).

#### [Dedicated Custom Nodes](/platform/tutorial/runtime/custom-nodes)
These are nodes that you manage yourself and hook to Shippable Assembly Lines to run your DevOps activities. The biggest reason for doing this is that your code never leaves your infrastructure. Another reason to do this would be if your jobs require access to internal resources that you don't want to be accessible from the internet. You can run these nodes anywhere you like.

[Read more on Custom Nodes](/platform/tutorial/runtime/custom-nodes/).

<a name="machine-image"></a>
### Machine image

Depending on when your subscription was added to Shippable, we use an appropriate machine image to spin up your node. This determines the OS, languages, services, CLIs, and other packages and tools pre-installed for your convenience.

Please note that these machine images are spun up for scripted jobs like `runCI` and `runSh`. For a detailed look at machine images and what is installed on each one, please read the [Machine Image overview](/platform/runtime/machine-image/ami-overview) page.

<a name="env"></a>
### Environment variables
Environment variables are used to control the context of your DevOps activity. Setting this manually every time you execute a particular activity can be very error prone and missed configurations can cause serious trouble. You might actually be working on a production system when you thought you had your laptop configured to use your test system. To avoid this, Job Runtime provides many very easy ways to inject this into your Job Runtime before you start your activity and clears the state completely once the activity finishes.

Typical use cases for this include:

* Configuring your AWS Credentials to connect to a VPC
* SSH Keys to access your VMs
* Login to your Docker Hub
* Stage specific application configurations, e.g., Dev Settings vs. Test Settings
* Logging verbosity for different stages of Software Delivery
* Docker options for multi-stage deployments

We provide multiple ways to control how environment variables are injected into your Job Runtime. This also varies a bit depending on the [resource types](/platform/workflow/resource/overview) you are using. Environment variables are most often used with [runSh](/platform/workflow/job/runsh) and [runCI](/platform/workflow/job/runci) job types.

<a name="cache"></a>
### Caching

Caching speeds up your CI builds by automatically setting up your static dependencies. As an example, you can cache the following:

- node modules
- ruby gems
- static binaries from external sources

Read more [about caching here](/platform/tutorial/runtime/caching).

## Further Reading
* [Build Images](/platform/tutorial/runtime/ami-overview)
* [More about Environment Variables](/platform/tutorial/runtime/environment-variables)
* [More about Caching](/platform/tutorial/runtime/caching)
* [Jobs Overview](/platform/workflow/job/overview)
