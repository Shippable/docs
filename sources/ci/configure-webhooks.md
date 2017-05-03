main_section: CI
sub_section: Advanced config
page_title: Configuring triggers for your project
page_description: Learn how to turn webhooks off and on for your enabled projects

# Customizing webhook triggers

By default, a build will be triggered for all branches of all enabled projects for the following events:

- A new commit is pushed
- A pull request is opened or merged
- A tag is pushed
- A release is pushed

You can configure your project to only trigger for a subset of these events.


##Customizing webhook triggers

You can enable or disable triggering of builds for your project based on specific webhook events on your source control system.

To do this:

- Go to your Project on in the UI and click on **Settings**
- Click on **Runs config** in the left sidebar menu. You will see a section **Configuring webhook events for triggering builds**.

<img src="/images/ci/configure-job-triggers.png" alt="Configure webhook events to trigger builds">

- You can configure the following:
    - **Pull Requests**: Default value is **Enabled**. Every pull request triggers a build on Shippable when opened. Click
`Disable` to stop the triggering of builds for pull requests.
    - **Commits**: Default value is **Enabled**. Every commit to the repository triggers a build on Shippable. Click `Disable` to
stop the triggering of builds for commits.
    - **Tags**: Default value is **Disabled**. To trigger builds for git tag push events, click `Enable`.
    - **Releases**: Default value is **Disabled**. To trigger builds for GitHub release
events, click `Enable`.This feature is supported only for GitHub.

## Pausing your project

You can 'Pause' a project to stop triggering builds for all webhook events. You will still be able to trigger a build manually.

You can 'Resume' a paused project at any time, which will re-establish webhooks and builds will be triggered as expected.
