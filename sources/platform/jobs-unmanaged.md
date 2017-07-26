page_main_title: Unmanaged jobs
main_section: Platform
sub_section: Workflow
sub_sub_section: Jobs
page_title: Unified Pipeline Jobs
page_description: List of supported jobs
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# Unmanaged jobs

Unmanaged jobs are available to provide you complete flexibility to do pretty much anything you need by configuring the job with custom shell scripts. These jobs can take any supported resource as an input and can output to any resource depending on your configuration.

- [runCI](jobs-runci/): This unmanaged job is used to connect Shippable CI to the rest of your pipeline.

- [runSh](jobs-runsh/): This is an unmanaged job that can be configured to do almost anything with custom shell scripts.

- [runCLI](job-runcli/): This unmanaged job is like runSh, but with the addition of automatically configured CLI tools.

## Environment variables

In order to make it easier to write your scripts and work with `IN` and `OUT` resources, we have made several environment variables available for use within your `TASK` section of `runSh` and `runCLI` jobs, as well as in the `shippable.yml` of your `runCI` job.

###Job variables
| Env variable        | Description           |
| ------------- |-------------|
| RESOURCE_ID    | The ID of the custom job. |
| JOB_NAME    | The name of the custom job. |
| JOB_TYPE    | The type of the custom job; can be `runSh`, `runCLI` or `runCI` |
| BUILD_ID    | The ID of the currently running build. |
| BUILD_NUMBER    | An alternate ID for the build. |
| BUILD_JOB_ID    | The ID of the currently running job. |
| BUILD_JOB_NUMBER    | The number of the currently running job, within the build. This is always `1`. |
| SUBSCRIPTION_ID    | ID of the Subscription. |
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

### IN and OUT resources

These variables are added to the environment for all `IN` and `OUT` resources for your custom job. **`IN` jobs are also considered to be "resources" in this case.**

In the table below, *RESOURCENAME* is the name of the `IN` or `OUT` resource/job, in uppercase, with any characters other than letters, numbers, and underscores removed.

| Environment variable        | Valid for | Description           |
| ------------- | ------------- | ------------- |
| *RESOURCENAME*_NAME    | All | The name of the resource. |
| *RESOURCENAME*_ID    | All | The ID of the resource. |
| *RESOURCENAME*_TYPE    | All | The type of the resource. For example: `image` or `manifest`. |
| *RESOURCENAME*_PATH    | All | The directory containing files for the resource. |
| *RESOURCENAME*_STATE    | Valid for | The directory containing saved files for the resource. If the resource is a `gitRepo`, this is the directory containing the cloned repository. If it's a `params` resource, this path will be the location of a file with the parameters. Jobs will have the files saved when the job ran in this directory. |
| *RESOURCENAME*_META    | Valid for | The directory with files containing information about the resource, such as the version in use and the integration if there is one.  |
| *RESOURCENAME*_OPERATION    | Valid for | The operation of the resource; either `IN` or `OUT`. |
| *RESOURCENAME*_VERSIONNAME    | Valid for | For `image` resources, this is the tag. For `version` resources and `release` jobs, this is the semantic version. Not used for other resource types. |
| *RESOURCENAME*_VERSIONNUMBER    | Valid for | The number of the version of the resource being used. |
| *RESOURCENAME*_VERSIONID    | Valid for | The ID of the version of the resource being used. |
| *RESOURCENAME*_SOURCENAME    | Valid for | For resources with pointer sections in the yml, this is the sourceName defined in the pointer. |
| *RESOURCENAME*\_SEED\_VERSIONNAME    | Valid for | If a resource has a seed section in the yml, this is the versionName defined in the seed. |
| *RESOURCENAME*\_PARAMS\_*FIELDNAME*    | Valid for | Only added for `param`-type resources. Each field defined in that resource's `params` section in the yml is added as an environment variable. The field name is sanitized in the same way as the resource name. Objects and arrays are stringified JSON. Secure variables are decrypted. |
| *RESOURCENAME*\_POINTER\_*FIELDNAME*    | Valid for | Each field defined in the resource's `pointer` section in the yml is added as an environment variable. The field name is sanitized in the same way as the resource name.  If the value of the field is an object, an environment variable is added for each of the keys of that object. The `FIELDNAME` for these new variables is the name of the object followed by an underscore and the key for the particular value.  Variables are similarly added for arrays, with the index number in the place of the key.  For example, if a `pointer` section in the resource `myRepo` contains a `branches: only` section with `master`, `MYREPO_POINTER_BRANCHES_ONLY_0` is `master`. |
| *RESOURCENAME*\_SEED\_*FIELDNAME*    | Valid for | Every field defined in the resource's `seed` section in the yml is added as an environment variable. The field name is sanitized in the same way as the resource name. If the value of the field is an object, an environment variable is added for each of the keys of that object. The `FIELDNAME` for these new variables is the name of the object followed by an underscore and the key for the particular value.  Variables are similarly added for arrays, with the index number in the place of the key. |
| *RESOURCENAME*\_INTEGRATION\_*FIELDNAME*    | Valid for | Explained in the next section. |


