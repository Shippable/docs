main_section: Release
sub_section: Creating a release
page_title: From Single Service / Component

# Creating a release for a single service / component

##Setup

This tutorial demonstrates how to version a single component after it is deployed to an environment. The component is any artifact that is deployed to an environment such as a WAR file or a docker image. The basic setup thus needs a deploy job to be configued in the shippable.resources.yml file. Here we demonstrate the steps to version a docker image that is deployed to an ECS cluster using a release job.

This tutorial builds on the [Node tutorial](https://github.com/devops-recipes/push-docker-hub) that builds a docker image and pushes the image to docker hub. 

## Basic Config

- <i class="ion-ios-minus-empty"></i>Once you have completed the Setup, add a version resource in the shippable.resources.yml file.
```
# Release version
  - name: demo-release-version
    type: version
    seed:
      versionName: "1.0.0"
```
Set the starting point of your version in the versionName field. The Release job which we will define later on in this tutorial will use the versionName as the seed and increment it whenever it is triggered.  


- <i class="ion-ios-minus-empty"></i>Next add a Release job to shippable.jobs.yml file of **type release**.
```
# Deploy job that deploys to Amazon ECS cluster
  - name: deploy-test-ecs
    type: deploy
    steps:
      - IN: demo-man
      - IN: env-aws-ecs-cluster
      - TASK: managed

#Release job
  - name: version-deployment
    type: release
    steps:
      - IN: demo-release-version
      - IN: deploy-test-ecs
      - TASK: managed
        bump: beta 
```

Here the deploy job `deploy-test-ecs` is provided as an input to the release job `version-deployment`.

The version resource `demo-release-version` defined earlier in shippable.resources.yml is provide as another input.

The bump field will increment the version and set the version to 1.1.0-beta. The bump file can also be configured to increment major, minor, patch, alpha, beta or rc.

For additional documentation on the bump field, please go [here](http://docs.shippable.com/pipelines/jobs/release/).

## Sample project

Here are some links to a working sample of this scenario. This is a simple Node.js application that runs some tests and then pushes
the image to Docker Hub.

**Source code:**  [devops-recipes/release-single-component](https://github.com/devops-recipes/release-single-component).

**Pipeline screenshot link:** [Pipeline screenshot](https://github.com/devops-recipes/release-single-component/blob/master/public/resources/images/pipeline-view.png)

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
