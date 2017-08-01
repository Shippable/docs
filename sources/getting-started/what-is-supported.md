page_main_title: What does Shippable support?
main_section: Getting started
sub_section: Overview

# What is supported?

Shippable DevOps Assembly Line Platform supports most of the popular tools and technology used today to build, test, deploy and operate applications/services/micro-services

Here are some of the major things we support out of the box. With that being said, Shippable Platform is built with Docker in mind. Hence, anything that can be installed inside of a Docker image is supported by the platform

## Node Types
To run you DevOps activities, you need a Node (virtual machine). Shippable support 2 types of Nodes

* [Dedicated Dynamic Nodes](/platform/runtime/dynamic-nodes) -- these are managed and dynamically provisioned by Shippable Platform. There is no need to worry about managing build infrastructure. There are multiple sizes that you can use depending on your need
	* 2 core, 3.75GB RAM (default) -- this is equivalent of AWS c4.large instance type
	* 4 core, 7.5GB RAM -- this is equivalent of AWS c4.xlarge instance type
	* 8 core, 15GB RAM -- this is equivalent of AWS c4.2xlarge instance type
	

* [Dedicated Custom Nodes](/platform/runtime/custom-nodes) -- these are Nodes that you manage it yourself and hook it to Shippable Assembly Lines to run your DevOps activities. The biggest reason for doing this is that all your code never leaves your infrastructure. Another reason to do this would be that your jobs require access to internal resources that you dont want to be accessible from the internet. You could run these Nodes anywhere you like.

## Operating System
The platform is designed to work on any Linux distro. We natively support the following 

* [Ubuntu 14.04 LTS](/platform/runtime/os/ubuntu14)
* [Ubuntu 16.04 LTS](/platform/runtime/os/ubuntu16)

As mentioned before, we are a Docker based platform. Hence any custom image based on a Linux distro can be used in Job Runtime. For more details visit the [Operating Systems page](/platform/runtime/os)

## Language
For both the OS versions, we maintain language specific images that are updated every month so that the latest and greatest versions are always available.
We support the following languages

* [Clojure](/platform/runtime/language/clojure)
* [GO](/platform/runtime/language/go)
* [Java](/platform/runtime/language/java)
* [Node JS](/platform/runtime/language/nodejs)
* [PHP](/platform/runtime/language/php)
* [Python](/platform/runtime/language/python)
* [Ruby](/platform/runtime/language/ruby)
* [Scala](/platform/runtime/language/scala)

## Services
To make your builds even faster, we also pre-install a bunch of Services that your application may need. These are also updated on a monthly cadence.

Following are the service that are pre-installed

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

## Testing Frameworks
Our images also come pre-installed with all the tooling necessary to runs tests based on a plethora of frameworks. Some of the popular ones are

* JUnit
* XUnit
* RSpec
* Nosetest
* Chai/Mocha
* ...and more

## Command Line Interfaces (CLI)
Majority of the apps today run on cloud. Each cloud provider has a native CLI and we want to avoid you having to install and configure them. In addition we also pre-install some popular DevOps tools also. The goals is to try and prep the build environment as close to your desired state so that you can spend less time prepping and more time developing applications.

Here is a list of CLIs we have available as part of Job Runtime

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

## 3rd Party Integrations
In addition we support a multitude of integrations into external providers. This makes it easy to plug in any of your existing tooling seamlessly into Shippable Assembly Line Platform

### Source Control Management

-  GitHub
-  GitHub Enterprise
-  Bitbucket
-  Bitbucket Server
-  GitLab

### Cloud Providers

-  Amazon Web Services
-  Google Cloud
-  Microsoft Azure
-  Digital Ocean

### Container Orchestration Systems

- Mesos DC/OS
- Kubernetes
- Google Container Engine
- AWS Elastic Container Service
- Azure Container Service
- Joyent Triton
- Docker Datacenter

### Artifact Repositories

- Docker Hub
- Docker Trusted Registry
- AWS Elastic Container Registry
- Google Container Registry
- Quay
- JFrog Artifactory
- AWS S3

### Messaging Providers

- Slack
- Hipchat
- IRC
- Email
- Custom Webhooks

### PaaS Providers

- AWS Opsworks
- AWS Elastic Beanstalk
- Heroku

### IaaS Providers

-  AWS EC2
-  Google Cloud
-  Microsoft Azure
-  Digital Ocean

### DevOps Tools

- Ansible
- Chef
- Puppet
- Saltstack
- AWS Cloud Formations
- Terraform
- Packer

### Deployment Tools

- AWS Codedeploy
- Capistrano
