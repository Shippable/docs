page_main_title: Inserting approval gates in your CD workflows
main_section: Platform
sub_section: Workflow
sub_sub_section: Tutorials

# Inserting approval gates in your CD workflows

Your CI/CD workflows can be configured to be automatically triggered from start to finish, or to have one or more approval gates, where the workflow waits for manual input to continue. A great example of this is if you want your CI/Test/Staging workflows to be automatic, but want gated production deployments.

<img src="/images/platform/tutorial/workflow/insert-approval-gate-fig-1.png" alt="Scheduling job triggers">

This tutorial shows you how to "stop" your workflows at any point and require manual intervention to get trigger the downstream workflow.

## Instructions

* Identify the job where you want an approval gate. Also identify the input resource(s) or job(s) which should not automatically trigger the job.

* In the job config in **shippable.yml**, add a `switch` flag to the inputs where you want an approval gate:

```
jobs:
  - name: prod_deploy
    type: runSh
    steps:
      - IN: staging_deploy
        switch: off
      - TASK:
          name: print_hello_world
          script:
            - echo "Hello world"            
```

* Please note that if you have multiple `IN` resources or jobs and you don't want any of them to trigger `prod_deploy`, you will need to add `switch: off` for all of them.

* Commit the changes above to **shippable.yml**. This will automatically update your existing workflow to include the approval gate(s). If this is a brand new workflow, you can add your config to Shippable by following [instructions here](/platform/tutorial/workflow/add-assembly-line).
