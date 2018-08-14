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

<img src="/images/getting-started/account-settings.png" alt="Add Integration">

* On the Subscription page, click on the **Gears** icon and click on **Nodes**. In the **NODE LISTS** section, you can view the list of currently active nodes.

<img src="/images/platform/management/subscription-nodes-list.png" alt="Subscription Nodes view for Shippable DevOps Assembly Lines" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

Please note that if you're using Shippable [On-demand Nodes](/platform/runtime/nodes/#dynamic-nodes/), you will only see active nodes, if any. For BYON nodes, they will always be shown here since they are always on and available.

## Adding new nodes

You can add a new node by clicking the `+` icon on the top right corner of **NODE LIST** panel.

* Since every node should be part of a [Node Pool](/platform/management/subscription/node-pools), you need to select which node pool will the new node be a part of.

    * for On-demand Nodes, the only configuration needed is the node pool name
<img src="/images/platform/management/subscription-nodes-add-on-demand.png" alt="Subscription Nodes view for Shippable DevOps Assembly Lines" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

    * for BYON Nodes, you need to select, the Docker version, name, IP address
      and a few other options
<img src="/images/platform/management/subscription-nodes-add-byon.png" alt="Subscription Nodes view for Shippable DevOps Assembly Lines" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>


## Managing nodes

You do not need to manage Shippable provided [On-demand Nodes](/platform/runtime/nodes/#dynamic-nodes/), since the platform does everything for you automatically.
To manage BYON nodes, please read the [Using BYON Nodes document](/platform/tutorial/runtime/manage-byon-nodes/)
