page_main_title: C/C++
main_section: CI
sub_section: Language guide
page_title: Continuous Integration for C/C++ projects
page_description: How to do Continuous Integration for C/C++ projects in Shippable

# Continuous Integration for C/C++ projects

This page explains yml configuration that is specific to C/C++ projects. For a complete yml reference, please read the [YML structure page](yml-structure/)

Our yml configuration is highly customizable. Please read the following sections carefully to learn how to
configure your builds.

-  [Basic configuration](#basic-cpp-config)
-  [Setting language and runtime](#language)
-  [Preparing your environment](#environment)
-  [Configuring build and test commands](#build-test)
-  [Test and code coverage visualizations](#test-coverage-reports)
-  [Advanced config](#advanced-config)

<a name="basic-cpp-config"></a>
##Basic configuration

The following `shippable.yml` should get you started with a simple C/C++ project.


```
language: c

compiler:
  - gcc
```

The snippet above will run the default command `./configure && make && make test`. To customize this configuration, please read the sections below.

<a name="language"></a>
##Setting language and runtime

For C/C++ projects, the `language` tag should always be set to `c`. You can set the compiler to gcc or clang to any version(s) using the `compiler` tag:

```
language: c

compiler:
  - gcc
```

Our official build images, which are used to run your builds by default, come installed with multiple versions of C/C++ compilers.

To find out which versions are supported out of the box for your build image, read our [languages overview for C/C++](/platform/runtime/machine-image/language-versions/#cc).

You can also test against multiple compilers by specifying them all:

```
compiler:
  - gcc
  - clang
```

**Important note:** The compiler tag only works with official CI images provided by Shippable. If you are using a custom image for your build, you will need to switch the compiler in the `ci` section of your yml.

<a name="environment"></a>
## Preparing your environment

If you're running a simple Scala build, feel free to skip this section since you should not have to do anything to prepare the environment. Read this section only if your build needs specific environment variables or you have very custom requirements for your build image.

###Setting environment variables
You can define any custom environment variables in the `env` section of your yml. Please read the [docs on Environment variables](env-vars/) for more information.

###Overriding the default build image

Depending on the `language` tag in your yml, an official build image is chosen for your build by default, and your build container is started with standard options. To find out the default image used for your builds, please read the [Machine images overview](../platform/runtime/machine-image/ami-overview/).

If the default image does not satisfy your requirements, you can do one of three things:

-  Continue using default image and include commands to install any missing dependencies or packages in your yml
-  [Switch your Machine Image](../ci/build-image/#changing-your-default-tag) to a more recent version that contains what you need
-  [Use a custom build image](../ci/custom-docker-image/) that contains exactly what you need for your CI. Please note that this will add time to your build since the image will be pulled from a registry.

<a name="build-test"></a>
## Configuring build and test commands
The `ci` section should contain all commands you need for your `ci` workflow. Commands in this section are executed sequentially. If any command fails, we exit this section with a non zero exit code.

### Installing dependencies
You can install the required dependencies for your project:

```
build:
  ci:
    - ./install.sh
    - command2
```


### Adding test commands
After installing dependencies, you can include your test commands. For example:  

```
build:
  ci:
    - make test
```

<a name="test-coverage-reports"></a>
## Test and code coverage
You can view your test and code coverage results in a consumable format and drill down further to find out which tests failed or which sections of your code were not covered by your tests.

Your tests results data needs to be in junit format and your code coverage results need to be in cobertura format in order to see these visualizations. Test and code coverage results need to be saved to shippable/testresults and shippable/codecoverage folders so that we can parse the reports.

<a name="advanced-config"></a>
##Advanced config
## Default commands

If the `ci` section is blank, we will run a default command. This has the same effect as the yml snippet below:

```
build:
  ci:
    - ./configure && make && make test
```

To avoid executing the default command, include a simple command in like `pwd` or `ls` in this section.
