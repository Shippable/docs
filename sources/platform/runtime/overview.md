page_main_title: Job Runtime Overview
main_section: Platform
sub_section: Runtime
page_title: Job Runtime Overview

# Runtime
Every activity in your DevOps Assembly Line requires a place to execute that activity. Job Runtime provides that so that the environment is prepped with all the necessary OS, software tools and packages, runtime configurations as well as secrets to authenticate to 3rd party services that the activity might interact with.

Some of the key benefits of this are

* You don't need to constantly change your build environment config as settings, every time a different DevOps activity needs to be performed. For example,
	* re-configuring your AWS keys depending on whether its a Dev, Test or Prod env;
	* Constantly having to change environment variables as we work with different tools and software packages;
	* Having to install multiple different tools/versions like Chef, Puppet and Terraform as different teams use different tools
* Reduce build time have to constantly prep the environment to run your Job by leveraging caching
* Having to worry about repeatability in the process as all the config and settings are adhoc, i.e. error prone
* Reduce the cost of build infrastructure by leveraging Dynamic node creation. Most of the organizations have less than 5% utilization of their build environment
* Ability to run your build environment behind the firewall and still leverage the SaaS based DevOps Assembly Line platform

## Components of Job Runtime
Job Runtime consists of the following components

<a name="os"></a>


### Operating System
Job Runtime is designed to work on any Linux distro. Most of our SaaS customers use Ubuntu and we supply pre-built images for

* [Ubuntu 14.04 LTS](/platform/runtime/os/ubuntu14)
* [Ubuntu 16.04 LTS](/platform/runtime/os/ubuntu16)

#### Common components installed
All our images come pre-installed with the following packages....

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

Since we are a Docker based platform, any custom image based on a Linux distro can be used in Job Runtime.

<a name="language"></a>


### Language
For both the OS versions, we maintain [language](platform/runtime/language/overview)  specific images that are constantly updated so that the latest and greatest versions are always available for you to test. We update these version on a monthly cadence.
We support the following languages -

* [Clojure](/platform/runtime/language/clojure)
* [GO](/platform/runtime/language/go)
* [Java](/platform/runtime/language/java)
* [Node JS](/platform/runtime/language/nodejs)
* [PHP](/platform/runtime/language/php)
* [Python](/platform/runtime/language/python)
* [Ruby](/platform/runtime/language/ruby)
* [Scala](/platform/runtime/language/scala)

<a name="service"></a>


### Services
To make your builds even faster, we also pre-install a bunch of [Services](platform/runtime/service/overview) that your application may need. These are also updated on a monthly cadence.

Following are the service that are pre-installed -

* [Cassandra](/platform/runtime/service/cassandra)
* [CouchDB](/platform/runtime/service/couchdb)
* [ElasticSearch](/platform/runtime/service/elasticsearch)
* [Memcached](/platform/runtime/service/memcached)
* [MongoDB](/platform/runtime/service/mongodb)
* [MySQL](/platform/runtime/service/mongodb)
* [Neo4j](/platform/runtime/service/neo4j)
* [Postgres](/platform/runtime/service/postgres)
* [RabbitMQ](/platform/runtime/service/rabbitmq)
* [Redis](/platform/runtime/service/redis)
* [RethidDB](/platform/runtime/service/rethinkdb)
* [Riak](/platform/runtime/service/riak)
* [Selenium](/platform/runtime/service/selenium)
* [SqlLite](/platform/runtime/service/sqllite)

<a name="cli"></a>


### Command Line Interfaces (CLI)
Majority of the apps today run on cloud. Each cloud provider has a native CLI and we want to avoid you having to install and configure them. In addition we also pre-install some popular DevOps tools also. The goals is to try and prep the build environment as close to your desired state so that you can spend less time prepping and more time developing applications.

Here is a list of CLIs we have available as part of Job Runtime -

* [Ansible](/platform/runtime/cli/ansible)
* [AWS](/platform/runtime/cli/aws)
* [AWS Elastic Beanstalk](/platform/runtime/cli/awseb)
* [Azure](/platform/runtime/cli/azure)
* [Docker](/platform/runtime/cli/docker)
* [GKE](/platform/runtime/cli/gke)
* [JFrog](/platform/runtime/cli/jfrog)
* [Packer](/platform/runtime/cli/packer)
* [Terraform](/platform/runtime/cli/terraform)
* [Kubectl](/platform/runtime/cli/kubectl)

<a name="nodes"></a>


### Nodes
To run you DevOps activities, you need a Node (virtual machine). Shippable support 2 types of Nodes

* [Dedicated Dynamic Nodes](/platform/tutorial/runtime/dynamic-nodes) -- these are managed and dynamically provisioned by Shippable Platform. There is no need to worry about managing build infrastructure. There are multiple sizes that you can use depending on your need
	* 2 core, 3.75GB RAM (default) -- this is equivalent of AWS c4.large instance type
	* 4 core, 7.5GB RAM -- this is equivalent of AWS c4.xlarge instance type
	* 8 core, 15GB RAM -- this is equivalent of AWS c4.2xlarge instance type
	
* [Dedicated Custom Nodes](/platform/runtime/tutorial/custom-nodes) -- these are Nodes that you manage it yourself and hook it to Shippable Assembly Lines to run your DevOps activities. The biggest reason for doing this is that all your code never leaves your infrastructure. Another reason to do this would be that your jobs require access to internal resources that you dont want to be accessible from the internet. You could run these Nodes anywhere you like.

<a name="env"></a>


### Environment variables
Environment variables are used to control the context of your DevOps activity. Setting this manually everytime you execute a particular activity can be very error prone and missed configurations can cause serious trouble. You might actually be working on a production system when you thought you had your laptop configured to use your test system. To avoid this, Job Runtime provides very many easy ways to inject this into your Job Runtime before you start your activity and also clear the state completely once the activity finishes. 

Typical use cases for this are

* Configuring your AWS Credentials to connect to a VPC
* SSH Keys to access your VMs 
* Login to your Docker hub
* Stage specific application configurations e.g. Dev Settings vs Test Settings
* Logging verbosity for different stages of Software Delivery 
* Docker options for multi stage deployments

We provide multiple ways to control how environment variables are injected into your Job Runtime. This also varies a bit depending on the [Resource Types](/platform/workflow/resource/overview) you are using. This is applicable to [RunSh](/platform/workflow/job/runsh) and [RunCI](/platform/workflow/job/runci) Job types. 

<a name="cache"></a>
### Caching
Caching speeds up your build by automatically setting up your static dependencies. It can be used to speed up builds by 

- caching node modules
- ruby gems 
- static binaries from external sources
- ... and so on

## Further Reading
* [Build Images](/platform/tutorial/runtime/ami-overview)
* [More about Environment Variables](/platform/tutorial/runtime/environment-variables)
* [More about Caching](/platform/tutorial/runtime/caching)
* [Jobs Overview](/platform/workflow/job/overview)
