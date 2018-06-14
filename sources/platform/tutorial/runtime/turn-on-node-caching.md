page_main_title: Turn on node caching
main_section: Platform
sub_section: Tutorials
sub_sub_section: Runtime

# Turning on node caching for a pool

[Node caching](/platform/runtime/caching/#node-caching) is a feature for On-demand nodes that helps you dramatically speed up Docker builds and pulls, as well as pull time for large dependencies. When node caching is turned ON, nodes are paused between builds, rather than terminated. This means that any dependencies and Docker images remain on the node and only a delta will need to be pulled for successive jobs even if the dependencies change a bit.

Node caching is a premium feature that can be added on to any SKU. You can turn on node caching at a node pool level.

## Turning caching on

* First, you will need to buy the caching addon from your Billing page. To do this, click on your Subscription from the left navbar, click on the **Gears** icon and choose **Billing**.

<img src="/images/platform/tutorial/runtime/turn-on-node-caching-fig1.png" alt="Turn on node caching for lightning fast docker builds">

* Click on the **Edit plan** icon on the top right, and check the **Cache** checkbox for the node type for which you want caching enabled. The total price will be displayed.

<img src="/images/platform/tutorial/runtime/turn-on-node-caching-fig2.png" alt="Turn on node caching for lightning fast docker builds">

* Add a credit card, and click on **Upgrade** to buy.

* Next, click on the **Gears** icon again and choose **Node pools**. For the node pool you want to add caching to, click on **Edit**

* On the Edit pool page, scroll to the bottom and check the **Cache** checkbox. You can also choose a cadence with which you want your nodes to be recycled so that they don't run out of space.

<img src="/images/platform/tutorial/runtime/turn-on-node-caching-fig3.png" alt="Turn on node caching for lightning fast docker builds">

Node caching is now turned on for your node pool and you can start enjoying super fast builds!
