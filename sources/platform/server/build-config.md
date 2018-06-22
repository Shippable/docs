page_main_title: Shippable Server | Build configuration
main_section: Shippable Server
sub_section: Configuration
page_title: Build configuration | Shippable Server
page_description: Configuring builds for Shippable Server
page_keywords: install, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc, vault

# Shippable Server builds

You can configure system wide job execution settings through the Admiral UI.


## Caching

You can choose whether you want to allow your end-users to cache their job dependencies to speed up build times. Shippable Server uses AWS to store cache information, so you will need to grant access to your AWS account if you want to enable caching.

To learn more about the benefits of caching, go [here](/platform/runtime/caching/#caching).

You can turn on caching by following the steps below:

* Click on the **Add-ons** panel.
* Expand the `OTHERS` panel.
* Toggle on the `Enable build artifact caching using AWS S3`.
* Enter your AWS Access and Secret Keys.

<img src="/images/platform/tutorial/server/addons-caching.png">

To turn caching off, toggle off the **Enable build artifact caching using AWS S3** option. When caching is turned off, all yml configuration under the `cache` section is ignored.

## Choosing node type(s)

You need nodes to run your jobs. The configuration for these is under the **BUILD CONFIGURATION->Nodes** section under **Build Plane**.

We support the following types of nodes:

* **System nodes** are available for all subscriptions and projects across your installation and are always ON and waiting to pick up triggered jobs. These nodes can be anywhere, i.e. on any cloud or your own data center.
* **Custom nodes** are added at a subscription level and are always ON and waiting to pick up triggered jobs. By default, any admin of a Subscription can add Custom(a.k.a BYON) nodes. These nodes can be anywhere, i.e. on any cloud or your own data center.
* **On-demand nodes** are spun up when a job is triggered and spun down if no new job is triggered after some idle time. These are the most cost-effective in terms of infrastructure costs since they are not always ON, but are spun up on-demand. We currently support only AWS EC2 for On-demand nodes.

You need at least one node type enabled in order to run jobs on Shippable Server. The node type you choose depends on your organization's policy

By default, **System Nodes** and **Custom Nodes** are enabled when you run Admiral for the first time.

You can enable or disable node types as needed, but **you always need one node type enabled to run jobs**.

<img src="/images/platform/tutorial/server/buildplane-1.png">

### System nodes

System nodes are available for all subscriptions and projects across your installation and are always ON and waiting to pick up triggered jobs. These nodes can be anywhere, i.e. on any cloud or your own data center.

By default, system nodes are enabled for a Shippable Server installation. You will need to add one or more nodes in order to run jobs.

#### **Adding a system node**

To add system nodes, follow the instructions below:

* Log in to Shippable with a super user account
* From the Shippable Server UI, click on **Admin** in the left navbar and click on **Nodes** and then on **System**.
* Click on **+** at the top right

<img src="/images/platform/tutorial/server/system-nodes.png" alt="Admiral-2-server">

* Follow instructions to add a node. You can follow guidelines [described at Step 6 onwards on the Add a node page](/platform/tutorial/runtime/custom-nodes/#adding-a-build-node)

* Repeat these steps for the number of system nodes you want to add.

#### **Disable system nodes**

You can choose to disable system nodes by unchecking the **Enable system nodes (always-running nodes, available to any user)**. When disabled, your system nodes will not be used to run any jobs. You will need to click **Install** after making your choice.

### Custom nodes

Custom nodes are added at a subscription level and are always ON and waiting to pick up triggered jobs. By default, any admin of a Subscription can add BYON nodes. These nodes can be anywhere, i.e. on any cloud or your own data center.

By default, Custom nodes are enabled for a Shippable Server installation. You will need to add one or more nodes in order to run jobs.

#### **Adding a Custom node**

Instructions to add BYON nodes are explained here: [Adding BYON nodes](/platform/tutorial/runtime/custom-nodes/).

By default, all super users or Subscription owners can add BYON nodes to a Subscription. If you want to restrict addition of BYON Nodes to super users, check the **Restrict BYON node creation to admins only** checkbox in the Admiral UI.

To set up Custom nodes, sign in to Shippable Server and [follow instructions here](/platform/tutorial/runtime/custom-nodes/).

#### **Disable Custom nodes**

You can choose to disable Custom nodes by unchecking the **Enable custom nodes (users can attach always-running nodes to their subscription)**. When disabled, your Custom nodes will not be used to run any jobs.

You will need to click **Save & Restart Services** after making your choice.

### On-demand Nodes

On-demand nodes are spun up when a job is triggered and spun down if no new job is triggered after some idle time. These are the most cost-effective in terms of infrastructure costs since they are not always ON, but are spun up on-demand. We currently support only AWS EC2 for On-demand nodes.

Please note that nodes on AWS need 2-4 minutes to be spun up, so you will have to live with that overhead for some builds when a fresh node needs to be spun up.

To enable **On-demand nodes**:

* In the Admiral UI, click on `Build plane` in the left navbar, expand `BUILD CONFIGURATION` panel and check the **Enable dynamic nodes** checkbox
* Enter your AWS Access and Secret keys.
* Choose the default node size. Our default setting is `c4.large`.
* You can leave the other settings as-is.
* Your settings are effective after clicking on **Save & Restart Services** for the **Build plane** section.

## Settings

You can configure some settings for your Shippable Server installation through the Admiral UI.

### Default build timeout

The **Default build timeout** input lets you set the default timeout value for your jobs in milliseconds. The default for this is 3600000ms = 1 hour.

### Default number of minions per subscription

This setting sets the number of nodes every Subscription will have by default. It is set to 1 by default.

### Allowed system image family

This specifies which image family is used as standard build images. By default, this is the drydock family and our legacy image minv2. **Do not change this setting since it might lead to unpredictable behavior**.

### Job console

Users can view consoles for their jobs as they are in progress and after they are complete. You can set the batch size and buffer time interval for job consoles through your Admiral UI, which is offered as a setting to help tweak console performance.

**Do not change these settings unless you are advised to do so by Shippable's customer success team.**

There are two settings for job console: **Job console batch size** and **Job console buffer time interval**

The job console batch size sets the number of lines which are output to the console as a batch. The Job console buffer time interval is the amount of time in ms that we wait to receive a batch of console output. If we do not receive the batch size at the end of the buffer time interval, we will output whatever we have to the console.

### Auto-select the token used to run webhook builds

When a job is triggered, we need a token to clone your repository to the build machine, get the commit SHA, etc. This setting determines whether we can auto-select a suitable token from any user in your organization in order to perform these tasks.

When **checked**, your jobs will trigger for every webhook, as long as we can find one user token across your organization that can be used for your job. This is our **recommended setting**.
You can select a specific user whose token will be used through the [**Webhook config** section of your project settings](/platform/management/project/settings/#webhook-config).  

When **unchecked**, the only users who can trigger your jobs are people who have access to the source control repository and have signed in to Shippable Server. If a user's token is invalid, their build will fail.

### Limit number of builds allowed for private repos

This setting limits the number of jobs that can be triggered for private repositories within a Subscription every month. You do not need to set this for your Server installation.  
