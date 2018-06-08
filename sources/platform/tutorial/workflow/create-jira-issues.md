page_main_title: Creating Jira issues
main_section: Platform
sub_section: Tutorials
sub_sub_section: Workflow

# Creating Jira issues

If you are using Jira for issue tracking and project management, you can create Jira issues from within the Shippable UI to report bugs. You can also attach job logs to help with debugging.

This ability is available for both CI jobs and pipeline jobs.

## Setup

* Sign in to your Jira account using using your credentials. Create an api token from the **API tokens** tab.

* Create an account integration in Shippable UI with your API token information. Instructions to add an account integration are [here](/platform/tutorial/integration/howto-crud-integration/#creating-an-integration). For help with completing the account integration input fields for a specific provider, refer to the [Jira integration document](/platform/integration/jira). Make sure you provide scopes for your integration to include the organization you want to open issues for.

##Instructions  

You can create Jira issues for [runCI](/platform/workflow/job/runci) and [runSh](/platform/workflow/job/runsh) jobs by following the steps below:

* Complete the **Setup** step before following rest of the instructions below.

* On the Job Console page, click on the **Create issue** link on the Summary page. If your build is a matrix, you will see this link on the **Summary** tab of the Build page.

  <img width="100%" height="100%" src="/images/ci/jira-issue-link-runSh.png" alt="create Jira issue link for runSh jobs"/>

* Clicking on that link will open a modal window. Enter the required information.
    * **Subscription integration:** select the appropriate Jira subscription integration..
    * **Project:** Select the Jira project from the dropdown for which you want to link your Jira issue.
    * **Issue type:** Select the Jira issue type from the dropdown. Currently we support `Bug`, `Story` and `Task` issue types.
    * **Summary:** In the summary section, give a brief summary about your issue.
    * **Description:** In the description section, add the description about your issue.
    * **Attach Console logs:** For matrix CI jobs, you can **Attach All**, **Unsuccessful** or **None** of the logs. For non-matrix CI and runSh jobs, you can select the checkbox if you want to attach console logs to your Jira ticket.

        <img width="100%" height="100%" src="/images/ci/jira-issues-modal.png" alt="Creating Jira issues"/>

* Click on **Save** to create your issue. After this step, the **Create issue** link will be replaced by a link to your Jira ticket. Clicking this link will open the ticket in a new tab.

  <img width="100%" height="100%" src="/images/ci/jira-issue-link-created.png" alt="created Jira issue link on summary page"/>
