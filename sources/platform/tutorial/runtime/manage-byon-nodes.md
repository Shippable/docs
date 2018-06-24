page_main_title: Managing BYON nodes
main_section: Platform
sub_section: Tutorials
sub_sub_section: Runtime

# BYON nodes

Shippable supports two node types:

* [On demand](/platform/runtime/nodes/#on-demand-nodes) nodes that are provided by Shippable
* [BYON nodes](/platform/runtime/nodes/#byon-nodes) that are provided by you and can be inside your VPC

The main reasons for choosing BYON are usually the following:

* You don't want your source code to leave your firewall and/or infrastructure for security reasons
* Your jobs need access to dependencies that cannot be accessed from outside your network
* You want complete control over your build infrastructure
* You are running jobs on platforms that are not natively supported with on-demand nodes, such as MacOS.

## Supported platforms

We currently support the following platforms for BYON nodes:

|Architecture|OS|Docker Version|
|---|---|---|
|x86_64|CentOS 7|17.06|
|x86_64|macOS 10.12|17.06|
|x86_64|Ubuntu 14.04|1.9|
|x86_64|Ubuntu 14.04|1.11|
|x86_64|Ubuntu 14.04|1.13|
|x86_64|Ubuntu 14.04|17.06|
|x86_64|Ubuntu 16.04|1.13|
|x86_64|Ubuntu 16.04|17.06|
|aarch64|Ubuntu 16.04|17.06|
|x86_64|Windows Server 2016|17.06|


<a name="manage-nodes"></a>
## Managing BYON nodes

The sections below cover the following actions for BYON nodes:

* [Adding a node](#add-node)
* [Viewing list of nodes](#view-nodes)
* [Re-initializing a node](#reset-node)
* [Troubleshooting nodes](#troubleshoot-node)
* [Deleting a node](#delete-node)

<a name="add-node"></a>
### Adding a BYON node

Before you add a BYON nodes, you need to buy a BYON node license(s). To do this, please follow instructions in the [Managing your plan document](/platform/management/subscription/billing/#upgrade-or-downgrade-your-plan). You will be able to add BYON nodes up to the license count for your Subscription.

You can try out BYON nodes for free by deleting the free On-demand node from your plan, and adding one BYON license with the **Enable unlimited private repo builds** option unchecked as shown below:

<img src="/images/platform/tutorial/runtime/manage-byon-nodes-fig1.png" alt="Adding a free node to Shippable" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

Follow the steps below to add a new node:

* From the left navigation bar, choose the Subscription for which you want to add a node.

* Click on the **Gears** menu, and choose **Node pools**. This will take you to a list of your node pools.

<img src="/images/platform/tutorial/runtime/manage-byon-nodes-fig4.png" alt="Adding a free node to Shippable" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

* You will need to select which node pool you want to add your nodes to. Click on the node pool name to go to the node pool page. **Do not click** on the **Edit** button, since that will take you to the node pool options.

List of node pools:
<img src="/images/platform/tutorial/runtime/manage-byon-nodes-fig2.png" alt="Adding a free node to Shippable" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

Node pool page:
<img src="/images/platform/tutorial/runtime/manage-byon-nodes-fig3.png" alt="Adding a free node to Shippable" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

* To add a node,click on the **+ Add node** button on the top right corner of your Node Pool panel.

<img src="/images/platform/management/subscription-nodes-list.png" alt="Add a BYON node" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

* On the **Add node pool** page, click on the **Docker version** dropdown and select the version you want installed on your nodes. Please note that the list of available versions is populated based on the type of OS and architecture of the node pool. Enter the following information: node friendly name, IP address, and whether you want to enable swap space.

<img src="/images/platform/tutorial/runtime/manage-byon-nodes-fig5.png" alt="Adding a free node to Shippable" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

* You can choose to initialize the build host through Shippable or run the initialization scripts yourself. Initialization through Shippable requires you to grant SSH access, so if you do not want to grant that for some reason, select the radio button for **Manual (script based)**

* To initialize the node through Shippable,
    * Enter the SSH port for your build host. This is usually port 22, but is configurable.
    * Copy the command shown and run it on your build host. This will create a
    `shippable` user on your host and allow us to run initialization scripts on
    your node.
    * Check the checkbox to confirm that you have run the command on your node
    and click on **Initialize**.
    * You will be redirected to a page showing you the console log as your node
    is initialized.
    * When your node is ready, the status indicator for the node will turn green. Your node is now ready to pick up builds for your projects.
<img src="/images/platform/management/subscription-nodes-add-byon.png" alt="Subscription Nodes view for Shippable DevOps Assembly Lines" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

* To run the initialization scripts yourself,
    * Click on **Save and Generate initialization scripts** to generate the script.
    * Click on **Download intialization scripts** to download. Copy it to your build machine and
    run them.
    * Check the **Script run successfully** checkbox and then click
    on the **Complete initialization** button.
    * Your node status will automatically show green at this point. We have no way
    of verifying that the node was in fact successfully initialized so you will
    need to make sure this was the case by triggering a job.

<a name="view-nodes"></a>
### Viewing your nodes

You can view the currently active nodes in your Subscription by following the steps below:

* From your Dashboard, click on **Subscriptions** in the left sidebar menu and click on your Subscription.

<img width="25%" height="25%" src="/images/platform/integrations/list-subscriptions.png" alt="List nodes">

* On the Subscription page, click on the **Gears** icon and click on **Node Pools**.

<img src="/images/platform/tutorial/runtime/manage-byon-nodes-fig4.png" alt="View list of node pools" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

* Right below the **LICENSES** panel, you can see all your **On Demand** and **BYON** nodes in their respective **Node Pools**.

<img src="/images/platform/management/subscription-nodes-list.png" alt="Subscription Nodes view for Shippable DevOps Assembly Lines" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

<a name="reset-node"></a>
### Re-initializing a node

You might want to re-initialize a BYON node for the following reasons:

* An updated version is available for the build agent. This is indicated by a red exclamation icon in the **Build Agent Version** column of the Node.
* You made some changes to the node manually and it is no longer picking up jobs
* The node isn't picking up jobs and seems 'frozen' for some reason

To re-initialize a node:

- Follow instructions to [view your node pools](#view-nodes). Click on the node pool name of the pool which contains the node you want to re-initialize.

- Click on the **Edit** button for the node you want to re-initialize. This will take you to the page for editing that node.

- You can now reset a node by clicking on the **Re-initialize** button. This action will initialize/install everything from scratch.

<img src="/images/platform/tutorial/runtime/manage-byon-nodes-fig6.png" alt="View list of node pools" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

If your nodes were not initialized automatically by Shippable, you will need to re-download the initialization script and run it on your node manually.

<a name="delete-node"></a>
###Deleting a build node

- Follow instructions to [view your node pools](#view-nodes). Click on the node pool name of the pool which contains the node you want to delete.

- Click on the **Delete** button for the node you want to delete. This action is final and cannot be undone.

<img src="/images/platform/tutorial/runtime/manage-byon-nodes-fig6.png" alt="View list of node pools" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

## Initialization scripts
All the scripts for initializing the nodes are are publicly available [here](https://github.com/Shippable/node). We update this repository consistently to fix any bugs and to add support for new operating systems.

## Minimum requirements for supported platforms

### Ubuntu

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

### CentOS

The minimum requirements for a CentOS BYON type node that can be attached to Shippable are:

* 1.8GB RAM
* 30GB SSD
* Supported architecture, OS and Docker versions for CentOS

|Architecture|OS|Docker Version|
|---|---|---|
|x86_64|CentOS 7|17.06|

### Windows Server

The minimum requirements for a Windows BYON type node that can be attached to Shippable are:

* 4GB RAM
* 60GB SSD
* Supported architecture, OS and Docker versions for Windows

|Architecture|OS|Docker Version|
|---|---|---|
|x86_64|Windows Server 2016 (Version 1607)|17.06|

### macOS

The minimum requirements for a macOS BYON type node that can be attached to Shippable are:

* 1.8GB RAM
* 30GB SSD
* Supported architecture, OS and Docker versions for macOS

|Architecture|OS|Docker Version|
|---|---|---|
|x86_64|macOS 10.12 Sierra|17.06|

* Packages that need to be pre-installed on the node
    * [git](https://git-scm.com/download/mac)(latest)
    * [Nodejs](https://nodejs.org/en/download/)(v4.8.6)
    * [Docker](https://docs.docker.com/docker-for-mac/install/)(v17.x.x)
        If you need Docker login during builds, disable "Securely store docker logins in macOS keychain" in Docker preferences. Login will fail with `Error saving credentials: error storing credentials - err: exit status 1, out: write permissions error` otherwise.<br/>
        <img src="/images/platform/tutorial/runtime/byon-macos-docker.png" alt="docker help message for macos BYON for Shippable DevOps Assembly Lines">

    * [jq](https://stedolan.github.io/jq/download/) (latest)
    * [ntp](http://www.ntp.org/) (Install this if the build logs in Shippable UI don't appear in the correct order.)
    * [bash](https://apple.stackexchange.com/a/193413)(latest) Running with default bash will result in build failing if the `script` section in `on_success`/`always` contains an incorrect command.
