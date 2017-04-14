main_section: Reference
sub_section: Machine Images
page_title: Machine Images on Shippable
page_description: An explanation of the images used for CI
page_keywords: ci/cd dashboard, subscription settings, CI/CD, shippable CI/CD, documentation, shippable, config, yml, AMI, Docker, version, 1.11, 1.12

# What are Machine images?
A Machine image is an pre-baked image that contains all the necessary components
installed. This is used to spin up minions for running your CI, RunSH & RunCLI
jobs on it. Every subscription (org/team depending on SCM you use) has a default
version of the machine image configured. This default is setup whenever the first
CI or Pipeline job is configured.

The following picture shows the relationship between the build machine and the
build container. The build container is spun up on the build machine using either
the default Docker image depending the `language` tag in your yml configuration
or a custom Docker image if specified in the yml.

<img src="../../images/ci/shippableOverview.png"
alt="Machine Image for a Subscription" style="width:800px;"/>

We currently offer the following Machine Images. You can click on any one to see
what is pre-installed on that image:

| Machine Image | Release date     |
|---------------|-------------------|
| [v5.4.1](v5-4-1/)        | Mar 30, 2017    |
| [v5.3.2](v5-3-2/)        | Mar 11, 2017    |
| [Stable](stable/)        | Feb 19, 2016 (deprecated) |

**The default Machine Image for your subscription is the latest image available
when your Subscription was added to Shippable.**

In most cases, the default Machine image set for your Subscription will be
sufficient to run your builds. The main reasons why you might want to consider
changing to a more recent image are:

- <i class="ion-ios-minus-empty"> </i>You need a newer language/service/package version
- <i class="ion-ios-minus-empty"> </i>You need a newer Docker version


## Viewing Subscription Machine Image

To see what Machine Image is being used for your subscription, go to the
`Settings` tab of your Subscription and click on `Options` in the left sidebar.

The top item on this page will show you the machine image currently being used:

<img src="../../images/ci/view-machine-image.png"
alt="Machine Image for a Subscription" style="width:800px;"/>

<a name="change-machine-image"></a>
## Changing the Subscription Machine image

To select a different Machine Image:

- <i class="ion-ios-minus-empty"> </i>Go to the `Settings` tab of your Subscription
- <i class="ion-ios-minus-empty"> </i>Click on `Options` in the left sidebar and select the image you want from the
dropdown under the 'Machine Images' section. Please note that this setting will
affect all projects and builds in your Subscription.

<img src="../../images/ci/change-machine-image.png"
alt="Machine Image for a Subscription" style="width:800px;"/>
