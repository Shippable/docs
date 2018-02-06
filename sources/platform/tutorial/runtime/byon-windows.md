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

* Click on the Subscription in the left navbar.

<img src="/images/getting-started/account-settings.png" alt="Add Account Integration">

* On the Subscription page, click on the **Gears** icon and click on **Nodes**. In the **NODE LISTS** section, you can view the list of currently active nodes.

<img src="/images/platform/management/subscription-nodes-list.png" alt="Subscription Nodes view for Shippable DevOps Assembly Lines" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

BYON nodes will always be shown here since they are always on and available.

<a name="add-node"></a>
## Adding new nodes

You can add a new node by clicking the `+` icon on the top right corner of **NODE LIST** panel.

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

* The node shows a **New version available** message:

<img src="/images/platform/tutorial/runtime/node-update-available.png" alt="List nodes">

* You made some changes to the node manually and it is no longer picking up jobs
* The node isn't picking up jobs and seems 'frozen' for some reason

To re-initialize a node:

- From your Dashboard, click on Subscriptions in the left sidebar menu and click on your subscription.
- Click on the **Gears icon** on the Subscription page and then on **Nodes**.
- Click on the node in the **NODE LISTS** section.
- Click on the node you want to reinitialize.
- You can reset a node by clicking on the **Re-initialize** button, followed by downloading and running the new initialization script
on your node manually. This action will initialize/install all build components from scratch.

<a name="delete-node"></a>
##Deleting a build node

- From your Dashboard, click on Subscriptions in the left sidebar menu and click on your subscription.

<img width="30%" height="30%" src="/images/platform/integrations/list-subscriptions.png" alt="List nodes">

- Click on the **gear icon** on the Subscription page and then on **Nodes**.
- Click on the node in the **NODE LISTS** section.
- Scroll to the bottom of the screen and click on **Delete** to delete your build node. This action is final and cannot be undone.

## Initialization scripts
All the scripts for initializing the nodes are are publicly available [here](https://github.com/Shippable/node). We update this repository consistently to fix any bugs and to add support for new operating systems.
