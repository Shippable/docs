page_main_title: From Multiple Services/Components
main_section: Release
sub_section: Creating a release

# Creating a release for a multiple services / components

This tutorial demonstrates how to version multiple components before they are deployed to an environment. A component is any artifact that is deployed to an environment such as a WAR file or a docker image. In this tutorial, we will version two docker images, before they get deployed to an environment.

##Setup

The basic setup needs a manifest job for each component that has to be versioned in the shippable.resources.yml file. Here we demonstrate the steps to version a node docker image and a java docker images before they are deployed to an ECS cluster using a release job.

This tutorial uses docker images built by -
- [Node tutorial](https://github.com/devops-recipes/release-single-component) that builds a node docker image and pushes the image to Docker hub.
- [Java tutorial](https://github.com/devops-recipes/ci-java-push-ecr) that builds a java war docker image and pushes the image to EC2 Container Registry.

## Basic Config

- <i class="ion-ios-minus-empty"></i>Once you have completed the Setup, add a version resource in the shippable.resources.yml file.
```
  - name: release-version
    type: version
    seed:
      versionName: "1.0.0"
    flags:
      - release-multiple-component"
```
Set the starting point of your version in the versionName field. The Release job which we will define later on in this tutorial will use the versionName as the seed and increment it whenever it is triggered.  


- <i class="ion-ios-minus-empty"></i>Next add a Release job to shippable.jobs.yml file of **type release**.
```
#Manifest job for node image
  - name: node-img-manifest
    type: manifest
    steps:
      - IN: demo-img
      - IN: demo-img-opts
      - TASK: managed
    flags:
      - release-multiple-component

#Manifest job for java image
  - name: java-img-manifest
    type: manifest
    steps:
      - IN: ecr-img
      - IN: ecr-img-opts
      - TASK: managed
    flags:
      - release-multiple-component

#Release job
  - name: multiple-components-release
    type: release
    steps:
      - IN: java-img-manifest
      - IN: node-img-manifest
      - IN: release-version
      - TASK: managed
        bump: beta
    flags:
      - release-multiple-component
```

We provide the two manifest jobs as inputs to the release job `multiple-components-release`. Each Manifest job takes its associated image as its input.

The version resource `release-version` defined earlier in shippable.resources.yml is provide as another input.

The bump field will increment the version and set the version to 1.1.0-beta. The bump file can also be configured to increment major, minor, patch, alpha, beta or rc.

For additional documentation on the bump field, please go [here](http://docs.shippable.com/pipelines/jobs/release/).

## Sample project

We have a working sample of this scenario for you. Instructions to run this sample are in the README.md file.

**Source code:**  [devops-recipes/release-multiple-component](https://github.com/devops-recipes/release-multiple-component).

**Pipeline screenshot link:** [Pipeline screenshot](https://github.com/devops-recipes/release-multiple-component/raw/master/public/resources/images/pipeline-view.png)

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
