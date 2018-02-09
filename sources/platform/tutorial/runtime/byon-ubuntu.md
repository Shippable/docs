page_main_title: Ubuntu BYON nodes
main_section: Platform
sub_section: Tutorials
sub_sub_section: Runtime
page_title: Ubuntu BYON nodes overview

# Ubuntu BYON Nodes

To learn the basics of BYON nodes, please read [this overview](/platform/runtime/nodes/#custom-nodes).

This tutorial page shows you how to attach/delete your Ubuntu BYON nodes to Shippable, as well as perform periodic maintenance on them.

* [Minimum requirements](#requirements)
* [Viewing nodes](#view-nodes)
* [Adding a node](#add-node)
* [Re-initializing a node](#reset-node)
* [Deleting a node](#delete-node)

<a name="requirements"></a>
## Minimum requirements
The minimum requirements for a Ubuntu BYON type node that can be attached to Shippable are:

* 1.8GB RAM
* 30GB SSD
* Supported architecture, OS and Docker versions for Ubuntu

|Architecture|OS|Docker Version|
|---|---|---|
|x86_64|Ubuntu 14.04|1.9|
|x86_64|Ubuntu 14.04|1.11|
|x86_64|Ubuntu 14.04|1.13|
|x86_64|Ubuntu 14.04|17.06|
|x86_64|Ubuntu 16.04|1.13|
|x86_64|Ubuntu 16.04|17.06|
|aarch64|Ubuntu 16.04|17.06|

<a name="view-nodes"></a>
## Viewing your nodes

You can view all the currently active nodes in your Subscription by following the steps below:

* From your Dashboard, click on Subscriptions in the left sidebar menu and click on your subscription.

<img width="30%" height="30%" src="/images/platform/integrations/list-subscriptions.png" alt="List nodes">

* On the Subscription page, click on the **Gears** icon and click on **Node Pools**.

<img width="30%" height="30%" src="/images/platform/management/node_pool_option.png" alt="Node pools option"/>

* Right below the `LICENSES` panel, you can see all your `On Demand` and `BYON` nodes in their respective **Node Pools**.

<img src="/images/platform/management/subscription-nodes-list.png" alt="Subscription Nodes view for Shippable DevOps Assembly Lines" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

<a name="add-node"></a>
## Adding new nodes

You can add a new node by clicking the `Add node` button on the top right corner of your Node Pool panel.

<img src="/images/platform/management/subscription-nodes-list.png" alt="Subscription Nodes view for Shippable DevOps Assembly Lines" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

* Since every node should be part of a [Node Pool](/platform/management/subscription/node-pools), you need to select which node pool will the new node be a part of. Read [Node Pool](/platform/management/subscription/node-pools) documentation to learn how to create node pools

* Click on the **Docker version** dropdown and select the version you want installed on your nodes. Please note that the list of available versions is populated based on the type of OS and architecture of the node pool

* Enter a name for the node and its IP address.
<img src="/images/getting-started/byon-name-ip.png" alt="Enter name and IP">

* You can choose to initialize the build host through Shippable or run the initialization scripts yourself. Initialization through Shippable requires you to grant SSH access, so if you do not want to grant that for any reason, select the radio button for `Manual (script based)`

* To initialize the node through Shippable,
    * Enter the SSH port for your build host. This is usually port 22, but is configurable.
    * Choose whether you want to enable swap space on your machine.
    * Copy the command shown and run it on your build host. This will create a
    shippable user on your host and allow us to run initialization scripts on
    your machine.
    * Check the checkbox to confirm that you have run the command on your machine
    and click on `Initialize`
    * You will be redirected to a page showing you the console log as your machine
    is initialized.
    * When your node is ready, the status indicator for the node will turn green. Your node is now ready to pick up builds for your projects.
<img src="/images/platform/management/subscription-nodes-add-byon.png" alt="Subscription Nodes view for Shippable DevOps Assembly Lines" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

* To run the initialization scripts yourself,
    * Choose whether you want to enable swap space on your machine.
    * Click on **Generate initialization scripts** to generate the script.
    * Click on **Download scripts** to download. Copy it to your build machine and
    run them.
    * Check the **I have run this script on my node successfully** and then click
    on the **Save** button.
    * Your node status will automatically show green at this point. We have no way
    of verifying that the node was in fact successfully initialized so you will
    need to make sure this was the case.

Once you add your first build node, all subsequent builds for that subscription
will run on your machines. Your nodes can be seen by going to your Subscription Settings and clicking on **Nodes** in the left sidebar menu.

<a name="reset-node"></a>
## Re-initializing a node

You might want to re-initialize a BYON node for the following reasons:

* An updated version is available for the build agent. This is indicated by a red exclamation icon in the `Build Agent Version` column of the Node.
* You made some changes to the node manually and it is no longer picking up jobs
* The node isn't picking up jobs and seems 'frozen' for some reason

To re-initialize a node:

- From your Dashboard, click on Subscriptions in the left sidebar menu and click on your subscription.
- Click on the **Gears icon** on the Subscription page and then on **Nodes**.
- Click on the node in the **NODE LISTS** section.
- Click on the node you want to reinitialize.
- You can reset a node by clicking on the **Re-initialize** button. This action will initialize/install everything from scratch.

If your nodes were not initialized automatically by Shippable, you will need to re-download the initialization script and run it on your node manually.

<a name="delete-node"></a>
##Deleting a build node

- From your Dashboard, click on Subscriptions in the left sidebar menu and click on your subscription.

<img width="30%" height="30%" src="/images/platform/integrations/list-subscriptions.png" alt="List nodes">

- Click on the **gear icon** on the Subscription page and then on **Node Pools**. All your nodes can be seen right below the `LICENSES` panel in their respective Node pool.
- Click on the node you want to delete.
- Scroll to the bottom of the screen and click on **Delete** to delete your build node. This action is final and cannot be undone.

## Initialization scripts
All the scripts for initializing the nodes are are publicly available [here](https://github.com/Shippable/node). We update this repository consistently to fix any bugs and to add support for new operating systems.
