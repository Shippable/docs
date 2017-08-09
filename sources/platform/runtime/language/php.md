page_main_title: PHP Language Overview
main_section: Platform
sub_section: Runtime
sub_sub_section: Languages
page_title: CI/CD for PHP Applications

# PHP
This section explain how Shippable DevOps Assembly Lines Platform behaves when you set `language: php` in your [shippable.yml](/platform/tutorial/workflow/shippable-yml) for a [runCI Job](/platform/workflow/job/runci), 

```
language: php
php:
  - 7.1
```

We use Ubuntu 14.0 version of the language image by default, the latest that was available when your project was enabled. You can override this by using `pre_ci_boot` section or even [build your own image](/ci/custom-docker-image) from scratch.

<a name="versions"></a>
## Versions
This table helps you choose the right tag for the language version that your app needs and it is set in the YML. 

The tags denote which `edition` of the [Runtime AMI](/platform/tutorial/runtime/ami-overview) has that particular version installed. Any tag can be used on any , but each edition of the AMI has that edition cached which will improve your build speed

| Version  |  Tags    | Supported OS
|----------|---------|-----------
|7.1.7     |   v5.8.2     | All 
|7.1.6     |   v5.7.3     | All 
|7.1       |   v5.6.1 and earlier    |  All 
|7.0.22  |  v5.8.2      | All 
|7.0.20  |  v5.7.3      | All 
|7.0       |   v5.6.1 and earlier    |  All 
|5.6.31  |  v5.8.2      | All 
|5.6.30  |  v5.7.3      | All 
|5.6       |    v5.6.1 and earlier   |  All

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
    - phpunit
```

## Shippable provided Runtime images
Each of the language image is built from the respective base OS version of the image. Since we install all the all the packages, CLIs & services installed on the base image, these language images get this automatically. For more information visit the respective base image page.

### Ubuntu 16.04

**Built from** [drydock/u16all](/platform/runtime/os/ubuntu16)

|Image| Release Date |Available in AMI | 
|----------|------------|-----|
drydock/u16phpall:v5.8.2  | Aug 2017 - Latest Version | [v5.8.2](/platform/tutorial/runtime/ami-v582)
drydock/u16phpall:v5.7.3  | Jul 2017  | [v5.7.3](/platform/tutorial/runtime/ami-v573)
drydock/u16phpall:v5.6.1  | Jun 2017  | [v5.6.1](/platform/tutorial/runtime/ami-v561)
drydock/u16phpall:v5.5.1  | May 2017  | [v5.5.1](/platform/tutorial/runtime/ami-v551)
drydock/u16phpall:v5.4.1  | Apr 2017  | [v5.4.1](/platform/tutorial/runtime/ami-v541)
drydock/u16phpall:v5.3.2  | Mar 2017  | [v5.3.2](/platform/tutorial/runtime/ami-v532)

### Ubuntu 14.04

**Built from** [drydock/u14all](/platform/runtime/os/ubuntu14)

|Image| Release Date |Available in AMI | 
|----------|------------|-----|
drydock/u14phpall:v5.8.2  | Aug 2017 - Latest Version | [v5.8.2](/platform/tutorial/runtime/ami-v582)
drydock/u14phpall:v5.7.3  | Jul 2017  | [v5.7.3](/platform/tutorial/runtime/ami-v573)
drydock/u14phpall:v5.6.1  | Jun 2017  | [v5.6.1](/platform/tutorial/runtime/ami-v561)
drydock/u14phpall:v5.5.1  | May 2017  | [v5.5.1](/platform/tutorial/runtime/ami-v551)
drydock/u14phpall:v5.4.1  | Apr 2017  | [v5.4.1](/platform/tutorial/runtime/ami-v541)
drydock/u14phpall:v5.3.2  | Mar 2017  | [v5.3.2](/platform/tutorial/runtime/ami-v532)


## Further Reading
* [Everything about Shippable AMIs](/platform/tutorial/runtime/ami-overview)
* [Quick Start to CI](/getting-started/ci-sample)
* [Continuous Integration of a PHP application](/ci/php-continuous-integration)
* [Checking which AMI is your Project using](/platform/visibility/subscription/nodes)