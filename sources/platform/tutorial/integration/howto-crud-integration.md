page_main_title: Working with Integrations
main_section: Platform
sub_section: Tutorials
sub_sub_section: Integrations
page_title: Working with Integrations - DevOps Assembly Line Integrations
page_description: How to add, delete and update Integrations
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# Working with Integrations

Shippable DevOps Platform uses Integrations to abstract secrets/configs away from the actual DevOps scripts. It is usually used to connect to 3rd party resources likes a gitRepo, cloud providers, store PEM keys and so on. They enable you to

* secure and centralized management of your DevOps secrets
* manage permissions and roles at a project level to control who can use what integrations
* connect your DevOps Assembly to almost any external 3rd party provided services

## Creating an Integration

Creating an integration is a two step process. All Integrations are owned by users who can then allow specific Subscriptions or Projects to use them.

<img width="75%" height="75%" src="/images/platform/integrations/account-integrations-explained.png" alt="Account integrations">


###1. Adding an integration to your account

- Click on **Integrations** in your left sidebar menu. This will show you a list of your integrations.
- Click on **+** to add a new integration.

<img width="75%" height="75%" src="/images/platform/tutorial/integrations/add-account-integration.png" alt="Account integrations">

- Choose the right **Integration type**, depending on what you're trying to configure. Complete all fields and click on **Save**. For instructions on how to complete the fields for a specific integration, go to the [Integrations overview doc](/platform/integration/overview/) and select the specific third-party integration you're configuring.

- Please note that while creating the integration, **you will need to specify which Subscriptions have access to it**. This is a very important step and if you miss it, you will not be able to use it in your yml files in a repository in that Subscription.

###2. Using the integration in your yml

Once an integration is enabled for a Subscription, you can use it in any project in that Subscription with a few lines of yml configuration. **Please note that the integration name in your yml should be same as the one configured in your integration.**

Integrations can be configured in the `integrations` section of your **shippable.yml** if you're [configuring CI](/ci/yml-structure), or in the `resources` section of your **shippable.yml** if you're [configuring an Assembly Line](/platform/workflow/resource/integration/).

## Adding integration to a subscription

Follow the steps to go to the create subscription integration page:

- In the **Subscriptions** section of your left navbar, click on the Subscription you need.
- Click on the **Settings (Gear)** icon and click on **Integrations** in the dropdown.
- Click on the **+** button on the top right

<img width="75%" height="75%" src="/images/platform/tutorial/integrations/add-subscription-integration-view.png" alt="default subscription integration">

There are two types of subscription integration.
- Subscription integration at account level
- Subscription integration at subscription level

An account level subscription integration is a way for you to allow a subscription to use one of your own account integrations. The same account integration can be reused in multiple subscriptions this way, but only you will be able to edit the integration's values.

<img width="75%" height="75%" src="/images/platform/tutorial/integrations/using-acc-int.png" alt="subscription integration at account level">

When you create a subscription integration at subscription level, you can choose to allow other owners, collaborators or members of the subscription to edit the integration's values. However, such integrations are local to a subscription and cannot be shared across different subscriptions.

<img width="75%" height="75%" src="/images/platform/tutorial/integrations/edit-permissions.png" alt="subscription integration at subscription level">

- If you want to restrict usage of the integration to specific projects, choose the Project(s). You can just leave it at *All projects* to let all projects in the Subscription use it.
- Click on **Save**. Please note that the name of your integration in your Subscription Settings should be used when referring to this integration in your `yml` files.

## Updating a Subscription integration's underlying account integration

What happens when someone on your team creates integrations in their account, and then leaves the team or company? We wanted to make sure you don't have to go edit all your configuration files in this scenario.

Follow the steps below for each integration that needs to be updated. You need to be an owner of the Subscription in your source control.

- Create an account integration

- In the **Subscriptions** section of your left navbar, click on the Subscription you need.

- Click on the **Settings (Gear)** icon and click on **Integrations** in the dropdown.

- Locate the integration you want to replace and click on it

- In the **Account integrations** dropdown, select the integration you want to use.

<img width="75%" height="75%" src="/images/platform/tutorial/integrations/swap-account-integrations.png" alt="List subscriptions">


## Further Reading
* [Working with Resources](/platform/tutorial/workflow/crud-resource)
* [Working with Jobs](/platform/tutorial/workflow/crud-job)
