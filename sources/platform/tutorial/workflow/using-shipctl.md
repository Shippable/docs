page_main_title: Working with shipctl
main_section: Platform
sub_section: Tutorials
sub_sub_section: Workflow
page_title: shipctl - DevOps Assembly Line Jobs
page_description: How to use shipctl
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# shipctl reference

This is a command utility that is available in both [runSh](/platform/workflow/job/runsh) and [runCI](/platform/workflow/job/runci) jobs. This is used to perform common operations like getting the path of where state files are stored; getting the config value of the integration used in a Resource and so on. shipctl is also available in custom docker images used in both [runSh](/platform/workflow/job/runsh) and [runCI](/platform/workflow/job/runci) jobs.

## Machine images where shipctl is available

shipctl is available in CI and Assembly lines in machine image versions [v5.8.2](http://docs.shippable.com/platform/runtime/machine-image/ami-v582/) and up. If your subscription is using a version lower than v5.8.2, please switch to the latest version of the machine image. To change the machine image for your subscription, please follow the steps documented [here](http://docs.shippable.com/platform/runtime/machine-image/ami-overview/#changing-the-subscription-machine-image).

## State Mgmt

### copy_file_from_prev_state

**Description**

The `copy_file_from_prev_state` utility is used to retrieve a file stored in the state folder by the previous run of the same Job.

**Usage**

```
shipctl copy_file_from_prev_state <filename> <topath>
```

- `filename` is the name of the file you want to retrieve from state.
- `topath` is the path to which you want to copy the file

**Example**

```
shipctl copy_file_from_prev_state "config.json" .
```

This will copy `config.json` to the path where the utility function is called from.

### copy_file_from_resource_state

**Description**

Copies a file from the state of an `IN` resource to the specified path.

**Usage**

```
shipctl copy_file_from_resource_state <resource name> <filename> <topath>
```

- `resource name` is the friendly name of the `IN` resource
- `filename` is the name of the file you want to copy from the `IN` resource
- `topath` specifies where the file should be copied

**Example**

```
shipctl copy_file_from_resource_state "vpc_settings" "vpc.conf" .`
```

### copy_file_to_state

**Description**

Copies a file from the current path to the state folder, which makes it available to the subsequent run of the Job as well as any job(s) in your Assembly Line that has the current job as an `IN`.

**Usage**

```
shipctl copy_file_to_state <filename>
```

- `filename` is the name of the file you want to copy to the state folder.

**Example**

```
shipctl copy_file_to_state "/output/config.json
```

This will copy `config.json` to the state folder of the current Job.

### copy_file_to_resource_state

**Description**

Copies a file to the state of an `OUT` resource.

**Usage**

```
shipctl copy_file_to_resource_state <filename> <resource name>
```

- `filename` is the name of the file you want to copy to the state folder of the `OUT` resource
- `resource name` is the friendly name of the `OUT` resource


**Example**

```
shipctl copy_file_to_resource_state "vpc.conf" "vpc_settings"
```

### post_resource_state

**Description**

This posts the key-value to the state folder of the Resource. This action clears all state before adding the values specified. If you want to append a key-value pair to existing state, you should use `put_resource_state` utility.

**Usage**

```
shipctl post_resource_state <resource name> <key> <value>
```

- `resource name` is the resource in which you want to store the key-value information.
- `key` and `value` is the pair you want to store

**Example**

```
shipctl post_resource_state "vpc_settings" "HERO" "SUPERMAN"
```

### post_resource_state_multi

**Description**

This posts multiple key-value pairs to the state folder of the Resource. This action clears all state before adding the values specified. If you want to append some key-value pairs to existing state, you should use `put_resource_state_multi` utility.

**Usage**

```
shipctl post_resource_state_multi <resource name> "<key1>=<value1> <key2>=<value2>"
```

- `resource name` is the resource in which you want to store the key-value information.
- `key` and `value` is repeated multiple times, depending on the pairs you want to store

**Example**

```
shipctl post_resource_state_multi "vpc_settings" "HERO=SUPERMAN FOO=bar"
```

### put_resource_state

**Description**

This puts, i.e appends, the new key-value in the stage of the Resource. This utility will append to the state if it has already been created, else it will create a new one.

**Usage**

```
shipctl put_resource_state <resource name> <key> <value>
```

- `resource name` is the resource in which you want to store the key-value information.
- `key` and `value` is the pair you want to store

**Example**

```
shipctl put_resource_state "vpc_settings" "HERO" "BATMAN"
```

### put_resource_state_multi

**Description**

This puts, i.e appends, the new key-value pairs in the stage of the Resource. This utility will append to the state if it has already been created, else it will create a new one.

**Usage**

```
shipctl put_resource_state_multi <resource name> "<key>=<value> <key>=<value>"
```

- `resource name` is the resource in which you want to store the key-value information.
- `key` and `value` is repeated multiple times, depending on the pairs you want to store

**Example**

```
shipctl put_resource_state_multi "vpc_settings" "HERO=SUPERMAN FOO=bar"
```

### refresh_file_to_state

**Description**

This utility will look in the present working directory for the `<filename>` and if present, copy that to current Job state. If the file is not found, it will look in the state of the previous run of the Job and copy that to the current run's state. If the file doesn't exist there either, it will return an exit code of 0.

**Usage**

```
shipctl refresh_file_to_state <filename>
```

- `filename` is the fully qualified name of the file you want to copy to the state folder.

**Example**

```
shipctl refresh_file_to_state "config.json"
```

### replicate

**Description**

This command takes an `IN` resource and an `OUT` resource as input, and makes the second an exact copy of the first. The resources must be the same type. This allows you to transfer data across jobs without having to manually copy each individual file and value. Information can be stored in the resource metadata or directly in files. Metadata is modified when you utilize commands like `shipctl put_resource_state` to store key-value pairs. Files are typically managed using their own set of commands such as `shipctl copy_file_to_resource_state`. Files can only be stored in `state` type resources or in the job itself.  By default, the replicate command will copy both the files and the metadata of the `IN` resource.

**Usage**

```
shipctl replicate <IN resource> <OUT resource> <options>
```

- `IN resource` is the name of the resource that you're copying from. It must be listed as an `IN` on the job.
- `OUT resource` is the name of the resource that will receive the replicated data from the `IN resource`. It can be a resource that is listed as an `OUT` on the job, or it can be the job itself by specifying `$JOB_NAME` as the second argument. Any pre-existing files or key-value pairs in the `OUT` resource will be replaced.
- `--files-only` (`-files_only` in Windows) tells shipctl to only replicate the files from the `IN` resource.  The `OUT` resource will keep its original metadata.
- `--metadata-only` (`-metadata_only` in Windows) tells shipctl to only replicate the metadata from the `IN` resource.  The `OUT` resource will keep its original files.  This flag is automatically set if the `IN` and `OUT` resources are each repository types like `gitRepo`.
- `--webhook-data-only` (`-webhook_data_only` in Windows) tells shipctl to only replicate `shaData`, `webhookRequestBody`, and `webhookRequestPayload` from the `IN` resource's metadata. This can be used to conveniently copy repository data without overwriting the `OUT` resource's branch settings. This flag only impacts `IN` resources that are repository types (`gitRepo`, `ciRepo`, and `syncRepo`).
- `--match-settings` (`-match_settings` in Windows) should be set when you want the replication to adhere to any branch/tag settings in the `OUT` resource. For example, if the `IN` repo triggers for every branch, but the `OUT` repo is set to `branch: dev`, then you should use this flag so that replication will only occur when the `IN` repo sees a commit on the `dev` branch.  When this flag is enabled, the `--webhook-data-only` flag is also enabled automatically so that the settings in the `OUT` repo are not overwritten during the replication. This flag is only supported for `IN`/`OUT` resources that are repository types (`gitRepo`, `ciRepo`, and `syncRepo`).

**Example**

```
shipctl replicate devParams betaParams
```
The above command will copy all key/value pairs from a resource named `devParams` to a resource named `betaParams`.

```
shipctl replicate stateA stateB --files-only
```
The above command will only copy files from a state resource named `stateA` to a state resource named `stateB`.

```
shipctl replicate stateA $env:JOB_NAME -metadata_only
```
The above command will copy metadata from `stateA` into the current job.  This example utilizes the PowerShell script notation required for Windows Server 2016 nodes.


## Resource/Job information

The methods in this section apply to both jobs and resources, even though the names might suggest they only work with resources.

### get_resource_env

**Description**

Get an environment value specific to a particular resource or job.  Rather than trying to figure out the sanitized ENV name to use, you can simply utilize this function with your exact resource name to get any special ENV that Shippable adds to your environment for each resource.

**Usage**
```
shipctl get_resource_env <resource name> <env name>
```

- `resource name` is the name of the resource (or job) for which you want the env value.
- `env name` is the piece of the envrionment variable that is typically appended to the resource name.

**Example**

If you have an IN gitRepo resource named myGitRepo, you can access the current commit directly by using `$MYGITREPO_COMMIT`, or you can utilize this new function to avoid having to figure out the name sanitization.

```
shipctl get_resource_env myGitRepo commit
```

### get_resource_id

**Description**

Get the internal unique shippable id for a given resource or job.

**Usage**

```
shipctl get_resource_id <resource name>
```

- `resource name` is the name of the resource for which you want the id

**Example**

```
MY_RES_ID="$(shipctl get_resource_id "vpc_settings")"
```

### get_resource_meta

**Description**

Gets the path where files containing the metadata of the resource or job are stored. This is for power users and in all likelihood, you'll never need to worry about this.

**Usage**

```
shipctl get_resource_meta <resource name>
```

**Example**

```
MY_RESOURCE_META="$(shipctl get_resource_meta "vpc_settings")"
```

### get_resource_name

**Description**

Gets the sanitized name for a given resource or job. This command uses `sanitize_shippable_string` command internally.

**Usage**

```
shipctl get_resource_name <resource name>
```

**Example**

```
MY_RES_NAME="$(shipctl get_resource_name "vpc_settings")"
```

### get_resource_operation

**Description**

Gets whether a given resource is an`IN` or `OUT` for a job.

**Usage**

```
shipctl get_resource_operation <resource name>
```

**Example**

```
MY_RES_OPER="$(shipctl get_resource_operation "vpc_settings")"
```

### get_resource_pointer_key

**Description**

Gets value for the given key present in the pointer of a `IN` resource.

**Usage**

```
shipctl get_resource_pointer_key <resource name> <key name>
```

**Example**

```
MY_RES_POINTER="$(shipctl get_resource_pointer_key "myAWSCluster" "region")"
```

### get_resource_state

**Description**

Gets the path where state information like files and/or key-value pairs of the resource or job are stored.

**Usage**

```
shipctl get_resource_state <resource name>
```

**Example**

```
MY_RES_STATE="$(shipctl get_resource_state "vpc_settings")"
```

### get_resource_type

**Description**

Gets the type of the resource or job, for example `cluster`, `image`, etc.

**Usage**

```
shipctl get_resource_type <resource name>
```

**Example**

```
MY_RES_TYPE="$(shipctl get_resource_type "vpc_settings")"
```

### get_resource_version_id

**Description**

Gets the internal id of the version for an `IN` resource or job

**Usage**

```
shipctl get_resource_version_id <resource name>
```

**Example**

```
MY_RES_VER_ID="$(shipctl get_resource_version_id "vpc_settings")"
```

### get_resource_version_name

**Description**

Gets the `versionName` of the version for an `IN` resource of the Job.

**Usage**

```
shipctl get_resource_version_name <resource name>
```

**Example***

```
MY_RES_VER_NAME="$(shipctl get_resource_version_name "vpc_settings")"
```

### get_resource_version_number

**Description**

Gets the `versionNumber` of the version for an `IN` resource or job.

**Usage**

```
shipctl get_resource_version_number <resource name>
```
**Example**

```
MY_RES_VER_NUM="$(shipctl get_resource_version_number "vpc_settings")"
```

### get_resource_version_key

**Description**

Gets the value of the key specified from an `IN` resource or job.

**Usage**

```
shipctl get_resource_version_key <resource name> <key>
```

**Example**

```
MY_RES_VER_KEY="$(shipctl get_resource_version_key "vpc_settings" "env")"
```

### get_integration_resource

**Description**

Gets the friendly name of the integration used in an `IN` resource.

**Usage**

```
shipctl get_integration_resource <resource name>
```

- `resource name` is the friendly name of the `IN` resource

**Example**

Say you have a [cluster](/platform/workflow/resource/cluster) resource **myGkeCluster** which uses the integration **myGcCreds**:

```
resources:
  - name: myGkeCluster
    type: Google Cloud
    integration: myGcCreds
    pointer:
      region: us-central1-a
      sourceName: demoAppCluster
```

You can find the friendly name of the integration used with the following code:

```
jobs:
  - name: myCustomJob
    type: runSh
    steps:
      - IN: myGkeCluster
      - TASK:
        - script: MY_INT="$(shipctl get_integration_resource "vpc_settings")"
```

### get_integration_resource_keys

**Description**

Gets all the possible keys from an integration used in an `IN` resource.

The key values could be used with `get_integration_resource_field` command to get the value stored in the integration.

**Usage**

```
shipctl get_integration_resource_keys <resource name>
```

- `resource name` is the name of the `IN` resource

**Example**


Say you have a [cluster](/platform/workflow/resource/cluster) resource **myAWSCluster** which uses the integration **myAWSCreds**:

```
resources:
  - name: myAWSCluster
    type: cluster
    integration: myAWSCreds
    pointer:
      region: us-west-2
      sourceName: demoAppCluster
```

You can find all the keys present in the **myAWSCreds** integration with the following:

```
jobs:
  - name: myCustomJob
    type: runSh
    steps:
      - IN: myAWSCluster
      - TASK:
        - script: shipctl get_integration_resource_keys "myAWSCluster"
```

### get_integration_resource_field

**Description**

Gets the value of a field from an integration used in an `IN` resource.

For example, if your job has an `IN` image resource which has a Docker Registry integration,

**Usage**

```
shipctl get_integration_resource_field <resource name> <field name>
```

- `resource name` is the name of the `IN` resource
- `field name` is the name of field for which you want to get the value. This could be obtained for any given `IN` resource by using `get_integration_resource_keys` command.

**Example**


Say you have a [cluster](/platform/workflow/resource/cluster) resource **myGkeCluster** which uses the integration **myGcCreds**:

```
resources:
  - name: myGkeCluster
    type: Google Cloud
    integration: myGcCreds
    pointer:
      region: us-central1-a
      sourceName: demoAppCluster
```

You can find the value of the JSON key in the **myGcCreds** integration with the following:

```
jobs:
  - name: myCustomJob
    type: runSh
    steps:
      - IN: myGkeCluster
      - TASK:
        - script: MY_INT_FIELD="$(shipctl get_integration_resource_field "myGkeCluster" "jsonkey")"
```

### get_integration_keys

**Description**

Gets all the possible keys from an integration used in a `runSh` job.

The key values could be used with `get_integration_field` command to get the value stored in the integration.

**Usage**

```
shipctl get_integration_keys <subscription integration name>
```

- `subscription integration name` is the name of the subscription integration.

**Example**

Say you have a [runSh job](/platform/workflow/job/runSh/), which uses the integration **myAWSCreds**.
You can find all the keys present in the **myAWSCreds** integration with the following:

```
jobs:
  - name: myCustomJob
    type: runSh
    integrations:
      - myAWSCreds
    steps:
      - TASKS:
        - script: shipctl get_integration_keys "myAWSCreds"
```

### get_integration_field

**Description**

Gets the value of a field from an integration used in a `runSh` job.

**Usage**

```
shipctl get_integration_field <subscription integration name> <field name>
```

- `subscription integration name` is the name of the subscription integration.
- `field name` is the name of field for which you want to get the value. This could be obtained for any integration by using `get_integration_keys` command.

**Example**

Say you have a [runSh job](/platform/workflow/job/runSh/), which uses the integration **myAWSCreds**.
You can find the value of the access key in the **myAWSCreds** integration with the following:

```
jobs:
  - name: myCustomJob
    type: runSh
    integrations:
      - myAWSCreds
    steps:
      - TASK:
        - script: MY_INT_FIELD="$(shipctl get_integration_field "myAWSCreds" "accessKey")"
```

### get_params_resource

**Description**

Gets the value for the given key present in an `IN` resource of type `params`. All the key-value pairs in `params` resource are available as environment variables and could be conveniently accessed from there.

**Usage**

```
shipctl get_params_resource <resource name> <key name>
```

- `resource name` is the name of the `IN` resource
- `key name` is the key defined in the params resource.

**Example**

Say you have [params](/platform/workflow/resource/params) resource **myParams**

```
resources:
  - name: myParams
    type: params
    version:
      params:
        KEY1: "value1"
        KEY2: "value2"
```

You can get the value of the key in **myParams** with the following:

```
jobs:
  - name: myCustomJob
    type: runSh
    steps:
      - IN: myParams
      - TASK:
        - script: MY_KEY1_VALUE="$(shipctl get_params_resource "myParams" "KEY1")"
        - script: echo "$KEY1"  # Key-value pair accessed via environment variable directly
```

## Additional utilities

### bump_version

**Description**

Increments the provided [semver version](https://semver.org/) with the given action.


**Usage**

```
shipctl bump_version <version> <action>
```

- `version` is the semver version to be incremented
- `action` is the type of increment to be applied

The valid actions are:

  - major: Increment the major version. The minor and patch versions are reset to 0.
  - minor: Increment the minor version. The patch version is reset to 0.
  - patch: Increment the patch version.
  - alpha: Increment or add an `alpha` pre-release tag For example, `v1.1.1` becomes `v1.1.1-alpha` and `v1.1.1-alpha` becomes `v1.1.1-alpha.1`. Any other pre-release tags will be removed.
  - beta: Increment or add a `beta` pre-release tag For example, `v1.1.1` becomes `v1.1.1-beta` and `v1.1.1-beta` becomes `v1.1.1-beta.1`. Any other pre-release tags will be removed.
  - rc: Increment or add an `rc` pre-release tag For example, `v1.1.1` becomes `v1.1.1-rc` and `v1.1.1-rc` becomes `v1.1.1-rc.1`. Any other pre-release tags will be removed.
  - final: Remove any pre-release tags, leaving `major.minor.patch`.

**Example**

```
MY_NEW_VERSION="$(shipctl bump_version v1.0.0 minor)"
```


### decrypt

**Description**

Uses the provided key to decrypt the specified file.

This is typically used to decrypt information that was encrypted using Shippable keys. It helps you avoid building your own encrypt-decrypt system.

**Usage**

```
shipctl decrypt <source filename> <key filename>
```

- `source filename` is the file to be decrypted
- `key filename` is the fully qualified name of the key file

**Example**

```
MY_DECRYPTED_DATA="$(shipctl decrypt "properties.json" "/key/id_rsa")"
```

### get_git_changes
Lists the files/directories containing changes within a commit range.

```
shipctl get_git_changes <--path|--resource>
```

- `--path` is the file system path to a git repository.
- `--resource` is the name of the [gitRepo resource](/platform/workflow/resource/gitrepo/).
- `--commit-range` specifies the range of commits to look for changes (Example: `HEAD~1..HEAD`). Defaults to `$SHIPPABLE_COMMIT_RANGE` for CI jobs. If used in [runSh jobs](/platform/workflow/job/runsh/), the commit range is automatically configured by automatically looking at the version of the [gitRepo resource](/platform/workflow/resource/gitrepo/) mentioned in `--resource` argument.
- `--directories-only` lists only the directories containing changes.
- `--depth` returns file/folder at certain depth. Root directory has depth value 1.

**Example**

```
CHANGED_MICROSERVICES=$(shipctl get_git_changes --resource="monoRepo-gitRepo" --directories-only --depth=1)
```

### get_json_value

**Description**

Extracts the json property value from the specified file. Field name supports `.` notation and `[n]` for arrays.

This saves you the trouble of parsing a JSON file to read specific property values that are required for your workflow.

**Usage**

```
shipctl get_json_value <filename> <field name>
```

- `filename` is the name of the JSON file
- `field name` is the field for which you want to read the value

**Example**

```
MY_JSON_FIELD="$(shipctl get_json_value "properties.json" "servers[0].ipaddress")"
```

### notify

**Description**

Utilizes notification resources to send custom messages at any time during the build to any recipient.

**Usage**

```
shipctl notify <notification resource name> <options>
```

The options can be specified as part of the command, or defined as environment variables before the command is issued.

command line options:

- `--username`: Shows in the heading of the Slack message for Slack notifications, is the user sending the message in IRC, and is the user recording the deployment in NewRelic. Defaults to "Shippable" for Slack, "Shippable-$BUILD_NUMBER" for IRC, and "Shippable" for NewRelic. Username value to be used while posting an Airbrake deploy.
- `--password`: The password to connect to an IRC server. Only supported for IRC notifications.
- `--recipient`: A single target for the notification. Slack and IRC only. Slack recipients should begin with `#` or `@` and IRC recipients are `server#channel` (for example, `irc.freenode.net#my-channel`). If not specified, will default to the array of recipients defined in the notification resource.
- `--pretext`: A string that becomes the first part of the Slack message. It defaults to the current date/time. Not supported for IRC notifications.
- `--text`: The main section to display a message. It defaults to a link to the current job.
- `--color`: Defines the color to the left of the text section on Slack. Defaults to "#65cea7" (Shippable success). Not supported for IRC notifications.
- `--icon_url`: Defaults to Shippable's aye-aye icon if not specified. Not supported in IRC notifications.
- `--payload`: If specified, must be a path to a valid json file. This json directly becomes the POST body in the request to Slack API or the webhook endpoint. This parameter overrides all others. In the case of Slack, the user is required to build the appropriately formatted json object according to the [Slack documentation](https://api.slack.com/docs/messages). For webhook payloads, the only requirement is that it be valid json.
- `--type`: Type of object to be posted in case of Airbrake and NewRelic notification. Only allowed value for now is `deploy` in Airbrake and `deployment` in NewRelic.
- `--project-id`: Airbrake Project ID
- `--environment`: Enironment value to be used while posting an Airbrake deploy.
- `--revision`: Revision value to be used while posting an Airbrake deploy and recording deployments in NewRelic. `--revision` is mandatory in NewRelic deployments.
- `--repository`: Repository value to be used while posting an Airbrake deploy.
- `--email`: Email value to be used while posting an Airbrake deploy.
- `--version`: Version value to be used while posting an Airbrake deploy.
- `--changelog`: Changelog value to be used while recording a NewRelic deployment.
- `--description`: Description value to be used while recording a NewRelic deployment.
- `--appName`: Application Name value to be used for recording a deployment in NewRelic.
- `--appId`: Application Id value to be used for recording a deployment in NewRelic. Either `--appName` or `--appId` is required.

environment options:

- `NOTIFY_USERNAME` (--username)
- `NOTIFY_PASSWORD` (--password)
- `NOTIFY_RECIPIENT` (--recipient)
- `NOTIFY_PRETEXT` (--pretext)
- `NOTIFY_TEXT` (--text)
- `NOTIFY_COLOR` (--color)
- `NOTIFY_ICON_URL` (--icon-url)
- `NOTIFY_PAYLOAD` (--payload)
- `NOTIFY_TYPE` (--type)
- `NOTIFY_PROJECT_ID` (--project-id)
- `NOTIFY_ENVIRONMENT` (--environment)
- `NOTIFY_REVISION` (--revision)
- `NOTIFY_REPOSITORY` (--repository)
- `NOTIFY_EMAIL` (--email)
- `NOTIFY_VERSION` (--version)
- `NOTIFY_CHANGELOG` (--changelog)
- `NOTIFY_DESCRIPTION` (--description)

The command line arguments take priority over the environment variables.

Though many of these options are specific to Slack, they can be used for webhook notifications as well. When these options are used in webhook notifications, the payload becomes an object of simple name/value pairs. See the [notification resource documentation](/platform/workflow/resource/notification) for more information.

**Examples**

```
shipctl notify mySlackNotifier
```
All defaults will be filled in and sent to recipients defined in the resource.

```
shipctl notify mySlackNotifier --recipient="@johndoe"
```
The default payload will be sent only to `@johndoe`

```
shipctl notify myWebhookNotifier --payload=`pwd`/successPayload.json
```
Sends a custom payload, defined inside the json file, to the endpoint defined in the integration attached to myWebhookNotifier

```
shipctl notify myIRCNotifier --username=myUser
```
Sends the default IRC message to the recipient configured in myIRCNotifier as myUsername.

```
shipctl notify myIRCNotifier --text="My IRC message for build $BUILD_NUMBER."
```
Sends the specified message to IRC as the default user (`Shippable-$BUILD_NUMBER`).

```
shipctl notify myAirbrakeNotifier --project-id="12345" --type="deploy"  --environment="prod" --username="admin" --repository="$REPO" --revision="$COMMIT" --version="v4" --email="$EMAIL"
```

Posts a deploy object in Airbrake containing the passed in values.

```
shipctl notify myNewRelicNotifier --type="deployment" --appName="app" --username="admin" --revision="$COMMIT" --changelog="$SHA" --description="Description"
```

Posts a deployment object in NewRelic containing the passed in values.

### replace

**Description**

Replaces variables in a file with values based on your current shell `env`. This is useful to create config files from templates, for example.

**Usage**

```
shipctl replace <filename1> <filename2> <filenameN>
```

where your files have placeholders in the format `$ENVIRONMENT_VARIABLE_NAME` or `${ENVIRONMENT_VARIABLE_NAME}`.

**Example**

```
shipctl replace properties.json deploy.json run.json
```

###retry

**Description**

Execute any command three times if it returns a non-zero error code. This is useful when you need to execute a command that can be flaky as a result of network hiccups for example.

**Usage**

```
shipctl retry <cmd>
```

- `cmd` is command to be retried

**Example**

```
shipctl retry "docker push manishas/myImage"
```

###sanitize_shippable_string

**Description**

Shippable relies heavily on shell execution. As a result, shell reserved characters like `. , -` and more are not allowed in string names.

The `sanitize_shippable_string` method makes it easy to create a string that will be work with Shippable. It removes all characters that are not`a-z`, `A-Z`, `_`, or `0-9`.

**Usage**

```
shipctl sanitize_shippable_string <string>
```

- `string` is the original string to be sanitized.

**Example**

```
MY_SANITIZED_STRING="$(shipctl sanitize_shippable_string "foo!@#")"
```

This will return `foo`.

### to_uppercase

**Description**

Converts any given string to UPPERCASE.

**Usage**

```
shipctl to_uppercase <string>
```

**Example**

```
MY_UPPERCASE="$(shipctl to_uppercase "foo!@#")"
```

Output of the above statement would be `FOO!@#`

### jdk set

**Description**

Used to change between Java versions on demand. Note that this command should be invoked with `source` in order to properly set all of the necessary environment variables.

**Usage**

```
source shipctl jdk set <version>
```

**Example**

```
source shipctl jdk set oraclejdk10
java -version
mvn --version
```

## Deprecated commands

Following commands are deprecated and have alternate implementations introduced as of Shippable v5.11.1

- get_resource_path - Use [get_resource_state](#get_resource_state) instead.
- copy_resource_file_from_state - Use [copy_file_from_resource_state](#copy_file_from_resource_state) instead.
- refresh_file_to_out_path - Use  [copy_file_to_resource_state](#copy_file_to_resource_state) instead.

## Further Reading
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
* [Integrations](/platform/integration/overview)
