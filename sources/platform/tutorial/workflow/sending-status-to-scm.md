page_main_title: Sending pull request status to source control
main_section: Platform
sub_section: Tutorials
sub_sub_section: Workflow


# Sending pull request status to source control

Most source control providers have the ability to show you build results from an external CI provider like Shippable with your source control UI. We provide pull request status for the following types of jobs:

* CI jobs (i.e runCI), [which automatically post PR status](/ci/pull-request-builds/), and,
* `runSh` jobs which are triggered by a `gitRepo` resource, where you have to specify if you want the status to be sent to source control

This tutorial shows you how to configure a `runSh` job to send Pull Request status to source control.

## Instructions

If you have a [`gitRepo`](/platform/workflow/resource/gitrepo/) as an `IN` to your `runSh` job, you can see the job status for pull requests to your git repository.

* Update your `gitRepo` resource in **shippable.yml** to include the tag `buildOnPullRequest: true`:

```
resources:
  - name: myGitRepo                             
    type: gitRepo                               
    integration: <integrationName>             
    pointer:
      sourceName: <repoName>                    
      branch: <branchName>                      
      buildOnPullRequest: true     #specify true to trigger the job for pull requests to the git repository

```

* Update your `runSh` job with the `showBuildStatus: true` tag:

```
jobs:
  - name: <name>                                
    type: runSh                             
    steps:                                      
      - IN: myGitRepo            #                   
        showBuildStatus: true    #set to true if you want PR status to be shown in your SCM UI
      - TASK:
        - script: <command>
        - script: <command>

```

* Commit the changes above to **shippable.yml**. This will automatically update your existing workflow to include the status notifications. If this is a brand new workflow, you can add your config to Shippable by following [instructions here](/platform/tutorial/workflow/add-assembly-line).

* Next time your `runSh` job runs as a result of a pull request, you will see the status as follows:

    * When the **runSh** job is in the processing state the GitHub UI will look like
<img src="/images/platform/jobs/runCLI/processingBuildStatus.png" alt="Build Status Processing" style="width:800px;vertical-align: middle;display: block;margin-right: auto;"/>

    * When the **runSh** job successfully completes, the GitHub UI will look like
<img src="/images/platform/jobs/runCLI/successBuildStatus.png" alt="Build Status Success" style="width:800px;vertical-align: middle;display: block;margin-right: auto;"/>

    * When the **runSh** job is cancelled or failed the GitHub UI will look like
<img src="/images/platform/jobs/runCLI/failedBuildStatus.png" alt="Build Status Failed" style="width:800px;vertical-align: middle;display: block;margin-right: auto;"/>
