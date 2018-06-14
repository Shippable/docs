page_main_title: macOS BYON nodes
main_section: Platform
sub_section: Tutorials
sub_sub_section: Runtime
page_title: macOS BYON nodes overview
page_description: How to add, remove and view macOS nodes in your Node pool in Shippable

# Managing MacOS BYON Nodes

To learn the basics of BYON nodes, please read [this overview](/platform/runtime/nodes/#custom-nodes).

This tutorial page shows you how to attach/delete your macOS BYON nodes to Shippable, as well as perform periodic maintenance on them.

* [Minimum requirements](#requirements)
* [Viewing nodes](#view-nodes)
* [Adding a node](#add-node)
* [Deleting a node](#delete-node)

<a name="requirements"></a>
## Minimum requirements
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
        If you need Docker login during builds, disable "Securely store docker logins in macOS keychain" in Docker preferences. Login will fail with `Error saving credentials: error storing credentials - err: exit status 1, out: write permissions error` otherwise.
<img src="/images/platform/tutorial/runtime/byon-macos-docker.png" alt="docker help message for macos BYON for Shippable DevOps Assembly Lines">

    * [jq](https://stedolan.github.io/jq/download/) (latest)
    * [ntp](http://www.ntp.org/) (Install this if the build logs in Shippable UI don't appear in the correct order.)
    * [bash](https://apple.stackexchange.com/a/193413)(latest) Running with default bash will result in build failing if the `script` section in `on_success`/`always` contains an incorrect command.

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
<img src="/images/platform/tutorial/runtime/byon-macos-add.png" alt="add node for macos BYON for Shippable DevOps Assembly Lines">

* Shippable does not provide a way to automatically initialize macOS nodes. The
  only initialization method available right now is manually running the init
  scripts on the node.

* To run the initialization scripts,
    * Choose whether you want to enable swap space on your machine.
    * Click on **Generate initialization scripts** to generate the script.
    * Click on **Download scripts** to download. Copy it to your build machine and
    run them.
    * Check the **I have run this script on my node successfully** and then click
    on the **Save** button.
    * Your node status will automatically show green at this point. We have no way
    of verifying that the node was in fact successfully initialized so you will
    need to make sure this was the case.
    * **NOTE**: Please do not run the script as `sudo`. Instead, input the password if the script prompts at the time of running it.

* Once the node has been added, any builds that are queued for the node pool
  which this node is a part of, will be picked up by this node

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
- You can reset a node by clicking on the **Re-initialize** button, followed by downloading and running the new initialization script
on your node manually. This action will initialize/install all build components from scratch.

<a name="delete-node"></a>
##Deleting a build node

- From your Dashboard, click on Subscriptions in the left sidebar menu and click on your subscription.
- Click on the **gear icon** on the Subscription page and then on **Node Pools**. All your nodes can be seen right below the `LICENSES` panel in their respective Node pool.
- Click on the node you want to delete.
- Scroll to the bottom of the screen and click on **Delete** to delete your build node. This action is final and cannot be undone.
