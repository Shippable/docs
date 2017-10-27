page_main_title: Ubuntu 16.04 Image for CI
main_section: Platform
sub_section: Runtime
sub_sub_section: Operating System
page_title: Ubuntu 16.04 Image for CI

# Ubuntu 16.04

Ubuntu 16.04 based images for Shippable Continuous Integration are available as part of the platform. All our Ubuntu 16.04 [language images](/platform/runtime/machine-images/ami-overview) are derived from this base image. This image comes pre-installed with the latest versions of Java, Ruby, and Node along with the OS default version of Python. We also install all the [services](/platform/runtime/service/overview) we support on this image.

We update this image, `drydock/u16all`, monthly and push a unique tag to our [drydock repository](https://hub.docker.com/r/drydock/u16all/) on Docker Hub. The tag is of the format `<Version>.<Month>.<Release Number>`.

## Currently Supported Images

|Image| Release Date |Available in AMI |
|----------|------------|-----|
[drydock/u16all:v5.8.2](/platform/runtime/os/ubuntu16#v582)  | Aug 2017 - Latest Version | [v5.8.2](/platform/tutorial/runtime/ami-v582)
[drydock/u16all:v5.7.3](/platform/runtime/os/ubuntu16#v573)  | Jul 2017 | [v5.7.3](/platform/tutorial/runtime/ami-v573)
[drydock/u16all:v5.6.1](/platform/runtime/os/ubuntu16#v561)  | Jun 2017 | [v5.6.1](/platform/tutorial/runtime/ami-v561)
[drydock/u16all:v5.5.1](/platform/runtime/os/ubuntu16#v551) | May 2017 | [v5.5.1](/platform/tutorial/runtime/ami-v551)
[drydock/u16all:v5.4.1](/platform/runtime/os/ubuntu16#v541)  | Apr 2017 | [v5.4.1](/platform/tutorial/runtime/ami-v541)
[drydock/u16all:v5.3.2](/platform/runtime/os/ubuntu16#v532)  | Mar 2017 | [v5.3.2](/platform/tutorial/runtime/ami-v532)

We support a minimum of 12 tags, i.e. 12 months, for backward compatibility.

These images are pre-packaged into an Amazon Machine Image (AMI) for faster build times. This AMI is used to boot the VM on which your [runCI](/platform/workflow/job/runci) job will execute. You can set which AMI to use for your organization following these [instructions](/ci/build-image).

You can configure different images or even [build](/ci/custom-docker-image) your own from scratch for your [runCI](/platform/workflow/job/runci) jobs.

<a name="v582"></a>
## Image `drydock/u16all:v5.8.2`

These are the **Languages** installed:

* Java - 1.8.0
* NodeJS - 7.10.0
* Ruby - 2.3.3

These are the **Packages** installed:

*  build-essential - 12.1ubuntu2
*  dopy - 0.3.7a
*  doctl - jq=1.5+dfsg-1
*  curl - 7.47.0-1ubuntu2.2
*  gcc - 4:5.3.1-1ubuntu1
*  gettext - 0.19.7-2ubuntu3
*  git - 1:2.13.0-0ppa1~ubuntu16.04.1
*  htop - 2.0.1-1ubuntu1
*  jq - 1.3-1.1ubuntu1
*  libxml2-dev - 2.9.3+dfsg1-1ubuntu0.2
*  libxslt1-dev - 1.1.28-2.1ubuntu0.1
*  make - 4.1-6
*  nano - 2.5.3-2ubuntu2
*  openssh-client - 1:7.2p2-4ubuntu2.1
*  openssl - 1.0.2g-1ubuntu4.6
*  python-dev - 2.7.5-5ubuntu3
*  python-software-properties - 0.92.37.8
*  software-properties-common - 0.96.20.7
*  sudo - 1.8.16-0ubuntu1.4  
*  texinfo - 6.1.0.dfsg.1-5
*  unzip - 6.0-20ubuntu1
*  virtualenv - 15.1.0
*  wget - 1.17.1-1ubuntu1.1
*  rsync - 3.1.1-3ubuntu1
*  psmisc - 22.21-2.1build1
*  vim - 2:7.4.1689-3ubuntu1.2

These are the **CLIs** installed:

* ansible - 2.3.0.0
* awscli - 1.11.91
* awsebcli - 3.10.3
* azure - 2.0.12
* gcloud - 165.0.0
* jfrog-cli - 1.10.1
* kubectl - 1.7.2
* packer - 1.0.3
* terraform - 0.10.0

These are the **Services** installed:

* cassandra - 3.11
* couchdb - 1.6
* elasticsearch - 5.5.1
* neo4j - 3.2.3
* memcached - 1.5.0
* mongodb - 3.4.7
* mysql - 5.7.18
* postgres - 9.6.3
* rabbitmq - 3.6.10
* redis - 4.0.1
* rethinkdb - 2.3.6
* riak - 2.2.3
* selenium - 3.4.0
* sqllite - 3.19.3

<a name="v573"></a>
## Image `drydock/u16all:v5.7.3`

These are the **Languages** installed:

* Java - 1.8.0
* NodeJS - 7.10.0
* Ruby - 2.3.3

These are the **Packages** installed:

* build-essential - 11.6ubuntu6
* curl - 7.35.0-1ubuntu2.10
* gcc - 4:4.8.2-1ubuntu6
* gettext - 0.18.3.1-1ubuntu3
* git - 1:2.13.0-0ppa1~ubuntu16.04.1
* htop - 1.0.2-3
* jq - 1.3-1.1ubuntu1
* libxml2-dev - 2.9.1+dfsg1-3ubuntu4.9
* libxslt-dev - 1.1.28-2ubuntu0.1
* make - 3.81-8.2ubuntu3
* nano - 2.2.6-1ubuntu1
* openssh-client - 1:6.6p1-2ubuntu2.8
* openssl - 1.0.1f-1ubuntu2.22
* python-dev - 2.7.5-5ubuntu3
* python-software-properties - 0.92.37.8
* sudo - 1.8.9p5-1ubuntu1
* texinfo - 5.2.0.dfsg.1-2
* unzip - 6.0-9ubuntu1.5
* virtualenv - 15.1.0
* wget - 1.15-1ubuntu1.14.04.2
* dopy - 0.3.7a
* doctl - jq=1.5+dfsg-1

These are the **CLIs** installed:

* ansible - 2.3.0.0
* awscli - 1.11.44
* awsebcli - 3.9
* azure - 2.0.6
* gcloud - 160.0.0
* jfrog-cli - 1.7.0
* kubectl - 1.5.1
* packer - 0.12.2
* terraform - 0.8.7

These are the **Services** installed:

* cassandra - 3.11
* couchdb - 1.6
* elasticsearch - 5.5.0
* neo4j - 3.2.2
* memcached - 1.4.39
* mongodb - 3.4.6
* mysql - 5.6
* postgres - 9.6.3  
* rabbitmq - 3.6.10
* redis - 3.2.9
* rethinkdb - 2.3.5
* riak - 2.2.3
* selenium - 3.4.0
* sqllite - 3.19.3

<a name="v561"></a>
## Image `drydock/u16all:v5.6.1`

These are the **Languages** installed:

* Java - 1.8.0
* NodeJS - 7.10.0
* Ruby - 2.3.3

These are the **Packages** installed:

* build-essential - 11.6ubuntu6
* curl - 7.35.0-1ubuntu2.10
* gcc - 4:4.8.2-1ubuntu6
* gettext - 0.18.3.1-1ubuntu3
* git - 1:2.13.0-0ppa1~ubuntu16.04.1
* htop - 1.0.2-3
* jq - 1.3-1.1ubuntu1
* libxml2-dev - 2.9.1+dfsg1-3ubuntu4.9
* libxslt-dev - 1.1.28-2ubuntu0.1
* make - 3.81-8.2ubuntu3
* nano - 2.2.6-1ubuntu1
* openssh-client - 1:6.6p1-2ubuntu2.8
* openssl - 1.0.1f-1ubuntu2.22
* python-dev - 2.7.5-5ubuntu3
* python-software-properties - 0.92.37.8
* sudo - 1.8.9p5-1ubuntu1
* texinfo - 5.2.0.dfsg.1-2
* unzip - 6.0-9ubuntu1.5
* virtualenv - 15.1.0
* wget - 1.15-1ubuntu1.14.04.2
* dopy - 0.3.7a
* doctl - jq=1.5+dfsg-1

These are the **CLIs** installed:

* ansible - 2.3.0.0
* awscli - 1.11.44
* awsebcli - 3.9
* azure - 2.0.6
* gcloud - 157.0.0
* jfrog-cli - 1.7.0
* kubectl - 1.5.1
* packer - 0.12.2
* terraform - 0.8.7

These are the **Services** installed:

* cassandra - 3.9
* couchdb - 1.6
* elasticsearch - 5.1.2
* neo4j - 3.1.1
* memcached - 1.4.34
* mongodb - 3.4.4
* mysql - 5.6
* postgres - 9.6.3
* rabbitmq - 3.6.6
* redis - 3.2.9
* rethinkdb - 2.3.5
* riak - 2.2.30
* selenium - 3.4.0
* sqllite - 3.11.0


<a name="v551"></a>
## Image `drydock/u16all:v5.5.1`

These are the **Languages** installed:

* Java - 1.8.0
* NodeJS - 7.7.4
* Ruby - 2.3.3

These are the **Packages** installed:

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
* python-software-properties
* sudo
* texinfo
* unzip
* virtualenv
* wget
* dopy
* doctl

These are the **CLIs** installed:

* awscli - 1.11.44
* awsebcli - 3.9
* gcloud - 148.0.0
* jfrog-cli - 1.7.0
* kubectl - 1.5.1
* packer - 0.12.2
* terraform - 0.8.7

These are the **Services** installed:

* cassandra - 3.9
* couchdb - 1.6
* elasticsearch - 5.1.2
* neo4j - 3.1.1
* memcached - 1.4.34
* mongodb - 3.4.3
* mysql - 5.6
* postgres - 9.6.2
* rabbitmq - 3.6.6
* redis - 3.2.8
* rethinkdb - 2.3.5
* riak - 2.2.0
* selenium - 3.0.1
* sqllite - 3.11.0

<a name="v541"></a>
## Image `drydock/u16all:v5.4.1`

These are the **Languages** installed:

* Java - 1.8.0
* NodeJS - 7.7.4
* Ruby - 2.3.3

These are the **Packages** installed:

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
* python-software-properties
* sudo
* texinfo
* unzip
* virtualenv
* wget
* dopy
* doctl

These are the **CLIs** installed:

* awscli - 1.11.44
* awsebcli - 3.9
* gcloud - 148.0.0
* jfrog-cli - 1.7.0
* kubectl - 1.5.1
* packer - 0.12.2
* terraform - 0.8.7

These are the **Services** installed:

* cassandra - 3.9
* couchdb - 1.6
* elasticsearch - 5.1.2
* neo4j - 3.1.1
* memcached - 1.4.34
* mongodb - 3.4.3
* mysql - 5.6
* postgres - 9.6.2
* rabbitmq - 3.6.6
* redis - 3.2.8
* rethinkdb - 2.3.5
* riak - 2.2.0
* selenium - 3.0.1
* sqllite - 3.11.0


<a name="v532"></a>
## Image `drydock/u16all:v5.3.2`

These are the **Languages** installed:

* Java - 1.8.0
* NodeJS - 7.6.0
* Ruby - 2.3.1

These are the **Packages** installed:

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
* python-software-properties
* sudo
* texinfo
* unzip
* virtualenv
* wget
* dopy
* doctl

These are the **CLIs** installed:

* awscli - 1.11.44
* awsebcli - 3.9
* gcloud - 145.0.0
* jfrog-cli - 1.7.0
* kubectl - 1.5.1
* packer - 0.12.2
* terraform - 0.8.7

These are the **Services** installed:

* cassandra - 3.9
* couchdb - 1.6
* elasticsearch - 5.1.2
* neo4j - 3.1.1
* memcached - 1.4.34
* mongodb - 3.4.2
* mysql - 5.6
* postgres - 9.6.2
* rabbitmq - 3.6.6
* redis - 3.2.8
* rethinkdb - 2.3.5
* riak - 2.2.0
* selenium - 3.0.1
* sqllite - 3.11.0
