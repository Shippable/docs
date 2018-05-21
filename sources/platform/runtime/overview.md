page_main_title: Job Runtime Overview
main_section: Platform
sub_section: Runtime
page_title: Job Runtime Overview
page_title: Runtime
page_description: Overview of Job Runtime that prepares the environment for your job to execute in Shippable

# Runtime

Every activity in your DevOps workflow requires a machine or container to execute that activity. Our job runtime provides an environment that is prepped with the necessary OS, software tools and packages, runtime configurations, and secrets to authenticate with 3rd party services that the activity might interact with.

Some of the key benefits of this are:

* You don't need to constantly change your build environment configuration every time a different DevOps activity needs to be performed. For example,
	* Re-configuring your AWS keys depending on whether it's a Dev, Test or Prod environment.
	* Constantly having to change environment variables as we work with different tools and software packages.
	* Having to install multiple different tools/versions like Chef, Puppet, and Terraform as different teams use different tools.
* Reduce build time by leveraging caching instead of constantly prepping the environment to run your job.
* Not worrying about repeatability in the process as all the config and settings are not ad hoc, i.e. error prone.
* Reduce the cost of build infrastructure by leveraging On-demand node creation. Most organizations have less than 5% utilization of their build environment.
* Ability to run your build environment behind a firewall and still leverage the SaaS-based DevOps Assembly Line platform.

## Components of Job Runtime

Job Runtime consists of the following components:

<a name="nodes"></a>
### Nodes

To run your DevOps activities, you need a node (virtual machine). Shippable supports 2 types of nodes:

#### [Dedicated On-demand Nodes](/platform/runtime/nodes/#dynamic-nodes)
These are managed and dynamically provisioned by Shippable Platform. There is no need to worry about managing build infrastructure. There are multiple sizes that you can configure, depending on your need:

* 2 core, 7.5GB RAM (L)(default)
* 4 core, 15GB RAM (XL)
* 8 core, 30GB RAM (2XL)

On-demand nodes can be purchased with Node caching enabled, which means that your nodes will be cached between jobs, instead of re-provisioned.

[Read more on On-demand Nodes](/platform/runtime/nodes/#dynamic-nodes).

#### [Dedicated BYON Nodes](/platform/runtime/nodes/#custom-nodes)
These are build nodes provided by you and attached to your Shippable Subscription. The biggest reason for doing this is that these nodes can be behind your firewall. You should choose this node type if you have security policies that prohibit your code from leaving your firewall, or if your jobs require access to internal resources that are not accessible from the internet. You can run these nodes anywhere you like.

[Read more on BYON Nodes](/platform/runtime/nodes/#custom-nodes).

### Node Pools

[Node Pools](/platform/management/subscription/node-pools) provide a convenient
way to logically group the Nodes. This enables you to have scenarios like ability to run jobs on [On-demand nodes](/platform/runtime/nodes/#dynamic-nodes) and [BYON nodes](/platform/runtime/nodes/#custom-nodes) simultaneously for a subscription, having nodes of different architecture and operating system(e.g. aarch64-Ubuntu 16.04, x86_64-Windows Server 2016 etc) for a subscription, ability to pin jobs to run on specific node types and a lot more.

[Read more on Node Pools](/platform/management/subscription/node-pools).

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

Read more [about caching here](/platform/runtime/caching).

## Further Reading
* [Machine Images](/platform/runtime/machine-image/ami-overview/)
* [CI Environment Variables](/ci/env-vars/)
* [More on Nodes](/platform/runtime/nodes)
* [More about Caching](/platform/runtime/caching)
* [Jobs Overview](/platform/workflow/job/overview)
