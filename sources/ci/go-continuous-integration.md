page_main_title: Go
main_section: CI
sub_section: Language guide
page_title: Continuous integration with Go

# Continuous Integration with Go
This page explains yml configuration that is specific to Go projects. For a complete yml reference, please read the [YML structure page](yml-structure/)

Our yml configuration is highly customizable. Please read the following sections carefully to learn how to
configure your builds.

-  [Basic configuration](#basic-go-config)
-  [Setting language and runtime](#language)
-  [Preparing your environment](#environment)
-  [Configuring build and test commands](#build-test)
-  [Test and code coverage visualizations](#test-coverage-reports)
-  [Advanced config](#advanced-config)

<a name="basic-go-config"></a>
##Basic configuration

The following `shippable.yml` should get you started with a simple Go project.

```
language: go

go:
  - 1.6
```

The snippet above will run the default commands `go get -d -v ./... && go build -v ./...` and `go test -v ./...` with Go 1.6. To customize this configuration, please read the sections below.

<a name="language"></a>
##Setting language and runtime

For Go projects, the `language` tag should always be set to `go`. You can set the runtime to any version(s) using the `go` tag:

```
language: go

go:
  - 1.6
```

Our official build images, which are used to run your builds by default, come installed with multiple versions of Go. Currently, the following versions are pre-installed:

-  1.1
-  1.2
-  1.3
-  1.4
-  1.5
-  1.5.4
-  1.6
-  1.6.4
-  1.7
-  1.7.5

To find out which versions are supported out of the box for your build image, [TODO: How do they figure out what is available to them by default??]

If you want to test against several versions of Go, you can specify multiple runtimes. The snippet below will trigger 2 builds, one against each version:

```
go:
  - 1.6
	- 1.7

```

**Important note:** The runtime tag only works with official CI images provided by Shippable. If you are using a custom image for your build, you will need to switch the runtime in the `ci` section of your yml.

<a name="environment"></a>
## Preparing your environment

If you're running a simple Go build, feel free to skip this section since you should not have to do anything to prepare the environment. Read this section only if your build needs specific environment variables or you have very custom requirements for your build image.

###Setting environment variables
You can define any custom environment variables in the `env` section of your yml. Please read the [docs on Environment variables](env-vars/) for more information.

###Overriding the default build image
Depending on the `language` tag in your yml, an official build image is chosen for your build by default, and your build container is started with standard options. To find out the default image used for your builds, please read the [Machine images overview](../reference/machine-images-overview/).

If the default image does not satisfy your requirements, you can do one of three things:

-  Continue using default image and include commands to install any missing dependencies or packages in your yml
-  [Switch your Machine Image](../ci/build-image/#changing-your-default-tag) to a more recent version that contains what you need
-  [Use a custom build image](../ci/custom-docker-image/) that contains exactly what you need for your CI. Please note that this will add time to your build since the image will be pulled from a registry.

<a name="build-test"></a>
## Configuring build and test commands
The `ci` section should contain all commands you need for your `ci` workflow. Commands in this section are executed sequentially. If any command fails, we exit this section with a non zero exit code.

### Installing dependencies
If needed, you can install your project dependencies using the `pip` command in this section:

```
build:
  ci:
    - go get github.com/onsi/gomega
    - go get github.com/onsi/ginkgo
```

### Running tests
Include your test command in the ci section, after you've installed any required dependencies.

```
build:
  ci:
    - go test -v ./...
```

<a name="test-coverage-reports"></a>
## Test and code coverage
You can view your test and code coverage results in a consumable format and drill down further to find out which tests failed or which sections of your code were not covered by your tests.

Your tests results data needs to be in junit format and your code coverage results need to be in cobertura format in order to see these visualizations. Test and code coverage results need to be saved to shippable/testresults and shippable/codecoverage folders so that we can parse the reports.

<a name="advanced-config"></a>
##Advanced config
### Retrying installation of dependencies
Your dependencies can sometimes fail to install due to network glitches or other external transient factors. You can harden the command for installing dependencies by using `shippable_retry`. We will then retry the command up to 3 times if it returns a non-zero code.


```
build:
  ci:
    - shippable_retry go get github.com/onsi/gomega
```

### Default commands

If the `ci` section is blank, we will run some default commands. These have the same effect as the yml snippet below:

```
build:
  ci:
    - go get -d -v ./... && go build -v ./...
    - go test -v ./...
```

To avoid executing the default command, include a simple command in like `pwd` or `ls` in this section.
