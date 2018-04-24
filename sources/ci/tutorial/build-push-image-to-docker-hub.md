page_main_title: Build and Push image to Docker Hub
main_section: Tutorial
sub_section: Build and Push Images
sub_sub_section: Docker Hub
page_title: Build and Push Docker image to Docker Hub
page_description: Build and Push a Docker image to Docker Hub automatically
page_keywords: Build docker containers, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines,

# Build and Push Docker Image to Docker Hub

This tutorial explains how to continuously build and push an image to Docker Hub. We are using a simple Node.js application that has basic CI tests as well as code coverage reports. The Dockerfile is a part of the application repository on Github.

These are the following concepts you need to be familiar with to proceed further

* [Docker build](https://docs.docker.com/engine/reference/commandline/build/)
* [Docker push](https://docs.docker.com/engine/reference/commandline/push/)
* [Docker login](https://docs.docker.com/engine/reference/commandline/login/)
* [Dockerfile](https://docs.docker.com/engine/reference/builder/)

## Manual Steps to Build
This section covers step by step instructions to manually build your Docker image

* Create a GitHub repo that will hold the code to build the image. For this e.g. full source code is available [here](https://github.com/devops-recipes/node_app)
* Create an account on [Docker Hub](https://hub.docker.com). 
* Install Docker on your local machine. More information is in [Getting Started Guide](https://docs.docker.com/get-started/)
* Login to docker `docker login` with your credentials
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
* Build your image by executing this command. `DOCKER_ACC` is the name of your account `$DOCKER_REPO` is your image name and `$BUILD_NUMBER` is your tag

```
docker build -t $DOCKER_ACC/$DOCKER_REPO:$BUILD_NUMBER .
```

* Now you can push this image to your hub by executing this command.

```
sudo docker push $DOCKER_ACC/$DOCKER_REPO:$BUILD_NUMBER
```

If you're unfamiliar with Docker Registry and the build process, you should start with learning how to implement this scenario manually. Refer to our blog for a step-by-step tutorial: [Node.js CI: Build and Push a Node application to Docker Registry](http://blog.shippable.com/node-ci-docker).

There are many challenges with manually executing this CI workflow. First, you should execute it for every commit against the latest codebase, which is difficult to enforce manually. Second, if you want to trigger a dependent multi-stage workflow which deploys this application to Test, Staging environments and runs test suites, you will have to manually handle all that as well. This leads to overdependence on people and isn't efficient. `npm` might make changes globally to your machine that might mess up you local system.

If you want to achieve frictionless development, you should automate your CI workflow.


## Automating CI and Docker Build
Of course there are many build services for Docker, you can even use Docker's own build system. In this case we are using Shippable to automate this process.

To jump into this tutorial, you will need to familiarize yourself with a few platform concepts.

### Concepts

* [Integrations](/platform/integration/overview/)
 * [Docker Registry](/platform/integration/dockerRegistryLogin)
 * [Github](/platform/integration/github)
* [Resources](/platform/workflow/resource/overview/)
 * [image](/platform/workflow/resource/image)
 * [gitRepo](/platform/workflow/resource/gitrepo)
* [Jobs](/platform/workflow/job/overview/)
 * [runCI](/platform/workflow/job/runci)

### Step by step instructions
The following sections explain the process of setting up an AL to continuously test, build and push a custom CI image to Docker Hub. This is a node.js app that uses mocha and istanbul for unit testing and code coverage.

**Source code is available at [devops-recipes/node_app](https://github.com/devops-recipes/node_app)**

**Complete YML is at [devops-recipes/node_app/shippable.yml](https://raw.githubusercontent.com/devops-recipes/node_app/master/shippable.yml)**

####1. Add necessary Account Integrations
Integrations are used to connect Shippable Platform with external providers. More information about integrations is [here](/platform/tutorial/integration/howto-crud-integration/). The following are the integrations that we will use in this sample

**1a. Add `Docker Registry` Integration**

To be able to push and pull images from Docker Hub, we add `drship_dockerhub ` integration.

Detailed steps on how to add a Docker Registry Integration are [here](/platform/integration/dockerRegistryLogin/#creating-an-account-integration).

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step

####2. Author CI configuration
The platform is built with "Everything as Code" philosophy and it uses YAML based configuration file called `shippable.yml`.

Detailed CI configuration info is [here](/ci/yml-structure/).

**2a. Add empty shippable.yml to your repo**

Add an empty config file to the the root of your repo.

**2b. Add `ci` section of the config**

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
      type: dockerRegistryLogin

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

####3. Enable the repo for CI
For automated builds, we need to enable the project for CI. Once enabled, the platform will automatically create the webhooks required to continuously build the project.

Detailed steps on enabling a repo are [here](/ci/enable-project/).

####4. Run your CI Project
At this stage, you can either manually trigger your CI project or commit a change to the application git repository which should automatically build your project.


## Adding CD capability
If you want to deploy the image you just pushed to a container orchestration platform or set up a multi-stage Continuous Deployment Assembly Line, you will need to follow a few extra steps. Essentially, you will need to create an `image` resource pointing to the image on Docker Hub and store the image tag as part of the resource.

### Concepts
Here are the additional concepts you need to know before you start:

* [Resources](/platform/workflow/resource/overview/)
 * [image](/platform/workflow/resource/image)


### Step by step instructions
The following steps shows how to dynamically update the tags of image resource when the CI process that generates the image is finished

**Source code is available at [devops-recipes/build_custom_ci_image](https://github.com/devops-recipes/build_custom_ci_image)**

**Complete YML is at [devops-recipes/build_custom_ci_image/shippable.yml](https://raw.githubusercontent.com/devops-recipes/build_custom_ci_image/master/shippable.yml)**


####1. Extend the CI Config
Add the following YAML config after the CI config from the prior step. This enables the CI process to output the tags to image resource which will be defined next

```
# OPTIONAL: This configuration is to add continuous deployment
# to your CI project. You can store the image pointer and tag in
# an image resource, which can then be deployed to any container
# orchestration platform like Kubernetes. For instructions, please
# refer to the section on Adding Continuous Deployment

  on_success:
    - shipctl put_resource_state $JOB_NAME versionName $BRANCH.$BUILD_NUMBER
    - shipctl put_resource_state $SHIP_IMG_RES versionName $BRANCH.$BUILD_NUMBER
```

* If the ci section runs without any error, then using in-built utility function `put_resource_state` we copy the image tag into the `versionName` field of image `node_app_img_dh` resource. Utility functions are invoked using the command `shipctl`. A full list of these commands are [here](platform/tutorial/using-shipctl)

####2. Author Assembly Line configuration
In addition to CI, Shippable also provides CD capabilities through AL config

Detailed AL configuration info is [here](/deploy/configuration).

**2a. Add `resources` section of the config**

`resources` section holds the config info for the image. 

```
resources:
  - name: node_app_img_dh
    type: image
    integration: drship_dockerhub # replace with your integration name
    versionTemplate:
      sourceName: "devopsrecipes/node_app" # replace with your Hub URL
      isPull: false
      versionName: latest
```
#####i. image resource named `node_app_img_dh`
The image that you want to use in CD workflows should be available as a resource to the AL. 

Here we are creating an image named `node_app_img_dh` that can be access using integration `drship_dockerhub`. `versionTemplate` has the information used to create the first version of the image. `sourceName` contains the location of the image and the  `versionName` contains the tag. `isPull` is used to configure whether the image is automatically pulled or not. Everytime a new tag is created, a new version get created. This is what `put_resource_state` does i.e. increment the version if there is any change

Detailed info about `image` resource is [here](/platform/workflow/resource/image).

**2b. Add `jobs` section of the config**

A job is the actual execution unit of the assembly line. In this job, we are defining the relationship with the image and the CI job above

#####i. job named `node_app_runCI`.

```
jobs:
  - name: node_app_runCI
    type: runCI
    steps:
      - OUT: node_app_img_dh
    flags:
      - node_app
```

When a CI project is enabled a job is automatically created with the name of the repo appended by `_runCI`. We are extending this automatically created CI job to also have an image output. In additon we are also adding a flag.

**2c. Push changes to shippable.yml**

Commit and push all the above changes to shippable.yml.

####3. Attach the AL to your Repo's Subscription
In Shippable's world, an Org or a Group depending on the SCM system you are using equate to a Subscription. We will hook the YML so that the platform can render the AL.

This should automatically trigger the sync process to add all the changes to the assembly line. Your view should look something like this.

<img src="/images/tutorial/build-push-docker-image-fig4.png" alt="E2E Pipeline View">

Detailed info to hook your AL is [here](/deploy/configuration/#adding-a-syncrepo).

###4. Test your Assembly Line
Add a commit to your repo and you should see the CI process kick off, which builds a Docker image and then pushes it to Docker Hub. The tag info is then pushed into the image resource as a new version.

If your image resource is an IN to another job in your workflow that deploys the image, that job will be triggered every time the image version is updated.

## Further Reading
* [Build and Push a Docker Image to Docker Hub](/ci/tutorial/build-push-image-to-docker-hub)
* [Working with Integrations](/platform/tutorial/integration/howto-crud-integration/)
* [Defining Resources in shippable.yml](/platform/tutorial/workflow/shippable-yml/#resources-config)
* [Defining Jobs in shippable.yml](/platform/tutorial/workflow/shippable-yml/#jobs-config)
* [Sharing information between Jobs](/platform/tutorial/workflow/sharing-data-between-jobs/)


