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
This adds a particular job to the build matrix with the specified parameters on the default_nodePool. You can use this method to create a build matrix containing only specific combinations. Consider the example below:

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

If no runtime is specified, then the included job will run on the default node pool. The matrix include job can be configured such that a build can be run on a node pool not specified in the runtime section.

Consider a subscription with default node pool as `default_nodePool`.
```
language: java

matrix:
  include:
    - jdk: openjdk8
      env: ARCH=x86_64
    - jdk: openjdk8
      env: ARCH=aarch64
      nodePool: Arm64

build:
  ci:
    - mvn clean deploy
```
The above yml will create 2 jobs. Since no `runtime` section is specified, the first of the `matrix include` jobs will run on the subscription's default node pool, `default_nodePool`. The next 2 job will run on `Arm64` node pool.

If runtime section is specified, then the matrix include jobs will run on the the node pool specified in the runtime section. In case the matrix job needs to run on node pool which is different than the node pool specified in the runtime section, then the name of that node pool must be specified in the `matrix include`'s `nodePool` section.

Consider a subscription with default node pool as `default_nodePool`.
```
language: java

jdk: openjdk8

runtime:
  nodePool: centos7

matrix:
  include:
    - jdk: openjdk8
      env: ARCH=x86_64
    - jdk: openjdk8
      env: ARCH=aarch64
      nodePool: Arm32

build:
  ci:
    - mvn clean deploy
```
The above yml will create 3 jobs. Adding a `runtime` section will create a matrix job. So, theThe first job will run on the `centos7` node pool. The first of the `matrix include` job will also run on the `centos7` node pool, with environment variable `ARCH=x86_64` set, since `nodePool` section in not explicitly specified. The next `matrix include` job will run on the `Arm32` node pool.

If [multiple node pools](runtime-config/) are configured in the yml and `nodePool` tag is not specified in the `matrix include` section, then the included job will run only on the first node pool. The build section is inherited from the build section for that particular node pool. Say, the `pre_ci_boot` section for a node pool `foo` is configured to use image `bar`. The matrix include job which runs on `foo` node pool will run on the `bar` image.

```
language: java

jdk:
  - openjdk8

runtime:
  - nodePool: default_nodePool
  - nodePool: Arm64
    build:
      pre_ci_boot:
        image_name: custom_java_image
        image_tag: dev
        pull: true

matrix:
  include:
    - jdk: openjdk8
      env: foo=bar
    - jdk: openjdk8
      env: foo=baz
      nodePool: Arm64
    - jdk: openjdk8
      env: foo=bar
      nodePool: Arm32

build:
  ci:
    - mvn clean deploy
```

This creates a matrix of 5 jobs. The first 2 jobs are created because of the multiple nodePools specified in the `runtime` section, `default_nodePool` & `Arm64`. 3 jobs are added from the matrix include section. Here, the first job will run on `default_nodePool`, since no `nodePool` is specified in the matrix include section for that job. The second job will run on `Arm64` node pool, with the build running on the `custom_java_image:dev` docker image. The third job will run on the `Arm32` node pool.

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
