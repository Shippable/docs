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
*  For CI jobs configured with **shippable.yml**, the Shippable Agent on the build node spins up a build container  using either
the default Docker image depending on the `language` tag in your [yml configuration](/ci/yml-structure) or a [custom Docker image](/ci/custom-docker-image/) if specified in the yml. All commands in the `ci` and `post_ci` section of your YAML are run inside the build container.
* For `runSh` jobs configured in **shippable.yml**, commands in the `script` section are run in the Shippable Agent.

<img src="/images/platform/runtime/build-workflow.png"
alt="Machine Image for a Subscription" style="width:800px;"/>

We currently offer the following Machine Images. **The default Machine Image for your subscription is the latest image available when your Subscription was added to Shippable.** Shippable officially supports the Machine Images for 12 months from their release date after which they're deprecated.

You can click on any image below to see what is pre-installed:

| Machine Image | Release date     |
|---------------|-------------------|
| [v6.6.4 (latest)](ami-v664/)      | June 28, 2018 |
| [v6.5.4](ami-v654/)      | May 31, 2018 |
| [v6.4.4](ami-v644/)      | May 2, 2018 |
| [v6.3.4](ami-v634/)      | Apr 2, 2018 |
| [v6.2.4](ami-v624/)      | Feb 25, 2018 |
| [v6.1.4](ami-v614/)      | January 25, 2018 |
| [v5.10.4](ami-v5104/)      | October 27, 2017 |
| [v5.8.2](ami-v582/)        | Aug 10, 2017    |
| [v5.7.3](ami-v573/)        | Jul 20, 2017    |
| [v5.6.1](ami-v561/)        | Jun 05, 2017    |
| [v5.5.1](ami-v551/)        | Apr 26, 2017 (deprecated)   |
| [v5.4.1](ami-v541/)        | Mar 30, 2017 (deprecated)   |
| [v5.3.2](ami-v532/)        | Mar 11, 2017 (deprecated)   |
| [Stable](ami-stable/)      | Feb 19, 2016 (deprecated) |

In most cases, the default Machine image set for your Subscription will be sufficient to run your builds. The main reasons why you might want to consider changing to a more recent image are:

-  You need a newer language/service/package version
-  You need a newer Docker version

<a name="view-machine-image"></a>

## Viewing a Node Pool Machine Image

When a subscription is imported in your Shippable account for the very first time, a [Node pool](/platform/management/subscription/node-pools/) is automatically created for you. The default Node pool has a single Ubuntu 14.04 on-demand node, with the latest released Ubuntu 14.04 machine image. A subscription can have multiple Node pools that you can [create](/platform/management/subscription/node-pools/#creating-a-node-pool). Each Node Pool specifies the machine image in its `Runtime Version` setting.

Here are the steps to view the `Runtime Version` setting for a Node pool:

* View your Node pool using steps documented [here](/platform/management/subscription/node-pools/#viewing-subscription-node-pools)
* Click on `Edit` on your Node pool.
* This will bring up a popup window where you can view the `Runtime Version` setting.

<img src="/images/platform/management/subscription-node-pools-edit.png" alt="Subscription Node Pools view for Shippable DevOps Assembly Lines" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

## Changing the Node Pool Machine image

* Follow instructions in the [Viewing Node Pool Machine Images](#view-machine-image) section above to view the `Runtime Version` setting for the Node pool in your subscription.
* Click on the **Runtime Version** dropdown to select a different image version. Please note that this setting will
affect all jobs that are running on the node pool. A runCI/runSh job can be forced to run on a specific node pool by specifying the `runtime` setting in its yml.

<img src="/images/platform/management/subscription-node-pools-edit-runtime-version.png" alt="Subscription Node Pools add for Shippable DevOps Assembly Lines" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>
