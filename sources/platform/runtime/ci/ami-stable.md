page_main_title: Stable
main_section: Platform
sub_section: Runtime
sub_sub_section: CI
page_title: Description of what is available in Machine Image Stable
page_description: A complete list of language versions, Docker versions, packages and tools available in Machine Image Stable
page_keywords: CI/CD, shippable CI/CD, documentation, shippable, config, yml, AMI, Docker

# Machine image 'Stable'

**Release Date: ** February 19, 2016 (deprecated)

**What is installed**

* Shippable Official Docker Images (tag: `prod`)
* **Docker Server Version: 1.9.1**
* Storage Driver: aufs
* Root Dir: /data/aufs
* Backing Filesystem: extfs
* Dirperm1 Supported: true
* Execution Driver: native-0.2
* Logging Driver: json-file
* Kernel Version: 3.19.0-51-generic
* Operating System: Ubuntu 14.04.3 LTS

The Shippable Official Docker images are the default images used to spin up your CI build containers. In the following sections, you can find what is available on each official CI image, depending on the `language` specified in your yml.

You can override the default CI image for any project by adding a `pre_ci_boot` section to the yml. The config is [described here](/ci/custom-docker-image/)

##Pre-installed official Docker Images

All CI images with tag `prod` will have the components and services listed below.

In addition, each image, depending on language, also has language versions installed. Please check the next section for the image names and language versions included.

<a name="common-prod"></a>
### Common components

All images with tag `prod` will have the components and services listed below.

In addition, each image, depending on language, also has language versions installed. Please check the next section for the image names and language versions included.

Pre-installed components:

* Git
* Basic packages sudo, build-essential, curl, gcc, make, openssl, software-properties-common, wget, nano, unzip, libxslt-dev, libxml2-dev
* Python packages python-pip, python-software-properties, python-dev
* awscli
* google-cloud-sdk

Pre-installed services:
* couchdb 1.6
* elasticsearch 1.5
* neo4j 2.2
* memcached 1.4
* mongodb 3.0
* mysql 5.6
* postgres 9.4
* rabbitmq 3.5
* redis 3.0
* rethinkdb 2.0
* riak
* selenium 2.52
* sqllite 3


### Node.js

We have one build image for Node projects, which should be sufficient for most projects:

