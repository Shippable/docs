main_section: Reference
sub_section: Jobs

# runCLI job

runCLI jobs combine the unlimited flexibility of runSh jobs with the added
convenience of automatically configured environments and tools. In addition to
running custom scripts as described in runSh, you can also add
[cliConfig](resource-cliconfig.md) resources as inputs to this job. The relevant
CLI tools will be preconfigured for your scripts to use. runCLI jobs also give
you access to the `shippable_replace` tool to help with replacing placeholders
in files with values from the environment.

## Basic example

````
jobs:
  - name: myRunCLIJob
    type: runCLI
    steps:
      - IN: awsCLIConfig
      - TASK:
        - script: aws s3 ls
    on_start:
````

The snippet above shows a basic example with required tags for configuring a runCLI job.

- [name](job-runcli.md#name): The name of your job. Set it to something that
describes what the job does and is easy to remember. This will be the display
name of the job in your pipeline visualization.

- [type](job-runcli.md#type): The type of your job. This must be `runCLI`.

- [steps](job-runcli.md#steps): The steps that should be executed in your job.
Steps can have any number of `IN` and `OUT` resources. `IN` resources that are
[cliConfig](resource-cliconfig.md) will configure the appropriate CLI tools
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
    on_success:                                 #optional
      - script: echo 'This block executes after the TASK section executes successfully'
      - NOTIFY: slackNotification
    on_failure:                                 #optional
      - script: echo 'This block executes if the TASK section fails'
      - NOTIFY: slackNotification
    always:                                     #optional
      - script: echo 'This block executes if the TASK section succeeds or fails'
      - NOTIFY: slackNotification
````

In addition to the required parameters described in the **Basic reference** section above, you can also
configure your runCLI job with the parameters described below:

  - [on_start](job-runcli.md#on_start): Specify `script` or `NOTIFY` sections
that are executed when the job starts.

  - [on_success](job-runcli.md#on_success): Specify `script` or `NOTIFY`
sections that executed only if the `TASK` section succeeds.

  - [on_failure](job-runcli.md#on_success): Specify `script` or `NOTIFY`
sections that executed only if the `TASK` section fails.

  - [always](job-runcli.md#always): Specify `script` or `NOTIFY` sections that
are always executed at the end of the job, regardless of whether the `TASK`
section failed or succeeded.

## Configured CLI tools

The runCLI job uses the subscription integration specified in the
[cliConfig](resource-cliconfig.md) to determine which CLI tools to configure.
These tools are configured with the credentials contained in the subscription
integration. Here is a list of the tools configured for each integration type:

| Integration Type                    | Configured Tools           |
| ------------------------------------|-------------|
| AWS                                 | [AWS CLI](https://aws.amazon.com/cli/); [EB (Elastic Beanstalk) CLI](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3.html) |
| Amazon EC2 Container Registry (ECR) | [Docker Engine](https://docs.docker.com/engine/reference/commandline/docker/) |
| Docker Hub                          | [Docker Engine](https://docs.docker.com/engine/reference/commandline/docker/) |
| Docker Trusted Registry             | [Docker Engine](https://docs.docker.com/engine/reference/commandline/docker/) |
| Google Container Engine             | [gcloud](https://cloud.google.com/sdk/gcloud/); [kubectl](https://kubernetes.io/docs/user-guide/kubectl/) |
| Google Container Registry (GCR)     | [Docker Engine](https://docs.docker.com/engine/reference/commandline/docker/) |
| JFrog Artifactory                   | [JFrog CLI](https://www.jfrog.com/confluence/display/CLI/CLI+for+JFrog+Artifactory) |
| Kubernetes                          | [kubectl](https://kubernetes.io/docs/user-guide/kubectl/) |
| Private Docker Registry             | [Docker Engine](https://docs.docker.com/engine/reference/commandline/docker/) |
| Quay.io                             | [Docker Engine](https://docs.docker.com/engine/reference/commandline/docker/) |


## Build Status Notifications
If you have a [gitRepo](resource-gitrepo/) as IN to a runCLI job and the gitRepo is configured to run for
Pull Requests, you can configure runCLI to show build status in the UI of your source control provider.

You can set `showBuildStatus` tag to true for the IN gitRepo resource to show PR status for that repository.

For example, the runCLI job will be configured in `shippable.jobs.yml` as shown below for this scenario:

```
jobs:
  - name: <name>                                #required
    type: runCLI                                #required
    steps:                                      #required
      - IN: myGitRepo                           #specify at least one gitRepo resource to receive the commit message.
        showBuildStatus: true                   #specify to display build status in the source control provider UI
      - TASK:
        - script: <command>
        - script: <command>

```

The corresponding gitRepo resource in `shippable.resources.yml` can be configured as shown below:

```
resources:
  - name: myGitRepo                             #required
    type: gitRepo                               #required
    integration: <integrationName>              #required
    pointer:
      sourceName: <repoName>                    #required
      branch: <branchName>                      #specify the branch name
      buildOnPullRequest: <boolean>             #specify true or false accordingly

```

* If the **runCLI** job is triggered as a result of the a Pull Request for the configured repo (`repoName`) and (`branchName`), the build status message be displayed in the UI of your source control provider.

* When the **runCLI** job is in the processing state the GitHub UI will look like
<img src="../../images/reference/jobs/runCLI/processingBuildStatus.png" alt="Build Status Processing" style="width:800px;vertical-align: middle;display: block;margin-right: auto;"/>

* When the **runCLI** job successfully completes, the GitHub UI will look like
<img src="../../images/reference/jobs/runCLI/successBuildStatus.png" alt="Build Status Success" style="width:800px;vertical-align: middle;display: block;margin-right: auto;"/>

* When the **runCLI** job is cancelled or failed the GitHub UI will look like
<img src="../../images/reference/jobs/runCLI/failedBuildStatus.png" alt="Build Status Failed" style="width:800px;vertical-align: middle;display: block;margin-right: auto;"/>

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
documentation](job-runsh.md) for the list of available environment
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

## Resource variables

Environment variables are automatically added for all `IN` and `OUT` resources defined
for the runCLI job. The environment variables are the same as those available
for [runSh](job-runSh/) jobs.


### runCLI environment variables
These variables are available for use in the TASK section(s) of every runCLI job.

| Env variable        | Description           |
| ------------- |-------------|
| RESOURCE_ID    | The ID of the runSh job. |
| JOB_NAME    | The name of the runSh job. |
| JOB_TYPE    | The type of the runSh job; this will always be `runSh`. |
| BUILD_ID    | The ID of the currently running build. |
| BUILD_NUMBER    | An alternate ID for the build. |
| BUILD_JOB_ID    | The ID of the currently running buildJob. |
| BUILD_JOB_NUMBER    | The number of the currently running buildJob, within the build. This is always `1`. |
| SUBSCRIPTION_ID    | ID of the subscription. |
| JOB_PATH    | The path of the directory containing files for the runSh job. This directory contains two subdirectories: `state` (contains the files that will be saved when the job is complete), and `previousState` (contains the files saved in the previous build). |
| JOB_STATE      | The location of the `state` directory for this job, which contains the files that will be saved when the job is complete. |
| JOB_PREVIOUS_STATE | The location of the directory containing the `state` information from when the job last ran. |
| JOB_MESSAGE    | The path of the file containing the message for this job. |
| *JOBNAME*_NAME    | The name of the job, as given in `shippable.jobs.yml`. For a runSh job named `myRunShJob`, the variable name would be `MYRUNSHJOB_NAME` and the value would be `myRunShJob`.|
| *JOBNAME*_TYPE    | The same as `JOB_TYPE`. For a runSh job named `myRunShJob`, the variable name would be `MYRUNSHJOB_TYPE` and the value would be `runSh`. |
| *JOBNAME*_PATH    | The same directory as `JOB_PATH`. For a runSh job named `myRunShJob`, the variable name would be `MYRUNSHJOB_PATH`. This directory contains two subdirectories: `state` (contains the files that will be saved when the job is complete), and `previousState` (contains the files saved in the previous build). |
| *JOBNAME*_STATE    | The same as `JOB_STATE` with a different variable name. *JOBNAME* is the name of the job, converted to uppercase, with any characters that are not letters, numbers, or underscores removed. |
| *JOBNAME*_PREVIOUS_STATE |The same as `JOB_PREVIOUS_STATE` with a different variable name. *JOBNAME* is the name of the job, converted to uppercase, with any characters that are not letters, numbers, or underscores removed. |
| *JOBNAME*_MESSAGE  | The same as `JOB_MESSAGE` with a different variable name. *JOBNAME* is the name of the job, converted to uppercase, with any characters that are not letters, numbers, or underscores removed.  |

### Resource variables
These variables are added to the environment for all `IN` and `OUT` resources defined for the runSh job. In this case, jobs used as inputs to the runSh job are also considered to be "resources". *RESOURCENAME* is the name of the `IN` or `OUT` resource, in uppercase, with any characters other than letters, numbers, and underscores removed.

| Environment variable        | Description           |
| ------------- |-------------|
| *RESOURCENAME*_NAME    | The name of the resource. |
| *RESOURCENAME*_ID    | The ID of the resource. |
| *RESOURCENAME*_TYPE    | The type of the resource. For example: `image` or `manifest`. |
| *RESOURCENAME*_PATH    | The directory containing files for the resource. |
| *RESOURCENAME*_STATE    | The directory containing saved files for the resource. If the resource is a `gitRepo`, this is the directory containing the cloned repository. If it's a `params` resource, this path will be the location of a file with the parameters. Jobs will have the files saved when the job ran in this directory. |
| *RESOURCENAME*_META    | The directory with files containing information about the resource, such as the version in use and the integration if there is one.  |
| *RESOURCENAME*_OPERATION    | The operation of the resource; either `IN` or `OUT`. |
| *RESOURCENAME*_VERSIONNAME    | For `image` resources, this is the tag. For `version` resources and `release` jobs, this is the semantic version. Not used for other resource types. |
| *RESOURCENAME*_VERSIONNUMBER    | The number of the version of the resource being used. |
| *RESOURCENAME*_VERSIONID    | The ID of the version of the resource being used. |
| *RESOURCENAME*_SOURCENAME    | For resources with pointer sections in the yml, this is the sourceName defined in the pointer. |
| *RESOURCENAME*\_SEED\_VERSIONNAME    | If a resource has a seed section in the yml, this is the versionName defined in the seed. |
| *RESOURCENAME*\_PARAMS\_*FIELDNAME*    | Only added for `param`-type resources. Each field defined in that resource's `params` section in the yml is added as an environment variable. The field name is sanitized in the same way as the resource name. Objects and arrays are stringified JSON. Secure variables are decrypted. |
| *RESOURCENAME*\_POINTER\_*FIELDNAME*    | Each field defined in the resource's `pointer` section in the yml is added as an environment variable. The field name is sanitized in the same way as the resource name.  If the value of the field is an object, an environment variable is added for each of the keys of that object. The `FIELDNAME` for these new variables is the name of the object followed by an underscore and the key for the particular value.  Variables are similarly added for arrays, with the index number in the place of the key.  For example, if a `pointer` section in the resource `myRepo` contains a `branches: only` section with `master`, `MYREPO_POINTER_BRANCHES_ONLY_0` is `master`. |
| *RESOURCENAME*\_SEED\_*FIELDNAME*    | Every field defined in the resource's `seed` section in the yml is added as an environment variable. The field name is sanitized in the same way as the resource name. If the value of the field is an object, an environment variable is added for each of the keys of that object. The `FIELDNAME` for these new variables is the name of the object followed by an underscore and the key for the particular value.  Variables are similarly added for arrays, with the index number in the place of the key. |
| *RESOURCENAME*\_INTEGRATION\_*FIELDNAME*    | Explained in the next section. |


### Resource integration variables
When an `IN` resource uses a subscription integration, the fields associated with that integration are added as environment variables. In the following table, *RESOURCENAME* is the name of the `IN` resource, in uppercase, with any characters other than letters, numbers, and underscores removed. The available environment variables for each integration are as follows:

| Account Integration type                | Environment variables                          |
|-----------------------------------------|------------------------------------------------|
| Amazon ECR                              | *RESOURCENAME*_INTEGRATION_AWS_ACCESS_KEY_ID <br/> *RESOURCENAME*_INTEGRATION_AWS_SECRET_ACCESS_KEY |
| AWS                                     | *RESOURCENAME*_INTEGRATION_AWS_ACCESS_KEY_ID <br/> *RESOURCENAME*_INTEGRATION_AWS_SECRET_ACCESS_KEY <br/> *RESOURCENAME*_INTEGRATION_URL |
| Amazon Web Services (IAM)               | *RESOURCENAME*_INTEGRATION_ASSUMEROLEARN <br/> *RESOURCENAME*_INTEGRATION_OUTPUT <br/> *RESOURCENAME*_INTEGRATION_URL |
| Azure Container Service                 | *RESOURCENAME*_INTEGRATION_USERNAME <br/> *RESOURCENAME*_INTEGRATION_URL |
| Bitbucket                               | *RESOURCENAME*_INTEGRATION_URL <br/> *RESOURCENAME*_INTEGRATION_TOKEN |
| Bitbucket Server                        | *RESOURCENAME*_INTEGRATION_USERNAME <br/> *RESOURCENAME*_INTEGRATION_URL <br/> *RESOURCENAME*_INTEGRATION_TOKEN |
| Docker Hub                              | *RESOURCENAME*_INTEGRATION_USERNAME <br/> *RESOURCENAME*_INTEGRATION_PASSWORD <br/> *RESOURCENAME*_INTEGRATION_EMAIL |
| Docker Cloud                            | *RESOURCENAME*_INTEGRATION_USERNAME <br/> *RESOURCENAME*_INTEGRATION_URL <br/> *RESOURCENAME*_INTEGRATION_TOKEN |
| Docker Datacenter                       | *RESOURCENAME*_INTEGRATION_USERNAME <br/> *RESOURCENAME*_INTEGRATION_URL <br/> *RESOURCENAME*_INTEGRATION_PASSWORD |
| Docker Trusted Registry                 | *RESOURCENAME*_INTEGRATION_USERNAME <br/> *RESOURCENAME*_INTEGRATION_URL <br/> *RESOURCENAME*_INTEGRATION_PASSWORD <br/> *RESOURCENAME*_INTEGRATION_EMAIL|
| Email                                   | *RESOURCENAME*_INTEGRATION_EMAILADDRESS|
| Event Trigger                           | *RESOURCENAME*_INTEGRATION_PROJECT <br/> *RESOURCENAME*_INTEGRATION_WEBHOOKURL <br/> *RESOURCENAME*_INTEGRATION_AUTHORIZATION |
| GCR                                     | *RESOURCENAME*_INTEGRATION_JSON_KEY|
| GitHub                                  | *RESOURCENAME*_INTEGRATION_URL <br/> *RESOURCENAME*_INTEGRATION_TOKEN |
| GitHub Enterprise                       | *RESOURCENAME*_INTEGRATION_URL <br/> *RESOURCENAME*_INTEGRATION_TOKEN |
| Gitlab                                  | *RESOURCENAME*_INTEGRATION_URL <br/> *RESOURCENAME*_INTEGRATION_TOKEN |
| Google Container Engine                 | *RESOURCENAME*_INTEGRATION_JSON_KEY <br/> *RESOURCENAME*_INTEGRATION_URL |
| Hipchat                                 | *RESOURCENAME*_INTEGRATION_TOKEN |
| Jenkins                                 | *RESOURCENAME*_INTEGRATION_USERNAME <br/> *RESOURCENAME*_INTEGRATION_PASSWORD <br/> *RESOURCENAME*_INTEGRATION_URL |
| JFrog Artifactory                       | *RESOURCENAME*_INTEGRATION_USERNAME <br/> *RESOURCENAME*_INTEGRATION_PASSWORD <br/> *RESOURCENAME*_INTEGRATION_URL |
| Joyent Triton Public Cloud              | *RESOURCENAME*_INTEGRATION_USERNAME <br/> *RESOURCENAME*_INTEGRATION_URL <br/> *RESOURCENAME*_INTEGRATION_VALIDITYPERIOD <br/> *RESOURCENAME*_INTEGRATION_PUBLICKEY <br/> *RESOURCENAME*_INTEGRATION_PRIVATEKEY| <br/> *RESOURCENAME*_INTEGRATION_CERTIFICATES |
| Kubernetes                              | *RESOURCENAME*_INTEGRATION_CLUSTERACCESSTYPE <br/> *RESOURCENAME*_INTEGRATION_MASTERKUBECONFIGCONTENT <br/> *RESOURCENAME*_INTEGRATION_BASTIONKUBECONFIGTYPE <br/> *RESOURCENAME*_INTEGRATION_BASTIONKUBECONFIGCONTENT <br/> *RESOURCENAME*_INTEGRATION_BASTIONHOSTIP <br/> *RESOURCENAME*_INTEGRATION_BASTIONPRIVATEKEY <br/> *RESOURCENAME*_INTEGRATION_BASTIONPUBLICKEY |
| Node Cluster                            | *RESOURCENAME*_INTEGRATION_NODES <br/> *RESOURCENAME*_INTEGRATION_PUBLICKEY <br/> *RESOURCENAME*_INTEGRATION_PRIVATEKEY|
| PEM key                                 | *RESOURCENAME*_INTEGRATION_KEY |
| Private Docker registry                 | *RESOURCENAME*_INTEGRATION_USERNAME <br/> *RESOURCENAME*_INTEGRATION_URL <br/> *RESOURCENAME*_INTEGRATION_PASSWORD <br/> *RESOURCENAME*_INTEGRATION_EMAIL |               |
| Quay.io                                 | *RESOURCENAME*_INTEGRATION_USERNAME <br/> *RESOURCENAME*_INTEGRATION_URL <br/> *RESOURCENAME*_INTEGRATION_PASSWORD <br/> *RESOURCENAME*_INTEGRATION_EMAIL <br/> *RESOURCENAME*_INTEGRATION_ACCESSTOKEN |
| Slack                                   | *RESOURCENAME*_INTEGRATION_WEBHOOKURL |
| SSH key                                 | *RESOURCENAME*_INTEGRATION_PUBLICKEY <br/> *RESOURCENAME*_INTEGRATION_PRIVATEKEY |


### gitRepo resource variables
If an `IN` resource is a [gitRepo](resource-gitRepo/), the following environment variables are added. The environment variables reflect the commit SHA information contained in the version of the `gitRepo` resource. In the following table, *RESOURCENAME* is the name of the `gitRepo` resource, in uppercase, with any characters other than letters, numbers, and underscores removed.

| Environment variable             | Description                                                |
|----------------------------------|------------------------------------------------------------|
| *RESOURCENAME*_BASE_BRANCH       | If the version was created for a pull request, this is the name of the base branch into which the pull request changes will be merged. |
| *RESOURCENAME*_BRANCH            | When the version was created for a commit, this is the name of branch on which the commit occurred. If it was created for a pull request, this is the base branch. |
| *RESOURCENAME*_COMMIT            | SHA of the most recent commit. |
| *RESOURCENAME*_COMMIT_MESSAGE    | Commit message for the most recent commit. |
| *RESOURCENAME*_COMMITTER         | Name of the last committer. |
| *RESOURCENAME*_GIT_TAG_NAME      | For git tags, the name of the tag. This env variable is currently supported for GitHub only. |
| *RESOURCENAME*_HEAD_BRANCH       | This is only set for pull requests and is the name of the branch the pull request was opened from. |
| *RESOURCENAME*_HTTPS_URL       | The HTTPS URL for the Git repository. |
| *RESOURCENAME*_IS_GIT_TAG        | Set to true if the version was created for a git tag. If not, this will be set to false. This env variable is currently supported for GitHub only. |
| *RESOURCENAME*_IS_RELEASE        | Set to true if the version was created for a release. If not, this will be set to false. This env variable is currently supported for GitHub only. |
| *RESOURCENAME*_KEYPATH           | Path to the ssh keyfile associated with the gitRepo. This is the key that is used to clone the repo |
| *RESOURCENAME*_PULL_REQUEST      | Pull request number if the version was created for a pull request. If not, this will be set to false. |
| *RESOURCENAME*_RELEASE_NAME      | If the version was created for a release, this is the release title. This env variable is currently supported for GitHub only. |
| *RESOURCENAME*_RELEASED_AT       | This is only set for releases, and is the timestamp when the release was published. This env variable is currently supported for GitHub only. |
| *RESOURCENAME*_SSH_URL      | The SSH URL for the Git repository. |


### integration resource variables
* If an `IN` resource is an [integration](resource-integration/), the following environment variables could be added, depending on the account integration type associated with the `integration` resource.  In the following table, *RESOURCENAME* is the name of the `integration` resource, in uppercase, with any characters other than letters, numbers, and underscores removed.

| Environment variable        | Account integration type | Description                                |
|-----------------------------|--------------------------|--------------------------------------------|
| *RESOURCENAME*_KEYPATH      | ssh-key or pem-key       | points directly to the private key file. |


* If an `IN` resource is an integration of type [Key-Value pair](int-key-value/), the key-values are exported as it is without adding `RESOURCENAME_INTEGRATION_` in the key name.
