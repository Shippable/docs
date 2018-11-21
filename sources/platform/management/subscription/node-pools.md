page_main_title: Subscription Node Pools
main_section: Platform
sub_section: Management
sub_sub_section: Subscription
page_title: Subscription Node Pools - Shippable DevOps Assembly Lines
page_description: Configuration of Node Pools for your Jobs that run as part of Shippable DevOps Assembly Lines Platform
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc, NAT, whitelist, static IP

# Subscription node pools

Node Pools provide a convenient way to logically group the [Nodes](/platform/runtime/overview/#nodes) in a subscription. Any number of node pools can be created for a subscription as long as they follow these rules:

- A node pool can have either [On-demand nodes](/platform/runtime/nodes/#on-demand-nodes) or [BYON nodes](/platform/runtime/nodes/#byon-nodes)
- [On-demand nodes](/platform/runtime/nodes/#on-demand-nodes) are
  automatically added to the node pool when they are provisioned
- [BYON nodes](/platform/runtime/nodes/#byon-nodes) need to be added manually to the node pool
- All nodes in a node pool must have same architecture and operating system. For instance, a node pool
  cannot have a nodes of type macOS 10.12 and Windows Server 2016
- The number of nodes of each type that can be added for a node pool is limited by the [billing plans](/platform/management/subscription/billing) available for the subscription

## Viewing subscription node pools
You can view all the currently active node pools in your Subscription by following the steps below:

* Click on the Subscription in the left navbar.

<img src="/images/getting-started/account-settings.png" alt="View Subscriptions">

* On the Subscription page, click on the **Gears** icon and click on **Node Pools**.

* On the Node Pools page, the first panel lists the licenses that have been
  purchased for the subscription. It also provides a short usage summary of the
  licenses.
<img src="/images/platform/management/subscription-node-pools-license.png" alt="Subscription Node Pools view for Shippable DevOps Assembly Lines" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

* On the Node Pools page, the second panel lists all the existing Node Pools
  available for the subscription.
<img src="/images/platform/management/subscription-node-pools-list.png" alt="Subscription Node Pools view for Shippable DevOps Assembly Lines" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>


## Managing node pools

### Creating a node pool
You can create a new node pool by clicking on the `+` icon on top right corner
of the Node Pools page. This will open the **ADD NODE POOL** page.

<img src="/images/platform/management/subscription-node-pools-add.png" alt="Subscription Node Pools add for Shippable DevOps Assembly Lines" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

* Selecting **Set as default** will set the node pool as the default node pool
  for the subscription. All jobs that do not explicitly define
  which node pool to use, will run on nodes of the default node pool

* **TYPE** can be either [BYON](/platform/runtime/nodes/#byon-nodes) or [On Demand](/platform/runtime/nodes/#on-demand-nodes)

* **Architecture** can be either `x86_64` or `aarch64`

* **OS** is the list of operating systems supported for BYON nodes for the
  selected **Architecture**. For a list of supported OS and architecture
  combinations, refer to the documentation on [Nodes](/platform/runtime/nodes/)

* **Runtime Version** defines the default version of Shippable Machine Images that will be used to run the jobs. You can choose a specific Machine Image to make sure the build nodes have the versions you need for languages/services/CLIs/etc. To learn more about this, read our [Machine image document](/platform/runtime/machine-image/ami-overview/).

* **Node Count** is the number of nodes that can be added to the node pool. The
  upper limit is set by the number of licenses that are available at the
  subscription level for the type of selected node pool

* **Max Disk Usage Percentage** is the maximum disk usage after which the build nodes will be marked as failed. This setting is available only for BYON node pools. For BYON node pools if the max disk usage percentage is empty, system defined value is used (default 90%).  For dynamic node pools, system level maximum disk usage percentage is always used.

* **Timeout** is the maximum time(in minutes) after which you want your CI or runSh jobs to  timeout. This timeout is used when your [CI project](/platform/management/project/settings/) or [runSh job](/platform/workflow/job/runsh/) do not have any timeout specified. If this is also not provided then timeout set at [Subscription](/platform/management/subscription/settings/) level or default will be used, in that order. Default value for timeout is 60 minutes for free users and 120 minutes for paid users.

* **Enable Static IP** will cause all the traffic from the nodes in this pool to be routed through a static public IP address. This is useful if you need to be able to whitelist an IP address to allow network traffic from your on-demand nodes. [Read more](#using-static-ip-to-whitelist-traffic-from-on-demand-nodes).

### Updating node pools
You can edit any node pool by clicking on the `Edit` button the node pool
header. This will take you to the **Edit Node Pool** page.

<img src="/images/platform/management/subscription-node-pools-edit.png" alt="Subscription Node Pools view for Shippable DevOps Assembly Lines" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

* Selecting **Set as default** will set the node pool as the default node pool
  for the subscription. All jobs that do not explicitly define
  which node pool to use, will run on nodes of the default node pool

* **Architecture**, **OS** and **Machine Size** (for On-demand nodes only) fields cannot be
  edited for a node pool. A new node pool should be created with different values
  for these fields if required

* **Runtime Version** defines the default version of Shippable Machine Images that will be used to run the jobs. You can choose a specific Machine Image to make sure the build nodes have the versions you need for languages/services/CLIs/etc. To learn more about this, read our [Machine image document](/platform/runtime/machine-image/ami-overview/).

* **Node Count** is the number of nodes that can be added to the node pool. The
  upper limit is set by the number of licenses that are available at the
  subscription level for the type of selected node pool

* **Timeout** is the maximum time(in minutes) after which you want your CI or runSh jobs to  timeout. This timeout is used when your [CI project](/platform/management/project/settings/) or [runSh job](/platform/workflow/job/runsh/) do not have any timeout specified. If this is also not provided then timeout set at [Subscription](/platform/management/subscription/settings/) level or default will be used, in that order. Default value for timeout is 60 minutes for free users and 120 minutes for paid users.

* **Enable Static IP** will cause all the traffic from the nodes in this pool to be routed through a static public IP address. This is useful if you need to be able to whitelist an IP address to allow network traffic from your on-demand nodes. [Read more](#using-static-ip-to-whitelist-traffic-from-on-demand-nodes).

### Adding nodes to node pools
* [On-demand nodes](/platform/runtime/nodes/#on-demand-nodes) automatically get
added to the node pool when they're provisioned. For creating node pools
containing On-demand nodes, no additional steps are required.

* [BYON nodes](/platform/runtime/nodes/#byon-nodes) need to be manually added
  to the node pools when creating them. Refer to the documentation on [BYON nodes](/platform/runtime/nodes/#byon-nodes) for steps to add new nodes.

### Removing nodes from node pools
* To remove [On-demand nodes](/platform/runtime/nodes/#on-demand-nodes), simply
  edit the node pool and reduce the `Node Count`. The node pool will then have
  only the new node count as the maximum limit for the nodes it can provision.

* To remove [BYON nodes](/platform/runtime/nodes/#byon-nodes) from node pools,
  delete individual nodes from their respective node pools. Refer to the documentation on [BYON nodes](/platform/runtime/nodes/#byon-nodes) for steps to delete nodes.

### Using static IP to whitelist traffic from on-demand nodes
Knowing the IP addresses of the build machines Shippable uses can be helpful when you need them to whitelist specific IP ranges so that build nodes can freely talk to machines/tools within your VPC or network. You can use static IP in your subscription by [creating a node pool](#creating-a-node-pool) with Static IP enabled or [enabling Static IP](#updating-node-pools) in existing node pools.

* You will not be able to run [debug builds](/ci/ssh-access/#how-do-i-start-a-debug-build) on jobs that run in a node pool with static IP enabled.

* This feature is only available for on-demand node pools on paid subscriptions.
