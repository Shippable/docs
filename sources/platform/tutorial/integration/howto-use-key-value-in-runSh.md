page_main_title: Using a Key-Value Pair Integration in runSh
main_section: Platform
sub_section: Tutorials
sub_sub_section: Integrations
page_title: Using a Key-Value Pair Integration in runSh - DevOps Assembly Line Integrations
page_description: How to use a key-value pair integration in a runSh job

##Using your integration in Shippable Pipelines

In order to utilize this type of integration in your pipeline, you will need to create an [integration resource](/platform/workflow/resource/integration).  It should look like this:

```
resources:
  - name: aws-kv-integration-resource  # a name for the resource itself
    type: integration
    integrationName: my-key-value-integration #this is the name you gave your integration

```

Now you can use this resource as an `IN` to your [runSh](/platform/workflow/job/runsh) or [runCI](/platform/workflow/job/runci) job.  If you do that, your key/value pairs will be available directly in the shell environment, so you can utilize them in your custom scripts.  This works well with command line tools that look in the environment for configuration options, such as the AWS CLI.

This integration type isn't used for any managed pipeline jobs at this time.
