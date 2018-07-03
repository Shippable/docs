page_main_title: What does Shippable support?
main_section: Getting started
sub_section: Overview

# What is supported?

The [Shippable DevOps Assembly Line Platform](/platform/overview/) supports most popular tools and technologies used today to build, test, deploy, and operate applications/services/micro-services.

Here are some of the major things we support out of the box. With that being said, the Platform is built with Docker in mind. Hence, anything that can be installed inside of a Docker image is supported by the platform.

## Node Types

To run your DevOps activities, you need a Node (virtual machine). Shippable supports the two types of Nodes described below. **By default, all your jobs run on On-demand nodes.**

### [Dedicated On-demand Nodes](/platform/runtime/nodes/#dynamic-nodes/)

These are managed and dynamically provisioned by Shippable Platform. There is no need to worry about managing build infrastructure. There are multiple sizes that you can use depending on your need.

* 2 core, 7.5GB RAM (L)(default)
* 4 core, 15GB RAM (XL)
* 8 core, 30GB RAM (2XL)

### [Dedicated BYON Nodes](/platform/runtime/nodes/#custom-nodes)

You can also attach your own nodes to your Shippable subscription and all your jobs are routed to those machines. This is great for organizations with specific security requirements that do not allow them to run builds on hosted infrastructure. There is some management required for BYON Nodes, but in most cases, it is as simple as hitting the **Reset Node** button. With BYON nodes, your code never leaves your infrastructure and your jobs can access internal resources that are inaccessible from the internet.

For more information, check out our [BYON nodes tutorial](/platform/runtime/nodes/#custom-nodes).

## Operating System
The platform is designed to work across multiple operating systems. We natively support the following operating systems:

* [Ubuntu 14.04 LTS](/platform/runtime/machine-image/os-versions/)
* [Ubuntu 16.04 LTS](/platform/runtime/machine-image/os-versions/)
* [Windows Server 2016](/platform/tutorial/workflow/jobs-windows)
* [Mac OS](/platform/tutorial/workflow/jobs-macos)
* [CentOS](/platform/tutorial/workflow/jobs-centos)

## Language

For all OS versions, we maintain language-specific images that are updated every month so that the latest and greatest versions are always available. Please note that the right language image is automatically chosen for your [CI jobs](/ci/set-language/) based on the `language` tag in your **shippable.yml**

We support the following languages:

* [C/C++](/ci/cpp-continuous-integration/)
* [Clojure](/ci/clojure-continuous-integration/)
* [Go](/ci/go-continuous-integration/)
* [Java](/ci/java-continuous-integration/)
* [Node JS](/ci/nodejs-continuous-integration/)
* [PHP](/ci/php-continuous-integration/)
* [Python](/ci/python-continuous-integration/)
* [Ruby](/ci/ruby-continuous-integration/)
* [Scala](/ci/scala-continuous-integration/)


## Services
To make your builds even faster, we pre-install a bunch of **Services** that your application may need. These are also updated on a monthly cadence.

Following are the service that are pre-installed:

<!-- * [Cassandra](/ci/cassandra/) -->
* [CouchDB](/ci/couchdb/)
* [ElasticSearch](/ci/elasticsearch/)
* [Memcached](/ci/memcached/)
* [MongoDB](/ci/mongodb/)
* [MySQL](/ci/mysql/)
* [Neo4j](/ci/neo4j/)
* [Postgres](/ci/postgresql/)
* [RabbitMQ](/ci/rabbitmq/)
* [Redis](/ci/redis/)
* [RethinkDB](/ci/rethinkdb/)
* [Riak](/ci/riak/)
* [Selenium](/ci/selenium/)
* [SqlLite](/ci/sqlite/)

For more information, read our [working with services](/ci/services-overview/) section.

## Testing Frameworks
Our [Runtime Images](/platform/runtime/machine-image/ami-overview/) also come pre-installed with all the tooling necessary to runs tests based on a plethora of frameworks. Some of the popular ones are

* JUnit
* XUnit
* RSpec
* Nosetest
* Chai/Mocha
* ...and more

## Command Line Interfaces (CLI)

Most applications today run in the Cloud. Each cloud provider has a native CLI and we want to avoid you having to install and configure them. In addition we also pre-install some popular DevOps tools also. The goals is to try and prep the build environment as close to your desired state so that you can spend less time prepping and more time developing applications.

Here is a list of CLIs we have available as part of our [pre-configured job runtime](/platform/runtime/overview/):

* Ansible
* AWS
* AWS Elastic Beanstalk
* Azure
* Docker
* GKE
* JFrog
* Packer
* Terraform
* Kubectl

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
-  [Google Cloud](/platform/integration/gcloudKey)
-  [Microsoft Azure](/platform/integration/azure-keys)
-  [Digital Ocean](/platform/integration/do)

### Container Orchestration Systems

- [AWS Elastic Beanstalk](/deploy/aws-elastic-beanstalk/)
- [AWS Elastic Container Service](/platform/integration/aws-keys)
- [Mesos DC/OS](/platform/integration/azureDcosKey)
- [Kubernetes](/platform/integration/kubernetes)
- [Google Container Engine](/platform/integration/gcloudKey)
- [Azure Container Service](/platform/integration/azure-keys)
- [Joyent Triton](/platform/integration/joyentTritonKey)
- [Docker Datacenter](/platform/integration/ddcKey)
- [Docker Cloud](/platform/integration/dclKey)

### Artifact Repositories

- [Docker Registries](/platform/integration/dockerRegistryLogin)
- [AWS Elastic Container Registry](/platform/integration/aws-keys)
- [Google Container Registry](/platform/integration/gcloudKey)
- [Quay](/platform/integration/quayLogin)
- [JFrog Artifactory](/platform/integration/jfrog-artifactoryKey)
- [AWS S3](/platform/integration/aws-keys)

### Messaging Providers

- [Slack](/platform/integration/slackKey)
- [Hipchat](/platform/integration/hipchatKey)
- IRC
- Email
- [Custom Webhooks](/platform/integration/webhook)

### PaaS Providers

- [AWS Opsworks](/platform/integration/aws-keys)
- [AWS Elastic Beanstalk](/platform/integration/aws-keys)
- [Heroku](/platform/integration/key-value)

### IaaS Providers

-  [AWS EC2](/platform/integration/aws-keys)
-  [Google Cloud](/platform/integration/gcloudKey)
-  [Microsoft Azure](/platform/integration/azure-keys)
-  [Digital Ocean](/platform/integration/do)

### DevOps Tools

- [Ansible](/platform/runtime/machine-image/ami-v582/)
- Chef
- Puppet
- Saltstack
- [AWS Cloud Formations](/platform/runtime/machine-image/ami-v582/)
- [Terraform](/platform/runtime/machine-image/ami-v582/)
- [Packer](/platform/runtime/machine-image/ami-v582/)

### Deployment Tools

- [AWS Codedeploy](/platform/runtime/machine-image/ami-v582/)
- Capistrano

## Further Reading
* [Platform Overview](/platform/overview)
* [Quick Start to CI](/getting-started/ci-sample)
* [Quick Start to CD](/getting-started/cd-sample)
