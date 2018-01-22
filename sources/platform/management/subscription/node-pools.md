page_main_title: Subscriptions Node Pools
main_section: Platform
sub_section: Management
sub_sub_section: Subscription
page_title: Subscription Node Pools - Shippable DevOps Assembly Lines
page_description: Configuration of Node Pools for your Jobs that run as part of Shippable DevOps Assembly Lines Platform
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# Subscription node pools

Node Pools provide a convenient way to logically group the [Nodes](http://localhost:5555/platform/runtime/overview/#nodes) in a subscription. Any number of node pools can be created for a subscription as long as they follow these rules:

- a node pool can have either [On-demand nodes](platform/runtime/nodes/#on-demand-nodes) or [BYON nodes](platform/runtime/nodes/#byon-nodes)
- [On-demand nodes](platform/runtime/nodes/#on-demand-nodes) are
  automatically added to the node pool when they're provisioned. [BYON nodes](platform/runtime/nodes/#byon-nodes) need to be added explicitly to the node pool
- all nodes in a node pool must have same architecture and operating system. For instance, a node pool
  cannot have a nodes of type macOS 10.12 and Windows Server 2016
- the number of nodes of each type that can be added for a node pool is limited by the [billing plans](platform/management/subscription/billing) available for the subscription.

## Viewing subscription node pools
TODO

## Managing node pools
TODO

