page_main_title: Dynamic Nodes Overview
main_section: Platform
sub_section: Tutorials
sub_sub_section: Runtime
page_title: Dynamic Nodes Overview

# TODO
| Tasks  | Status |
|--------|--------|
| Timeout | Open |

# Dedicated Dynamic Nodes

Dedicated Dynamic nodes are dynamically provisioned on EC2 when a job runs and terminated after the job completes. These nodes are dedicated to a specific build, meaning they are not multi-tenant.

More information on the pricing of these nodes can be found [here](https://www.shippable.com/pricing.html).

## Sizes of Dynamic nodes

* C4.Large
* C4.xlarge
* C4.2xlarge

More information on the pricing of these nodes can be found [here](https://www.shippable.com/pricing.html).

## Provisioning a Dynamic Node

Dynamic nodes take around 2-3 minutes to provision. This cost is incurred on every build. If you want to save on provisioning
time, use Custom nodes which run all the time.

## Maximum time allocated to a Dynamic Node

A dynamic node executes jobs, each of which have their own specific timeout. The platform checks if the Dynamic node is idle for the last 5 minutes at the hourly boundary. If the node is idle, it is immediately deprovisioned.

## Machine Images

Dynamic Nodes are booted with a Shippable Machine image. Each Machine image is versioned and comes in a Ubuntu 14/16 flavor.

A machine image is set at the level of organization/team (a.k.a Subscription) only and cannot be set at a project level (unless the project is moved to its own dedicated organization/team).

We currently offer the following Machine Images. You can click on any one to see
what is pre-installed on that image:

| Machine Image | Release date     |
|---------------|-------------------|
| [v5.7.3](ami-v573/)        | Jul 20, 2017    |
| [v5.6.1](ami-v561/)        | Jun 05, 2017    |
| [v5.5.1](ami-v551/)        | Apr 26, 2017    |
| [v5.4.1](ami-v541/)        | Mar 30, 2017    |
| [v5.3.2](ami-v532/)        | Mar 11, 2017    |

**The default Machine Image for your subscription is the latest image available
when your Subscription was added to Shippable.**

In most cases, the default Machine image set for your Subscription will be
sufficient to run your builds. The main reasons why you might want to consider
changing to a more recent image are:

-  You need a newer language/service/package version
-  You need a newer Docker version


## Viewing Organization/Team Machine Image

To see what Machine Image is being used for your subscription, go to the
`Settings` tab of your Subscription and click on `Options` in the left sidebar.

The top item on this page will show you the machine image currently being used:

<img src="/images/ci/view-machine-image.png"
alt="Machine Image for a Subscription" style="width:800px;"/>

<a name="change-machine-image"></a>

## Changing the Organization/Team Architecture

To select a different Machine Image:

-  Go to the `Settings` tab of your Subscription
-  Click on `Nodes` and select the architecture you want from the
dropdown under the 'Architecture' section. Please note that this setting will
affect all projects and builds in your Subscription.

<img src="/images/ci/change-machine-architecture.png"
alt="Architecture for a Subscription" style="width:800px;"/>

Also currently, only x86_64 architecture
is supported. Builds won't run on aarch64 architecture.

<img src="/images/ci/dynamic-node-aarch64.png"
alt="Architecture for a Subscription" style="width:800px;"/>

## Changing the Organization/Team Machine image

To select a different Machine Image:

-  Go to the `Settings` tab of your Subscription
-  Click on `Options` in the left sidebar and select the image you want from the
dropdown under the 'Machine Images' section. Please note that this setting will
affect all projects and builds in your Subscription.

<img src="/images/ci/change-machine-image.png"
alt="Machine Image for a Subscription" style="width:800px;"/>
