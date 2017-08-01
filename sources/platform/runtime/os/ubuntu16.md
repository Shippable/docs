page_main_title: Ubuntu 16.04 Image for CI
main_section: Platform
sub_section: Runtime
sub_sub_section: Operating System
page_title: Ubuntu 16.04 Image for CI

# Ubuntu 16.04

Ubuntu 16.04 based images for Shippable Continuous Integration is available as part of the platform. All our [Language Images](/platform/runtime/languages/overview) are derived from this base image. This image comes pre-installed with latest version of Java, Ruby & Node along with the OS default version of Python. We also install all the [Services](/platform/runtime/service/overview) we support on this image.

We update this image `drydock/u16all` on a monthly candence and push a unique tag to our [drydock repository](https://hub.docker.com/r/drydock/u16all/) on Docker hub. The tag is of format `<Shippable Version>.<Month>.<Release Number>`

These are the version currently supported 

* [drydock/u16all:v5.7.3](/platform/runtime/os/ubuntu16#v573) - Jul 2017 - Latest Version
* [drydock/u16all:v5.6.1](/platform/runtime/os/ubuntu16#v561) - Jun 2017
* [drydock/u16all:v5.5.1](/platform/runtime/os/ubuntu16#v551) - May 2017
* [drydock/u16all:v5.4.1](/platform/runtime/os/ubuntu16#v541) - Apr 2017
* [drydock/u16all:v5.3.2](/platform/runtime/os/ubuntu16#v532) - Mar 2017

We support a minimum of 12 tags i.e. 12 months for backward compatability. 
u16all
<a name="v573"></a>
## Image `drydock/u16all:v5.7.1`

These are the **Languages** installed

* Java - 1.8.0
* NodeJS - 4.8.4
* Ruby - 2.3.1

These are the **Packages** installed

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

These are the **CLIs** installed

* awscli - 1.11.44
* awsebcli - 3.9
* gcloud - 160.0.0
* jfrog-cli - 1.7.0
* kubectl - 1.5.1
* packer - 0.12.2
* terraform - 0.8.7

These are the **Services** installed

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

These are the **Languages** installed

* Java - 1.8.0
* NodeJS - 4.8.3
* Ruby - 2.3.1

These are the **Packages** installed

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

These are the **CLIs** installed

* awscli - 1.11.44
* awsebcli - 3.9
* gcloud - 157.0.0
* jfrog-cli - 1.7.0
* kubectl - 1.5.1
* packer - 0.12.2
* terraform - 0.8.7

These are the **Services** installed

* couchdb - 1.6 
* elasticsearch - 5.1.2 
* neo4j - 3.1.1
* memcached - 1.4.34 
* mongodb - 3.4 
* mysql - 5.6
* postgres - 9.6  
* rabbitmq - 3.6 
* redis - 3.2
* rethinkdb - 2.3 
* riak - 2.2.30
* selenium - 3.4.0 
* sqllite - 3.0


<a name="v551"></a>
## Image `drydock/u16all:v5.5.1`

These are the **Languages** installed

* Java - 1.8.0
* NodeJS - 4.8.2
* Ruby - 2.3.1

These are the **Packages** installed

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

These are the **CLIs** installed

* awscli - 1.11.44
* awsebcli - 3.9
* gcloud - 145.0.0
* jfrog-cli - 1.7.0
* kubectl - 1.5.1
* packer - 0.12.2
* terraform - 0.8.7

These are the **Services** installed

* couchdb - 1.6 
* elasticsearch - 5.1.2 
* neo4j - 3.1.1
* memcached - 1.4.34 
* mongodb - 3.4 
* mysql - 5.6
* postgres - 9.6  
* rabbitmq - 3.6 
* redis - 3.2
* rethinkdb - 2.3 
* riak - 2.2.0
* selenium - 3.0.1 
* sqllite - 3.0

<a name="v541"></a>
## Image `drydock/u16all:v5.4.1`

These are the **Languages** installed

* Java - 1.8.0
* NodeJS - 4.8.1
* Ruby - 2.3.1

These are the **Packages** installed

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

These are the **CLIs** installed

* awscli - 1.11.44
* awsebcli - 3.9
* gcloud - 145.0.0
* jfrog-cli - 1.7.0
* kubectl - 1.5.1
* packer - 0.12.2
* terraform - 0.8.7

These are the **Services** installed

* couchdb - 1.6 
* elasticsearch - 5.1.2 
* neo4j - 3.1.1
* memcached - 1.4.34 
* mongodb - 3.4 
* mysql - 5.6
* postgres - 9.6  
* rabbitmq - 3.6 
* redis - 3.2
* rethinkdb - 2.3 
* riak - 2.2.0
* selenium - 3.0.1 
* sqllite - 3.0


<a name="v532"></a>
## Image `drydock/u16all:v5.3.2`

These are the **Languages** installed

* Java - 1.8.0
* NodeJS - 4.8.0
* Ruby - 2.3.1

These are the **Packages** installed

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

These are the **CLIs** installed

* awscli - 1.11.44
* awsebcli - 3.9
* gcloud - 145.0.0
* jfrog-cli - 1.7.0
* kubectl - 1.5.1
* packer - 0.12.2
* terraform - 0.8.7

These are the **Services** installed

* couchdb - 1.6 
* elasticsearch - 5.1.2 
* neo4j - 3.1.1
* memcached - 1.4.34 
* mongodb - 3.4 
* mysql - 5.6
* postgres - 9.6  
* rabbitmq - 3.6 
* redis - 3.2
* rethinkdb - 2.3 
* riak - 2.2.0
* selenium - 3.0.1 
* sqllite - 3.0
