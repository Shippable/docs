page_main_title: v5.7.3
main_section: Platform
sub_section: Runtime
sub_sub_section: Machine image
page_title: Description of what is available in Machine Image v5.7.3
page_description: A complete list of language versions, Docker versions, packages and tools available in Machine Image v5.7.3
page_keywords: CI/CD, shippable CI/CD, documentation, shippable, config, yml, AMI, Docker

# Machine image v5.7.3 (Docker TAG v5.7.3)

**Release Date:** Jul 20, 2017

**What is installed**

* Operating System: Ubuntu 14.04.5 LTS
* Kernel Version: 3.13.0-121-generic
* **Docker Server Version: 1.13.0**
* Storage Driver: aufs
* Root Dir: /data/aufs
* Backing Filesystem: extfs
* Dirperm1 Supported: false
* Cgroup Driver: cgroupfs
* Shippable Official Docker Images with TAG: `v5.7.3`

## Shippable Official Docker Images
These are the images used to run your CI jobs. The default image is picked up based on the `language` you set in your yml. All these images are available on our [Docker drydock Hub](https://hub.docker.com/u/drydock/). The source code is availabe on our [Github dry-dock org](https://github.com/dry-dock)

If you would like to use your own CI images in place of the official images, instructions are [described here](/ci/custom-docker-image/)

These are the official language images in this version

* [Nodejs](#nod-573)
* [Python](#pyt-573)
* [Java](#jav-573)
* [Ruby](#rub-573)
* [GO](#gol-573)
* [PHP](#php-573)
* [Clojure](#clo-573)
* [Scala](#sca-573)
* [C/C++](#cpp-573)

<a name="common-573"></a>
### Common components installed

All the images have these components pre-installed

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
* psmisc
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

* awscli 1.11.44
* awsebcli 3.9
* gcloud 160.0.0
* jfrog-cli 1.7.0
* kubectl 1.5.1
* packer 0.12.2
* terraform 0.8.7

**Services on ubuntu 14.04**

* cassandra 3.11
* couchdb 1.6
* elasticsearch 5.5.0
* neo4j 3.2.2
* memcached 1.4.39
* mongodb 3.4.6
* mysql 5.6
* postgres 9.6.3
* rabbitmq 3.6.10
* redis 3.2.9
* rethinkdb 2.3.5
* riak 2.2.3
* selenium 3.4.0
* sqllite 3.19.3

**Services on ubuntu 16.04**

* cassandra 3.11
* couchdb 1.6
* elasticsearch 5.5.0
* neo4j 3.2.2
* memcached 1.4.39
* mongodb 3.4.6
* mysql 5.7.18
* postgres 9.6.3
* rabbitmq 3.6.10
* redis 3.2.9
* rethinkdb 2.3.5
* riak 2.2.3
* selenium 3.4.0
* sqllite 3.19.3

## Pre-installed official Docker Images
This image ships with these pre-installed images to speed up your CI build process

<a name="nod-573"></a>
### Node.js
**OS Versions**

* Ubuntu 14.04
	* [Docker Hub](https://hub.docker.com/r/drydock/u14nodall/)
	* [Github](https://github.com/dry-dock/u14nodall)
* Ubuntu 16.04
	* [Docker Hub](https://hub.docker.com/r/drydock/u16nodall/)
	* [Github](https://github.com/dry-dock/u16nodall)

**Language Versions**
These versions are pre-installed on both the OS version images

* 4.8.4
* 5.12.0
* 6.11.1
* 7.10.1
* 8.1.4

**Additional packages on ubuntu 14.04**

* [Common components](#common-573)
* nvm
* Java  1.8.0
* Ruby 2.3.3
* Yarn 0.24.5

**Additional packages on ubuntu 16.04**

* [Common components](#common-573)
* nvm
* Java  1.8.0
* Ruby 2.3.3
* Yarn 0.24.5

---

<a name="pyt-573"></a>
### Python
**OS Versions**

* Ubuntu 14.04
	* [Docker Hub](https://hub.docker.com/r/drydock/u14pytall/)
	* [Github](https://github.com/dry-dock/u14pytall)
* Ubuntu 16.04
	* [Docker Hub](https://hub.docker.com/r/drydock/u16pytall/)
	* [Github](https://github.com/dry-dock/u16pytall)

**Language Versions**
These versions are pre-installed on ubuntu 14.04 image

* 2.7.12
* 3.4.3
* 3.5.3
* 3.6.1
* pypy2 5.8.0
* pypy3 5.8.0

These versions are pre-installed on ubuntu 16.04 image

* 2.7.12
* 3.4.5
* 3.5.2
* 3.6.1
* pypy2 5.8.0
* pypy3 5.8.0

**Additional packages on ubuntu 14.04**

* [Common components](#common-573)
* virtualenv
* Java 1.8.0
* Node 4.8.3
* Ruby 2.3.3

**Additional packages on ubuntu 16.04**

* [Common components](#common-573)
* virtualenv
* Java 1.8.0
* Node 7.10.0
* Ruby 2.3.3

---

<a name="jav-573"></a>
### Java
**OS Versions**

* Ubuntu 14.04
	* [Docker Hub](https://hub.docker.com/r/drydock/u14javall/)
	* [Github](https://github.com/dry-dock/u14javall)
* Ubuntu 16.04
	* [Docker Hub](https://hub.docker.com/r/drydock/u16javall/)
	* [Github](https://github.com/dry-dock/u16javall)

**Language Versions**
These versions are pre-installed on Ubuntu 14.04 image

* openjdk7
* openjdk8
* oraclejdk8
* oraclejdk9

These versions are pre-installed on Ubuntu 16.04 image

* openjdk7
* openjdk8
* openjdk9
* oraclejdk8
* oraclejdk9

**Additional packages on ubuntu 14.04**

* [Common components](#common-573)
* Node 4.8.3
* Ruby 2.3.3

**Additional packages on ubuntu 16.04**

* [Common components](#common-573)
* Node 7.10.0
* Ruby 2.3.3

---


<a name="rub-573"></a>
### Ruby
**OS Versions**

* Ubuntu 14.04
	* [Docker Hub](https://hub.docker.com/r/drydock/u14ruball/)
	* [Github](https://github.com/dry-dock/u14ruball)
* Ubuntu 16.04
	* [Docker Hub](https://hub.docker.com/r/drydock/u16ruball/)
	* [Github](https://github.com/dry-dock/u16ruball)

**Language Versions**
These versions are pre-installed on both the OS version images

* 2.2.7
* 2.3.4
* 2.4.1
* jruby 1.7.27
* jruby 9.0.0
* jruby 9.1.12

**Additional packages on ubuntu 14.04**

* [Common components](#common-573)
* rvm 1.29.2
* Java 1.8.0
* Node 4.8.3

**Additional packages on ubuntu 16.04**

* [Common components](#common-573)
* rvm 1.29.1
* Java 1.8.0
* Node 4.8.3

---

<a name="gol-573"></a>
### GO
**OS Versions**

* Ubuntu 14.04
	* [Docker Hub](https://hub.docker.com/r/drydock/u14golall/)
	* [Github](https://github.com/dry-dock/u14golall)
* Ubuntu 16.04
	* [Docker Hub](https://hub.docker.com/r/drydock/u16golall/)
	* [Github](https://github.com/dry-dock/u16golall)

**Language Versions**
These versions are pre-installed on both the OS version images

* 1.7.6
* 1.8.3

**Additional packages**

* [Common components](#common-573)
* gvm 1.0.22
* Java 1.8.10
* Node 4.8.3
* Ruby 2.3.3

---

<a name="php-573"></a>
### PHP
**OS Versions**

* Ubuntu 14.04
	* [Docker Hub](https://hub.docker.com/r/drydock/u14phpall/)
	* [Github](https://github.com/dry-dock/u14phpall)
* Ubuntu 16.04
	* [Docker Hub](https://hub.docker.com/r/drydock/u16phpall/)
	* [Github](https://github.com/dry-dock/u16phpall)

**Language Versions**
These versions are pre-installed on both the OS version images

* 5.6.30
* 7.0.20
* 7.1.6

**Additional packages on ubuntu 14.04**

* [Common components](#common-573)
* phpenv 1.1.1-2-g615f844
* Java 1.8.0
* Node 4.8.3
* Ruby 2.3.3

**Additional packages on ubuntu 16.04**

* [Common components](#common-573)
* phpenv 1.1.1-2-g615f844
* Java 1.8.0
* Node 7.10.0
* Ruby 2.3.3
---

<a name="clo-573"></a>
### Clojure
**OS Versions**

* Ubuntu 14.04
	* [Docker Hub](https://hub.docker.com/r/drydock/u14cloall/)
	* [Github](https://github.com/dry-dock/u14cloall)
* Ubuntu 16.04
	* [Docker Hub](https://hub.docker.com/r/drydock/u16cloall/)
	* [Github](https://github.com/dry-dock/u16cloall)

**Language Versions**
These versions are pre-installed on both the OS version images

* 1.3.0
* 1.4.0
* 1.5.1
* 1.6.0
* 1.7.0
* 1.8.0

**Additional packages**

* [Common components](#common-573)
* leiningen
* Java 1.8
* Node 7.x
* Ruby 2.3.3

---

<a name="sca-573"></a>
### Scala
**OS Versions**

* Ubuntu 14.04
	* [Docker Hub](https://hub.docker.com/r/drydock/u14scaall/)
	* [Github](https://github.com/dry-dock/u14scaall)
* Ubuntu 16.04
	* [Docker Hub](https://hub.docker.com/r/drydock/u16scaall/)
	* [Github](https://github.com/dry-dock/u16scaall)

**Language Versions**
These versions are pre-installed on both the OS version images

* 2.9.3
* 2.10.6
* 2.11.11
* 2.12.2

**Additional packages on ubuntu 14.04**

* [Common components](#common-573)
* sbt
* Java 1.8.0
* Node 4.8.3
* Ruby 2.3.3

**Additional packages on ubuntu 16.04**

* [Common components](#common-573)
* sbt
* Java 1.8.0
* Node 7.10.0
* Ruby 2.3.3

---


<a name="cpp-573"></a>
### C/C++
**OS Versions**

* Ubuntu 14.04
	* [Docker Hub](https://hub.docker.com/r/drydock/u14cppall/)
	* [Github](https://github.com/dry-dock/u14cppall)
* Ubuntu 16.04
	* [Docker Hub](https://hub.docker.com/r/drydock/u16cppall/)
	* [Github](https://github.com/dry-dock/u16cppall)

**Language Versions**
These versions are pre-installed on both the OS version images

* gcc 7.1
* clang 4.0.0

**Additional packages on ubuntu 14.04**

* [Common components](#common-573)
* Java 1.8.0
* Node 4.8.3
* Ruby 2.3.3

**Additional packages on ubuntu 16.04**

* [Common components](#common-573)
* Java 1.8.0
* Node 7.10.0
* Ruby 2.3.3

---
