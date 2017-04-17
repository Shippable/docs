main_section: CI
sub_section: Overview

#Triggering your CI

To run your CI build, you will first need to [enable your repository for CI](enable-project/). Once enabled, CI is triggered for your project in one of four ways.

- <i class="ion-ios-minus-empty"> </i>  A change is committed to your repository in your source control.

- <i class="ion-ios-minus-empty"> </i>  A pull request is opened for a branch.

- <i class="ion-ios-minus-empty"> </i>  A tag or release is created for your repository.

- <i class="ion-ios-minus-empty"> </i>  You trigger a manual build through the Shippable UI.

- <i class="ion-ios-minus-empty"> </i>  You have set up your builds to be triggered on a schedule.

In the first two scenarios, builds are triggered automatically and the workflow configured in your `shippable.yml` is executed. For more information on pull requests builds, [read the docs on that topic](pull-request-builds/).

##Manual builds

You can trigger a build for your project by going to the Subscription or Project page and clicking on the **Build** button.

<img src="../../images/ci/manual-builds.png" alt="Add Docker Hub credentials">

##Scheduled builds

Scheduled builds means running an automated build for a project on a specific schedule. For example, many teams choose to run nightly builds.

We have written a detailed blog post on how to run scheduled CI builds with the help of a `time` resource. Please read the blog post to learn [how to set up automated scheduled builds](http://blog.shippable.com/setup-nightly-builds-on-shippable).

##Configuring build triggers

You can enable or disable triggering of builds for your project, based on specific webhook events on your source control system.

To do this, go to the **Settings** tab of your project on Shippable and click on **Runs config** in the left sidebar menu. Find the section for **Configure webhook events for triggering builds**.

<img src="../../images/ci/webhook-event-triggers.png" alt="Configure Webhook events
to trigger builds">

Configure what you need:

- <i class="ion-ios-minus-empty"> </i>  **Pull Requests**: Click **Disable** to stop the triggering of builds when pull requests are opened or updated for this project. Default value is Enabled.
- <i class="ion-ios-minus-empty"> </i>  **Commits**: Click **Disable** to
stop the triggering of builds for code commits to this project. Default value is Enabled.
- <i class="ion-ios-minus-empty"> </i>  **Tags**: Click **Enable** to trigger builds for all git tag push events
on the project. Default value is Disabled.
- <i class="ion-ios-minus-empty"> </i>  **Releases**: Click **Enable** to trigger builds for all GitHub release
events on the project. Default value is Disabled. This
feature is currently supported only for GitHub.
