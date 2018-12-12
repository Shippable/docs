page_main_title: Language versions on each image
main_section: Platform
sub_section: Runtime
sub_sub_section: Machine image
page_title: Popular language versions and the machine images where they are installed
page_description: Popular language versions and the machine images where they are installed in Shippable

# Languages

The Shippable Platform provides images with multiple versions of commonly-used languages pre-installed. A default image will be selected based on the language specified in your [shippable.yml](/ci/yml-structure/) file when running a CI job, or you can [select a different image](/ci/build-image/) in the `pre_ci_boot` section of your **shippable.yml**.

Our language specific images that are updated monthly so that the latest and greatest versions are always available for you to test.  The sections below provide more information about which versions are available in each image.

## ASP.Net

The following images are available when you configure `language: ASP.Net` in your [shippable.yml](/ci/yml-structure/) for a [runCI job](/platform/workflow/job/runci), we automatically use a default language image for your build. The specific language image chosen depends on the Machine Image selected for your subscription.

* Windows server 2016: w16aspnetcore
	* [Docker Hub](https://hub.docker.com/r/drydock/w16aspnetcore/)
	* [Github](https://github.com/dry-dock/w16aspnetcore)

| ASP.Net version |   OS  |  Machine Image |
|----------------|----------------|-----------
|2.1.4         |  Windows server 2016 | [v6.9.4](/platform/runtime/machine-image/ami-v694/) |
|2.1.3         |  Windows server 2016 | [v6.8.4](/platform/runtime/machine-image/ami-v684/) |
|2.1.2         |  Windows server 2016 | [v6.7.4](/platform/runtime/machine-image/ami-v674/) |
|2.0.7         |  Windows server 2016 | [v6.5.4](/platform/runtime/machine-image/ami-v654/) and [v6.6.4](/platform/runtime/machine-image/ami-v664/) |
|2.0.6         |  Windows server 2016 | [v6.4.4](/platform/runtime/machine-image/ami-v644/) |
|2.0.5         |  Windows server 2016 | [v6.3.4](/platform/runtime/machine-image/ami-v634/) |

## Clojure

The following images are available when you configure `language: clojure` in your [shippable.yml](/ci/yml-structure/) for a [runCI job](/platform/workflow/job/runci), we automatically use a default language image for your build. The specific language image chosen depends on the Machine Image selected for your subscription.

* Ubuntu 14.04: u14cloall
	* [Docker Hub](https://hub.docker.com/r/drydock/u14cloall/)
	* [Github](https://github.com/dry-dock/u14cloall)
* Ubuntu 16.04: u14cloall
	* [Docker Hub](https://hub.docker.com/r/drydock/u16cloall/)
	* [Github](https://github.com/dry-dock/u16cloall)
* CentOS 7: c7cloall
	* [Docker Hub](https://hub.docker.com/r/drydock/c7cloall/)
	* [Github](https://github.com/dry-dock/c7cloall)

The following versions are supported in each Machine Image:

| Version  | OS | Machine Image |
|------------------|-----------|-----------|
|1.9.0  | - CentOS 7<br>- Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.12.4](/platform/runtime/machine-image/ami-v6124/)<br> [v6.1.4](/platform/runtime/machine-image/ami-v614/) and later <br> [v6.1.4](/platform/runtime/machine-image/ami-v614/) and later |
|1.8.0  | - Ubuntu 14.04<br>- Ubuntu 16.04 |  [v5.3.2](/platform/runtime/machine-image/ami-v532/) to [v6.6.4](/platform/runtime/machine-image/ami-v664/) |
|1.7.0  | - Ubuntu 14.04<br>- Ubuntu 16.04 |  [v5.3.2](/platform/runtime/machine-image/ami-v532/) to [v6.6.4](/platform/runtime/machine-image/ami-v664/) |
|1.6.0  | - Ubuntu 14.04<br>- Ubuntu 16.04 |  [v5.3.2](/platform/runtime/machine-image/ami-v532/) to [v6.6.4](/platform/runtime/machine-image/ami-v664/) |
|1.5.1  | - Ubuntu 14.04<br>- Ubuntu 16.04 |  [v5.3.2](/platform/runtime/machine-image/ami-v532/) to [v6.6.4](/platform/runtime/machine-image/ami-v664/) |
|1.4.0  | - Ubuntu 14.04<br>- Ubuntu 16.04 |  [v5.3.2](/platform/runtime/machine-image/ami-v532/) to [v6.6.4](/platform/runtime/machine-image/ami-v664/) |
|1.3.0  | - Ubuntu 14.04<br>- Ubuntu 16.04 |  [v5.3.2](/platform/runtime/machine-image/ami-v532/) to [v6.6.4](/platform/runtime/machine-image/ami-v664/) |

## C/C++
This section explains how Shippable DevOps Assembly Lines Platform behaves when you set `language: c` in your [shippable.yml](/ci/yml-structure/) for a [runCI job](/platform/workflow/job/runci).

Each of the language images is built from the respective base OS version of the image. Since we install all of the packages, CLIs, and services on the base images, these language images get them automatically. Please click on the base image below to find out what's pre-installed as part of the base image.

* Ubuntu 14.04: u14cppall
	* [Docker Hub](https://hub.docker.com/r/drydock/u14cppall/)
	* [Github](https://github.com/dry-dock/u14cppall)
* Ubuntu 16.04: u16cppall
	* [Docker Hub](https://hub.docker.com/r/drydock/u16cppall/)
	* [Github](https://github.com/dry-dock/u16cppall)
* Ubuntu 16.04(aarch64): u16cppall
	* [Docker Hub](https://hub.docker.com/r/drydockaarch64/u16cpp/)
	* [Github](https://github.com/dry-dock/aarch64_u16cppall)
* CentOS 7: c7cppall
	* [Docker Hub](https://hub.docker.com/r/drydock/c7cppall/)
	* [Github](https://github.com/dry-dock/c7cppall)

## gcc
| Compiler Version | OS     |Machine Image |
|------------------|-----------|-----------
|gcc 8.1.0         | - Ubuntu 14.04<br>- Ubuntu 16.04<br>- Ubuntu 16.04(aarch64) | [v6.5.4](/platform/runtime/machine-image/ami-v654/) to [v6.12.4](/platform/runtime/machine-image/ami-v6124/)
|gcc 7.3.1		 | - CentOS 7 | [v6.7.4](/platform/runtime/machine-image/ami-v674/) to [v6.12.4](/platform/runtime/machine-image/ami-v6124/)
|gcc 7.3		   | - Ubuntu 14.04<br>- Ubuntu 16.04<br>- Ubuntu 16.04(aarch64)<br>- CentOS 7| [v6.4.4](/platform/runtime/machine-image/ami-v644/)<br>[v6.4.4](/platform/runtime/machine-image/ami-v644/)<br>[v6.4.4](/platform/runtime/machine-image/ami-v644/)<br>[v6.6.4](/platform/runtime/machine-image/ami-v664/)|
|gcc 7.2           | - Ubuntu 14.04<br>- Ubuntu 16.04<br>- Ubuntu 16.04(aarch64)<br>- CentOS 7 | [v5.10.4](/platform/runtime/machine-image/ami-v5104/) to [v6.3.4](/platform/runtime/machine-image/ami-v634/)<br> [v5.10.4](/platform/runtime/machine-image/ami-v5104/) to [v6.3.4](/platform/runtime/machine-image/ami-v634/)<br> [v6.2.4](/platform/runtime/machine-image/ami-v624/) to [v6.3.4](/platform/runtime/machine-image/ami-v634/)<br> [v6.2.4](/platform/runtime/machine-image/ami-v624/) to [v6.5.4](/platform/runtime/machine-image/ami-v654/)|
|gcc 7.1           |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.7.3](/platform/runtime/machine-image/ami-v573/) to [v5.8.2](/platform/runtime/machine-image/ami-v582/) |
|gcc 6             |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier |

## clang

| Compiler Version | OS     |Machine Image |
|------------------|-----------|-----------
|clang 7.0.0       |- Ubuntu 14.04 <br>- Ubuntu 16.04 <br>- Ubuntu 16.04(aarch64) | [v6.10.4](/platform/runtime/machine-image/ami-v6104/) and [v6.12.4](/platform/runtime/machine-image/ami-v6124/) |
|clang 6.0.1       |- Ubuntu 14.04 <br>- Ubuntu 16.04 |[v6.7.4](/platform/runtime/machine-image/ami-v674/) to [v6.9.4](/platform/runtime/machine-image/ami-v694/)
|clang 6.0.0       |- Ubuntu 14.04 <br>- Ubuntu 16.04<br>- Ubuntu 16.04(aarch64) | [v6.5.4](/platform/runtime/machine-image/ami-v654 ) and [v6.6.4](/platform/runtime/machine-image/ami-v664/)<br> [v6.5.4](/platform/runtime/machine-image/ami-v654 ) and [v6.6.4](/platform/runtime/machine-image/ami-v664/)<br> [v6.5.4](/platform/runtime/machine-image/ami-v654 ) to [v6.9.4](/platform/runtime/machine-image/ami-v694/)
|clang 5.0.1       |- CentOS 7<br>- Ubuntu 14.04<br>- Ubuntu 16.04<br>- Ubuntu 16.04(aarch64)<br>-  | [v6.2.4](/platform/runtime/machine-image/ami-v624/) to [v6.12.4](/platform/runtime/machine-image/ami-v6124/) <br> [v6.1.4](/platform/runtime/machine-image/ami-v614/) to [v6.4.4](/platform/runtime/machine-image/ami-v644/)<br> [v6.1.4](/platform/runtime/machine-image/ami-v614/) to [v6.4.4](/platform/runtime/machine-image/ami-v644/)<br>[v6.2.4](/platform/runtime/machine-image/ami-v624/) to [v6.4.4](/platform/runtime/machine-image/ami-v644/) |
|clang 5.0.0       |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.10.4](/platform/runtime/machine-image/ami-v5104/) |
|clang 4.0.0       |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.7.3](/platform/runtime/machine-image/ami-v573/) to [v5.8.2](/platform/runtime/machine-image/ami-v582/) |
|clang 3.9.0       |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier |


## DotNet

The following images are available when you configure `language: DotNet` in your [shippable.yml](/ci/yml-structure/) for a [runCI job](/platform/workflow/job/runci), we automatically use a default language image for your build. The specific language image chosen depends on the Machine Image selected for your subscription.

* Windows server 2016: w16dotnetcore
	* [Docker Hub](https://hub.docker.com/r/drydock/w16dotnetcore/)
	* [Github](https://github.com/dry-dock/w16dotnetcore)

| DotNet version |   OS  |  Machine Image |
|----------------|----------------|-----------
|2.1.500         |  Windows server 2016 | [v6.12.4](/platform/runtime/machine-image/ami-v6124/) |
|2.1.403         |  Windows server 2016 | [v6.10.4](/platform/runtime/machine-image/ami-v6104/) |
|2.1.402         |  Windows server 2016 | [v6.9.4](/platform/runtime/machine-image/ami-v694/) |
|2.1.401         |  Windows server 2016 | [v6.8.4](/platform/runtime/machine-image/ami-v684/) |
|2.1.302         |  Windows server 2016 | [v6.7.4](/platform/runtime/machine-image/ami-v674/) |
|2.1.200         |  Windows server 2016 | [v6.5.4](/platform/runtime/machine-image/ami-v654/) and [v6.6.4](/platform/runtime/machine-image/ami-v664/) |
|2.1.104         |  Windows server 2016 | [v6.4.4](/platform/runtime/machine-image/ami-v644/) |
|2.1.4           |  Windows server 2016 | [v6.3.4](/platform/runtime/machine-image/ami-v634/) |


## Go

The following images are available when you configure `language: go` in your [shippable.yml](/ci/yml-structure/) for a [runCI job](/platform/workflow/job/runci), we automatically use a default language image for your build. The specific language image chosen depends on the Machine Image selected for your subscription.

* Ubuntu 14.04: u14golall
	* [Docker Hub](https://hub.docker.com/r/drydock/u14golall/)
	* [Github](https://github.com/dry-dock/u14golall)
* Ubuntu 16.04: u16golall
	* [Docker Hub](https://hub.docker.com/r/drydock/u16golall/)
	* [Github](https://github.com/dry-dock/u16golall)
* CentOS 7: c7golall
	* [Docker Hub](https://hub.docker.com/r/drydock/c7golall/)
	* [Github](https://github.com/dry-dock/c7golall)

	| Go Version  | OS|  Machine Image |
	|------------|---------------------|-----------
	|1.11.2      |  - CentOS 7<br>- Ubuntu 14.04 <br>- Ubuntu 16.04  | [v6.12.4](/platform/runtime/machine-image/ami-v6124/)
	|1.11.1      |  - Ubuntu 14.04 <br>- Ubuntu 16.04  | [v6.10.4](/platform/runtime/machine-image/ami-v6104/)
	|1.11        |  - Ubuntu 14.04 <br>- Ubuntu 16.04  | [v6.9.4](/platform/runtime/machine-image/ami-v694/)
	|1.10.5      |  - CentOS 7<br>- Ubuntu 14.04 <br>- Ubuntu 16.04  | [v6.12.4](/platform/runtime/machine-image/ami-v6124/)
	|1.10.4      |  - Ubuntu 14.04 <br>- Ubuntu 16.04  | [v6.9.4](/platform/runtime/machine-image/ami-v694/) and [v6.10.4](/platform/runtime/machine-image/ami-v6104/)
	|1.10.3      |  - Ubuntu 14.04 <br>- Ubuntu 16.04  | [v6.7.4](/platform/runtime/machine-image/ami-v674/) and [v6.8.4](/platform/runtime/machine-image/ami-v684/)
	|1.10.2      |  - Ubuntu 14.04 <br>- Ubuntu 16.04  | [v6.5.4](/platform/runtime/machine-image/ami-v654/) and [v6.6.4](/platform/runtime/machine-image/ami-v664/)|
	|1.10.1      |  - Ubuntu 14.04 <br>- Ubuntu 16.04 | [v6.4.4](/platform/runtime/machine-image/ami-v644/) |
	|1.10        |  - Ubuntu 16.04                   |  [v6.3.4](/platform/runtime/machine-image/ami-v634/)
	|1.9.7       |  - Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.7.4](/platform/runtime/machine-image/ami-v674/) and [v6.8.4](/platform/runtime/machine-image/ami-v684/)|
	|1.9.6       |  - Ubuntu 14.04 <br>- Ubuntu 16.04  | [v6.5.4](/platform/runtime/machine-image/ami-v654/) and [v6.6.4](/platform/runtime/machine-image/ami-v664/) |
    |1.9.5       |  - Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.4.4](/platform/runtime/machine-image/ami-v644/) |
	|1.9.4       |  - Ubuntu 16.04                  |  [v6.3.4](/platform/runtime/machine-image/ami-v634/)
 	|1.9.2       |  - Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.1.4](/platform/runtime/machine-image/ami-v614/) to [v6.3.4](/platform/runtime/machine-image/ami-v634/) <br> [v6.1.4](/platform/runtime/machine-image/ami-v614/) to [v6.2.4](/platform/runtime/machine-image/ami-v624/) |
	|1.9.1       |  - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.10.4](/platform/runtime/machine-image/ami-v5104/)   |
	|1.8.7       |  - Ubuntu 14.04 <br>- Ubuntu 16.04 | [v6.4.4](/platform/runtime/machine-image/ami-v644/) to [v6.6.4](/platform/runtime/machine-image/ami-v664/) <br> [v6.3.4](/platform/runtime/machine-image/ami-v634/) to  [v6.6.4](/platform/runtime/machine-image/ami-v664/) |
	|1.8.5       |  - Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.1.4](/platform/runtime/machine-image/ami-v614/) to  [v6.3.4](/platform/runtime/machine-image/ami-v634/) <br> [v6.1.4](/platform/runtime/machine-image/ami-v614/) to  [v6.2.4](/platform/runtime/machine-image/ami-v624/)  |
	|1.8.3       |  - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.7.3](/platform/runtime/machine-image/ami-v573/) and [v5.10.4](/platform/runtime/machine-image/ami-v5104/)
	|1.7.6       |  - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.7.3](/platform/runtime/machine-image/ami-v573/) and [v6.6.4](/platform/runtime/machine-image/ami-v664/)   |
	|1.7.5       |  - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier |
	|1.7         |  - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier |
	|1.6.4       |  - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier |
	|1.6         |  - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier |
	|1.5.4       |  - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier |
	|1.5         |  - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier |
	|1.4         |  - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and later |
	|1.3         |  - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier |
	|1.2         |  - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier |
	|1.1         |  - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier |

## Java

The following images are available when you configure `language: java` in your [shippable.yml](/ci/yml-structure/) for a [runCI job](/platform/workflow/job/runci), we automatically use a default language image for your build. The specific language image chosen depends on the Machine Image selected for your subscription.

* Ubuntu 14.04: u14javall
	* [Docker Hub](https://hub.docker.com/r/drydock/u14javall/)
	* [Github](https://github.com/dry-dock/u14javall)
* Ubuntu 16.04: u16javall
	* [Docker Hub](https://hub.docker.com/r/drydock/u16javall/)
	* [Github](https://github.com/dry-dock/u16javall)
* Ubuntu 16.04(aarch64): u16javall
	* [Docker Hub](https://hub.docker.com/r/drydockaarch64/u16javall/)
	* [Github](https://github.com/dry-dock/aarch64_u16javall)
* CentOS 7: c7javall
	* [Docker Hub](https://hub.docker.com/r/drydock/c7javall/)
	* [Github](https://github.com/dry-dock/c7javall)

## openJDK

| Java JDK    | OS    |    Machine Image |
	|-----------|-----------|-----------
|openjdk11  | - CentOS 7<br>- Ubuntu 14.04<br>- Ubuntu 16.04<br>- Ubuntu 16.04(aarch64) |	[v6.10.4](/platform/runtime/machine-image/ami-v6104/) and [v6.12.4](/platform/runtime/machine-image/ami-v6124/) |
|openjdk10  | - CentOS 7<br>- Ubuntu 14.04<br>- Ubuntu 16.04<br>- Ubuntu 16.04(aarch64) |	[v6.8.4](/platform/runtime/machine-image/ami-v684/) and later
|openjdk9   | - CentOS 7<br>- Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.2.4](/platform/runtime/machine-image/ami-v624/) to  [v6.8.4](/platform/runtime/machine-image/ami-v684/) <br> [v5.10.4](/platform/runtime/machine-image/ami-v5104/) to  [v6.4.4](/platform/runtime/machine-image/ami-v644/), [v6.8.4](/platform/runtime/machine-image/ami-v684/) and [v6.9.4](/platform/runtime/machine-image/ami-v694/)<br>[v5.7.3](/platform/runtime/machine-image/ami-v573/) to [v6.9.4](/platform/runtime/machine-image/ami-v694/)
|openjdk8   | - CentOS 7<br>- Ubuntu 14.04<br>- Ubuntu 16.04<br>- Ubuntu 16.04(aarch64) | [v6.2.4](/platform/runtime/machine-image/ami-v624/) and later <br> [v5.3.2](/platform/runtime/machine-image/ami-v532/) and later <br> [v5.3.2](/platform/runtime/machine-image/ami-v532/) and later <br> [v6.2.4](/platform/runtime/machine-image/ami-v624/) and later
|openjdk7   |- CentOS 7 <br>- Ubuntu 14.04<br>- Ubuntu 16.04<br>- Ubuntu 16.04(aarch64)| [v6.2.4](/platform/runtime/machine-image/ami-v624/) and later <br> [v5.3.2](/platform/runtime/machine-image/ami-v532/) and later <br> [v5.3.2](/platform/runtime/machine-image/ami-v532/) and later <br> [v6.2.4](/platform/runtime/machine-image/ami-v624/) and later

## oracleJDK

| Java JDK    | OS    |    Machine Image |
|-----------|-----------|-----------
|oraclejdk11 | - CentOS 7<br>- Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.10.4](/platform/runtime/machine-image/ami-v6104/) and [v6.12.4](/platform/runtime/machine-image/ami-v6124/)|
|oraclejdk10 | - CentOS 7<br>- Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.4.4](/platform/runtime/machine-image/ami-v644/) to [v6.9.4](/platform/runtime/machine-image/ami-v694/) |
|oraclejdk9 | - Ubuntu 14.04<br>- Ubuntu 16.04<br>- CentOS 7 |  [v5.7.3](/platform/runtime/machine-image/ami-v573/) to [v6.3.4](/platform/runtime/machine-image/ami-v634/)<br> [v5.7.3](/platform/runtime/machine-image/ami-v573/) to [v6.3.4](/platform/runtime/machine-image/ami-v634/)<br> [v6.2.4](/platform/runtime/machine-image/ami-v624/) to [v6.3.4](/platform/runtime/machine-image/ami-v634/) |
|oraclejdk8 | - CentOS 7<br>- Ubuntu 14.04 <br>- Ubuntu 16.04<br>- Ubuntu 16.04(aarch64) |[v6.2.4](/platform/runtime/machine-image/ami-v624/) and later <br> [v5.3.2](/platform/runtime/machine-image/ami-v532/) and later<br> [v5.3.2](/platform/runtime/machine-image/ami-v532/) and later<br>[v6.2.4](/platform/runtime/machine-image/ami-v624/) and later
|oraclejdk7 | - Ubuntu 14.04<br>- Ubuntu 16.04 |  [v5.5.1](/platform/runtime/machine-image/ami-v551/) and earlier |

## Node.js

The following images are available when you configure `language: nodejs` in your [shippable.yml](/ci/yml-structure/) for a [runCI job](/platform/workflow/job/runci), we automatically use a default language image for your build. The specific language image chosen depends on the Machine Image selected for your subscription.

* Ubuntu 14.04
	* [Docker Hub](https://hub.docker.com/r/drydock/u14nodall/)
	* [Github](https://github.com/dry-dock/u14nodall)
* Ubuntu 16.04
	* [Docker Hub](https://hub.docker.com/r/drydock/u16nodall/)
	* [Github](https://github.com/dry-dock/u16nodall)
* Ubuntu 16.04(aarch64): u16nodall
	* [Docker Hub](https://hub.docker.com/r/drydockaarch64/u16nodall/)
	* [Github](https://github.com/dry-dock/aarch64_u16nodall)
* CentOS 7: c7nodall
	* [Docker Hub](https://hub.docker.com/r/drydock/c7nodall/)
	* [Github](https://github.com/dry-dock/c7nodall)


The following versions are supported in each Machine Image:

|  Node JS Version   | OS    |    Machine Image |
|-----------|-----------|-----------
|11.1.0 (npm 6.4.1)|- CentOS 7 <br>- Ubuntu 14.04<br>- Ubuntu 16.04<br>- Ubuntu 16.04(aarch64) |  [v6.12.4](/platform/runtime/machine-image/ami-v6124/)
|10.13.0 (npm 6.4.1)**default**|- CentOS 7 <br>- Ubuntu 14.04<br>- Ubuntu 16.04<br>- Ubuntu 16.04(aarch64) |  [v6.12.4](/platform/runtime/machine-image/ami-v6124/)
|10.12.0 (npm 6.4.1)|- CentOS 7 <br>- Ubuntu 14.04<br>- Ubuntu 16.04<br>- Ubuntu 16.04(aarch64) | [v6.9.4](/platform/runtime/machine-image/ami-v694/) and [v6.10.4](/platform/runtime/machine-image/ami-v6104/)
|10.9.0 (npm 6.4.0)|- CentOS 7 <br>- Ubuntu 14.04<br>- Ubuntu 16.04<br>- Ubuntu 16.04(aarch64) | [v6.8.4](/platform/runtime/machine-image/ami-v684/)
|10.6.0 (npm 5.6.0)|- CentOS 7<br>- Ubuntu 14.04<br>- Ubuntu 16.04<br>- Ubuntu 16.04(aarch64) | [v6.7.4](/platform/runtime/machine-image/ami-v674/)
|10.2.1 (npm 5.6.0)|- CentOS 7  | [v6.5.4](/platform/runtime/machine-image/ami-v654/) and [v6.6.4](/platform/runtime/machine-image/ami-v664/)
|10.1.0 (npm 5.6.0)|- Ubuntu 14.04<br>- Ubuntu 16.04<br>- Ubuntu 16.04(aarch64) | [v6.5.4](/platform/runtime/machine-image/ami-v654/) and [v6.6.4](/platform/runtime/machine-image/ami-v664/)
|9.11.2 (npm 5.6.0)|- Ubuntu 14.04<br>- Ubuntu 16.04<br>- Ubuntu 16.04(aarch64) | [v6.6.4](/platform/runtime/machine-image/ami-v664/)
|9.11.1 (npm 5.6.0)|- Ubuntu 14.04<br>- Ubuntu 16.04<br>- Ubuntu 16.04(aarch64)<br>- CentOS 7   |  [v6.5.4](/platform/runtime/machine-image/ami-v644/) <br> [v6.5.4](/platform/runtime/machine-image/ami-v654/) <br> [v6.4.4](/platform/runtime/machine-image/ami-v644/) and [v6.5.4](/platform/runtime/machine-image/ami-v654/) <br> [v6.5.4](/platform/runtime/machine-image/ami-v654/) and [v6.6.4](/platform/runtime/machine-image/ami-v664/)
|9.9.0  (npm 5.6.0)|- Ubuntu 16.04   | [v6.4.4](/platform/runtime/machine-image/ami-v644/)
|9.5.0  (npm 5.6.0)|- Ubuntu 14.04<br>- Ubuntu 16.04<br>- Ubuntu 16.04(aarch64)<br>- CentOS 7 |  [v6.2.4](/platform/runtime/machine-image/ami-v624/) to [v6.3.4](/platform/runtime/machine-image/ami-v634/)
|9.4.0  (npm 5.6.0)|- Ubuntu 14.04<br>- Ubuntu 16.04 |  [v6.1.4](/platform/runtime/machine-image/ami-v614/) |
|8.12.0 (npm 6.4.1) **default** |- CentOS 7<br>- Ubuntu 14.04<br>- Ubuntu 16.04<br>- Ubuntu 16.04(aarch64) | [v6.9.4](/platform/runtime/machine-image/ami-v694/) to [v6.12.4](/platform/runtime/machine-image/ami-v6124/)
|8.11.4 (npm 6.4.0) |- CentOS 7<br>- Ubuntu 14.04<br>- Ubuntu 16.04<br>- Ubuntu 16.04(aarch64) | [v6.8.4](/platform/runtime/machine-image/ami-v684/)
|8.11.3 (npm 5.6.0) |- CentOS 7<br>- Ubuntu 14.04<br>- Ubuntu 16.04<br>- Ubuntu 16.04(aarch64) | [v6.7.4](/platform/runtime/machine-image/ami-v674/)<br> [v6.6.4](/platform/runtime/machine-image/ami-v664/) and [v6.7.4](/platform/runtime/machine-image/ami-v674/)<br> [v6.6.4](/platform/runtime/machine-image/ami-v664/) and [v6.7.4](/platform/runtime/machine-image/ami-v674/)<br> [v6.6.4](/platform/runtime/machine-image/ami-v664/) and [v6.7.4](/platform/runtime/machine-image/ami-v674/)
|8.11.2 (npm 5.6.0) |- CentOS 7 | [v6.5.4](/platform/runtime/machine-image/ami-v654/) and [v6.6.4](/platform/runtime/machine-image/ami-v664/)
|8.11.2 (npm 5.6.0) |- Ubuntu 14.04<br>- Ubuntu 16.04<br>- Ubuntu 16.04(aarch64)  | [v6.5.4](/platform/runtime/machine-image/ami-v654/)
|8.11.1 (npm 5.6.0)|- CentOS 7  | [v6.4.4](/platform/runtime/machine-image/ami-v644/)
|8.9.4  (npm 5.6.0)|- Ubuntu 14.04<br>- CentOS 7  |   [v6.2.4](/platform/runtime/machine-image/ami-v624/) to [v6.4.4](/platform/runtime/machine-image/ami-v644/)<br> [v6.2.4](/platform/runtime/machine-image/ami-v624/) to [v6.3.4](/platform/runtime/machine-image/ami-v634/)|
|8.6.0             | - Ubuntu 14.04<br>- Ubuntu 16.04<br>- Ubuntu 16.04(aarch64) |  [v5.10.4](/platform/runtime/machine-image/ami-v5104/) to [v6.4.4](/platform/runtime/machine-image/ami-v644/)<br> [v5.10.4](/platform/runtime/machine-image/ami-v5104/) to [v6.4.4](/platform/runtime/machine-image/ami-v644/)<br> [v6.2.4](/platform/runtime/machine-image/ami-v624/) to [v6.4.4](/platform/runtime/machine-image/ami-v644/)|
|8.2.1   | - Ubuntu 14.04<br>- Ubuntu 16.04 |  [v5.8.2](/platform/runtime/machine-image/ami-v582/)
|8.1.4             | - Ubuntu 14.04<br>- Ubuntu 16.04<br>- Ubuntu 16.04(aarch64)  |  [v5.7.3](/platform/runtime/machine-image/ami-v573/) to [v6.1.4](/platform/runtime/machine-image/ami-v614/)<br> [v5.7.3](/platform/runtime/machine-image/ami-v573/) to [v6.1.4](/platform/runtime/machine-image/ami-v614/)<br> [v6.2.4](/platform/runtime/machine-image/ami-v624/) to [v6.4.4](/platform/runtime/machine-image/ami-v644/)|
|7.10.1            | - Ubuntu 14.04<br>- Ubuntu 16.04<br>- Ubuntu 16.04(aarch64)<br>- CentOS 7  |  [v5.7.3](/platform/runtime/machine-image/ami-v573/) to [v6.4.4](/platform/runtime/machine-image/ami-v644/)<br> [v5.7.3](/platform/runtime/machine-image/ami-v573/) to [v6.4.4](/platform/runtime/machine-image/ami-v644/) <br>[v5.7.3](/platform/runtime/machine-image/ami-v573/) to [v6.4.4](/platform/runtime/machine-image/ami-v644/)<br> [v6.2.4](/platform/runtime/machine-image/ami-v624/) to [v6.5.4](/platform/runtime/machine-image/ami-v654/)|
|7.4.0             | - Ubuntu 14.04<br>- Ubuntu 16.04 |  [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier
|7.3.0             | - Ubuntu 14.04<br>- Ubuntu 16.04 |  [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier
|7.2.1             | - Ubuntu 14.04<br>- Ubuntu 16.04 <br>- Ubuntu 16.04(aarch64)<br>- CentOS 7 |  [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier
|7.0.0             | - Ubuntu 14.04<br>- Ubuntu 16.04 |  [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier
|6.14.4 (npm 6.4.1)| - CentOS 7<br>- Ubuntu 14.04 <br>- Ubuntu 16.04 <br>- Ubuntu 16.04(aarch64)| [v6.8.4](/platform/runtime/machine-image/ami-v684/) to [v6.12.4](/platform/runtime/machine-image/ami-v6124/)
|6.14.3 (npm 5.6.0)| - CentOS 7<br>- Ubuntu 14.04 <br>- Ubuntu 16.04 <br>- Ubuntu 16.04(aarch64)| [v6.6.4](/platform/runtime/machine-image/ami-v664/) and [v6.7.4](/platform/runtime/machine-image/ami-v674/)
|6.14.2 (npm 5.6.0)| - Ubuntu 14.04 <br>- Ubuntu 16.04 <br>- Ubuntu 16.04(aarch64) <br>- CentOS 7| [v6.5.4](/platform/runtime/machine-image/ami-v654/)<br> [v6.5.4](/platform/runtime/machine-image/ami-v654/)<br> [v6.5.4](/platform/runtime/machine-image/ami-v654/) <br> [v6.5.4](/platform/runtime/machine-image/ami-v654/) and [v6.6.4](/platform/runtime/machine-image/ami-v664/)
|6.11.5 (npm 5.6.0)| - Ubuntu 14.04<br>- Ubuntu 16.04<br>- Ubuntu 16.04(aarch64)<br>- CentOS 7  |  [v6.1.4](/platform/runtime/machine-image/ami-v614/) to [v6.4.4](/platform/runtime/machine-image/ami-v644/)<br>[v6.1.4](/platform/runtime/machine-image/ami-v614/) to [v6.4.4](/platform/runtime/machine-image/ami-v644/)<br>  [v6.2.4](/platform/runtime/machine-image/ami-v624/) to [v6.4.4](/platform/runtime/machine-image/ami-v644/)<br> [v6.2.4](/platform/runtime/machine-image/ami-v624/) to [v6.4.4](/platform/runtime/machine-image/ami-v644/) |
|6.11.4            | - Ubuntu 14.04<br>- Ubuntu 16.04 |  [v5.10.4](/platform/runtime/machine-image/ami-v5104/)
|6.11.2            | - Ubuntu 14.04<br>- Ubuntu 16.04 |  [v5.8.2](/platform/runtime/machine-image/ami-v582/)
|6.11.1            | - Ubuntu 14.04<br>- Ubuntu 16.04 |  [v5.7.3](/platform/runtime/machine-image/ami-v573/)
|6.9.4             | - Ubuntu 14.04<br>- Ubuntu 16.04 |  [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier
|6.8.0             | - Ubuntu 14.04<br>- Ubuntu 16.04 |  [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier
|6.7.0             | - Ubuntu 14.04<br>- Ubuntu 16.04 |  [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier
|5.12.0            | - Ubuntu 14.04<br>- Ubuntu 16.04<br>- Ubuntu 16.04(aarch64)<br>- CentOS 7  |  [v5.3.2](/platform/runtime/machine-image/ami-v532/) to [v6.4.4](/platform/runtime/machine-image/ami-v644/)<br> [v5.2.2](/platform/runtime/machine-image/ami-v532/) to [v6.4.4](/platform/runtime/machine-image/ami-v644/)<br> [v6.2.4](/platform/runtime/machine-image/ami-v624/) to [v6.4.4](/platform/runtime/machine-image/ami-v644/)<br> [v6.2.4](/platform/runtime/machine-image/ami-v624/) to [v6.5.4](/platform/runtime/machine-image/ami-v654/)|
|4.9.0  (npm 5.6.0)| -  CentOS 7       |  [v6.1.4](/platform/runtime/machine-image/ami-v614/)
|4.8.7  (npm 5.6.0)| - Ubuntu 14.04<br>- Ubuntu 16.04<br>- Ubuntu 16.04(aarch64)<br>- CentOS 7  |  [v6.1.4](/platform/runtime/machine-image/ami-v614/) to [v6.4.4](/platform/runtime/machine-image/ami-v644/)<br> [v6.1.4](/platform/runtime/machine-image/ami-v614/) to [v6.4.4](/platform/runtime/machine-image/ami-v644/)<br> [v6.2.4](/platform/runtime/machine-image/ami-v624/) to [v6.4.4](/platform/runtime/machine-image/ami-v644/)<br> [v6.2.4](/platform/runtime/machine-image/ami-v624/) to [v6.4.4](/platform/runtime/machine-image/ami-v644/)|
|4.8.4             | - Ubuntu 14.04<br>- Ubuntu 16.04 |  [v5.7.3](/platform/runtime/machine-image/ami-v573/) to [v5.10.4](/platform/runtime/machine-image/ami-v5104/) |
|4.2.3             | - Ubuntu 14.04<br>- Ubuntu 16.04 |  [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier
|4.6.0             | - Ubuntu 14.04<br>- Ubuntu 16.04 |  [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier
|4.2.3             | - Ubuntu 14.04<br>- Ubuntu 16.04 |  [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier
|0.12   | - Ubuntu 14.04<br>- Ubuntu 16.04 |  [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier
|0.10              | - Ubuntu 14.04<br>- Ubuntu 16.04 |  [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier
|iojs 1.0          | - Ubuntu 14.04<br>- Ubuntu 16.04 |  [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier
|iojs 2.0          | - Ubuntu 14.04<br>- Ubuntu 16.04 |  [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier
|iojs 3.3.1        | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier

Note: For CI, we support npm 5.6.0 for nodejs LTS releases - v4.8.7, v6.11.5, v8.9.4. For other node versions,
we use default npm that comes bundled with nodejs installation.

## PHP

The following images are available when you configure `language: php` in your [shippable.yml](/ci/yml-structure/) for a [runCI job](/platform/workflow/job/runci), we automatically use a default language image for your build. The specific language image chosen depends on the Machine Image selected for your subscription.

* Ubuntu 14.04: u14phpall
	* [Docker Hub](https://hub.docker.com/r/drydock/u14phpall/)
	* [Github](https://github.com/dry-dock/u14phpall)
* Ubuntu 16.04: u16phpall
	* [Docker Hub](https://hub.docker.com/r/drydock/u16phpall/)
	* [Github](https://github.com/dry-dock/u16phpall)
* CentOS 7: c7phpall
	* [Docker Hub](https://hub.docker.com/r/drydock/c7phpall/)
	* [Github](https://github.com/dry-dock/c7phpall)

	| PHP Version | OS   | Machine Image |
	|-------------|-----------|-----------
	|7.2.12      |  - CentOS 7<br>- Ubuntu 14.04 <br>- Ubuntu 16.04  | [v6.12.4](/platform/runtime/machine-image/ami-v6124/)
	|7.2.11       | - Ubuntu 14.04 <br>- Ubuntu 16.04 | [v6.10.4](/platform/runtime/machine-image/ami-v6104/)|
	|7.2.10       | - Ubuntu 14.04 <br>- Ubuntu 16.04 | [v6.9.4](/platform/runtime/machine-image/ami-v694/)|
	|7.2.9        | - Ubuntu 14.04 <br>- Ubuntu 16.04 | [v6.8.4](/platform/runtime/machine-image/ami-v684/)|
	|7.2.7        | - Ubuntu 14.04 <br>- Ubuntu 16.04 | [v6.7.4](/platform/runtime/machine-image/ami-v674/)|
	|7.2.6        | - Ubuntu 14.04 <br>- Ubuntu 16.04 | [v6.6.4](/platform/runtime/machine-image/ami-v664/)|
  |7.2.5        | - Ubuntu 14.04 <br>- Ubuntu 16.04 | [v6.5.4](/platform/runtime/machine-image/ami-v654/)|
	|7.1.24       |  - CentOS 7<br>- Ubuntu 14.04 <br>- Ubuntu 16.04  | [v6.12.4](/platform/runtime/machine-image/ami-v6124/)
  |7.1.23       | - Ubuntu 14.04 <br>- Ubuntu 16.04 | [v6.10.4](/platform/runtime/machine-image/ami-v6104/)|
  |7.1.22       | - Ubuntu 14.04 <br>- Ubuntu 16.04 | [v6.9.4](/platform/runtime/machine-image/ami-v694/)|
	|7.1.21       | - Ubuntu 14.04 <br>- Ubuntu 16.04 | [v6.8.4](/platform/runtime/machine-image/ami-v684/)|
	|7.1.19       | - Ubuntu 14.04 <br>- Ubuntu 16.04 | [v6.7.4](/platform/runtime/machine-image/ami-v674/)|
  |7.1.18       | - Ubuntu 14.04 <br>- Ubuntu 16.04 | [v6.6.4](/platform/runtime/machine-image/ami-v664/)|
  |7.1.17       | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.5.4](/platform/runtime/machine-image/ami-v654/)|
  |7.1.12       | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.1.4](/platform/runtime/machine-image/ami-v614/) and later|
	|7.1.9        | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.10.4](/platform/runtime/machine-image/ami-v5104/) |
	|7.1.7        | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.8.2](/platform/runtime/machine-image/ami-v582/) |
	|7.1.6        | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.7.3](/platform/runtime/machine-image/ami-v573/) |
	|7.1          | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier|
	|7.0.32       | - CentOS 7<br>- Ubuntu 14.04 <br>- Ubuntu 16.04 | [v6.12.4](/platform/runtime/machine-image/ami-v6124/)<br>[v6.9.4](/platform/runtime/machine-image/ami-v694/) to [v6.12.4](/platform/runtime/machine-image/ami-v6124/)<br>[v6.9.4](/platform/runtime/machine-image/ami-v694/) to [v6.12.4](/platform/runtime/machine-image/ami-v6124/) |
	|7.0.31       | - Ubuntu 14.04 <br>- Ubuntu 16.04 | [v6.8.4](/platform/runtime/machine-image/ami-v684/)|
 	|7.0.30       | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.5.4](/platform/runtime/machine-image/ami-v654/) to [v6.7.4](/platform/runtime/machine-image/ami-v674/)|
  |7.0.26       | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.1.4](/platform/runtime/machine-image/ami-v614/) and later |
	|7.0.23       | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.10.4](/platform/runtime/machine-image/ami-v5104/) |
	|7.0.22       | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.8.2](/platform/runtime/machine-image/ami-v582/) |
	|7.0.20       | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.7.3](/platform/runtime/machine-image/ami-v573/)|
	|7.0          | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier|
	|5.6.38       | - CentOS 7<br>- Ubuntu 14.04 <br>- Ubuntu 16.04 | [v6.12.4](/platform/runtime/machine-image/ami-v6124/)<br>[v6.9.4](/platform/runtime/machine-image/ami-v694/) to [v6.12.4](/platform/runtime/machine-image/ami-v6124/)<br>[v6.9.4](/platform/runtime/machine-image/ami-v694/) to [v6.12.4](/platform/runtime/machine-image/ami-v6124/) |
	|5.6.37       | - Ubuntu 14.04 <br>- Ubuntu 16.04 | [v6.8.4](/platform/runtime/machine-image/ami-v684/)|
	|5.6.36       | - Ubuntu 14.04 <br>- Ubuntu 16.04 | [v6.5.4](/platform/runtime/machine-image/ami-v654/) to [v6.7.4](/platform/runtime/machine-image/ami-v674/)|
  |5.6.32       | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.1.4](/platform/runtime/machine-image/ami-v614/) and later|
	|5.6.31       | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.8.2](/platform/runtime/machine-image/ami-v582/) |
	|5.6.30       | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.7.3](/platform/runtime/machine-image/ami-v573/)|
	|5.6          | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier|

## Python

The following images are available when you configure `language: python` in your [shippable.yml](/ci/yml-structure/) for a [runCI job](/platform/workflow/job/runci), we automatically use a default language image for your build. The specific language image chosen depends on the Machine Image selected for your subscription.

* Ubuntu 14.04: u14pytall
	* [Docker Hub](https://hub.docker.com/r/drydock/u14pytall/)
	* [Github](https://github.com/dry-dock/u14pytall)
* Ubuntu 16.04: u16pytall
	* [Docker Hub](https://hub.docker.com/r/drydock/u16pytall/)
	* [Github](https://github.com/dry-dock/u16pytall)
* Ubuntu 16.04(aarch64): u16pytall
	* [Docker Hub](https://hub.docker.com/r/drydockaarch64/u16pytall/)
	* [Github](https://github.com/dry-dock/aarch64_u16pytall)
* CentOS 7: c7pytall
	* [Docker Hub](https://hub.docker.com/r/drydock/c7pytall/)
	* [Github](https://github.com/dry-dock/c7pytall)


	| Python Version | OS  | Machine Image |
	|----------------|------------------------------|----------------------------|
	|3.7.1           |- CentOS 7 <br> - Ubuntu 16.04 <br>- Ubuntu 16.04(aarch64) | [v6.12.4](/platform/runtime/machine-image/ami-v6124/)
	|3.7.0           |- CentOS 7 <br> - Ubuntu 14.04<br>- Ubuntu 16.04 <br>- Ubuntu 16.04(aarch64) | [v6.9.4](/platform/runtime/machine-image/ami-v694/) and [v6.10.4](/platform/runtime/machine-image/ami-v6104/) <br> [v6.7.4](/platform/runtime/machine-image/ami-v674/) to [v6.12.4](/platform/runtime/machine-image/ami-v6124/) <br> [v6.7.4](/platform/runtime/machine-image/ami-v674/) to [v6.10.4](/platform/runtime/machine-image/ami-v6104/) <br> [v6.7.4](/platform/runtime/machine-image/ami-v674/) to [v6.10.4](/platform/runtime/machine-image/ami-v6104/)
	|3.6.5           |- CentOS 7 <br>- Ubuntu 14.04<br>- Ubuntu 16.04<br>-Ubuntu 16.04(aarch64) | [v6.4.4](/platform/runtime/machine-image/ami-v644/) to [v6.8.4](/platform/runtime/machine-image/ami-v684/) <br> [v6.4.4](/platform/runtime/machine-image/ami-v644/) to [v6.6.4](/platform/runtime/machine-image/ami-v664/) <br> [v6.4.4](/platform/runtime/machine-image/ami-v644/) to [v6.6.4](/platform/runtime/machine-image/ami-v664/) <br> [v6.5.4](/platform/runtime/machine-image/ami-v654/) and [v6.6.4](/platform/runtime/machine-image/ami-v664/)
	|3.6.4           |- Ubuntu 14.04<br>- Ubuntu 16.04  | [v6.1.4](/platform/runtime/machine-image/ami-v614/) to [v6.3.4](/platform/runtime/machine-image/ami-v634/)  |
	|3.6.2           |- Ubuntu 14.04<br>- Ubuntu 16.04  | [v5.8.2](/platform/runtime/machine-image/ami-v582/) to [v5.10.4](/platform/runtime/machine-image/ami-v5104/) |
	|3.6.1           |- Ubuntu 14.04<br>- Ubuntu 16.04  | [v5.7.3](/platform/runtime/machine-image/ami-v573/) |
	|3.6.0           |- Ubuntu 14.04<br>- Ubuntu 16.04  | [v5.5.1](/platform/runtime/machine-image/ami-v551/) and earlier |
	|3.5.5           |- Ubuntu 14.04  <br>- CentOS 7  |  [v6.2.4](/platform/runtime/machine-image/ami-v624/) to [v6.5.4](/platform/runtime/machine-image/ami-v654/) <br> [v6.5.4](/platform/runtime/machine-image/ami-v654/)
	|3.5.4           |- CentOS 7                   | [v6.2.4](/platform/runtime/machine-image/ami-v624/) to [v6.3.4](/platform/runtime/machine-image/ami-v634/) |
	|3.5.3           |- Ubuntu 14.04                    | [v5.8.2](/platform/runtime/machine-image/ami-v582/) and earlier |
	|3.5.2           |- Ubuntu 16.04<br>- Ubuntu 16.04(aarch64)  | [v5.5.1](/platform/runtime/machine-image/ami-v551/) to [v6.4.4](/platform/runtime/machine-image/ami-v644/)<br> [v6.2.4](/platform/runtime/machine-image/ami-v624/) to [v6.5.4](/platform/runtime/machine-image/ami-v654/)|
	|3.4.8           |- Ubuntu 16.04 <br>- CentOS 7     | [v6.2.4](/platform/runtime/machine-image/ami-v624/) to [v6.5.4](/platform/runtime/machine-image/ami-v654/) <br> [v6.5.4](/platform/runtime/machine-image/ami-v654/)
	|3.4.5           |- Ubuntu 16.04                    | [v5.8.2](/platform/runtime/machine-image/ami-v582/) to [v6.1.4](/platform/runtime/machine-image/ami-v614/)  |
	|3.4.3           |- Ubuntu 14.04                    | [v5.8.2](/platform/runtime/machine-image/ami-v582/) to [v6.5.4](/platform/runtime/machine-image/ami-v654/) |
	|3.3.6           |- Ubuntu 14.04<br>- Ubuntu 16.04  | [v5.7.3](/platform/runtime/machine-image/ami-v573/) and earlier |
	|3.2.6           |- Ubuntu 14.04<br>- Ubuntu 16.04  | [v5.6.1](/platform/runtime/machine-image/ami-v561/)
	|2.7.15          |- CentOS 7   | [v6.9.4](/platform/runtime/machine-image/ami-v694/) to [v6.12.4](/platform/runtime/machine-image/ami-v6124/)
	|2.7.14          |- Ubuntu 14.04<br>- Ubuntu 16.04  | [v6.9.4](/platform/runtime/machine-image/ami-v694/) and [v6.12.4](/platform/runtime/machine-image/ami-v6124/)
	|2.7.12          |- Ubuntu 14.04<br>- Ubuntu 16.04<br>- Ubuntu 16.04(aarch64)|[v5.7.3](/platform/runtime/machine-image/ami-v573/) to [v6.8.4](/platform/runtime/machine-image/ami-v684/)<br> [v5.7.3](/platform/runtime/machine-image/ami-v573/) to [v6.8.4](/platform/runtime/machine-image/ami-v684/) <br> [v6.2.4](/platform/runtime/machine-image/ami-v624/) to [v6.12.4](/platform/runtime/machine-image/ami-v6124/)
	|2.7.6           |- Ubuntu 14.04                    | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier |
	|2.7.5           |- CentOS 7                        | [v6.2.4](/platform/runtime/machine-image/ami-v624/) to [v6.8.4](/platform/runtime/machine-image/ami-v684/)
	|2.6.9           |- Ubuntu 14.04<br>- Ubuntu 16.04     | [v5.6.1](/platform/runtime/machine-image/ami-v561/)  <br>[v5.6.1](/platform/runtime/machine-image/ami-v561/) |
	|pypy2-v6.0.0   |- Ubuntu 14.04<br>- Ubuntu 16.04  | [v6.7.4](/platform/runtime/machine-image/ami-v674/) and later
	|pypy3-v6.0.0   |- Ubuntu 14.04<br>- Ubuntu 16.04  | [v6.7.4](/platform/runtime/machine-image/ami-v674/) and later
	|pypy2-v5.10.0   |- Ubuntu 14.04<br>- Ubuntu 16.04  | [v6.1.4](/platform/runtime/machine-image/ami-v614/) to [v6.5.4](/platform/runtime/machine-image/ami-v654/)|  
	|pypy3-v5.10.1   |- Ubuntu 14.04<br>- Ubuntu 16.04  | [v6.1.4](/platform/runtime/machine-image/ami-v614/)to [v6.5.4](/platform/runtime/machine-image/ami-v654/) |  
	|pypy2-v5.8.0    |- Ubuntu 14.04<br>- Ubuntu 16.04  | [v5.7.3](/platform/runtime/machine-image/ami-v573/) |
	|pypy3-v5.8.0    |- Ubuntu 14.04<br>- Ubuntu 16.04  | [v5.7.3](/platform/runtime/machine-image/ami-v573/) |
	|pypy2-v4.0.1    |- Ubuntu 14.04<br>- Ubuntu 16.04  | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier |
	|pypy3-v2.4.0    |- Ubuntu 14.04<br>- Ubuntu 16.04  | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier |

## Ruby

The following images are available when you configure `language: ruby` in your [shippable.yml](/ci/yml-structure/) for a [runCI job](/platform/workflow/job/runci), we automatically use a default language image for your build. The specific language image chosen depends on the Machine Image selected for your subscription.

* Ubuntu 14.04: u14ruball
	* [Docker Hub](https://hub.docker.com/r/drydock/u14ruball/)
	* [Github](https://github.com/dry-dock/u14ruball)
* Ubuntu 16.04: u16ruball
	* [Docker Hub](https://hub.docker.com/r/drydock/u16ruball/)
	* [Github](https://github.com/dry-dock/u16ruball)
* CentOS 7: c7ruball
	* [Docker Hub](https://hub.docker.com/r/drydock/c7ruball/)
	* [Github](https://github.com/dry-dock/c7ruball)

| Ruby Version | OS    |  Machine Image
|--------------|----------|----------------
|2.5.3         |  - CentOS 7<br>- Ubuntu 14.04 <br>- Ubuntu 16.04  | [v6.12.4](/platform/runtime/machine-image/ami-v6124/)
|2.5.1         |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.4.4](/platform/runtime/machine-image/ami-v644/) to [v6.10.4](/platform/runtime/machine-image/ami-v6104/)
|2.5.0         |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.1.4](/platform/runtime/machine-image/ami-v614/) to [v6.3.4](/platform/runtime/machine-image/ami-v634/) <br> [v6.3.4](/platform/runtime/machine-image/ami-v634/)  |
|2.4.5         |  - CentOS 7<br>- Ubuntu 14.04 <br>- Ubuntu 16.04  | [v6.12.4](/platform/runtime/machine-image/ami-v6124/)
|2.4.4         |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.5.4](/platform/runtime/machine-image/ami-v654/) to [v6.10.4](/platform/runtime/machine-image/ami-v6104/) |
|2.4.3         |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.1.4](/platform/runtime/machine-image/ami-v614/) |
|2.4.1         |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.10.4](/platform/runtime/machine-image/ami-v5104/)
|2.4.1         |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.7.3](/platform/runtime/machine-image/ami-v573/) [v5.10.4](/platform/runtime/machine-image/ami-v5104/)
|2.3.8         |  - CentOS 7<br>- Ubuntu 14.04 <br>- Ubuntu 16.04  | [v6.12.4](/platform/runtime/machine-image/ami-v6124/)
|2.3.7         |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.5.4](/platform/runtime/machine-image/ami-v654/) to [v6.10.4](/platform/runtime/machine-image/ami-v6104/)
|2.3.6         |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.1.4](/platform/runtime/machine-image/ami-v614/) |
|2.3.5         |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.10.4](/platform/runtime/machine-image/ami-v5104/)
|2.3.4         |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.7.3](/platform/runtime/machine-image/ami-v573/) to [v5.10.4](/platform/runtime/machine-image/ami-v5104/)
|2.3.3         |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier
|2.3.1         |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier
|2.3.2         |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier
|2.3.0         |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier
|2.2.10        |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.5.4](/platform/runtime/machine-image/ami-v654/) and [v6.6.4](/platform/runtime/machine-image/ami-v664/)
|2.2.9         |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.1.4](/platform/runtime/machine-image/ami-v614/)<br> [v6.1.4](/platform/runtime/machine-image/ami-v644/) and earlier |
|2.2.8         |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.10.4](/platform/runtime/machine-image/ami-v5104/) [v6.2.4](/platform/runtime/machine-image/ami-v624/) and later <br> [v5.10.4](/platform/runtime/machine-image/ami-v5104/)
|2.2.7         |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.7.3](/platform/runtime/machine-image/ami-v573/) [v5.10.4](/platform/runtime/machine-image/ami-v5104/)
|2.2.5         |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier
|2.2.1         |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier
|2.1.5         |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier
|2.0.0         |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier
|1.9.3         |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier
|1.8.7         |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier

## Jruby

The following images are available when you configure `language: jruby` in your [shippable.yml](/ci/yml-structure/) for a [runCI job](/platform/workflow/job/runci), we automatically use a default language image for your build. The specific language image chosen depends on the Machine Image selected for your subscription.

| jruby Version | OS    |  Machine Image |
|--------------|----------|-------------|
|jruby 9.2.3.0  |  - CentOS 7<br>- Ubuntu 14.04 <br>- Ubuntu 16.04  | [v6.12.4](/platform/runtime/machine-image/ami-v6124/)
|jruby 9.2.0.0  |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.7.4](/platform/runtime/machine-image/ami-v674/) to [v6.10.4](/platform/runtime/machine-image/ami-v6104/) |
|jruby 9.1.17  |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.5.4](/platform/runtime/machine-image/ami-v654/) and [v6.6.4](/platform/runtime/machine-image/ami-v664/) |
|jruby 9.1.16  |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.4.4](/platform/runtime/machine-image/ami-v644/) |
|jruby 9.1.15  |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.1.4](/platform/runtime/machine-image/ami-v614/) and earlier|
|jruby 9.1.13  |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.10.4](/platform/runtime/machine-image/ami-v5104/) |
|jruby 9.1.12  |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.7.3](/platform/runtime/machine-image/ami-v573/) [v5.10.4](/platform/runtime/machine-image/ami-v5104/) |
|jruby 9.1.5   |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier |
|jruby 9.1.2   |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier |
|jruby 9.0.0   |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.3.2](/platform/runtime/machine-image/ami-v532/) [v5.10.4](/platform/runtime/machine-image/ami-v5104/) |
|jruby 1.7.27  |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.7.3](/platform/runtime/machine-image/ami-v573/) to [v6.9.4](/platform/runtime/machine-image/ami-v694/)
|jruby 1.7.19  |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier |
|ree 1.8.7     |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier |

## Scala

The following images are available when you configure `language: scala` in your [shippable.yml](/ci/yml-structure/) for a [runCI job](/platform/workflow/job/runci), we automatically use a default language image for your build. The specific language image chosen depends on the Machine Image selected for your subscription.

* Ubuntu 14.04: u14scaall
	* [Docker Hub](https://hub.docker.com/r/drydock/u14scaall/)
	* [Github](https://github.com/dry-dock/u14scaall)
* Ubuntu 16.04: u16scaall
	* [Docker Hub](https://hub.docker.com/r/drydock/u16scaall/)
	* [Github](https://github.com/dry-dock/u16scaall)
* CentOS 7: c7scaall
	* [Docker Hub](https://hub.docker.com/r/drydock/c7scaall/)
	* [Github](https://github.com/dry-dock/c7scaall)

| Scala Version  |  OS    |  Machine Image |
|----------------|-----------|-------------
|2.12.7          | - CentOS 7<br>- Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.12.4](/platform/runtime/machine-image/ami-v6124) <br> [v6.10.4](/platform/runtime/machine-image/ami-v6104/) and [v6.12.4](/platform/runtime/machine-image/ami-v6124/) <br> [v6.10.4](/platform/runtime/machine-image/ami-v6104/) and [v6.12.4](/platform/runtime/machine-image/ami-v6124/)
|2.12.6          | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.5.4](/platform/runtime/machine-image/ami-v654) to [v6.9.4](/platform/runtime/machine-image/ami-v694/) |
|2.12.5          | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.4.4](/platform/runtime/machine-image/ami-v644) |
|2.12.4          | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.1.4](/platform/runtime/machine-image/ami-v614/) to [v6.3.4](/platform/runtime/machine-image/ami-v634)  |
|2.12.3          | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.8.2](/platform/runtime/machine-image/ami-v582/) |
|2.12.2          | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.7.3](/platform/runtime/machine-image/ami-v573/) |
|2.12.1          | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier |
|2.12.0          | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.5.1](/platform/runtime/machine-image/ami-v551/) and earlier |
|2.11.12         | - CentOS 7<br>- Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.12.4](/platform/runtime/machine-image/ami-v6124) <br>[v6.1.4](/platform/runtime/machine-image/ami-v614/) and later <br>[v6.1.4](/platform/runtime/machine-image/ami-v614/) and later |
|2.11.11         | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.7.3](/platform/runtime/machine-image/ami-v573/) to [v5.10.4](/platform/runtime/machine-image/ami-v5104/)  |
|2.11.8          | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier |
|2.10.7          | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.1.4](/platform/runtime/machine-image/ami-v614/) to [v6.3.4](/platform/runtime/machine-image/ami-v634) |
|2.10.6          | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.3.2](/platform/runtime/machine-image/ami-v532/) to [v5.10.4](/platform/runtime/machine-image/ami-v5104/)  |
|2.9.3           | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.3.2](/platform/runtime/machine-image/ami-v532/) to [v6.3.4](/platform/runtime/machine-image/ami-v634)<br> [v5.3.2](/platform/runtime/machine-image/ami-v532/) to [v6.1.4](/platform/runtime/machine-image/ami-v614/)   |
