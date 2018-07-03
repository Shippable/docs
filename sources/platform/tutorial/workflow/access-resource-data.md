page_main_title: Working with shipctl
main_section: Platform
sub_section: Tutorials
sub_sub_section: Workflow
page_title: shipctl - DevOps Assembly Line Jobs
page_description: How to use shipctl
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# Reading data from an IN resource

If you are using scripted jobs like `runSh` or `runCI`, you will need to extract information from `IN` resources so you can use it in your scripts. This document explains how to achieve this using our utility `shipctl`. You can use the methods described below in the `TASK` section of `runSh` jobs or in your **shippable.yml** for CI.

For example:

```
jobs:
  - name: job_1
    type: runSh
    steps:
      - IN: myResource
      - TASK:
        - script: |
          # shipctl method you want to call
```

## Reading meta information

`meta` which is a json object containing the resource definition and information. For example, if you have a cluster resource, the pointer information is stored in this json object. This section explains how to extract this information for different resources.

### Generic information

* Getting resource ID

To get the unique ID for your resource, use the following command:

```
shipctl get_resource_id <resource name>
```
where `resource name` is the friendly name of your resource, for example: `shipctl get_resource_id "vpc_settings"`

* Getting resource type

```
shipctl get_resource_type <resource name>
```
Gets the type of the resource. Sample usage: `shipctl get_resource_type "vpc_settings"`

* Getting resource operation

```
shipctl get_resource_operation <resource name>
```
Gets the operation that the Resource participates in this Job. Returns IN or OUT. Sample usage: `shipctl get_resource_operation "vpc_settings"`

* Getting versionNumber

To get the versionNumber for your resource, use the following command:

```
shipctl get_resource_version_number <resource name>
```
where `resource name` is the friendly name of your resource, for example: `shipctl get_resource_version_number "vpc_settings"`


* Getting versionName

To get the versionName for your resource, use the following command:

```
shipctl get_resource_version_name <resource name>
```
where `resource name` is the friendly name of your resource, for example: `shipctl get_resource_version_name "vpc_settings"`

### Reading entire meta object

You can also read the entire `meta` json object by calling the method below to get the path where the json file is stored:

```
shipctl get_resource_meta <resource name>
```

This is for power users and in all likelihood, you'll never need to worry about this. Sample usage: `shipctl get_resource_meta "vpc_settings"`

## Reading state information

### Get value for a key

If you are storing key-value information in a resource, you can retrieve the values with the following command:

```
shipctl get_resource_version_key <resource name> <key>
```
where `resource name` is the friendly name of your resource and `key` is the key you want to retrieve the value for.

Sample usage: `shipctl get_resource_version_key "vpc_settings" "env"`

### Retrieving files from state

You have two options to retrieve files stored in a [`state`](/platform/workflow/resource/state/) resource. Please note that this will not work for any other resource, since only the `state` resource can store files.

* Copy the file from resource state to a user-defined path:

```
shipctl copy_resource_file_from_state <resource name> <filename> <topath>
```
Sample usage: `shipctl copy_resource_file_from_state "vpc_settings" "vpc.conf" .`

* Get the path of the state folder to retrieve multiple files:

```
shipctl get_resource_state <resource name>
```
Sample usage: `shipctl get_resource_state "vpc_settings"`

## Accessing path data

The `gitRepo` and `ciRepo` resources make a clone of your Git repository on your node. To get the path where the repository was cloned, you can call the method below:

```
shipctl get_resource_state <resource name>
```
