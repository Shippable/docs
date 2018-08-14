page_main_title: Working with Integrations
main_section: Platform
sub_section: Tutorials
sub_sub_section: Integrations
page_title: Working with Integrations - DevOps Assembly Line Integrations
page_description: How to add, delete and update Integrations
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# Managing Account integrations

An Account integration is owned by the user who creates it in their Shippable account. No other person can view the values for these integrations or update them, other than the owner. Account integrations can be scoped to be used across several subscriptions (i.e. Github organizations or Bitbucket teams) that you have access to.

In order to use your integration in your CI or Assembly Line workflow configuration, you need to set scope for the account integration to include the repository that contains the **shippable.yml**.

<a name="view-account-integrations"></a>
## Account integration dashboard

You can manage Account integrations in one place by going to your Account Integration dashboard.

- In the left navbar, select **Integrations**. You will see a list of your Account integrations.

<img src="/images/platform/tutorial/integrations/account-integration-dashboard.png" alt="Subscription integrations">

## Creating an account integration

- From your [Account integration dashboard](#view-account-integrations), click on **+** icon at the top right.

<img src="/images/platform/tutorial/integrations/create-account-integration.png" alt="Account integrations">

- Give your integration a friendly name. 

- Choose the right **Integration type**, depending on what you're trying to configure. Complete all fields and click on **Save**. For instructions on how to complete the fields for a specific integration, go to the [Integrations overview doc](/platform/integration/overview/) and select the specific third-party integration you're configuring.

- Please note that while creating the integration, **you will need to specify which Subscriptions and/or Projects have access to it**. This automatically creates a Subscription integration on your behalf and you can then start using the integration in your **shippable.yml** for CI and Assembly Lines config.

## Further Reading
* [Managing subscription integrations](/platform/tutorial/integration/subscription-integrations)
* [Workflow configuration](/platform/workflow/config)
