page_main_title: Running jobs on CentOS
main_section: Platform
sub_section: Tutorials
sub_sub_section: Workflow
page_title: Running jobs on CentOS

# Running jobs on CentOS 7

To run runCI/runSh jobs on CentOS, you can use a Shippable provided on-demand node or bring your own node (BYON).

## Setting up On-demand Nodes

###1. Purchase the on-demand CentOS SKU

* Go to your subscription billing plan by following the instructions documented [here](/platform/management/subscription/billing/#viewing-your-current-plan).
* Click **Edit plan**,  **Add new SKU**.
* Click the dropdown under **Type** and select **On Demand**.
* Click the dropdown under **Architecture** and select **x86_64**.
* Click the dropdown under **Operating System** and select **CentOS_7**.
* Click the dropdown under **Size** and select the node size.
* Adjust the number in the Quantity column to the capacity you need.
* Enter the billing contact and credit card information and click on **Upgrade**

###2. Configure Node pools

* After you create the CentOS SKU, a [Node Pool](/platform/management/subscription/node-pools/) is created and all the purchased nodes are assigned to the default Node Pool.
* You can make this Node pool your default Node pool so that all jobs run on it by default. If the Node pool is not set to be the default Node pool, jobs will need to be explicitly assigned to it.

## Setting up BYON Nodes

The minimum requirements for BYON nodes are documented [here](/platform/tutorial/runtime/byon-windows/#minimum-requirements).

###1. Purchase the BYON CentOS SKU

* Click **Edit plan**,  **Add new SKU**.
* Click the dropdown under **Type** and select **BYON**.
* Click the dropdown under **Architecture** and select **x86_64**.
* Click the dropdown under **Operating System** and select **CentOS_7**.
* Adjust the number in the Quantity column to the capacity you need.
* Enter the billing contact and credit card information and click on **Upgrade**

###2. Configure Node pools

* After you create the CentOS SKU, a default [Node Pool](/platform/management/subscription/node-pools/) is created and all the purchased nodes are assigned to the default Node Pool.
* You can make this Node pool your default Node pool so that all jobs run on it by default. If the Node pool is not set to be the default Node pool, jobs will need to be explicitly assigned to it.
* You can create more Node pools if you want and change the allocation of nodes amongst your node pools.

###3. Initialize your BYON node

* Navigate to the Nodes setting page for your subscription by following the steps documented [here](/platform/tutorial/runtime/byon-centos/#viewing-your-nodes).
* Initialize your BYON node by following the steps documented [here](/platform/tutorial/runtime/byon-centos/#adding-new-nodes).   
