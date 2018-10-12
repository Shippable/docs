page_main_title: Runtime config
main_section: CI
sub_section: Configuration
sub_sub_section: Advanced config
page_title: Specifying multiple runtimes
page_description: How to use multiple runtimes in your Build Configuration
page_keywords: getting started, questions, documentation, shippable, config, yml, multiple languages, versions, runtime, node pool

# Runtime config

In most cases, you want to trigger one build for each commit/pull request to your repository against one [node pool](/platform/management/subscription/node-pools). However, there are times when you might want to trigger builds across different node pools for a single code change.

For example, you might want to test against architectures or operating systems.

This scenario is handled by our **Multiple Node pools** feature, where certain configurations of your yml file lead to multiple builds being triggered per code commit or pull request for multiple runtimes.

The different runtime configurations include -

-  not specifying runtime
-  specifying one runtime
-  specifying multiple runtimes

##No runtime specified

If no runtime is specified, then the builds run on the default node pool. The default node pool can be seen on the subscription node pool page.

##Runtime with one node pool

```
runtime:
  nodePool: <node pool name>
```

If the build has to be run on a node pool other than the default node pool, the name of the node pool can be specified here. This will make the build run on the specified node pool.
##Runtime with multiple node pools

```
runtime:
  - nodePool: <node pool name 1>
  - nodePool: <node pool name 2>
    build: #optional

      pre_ci: #optional

      pre_ci_boot: #optional
        image_name:
        image_tag:
        pull:
        options:
      ci: #optional
        - #command1
        - #command2
      post_ci: #optional
        - #command1
        - #command2
      on_success: #optional
        - #command1
        - #command2
      on_failure: #optional
        - #command1
        - #command2
      always: #optional
        - #command1
        - #command2
      cache: #optional
      cache_dir_list: #optional
        - #dir1
      push: #optional
        - #command1
  - nodePool: <node pool name 3>
```

Multiple node pools can be specified as mentioned above. The build section for each node pool can be mentioned. This build section is optional. The options are the same as the options for the main build section in [shippable.yml](/ci/yml-structure/#anatomy-of-shippableyml). Specifying the build section for a runtime will override the main build section. The options which are not specified are copied over from the main build section.

Suppose a test has to be run against multiple architectures: `x86_64`, `Arm64` & `Arm32`, on `Ubuntu 16.04`. The tests are the same across the 3 architectures. But, if the tests are a success, a docker image has to be built for each architecture and pushed to docker hub. So, the below yml can be specified to run this build

```
language: none

runtime:
  - nodePool: Arm32
    build:
      on_success:
        - docker build -t foo/arm32_bar:master .
        - docker push foo/arm32_bar:master
  - nodePool: Arm64
    build:
      on_success:
        - docker build -t foo/arm64_bar:master .
        - docker push foo/arm64_bar:master
  - nodePool: x86_64

build:
  ci:
    - # test scripts here
  on_success:
    - docker build -t foo/bar:master .
    - docker push foo/bar:master
  on_failure:
    - echo "Tests failed :("

integrations:
  hub:
    - integrationName: ship-docker
      type: dockerRegistryLogin
```

In the above yml, if the build succeeds, the `Arm32` & `Arm64` images are pushed from the `runtime` `build`'s `on_success` section. The `x86_64` node pool's image is pushed from the main `build` `on_success` section. If the build fails, the `Tests failed :(` message will be printed for builds running on all the node pools

<img src="/images/ci/ci-multiple-nodepools.png" alt="Using multiple node pools in a CI build">
