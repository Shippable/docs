page_main_title: From Multiple Services/Components
main_section: CD
sub_section: Managing release versions
page_title: Creating a release for a multiple services or components
page_description: How to create a release for a multiple services or components in Shippable

# Creating a release for a multiple services / components

This tutorial demonstrates how to version multiple components before they are deployed to an environment. A component is any artifact that is deployed to an environment such as a WAR file or a Docker image. In this tutorial, we will version two Docker images before they get deployed to an environment.

##Setup

The basic setup requires a manifest job for each component that is to be versioned in the shippable.yml file. Here we demonstrate the steps to version a Node Docker image and a Java Docker image before they are deployed to an Amazon ECS cluster using a release job.

This tutorial uses docker images built in the following tutorials:

- [Node tutorial](https://github.com/devops-recipes/release-single-component) that builds a Node Docker image and pushes the image to Docker Hub.
- [Java tutorial](https://github.com/devops-recipes/ci-java-push-ecr) that builds a Java war Docker image and pushes the image to Amazon EC2 Container Registry.

## Basic Configuration

- Once you have completed the setup above, add a version resource to the shippable.yml file.
```
resources:
  - name: release-version
    type: version
    seed:
      versionName: "1.0.0"
    flags:
      - release-multiple-component"
```
Set the starting point of your version in the versionName field. The release job, which we will define next, will use the versionName as the seed and increment it whenever it is triggered.  


- Next add the manifest jobs and a release job to the shippable.yml file.
```
jobs:
  # Manifest job for node image
  - name: node-img-manifest
    type: manifest
    steps:
      - IN: demo-img
      - IN: demo-img-opts
    flags:
      - release-multiple-component

  # Manifest job for java image
  - name: java-img-manifest
    type: manifest
    steps:
      - IN: ecr-img
      - IN: ecr-img-opts
    flags:
      - release-multiple-component

  # Release job
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

We provide the two manifest jobs as inputs to the release job `multiple-components-release`. Each manifest job takes its associated image as its input.

The version resource `release-version` defined earlier in shippable.yml is provided as the third input to the release job.

The bump field will increment the version and set the version to 1.1.0-beta. The bump field can be configured to increment major, minor, patch, alpha, beta, or rc.

For additional documentation on the bump field, please go [here](http://docs.shippable.com/pipelines/jobs/release/).

## Sample project

We have a working sample of this scenario for you. Instructions to run this sample are in the README.md file.

**Source code:**  [devops-recipes/release-multiple-component](https://github.com/devops-recipes/release-multiple-component).

<img src="https://github.com/devops-recipes/release-multiple-component/raw/master/public/resources/images/pipeline-view.png" alt="Configured sample pipeline" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
