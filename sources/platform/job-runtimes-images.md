page_main_title: Job Image Overview
main_section: Platform
sub_section: Job Runtime
page_title: Job Image Overview

# Job Image

A Job image is an pre-baked image that contains all the necessary components installed.

Shippable Platform supports two types of Job images -

* Shippable Provided Images
Shippable Provided Images are supported on Ubuntu 14 and Ubuntu 16 only. These images contain
a plethora of pre-installed languages and services. These images can be used in your runCI
jobs that run builds. Support for using Shippable Provided Images in other jobs is coming soon.

* Custom Images
[Custom Images](/ci/custom-docker-image/) can be used for running runCI jobs that run builds. Support for using Custom Images
in other jobs is coming soon. A typical use-case of using a Custom image is running a build for
a language or language version or some dependencies and build tool-chain components that is not supported out of the box.

## Languages supported in Shippable Provided Images

* [Nodejs](/platform/language-nodejs)
* [Python](/platform/language-python)
* [Java](/platform/language-java)
* [Ruby](/platform/language-ruby)
* [GO](/platform/language-go)
* [PHP](/platform/language-php)
* [Clojure](/platform/language-clojure)
* [Scala](/platform/language-scala)
* [C/C++](/platform/language-cplusplus)

## Services supported in Shippable Provided Images

* [Cassandra](/platform/service-cassandra)
* [Couchdb](/platform/service-couchdb)
* [Elasticsearch](/platform/service-elasticsearch)
* [Neo4j](/platform/service-neo4j)
* [Memcached](/platform/service-memcached)
* [Mongodb](/platform/service-mongodb)
* [Mysql](/platform/service-mysql)
* [Postgres](/platform/service-postgres)
* [Rabbitmq](/platform/service-rabbitmq)
* [Redis](/platform/service-redis)
* [Rethinkdb](/platform/service-rethinkdb)
* [Riak](/platform/service-riak)
* [Selenium](/platform/service-selenium)
* [Sqllite](/platform/service-sqllite)

## CLI's supported in Shippable Provided Images

* awscli 1.11.44
* awsebcli 3.9
* gcloud 160.0.0
* jfrog-cli 1.7.0
* kubectl 1.5.1
* packer 0.12.2
* terraform 0.8.7

## Common components installed
All the images have these components pre-installed -

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
* Java 1.8.0
* Ruby 2.3.3
