page_main_title: Setting job timeouts
main_section: Platform
sub_section: Workflow
sub_sub_section: Tutorials

# Setting job timeouts

You can set custom timeouts for CI(`runCI`) and `runSh` jobs. Managed job types like `deploy`, `manifest`, etc have internal logic for timeouts which cannot be configured in a custom fashion.

Default timeout values for CI and `runSh` jobs is 60 minutes for free Subscriptions, and 120 mins for paid Subscriptions.

To set timeouts for your CI jobs, please refer to our CI documentation on [setting timeouts](/ci/custom-timeouts/).

The instructions below show you how to set a custom timeout value for `runSh` jobs.

## Instructions

* Before you start, determine the timeout value you want to set in minutes. For free Subscriptions, the timeout value can be any number between 1-60 minutes, and for paid Subscriptions, it can be any number between 1-120 minutes.

* Update your job configuration in **shippable.yml** to define a `runtime` section and `timeoutMinutes` key:

```
jobs:
  - name: prod_deploy
    type: runSh
    runtime:                        
      timeoutMinutes: 30  # Set this to the number of minutes you want               
    steps:
      - TASK:
          name: print_hello_world
          script:
            - echo "Hello world"
```

* Commit the changes above to **shippable.yml**. This will automatically update your existing workflow to include the timeout value. If this is a brand new workflow, you can add your config to Shippable by following [instructions here](/platform/tutorial/workflow/add-assembly-line).
