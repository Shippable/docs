page_main_title: RethinkDB Service Overview
main_section: Platform
sub_section: Job Runtime
sub_sub_section: Services
page_title: Service Overview

# RethinkDB Job Images

Job Images for RethinkDB are available for multiple operating systems, languages and versions. Each os-language-version combination is published in Docker hub as an image with a specific tag. The Docker hub account where we publish these images is drydock.

If you specify the version in Shippable.yml, the platform automatically selects the right image for you. However,
you can also script the install of any prior or later release of the service if you so desire.

## Supported Version Tags
The drydock docker image is tagged when the image is updated. These are the supported tags -

* v5.7.3                
* v5.6.1                
* v5.5.1                
* v5.4.1                
* v5.3.2   

## Supported OS-Language Versions
RethinkDB service is available on the drydock links specified below for these OS and language versions.

|Language| Ubuntu 14.04 Docker image name                    | Ubuntu 16.04 Docker image name                                    |
|--------------------|--------------------------------------------|------------------------------------------------------------|
|Nodejs|[drydock/u14nodall](https://hub.docker.com/r/drydock/u14nodall)| [drydock/u16nodall](https://hub.docker.com/r/drydock/u16nodall)|
|Python|[drydock/u14pytall](https://hub.docker.com/r/drydock/u14pytall)| [drydock/u16pytall](https://hub.docker.com/r/drydock/u16pytall)|
|Java|[drydock/u14pytall](https://hub.docker.com/r/drydock/u14javall)| [drydock/u16javall](https://hub.docker.com/r/drydock/u16javall)|
|Ruby|[drydock/u14ruball](https://hub.docker.com/r/drydock/u14ruball)| [drydock/u16ruball](https://hub.docker.com/r/drydock/u14ruball)|
|GO|[drydock/u14golall](https://hub.docker.com/r/drydock/u14golall)| [drydock/u16golall](https://hub.docker.com/r/drydock/u16golall)|
|Clojure|[drydock/u14cloall](https://hub.docker.com/r/drydock/u14cloall)| [drydock/u16cloall](https://hub.docker.com/r/drydock/u16cloall)|
|Scala|[drydock/u14scaall](https://hub.docker.com/r/drydock/u14scaall)| [drydock/u16scaall](https://hub.docker.com/r/drydock/u16scaall)|
|C/C++|[drydock/u14cppall](https://hub.docker.com/r/drydock/u14cppall)| [drydock/u16cppall](https://hub.docker.com/r/drydock/u16cppall)|

## Supported Versions
This table helps you choose the right tag for the language version that you are interested in and the
AMI that you should set for your subscription.

| Version  |  Tags    | Supported OS|
|----------|---------|-----------|
|2.3.5  | v5.7.3 | Ubuntu 14.04 and Ubuntu 16.04 |
|2.3  | v5.6.1 and earlier | Ubuntu 14.04 and Ubuntu 16.04 |
