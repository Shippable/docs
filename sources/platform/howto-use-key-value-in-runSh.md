page_main_title: Share data between Jobs
main_section: Platform
sub_section: Tutorials
sub_sub_section: Jobs
page_title: Share data between Jobs

The best way to create an isolated set of credentials for use with Shippable Pipelines is to create a Kubernetes Service Account, and set up a kubeconfig file that utilizes it.

##Using your integration in Shippable Pipelines

In order to utilize this type of integration in your pipeline, you will need to create an [integration resource](../platform/workflow/resource/integration).  It should look like this:

```
resources:
  - name: aws-kv-integration-resource  # a name for the resource itself
    type: integration
    integrationName: my-key-value-integration #this is the name you gave your integration

```

Now you can use this resource as an `IN` to your [runSh](../platform/workflow/job/runsh) or [runCLI](../platform/workflow/job/runcli) job.  If you do that, your key/value pairs will be available directly in the shell environment, so you can utilize them in your custom scripts.  This works well with command line tools that look in the environment for configuration options, such as the AWS CLI.

This integration type isn't used for any managed pipeline jobs at this time.