page_main_title: Working with shipctl
main_section: Platform
sub_section: Tutorials
sub_sub_section: Workflow
page_title: shipctl - DevOps Assembly Line Jobs
page_description: How to use shipctl
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# shipctl reference

This is a command utility that is available in both [runSh](/platform/workflow/job/runsh) and [runCI](/platform/workflow/job/runci) jobs. This is used to perform common operations like getting the path of where state files are stored; getting the config value of the integration used in a Resource and so on.

These are the current functions that can be used in your tasks

## `shipctl copy_file_from_prev_state <filename> <topath>`

Copies the file to the path supplied from the state folder of the previous run of the Job that is currently running.

Sample usage: `shipctl copy_file_from_prev_state "config.json" . `

## `shipctl copy_file_to_state <filename>`

Copies the file to the state folder of the Job that is currently running. This will be available to the next run of the Job or any future Jobs that use this as an `IN`.

Sample usage: `shipctl copy_file_to_state "/output/config.json"`

## `shipctl copy_resource_file_from_state <resource name> <filename> <topath>`

Copies the file from the Resource State that was supplied as `IN` into the path supplied.

Sample usage: `shipctl copy_resource_file_from_state "vpc_settings" "vpc.conf" .`

## `shipctl decrypt <source filename> <key filename>`

Uses the key-file to decrypt the contents of source-file. This is typically used to decrypt stuff encrypted using Shippable keys on the fly, similar to how our encryption works. It avoids you having to build encrypt-decrypt system.

Sample usage: `shipctl decrypt "properties.json" "/key/id_rsa" `

## `shipctl get_json_value <filename> <field name>`

Gets the json property value from the specified file. Field name supports `.` notation and `[n]` for arrays.

Sample usage: `shipctl get_json_value "properties.json" "servers[0].ipaddress" `

## `shipctl get_integration_resource_field <resource name> <field name>`

Gets the value of the field that was requested from the resource integration.

Sample usage: `shipctl get_integration_resource_field "my_docker_hub" "username"`

## `shipctl get_resource_id <resource name>`

Get the internal shippable unique id for a given resource.

Sample usage: `shipctl get_resource_id "vpc_settings"`

## `shipctl get_resource_meta <resource name>`

Gets the path where files containing the metadata of the resource is stored. This is for really advanced usage and most users will never need to worry about this :-)

Sample usage: `shipctl get_resource_meta "vpc_settings"`

## `shipctl get_resource_operation <resource name>`

Gets the operation that the Resource participates in this Job. Returns `IN` or `OUT`.

Sample usage: `shipctl get_resource_operation "vpc_settings"`

## `shipctl get_resource_state <resource name>`

Gets the path where files containing the state information of the resource is stored.

Sample usage: `shipctl get_resource_state "vpc_settings"`

## `shipctl get_resource_type <resource name>`

Gets the type of the resource.

Sample usage: `shipctl get_resource_type "vpc_settings"`

## `shipctl get_resource_version_id <resource name>`

Gets the internal id of the version that is in context of the Job where the Resource was used.

Sample usage: `shipctl get_resource_version_id "vpc_settings"`

## `shipctl get_resource_version_name <resource name>`

Gets the `versionName` of the version that is in context of the Job where the Resource was used.

Sample usage: `shipctl get_resource_version_name "vpc_settings"`

## `shipctl get_resource_version_number <resource name>`

Gets the `versionNumber` of the version that is in context of the Job where the Resource was used.

Sample usage: `shipctl get_resource_version_number "vpc_settings"`

## `shipctl get_resource_version_key <resource name> <key>`

Gets the value of the key specified, from the version that is in context of the Job where the Resource was used.

Sample usage: `shipctl get_resource_version_key "vpc_settings" "env"`

## `shipctl post_resource_state <resource name> <key> <value>`

This posts the key-value to the Resource. This action resets state, so you need to be careful to use this only once and then use the `put` version to append to it if you don't want to erase state.

Sample usage: `shipctl post_resource_state "vpc_settings" "HERO" "SUPERMAN"`

## `shipctl put_resource_state <resource name> <key> <value>`

This puts, i.e appends, the new key-value to the Resource. This will append to the state if it has already been created, else it will create a new one.

Sample usage: `shipctl put_resource_state "vpc_settings" "HERO" "BATMAN"`

## `shipctl get_params_resource <resource name> <parameter name>`

Gets the `parameter` value of the given params resource that is in context of the Job where the Resource was used.

Sample usage: `shipctl get_params_resource "vpc_settings_params" "API_URL"`

## `shipctl get_integration_resource <resource name>`

Gets the `integration` details of the given resource that is in context of the Job where the Resource was used.

Sample usage: `shipctl get_integration_resource "vpc_settings"`

## `shipctl refresh_file_to_out_path <filename> <resource name>`

Copies the file to the Resource State that was supplied as `OUT`

Sample usage: `shipctl refresh_file_to_out_path "vpc.conf" "vpc_settings" `

## `shipctl refresh_file_to_state <filename>`

This will look in the present working directory for the `<filename>` and if present, copy that to current Job state. If it doesnt find the file, it will look in the state of the previous run of the Job and copy that. If it doesn't find it there, it just returns 0 exit code

Sample usage: `shipctl refresh_file_to_state "config.json"`

## `shipctl replace <filename1> <filename2> <filenameN>`

If you have a config file/s with a bunch of variables, you can use this utility to replace them all in one shot based on your current shell `env`

Your files need to have the placeholders in this format; `$ENVIRONMENT_VARIABLE_NAME` or `${ENVIRONMENT_VARIABLE_NAME}`. The second option is the recommended one

Sample usage: `shipctl replace properties.json deploy.json run.json`

## `shipctl retry <cmd>`

If you need to execute a command that could be flaky sometime, this utility will execute any command it wraps, 3 times if a non-zero error code is retured.

Sample usage: `shipctl retry "echo 'hello'"`

## `shipctl sanitize_shippable_string <string>`

Shippable DevOps Assembly Lines Platform relies heavily on shell execution. As a result, shell reserved characters like `. , -` and more are not allowed in string names etc. To make it easy, you can use this to return a string that will be acceptable by Shippable

Sample usage: `shipctl sanitize_shippable_string "foo!@#"`

## `shipctl to_uppercase <string>`

Converts any given string to UPPERCASE

Sample usage: `shipctl to_uppercase "foo!@#"`

## Further Reading
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
* [Integrations](/platform/integration/overview)
