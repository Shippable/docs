page_main_title: Speed up your builds with caching.
main_section: Platform
sub_section: Runtime
page_title: Caching
page_description: How to speed up your builds using caching in Shippable

# Caching

Caching helps you speed up your jobs by avoid situations where you have to spend a lot of build time installing or pulling large dependencies.

Shippable currently supports two types of caching:

* Node caching, where your entire build node is cached between jobs, and
* Artifact caching, where you can cache large dependencies that take a long time to install at runtime

## Node caching

### How node caching works

Node caching is available as an addon for on-demand nodes.

When node caching is enabled, Shippable pauses your node after executing a job, instead of terminating it after some specified idle time. When the next job is triggered, the paused node is restarted, and it still contains any Docker images or dependencies that were installed as part of the previous job. This greatly speeds up builds that pull or build Docker images as part of their workflow.

In addition, the node is available to execute the job much faster, since restarting the node from a paused state is much faster than provisioning a new node. So if your build takes just a few minutes to execute, you save on the node provisioning time for every build, which adds up quickly to a big chunk of time saved.

Both runCI and runSh jobs can take advantage of node caching.

### How to enable node caching

To use node cache, you first need to purchase the **cache** add-on from the billing page. [Click here](/platform/management/subscription/billing/) to see how you can update your billing plan to enable this feature. Please note that this feature can be purchased per SKU, so all nodes of that SKU will have caching enabled.

Once purchased, you can enable node caching for your node pool(s) by editing the node pool and selecting the cache checkbox.

<img src="/images/platform/runtime/nodepool-cache.png"
   70  alt="Enabling caching for a nodepool" style="width:800px;"/>

### Clearing cache

You can remove caching from a node pool by editing the node pool and disabling **cache** option.

This will revert nodes in that pool to default non-caching behavior which is [described here](/platform/runtime/nodes/#maximum-time-allocated-to-an-on-demand-node).

## Artifact caching

### How artifact caching works

If caching is turned on, your cache is updated for every build and is available to subsequent builds. We create a tarball of whatever needs to be cached and upload it to S3 at the end of the build. Caching occurs at the **project level** only.

Caching per branch is currently unsupported, so your cache will be updated for each build regardless of branch.

The roundtrip to and from S3 means that caching is very useful in specific scenarios and not so much in others:

* Files that take a long time to install benefit from caching. So anything related to bundler, npm, composer, pip, etc are great candidates for caching.

* Files that take a long time to download but installed quickly do not benefit from caching since it takes as much time to download from S3 as from the original source. Examples are compiled binaries, JDK packages, etc.

### Artifact caching with multiple nodes

You may have setup multiple nodes for a Subscription to run multiple builds in parallel. In this scenario, all nodes will get initialized with the same initial state of the cache and the cache will get updated at the end of each build.

### Artifact caching for matrix builds

If you have one node in your plan and run a matrix build with cache turned on, each build in the matrix will update the cache, which will be used by every subsequent build in the matrix.

For matrix builds across multiple nodes, lets assume N nodes and M builds with M > N. The caching for the first N builds will work as mentioned in the previous section. The (N + 1)th build will use the cache created by the last matrix build that completed.

### Clearing cache

You can clear cache in one of two ways:

*  Including ``[reset minion]`` or ``[reset_minion]`` in your commit message.
*  Clicking on **Reset cache** in your Project Settings UI.

In both cases, your cached content will be deleted before the job is run. This is a one-time action, so if cache is still set to true in your yml, the CI job will generate a new cache which will be used for subsequent builds.

This method is the best way to run a job with no cache without changing your **shippable.yml**.

### Typical use-cases

* [Caching node modules](/ci/caching/#1-caching-node-modules)
* [Caching ruby gems](/ci/caching/#2-caching-ruby-gems)
