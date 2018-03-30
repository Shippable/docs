page_main_title: Build and Push image to Docker Hub
main_section: Tutorial
sub_section: Build and Push Images
sub_sub_section: Docker Hub
page_title: Build and Push Docker image to Docker Hub
page_description: Build and Push a Docker image to Docker Hub automatically
page_keywords: Build docker containers, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, 

# Build and Push Docker Image to Docker Hub
This tutorial explains how to continuously build and push an image to Docker Hub with Dockerfile being stored on Github. We are using a simple Node.js application that has some basic CI tests as well as Code Coverage reports. 

## Introduction

Here is why you should be using Shippable. 

## Pre-requisites
To jump into this tutorial, you will need to familiarize yourself with the platform as well some of the pre-requisite usecases

### Platform Features
* [Docker Registry integration](/platform/integration/dockerRegistryLogin)
* [Github integration](/platform/integration/github)
* [image resource](/platform/workflow/resource/image)
* [runCI job](/platform/workflow/job/runci)

### Usecases
* Defining Jobs and Resources using `shippable.yml`
* Output information from a Job to a Resource
* Using specific version of build image
* Using templates inside your Job
* [Enabling a repo for CI](ci/enable-project/)
* [Working with Integrations](platform/tutorial/howto-crud-integration)

## Step by Step Instructions
The following sections explain the process of setting up a workflow to build and package a Docker image. 

**Source code is available at [devops-recipes/node_app](https://github.com/devops-recipes/node_app)**

**Complete YML is at [devops-recipes/node_app/shippable.yml](https://raw.githubusercontent.com/devops-recipes/node_app/master/shippable.yml)**

###1. Add Docker Registry Integration
To be able to push and pull images from Docker Hub, we need an integration. Add `drship_dockerhub`integration.

Detailed steps on how to add a Docker Registry Integration is [here](/platform/integration/dockerRegistryLogin/#adding-account-integration).

###2. Add CI Config
`shippable.yml` is a declarative way to configure your Continuous Integration steps on Shippable. Add this file to the repo that contains the `Dockerfile`. For this e.g. it is `https://github.com/devops-recipes/node_app`.

Configure CI steps by adding the following code snipped to the YML file

```
language: node_js
integrations:
  hub:
    - integrationName: drship_dockerhub
      type: docker
branches:
  only:
    - master
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

# Optional configurations incase you want to store the tags of the image
# built and pushed in an image resource. Useful if you would like to use
# this image in CD processes
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

The above YML does the following things

* Language is set to Node.js
* We will automatically build when a commit is made to `master` branch
* The integration created in first step is referenced here to auto login to Docker Hub
* Two global environment variables hold the information about the Docker image
* The build section defines the scripts to build and push the image

The optional section does the following things

* If the ci section runs without any error, then using in-built utility function `put_resource_state` we copy the image tag into the `versionName` field of image `node_app_img_dh` resource. Utility functions are invoked using the command `shipctl`. A full list of these commands are [here](platform/tutorial/using-shipctl)
* `resources` section is used to define resources that are used by the assembly line. Here we are creating an image named `node_app_img_dh` that can be access using integration `drship_dockerhub`. `versionTemplate` has the information used to create the first version of the image. `sourceName` contains the location of the image and the  `versionName` contains the tag. `isPull` is used to configure whether the image is automatically pulled or not. Everytime a new tag is created, a new version get created. This is what `put_resource_state` does i.e. increment the version if there is any change
* `jobs` section is used to define a jobs that run as part of the Assembly Line. When a CI project is enable a job is automatically created with the name of the repo appended by `_runCI`. We are extending this automatically created CI job to also have an image output. In additon we are also adding a flag. We are allowing these jobs to run in parallel if multiple webhooks come in and also we making sure it only triggers when all dependencies are in consistent state, hence `strict`

###3. Enable the repo for CI
For automated builds, we need to enable the project for CI. Once enabled the platform will automatically create the webhooks required to continuosly build the project. 

Detailed steps on enabling a repo is [here](/ci/enable-project/).

###4. Run your CI Project
At this stage, you can either manually trigger your CI project or commit a change to the git repo which should automatically build your project.

### Optional
> The rest of the steps are **Optional** and are needed only if you want to add Continuous Deployment capabilities by adding assembly lines. To deploy the right tag of the image, we need to store the tags as versions of the image resource. The rest of the steps are instructions on how to do it

###5. Add Github Integration
In order to read your Assembly Line configuration from Github, we need an integration. Add `drship_github` integration.

Detailed steps on how to add a Github Integration is [here](/platform/integration/github/#adding-account-integration).

###6. Add Assembly Line Config
Now hook your Assembly Line to read configurations from repo `node_app`. Now jobs and resources section from `shippable.yml` are parsed to create the workflow. 

Detailed steps to add an Assembly Line is [here](deploy/configuration/).

###7. End to End Build and Push Assembly Line
If you change the view of your subscriptions page to show in SPOG view, you should see something like this

<img src="/images/tutorial/build-push-docker-image-fig4.png" alt="E2E Pipeline View">

###8. Test your Assembly Line
Now add a commit to your repo and you should see the CI process kick off that tests your code, builds a Docker image and then pushes it to Docker Hub. The tag info is then pushed into the image resource as a new version

## Further Reading
1.	
