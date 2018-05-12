page_main_title: runCLI
main_section: Platform
sub_section: Workflow
sub_sub_section: Jobs
page_title: Unified Pipeline Jobs - runCLI
page_description: List of supported jobs
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# runCLI

**The runCLI job is deprecated.**

All functionality available in the runCLI job is now available in the [runSh](/platform/workflow/job/runsh/#runsh) job, which is our recommended way to run custom workflows.
Your existing runCLI jobs will continue to work as configured since we are passionate about not breaking any of our customers. However, just changing the `type` setting in your yml from `runCLI` to `runSh` will work seamlessly, so you are encouraged to make this change.

[Shippable Server](http://docs.shippable.com/platform/tutorial/server/install/) customers who are running older versions of Server (versions 5.7.3 and below) will still need to use the runCLI job.

## Description

runCLI jobs combine the unlimited flexibility of runSh jobs with the added
convenience of automatically configured environments and tools. In addition to
running custom scripts as described in runSh, you can also add
[cliConfig](/platform/workflow/resource/cliconfig) resources as inputs to this job. The relevant
CLI tools will be preconfigured for your scripts to use. runCLI jobs also give
you access to the `shippable_replace` tool to help with replacing placeholders
in files with values from the environment.

## Basic example

````
jobs:
  - name: myRunCLIJob
    type: runCLI
    dependencyMode: <chrono/strict/immediate>   # optional
    steps:
      - IN: awsCLIConfig
      - TASK:
        - script: aws s3 ls
````

The snippet above shows a basic example with required tags for configuring a runCLI job.

- [name](runcli.md#name): The name of your job. Set it to something that
describes what the job does and is easy to remember. This will be the display
name of the job in your pipeline visualization.

- [type](runcli.md#type): The type of your job. This must be `runCLI`.

* **`dependencyMode`** -- Optional. This may be set to `immediate`, `strict` or `chrono`. For detailed explanation, read about [job triggering mechanisms](/platform/workflow/overview#trigger-modes)

- [steps](runcli.md#steps): The steps that should be executed in your job.
Steps can have any number of `IN` and `OUT` resources. `IN` resources that are
[cliConfig](/platform/workflow/resource/cliconfig) will configure the appropriate CLI tools
before your job starts running. You can have a single `TASK` property in your
steps to specify your script commands. Everything under the `steps` section
executes sequentially.

## Complete reference

````
jobs:
  - name: <name>                                
    type: runCLI                                
    on_start:                                   #optional
      - script: echo 'This block executes when the TASK starts'
      - NOTIFY: slackNotification
    steps:                                      
      - IN: <resource>                          
      - IN: <resource>                          #optional
      - TASK:                                   
        - script: <command>                     
        - script: <command>                     #optional
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
````

In addition to the required parameters described in the **Basic reference** section above, you can also
configure your runCLI job with the parameters described below:

  - [on_start](runcli.md#on_start): Specify `script` or `NOTIFY` sections
that are executed when the job starts.

  - [on_success](runcli.md#on_success): Specify `script` or `NOTIFY`
sections that are executed only if the `TASK` section succeeds.

  - [on_failure](runcli.md#on_failure): Specify `script` or `NOTIFY`
sections that are executed only if the `TASK` section fails.

  - [on_cancel](runcli.md#on_cancel): Specify `NOTIFY` sections to send
notifications if the job is canceled.  This cannot run scripts.

  - [always](runcli.md#always): Specify `script` or `NOTIFY` sections that
are always executed at the end of the job, regardless of whether the `TASK`
section failed or succeeded.  Scripts will not run if the job is canceled,
but notifications will be sent.

  - [replicate](runcli.md#replicate): Adding `replicate` to
an `OUT` resource will copy an `IN` resource for the new version of the `OUT`
resource.

## Configured CLI tools

The runCLI job uses the subscription integration specified in the
[cliConfig](/platform/workflow/resource/cliconfig) to determine which CLI tools to configure.
These tools are configured with the credentials contained in the subscription
integration. Here is a list of the tools configured for each integration type:

| Integration Type                    | Configured Tools           |
| ------------------------------------|-------------|
| AWS                                 | [AWS CLI](https://aws.amazon.com/cli/); [EB (Elastic Beanstalk) CLI](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3.html) |
| Amazon EC2 Container Registry (ECR) | [Docker Engine](https://docs.docker.com/engine/reference/commandline/cli/) |
| Docker Registry             | [Docker Engine](https://docs.docker.com/engine/reference/commandline/cli/) |
| Google Container Engine             | [gcloud](https://cloud.google.com/sdk/gcloud/); [kubectl](https://kubernetes.io/docs/user-guide/kubectl/) |
| Google Container Registry (GCR)     | [Docker Engine](https://docs.docker.com/engine/reference/commandline/cli/) |
| JFrog Artifactory                   | [JFrog CLI](https://www.jfrog.com/confluence/display/CLI/CLI+for+JFrog+Artifactory) |
| Kubernetes                          | [kubectl](https://kubernetes.io/docs/user-guide/kubectl/) |
| Quay.io                             | [Docker Engine](https://docs.docker.com/engine/reference/commandline/cli/) |


##Environment variables

In order to make it easier to write your scripts and work with `IN` and `OUT` resources, we have made several environment variables available for use within your `TASK` section of your `runCLI` job.

A complete list of these variables is available in the [Environment variables for unmanaged jobs docs](/platform/workflow/job/runsh/#default-environment-variables), along with simple tutorials showing how you can work with `IN` and `OUT` resources in your scripts.  

## Status notifications for Pull Requests

If you have a [`gitRepo`](/platform/workflow/resource/gitrepo/) as IN to your `runCLI` job, you can see the job status for Pull Requests to your git repository .

You can turn this ON or OFF using the `showBuildStatus` tag in the `gitRepo` resource.

For example, the runCLI job will be configured as shown below for this scenario:

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

The corresponding `gitRepo` resource needs to include the tag `buildOnPullRequest: true` as shown below:

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
<img src="../../images/platform/jobs/runCLI/processingBuildStatus.png" alt="Build Status Processing" style="width:800px;vertical-align: middle;display: block;margin-right: auto;"/>

* When the **runCLI** job successfully completes, the GitHub UI will look like
<img src="../../images/platform/jobs/runCLI/successBuildStatus.png" alt="Build Status Success" style="width:800px;vertical-align: middle;display: block;margin-right: auto;"/>

* When the **runCLI** job is cancelled or failed the GitHub UI will look like
<img src="../../images/platform/jobs/runCLI/failedBuildStatus.png" alt="Build Status Failed" style="width:800px;vertical-align: middle;display: block;margin-right: auto;"/>

## shippable_replace

When you create a `runCLI` job, the `shippable_replace` command-line tool is
automatically installed. `shippable_replace` looks for placeholders in one or
more files and replaces them with the values of the corresponding environment
variables.

`shippable_replace` is used as follows:

```
shippable_replace [paths to files]
```

The files passed to `shippable_replace` may contain one or more placeholders
for environment variables. Placeholders are strings of the form
`$ENVIRONMENT_VARIABLE_NAME` or `${ENVIRONMENT_VARIABLE_NAME}`. We recommend
`${ENVIRONMENT_VARIABLE_NAME}`, as it is less likely to cause errors if you have
an environment variable name that is a substring of another environment
variable's name.

For example, say you wanted to insert the current job name into two different
files: `file1.json` and `test/file2.txt`. The name of the environment variable
containing the job name is `JOB_NAME`. (See the [runSh
documentation](runsh.md) for the list of available environment
variables.)

`file1.json` might look like this:
```
{
  "foo": "bar",
  "jobName": "${JOB_NAME}"
}
```

`test/file2.txt` contains this:

```
This job, ${JOB_NAME}, is the coolest job ever.
```

`shippable_replace` is then added to the task section of the `runCLI` job:

```
jobs:
  - name: myRunCLIJob
    type: runCLI
    steps:
      - IN: <resource>
      - TASK:
        - script: shippable_replace file1.json test/file2.txt
```

After `shippable_replace`, `file1.json` now looks like this:

```
{
  "foo": "bar",
  "jobName": "myRunCLIJob",
  "fizz": "buzz"
}
```

And `test/file2.txt` looks like this:

```
This job, myRunCLIJob, is the coolest job ever.
```
