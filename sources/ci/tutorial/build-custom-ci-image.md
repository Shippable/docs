page_main_title: Build a custom CI image
main_section: Tutorial
sub_section: CI
sub_sub_section: build
page_title: Build a custom CI Docker image
page_description: Building a custom CI image to use with Shippable CI
page_keywords: Docker, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines

# Building a custom CI image to use with Shippable
This tutorial explains how to build a custom CI image and use it as your CI image on Shippable. There are cases in which you might need certain specific tools or packages that are necessary for you CI build. You can leverage a pre-packaged image on Docker hub and then extend it with whatever you might need for you application build process. Shippable needs a few things to be present on the image in order to run it as part of its CI. The pre-reqs are documented [here](/ci/custom-docker-image/#using-a-custom-docker-image)


These are the following concepts you need to be familiar with to proceed further

* [Docker build](https://docs.docker.com/engine/reference/commandline/build/)
* [Docker push](https://docs.docker.com/engine/reference/commandline/push/)
* [Docker login](https://docs.docker.com/engine/reference/commandline/login/)
* [Dockerfile](https://docs.docker.com/engine/reference/builder/)


## Manual Steps to Build
This section covers step by step instructions to manually build your Docker image

* Create a GitHub repo that will hold the code to build the image. For this e.g. full source code is available [here](https://github.com/devops-recipes/build_custom_ci_image)
* Create an account on [Docker Hub](https://hub.docker.com). 
* Install Docker on your local machine. More information is in [Getting Started Guide](https://docs.docker.com/get-started/)
* Login to docker `docker login` with your credentials
* Your Dockerfile will look something like below

**Dockerfile**

```
FROM ubuntu:16.04

ADD . /u16

RUN /u16/install.sh && rm -rf /tmp && mkdir /tmp

ENV BASH_ENV "/etc/drydock/.env"
```

* Build your image by executing this command. `$IMG_NAME` is your image name and `$BUILD_NUMBER` is your tag

```
sudo docker build -t=$IMG_NAME:$BUILD_NUMBER .
```

* Now you can push this image to your hub by executing this command.

```
sudo docker push $IMG_NAME:$BUILD_NUMBER
```

## Challenges with manual build
There are a few challenges with manual builds

* You have to install Docker on your local machine and manage credentials across multiple repos.
* You will be dependent on network latency as you are pulling all the components to your local machine.
* Your machine is under load during the build process.
* Builds don't trigger automatically if your souce code changes

## Automating Docker Build
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
 * [runSh](/platform/workflow/job/runsh)

### Step by step instructions
The following sections explain the process of setting up an AL to continuously build and push a custom CI image to Docker Hub. This image is made up of the following tools and packages
  
* Ubuntu 16.04 is the base image
* Oracle Java 8
* AWS CLI
* Ansible
* A bunch of other dev tools and packages

 Complete installing scripts are [here](https://github.com/devops-recipes/build_custom_ci_image/blob/master/install.sh)

**Source code is available at [devops-recipes/build_custom_ci_image](https://github.com/devops-recipes/build_custom_ci_image)**

**Complete YML is at [devops-recipes/build_custom_ci_image/shippable.yml](https://raw.githubusercontent.com/devops-recipes/build_custom_ci_image/master/shippable.yml)**

####1. Add necessary Account Integrations
Integrations are used to connect Shippable Platform with external providers. More information about integrations is [here](/platform/tutorial/integration/howto-crud-integration/). The following are the integrations that we will use in this sample

**1a. Add `Docker Registry` Integration**

To be able to push and pull images from Docker Hub, we add `drship_dockerregistry` integration.

Detailed steps on how to add a Docker Registry Integration are [here](/platform/integration/dockerRegistryLogin/#creating-an-account-integration).

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step

**1b. Add `Github` Integration**

In order to read your AL configuration from Github, we add `drship_github` integration. This is the repo where you are going to store your AL config file (`shippable.yml`) and Kubernetes config files.

Detailed steps on how to add a Github Integration are [here](/platform/integration/github/#creating-an-account-integration).

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step

####2. Author Assembly Line configuration
The platform is built with "Everything as Code" philosophy and it uses YAML based configuration file called `shippable.yml`. Jobs and Resources section from your `shippable.yml` are parsed to create the AL.

Detailed AL configuration info is [here](/deploy/configuration).

**2a. Add empty shippable.yml to your repo**

Add an empty config file to the the root of your repo.

**2b. Add `resources` section of the config**

`resources` section holds the config info that is necessary to deploy to a Kubernetes cluster. In this case we have 4 resources defined of type `image`, `gitRepo` and `cliConfig`.

```
resources:
  - name: build_custom_ci_img_dh
    type: image
    integration: drship_dockerhub # replace with your integration name
    versionTemplate:
      sourceName: "devopsrecipes/build_custom_ci" # replace with your Hub URL
      versionName: latest
      
  - name: build_custom_ci_repo
    type: gitRepo
    integration: drship_github
    pointer:
      sourceName: "devops-recipes/build_custom_ci_image"
      branch: master

  - name: build_custom_ci_dh_cli
    type: cliConfig
    integration: drship_dockerhub

```

#####i.`image` resource named `build_custom_ci_img_dh`

The image that you want to deploy to a Kubernetes pod should be available as a resource to the assembly line.

`sourceName` contains the location of the image and the `versionName` contains the tag.

Detailed info about `image` resource is [here](/platform/workflow/resource/image).

#####ii. `gitRepo` resource named `build_custom_ci_repo `
Your Dockerfile will be placed in a repo and the assembly line needs to know where to find them. For this e.g. configs are present in `https://github.com/devops-recipes/build_custom_ci_image`

Dockerfile for this app is [here](https://github.com/devops-recipes/build_custom_ci_image/blob/master/Dockerfile)

Detailed info about `gitRepo` resource is [here](/platform/workflow/resource/gitrepo).

#####iii. `cliConfig` resource named `build_custom_ci_dh_cli `
To be able to interact with Docker Hub, you need to be logged in. Shippable does this for you automatically when a `cliConfig` resource is present in a job.

Detailed info about `cliConfig` resource is [here](/platform/workflow/resource/cliconfig).

**2c. Add `jobs` section of the config**

A job is the actual execution unit of the assembly line. In this job, we are going to do 2 things

* build the image
* push the image

#####i. `job` named build_custom_img.

In this job, we are going to delete and create the secret needed for pulling private images on the Pod.

```
jobs:
  - name: build_custom_img
    type: runSh
    steps:
      - IN: build_custom_ci_repo
      - IN: build_custom_ci_dh_cli
        switch: off
      - TASK:
          name: build_custom_image
          script:
            - pushd $(shipctl get_resource_state "build_custom_ci_repo")
            - export IMG_NAME=$(shipctl get_resource_version_key build_custom_ci_img_dh "sourceName")
            - sudo docker build -t=$IMG_NAME:$BUILD_NUMBER --pull .
            - sudo docker push $IMG_NAME:$BUILD_NUMBER
            - popd
      - OUT: build_custom_ci_img_dh
    on_success:
      script:
        - shipctl put_resource_state_multi build_custom_ci_img_dh "versionName=$BUILD_NUMBER"
```

* Adding the above config to the jobs section of shippable.yml will create a `runSh` job called `build_custom_img `.
* The first section of `steps` defines all the input `IN` resources that are required to execute this job.
  * Dockerfile and other build scripts are presented by the repo `build_custom_ci_repo `
  * Docker registry CLI sets up the docker CLI to talk to your hub.
  * Credentials to connect to the Kuberneter cluster is in `cd_k8s_kube_cli`. This resource has `switch: off` flag which means any changes to it will not trigger this job automatically
* The `TASK` section is the actual code that is executed when the job runs.
  *  First we change our present directory to where source code is present
  *  Then we get the repo and the name of the `image` from `build_custom_ci_repo` image resource.
  *  We do a Docker build using the `$BUILD_NUMBER` as a tag. Build number is a sys ENV variable that gets set automatically
  *  We then push the image to Docker Hub.
*  On success, we output the tag information using the utility function `put_resource_state_multi` to image `build_custom_ci_img_dh` so that downstream jobs have access to the latest tag pushed.

Detailed info about `runSh` job is [here](/platform/workflow/job/runsh).

Detailed info about Shippable Utility functions are [here](/platform/tutorial/workflow/using-shipctl).

**2d. Push changes to shippable.yml**

Commit and push all the above changes to shippable.yml.

####3. Attach the AL to your Repo's Subscription
In Shippable's world, an Org or a Group depending on the SCM system you are using equate to a Subscription. We will hook the YML so that the platform can render the AL.

This should automatically trigger the sync process to add all the changes to the assembly line. Your view should look something like this.

<img src="/images/tutorial/build-custom-ci-image-fig1.png" alt="Assembly Line view">

Detailed info to hook your AL is [here](/deploy/configuration/#adding-a-syncrepo).

####5. Run the job `build_custom_img`
Manually run the job only once by right clicking on the job. You should see the secret created on the Kubernetes cluster.

<img src="/images/tutorial/build-custom-ci-image-fig2.png" alt="Deploy console output">

## Further Reading
* [Build and Push a Docker Image to Docker Hub](/ci/tutorial/build-push-image-to-docker-hub)
* [Working with Integrations](/platform/tutorial/integration/howto-crud-integration/)
* [Defining Resources in shippable.yml](/platform/tutorial/workflow/shippable-yml/#resources-config)
* [Defining Jobs in shippable.yml](/platform/tutorial/workflow/shippable-yml/#jobs-config)
* [Sharing information between Jobs](/platform/tutorial/workflow/sharing-data-between-jobs/)
* Using specific version of Google CLI
* Creating parametrized Jobs
* Using templates inside your Job
* Logging into your deployment cluster using CLI
