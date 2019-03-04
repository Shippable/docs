page_main_title: v7.2.4
main_section: Platform
sub_section: Runtime
sub_sub_section: Machine image
page_title: Description of what is available in Machine Image v7.2.4
page_description: A complete list of language versions, Docker versions, packages and tools available in Machine Image v7.2.4
page_keywords: CI/CD, shippable CI/CD, documentation, shippable, config, yml, AMI, Docker

# Machine image v7.2.4 (Docker TAG v7.2.4)

**Release Date: February 28, 2019**

**Note**: This machine image version uses Docker 18.03 which is known to be
incompatible with [node caching](/platform/runtime/caching/#node-caching).
Please turn off caching if you want to use this machine image. Alternatively,
you can use machine image version 6.9.4 or below which come with an earlier
version of Docker.

**What is installed on the machine image?**

## u14 sku
* Host Operating System: Ubuntu 14.04 LTS
* Build Container Operating System: Ubuntu 16.04.3 LTS
* Kernel Version: 3.13.0-125-generic
* **Docker Server Version: 18.03.1-ce**
* Storage Driver: aufs
* Root Dir: /data/aufs
* Backing Filesystem: extfs
* Dirperm1 Supported: false
* Cgroup Driver: cgroupfs
* Shippable Official u14 and u16 Docker Images with TAG: `v7.2.4`

## u16 sku

* Host Operating System: Ubuntu 16.04 LTS
* Build Container Operating System: Ubuntu 16.04.3 LTS
* Kernel Version: 4.4.0-1049-aws
* **Docker Server Version: 18.03.1-ce**
* Storage Driver: aufs
* Root Dir: /data/aufs
* Backing Filesystem: extfs
* Dirperm1 Supported: false
* Cgroup Driver: cgroupfs
* Shippable Official u16 Docker Images with TAG: `v7.2.4`

## c7 sku
* Host Operating System: CentOS 7
* Build Container Operating System: CentOS 7
* Kernel Version: 3.10.0-514.10.2.el7.x86_64
* **Docker Server Version: 18.03.1-ce**
* Storage Driver: overlay
* Root Dir: /data
* Backing Filesystem: xfs
* Cgroup Driver: cgroupfs
* Shippable Official c7 Docker Images with TAG: `v7.2.4`

## w16 sku
* Host Operating System: Windows Server 2016 Datacenter Edition (Version 1607)
* Build Container Operating System: Windows Server Core 2016 v10.0.14393.1884
* **Docker Server Version: 18.09.1-ce**
* Shippable Official w16 Docker Images with TAG: `v7.2.4`

## Shippable Official Docker Images

These are the images used to run your CI jobs. The default image is picked up based on the `language` you set in your yml. All these images are available on our [Docker drydock Hub](https://hub.docker.com/u/drydock/). The source code is available in our [GitHub dry-dock org](https://github.com/dry-dock)

If you would like to use your own CI images in place of the official images, instructions are [described here](/ci/custom-docker-image/)

These are the official language images in this version:

* [Common components](#common-)
* [ASP.Net](#aspnet-724)
* [Clojure](#clo-724)
* [C/C++](#cpp-724)
* [Dotnet](#dotnet-724)
* [Go](#gol-724)
* [Java](#jav-724)
* [Nodejs](#nod-724)
* [PHP](#php-724)
* [Python](#pyt-724)
* [Ruby](#rub-724)
* [Scala](#sca-724)



<a name="common-724"></a>
### Common components

All language images are built `FROM` a base image that corresponds to the OS version. For example, the language image for Node,js `u16nodall` is built using `u16all` as the base image, and hence has all the packages, CLIs and services installed in the base image.

We have the following base images, one for each supported OS version.

 | **OS**       | **Image**             | **Link**                                                                                                | **Packages**                                                                                                                                                                                                                                        | **CLIs**                                                                                                                          | **Services**                                                                                                                                                                                                             |
 |--------------|-----------------------|---------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
 | Ubuntu 16.04 | drydock/aarch32_u16:v7.2.4 | - [Docker Hub](https://hub.docker.com/r/drydock/aarch32_u16/) <br>- [GitHub](https://github.com/dry-dock/aarch32_u16) | - build-essential<br>- curl<br>- gcc<br>- gettext<br>- git<br>- htop<br>- jq<br>- libxml2-dev<br>- libxslt-dev<br>- make<br>- nano<br>- openssh-client<br>- openssl<br>- psmisc<br>- python-dev<br>- python-pip<br>- python-software-properties<br>- software-properties-common<br>- sudo<br>- texinfo<br>- unzip <br>- boto <br>- boto3 <br>- virtualenv<br>- wget <br>- libssl-dev <br>-libffi-dev <br>-vim  | - awscli 1.16.102<br>- awsebcli 3.14.11<br>- gcloud 233.0.0<br>- kubectl 1.13.2<br>- packer 1.3.4 <br>- ansible 2.7.7 |
 | Ubuntu 14.04 | drydock/u14all:v7.2.4 | - [Docker Hub](https://hub.docker.com/r/drydock/u14all/),<br>- [GitHub](https://github.com/dry-dock/u14all) | <br>- build-essential<br>- curl<br>- gcc<br>- gettext<br>- git<br>- htop<br>- jq<br>- libxml2-dev<br>- libxslt-dev<br>- make<br>- nano<br>- openssh-client<br>- openssl<br>- psmisc<br>- python-dev<br>- python-pip<br>- python-software-properties<br>- software-properties-common<br>- sudo<br>- texinfo<br>- unzip<br>- zip<br>- virtualenv<br>- wget<br>- vim<br>- groff<br>- rsync | - awscli 1.16.102<br>- awsebcli 3.14.11<br>- gcloud 233.0.0<br>- jfrog-cli 1.24.1<br>- kubectl 1.13.2<br>- packer 1.3.4<br>- ansible 2.7.7<br>- terraform 0.11.11<br>- azure-cli 2.0.58 | - couchdb 2.3.0<br>- elasticsearch 6.6.0<br>- memcached 1.5.12<br>- Mongodb 4.0.6<br>- mysql 5.7.25<br>- postgres 11.1<br>- rabbitmq 3.6.15-1<br>- redis 5.0.3<br>- riak 2.2.3<br>- selenium 3.141.59<br>- sqllite 3.22.0 |
 | Ubuntu 16.04 | drydock/u16all:v7.2.4 | - [Docker Hub](https://hub.docker.com/r/drydock/u16all/),<br>- [GitHub](https://github.com/dry-dock/u16all) | - build-essential<br>- curl<br>- gcc<br>- gettext<br>- git<br>- htop<br>- jq<br>- libxml2-dev<br>- libxslt-dev<br>- make<br>- nano<br>- openssh-client<br>- openssl<br>- psmisc<br>- python-dev<br>- python-pip<br>- python-software-properties<br>- software-properties-common<br>- sudo<br>- texinfo<br>- unzip<br>- zip<br>- virtualenv<br>- wget<br>- apt-transport-https 1.2.26 | - awscli 1.16.102<br>- awsebcli 3.14.11<br>- gcloud 233.0.0<br>- jfrog-cli 1.24.1<br>- kubectl 1.13.2<br>- packer 1.3.4<br>- ansible 2.7.7<br>- terraform 0.11.11<br>- azure-cli 2.0.58 | - couchdb 2.3.0<br>- elasticsearch 6.6.0<br>- memcached 1.5.12<br>- Mongodb 4.0.6<br>- mysql 5.7.25<br>- postgres 11.1<br>- rabbitmq 3.6.15<br>- redis 5.0.3<br>- riak 2.2.3<br>- selenium 3.141.59<br>- sqllite 3.22.0 |-
 | Ubuntu 16.04 | drydockaarch64/u16all:v7.2.4 | - [Docker Hub](https://hub.docker.com/r/drydockaarch64/u16all/),<br>- [GitHub](https://github.com/dry-dock/aarch64_u16all) | - build-essential<br>- curl<br>- gcc<br>- gettext<br>- git<br>- htop<br>- jq<br>- libxml2-dev<br>- libxslt-dev<br>- make<br>- nano<br>- openssh-client<br>- openssl<br>- psmisc<br>- python-dev<br>- python-pip<br>- python-software-properties<br>- software-properties-common<br>- sudo<br>- texinfo<br>- unzip<br>- zip<br>- virtualenv<br>- wget | - awscli 1.16.102<br>- awsebcli 3.14.11<br>- gcloud 233.0.0<br>- ansible 2.7.7<br>- kubectl 1.13.2<br>- packer 1.3.4 <br>- azure 3.0.0 | - couchdb 1.6.0 <br> - elasticsearch 6.2.4<br> - memcached 1.5.12 <br> - Mongodb 4.0.6 <br> - postgres 9.5 <br> - rabbitmq 3.6.15 <br> - redis 5.0.3 <br> - selenium 3.141.59 <br> - sqlite 3.11.0 |
 | CentOS 7 | drydock/c7all:v7.2.4 | - [Docker Hub](https://hub.docker.com/r/drydock/c7/),<br>- [GitHub](https://github.com/dry-dock/c7) | - epel-release<br>- gcc<br>- gcc-c++<br>- kernel-devel<br>- make<br>- curl<br>- openssl<br>- wget<br>- unzip<br>- zip<br>- nano<br>- openssh-clients<br>-  htop<br>- rsync<br>- vim<br>- glibc.i686<br>- libgcc_s.so.1<br>- python36u<br>- python36u-libs<br>- python36u-devel<br>- python36u-pip<br>- virtualenv<br>- jq<br>- git<br>- git-lfs | - awscli 1.16.102<br>- gcloud 233.0.0<br>- kubectl 1.13.2<br>- doctl 1.13.0<br>- jfrog-cli 1.24.1<br>- ansible 2.7.7<br>- boto 2.49.0<br>- apache libcloud 2.4.0<br>- terraform 0.11.11<br>- packer 1.3.4<br>- azure-cli 2.0.58 |- memcached 1.5.12<br>- Mongodb 4.0.6<br>- RabbitMQ 3.6.15<br>- redis 5.0.3<br>- elasticsearch 6.6.0<br>- Riak 2.2.3<br>- selenium 3.141.59<br>- Sqlite 3.27.1<br>- mysql 5.7.25<br>- postgres 11.2<br>- couchdb 2.3.0 |
 | Windows 16 | drydock/w16:v7.2.4 | - [Docker Hub](https://hub.docker.com/r/drydock/w16/),<br>- [GitHub](https://github.com/dry-dock/w16) |  |- git 2.21.0<br>- git-lfs 2.7.1<br>- gcloud 236.0.0<br>- awscli 1.16.113<br>- Azure-cli 2.0.58<br> -choco 0.10.11<br>- kubectl 1.13.3<br>- jfrog-cli 1.24.1<br>-  terraform 0.11.11<br>- packer 1.3.4<br>- jq 1.5.0 | |

### Note

Cassandra and Neo4j are only supported in the [Java](/platform/runtime/machine-image/language-versions/#java) images because they require JDK 8.

---

 <a name="clo-724"></a>

### Clojure

| OS           | Image                    | Link                                                                                                          | Language versions                          | Additional packages                                                           |
|--------------|--------------------------|---------------------------------------------------------------------------------------------------------------|--------------------------------------------|-------------------------------------------------------------------------------|
| Ubuntu 16.04 | drydock/u16cloall:v7.2.4 | - [Docker Hub](https://hub.docker.com/r/drydock/u16cloall/),<br>- [GitHub](https://github.com/dry-dock/u16cloall) | - 1.10.0 | - [Common components](#common-724)<br>- leiningen<br>- Java 11 <br>- Node 10.15.1<br>- Ruby 2.6.1 |
| Ubuntu 14.04 | drydock/u14cloall:v7.2.4 | - [Docker Hub](https://hub.docker.com/r/drydock/u14cloall/),<br>- [GitHub](https://github.com/dry-dock/u14cloall) | - 1.10.0 | - [Common components](#common-724)<br>- leiningen<br>- Java 11<br>- Node 10.15.1<br>- Ruby 2.6.1 |
| CentOS 7 | drydock/C7cloall:v7.2.4 | - [Docker Hub](https://hub.docker.com/r/drydock/C7cloall/),<br>- [GitHub](https://github.com/dry-dock/C7cloall) | - 1.10.0 | - [Common components](#common-724)<br>- leiningen<br>- Java 11<br>- Node 10.15.1<br>- Ruby 2.6.1 |

---

 <a name="cpp-724"></a>

### C/C++

   | OS           | Image                    | Link                                                                                                          | Language versions      | Additional packages                                                     |
   |--------------|--------------------------|---------------------------------------------------------------------------------------------------------------|------------------------|-------------------------------------------------------------------------|
   | Ubuntu 16.04 | drydock/u16cppall:v7.2.4 | - [Docker Hub](https://hub.docker.com/r/drydock/u16cppall/),<br>- [GitHub](https://github.com/dry-dock/u16cppall) | - gcc 8.1.0<br>- clang 7.0.1 | - [Common components](#common-724)<br>- Java 11<br>- Node 10.15.1<br>- Ruby 2.6.1 |
   | Ubuntu 14.04 | drydock/u14cppall:v7.2.4 | - [Docker Hub](https://hub.docker.com/r/drydock/u14cppall/),<br>- [GitHub](https://github.com/dry-dock/u14cppall) | - gcc 8.1.0<br>- clang 7.0.1 | - [Common components](#common-724)<br>- Java 11<br>- Node 10.15.1<br>- Ruby 2.6.1  |
   | Ubuntu 16.04 | drydockaarch64/u16cppall:v7.2.4 | - [Docker Hub](https://hub.docker.com/r/drydockaarch64/u16cppall/),<br>- [GitHub](https://github.com/dry-dock/aarch64_u16cppall) | - gcc 8.1.0<br>- clang 7.0.1 | - [Common components](#common-724)<br>- Java 11<br>- Node 10.15.1<br>- Ruby 2.6.1  
   | CentOS 7 | drydock/c7cppall:v7.2.4 | - [Docker Hub](https://hub.docker.com/r/drydock/c7cppall/),<br>- [GitHub](https://github.com/dry-dock/c7cppall) | - gcc 8.2.1<br>- clang 6.0.1 | - [Common components](#common-724)<br>- Java 11<br>- Node 10.15.1<br>- Ruby 2.6.1   |

 ---

   <a name="dotnet-724"></a>

### Dotnet

   | OS           | Image                    | Link                                                                                                          | Language versions      | Additional packages                                                     |
   |--------------|--------------------------|---------------------------------------------------------------------------------------------------------------|------------------------|-------------------------------------------------------------------------|
   | Windows 16 | dry-dock/w16dotnetcore:v7.2.4 | - [Docker Hub](https://hub.docker.com/r/drydock/w16dotnetcore/),<br>- [GitHub](https://github.com/dry-dock/w16dotnetcore) | - .NET Core SDK 2.1.504 | - [Common components](#common-724)<br> |

 ---

  <a name="gol-724"></a>

### Go

   | OS   | Image  | Link   | Language versions  | Additional packages   |
   |------|--------|--------|--------------------|-----------------------|
   | Ubuntu 16.04 | drydock/u16golall:v7.2.4 | - [Docker Hub](https://hub.docker.com/r/drydock/u16golall/)<br>- [GitHub](https://github.com/dry-dock/u16golall) | - 1.10.8<br>- 1.11.5    | - [Common components](#common-724)<br>- gvm 1.0.22<br>- Java 11<br>- Node 10.15.1<br>- Ruby 2.6.1 |
   | Ubuntu 14.04 | drydock/u14golall:v7.2.4 | - [Docker Hub](https://hub.docker.com/r/drydock/u14golall/)<br>- [GitHub](https://github.com/dry-dock/u14golall) | - 1.10.8<br>- 1.11.5   | - [Common components](#common-724)<br>- gvm 1.0.22<br>- Java 11<br>- Node 10.15.1<br>- Ruby 2.6.1 |
   | CentOS 7 | drydock/c7golall:v7.2.4 | - [Docker Hub](https://hub.docker.com/r/drydock/c7golall/)<br>- [GitHub](https://github.com/dry-dock/c7golall) | - 1.10.8<br>- 1.11.5    | - [Common components](#common-724)<br>- gvm 1.0.22<br>- Java 11<br>- Node 10.15.1<br>- Ruby 2.6.1 |

 ---

  <a name="jav-724"></a>

### Java

   | OS           | Image                    | Link                                                                                                          | Language versions                                      | Additional packages                                         |
   |--------------|--------------------------|---------------------------------------------------------------------------------------------------------------|--------------------------------------------------------|-------------------------------------------------------------|
   | Ubuntu 16.04 | drydock/u16javall:v7.2.4 | - [Docker Hub](https://hub.docker.com/r/drydock/u16javall/),<br>- [GitHub](https://github.com/dry-dock/u16javall) | - openjdk7<br>- openjdk8<br>- openjdk10 <br>- openjdk11<br>- oraclejdk8<br>- oraclejdk11 | - [Common components](#common-724)<br>- Node 10.15.1<br>- Ruby 2.6.1 <br>- Gradle 5.2.1 <br>- Maven 3.6.0 <br>- Apache-ant 1.10.1 <br>- Android-sdk 26.0.1 (to be used with openjdk11/oraclejdk11)|
   | Ubuntu 16.04 (aarch64) | drydockaarch64/u16javall:v7.2.4 | [Docker Hub](https://hub.docker.com/r/drydockaarch64/u16javall/)<br> [GitHub](https://github.com/dry-dock/aarch64_u16javall) | - openjdk7<br>- openjdk8<br>- openjdk10<br>- openjdk11<br>- oraclejdk8 | [Common components](#common-724)<br>- Node 10.15.1<br>- Ruby 2.6.1 <br>- Gradle 5.2.1 <br>- Maven 3.6.0 <br>- Apache-ant 1.10.1 <br>- Android-sdk 26.0.1 (to be used with openjdk11/oraclejdk8)|
   | Ubuntu 14.04 | drydock/u14javall:v7.2.4 | - [Docker Hub](https://hub.docker.com/r/drydock/u14javall/)<br>- [GitHub](https://github.com/dry-dock/u14javall) | - openjdk7<br>- openjdk8<br>- openjdk10<br>- openjdk11<br>- oraclejdk8<br>- oraclejdk11  | - [Common components](#common-724)<br>- Node 10.15.1<br>- Ruby 2.6.1 <br>- Gradle 5.2.1 <br>- Maven 3.6.0 <br>- Apache-ant 1.10.1<br>- Android-sdk 26.0.1 (to be used with openjdk11/oraclejdk11) |
   | CentOS 7 | drydock/c7javall:v7.2.4 | - [Docker Hub](https://hub.docker.com/r/drydock/c7javall/)<br>- [GitHub](https://github.com/dry-dock/c7javall) | - openjdk7<br>- openjdk8<br>- openjdk10<br>- openjdk11<br>- oraclejdk8<br>- oraclejdk11  | - [Common components](#common-724)<br>- Node 10.15.1 <br>- Ruby 2.6.1 <br>- Gradle 5.2.1 <br>- Maven 3.6.0 <br>- Apache-ant 1.10.1 <br>- Android-sdk 26.0.1 (to be used with openjdk11/oraclejdk11) |

  Note: "Please [read this](/ci/java-continuous-integration/) if you need to use Gradle or Ant on JDK 7 with this image"

  ---

  <a name="nod-724"></a>

### Node.js

  | OS           | Image                    | Link                                                                                                          | Language versions                                                 | Additional packages                                                                |
  |--------------|--------------------------|---------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------|------------------------------------------------------------------------------------|
  | Ubuntu 16.04 | drydock/u16nodall:v7.2.4 | [Docker Hub](https://hub.docker.com/r/drydock/u16nodall/)<br> [GitHub](https://github.com/dry-dock/u16nodall) | - 6.16.0  <br>- 8.15.0  <br>- 10.15.1 <br>- 11.10.0  | [Common components](#common-724)<br>nvm<br>npm 6.8.0<br>Java 11<br>Ruby 2.6.1<br>Yarn 1.13.0|
  | Ubuntu 16.04 (aarch64) | drydockaarch64/u16nodall:v7.2.4 | [Docker Hub](https://hub.docker.com/r/drydockaarch64/u16nodall/)<br> [GitHub](https://github.com/dry-dock/aarch64_u16nodall) |- 6.16.0 <br>- 8.15.0  <br>- 10.15.1 <br>- 11.10.0  | [Common components](#common-724)<br>nvm<br>npm 6.8.0<br>Java 11<br>Ruby 2.6.1<br>Yarn 1.13.0|
  | Ubuntu 14.04 | drydock/u14nodall:v7.2.4 | [Docker Hub](https://hub.docker.com/r/drydock/u14nodall/)<br>[GitHub](https://github.com/dry-dock/u14nodall)  | - 6.16.0  <br />- 8.15.0 <br />- 10.15.1  <br>- 11.10.0  | [Common components](#common-724)<br>nvm<br>npm 6.8.0<br>Java 11<br>Ruby 2.6.1<br>Yarn 1.13.0|
  | CentOS 7 | drydock/c7nodall:v7.2.4 | [Docker Hub](https://hub.docker.com/r/drydock/c7nodall/)<br>[GitHub](https://github.com/dry-dock/c7nodall)  | - 6.16.0 <br />- 8.15.0  <br />- 10.15.1 <br>- 11.10.0   | [Common components](#common-724)<br>nvm<br>npm 6.8.0<br>Java 11<br>Ruby 2.6.1<br>Yarn 1.13.0|

 ---

 <a name="php-724"></a>

### PHP

  | OS           | Image                    | Link                                                                                                          | Language versions       | Additional packages                                                                              |
  |--------------|--------------------------|---------------------------------------------------------------------------------------------------------------|-------------------------|--------------------------------------------------------------------------------------------------|
  | Ubuntu 16.04 | drydock/u16phpall:v7.2.4 | - [Docker Hub](https://hub.docker.com/r/drydock/u16phpall/),<br>- [Github](https://github.com/dry-dock/u16phpall) | - 7.1.26<br>- 7.2.15<br>- 7.3.2 | - [Common components](#common-724)<br>- phpenv 1.1.1-2-g615f844<br>- Java 11<br>- Node 10.15.1<br>- Ruby 2.6.1 |
  | Ubuntu 14.04 | drydock/u14phpall:v7.2.4 | - [Docker Hub](https://hub.docker.com/r/drydock/u14phpall/),<br>- [Github](https://github.com/dry-dock/u14phpall) | - 7.1.26<br>- 7.2.15<br>- 7.3.2 | - [Common components](#common-724)<br>- phpenv 1.1.1-2-g615f844<br>- Java 11<br>- Node 10.15.1<br>- Ruby 2.6.1  |
  |CentOS 7 | drydock/c7phpall:v7.2.4 | - [Docker Hub](https://hub.docker.com/r/drydock/c7phpall/),<br>- [Github](https://github.com/dry-dock/c7phpall) | - 7.1.26<br>- 7.2.15<br>- 7.3.2 | - [Common components](#common-724)<br>- phpenv 1.1.1-2-g615f844<br>- Java 11<br>- Node 10.15.1<br>- Ruby 2.6.1  |


  <a name="pyt-724"></a>

### Python

   | OS           | Image                    | Link                                                                                                      | Language versions                                       | Additional packages                                                                 |
   |--------------|--------------------------|-----------------------------------------------------------------------------------------------------------|---------------------------------------------------------|-------------------------------------------------------------------------------------|
   | Ubuntu 16.04 | drydock/u16pytall:v7.2.4 | - [Docker Hub](https://hub.docker.com/r/drydock/u16pytall/)<br> - [GitHub](https://github.com/dry-dock/u16pytall) |- 2.7.15 <br>- 3.7.2 <br>- pypy2 7.0.0 <br>- pypy3 7.0.0 | - [Common components](#common-724)<br>- virtualenv<br>- Java 11<br>- Node 10.15.1<br>- Ruby 2.6.1 |
   | Ubuntu 16.04 (aarch64) | drydockaarch64/u16pytall:v7.2.4 | - [Docker Hub](https://hub.docker.com/r/drydockaarch64/u16pytall/)<br> - [GitHub](https://github.com/dry-dock/aarch64_u16pytall) | - 2.7.12<br>- 3.7.2  | [Common components](#common-724)<br>- Java 11<br>- Node 10.15.1 <br>- Ruby 2.6.1 |
   | Ubuntu 14.04 | drydock/u14pytall:v7.2.4 | - [Docker Hub](https://hub.docker.com/r/drydock/u14pytall/)<br>- [GitHub](https://github.com/dry-dock/u14pytall)  | - 2.7.15<br>- 3.7.0<br>- pypy2 7.0.0<br>- pypy3 7.0.0 | - [Common components](#common-724)<br>- virtualenv<br>- Java 11<br>- Node 10.15.1<br>- Ruby 2.6.1  |
   | CentOS 7 | drydock/c7pytall:v7.2.4 | - [Docker Hub](https://hub.docker.com/r/drydock/c7pytall/)<br>- [GitHub](https://github.com/dry-dock/c7pytall)  | - 2.7.15 <br>- 3.7.2 | - [Common components](#common-724)<br>- virtualenv<br>- Java 11<br>- Node 10.15.1 <br>- Ruby 2.6.1  |

  ---

 <a name="rub-724"></a>

### Ruby

  | OS           | Image                    | Link                                                                                                          | Language versions                                              | Additional packages                                                    |
  |--------------|--------------------------|---------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------|------------------------------------------------------------------------|
  | Ubuntu 16.04 | drydock/u16ruball:v7.2.4 | <br>- [Docker Hub](https://hub.docker.com/r/drydock/u16ruball/),<br>- [GitHub](https://github.com/dry-dock/u16ruball) |- 2.3.8<br>- 2.4.5<br>- 2.5.3<br>- 2.6.1<br>- jruby-9.2.6.0 | - [Common components](#common-724)<br>- rvm 1.29.7<br>- Java 11<br>- Node 10.15.1  |
  | Ubuntu 14.04 | drydock/u14ruball:v7.2.4 | <br>- [Docker Hub](https://hub.docker.com/r/drydock/u14ruball/),<br>- [GitHub](https://github.com/dry-dock/u14ruball) |- 2.3.8<br>- 2.4.5<br>- 2.5.3<br>- 2.6.1<br>- jruby-9.2.6.0 | - [Common components](#common-724)<br>- rvm 1.29.7<br>- Java 11<br>- Node 10.15.1 |
  | CentOS 7 | drydock/c7ruball:v7.2.4 | <br>- [Docker Hub](https://hub.docker.com/r/drydock/c7ruball/),<br>- [GitHub](https://github.com/dry-dock/c7ruball) |- 2.3.8<br>- 2.4.5<br>- 2.5.3<br>- 2.6.1<br>- jruby-9.2.6.0 | - [Common components](#common-724)<br>- rvm 1.29.7<br>- Java 11<br>- Node 10.15.1 |

 ---

  <a name="sca-724"></a>

### Scala

   | OS           | Image                    | Link                                                                                                          | Language versions                | Additional packages                                                          |
   |--------------|--------------------------|---------------------------------------------------------------------------------------------------------------|----------------------------------|------------------------------------------------------------------------------|
   | Ubuntu 16.04 | drydock/u16scaall:v7.2.4 | - [Docker Hub](https://hub.docker.com/r/drydock/u16scaall/),<br>- [GitHub](https://github.com/dry-dock/u16scaall) |<br>- 2.11.12<br>- 2.12.8 | - [Common components](#common-724)<br>- sbt<br>- Java 11<br>- Node 10.15.1 <br>- Ruby 2.6.1 |
   | Ubuntu 14.04 | drydock/u14scaall:v7.2.4 | - [Docker Hub](https://hub.docker.com/r/drydock/u14scaall/),<br>- [GitHub](https://github.com/dry-dock/u14scaall) | - 2.11.12<br>- 2.12.8 | - [Common components](#common-724)<br>- sbt<br>- Java 11<br>- Node 10.15.1<br>- Ruby 2.6.1  |
   | CentOS 7 | drydock/c7scaall:v7.2.4 | - [Docker Hub](https://hub.docker.com/r/drydock/c7scaall/),<br>- [GitHub](https://github.com/dry-dock/c7scaall) | - 2.11.12<br>- 2.12.8 | - [Common components](#common-724)<br>- sbt<br>- Java 11<br>- Node 10.15.1<br>- Ruby 2.6.1  |
