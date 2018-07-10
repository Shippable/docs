page_description: Running builds on Arm architecture
main_section: Platform
sub_section: Tutorials
sub_sub_section: Workflow

# Running jobs on Arm machines

In addition to x86/x64, Shippable also supports Arm builds. It is the only hosted CI/CD platform to offer native CI/CD for Arm developers.

Even better news? Building on Arm machines is absolutely free for open source projects! Thanks to our partners [Arm](https://www.arm.com/) and [Packet](https://www.packet.net/), we have been able to forge an alliance to support the open source community.

This document explains how to enable Arm builds for your Organization/Team and configure your jobs. Before you start, please be aware of the following:

* Your free Arm builds will be executed on a shared pool of machines that are available to all open source Arm-based projects.
* We run each build inside a container, which is destroyed when the build ends. So your build information and artifacts will be cleaned up before the machine is repurposed for another build.
* You will not be able to run native Docker commands as part of your build workflow. If you need this, please contact us at [support@shippable.com](mailto:support@shippable.com).
* [runCI](/ci/why-continuous-integration) and [runSh](/platform/workflow/job/runsh) jobs are both supported for Arm.

If you're interested in building commercial projects on Arm, you will need to use our [BYON functionality](/platform/tutorial/runtime/manage-byon-nodes/)

## Instructions

Follow instructions below to start running builds on 64-bit Arm machines. To run builds on 32-bit Arm machines, send us a note at [support@shippable.com](mailto:support@shippable.com) and we will enable this for your organization/team.

### 1. Get a new shared license

* From the left navigation bar, choose the organization which contains your open source Arm-based projects.

* Click on the **Gears** icon at the top right of your Subscription page, and click on **Billing**.
* Click on the **Edit** button, and then click on the **Add new SKU** button.
* Choose the **Shared** plan type, which is currently only available for Arm. Choose **aarch64** or **aarch32** Architecture, and **Ubuntu 16.04** for OS as shown below.

<img src="/images/platform/tutorial/workflow/run-ci-builds-on-arm-fig1.png" alt="show deleted objects">

* Click on **Save** to update your plan.
* You will now see your nodes on the **Node Pools** page, which can be accessed by going back to the Subscription page, clicking on the **Gear** icon, and clicking on **Node pools**.

<img src="/images/platform/tutorial/workflow/run-ci-builds-on-arm-fig2.png" alt="show deleted objects">

### 2. Configure your YAML

Next, you need to configure your **shippable.yml** to run on this shared pool of Arm machines.

#### CI jobs

If you are running CI jobs, the **shippable.yml** configuration is explained in the [CI section](/ci/yml-structure/), and our support for CI in general is explained in [CI overview](/ci/why-continuous-integration/).

* [Enable your CI project](/ci/enable-project/).
* Add a **shippable.yml** to the root of your repository and configure your workflow. Read the [configuration reference](/ci/yml-structure/) for help with config.
* The important thing here is to configure your builds to run builds on the shared node pool. The `runtime` section of the YAML will help achieve this:

```
runtime:
  nodePool: shippable_shared_aarch64

```
* That's it! Commit your config file and your project will start building on the shared pool!

<img src="/images/platform/tutorial/workflow/run-ci-builds-on-arm-fig3.png" alt="show deleted objects">


#### runSh jobs

If you want to configure a multi-stage workflow with event driven triggers (what we call Assembly Lines, you should use the `runSh` job type, which can also be defined in **shippable.yml**. You should know the following before you use `runSh`:

* [Assembly Lines overview](/platform/overview/#workflow-automation)
* [Assembly Lines config](/platform/workflow/config/#assembly-lines-configuration)
* [runSh job reference](/platform/workflow/job/runsh)

To run your `runSh` job on the shared Arm node pool, add the following to your job:

```
jobs:
  - name: myArmJob   
    type: runSh
    runtime:                        
      nodePool: shippable_shared_aarch64
    # rest of runSh config  

```

[Add your Assembly Line config to Shippable](/platform/tutorial/workflow/add-assembly-line/) and start building your runSh job!
