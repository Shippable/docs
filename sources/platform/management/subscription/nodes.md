page_main_title: Subscriptions Nodes
main_section: Platform
sub_section: Management
sub_sub_section: Subscription
page_title: Subscription Nodes - Shippable DevOps Assembly Lines
page_description: Configuration of Runtime Nodes for your Jobs that run as part of Shippable DevOps Assembly Lines Platform
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# Subscription Nodes

For an in-depth description of types of nodes available for your jobs, please read the [Runtime->Nodes docs](/platform/runtime/nodes).

You can view and manage your nodes from the **Subscription->Settings->Nodes** page.

## Viewing your nodes

You can view all the currently active nodes in your Subscription by following the steps below:

* Click on the Subscription in the left navbar.

<img src="/images/getting-started/account-settings.png" alt="Add Account Integration">

* On the Subscription page, click on the **Gears** icon and click on **Nodes**. In the **NODE LISTS** section, you can view the list of currently active nodes.

<img src="/images/platform/visibility/subscription-nodes-view.jpg" alt="Subscription Nodes view for Shippable DevOps Assembly Lines" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

<img src="/images/platform/management/subscription-nodes-system.png" alt="Subscription Nodes view for Shippable DevOps Assembly Lines" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

Please note that if you're using Shippable [On-demand Nodes](/platform/runtime/nodes/#dynamic-nodes/), you will only see active nodes, if any. For BYON nodes, they will always be shown here since they are always on and available.

If your subscription is using System nodes, you will see active nodes only if system nodes are enabled on admin panel. You can still switch to [On-demand Nodes](/platform/runtime/nodes/#dynamic-nodes/) or BYON Nodes for your subscription. But you cannot move your subscription to System Nodes by your self.


## Managing nodes

You do not need to manage Shippable provided [On-demand Nodes](/platform/runtime/nodes/#dynamic-nodes/), since the platform does everything for you automatically. However, you can choose a specific Machine Image to make sure the node has the versions you need for languages/services/CLIs/etc. To learn more about this, read our [Machine image document](/platform/runtime/ami/ami-overview)

To manage BYON nodes, please read the [Using BYON Nodes document](/platform/tutorial/runtime/custom-nodes/)
