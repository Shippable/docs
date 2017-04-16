main_section: CI
sub_section: Language guide

# Continuous Integration with Ruby
This page explains yml configuration that is specific to Ruby projects. For a complete yml reference, please read the [YML structure page](yml-structure/)

##yml configuration

The sections below explore sections of the yml that are specific to Ruby projects.


###language


For Ruby projects, this tag should always be set to ruby as show below:

```
language: ruby
```

### runtime
Our official build images for Ruby come pre-installed with the following versions:

* 1.8.7
* 1.9.3
* 2.0.0
* 2.1.5
* 2.2.1
* 2.2.5
* 2.3.0
* 2.3.1
* 2.3.2
* 2.3.3
* jruby 1.7.19
* jruby 9.0.0
* jruby 9.1.2
* jruby 9.1.5
* ree 1.8.7

You can set the runtime to any version(s) using the `rvm` tag:

```
rvm:
  - 2.0
```

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

### pre_ci and pre_ci_boot

Depending on the `language` and `services` tags in your yml, an official build image is chosen for your build by default, and your build container is started with standard options. The default images for Ruby builds are explained below.

The pre_ci and pre_ci_boot sections are primarily used in one of the following scenarios:

* You want to use a custom Docker image for your CI
* You want to override the default options that are used to boot up the default CI image

If you do not want to do either of the above, you should skip these tags in the yml.

#### Default Ruby images
If you do not specify anything in the `pre_ci_boot` section of your yml, a default image will be used to spin to the build container for your Ruby projects.

To find out the default image used for your builds, please check the [Machine images overview](../machine-images/overview/).

If the default images do not satisfy your requirements, you can do one of two things:

- Continue using default image and include commands to install any missing dependencies or packages in your yml
- Switch your Machine Image to a more recent version that contains what you need
- Use a custom build image that contains exactly what you need for your CI. Please note that this will add time to your build since the image will be pulled from a registry.

#### Using a custom build image
If you do decide to use a custom CI image, you will need to configure the `pre_ci_boot` section and optionally, the `pre_ci` section if you're also building the CI image as part of the workflow. Details on how to configure this are available in the [Choosing a build image](build-image/) page.

### ci
The `ci` section should contain all commands you need for your `ci` workflow. Commands in this section are executed sequentially. If any command fails, we exit this section with a non zero exit code.

#### Installing dependencies
If needed, you can install your project dependencies using bundler. The snippet below assumes you have a Gemfile at the root of your repo:

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

#### Running tests
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

#### Testing against multiple JDKs with JRuby
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


#### Test and code coverage
You can view your test and code coverage results in a consumable format and drill down further to find out which tests failed or which sections of your code were not covered by your tests.

Your tests results data needs to be in junit format and your code coverage results need to be in cobertura format in order to see these visualizations. Test and code coverage results need to be saved to shippable/testresults and shippable/codecoverage folders so that we can parse the reports.


#### Retrying installation of dependencies
Your dependencies can sometimes fail to install due to network glitches or other external transient factors. You can harden the command for installing dependencies by using `shippable_retry`. We will then retry the command up to 3 times if it returns a non-zero code.


```
build:
  ci:
    - shippable_retry bundle install
```

#### Caching Ruby Gems
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

#### Default commands

If the `ci` section is blank, we will run a default command. This has the same effect as the yml snippet below:

```
build:
  ci:
    - bundle install --gemfile=$SHIPPABLE_GEMFILE $SHIPPABLE_BUNDLER_ARGS
```

To avoid executing the default command, include a simple command in like `pwd` or `ls` in this section.
