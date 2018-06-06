page_main_title: Scheduling workflows to trigger at a specific time
main_section: Platform
sub_section: Workflow
sub_sub_section: Tutorials

# Scheduling workflows to trigger at a specific time

In addition to event-driven triggers, you can also schedule your jobs/workflows to trigger at a specific time of day or day of week. This is achieved through the [`time` resource](/platform/workflow/resource/time).

The `time` resource gives you cron options, which is a standard format [explained here](https://en.wikipedia.org/wiki/Cron). Please remember that triggering a job in a workflow will also cause downstream jobs, if any, to be triggered.

<img src="/images/platform/tutorial/workflow/scheduled-triggers-fig-1.png" alt="Scheduling job triggers">

For example, if you set **job-2** to be triggered at a specific time as shown in the image above, **job-3** and **job-4** will trigger in sequence as expected. **job-5** will not be triggered since there is an approval gate between **job-3** and **job-5**. **job-1** will not be triggered since it is not part of the downstream workflow.


## Instructions

* Identify the job in your workflow that you want to trigger at a specific time.

* Define a time resource in your **shippable.yml**:

```
resources:
  - name: trigger_job1  # name your resource
    type: time
    versionTemplate:
      interval: "*/2 * * * *" #This follows standard cron format. This particular config will trigger job every 2 mins  
```
* Configure this resource as an `IN` to the job you want to trigger:

```
jobs:
  - name: job1
    type: runSh
    steps:
      - IN: trigger_job1
      - TASK:
          name: print_hello_world
          script:
            - echo "Hello world"    
```

* Commit the changes above to **shippable.yml**. This will automatically update your existing workflow to include the time trigger. If this is a brand new workflow, you can add your config to Shippable by following [instructions here](/platform/tutorial/workflow/add-assembly-line).
