page_main_title: Triggering parallel jobs
main_section: CI
sub_section: Configuration
sub_sub_section: Advanced config
page_title: Running matrix builds
page_description: How to use matrix builds in your Build Configuration
page_keywords: getting started, questions, documentation, shippable, config, yml, multiple languages, versions

# Matrix builds

In most cases, you want to trigger one build for each commit/pull request to your repository. However, there are times when you might want to trigger multiple builds for a single code change.

For example, you might want to test against multiple versions of Ruby, multiple aspect ratios for your Selenium tests, or multiple environment variables.

This scenario is handled by our **Matrix Build** feature, where certain configurations of your yml file lead to multiple builds being triggered per code commit or pull request. These configurations include -

-  specifying more than one language version
-  specifying more than one variable in the `env` section
-  specifying multiple gemfiles for ruby

##Basic config

To configure matrix builds, you just need to specify multiple language runtimes, and/or multiple environment variables, and/or multiple gemsets in case of Ruby.

```
rvm:
  - 1.9.2
  - 1.9.3
  - 2.0.0

gemfile:
  - gemfiles/Gemfile.rails-2.3.x
  - gemfiles/Gemfile.rails-3.0.x

env:
  - ISOLATED=true
  - ISOLATED=false
```

The configuration above will generate a 12 build matrix!

Even though each build in the matrix is a separate build, the Shippable UI also shows an aggregated view in order to organize all builds into a single build number. For example, if the yml snippet above triggers build number 13, with each individual build in the matrix numbered 13.1 through 13.16.

<img src="../../images/ci/matrix-builds.png" alt="Build matrix with Shippable">


##Advanced config

The `matrix` tag lets you refine the build matrix by including/excluding specific combinations, or allowing specific jobs to fail without affecting overall build status.

###Excluding specific jobs

Suppose you have:

```
rvm:
  - 1.9.2
  - 1.9.3
  - 2.0.0

gemfile:
  - gemfiles/Gemfile.rails-2.3.x
  - gemfiles/Gemfile.rails-3.0.x

```
This results in a `3x2` build matrix.

You can exclude a specific job from a matrix by configuring your yml with an `exclude` tag:

```
matrix:
  exclude:
    - rvm: 1.9.2
      gemfile: gemfiles/Gemfile.rails-3.0.x
      nodePool: default_nodePool
```

The snippet above excludes the job running on `default_nodePool` for the combination of `runtime 1.9.2` and `gemfiles/Gemfile.rails-3.0.x` parameters from the build matrix. If no `nodePool` tag is specified and [multiple node pools](runtime-config/) are used to run the build, all the jobs runnin on all the node pools matching the `rvm` & `gemfile` config above will be excluded.

###Including jobs

It is also possible to include entries into the matrix with `include` tag as shown below:

```
matrix:
  include:
    - rvm: 2.0.0
      gemfile: gemfiles/Gemfile.rails-3.0.x
      env: ISOLATED=false
      nodePool: default_nodePool
```
This adds a particular job to the build matrix with the specified parameters on the default_nodePool. If [multiple node pools](runtime-config/) are configured in the yml and `nodePool` tag is not specified, then the included job will run only on the first node pool.

You can use this method to create a build matrix containing only specific combinations. Consider the example bellow:

```
matrix:
  include:
    - rvm: 1.9.3
      gemfile: gemfiles/Gemfile.rails-2.3.x
      env: ISOLATED=false
    - rvm: 2.0.0
      gemfile: gemfiles/Gemfile.rails-3.0.x
      env: ISOLATED=true
```
This creates a build matrix with 2 jobs with the specified parameters.

### Allowing failures

Allowed failures are items in your build matrix that are allowed to fail without causing the entire build to be shown as failed. You can define allowed failures in the build matrix as follows:

```
matrix:
  allow_failures:
    - rvm: 1.9.3
      nodePool: default_nodePool
```

If no `nodePool` tag is specified and [multiple node pools](runtime-config/) are configured, then all the jobs matching the above config will be allowed to fail on all the node pools.

### Rerunning unsuccessful items

When rerunning a matrix build with failed items, you will have two options.  You can either rerun the whole matrix or only rerun the jobs that were unsuccessful.  If you choose to only rerun failed jobs, any items that previously succeeded will be copied into the new run.

<img src="../../images/ci/rerun-modal.png" alt="Rerun modal">
