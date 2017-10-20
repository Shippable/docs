page_main_title: Using central state to share information between jobs
main_section: Platform
sub_section: Tutorials
sub_sub_section: Workflow
page_title: Using central state to share information between jobs

# Using central state to share information between jobs

A `state` resource type is used to create a central state that can be used across the entire Assembly Line. This state resource can contain a file (up to 1Mb in size) or key:value pairs that are updated and consumed by several jobs in your Assembly Line.

The `state` resource can be used as IN and OUT step for [any job](/platform/workflow/job/overview/).

## Instructions

### Step 1: Add a state resource

You can create a `state` resource by adding it to `shippable.resources.yml`:

```
resources:
  - name: res_state
    type: state
```

* `name` should be an easy to remember text string. This will appear in the visualization of this resource in the SPOG view. It is also used to refer to this resource in the `shippable.jobs.yml`. If you have spaces in your name, you'll need to surround the value with quotes, however, as a best practice we recommend not including spaces in your names.

* `type` is always set to 'state'.


### Step 2: Use state as IN/OUT for jobs

You can use the state resource as an input and output for multiple `runSH` or `runCI` jobs to maintain a common state. Any job that requires the state in order to execute should take the state resource as an `IN`, and any job that writes to the state should have the state resource as an `OUT`.

We will use the [shipctl utility](/platform/tutorial/workflow/using-shipctl/) to write and read from the state resource.


####a. Writing a file to state

The snippet below will write a file  `release.template.yml` to the state resource. Please note that the file needs to be present in the directory from where you call `shictl`.

```
jobs:
  - name: sample_job
    type: runSh
    steps:
      - TASK:
        #reference is here: http://docs.shippable.com/platform/tutorial/workflow/using-shipctl/#shipctl-refresh_file_to_out_path-filename-resource-name
        - shipctl refresh_file_to_out_path ./release.template.yml res_state
      - OUT: res-state
```

####b. Fetching a file from state

The snippet below will fetch files from the state resource.

```
jobs:
  - name: sample_job
    type: runSh
    steps:
      - IN: res_state
      - TASK:
        #reference is here: http://docs.shippable.com/platform/tutorial/workflow/using-shipctl/#shipctl-copy_resource_file_from_state-resource-name-filename-topath
        - shipctl copy_resource_file_from_state res_state release.template.yml .
```

####c. Putting a key-value pair to state

The snippet below will put a key:value pair in the state resource.

```
jobs:
  - name: sample_job
    type: runSh
    steps:
      - TASK:
        #reference is here: http://docs.shippable.com/platform/tutorial/workflow/using-shipctl/#shipctl-post_resource_state-resource-name-key-value
        - shipctl post_resource_state res_state "HERO" "Superman"
      - OUT: res-state
```

Please note that you should only use `post_resource_state` if you want to reset state (i.e. wipe out all current key value pairs in state) and just add this one pair. If you just want to append to the existing pairs, use [`put_resource_state`](http://docs.shippable.com/platform/tutorial/workflow/using-shipctl/#shipctl-put_resource_state-resource-name-key-value)

####d. Reading a value for a key from state

The snippet below will read the value for a key from the state resource.

```
jobs:
  - name: sample_job
    type: runSh
    steps:
      - IN: res_state
      - TASK:
        #reference is here: http://docs.shippable.com/platform/tutorial/workflow/using-shipctl/#shipctl-post_resource_state-resource-name-key-value
        - shipctl get_resource_version_key res_state "HERO"
```
