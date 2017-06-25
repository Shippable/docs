page_main_title: Key-value
main_section: Reference
sub_section: Integrations
page_title: Key-value integration

# Key-value pair integration

A key-value pair integration is a custom integration where you can give any key-value pairs. You can use it in your ci or pipeline jobs. These key-values will be available as environments variables to you.

##Adding your Key-Value Pair integration

- Click on Integrations in the left sidebar menu followed by the '+' icon in the **Account Integrations** panel.

<img width="75%" height="75%" src="../../images/reference/integrations/account-settings.png" alt="Add Key-Value pair credentials">

- Select **generic** as the Integration family.
- Choose **Key-Value pair** from the list of integration types.
- Name your integration and enter your key-value pairs
- Choose the Subscription which contains the repository for which you want to use this integration
- Click **Save**

<img src="../../images/reference/integrations/key-value-integration.png" alt="Add Key-Value pair credentials">

##Editing your Key-Value pair integration

Click on **Integrations** in the left sidebar menu and then click on your integration. You can then change integration name,  update keys or values and add or delete key-value pairs.

##Deleting your Key-Value pair integration

If you no longer need the integration, you can delete it by following the steps below.

- Click on **Integrations** in the left sidebar menu, and click on your integration.
- Scroll to the bottom of the page and click on the **Delete** button.
- If there are no Subscriptions using this integration, you will be able to delete it by clicking on **Yes**. You are done at this point.

<img width="50%" height="50%" src="../../images/reference/integrations/confirm-delete-integration.png" alt="Delete integration confirmation screen">

- If your integration is being used by any Subscriptions, you will see a message telling you which Subscriptions are still using the integration.

<img width="50%" height="50%" src="../../images/reference/integrations/cannot-delete-integration.png" alt="Cannot delete integration because of dependencies">

- Go to each Subscription listed in the dependencies and delete it from each.
    - Locate your subscription in the left sidebar menu and click on the dependent Subscription.

    <img width="30%" height="30%" src="/images/reference/integrations/list-subscriptions.png" alt="List subscriptions">

    - Click on the **gears** icon and then on **Integrations**.
    - Click on the integration and the **Delete** button.
    - Delete the integration.
- Once you have deleted the integration from all Subscriptions, you can go back to your integration and delete the integration.

##Using your integration in Shippable CI

Adding the integration to your CI workflow is quite simple.  Just update your `shippable.yml` file, adding an "integrations" section like this:
```
integrations:  # this section can contain several different types of integrations
  generic:     # k/v pair should be under the 'generic' header
    integrationName: my-key-value-integration # whichever name you chose for your integration
```

Now when your CI runs, your key/value pairs will be exported as shell environment variables.

##Using your integration in Shippable Pipelines

In order to utilize this type of integration in your pipeline, you will need to create an [integration resource](../reference/resource-integration).  It should look like this:

```
resources:
  - name: aws-kv-integration-resource  # a name for the resource itself
    type: integration
    integrationName: my-key-value-integration #this is the name you gave your integration

```

Now you can use this resource as an `IN` to your [runSh](../reference/job-runsh) or [runCLI](../reference/job-runcli) job.  If you do that, your key/value pairs will be available directly in the shell environment, so you can utilize them in your custom scripts.  This works well with command line tools that look in the environment for configuration options, such as the AWS CLI.

This integration type isn't used for any managed pipeline jobs at this time.
