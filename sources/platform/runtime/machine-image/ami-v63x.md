page_main_title: v6.3.x
main_section: Platform
sub_section: Runtime
sub_sub_section: Machine image
page_title: Description of what is available in Machine Image v6.3.x
page_description: A complete list of language versions, Docker versions, packages and tools available in Machine Image v6.3.x
page_keywords: CI/CD, shippable CI/CD, documentation, shippable, config, yml, AMI, Docker

# Machine image v6.3.x (Docker TAG v6.3.x)

**Release Date: **

**What is installed on the machine image?**

* Host Operating System: Ubuntu 14.04 LTS
* Build Container Operating System: Ubuntu 16.04.3 LTS
* Kernel Version: 3.13.0-125-generic
* **Docker Server Version: 17.06.0-ce**
* Storage Driver: aufs
* Root Dir: /data/aufs
* Backing Filesystem: extfs
* Dirperm1 Supported: false
* Cgroup Driver: cgroupfs
* Shippable Official Docker Images with TAG: `v6.3.x`

## Shippable Official Docker Images

These are the images used to run your CI jobs. The default image is picked up based on the `language` you set in your yml. All these images are available on our [Docker drydock Hub](https://hub.docker.com/u/drydock/). The source code is available in our [GitHub dry-dock org](https://github.com/dry-dock)

If you would like to use your own CI images in place of the official images, instructions are [described here](/ci/custom-docker-image/)

These are the official language images in this version:

* [Common components](#common-634)
* [Nodejs](#nod-634)
* [Clojure](#clojure-634)
* [Go](#gol-634)
* [PHP](#php-634)
* [Java](#jav-634)
* [Ruby](#rub-634)
* [Python](#pyt-634)
* [Scala](#sca-634)
* [C/C++](#cpp-634)

<a name="common-634"></a>
### Common components

All language images are built `FROM` a base image that corresponds to the OS version. For example, the language image for Node,js `u16nodall` is built using `u16all` as the base image, and hence has all the packages, CLIs and services installed in the base image.

We have the following base images, one for each supported OS version.

| **OS**       | **Image**             | **Link**                                                                                                | **Packages**                                                                                                                                                                                                                                        | **CLIs**                                                                                                                          | **Services**                                                                                                                                                                                                             |
 |--------------|-----------------------|---------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
 | Ubuntu 16.04 | drydock/aarch32_u16:v6.3.x | - [Docker Hub](https://hub.docker.com/r/drydock/aarch32_u16/) <br>- [GitHub](https://github.com/dry-dock/aarch32_u16) | - build-essential<br>- curl<br>- gcc<br>- gettext<br>- git<br>- htop<br>- jq<br>- libxml2-dev<br>- libxslt-dev<br>- make<br>- nano<br>- openssh-client<br>- openssl<br>- psmisc<br>- python-dev<br>- python-pip<br>- python-software-properties<br>- software-properties-common<br>- sudo<br>- texinfo<br>- unzip <br>- boto <br>- boto3 <br>- virtualenv<br>- wget <br>- libssl-dev <br>-libffi-dev <br>-vim  | - awscli 1.11.91<br>- awsebcli 3.9.0<br>- gcloud 160.0.0<br>- kubectl 1.5.1i<br>- packer 1.1.0 <br>- ansible 2.3.0| |

---
