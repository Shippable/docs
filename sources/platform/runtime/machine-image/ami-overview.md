page_main_title: Overview
main_section: Platform
sub_section: Runtime
sub_sub_section: Machine image
page_title: Machine Images on Shippable
page_description: An explanation of the images used for CI
page_keywords: ci/cd dashboard, subscription settings, CI/CD, shippable CI/CD, documentation, shippable, config, yml, AMI, Docker, version, 1.11, 1.12

# What are Machine images?

A Machine image is an pre-baked image that contains all the necessary components installed to run your CI (`runCI`) or `runSh` jobs.  Every
Subscription (org/team depending on SCM you use) has a default version of the machine image configured. This default is setup whenever the first
CI or Assembly Line is enabled on Shippable.

The following picture shows the components of the machine image and how they interact with each other.

* When a new job is triggered, Shippable orchestration spins up a new build node, aka minion, with your default Subscription machine image.
*  For CI jobs configured with `shippable.yml`, the Shippable Agent on the build node spins up a build container  using either
the default Docker image depending on the `language` tag in your [yml configuration](/ci/yml-structure) or a [custom Docker image](/ci/custom-docker-image/) if specified in the yml. All commands in the `ci` and `post_ci` section of your YAML are run inside the build container.
* For `runSh` jobs configured with  `shippable.jobs.yml`, the commands in the `script` section are run in the Shippable Agent.

<img src="/images/platform/runtime/build-workflow.png"
alt="Machine Image for a Subscription" style="width:800px;"/>

We currently offer the following Machine Images. **The default Machine Image for your subscription is the latest image available when your Subscription was added to Shippable.**

You can click on any image below to see what is pre-installed:

| Machine Image | Release date     |
|---------------|-------------------|
| [v5.8.2](ami-v582/)        | Aug 10, 2017    |
| [v5.7.3](ami-v573/)        | Jul 20, 2017    |
| [v5.6.1](ami-v561/)        | Jun 05, 2017    |
| [v5.5.1](ami-v551/)        | Apr 26, 2017    |
| [v5.4.1](ami-v541/)        | Mar 30, 2017    |
| [v5.3.2](ami-v532/)        | Mar 11, 2017    |
| [Stable](ami-stable/)      | Feb 19, 2016 (deprecated) |

In most cases, the default Machine image set for your Subscription will be sufficient to run your builds. The main reasons why you might want to consider
changing to a more recent image are:

-  You need a newer language/service/package version
-  You need a newer Docker version

<a name="view-machine-image"></a>
## Viewing Subscription Machine Image

To see what Machine Image is being used for your subscription:

* From the left sidebar menu, click on your Subscription

<img src="/images/getting-started/account-settings.png" alt="View Subscription">

* On your Subscription Dashboard, click on the **Gears** icon on the right which will show a dropdown. Click on **Nodes**

<img src="/images/ci/view-machine-image.png"
alt="Machine Image for a Subscription" style="width:800px;"/>

<a name="change-machine-image"></a>
## Changing the Subscription Machine image

To view your machine, image follow instructions in [Viewing Subscription Machine Image](#view-machine-image) section above.

You can click on the **Machine Images** dropdown to select a different image. Please note that this setting will
affect all projects and builds in your Subscription.

<img src="/images/ci/change-machine-image.png"
alt="Machine Image for a Subscription" style="width:800px;"/>
