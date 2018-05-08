page_main_title: Clojure
main_section: CI
sub_section: Language guide
page_title: Continuous Integration with Clojure
page_description: How to do Continuous Integration with Cassandra in Shippable

# Continuous Integration with Clojure
This page explains yml configuration that is specific to Clojure projects. For a complete yml reference, please read the [YML structure page](yml-structure/)

Our yml configuration is highly customizable. Please read the following sections carefully to learn how to
configure your builds.

-  [Basic configuration](#basic-clojure-config)
-  [Setting language and runtime](#language)
-  [Preparing your environment](#environment)
-  [Configuring build and test commands](#build-test)
-  [Test and code coverage visualizations](#test-coverage-reports)
-  [Advanced config](#advanced-config)

<a name="basic-clojure-config"></a>
##Basic configuration

The following `shippable.yml` should get you started with a simple Clojure project.

```
language: clojure

lein:
  - lein2
```

The snippet above will run the default command `lein test`. To customize this configuration, please read the sections below.

<a name="language"></a>
##Setting language and runtime

For Clojure projects, the `language` tag should always be set to `clojure`. You can set the runtime to any version(s) using the `lein` tag:

```
language: clojure

lein:
  - 1.9.0
```

Our official build images, which are used to run your builds by default, come installed with multiple versions of Go.

To find out which versions are supported out of the box for your build image, read our [languages overview for Clojure](/platform/runtime/machine-image/language-versions/#clojure).

If you want to test against several versions of Clojure, you can specify multiple runtimes. The snippet below will trigger 2 builds, one against each version:

```
lein:
  - 1.9.0
  - 1.8.0
```

**Important note:** The runtime tag only works with official CI images provided by Shippable. If you are using a custom image for your build, you will need to switch the runtime in the `ci` section of your yml.

<a name="environment"></a>
## Preparing your environment

If you're running a simple Scala build, feel free to skip this section since you should not have to do anything to prepare the environment. Read this section only if your build needs specific environment variables or you have very custom requirements for your build image.

###Overriding the default build image

Depending on the `language` tag in your yml, an official build image is chosen for your build by default, and your build container is started with standard options. To find out the default image used for your builds, please read the [Machine images overview](../platform/runtime/machine-image/ami-overview/).

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
You can install the required dependencies for your project using protobuf:

```
build:
  ci:
    - lein protobuf install
```


### Adding test commands
After installing dependencies, you can include your test commands. For example:  

```
build:
  ci:
    - lein test
```

<a name="test-coverage-reports"></a>
## Test and code coverage
You can view your test and code coverage results in a consumable format and drill down further to find out which tests failed or which sections of your code were not covered by your tests.

Your tests results data needs to be in junit format and your code coverage results need to be in cobertura format in order to see these visualizations. Test and code coverage results need to be saved to shippable/testresults and shippable/codecoverage folders so that we can parse the reports.

<a name="advanced-config"></a>
##Advanced config

### Testing against multiple JDKs
You can test your projects against one or more supported JDKs: OpenJDK 7, Oracle JDK 7, Oracle JDK 8, OpenJDK 6.

Use the `jdk` flag to achieve this:

```
jdk:
  - openjdk7
  - oraclejdk7
  - oraclejdk8
  - openjdk6
```
The yml above will trigger 4 builds, one against each jdk version.


### Default commands

If the `ci` section is blank, we will run a default command. This has the same effect as the yml snippet below:

```
build:
  ci:
    - lein test
```

To avoid executing the default command, include a simple command in like `pwd` or `ls` in this section.
