page_main_title: Working with shipctl
main_section: Platform
sub_section: Tutorials
sub_sub_section: Workflow
page_title: shipctl - DevOps Assembly Line Jobs
page_description: How to use shipctl
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# shipctl reference

This is a command utility that is available in both [runSh](/platform/workflow/job/runsh) and [runCI](/platform/workflow/job/runci) jobs. This is used to perform common operations like getting the path of where state files are stored; getting the config value of the integration used in a Resource and so on.

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
shipctl post_resource_state_multi <resource name> <key> <value> <key> <value>
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
shipctl put_resource_state_multi <resource name> <key> <value> <key> <value>
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

### get_integration_resource_field

**Description**

Gets the value of a field from an integration used in an `IN` resource.

For example, if your job has an `IN` image resource which has a Docker Registry integration,

**Usage**

```
shipctl get_integration_resource_field <resource name> <field name>
```

- `resource name` is the name of the `IN` resource
- `field name` is the name of field for which you want to get the value. To specify the field name, convert all letters to lowercase and remove spaces. For example, specify `jsonkey` if you want the value for **JSON key** field.

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

## Additional utilities

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


## Further Reading
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
* [Integrations](/platform/integration/overview)
