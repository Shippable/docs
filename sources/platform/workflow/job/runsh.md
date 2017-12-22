page_main_title: runSh
main_section: Platform
sub_section: Workflow
sub_sub_section: Jobs
page_title: Unified Pipeline Jobs - runSh
page_description: List of supported jobs
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# runSh
`runSh` is a job that lets you run any `shell` script as part of your DevOps Assembly Line. It is one of the most versatile jobs in the arsenal and can be used to pretty much execute any DevOps activity that can be scripted. With a combination of `IN`s like `params`, `integration`, `gitRepo`, etc., the vision of "Everything as Code" can be realized.

You should use this job type if you need the freedom that some of the pre-packaged jobs like [deploy](/platform/workflow/job/deploy) and [manifest](/platform/workflow/job/manifest) do not provide, or if they do not support the 3rd party end-point you want to integrate with. For example, pushing to Heroku is not yet natively supported through a managed job type, so you can write the scripts needed to do this and add it to your workflow as a job of type `runSh`.

You can also add [cliConfig](/platform/workflow/resource/cliconfig) resources as inputs to this job. The relevant CLI tools will be preconfigured for your scripts to use. For a complete list of supported cliConfig integrations see [here](/platform/workflow/resource/cliconfig#cliConfigTools).

A new version is created every time this job is executed.

You can create a `runSh` job by [adding](/platform/tutorial/workflow/crud-job#adding) it to `shippable.yml` and it executes on Shippable provided [Dynamic Nodes](/platform/runtime/overview#nodes) or [Custom Nodes](/platform/runtime/overview#nodes).

## YML Definition
```
jobs:
  - name:             <string>
    type:             runSh
    triggerMode:      <parallel/serial>
    dependencyMode:   <chrono/strict/immediate>   # optional
    allowPublicAccess: <true/false> # optional
    on_start:
      - NOTIFY:       <notification resource name>
    steps:
      - IN:           <resource>
        switch:       off
      - IN:           <job>
      - IN:           <resource>
        versionName:  <name of the version you want to pin>
      - IN:           <resource>
        versionNumber:    <number of the version you want to pin>        
      - IN:           <gitRepo resource>
        showBuildStatus:  true       
      - IN:           <cliConfig with scope support>
        scopes:
          - scope     <scope that you want configured>
      - TASK:
        - script:     <any shell command>
        - script:     <any shell command>
      - OUT:          <resource>
      - OUT:          <resource>
        replicate:    <IN resource>
      - OUT:          <resource>
        overwrite:    true
    on_success:
      - script:       echo "SUCCESS"
    on_failure:
      - script:       echo "FAILED"
      - NOTIFY:       <notification resource name>
    on_cancel:
      - script:       echo "CANCEL"
    always:
      - script:       pwd
```

A description of the job YML structure and the tags available is in the [jobs section of the anatomy of shippable.yml](/platform/tutorial/workflow/shippable-yml/#jobs) page.

* **`name`** -- Required, should be an easy to remember text string

* **`type`** -- Required, is set to `runSh`

* **`triggerMode`** -- Optional, can be `parallel` or `serial` and  defaults to `serial`.  When set to `serial`, if this job is triggered multiple times, the resulting builds will be processed one at a time.  When set to `parallel`, the builds can run at the same time, up to the number of minions available to the subscription.  Please note that this can result in unpredictable behavior with regard to the job's [state information](/platform/tutorial/workflow/sharing-data-between-jobs/)

* **`dependencyMode`** -- Optional. This may be set to `immediate`, `strict` or `chrono`. For detailed explanation, read about [job triggering mechanisms](/platform/workflow/overview#trigger-modes)

* **`allowPublicAccess`** -- Optional, defaults to false. When set to `true`, this job becomes visible to everyone. A good usecase for allowing public visibility if a runSh job has a `gitRepo` input which points to a public repository. If this job is building this repository or running tests on this repository and publishing commit/pr/release status on the public repository, then it would be beneficial to enable public access to the console of this job.

* **`on_start `** -- Optional, and both `script` and `NOTIFY` types can be used

* **`steps `** -- is an object which contains specific instructions to run this job
    * `IN` -- Optional, any resource or job can be used here, with as many `IN` resources and jobs as you need. The `switch`, `versionNumber`, `versionName` and `showBuildStatus` options are supported, too. However, `applyTo` is not supported.

    * `TASK` -- Required, at least one script line needs to be present
        * `- script:` -- a line of bash script to be executed
    * `OUT` -- Optional, any resource can be used here and as many as you need
        * `replicate` -- Optional, any `IN` resource of same type can be used
        * `overwrite` -- Optional, default is `false`

    * `showBuildStatus` -- Optional, defaults to false. If set to true, build status will be set on the gitRepo depending on how the gitRepo
    resource is configured. For example if `buildOnCommit:false` and `buildOnPullRequest:true`, then status will be updated
    on the gitRepo for pull requests only.

* **`on_success `** -- Optional, and both `script` and `NOTIFY` types can be used

* **`on_failure `** -- Optional, and both `script` and `NOTIFY` types can be used

* **`on_cancel `** -- Optional, and both `script` and `NOTIFY` types can be used

* **`always `** -- Optional, and both `script` and `NOTIFY` types can be used

## cliConfig special handling
If a resource of type [cliConfig](/platform/workflow/resource/cliconfig) is added an `IN` into `runSh`, then the corresponding CLI is automatically configured and prepared for you to execute CLI specific commands. The job uses the subscription integration specified in `cliConfig` to determine which CLI tools to configure. E.g., if you use a `cliConfig` that uses Docker based integration, then we will automatically log you into the hub based on the configuration. This removes the need for you to having to do this manually.

Here is a list of the tools configured for each integration type:

| Integration Type                    | Configured Tools|
| ------------------------------------|-------------|
| [AWS Keys](/platform/integration/aws-keys) | [AWS](/platform/runtime/machine-image/cli-versions/#aws) & [Elastic Beanstalk](platform/runtime/machine-image/cli-versions/#aws-elastic-beanstalk) |
| [AWS Keys with ECR scope](/platform/integration/aws-keys) | [Docker](/platform/runtime/machine-image/cli-versions/#docker) |
| [Azure](/platform/integration/azure) | [Azure](/platform/runtime/machine-image/cli-versions/#azure) |
| [Azure with AKS scope](/platform/integration/azure) | [Azure](/platform/runtime/machine-image/cli-versions/#azure) & [kubectl](/platform/runtime/machine-image/cli-versions/#kubectl) |
| [Docker Registry](/platform/integration/dockerRegistryLogin) | [Docker](/platform/runtime/machine-image/cli-versions/#docker) |
| [Google Cloud](/platform/integration/gcloudKey) | [Google Cloud](/platform/runtime/machine-image/cli-versions/#google-cloud-platform) & [Kubectl](/platform/runtime/machine-image/cli-versions/#kubectl) |
| [Google Cloud with GKE scope](/platform/integration/gcloudKey) | [Google Cloud](/platform/runtime/machine-image/cli-versions/#google-cloud-platform) & [Kubectl](/platform/runtime/machine-image/cli-versions/#kubectl) |
| [Google Cloud with GCR scope](/platform/integration/gcloudKey) | [Docker](/platform/runtime/machine-image/cli-versions/#docker) |
| [JFrog](/platform/integration/jfrog-artifactoryKey) | [JFrog](/platform/runtime/machine-image/cli-versions/#jfrog) |
| [Kubernetes](/platform/integration/kubernetes-config) | [Kubectl](/platform/runtime/machine-image/cli-versions/#kubectl) |
| [Quay](/platform/integration/quayLogin) | [Docker](/platform/runtime/machine-image/cli-versions/#docker) |
| For all Integrations above | [Packer](/platform/runtime/machine-image/cli-versions/#packer) & [Terraform](/platform/runtime/machine-image/cli-versions/#terraform)|

**Note**: Google Cloud with `gke` scope is used to set the cluster name and region. For all other google cloud integration type(with no scopes or when scope is `gcr`) the cluster name and region will be ignored.

## Default Environment Variables
In order to make it easier to write your scripts and work with `IN` and `OUT` resources, we have made several environment variables available for use within your `TASK` section of your `runSh` job. Visit the resource page for each type to get the list of environment variables that are set when a resource is included as an `IN` or `OUT`.

In addition, the job itself comes with its own default set of variables. This is the list for this job type:

| Environment variable            | Description                         |
| -------------                 |------------------------------------ |
| JOB_NAME                  | The name of the Job, given in the YML |
| JOB_TYPE                  | The type of the Job. In this case `runSh`|
| BUILD_ID                  | Internal Id of the current build thats executing|
| BUILD_NUMBER                | Sequentional number for the Job thats executing|
| BUILD_JOB_ID                  | Internal ID of the currently running Job |
| BUILD_JOB_NUMBER                | Sequential number of the Job |
| SUBSCRIPTION_ID               | Shippable ID that represents git organization uniquely |
| JOB_PATH                    | The path of the directory containing files critical for this job |
| JOB_STATE                   | The location of the `state` directory for this job|
| JOB_PREVIOUS_STATE            | The location of the directory containing the `state` information from when the job last ran. |
| JOB_TRIGGERED_BY_NAME  | The name of the resource that caused this job to execute. |

## Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Further Reading
* [jobs](/platform/workflow/job/overview)
* [resources](/platform/workflow/resource/overview)
