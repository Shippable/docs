page_main_title: runSh usecases
main_section: Platform
sub_section: Tutorials
sub_sub_section: Workflow
page_title: runSh usecases
page_description: Usecases for runSh job

# runSh tutorials

The [runSh](/platform/workflow/job/runsh/) job is one of the most versatile jobs in the Shippable platform since it lets you run any custom scripts as part of your end-to-end workflow. This document provides examples of all the key features.


## Running a single Task

```
jobs:

  ## Job description:
  ## - single task
  - name: container_single_task
    type: runSh
    steps:
      - TASK:
          name: task
          script:
            - uname -a
```

## Running multiple Tasks

Here we define multiple `TASK` elements in a single job. They are executed in order of definition.

```
jobs:
  ## Job description:
  ## - multiple tasks
  - name: container_multiple_tasks
    type: runSh
    steps:
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
```

### Sharing state

State is shared using a shared task directory that is set in the $SHARED_DIR environment variable.

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
```

## Using a custom docker image

Docker image and options are specified in the `runtime:options:` tag.

* When using a Shippable language image as a custom image, specify a tag that is the same version as the AMI in your subscription. The image then shouldn't have to be pulled, since all of the build images are on the Subscription AMI already.
* If you use a different tag or a non-Shippable image, we will have to pull that image. If your runSh job is running on a custom node, the pulled image will get cached.
* You might want to also explore creating lightweight custom images that have exactly what you need.

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
              options: --dns=4.4.4.4 --dns=8.8.8.8
          script:
            - echo "Checking runtime values"
            - sudo docker info
```

## Using static environment variables

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
```

## Running a Task on the Host

`runtime:container: false` is set at the task level to run the task on the host directly.

```
jobs:
 ## Job description:
 ## - single task running on Host
 - name: host_single_task
   type: runSh
   steps:
     - TASK:
         name: check_host_OS
         runtime:
           container: false
         script:
           - echo "Checking OS of the host"
           - uname -a
```

`runtime:container: false` can also be set at the job level, which then applies to all tasks.

```
jobs:
 ## Job description:
 ## - single task running on Host
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
```

### Sharing state across host and container

`container: false` is set at the job level to run all tasks by default on the host. To execute a specific
task in a container, we set `container: true` at the TASK level. State is shared using a shared task directory that is set in the $SHARED_DIR environment variable.

```
jobs:
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
```

## Sending notifications
You might have a requirement to run a script when the runSh job succeeds, fails or in both cases. All these scenarios can be
addressed by specifying your scripts in the `on_success`, `on_failure` or `always` tags.

```
jobs:
  - name: container_multiple_tasks
    type: runSh
    steps:
      - TASK:
          name: check_images
          script:
            - echo "Checking available docker images"
            - sudo docker images
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

Another common usecase is to send email/IRC/Slack/HipChat notifications notifications when a job succeeds or fails or in both cases. The [notification resource](/platform/workflow/resource/notification/) allows you to
precisely accomplish that. It can be used in the `on_success`, `on_failure` or `always` tags.

Here is an example of sending slack notifications when a runSh job fails. To configure others providers, please
read the [notification resource doc](/platform/workflow/resource/notification/).

```
resources:
  - name:             slacknotify
    type:             notification
    integration:      slack
    versionTemplate:
      recipients:
        - "#shippablejobs"

jobs:
  - name: container_multiple_tasks
    type: runSh
    steps:
      - TASK:
          name: check_images
          script:
            - echo "Checking available docker images"
            - sudo docker images
    on_failure:
      NOTIFY:
        - name: slacknotify
```

## Running on a specific node pool

By default, all jobs run on your [default node pool](/platform/management/subscription/node-pools/). You can specify a node pool on which you want to execute your `runSh` job. The common reasons for this are:

* Your runSh job is resource intensive, so you want to use a specific node pool which has bigger machines
* You want to run the job on Mac OS, Windows, or CentOS and hence want to select a specific node pool

Your **shippable.yml** can be configured as shown below:

```
jobs:

  - name: container_multiple_tasks
    type: runSh
    runtime:
      nodePool: myNodePool
    steps:
      - TASK:
          script:
            - echo "Hello world"
```

The value for `nodePool` above has to exactly match the pool name in your [Subscription Settings](/platform/management/subscription/node-pools/).
