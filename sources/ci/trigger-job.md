page_main_title: Triggering your CI job
main_section: CI
sub_section: Overview
page_title: Triggering your CI job
page_description: How to trigger a Shippable CI job 

#Triggering your CI job

To run your CI build, you will first need to [enable your repository for CI](enable-project/). Once enabled, CI is triggered for your project in one of five ways.

-  A change is committed to your repository in your source control. Commits will trigger the branch updated.

-  A pull request is opened for a branch.

-  A tag or release is created for your repository.

-  You trigger a manual build through the Shippable UI.

-  You have set up your builds to be triggered on a schedule using a [time](/platform/workflow/resource/time/) resource. Scheduled builds trigger the default branch configured in the SCM.

In the first two scenarios, builds are triggered automatically and the workflow configured in your `shippable.yml` is executed. For more information on pull requests builds, [read the docs on that topic](pull-request-builds/).

##Manual builds

You can trigger a build for your project by going to the Subscription or Project page and clicking on the **Build** button.

<img src="../../images/ci/manual-builds.png" alt="Add Docker Hub credentials">

##Scheduled builds

Scheduled builds means running an automated build for a project on a specific schedule. For example, many teams choose to run nightly builds. Scheduled builds are triggered on the default branch of the repository, configured in the SCM. For example, in GitHub you would click on the repository `Settings->Branches->Default branch` to set the default branch of your repository, which defaults to `master`.

We have written a detailed blog post on how to run scheduled CI builds with the help of a `time` resource. Please read the blog post to learn [how to set up automated scheduled builds](http://blog.shippable.com/setup-nightly-builds-on-shippable).

##Configuring build triggers

You can enable or disable triggering of builds for your project based on specific webhook events on your source control system.

To do this:

- Go to your Project in the UI and click on the **wrench icon** which will render all your project settings.

<img src="/images/ci/project-settings.png" alt="Configure webhook events to trigger builds">

- You can configure the following:
    - **Pull Requests**: Default value is **Enabled**. Every pull request triggers a build on Shippable when opened. Toggle the control to stop the triggering of builds for pull requests.
    - **Commits**: Default value is **Enabled**. Every commit to the repository triggers a build on Shippable. Toggle the control to stop the triggering of builds for commits.
    - **Tags**: Default value is **Disabled**. To trigger builds for git tag push events, toggle the control.
    - **Releases**: Default value is **Disabled**. To trigger builds for GitHub release
events, toggle the control.This feature is supported only for GitHub.

## Pausing your project

You can 'Pause' a project to stop triggering builds for all webhook events. You will still be able to trigger a build manually.

You can 'Resume' a paused project at any time, which will re-establish webhooks and builds will be triggered as expected.

## Serializing jobs for a project

You can disable parallel jobs for a allows you to restrict job processing based on branch name.

When this setting is disabled, any waiting job will not begin until all processing
jobs have completed.

You can further customize this by selecting the specific branches that you don't
want running in parallel.

<img src="/images/ci/project-settings.png" alt="Run Parallel Jobs">

In this example, if jobs are triggered simultaneously for branches `master` and
`prtest`, only one job will be allowed to run at a time, even if the subscription
has two idle nodes.  

However, if this project were to trigger a job on a branch that was not selected, it would start as soon as it finds  an available node.

The serial jobs will run in the order that they were queued.
