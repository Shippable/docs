page_main_title: Share information across jobs
main_section: Platform
sub_section: Tutorials
sub_sub_section: Workflow

# Sharing information across jobs

One big benefit of the Shippable platform is that it enables **Toolchain collaboration**, i.e. it makes it very easy for different DevOps activities to exchange information through the platform, as opposed to needing manual input.

Take a simple example of two jobs: **prov-job** creates a vpc and cluster on AWS, and **deploy-job** deploys an application to the cluster. In this scenario, **deploy-job** needs to know which application version to deploy, and where to deploy the application.

Instead of needing to get this information through manual process like spreadsheets/Slack/emails, Shippable gives you an easy way to store this information in **resources** and make it available to related jobs in the workflow.

Information can be shared across jobs in the following ways:

* [**Job state**](#job-state) allows you to store key-value pairs or files up to 1Mb in size in the state folder, from where it can be retrieved by any other job that is immediately downstream or even a successive run of the same job.
* [**resources**](#resources-state), which can be updated by one job and read by a downstream job
* [**state** resource](#central-state), which provides you with central state that can be read and updated by downstream and upstream jobs in your workflow.

<a name="job-state"></a>
## Using job state

You can store two types of information in job state: **key-value pairs** and **files**.

Jobs are versioned, so each execution creates a new version. The state folder is a part of version information for each run.

<img src="/images/platform/tutorial/workflow/share-info-across-jobs-fig1.png" alt="Sharing information across jobs">

### Files

To write a file to the state folder, use the **shipctl** utility `copy_file_to_state` as shown below:

```
jobs:
  - name: job_1
    type: runSh
    steps:
      - TASK:
        - script: |
          # do something that generates a file
          shipctl copy_file_to_state myFile.txt # Write myFile.txt to state
```

To read a file from the state of an upstream job, you need to include the upstream job as an `IN` and use the  **shipctl** utility `copy_resource_file_from_state` as shown below:

```
jobs:
  - name: job_2
    type: runSh
    steps:
      - IN: job_1   
      - TASK:
        - script: |
          shipctl copy_resource_file_from_state job_1 myFile.txt .
          # do something with file          
```
Complete shipctl reference is [here](/platform/tutorial/workflow/using-shipctl/).

### Key-values

To write key-value pairs to the state folder, use the **shipctl** utility `post_resource_state_multi` as shown below:

```
jobs:
  - name: job_1
    type: runSh
    steps:
      - TASK:
        - script: shipctl post_resource_state_multi $JOB_NAME "HERO=SUPERMAN FOO=bar"

```

To read key-value pairs from the state of an upstream job, you need to include the upstream job as an `IN` and use the  **shipctl** utility `get_resource_version_key` as shown below:

```
jobs:
  - name: job_2
    type: runSh
    steps:
      - IN: job_1
      - TASK:
        - script: HERO="$(shipctl get_resource_version_key job_1 HERO)"
        - script: FOO="$(shipctl get_resource_version_key job_1 FOO)"
```

Complete shipctl reference is [here](/platform/tutorial/workflow/using-shipctl/).

### Sharing state between successive runs

A job can write files to its own state and this is available to the successive run of the job. For example, if `job_1` saves a file `myFile.txt` as shown below in run 13, it will be available in run 14.

To read a file from the state of previous run, you can use the  **shipctl** utility `copy_file_from_prev_state` as shown below:

```
jobs:
  - name: job_1
    type: runSh
    steps:
      - TASK:
        - script: |
          shipctl copy_file_from_prev_state "myFile.txt" .
          # do something with file and update it
          shipctl copy_file_to_state "myFile.txt"

```
Complete shipctl reference is [here](/platform/tutorial/workflow/using-shipctl/).

<a name="resources-state"></a>
## Using resources

You can share information through resources by writing to a resource from a job, and reading from the resource from a downstream job.

<img src="/images/platform/tutorial/workflow/share-info-across-jobs-fig2.png" alt="Sharing information across jobs">

In the picture above, **resource_1** is an `OUT` for **job_1** and an `IN` for **job_2**. So **job_1** can write to **resource_1**, which creates a new version of the resource, which in turn triggers **job_2** unless automatic triggers are turned off. 

The resource can be anything, from a `params` resource that stores key-value pairs, to an `image` pointing to a Docker image. A complete list of resources is [here](/platform/workflow/resource/overview).

In order to use resources to exchange information, you can reference the following tutorials:

- [Writing to an OUT resource](/platform/tutorial/workflow/writing-keyvalues-to-output-resource/)
- [Reading from an IN resource](/platform/tutorial/workflow/access-resource-data/)

<a name="central-state"></a>
## Using central state

The `state` resource is a special type of resource that lets you create a central state that can store key-value pairs or files (up to 1Mb in size), and can be updated or consumed by upstream and downstream jobs in your workflow.

For an overview and reference, read the following docs:

- [Central state overview](/platform/workflow/state/overview/#central-state)
- [state resource reference](/platform/workflow/resource/state)

The `state` resource can be used as IN and OUT step for [any job](/platform/workflow/job/overview/).

The tutorials below show you you can create a `state` resource and read from and write to it.

### Setup

You can create a `state` resource by adding it to **shippable.yml**:

```
resources:
  - name: res_state
    type: state
```

* `name` should be an easy to remember text string. This will appear in the visualization of this resource in the SPOG view. It is also used to refer to this resource in the `jobs` section of **shippable.yml**. If you have spaces in your name, you'll need to surround the value with quotes, however, as a best practice we recommend not including spaces in your names.

* `type` is always set to 'state'.

You can use the state resource as an input and output for multiple `runSh` or `runCI` jobs to maintain a common state. Any job that requires the state in order to execute should take the state resource as an `IN`, and any job that writes to the state should have the state resource as an `OUT`.

We will use the [shipctl utility](/platform/tutorial/workflow/using-shipctl/) to write and read from the state resource.


### Writing a file to state

The snippet below will write a file  `release.template.yml` to the state resource. Please note that the file needs to be present in the directory from where you call `shictl`.

```
jobs:
  - name: sample_job
    type: runSh
    steps:
      - TASK:
        #reference is here: http://docs.shippable.com/platform/tutorial/workflow/using-shipctl/#shipctl-refresh_file_to_out_path-filename-resource-name
        - shipctl copy_file_to_resource_state ./release.template.yml res_state
      - OUT: res-state
```

### Fetching a file from state

The snippet below will fetch files from the state resource.

```
jobs:
  - name: sample_job
    type: runSh
    steps:
      - IN: res_state
      - TASK:
        #reference is here: http://docs.shippable.com/platform/tutorial/workflow/using-shipctl/#shipctl-copy_resource_file_from_state-resource-name-filename-topath
        - shipctl copy_file_from_resource_state res_state release.template.yml .
```

### Putting a key-value pair to state

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

### Reading a value for a key from state

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
