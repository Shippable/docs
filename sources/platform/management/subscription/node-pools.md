page_main_title: Subscriptions Node Pools
main_section: Platform
sub_section: Management
sub_sub_section: Subscription
page_title: Subscription Node Pools - Shippable DevOps Assembly Lines
page_description: Configuration of Node Pools for your Jobs that run as part of Shippable DevOps Assembly Lines Platform
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# Subscription node pools

Node Pools provide a convenient way to logically group the [Nodes](http://localhost:5555/platform/runtime/overview/#nodes) in a subscription. Any number of node pools can be created for a subscription as long as they follow these rules:

- a node pool can have either [On-demand nodes](platform/runtime/nodes/#on-demand-nodes) or [BYON nodes](platform/runtime/nodes/#byon-nodes)
- [On-demand nodes](platform/runtime/nodes/#on-demand-nodes) are
  automatically added to the node pool when they're provisioned
- [BYON nodes](platform/runtime/nodes/#byon-nodes) need to be added manually to the node pool
- all nodes in a node pool must have same architecture and operating system. For instance, a node pool
  cannot have a nodes of type macOS 10.12 and Windows Server 2016
- the number of nodes of each type that can be added for a node pool is limited by the [billing plans](/platform/management/subscription/billing) available for the subscription

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


* The header for each Node Pool provides useful information about it. This
  includes: Whether the node pool is set to default for the subscription,
  operating system, architecture, name of the node pool, version of Shippable
  agent running on the nodes of the node pool and the type of nodes in the node
  pool: BYON or On-Demand
<img src="/images/platform/management/subscription-node-pools-header.png" alt="Subscription Node Pools view for Shippable DevOps Assembly Lines" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

## Managing node pools
You can edit any node pool by clicking on the `Edit` button the node pool
header. This will take you to the `Edit Node Pool` page.

<img src="/images/platform/management/subscription-node-pools-edit.png" alt="Subscription Node Pools view for Shippable DevOps Assembly Lines" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

* Selecting `Set as default` will set the node pool as the default node pool
  for the subscription. All jobs that do not explicitly define
  which node pool to use, will run on nodes of the default node pool.

* Architecture, OS and Machine Size (for On-demand nodes only) fields cannot be
  edited for a node pool. A new node pool should be created with different values
  for these fields if required.

* Runtime Version defines the default version of Shippable build images that will be
  used to run the jobs.

* Node Count is the number of nodes that can be added to the node pool. The
  upper limit is set by the number of licenses that are available at the
  subscription level for the type of selected node pool.

