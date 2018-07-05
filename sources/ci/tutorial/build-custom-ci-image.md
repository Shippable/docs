page_description: Building a custom Docker image to use for CI
main_section: CI
sub_section: Tutorials

# Building a custom Docker image to use for CI

This tutorial explains how to build a custom Docker image and use it to run your CI workflow on Shippable.

By default, your CI workflow is executed inside a Docker container that is spun up on your build node. If no custom image is specified, the platform will automatically choose an appropriate image based on your `language` setting.

However, there are cases where you might want to build your own Docker image and use that to spin up the CI container on your build node. Common reasons include:

* You want to speed up your builds by using a Docker image that has your dependencies pre-installed.
* You want to build a project written in a language not officially supported by Shippable.
* You are using a combination of languages and tools not supported together in any official images.
* You want to run CI in your own Docker image to better simulate your production environment.

The minimum requirements necessary for a custom image to be used on Shippable are documented [here](/ci/custom-docker-image/#using-a-custom-docker-image)

This document assumes you're familiar with the following concepts:

* [Docker login](https://docs.docker.com/engine/reference/commandline/login/)
* [Dockerfile](https://docs.docker.com/engine/reference/builder/)
* [Docker build](https://docs.docker.com/engine/reference/commandline/build/)
* [Docker push](https://docs.docker.com/engine/reference/commandline/push/)


## Manual vs automated builds

You can choose to build and push your custom image to a Docker registry manually, by [following instructions on our blog](http://blog.shippable.com/build-a-docker-image-and-push-it-to-docker-hub). You can then pull the image and use it to spin up your CI container by including the configuration shown here: [Pulling a Docker image to use for CI](/ci/custom-docker-image/#pulling-your-custom-image-and-using-it-for-ci).

However, we recommend automating the image building process for the following reasons:

* Every time your custom image changes, your CI workflow can be automatically triggered
* Your custom image can be versioned with a build number, which helps keep track of changes and rollback easily
* Your build nodes already have necessary packages and tools pre-installed, such as Docker.
* Docker registry credentials are managed by the build platform which encrypts everything and just injects values at runtime.
* Your machine is free while the image is building, which can be a resource intensive process.

## Automating Docker Builds

There are many build services for Docker, but they will not automatically trigger your CI workflow each time your Docker image is rebuilt. To configure a workflow where your CI is triggered every time the base image changes, you need to configure the following on Shippable:

<img src="/images/ci/ci-tutorial-build-docker-image.png" alt="Building a custom docker image to use for CI">

This tutorial will take you on a step-by-step journey on how to achieve this scenario.

### Concepts

You will need to familiarize yourself with the following Shippable platform concepts before diving in:

* [Integrations](/platform/integration/overview/)
    * [Docker Registry](/platform/integration/dockerRegistryLogin)
    * [Github](/platform/integration/github)
* [Resources](/platform/workflow/resource/overview/)
    * [image](/platform/workflow/resource/image)
    * [gitRepo](/platform/workflow/resource/gitrepo)
* [Jobs](/platform/workflow/job/overview/)
    * [runSh](/platform/workflow/job/runsh)

### Step-by-step instructions

The following sections explain how you can configure a workflow to continuously build and push a custom CI image to Docker Hub, and then use it for CI.

We have a sample repository that contains source for a Docker image with the following:

* Ubuntu 16.04 is the base image
* Oracle Java 8
* AWS CLI
* Ansible
* A bunch of other dev tools and packages

Complete installing scripts are [here](https://github.com/devops-recipes/build_custom_ci_image/blob/master/install.sh)

**Source code is available at [devops-recipes/build_custom_ci_image](https://github.com/devops-recipes/build_custom_ci_image)**

**Complete YML is at [devops-recipes/build_custom_ci_image/shippable.yml](https://raw.githubusercontent.com/devops-recipes/build_custom_ci_image/master/shippable.yml)**

####1. Add necessary Account Integrations

Integrations are used to connect your Shippable workflow with external providers. More information about integrations is [here](/platform/tutorial/integration/howto-crud-integration/). We will use integrations for Docker registry and Github for this sample.

#####1a. Add `Docker Registry` Integration

To be able to push and pull images from Docker Hub, we add `drship_dockerhub` integration.

Detailed steps on how to add a Docker Registry Integration are [here](/platform/integration/dockerRegistryLogin/#creating-an-account-integration). Make sure you name the integration `drship_dockerhub` since that is the name we're using in our sample automation scripts.

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step

#####1b. Add `Github` Integration

In order to read your workflow configuration from Github, we need to add the `drship_github` integration. This points to the repository containing your Shippable workflow config file (**shippable.yml**).

In our case, we're using the repository [`build_custom_ci_image`](https://github.com/devops-recipes/build_custom_ci_image).

Detailed steps on how to add a Github Integration are [here](/platform/integration/github/#creating-an-account-integration). Make sure you name the integration `drship_github` since that is the name we're using in our sample automation scripts.

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step

####2. Author Assembly Line configuration

The platform is built with "Everything as Code" philosophy, so all configuration is in a YAML-based file called **shippable.yml**, which is parsed to create your Assembly Line workflow.

Detailed documentation on **shippable.yml** is [here](/platform/workflow/config/#assembly-lines-configuration).

#####2a. Add empty shippable.yml to your repo

Add an empty config file to the the root of your repository.

#####2b. Add `resources` section of the config

`resources` section holds the information that is necessary to push the image to Docker Hub. In this case we have two resources defined of type `image` and `gitRepo`.

Add the following to **shippable.yml**:

```
resources:
  - name: build_custom_ci_repo
    type: gitRepo
    integration: drship_github
    pointer:
      sourceName: "devops-recipes/build_custom_ci_image"
      branch: master

  - name: build_custom_ci_img_dh
    type: image
    integration: drship_dockerhub # replace with your integration name
    versionTemplate:
      sourceName: "devopsrecipes/build_custom_ci" # replace with your Hub URL
      versionName: latest
```

######i.`image` resource named `build_custom_ci_img_dh`

The Docker image that you want to build should be available as a resource to the Assembly Line.

`sourceName` contains the location of the image and the `versionName` contains the tag. The `integration` value points to the Docker registry integration we created in the previous step.

Detailed info about `image` resource is [here](/platform/workflow/resource/image).

######ii. `gitRepo` resource named `build_custom_ci_repo `

This resource points to the repository that contains your Docker image source files, so that they are accessible to your Assembly Line. For our example, these files are present in the repository [https://github.com/devops-recipes/build_custom_ci_image](https://github.com/devops-recipes/build_custom_ci_image). Dockerfile for this app is [here](https://github.com/devops-recipes/build_custom_ci_image/blob/master/Dockerfile).

Detailed info about `gitRepo` resource is [here](/platform/workflow/resource/gitrepo).

#####2c. Add `jobs` section of the config

A job is an execution unit of the Assembly Line. Our job has to perform two tasks:

* Build Docker image
* Push image to your Docker registry

######i. `job` named `build_custom_img`

Add the following to **shippable.yml**:

```
jobs:
  - name: build_custom_img
    type: runSh
    steps:
      - IN: build_custom_ci_repo
      - TASK:
          name: build_custom_image
          script:
            - pushd $(shipctl get_resource_state "build_custom_ci_repo")
            # Extract image information and Docker registry credentials from resources using shipctl utility
            # Detailed shipctl guide is at http://docs.shippable.com/platform/tutorial/workflow/using-shipctl/
            - export IMG_NAME=$(shipctl get_resource_version_key build_custom_ci_img_dh "sourceName")
            - export DH_USR_NAME=$(shipctl get_integration_resource_field build_custom_ci_img_dh "userName")
            - export DH_PASS=$(shipctl get_integration_resource_field build_custom_ci_img_dh "password")
            - export DH_URL=$(shipctl get_integration_resource_field build_custom_ci_img_dh "url")
            # Docker commands to build and push to registry
            - sudo docker build -t=$IMG_NAME:$BUILD_NUMBER --pull .
            - sudo docker login -u $DH_USR_NAME -p $DH_PASS
            - sudo docker push $IMG_NAME:$BUILD_NUMBER
            - popd
      - OUT: build_custom_ci_img_dh
    on_success:
      script:
        # Update OUT resource to create a new version that will trigger rest of the workflow
        - shipctl put_resource_state_multi build_custom_ci_img "versionName=$BUILD_NUMBER"
```

* Adding the above config to the jobs section of shippable.yml will create a `runSh` job called `build_custom_img `.
* The first section of `steps` defines the input `IN` resource that is required to execute this job. In our case, we just need the `gitRepo` resource which contains our Docker image source files. Since this resource is an `IN`, this job will be triggered every time you push a new commit to the source control repository.
* The `TASK` section is the actual code that is executed when the job runs.
    *  First, we change our present directory to where source code is present using the shipctl utility `get_resource_state`, which is documented in greater detail [here](/platform/tutorial/workflow/using-shipctl/#get_resource_state)
    *  Next, we extract image information from the `build_custom_ci_img_dh` resource, such as image name, and Docker registry credentials from the `integration`, again using the shipctl utility.
    *  Lastly, we use native Docker commands to build and push the image, using `$BUILD_NUMBER` as the image tag. `$BUILD_NUMBER` is a [standard environment variable](/platform/workflow/job/runsh/#default-environment-variables) available for every job.
*  On success, we output the tag information using the utility function `put_resource_state_multi` to image `build_custom_ci_img_dh` so that downstream jobs have access to the latest tag pushed and are triggered if they have the image resource as an `IN`.

Detailed info about `runSh` job is [here](/platform/workflow/job/runsh).

Detailed info about Shippable Utility functions are [here](/platform/tutorial/workflow/using-shipctl).

#####2d. Push changes to shippable.yml

Commit and push all the above changes to **shippable.yml**.

####3. Add the Assembly Line to your Shippable Subscription

In Shippable's world, a Subscription maps to an Organization or a Team, depending on the source control provider. An Assembly Line workflow is defined at a Subscription level and all jobs are resources are global to your subscription.

To add your Assembly Line to Shippable, you need to add the repository containing the configuration as a "sync repository" by [following instructions here](/platform/tutorial/workflow/crud-syncrepo/#adding-a-syncrepo). This automatically parses your **shippable.yml** config and adds your workflow to Shippable. Your workflow will always be kept in sync with the config in this repository, and be automatically updated every time you push a change to **shippable.yml**.

Your view will look something like this:

<img src="/images/tutorial/build-custom-ci-image-fig1.png" alt="Assembly Line view">

####4. Run the job `build_custom_img`

Manually run the job only once by right clicking on the job. You can look at the logs and you will see that your custom image is successfully built and pushed to Docker registry.

<img src="/images/tutorial/build-custom-ci-image-fig2.png" alt="Deploy console output">

####5. Use the image for your CI job

If you want to use this image to run CI for your application, you'll need to provide the image as an `IN` for the CI job and use the image information in the `pre_ci_boot` section.

An example of this is in our [**java_web_app**](https://github.com/devops-recipes/java_web_app/blob/master/shippable.yml) repository. The relevant **shippable.yml** configuration for your application is as follows:

```
language: java

jdk:
  - oraclejdk8

build:

  pre_ci:
    # extract information from the IN image resource
    - export IMG_TAG=$(shipctl get_resource_version_key build_custom_ci_img_dh "versionName")
    - export IMG_NAME=$(shipctl get_resource_version_key build_custom_ci_img_dh "sourceName")

  pre_ci_boot:
    # Use custom image to boot up CI container
    image_name: $IMG_NAME
    image_tag: $IMG_TAG
    pull: true

  ci:
    #CI config
    - echo "your ci config goes here"

jobs:
  - name: java_web_app_runCI
    type: runCI
    steps:
      - IN: build_custom_ci_img_dh

```

* In the `pre_ci` section, which runs on the build host before the CI container is spun up, we extract the image name and tag from the resource `build_custom_ci_img_dh`.
* The `pre_ci_boot` section allows you to specify a custom image for your CI workflow. We use the image name and tag here, so that your custom image is used for the build.
* The `ci` section contains commands that execute your CI workflow. Since this is just a simple example, we're just printing a string here.
* The `jobs` section simply wraps your CI config into an Assembly Line `runCI` job and provides the image resource `build_custom_ci_img_dh` as an `IN` so that we can extract the custom image information in the `pre_ci` section.

Commit these **shippable.yml** changes to your application repository.

**Please note that you will need to [enable your application repository for CI](/ci/enable-project/) and also add the jobs configuration by following instructions to [Add your Assembly Line config](/platform/tutorial/workflow/crud-syncrepo/).**

You're now done! Each time your custom Docker image source code is updated, a new image will be built and pushed to Docker registry, which will trigger your CI workflow.

Your Assembly Line will look like this:

<img src="/images/tutorial/build-custom-ci-image-fig3.png" alt="Deploy console output">

## Further Reading
* [Add your Assembly Line config](/platform/tutorial/workflow/crud-syncrepo/)
* [Working with Integrations](/platform/tutorial/integration/howto-crud-integration/)
* [Defining Resources in shippable.yml](/platform/workflow/config/#resources)
* [Defining Jobs in shippable.yml](/platform/workflow/config/#jobs)
* [Sharing information between Jobs](/platform/tutorial/workflow/share-info-across-jobs/)
