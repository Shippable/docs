page_main_title: Cassandra Service Overview
main_section: Platform
sub_section: Job Runtime
sub_sub_section: Services
page_title: Cassandra Service Overview

# Cassandra Job Images

Cassandra is available as an [optional service](/ci/cassandra) that you can start as part of your CI process. All language images and all Operating Systems support this service

## Supported OS Versions
This service is installed on to the base OS image along with other services. The following are tags and release dates of the base OS Image

### Ubuntu 16.04

|Image| Release Date |Available in AMI | 
|----------|------------|-----|
[drydock/u16all:v5.7.3](/platform/runtime/os/ubuntu16#v573)  | Jul 2017 - Latest | [v5.7.3](/platform/tutorial/runtime/ami-v573)

### Ubuntu 14.04

|Image| Release Date |Available in AMI | 
|----------|------------|-----|
[drydock/u14all:v5.7.3](/platform/runtime/os/ubuntu14#v573)  | Jul 2017 - Latest | [v5.7.3](/platform/tutorial/runtime/ami-v573)

## Supported Languages
Since all [Language](/platform/runtime/language/overview) images are built from the the `all` versions of the OS as above, this service is also available if you use language specific images. Shippable platform automatically picks the latest language image based on your [CI YML settings](ci/set-language/), but if you need finer grain control, you can use the image tag sections of the YML.


## Supported Version Tags
The drydock docker image is tagged when the image is updated. These are the supported tags -

* [Clojure](/platform/runtime/language/clojure)
* [GO](/platform/runtime/language/go)
* [Java](/platform/runtime/language/java)
* [Node JS](/platform/runtime/language/nodejs)
* [PHP](/platform/runtime/language/php)
* [Python](/platform/runtime/language/python)
* [Ruby](/platform/runtime/language/ruby)
* [Scala](/platform/runtime/language/scala)

## Supported Versions
This table helps you choose the right tag for the language version that you are interested in and the
AMI that you should set for your subscription.

| Version  |  Tags    
|----------|---------
|1.6  | v5.7.3

## Further Reading
* [Everything about Shippable AMIs](/platform/tutorial/runtime/ami-overview)
* [Quick Start to CI](/getting-started/ci-sample)
* [CI YML](ci/yml-structure)

