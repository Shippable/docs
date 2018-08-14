page_main_title: Project Settings
main_section: Platform
sub_section: Management
sub_sub_section: Project
page_title: Project Settings - Shippable DevOps Assembly Lines
page_description: Overview of Project Settings that can be configured for your CI project on Shippable DevOps Assembly Lines Platform
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# Project Settings

You can configure different options and settings for your project on this page. To get here:

* Click on the Subscription in the left navbar.

<img src="/images/getting-started/account-settings.png" alt="Add Integration">

* Click on the project you want and then on the Project page, click on the **Spanner** icon to open Settings.

## Webhook config
<img src="/images/platform/visibility/project-settings-1.jpg" alt="Project Settings for Shippable DevOps Assembly Lines" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

* **Process Webhooks**: Turns ON or OFF automatic processing of your source control webhooks on this repository. If turned **OFF**, builds and jobs will not be triggered automatically for any changes to the repository. You can still run manual builds.

* **Account Used**: This is the account used to interact with source control as required, during a run or job, e.g. to pull your source code. You can change the account if needed, but if it doesn't have necessary permissions to the repository, your jobs might be affected.

* **Parallel Jobs**: If set to **OFF**, your CI jobs for this repository will run serially, even if you have available minions. Set to **ON** to enable parallel execution of CI jobs.

* **Commits**: There are two levels of control for this setting:
  * If set to **ON**, Commit webhooks for this repository will automatically trigger jobs as expected. If set to **OFF**, Commit webhooks will be ignored
  * If set to **Latest Commit/Branch**, a new commit to a branch results in all jobs triggered by older commits to the branch to be canceled if they are still queued or in progress. If set to **All commits**, a new commit to the branch will be queued as usual, without canceling any previous pending jobs.

* **Pull Requests**: There are two levels of control for this setting:
  * If set to **ON**, Pull Request webhooks for this repository will automatically trigger jobs as expected. If set to **OFF**, Pull Request webhooks will be ignored
  * If set to **Latest Commit on Pull Request**, a new commit to an open Pull Request results in all jobs triggered by older commits to the Pull Request to be canceled if they are still queued or in progress. If set to **All Commit on Pull Request**, a new commit to an open Pull Request will be queued as usual, without canceling any previous pending jobs.

* **Tags**: If set to **ON**, tag create event on the source control repository will trigger your CI job

* **Release**: If set to **ON**, release create event on the source control repository will trigger your CI job

## View Settings

<img src="/images/platform/visibility/project-settings-2.jpg" alt="Project Settings for Shippable DevOps Assembly Lines" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

* **Display Branches**: Using this, you can control which branches for this project are displayed on the [Home](/platform/visibility/account/default-view/) and [Subscription](/platform/visibility/subscription/dashboard/) Dashboards

* **Types to Display**: Select whether you want to see only status for jobs triggered by Commits, or Commits and Pull Requests on the [Home](/platform/visibility/account/default-view/) and [Subscription](/platform/visibility/subscription/dashboard/) Dashboards

## Reports Configuration

* **Consolidate Reports**: If you are using a [matrix build](/ci/matrix-builds/) to parallelize your tests, turning this **ON** will calculate test and coverage results across all jobs

* **Low Coverage Threshold**: You can set a threshold, and if the code coverage percent for a CI run falls below the Low Coverage Threshold, the run will be marked as **Unstable**.

## Encrypt and Decrypt

* **Encrypt**: You can encrypt key-value pairs and use them in your jobs. This is mainly to protect sensitive information like keys, tokens, passwords, etc.

* **Decrypt**: Owners of a project can decrypt any string that was encrypted on this screen.

## Project Clone

This is used to create a custom URL to clone a project. This can be used to clone any repository that authenticates with a git based method.

## Project Actions

<img src="/images/platform/visibility/project-settings-3.jpg" alt="Project Settings for Shippable DevOps Assembly Lines" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

* **Sync**: Synchronize your project with source control system. Usually used to fetch new branches in your source control that are not yet reflected in Shippable

* **Timeout**: This sets the maximum time(in minutes) after which you want your CI job to timeout. If this is not provided then timeout set at [Node Pool](/platform/management/subscription/node-pools/) level, [Subscription](/platform/management/subscription/settings/) level or default will be used, in that order. Default value for timeout is 60 minutes for free users and 120 minutes for paid users.

* **Reset Project**: This will reset all the keys, passwords that Shippable internally creates. If you are using any of these externally, you will need to update those systems as well. You will also need to re-encrypt any secure variables you encrypted on this Project Settings page.

## Delete Project

This will permanently delete all project history, webhooks etc. No jobs will be triggered for deleted projects.

This is a non-reversible action, so proceed with caution!
