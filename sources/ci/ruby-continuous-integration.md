page_main_title: Ruby
main_section: CI
sub_section: Language guide

# Continuous Integration with Ruby

This page explains yml configuration that is specific to Ruby projects. For a complete yml reference, please read the [YML structure page](yml-structure/)

Our yml configuration is highly customizable. Please read the following sections carefully to learn how to
configure your builds.

-  [Basic configuration](#basic-ruby-config)
-  [Setting language and runtime](#language)
-  [Preparing your environment](#environment)
-  [Configuring build and test commands](#build-test)
-  [Test and code coverage visualizations](#test-coverage-reports)
-  [Advanced config](#advanced-config)

<a name="basic-ruby-config"></a>
##Basic configuration

The following `shippable.yml` should get you started with a simple Ruby project.

```
language: ruby

rvm:
  - 2.0
```

The snippet above will run the default command `bundle install --gemfile=$SHIPPABLE_GEMFILE $SHIPPABLE_BUNDLER_ARGS` with rvm 2.0. To customize this configuration, please read the sections below.

<a name="language"></a>
##Setting language and runtime

For Ruby projects, the `language` tag should always be set to `ruby`. You can set the runtime to any version(s) using the `rvm` tag:

```
language: ruby

rvm:
  - 2.0
```

Our official build images, which are used to run your builds by default, come installed with multiple versions of Ruby. Currently, the following versions are pre-installed:

-  1.8.7
-  1.9.3
-  2.0.0
-  2.1.5
-  2.2.1
-  2.2.5
-  2.3.0
-  2.3.1
-  2.3.2
-  2.3.3
-  jruby 1.7.19
-  jruby 9.0.0
-  jruby 9.1.2
-  jruby 9.1.5
-  ree 1.8.7

To find out which versions are supported out of the box for your build image, read our [Machine images overview](/platform/tutorial/runtime/ami-overview/).

If you want to test against several versions of Ruby, you can specify multiple runtimes. The snippet below will trigger 2 builds, one against each version:

```
rvm:
  - 2.2.1
  - 2.3.3
```

You can also set this value to any patch level as long as it is available as a binary for Ubuntu 14.04/16.04:

```
rvm: 2.0.0-p247
```
However, please know that this will add a few minutes to your build time in order to download the binary and install the required version.

**Important note:** The runtime tag only works with official CI images provided by Shippable. If you are using a custom image for your build, you will need to switch the runtime in the `ci` section of your yml using `rvm use <version>`.

<a name="environment"></a>
## Preparing your environment

If you're running a simple Ruby build, feel free to skip this section since you should not have to do anything to prepare the environment. Read this section only if your build needs specific environment variables or you have very custom requirements for your build image.

###Overriding the default build image

Depending on the `language` tag in your yml, an official build image is chosen for your build by default, and your build container is started with standard options. To find out the default image used for your builds, please read the [Machine images overview](../platform/tutorial/runtime/ami-overview/).

If the default image does not satisfy your requirements, you can do one of three things:

-  Continue using default image and include commands to install any missing dependencies or packages in your yml
-  [Switch your Machine Image](../ci/build-image/#changing-your-default-tag) to a more recent version that contains what you need
-  [Use a custom build image](../ci/custom-docker-image/) that contains exactly what you need for your CI. Please note that this will add time to your build since the image will be pulled from a registry.

###Setting environment variables
You can define any custom environment variables in the `env` section of your yml. Please read the [docs on Environment variables](env-vars/) for more information.

<a name="build-test"></a>
## Configuring build and test commands
The `ci` section should contain all commands you need for your `ci` workflow. Commands in this section are executed sequentially. If any command fails, we exit this section with a non zero exit code.

### Installing dependencies
If needed, you can install your project dependencies using bundler at the start of the `ci` section of the yml. The snippet below assumes you have a Gemfile at the root of your repo:

```
build:
  ci:
    - bundle install

```

If you are using a custom gemfile that is not at the root of your repository, you can specify it with the gemfile tag:

```
gemfile: gemfiles/Gemfile.ci
```
If you specify multiple values for this as an array, a build matrix is triggered with one build for each version of the Gemfile.

You can also specify additional arguments for the `bundle install` command using the bundler_args tag:

```
bundler_args: --binstubs
```

### Running tests
Include your test command(s) in the ci section, after you've installed any required dependencies. A an example, the snippet below creates a postgres db, seeds it, and runs tests using rake:   


```
services:
  - postgres

build:
  ci:
    - cp config/database.shippable.yml config/database.yml
    - bundle install
    - bundle exec rake db:setup
    - bundle exec rake test
```

<a name="test-coverage-reports"></a>
## Test and code coverage
You can view your test and code coverage results in a consumable format and drill down further to find out which tests failed or which sections of your code were not covered by your tests.

Your tests results data needs to be in junit format and your code coverage results need to be in cobertura format in order to see these visualizations. Test and code coverage results need to be saved to shippable/testresults and shippable/codecoverage folders so that we can parse the reports.

<a name="advanced-config"></a>
##Advanced config

### Testing against multiple JDKs with JRuby
If you are using JRuby, you can test your projects against one or more supported JDKs: OpenJDK 7, Oracle JDK 7, Oracle JDK 8, OpenJDK 6

Use the `jdk` flag to achieve this:

```
jdk:
  - openjdk7
  - oraclejdk7
  - oraclejdk8
  - openjdk6
```
The yml above will trigger 4 builds, one against each jdk version.

### Retrying installation of dependencies
Your dependencies can sometimes fail to install due to network glitches or other external transient factors. You can harden the command for installing dependencies by using `shippable_retry`. We will then retry the command up to 3 times if it returns a non-zero code.


```
build:
  ci:
    - shippable_retry bundle install
```

### Caching Ruby Gems
The `bundle install` command can take a while depending on what needs to be installed. To avoid paying this installation tax for each build, you can choose to cache your gems using the yml snippet below as a guide:

```
build:
  ci:
    - bundle package --all
    - bundle install --gemfile="Gemfile"
  cache: true
  cache_dir_list:
    # replace 2.2.2 with the ruby version you need to cache
    - /usr/local/rvm/gems/$(rvm strings 2.2.2)/gems
    - /usr/local/rvm/gems/$(rvm strings 2.2.2)/specifications
    - $SHIPPABLE_BUILD_DIR

```
If the above directories don't work for you, you should check where the gems are installed in your container. To do this, cd /usr/local/rvm/gems and see which directories are in there and need to be cached.

### Default commands

If the `ci` section is blank, we will run a default command. This has the same effect as the yml snippet below:

```
build:
  ci:
    - bundle install --gemfile=$SHIPPABLE_GEMFILE $SHIPPABLE_BUNDLER_ARGS
```

To avoid executing the default command, include a simple command in like `pwd` or `ls` in this section.
