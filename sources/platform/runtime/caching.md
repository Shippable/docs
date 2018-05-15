page_main_title: Speed up your builds with caching.
main_section: Platform
sub_section: Runtime
page_title: Caching
page_description: How to speed up your builds using caching in Shippable

# Caching

You can optionally turn on caching for your jobs to speed up your build by pulling your cache instead of installing all your dependencies.

## Caching types
Shippable currently supports two types of caching:

* Node caching
* Artifact caching (only available for runCI jobs)

## Node caching

### How node caching works

When you use an on-demand node pool, Shippable dynamically provisions and terminates nodes for you based on your usage. The first build that runs on a freshly provisioned node can take longer to start running if it needs to pull in dependencies that are not already available on the node. When the node stays idle for a certain amount of time, Shippable will terminate it. Your dependencies will need to be pulled again when the next build runs on yet another freshly provisioned node.

With node caching enabled, Shippable will pause and restart the same on-demand node for you instead of provisioning fresh machines. This allows your average build times to improve because dependencies can now be shared across a larger number of builds.

Because this cache is tied to the node itself, both runCI and runSh jobs can take advantage of it.

### How to enable node caching

You can enable node caching for any of your node caching while editing the nodepool and selecting the cache checkbox. We have some default cache setting when you select the cache checkbox, you can also edit them if required. 

<img src="/images/platform/runtime/nodepool-cache.png"
   70  alt="Enabling caching for a nodepool" style="width:800px;"/>

You will see this cache checkbox on the nodepool edit page only if SKU for that nodepool has `cache` addon. [Click here](/platform/management/subscription/billing/) to see how you can enable `cache` for any of your plan.

### Clearing cache
You can remove caching from your nodepool anytime by navigating to the edit nodepool page and disabling cache option. Now if your node remains idle for a long time then we will terminate the existing node and when next time you try running a build we will initialize a fresh node for you, hence all your installations from previous builds will be gone.


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

This method is the best way to run a job with no cache without changing your `shippable.yml`.

### Typical use-cases

* [Caching node modules](/ci/caching/#1-caching-node-modules)
* [Caching ruby gems](/ci/caching/#2-caching-ruby-gems)

