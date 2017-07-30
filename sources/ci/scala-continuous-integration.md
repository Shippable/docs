page_main_title: Scala
main_section: CI
sub_section: Language guide
# Continuous Integration with Scala

This page explains yml configuration that is specific to Scala projects. For a complete yml reference, please read the [YML structure page](yml-structure/)

Our yml configuration is highly customizable. Please read the following sections carefully to learn how to
configure your builds.

-  [Basic configuration](#basic-scala-config)
-  [Setting language and runtime](#language)
-  [Preparing your environment](#environment)
-  [Configuring build and test commands](#build-test)
-  [Test and code coverage visualizations](#test-coverage-reports)
-  [Advanced config](#advanced-config)

<a name="basic-scala-config"></a>
##Basic configuration

The following `shippable.yml` should get you started with a simple Scala project.

```
language: scala

scala:
  - 2.12.1

```

The snippet above will run the default command `sbt ++$SHIPPABLE_SCALA_VERSION test` with Scala 2.12.1. To customize this configuration, please read the sections below.

<a name="language"></a>
##Setting language and runtime

For Scala projects, the `language` tag should always be set to `scala`. You can set the runtime to any version(s) using the `scala` tag:

```
language: scala

scala:
  - 2.9.3
```

Our official build images, which are used to run your builds by default, come installed with multiple versions of Scala. Currently, the following versions are pre-installed:

-  2.9.3
-  2.10.6
-  2.11.8
-  2.12.0
-  2.12.1

To find out which versions are supported out of the box for your build image, read our [Machine images overview](/platform/tutorial/runtime/ami-overview/).

If you want to test against several versions of Scala, you can specify multiple runtimes. The snippet below will trigger 2 builds, one against each version:

```
scala:
  - 2.9.3
  - 2.10.6
```

**Important note:** The runtime tag only works with official CI images provided by Shippable. If you are using a custom image for your build, you will need to switch the runtime in the `ci` section of your yml.

<a name="environment"></a>
## Preparing your environment

If you're running a simple Scala build, feel free to skip this section since you should not have to do anything to prepare the environment. Read this section only if your build needs specific environment variables or you have very custom requirements for your build image.

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
The Scala builder assumes dependency management based on projects like Maven, Gradle or SBT and it will pull down project dependencies automatically before running tests. You do not need to explicitly install dependencies in your yml.

### Using sbt
If you are using sbt to test,you can include your custom sbt command in the `ci` section with any options you want:  

```
build:
  ci:
    - sbt -jvm-opts <path to compile options> ... compile  
    - sbt -jvm-opts <path to test options> ... test

```

###Using maven, gradle, ant
If you are not using sbt, your project behaves very much like a Java project. Please read our [Java page](java-continuous-integration/) to learn how to use these tools.

mvn example:

```
jdk: oraclejdk8
build:
  ci:
    - mvn install -DskipTests=true -Dmaven.javadoc.skip=true -B -V
    - shippable_retry mvn clean test

```

<a name="test-coverage-reports"></a>
## Test and code coverage

You can view your test and code coverage results in a consumable format and drill down further to find out which tests failed or which sections of your code were not covered by your tests. We parse test and coverage reports stored in the shippable/testresults and shippable/codecoverage respectively.

To configure test reports visualization:

-  Run your tests as part of your CI workflow in the `ci` section.
-  Make sure test results are in junit format.
-  Output or copy test results to `shippable/testresults` folder.

To configure code coverage visualization:

-  Run your code coverage command(s) as part of your CI workflow in the `ci` section.
-  Make sure code coverage output is in cobertura xml format.
-  Output or copy code coverage output to `shippable/codecoverage` folder.

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

### Specifying branches to build
You can restrict which branches do or do not trigger your CI workflow. This is done with the `branches` tag. Read the [docs on Specifying branches](specify-branches/) for more information.

### Default commands

If the `ci` section is blank, we will run a default command. This has the same effect as the yml snippet below:

```
build:
  ci:
   - sbt ++$SHIPPABLE_SCALA_VERSION test
```

To avoid executing the default command, include a simple command in like `pwd` or `ls` in this section.
