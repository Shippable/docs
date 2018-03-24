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

You can create a `runSh` job by [adding](/platform/tutorial/workflow/crud-job#adding) it to `shippable.yml` and it executes on Shippable provided [On-demand Nodes](/platform/runtime/overview#nodes) or [BYON Nodes](/platform/runtime/overview#nodes). `runSh` examples can be found [here](/platform/tutorial/workflow/using-runSh).

## YML Definition
```
jobs:
  - name:             <string>
    type:             runSh
    triggerMode:      <parallel/serial>
    dependencyMode:   <chrono/strict/immediate>   # optional
    priority:         <10>                        # optional
    allowPublicAccess: <true/false> # optional
    runtime:                        # optional
      nodePool: <node pool name>
      container: <true/false>     # optional
      timeoutMinutes: 30              # optional
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
          name: <task name>
          script:
            - <any shell command>
            - <any shell command>
      - TASK:
          name: <task name>
          runtime:                  # optional
            options:
              imageName: <name of the image to boot>
              imageTag: <tag of the image to boot>
              pull: <true/false>    # optional
              options: <docker options arguments> # optional
              env:                  # optional
                - <env key>:<env value>
                - <env key>:<env value>
          script:
            - <any shell command>
            - <any shell command>
      - TASK:
          name: <task name>
          runtime:                  # optional
            container: <true/false>
            options:
              env:                  # optional
                - <env key>:<env value>
                - <env key>:<env value>
          script:
            - <any shell command>
            - <any shell command>
      - OUT:          <resource>
      - OUT:          <resource>
        replicate:    <IN resource>
      - OUT:          <resource>
        overwrite:    true
    on_success:
      script:
        - echo "SUCCESS"
        - <any shell command>
      NOTIFY:       <notification resource name>
    on_failure:
      script:
        - echo "FAILED"
        - <any shell command>
      NOTIFY:       <notification resource name>
    always:
      script:
        - pwd
        - <any shell command>
    on_cancel:
      - script:       echo "CANCEL"
```

A description of the job YML structure and the tags available is in the [jobs section of the anatomy of shippable.yml](/platform/tutorial/workflow/shippable-yml/#jobs) page.

* **`name`** -- Required, should be an easy to remember text string.

* **`type`** -- Required, is set to `runSh`.

* **`triggerMode`** -- Optional, can be `parallel` or `serial` and  defaults to `serial`.  When set to `serial`, if this job is triggered multiple times, the resulting builds will be processed one at a time.  When set to `parallel`, the builds can run at the same time, up to the number of minions available to the subscription.  Please note that this can result in unpredictable behavior with regard to the job's [state information](/platform/tutorial/workflow/sharing-data-between-jobs/).

* **`dependencyMode`** -- Optional. This may be set to `immediate`, `strict` or `chrono`. For detailed explanation, read about [job triggering mechanisms](/platform/workflow/overview#trigger-modes).

* **`priority`** -- Optional. This may be set to any value from 0 to 10000 inclusive, with 0 being the highest priority and 10000 being the lowest priority. Jobs with higher priority will be queued before the jobs with lower priority. Default priority for all the jobs is 9999.

* **`allowPublicAccess`** -- Optional, defaults to false. When set to `true`, this job becomes visible to everyone. A good usecase for allowing public visibility if a runSh job has a `gitRepo` input which points to a public repository. If this job is building this repository or running tests on this repository and publishing commit/pr/release status on the public repository, then it would be beneficial to enable public access to the console of this job.

* **`runtime`** -- Optional. This is an object which can be used to configure
  the behavior of the job.
    * `nodePool` --  The node pool on which the job should run. For detailed
      explanation, read about [node pools](/platform/management/subscription/node-pools/).
    * `timeoutMinutes` -- Optional. This sets the maximum time(in minutes) after which you want your runSh job to timeout. If this is not provided then timeout set at [Node Pool](/platform/management/subscription/node-pools/) level, [Subscription](/platform/management/subscription/settings/) level or default will be used, in that order. Default value for timeout is 60 minutes for free users and 120 minutes for paid users.
    * `container` -- Optional. Boolean field to decide whether the job should
      run inside a container or on the host. `true` by default
  after which the job will be automatically stopped.

* **`on_start `** -- Optional, and both `script` and `NOTIFY` types can be used

* **`steps `** -- is an object which contains specific instructions to run this job
    * `IN` -- Optional, any resource or job can be used here, with as many `IN` resources and jobs as you need. The `switch`, `versionNumber`, `versionName` and `showBuildStatus` options are supported, too. However, `applyTo` is not supported.

    * `TASK` -- Required, at least one script line needs to be present
        * `script` -- should contain one or more lines of bash script to be
          executed.
        * `runtime` -- task level runtime options.
            * `container` -- Optional and defaults to true. If false, the task will be run directly on the host machine.
            * `options` -- Required.
                * `imageName` -- Only applicable when job is running inside
                  a container. This defines the image to be used to run the job.
                * `imageTag` -- Only applicable when job is running inside
                  a container. This defines the image tag to apply to `image_name`
                  to run the job.
                * `pull` -- Only applicable when job is running inside a container. Setting this to `true` will force pull the job image on each run.
                * `options` -- Only applicable when job is running inside
                  a container. This can be used to set docker options for
                  container like `--hostname`, `--cpus` etc.
                * `env` -- if the job is running in a container, this will to set environment variables for that container. If the job is running on the host, this will set environment variables in the shell before executing the job.
    * `OUT` -- Optional, any resource can be used here and as many as you need
        * `replicate` -- Optional, any `IN` resource of same type can be used.
        * `overwrite` -- Optional, default is `false`.

    * `showBuildStatus` -- Optional, defaults to false. If set to true, build status will be set on the gitRepo depending on how the gitRepo
    resource is configured. For example if `buildOnCommit:false` and `buildOnPullRequest:true`, then status will be updated
    on the gitRepo for pull requests only.

* **`on_success `** -- Optional, and both `script` and `NOTIFY` types can be used.

* **`on_failure `** -- Optional, and both `script` and `NOTIFY` types can be used.

* **`on_cancel `** -- Optional, and both `script` and `NOTIFY` types can be used.

* **`always `** -- Optional, and both `script` and `NOTIFY` types can be used.

## cliConfig special handling
If a resource of type [cliConfig](/platform/workflow/resource/cliconfig) is added an `IN` into `runSh`, then the corresponding CLI is automatically configured and prepared for you to execute CLI specific commands. The job uses the subscription integration specified in `cliConfig` to determine which CLI tools to configure. E.g., if you use a `cliConfig` that uses Docker based integration, then we will automatically log you into the hub based on the configuration. This removes the need for you to having to do this manually.

Here is a list of the tools configured for each integration type:

| Integration Type                    | Configured Tools|
| ------------------------------------|-------------|
| [AWS Keys](/platform/integration/aws-keys) | [AWS](/platform/runtime/machine-image/cli-versions/#aws) & [Elastic Beanstalk](/platform/runtime/machine-image/cli-versions/#aws-elastic-beanstalk) |
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
| SHARED_DIR | Location of the directory that will be shared across all TASK's of
a job |

## Shippable Utility Functions
To make it easy to use these environment variables, the platform provides a command line utility that can be used to work with these values.

How to use these utility functions is [documented here](/platform/tutorial/workflow/using-shipctl).

## Shippable script section gotchas
- `script: exit 1` in `on_success`/`always` section of a build where the `TASK` section has succeeded, will fail the build
```
jobs:
  - name: <string>
    type: runSh
    steps:
    - TASK:
        script: ls
    on_success:
    - script: exit 1
```
The above yml will fail the build.

- Resetting ERR trap in a multi-line `script` section in TASK will result in the error from an incorrect command, if any, getting ignored.
```
jobs:
  - name: <string>
    type: runSh
    steps:
    - TASK:
        script: |
            echo foo
            trap "" ERR
            sl
            echo bar
```
will output
```
foo
sl: command not found
bar
```
The TASK section in the above snippet will be considered as a success/failure, based on the exit code of the last command.

- Resetting EXIT trap in a multi-line `script` section in TASK and running `exit 0` will result in build failure.
```
jobs:
  - name: <string>
    type: runSh
    steps:
    - TASK:
        script: |
            trap "" EXIT
            exit 0
```
will result in the build getting failed.

## Further Reading
* [runSh tutorial with many examples](/platform/tutorial/workflow/using-runSh)
* [jobs](/platform/workflow/job/overview)
* [resources](/platform/workflow/resource/overview)