### IN resources containing integrations

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


### IN gitRepo
If an `IN` resource is a [gitRepo](/platform/resource-gitrepo/), the following environment variables are added. The environment variables reflect the commit SHA information contained in the version of the `gitRepo` resource. In the following table, *RESOURCENAME* is the name of the `gitRepo` resource, in uppercase, with any characters other than letters, numbers, and underscores removed.

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


### IN integration resource
* If an `IN` resource is an [integration](/platform/resource-integration/), the following environment variables could be added, depending on the account integration type associated with the `integration` resource.  In the following table, *RESOURCENAME* is the name of the `integration` resource, in uppercase, with any characters other than letters, numbers, and underscores removed.

| Environment variable        | Account integration type | Description                                |
|-----------------------------|--------------------------|--------------------------------------------|
| *RESOURCENAME*_KEYPATH      | ssh-key or pem-key       | points directly to the private key file. |

### IN Key value pair

* If an `IN` resource is an integration of type [Key-Value pair](/platform/int-key-value.md), the key-values are exported as it is without adding `RESOURCENAME_INTEGRATION_` in the key name.

<a name="advancedRunSh"></a>


##Advanced configuration for runSH and runCLI

Since `runSh` and `runCLI` are custom jobs, you need to include scripts for managing state and working with `IN` and `OUT` resources in your scripts.

Here is how you can configure common scenarios:

