page_main_title: Job Runtime Overview
main_section: Platform
sub_section: Runtime
page_title: Job Runtime Overview

# Runtime
Every activity in your DevOps Assembly Line requires a place to execute that activity. Job Runtime provides that so that the environment is prepped with the necessary OS, software tools and packages, runtime configurations, and secrets to authenticate with 3rd party services that the activity might interact with.

Some of the key benefits of this are:

* You don't need to constantly change your build environment configuration every time a different DevOps activity needs to be performed. For example,
	* Re-configuring your AWS keys depending on whether it's a Dev, Test or Prod environment.
	* Constantly having to change environment variables as we work with different tools and software packages.
	* Having to install multiple different tools/versions like Chef, Puppet, and Terraform as different teams use different tools.
* Reduce build time by leveraging caching instead of constantly prepping the environment to run your job.
* Not worrying about repeatability in the process as all the config and settings are not ad hoc, i.e. error prone.
* Reduce the cost of build infrastructure by leveraging dynamic node creation. Most organizations have less than 5% utilization of their build environment.
* Ability to run your build environment behind a firewall and still leverage the SaaS-based DevOps Assembly Line platform.

## Components of Job Runtime
Job Runtime consists of the following components.

<a name="os"></a>
### Operating System
Job Runtime is designed to work on any Linux distro. Most of our SaaS customers use Ubuntu and we supply pre-built images for the following.

* [Ubuntu 14.04 LTS](/platform/runtime/os/ubuntu14)
* [Ubuntu 16.04 LTS](/platform/runtime/os/ubuntu16)

#### Common components installed
All our images come pre-installed with the following packages:

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
For both OS versions, we maintain [language](/platform/runtime/language/overview)  specific images that are constantly updated so that the latest and greatest versions are always available for you to test. We update these version on a monthly cadence.
We support the following languages -

* [C/C++](/platform/runtime/language/cplusplus)
* [Clojure](/platform/runtime/language/clojure)
* [Go](/platform/runtime/language/go)
* [Java](/platform/runtime/language/java)
* [Node JS](/platform/runtime/language/nodejs)
* [PHP](/platform/runtime/language/php)
* [Python](/platform/runtime/language/python)
* [Ruby](/platform/runtime/language/ruby)
* [Scala](/platform/runtime/language/scala)

<a name="service"></a>
### Services
To make your builds even faster, we also pre-install a bunch of [services](/platform/runtime/service/overview) that your application may need. These are also updated on a monthly cadence.

Following are the services that are pre-installed -

* [Cassandra](/platform/runtime/service/cassandra)
* [CouchDB](/platform/runtime/service/couchdb)
* [Elasticsearch](/platform/runtime/service/elasticsearch)
* [Memcached](/platform/runtime/service/memcached)
* [MongoDB](/platform/runtime/service/mongodb)
* [MySQL](/platform/runtime/service/mysql)
* [Neo4j](/platform/runtime/service/neo4j)
* [Postgres](/platform/runtime/service/postgres)
* [RabbitMQ](/platform/runtime/service/rabbitmq)
* [Redis](/platform/runtime/service/redis)
* [RethinkDB](/platform/runtime/service/rethinkdb)
* [Riak](/platform/runtime/service/riak)
* [Selenium](/platform/runtime/service/selenium)
* [SQLLite](/platform/runtime/service/sqllite)

<a name="cli"></a>
### Command Line Interfaces (CLI)
The majority of apps today run in the cloud. Each cloud provider has a native CLI and we want to avoid you having to install and configure them. In addition we also pre-install some popular DevOps tools. The goals is to try and prep the build environment as close to your desired state as possible so that you can spend less time prepping and more time developing applications.

Here is a list of CLIs we have available as part of Job Runtime -

* [Ansible](/platform/runtime/cli/ansible)
* [AWS](/platform/runtime/cli/aws)
* [AWS Elastic Beanstalk](/platform/runtime/cli/awseb)
* [Azure](/platform/runtime/cli/azure)
* [Docker](/platform/runtime/cli/docker)
* [Google Cloud](/platform/runtime/cli/gke)
* [JFrog](/platform/runtime/cli/jfrog)
* [Packer](/platform/runtime/cli/packer)
* [Terraform](/platform/runtime/cli/terraform)
* [Kubectl](/platform/runtime/cli/kubectl)

<a name="nodes"></a>
### Nodes
To run you DevOps activities, you need a node (virtual machine). Shippable supports 2 types of nodes:

* [Dedicated Dynamic Nodes](/platform/tutorial/runtime/dynamic-nodes) -- these are managed and dynamically provisioned by Shippable Platform. There is no need to worry about managing build infrastructure. There are multiple sizes that you can use depending on your need:
	* 2 core, 3.75GB RAM (default) -- this is equivalent to AWS c4.large instance type
	* 4 core, 7.5GB RAM -- this is equivalent to AWS c4.xlarge instance type
	* 8 core, 15GB RAM -- this is equivalent to AWS c4.2xlarge instance type

* [Dedicated Custom Nodes](/platform/tutorial/runtime/custom-nodes) -- these are nodes that you manage yourself and hook to Shippable Assembly Lines to run your DevOps activities. The biggest reason for doing this is that your code never leaves your infrastructure. Another reason to do this would be if your jobs require access to internal resources that you don't want to be accessible from the internet. You can run these nodes anywhere you like.

<a name="env"></a>
### Environment variables
Environment variables are used to control the context of your DevOps activity. Setting this manually every time you execute a particular activity can be very error prone and missed configurations can cause serious trouble. You might actually be working on a production system when you thought you had your laptop configured to use your test system. To avoid this, Job Runtime provides many very easy ways to inject this into your Job Runtime before you start your activity and clears the state completely once the activity finishes.

Typical use cases for this include:

* Configuring your AWS Credentials to connect to a VPC
* SSH Keys to access your VMs
* Login to your Docker Hub
* Stage specific application configurations, e.g., Dev Settings vs. Test Settings
* Logging verbosity for different stages of Software Delivery
* Docker options for multi-stage deployments

We provide multiple ways to control how environment variables are injected into your Job Runtime. This also varies a bit depending on the [resource types](/platform/workflow/resource/overview) you are using. Environment variables are most often used with [runSh](/platform/workflow/job/runsh) and [runCI](/platform/workflow/job/runci) job types.

<a name="cache"></a>
### Caching

Caching speeds up your CI builds by automatically setting up your static dependencies. As an example, you can cache the following:

- node modules
- ruby gems
- static binaries from external sources

Read more [about caching here](/platform/tutorial/runtime/caching).

## Further Reading
* [Build Images](/platform/tutorial/runtime/ami-overview)
* [More about Environment Variables](/platform/tutorial/runtime/environment-variables)
* [More about Caching](/platform/tutorial/runtime/caching)
* [Jobs Overview](/platform/workflow/job/overview)
