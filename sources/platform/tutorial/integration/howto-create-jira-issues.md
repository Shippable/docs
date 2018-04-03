page_main_title: Creating Jira issues
main_section: CI
sub_section: Creating Jira issues
page_title: Creating Jira issues
page_description: Using Jira integration on Shippable to create issues for Jira projects
page_keywords: Jira, Continuous Integration, Continuous Deployment, CI/CD, testing, automation

#Creating Jira issues

You can create Jira issues from your builds and runs page and also attach logs for debugging.

##Setup

Before you start, you will need to specify your Jira account credentials in a [Jira account integration](/platform/integration/jira) so that Shippable can create tickets in your Jira server on your behalf.

Steps to add a Jira integration:

####1. Generate a Jira API token

1. Sign in to your Jira account using using your credentials.
2. Create an api token from the `API tokens` tab.

####2. [Create a Jira Account Integration](/platform/integration/jira).

##Basic config

Once you have completed the Setup, you will need to create a subscription integration for the Jira account subscription .

#### Creating Jira issues for [runCI](/platform/workflow/job/runci) and [runSh](/platform/workflow/job/runch) jobs

You can create Jira issues for your runCI and runSh jobs, for this you need to follow these steps

* Make sure your subscription has access to a Jira integration.
* Go to the console page of your runCI job for which you want to create a Jira issue.
* You will see a `Create issue` link on the Summary page for matrix runCI and on the consoles page for a non-matrix runCI job.
  <img width="75%" height="55%" src="/images/ci/jira-issue-link-runCi.png" alt="create Jira issue link for runCI jobs"/>
  <img width="75%" height="55%" src="/images/ci/jira-issue-link-runSh.png" alt="create Jira issue link for runSh jobs"/>
* Clicking on that link will open a modal for you. In this modal you will need to input all the required information.
    * **Subscription integration:** select the appropriate Jira subscription integration..
    * **Project:** Select the Jira project from the dropdown for which you want to link your Jira issue.
    * **Issue type:** Select the Jira issue type from the dropdown. Currently we support `Bug`, `Story` and `Task` issue types.
    * **Summary:** In the summary section, give a brief summary about your issue.
    * **Description:** In the description section, add the description about your issue.
    * **Attach Console logs:** For matrix runCI jobs, you can attachAll,UnsuccessfulorNoneof the logs. For non-matrix runCI and runSh jobs, you can select the checkbox if you want to attach console logs to your Jira ticket.

        <img width="55%" height="55%" src="/images/ci/jira-issues-modal.png" alt="Creating Jira issues"/>

* Click on Save after filling in all the fields. Thereafter, the create issue link will get replaced by a link to your Jira ticket created on your Jira server. Clicking this link will open the ticket in a new tab.
  <img width="75%" height="55%" src="/images/ci/jira-issue-link-created.png" alt="created Jira issue link on summary page"/>

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
