page_main_title: Job Runtime Nodes Overview
main_section: Platform
sub_section: Job Runtime
page_title: Job Runtime Nodes Overview

# Nodes

Jobs run on one following types of Nodes -

* [Dedicated Dynamic nodes](/platform/job-runtime-dynamic-nodes)

  Dedicated Dynamic nodes are dynamically provisioned when a job runs and terminated after the job completes.
  We offer a free 2 core, 3.75GB RAM node to run your builds. You can also upgrade to a paid plan for more powerful nodes if you need additional memory or faster processors to speed up your builds.

* [Dedicated Custom Nodes](/platform/job-runtime-custom-nodes)

  Custom Nodes lets you run builds on your own infrastructure. It enables you to attach your machines to your Shippable subscription and route all builds to those machines. Your code thus never leaves your network.

* Shared Nodes

  Shared nodes are a common pool of nodes that run certain jobs. These jobs run very quickly and do not allow custom scripting. Since they run very quickly, we use a dedicated pool of nodes to save on node provisioning time.
