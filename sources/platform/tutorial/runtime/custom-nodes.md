page_main_title: BYON Nodes Overview
main_section: Platform
sub_section: Tutorials
sub_sub_section: Runtime
page_title: BYON Nodes Overview

# BYON Nodes

To learn the basics of BYON nodes, please read [this overview](/platform/runtime/nodes/#custom-nodes).

This tutorial page shows you how to attach/delete your BYON nodes to Shippable, as well as perform periodic maintenance on them.

* [Adding a node](#add-node)
* [Updating node name](#edit-node)
* [Re-initializing a node](#reset-node)
* [Deleting a node](#delete-node)

<a name="add-node"></a>
##Adding a build node
Follow the steps below to add a build node:

1. From your Dashboard, click on Subscriptions in the left sidebar menu and click on your subscription.

<img width="30%" height="30%" src="/images/getting-started/account-settings.png" alt="List subscriptions">

2. Click on the **Gears icon** on the right of the Subscription page and then on **Nodes**.
3. Choose the radio button for **Custom**.

<img src="/images/getting-started/byon-select-my-node.png" alt="bring your own node">

4. Select the architecture for initializing the node.

<img src="/images/getting-started/change-custom-architecture.png" alt="change BYON node architecture">

5. To add a build machine, click on the **+** button in the **NODE LISTS** section. You will be redirected to the Add Node page.
6. Select the OS of the nodes you want to add.
7. Enter a name for the node and its IP address.

<img src="/images/getting-started/byon-name-ip.png" alt="Enter name and IP">

8. Click on the **Docker version** dropdown and select the version you want installed on your nodes. Please note that the list of available versions is populated based on your choice of OS.
9. You can choose to initialize the build host through Shippable or run the initialization scripts yourself. Initialization through Shippable requires you to grant SSH access, so if you do not want to grant that for any reason, select the radio button for `Manual (script based)`

10. To initialize the node through Shippable,
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

<img src="/images/getting-started/intialize-byon-shippable.png" alt="Select docker version">


11. To run the initialization scripts yourself,
    * Choose whether you want to enable swap space on your machine.
    * Click on **Generate initialization scripts** to generate the script.
    * Click on **Download scripts** to download. Copy it to your build machine and
    run them.
    * Check the **I have run this script on my node successfully** and then click
    on the **Save** button.
    * Your node status will automatically show green at this point. We have no way F
    of verifying that the node was in fact successfully initialized so you will
    need to make sure this was the case.

Once you add your first build node, all subsequent builds for that subscription
will run on your machines. Your nodes can be seen by going to your Subscription Settings and clicking on **Nodes** in the left sidebar menu.

<img src="/images/getting-started/list-byon-nodes.png" alt="Select docker version">

<a name="edit-node"></a>
## Updating node name

You can edit your node name at any time. No other fields of a BYON node are editable.

- From your Dashboard, click on Subscriptions in the left sidebar menu and click on your subscription.

<img width="30%" height="30%" src="/images/getting-started/account-settings.png" alt="List subscriptions">

- Click on the **Gears icon** on the Subscription page and then on **Nodes**.
- Click on the node in the **NODE LISTS** section.
- You can click on the **Edit** button for a build node to edit the node name.

<a name="reset-node"></a>
## Re-initializing a node

You might want to re-initialize a BYON node for the following reasons:

* The node shows a **New version available** message:

<img src="/images/platform/tutorial/runtime/node-update-available.png" alt="List subscriptions">

* You made some changes to the node manually and it is no longer picking up jobs
* The node isn't picking up jobs and seems 'frozen' for some reason

To re-initialize a node:

- From your Dashboard, click on Subscriptions in the left sidebar menu and click on your subscription.

<img width="30%" height="30%" src="/images/getting-started/account-settings.png" alt="List subscriptions">

- Click on the **Gears icon** on the Subscription page and then on **Nodes**.
- Click on the node in the **NODE LISTS** section.
- Click on the node you want to reinitialize
- You can reset a node by clicking on the **Re-initialize** button. This action will initialize/install everything from scratch.

If your nodes were not initialized automatically by Shippable, you will need to re-download the initialization script and run it on your node manually.

<a name="delete-node"></a>
##Deleting a build node

- From your Dashboard, click on Subscriptions in the left sidebar menu and click on your subscription.

<img width="30%" height="30%" src="/images/platform/integrations/list-subscriptions.png" alt="List subscriptions">

- Click on the **gear icon** on the Subscription page and then on **Nodes**.
- Click on the node in the **NODE LISTS** section.
- Scroll to the bottom of the screen and click on **Delete** to delete your build node. This action is final and cannot be undone.

## Initialization scripts
All the scripts for initializing the nodes are are publicly available [here](https://github.com/Shippable/node). We update this repository consistently to fix any bugs and to add support for new operating systems.
