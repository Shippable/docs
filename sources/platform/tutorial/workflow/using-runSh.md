page_main_title: runSh usecases
main_section: Platform
sub_section: Tutorials
sub_sub_section: Workflow
page_title: runSh usecases
page_description: Usecases for runSh job

# runSh Usecases

The [runSh](/platform/workflow/job/runsh/) job is one of the most versatile jobs in the Shippable platform. This document
provides examples of all the key features. To use these features, you will need to opt-in to the latest version of the
Shippable platform using the steps documented [here](/platform/tutorial/runtime/moving-to-node-pools).

By default, the runSh job executes in a container using the default Shippable provided image. This behavior can be overridden
and is demonstrated below.

## Usecases

* [runSh job running a single task](/platform/tutorial/workflow/using-runSh/#1-runsh-job-running-a-single-task)
* [runSh job running multiple tasks](/platform/tutorial/workflow/using-runSh/#2-runsh-job-running-multiple-tasks)
* [runSh job running multiple tasks that share a task directory](/platform/tutorial/workflow/using-runSh/#3-runsh-job-running-multiple-tasks-that-share-a-task-directory)
* [runSh job using a custom docker image and custom docker options](/platform/tutorial/workflow/using-runSh/#4-runsh-job-using-a-custom-docker-image-and-custom-docker-options)
* [runSh job using static environment variables](/platform/tutorial/workflow/using-runSh/#5-runsh-job-using-static-environment-variables)
* [runSh job running a single task on the host directly](/platform/tutorial/workflow/using-runSh/#6-runsh-job-running-a-single-task-on-the-host-directly)
* [runSh job running multiple tasks on the host directly](/platform/tutorial/workflow/using-runSh/#7-runsh-job-running-multiple-tasks-on-the-host-directly)
* [runSh job running multiple tasks that share a task directory on the host directly](/platform/tutorial/workflow/using-runSh/#8-runsh-job-running-multiple-tasks-that-share-a-task-directory-on-the-host-directly)
* [runSh job using a custom docker image and custom docker options and running on the host directly](/platform/tutorial/workflow/using-runSh/#9-runsh-job-using-a-custom-docker-image-and-custom-docker-options-and-running-on-the-host-directly)
* [runSh job running hybrid tasks that run on host and container, container being default](/platform/tutorial/workflow/using-runSh/#10-runsh-job-running-hybrid-tasks-that-run-on-host-and-container-container-being-default)
* [runSh job running hybrid tasks that run on host and container, host being default](/platform/tutorial/workflow/using-runSh/#11-runsh-job-running-hybrid-tasks-that-run-on-host-and-container-host-being-default)
* [runSh job running hybrid tasks that run on host and container sharing state](/platform/tutorial/workflow/using-runSh/#12-runsh-job-running-hybrid-tasks-that-run-on-host-and-container-sharing-state)

###1. runSh job running a single task
```
jobs:

  ## Job description:
  ## - single task
  - name: container_single_task
    type: runSh
    steps:
      - TASK:
          name: check_container_OS
          script:
            - echo "Checking OS of the container"
            - uname -a
    on_success:
      script:
        - echo "Task successfully completed"
    on_failure:
      script:
        - echo "This should be executed if any step in TASK fails"
    always:
      script:
        - echo "This should always be executed, regardless of job status"
```

###2. runSh job running multiple tasks

```
jobs:
  ## Job description:
  ## - multiple tasks
  - name: container_multiple_tasks
    type: runSh
    steps:
      - TASK:
          name: check_container_OS
          script:
            - echo "Checking OS of the container"
            - uname -a
      - TASK:
          name: check_images
          script:
            - echo "Checking available docker images"
            - sudo docker images
      - TASK:
          name: check_container_uptime
          script:
            - echo "Checking container uptime"
            - uptime
    on_success:
      script:
        - echo "Task successfully completed"
    on_failure:
      script:
        - echo "This should be executed if any step in TASK fails"
    always:
      script:
        - echo "This should always be executed, regardless of job status"
```

###3. runSh job running multiple tasks that share a task directory
The path of the shared task directory is set in the $SHARED_DIR environment variable.

```
jobs:
  ## Job description:
  ## - multiple tasks
  ## - shared task directory
  - name: container_share_task_state
    type: runSh
    steps:
      - TASK:
          name: write_to_file
          script:
            - echo "Writing data to a file in shared directory"
            - echo "CUSTOM_VALUE" > $SHARED_DIR/sharedFile.txt
      - TASK:
          name: override_file
          script:
            - echo "Reading data from file in shared directory"
            - echo $SHARED_DIR/sharedFile.txt
            - echo "Overriding file data"
            - echo "OVERRIDEN_VALUE" > $SHARED_DIR/sharedFile.txt
      - TASK:
          name: check_contents
          script:
            - echo "Checking shared file contents"
            - cat $SHARED_DIR/sharedFile.txt
    on_success:
      script:
        - echo "Task successfully completed"
    on_failure:
      script:
        - echo "This should be executed if any step in TASK fails"
    always:
      script:
        - echo "This should always be executed, regardless of job status"

```

###4. runSh job using a custom docker image and custom docker options
Docker image and options are specified in the `runtime:options:` tag.

```
jobs:
  ## Job description:
  ## - single task
  ## - custom image to run the job
  - name: container_custom_image
    type: runSh
    steps:
      - TASK:
          name: custom_container_opts
          runtime:
            options:
              imageName: drydock/u14pytall
              imageTag: master
          script:
            - echo "Checking runtime values"
            - sudo docker info
    on_success:
      script:
        - echo "Task successfully completed"
    on_failure:
      script:
        - echo "This should be executed if any step in TASK fails"
    always:
      script:
        - echo "This should always be executed, regardless of job status"
```

###5. runSh job using static environment variables
Static environment variables are specified in the `runtime:options:env:` tag.

```
jobs:
 ## Job description:
  ## - single task
  ## - custom image options to run the job
  - name: container_custom_opts
    type: runSh
    steps:
      - TASK:
          name: custom_container_opts
          runtime:
            options:
              env:
                - CONTAINER_ENV_1: foo
                - CONTAINER_ENV_2: bar
          script:
            - echo "Checking environment variables"
            - env
    on_success:
      script:
        - echo "Task successfully completed"
    on_failure:
      script:
        - echo "This should be executed if any step in TASK fails"
    always:
      script:
        - echo "This should always be executed, regardless of job status"
```

###6. runSh job running a single task on the host directly
`container: false` is set to run the task on the host directly.

```
jobs:
 ## Job description:
 ## - single task
 - name: host_single_task
   type: runSh
   runtime:
     container: false
   steps:
     - TASK:
         name: check_host_OS
         script:
           - echo "Checking OS of the host"
           - uname -a
           - cat /etc/*release
   on_success:
     script:
       - echo "Task successfully completed"
   on_failure:
     script:
       - echo "This should be executed if any step in TASK fails"
   always:
     script:
       - echo "This should always be executed, regardless of job status"
```

###7. runSh job running multiple tasks on the host directly
`container: false` is set to run all the tasks on the host directly.

```
## Job description:
  ## - multiple tasks
  - name: host_multiple_tasks
    type: runSh
    runtime:
      container: false
    steps:
      - TASK:
          name: check_host_OS
          script:
            - echo "Checking OS of the host"
            - uname -a
            - cat /etc/*release
      - TASK:
          name: check_images
          script:
            - echo "Checking available docker images"
            - sudo docker images
      - TASK:
          name: check_host_uptime
          script:
            - echo "Checking host uptime"
            - uptime
    on_success:
      script:
        - echo "Task successfully completed"
    on_failure:
      script:
        - echo "This should be executed if any step in TASK fails"
    always:
      script:
        - echo "This should always be executed, regardless of job status"
```

###8. runSh job running multiple tasks that share a task directory on the host directly
`container: false` is set to run all the tasks on the host directly. The path of the shared task
directory is set in the $SHARED_DIR environment variable.

```
## Job description:
  ## - multiple tasks
  ## - shared task directory
  - name: host_share_task_state
    type: runSh
    runtime:
      container: false
    steps:
      - TASK:
          name: write_to_file
          script:
            - echo "Writing data to a file in shared directory"
            - echo "CUSTOM_VALUE" > $SHARED_DIR/sharedFile.txt
      - TASK:
          name: override_file
          script:
            - echo "Reading data from file in shared directory"
            - echo $SHARED_DIR/sharedFile.txt
            - echo "Overriding file data"
            - echo "OVERRIDEN_VALUE" > $SHARED_DIR/sharedFile.txt
      - TASK:
          name: check_contents
          script:
            - echo "Checking shared file contents"
            - cat $SHARED_DIR/sharedFile.txt
    on_success:
      script:
        - echo "Task successfully completed"
    on_failure:
      script:
        - echo "This should be executed if any step in TASK fails"
    always:
      script:
        - echo "This should always be executed, regardless of job status"
```

###9. runSh job using a custom docker image and custom docker options and running on the host directly
`container: false` is set at the job level to run all the tasks on the host directly. Docker image and options
are specified in the `runtime:options:` tag.

```
## Job description:
 ## - single task
 ## - custom image to run the job
 - name: host_custom_envs
   type: runSh
   runtime:
     container: false
   steps:
     - TASK:
         name: host_custom_envs
         runtime:
           options:
             env:
               - HOST_ENV_1: foo
               - HOST_ENV_2: bar
         script:
           - echo "Checking runtime values"
           - env | grep HOST
   on_success:
     script:
       - echo "Task successfully completed"
   on_failure:
     script:
       - echo "This should be executed if any step in TASK fails"
   always:
     script:
       - echo "This should always be executed, regardless of job status"
```

###10. runSh job running hybrid tasks that run on host and container, container being default
`container: false` is set at the task level for tasks that need to execute on the host directly. The tasks that
do not specify the `container` tag run on the container.

```
## Job description:
  ## - single task on both container and host, container being default
  - name: hybrid_default_container
    type: runSh
    steps:
      - TASK:
          name: check_container_OS
          script:
            - echo "Checking OS of the container"
            - uname -a
            - cat /etc/*release
      - TASK:
          name: check_host_OS
          runtime:
            container: false
          script:
            - echo "Checking OS of the host"
            - uname -a
            - cat /etc/*release
    on_success:
      script:
        - echo "Task successfully completed"
    on_failure:
      script:
        - echo "This should be executed if any step in TASK fails"
    always:
      script:
        - echo "This should always be executed, regardless of job status"
```

###11. runSh job running hybrid tasks that run on host and container, host being default
`container: false` is set at the job level to run all tasks by default on the host. To execute a specific
task in a container, we set `container: true` at the TASK level.

```
## Job description:
  ## - single task on both container and host, host being default
  - name: hybrid_default_host
    type: runSh
    runtime:
      container: false
    steps:
      - TASK:
          name: check_container_OS
          runtime:
            container: true
          script:
            - echo "Checking OS of the container"
            - uname -a
            - cat /etc/*release
      - TASK:
          name: check_host_OS
          script:
            - echo "Checking OS of the host"
            - uname -a
            - cat /etc/*release
    on_success:
      script:
        - echo "Task successfully completed"
    on_failure:
      script:
        - echo "This should be executed if any step in TASK fails"
    always:
      script:
        - echo "This should always be executed, regardless of job status"
```

###12. runSh job running hybrid tasks that run on host and container sharing state
`container: false` is set at the job level to run all tasks by default on the host. To execute a specific
task in a container, we set `container: true` at the TASK level. The path of the shared task directory is set
in the $SHARED_DIR environment variable.

```
## Job description:
 ## - multiple tasks on both container and host, sharing state
 - name: hybrid_share_task_state
   type: runSh
   runtime:
     container: false
   steps:
     - TASK:
         name: container_write_file
         runtime:
           container: true
         script:
           - echo "write to shared file from a container"
           - uname -a
           - cat /etc/*release
           - echo "Writing data to a file in shared directory"
           - echo "CUSTOM_VALUE" > $SHARED_DIR/sharedFile.txt
     - TASK:
         name: host_override_file
         script:
           - echo "Checking OS of the host"
           - uname -a
           - cat /etc/*release
           - echo "Reading data from file in shared directory"
           - cat $SHARED_DIR/sharedFile.txt
           - echo "Overriding file data"
           - echo "OVERRIDEN_VALUE" > $SHARED_DIR/sharedFile.txt
     - TASK:
         name: container_check_contents
         runtime:
           container: true
         script:
           - echo "Checking shared file contents"
           - cat $SHARED_DIR/sharedFile.txt
   on_success:
     script:
       - echo "Task successfully completed"
   on_failure:
     script:
       - echo "This should be executed if any step in TASK fails"
   always:
     script:
       - echo "This should always be executed, regardless of job status"
```
