page_main_title: Configuring Chatops with Slack
main_section: Platform
sub_section: Tutorials
sub_sub_section: Integrations
page_title: Configuring Chatops with Slack
page_description: How to configure Chatops in Slack for using with Shippable

Chatops allow controlling Shippable Assembly Lines from Chat applications used by teams. Currently Shippable supports chatops via [Slack](https://slack.com/) and this document explains how to configure and use it.

## Configuring Slack app for Chatops

Following steps are involved in configuring Chatops in Slack to communicate with Shippable.

####1. Create a Slack app

Visit [Slack Apps page](https://api.slack.com/apps) and click the button to create new app.

<img src="/images/platform/tutorial/integrations/chatops-create-slack-app-1.png" alt="Create Slack App">
<img src="/images/platform/tutorial/integrations/chatops-create-slack-app-2.png" alt="Create Slack App">

####2. Configure Slash Command

Visit "Slash Commands" page under the "Features" section present on the sides of the Slack app page, that we just created.

<img src="/images/platform/tutorial/integrations/chatops-create-slash-command-1.png" alt="Visit Slash Command">

Create New command by filling in the required details. Request URL points to an API endpoint in Shippable and should be of the below format.

```
https://API_ENDPOINT/passthrough/chatops?apiToken=API_TOKEN&subscriptionId=SUBSCRIPTION_ID&type=slack
```
- **API_ENDPOINT** - If you are using Hosted SaaS, replace this with `api.shippable.com`. If you are using [Shippable Server](https://www.shippable.com/enterprise.html) instead of Hosted SaaS, use the respective API domain name.
- **API_TOKEN** - Replace this by [generating an API Token in Shippable](/platform/management/account/api-tokens/#api-tokens)
- **SUBSCRIPTION_ID** - Replace this with the ID of the subscription that you would like to manage from Slack. The Subscription ID of a subscription could be found at the bottom right of the subscription page.

<img src="/images/platform/tutorial/integrations/chatops-create-slash-command-2.png" alt="Create Slash Command">

Press "Save Changes".

####3. Configure Interactive Components

Visit "Interactive Components" page under the "Features" section present on the sides of the Slack app page.

<img src="/images/platform/tutorial/integrations/chatops-create-interactive-component-1.png" alt="Visit Interactive Components">

Turn On Interactivity if it is turned off and configure the Request URL and this will point to the same API endpoint in Shippable, passing an additional request parameter `command=interactiveResponse`. So, it will be of the below format

```
https://API_ENDPOINT/passthrough/chatops?apiToken=API_TOKEN&subscriptionId=SUBSCRIPTION_ID&type=slack&command=interactiveResponse
```

- **API_ENDPOINT** - If you are using Hosted SaaS, replace this with `api.shippable.com`. If you are using [Shippable Server](https://www.shippable.com/enterprise.html) instead of Hosted SaaS, use the respective API domain name.
- **API_TOKEN** - Replace this by [generating an API Token in Shippable](/platform/management/account/api-tokens/#api-tokens)
- **SUBSCRIPTION_ID** - Replace this with the ID of the subscription that you would like to manage from Slack. The Subscription ID of a subscription could be found at the bottom right of the subscription page.

<img src="/images/platform/tutorial/integrations/chatops-create-interactive-component-2.png" alt="Create Interactive Components">

Press "Save Changes".

####4. Install App

After performing the above 3 configuration steps, visit "Install App" page under the "Settings" section present on the sides of the Slack app page.

<img src="/images/platform/tutorial/integrations/chatops-install-slack-app.png" alt="Install Slack App">

Click "Install App to Workspace" and install the app in your workspace.

## Usage

After configuring and installing the slack app, `/shippable` slack command will be available in your workspace. The slash command has the following syntax.

```
/shippable <command> <args>
```

Various available commands are
- triggerJob
- getJobsByFlags

#### triggerJob
Triggers a job in Shippable assembly lines. It has three different syntaxes.

```
/shippable triggerJob <job-name>
```
Triggers the job in the Shippable Assembly Lines.

```
/shippable triggerJob <job-name> <env value>
```
In the above syntax, the job will be triggered with an environment variable called SHIPPABLE_TRIGGER_DETAIL which has <env value> as its value.

```
/shippable triggerJob <job-name> { "foo": "bar" }
```
In the above syntax, the job will be triggered with environment variables taken from the JSON key value pairs.


#### getJobsByFlags

Gets the list of jobs by one or more flags names.

```
/shippable getJobsByFlags <flag-name>
/shippable getJobsByFlags <flag-name-1> <flag-name-2>
```

This returns the list of jobs belonging the the flags supplied in the slash command, along with few options shown below.

<img src="/images/platform/tutorial/integrations/chatops-slack-get-jobs.png" alt="Get jobs by flags">
