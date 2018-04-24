page_description: Build and Push a Docker image to Docker registry on JFrog Artifactory
main_section: CI
sub_section: Docker

# Build and Push Docker Image to Docker Registry on JFrog Artifactory

This tutorial explains how to continuously build and push a Node.js based web application to a Docker Registry hosted on JFrog Artifactory. We are using an application that has basic CI tests.

This document assumes you're familiar with the following concepts:

* [Docker Registry on JFrog Artifactory](https://www.jfrog.com/confluence/display/RTF/Docker+Registry)
* [Docker build](https://docs.docker.com/engine/reference/commandline/build/)
* [Docker push](https://docs.docker.com/engine/reference/commandline/push/)
* [Docker login](https://docs.docker.com/engine/reference/commandline/login/)
* [Dockerfile](https://docs.docker.com/engine/reference/builder/)

## Manual Steps to Build
This section covers step by step instructions to manually build your Docker image

* Create a GitHub repo that will hold the code to build the image. For this e.g. full source code is available [here](https://github.com/devops-recipes/node_app_jfrog)
* Have the URL, UserName and Password to your Docker Registry on JFrog Artifactory
* Install Docker on your local machine. More information is in [Getting Started Guide](https://docs.docker.com/get-started/)
* Install JFrog CLI on your local machine. More information is in [JFrog CLI site](https://jfrog.com/getcli/)
* Login to docker `docker login` with your credentials and the URL to your repo. It looks something like this `docker login devopsrecipes-dr.jfrog.io` and follow the prompt
* Your Dockerfile will look something like below

**Dockerfile**
```
FROM readytalk/nodejs

# Add our configuration files and scripts
WORKDIR /app
ADD . /app
RUN npm install
EXPOSE 80

ENTRYPOINT ["/nodejs/bin/npm", "start"]
```
* Build your image by executing this command. `$DOCKER_REG` is the name of your account `$DOCKER_IMG` is your image name and `$BUILD_NUMBER` is your tag

```
docker build -t $DOCKER_REG/$DOCKER_REPO:$BUILD_NUMBER .
```

* Now you can push this image to your hub by executing this command.

```
sudo docker push $DOCKER_REG/$DOCKER_REPO:$BUILD_NUMBER
```

If you're unfamiliar with Docker Registry hosted on JFrog Artifactory, you should start with learning how to implement this scenario manually. Refer to our blog for a step-by-step tutorial: [Node.js CI: Build and Push a Node application to Docker Registry on JFrog Artifactory](http://blog.shippable.com/node-ci-jfrog-artifactory).

There are many challenges with manually executing this CI workflow. First, you should execute it for every commit against the latest codebase, which is difficult to enforce manually. Second, if you want to trigger a dependent multi-stage workflow which deploys this application to Test, Staging environments and runs test suites, you will have to manually handle all that as well. This leads to overdependence on people and isn't efficient.

If you want to achieve frictionless development, you should automate your CI workflow.


## Automating Build and Push to JFrog Artifactory

This tutorial will show you how to automate your workflow using Shippable's native CI feature.

To jump into this tutorial, you will need to familiarize yourself with a few platform concepts.

### Concepts

* [Integrations](/platform/integration/overview/)
 * [Docker Registry](/platform/integration/dockerRegistryLogin)
* [How CI works on Shippable](/ci/why-continuous-integration/)

### Step-by-step instructions

The following sections explain the process of configuring a CI workflow to continuously test, build and push a Node.js Dockerized app to Docker Registry on JFrog Artifactory. 

**Source code is available at [devops-recipes/node_app_jfrog](https://github.com/devops-recipes/node_app_jfrog)**

**Complete YML is at [devops-recipes/node_app_jfrog/shippable.yml](https://github.com/devops-recipes/node_app_jfrog/blob/master/shippable.yml)**

####1. Add necessary Account Integrations

Integrations are used to connect Shippable Platform with external providers. More information about integrations is [here](/platform/tutorial/integration/howto-crud-integration/). The following are the integrations that we will use in this sample

#####1a. Add `Docker Registry` Integration

To be able to push and pull images from Docker Hub, we need to add the `drship_jf_docker` integration.

Detailed steps on how to add a Docker Registry Integration are [here](/platform/integration/dockerRegistryLogin/#creating-an-account-integration). 

Make sure you name the integration `drship_jf_docker` since that is the name we're using in our sample automation scripts. Also, set the right Docker URL based on where your registry is present. In our case it is `https://devopsrecipes-dr.jfrog.io`, where `dr` is our registry name. 

Detailed steps on how to add a Key value Integration are [here](/platform/integration/key-value/#creating-an-account-integration).

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step

####2. Author CI configuration

The platform is built with "Everything as Code" philosophy, so all configuration is in a YAML-based file called **shippable.yml**, which is parsed to create your CI workflow.

Detailed CI configuration info is [here](/ci/yml-structure/).

#####2a. Add empty shippable.yml to your repo

Add an empty **shippable.yml** to the the root of your repo.

#####2b. Add `ci` section of the config

Configure CI by adding the following code to **shippable.yml**:

```
language: node_js

integrations:
  hub:
    - integrationName: drship_jf_docker
      type: dockerRegistryLogin

branches:
  only:
    - master

env:
  global:
    - TEST_RESULTS_DIR=$SHIPPABLE_REPO_DIR/shippable/testresults
    - CODE_COVERAGE_DIR=$SHIPPABLE_REPO_DIR/shippable/codecoverage
    - TESTS_LOC_DIR=$SHIPPABLE_REPO_DIR/tests
    - MOD_LOC=$SHIPPABLE_REPO_DIR/node_modules/.bin/
    - JFROG_ARTIFACTORY_IMG="node_app_jfrog"
    - JFROG_ARTIFACTORY_REG=devopsrecipes-dr.jfrog.io # {account name}

build:
  ci:
    - shipctl retry "npm install"
    - mkdir -p $TEST_RESULTS_DIR && mkdir -p $CODE_COVERAGE_DIR
    - pushd $TESTS_LOC_DIR
    - $MOD_LOC/mocha --recursive "$TESTS_LOC_DIR/**/*.spec.js" -R mocha-junit-reporter --reporter-options mochaFile=$TEST_RESULTS_DIR/testresults.xml
    - $MOD_LOC/istanbul --include-all-sources cover -root "$SHIPPABLE_REPO_DIR/routes" $SHIPPABLE_REPO_DIR/node_modules/mocha/bin/_mocha -- -R spec-xunit-file --recursive "$TESTS_LOC_DIR/**/*.spec.js"
    - $MOD_LOC/istanbul report cobertura --dir $CODE_COVERAGE_DIR
    - popd

  post_ci:
    - docker build -t $JFROG_ARTIFACTORY_REG/$JFROG_ARTIFACTORY_IMG:$BRANCH.$BUILD_NUMBER .
    - docker push $JFROG_ARTIFACTORY_REG/$JFROG_ARTIFACTORY_IMG:$BRANCH.$BUILD_NUMBER

```

The above YML does the following things:

* Language is set to Node.js
* The integration is referenced here to automatically inject Docker Registry credentials
* The `build` section contains scripts to build and push your Node.js app packaged as a Docker image

####3. Enable the repo for CI

For automated builds, we need to enable the project for CI, which will automatically create the webhooks required to continuously build the project.

Detailed steps on enabling a repo are [here](/ci/enable-project/).

####4. Run your CI Project

You can either manually trigger your CI project or commit a change to the application git repository which should automatically build your project.

Verify that your repository was created on JFrog Docker Registry!

## Adding CD capability

CI is a developer focused activity that produces a deployable unit of your application, a Docker image in this instance. If you want to add a Continuous Delivery workflow which deploys your application into successive environments like Test, Staging, Production and runs test suites, the downstream jobs performing these activities will need to know where to find your Docker image.

This section shows how you can output your Docker image information into a `image` resource which can be used by downstream jobs.

### Concepts

Here are the additional concepts you need to know before you start:

* [Workflow overview](/platform/workflow/overview/)
* [Resources](/platform/workflow/resource/overview/)
 * [image](/platform/workflow/resource/image)
* [Jobs](/platform/workflow/job/overview/)
 * [runCI](/platform/workflow/job/runci)

### Instructions

####1. Author Assembly Line configuration

Your Assembly Line config is also stored in **shippable.yml**, but the structure is quite different from CI config. Detailed AL configuration info is [here](/deploy/configuration).

#####1a. Add `resources` section of the config

`resources` section defines the params resource which will hold information about the Docker image and its location.

```
resources:
  - name: node_app_img_jf
    type: image
    integration: drship_jf_docker # replace with your integration name
    versionTemplate:
      sourceName: "devopsrecipes-dr.jfrog.io/node_app_jfrog" # replace with your Hub URL
      versionName: latest
```

######i. image resource named `node_app_img_jf`
An image resource contains information about the Docker image. We are setting the integration to `drship_jf_docker` which was the same integration that we created above. `sourceName` is the full URL of the image and `versionName` is the tag.

Detailed info about `image` resource is [here](/platform/workflow/resource/image).

#####1b. Add `jobs` section of the config**

A job is an execution unit of the assembly line.

In order to treat your CI workflow like an Assembly Line job, i.e. be able to define `IN` and `OUT` resources, you need to define a `runCI` job with the name of your repository appended by `_runCI`.

In this section, we will define the `runCI` job that will specify the `node_app_img_jf` as an `OUT`, meaning your CI workflow will update this resource.

Add the following at the very end of your **shippable.yml**. If you already have this job in your yml, just add the `OUT` resource `node_app_img_jf`:

#####i. job named `node_app_jfrog_runCI`.

```
jobs:
  - name: node_app_jfrog_runCI
    type: runCI
    dependencyMode: strict
    triggerMode: parallel
    steps:
      - OUT: node_app_img_jf
```

#####1c. Update node_app_img_jf in CI config

To update the `node_app_img_jf` resource with image tag information, add the following to the `build` section:

```
build:
  on_success:
    - shipctl put_resource_state node_app_img_jf versionName $BRANCH.$BUILD_NUMBER
```

####2. Push changes to shippable.yml

Commit and push all the above changes to **shippable.yml**.


####3. Add the Assembly Line to your Shippable Subscription

In order to tell Shippable to read your `jobs` and `resources` config, you need to add the repository containing the configuration as a "sync repository" by [following instructions here](/deploy/configuration/#adding-a-syncrepo). This automatically parses the `jobs` and `resources` sections of your `shippable.yml` config and adds your workflow to Shippable.

Please skip this section if you have already added this as a sync repository.

Your SPOG view should look something like this:

<img src="/images/tutorial/build-push-image-to-jfrog-fig1.png" alt="E2E Pipeline View">

####4. Test your Assembly Line

Add a commit to your repo and you should see the CI process kick off, which builds a Docker image and then pushes it to your JFrog Docker Repository. The location info is then pushed into `node_app_img_jf` as a new version.

<img src="/images/tutorial/build-push-image-to-jfrog-fig2.png" alt="E2E Pipeline View">

If `node_app_img_jf` is an `IN` to another job in your workflow that pulls the image, that job will be triggered every time the `node_app_img_jf` version is updated.

## Further Reading
* [Build and Push a Docker Image to Docker Hub](/ci/tutorial/build-push-image-to-docker-hub)
* [Working with Integrations](/platform/tutorial/integration/howto-crud-integration/)
* [Defining Resources in shippable.yml](/platform/tutorial/workflow/shippable-yml/#resources-config)
* [Defining Jobs in shippable.yml](/platform/tutorial/workflow/shippable-yml/#jobs-config)
* [Sharing information between Jobs](/platform/tutorial/workflow/sharing-data-between-jobs/)
