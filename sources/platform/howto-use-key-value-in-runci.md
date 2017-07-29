page_main_title: Share data between Jobs
main_section: Platform
sub_section: Tutorials
sub_sub_section: Jobs
page_title: Share data between Jobs

The best way to create an isolated set of credentials for use with Shippable Pipelines is to create a Kubernetes Service Account, and set up a kubeconfig file that utilizes it.

##Using your integration in Shippable CI

Adding the integration to your CI workflow is quite simple.  Just update your `shippable.yml` file, adding an "integrations" section like this:
```
integrations:  # this section can contain several different types of integrations
  generic:     # k/v pair should be under the 'generic' header
    integrationName: my-key-value-integration # whichever name you chose for your integration
```

Now when your CI runs, your key/value pairs will be exported as shell environment variables.