* [dry-dock/u14nodall:prod](https://github.com/dry-dock/u14nodall): Ubuntu 14.04 image with Node

The image contains:

* Node versions:
    * 0.10
    * 0.12 (default if no runtime specified)
    * 4.2.3
    * iojs 1.0
    * iojs 2.0

* Additional packages:
    * Node.js packages grunt-cli, mocha, vows, phantomjs, casperjs
    * Selenium 2.48.2
    * Bower
    * Default Java versions: default-jre, default-jdk, openjdk-6, oracle jdk 7
    * Default Ruby version

Please note that in addition, the image also contains everything listed in [Common components](#common-prod)

### Java

We have one build image for Java projects, which should be sufficient for most projects:

* [dry-dock/u14javall:prod](https://github.com/dry-dock/u14javall): Ubuntu 14.04 image with Java

The image contains:

* Java versions
    * openjdk7
    * openjdk8
    * oraclejdk7
    * oraclejdk8

* Additional packages:
    * Gradle 2.3
    * Apache maven 3.2.5
    * Apache ant 1.9.6
    * Node version 0.10
    * Python 2.7.6
    * Default Ruby version

Please note that in addition, the image also contains everything listed in [Common components](#common-prod)

### Python

We have one build image for Python projects, which should be sufficient for most projects:

* [dry-dock/u14pytall:prod](https://github.com/dry-dock/u14pytall): Ubuntu 14.04 image with Python

The image contains the following:

* Python versions
    * 2.6
    * 2.7 (default if no runtime specified)
    * 3.2
    * 3.3
    * 3.4
    * 3.5
    * pypy
    * pypy3 3

* Additional packages:
    * virtualenv 13.1.2
    * Pip 7.1.2
    * Python pre-reqs libxml2, libxml2-dev, libxslt1.1, libxslt1-dev, libffi-dev, libssl-dev
    * Default Java versions: default-jre, default-jdk, openjdk-6, oracle jdk 7
    * Node 0.10
    * Default Ruby version

Please note that in addition, the image also contains everything listed in [Common components](#common-prod)

### Ruby

We have one build image for Ruby projects, which should be sufficient for most projects:

* [dry-dock/u14ruball:prod](https://github.com/dry-dock/u14ruball): Ubuntu 14.04 image with Ruby

The image contains the following:

* Ruby versions
    * 1.8.7
    * 1.9.2
    * 1.9.3
    * 2.0
    * 2.1.x
    * 2.2.x
    * jruby 18-mode
    * jruby-19mode
    * jruby-head
    * rbx
    * ruby-head
    * ree

* Additional packages:
    * bundler for each Ruby version
    * rvm
    * Default Java versions: default-jre, default-jdk, openjdk-6, oracle jdk 7
    * Python 2.7.6
  	* Node 0.10

Please note that in addition, the image also contains everything listed in [Common components](#common-prod)

### Go

We have one build image for Go projects, which should be sufficient for most projects:

* [dry-dock/u14golall:prod](https://github.com/dry-dock/u14golall): Ubuntu 14.04 image with Go

The image contains the following:

* Go versions
    * 1.1 (default if tag not included in yml)
    * 1.2
    * 1.3
    * 1.4
    * 1.5
    * tip

* Additional packages:
    * Packages autotools-dev, autoconf, bison, git, mercurial, cmake, scons, binutils
    * gvm
    * Default Java versions: default-jre, default-jdk, openjdk-6, oracle jdk 7
    * Node 0.10
    * Python 2.7.6
    * Default Ruby

Please note that in addition, the image also contains everything listed in [Common components](#common-prod)

### PHP

We have one build image for PHP projects, which should be sufficient for most projects:

* [dry-dock/u14phpall:prod](https://github.com/dry-dock/u14phpall): Ubuntu 14.04 image with PHP

The image contain the following:

* PHP versions
    * 5.4
    * 5.5
    * 5.6
    * 7 (without extensions)

* Additional packages:
    * Extensions memcache, memcached, mongo, amqp-1.6.8, zmq-beta, redis
    * phpUnit
    * composer
    * phpenv
    * pickle
    * librabbitmq
    * Packages wget cmake, libmcrypt-dev, libreadline-dev, libzmq-dev, wget, cmake, libmcrypt-dev, libreadline-dev, libzmq-dev, php5-dev
    * Default Java versions: default-jre, default-jdk, openjdk-6, oracle jdk 7
  	* Node 0.10
  	* Default Ruby version
    * Python 2.7.6

Please note that in addition, the image also contains everything listed in [Common components](#common-prod)

### Clojure

We have one build image for Clojure projects, which should be sufficient for most projects:

* [dry-dock/u14cloall:prod](https://github.com/dry-dock/u14cloall): Ubuntu 14.04 image with Clojure

The image contain the following:

* Clojure versions
    * 1.3.0
    * 1.4.0
    * 1.5.1
    * 1.6.0

* Additional packages:
  	* leiningen
    * Default Java versions: default-jre, default-jdk, openjdk-6, oracle jdk 7
    * Node 0.10
  	* Default Ruby version
    * Python 2.7.6

Please note that in addition, the image also contains everything listed in [Common components](#common-prod)

### Scala

We have one primary build image for Scala projects, which should be sufficient for most projects:

* [dry-dock/u14scaall:prod](https://github.com/dry-dock/u14scaall): Ubuntu 14.04 image with Scala

The image contain the following:

* Scala versions
    * 2.9.x
    * 2.10.x
    * 2.11.x

* Additional packages:
    * sbt
    * Default Java versions: default-jre, default-jdk, openjdk-6, oracle jdk 7
    * Node 0.10
  	* Default Ruby version
    * Python 2.7.6

Please note that in addition, the image also contains everything listed in [Common components](#common-prod)

### C/C++

We have one build image for C/C++ projects, which should be sufficient for most projects:

* [dry-dock/u14cppall:prod](https://github.com/dry-dock/u14cppall): Ubuntu 14.04 image with C/C++

The image contains the following:

* C/C++ cpmpiler versions
    * gcc v5.3.0
    * clang v3.8.0

* Additional packages:
    * Default Java versions: default-jre, default-jdk, openjdk-6, oracle jdk 7
    * Node 0.10
    * Default Ruby version
    * Python 2.7.6

Please note that in addition, the image also contains everything listed in [Common components](#common-prod)
