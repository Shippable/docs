page_main_title: Java Language Overview
main_section: Platform
sub_section: Runtime
sub_sub_section: Languages
page_title: CI/CD for Java Applications

# Java
This section explain how Shippable DevOps Assembly Lines Platform behaves when you set `language: java` in your [shippable.yml](/platform/tutorial/workflow/shippable-yml) for a [runCI Job](/platform/workflow/job/runci), 

```
language: java
jdk:
  - oraclejdk8
```

We use Ubuntu 14.0 version of the language image by default, the latest that was available when your project was enabled. You can override this by using `pre_ci_boot` section or even [build your own image](/ci/custom-docker-image) from scratch.

<a name="versions"></a>
## Versions
This table helps you choose the right tag for the language version that your app needs and it is set in the YML. 

The tags denote which `edition` of the [Runtime AMI](/platform/tutorial/runtime/ami-overview) has that particular version installed. Any tag can be used on any , but each edition of the AMI has that edition cached which will improve your build speed

| Version  |  Tags    | Supported OS
|----------|---------|-----------
|openjdk9  |   v5.7.3    | Ubuntu 16.04 
|openjdk8  |   v5.7.3 and earlier  |  All 
|openjdk7  |   v5.7.3 and earlier  |  All 
|oraclejdk9      |   v5.7.3    | All 
|oraclejdk8      |   v5.7.3 and earlier  |  All 
|oraclejdk7      |   v5.5.1 and earlier  |  All 

You can use more than 1 of these to test your app against multiple version using [matrix build](/ci/matrix-builds)

## Default Behavior

```
build:
  ci: <is not set>
```

If you do not set the `ci` section of the YML, then we will inject this section to your YML definition at runtime

```
build:
  ci:
    - gradle assemble    					# if build.gradle is present at root
    - mvn install -DskipTests=true    	# if pom.xml is present at root
    - ant test 								# if above 2 cases are false
```

## Shippable provided Runtime images
Each of the language image is built from the respective base OS version of the image. Since we install all the all the packages, CLIs & services installed on the base image, these language images get this automatically. For more information visit the respective base image page.

### Ubuntu 16.04

**Built from** [drydock/u16all](/platform/runtime/os/ubuntu16)

|Image| Release Date |Available in AMI | 
|----------|------------|-----|
drydock/u16javall:v5.7.3  | Jul 2017 - Latest Version | [v5.7.3](/platform/tutorial/runtime/ami-v573)
drydock/u16javall:v5.6.1  | Jun 2017  | [v5.6.1](/platform/tutorial/runtime/ami-v561)
drydock/u16javall:v5.5.1  | May 2017  | [v5.5.1](/platform/tutorial/runtime/ami-v551)
drydock/u16javall:v5.4.1  | Apr 2017  | [v5.4.1](/platform/tutorial/runtime/ami-v541)
drydock/u16javall:v5.3.2  | Mar 2017  | [v5.3.2](/platform/tutorial/runtime/ami-v532)

### Ubuntu 14.04

**Built from** [drydock/u14all](/platform/runtime/os/ubuntu14)

|Image| Release Date |Available in AMI | 
|----------|------------|-----|
drydock/u14javall:v5.7.3  | Jul 2017 - Latest Version | [v5.7.3](/platform/tutorial/runtime/ami-v573)
drydock/u14javall:v5.6.1  | Jun 2017  | [v5.6.1](/platform/tutorial/runtime/ami-v561)
drydock/u14javall:v5.5.1  | May 2017  | [v5.5.1](/platform/tutorial/runtime/ami-v551)
drydock/u14javall:v5.4.1  | Apr 2017  | [v5.4.1](/platform/tutorial/runtime/ami-v541)
drydock/u14javall:v5.3.2  | Mar 2017  | [v5.3.2](/platform/tutorial/runtime/ami-v532)

## Further Reading
* [Everything about Shippable AMIs](/platform/tutorial/runtime/ami-overview)
* [Quick Start to CI](/getting-started/ci-sample)
* [Continuous Integration of a Java application](/ci/java-continuous-integration)
* [Checking which AMI is your Project using](/platform/visibility/subscription/nodes)
