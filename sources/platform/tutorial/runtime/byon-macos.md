page_main_title: macOS BYON nodes
main_section: Platform
sub_section: Tutorials
sub_sub_section: Runtime
page_title: macOS BYON nodes overview

# macOS BYON Nodes

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

<a name="view-nodes"></a>
## Viewing your nodes

You can view all the currently active nodes in your Subscription by following the steps below:

* Click on the Subscription in the left navbar.

<img src="/images/getting-started/account-settings.png" alt="Add Account Integration">

* On the Subscription page, click on the **Gears** icon and click on **Nodes**. In the **NODE LISTS** section, you can view the list of currently active nodes.

<img src="/images/platform/management/subscription-nodes-list.png" alt="Subscription Nodes view for Shippable DevOps Assembly Lines" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

Please note that if you're using Shippable [On-demand Nodes](/platform/runtime/nodes/#dynamic-nodes/), you will only see active nodes, if any. For BYON nodes, they will always be shown here since they are always on and available.

<a name="add-node"></a>
## Adding new nodes

You can add a new node by clicking the `+` icon on the top right corner of **NODE LIST** panel.

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
    * Your node status will automatically show green at this point. We have no way F
    of verifying that the node was in fact successfully initialized so you will
    need to make sure this was the case.
    * **NOTE**: Please do not run the script as `sudo`. Instead, input the password if the script prompts at the time of running it.

* Once the node has been added, any builds that are queued for the node pool
  which this node is a part of, will be picked up by this node

<a name="delete-node"></a>
##Deleting a build node

- From your Dashboard, click on Subscriptions in the left sidebar menu and click on your subscription.
- Click on the **gear icon** on the Subscription page and then on **Nodes**.
- Click on the node in the **NODE LISTS** section.
- Scroll to the bottom of the screen and click on **Delete** to delete your build node. This action is final and cannot be undone.
