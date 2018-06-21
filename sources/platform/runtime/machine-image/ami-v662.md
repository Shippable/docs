page_main_title: v6.6.2
main_section: Platform
sub_section: Runtime
sub_sub_section: Machine image
page_title: Description of what is available in Machine Image v6.6.2
page_description: A complete list of language versions, Docker versions, packages and tools available in Machine Image v6.6.2
page_keywords: CI/CD, shippable CI/CD, documentation, shippable, config, yml, AMI, Docker

# Machine image v6.6.2 (Docker TAG v6.6.2)

**Release Date: June 28, 2018**

**What is installed on the machine image?**

## u14 sku
* Host Operating System: Ubuntu 14.04 LTS
* Build Container Operating System: Ubuntu 16.04.3 LTS
* Kernel Version: 3.13.0-125-generic
* **Docker Server Version: 17.06.0-ce**
* Storage Driver: aufs
* Root Dir: /data/aufs
* Backing Filesystem: extfs
* Dirperm1 Supported: false
* Cgroup Driver: cgroupfs
* Shippable Official u14 and u16 Docker Images with TAG: `v6.6.2`

## u16 sku

* Host Operating System: Ubuntu 16.04 LTS
* Build Container Operating System: Ubuntu 16.04.3 LTS
* Kernel Version: 4.4.0-1049-aws
* **Docker Server Version: 17.06.0-ce**
* Storage Driver: aufs
* Root Dir: /data/aufs
* Backing Filesystem: extfs
* Dirperm1 Supported: false
* Cgroup Driver: cgroupfs
* Shippable Official u16 Docker Images with TAG: `v6.6.2`

## c7 sku
* Host Operating System: CentOS 7
* Build Container Operating System: CentOS 7
* Kernel Version: 3.10.0-514.10.2.el7.x86_64
* **Docker Server Version: 17.06.0-ce**
* Storage Driver: overlay
* Root Dir: /data
* Backing Filesystem: xfs
* Cgroup Driver: cgroupfs
* Shippable Official c7 Docker Images with TAG: `v6.6.2`

## w16 sku
* Host Operating System: Windows Server 2016 Datacenter Edition (Version 1607)
* Build Container Operating System: Windows Server Core 2016 v10.0.14393.1884
* Docker Server Version: 17.06.2-ee-5
* Shippable Official w16 Docker Images with TAG: `v6.6.2`

## Shippable Official Docker Images

