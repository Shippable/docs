page_title: Description of what is available in Machine Image v5.5.1
page_description: A complete list of language versions, Docker versions, packages and tools available in Machine Image v5.5.1
page_keywords: CI/CD, shippable CI/CD, documentation, shippable, config, yml, AMI, Dockee

# Machine image v5.5.1 (Docker TAG v5.5.1)

**Release Date:** March 11, 2017

**What is installed**

* Operating System: Ubuntu 14.04.5 LTS
* Kernel Version: 3.13.0-117-generic
* **Docker Server Version: 1.13.0**
* Storage Driver: aufs
* Root Dir: /data/aufs
* Backing Filesystem: extfs
* Dirperm1 Supported: true
* Cgroup Driver: cgroupfs
* Shippable Official Docker Images with TAG: `v5.5.1`

## Shippable Official Docker Images
These are the images used to run your CI jobs. The default image is picked up based on the `language` you set in your yml. All these images are available on our [Docker drydock Hub](https://hub.docker.com/u/drydock/). The source code is availabe on our [Github dry-dock org](https://github.com/dry-dock)

If you would like to use your own CI images in place of the official images, instructions are [described here](../shippableyml/#pre_ci_boot)

These are the official language images in this version

* [Nodejs](#nod-532)
* [Python](#pyt-532)
* [Java](#jav-532)
* [Ruby](#rub-532)
* [GO](#gol-532)
* [PHP](#php-532)
* [Clojure](#clo-532)
* [Scala](#sca-532)
* [C/C++](#cpp-532)

<a name="common-532"></a>
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
* gcloud 145.0.0
* jfrog-cli 1.7.0
* kubectl 1.5.1
* packer 0.12.2
* terraform 0.8.7

**Services**

* couchdb 1.6
* elasticsearch 5.1.2
* neo4j 3.1.1
* memcached 1.4.34
* mongodb 3.4
* mysql 5.7
* postgres 9.6
* rabbitmq 3.6
* redis 3.2
* rethinkdb 2.3
* riak 2.2.0
* selenium 3.0.1
* sqllite 3


## Pre-installed official Docker Images
This image ships with these pre-installed images to speed up your CI build process

<a name="nod-532"></a>
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

* 0.10
* 0.12 (default if no runtime specified)
* 4.2.3
* 4.6.0
* 5.12.0
* 6.7.0
* 6.8.0
* 6.9.4
* 7.0.0
* 7.2.1
* 7.3.0
* 7.4.0
* iojs 1.0
* iojs 2.0
* iojs 3.3.1

**Additional packages**

* [Common components](#common-532)
* nvm
* Java 1.8
* Ruby 2.3.3

---

<a name="pyt-532"></a>
### Python
**OS Versions**

* Ubuntu 14.04
	* [Docker Hub](https://hub.docker.com/r/drydock/u14pytall/)
	* [Github](https://github.com/dry-dock/u14pytall)
* Ubuntu 16.04
	* [Docker Hub](https://hub.docker.com/r/drydock/u16pytall/)
	* [Github](https://github.com/dry-dock/u16pytall)

**Language Versions**
These versions are pre-installed on both the OS version images

* 2.6
* 2.7 (default if no runtime specified)
* 3.2
* 3.3
* 3.4
* 3.5
* 3.6
* pypy 4.0.1
* pypy3 2.4.0

**Additional packages**

* [Common components](#common-532)
* virtualenv
* Java 1.8
* Node 7.x
* Ruby 2.3.3

---

<a name="jav-532"></a>
### Java
**OS Versions**

* Ubuntu 14.04
	* [Docker Hub](https://hub.docker.com/r/drydock/u14javall/)
	* [Github](https://github.com/dry-dock/u14javall)
* Ubuntu 16.04
	* [Docker Hub](https://hub.docker.com/r/drydock/u16javall/)
	* [Github](https://github.com/dry-dock/u16javall)

**Language Versions**
These versions are pre-installed on both the OS version images

* openjdk7
* openjdk8
* oraclejdk7
* oraclejdk8

**Additional packages**

* [Common components](#common-532)
* Node 7.x
* Ruby 2.3.3

---


<a name="rub-532"></a>
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

* 1.8.7
* 1.9.3
* 2.0.0
* 2.1.5
* 2.2.1
* 2.2.5
* 2.3.0
* 2.3.1
* 2.3.2
* 2.3.3
* jruby 1.7.19
* jruby 9.0.0
* jruby 9.1.2
* jruby 9.1.5
* ree 1.8.7

**Additional packages**

* [Common components](#common-532)
* rvm
* Java 1.8
* Node 7.x

---

<a name="gol-532"></a>
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

* 1.1
* 1.2
* 1.3
* 1.4
* 1.5
* 1.5.4
* 1.6
* 1.6.4
* 1.7
* 1.7.5

**Additional packages**

* [Common components](#common-532)
* gvm
* Java 1.8
* Node 7.x
* Ruby 2.3.3

---

<a name="php-532"></a>
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

* 5.6
* 7.0
* 7.1

**Additional packages**

* [Common components](#common-532)
* phpenv
* Java 1.8
* Node 7.x
* Ruby 2.3.3

---

<a name="clo-532"></a>
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

* [Common components](#common-532)
* leiningen
* Java 1.8
* Node 7.x
* Ruby 2.3.3

---

<a name="sca-532"></a>
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
* 2.11.8
* 2.12.0
* 2.12.1

**Additional packages**

* [Common components](#common-532)
* sbt
* Java 1.8
* Node 7.x
* Ruby 2.3.3

---


<a name="cpp-532"></a>
### C/C++
**OS Versions**

* Ubuntu 14.04
	* [Docker Hub](https://hub.docker.com/r/drydock/u14scaall/)
	* [Github](https://github.com/dry-dock/u14scaall)
* Ubuntu 16.04
	* [Docker Hub](https://hub.docker.com/r/drydock/u16scaall/)
	* [Github](https://github.com/dry-dock/u16scaall)

**Language Versions**
These versions are pre-installed on both the OS version images

* gcc 6
* clang 3.9.0

**Additional packages**

* [Common components](#common-532)
* Java 1.8
* Node 7.x
* Ruby 2.3.3

---
