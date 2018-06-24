page_main_title: Learn more about On-demand and BYON nodes
main_section: Platform
sub_section: Runtime
page_title: Node types
page_description: Different types of Nodes which execute jobs supported by the Shippable DevOps Assembly Lines platform

# Node types

You need a virtual machine, i.e. node, on which your job is executed. The Shippable DevOps Assembly Lines platform supports two types of nodes:

* **On-demand nodes** which are provisioned when a job is triggered and cached or destroyed after a preset amount of idle time if no new job is triggered during that time. This is the default node type for any SaaS subscription.
* **BYON nodes** which are build nodes provided by you and attached to your Shippable Subscription. These nodes should be running and available when a job is triggered, since the Shippable platform does not dynamically provision them.

Please note that a node can run one job at a time, so the number of nodes in your plan is the number of parallel jobs you can run for your Subscription.

## On-demand Nodes

On-demand nodes allow you to have a CI/CD platform with zero maintenance from our end as far as the infrastructure is concerned.

### Advantages

Advantages of On-demand nodes are:

* Zero management of CI/CD infrastructure since the platform takes care of provisioning/caching/de-provisioning/cleanup etc.
* Cost savings since the monthly price per node is ~50-66% cheaper than what you would pay AWS to just run the node for a month

### Node size

The default node size for the free plan gives is our L node which has 2 cores and 7.5GB RAM.

For paid plans, you can choose between the following sizes:

* 2 core, 7.5GB RAM (L)(default)
* 4 core, 15GB RAM (XL)
* 8 core, 30GB RAM (2XL)

The biggest reason to choose a larger sized node is faster job execution since they have more cores and RAM. However, if your jobs do not need the extra resources, you should do just fine on the c4.large machines.

### Maximum time allocated to an On-demand Node

When a job is triggered, an on-demand node is spun up to execute the job. After the job is complete, the node is available to pick up subsequent jobs until it is terminated. At each hourly boundary after the node was first spun up, the platform checks to see if the node is idle, and if so, terminates the node. This ensures that we manage your build infrastructure in an efficient manner, which makes it possible for us to offer build nodes that are priced lower than AWS pricing.

The downside of these ephemeral build nodes is that you cannot leverage Docker caching or caching of large dependencies, unless your job happens to run on a warm node that hasn't been terminated yet. If you want your node state to be preserved between jobs, you should buy Nodes with caching.

### Node Caching

If your plan includes Nodes with caching enabled, your nodes are cached after each build instead of de-provisioned.

If you want Docker caching or have large dependencies that do not change with every job, this will save you a lot of time since you will not start with a fresh node each time. In order to ensure that your nodes don't run out of space, you can configure your Subscription to recycle nodes based on a calendar, or at a specified interval.

### Machine Images

On-demand Nodes are booted with a Shippable Machine image. Each Machine image is versioned. [Read More on machine images](/platform/runtime/machine-image/ami-overview/).

Machine images exist for the following architectures and operating systems:

|Architecture|OS|Docker Version|
|---|---|---|
|x86_64|CentOS 7|17.06|
|x86_64|Ubuntu 14.04|1.9|
|x86_64|Ubuntu 14.04|1.11|
|x86_64|Ubuntu 14.04|1.13|
|x86_64|Ubuntu 14.04|17.06|
|x86_64|Ubuntu 16.04|17.06|
|x86_64|Windows Server 2016|17.06|

## BYON Nodes

**BYON Nodes** let you run jobs on your own infrastructure, so you can attach your machines to your Shippable subscription and all your jobs are routed to those machines. Your BYON nodes can be anywhere, such as in your Amazon EC2 VPN, Google Cloud, Linode, or Digital Ocean, or even in your datacenter behind a firewall. The greatest thing about BYON Nodes is that you do not need to open any incoming ports since the Shippable SaaS service never initiates a connection with your nodes.

This is a powerful hybrid approach that gives you the benefit of using a SaaS service for CI orchestration, while still giving you full control over the infrastructure and security of your build machines.

### Advantages
Advantages are:

* **Security:** Your build machines can be inside your VPC and/or behind your firewall, which gives you the ability to configure access, IAM, etc. We even have a way of configuring these machines so that you do not have to grant Shippable SSH access! This means your code never leaves your firewall and no external entity can access your machines.
Complete control over your build machines, including SSH access, ability to choose your cloud provider and size of build machines.

* **Faster build times:** You can leave your build machines running all the time, which eliminates the additional minute per build that is added when new machines are spun up on Shippable's hosted infrastructure.

### Maintenance

You will need to do a few maintenance tasks if you are using BYON nodes:

* [Attaching the nodes](/platform/tutorial/runtime/manage-byon-nodes/#add-node) to your Subscription
* Periodically [re-initializing the node](/platform/tutorial/runtime/manage-byon-nodes/#reset-node) with latest software updates from Shippable
* Periodic node cleanup since the nodes stay up between jobs and the artifacts can build up over time

### Minimum requirements
The minimum requirements for a build machine that can be attached to Shippable are:

* 1.8GB RAM
* 30GB SSD
* Supported architecture, OS and Docker versions

|Architecture|OS|Docker Version|
|---|---|---|
|x86_64|CentOS 7|17.06|
|x86_64|macOS 10.12|17.06|
|x86_64|Ubuntu 14.04|1.9|
|x86_64|Ubuntu 14.04|1.11|
|x86_64|Ubuntu 14.04|1.13|
|x86_64|Ubuntu 14.04|17.06|
|x86_64|Ubuntu 16.04|1.13|
|x86_64|Ubuntu 16.04|17.06|
|aarch64|Ubuntu 16.04|17.06|
|x86_64|Windows Server 2016|17.06|

**Please note that you will need to attach one build machine per parallel build.**

### Software Requirements
If you choose to run your BYON Node on an unsupported OS like Alpine, please ensure the following packages are pre-installed -

* bash
* python2.7
* /proc/sys/kernel/uuid
* apt-get (this is used to install further dependencies like git and openssh-client)

### Tutorials

Please read our [BYON Node tutorials](/platform/tutorial/runtime/manage-byon-nodes/) to learn how to add a BYON node, re-initialize it, and delete it.
