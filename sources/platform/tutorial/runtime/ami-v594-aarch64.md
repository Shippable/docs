page_main_title: AMI v5.9.4 aarch64
main_section: Platform
sub_section: Tutorials
sub_sub_section: Runtime
page_title: Description of what is supported by Machine Image v5.9.4
page_description: A complete list of language versions, Docker versions, packages and tools available in Machine Image v5.9.4
page_keywords: CI/CD, shippable CI/CD, documentation, shippable, config, yml, AMI, Docker

# aarch64 Machine Image v5.9.4 (Docker TAG v5.9.4)

**Release Date:** September 28, 2017

**What is installed**

* Operating System: Ubuntu 16.04
* Kernel Version: 4.10.0-26-generic
* **Docker Server Version: 17.06**
* Storage Driver: aufs
* Storage Root Dir: /var/lib/docker/aufs
* Docker Root Dir: /var/lib/docker
* Backing Filesystem: extfs
* Dirperm1 Supported: true
* Cgroup Driver: cgroupfs

** Note: ONLY [custom nodes](/platform/tutorial/runtime/custom-nodes/) are currently supported. Builds on [dynamic nodes](/platform/tutorial/runtime/dynamic-nodes/) for aarch64 architecture are not supported for this version of AMI
**

## Shippable Official Docker Images
These are the images used to run your CI jobs. The default image is picked up
based on the `language` you set in your yml. All these images are available on
our [Docker drydockaarch64 Hub](https://hub.docker.com/u/drydockaarch64/). The source code is
available on our [Github dry-dock-aarch64 org](https://github.com/dry-dock-aarch64)

If you would like to use your own CI images in place of the official images,
instructions are [described here](/ci/custom-docker-image/)

These are the official language images in this version

* [Python](#pyt-592)

<a name="common-532"></a>
### Common components installed

**Packages**

* build-essential
* curl
* gcc
* gettext
* git
* htop
* jq
* libxml2-dev
* libxslt-dev
* make
* nano
* openssh-client
* openssl
* python-dev
* python-pip
* python-software-properties
* software-properties-common
* sudo
* texinfo
* unzip
* virtualenv
* wget

**CLIs**

* ansible 2.3.0.0
* awscli 1.11.91
* awsebcli 3.9.0
* gcloud 160.0.0
* kubectl 1.5.1
* yarn - 0.24.5-1

<a name="pyt-592"></a>
### Python
**OS Versions**

* Ubuntu 16.04
	* [Docker Hub](https://hub.docker.com/r/drydockaarch64/u16pyt/tags/)
	* [Github](https://github.com/dry-dock-aarch64/u16pyt)

**Language Versions**
These versions are pre-installed on u16pyt image

* 2.7.12

**Additional packages**

* [Common components](#common-532)
* virtualenv
* Java 1.8
* Node 7.x
* Ruby 2.3.3

