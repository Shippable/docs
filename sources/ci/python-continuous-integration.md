page_main_title: Python
main_section: CI
sub_section: Language guide

# Continuous Integration with Python
This page explains yml configuration that is specific to Python projects. For a complete yml reference, please read the [YML structure page](yml-structure/)

Our yml configuration is highly customizable. Please read the following sections carefully to learn how to
configure your builds.

-  [Basic configuration](#basic-python-config)
-  [Setting language and runtime](#language)
-  [Preparing your environment](#environment)
-  [Configuring build and test commands](#build-test)
-  [Test and code coverage visualizations](#test-coverage-reports)
-  [Advanced config](#advanced-config)

<a name="basic-python-config"></a>
##Basic configuration

The following `shippable.yml` should get you started with a simple Python project.

```
language: python

python:
  - 3.4
```

The snippet above will run the default command `if [ -f $SHIPPABLE_BUILD_DIR/requirements.txt ]; then pip install -r $SHIPPABLE_BUILD_DIR/requirements.txt; fi` with Python 3.4. To customize this configuration, please read the sections below.

<a name="language"></a>
##Setting language and runtime

For Python projects, the `language` tag should always be set to `python`. You can set the runtime to any version(s) using the `python` tag:

```
language: python

python:
  - 3.4
```
Our official build images, which are used to run your builds by default, come installed with multiple versions of Python. Currently, the following versions are pre-installed:

-  2.6
-  2.7 (default if no runtime specified)
-  3.2
-  3.3
-  3.4
-  3.5
-  3.6
-  pypy 4.0.1
-  pypy3 2.4.0

To find out which versions are supported out of the box for your build image, read our [Machine images overview](/reference/machine-images-overview/).

If you want to test against several versions of Python, you can specify multiple runtimes. The snippet below will trigger 2 builds, one against each version:

```
python:
  - 3.2
  - 3.3
```

**Important note:** The runtime tag only works with official CI images provided by Shippable. If you are using a custom image for your build, you will need to switch the runtime in the `ci` section of your yml using virtualenv.

<a name="environment"></a>
## Preparing your environment

If you're running a simple Python build, feel free to skip this section since you should not have to do anything to prepare the environment. Read this section only if your build needs specific environment variables or you have very custom requirements for your build image.

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
The `ci` section should contain all the build and test commands you need for your `ci` workflow. Commands in this section are executed sequentially. If any command fails, we exit this section with a non zero exit code.

### Installing dependencies
If needed, you can install your project dependencies using the `pip` command at the start of the `ci` section:

```
build:
  ci:
    - "pip install -r requirements.txt"
```

<a name="test-coverage-reports"></a>
## Test and code coverage
You can view your test and code coverage results in a consumable format and drill down further to find out which tests failed or which sections of your code were not covered by your tests.

Your tests results data needs to be in junit format and your code coverage results need to be in cobertura format in order to see these visualizations. Test and code coverage results need to be saved to shippable/testresults and shippable/codecoverage folders so that we can parse the reports.

Sample yml snippet using nose and python coverage:

```
build:
  ci:
    #Create folders for test and code coverage
    - mkdir -p shippable/testresults
    - mkdir -p shippable/codecoverage

    #Run test and code coverage and output results to the right folder
    - nosetests test.py --with-xunit --xunit-file=shippable/testresults/nosetests.xml
    - which python && coverage run --branch test.py
    - which python && coverage xml -o shippable/codecoverage/coverage.xml test.py
```

Sample yml snippet using pytest (pytest-cov required):

```
build:
  ci:
    #Create folders for test and code coverage
    - mkdir -p shippable/testresults
    - mkdir -p shippable/codecoverage

    #Run test and code coverage and output results to the right folder
    - pytest --junitxml=shippable/testresults/nosetests.xml
    - pytest --cov=modules --cov-report=xml:shippable/codecoverage/coverage.xml
```

<a name="advanced-config"></a>
##Advanced config

### Test against multiple versions of Django

You can test against multiple versions of DJANGO by setting the env key and then install the required dependencies for it in the ci section.

```
env:
- DJANGO_VERSION=1.2.7
- DJANGO_VERSION=1.3.7
- DJANGO_VERSION=1.4.10

build:
  ci:
    - pip install -q mock==0.8 Django==$DJANGO_VERSION
    - pip install .
```
Please note that the config above tests against several versions, and will trigger a build matrix consisting of 3 builds.

### Retrying installation of dependencies
Your dependencies can sometimes fail to install due to network glitches or other external transient factors. You can harden the command for installing dependencies by using `shippable_retry`. We will then retry the command up to 3 times if it returns a non-zero code.


```
build:
  ci:
    - shippable_retry pip install -r requirements.txt
```

### Default commands

If the `ci` section is blank, we will run the default command shown in the yml snippet below:

```
build:
  ci:
    - if [ -f $SHIPPABLE_BUILD_DIR/requirements.txt ]; then pip install -r $SHIPPABLE_BUILD_DIR/requirements.txt; fi
```

To avoid executing the default command, include a simple command in like `pwd` or `ls` in this section.
