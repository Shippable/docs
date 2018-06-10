page_main_title: Running job on specific node pool
main_section: Platform
sub_section: Tutorials
sub_sub_section: Workflow

# Running jobs on a specific node pool

By default, all jobs run on your [default node poo](/platform/management/subscription/node-pools/).

If you want to run your `runSh` job on a specific pool, you can configure this in your **shippable.yml**. The common reasons for this are:

* Your runSh job is resource intensive, so you want to use a specific node pool which has bigger machines
* You want to run the job on Mac OS, Windows, or CentOS and hence want to select a specific node pool
* You want to run some jobs on a specific pool for security reasons

## Instructions

* Update your **shippable.yml** as shown below:

```
jobs:

  - name: run_on_big_pool
    type: runSh
    runtime:                 
      nodePool: bigNodePool  # Specify your node pool name
    steps:
      - TASK:
          script:
            - echo "Hello world"
```

The value for the `nodePool` tag above has to exactly match the pool name in your [Subscription Settings](/platform/management/subscription/node-pools/).

* Commit the changes above to **shippable.yml**. This will automatically update your existing workflow. If this is a brand new workflow, you can add your config to Shippable by following [instructions here](/platform/tutorial/workflow/add-assembly-line).
