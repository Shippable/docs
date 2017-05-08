page_main_title: Java
main_section: CI
sub_section: Language guide

# Continuous Integration with Java
This page explains yml configuration that is specific to Java projects. For a complete yml reference, please read the [YML structure page](yml-structure/)

Our yml configuration is highly customizable. Please read the following sections carefully to learn how to
configure your builds.

-  [Basic configuration](#basic-java-config)
-  [Setting language and runtime](#language)
-  [Preparing your environment](#environment)
-  [Configuring build and test commands](#build-test)
-  [Test and code coverage visualizations](#test-coverage-reports)
-  [Advanced config](#advanced-config)

<a name="basic-java-config"></a>
##Basic configuration

The following `shippable.yml` should get you started with a simple Java project.

```
language: java

jdk:
  - oraclejdk8
```
The snippet above will run the default command described in the [default commands section](#default-java-cmd) with oraclejdk8. To customize this configuration, please read the sections below.

<a name="language"></a>
##Setting language and runtime

For Java projects, the `language` tag should always be set to `java`. You can set the runtime to any version(s) using the `jdk` tag:

```
language: java

jdk:
  - oraclejdk8
```

Our official build images, which are used to run your builds by default, come installed with multiple versions of Java. Currently, the following versions are pre-installed:

-  openjdk7
-  openjdk8
-  oraclejdk7
-  oraclejdk8

To find out which versions are supported out of the box for your build image, [TODO: How do they figure out what is available to them by default??]

If you want to test against several versions of Java, you can specify multiple runtimes. The snippet below will trigger 2 builds, one against each version:

```
jdk:
  - openjdk7
  - oraclejdk7
```

**Important note:** The runtime tag only works with official CI images provided by Shippable. If you are using a custom image for your build, you will need to switch the runtime in the `ci` section of your yml using `update-alternatives`.

<a name="environment"></a>
## Preparing your environment

If you're running a simple Java build, feel free to skip this section since you should not have to do anything to prepare the environment. Read this section only if your build needs specific environment variables or you have very custom requirements for your build image.

###Overriding the default build image

Depending on the `language` tag in your yml, an official build image is chosen for your build by default, and your build container is started with standard options. To find out the default image used for your builds, please read the [Machine images overview](../reference/machine-images-overview/).

If the default image does not satisfy your requirements, you can do one of three things:

-  Continue using default image and include commands to install any missing dependencies or packages in your yml
-  [Switch your Machine Image](../ci/build-image/#changing-your-default-tag) to a more recent version that contains what you need
-  [Use a custom build image](../ci/custom-docker-image/) that contains exactly what you need for your CI. Please note that this will add time to your build since the image will be pulled from a registry.

###Setting environment variables
You can define any custom environment variables in the `env` section of your yml. Please read the [docs on Environment variables](env-vars/) for more information.

<a name="build-test"></a>
## Configuring build and test commands
The `ci` section should contain all build and test commands you need for your `ci` workflow. Commands in this section are executed sequentially. If any command fails, we exit this section with a non zero exit code.

<a name="test-coverage-reports"></a>
## Test and code coverage
You can view your test and code coverage results in a consumable format and drill down further to find out which tests failed or which sections of your code were not covered by your tests.

Your tests results data should be in junit format and your code coverage results should be in cobertura or Jacoco format in order to see these visualizations. Test and code coverage results need to be saved to `shippable/testresults` and `shippable/codecoverage` folders so that we can parse the reports.

Sample yml snippet using nose and python coverage:

```  
build:
  ci:
    #Create folders for test and code coverage
    - mkdir -p shippable/testresults
    - mkdir -p shippable/codecoverage

    #Run test and code coverage and output results to the right folder
    - mvn clean cobertura:cobertura
```

For Jacoco, we also support more [advanced reporting formats](../../tutorials/ci/code-coverage-jacoco/).

<a name="advanced-config"></a>
##Advanced config

### Multi-module Maven builds
When using multi-module (Reactor) builds, please remember to output all the coverage and tests reports to the (top-level) repository directory. This can be tricky, as the Cobertura plugin resolves output directory differently from Surefire plugin. The most straightforward way of dealing with this issue is to define plugin configuration in the top-level module, using shippable/codecoverage path for Cobertura plugin and ../shippable/testresults for Surefire plugin:

```
<plugin>
  <groupId>org.codehaus.mojo</groupId>
  <artifactId>cobertura-maven-plugin</artifactId>
  <version>2.6</version>
  <configuration>
    <format>xml</format>
    <maxmem>256m</maxmem>
    <aggregate>true</aggregate>
    <outputDirectory>shippable/codecoverage</outputDirectory>
  </configuration>
</plugin>
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-surefire-plugin</artifactId>
  <version>2.17</version>
  <configuration>
    <redirectTestOutputToFile>true</redirectTestOutputToFile>
    <reportsDirectory>../shippable/testresults</reportsDirectory>
  </configuration>
  <dependencies>
    <dependency>
      <groupId>org.apache.maven.surefire</groupId>
      <artifactId>surefire-junit4</artifactId>
      <version>2.7.2</version>
    </dependency>
  </dependencies>
</plugin>

```

#### Retrying installation of dependencies
Your dependencies can sometimes fail to install due to network glitches or other external transient factors. You can harden the command for installing dependencies by using `shippable_retry`. We will then retry the command up to 3 times if it returns a non-zero code.


```
build:
  ci:
    - shippable_retry mvn install -DskipTests=true
```

<a name="default-java-cmd"></a>
### Default commands

If the `ci` section is blank, we will run some default commands as explained below.

* If your repository root does not have gradle or maven files, then our Java builder will use Ant. This is the same as the snippet below:

```
build:
  ci:
    - ant test
```
* If your repository has a pom.xml file at the root, then our Java builder will use Maven 3:

```
build:
  ci:
   - mvn install -DskipTests=true
```

* If your repository has a build.gradle file at the root, then our Java builder will use gradle:

```
build:
  ci:
   - gradle assemble
```

To avoid executing the default command, include a simple command in like `pwd` or `ls` in this section.

###Advanced test reports

When using Jacoco for code coverage, Shippable supports creating advanced test reports that provide information well beyond the typical summary.

* You must make sure to save all of the correct output from the result of the Jacoco processing.  Typically, Jacoco creates a folder structure like `target/site/jacoco/jacoco.xml`.  For simple reporting, copying the jacoco.xml file is good enough, but for advanced reporting, Shippable requires that the whole `target` directory is copied to the `shippable/codecoverage` folder.

```
build:
  advancedReporting: true
  ci:
    - mvn install  
    - cp -r target shippable/codecoverage
```

This will allow Shippable to use additional metadata about your tests to produce more detailed reports.

Note:
`advancedReporting` flag has been deprecated. All test reports will have advanced reporting turned on by default.

 Check out our [Jacoco sample project](https://github.com/shippableSamples/sample_jacoco) on Github to see it in action.
