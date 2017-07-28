page_main_title: Cassandra Service Overview
main_section: Platform
sub_section: Job Runtime
sub_sub_section: Services
page_title: Cassandra Service Overview

# Cassandra Job Images

Job Images for Cassandra are available for multiple operating systems, languages and versions. Each os-language-version combination is published in Docker hub as an image with a specific tag. The Docker hub account where we publish these images is drydock.

If you specify the version in Shippable.yml, the platform automatically selects the right image for you. However,
you can also script the install of any prior or later release of the service if you so desire.

## Supported Version Tags
The drydock docker image is tagged when the image is updated. These are the supported tags -

* v5.7.3                

## Supported OS-Language Versions
Cassandra service is available on the drydock links specified below for these OS and language versions.

|Language| Ubuntu 14.04 Docker image name                    | Ubuntu 16.04 Docker image name                                    |
|--------------------|--------------------------------------------|------------------------------------------------------------|
|Nodejs|[Ubuntu 14.04](https://hub.docker.com/r/drydock/u14nodall)| [Ubuntu 16.04](https://hub.docker.com/r/drydock/u16nodall)|
|Python|[Ubuntu 14.04](https://hub.docker.com/r/drydock/u14pytall)| [Ubuntu 16.04](https://hub.docker.com/r/drydock/u16pytall)|
|Java|[Ubuntu 14.04](https://hub.docker.com/r/drydock/u14javall)| [Ubuntu 16.04](https://hub.docker.com/r/drydock/u16javall)|
|Ruby|[Ubuntu 14.04](https://hub.docker.com/r/drydock/u14ruball)| [Ubuntu 16.04](https://hub.docker.com/r/drydock/u14ruball)|
|GO|[Ubuntu 14.04](https://hub.docker.com/r/drydock/u14golall)| [Ubuntu 16.04](https://hub.docker.com/r/drydock/u16golall)|
|Clojure|[Ubuntu 14.04](https://hub.docker.com/r/drydock/u14cloall)| [Ubuntu 16.04](https://hub.docker.com/r/drydock/u16cloall)|
|Scala|[Ubuntu 14.04](https://hub.docker.com/r/drydock/u14scaall)| [Ubuntu 16.04](https://hub.docker.com/r/drydock/u16scaall)|
|C/C++|[Ubuntu 14.04](https://hub.docker.com/r/drydock/u14cppall)| [Ubuntu 16.04](https://hub.docker.com/r/drydock/u16cppall)|

## Supported Versions
This table helps you choose the right tag for the language version that you are interested in and the
AMI that you should set for your subscription.

| Version  |  Tags    | Supported OS| AvaAvailable AMIs|  
|----------|---------|-----------|---------------------|
|3.11  | v5.7.3 | All | [v5.7.3](/platform/machine-image-v573) |
