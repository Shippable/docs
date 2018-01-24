page_main_title: BYON Nodes Overview
main_section: Platform
sub_section: Tutorials
sub_sub_section: Runtime
page_title: Moving to Node Pools

# Moving to Node Pools

With the Node Pools release, a whole bunch of features were added:

- [Multi platform support](./custom-nodes) - Windows, Mac, CentOS, Ubuntu
- [Host execution](../../workflow/job/runsh/) - Run builds on container or host with a simple switch in your runSh job
- [Custom images in runSh](../../workflow/job/runsh/) - Run builds on container or host with a simple switch in your runSh job
- [Node pool management](../../management/subscription/node-pools) - Allows you to group nodes to better allocate and handle them

## Before Opting In

Before opting in, there are a few things of note if you are running builds on custom nodes:

1. Once you've opted in, the existing nodes will continue to process builds as is, but none of the new features will be available to it.
1. All the nodes need be reinitialized to access all the new features.
1. A default node pool will automatically be setup with all your existing nodes added it. By default we create Ubuntu 14.04 node pool. If you have any Ubuntu 16.04 nodes, a 16.04 node pool will be created instead.
1. After opting-in, there are a couple of [API changes](../../api/api-overview) that you need to be aware of if you use the `POST /clusterNodes` route:
    - `clusterId` will be a required field. This refers to the node pool ID to which you want to add the node. You can obtain this by accessing the `GET /clusters` route.
    - `initScript` will no longer support the old script names. The new script names can be [found here](https://github.com/Shippable/node/tree/master/initScripts). For example, to init a x86_64, Ubuntu 16.04 node and install Docker 17.06, you will use: `x86_64/Ubuntu_16.04/Docker_17.06.sh`

## Opting In

Currently moving to Node Pools is an optional opt-in open to subscriptions running on custom nodes. You can opt-in your subscription if you are owner of it. The steps to opt-in are:

1. Goto your subscription dashboard.
2. Navigate to the node settings page by clicking on gear icon at the top-right and selecting "Nodes".
3. You should see an option to upgrade.

<img src="/images/platform/tutorial/runtime/move-to-node-pools.png" alt="Opt in">
