page_main_title: Share data between Jobs
main_section: Platform
sub_section: Tutorials
sub_sub_section: Workflow
page_title: Share data between Jobs
page_description: How to share data between successive jobs in Shippable

# Sharing information through jobs

You can share key-value pairs and files with a downstream job in an Assembly line by writing to the `state` of your job.

Jobs can also share information through resources, which is explained in the [Workflow state overview](/platform/workflow/state/overview/) and is outside the scope of this document.


## Sharing state between successive jobs

### Files

Consider the config below:

<img src="/images/platform/tutorial/workflow/share-files-between-jobs.png" alt="Sharing files between jobs">

`job_1` writes a file to its state. The successive job `job_2` can consume the file.

```
jobs:
  - name: job_1
    type: runSh
    steps:
      - TASK:
        - script: |
          # do something that generates a file
          shipctl copy_file_to_state myFile.txt

  - name: job_2
    type: runSh
    steps:
      - IN: job_1
      - TASK:
        - script: |
          shipctl copy_resource_file_from_state job_1 myFile.txt .
          # do something with file

```

The two methods we have used from the [shipctl utility](/platform/tutorial/workflow/using-shipctl/) are:

```
shipctl copy_file_to_state <file name>
```
where file should be in the same folder you call shipctl from,

```
shipctl copy_resource_file_from_state <IN job name> <file name> <to path>
```

### key-value pairs

In this scenario, `job_1` writes multiple key-value pairs to its state. The successive job `job_2` reads the key-value pairs
from `job_1` state.

```
jobs:
  - name: job_1
    type: runSh
    steps:
      - TASK:
        - script: shipctl post_resource_state_multi $JOB_NAME "HERO=SUPERMAN FOO=bar"

  - name: job_2
    type: runSh
    steps:
      - IN: job_1
      - TASK:
        - script: HERO="$(shipctl get_resource_version_key job_1 HERO)"
        - script: FOO="$(shipctl get_resource_version_key job_1 FOO)"
```

The two methods we have used from the [shipctl utility](/platform/tutorial/workflow/using-shipctl/) are:

```
shipctl post_resource_state_multi <resource name> "<key1>=<value1> <key2>=<value2>"
```

```
shipctl get_resource_version_key <resource name> <key>
```

## Sharing state between successive runs

A job can write files to its own state and this is available to the successive run of the job. For example, if `job_1` saves a file `myFile.txt` as shown below in run 13, it will be available in run 14.

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

To access a file from the previous run's state, use the shipctl method:

```
shipctl copy_file_from_prev_state <file name> <to path>
```
