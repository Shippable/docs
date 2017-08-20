page_main_title: Working with Jobs
main_section: Platform
sub_section: Tutorials
sub_sub_section: Workflow
page_title: DevOps Assembly Line Jobs
page_description: How to add, delete and update jobs
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

## Status notifications for Pull Requests

If you have a [`gitRepo`](/platform/workflow/resource/gitrepo/) as IN to your `runCLI` job, you can see the job status for Pull Requests to your git repository .

You can turn this ON or OFF using the `showBuildStatus` tag in the `gitRepo` resource.

For example, the runCLI job will be configured in `shippable.jobs.yml` as shown below for this scenario:

```
jobs:
  - name: <name>                                
    type: runCLI                               
    steps:                                      
      - IN: myGitRepo                           
        showBuildStatus: true                   #set to true if you want job status to be shown in your SCM UI
      - TASK:
        - script: <command>
        - script: <command>

```

The corresponding  `gitRepo` resource in `shippable.resources.yml` needs to include the tag `buildOnPullRequest: true` as shown below:

```
resources:
  - name: myGitRepo                             
    type: gitRepo                               
    integration: <integrationName>             
    pointer:
      sourceName: <repoName>                    
      branch: <branchName>                      
      buildOnPullRequest: true              #specify true to trigger the job for pull requests to the git repository

```

* If the **runCLI** job is triggered as a result of the a Pull Request for the configured repo (`repoName`) and (`branchName`), the build status message be displayed in the UI of your source control provider.

* When the **runCLI** job is in the processing state the GitHub UI will look like
<img src="/images/platform/jobs/runCLI/processingBuildStatus.png" alt="Build Status Processing" style="width:800px;vertical-align: middle;display: block;margin-right: auto;"/>

* When the **runCLI** job successfully completes, the GitHub UI will look like
<img src="/images/platform/jobs/runCLI/successBuildStatus.png" alt="Build Status Success" style="width:800px;vertical-align: middle;display: block;margin-right: auto;"/>

* When the **runCLI** job is cancelled or failed the GitHub UI will look like
<img src="/images/platform/jobs/runCLI/failedBuildStatus.png" alt="Build Status Failed" style="width:800px;vertical-align: middle;display: block;margin-right: auto;"/>


## Further Reading
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
* [Integrations](/platform/integration/overview)
