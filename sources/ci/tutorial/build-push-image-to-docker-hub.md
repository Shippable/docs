page_main_title: Build and Push image to Docker Hub
main_section: Tutorial
sub_section: Build and Push Images
sub_sub_section: Docker Hub
page_title: Build and Push Docker image to Docker Hub
page_description: Build and Push a Docker image to Docker Hub automatically
page_keywords: Build docker containers, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, 

# Build and Push Docker Image to Docker Hub
This tutorial explains how to continuously build and push an image to Docker Hub with Dockerfile being stored on Github.

## Introduction

Here is why you should be using Shippable. 


## Building Blocks

### Shippable Components
* [Docker Registry integration](/platform/integration/docker-registry)
* [Github integration](/platform/integration/github)
* [image resource](/platform/workflow/resource/image)
* [runCI job](/platform/workflow/job/runci)

## Shippable Concepts
* Defining Jobs and Resources using `shippable.yml`
* Output information from a Job to a Resource
* Using specific version of build image
* Using templates inside your Job
* [Enabling a repo for CI](ci/enable-project/)
* [Working with Integrations](platform/tutorial/howto-crud-integration)

## Step by Step Instructions

###1. Add Docker Registry Account Integration
To be able to push and pull images from Docker Hub we need to add an integration named `drship_dockerhub`. Set permissions to allow the Org that contains your `Dockerfile` repo to be able to use it. Alternatively, you could just permit the repo to have access rather than the whole Org. 

<img src="/images/tutorial/build-push-docker-image-fig1.png" alt="Add Account Integration">

[Working with Integrations](platform/tutorial/howto-crud-integration) tutorial has more details.

###2. Add `shippable.yml` and configure CI
`shippable.yml` is a declarative way to configure your Continuous Integration steps on Shippable. Add this file to 
the repo that contains the `Dockerfile` and in for this e.g. it is `https://github.com/devops-recipes/app_be`.

Configure CI steps by adding the following code snipped to the YML file

```
language: python
branches:
  only:
    - master
integrations:
  hub:
    - integrationName: dr_dh
      type: docker
env:
  global:
    - DOCKER_ACC=devopsrecipes # {account name}
    - DOCKER_REPO=app_be
build:
  ci:
    - docker build -t $DOCKER_ACC/$DOCKER_REPO:$BRANCH.$BUILD_NUMBER .
  post_ci:
    - docker push $DOCKER_ACC/$DOCKER_REPO:$BRANCH.$BUILD_NUMBER

# Optional configurations incase you want to store the tags of the image
# built and pushed in an image resource. Useful if you would like to use
# this image in CD processes
  on_success:
    - shipctl put_resource_state $DOCKER_REPO"_img" versionName $BRANCH.$BUILD_NUMBER

resources:
# Docker Image
  - name: app_be_img
    type: image
    integration: drship_dockerhub # replace with your integration name
    versionTemplate:
      sourceName: "devopsrecipes/app_be" # replace with your Hub URL
      isPull: false
      versionName: latest

jobs:
# Name of this job depends on your repo name, in our case app_be
  - name: app_be_runCI
    type: runCI
    dependencyMode: strict
    triggerMode: parallel
    steps:
      - OUT: app_be_img
    flags:
      - be

```

The above YML does the following things

* Language is set to Python
* We will automatically build when a commit is made to `master` branch
* The integration created in Step 1 is referenced here to auto login to Docker Hub
* Two global environment variables are set to hold the information about the Docker image
* The build section setups the commands to execute to build and push the image
* Optional configrations needed only if you would like to use the image in CD processes
* Output image tag into an `image` resource
* Defines an image resource used to store all the tags

The optional section does the following things

* If the ci section runs without any error, then using in-built utility function `put_resource_state` we copy the image tag into the `versionName` field of image `app_be_img` resource. Utility functions are invoked using the command `shipctl`. A full list of these commands are [here](platform/tutorial/using-shipctl)
* `resources` section is used to define resources that are used by the assembly line. Here we are creating an image named `app_be_img` that can be access using integration `drship_dockerhub`. `versionTemplate` has the information used to create the first version of the image. `sourceName` contains the location of the image and the  `versionName` contains the tag. `isPull` is used to configure whether the image is automatically pull or not. Everytime a new tag is created, a new version get created. This is what `put_resource_state` does i.e. increment the version if there is any change
* `jobs` section is used to define a jobs that run as part of the Assembly Line. When a CI project is enable a job is automatically created with the name of the repo appended by `_runCI`. We are extending this automatically created CI job to also have an image output. In additon we are also adding a flag. We are allowing these jobs to run in parallel if multiple webhooks come in and also we making sure it only triggers when all dependencies are in consistent state, hence `strict`

###3. Enable the repo for CI
For automated builds, we need to enable the project for CI. Once enabled the platform will automatically create the webhooks required to continuosly build the project. 

<img src="/images/tutorial/build-push-docker-image-fig2.png" alt="Enable CI Project">

[Enabling a repo for CI](ci/enable-project/) has more detailed instructions

###4. Run your CI Project
At this stage, you can either manually trigger your CI project or commit a change to the git repo which should automatically build your project.


The rest of the steps are **Optional** and are needed only if you want to add Continuous Deployment capabilities by adding assembly lines. To deploy the right tag of the image, we need to store the tags as versions of the image resource. The rest of the steps are instructions on how to do it

###5. Add Github Account Integration
To add assembly lines, Shippable needs source control credentials. We do not automatically use the users token as in the case of CI. Hence this needs to added to the account. Add and integration named `drship_github` add permissions to the Org that containes the repo with the yml file.

[Working with Integrations](platform/tutorial/howto-crud-integration) tutorial has more details.

###6. Add Assembly Line Config
To read resources and jobs config from `shippable.yml` we need to add assembly line. 

<img src="/images/tutorial/build-push-docker-image-fig3.png" alt="Add Assembly Lines">

[Adding Assemnly Lines](deploy/configuration/) has more detailed instructions

###7. End to End Build and Push Assembly Line
If you change the view of your subscriptions page to show in SPOG view, you should see something like this

<img src="/images/tutorial/build-push-docker-image-fig4.png" alt="E2E Pipeline View">

Now add a commit to your repo and you should see the CI process kick off and after pushing the image with a new tag to Dockerhub, the tag info is pushed into the image as a new version

## Further Reading
1.	

