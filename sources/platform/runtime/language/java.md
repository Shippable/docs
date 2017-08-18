page_main_title: Java Language Overview
main_section: Platform
sub_section: Runtime
sub_sub_section: Languages
page_title: CI/CD for Java Applications

# Java
This section explains how Shippable DevOps Assembly Lines Platform behaves when you set `language: java` in your [shippable.yml](/platform/tutorial/workflow/shippable-yml) for a [runCI job](/platform/workflow/job/runci)

```
language: java
jdk:
  - oraclejdk8
```

The default version of the language image depends on the [machine image](/platform/tutorial/runtime/ami-overview/) selected for the subscription. You can override this by using the `pre_ci_boot` section or even [build your own image](/ci/custom-docker-image) from scratch.

<a name="versions"></a>
## Versions
This table helps you choose the right language version tag to set in your `shippable.yml` for your app. If you don't provide a `jdk` tag in your YML, the default version will be used.

The JDKs available vary depending on the tag of the language image; the JDK specified should be listed in the table for the language image tag used. The language image with a particular tag will be available on the edition of the [Runtime AMI](/platform/tutorial/runtime/ami-overview) with the same version number. If you specify an image tag that does not match the Runtime AMI, it will be used but will also increase your build time.

| Java JDK  |  Language Image Tags  | Supported OS
|-----------|-----------------------|-----------
|openjdk9   |   v5.7.3 and later    |  Ubuntu 16.04
|openjdk8   |   v5.3.2 and later    |  All
|openjdk7   |   v5.3.2 and later    |  All
|oraclejdk9 |   v5.7.3 and later    |  All
|oraclejdk8 |   v5.3.2 and later    |  All
|oraclejdk7 |   v5.5.1 and earlier  |  All

You can use more than one of these to test your app against multiple versions using [matrix builds](/ci/matrix-builds).

## Default Behavior

```
build:
  ci: <is not set>
```

If you do not set the `ci` section of the YML, then we will inject this section to your YML definition at runtime:

```
build:
  ci:
    - gradle assemble                 # if build.gradle is present at root
    - mvn install -DskipTests=true    # if pom.xml is present at root
    - ant test                        # if above 2 cases are false
```

## Shippable provided Runtime images
Each of the language images is built from the respective base OS version of the image. Since we install all of the packages, CLIs, and services on the base images, these language images get them automatically. For more information visit the respective base image pages.

### Ubuntu 16.04

**Built from** [drydock/u16all](/platform/runtime/os/ubuntu16)

|Image| Release Date |Available in AMI |
|----------|------------|-----|
drydock/u16javall:v5.8.2  | Aug 2017 - Latest Version | [v5.8.2](/platform/tutorial/runtime/ami-v582)
drydock/u16javall:v5.7.3  | Jul 2017  | [v5.7.3](/platform/tutorial/runtime/ami-v573)
drydock/u16javall:v5.6.1  | Jun 2017  | [v5.6.1](/platform/tutorial/runtime/ami-v561)
drydock/u16javall:v5.5.1  | May 2017  | [v5.5.1](/platform/tutorial/runtime/ami-v551)
drydock/u16javall:v5.4.1  | Apr 2017  | [v5.4.1](/platform/tutorial/runtime/ami-v541)
drydock/u16javall:v5.3.2  | Mar 2017  | [v5.3.2](/platform/tutorial/runtime/ami-v532)

### Ubuntu 14.04

**Built from** [drydock/u14all](/platform/runtime/os/ubuntu14)

|Image| Release Date |Available in AMI |
|----------|------------|-----|
drydock/u14javall:v5.8.2  | Aug 2017 - Latest Version | [v5.8.2](/platform/tutorial/runtime/ami-v582)
drydock/u14javall:v5.7.3  | Jul 2017  | [v5.7.3](/platform/tutorial/runtime/ami-v573)
drydock/u14javall:v5.6.1  | Jun 2017  | [v5.6.1](/platform/tutorial/runtime/ami-v561)
drydock/u14javall:v5.5.1  | May 2017  | [v5.5.1](/platform/tutorial/runtime/ami-v551)
drydock/u14javall:v5.4.1  | Apr 2017  | [v5.4.1](/platform/tutorial/runtime/ami-v541)
drydock/u14javall:v5.3.2  | Mar 2017  | [v5.3.2](/platform/tutorial/runtime/ami-v532)

## Further Reading
* [Everything about Shippable AMIs](/platform/tutorial/runtime/ami-overview)
* [Quick Start to CI](/getting-started/ci-sample)
* [Continuous Integration of a Java application](/ci/java-continuous-integration)
* [How to check which AMI your project is using](/platform/tutorial/runtime/ami-overview/#viewing-subscription-machine-image)
