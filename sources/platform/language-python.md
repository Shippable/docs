page_main_title: Python Language Overview
main_section: Platform
sub_section: Job Runtime
sub_sub_section: Languages
page_title: Python Language Overview

# Python Job Images

Job Images for python are available for multiple language / operating system versions. Each language-os combination
is published in Docker hub as an image with a specific tag. The Docker hub account where we publish these images is drydock.

If you specify the language and os in Shippable.yml, the platform automatically selects the right image for you. However,
you can also boot the job runtime with any image.

## Supported OS Versions
Language versions are available on the drydock links specified below for these OS versions.

|OS version| Docker image name | Tags |
|----------|------------|-----|
|Ubuntu 14.04|[drydock/u14pytall](https://hub.docker.com/r/drydock/u14pytpall)|v5.7.3  v5.6.1  v5.5.1  v5.4.1  v5.3.2 |
|Ubuntu 16.04|[drydock/u16pytall](https://hub.docker.com/r/drydock/u16pytall)|v5.7.3  v5.6.1  v5.5.1  v5.4.1  v5.3.2 |

## Supported Language Versions
This table helps you choose the right tag for the language version that you are interested in and the
AMI that you should set for your subscription.

| Version     |           Tags         | Supported OS |                    Available AMIs                  |
|-------------|------------------------|--------------|----------------------------------------------------|
|3.6.1        |   v5.7.3               | All          | [v5.7.3](/platform/machine-image-v573)             |
|3.6.0        |   v5.5.1 and earlier   | All          | [v5.5.1](/platform/machine-image-v551) and earlier |
|3.5.3        |   v5.7.3               | ubuntu 14.04 | [v5.7.3](/platform/machine-image-v573)             |
|3.5.2        |   v5.5.1 and earlier   | All          | [v5.5.1](/platform/machine-image-v551) and earlier |
|3.4.5        |   v5.7.3 and earlier   | ubuntu 16.04 | [v5.7.3](/platform/machine-image-v573) and earlier |
|3.4.3        |   v5.7.3 and earlier   | ubuntu 14.04 | [v5.7.3](/platform/machine-image-v573) and earlier |
|3.3.6        |   v5.7.3 and earlier   | All          | [v5.7.3](/platform/machine-image-v573)             |
|3.2.6        |   v5.6.1 and earlier   | All          | [v5.6.1](/platform/machine-image-v561) and earlier |
|2.7.12       |   v5.7.3               | All          | [v5.7.3](/platform/machine-image-v573)             |
|2.7.6        |   v5.6.1 and earlier   | ubuntu 14.04 | [v5.6.1](/platform/machine-image-v561) and earlier |
|2.6.9        |   v5.6.1 and earlier   | All          | [v5.6.1](/platform/machine-image-v561) and earlier |
|pypy2-v5.8.0 |   v5.7.3               | All          | [v5.7.3](/platform/machine-image-v573)             |
|pypy3-v5.8.0 |   v5.7.3               | All          | [v5.7.3](/platform/machine-image-v573)             |
|pypy2-v4.0.1 |   v5.6.1 and earlier   | All          | [v5.6.1](/platform/machine-image-v561) and earlier |
|pypy3-v2.4.0 |   v5.6.1 and earlier   | All          | [v5.6.1](/platform/machine-image-v561) and earlier |
