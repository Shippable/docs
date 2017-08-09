page_main_title: Scala Language Overview
main_section: Platform
sub_section: Runtime
sub_sub_section: Languages
page_title: CI/CD for Scala Applications

# Scala Job Images
This section explain how Shippable DevOps Assembly Lines Platform behaves when you set `language: scala` in your [shippable.yml](/platform/tutorial/workflow/shippable-yml) for a [runCI Job](/platform/workflow/job/runci), 

```
language: scala
scala:
  - 2.12.2
```

We use Ubuntu 14.0 version of the language image by default, the latest that was available when your project was enabled. You can override this by using `pre_ci_boot` section or even [build your own image](/ci/custom-docker-image) from scratch.

<a name="versions"></a>
## Versions
This table helps you choose the right tag for the language version that your app needs and it is set in the YML. 

The tags denote which `edition` of the [Runtime AMI](/platform/tutorial/runtime/ami-overview) has that particular version installed. Any tag can be used on any , but each edition of the AMI has that edition cached which will improve your build speed

| Version  |  Tags    | Supported OS
|----------|---------|-----------
|2.12.2  |   v5.7.3     | All 
|2.12.1  |   v5.6.1 and earlier    |  All 
|2.12.0  |   v5.5.1 and earlier    |  All 
|2.11.11 |   v5.7.3     | All 
|2.11.8  |   v5.6.1 and earlier    |  All 
|2.10.6  |   v5.7.3 and earlier    |  All 
|2.9.3   |   v5.7.3 and earlier    |  All 

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
    - sbt ++$SHIPPABLE_SCALA_VERSION test
```

## Shippable provided Runtime images
Each of the language image is built from the respective base OS version of the image. Since we install all the all the packages, CLIs & services installed on the base image, these language images get this automatically. For more information visit the respective base image page.

### Ubuntu 16.04

**Built from** [drydock/u16javall](/platform/runtime/language/java)

|Image| Release Date |Available in AMI | 
|----------|------------|-----|
drydock/u16scaall:v5.7.3  | Jul 2017 - Latest Version | [v5.7.3](/platform/tutorial/runtime/ami-v573)
drydock/u16scaall:v5.6.1  | Jun 2017  | [v5.6.1](/platform/tutorial/runtime/ami-v561)
drydock/u16scaall:v5.5.1  | May 2017  | [v5.5.1](/platform/tutorial/runtime/ami-v551)
drydock/u16scaall:v5.4.1  | Apr 2017  | [v5.4.1](/platform/tutorial/runtime/ami-v541)
drydock/u16scaall:v5.3.2  | Mar 2017  | [v5.3.2](/platform/tutorial/runtime/ami-v532)

### Ubuntu 14.04

**Built from** [drydock/u14javall](/platform/runtime/language/java)

|Image| Release Date |Available in AMI | 
|----------|------------|-----|
drydock/u14scaall:v5.7.3  | Jul 2017 - Latest Version | [v5.7.3](/platform/tutorial/runtime/ami-v573)
drydock/u14scaall:v5.6.1  | Jun 2017  | [v5.6.1](/platform/tutorial/runtime/ami-v561)
drydock/u14scaall:v5.5.1  | May 2017  | [v5.5.1](/platform/tutorial/runtime/ami-v551)
drydock/u14scaall:v5.4.1  | Apr 2017  | [v5.4.1](/platform/tutorial/runtime/ami-v541)
drydock/u14scaall:v5.3.2  | Mar 2017  | [v5.3.2](/platform/tutorial/runtime/ami-v532)


## Further Reading
* [Everything about Shippable AMIs](/platform/tutorial/runtime/ami-overview)
* [Quick Start to CI](/getting-started/ci-sample)
* [Continuous Integration of a Scala application](/ci/scala-continuous-integration)
* [Checking which AMI is your Project using](/platform/visibility/subscription/nodes)


