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

* [Nodejs](/platform/runtime/language/nodejs)
* [Python](/platform/runtime/language/python)
* [Java](/platform/runtime/language/java)
* [Ruby](/platform/runtime/language/ruby)
* [GO](/platform/runtime/language/go)
* [PHP](/platform/runtime/language/php)
* [Clojure](/platform/runtime/language/clojure)
* [Scala](/platform/runtime/language/scala)
* [C/C++](/platform/runtime/language/cplusplus)

## Services supported in Shippable Provided Images

* [Cassandra](/platform/runtime/service/cassandra)
* [Couchdb](/platform/runtime/service/couchdb)
* [Elasticsearch](/platform/runtime/service/elasticsearch)
* [Neo4j](/platform/runtime/service/neo4j)
* [Memcached](/platform/runtime/service/memcached)
* [Mongodb](/platform/runtime/service/mongodb)
* [Mysql](/platform/runtime/service/mysql)
* [Postgres](/platform/runtime/service/postgres)
* [Rabbitmq](/platform/runtime/service/rabbitmq)
* [Redis](/platform/runtime/service/redis)
* [Rethinkdb](/platform/runtime/service/rethinkdb)
* [Riak](/platform/runtime/service/riak)
* [Selenium](/platform/runtime/service/selenium)
* [Sqllite](/platform/runtime/service/sqllite)

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
