page_main_title: What does Shippable support?
main_section: Getting started
sub_section: Overview

# What is supported?

The [Shippable DevOps Assembly Line Platform](/platform/overview/) supports most popular tools and technologies used today to build, test, deploy, and operate applications/services/micro-services.

Here are some of the major things we support out of the box. With that being said, the Platform is built with Docker in mind. Hence, anything that can be installed inside of a Docker image is supported by the platform.

## Node Types

To run your DevOps activities, you need a Node (virtual machine). Shippable supports the two types of Nodes described below. **By default, all your jobs run on Dynamic nodes.**

### [Dedicated Dynamic Nodes](/platform/tutorial/runtime/dynamic-nodes/)

These are managed and dynamically provisioned by Shippable Platform. There is no need to worry about managing build infrastructure. There are multiple sizes that you can use depending on your need.
	* 2 core, 3.75GB RAM (default) -- this is equivalent of AWS c4.large instance type
	* 4 core, 7.5GB RAM -- this is equivalent of AWS c4.xlarge instance type
	* 8 core, 15GB RAM -- this is equivalent of AWS c4.2xlarge instance type

### [Dedicated Custom Nodes](/platform/tutorial/runtime/custom-nodes/)

You can also attach your own nodes to your Shippable subscription and all your jobs are routed to those machines. This is great for organizations with specific security requirements that do not allow them to run builds on hosted infrastructure. There are additional advantages to Custom nodes, including Docker caching and faster builds due to no spin up time. There is some management required for Custom Nodes, but in most cases, it is as simple as hitting the **Reset Node** button. With Custom nodes, your code never leaves your infrastructure and your jobs can access internal resources that are inaccessible from the internet.

For more information, check out our [Custom nodes tutorial](/platform/tutorial/runtime/custom-nodes/).

## Operating System
The platform is designed to work on any Linux distro. We natively support the following versions:

* [Ubuntu 14.04 LTS](/platform/runtime/os/ubuntu14/)
* [Ubuntu 16.04 LTS](/platform/runtime/os/ubuntu16/)

As mentioned before, we are a Docker-based platform. Hence any custom image based on a Linux distro can be used in Job Runtime.

## Language

For both OS versions, we maintain language-specific images that are updated every month so that the latest and greatest versions are always available. Please note that the right language image is automatically chosen for your [CI jobs](/ci/set-language/) based on the `language` tag in your `shippable.yml`

We support the following languages:

* [C/C++](/platform/runtime/language/cplusplus/)
* [Clojure](/platform/runtime/language/clojure/)
* [Go](/platform/runtime/language/go/)
* [Java](/platform/runtime/language/java/)
* [Node JS](/platform/runtime/language/nodejs/)
* [PHP](/platform/runtime/language/php/)
* [Python](/platform/runtime/language/python/)
* [Ruby](/platform/runtime/language/ruby/)
* [Scala](/platform/runtime/language/scala/)


## Services
To make your builds even faster, we pre-install a bunch of **Services** that your application may need. These are also updated on a monthly cadence.

Following are the service that are pre-installed:

* [Cassandra](/platform/runtime/service/cassandra/)
* [CouchDB](/platform/runtime/service/couchdb/)
* [ElasticSearch](/platform/runtime/service/elasticsearch/)
* [Memcached](/platform/runtime/service/memcached/)
* [MongoDB](/platform/runtime/service/mongodb/)
* [MySQL](/platform/runtime/service/mysql/)
* [Neo4j](/platform/runtime/service/neo4j/)
* [Postgres](/platform/runtime/service/postgres/)
* [RabbitMQ](/platform/runtime/service/rabbitmq/)
* [Redis](/platform/runtime/service/redis/)
* [RethinkDB](/platform/runtime/service/rethinkdb/)
* [Riak](/platform/runtime/service/riak/)
* [Selenium](/platform/runtime/service/selenium/)
* [SqlLite](/platform/runtime/service/sqllite/)

For more information, read our [working with services](/ci/services-overview/) section.

## Testing Frameworks
Our [Runtime Images](/platform/tutorial/runtime/ami-overview/) also come pre-installed with all the tooling necessary to runs tests based on a plethora of frameworks. Some of the popular ones are

