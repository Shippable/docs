page_main_title: Build and Push image to Docker Hub
main_section: Tutorial
sub_section: Build and Push Images
sub_sub_section: Docker Hub
page_title: Build and Push Docker image to Docker Hub
page_description: Build and Push a Docker image to Docker Hub automatically
page_keywords: Build docker containers, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, 

# Build and Push Docker Image to Docker Hub
This tutorial explains how to continuously build and push an image to Docker Hub with Dockerfile being stored on Github

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
* Creating Account Integrations

## Detailed Instructions

### Step 1
Log into shippable. 

### Step 2 
Add an account integration named `dr_dh` of type `Docker Registry` and allow this integration to be used by the Org that contains your `Dockerfile` repo. Alternatively, you could just permit the repo to have access rather than the whole Org

<img src="/images/tutorial/build-push-docker-image-fig1.png" alt="Add Account Integration">

### Step 3
Add `shippable.yml` to your repo that contains the `Dockerfile` and in this case `https://github.com/devops-recipes/app_be`

### Step 4 
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
    integration: dr_dh # replace with your integration name
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

This will configure the CI project with the following characteristics

* Language is set to Python
* We will automatically build when a commit is made to `master` branch
* The integration created in Step 1 is referenced here to auto login to Docker Hub
* Two global environment variables are set to hold the information about the Docker image
* The build section setups the commands to execute to build and push the image
* Optional configrations needed only if you would like to use the image in CD processes
* Output image tag into an `image` resource
* Defines an image resource used to store all the tags
* Extend the CI job to add output definition in the steps

### Step 5
Enable the project to run CI job when a PR or commit is made to `master` branch   

<img src="/images/tutorial/build-push-docker-image-fig2.png" alt="Enable CI Project">

## Optional config
If you would like to store tags into an image resource so that continuous deployment pipelines can be added, the following steps are needed

### Step 6
Add an account integration name `dr_github` of type `Github` and allow this integration to be used by the Org that contains your `Dockerfile` repo.

### Step 7 
Add pipelines for this project to create a repo to job to image workflow

<img src="/images/tutorial/build-push-docker-image-fig3.png" alt="Add Assembly Lines">

### Step 8 
Now add a commit to your repo and you should see the CI process kick off and after pushing the image with a new tag to Dockerhub, the tag info is pushed into the image as a new version

<img src="/images/tutorial/build-push-docker-image-fig4.png" alt="E2E Pipeline View">

## Further Reading
1.

