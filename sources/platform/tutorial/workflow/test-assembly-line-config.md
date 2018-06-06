page_main_title: Testing Assembly Line config
main_section: Platform
sub_section: Workflow
sub_sub_section: Tutorials

# Testing your Assembly Line configuration

Since your workflow configuration is all written as code in **shippable.yml**, it is best to test it and visually see the workflow that will be created, before actually adding it to Shippable.

The **Dry Run** feature allows you to do exactly this.

## Instructions

* Go to your Subscription page by clicking on it in the left navigation bar.

* Click on the **Eye** icon at the top right of your Subscription page and select **Dry Run** from the dropdown menu.

<img src="/images/platform/tutorial/workflow/test-assembly-line-config-dry-run.png" alt="Test your DevOps Assembly Line" style="width:700px;"/>

* Select the repository and branch where your **shippable.yml** config is stored.

<img src="/images/platform/tutorial/workflow/test-assembly-line-config-select-repo.png" alt="Test your DevOps Assembly Line" style="width:700px;"/>

* Click on **Show** to see your workflow visually.

<img src="/images/platform/tutorial/workflow/test-assembly-line-config-view-dry-run.png" alt="Test your DevOps Assembly Line" style="width:700px;"/>

If there is a problem with your configuration, we will show you an error or warning so that you can correct them.

Please note the following:

* The Dry Run feature is not supported for pull requests today, so you will not be able to visually preview results of a pull request that changes workflow configuration. We're working on this.

* We support resource sharing across Assembly Lines in the same Subscription. If any of your jobs reference resources or jobs (in the IN, OUT, NOTIFY sections) that are not defined in the config that is being tested, these jobs/resources will still be shown in the Dry Run view for completeness.
