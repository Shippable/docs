page_main_title: Language versions on each image
main_section: Platform
sub_section: Runtime
sub_sub_section: Machine image
page_title: Popular language versions and the machine images where they are installed
page_description: Popular language versions and the machine images where they are installed in Shippable

# Languages

The Shippable Platform provides images with multiple versions of commonly-used languages pre-installed. A default image will be selected based on the language specified in your [shippable.yml](/ci/yml-structure/) file when running a CI job, or you can [select a different image](/ci/build-image/) in the `pre_ci_boot` section of your `shippable.yml`.

Our language specific images that are updated monthly so that the latest and greatest versions are always available for you to test.  The sections below provide more information about which versions are available in each image.

## ASP.Net

The following images are available when you configure `language: ASP.Net` in your [shippable.yml](/ci/yml-structure/) for a [runCI job](/platform/workflow/job/runci), we automatically use a default language image for your build. The specific language image chosen depends on the Machine Image selected for your subscription.

* Windows server 2016: w16aspnetcore
	* [Docker Hub](https://hub.docker.com/r/drydock/w16aspnetcore/)
	* [Github](https://github.com/dry-dock/w16aspnetcore)

| ASP.Net version |   OS  |  Machine Image |
|----------------|----------------|-----------
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

The following versions are supported in each Machine Image:

| Version  | OS | Machine Image |
|------------------|-----------|-----------|
|1.9.0  | - Ubuntu 14.04<br>- Ubuntu 16.04 |  [v6.1.4](/platform/runtime/machine-image/ami-v614/) and later |
|1.8.0  | - Ubuntu 14.04<br>- Ubuntu 16.04 |  [v5.3.2](/platform/runtime/machine-image/ami-v532/) and later |
|1.7.0  | - Ubuntu 14.04<br>- Ubuntu 16.04 |  [v5.3.2](/platform/runtime/machine-image/ami-v532/) and later |
|1.6.0  | - Ubuntu 14.04<br>- Ubuntu 16.04 |  [v5.3.2](/platform/runtime/machine-image/ami-v532/) and later |
|1.5.1  | - Ubuntu 14.04<br>- Ubuntu 16.04 |  [v5.3.2](/platform/runtime/machine-image/ami-v532/) and later |
|1.4.0  | - Ubuntu 14.04<br>- Ubuntu 16.04 |  [v5.3.2](/platform/runtime/machine-image/ami-v532/) and later |
|1.3.0  | - Ubuntu 14.04<br>- Ubuntu 16.04 |  [v5.3.2](/platform/runtime/machine-image/ami-v532/) and later |

## C/C++
This section explains how Shippable DevOps Assembly Lines Platform behaves when you set `language: c` in your [shippable.yml](/ci/yml-structure/) for a [runCI job](/platform/workflow/job/runci).

Each of the language images is built from the respective base OS version of the image. Since we install all of the packages, CLIs, and services on the base images, these language images get them automatically. Please click on the base image below to find out what's pre-installed as part of the base image.

* Ubuntu 14.04: u14cppall
	* [Docker Hub](https://hub.docker.com/r/drydock/u14cppall/)
	* [Github](https://github.com/dry-dock/u14cppall)
* Ubuntu 16.04: u16cppall
	* [Docker Hub](https://hub.docker.com/r/drydock/u16cppall/)
	* [Github](https://github.com/dry-dock/u16cppall)


| Compiler Version | Language Image Tags | Machine Image |Supported OS
|------------------|---------------------|-----------|-----------
|gcc 7.2           | v5.10.4             | [v5.10.4](/platform/runtime/machine-image/ami-v5104/) | All
|gcc 7.1           | v5.7.3, v5.10.4     | [v5.7.3](/platform/runtime/machine-image/ami-v573/) and later | All
|gcc 6             | v5.6.1 and earlier  | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier | All
|clang 5.0.1       | v6.1.4              | [v6.1.4](/platform/runtime/machine-image/ami-v614/) | All |
|clang 5.0.0       | v5.10.4             | [v5.10.4](/platform/runtime/machine-image/ami-v5104/) | All
|clang 4.0.0       | v5.7.3, v5.8.2      | [v5.7.3](/platform/runtime/machine-image/ami-v573/), [v5.8.2](/platform/runtime/machine-image/ami-v582/) | All
|clang 3.9.0       | v5.6.1 and earlier  | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier | All

## DotNet

The following images are available when you configure `language: DotNet` in your [shippable.yml](/ci/yml-structure/) for a [runCI job](/platform/workflow/job/runci), we automatically use a default language image for your build. The specific language image chosen depends on the Machine Image selected for your subscription.

* Windows server 2016: w16dotnetcore
	* [Docker Hub](https://hub.docker.com/r/drydock/w16dotnetcore/)
	* [Github](https://github.com/dry-dock/w16dotnetcore)

| DotNet version |   OS  |  Machine Image |
|----------------|----------------|-----------
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

	| Go Version  | OS|  Machine Image
	|------------|---------------------|-----------
	|1.10.1      |  - Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.4.4](/platform/runtime/machine-image/ami-v644/) |
	|1.9.5       |  - Ubuntu 14.04                   | [v6.4.4](/platform/runtime/machine-image/ami-v644/) |
	|1.9.2       |  - Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.1.4](/platform/runtime/machine-image/ami-v614/) and later |
	|1.9       	 |  - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.10.4](/platform/runtime/machine-image/ami-v5104/) and later  |
	|1.8.5       |  - Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.1.4](/platform/runtime/machine-image/ami-v614/) and later |
	|1.8.3       |  - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.7.3](/platform/runtime/machine-image/ami-v573/) and [v5.10.4](/platform/runtime/machine-image/ami-v5104/)
	|1.7.6       |  - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.7.3](/platform/runtime/machine-image/ami-v573/) and later   |
	|1.7.5       |  - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier |
	|1.7         |  - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier |
	|1.6.4       |  - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier |
	|1.6         |  - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier |
	|1.5.4       |  - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier |
	|1.5         |  - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier |
	|1.4         |  - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier |
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

| Java JDK  |  Language Image Tags  | Machine Image |Supported OS
|-----------|-----------------------|-----------|-----------
|openjdk9   |   v5.7.3 and later    |  [v5.7.3](/platform/runtime/machine-image/ami-v573/) and later | All
|openjdk8   |   v5.3.2 and later    |  [v5.3.2](/platform/runtime/machine-image/ami-v532/) and later | All
|openjdk7   |   v5.3.2 and later    |  [v5.3.2](/platform/runtime/machine-image/ami-v532/) and later | All
|oraclejdk9 |   v5.7.3 and later    |  [v5.7.3](/platform/runtime/machine-image/ami-v573/) and later | All
|oraclejdk8 |   v5.3.2 and later    |  [v5.3.2](/platform/runtime/machine-image/ami-v532/) and later | All
|oraclejdk7 |   v5.5.1 and earlier  |  [v5.5.1](/platform/runtime/machine-image/ami-v551/) and earlier | All

## Node.js

The following images are available when you configure `language: nodejs` in your [shippable.yml](/ci/yml-structure/) for a [runCI job](/platform/workflow/job/runci), we automatically use a default language image for your build. The specific language image chosen depends on the Machine Image selected for your subscription.

* Ubuntu 14.04
	* [Docker Hub](https://hub.docker.com/r/drydock/u14nodall/)
	* [Github](https://github.com/dry-dock/u14nodall)
* Ubuntu 16.04
	* [Docker Hub](https://hub.docker.com/r/drydock/u16nodall/)
	* [Github](https://github.com/dry-dock/u16nodall)

The following versions are supported in each Machine Image:

| Node JS Version  |  Language Image Tags | Machine Image
|------------------|---------|-----------
|9.4.0  (npm 5.6.0)|  v6.1.4              | [v6.1.4](/platform/runtime/machine-image/ami-v614/) | All |
|8.9.4  (npm 5.6.0)|  v6.1.4              | [v6.1.4](/platform/runtime/machine-image/ami-v614/) | All |
|8.2.1             |  v5.10.4   |  [v5.10.4](/platform/runtime/machine-image/ami-v5104/)
|8.2.1             |  v5.8.2   |  [v5.8.2](/platform/runtime/machine-image/ami-v582/)
|8.1.4             |  v5.7.3 and later |  [v5.7.3](/platform/runtime/machine-image/ami-v573/) and later
|7.10.1            |  v5.7.3 and later |  [v5.7.3](/platform/runtime/machine-image/ami-v573/) and later
|7.4.0             |  v5.6.1 and earlier |  [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier
|7.3.0             |  v5.6.1 and earlier |  [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier
|7.2.1             |  v5.6.1 and earlier |  [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier
|7.0.0             |  v5.6.1 and earlier |  [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier
|6.11.5 (npm 5.6.0)|  v6.1.4              | [v6.1.4](/platform/runtime/machine-image/ami-v614/) | All |
|6.11.2            |  v5.10.4 |  [v5.10.4](/platform/runtime/machine-image/ami-v5104/)
|6.11.2            |  v5.8.2 |  [v5.8.2](/platform/runtime/machine-image/ami-v582/)
|6.11.1            |  v5.7.3 |  [v5.7.3](/platform/runtime/machine-image/ami-v573/)
|6.9.4             |  v5.6.1 and earlier |  [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier
|6.8.0             |  v5.6.1 and earlier |  [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier
|6.7.0             |  v5.6.1 and earlier |  [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier
|5.12.0            |  v5.3.2 and later |  [v5.3.2](/platform/runtime/machine-image/ami-v532/) and later
|4.8.7  (npm 5.6.0)|  v6.1.4              | [v6.1.4](/platform/runtime/machine-image/ami-v614/) | All |
|4.8.4             |  v5.7.3 and later |  [v5.7.3](/platform/runtime/machine-image/ami-v573/) and later
|4.6.0             |  v5.6.1 and earlier |  [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier
|4.2.3             |  v5.6.1 and earlier |  [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier
|0.12  **default** |  v5.6.1 and earlier |  [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier
|0.10              |  v5.6.1 and earlier |  [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier
|iojs 1.0          |  v5.6.1 and earlier |  [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier
|iojs 2.0          |  v5.6.1 and earlier |  [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier
|iojs 3.3.1        |  v5.6.1 and earlier |  [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier

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

	| PHP Version | OS   | Machine Image |
	|-------------|-----------|-----------
	|7.1.12       | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.1.4](/platform/runtime/machine-image/ami-v614/) and later|
	|7.1.9        | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.10.4](/platform/runtime/machine-image/ami-v5104/) |
	|7.1.7        | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.8.2](/platform/runtime/machine-image/ami-v582/) |
	|7.1.6        | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.7.3](/platform/runtime/machine-image/ami-v573/) |
	|7.1          | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier|
	|7.0.26       | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.1.4](/platform/runtime/machine-image/ami-v614/) and later |
	|7.0.23       | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.10.4](/platform/runtime/machine-image/ami-v5104/) |
	|7.0.22       | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.8.2](/platform/runtime/machine-image/ami-v582/) |
	|7.0.20       | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.7.3](/platform/runtime/machine-image/ami-v573/)|
	|7.0          | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier|
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

| Python Version |   Language Image Tags  | Machine Image | Supported OS
|----------------|------------------------|-----------|--------------
|3.6.4           |   v6.1.4              | [v6.1.4](/platform/runtime/machine-image/ami-v614/) | All |
|3.6.2           |   v5.8.2               | [v5.8.2](/platform/runtime/machine-image/ami-v582/), v5.10.4 | All
|3.6.1           |   v5.7.3               | [v5.7.3](/platform/runtime/machine-image/ami-v573/) | All
|3.6.0           |   v5.5.1 and earlier   | [v5.5.1](/platform/runtime/machine-image/ami-v551/) and earlier | All
|3.5.2           |   v5.8.2 and earlier   | [v5.8.2](/platform/runtime/machine-image/ami-v582/) and earlier | 16.04 only
|3.5.3           |   v5.8.2 and earlier   | [v5.8.2](/platform/runtime/machine-image/ami-v582/) and earlier | 14.04 only
|3.5.2           |   v5.5.1 and earlier   | [v5.5.1](/platform/runtime/machine-image/ami-v551/) and earlier | All
|3.4.5           |   v5.8.2 and earlier   | [v5.8.2](/platform/runtime/machine-image/ami-v582/) and earlier | 16.04 only
|3.4.3           |   v5.8.2 and earlier   | [v5.8.2](/platform/runtime/machine-image/ami-v582/) and earlier | 14.04 only
|3.3.6           |   v5.7.3 and earlier   | [v5.7.3](/platform/runtime/machine-image/ami-v573/) and earlier | All
|3.2.6           |   v5.6.1 and earlier   | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier | All
|2.7.12          |   v5.7.3, v5.8.2       | [v5.7.3](/platform/runtime/machine-image/ami-v573/), [v5.8.2](/platform/runtime/machine-image/ami-v582/)| All
|2.7.6           |   v5.6.1 and earlier   | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier | 14.04 only
|2.6.9           |   v5.6.1 and earlier   | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier | All
|pypy2-v5.10.0    |   v6.1.4              | [v6.1.4](/platform/runtime/machine-image/ami-v614/) | All |
|pypy3-v5.10.1    |   v6.1.4              | [v6.1.4](/platform/runtime/machine-image/ami-v614/) | All |
|pypy2-v5.8.0    |   v5.7.3               | [v5.7.3](/platform/runtime/machine-image/ami-v573/) | All
|pypy3-v5.8.0    |   v5.7.3               | [v5.7.3](/platform/runtime/machine-image/ami-v573/) | All
|pypy2-v4.0.1    |   v5.6.1 and earlier   | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier | All
|pypy3-v2.4.0    |   v5.6.1 and earlier   | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier | All

## Ruby

The following images are available when you configure `language: ruby` in your [shippable.yml](/ci/yml-structure/) for a [runCI job](/platform/workflow/job/runci), we automatically use a default language image for your build. The specific language image chosen depends on the Machine Image selected for your subscription.

* Ubuntu 14.04: u14ruball
	* [Docker Hub](https://hub.docker.com/r/drydock/u14ruball/)
	* [Github](https://github.com/dry-dock/u14ruball)
* Ubuntu 16.04: u16ruball
	* [Docker Hub](https://hub.docker.com/r/drydock/u16ruball/)
	* [Github](https://github.com/dry-dock/u16ruball)

| Ruby Version | OS    |  Machine Image
|--------------|----------|----------------
|2.5.1         |- ubuntu 16.04                   | [v6.4.4](/platform/runtime/machine-image/ami-v644/) |
|2.5.0         |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.1.4](/platform/runtime/machine-image/ami-v614/) and later <br> [v6.3.4](/platform/runtime/machine-image/ami-v634/)  |
|2.4.3         |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.1.4](/platform/runtime/machine-image/ami-v614/) |
|2.4.1         |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.10.4](/platform/runtime/machine-image/ami-v5104/)
|2.4.1         |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.7.3](/platform/runtime/machine-image/ami-v573/) [v5.10.4](/platform/runtime/machine-image/ami-v5104/)
|2.3.6         |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.1.4](/platform/runtime/machine-image/ami-v614/) |
|2.3.5         |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.10.4](/platform/runtime/machine-image/ami-v5104/)
|2.3.4         |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.7.3](/platform/runtime/machine-image/ami-v573/) [v5.10.4](/platform/runtime/machine-image/ami-v5104/)
|2.3.3         |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier
|2.3.1         |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier
|2.3.2         |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier
|2.3.0         |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier
|2.2.9         |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.1.4](/platform/runtime/machine-image/ami-v614/)<br> [v6.1.4](/platform/runtime/machine-image/ami-v644/) and later |
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
|jruby 9.1.16  |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.4.4](/platform/runtime/machine-image/ami-v644/) |
|jruby 9.1.15  |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.1.4](/platform/runtime/machine-image/ami-v614/) and later |
|jruby 9.1.13  |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.10.4](/platform/runtime/machine-image/ami-v5104/) |
|jruby 9.1.12  |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.7.3](/platform/runtime/machine-image/ami-v573/) [v5.10.4](/platform/runtime/machine-image/ami-v5104/) |
|jruby 9.1.5   |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier |
|jruby 9.1.2   |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier |
|jruby 9.0.0   |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.3.2](/platform/runtime/machine-image/ami-v532/) [v5.10.4](/platform/runtime/machine-image/ami-v5104/) |
|jruby 1.7.27  |- Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.7.3](/platform/runtime/machine-image/ami-v573/) [v5.10.4](/platform/runtime/machine-image/ami-v5104/) and later |
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

| Scala Version  |  OS    |  Machine Image |
|----------------|-----------|-------------
|2.12.5          | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.4.4](/platform/runtime/machine-image/ami-v644) |
|2.12.4          | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.1.4](/platform/runtime/machine-image/ami-v614/) to [v6.3.4](/platform/runtime/machine-image/ami-v634)  |
|2.12.3          | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.8.2](/platform/runtime/machine-image/ami-v582/) |
|2.12.2          | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.7.3](/platform/runtime/machine-image/ami-v573/) |
|2.12.1          | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier |
|2.12.0          | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.5.1](/platform/runtime/machine-image/ami-v551/) and earlier |
|2.11.12         | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.1.4](/platform/runtime/machine-image/ami-v614/) and later |
|2.11.11         | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.7.3](/platform/runtime/machine-image/ami-v573/) to [v5.10.4](/platform/runtime/machine-image/ami-v5104/)  |
|2.11.8          | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.6.1](/platform/runtime/machine-image/ami-v561/) and earlier |
|2.10.7          | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v6.1.4](/platform/runtime/machine-image/ami-v614/) to [v6.3.4](/platform/runtime/machine-image/ami-v634) |
|2.10.6          | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.3.2](/platform/runtime/machine-image/ami-v532/) to [v5.10.4](/platform/runtime/machine-image/ami-v5104/)  |
|2.9.3           | - Ubuntu 14.04<br>- Ubuntu 16.04 | [v5.3.2](/platform/runtime/machine-image/ami-v532/) to [v6.3.4](/platform/runtime/machine-image/ami-v634)<br> [v5.3.2](/platform/runtime/machine-image/ami-v532/) to [v6.1.4](/platform/runtime/machine-image/ami-v614/)   |