* [Persisting state between runs](#persist-state)
* [Updating versions for an output resource](#update-output-resource)
* [Adding custom information to OUT resources](#adding-custom-info)
* [Extrating information from an IN resource](#extract-resource-info)

<a name="persist-state"></a>
###Persisting state between runs

If you have a custom job in your deployment pipeline on Shippable you might have situations where you want to persist something from one run to the next.

You can do this by moving whatever you want to persist to the `$JOB_STATE` folder in your custom scripts. The contents of the folder will be available in the `$JOB_PREVIOUS_STATE` folder during the subsequent run.

Let us see how to implement this scenario.

The custom job is defined in `shippable.jobs.yml` as shown below. The job just runs a script `doSomething.sh`:


```
jobs:

  - name: myCustomJob
    type: runSh
    steps:
      - TASK:
        - script: ./IN/mexec-repo/gitRepo/doSomething.sh
```

Let us assume a statefile **foo.txt** is created during the execution of the script and this needed for the subsequent run. You should save the statefile to the `$JOB_STATE` folder. Here is how you can do it:

```
save_statefile() {
  cp <path>/foo.txt $JOB_STATE
}
```

Now, during the subsequent run of your job, you can retrieve **foo.txt** from the `$JOB_PREVIOUS_STATE` folder:

```
get_previous_statefile() {
  local previous_statefile_location="$JOB_PREVIOUS_STATE/foo.txt"
  if [ -f "$previous_statefile_location" ]; then
    cp -vr previousState/foo.txt <to path>
  else
    echo "no previous statefile exists"
  fi
}
```

<a name="update-output-resource"></a>
###Updating versions for an OUT resource

Resource updates for `OUT` resources are automatically handled by managed jobs, but custom jobs need to update these resources as part of their custom scripts. Updating these `OUT` resources is essential to trigger subsequent portions of your deployment pipeline.

Updating the `versionName` for `OUT` resources will trigger a new version of the resource and any jobs that depend on the resource will be triggered.

Let us assume you have an unmanaged job `myCustomJob` that takes two input resources: a [gitRepo resource](/platform/resource-gitrepo/) `myRepo` and a Docker registry [integration resource](/platform/resource-integration/) `myIntegration`. It builds a Docker image `myImage` as part of the custom script `doSomething.sh` and wants to push the image to a Docker registry. The next job in the pipeline, `nextJob` depends on myImage, so every time myImage changes, the version needs to be updated. Visually, it looks like this:

<img src="/images/platform/jobs/runSh/runShUpdateResource.png" alt="Updating a custom job's resource" style="width:700px;"/>
<br>

Let us define the resources in `shippable.resources.yml`:

```
resources:
  #define gitRepo: myRepo

  #define docker registry integration: myIntegration

  #define image resource
  - name: myImage							#required
    type: image								#required
    integration: myIntegration				#required
    pointer:
      sourceName: "myRepo/myImage"			#required
    seed:
      versionName: 1.1						#required

```


The custom job will be defined in `shippable.jobs.yml` as shown below. myRepo and myIntegration are `IN` values and `myImage` is the `OUT` value:

```
jobs:
  - name: myCustomJob
    type: runSh
    steps:
      - IN: myRepo
      - IN: myIntegration
      - TASK:
        - script: ./IN/mexec-repo/gitRepo/doSomething.sh
      - OUT: myImage
```

In order to increment resource version for `myImage` and ensure that `nextJob` is triggered each time the image is updated, you will need to update the `versionName` of the image resource after building and pushing the image in doSomething.sh:


```
#build image command

#push image command

#update output image
createOutState() {
  echo versionName=$IMAGE_TAG > $JOB_STATE/myImage.env
  cat /build/state/myImage.env
}

```

When you update the `versionName`, Shippable creates a new version for this resource and this triggers the rest of your deployment pipeline.

**This method of updating versions works for all types of resources.**

<a name="adding-custom-info"></a>
###Adding custom information to OUT resources

While updating an `OUT` resource, you can also add custom information that will be available to the next job in the pipeline. For example, you can add key-value pairs to versions of an `OUT` resource. This helps you store any additional per-version information that is required for your custom scripts.

Let us assume you want to set an additional key `branch` for each version of your resource. You would need to use the following script:

```
#build image command

#push image command

#update output image
createOutState() {
  echo versionName=$IMAGE_TAG > $JOB_STATE/myImage.env
  echo branch=master >> $JOB_STATE/myImage.env
  cat $JOB_STATE/myImage.env
}

```

<a name="replicating-an-input"></a>
###Replicating an input to OUT resources

You might want to update a resource with a copy of another resource in your job.  For example, if you have two image resources and want to update the second with the same tag as the first at the end of your job.  To do this, you can use the `replicate` option.

Let us assume you want to copy the tag from myImage to myNewImage. This can be accomplished with the following `shippable.jobs.yml`:

```
jobs:
  - name: myCustomJob
    type: runSh
    steps:
      - IN: myImage
      - IN: myRepo
      - TASK:
        - script: ./IN/myRepo/gitRepo/doSomething.sh
      - OUT: myNewImage
        replicate: myImage
```

The `replicate` option will copy all of the version information from the input resource to the output resource and will work with all output resources in unmanaged jobs.  Additional information, such as a different tag or updated params, may also be added to this version in the same way as versions created without `replicate`.


<a name="extract-resource-info"></a>
###Extract IN resource information

If you have a custom job in your deployment pipeline on Shippable which has an `IN` resource, your custom job is triggered each time that resource changes. You might need to extract some information from the resource in your custom job's scripts.

All fields of the input resource are available as environment variables in your script. So if you want to refer to the resource type for example, you can use `RESOURCENAME_TYPE` where RESOURCENAME is the name of your resource. Check out the [environment variables section](#environment-variables) for more details.
