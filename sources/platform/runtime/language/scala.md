page_main_title: Scala Language Overview
main_section: Platform
sub_section: Job Runtime
sub_sub_section: Languages
page_title: Scala Language Overview

# Scala Job Images

Job Images for Scala are available for multiple language / operating system versions. Each language-os combination
is published in Docker hub as an image with a specific tag. The Docker hub account where we publish these images is drydock.

If you specify the language and os in Shippable.yml, the platform automatically selects the right image for you. However,
you can also boot the job runtime with any image.

## Supported OS Versions
Language versions are available on the drydock links specified below for these OS versions.

|OS version| Docker image name | Tags |
|----------|------------|-----|
|Ubuntu 14.04|[drydock/u14scaall](https://hub.docker.com/r/drydock/u14scapall)|v5.7.3  v5.6.1  v5.5.1  v5.4.1  v5.3.2 |
|Ubuntu 16.04|[drydock/u16scaall](https://hub.docker.com/r/drydock/u16scaall)|v5.7.3  v5.6.1  v5.5.1  v5.4.1  v5.3.2 |
16.04|[Ubuntu 16.04](https://hub.docker.com/r/drydock/u16scaall)|

## Supported Language Versions
This table helps you choose the right tag for the language version that you are interested in and the
AMI that you should set for your subscription.

| Version  |  Tags    | Supported OS| Available AMIs|  
|----------|---------|-----------|---------------------|
|2.12.2  |   v5.7.3     | All | [v5.7.3](/platform/machine-image-v573)   |
|2.12.1  |   v5.6.1 and earlier    |  All | [v5.6.1](/platform/machine-image-v561) and earlier  |
|2.12.0  |   v5.5.1 and earlier    |  All | [v5.5.1](/platform/machine-image-v551) and earlier  |
|2.11.11 |   v5.7.3     | All | [v5.7.3](/platform/machine-image-v573)   |
|2.11.8  |   v5.6.1 and earlier    |  All | [v5.6.1](/platform/machine-image-v561) and earlier  |
|2.10.6  |   v5.7.3 and earlier    |  All | [v5.7.3](/platform/machine-image-v573) and earlier  |  
|2.9.3   |   v5.7.3 and earlier    |  All | [v5.7.3](/platform/machine-image-v573) and earlier  |  
