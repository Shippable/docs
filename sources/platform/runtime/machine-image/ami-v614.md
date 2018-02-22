page_main_title: v6.1.4
main_section: Platform
sub_section: Runtime
sub_sub_section: Machine image
page_title: Description of what is available in Machine Image v6.1.4
page_description: A complete list of language versions, Docker versions, packages and tools available in Machine Image v6.1.4
page_keywords: CI/CD, shippable CI/CD, documentation, shippable, config, yml, AMI, Docker

# Machine image v6.1.4 (Docker TAG v6.1.4)

**Release Date: October 27, 2017**

**What is installed on the machine image?**

* Operating System: Ubuntu 16.04.3 LTS
* Kernel Version: 3.13.0-125-generic
* **Docker Server Version: 17.06.0-ce**
* Storage Driver: aufs
* Root Dir: /data/aufs
* Backing Filesystem: extfs
* Dirperm1 Supported: false
* Cgroup Driver: cgroupfs
* Shippable Official Docker Images with TAG: `v6.1.4`

## Shippable Official Docker Images

These are the images used to run your CI jobs. The default image is picked up based on the `language` you set in your yml. All these images are available on our [Docker drydock Hub](https://hub.docker.com/u/drydock/). The source code is available in our [Github dry-dock org](https://github.com/dry-dock)

If you would like to use your own CI images in place of the official images, instructions are [described here](/ci/custom-docker-image/)

These are the official language images in this version:

* [Common components](#common-614)
* [Nodejs](#nod-614)
* [Python](#pyt-614)
* [Java](#jav-614)
* [Ruby](#rub-614)
* [GO](#gol-614)
* [PHP](#php-614)
* [Clojure](#clo-614)
* [Scala](#sca-614)
* [C/C++](#cpp-614)

<a name="common-614"></a>
### Common components

All language images are built `FROM` a base image that corresponds to the OS version. For example, the language image for Node,js `u16nodall` is built using `u16all` as the base image, and hence has all the packages, CLIs and services installed in the base image.

We have the following base images, one for each supported OS version.

| **OS**       | **Image**             | **Link**                                                                                                | **Packages**                                                                                                                                                                                                                                        | **CLIs**                                                                                                                          | **Services**                                                                                                                                                                                                             |
 |--------------|-----------------------|---------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
 | Ubuntu 16.04 | drydock/u16all:v6.1.4 | - [Docker Hub](https://hub.docker.com/r/drydock/u16all/),<br>- [Github](https://github.com/dry-dock/u16all) | - build-essential<br>- curl<br>- gcc<br>- gettext<br>- git<br>- htop<br>- jq<br>- libxml2-dev<br>- libxslt-dev<br>- make<br>- nano<br>- openssh-client<br>- openssl<br>- psmisc<br>- python-dev<br>- python-pip<br>- python-software-properties<br>- software-properties-common<br>- sudo<br>- texinfo<br>- unzip<br>- virtualenv<br>- wget | - awscli 1.11.164<br>- awsebcli 3.11.0<br>- gcloud 173.0.0<br>- jfrog-cli 1.10.1<br>- kubectl 1.8.0<br>- packer 1.1.0<br>- terraform 0.10.0<br>- azure 2.0.25 | - cassandra 3.11<br>- couchdb 2.1<br>- elasticsearch 6.1.1<br>- neo4j 3.3.1<br>- memcached 1.5.4<br>- mongodb 3.6.2<br>- mysql 5.7.20<br>- postgres 9.6.5<br>- rabbitmq 3.6.14<br>- redis 4.0.7<br>- rethinkdb 2.3.6<br>- riak 2.2.3<br>- selenium 3.8.1<br>- sqllite 3.22.0 |
 | Ubuntu 14.04 | drydock/u14all:v6.1.4 | - [Docker Hub](https://hub.docker.com/r/drydock/u14all/),<br>- [Github](https://github.com/dry-dock/u14all) | <br>- build-essential<br>- curl<br>- gcc<br>- gettext<br>- git<br>- htop<br>- jq<br>- libxml2-dev<br>- libxslt-dev<br>- make<br>- nano<br>- openssh-client<br>- openssl<br>- psmisc<br>- python-dev<br>- python-pip<br>- python-software-properties<br>- software-properties-common<br>- sudo<br>- texinfo<br>- unzip<br>- virtualenv<br>- wget | - awscli 1.11.164<br>- awsebcli 3.11.0<br>- gcloud 173.0.0<br>- jfrog-cli 1.10.1<br>- kubectl 1.8.0<br>- packer 1.1.0<br>- terraform 0.10.0<br>- azure 2.0.25 | - cassandra 3.11<br>- couchdb 2.1<br>- elasticsearch 6.1.1<br>- neo4j 3.3.1<br>- memcached 1.5.4<br>- mongodb 3.6.2<br>- mysql 5.7.20<br>- postgres 10.1<br>- rabbitmq 3.6.14<br>- redis 4.0.7<br>- rethinkdb 2.3.6<br>- riak 2.2.3<br>- selenium 3.8.1<br>- sqllite 3.22.0 |

<a name="nod-614"></a>
### Node.js

 | OS           | Image                    | Link                                                                                                          | Language versions                                                 | Additional packages                                                                |
 |--------------|--------------------------|---------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------|------------------------------------------------------------------------------------|
 | Ubuntu 16.04 | drydock/u16nodall:v6.1.4 | [Docker Hub](https://hub.docker.com/r/drydock/u16nodall/)<br> [Github](https://github.com/dry-dock/u16nodall) | - 4.8.7<br>- 5.12.0<br>- 6.11.5<br>- 7.10.1<br>- 8.1.4<br>- 8.6.0 <br>- 9.4.0 | [Common components](#common-614)<br>nvm<br>Java 1.8.0<br>Ruby 2.3.3<br>Yarn 1.2.1 |
 | Ubuntu 14.04 | drydock/u14nodall:v6.1.4 | [Docker Hub](https://hub.docker.com/r/drydock/u14nodall/)<br>[Github](https://github.com/dry-dock/u14nodall)  | - 4.8.7<br>- 5.12.0<br>- 6.11.5<br>- 7.10.1<br>- 8.1.4<br>- 8.6.0 <br>- 9.4.0 | [Common components](#common-614)<br>nvm<br>Java 1.8.0<br>Ruby 2.3.3<br>Yarn 1.2.1 |

---

<a name="pyt-614"></a>
### Python

 | OS           | Image                    | Link                                                                                                      | Language versions                                       | Additional packages                                                                 |
 |--------------|--------------------------|-----------------------------------------------------------------------------------------------------------|---------------------------------------------------------|-------------------------------------------------------------------------------------|
 | Ubuntu 16.04 | drydock/u16pytall:v6.1.4 | [Docker Hub](https://hub.docker.com/r/drydock/u16pytall/)<br> [Github](https://github.com/dry-dock/u16pytall) |- 2.7.12<br>- 3.4.5<br>- 3.5.2<br>- 3.6.4<br>- pypy2 5.10.0<br>- pypy3 5.10.1 | - [Common components](#common-614)<br>- virtualenv<br>- Java 1.8.0<br>- Node 7.10.0<br>- Ruby 2.3.3 |
 | Ubuntu 14.04 | drydock/u14pytall:v6.1.4 | [Docker Hub](https://hub.docker.com/r/drydock/u14pytall/)<br>[Github](https://github.com/dry-dock/u14pytall)  | - 2.7.12<br>- 3.4.3<br>- 3.8.1<br>- 3.6.4<br>- pypy2 5.10.0<br>- pypy3 5.10.1 | - [Common components](#common-614)<br>- virtualenv<br>- Java 1.8.0<br>- Node 4.8.7<br>- Ruby 2.3.3  |

---

<a name="jav-614"></a>
### Java


 | OS           | Image                    | Link                                                                                                          | Language versions                                      | Additional packages                                         |
 |--------------|--------------------------|---------------------------------------------------------------------------------------------------------------|--------------------------------------------------------|-------------------------------------------------------------|
 | Ubuntu 16.04 | drydock/u16javall:v6.1.4 | - [Docker Hub](https://hub.docker.com/r/drydock/u16javall/),<br>- [Github](https://github.com/dry-dock/u16javall) | - openjdk7<br>- openjdk8<br>- openjdk9<br>- oraclejdk8<br>- oraclejdk9 | - [Common components](#common-614)<br>- Node 7.10.0<br>- Ruby 2.3.3 <br>- Gradle 4.2.1 <br>- Android-sdk 26.0.1 (to be used with openjdk8/oraclejdk8)|
 | Ubuntu 14.04 | drydock/u14javall:v6.1.4 | <br>- [Docker Hub](https://hub.docker.com/r/drydock/u14javall/),<br>- [Github](https://github.com/dry-dock/u14javall) | - openjdk7<br>- openjdk8<br>- openjdk9<br>- oraclejdk8<br>- oraclejdk9           | - [Common components](#common-614)<br>- Node 4.8.7<br>- Ruby 2.3.3 <br>- Gradle 4.2.1 <br>- Android-sdk 26.0.1 (to be used with openjdk8/oraclejdk8) |

---


<a name="rub-614"></a>
### Ruby

 | OS           | Image                    | Link                                                                                                          | Language versions                                              | Additional packages                                                    |
 |--------------|--------------------------|---------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------|------------------------------------------------------------------------|
 | Ubuntu 16.04 | drydock/u16ruball:v6.1.4 | - [Docker Hub](https://hub.docker.com/r/drydock/u16ruball/),<br>- [Github](https://github.com/dry-dock/u16ruball) | - 2.2.9<br>- 2.3.6<br>- 2.4.4<br>- jruby 1.7.27<br>- jruby 9.1.15 | - [Common components](#common-614)<br>- rvm 1.29.2<br>- Java 1.8.0<br>- Node 4.8.7 |
 | Ubuntu 14.04 | drydock/u14ruball:v6.1.4 | <br>- [Docker Hub](https://hub.docker.com/r/drydock/u14ruball/),<br>- [Github](https://github.com/dry-dock/u14ruball) |- 2.2.9<br>- 2.3.6<br>- 2.4.4<br>- jruby 1.7.27<br>- jruby 9.1.15 | - [Common components](#common-614)<br>- rvm 1.29.2<br>- Java 1.8.0<br>- Node 7.10.1 |

---

<a name="gol-614"></a>
### GO

 | OS           | Image                    | Link                                                                                                          | Language versions | Additional packages                                                                 |
 |--------------|--------------------------|---------------------------------------------------------------------------------------------------------------|-------------------|-------------------------------------------------------------------------------------|
 | Ubuntu 16.04 | drydock/u16golall:v6.1.4 | - [Docker Hub](https://hub.docker.com/r/drydock/u16golall/),<br>- [Github](https://github.com/dry-dock/u16golall) | - 1.7.6<br>- 1.8.5<br>- 1.9.2    | - [Common components](#common-614)<br>- gvm 1.0.22<br>- Java 1.8.10<br>- Node 4.8.7<br>- Ruby 2.3.3 |
 | Ubuntu 14.04 | drydock/u14golall:v6.1.4 | - [Docker Hub](https://hub.docker.com/r/drydock/u14golall/),<br>- [Github](https://github.com/dry-dock/u14golall) | - 1.7.6<br>- 1.8.5<br>- 1.9.2    | - [Common components](#common-614)<br>- gvm 1.0.22<br>- Java 1.8.10<br>- Node 4.8.7<br>- Ruby 2.3.3 |

---

<a name="php-614"></a>
### PHP

 | OS           | Image                    | Link                                                                                                          | Language versions       | Additional packages                                                                              |
 |--------------|--------------------------|---------------------------------------------------------------------------------------------------------------|-------------------------|--------------------------------------------------------------------------------------------------|
 | Ubuntu 16.04 | drydock/u16phpall:v6.1.4 | - [Docker Hub](https://hub.docker.com/r/drydock/u16phpall/),<br>- [Github](https://github.com/dry-dock/u16phpall) | - 5.6.32<br>- 7.0.26<br>- 7.1.12 | - [Common components](#common-614)<br>- phpenv 1.1.1-2-g615f844<br>- Java 1.8.0<br>- Node 7.10.0<br>- Ruby 2.3.3 |
 | Ubuntu 14.04 | drydock/u14phpall:v6.1.4 | - [Docker Hub](https://hub.docker.com/r/drydock/u14phpall/),<br>- [Github](https://github.com/dry-dock/u14phpall) | - 5.6.32<br>- 7.0.26<br>- 7.1.12 | - [Common components](#common-614)<br>- phpenv 1.1.1-2-g615f844<br>- Java 1.8.0<br>- Node 4.8.7<br>- Ruby 2.3.3  |

---

<a name="clo-614"></a>
### Clojure

 | OS           | Image                    | Link                                                                                                          | Language versions                          | Additional packages                                                           |
 |--------------|--------------------------|---------------------------------------------------------------------------------------------------------------|--------------------------------------------|-------------------------------------------------------------------------------|
 | Ubuntu 16.04 | drydock/u16cloall:v6.1.4 | - [Docker Hub](https://hub.docker.com/r/drydock/u16cloall/),<br>- [Github](https://github.com/dry-dock/u16cloall) | - 1.3.0<br>- 1.4.0<br>- 1.5.1<br>- 1.6.0<br>- 1.7.0<br>- 1.8.0<br>- 1.9.0 | - [Common components](#common-614)<br>- leiningen<br>- Java 1.8<br>- Node 7.x<br>- Ruby 2.3.3 |
 | Ubuntu 14.04 | drydock/u14cloall:v6.1.4 | - [Docker Hub](https://hub.docker.com/r/drydock/u14cloall/),<br>- [Github](https://github.com/dry-dock/u14cloall) | - 1.3.0<br>- 1.4.0<br>- 1.5.1<br>- 1.6.0<br>- 1.7.0<br>- 1.8.0<br>- 1.9.0 | - [Common components](#common-614)<br>- leiningen<br>- Java 1.8<br>- Node 7.x<br>- Ruby 2.3.3 |

---

<a name="sca-614"></a>
### Scala

 | OS           | Image                    | Link                                                                                                          | Language versions                | Additional packages                                                          |
 |--------------|--------------------------|---------------------------------------------------------------------------------------------------------------|----------------------------------|------------------------------------------------------------------------------|
 | Ubuntu 16.04 | drydock/u16scaall:v6.1.4 | - [Docker Hub](https://hub.docker.com/r/drydock/u16scaall/),<br>- [Github](https://github.com/dry-dock/u16scaall) | - 2.9.3<br>- 2.10.7<br>- 2.11.12<br>- 2.12.4 | - [Common components](#common-614)<br>- sbt<br>- Java 1.8.0<br>- Node 7.10.0<br>- Ruby 2.3.3 |
 | Ubuntu 14.04 | drydock/u14scaall:v6.1.4 | - [Docker Hub](https://hub.docker.com/r/drydock/u14scaall/),<br>- [Github](https://github.com/dry-dock/u14scaall) | - 2.9.3<br>- 2.10.7<br>- 2.11.12<br>- 2.12.4 | - [Common components](#common-614)<br>- sbt<br>- Java 1.8.0<br>- Node 4.8.7<br>- Ruby 2.3.3  |

---


<a name="cpp-614"></a>
### C/C++

 | OS           | Image                    | Link                                                                                                          | Language versions      | Additional packages                                                     |
 |--------------|--------------------------|---------------------------------------------------------------------------------------------------------------|------------------------|-------------------------------------------------------------------------|
 | Ubuntu 16.04 | drydock/u16cppall:v6.1.4 | - [Docker Hub](https://hub.docker.com/r/drydock/u16cppall/),<br>- [Github](https://github.com/dry-dock/u16cppall) | - gcc 7.2<br>- clang 5.0.1 | >- [Common components](#common-614)<br>- Java 1.8.0<br>- Node 7.10.0<br>- Ruby 2.3.3 |
 | Ubuntu 14.04 | drydock/u14cppall:v6.1.4 | - [Docker Hub](https://hub.docker.com/r/drydock/u14cppall/),<br>- [Github](https://github.com/dry-dock/u14cppall) | - gcc 7.2<br>- clang 5.0.1 | - [Common components](#common-614)<br>- Java 1.8.0<br>- Node 4.8.7<br>- Ruby 2.3.3  |

---
