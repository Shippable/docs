page_main_title: Job Runtime Overview
main_section: Platform
sub_section: Job Runtime
page_title: Job Runtime Overview

# TODO
| Tasks   |      Status    |
|----------|-------------|
| Further Reading needs thinking|  Open |

# Job Runtime
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

### Operating System
Job Runtime is designed to work on any Linux distro. Most of our SaaS customers use Ubuntu and we supply pre-built images for

* Ubuntu 14.04 LTS
* Ubunti 16.04 LTS

Since we are a Docker based platform, any custom image based on a Linux distro can be used in Job Runtime. For more details visit the [Operating Systems page](/platform/job-runtime-os)

## Language
For both the OS versions, we maintain [language](platform/language-overview)  specific images that are constantly updated so that the latest and greatest versions are always available for you to test. We update these version on a monthly cadence.
We support the following languages -

* [Clojure](/platform/language-clojure)
* [GO](/platform/language-go)
* [Java](/platform/language-java)
* [Node JS](/platform/language-nodejs)
* [PHP](/platform/language-php)
* [Python](/platform/language-python)
* [Ruby](/platform/language-ruby)
* [Scala](/platform/language-scala)

## Services
To make your builds even faster, we also pre-install a bunch of Services that your application may need. These are also updated on a monthly cadence.

Following are the service that are pre-installed -

* [Cassandra](/platform/service-cassandra)
* [CouchDB](/platform/service-couchdb)
* [ElasticSearch](/platform/service-elasticsearch)
* [Memcached](/platform/service-memcached)
* [MongoDB](/platform/service-mongodb)
* [MySQL](/platform/service-mongodb)
* [Neo4j](/platform/service-neo4j)
* [Postgres](/platform/service-postgres)
* [RabbitMQ](/platform/service-rabbitmq)
* [Redis](/platform/service-redis)
* [RethidDB](/platform/service-rethinkdb)
* [Riak](/platform/service-riak)
* [Selenium](/platform/service-selenium)
* [SqlLite](/platform/service-sqllite)

## Command Line Interfaces (CLI)
Majority of the apps today run on cloud. Each cloud provider has a native CLI and we want to avoid you having to install and configure them. In addition we also pre-install some popular DevOps tools also. The goals is to try and prep the build environment as close to your desired state so that you can spend less time prepping and more time developing applications.

Here is a list of CLIs we have available as part of Job Runtime -

* [Ansible](/platform/cli-ansible)
* [AWS](/platform/cli-aws)
* [AWS Elastic Beanstalk](/platform/cli-awseb)
* [Azure](/platform/cli-azure)
* [Docker](/platform/cli-docker)
* [GKE](/platform/cli-gke)
* [JFrog](/platform/cli-jfrog)
* [Packer](/platform/cli-packer)
* [Terraform](/platform/cli-terraform)

## Nodes
[Nodes](/platform/job-runtime-nodes) are host machines on which the desired Job Runtime image is instantiated. One of the key differentiators of Shippable is that you can use Nodes that run behind your firewall and connect them to the DevOps Assembly Lines SaaS Platform. If you dont need that capability, you can run your [Jobs]() on on Shippable's hosted infrastructure (Dynamic Nodes)

## Environment variables
[Environment variables](/platform/job-runtime-environment-variables) are used to control the context of your DevOps activity. This can be very error prone and missed configurations can cause serious trouble. You might actually be working on a production system when you thought you had your laptop configured to use your test system. To avoid this, Job Runtime provides very many easy ways to inject this into your Job Runtime before you start your activity and also clear the state completely once the activity finishes. For example AWS Credentials to connect to your VPC; Keys to access your VMs; Login to your Docker hub etc.

## Caching
[Caching](/platform/job-runtime-caching) speeds up your build by automatically setting up your static dependencies. Typical usecases are caching node modules, ruby gems and static binaries.

# Further Reading
* Working with Resources
* Working with Integrations
* Jobs
