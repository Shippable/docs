page_main_title: Language Overview
main_section: Platform
sub_section: Job Runtime
sub_sub_section: Languages
page_title: Language Overview

# C/C++ Job Images

Job Images for C/C++ are available for multiple language / operating system versions. Each language-os combination
is published in Docker hub as an image with a specific tag. The Docker hub account where we publish these images is drydock.

If you specify the language and os in Shippable.yml, the platform automatically selects the right image for you. However,
you can also boot the job runtime with any image.

## Supported Version Tags
The drydock docker image is tagged when the image is updated. These are the supported tags -

* v5.7.3                
* v5.6.1                
* v5.5.1                
* v5.4.1                
* v5.3.2                

## Supported OS Versions
Language versions are available on the drydock links specified below for these OS versions.

|OS version| Docker image |
|--------------------|-----------------------|
|Ubuntu 14.04|[Ubuntu 14.04](https://hub.docker.com/r/drydock/u14cppall)|
|Ubuntu 16.04|[Ubuntu 16.04](https://hub.docker.com/r/drydock/u16cppall)|

## Supported Language Versions
This table helps you choose the right tag for the language version that you are interested in and the
AMI that you should set for your subscription.

| Version  |  Tags    | Supported OS| Available AMIs|  
|----------|---------|-----------|---------------------|
|gcc 7.1 |   v5.7.3     | All | [v5.7.3](/platform/machine-image-v573)   |
|gcc 6   |  v5.6.1 and earlier | All | [v5.6.1](/platform/machine-image-v561) and earlier |
|clang 4.0.0 |   v5.7.3     | All | [v5.7.3](/platform/machine-image-v573)   |
|clang 3.9.0 |   v5.6.1 and earlier |  All | [v5.6.1](/platform/machine-image-v561) and earlier |
