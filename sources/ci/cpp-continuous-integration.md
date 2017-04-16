main_section: CI
sub_section: Language guide

# C/C++

This page explains yml configuration that is specific to C/C++ projects. For a complete yml reference, please read the [YML structure page](yml-structure/)

##yml configuration

The sections below explore sections of the yml that are specific to C/C++ projects.


###language


For C/C++ projects, this tag should always be set to c as show below:

```
language: c
```

### compiler

You can set the compiler you want to use using the `compiler` tag:

```
compiler:
  - gcc
```

You can also test against multiple versions of compilers by specifying them all in this section:

```
compiler:
  - gcc
  - clang
```

**Important note:** The compiler tag only works with official CI images provided by Shippable. If you are using a custom image for your build, you will need to switch the compiler in the `ci` section of your yml.

### pre_ci and pre_ci_boot

Depending on the `language` and `services` tags in your yml, an official build image is chosen for your build by default, and your build container is started with standard options. The default images for C/C++ builds are explained below.

The pre_ci and pre_ci_boot sections are primarily used in one of the following scenarios:

* You want to use a custom Docker image for your CI
* You want to override the default options that are used to boot up the default CI image

If you do not want to do either of the above, you should skip these tags in the yml.

#### Default C/C++ image

If you do not specify anything in the `pre_ci_boot` section of your yml, a default image will be used to spin to the build container for your C/C++ projects.

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
You can install the required dependencies for your project:

```
build:
  ci:
    - ./install.sh
    - command2
```


#### Adding test commands
After installing dependencies, you can include your test commands. For example:  

```
build:
  ci:
    - make test
```


#### Test and code coverage
You can view your test and code coverage results in a consumable format and drill down further to find out which tests failed or which sections of your code were not covered by your tests.

Your tests results data needs to be in junit format and your code coverage results need to be in cobertura format in order to see these visualizations. Test and code coverage results need to be saved to shippable/testresults and shippable/codecoverage folders so that we can parse the reports.


#### Default commands

If the `ci` section is blank, we will run a default command. This has the same effect as the yml snippet below:

```
build:
  ci:
    - ./configure && make && make test
```

To avoid executing the default command, include a simple command in like `pwd` or `ls` in this section.
