page_main_title: Adding an Assembly Line
main_section: Platform
sub_section: Workflow
sub_sub_section: Tutorials

# Adding an Assembly Line to Shippable

Your entire workflow configuration lives in a YAML-based file called **shippable.yml**. You can find the configuration reference [here](/platform/workflow/config).

The Assembly Line part of the configuration are the `jobs` and `resources` sections. You need to add your config to Shippable, so that we can read these sections of the config and create your workflows.

## Instructions

* First, add an integration for the source control provider where your sync repository is located. Instructions are here for different providers:
     - [GitHub](/platform/integration/github/)
     - [GitHub Enterprise](/platform/integration/github-enterprise/)
     - [Bitbucket](/platform/integration/bitbucket/)
     - [GitLab](/platform/integration/gitlab/)

* Go to your Subscription's page on Shippable. A list of all available Subscriptions can be accessed by clicking on the **Subscriptions** menu in your left navigation bar:

<img width="30%" height="30%" src="/images/platform/resources/syncRepo/list-subscriptions.png" alt="List of subscriptions">

* On the top-right corner, click on the `+` icon(`Enable Projects or Add syncRepo`).
* On the **Enable** page, in the **ENABLE CI PROJECTS AND SYNC REPOSITORY** section, click on `+` button in the **Add Assembly Line** column of the repository where your config is stored. This will open a modal window.

<img src="/images/platform/tutorial/workflow/add-syncRepo.png" alt="Add a syncRepo">

* Complete the form:
     * **Subscription Integration** dropdown shows the integration you created in the first step. If not, you will need to go through the flow of adding the integration.
     * **Branch** dropdown shows all the branches for the above selected repository. Select the branch that contains your workflow configuration files.
     * Name your sync repository with an easy to remember name.
     * **Default Flag** checkbox is checked by default. When this is checked a default flag is added to all the resources and jobs in this Assembly Line.
     * Click on **Save** to add your Assembly Line.

At this point, Shippable automatically creates two things:

* A `syncRepo` resource pointing to the repository containing your configuration. We also add webhooks to this repository to detect any changes in config.
* An `rSync` job which parses your configuration and creates your workflows. The `rSync` job is triggered automatically whenever the `syncRepo` changes, so that your workflows are always in sync with your config.  

You can see the syncRepo and rSync job in the Single Pane of Glass (click on the `Eye` icon on the top-right corner on your Subscription page  and choose `Show SPOG view`):

<img src="/images/platform/resources/syncRepo/syncRepo-flag.png" alt="syncRepo flag">
