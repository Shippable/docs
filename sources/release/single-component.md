main_section: Release
sub_section: Creating a release
page_title: From Single Service / Component

# Creating a release for a single service / component

This tutorial demonstrates how to semantically version a single component before it is deployed to an environment. The component can be any artifact that is deployed to an environment such as a JAR/WAR file or a Docker image. In a broader end-to-end context, the `release` job usually should be an `IN` for a [deploy job](/reference/job-deploy/) as shown below:

<img src="/images/release/release-job-context.png" alt="Triggering deployments" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

In general, creating releases helps you version your component and keep track of what is included in each release. However, this step is also optional, so you could choose to directly connect your `manifest` job to `deploy`.

## Basic Config

###Inputs

A release job needs a [manifest](/reference/job-manifest/) job and a [version](/reference/resource-version/) resource as inputs.

<img src="/images/release/release-inputs.png" alt="Triggering deployments" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

- You can add a version resource in your `shippable.resources.yml` file.

```
# Release version
  - name: demo-release-version
    type: version
    seed:
      versionName: "1.0.0"
```
Set the starting point of your version in the versionName field. The `release` job defined in the next step will use the versionName as the seed and increment it whenever it is triggered.  

- Next, add a `release` job to `shippable.jobs.yml` file. The snippet below also shows sample config for the input manifest job :

```
# Manifest job
  - name: demo-manifest
    type: manifest
    steps:
      - IN: my-image
      - IN: my-image-dockerOptions
      - TASK: managed

#Release job
  - name: version-deployment
    type: release
    steps:
      - IN: demo-release-version
      - IN: demo-manifest
      - TASK: managed
        bump: beta
```

* `name` should be an easy to remember text string. This will appear in the visualization of this job in the SPOG.
* `type` is always set to release
* The manifest job and version resource are inputs, i.e. specified in the `IN` tag.
* The `bump` tag specifies how the release version will be incremented each time the release job runs. More on incrementing versions is described in our tutorial for [bumping release versions.](increment-version-number/)

## Sample project

We have a working sample for the scenario described here. Instructions to run this sample are in the README.md file.

**Sample repository:**  [devops-recipes/release-single-component](https://github.com/devops-recipes/release-single-component).

The scenario in our sample project covers the following steps:

- Set up your CI workflow which pushes a Docker image to Docker Hub
- Every time the image is updated, a [**manifest** job](/reference/job-manifest/) updates the manifest.
- The **release job** will version your manifest with [semantic versioning](http://semver.org/)
- This will trigger a **deploy** job which will deploy your versioned component to a target endpoint of your choice. [Read more on deployments](/deploy/why-deploy/).


## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
