main_section: CI
sub_section: Language guide

# Continuous Integration with Node

Node.js is the number one language used to build projects on Shippable. This page explains yml configuration that is specific to node.js projects. For a complete yml reference, please read the [YML structure section](yml-structure.md)

##yml configuration

The sections below explore sections of the yml that are specific to Node.js projects.

###language


For Node.js projects, this tag should always be set to node_js as show below:

```
language: node_js
```

### runtime

You can set the runtime to any version(s) included in your CI image using the `node_js` tag:

```
node_js:
  - 4.2.3
```

If you want to test against several versions of Node, you can specify multiple runtimes. The snippet below will trigger 2 builds, one against each version:

```
node_js:
  - "0.10"
  - 7.4.0
```
Please note that the `0.10` version is inside double quotes. This is to prevent our parser from incorrectly interpreting the language version to be `0.1`. For any version ending with a 0, remember to use double quotes around the version number.

**Important note:** The runtime tag only works with official CI images provided by Shippable. If you are using a custom image for your build, you will need to switch the runtime in the `ci` section of your yml with the `nvm use <version>` command.

### pre_ci and pre_ci_boot

Depending on the `language` and `services` tags in your yml, an official build image is chosen for your build by default, and your build container is started with standard options.

As shown in the picture below, your build container is a Docker container and is spun up on your build machine. Your codebase is copied into your build container and instructions from your shippable.yml are executed inside this container. The Docker image used to spin up your build container must either contain all dependencies required for your build, or you must install the dependencies in your shippable.yml.

<img src="../../images/advancedOptions/shippableBuildContainer.png"
alt="Build container" style="width:800px;"/>

The default images for Node.js builds are explained in the section below.

The pre_ci and pre_ci_boot sections are primarily used in one of the following scenarios:

* You want to use a custom Docker image to spin up your build container
* You want to override the default options that are used to boot up the default build container

If you do not want to do either of the above, you should skip these tags in the yml.

#### Default Node.js images

If you do not specify anything in the `pre_ci_boot` section of your yml, a default image will be used to spin to the build container for your Node projects.

To find out the default image used for your builds, please check the [Machine images overview](../machine-images/overview/).

If the default images do not satisfy your requirements, you can do one of two things:

- Continue using default image and include commands to install any missing dependencies or packages in your yml
- Switch your Machine Image to a more recent version that contains what you need
- Use a custom build image that contains exactly what you need for your CI. Please note that this will add time to your build since the image will be pulled from a registry.

#### Using a custom build image
If you do decide to use a custom CI image, you will need to configure the `pre_ci_boot` section and optionally, the `pre_ci` section if you're also building the CI image as part of the workflow. Details on how to configure this are available in the [Choosing a build image page](build-image/).

### ci
The `ci` section should contain all commands you need for your `ci` workflow. Commands in this section are executed sequentially. If any command fails, we exit this section with a non zero exit code.

#### Default commands

If the `ci` section is blank, then we will run the default command `npm install`, so it has the same effect the same as the yml snippet below:

```
build:
  ci:
    - npm install
```

#### Installing dependencies
If needed, you can install your project dependencies using [NPM](http://npmjs.org/) in this section:

```
build:
  ci:
    - npm install -g grunt-cli
```

#### Test and code coverage
You can view your test and code coverage results in a consumable format and drill down further to find out which tests failed or which sections of your code were not covered by your tests.

Your tests results data needs to be in junit format and your code coverage results need to be in cobertura format in order to see these visualizations. Test and code coverage results need to be saved to shippable/testresults and shippable/codecoverage folders so that we can parse the reports.

Sample yml snippet:

```
env:
  # Set environment variable for test results output
  - XUNIT_FILE=shippable/testresults/result.xml

build:
  ci:
    #Create folders for test and code coverage
    - mkdir -p shippable/testresults
    - mkdir -p shippable/codecoverage

    #Run tests
    - npm test

    #Generate coverage report with istanbul
    - ./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha -- --ui=bdd --reporter=xunit-file
    - ./node_modules/.bin/istanbul report cobertura --dir shippable/codecoverage/
```

#### Testing with older versions of node

If you want to build a project with node versions like 0.6, 0.8, 0.10, and 0.11 and want to use the same package.json, add the following line to your yml file, which will upgrade the npm to v.1.4 for node versions 0.6 and 0.8.

```
if [[ $SHIPPABLE_NODE_VERSION =~ [0].[6-8] ]]; then npm install -g npm@~1.4.6; fi
```

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

## Sample projects

[Basic Node.js sample project](https://github.com/shippableSamples/sample_nodejs)

## Related blogs

* [Getting staryed with CI for a node.js application](http://blog.shippable.com/get-started-with-continuous-integration-for-nodejs-app)
* [Testing against multiple versions of Node.js](http://blog.shippable.com/how-to-test-your-node.js-app-against-multiple-versions-of-node)
* [Setting up test results visualizations](http://blog.shippable.com/setting-up-continuous-integration-test-result-visualization)
* [Setting up code coverage](http://blog.shippable.com/setting-up-code-coverage-visualization-for-tests-in-ci)
* [Containerized microservices with Docker and Node.js](http://blog.shippable.com/microtizing-monoliths-containerized-microservices-with-docker-and-nodejs)
* [Configuring a build status badge](http://blog.shippable.com/configuring-a-visual-indicator-for-a-node.js-project-status)
