page_main_title: Running job directly on node
main_section: Platform
sub_section: Tutorials
sub_sub_section: Workflow

# Running job directly on node

By default, when a job is triggered, we provision a build node (or use an existing node), spin up a build container, and execute your commands inside the container. While this is efficient for most workflows, there might be cases where you really want to execute your commands directly on the node, and not in a container.

The ability to run a job directly on the host is supported by `runSh` jobs.

## Instructions

You can set a specific `TASK` section in a `runSh` job to run on the node, or set this at the job level so that all `TASK` sections in the job run on the node.

### Running a task on node

* Update the `TASK` section of your `runSh` job with the tag `runtime:container: false` to run the task on the node directly.

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
           container: false           # This configuration runs commands in the script section on the host
         script:
           - echo "Checking OS of the host"
           - uname -a
```

* Commit the changes above to **shippable.yml**. This will automatically update your existing workflow and the next time the job executes, it will run directly on the build node. If this is a brand new workflow, you can add your config to Shippable by following [instructions here](/platform/tutorial/workflow/add-assembly-line).

### Running all tasks on node

* Update your `runSh` job with the tag `runtime:container: false` to run all TASKS on the node directly.

```
jobs:
 ## Job description:
 ## - single task running on Host
 - name: host_all_tasks
   type: runSh
   runtime:
     container: false
   steps:
     - TASK:
         name: check_host_OS
         script:
           - echo "Checking OS of the host"
           - uname -a
     - TASK:
         name: next_task
         script:
           - echo "Hello world"          
```

With the config above, both TASKS `check_host_OS` and `next_task` will execute on the node.

* Commit the changes above to **shippable.yml**. This will automatically update your existing workflow. If this is a brand new workflow, you can add your config to Shippable by following [instructions here](/platform/tutorial/workflow/add-assembly-line).
