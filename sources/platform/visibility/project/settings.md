page_main_title: Project Settings
main_section: Platform
sub_section: Visibility
sub_sub_section: Project
page_title: Project Settings - Shippable DevOps Assembly Lines
page_description: Overview of Project Settings that can be configured for your CI project on Shippable DevOps Assembly Lines Platform
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# Project Settings
This is a place where your can configure different options and settings that you might need to make your CI project behave in a particular way

**Section 1**
<img src="/images/platform/visibility/project-settings-1.jpg" alt="Project Settings for Shippable DevOps Assembly Lines" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

* Process Webhooks: Turns ON or OFF automatic processing of your source control webhooks on this repo
* Account Used: This is the account that is being used while processing the webhooks
* Parallel Jobs: Turning this off means your CI jobs on this repo will run in serial
* Commits: Do you want to run the latest commit or all commits. When its latest, if older commits are executing, they will be cancelled
* PRs: Do you want to run the latest commit on a PR or all commits on PR. When its latest, if older commits are executing, they will be cancelled
* Tags: Turning this on will execute CI Jobs when a Tag is created
* Release: Turning this on will execute CI Jobs when a Release is created

**Section 2**
<img src="/images/platform/visibility/project-settings-2.jpg" alt="Project Settings for Shippable DevOps Assembly Lines" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

* Display Branches: Using this, you can control which branches are displayed on Home Dashboard
* Types to Display: Whether you want to display Commit status or commit and PRs also
* Consolidate Reports: If you are using a matrix build to parallelize your tests, turning this on will combine them to calculate test and coverage results
* Low Coverage Threshold: If you want to mark your Project unstable if it has low code coverage or send notifications
* Encrypt/Decrypt: If you would like to use Shippable internal keys to encrypt strings that you want to use in your jobs
* Project Clone URL: Used to create a custom URL to clone a project. This can be used to clone any repository that authenticates git based login

**Section 3**
<img src="/images/platform/visibility/project-settings-3.jpg" alt="Project Settings for Shippable DevOps Assembly Lines" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

* Sync: Synchronize your project with source control system. Usually used to fetch new branches
* Timeout: Minutes before you want to timeout your CI run. Max 60 minutes for your free account or 120 for paid
* Reset Project: This will reset all the keys, passwords that Shippable internally creates. If you are using this externally, you will need to update those systems to. You will very rarely need to do this
* Delete: This will permanently delete all the history, webhooks etc. This is a non-reversible action

# Further Reading
* Working with Resources
* Working with Integrations
* Jobs