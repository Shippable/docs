page_main_title: Cassandra Service Overview
main_section: Platform
sub_section: Runtime
sub_sub_section: Services
page_title: CI/CD with Cassandra Applications

# Cassandra
This section explains how Shippable DevOps Assembly Lines Platform behaves when you list `cassandra` in the `services:` tag in your [shippable.yml](/platform/tutorial/workflow/shippable-yml) for a [runCI job](/platform/workflow/job/runci).

```
services:
  - cassandra
```

All language images have this service pre-installed.

## Supported Versions
This table helps you choose the right image tag based on the version of the service you want to use.

The language image with a particular tag will be available on the edition of the [Runtime AMI](/platform/tutorial/runtime/ami-overview) with the same version number. If you specify an image tag that does not match the Runtime AMI, it will be used but will also increase your build time.

| Version  |  Tags    
|----------|---------
| 3.11.0   | v5.7.3 and above
| 3.9      | v5.6.1 and below

## Supported OS Versions
This service is installed in the Shippable base images along with other services. The following are tags and release dates of the each base image.

### Ubuntu 16.04

|Image| Release Date |Available in AMI |
|----------|------------|-----|
[drydock/u16all:v5.8.2](/platform/runtime/os/ubuntu16#v582)  | Aug 2017 - Latest | [v5.8.2](/platform/tutorial/runtime/ami-v582)
[drydock/u16all:v5.7.3](/platform/runtime/os/ubuntu16#v573)  | Jul 2017 | [v5.7.3](/platform/tutorial/runtime/ami-v573)
[drydock/u16all:v5.6.1](/platform/runtime/os/ubuntu16#v561)  | Jun 2017 | [v5.6.1](/platform/tutorial/runtime/ami-v561)
[drydock/u16all:v5.5.1](/platform/runtime/os/ubuntu16#v551)  | May 2017 | [v5.5.1](/platform/tutorial/runtime/ami-v551)
[drydock/u16all:v5.4.1](/platform/runtime/os/ubuntu16#v541)  | Apr 2017 | [v5.4.1](/platform/tutorial/runtime/ami-v541)
[drydock/u16all:v5.3.2](/platform/runtime/os/ubuntu16#v532)  | Mar 2017 | [v5.3.2](/platform/tutorial/runtime/ami-v532)


### Ubuntu 14.04

|Image| Release Date |Available in AMI |
|----------|------------|-----|
[drydock/u14all:v5.8.2](/platform/runtime/os/ubuntu14#v582)  | Aug 2017 - Latest | [v5.8.2](/platform/tutorial/runtime/ami-v582)
[drydock/u14all:v5.7.3](/platform/runtime/os/ubuntu14#v573)  | Jul 2017 | [v5.7.3](/platform/tutorial/runtime/ami-v573)
[drydock/u14all:v5.6.1](/platform/runtime/os/ubuntu14#v561)  | Jun 2017 | [v5.6.1](/platform/tutorial/runtime/ami-v561)
[drydock/u14all:v5.5.1](/platform/runtime/os/ubuntu14#v551)  | May 2017 | [v5.5.1](/platform/tutorial/runtime/ami-v551)
[drydock/u14all:v5.4.1](/platform/runtime/os/ubuntu14#v541)  | Apr 2017 | [v5.4.1](/platform/tutorial/runtime/ami-v541)
[drydock/u14all:v5.3.2](/platform/runtime/os/ubuntu14#v532)  | Mar 2017 | [v5.3.2](/platform/tutorial/runtime/ami-v532)

## Further Reading
* [Everything about Shippable AMIs](/platform/tutorial/runtime/ami-overview)
* [Quick Start to CI](/getting-started/ci-sample)
