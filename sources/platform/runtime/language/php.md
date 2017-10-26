page_main_title: PHP Language Overview
main_section: Platform
sub_section: Runtime
sub_sub_section: Languages
page_title: CI/CD for PHP Applications

# PHP
This section explains how Shippable DevOps Assembly Lines Platform behaves when you set `language: php` in your [shippable.yml](/platform/tutorial/workflow/shippable-yml) for a [runCI job](/platform/workflow/job/runci),

```
language: php
php:
  - 7.1
```

The default version of the language image depends on the [machine image](/platform/tutorial/runtime/ami-overview/) selected for the subscription. You can override this by using the `pre_ci_boot` section or even [build your own image](/ci/custom-docker-image) from scratch.

<a name="versions"></a>
## Versions
This table helps you choose the right language version tag to set in your `shippable.yml` for your app. If you don't provide a `php` tag in your YML, the default version will be used.

Any PHP version tag can be used on any image, but using an image that has the required version cached which will improve your build speed. The language image with a particular tag will be available on the edition of the [Runtime AMI](/platform/tutorial/runtime/ami-overview) with the same version number. If you specify an image tag that does not match the Runtime AMI, it will be used but will also increase your build time.


| PHP Version | Language Image Tags | Supported OS
|-------------|---------------------|-----------
|7.1.9        |  v5.8.2             | All
|7.1.7        |  v5.8.2             | All
|7.1.6        |  v5.7.3             | All
|7.1          |  v5.6.1 and earlier | All
|7.0.23       |  v5.10.4            | All
|7.0.22       |  v5.8.2             | All
|7.0.20       |  v5.7.3             | All
|7.0          |  v5.6.1 and earlier | All
|5.6.31       |  v5.8.2             | All
|5.6.30       |  v5.7.3             | All
|5.6          |  v5.6.1 and earlier | All

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
    - phpunit
```

## Shippable provided Runtime images
Each of the language images is built from the respective base OS version of the image. Since we install all of the packages, CLIs, and services on the base images, these language images get them automatically. For more information visit the respective base image pages.

### Ubuntu 16.04

**Built from** [drydock/u16all](/platform/runtime/os/ubuntu16)

|Image| Release Date |Available in AMI |
|----------|------------|-----|
drydock/u16phpall:v5.10.4  | Oct 2017 - Latest Version | [v5.10.4](/platform/tutorial/runtime/ami-v5104)
drydock/u16phpall:v5.8.2  | Aug 2017  | [v5.8.2](/platform/tutorial/runtime/ami-v582)
drydock/u16phpall:v5.7.3  | Jul 2017  | [v5.7.3](/platform/tutorial/runtime/ami-v573)
drydock/u16phpall:v5.6.1  | Jun 2017  | [v5.6.1](/platform/tutorial/runtime/ami-v561)
drydock/u16phpall:v5.5.1  | May 2017  | [v5.5.1](/platform/tutorial/runtime/ami-v551)
drydock/u16phpall:v5.4.1  | Apr 2017  | [v5.4.1](/platform/tutorial/runtime/ami-v541)
drydock/u16phpall:v5.3.2  | Mar 2017  | [v5.3.2](/platform/tutorial/runtime/ami-v532)

### Ubuntu 14.04

**Built from** [drydock/u14all](/platform/runtime/os/ubuntu14)

|Image| Release Date |Available in AMI |
|----------|------------|-----|
drydock/u14phpall:v5.10.4  | Oct 2017 - Latest Version | [v5.10.4](/platform/tutorial/runtime/ami-v5104)
drydock/u14phpall:v5.8.2  | Aug 2017  | [v5.8.2](/platform/tutorial/runtime/ami-v582)
drydock/u14phpall:v5.7.3  | Jul 2017  | [v5.7.3](/platform/tutorial/runtime/ami-v573)
drydock/u14phpall:v5.6.1  | Jun 2017  | [v5.6.1](/platform/tutorial/runtime/ami-v561)
drydock/u14phpall:v5.5.1  | May 2017  | [v5.5.1](/platform/tutorial/runtime/ami-v551)
drydock/u14phpall:v5.4.1  | Apr 2017  | [v5.4.1](/platform/tutorial/runtime/ami-v541)
drydock/u14phpall:v5.3.2  | Mar 2017  | [v5.3.2](/platform/tutorial/runtime/ami-v532)


## Further Reading
* [Everything about Shippable AMIs](/platform/tutorial/runtime/ami-overview)
* [Quick Start to CI](/getting-started/ci-sample)
* [Continuous Integration of a PHP application](/ci/php-continuous-integration)
* [How to check which AMI your project is using](/platform/tutorial/runtime/ami-overview/#viewing-subscription-machine-image)
