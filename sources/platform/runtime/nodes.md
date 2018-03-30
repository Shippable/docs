page_main_title: Learn more about On-demand and BYON nodes
main_section: Platform
sub_section: Runtime
page_title: Node types
page_description: Different types of Nodes which execute jobs supported by the Shippable DevOps Assembly Lines platform

# Node types

You need a virtual machine, i.e. node, on which your job is executed. The Shippable DevOps Assembly Lines platform supports two types of nodes:

* **On-demand nodes** which are provisioned when a job is triggered and destroyed after a preset amount of idle time if no new job is triggered during that time. This is the default node type for any SaaS subscription.
* **BYON nodes** which are build nodes provided by you and attached to your Shippable Subscription. These nodes should be running and available when a job is triggered, since the Shippable platform does not dynamically provision them.

Please note that a node can run one job at a time, so the number of nodes in your plan is the number of parallel jobs you can run for your Subscription.

## On-demand Nodes

On-demand nodes allow you to have a CI/CD platform with zero maintenance from our end as far as the infrastructure is concerned.

### Advantages

Advantages of On-demand nodes are:

* Zero management of CI/CD infrastructure since the platform takes care of provisioning/deprovisioning/cleanup etc.
* Cost savings since the monthly price per node is ~50-66% cheaper than what you would pay AWS to just run the node for a month

### Node size

The default node size for the free plan is equivalent to a c4.large instance on AWS, with 2 core, 3.75GB RAM.

For paid plans, you can choose between the following sizes:

* 2 core, 3.75GB RAM -- equivalent to c4.large
* 4 core, 7.5GB RAM -- equivalent to c4.xlarge
* 8 core, 15GB RAM -- equivalent to c4.2xlarge

The biggest reason to choose a larger sized node is faster job execution since they have more cores and RAM. However, if your jobs do not need the extra resources, you should do just fine on the c4.large machines.

### Maximum time allocated to an On-demand Node

An On-demand node executes jobs, each of which have their own specific timeout. The platform checks if the On-demand node is idle for the last 5 minutes at the hourly boundary. If the node is idle, it is immediately de-provisioned.

### Machine Images

On-demand Nodes are booted with a Shippable Machine image. Each Machine image is versioned. [Read More on machine images](/platform/runtime/machine-image/ami-overview/).

Machine images exist for the following architectures and operating systems:

|Architecture|OS|Docker Version|
|---|---|---|
|x86_64|CentOS 7|17.06|
|x86_64|Ubuntu 14.04|1.9|
|x86_64|Ubuntu 14.04|1.11|s
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

* **Faster build times:** You can leave your build machines running all the time, which eliminates the occasional 2-3 mins per build that is added when new machines are spun up on Shippable's hosted infrastructure.

* **Docker caching:** If you use Docker for your build workflows like pulling Docker images from a registry or building Docker images, your build machines will already have these images and this will speed up your builds.

### Maintenance

You will need to do a few maintenance tasks if you are using BYON nodes:

* [Attaching the nodes](/platform/tutorial/runtime/custom-nodes/#add-node) to your Subscription
* Periodically [re-initializing the node](/platform/tutorial/runtime/custom-nodes/#reset-node) with latest software updates from Shippable
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
* apt-get // this is used to install further dependencies like git and openssh-client

### Tutorials

Please read our [BYON Node tutorials](/platform/tutorial/runtime/custom-nodes/) to learn how to add a BYON node, re-initialize it, and delete it.
