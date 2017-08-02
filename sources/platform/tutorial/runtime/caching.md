page_main_title: Caching
main_section: Platform
sub_section: Tutorials
sub_sub_section: Runtime
page_title: Caching

# Caching
Caching can be optionally turned on for your builds. Once enabled, it speeds up your build by automatically setting up your static dependencies.

## How caching works
If caching is turned on, it is updated for every build and is available to subsequent builds. We create a tarball of whatever needs to be cached and upload it to S3 at the end of the build. Caching furthermore occurs at the **project level** only.
Caching per branch is currently unsupported, so your cache will be updated for each build regardless of branch. The Platform
however does allow you to build specific branches.

The roundtrip to and from S3 means that caching is very useful in specific scenarios and not so much in others:

* Files that take a long time to install benefit from caching. So anything related to bundler, npm, composer, pip, etc are great candidates for caching.

* Files that take a long time to download but installed quickly do not benefit from caching since it takes as much time to download from S3 as from the original source. Examples are compiled binaries, JDK packages, etc.

## Caching with multiple nodes
You may have setup multiple nodes for a subscription, because of which multiple builds could run in parallel. In this scenario, all nodes will get initialized with the same initial state of the cache and the cache will get updated at the end of each and every build.

## Caching for matrix builds
For single node matrix builds, since only one build runs at a time, each subsequent matrix build will use the cache from the previous run.

For multiple node matrix builds, lets assume N nodes and M builds with M > N. The caching for the first N builds will work as mentioned in the previous section. The (N + 1)th build will use the cache created by the last matrix build that completed.

## Clearing cache
You can clear cache in one of two ways:

*  Including ``[reset minion]`` or ``[reset_minion]`` in your commit message.
*  Clicking on **Reset cache** in your Project Settings UI.

In both cases, your cached content will be deleted. This is a one time action, so if cache is still set to true in your yml, the build will generate a new cache which will be used for subsequent builds.

This method is the best way to update your cache, if required.


## Typical Usecases

* [Caching node modules](/ci/caching/#1-caching-node-modules)
* [Caching ruby gems](/ci/caching/#2-caching-ruby-gems)
