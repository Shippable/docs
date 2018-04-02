page_main_title: Build and Push image to Docker Hub
main_section: Tutorial
sub_section: Build and Push Images
sub_sub_section: Docker Hub
page_title: Build and Push Docker image to Docker Hub
page_description: Build and Push a Docker image to Docker Hub automatically
page_keywords: Build docker containers, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines,

# Build and Push Docker Image to Docker Hub

This tutorial explains how to continuously build and push an image to Docker Hub. We are using a simple Node.js application that has basic CI tests as well as code coverage reports. The Dockerfile is a part of the application repository on Github.

## Introduction

Here is why you should be using Shippable.

## Pre-requisites

To jump into this tutorial, you will need to familiarize yourself with the platform as well some of the pre-requisite usecases

### Platform Features

* [Shippable CI configuration](http://docs.shippable.com/platform/workflow/config/#ci-configuration)
* [Docker Registry integration](/platform/integration/dockerRegistryLogin)

### Usecases

* Using specific version of build image
* Using templates inside your Job
* [Enabling a repo for CI](ci/enable-project/)
* [Working with Integrations](platform/tutorial/howto-crud-integration)

## Step by step Instructions

The following sections explain the process of setting up a workflow to build and package a Docker image.

**Source code is available at [devops-recipes/node_app](https://github.com/devops-recipes/node_app)**

**Complete YML is at [devops-recipes/node_app/shippable.yml](https://raw.githubusercontent.com/devops-recipes/node_app/master/shippable.yml)**

###1. Add Docker Registry Integration
To be able to push and pull images from Docker Hub, we need an integration. Add `drship_dockerhub`integration.

Detailed steps on how to add a Docker Registry Integration are [here](/platform/integration/dockerRegistryLogin/#creating-an-account-integration).

###2. Add CI Config
`shippable.yml` is a declarative way to configure your Continuous Integration steps on Shippable. Add this file to the repo that contains the `Dockerfile`. For this e.g. it is `https://github.com/devops-recipes/node_app`.

Configure CI steps by adding the following code snipped to the YML file

```
language: node_js

branches:
  only:
    - master

integrations:
  hub:
    - integrationName: drship_dockerhub
      type: docker

env:
  global:
    - TEST_RESULTS_DIR=$SHIPPABLE_REPO_DIR/shippable/testresults
    - CODE_COVERAGE_DIR=$SHIPPABLE_REPO_DIR/shippable/codecoverage
    - TESTS_LOC_DIR=$SHIPPABLE_REPO_DIR/tests
    - MOD_LOC=$SHIPPABLE_REPO_DIR/node_modules/.bin/
    - DOCKER_REPO="node_app"
    - DOCKER_ACC=devopsrecipes # {account name}
    - SHIP_IMG_RES=$DOCKER_REPO"_img_dh"

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
    - docker build -t $DOCKER_ACC/$DOCKER_REPO:$BRANCH.$BUILD_NUMBER .
    - docker push $DOCKER_ACC/$DOCKER_REPO:$BRANCH.$BUILD_NUMBER

```

The above YML does the following things:

* Language is set to Node.js
* We will automatically build when a commit is made to `master` branch. Commits to other branches will not trigger a build.
* The integration created in first step is referenced here to automatically login to Docker Hub
* Two global environment variables hold the information about the Docker image. Please replace the DOCKER_ACC value with your account name on Docker Hub.
* The build section defines the scripts to build and push the image. As you can see, native docker commands can be directly used in your configuration.

###3. Enable the repo for CI
For automated builds, we need to enable the project for CI. Once enabled, the platform will automatically create the webhooks required to continuously build the project.

Detailed steps on enabling a repo are [here](/ci/enable-project/).

###4. Run your CI Project
At this stage, you can either manually trigger your CI project or commit a change to the application git repository which should automatically build your project.

## Adding CD capability
If you want to deploy the image you just pushed to a container orchestration platform or set up a multi-stage Continuous Deployment Assembly Line, you will need to follow a few extra steps. Essentially, you will need to create an `image` resource pointing to the image on Docker Hub and store the image tag as part of the resource.

Here are the additional concepts you need to know before you start:

* [Github integration](/platform/integration/github)
* [image resource](/platform/workflow/resource/image)
* [runCI job](/platform/workflow/job/runci)
* [Shippable Assembly Line config](/platform/workflow/config/#assembly-lines-configuration)
* Output information from a Job to a Resource

###1. Add Assembly Line config

Add the following YAML config after the CI config:

```
# OPTIONAL: This configuration is to add continuous deployment
# to your CI project. You can store the image pointer and tag in
# an image resource, which can then be deployed to any container
# orchestration platform like Kubernetes. For instructions, please
# refer to the section on Adding Continuous Deployment

  on_success:
    - shipctl put_resource_state $JOB_NAME versionName $BRANCH.$BUILD_NUMBER
    - shipctl put_resource_state $SHIP_IMG_RES versionName $BRANCH.$BUILD_NUMBER

resources:
  - name: node_app_img_dh
    type: image
    integration: drship_dockerhub # replace with your integration name
    versionTemplate:
      sourceName: "devopsrecipes/node_app" # replace with your Hub URL
      isPull: false
      versionName: latest

jobs:
  - name: node_app_runCI
    type: runCI
    dependencyMode: strict
    triggerMode: parallel
    steps:
      - OUT: node_app_img_dh
    flags:
      - node_app
```

This section does the following things:

* If the ci section runs without any error, then using in-built utility function `put_resource_state` we copy the image tag into the `versionName` field of image `node_app_img_dh` resource. Utility functions are invoked using the command `shipctl`. A full list of these commands are [here](platform/tutorial/using-shipctl)
* `resources` section is used to define resources that are used by the assembly line. Here we are creating an image named `node_app_img_dh` that can be access using integration `drship_dockerhub`. `versionTemplate` has the information used to create the first version of the image. `sourceName` contains the location of the image and the  `versionName` contains the tag. `isPull` is used to configure whether the image is automatically pulled or not. Everytime a new tag is created, a new version get created. This is what `put_resource_state` does i.e. increment the version if there is any change
* `jobs` section is used to define a jobs that run as part of the Assembly Line. When a CI project is enable a job is automatically created with the name of the repo appended by `_runCI`. We are extending this automatically created CI job to also have an image output. In additon we are also adding a flag. We are allowing these jobs to run in parallel if multiple webhooks come in and also we making sure it only triggers when all dependencies are in consistent state, hence `strict`

###2. Add Github Integration
In order to read your Assembly Line configuration from Github, we need an integration. Add `drship_github` integration.

Detailed steps on how to add a Github Integration are [here](/platform/integration/github/#creating-an-account-integration).

###3. Add Assembly Line to Shippable
Next, add the configuration to your Shippable subscription. Jobs and resources section from your `shippable.yml` are parsed to create the workflow.

Detailed steps to add an Assembly Line are [here](deploy/configuration/).

###4. End to End Build and Push Assembly Line
If you change the view of your Subscription page to SPOG view, you should see something like this:

<img src="/images/tutorial/build-push-docker-image-fig4.png" alt="E2E Pipeline View">

###5. Test your Assembly Line
Add a commit to your repo and you should see the CI process kick off, which builds a Docker image and then pushes it to Docker Hub. The tag info is then pushed into the image resource as a new version.

If your image resource is an IN to another job in your workflow that deploys the image, that job will be triggered every time the image version is updated.

## Further Reading
1.