These are the images used to run your CI jobs. The default image is picked up based on the `language` you set in your yml. All these images are available on our [Docker drydock Hub](https://hub.docker.com/u/drydock/). The source code is available in our [GitHub dry-dock org](https://github.com/dry-dock)

If you would like to use your own CI images in place of the official images, instructions are [described here](/ci/custom-docker-image/)

These are the official language images in this version:

* [Common components](#common-662)
* [Nodejs](#nod-662)
* [Clojure](#clo-662)
* [Go](#gol-662)
* [PHP](#php-662)
* [Java](#jav-662)
* [Ruby](#rub-662)
* [Python](#pyt-662)
* [Scala](#sca-662)
* [C/C++](#cpp-662)
* [Dotnet](#dotnet-662)
* [ASP.Net](#aspnet-662)

<a name="common-662"></a>
### Common components

All language images are built `FROM` a base image that corresponds to the OS version. For example, the language image for Node,js `u16nodall` is built using `u16all` as the base image, and hence has all the packages, CLIs and services installed in the base image.

We have the following base images, one for each supported OS version.

 | **OS**       | **Image**             | **Link**                                                                                                | **Packages**                                                                                                                                                                                                                                        | **CLIs**                                                                                                                          | **Services**                                                                                                                                                                                                             |
 |--------------|-----------------------|---------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
 | Ubuntu 16.04 | drydock/aarch32_u16:v6.6.2 | - [Docker Hub](https://hub.docker.com/r/drydock/aarch32_u16/) <br>- [GitHub](https://github.com/dry-dock/aarch32_u16) | - build-essential<br>- curl<br>- gcc<br>- gettext<br>- git<br>- htop<br>- jq<br>- libxml2-dev<br>- libxslt-dev<br>- make<br>- nano<br>- openssh-client<br>- openssl<br>- psmisc<br>- python-dev<br>- python-pip<br>- python-software-properties<br>- software-properties-common<br>- sudo<br>- texinfo<br>- unzip <br>- boto <br>- boto3 <br>- virtualenv<br>- wget <br>- libssl-dev <br>-libffi-dev <br>-vim  | - awscli 1.15.3<br>- awsebcli 3.12.4<br>- gcloud 196.0.0<br>- kubectl 1.9.0<br>- packer 1.2.2 <br>- ansible 3.0.0| |
 | Ubuntu 14.04 | drydock/u14all:v6.6.2 | - [Docker Hub](https://hub.docker.com/r/drydock/u14all/),<br>- [GitHub](https://github.com/dry-dock/u14all) | <br>- build-essential<br>- curl<br>- gcc<br>- gettext<br>- git<br>- htop<br>- jq<br>- libxml2-dev<br>- libxslt-dev<br>- make<br>- nano<br>- openssh-client<br>- openssl<br>- psmisc<br>- python-dev<br>- python-pip<br>- python-software-properties<br>- software-properties-common<br>- sudo<br>- texinfo<br>- unzip<br>- zip<br>- virtualenv<br>- wget<br>- vim<br>- groff<br>- rsync | - awscli 1.15.14<br>- awsebcli 3.12.4<br>- gcloud 200.0.0<br>- jfrog-cli 1.15.1<br>- kubectl 1.10.0<br>- packer 1.2.3<br>- ansible 2.5.2<br>- terraform 0.11.7<br>- azure 2.0.37 | - cassandra 3.11.2<br>- couchdb 2.1.1<br>- elasticsearch 6.2.4<br>- neo4j 3.3.5<br>- memcached 1.5.7<br>- mongodb 3.6.4<br>- mysql 5.7.22<br>- postgres 10.4<br>- rabbitmq 3.6.15-1<br>- redis 4.0.10<br>- riak 2.2.3<br>- selenium 3.11.0<br>- sqllite 3.22.0 |
 | Ubuntu 16.04 | drydock/u16all:v6.6.2 | - [Docker Hub](https://hub.docker.com/r/drydock/u16all/),<br>- [GitHub](https://github.com/dry-dock/u16all) | - build-essential<br>- curl<br>- gcc<br>- gettext<br>- git<br>- htop<br>- jq<br>- libxml2-dev<br>- libxslt-dev<br>- make<br>- nano<br>- openssh-client<br>- openssl<br>- psmisc<br>- python-dev<br>- python-pip<br>- python-software-properties<br>- software-properties-common<br>- sudo<br>- texinfo<br>- unzip<br>- zip<br>- virtualenv<br>- wget<br>- apt-transport-https 1.2.26 | - awscli 1.15.14<br>- awsebcli 3.12.4<br>- gcloud 200.0.0<br>- jfrog-cli 1.15.1<br>- kubectl 1.10.0<br>- packer 1.2.3<br>- ansible 2.5.2<br>- terraform 0.11.7<br>- azurecli 2.0.37 | - cassandra 3.11.2<br>- couchdb 2.1.1<br>- elasticsearch 6.2.4<br>- neo4j 3.3.5<br>- memcached 1.5.7<br>- mongodb 3.6.4<br>- mysql 5.7.22<br>- postgres 10.4<br>- rabbitmq 3.6.15<br>- redis 4.0.10<br>- riak 2.2.3<br>- selenium 3.11.0<br>- sqllite 3.22.0 |-
 | Ubuntu 16.04 | drydockaarch64/u16all:v6.6.2 | - [Docker Hub](https://hub.docker.com/r/drydockaarch64/u16all/),<br>- [GitHub](https://github.com/dry-dock-aarch64/u16all) | - build-essential<br>- curl<br>- gcc<br>- gettext<br>- git<br>- htop<br>- jq<br>- libxml2-dev<br>- libxslt-dev<br>- make<br>- nano<br>- openssh-client<br>- openssl<br>- psmisc<br>- python-dev<br>- python-pip<br>- python-software-properties<br>- software-properties-common<br>- sudo<br>- texinfo<br>- unzip<br>- zip<br>- virtualenv<br>- wget | - awscli 1.15.14<br>- awsebcli 3.12.4<br>- gcloud 200.0.0<br>- kubectl 1.10.0<br>- packer 1.2.2<br>- azure 3.0.0 | - couchdb 1.6.0 <br> - elasticsearch 6.2.4<br> - memcached 1.4.25 <br> - mongo 3.6.4 <br> - neo4j 3.3.5 <br> - postgres 9.5.13<br> - rabbitmq 3.6.15 <br> - redis 4.0.10 <br> - selenium 3.11.0 <br> - sqlite 3.11.0 |
 | CentOS 7 | drydock/c7all:v6.6.2 | - [Docker Hub](https://hub.docker.com/r/drydock/c7/),<br>- [GitHub](https://github.com/dry-dock/c7) | - epel-release<br>- gcc<br>- gcc-c++<br>- kernel-devel<br>- make<br>- curl<br>- openssl<br>- wget<br>- unzip<br>- zip<br>- nano<br>- openssh-clients<br>-  htop<br>- rsync<br>- vim<br>- glibc.i686<br>- libgcc_s.so.1<br>- python36u<br>- python36u-libs<br>- python36u-devel<br>- python36u-pip<br>- virtualenv<br>- jq<br>- git<br>- git-lfs | - awscli 1.15.14<br>- gcloud 200.0.0<br>- kubectl 1.10.0<br>- doctl 1.8.0<br>- jfrog-cli 1.15.1<br>- ansible 2.5.2<br>- boto 2.48.0<br>- apache libcloud 2.3.0<br>- terraform 0.11.7<br>- packer 1.2.3<br>- azure-cli 2.0.37 | - Cassandra 3.11.2<br>- MemCached 1.5.7<br>- LibMemCached 1.0.18<br>- Mongodb 3.6.4<br>- Neo4j 3.3.5<br>- RabbitMQ 3.6.15<br>- Redis-server 4.0.9<br>- ElasticSearch 6.2.4<br>- Riak 2.2.3<br>- Selenium 3.11.0<br>- Sqlite 3.22.0<br>- mysql 5.7.22<br>- postgres 10.4<br>- couchdb 2.1.1
 | Windows 16 | drydock/w16:v6.6.2 | - [Docker Hub](https://hub.docker.com/r/drydock/w16/),<br>- [GitHub](https://github.com/dry-dock/w16) |  |- git 2.17.1<br>- git-lfs 2.4.0<br>- gcloud 206.0.0<br>- awscli 1.15.41<br>- Azurecli 2.0.37<br>- kubectl 1.10.4<br>- jfrog-cli 1.11.2<br>-  terraform 0.11.7<br>- packer 1.2.4<br>- jq 1.5.0 | |
 

 <a name="nod-662"></a>

### Node.js

 | OS           | Image                    | Link                                                                                                          | Language versions                                                 | Additional packages                                                                |
 |--------------|--------------------------|---------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------|------------------------------------------------------------------------------------|
 | Ubuntu 16.04 | drydock/u16nodall:v6.6.2 | [Docker Hub](https://hub.docker.com/r/drydock/u16nodall/)<br> [GitHub](https://github.com/dry-dock/u16nodall) | - 6.14.3 <br>- 8.11.3 <br>- 9.11.2 <br>- 10.1.0 | [Common components](#common-662)<br>nvm<br>Java 1.8.0<br>Ruby 2.5.1<br>Yarn 1.6.0 |
 | Ubuntu 16.04 (aarch64) | drydockaarch64/u16nodall:v6.6.2 | [Docker Hub](https://hub.docker.com/r/drydockaarch64/u16nodall/)<br> [GitHub](https://github.com/dry-dock-aarch64/u16nodall) |- 6.14.2 <br>- 8.11.2 <br>- 9.11.1 <br>- 10.1.0| [Common components](#common-662)<br>nvm<br>Java OpenJDK 1.8.0<br>Ruby 2.5.1<br>Yarn 1.6.0 |
 | Ubuntu 14.04 | drydock/u14nodall:v6.6.2 | [Docker Hub](https://hub.docker.com/r/drydock/u14nodall/)<br>[GitHub](https://github.com/dry-dock/u14nodall)  | - 6.14.3  <br />- 8.11.3 <br />- 9.11.2<br />-10.1.0  | [Common components](#common-662)<br>nvm<br>Java 1.8.0<br>Ruby 2.5.1<br>Yarn 1.6.0 |
 | CentOS 7 | drydock/c7nodall:v6.6.2 | [Docker Hub](https://hub.docker.com/r/drydock/c7nodall/)<br>[GitHub](https://github.com/dry-dock/c7nodall)  | - 6.14.2 <br />- 8.11.2 <br />- 9.11.1<br />- 10.2.1 | [Common components](#common-662)<br>nvm<br>Java 1.8.0<br>Ruby 2.5.1<br>Yarn 1.6.0 |


 ---

 <a name="clo-662"></a>

### Clojure

 | OS           | Image                    | Link                                                                                                          | Language versions                          | Additional packages                                                           |
 |--------------|--------------------------|---------------------------------------------------------------------------------------------------------------|--------------------------------------------|-------------------------------------------------------------------------------|
 | Ubuntu 16.04 | drydock/u16cloall:v6.6.2 | - [Docker Hub](https://hub.docker.com/r/drydock/u16cloall/),<br>- [GitHub](https://github.com/dry-dock/u16cloall) | - 1.3.0<br>- 1.4.0<br>- 1.5.1<br>- 1.6.0<br>- 1.7.0<br>- 1.8.0<br>- 1.9.0 | - [Common components](#common-662)<br>- leiningen<br>- Java 1.8.0 <br>- Node 8.11.3<br>- Ruby 2.5.1 |
 | Ubuntu 14.04 | drydock/u14cloall:v6.6.2 | - [Docker Hub](https://hub.docker.com/r/drydock/u14cloall/),<br>- [GitHub](https://github.com/dry-dock/u14cloall) | - 1.3.0<br>- 1.4.0<br>- 1.5.1<br>- 1.6.0<br>- 1.7.0<br>- 1.8.0<br>- 1.9.0 | - [Common components](#common-662)<br>- leiningen<br>- Java 1.8<br>- Node 8.11.3<br>- Ruby 2.5.1 |

 ---

 <a name="gol-662"></a>

### Go

  | OS   | Image  | Link   | Language versions  | Additional packages   |
  |------|--------|--------|--------------------|-----------------------|
  | Ubuntu 16.04 | drydock/u16golall:v6.6.2 | - [Docker Hub](https://hub.docker.com/r/drydock/u16golall/)<br>- [GitHub](https://github.com/dry-dock/u16golall) | - 1.7.6<br>- 1.8.7<br>- 1.9.6<br>- 1.10.2    | - [Common components](#common-662)<br>- gvm 1.10.2<br>- Java 1.8.0<br>- Node 8.11.3<br>- Ruby 2.5.1 |
  | Ubuntu 14.04 | drydock/u14golall:v6.6.2 | - [Docker Hub](https://hub.docker.com/r/drydock/u14golall/)<br>- [GitHub](https://github.com/dry-dock/u14golall) | - 1.7.6<br>- 1.8.7<br>- 1.9.6<br>- 1.10.2    | - [Common components](#common-662)<br>- gvm 1.10.2<br>- Java 1.8<br>- Node 8.11.3<br>- Ruby 2.5.1 |


 ---

 <a name="php-662"></a>

### PHP

  | OS           | Image                    | Link                                                                                                          | Language versions       | Additional packages                                                                              |
  |--------------|--------------------------|---------------------------------------------------------------------------------------------------------------|-------------------------|--------------------------------------------------------------------------------------------------|
  | Ubuntu 16.04 | drydock/u16phpall:v6.6.2 | - [Docker Hub](https://hub.docker.com/r/drydock/u16phpall/),<br>- [Github](https://github.com/dry-dock/u16phpall) |- 5.6.36<br>- 7.0.30<br>- 7.1.17 <br>- 7.2.5| - [Common components](#common-662)<br>- phpenv 1.1.1-2-g615f844<br>- Java 1.8.0<br>- Node 8.11.3<br>- Ruby 2.5.1 |
  | Ubuntu 14.04 | drydock/u14phpall:v6.6.2 | - [Docker Hub](https://hub.docker.com/r/drydock/u14phpall/),<br>- [Github](https://github.com/dry-dock/u14phpall) | - 5.6.36<br>- 7.0.30<br>- 7.1.17<br>- 7.2.5 | - [Common components](#common-662)<br>- phpenv 1.1.1-2-g615f844<br>- Java 1.8.0<br>- Node 8.11.3<br>- Ruby 2.5.1  |
 ---

 <a name="jav-662"></a>

### Java

  | OS           | Image                    | Link                                                                                                          | Language versions                                      | Additional packages                                         |
  |--------------|--------------------------|---------------------------------------------------------------------------------------------------------------|--------------------------------------------------------|-------------------------------------------------------------|
  | Ubuntu 16.04 | drydock/u16javall:v6.6.2 | - [Docker Hub](https://hub.docker.com/r/drydock/u16javall/),<br>- [GitHub](https://github.com/dry-dock/u16javall) | - openjdk7<br>- openjdk8<br>- openjdk9<br>- oraclejdk8<br>- oraclejdk10 | - [Common components](#common-662)<br>- Node 8.11.3<br>- Ruby 2.5.1 <br>- Gradle 4.7 <br>- Maven 3.5.3 <br>- Apache-ant 1.10.3 <br>- Android-sdk 26.0.1 (to be used with openjdk8/oraclejdk8)|
  | Ubuntu 16.04 (aarch64) | drydockaarch64/u16javall:v6.6.2 | [Docker Hub](https://hub.docker.com/r/drydockaarch64/u16javall/)<br> [GitHub](https://github.com/dry-dock-aarch64/u16javall) | - openjdk7<br>- openjdk8<br>- oraclejdk8 | [Common components](#common-662)<br>- Node 8.11.3<br>- Ruby 2.5.1 <br>- Gradle 4.7 <br>- Maven 3.5.3 <br>- Apache-ant 1.10.3 <br>- Android-sdk 26.0.1 (to be used with openjdk8/oraclejdk8)|
  | Ubuntu 14.04 | drydock/u14javall:v6.6.2 | - [Docker Hub](https://hub.docker.com/r/drydock/u14javall/)<br>- [GitHub](https://github.com/dry-dock/u14javall) | - openjdk7<br>- openjdk8<br>- oraclejdk8<br>- oraclejdk10           | - [Common components](#common-662)<br>- Node 8.11.3<br>- Ruby 2.5.1 <br>- Gradle 4.7 <br>- Maven 3.5.3 <br>- Android-sdk 26.0.1 (to be used with openjdk8/oraclejdk8) |
  | CentOS 7 | drydock/c7javall:v6.6.2 | - [Docker Hub](https://hub.docker.com/r/drydock/c7javall/)<br>- [GitHub](https://github.com/dry-dock/c7javall) | - openjdk7<br>- openjdk8<br>- openjdk9<br>- oraclejdk8<br>- oraclejdk10           | - [Common components](#common-662)<br>- Node 8.11.2 <br>- Ruby 2.5.1 <br>- Gradle 4.7 <br>- Maven 3.5.3 <br>- Android-sdk 26.0.1 (to be used with openjdk8/oraclejdk8) |

 ---


 <a name="rub-662"></a>

### Ruby

  | OS           | Image                    | Link                                                                                                          | Language versions                                              | Additional packages                                                    |
  |--------------|--------------------------|---------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------|------------------------------------------------------------------------|
  | Ubuntu 16.04 | drydock/u16ruball:v6.6.2 | <br>- [Docker Hub](https://hub.docker.com/r/drydock/u16ruball/),<br>- [GitHub](https://github.com/dry-dock/u16ruball) |- 2.2.10<br>- 2.3.7<br>- 2.4.4<br>- 2.5.1<br>- jruby-1.7.27<br>- jruby-9.1.17.0 | - [Common components](#common-662)<br>- rvm 2.5.1<br>- Java 1.8.0<br>- Node 8.11.3  |
  | Ubuntu 14.04 | drydock/u14ruball:v6.6.2 | <br>- [Docker Hub](https://hub.docker.com/r/drydock/u14ruball/),<br>- [GitHub](https://github.com/dry-dock/u14ruball) |- 2.2.10<br>- 2.3.7<br>- 2.4.4<br>- 2.5.1<br>- jruby-1.7.27<br>- jruby-9.1.17.0 | - [Common components](#common-662)<br>- rvm 2.5.1<br>- Java 1.8.0<br>- Node 8.11.3 |


 <a name="pyt-662"></a>

### Python

  | OS           | Image                    | Link                                                                                                      | Language versions                                       | Additional packages                                                                 |
  |--------------|--------------------------|-----------------------------------------------------------------------------------------------------------|---------------------------------------------------------|-------------------------------------------------------------------------------------|
  | Ubuntu 16.04 | drydock/u16pytall:v6.6.2 | - [Docker Hub](https://hub.docker.com/r/drydock/u16pytall/)<br> - [GitHub](https://github.com/dry-dock/u16pytall) |- 2.7.12 <br>- 3.6.5 <br>- pypy2 5.10.0 <br>- pypy3 5.10.1 | - [Common components](#common-662)<br>- virtualenv<br>- Java 1.8.0<br>- Node 8.11.3<br>- Ruby 2.5.1 |
  | Ubuntu 16.04 (aarch64) | drydockaarch64/u16pytall:v6.6.2 | - [Docker Hub](https://hub.docker.com/r/drydockaarch64/u16pytall/)<br> - [GitHub](https://github.com/dry-dock-aarch64/u16pytall) | - 2.7.12<br>- 3.6.5  | [Common components](#common-662)<br>- Java 1.8.0<br>- Node 8.11.3 <br>- Ruby 2.5.1 |
  | Ubuntu 14.04 | drydock/u14pytall:v6.6.2 | - [Docker Hub](https://hub.docker.com/r/drydock/u14pytall/)<br>- [GitHub](https://github.com/dry-dock/u14pytall)  | - 2.7.12<br>- 3.6.5<br>- pypy2 5.10.0<br>- pypy3 5.10.1 | - [Common components](#common-662)<br>- virtualenv<br>- Java 1.8.0<br>- Node 8.11.3<br>- Ruby 2.5.1  |
  | CentOS 7 | drydock/c7pytall:v6.6.2 | - [Docker Hub](https://hub.docker.com/r/drydock/c7pytall/)<br>- [GitHub](https://github.com/dry-dock/c7pytall)  | - 2.7.5 <br>- 3.6.5 | - [Common components](#common-662)<br>- virtualenv<br>- Java 1.8.0<br>- Node 9.11.1 <br>- Ruby 2.5.1  |

 ---

 <a name="sca-662"></a>

### Scala

  | OS           | Image                    | Link                                                                                                          | Language versions                | Additional packages                                                          |
  |--------------|--------------------------|---------------------------------------------------------------------------------------------------------------|----------------------------------|------------------------------------------------------------------------------|
  | Ubuntu 16.04 | drydock/u16scaall:v6.6.2 | - [Docker Hub](https://hub.docker.com/r/drydock/u16scaall/),<br>- [GitHub](https://github.com/dry-dock/u16scaall) |<br>- 2.11.12<br>- 2.12.6 | - [Common components](#common-662)<br>- sbt<br>- Java 1.8.0<br>- Node 8.11.3 <br>- Ruby 2.5.1 |
  | Ubuntu 14.04 | drydock/u14scaall:v6.6.2 | - [Docker Hub](https://hub.docker.com/r/drydock/u14scaall/),<br>- [GitHub](https://github.com/dry-dock/u14scaall) | - 2.11.12<br>- 2.12.6 | - [Common components](#common-662)<br>- sbt<br>- Java 1.8.0<br>- Node 8.11.3<br>- Ruby 2.5.1  |



 <a name="cpp-662"></a>

### C/C++

  | OS           | Image                    | Link                                                                                                          | Language versions      | Additional packages                                                     |
  |--------------|--------------------------|---------------------------------------------------------------------------------------------------------------|------------------------|-------------------------------------------------------------------------|
  | Ubuntu 16.04 | drydock/u16cppall:v6.6.2 | - [Docker Hub](https://hub.docker.com/r/drydock/u16cppall/),<br>- [GitHub](https://github.com/dry-dock/u16cppall) | - gcc 8.0.1<br>- clang 6.0.0 | - [Common components](#common-662)<br>- Java 1.8.0<br>- Node 8.11.3<br>- Ruby 2.5.1 |
  | Ubuntu 14.04 | drydock/u14cppall:v6.6.2 | - [Docker Hub](https://hub.docker.com/r/drydock/u14cppall/),<br>- [GitHub](https://github.com/dry-dock/u14cppall) | - gcc 8.0.1<br>- clang 6.0.0 | - [Common components](#common-662)<br>- Java 1.8.0<br>- Node 8.11.3<br>- Ruby 2.5.1  |
  | Ubuntu 16.04 | drydockaarch64/u16cppall:v6.6.2 | - [Docker Hub](https://hub.docker.com/r/drydockaarch64/u16cppall/),<br>- [GitHub](https://github.com/dry-dock-aarch64/u16cppall) | - gcc 8.0.1<br>- clang 6.0.0 | - [Common components](#common-662)<br>- Java 1.8.0<br>- Node 8.11.3<br>- Ruby 2.5.1  |
  | CentOS 7 | drydock/c7cppall:v6.6.2 | - [Docker Hub](https://hub.docker.com/r/drydock/c7cppall/),<br>- [GitHub](https://github.com/dry-dock/c7cppall) | - gcc 7.2.1<br>- clang 5.0.1 | - [Common components](#common-662)<br>- Java 1.8.0<br>- Node 9.11.1<br>- Ruby 2.5.1   |

<a name="dotnet-662"></a>

### Dotnet

| OS           | Image                    | Link                                                                                                          | Language versions      | Additional packages                                                     |
|--------------|--------------------------|---------------------------------------------------------------------------------------------------------------|------------------------|-------------------------------------------------------------------------|
| Windows 16 | dry-dock/w16dotnetcore:v6.6.2 | - [Docker Hub](https://hub.docker.com/r/drydock/w16dotnetcore/),<br>- [GitHub](https://github.com/dry-dock/w16dotnetcore) | - .NET Core SDK 2.1.200 | - [Common components](#common-662)<br> |

<a name="aspnet-662"></a>

### ASP.Net

| OS           | Image                    | Link                                                                                                          | Language versions      | Additional packages                                                     |
|--------------|--------------------------|---------------------------------------------------------------------------------------------------------------|------------------------|-------------------------------------------------------------------------|
| Windows 16 | dry-dock/w16aspnetcore:v6.6.2 | - [Docker Hub](https://hub.docker.com/r/drydock/w16aspnetcore/),<br>- [GitHub](https://github.com/dry-dock/w16aspnetcore) | - ASP.NET Core 2.0.7 |- [Common components](#common-662)  |

 
