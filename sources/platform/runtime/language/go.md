page_main_title: Go Language Overview
main_section: Platform
sub_section: Runtime
sub_sub_section: Languages
page_title: Go Language Overview

# GO Job Images

This image is used for GO code repos. It comes pre-installed with multiple versions and we set the environment automatically depending your [CI YML settings](ci/set-language/). 

We use Ubuntu 14.0 version of the language image by default, the latest that was available when your project was enabled. You can override this or even [build](/ci/custom-docker-image) your own from scratch for your [runCI](/platform/workflow/job/runci) Jobs.

## Supported OS Versions
Each of the language image is built from the respective base OS version of the image. Since we install all the all the packages, CLIs & services installed on the base image, these language images get this automatically. For more information visit the respective base image page.

### Ubuntu 16.04

**Built from** [drydock/u16all](/platform/runtime/os/ubuntu16)

|Image| Release Date |Available in AMI | 
|----------|------------|-----|
drydock/u16golall:v5.7.3  | Jul 2017 - Latest Version | [v5.7.3](/platform/tutorial/runtime/ami-v573)
drydock/u16golall:v5.6.1  | Jun 2017  | [v5.6.1](/platform/tutorial/runtime/ami-v561)
drydock/u16golall:v5.5.1  | May 2017  | [v5.5.1](/platform/tutorial/runtime/ami-v551)
drydock/u16golall:v5.4.1  | Apr 2017  | [v5.4.1](/platform/tutorial/runtime/ami-v541)
drydock/u16golall:v5.3.2  | Mar 2017  | [v5.3.2](/platform/tutorial/runtime/ami-v532)

### Ubuntu 14.04

**Built from** [drydock/u14all](/platform/runtime/os/ubuntu14)

|Image| Release Date |Available in AMI | 
|----------|------------|-----|
drydock/u14golall:v5.7.3  | Jul 2017 - Latest Version | [v5.7.3](/platform/tutorial/runtime/ami-v573)
drydock/u14golall:v5.6.1  | Jun 2017  | [v5.6.1](/platform/tutorial/runtime/ami-v561)
drydock/u14golall:v5.5.1  | May 2017  | [v5.5.1](/platform/tutorial/runtime/ami-v551)
drydock/u14golall:v5.4.1  | Apr 2017  | [v5.4.1](/platform/tutorial/runtime/ami-v541)
drydock/u14golall:v5.3.2  | Mar 2017  | [v5.3.2](/platform/tutorial/runtime/ami-v532)

## Supported Language Versions
This table helps you choose the right tag for the language version that you are interested

| Version  |  Tags    | Supported OS
|----------|---------|-----------
|1.8.3   |   v5.7.3     | All 
|1.7.6   |   v5.7.3    |  All 
|1.7.5   |  v5.6.1 and earlier |  All 
|1.7     |  v5.6.1 and earlier |  All 
|1.6.4   |  v5.6.1 and earlier |  All 
|1.6     |  v5.6.1 and earlier |  All 
|1.5.4   |  v5.6.1 and earlier |  All 
|1.5     |  v5.6.1 and earlier |  All 
|1.4     |  v5.6.1 and earlier |  All 
|1.3     |  v5.6.1 and earlier |  All 
|1.2     |  v5.6.1 and earlier |  All 
|1.1     |  v5.6.1 and earlier |  All 

## Further Reading
* [Everything about Shippable AMIs](/platform/tutorial/runtime/ami-overview)
* [Quick Start to CI](/getting-started/ci-sample)
* [CI YML](ci/yml-structure)