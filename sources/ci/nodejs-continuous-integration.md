main_section: CI
sub_section: Language guide
# Continuous Integration with Node.js

Node.js is the number one language used to build projects on Shippable. This page explains yml configuration that is specific to node.js projects. For a complete yml reference, please read the [YML structure section](yml-structure/)

Our yml configuration is highly customizable. Please read the following sections carefully to learn how to
configure your builds.

-  [Basic configuration](#basic-node-config)
-  [Setting language and runtime](#language)
-  [Preparing your environment](#environment)
-  [Configuring build and test commands](#build-test)
-  [Test and code coverage visualizations](#test-coverage-reports)
-  [Advanced config](#advanced-config)
-  [Sample project](#sample-node-project)

<a name="basic-node-config"></a>
##Basic configuration

The following `shippable.yml` should get you started with a simple Node.js project.

```
language: node_js

node_js:
  - 4.2.3

```

The snippet above will run the default commands `npm install` and `npm test` with Node.js 4.2.3. To customize this configuration, please read the sections below.

<a name="language"></a>
##Setting language and runtime

For Node.js projects, the `language` tag should always be set to `node_js`. You can set the runtime to any version(s) using the `node_js` tag:

```
language: node_js

node_js:
  - 4.2.3
```

Our official build images, which are used to run your builds by default, come installed with multiple versions of Node. Currently, the following versions are pre-installed:

-  0.10
-  0.12 (default if no runtime specified)
-  4.2.3
-  4.6.0
-  5.12.0
-  6.7.0
-  6.8.0
-  6.9.4
-  7.0.0
-  7.2.1
-  7.3.0
-  7.4.0
-  iojs 1.0
-  iojs 2.0
-  iojs 3.3.1

To find out which versions are supported out of the box for your build image, [TODO: How do they figure out what is available to them by default??]

If you want to test against several versions of Node.js, you can specify multiple runtimes. The snippet below will trigger 2 builds, one against each version:

```
node_js:
  - "0.10"
  - 7.0.0
```
Please note that the `0.10` version is inside double quotes. This is to prevent our parser from incorrectly interpreting the language version to be `0.1`. For any version ending with a 0, remember to use double quotes around the version number.

**Important note:** The runtime tag only works with official CI images provided by Shippable. If you are using a custom image for your build, you will need to switch the runtime in the `ci` section of your yml with the `nvm use <version>` command.

<a name="environment"></a>
## Preparing your environment

If you're running a simple Node.js build, feel free to skip this section since you should not have to do anything to prepare the environment. Read this section only if your build needs specific environment variables or you have very custom requirements for your build image.

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
The `ci` section should contain all commands you need for your `ci` workflow. Commands in this section are executed sequentially. If any command fails, we exit this section with a non zero exit code.

### Installing dependencies
If needed, you can install your project dependencies using [NPM](http://npmjs.org/) in the `ci` section:

```
build:
  ci:
    - npm install -g grunt-cli
```

### Test using npm
Following the installation of dependencies, you can include your test commands in the `ci` section:

```
build:
  ci:
    - npm test

```

### Default behavior

If the `ci` section is blank, then we will run the default command `npm install`, so it has the same effect the same as the yml snippet below:

```
build:
  ci:
    - npm install
```

<a name="test-coverage-reports"></a>
## Test and code coverage
You can view your test and code coverage results in a consumable format and drill down further to find out which tests failed or which sections of your code were not covered by your tests.

Your tests results data needs to be in junit format and your code coverage results need to be in cobertura format in order to see these visualizations. Test and code coverage results need to be saved to shippable/testresults and shippable/codecoverage folders so that we can parse the reports.

Sample yml snippet:

```
env:
  # Set environment variable for test results output
  - XUNIT_FILE=shippable/testresults/result.xml

build:
  ci:
    #Run tests
    - npm test

    #Generate coverage report with istanbul
    - ./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha -- --ui=bdd --reporter=xunit-file
    - ./node_modules/.bin/istanbul report cobertura --dir shippable/codecoverage/
```

### Testing with older versions of node

If you want to build a project with node versions like 0.6, 0.8, 0.10, and 0.11 and want to use the same package.json, add the following line to your yml file, which will upgrade the npm to v.1.4 for node versions 0.6 and 0.8.

```
if [[ $SHIPPABLE_NODE_VERSION =~ [0].[6-8] ]]; then npm install -g npm@~1.4.6; fi
```

<a name="advanced-config"></a>
##Advanced config

#### Caching node modules

To avoid installing your node modules each time, you can cache them with the following yml snippet:

```
build:
  cache: true
  cache_dir_list:
    - $SHIPPABLE_BUILD_DIR/node_modules
```

#### Retrying installation of dependencies
Your dependencies can sometimes fail to install due to network glitches or other external transient factors. You can harden the command for installing dependencies by using `shippable_retry`. We will then retry the command up to 3 times if it returns a non-zero code.


```
build:
  ci:
    - shippable_retry sudo npm install
```

<a name="sample-node-project"></a>
## Sample project

Here are some links to a working sample of this scenario. This is a simple Node.js application that runs some tests and then pushes
the image to Docker Hub.

**Source code:**  [devops-recipes/basic-node](https://github.com/devops-recipes/basic-node).

**Build link:** [CI build on Shippable](https://app.shippable.com/github/devops-recipes/basic-node/runs/1/1/console)

**Build status badge:** [![Run Status](https://api.shippable.com/projects/58e6d62aeb789d070092ee2e/badge?branch=master)](https://app.shippable.com/github/devops-recipes/basic-node)

## Related blogs

* [Getting started with CI for a node.js application](http://blog.shippable.com/get-started-with-continuous-integration-for-nodejs-app)
* [Testing against multiple versions of Node.js](http://blog.shippable.com/how-to-test-your-node.js-app-against-multiple-versions-of-node)
* [Setting up test results visualizations](http://blog.shippable.com/setting-up-continuous-integration-test-result-visualization)
* [Setting up code coverage](http://blog.shippable.com/setting-up-code-coverage-visualization-for-tests-in-ci)
* [Containerized microservices with Docker and Node.js](http://blog.shippable.com/microtizing-monoliths-containerized-microservices-with-docker-and-nodejs)
* [Configuring a build status badge](http://blog.shippable.com/configuring-a-visual-indicator-for-a-node.js-project-status)
