page_main_title: Canceling builds
main_section: CI
sub_section: Configuration
sub_sub_section: Advanced config
page_title: Configuring runs
page_description: Learn how to cancel commit/PR builds when updated

# Canceling builds

You can cancel any build manually through the UI by clicking on the **Cancel** button on the Build page or Project page:

<img src="/images/ci/cancel-build.png" alt="Cancel a build">

## Canceling builds when the branch/PR is updated

In some cases, you might want to cancel all current and pending builds for a PR when it is updated. Similarly, you might want to cancel all current and pending builds when a new commit is added to a branch.  

To enable either of these:

- Go to your Project in the UI and click on **Settings**

- Click on **Runs config** in the left sidebar menu. You will see a **Run Settings** section.

<img src="/images/ci/project-settings.png" alt="Cancel all old PR or Commit builds">

- You can set the following:

    - **Run only latest PR builds**: When enabled, each update to an open PR will cancel any queued or in-progress builds for that PR, and trigger a new build for the latest update. Default value is **Disabled**.
    - **Run only latest commit builds**: When enabled, each new commit to a branch will cancel any queued or in-progress builds for that branch, and trigger a new build with the latest commit. Default value is **Disabled**.
