page_main_title: Windows BYON Nodes
main_section: Platform
sub_section: Tutorials
sub_sub_section: Runtime
page_title: Windows BYON Nodes

# Windows BYON nodes

To learn the basics of BYON nodes, please read [this overview](/platform/runtime/nodes/#custom-nodes).

This tutorial page shows you how to attach/delete your Windows BYON nodes to Shippable, as well as perform periodic maintenance on them.

* [Minimum requirements](#requirements)
* [Viewing nodes](#view-nodes)
* [Adding a node](#add-node)
* [Deleting a node](#delete-node)

<a name="requirements"></a>
## Minimum requirements
The minimum requirements for a Windows BYON type node that can be attached to Shippable are:

* 4GB RAM
* 60GB SSD
* Supported architecture, OS and Docker versions for Windows

|Architecture|OS|Docker Version|
|---|---|---|
|x86_64|Windows Server 2016 (Version 1607)|17.06|


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

* The **Docker version** dropdown allows you to pick the version of Docker that will be installed on your node. Windows nodes are currently only supported on Docker 17.06 EE.

* Enter a name for the node and its IP address.

<img src="/images/platform/management/subscription-nodes-add-byon-manual-windows.png" alt="Add new Windows node" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

* Windows nodes require manual initialization. To generate and run the initialization scripts,
    * Click on **Generate initialization scripts** to generate the script.
    * Click on **Download scripts** to download. Copy it to your build machine.
    * Install tar and gzip on the node
        * Download and install [GNU tar](http://gnuwin32.sourceforge.net/downlinks/tar-bin.php)
        * Download and install [GNU gzip](http://gnuwin32.sourceforge.net/downlinks/gzip.php)
        * By default, they are installed to "C:\Program Files (x86)\GnuWin32\bin", so add "C:\Program Files (x86)\GnuWin32\bin" to the machine's PATH
    * Enable Windows Containers by running `Install-WindowsFeature containers` in PowerShell
    * Restart the node
    * Update Windows Firewall rules to enable incoming TCP connections on port 2375. This is to allow the build runner to communicate with the Docker daemon running on the host.
    * Run the initialization script that you copied to this machine earlier
    * After the script runs to completion, check the **I have run this script on my node successfully** and then click on the **Save** button.

Once you add your first build node, all subsequent builds for that subscription
will run on your machines. Your nodes can be seen by going to your Subscription Settings and clicking on **Nodes** in the left sidebar menu.

<a name="reset-node"></a>
## Re-initializing a node

You might want to re-initialize a BYON node for the following reasons:

* An updated version is available for the build agent. This is indicated by a red exclamation icon in the `Build Agent Version` column of the Node.
* You made some changes to the node manually and it is no longer picking up jobs
* The node isn't picking up jobs and seems 'frozen' for some reason

To re-initialize a node:

- On the Subscription page, click on the **Gears** icon and click on **Node Pools**.

<img width="30%" height="30%" src="/images/platform/management/node_pool_option.png" alt="Node pools option"/>

- Right below the `LICENSES` panel, you can see all your `On Demand` and `BYON` nodes in their respective **Node Pools**.

<img src="/images/platform/management/subscription-nodes-list.png" alt="Subscription Nodes view for Shippable DevOps Assembly Lines" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

- Click on the node you want to reinitialize.
- You can reset a node by clicking on the **Re-initialize** button, followed by downloading and running the new initialization script on your node manually. This action will initialize/install all build components from scratch.

<a name="delete-node"></a>
##Deleting a build node

- From your Dashboard, click on Subscriptions in the left sidebar menu and click on your subscription.

<img width="30%" height="30%" src="/images/platform/integrations/list-subscriptions.png" alt="List nodes">

- Click on the **gear icon** on the Subscription page and then on **Node Pools**. All your nodes can be seen right below the `LICENSES` panel in their respective Node pool.
- Click on the node you want to delete.
- Scroll to the bottom of the screen and click on **Delete** to delete your build node. This action is final and cannot be undone.

## Initialization scripts
All the scripts for initializing the nodes are are publicly available [here](https://github.com/Shippable/node). We update this repository consistently to fix any bugs and to add support for new operating systems.
