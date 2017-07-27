page_main_title: NodeJs Language Overview
main_section: Platform
sub_section: Job Runtime
sub_sub_section: Languages
page_title: NodeJs Language Overview

# NodeJs Job Images

Job Images for NodeJs are available for multiple language / operating system versions. Each language-os combination
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
|Ubuntu 14.04|[Ubuntu 14.04](https://hub.docker.com/r/drydock/u14nodall)|
|Ubuntu 16.04|[Ubuntu 16.04](https://hub.docker.com/r/drydock/u16nodall)|

## Supported Language Versions
This table helps you choose the right tag for the language version that you are interested in and the
AMI that you should set for your subscription.

| Version  |  Tags    | Supported OS| Available AMIs|  
|----------|---------|-----------|---------------------|
|8.1.4  |   v5.7.3     | All | [v5.7.3](/platform/machine-image-v573)   |
|7.10.1 |   v5.7.3    |  All | [v5.7.3](/platform/machine-image-v573)  |
|7.4.0  |  v5.6.1 and earlier | All | [v5.6.1](/platform/machine-image-v561) and earlier |
|7.3.0       |   v5.6.1 and earlier |  All | [v5.6.1](/platform/machine-image-v561) and earlier |
|7.2.1       |  v5.6.1 and earlier |  All | [v5.6.1](/platform/machine-image-v561) and earlier |
|7.0.0         |    v5.6.1 and earlier |  All | [v5.6.1](/platform/machine-image-v561) and earlier |  
|6.11.1        |   v5.7.3     | All | [v5.7.3](/platform/machine-image-v573)   |
|6.9.4          |  v5.6.1 and earlier |  All | [v5.6.1](/platform/machine-image-v561) and earlier |
|6.8.0          |  v5.6.1 and earlier |  All | [v5.6.1](/platform/machine-image-v561) and earlier |
|6.7.0          |  v5.6.1 and earlier |  All | [v5.6.1](/platform/machine-image-v561) and earlier |
|5.12.0          |  v5.6.1 and earlier |  All | [v5.6.1](/platform/machine-image-v561) and earlier |    
|4.8.4        |    v5.7.3     | All | [v5.7.3](/platform/machine-image-v573)   |
|4.6.0          |   v5.6.1 and earlier |  All | [v5.6.1](/platform/machine-image-v561) and earlier |
|4.2.3          |   v5.6.1 and earlier |  All | [v5.6.1](/platform/machine-image-v561) and earlier |  
|0.12          |  v5.6.1 and earlier |  All | [v5.6.1](/platform/machine-image-v561) and earlier |    
|0.10          |   v5.6.1 and earlier |  All | [v5.6.1](/platform/machine-image-v561) and earlier |  
|iojs 1.0  |  v5.6.1 and earlier |  All | [v5.6.1](/platform/machine-image-v561) and earlier |  
|iojs 2.0  |  v5.6.1 and earlier |  All | [v5.6.1](/platform/machine-image-v561) and earlier |    
|iojs 3.3.1  |  v5.6.1 and earlier |  All | [v5.6.1](/platform/machine-image-v561) and earlier |
