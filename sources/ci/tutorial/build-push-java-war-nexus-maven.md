page_description: Build and Push a Java WAR file to Nexus using Maven
main_section: CI
sub_section: Tutorials

# Build and Push Java WAR file to Nexus Repository with Maven

This tutorial explains how to continuously build and push a Java based web application to a Nexus Repository using Maven. We are using a Java sample application that has basic CI tests.

This document assumes you're familiar with the following concepts:

* [Maven in 5 mins](http://maven.apache.org/guides/getting-started/maven-in-five-minutes.html)
* [Install Maven](https://maven.apache.org/install.html)
* [Settings.xml](https://maven.apache.org/settings.html)
* [pom.xml](https://maven.apache.org/guides/introduction/introduction-to-the-pom.html)
* [Nexus Repository Quick Start](https://help.sonatype.com/learning/repository-manager-3/proxying-maven-and-npm-quick-start-guide)

If you're unfamiliar with Maven and/or Nexus, you should start with learning how to implement this scenario manually. Refer to our blog for a step-by-step tutorial: [Java CI: Build and Push a WAR application to Nexus](http://blog.shippable.com/java-ci-nexus-maven).

There are many challenges with manually executing this CI workflow. First, you should execute it for every commit against the latest codebase, which is difficult to enforce manually. Second, if you want to trigger a dependent multi-stage workflow which deploys this application to Test, Staging environments and runs test suites, you will have to manually handle all that as well. This leads to overdependence on people and isn't efficient.

If you want to achieve frictionless development, you should automate your CI workflow.


## Automating Build and Push to Nexus

This tutorial will show you how to automate your workflow using Shippable's native CI feature.

To jump into this tutorial, you will need to familiarize yourself with a few platform concepts.

### Concepts

* [Integrations](/platform/integration/overview/)
 * [Key Value](/platform/integration/key-value/)
* [How CI works on Shippable](/ci/why-continuous-integration/)

### Step-by-step instructions

The following sections explain the process of configuring a CI workflow to continuously test, build and push a Java WAR file to Nexus Repository. The build process uses Maven to build, test and push the WAR file.

**Source code is available at [devops-recipes/java_web_app](https://github.com/devops-recipes/java_web_app	)**

**Complete YML is at [devops-recipes/java_web_app/shippable.yml](https://github.com/devops-recipes/java_web_app/blob/master/shippable.yml)**

####1. Add necessary Account Integrations

Integrations are used to connect Shippable Platform with external providers. More information about integrations is [here](/platform/tutorial/integration/howto-crud-integration/). The following are the integrations that we will use in this sample

#####1a. Add `Key Value` Integration

Your Nexus secrets will be securely stored in a Key Value integration named `drship_nexus`. This allows us to inject these at runtime without having to include actual values in your config.

Add the following keys and their values to the integration

* `nexus_url`
* `nexus_username`
* `nexus_password`

Detailed steps on how to add a Key value Integration are [here](/platform/integration/key-value/#creating-an-account-integration).

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step

####2. Author CI configuration

The platform is built with "Everything as Code" philosophy, so all configuration is in a YAML-based file called **shippable.yml**, which is parsed to create your CI workflow.

Detailed CI configuration info is [here](/ci/yml-structure/).

#####2a. Add empty shippable.yml to your repo

Add an empty **shippable.yml** to the the root of your repo.

#####2b. Add `ci` section of the config

Configure CI by adding the following code to **shippable.yml**:

```
language: java

jdk:
  - oraclejdk8

integrations:
  generic:
    - integrationName: drship_nexus

env:
  global:
    # WAR information. Replace with your application's settings
    - group_id="com.demo"
    - artifact_id="helloworld"
    - artifact_version="0.0.1-SNAPSHOT"
    - artifact_extension="war"
    - artifact_repo="repository/snapshots"
    - ship_test_res_loc="shippable/testresults"

build:
  ci:
    - export repository_url=$nexus_url"/"$artifact_repo
    - |
       mkdir -p $ship_test_res_loc
       mkdir -p ~/.m2
    - shipctl replace temp/settings.xml pom.xml
    - cp temp/settings.xml ~/.m2/.
    - mvn -q -B clean install deploy
    - ls -al $SHIPPABLE_BUILD_DIR/target

```

The above YML does the following things:

* Language is set to Java
* Version of Java is set to oraclejdk8
* The integration is referenced here to automatically inject Nexus credentials
* Global environment variables hold information about the WAR artifact. Please replace these values as per your application settings.
* The `build` section contains scripts to build and push your WAR file. The wildcards in `settings.xml` are replaced with values from `drship_nexus` using Shippable utility shipctl. We also replace wildcards in `pom.xml` with values we set in the `env` section.
* Next, we put the files in the required paths.
* Last, we do an `mvn` build and deploy. This deploys you new WAR file as a new version to your Nexus Repository

####3. Enable the repo for CI

For automated builds, we need to enable the project for CI, which will automatically create the webhooks required to continuously build the project.

Detailed steps on enabling a repo are [here](/ci/enable-project/).

####4. Run your CI Project

You can either manually trigger your CI project or commit a change to the application git repository which should automatically build your project.

Verify that your repository was created on Nexus!

## Using a lightweight Custom CI Image

Your CI workflow is executed inside a Docker container that is spun up on your build node. By default, Shippable chooses an image from its standard library, depending on your `language` setting.  

However, there are situations where you might want to use a lightweight Docker image to spin up your container. This is especially true for customers using BYON or Shippable Server.

This section shows you how to use your custom image to spin up the CI container.

If you want to implement really hardcore automation, you can also build and push this lightweight image using Shippable. That is out of scope for this tutorial but is available in a separate document [here](/ci/tutorial/build-custom-ci-image). That tutorial puts the tag of the image that it builds into an image resource called `build_custom_ci_img_dh`. You can either use this resource as an `IN` and extract the tag, or you can hardcode it if you just want to use a static tag.

### Concepts

* [Platform overview](/platform/overview/)
* [Resources](/platform/workflow/resource/overview/)
 * [image](/platform/workflow/resource/image)
* [Jobs](/platform/workflow/job/overview/)
 * [runCI](/platform/workflow/job/runci)

## Instructions

####1. Specify an IN resource pointing to custom image

Please SKIP this section if you're using a static image tag.

In order to treat your CI workflow like an Assembly Line job, i.e. be able to define `IN` and `OUT` resources, you need to define a `runCI` job with the name of your repository appended by `_runCI`.

Add the following at the very end of your **shippable.yml**:

```
jobs:
  - name: java_web_app_runCI    # This should be <your repo name>_runCI
    type: runCI
    dependencyMode: strict
    triggerMode: parallel
    steps:
      - IN: build_custom_ci_img_dh    # image resource from the tutorial on building custom image

```

####2. Extend the CI Config

Add the following config to your **shippable.yml** under the `build` section:

```
build:
  pre_ci:
    # Skip this if you want to use a static image tag
    - export IMG_TAG=$(shipctl get_resource_version_key build_custom_ci_img_dh "versionName")

  pre_ci_boot:
    image_name: devopsrecipes/build_custom_ci
    image_tag: $IMG_TAG
    pull: true
```

* `pre_ci` section runs before the `ci` section. In this case we are extracting the `IMG_TAG` from the image resource `build_custom_ci_img_dh` that was created as part of [this](/ci/tutorial/build-custom-ci-image). You can skip this if you already have an image and want to use a static image tag.
* In the `pre_ci_boot` section, we set the image we want to use to boot up the CI container. If you're using a static tag, replace `$IMG_TAG` with your tag.
* If the `ci` section runs without any error, then we use the utility function `put_resource_state` we copy a bunch of key values into a params resource `war_loc` (defined in the next step). Utility functions are invoked using the command `shipctl`. A full list of these commands are [here](/platform/tutorial/workflow/using-shipctl)

####2. Push changes to shippable.yml

Commit and push all the above changes to **shippable.yml**.

####3. Add the Assembly Line to your Shippable Subscription

Please SKIP this if you did not follow step 1, i.e. you're using a static image tag.

In order to tell Shippable to read your `jobs` config, you need to add the repository containing the configuration as a "sync repository" by [following instructions here](/platform/tutorial/workflow/crud-syncrepo/#adding-a-syncrepo). This automatically parses the `jobs` and `resources` sections of your `shippable.yml` config and adds your workflow to Shippable.

Your view should look something like this:

<img src="/images/tutorial/build-push-java-war-nexus-maven-fig1.png" alt="E2E Pipeline View">

####3. Run your CI Project

Manually trigger your CI project or commit a change to the application git repository. This will trigger a build. Ensure that your custom image was used by looking at the `pull_job_image` and `boot_container` sections of your logs:

<img src="/images/tutorial/pull-custom-ci-image.png" alt="Pull custom image for CI">

## Adding CD capability

CI is a developer focused activity that produces a deployable unit of your application, a WAR file in this instance. If you want to add a Continuous Delivery workflow which deploys your application into successive environments like Test, Staging, Production and runs test suites, the downstream jobs performing these activities will need to know where to find your WAR file.

This section shows how you can output your WAR information into a `params` resource which can be used by downstream jobs.

### Concepts

Here are the additional concepts you need to know before you start:

* [Platform overview](/platform/overview/)
* [Resources](/platform/workflow/resource/overview/)
    * [image](/platform/workflow/resource/image)
* [Jobs](/platform/workflow/job/overview/)
    * [runCI](/platform/workflow/job/runci)

### Instructions

####1. Author Assembly Line configuration

Your Assembly Line config is also stored in **shippable.yml**, but the structure is quite different from CI config. Detailed AL configuration info is [here](/platform/workflow/config/#assembly-lines-configuration).

#####1a. Add `resources` section of the config

`resources` section defines the params resource which will hold information about the WAR and its location.

```
resources:
  - name: war_loc
    type: params
    versionTemplate:
      params:
        seed: true
```

#####i. params resource named `war_loc`
A params resource contains key-value pairs with information about WAR file. We are defining a placeholder `seed` value here. The rest of the information is populated when `on_success` of CI job executes.

Detailed info about `params` resource is [here](/platform/workflow/resource/params).

#####1b. Add `jobs` section of the config**

A job is an execution unit of the assembly line.

In order to treat your CI workflow like an Assembly Line job, i.e. be able to define `IN` and `OUT` resources, you need to define a `runCI` job with the name of your repository appended by `_runCI`.

In this section, we will define the `runCI` job that will specify `war_loc` as an `OUT`, meaning your CI workflow will update this resource.

Add the following at the very end of your **shippable.yml**. If you already have this job in your yml, just add the `OUT` resource `war_loc`:

#####i. job named `java_web_app_runCI`.

```
jobs:
  - name: java_web_app_runCI
    type: runCI
    dependencyMode: strict
    triggerMode: parallel
    steps:
      - IN: build_custom_ci_img_dh
      - OUT: war_loc

```

#####1c. Update war_loc in CI config

To update the `war_loc` resource with artifact information, such as `artifact_version`, `group_id`, `artifact_extension`, etc, add the following to the `build` section:

```
build:
  on_success:
    - shipctl put_resource_state_multi war_loc "versionName=$artifact_version" "artifact_version=$artifact_version" "group_id=$group_id" "artifact_id=$artifact_id"
    - shipctl put_resource_state_multi war_loc "artifact_extension=$artifact_extension" "repository_url=$repository_url" "build_nbr=$BUILD_NUMBER"
```

####2. Push changes to shippable.yml

Commit and push all the above changes to **shippable.yml**.

####3. Add the Assembly Line to your Shippable Subscription

In order to tell Shippable to read your `jobs` and `resources` config, you need to add the repository containing the configuration as a "sync repository" by [following instructions here](/platform/tutorial/workflow/crud-syncrepo/#adding-a-syncrepo). This automatically parses the `jobs` and `resources` sections of your `shippable.yml` config and adds your workflow to Shippable.

Please skip this section if you have already added this as a sync repository.

Your SPOG view should look something like this:

<img src="/images/tutorial/build-push-java-war-nexus-maven-fig1.png" alt="E2E Pipeline View">

####4. Test your Assembly Line

Add a commit to your repo and you should see the CI process kick off, which builds a WAR file and then pushes it to your Nexus Repository. The location info is then pushed into `war_loc` as a new version.

If `war_loc` is an `IN` to another job in your workflow that pulls the WAR file, that job will be triggered every time the `war_loc` version is updated.

## Further Reading
* [Build and Push a Docker Image to Docker Hub](/ci/tutorial/build-push-image-to-docker-hub)
* [Working with Integrations](/platform/tutorial/integration/howto-crud-integration/)
* [Defining Resources in shippable.yml](/platform/tutorial/workflow/shippable-yml/#resources-config)
* [Defining Jobs in shippable.yml](/platform/tutorial/workflow/shippable-yml/#jobs-config)
* [Sharing information between Jobs](/platform/tutorial/workflow/share-info-across-jobs/)
