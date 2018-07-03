page_description: Building a custom alpine Docker image and using it in runSh job
main_section: workflow
sub_section: Tutorials

# Building a custom alpine Docker image and using it in runSh job

This tutorial explains how to build a custom alpine Docker image and use it to run your runSh workflow on Shippable.

By default, your runSh workflow is executed inside a Docker container that is spun up on your build node. If no custom image is specified, the platform will automatically choose an appropriate image based on your node pool setting.

However, there are cases where you might want to build your own Docker image and use that to spin up the runSh container on your build node. Common reasons include:

* You want to speed up your builds by using a Docker image that has your dependencies pre-installed
* You want to build a project written in a language not officially supported by Shippable
* You are using a combination of languages and tools not supported together in any official images
* You want to run runSh in your own Docker image to better simulate your production environment

The minimum requirements necessary for a custom image to be used on Shippable are documented [here](/ci/custom-docker-image/#using-a-custom-docker-image)

This document assumes you're familiar with the following concepts:

* [Docker login](https://docs.docker.com/engine/reference/commandline/login/)
* [Dockerfile](https://docs.docker.com/engine/reference/builder/)
* [Docker build](https://docs.docker.com/engine/reference/commandline/build/)
* [Docker push](https://docs.docker.com/engine/reference/commandline/push/)

## Automating Docker Builds

There are many build services for Docker, but they will not automatically trigger your runSh workflow each time your Docker image is rebuilt. To configure a workflow where your runSh is triggered every time the base image changes, you need to configure the following on Shippable:

<img src="/images/tutorial/use-alpine-custom-image-runsh-fig1.png" alt="Building a custom docker image to use for runSh">

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

The following sections explain how you can configure a workflow to continuously build and push a custom runSh image to Docker Hub, and then use it for runSh.

We have a sample repository that contains source for a Docker image with the following:

* Alpine 3.7 is the base image
* python 2.7
* glibc

Complete installing scripts are [here](https://github.com/devops-recipes/build_alpine_ci_image/blob/master/install.sh)

**Source code is available at [devops-recipes/build_alpine_ci_image](https://github.com/devops-recipes/build_alpine_ci_image)**

**Complete YML is at [devops-recipes/build_alpine_ci_image/shippable.yml](https://raw.githubusercontent.com/devops-recipes/build_alpine_ci_image/master/shippable.yml)**

####1. Add necessary Account Integrations

Integrations are used to connect your Shippable workflow with external providers. More information about integrations is [here](/platform/tutorial/integration/howto-crud-integration/). We will use integrations for Docker registry and Github for this sample.

#####1a. Add `Docker Registry` Integration

To be able to push and pull images from Docker Hub, we add `drship_dockerhub` integration.

Detailed steps on how to add a Docker Registry Integration are [here](/platform/integration/dockerRegistryLogin/#creating-an-account-integration). Make sure you name the integration `drship_dockerhub` since that is the name we're using in our sample automation scripts.

> Note: You might already have this if you have done some of our other tutorials. If so, skip this step

#####1b. Add `Github` Integration

In order to read your workflow configuration from Github, we need to add the `drship_github` integration. This points to the repository containing your Shippable workflow config file (**shippable.yml**).

In our case, we're using the repository [`build_alpine_ci_image`](https://github.com/devops-recipes/build_alpine_ci_image).

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
  - name: build_alpine_ci_repo
    type: gitRepo
    integration: drship_github  #replace with your Github integration, if needed
    pointer:
      sourceName: "devops-recipes/build_alpine_ci_image"  #org name/repository name
      branch: master

  - name: build_alpine_ci_img_dh
    type: image
    integration: drship_dockerhub # replace with your integration name
    versionTemplate:
      sourceName: "devopsrecipes/build_alpine_ci" # replace with your Hub URL
      versionName: latest

# Optional if you want to use Docker in Docker image also built on top of alpine
  - name: build_docker_ci_img_dh
    type: image
    integration: drship_dockerhub # replace with your integration name
    versionTemplate:
      sourceName: "devopsrecipes/build_docker_ci" # replace with your Hub URL
      versionName: latest
```

######i. `gitRepo` resource named `build_alpine_ci_repo`

This resource points to the repository that contains your Docker image source files, so that they are accessible to your Assembly Line. For our example, these files are present in the repository [https://github.com/devops-recipes/build_alpine_ci_image](https://github.com/devops-recipes/build_alpine_ci_image). Dockerfile for this app is [here](https://github.com/devops-recipes/build_alpine_ci_image/blob/master/Dockerfile).

Detailed info about `gitRepo` resource is [here](/platform/workflow/resource/gitrepo).

######ii.`image` resource named `build_alpine_ci_img_dh`

The Docker image that you want to build should be available as a resource to the Assembly Line.

`sourceName` contains the location of the image and the `versionName` contains the tag. The `integration` value points to the Docker registry integration we created in the previous step.

Detailed info about `image` resource is [here](/platform/workflow/resource/image).

######iii.`image` resource named `build_docker_ci_img_dh`

This is an optional build process that uses `docker:latest` as the base image which is built on top of alpine.

`sourceName` contains the location of the image and the `versionName` contains the tag. The `integration` value points to the Docker registry integration we created in the previous step.

Detailed info about `image` resource is [here](/platform/workflow/resource/image).

#####2c. Add `jobs` section of the config

A job is an execution unit of the Assembly Line. Our workflow needs to do three things:

* Build Docker image based on alpine and push it to the registry
* Use the alpine image and execute a runSh job
* Build Docker image based on docker and push it to the registry

Add the following to **shippable.yml**:

```
jobs:
  - name: build_alpine_img
    type: runSh
    steps:
      - IN: build_alpine_ci_repo
      - TASK:
          name: build_image
          runtime:
            options:
              env:
                - RES_OUT_IMG: "build_alpine_ci_img_dh"
          script:
            # Extract image information and Docker registry credentials from resources using shipctl utility
            # Detailed shipctl guide is at http://docs.shippable.com/platform/tutorial/workflow/using-shipctl/
            - IMG_NAME=$(shipctl get_resource_version_key "$RES_OUT_IMG" "sourceName")
            - DH_USR_NAME=$(shipctl get_integration_resource_field "$RES_OUT_IMG" "userName")
            - DH_PASS=$(shipctl get_integration_resource_field "$RES_OUT_IMG" "password")
            - DH_URL=$(shipctl get_integration_resource_field "$RES_OUT_IMG" "url")
            - pushd $(shipctl get_resource_state "build_alpine_ci_repo")
            - docker build -t=$IMG_NAME:$BUILD_NUMBER -f Dockerfile.alpine37 --pull .
            - docker login -u $DH_USR_NAME -p $DH_PASS
            - docker push $IMG_NAME:$BUILD_NUMBER
      - OUT: build_alpine_ci_img_dh
    on_success:
      script:
        # Update OUT resource to create a new version that will trigger rest of the workflow
        - shipctl put_resource_state_multi "$RES_OUT_IMG" "versionName=$BUILD_NUMBER"

  - name: test_alpine_img
    type: runSh
    steps:
      - IN: build_alpine_ci_img_dh
      - TASK:
          name: set_env
          runtime:
            container: false
          script:
# this is very hacky as its hardcoding the boot script location.
# we need to create a shipctl to abstract this out
# if you dont want to do this, hard code the imageName and tag, rather than making
# it dynamic
# Basically, this is getting the boot script of next task, then injecting the
# env vars after the shebang line
            - ALP_IMG=$(shipctl get_resource_version_key build_alpine_ci_img_dh "sourceName")
            - ALP_IMG_TAG=$(shipctl get_resource_version_key build_alpine_ci_img_dh "versionName")
            - NEXT_BOOT_SCRIPT_PATH="$BUILD_DIR/scripts/yml_boot_1.sh"
            - NEXT_BOOT_SCRIPT_WITHOUT_SHEBANG=$(cat $NEXT_BOOT_SCRIPT_PATH | tail -n +2)
            - |
              echo "#!/bin/bash -e
              export ALP_IMG=$ALP_IMG
              export ALP_IMG_TAG=$ALP_IMG_TAG
              $NEXT_BOOT_SCRIPT_WITHOUT_SHEBANG
              " > $NEXT_BOOT_SCRIPT_PATH
      - TASK:
          name: test_image
          runtime:
            options:
              imageName: $ALP_IMG
              imageTag: $ALP_IMG_TAG
          script:
            - python -V

  - name: build_docker_img
    type: runSh
    steps:
      - IN: build_alpine_ci_repo
      - TASK:
          name: build_image
          runtime:
            options:
              env:
                - RES_OUT_IMG: "build_docker_ci_img_dh"
          script:
            # Extract image information and Docker registry credentials from resources using shipctl utility
            # Detailed shipctl guide is at http://docs.shippable.com/platform/tutorial/workflow/using-shipctl/
            - IMG_NAME=$(shipctl get_resource_version_key "$RES_OUT_IMG" "sourceName")
            - DH_USR_NAME=$(shipctl get_integration_resource_field "$RES_OUT_IMG" "userName")
            - DH_PASS=$(shipctl get_integration_resource_field "$RES_OUT_IMG" "password")
            - DH_URL=$(shipctl get_integration_resource_field "$RES_OUT_IMG" "url")
            - pushd $(shipctl get_resource_state "build_alpine_ci_repo")
            - docker build -t=$IMG_NAME:$BUILD_NUMBER -f Dockerfile.docker --pull .
            - docker login -u $DH_USR_NAME -p $DH_PASS
            - docker push $IMG_NAME:$BUILD_NUMBER
      - OUT: build_docker_ci_img_dh
    on_success:
      script:
        # Update OUT resource to create a new version that will trigger rest of the workflow
        - shipctl put_resource_state_multi "$RES_OUT_IMG" "versionName=$BUILD_NUMBER"
```

######i. `job` named `build_alpine_img`
* The first job in the above config is a `runSh` job called `build_alpine_img`.
* The first section of `steps` defines the input `IN` resource that is required to execute this job. In our case, we just need the `image` resource which points to our Docker image. Since this resource is an `IN`, this job will be triggered every time a version of the image is created.
* The `TASK` section is the actual code that is executed when the job runs.
  *  First, we extract image information from the `build_alpine_ci_img_dh` resource, such as image name, and Docker registry credentials from the `integration`, again using the shipctl utility.
  *  Then, we change our present directory to where source code is present using the shipctl utility `get_resource_state`, which is documented in greater detail [here](/platform/tutorial/workflow/using-shipctl/#get_resource_state)
  *  Lastly, we use native Docker commands to build and push the image, using `$BUILD_NUMBER` as the image tag. `$BUILD_NUMBER` is a [standard environment variable](/platform/workflow/job/runsh/#default-environment-variables) available for every job.
*  On success, we output the tag information using the utility function `put_resource_state_multi` to image `build_alpine_ci_img_dh` so that downstream jobs have access to the latest tag pushed and are triggered if they have the image resource as an `IN`.

######iii. `job` named `build_docker_img`
* This is very similar to the first job, except that it uses a different dockerfile to build.


Detailed info about `runSh` job is [here](/platform/workflow/job/runsh).

Detailed info about Shippable Utility functions are [here](/platform/tutorial/workflow/using-shipctl).

#####2d. Push changes to shippable.yml

Commit and push all the above changes to **shippable.yml**.

####3. Add the Assembly Line to your Shippable Subscription

In Shippable's world, a Subscription maps to an Organization or a Team, depending on the source control provider. An Assembly Line workflow is defined at a Subscription level and all jobs are resources are global to your subscription.

To add your Assembly Line to Shippable, you need to add the repository containing the configuration as a "sync repository" by [following instructions here](/platform/tutorial/workflow/crud-syncrepo/#adding-a-syncrepo). This automatically parses your **shippable.yml** config and adds your workflow to Shippable. Your workflow will always be kept in sync with the config in this repository, and be automatically updated every time you push a change to **shippable.yml**.

Your view will look something like this:

<img src="/images/tutorial/use-alpine-custom-image-runsh-fig1.png" alt="Assembly Line view">

####4. Run the job `build_alpine_img`

Manually run the job only once by right clicking on the job. You can look at the logs and you will see that your custom image is successfully built and pushed to Docker registry. It will also trigger the `test_alpine_img` job automatically once the build process is complete.

<img src="/images/tutorial/use-alpine-custom-image-runsh-fig2.png" alt="Deploy console output">
<img src="/images/tutorial/use-alpine-custom-image-runsh-fig3.png" alt="Deploy console output">

## Further Reading
* [Add your Assembly Line config](/platform/tutorial/workflow/crud-syncrepo/)
* [Working with Integrations](/platform/tutorial/integration/howto-crud-integration/)
* [Defining Resources in shippable.yml](/platform/tutorial/workflow/shippable-yml/#resources-config)
* [Defining Jobs in shippable.yml](/platform/tutorial/workflow/shippable-yml/#jobs-config)
* [Sharing information between Jobs](/platform/tutorial/workflow/share-info-across-jobs/)
