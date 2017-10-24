page_main_title: Language versions on each image
main_section: Platform
sub_section: Runtime
sub_sub_section: Machine image
page_title: CI/CD for Clojure Applications

# Languages

The Shippable Platform provides images with multiple versions of commonly-used languages pre-installed. A default image will be selected based on the language specified in your [shippable.yml](/ci/yml-structure/) file when running a CI job, or you can [select a different image](/ci/build-image/) in the `pre_ci_boot` section of your `shippable.yml`.

Our language specific images that are updated monthly so that the latest and greatest versions are always available for you to test.  The sections below provide more information about which versions are available in each image.


## Clojure

The following images are available when you configure `language: clojure` in your [shippable.yml](/ci/yml-structure/) for a [runCI job](/platform/workflow/job/runci), we automatically use a default language image for your build. The specific language image chosen depends on the Machine Image selected for your subscription.

### Ubuntu 16.04

**Base image** [drydock/u16all](/platform/runtime/os/ubuntu16)

|Image| Release Date |AMI| Clojure versions  |
|----------|------------|-----|-----|
drydock/u16cloall:v5.8.2  | Aug 2017 - Latest Version | [v5.8.2](/platform/runtime/ci/ami-v582)  | 1.3.0, 1.4.0, <br>1.5.1, 1.6.0, 1.7.0, 1.8.0  |
drydock/u16cloall:v5.7.3  | Jul 2017  | [v5.7.3](/platform/runtime/ci/ami-v573)| 1.3.0, 1.4.0, <br>1.5.1, 1.6.0, 1.7.0, 1.8.0  |
drydock/u16cloall:v5.6.1  | Jun 2017  | [v5.6.1](/platform/runtime/ci/ami-v561)| 1.3.0, 1.4.0, 1.5.1, 1.6.0, 1.7.0, 1.8.0  |
drydock/u16cloall:v5.5.1  | May 2017  | [v5.5.1](/platform/runtime/ci/ami-v551)| 1.3.0, 1.4.0, 1.5.1, 1.6.0, 1.7.0, 1.8.0  |
drydock/u16cloall:v5.4.1  | Apr 2017  | [v5.4.1](/platform/runtime/ci/ami-v541)| 1.3.0, 1.4.0, 1.5.1, 1.6.0, 1.7.0, 1.8.0  |
drydock/u16cloall:v5.3.2  | Mar 2017  | [v5.3.2](/platform/runtime/ci/ami-v532)| 1.3.0, 1.4.0, 1.5.1, 1.6.0, 1.7.0, 1.8.0  |

### Ubuntu 14.04

**Base image** [drydock/u14all](/platform/runtime/os/ubuntu14)

|Image| Release Date |Available in AMI |Clojure versions  |
|----------|------------|-----|-----|
drydock/u14cloall:v5.8.2  | Aug 2017 - Latest Version | [v5.8.2](/platform/runtime/ci/ami-v582) | 1.3.0, 1.4.0, 1.5.1, 1.6.0, 1.7.0, 1.8.0  |
drydock/u14cloall:v5.7.3  | Jul 2017  | [v5.7.3](/platform/runtime/ci/ami-v573) | 1.3.0, 1.4.0, 1.5.1, 1.6.0, 1.7.0, 1.8.0  |
drydock/u14cloall:v5.6.1  | Jun 2017  | [v5.6.1](/platform/runtime/ci/ami-v561) | 1.3.0, 1.4.0, 1.5.1, 1.6.0, 1.7.0, 1.8.0  |
drydock/u14cloall:v5.5.1  | May 2017  | [v5.5.1](/platform/runtime/ci/ami-v551)| 1.3.0, 1.4.0, 1.5.1, 1.6.0, 1.7.0, 1.8.0  |
drydock/u14cloall:v5.4.1  | Apr 2017  | [v5.4.1](/platform/runtime/ci/ami-v541)| 1.3.0, 1.4.0, 1.5.1, 1.6.0, 1.7.0, 1.8.0  |
drydock/u14cloall:v5.3.2  | Mar 2017  | [v5.3.2](/platform/runtime/ci/ami-v532)| 1.3.0, 1.4.0, 1.5.1, 1.6.0, 1.7.0, 1.8.0  |

## C/C++
This section explains how Shippable DevOps Assembly Lines Platform behaves when you set `language: c` in your [shippable.yml](/ci/yml-structure/) for a [runCI job](/platform/workflow/job/runci).

Each of the language images is built from the respective base OS version of the image. Since we install all of the packages, CLIs, and services on the base images, these language images get them automatically. Please click on the base image below to find out what's pre-installed as part of the base image.

### Ubuntu 16.04

**Base image** [drydock/u16all](/platform/runtime/os/ubuntu16)

|Image| Release Date |Available in AMI | Compiler versions |
|----------|------------|-----|-----|
drydock/u16cppall:v5.8.2  | Aug 2017 - Latest Version | [v5.8.2](/platform/tutorial/runtime/ami-v582)| clang 4.0.0, gcc 7.1 |
drydock/u16cppall:v5.7.3  | Jul 2017  | [v5.7.3](/platform/tutorial/runtime/ami-v573)| clang 4.0.0, gcc 7.1 |
drydock/u16cppall:v5.6.1  | Jun 2017  | [v5.6.1](/platform/tutorial/runtime/ami-v561)| clang 3.9.0, gcc 6 |
drydock/u16cppall:v5.5.1  | May 2017  | [v5.5.1](/platform/tutorial/runtime/ami-v551)| clang 3.9.0, gcc 6 |
drydock/u16cppall:v5.4.1  | Apr 2017  | [v5.4.1](/platform/tutorial/runtime/ami-v541)| clang 3.9.0, gcc 6 |
drydock/u16cppall:v5.3.2  | Mar 2017  | [v5.3.2](/platform/tutorial/runtime/ami-v532)| clang 3.9.0, gcc 6 |

### Ubuntu 14.04

**Base image** [drydock/u14all](/platform/runtime/os/ubuntu14)

|Image| Release Date |Available in AMI |Compiler versions |
|----------|------------|-----|-----|
drydock/u14cppall:v5.8.2  | Aug 2017 - Latest Version | [v5.8.2](/platform/tutorial/runtime/ami-v582)| clang 4.0.0, gcc 7.1 |
drydock/u14cppall:v5.7.3  | Jul 2017  | [v5.7.3](/platform/tutorial/runtime/ami-v573)| clang 4.0.0, gcc 7.1 |
drydock/u14cppall:v5.6.1  | Jun 2017  | [v5.6.1](/platform/tutorial/runtime/ami-v561)| clang 3.9.0, gcc 6 |
drydock/u14cppall:v5.5.1  | May 2017  | [v5.5.1](/platform/tutorial/runtime/ami-v551)| clang 3.9.0, gcc 6 |
drydock/u14cppall:v5.4.1  | Apr 2017  | [v5.4.1](/platform/tutorial/runtime/ami-v541)| clang 3.9.0, gcc 6 |
drydock/u14cppall:v5.3.2  | Mar 2017  | [v5.3.2](/platform/tutorial/runtime/ami-v532)| clang 3.9.0, gcc 6 |
