main_section: Reference
sub_section: Machine Images
page_title: Description of what is available in Machine Image v5.3.2
page_description: A complete list of language versions, Docker versions, packages and tools available in Machine Image v5.3.2
page_keywords: CI/CD, shippable CI/CD, documentation, shippable, config, yml, AMI, Dockee

# Machine image v5.4.1 (Docker TAG v5.4.1)

**Release Date:** March 11, 2017

**What is installed**

- <i class="ion-ios-minus-empty"> </i> Operating System: Ubuntu 14.04.5 LTS
- <i class="ion-ios-minus-empty"> </i> Kernel Version: 3.19.0-51-generic
- <i class="ion-ios-minus-empty"> </i> **Docker Server Version: 1.13.0**
- <i class="ion-ios-minus-empty"> </i> Storage Driver: aufs
- <i class="ion-ios-minus-empty"> </i> Root Dir: /data/aufs
- <i class="ion-ios-minus-empty"> </i> Backing Filesystem: extfs
- <i class="ion-ios-minus-empty"> </i> Dirperm1 Supported: true
- <i class="ion-ios-minus-empty"> </i> Cgroup Driver: cgroupfs
- <i class="ion-ios-minus-empty"> </i> Shippable Official Docker Images with TAG: `v5.4.1`

## Shippable Official Docker Images
These are the images used to run your CI jobs. The default image is picked up based on the `language` you set in your yml. All these images are available on our [Docker drydock Hub](https://hub.docker.com/u/drydock/). The source code is availabe on our [Github dry-dock org](https://github.com/dry-dock)

If you would like to use your own CI images in place of the official images, instructions are [described here](../shippableyml/#pre_ci_boot)

These are the official language images in this version

- <i class="ion-ios-minus-empty"> </i> [Nodejs](#nod-532)
- <i class="ion-ios-minus-empty"> </i> [Python](#pyt-532)
- <i class="ion-ios-minus-empty"> </i> [Java](#jav-532)
- <i class="ion-ios-minus-empty"> </i> [Ruby](#rub-532)
- <i class="ion-ios-minus-empty"> </i> [GO](#gol-532)
- <i class="ion-ios-minus-empty"> </i> [PHP](#php-532)
- <i class="ion-ios-minus-empty"> </i> [Clojure](#clo-532)
- <i class="ion-ios-minus-empty"> </i> [Scala](#sca-532)
- <i class="ion-ios-minus-empty"> </i> [C/C++](#cpp-532)

<a name="common-532"></a>
### Common components installed

All the images have these components pre-installed

**Packages**

- <i class="ion-ios-minus-empty"> </i> build-essential
- <i class="ion-ios-minus-empty"> </i> curl
- <i class="ion-ios-minus-empty"> </i> gcc
- <i class="ion-ios-minus-empty"> </i> gettext
- <i class="ion-ios-minus-empty"> </i> git
- <i class="ion-ios-minus-empty"> </i> htop
- <i class="ion-ios-minus-empty"> </i> jq
- <i class="ion-ios-minus-empty"> </i> libxml2-dev
- <i class="ion-ios-minus-empty"> </i> libxslt-dev
- <i class="ion-ios-minus-empty"> </i> make
- <i class="ion-ios-minus-empty"> </i> nano
- <i class="ion-ios-minus-empty"> </i> openssh-client
- <i class="ion-ios-minus-empty"> </i> openssl
- <i class="ion-ios-minus-empty"> </i> python-dev
- <i class="ion-ios-minus-empty"> </i> python-pip
- <i class="ion-ios-minus-empty"> </i> python-software-properties
- <i class="ion-ios-minus-empty"> </i> software-properties-common
- <i class="ion-ios-minus-empty"> </i> sudo
- <i class="ion-ios-minus-empty"> </i> texinfo
- <i class="ion-ios-minus-empty"> </i> unzip
- <i class="ion-ios-minus-empty"> </i> virtualenv
- <i class="ion-ios-minus-empty"> </i> wget

**CLIs**

- <i class="ion-ios-minus-empty"> </i> awscli 1.11.44
- <i class="ion-ios-minus-empty"> </i> awsebcli 3.9
- <i class="ion-ios-minus-empty"> </i> gcloud 145.0.0
- <i class="ion-ios-minus-empty"> </i> jfrog-cli 1.7.0
- <i class="ion-ios-minus-empty"> </i> kubectl 1.5.1
- <i class="ion-ios-minus-empty"> </i> packer 0.12.2
- <i class="ion-ios-minus-empty"> </i> terraform 0.8.7

**Services**

- <i class="ion-ios-minus-empty"> </i> couchdb 1.6
- <i class="ion-ios-minus-empty"> </i> elasticsearch 5.1.2
- <i class="ion-ios-minus-empty"> </i> neo4j 3.1.1
- <i class="ion-ios-minus-empty"> </i> memcached 1.4.34
- <i class="ion-ios-minus-empty"> </i> mongodb 3.4
- <i class="ion-ios-minus-empty"> </i> mysql 5.7
- <i class="ion-ios-minus-empty"> </i> postgres 9.6
- <i class="ion-ios-minus-empty"> </i> rabbitmq 3.6
- <i class="ion-ios-minus-empty"> </i> redis 3.2
- <i class="ion-ios-minus-empty"> </i> rethinkdb 2.3
- <i class="ion-ios-minus-empty"> </i> riak 2.2.0
- <i class="ion-ios-minus-empty"> </i> selenium 3.0.1
- <i class="ion-ios-minus-empty"> </i> sqllite 3

## Pre-installed official Docker Images
This image ships with these pre-installed images to speed up your CI build process

<a name="nod-532"></a>
### Node.js
**OS Versions**

Ubuntu 14.04
	  - <i class="ion-ios-minus-empty"> </i> [Docker Hub](https://hub.docker.com/r/drydock/u14nodall/)
	  - <i class="ion-ios-minus-empty"> </i> [Github](https://github.com/dry-dock/u14nodall)
Ubuntu 16.04
	  - <i class="ion-ios-minus-empty"> </i> [Docker Hub](https://hub.docker.com/r/drydock/u16nodall/)
  	- <i class="ion-ios-minus-empty"> </i> [Github](https://github.com/dry-dock/u16nodall)

<br>
**Language Versions**
These versions are pre-installed on both the OS version images

- <i class="ion-ios-minus-empty"> </i> 0.10
- <i class="ion-ios-minus-empty"> </i> 0.12 (default if no runtime specified)
- <i class="ion-ios-minus-empty"> </i> 4.2.3
- <i class="ion-ios-minus-empty"> </i> 4.6.0
- <i class="ion-ios-minus-empty"> </i> 5.12.0
- <i class="ion-ios-minus-empty"> </i> 6.7.0
- <i class="ion-ios-minus-empty"> </i> 6.8.0
- <i class="ion-ios-minus-empty"> </i> 6.9.4
- <i class="ion-ios-minus-empty"> </i> 7.0.0
- <i class="ion-ios-minus-empty"> </i> 7.2.1
- <i class="ion-ios-minus-empty"> </i> 7.3.0
- <i class="ion-ios-minus-empty"> </i> 7.4.0
- <i class="ion-ios-minus-empty"> </i> iojs 1.0
- <i class="ion-ios-minus-empty"> </i> iojs 2.0
- <i class="ion-ios-minus-empty"> </i> iojs 3.3.1

<br>
**Additional packages**

- <i class="ion-ios-minus-empty"> </i> [Common components](#common-532)
- <i class="ion-ios-minus-empty"> </i> nvm
- <i class="ion-ios-minus-empty"> </i> Java 1.8
- <i class="ion-ios-minus-empty"> </i> Ruby 2.3.3

---
<a name="pyt-532"></a>
### Python
**OS Versions**

Ubuntu 14.04

- <i class="ion-ios-minus-empty"> </i> [Docker Hub](https://hub.docker.com/r/drydock/u14pytall/)
- <i class="ion-ios-minus-empty"> </i> [Github](https://github.com/dry-dock/u14pytall)

Ubuntu 16.04

- <i class="ion-ios-minus-empty"> </i> [Docker Hub](https://hub.docker.com/r/drydock/u16pytall/)
- <i class="ion-ios-minus-empty"> </i> [Github](https://github.com/dry-dock/u16pytall)

**Language Versions**
These versions are pre-installed on both the OS version images

- <i class="ion-ios-minus-empty"> </i> 2.6
- <i class="ion-ios-minus-empty"> </i> 2.7 (default if no runtime specified)
- <i class="ion-ios-minus-empty"> </i> 3.2
- <i class="ion-ios-minus-empty"> </i> 3.3
- <i class="ion-ios-minus-empty"> </i> 3.4
- <i class="ion-ios-minus-empty"> </i> 3.5
- <i class="ion-ios-minus-empty"> </i> 3.6
- <i class="ion-ios-minus-empty"> </i> pypy 4.0.1
- <i class="ion-ios-minus-empty"> </i> pypy3 2.4.0

**Additional packages**

- <i class="ion-ios-minus-empty"> </i> [Common components](#common-532)
- <i class="ion-ios-minus-empty"> </i> virtualenv
- <i class="ion-ios-minus-empty"> </i> Java 1.8
- <i class="ion-ios-minus-empty"> </i> Node 7.x
- <i class="ion-ios-minus-empty"> </i> Ruby 2.3.3

<a name="jav-532"></a>
### Java
**OS Versions**

- <i class="ion-ios-minus-empty"> </i> Ubuntu 14.04
	- <i class="ion-ios-minus-empty"> </i> [Docker Hub](https://hub.docker.com/r/drydock/u14javall/)
	- <i class="ion-ios-minus-empty"> </i> [Github](https://github.com/dry-dock/u14javall)
- <i class="ion-ios-minus-empty"> </i> Ubuntu 16.04
	- <i class="ion-ios-minus-empty"> </i> [Docker Hub](https://hub.docker.com/r/drydock/u16javall/)
	- <i class="ion-ios-minus-empty"> </i> [Github](https://github.com/dry-dock/u16javall)

**Language Versions**
These versions are pre-installed on both the OS version images

- <i class="ion-ios-minus-empty"> </i> openjdk7
- <i class="ion-ios-minus-empty"> </i> openjdk8
- <i class="ion-ios-minus-empty"> </i> oraclejdk7
- <i class="ion-ios-minus-empty"> </i> oraclejdk8

**Additional packages**

- <i class="ion-ios-minus-empty"> </i> [Common components](#common-532)
- <i class="ion-ios-minus-empty"> </i> Node 7.x
- <i class="ion-ios-minus-empty"> </i> Ruby 2.3.3

---
<a name="rub-532"></a>
### Ruby
**OS Versions**

- <i class="ion-ios-minus-empty"> </i> Ubuntu 14.04
	- <i class="ion-ios-minus-empty"> </i> [Docker Hub](https://hub.docker.com/r/drydock/u14ruball/)
	- <i class="ion-ios-minus-empty"> </i> [Github](https://github.com/dry-dock/u14ruball)
- <i class="ion-ios-minus-empty"> </i> Ubuntu 16.04
	- <i class="ion-ios-minus-empty"> </i> [Docker Hub](https://hub.docker.com/r/drydock/u16ruball/)
	- <i class="ion-ios-minus-empty"> </i> [Github](https://github.com/dry-dock/u16ruball)

**Language Versions**
These versions are pre-installed on both the OS version images

- <i class="ion-ios-minus-empty"> </i> 1.8.7
- <i class="ion-ios-minus-empty"> </i> 1.9.3
- <i class="ion-ios-minus-empty"> </i> 2.0.0
- <i class="ion-ios-minus-empty"> </i> 2.1.5
- <i class="ion-ios-minus-empty"> </i> 2.2.1
- <i class="ion-ios-minus-empty"> </i> 2.2.5
- <i class="ion-ios-minus-empty"> </i> 2.3.0
- <i class="ion-ios-minus-empty"> </i> 2.3.1
- <i class="ion-ios-minus-empty"> </i> 2.3.2
- <i class="ion-ios-minus-empty"> </i> 2.3.3
- <i class="ion-ios-minus-empty"> </i> jruby 1.7.19
- <i class="ion-ios-minus-empty"> </i> jruby 9.0.0
- <i class="ion-ios-minus-empty"> </i> jruby 9.1.2
- <i class="ion-ios-minus-empty"> </i> jruby 9.1.5
- <i class="ion-ios-minus-empty"> </i> ree 1.8.7

**Additional packages**

- <i class="ion-ios-minus-empty"> </i> [Common components](#common-532)
- <i class="ion-ios-minus-empty"> </i> rvm
- <i class="ion-ios-minus-empty"> </i> Java 1.8
- <i class="ion-ios-minus-empty"> </i> Node 7.x

---
<a name="gol-532"></a>
### GO
**OS Versions**

- <i class="ion-ios-minus-empty"> </i> Ubuntu 14.04
	- <i class="ion-ios-minus-empty"> </i> [Docker Hub](https://hub.docker.com/r/drydock/u14golall/)
	- <i class="ion-ios-minus-empty"> </i> [Github](https://github.com/dry-dock/u14golall)
- <i class="ion-ios-minus-empty"> </i> Ubuntu 16.04
	- <i class="ion-ios-minus-empty"> </i> [Docker Hub](https://hub.docker.com/r/drydock/u16golall/)
	- <i class="ion-ios-minus-empty"> </i> [Github](https://github.com/dry-dock/u16golall)

**Language Versions**
These versions are pre-installed on both the OS version images

- <i class="ion-ios-minus-empty"> </i> 1.1
- <i class="ion-ios-minus-empty"> </i> 1.2
- <i class="ion-ios-minus-empty"> </i> 1.3
- <i class="ion-ios-minus-empty"> </i> 1.4
- <i class="ion-ios-minus-empty"> </i> 1.5
- <i class="ion-ios-minus-empty"> </i> 1.5.4
- <i class="ion-ios-minus-empty"> </i> 1.6
- <i class="ion-ios-minus-empty"> </i> 1.6.4
- <i class="ion-ios-minus-empty"> </i> 1.7
- <i class="ion-ios-minus-empty"> </i> 1.7.5

**Additional packages**

- <i class="ion-ios-minus-empty"> </i> [Common components](#common-532)
- <i class="ion-ios-minus-empty"> </i> gvm
- <i class="ion-ios-minus-empty"> </i> Java 1.8
- <i class="ion-ios-minus-empty"> </i> Node 7.x
- <i class="ion-ios-minus-empty"> </i> Ruby 2.3.3

---
<a name="php-532"></a>
### PHP
**OS Versions**

- <i class="ion-ios-minus-empty"> </i> Ubuntu 14.04
	- <i class="ion-ios-minus-empty"> </i> [Docker Hub](https://hub.docker.com/r/drydock/u14phpall/)
	- <i class="ion-ios-minus-empty"> </i> [Github](https://github.com/dry-dock/u14phpall)
- <i class="ion-ios-minus-empty"> </i> Ubuntu 16.04
	- <i class="ion-ios-minus-empty"> </i> [Docker Hub](https://hub.docker.com/r/drydock/u16phpall/)
	- <i class="ion-ios-minus-empty"> </i> [Github](https://github.com/dry-dock/u16phpall)

**Language Versions**
These versions are pre-installed on both the OS version images

- <i class="ion-ios-minus-empty"> </i> 5.6
- <i class="ion-ios-minus-empty"> </i> 7.0
- <i class="ion-ios-minus-empty"> </i> 7.1

**Additional packages**

- <i class="ion-ios-minus-empty"> </i> [Common components](#common-532)
- <i class="ion-ios-minus-empty"> </i> phpenv
- <i class="ion-ios-minus-empty"> </i> Java 1.8
- <i class="ion-ios-minus-empty"> </i> Node 7.x
- <i class="ion-ios-minus-empty"> </i> Ruby 2.3.3

---
<a name="clo-532"></a>
### Clojure
**OS Versions**

- <i class="ion-ios-minus-empty"> </i> Ubuntu 14.04
	- <i class="ion-ios-minus-empty"> </i> [Docker Hub](https://hub.docker.com/r/drydock/u14cloall/)
	- <i class="ion-ios-minus-empty"> </i> [Github](https://github.com/dry-dock/u14cloall)
- <i class="ion-ios-minus-empty"> </i> Ubuntu 16.04
	- <i class="ion-ios-minus-empty"> </i> [Docker Hub](https://hub.docker.com/r/drydock/u16cloall/)
	- <i class="ion-ios-minus-empty"> </i> [Github](https://github.com/dry-dock/u16cloall)

**Language Versions**
These versions are pre-installed on both the OS version images

- <i class="ion-ios-minus-empty"> </i> 1.3.0
- <i class="ion-ios-minus-empty"> </i> 1.4.0
- <i class="ion-ios-minus-empty"> </i> 1.5.1
- <i class="ion-ios-minus-empty"> </i> 1.6.0
- <i class="ion-ios-minus-empty"> </i> 1.7.0
- <i class="ion-ios-minus-empty"> </i> 1.8.0

**Additional packages**

- <i class="ion-ios-minus-empty"> </i> [Common components](#common-532)
- <i class="ion-ios-minus-empty"> </i> leiningen
- <i class="ion-ios-minus-empty"> </i> Java 1.8
- <i class="ion-ios-minus-empty"> </i> Node 7.x
- <i class="ion-ios-minus-empty"> </i> Ruby 2.3.3

---
<a name="sca-532"></a>
### Scala
**OS Versions**

- <i class="ion-ios-minus-empty"> </i> Ubuntu 14.04
	- <i class="ion-ios-minus-empty"> </i> [Docker Hub](https://hub.docker.com/r/drydock/u14scaall/)
	- <i class="ion-ios-minus-empty"> </i> [Github](https://github.com/dry-dock/u14scaall)
- <i class="ion-ios-minus-empty"> </i> Ubuntu 16.04
	- <i class="ion-ios-minus-empty"> </i> [Docker Hub](https://hub.docker.com/r/drydock/u16scaall/)
	- <i class="ion-ios-minus-empty"> </i> [Github](https://github.com/dry-dock/u16scaall)

**Language Versions**
These versions are pre-installed on both the OS version images

- <i class="ion-ios-minus-empty"> </i> 2.9.3
- <i class="ion-ios-minus-empty"> </i> 2.10.6
- <i class="ion-ios-minus-empty"> </i> 2.11.8
- <i class="ion-ios-minus-empty"> </i> 2.12.0
- <i class="ion-ios-minus-empty"> </i> 2.12.1

**Additional packages**

- <i class="ion-ios-minus-empty"> </i> [Common components](#common-532)
- <i class="ion-ios-minus-empty"> </i> sbt
- <i class="ion-ios-minus-empty"> </i> Java 1.8
- <i class="ion-ios-minus-empty"> </i> Node 7.x
- <i class="ion-ios-minus-empty"> </i> Ruby 2.3.3

---
<a name="cpp-532"></a>
### C/C++
**OS Versions**

- <i class="ion-ios-minus-empty"> </i> Ubuntu 14.04
	- <i class="ion-ios-minus-empty"> </i> [Docker Hub](https://hub.docker.com/r/drydock/u14scaall/)
	- <i class="ion-ios-minus-empty"> </i> [Github](https://github.com/dry-dock/u14scaall)
- <i class="ion-ios-minus-empty"> </i> Ubuntu 16.04
	- <i class="ion-ios-minus-empty"> </i> [Docker Hub](https://hub.docker.com/r/drydock/u16scaall/)
	- <i class="ion-ios-minus-empty"> </i> [Github](https://github.com/dry-dock/u16scaall)

**Language Versions**
These versions are pre-installed on both the OS version images

- <i class="ion-ios-minus-empty"> </i> gcc 6
- <i class="ion-ios-minus-empty"> </i> clang 3.9.0

**Additional packages**

- <i class="ion-ios-minus-empty"> </i> [Common components](#common-532)
- <i class="ion-ios-minus-empty"> </i> Java 1.8
- <i class="ion-ios-minus-empty"> </i> Node 7.x
- <i class="ion-ios-minus-empty"> </i> Ruby 2.3.3

---
