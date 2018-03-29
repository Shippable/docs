page_main_title: Creating JIRA issues
main_section: CI
sub_section: Creating JIRA issues
page_title: Creating JIRA issues
page_description: Using JIRA integration on Shippable to create issues for JIRA projects
page_keywords: jira, Continuous Integration, Continuous Deployment, CI/CD, testing, automation

#Creating JIRA issues

You can create JIRA issues from your builds and runs page and also attach logs for debugging.

##Setup

Before you start, you will need to connect your Jira account with Shippable so we have the credentials to create issues on your behalf. We do this through [Account Integrations](../platform/integration/overview/), so that any sensitive information is abstracted from your config file. Once you add an account integration, you can add it to different subscriptions for creating issues.

There are 2 steps to add a Jira integration: Generating an API token for Jira, , and adding the token to your Shippable account.

###1. Generate a Jira API token

1. Sign in to your Jira account using using your credentials.
2. Create an api token from the `API tokens` tab.

###2. Add the Jira integration to your Account

* Go to your **Account Settings** by clicking on the gear menu in the top navbar.
* Click on **Integrations** in the sidebar menu.
* Click on **Add Integration**.
* Enter the following:
  * In the **Master Integration** dropdown, choose **Jira**  
  * Add a friendly name for your integration.
  * In the **Url** field, enter your Jira site url.
  * In the **Username** field, enter your username/email.
  * In the **Token** field, paste the Jira token.
* Click on **Save**. You should now see the integration in your list of integrations.

##Basic config

Once you have completed the Setup steps, you are ready to create issues for your Jira projects from Shippable UI.
To enable any subscription to create Jira issues you should first create a Jira subscription integration for that subscription using the Jira account integration you have already added.

#### Creating Jira issues for [runCI](/platform/workflow/job/runci) jobs

You can create Jira issues for your runCI jobs, for this you need to follow these steps

* Make sure your subscription has access to a Jira integration.
* Go to the console page of your runCI job for which you want to create a Jira issue.
* You will see a `Create issue` link on the Summary page for matrix runCI and on the consoles page for a non-matrix runCI job.
* Clicking on that link will open a modal for you. Here in this modal you need to input all the required info:
    * **Subscription integration:** Select the correct subscription integration having access to your Jira site.
    * **Project:** Select the jira project from the dropdown for which you want to link your Jira issue.
    * **Issue type:** Select the jira issue type from the dropdown. Currently we support `Bug`, `Story` and `Task` issue types.
    * **Summary:** In the summary section give a brief summary about your issue.
    * **Description:** In the description section add the description about your issue.
    * **Attach Console logs:** In case of matrix jobs you can select if you want to attach `All` , `Unsuccessful` or `None` of the logs. For non-matrix job you can select the checkbox if you want to attach console logs with your Jira issue. 

        <img width="55%" height="55%" src="/images/ci/jira-issues-modal.png" alt="Creating jira issues"/>

* Now after filling all the details if you click on `Save` modal will go away and create issue link will get replaced by link of your new Jira issue, clicking this link will open you Jira issue in a new tab.

#### Creating Jira issues for [runSh](/platform/workflow/job/runsh) jobs

You can create Jira issues for your runSh jobs, for this you need to follow these steps

* Make sure your subscription has access to a Jira integration.
* Go to the builds page of your runSh job for which you want to create a Jira issue.
* You will see a `Create issue` link on the consoles page of your job.
* Clicking on that link will open a modal for you. Here in this modal you need to input all the required info:
    * **Subscription integration:** Select the correct subscription integration having access to your Jira site.
    * **Project:** Select the jira project from the dropdown for which you want to link your Jira issue.
    * **Issue type:** Select the jira issue type from the dropdown. Currently we support `Bug`, `Story` and `Task` issue types.
    * **Summary:** In the summary section give a brief summary about your issue.
    * **Description:** In the description section add the description about your issue.
    * **Attach Console logs:** You can select the checkbox if you want to attach console logs with your Jira issue.

        <img width="55%" height="55%" src="/images/ci/jira-issues-modal-runSh.png" alt="Creating jira issues"/>

* Now after filling all the details if you click on `Save` modal will go away and create issue link will get replaced by link of your new Jira issue, clicking this link will open you Jira issue in a new tab.






## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
