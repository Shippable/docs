page_main_title: runSH
main_section: Platform
sub_section: Jobs
page_title: Unified Pipeline Jobs - runSh
page_description: List of supported jobs
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc


# runSh
This job type lets you run any custom scripts as part of your deployment pipeline. Depending on what you want to achieve in your script(s), you can specify input and output resources. You can also send notifications for specific events, like job start, success, or failure.

This is the most powerful job type since it is not a *managed* job; i.e. you write the scripts yourself so you have unlimited flexibility. You should use this job type if there is no managed job that provides the functionality you need. For example, pushing to Heroku is not yet natively supported through a managed job type, so you can write the scripts needed to do this and add it to your pipeline as a job of type `runSh`.

We are actively adding managed job types to reduce the need to use `runSh`. If you have a scenario that is not handled by our managed jobs, [open a support request](https://github.com/Shippable/support/issues/) and we'll look into adding a managed job for it.

## Anatomy of a runSh job

The following sample shows the overall structure of a runSh job:

```
jobs:
  - name: <name>                                #required
    type: runSh                                 #required
    on_start:                                   #optional
      - script: echo 'This block executes when the TASK starts'
      - NOTIFY: slackNotification
    steps:                                      #required
      - IN: <resource>
      - IN: <resource>
      - TASK:
        - script: <command>
        - script: <command>
      - OUT: <resource>
      - OUT: <resource>
        replicate: <resource>
    on_success:                                 #optional
      - script: echo 'This block executes after the TASK section executes successfully'
      - NOTIFY: slackNotification
    on_failure:                                 #optional
      - script: echo 'This block executes if the TASK section fails'
      - NOTIFY: slackNotification
    on_cancel:                                  #optional
      - NOTIFY: slackNotification
    always:                                     #optional
      - script: echo 'This block executes if the TASK section succeeds or fails'
      - NOTIFY: slackNotification


```

* `name` should be set to something that describes what the job does and is easy to remember. This will be the display name of the job in your pipeline visualization.
* `type` indicates type of job. In this case it is always `runSh`
* `on_start` can be used to send a notification indicating the job has started running.
* `steps` section is where the steps of your custom job should be entered. You can have any number of `IN` and `OUT` resources depending on what your job needs. You can also have one `TASK` section where you can enter one or more of your custom scripts. Keep in mind that everything under the `steps` section executes sequentially.
    * `replicate`: Adding [replicate](jobs-unmanaged#replicating-an-input) to an `OUT` resource will copy an `IN` resource for the new version of the `OUT` resource.
* `on_success` can be used to run scripts that only execute if the `TASK` section executes successfully. You can also use this to send a notification as shown in the example above. The `NOTIFY` tag is set to a [Slack notification resource](/platform/resource-notification/).
* `on_failure` can be used to run scripts that only execute if the `TASK` section fails. You can also use this to send a notification as shown in the example above. The `NOTIFY` tag is set to a [Slack notification resource](/platform/resource-notification/).
* `on_cancel` can be used to send notifications as shown in the example above. The `NOTIFY` tag is set to a [Slack notification resource](/platform/resource-notification/).
* `always` can be used to run scripts that only execute if the `TASK` section succeeds or fails. You can also use this to send a notification as shown in the example above. The `NOTIFY` tag is set to a [Slack notification resource](/platform/resource-notification/).

##Environment variables

In order to make it easier to write your scripts and work with `IN` and `OUT` resources, we have made several environment variables available for use within your `TASK` section of your `runSh` job.

A complete list of these variables is available in the [Environment variables for unmanaged jobs docs](/platform/jobs-unmanaged/), along with simple tutorials showing how you can work with `IN` and `OUT` resources in your scripts.  

## Status notifications for Pull Requests

If you have a [`gitRepo`](/platform/resource-gitrepo/) as IN to your `runSh` job, you can see the job status for Pull Requests to your git repository .

You can turn this ON or OFF using the `showBuildStatus` tag in the `gitRepo` resource.

The sample `runSh` Job and the corresponding `gitRepo` resource will look like

```
jobs:
  - name: <name>                                
    type: runSh                                 
    steps:                                      
      - IN: <gitRepoResource>                   
        showBuildStatus: true                   #set to true if you want job status to be shown in your SCM UI
      - TASK:
        - script: <command>
        - script: <command>

```

The corresponding `gitRepo` resource in `shippable.resources.yml` needs to include the tag `buildOnPullRequest: true` as shown below:

```
resources:
  - name: <name>                                
    type: gitRepo                              
    integration: mySourceControlProvider              
    pointer:
      sourceName: <repoName>                   
      branch: <branchName>                     
      buildOnPullRequest: true             #specify true to trigger the job for pull requests to the git repository

```

* If a pull request is created for `branchName`, a job status message will be shown in the UI of the repository in your source control system.

For example, the following messages are shown in the GitHub UI:

* Job is processing
<img src="/images/platform/jobs/runSh/processingBuildStatus.png" alt="Build Status Processing" style="width:800px;vertical-align: middle;display: block;margin-right: auto;"/>

* Job was successful
<img src="/images/platform/jobs/runSh/successBuildStatus.png" alt="Build Status Success" style="width:800px;vertical-align: middle;display: block;margin-right: auto;"/>

* Job was canceled or failed
<img src="/images/platform/jobs/runSh/failedBuildStatus.png" alt="Build Status Failed" style="width:800px;vertical-align: middle;display: block;margin-right: auto;"/>
