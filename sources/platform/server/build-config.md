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

You need nodes to run your jobs. The configuration for these is under the under **Build Plane** section.

We support the following types of nodes:

* **Shared nodes** are available for all subscriptions and projects across your installation and are always ON and waiting to pick up triggered jobs. These nodes can be anywhere, i.e. on any cloud or your own data center.
* **BYON nodes** are added at a subscription level and are always ON and waiting to pick up triggered jobs. By default, any admin of a Subscription can add BYON nodes. These nodes can be anywhere, i.e. on any cloud or your own data center.
* **On-demand nodes** are spun up when a job is triggered and spun down if no new job is triggered after some idle time. These are the most cost-effective in terms of infrastructure costs since they are not always ON, but are spun up on-demand. We currently support AWS EC2 and GCE for On-demand nodes.

You need at least one node type enabled in order to run jobs on Shippable Server. The node type you choose depends on your organization's policy.

By default, **Shared Nodes** and **BYON Nodes** are enabled when you run Admiral for the first time.

You can enable or disable node types as needed, but **you always need one node type enabled to run jobs**.

<img src="/images/platform/tutorial/server/buildplane-1.png">

### Shared nodes

Shared nodes are available for all subscriptions and projects across your installation and are always ON and waiting to pick up triggered jobs. These nodes can be anywhere, i.e. on any cloud or your own data center.

By default, shared nodes are enabled for a Shippable Server installation. You will need to create a shared node pool and add one or more nodes in order to run jobs.

#### **Adding shared nodes**

Log in to Shippable with a [super user account](/platform/server/install-onebox/#5-setup-superuser) and follow [these steps](/platform/server/install-onebox/#6-create-a-shared-node-pool-to-run-builds) to create a shared node pool and add nodes to it.

Repeat these steps for the number of shared node pools and nodes that you want to add.

#### **Disable shared nodes**

You can choose to disable shared nodes by toggling the **Enable shared node pools** option. When disabled, your shared nodes will not be used to run any jobs. You will need to click **Save & Restart Services** after making your choice.

### BYON nodes

BYON nodes are added at a subscription level and are always ON and waiting to pick up triggered jobs. By default, any admin of a Subscription can add BYON nodes. These nodes can be anywhere, i.e. on any cloud or your own data center.

By default, BYON nodes are enabled for a Shippable Server installation. You will need to add one or more nodes in a subscription in order to run jobs.

#### **Adding a BYON node**

Instructions to add BYON nodes are explained here: [Adding BYON nodes](/platform/tutorial/runtime/manage-byon-nodes/).

By default, all super users or Subscription owners can add BYON nodes to a Subscription. If you want to restrict addition of BYON Nodes to super users, check the **Restrict BYON node creation to admins only** checkbox in the Admiral UI.

To set up BYON nodes, sign in to Shippable Server and [follow instructions here](/platform/tutorial/runtime/manage-byon-nodes/).

#### **Disable BYON nodes**

You can choose to disable BYON nodes by toggling the **Enable BYON node pools** option. When disabled, your BYON nodes will not be used to run any jobs.

You will need to click **Save & Restart Services** after making your choice.

### On-demand Nodes

On-demand nodes are spun up when a job is triggered and spun down if no new job is triggered after some idle time. These are the most cost-effective in terms of infrastructure costs since they are not always ON, but are spun up on-demand. We currently support AWS EC2 and GCE for On-demand nodes.

Please note that nodes on AWS need 2-4 minutes to be spun up, so you will have to live with that overhead for some builds when a fresh node needs to be spun up.

To enable **On-demand nodes**:

* In the Admiral UI, click on `Build plane` in the left navbar, expand `On Demand Node Pools` panel and toggle the "Enable AWS on-demand node pools" or "Enable Google Cloud on-demand node pools" depending on which node provider you would like to use.
* Enter your node provider credentials. We accept an Access Key ID and Secret Access Key for AWS, and a JSON key for GCE.
* You must now add **System Machine Images** to configure the AMIs or GCE families that will be launched when an on-demand node needs to be spun up.
* On-demand nodes can also be cached to help with improving build times:
    - **Node cache interval** determines how long an on-demand node will stay idle before being cached
    - **Day of week when cached nodes are stopped** determines the default day of the week when a cached node will be terminated. This setting can be overridden for each node pool.
    - **Node stop interval** determines the default number of days after which a cached node will be terminated. This setting can be overridden for each node pool.
* Your settings are effective after clicking on **Save & Restart Services** for the **Build plane** section.

## Settings

You can configure some settings for your Shippable Server installation through the Admiral UI.

### Default node pool for new subscriptions

The **Default node pool created for a subscription** dropdown lets you define which type of node pool will be created for new subscriptions that get added to Shippable.

For **Shared** and **BYON** nodes, pick a `custom` node pool type.

Pick a `dynamic` node pool type only if you have configured **On-demand** node pools and want to use it as the default for new subscriptions.

### Maximum time between node status checks

All Shippable nodes establish a regular heartbeat with the Shippable server. This setting allows you to configure the interval after which a node will be considered unhealthy. The default is **15 minutes**.

### Default build timeout

The **Default build timeout** input lets you set the default timeout value for your jobs in milliseconds. The default for this is 3600000ms = 1 hour.

### Default number of minions per subscription

This setting sets the number of nodes every Subscription will have by default. It is set to 1 by default.

### Allowed system image family

This specifies which image family is used as standard build images. By default, this is the drydock family and our legacy image minv2. **Do not change this setting since it might lead to unpredictable behavior**.

### Job console

Users can view consoles for their jobs as they are in progress and after they are complete. You can set the batch size and buffer time interval for job consoles through your Admiral UI, which is offered as a setting to help tweak console performance.

**Do not change these settings unless you are advised to do so by Shippable's customer success team.**

The **Job console buffer time interval** is the amount of time in milliseconds that we wait to receive a batch of console output. If we do not receive the batch size at the end of the buffer time interval, we will output whatever we have to the console.

### Auto-select the token used to run webhook builds

When a job is triggered, we need a token to clone your repository to the build machine, get the commit SHA, etc. This setting determines whether we can auto-select a suitable token from any user in your organization in order to perform these tasks.

When **checked**, your jobs will trigger for every webhook, as long as we can find one user token across your organization that can be used for your job. This is our **recommended setting**.
You can select a specific user whose token will be used through the [**Webhook config** section of your project settings](/platform/management/project/settings/#webhook-config).  

When **unchecked**, the only users who can trigger your jobs are people who have access to the source control repository and have signed in to Shippable Server. If a user's token is invalid, their build will fail.

### Limit number of builds allowed for private repos

This setting limits the number of jobs that can be triggered for private repositories within a Subscription every month. You do not need to set this for your Server installation.