* JUnit
* XUnit
* RSpec
* Nosetest
* Chai/Mocha
* ...and more

## Command Line Interfaces (CLI)

Most applications today run in the Cloud. Each cloud provider has a native CLI and we want to avoid you having to install and configure them. In addition we also pre-install some popular DevOps tools also. The goals is to try and prep the build environment as close to your desired state so that you can spend less time prepping and more time developing applications.

Here is a list of CLIs we have available as part of Job Runtime:

* [Ansible](/platform/runtime/cli/ansible/)
* [AWS](/platform/runtime/cli/aws/)
* [AWS Elastic Beanstalk](/platform/runtime/cli/awseb/)
* [Azure](/platform/runtime/cli/azure/)
* [Docker](/platform/runtime/cli/docker/)
* [GKE](/platform/runtime/cli/gke/)
* [JFrog](/platform/runtime/cli/jfrog/)
* [Packer](/platform/runtime/cli/packer/)
* [Terraform](/platform/runtime/cli/terraform/)
* [Kubectl](/platform/runtime/cli/kubectl/)

## 3rd Party Integrations

Shippable supports a multitude of integrations into external providers. This makes it easy to plug in any of your existing tooling seamlessly into Shippable Assembly Line Platform.

### Source Control Management

-  [GitHub](/platform/integration/github)
-  [GitHub Enterprise](/platform/integration/github-enterprise)
-  [Bitbucket](/platform/integration/bitbucket)
-  [Bitbucket Server](/platform/integration/bitbucket)
-  [GitLab](/platform/integration/gitlab)

### Cloud Providers

-  [Amazon Web Services](/platform/integration/aws-keys)
-  [Google Cloud](/platform/integration/gce)
-  [Microsoft Azure](/platform/integration/azure)
-  [Digital Ocean](/platform/integration/do)

### Container Orchestration Systems

- [AWS Elastic Beanstalk](/platform/runtime/cli/awseb)
- [AWS Elastic Container Service](/platform/integration/aws-keys)
- [Mesos DC/OS](/platform/integration/azure-dcos)
- [Kubernetes](/platform/integration/kubernetes)
- [Google Container Engine](/platform/integration/gce)
- [Azure Container Service](/platform/integration/azure)
- [Joyent Triton](/platform/integration/tripub)
- [Docker Datacenter](/platform/integration/docker-datacenter)
- [Docker Cloud](/platform/integration/docker-cloud)

### Artifact Repositories

- [Docker Hub](/platform/integration/dockerRegistryLogin)
- [Docker Trusted Registry](/platform/integration/dockerRegistryLogin)
- [AWS Elastic Container Registry](/platform/integration/aws-keys)
- [Google Container Registry](/platform/integration/gcr)
- [Quay](/platform/integration/quayLogin)
- [JFrog Artifactory](/platform/integration/jfrog-artifactoryKey)
- [AWS S3](/platform/integration/aws-keys)

### Messaging Providers

- [Slack](/platform/integration/slack)
- [Hipchat](/platform/integration/hipchatKey)
- [IRC](/platform/integration/irc)
- [Email](/platform/integration/email)
- [Custom Webhooks](/platform/integration/event-trigger)

### PaaS Providers

- [AWS Opsworks](/platform/integration/aws-keys)
- [AWS Elastic Beanstalk](/platform/integration/aws-keys)
- [Heroku](/platform/integration/key-value)

### IaaS Providers

-  [AWS EC2](/platform/integration/aws-keys)
-  [Google Cloud](/platform/integration/gce)
-  [Microsoft Azure](/platform/integration/azure)
-  [Digital Ocean](/platform/integration/do)

### DevOps Tools

- [Ansible](/platform/runtime/cli/ansible)
- Chef
- Puppet
- Saltstack
- [AWS Cloud Formations](/platform/runtime/cli/aws)
- [Terraform](/platform/runtime/cli/terraform)
- [Packer](/platform/runtime/cli/packer)

### Deployment Tools

- [AWS Codedeploy](/platform/runtime/cli/aws)
- Capistrano

## Further Reading
* [Platform Overview](/platform/overview)
* [Quick Start to CI](/getting-started/ci-sample)
* [Quick Start to CD](/getting-started/cd-sample)
