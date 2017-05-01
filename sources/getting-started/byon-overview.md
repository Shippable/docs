main_section: Getting started
sub_section: Using your own infrastructure

#Running builds on your own infrastructure
By default, all your builds run in build containers hosted on Shippable's infrastructure.

However, some organizations have very specific security requirements that do not allow them to run builds on hosted infrastructure. Others need bigger machines since their builds are resource intensive and take too long on Shippable's infrastructure.

To address these types of scenarios, we offer a novel approach called Bring Your Own Nodes (BYON).

**BYON lets you run builds on your own infrastructure**, so you can attach your machines to your Shippable subscription and all your builds are routed to those machines.

This is a powerful hybrid approach that gives you the benefit of using a SaaS service for CI orchestration, while still giving you full control over the infrastructure and security of your build machines.

##Advantages of BYON

**Security**: Your build machines can be inside your VPC and/or behind your firewall, which  gives you the ability to configure access, IAM, etc. We even have a way of configuring these machines so that you do not have to grant Shippable SSH access! This means your code never leaves your firewall and no external entity can access your machines.

**Complete control over your build machines**, including SSH access, ability to choose your cloud provider and size of build machines.

**Faster build times**: You can leave your build machines running all the time, which eliminates the occasional 2-3 mins per build that is added when new machines are spun up on Shippable's hosted infrastructure.

**Bigger containers**: We do not constrain container size in terms of cores and RAM while spinning up build containers on your infrastructure. This means your container uses all available capacity of your build machine, which is especially great if your builds are resource intensive. The result? Faster builds!

**Docker caching**: If you use Docker for your build workflows like pulling Docker images from a registry or building Docker images, your build machines will already have these images and this will speed up your builds.

## Minimum requirements
The minimum requirements for a build machine that can be attached to Shippable are:

* 1.8GB RAM
* 30GB SSD
* 64-bit architecture
* Supported OS and Docker versions

|OS|Docker Version|
|---|---|
|Ubuntu 14.04|1.9|
|Ubuntu 14.04|1.11|
|Ubuntu 14.04|1.13|
|Ubuntu 16.04|1.13|

**Please note that you will need to attach one build machine per parallel build.**

We have tested BYON extensively using machines on Amazon EC2 and Digital Ocean. We expect machines from other providers to work without issues as long as they satisfy the above requirements.

If you run into any issues, contact us through [support](https://github.com/shippable/support/issues) or email our [support alias](mailto:support@shippable.com).

All the scripts for initializing the nodes are are publicly available [here](https://github.com/Shippable/node). We update this repository consistently to fix
any bugs and to add support for new operating systems.
