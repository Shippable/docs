page_main_title: Anatomy of shippable.yml
main_section: Platform
sub_section: Tutorials
sub_sub_section: Workflow
page_title: shippable.yml
page_description: Structure of shippable.yml
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# Anatomy of shippable.yml
Shippable DevOps Platform leverages a declarative syntax for Continuous Integration. A YML `shippable.yml` config file is used to define the tasks. It is added to your the root of your source code repo just like any other piece of code and the platform recognizes the changes you make to it through webhooks and fires CI Runs.

The anatomy of the jobs configuration generally follows the structure below

```
language:	<Language name>
<language version>: <depending on language>
  - <version>
  - <version2>

branches:
  only:
    - master
    - release/*
  except:
    - feat*

#### special tags for ruby language #### 
gemfile:
  - <version>
  - <version 2>
bundler_args: arg 1
#### end special tags for ruby language #### 

git:
   submodules: <boolean>

services:
  - <service name>
  - <service name>

env:
  - ENV1: "foo" <environment variables in dictionary format>
    ENV2: "moo"
  - ENV1: "foo" <environment variables in dictionary format>
    ENV2: "boo"
  global:
  - ENVG1: "goo" 
  - ENVG2: "doo"
  matrix:
    include:
      - ENV1: "foo"
        <language version>: <version>
    exclude:
      - ENVG2: "doo"
        <language version>: <version2>      
    allow_failures:
		- <language version>: <version2>

build:
  pre_ci:
    - #command1
    - #command2
  pre_ci_boot:
    image_name: <name of the image to boot>
    image_tag: <tag of the image to boot>
    env: <list of environment variables while booting the container>
    pull: <boolean>
    options: <docker options arguments>
  ci:
    - #command1
    - #command2
  post_ci:
    - command1
    - command2
  on_success:
    - command1
    - command2
  on_failure:
    - command1
    - command2
  cache: <boolean>
  cache_dir_list:
    - dir1
    - dir2
  advancedReporting: <boolean>

integrations:
 notifications:
   - integrationName: <name of your subscription integration>
     type: <type of notification>
     recipients:
       - #recp1
       - #recp2
      branches:
        only:
          - master
      on_success: always | change | never
      on_failure: always | change | never
      on_cancel: always | change | never
      on_start: always | never
      on_pull_request: always | never
	   #### special tags for email type #### 
      sendConsoleLogs: <boolean>
      sendCoverageReports: <boolean>
      #### special tags for email type #### 

  hub:
    - integrationName:
      type: <type of hub>
      agent_only:
      branches:
        only:
          - master
  key:
    - integrationName: my_custom_key
      type: ssh-key
  
  deploy:									# deprecated
    - integrationName: "aws-eb-integration"
      type: aws
      target: eb_paas
      platform: <EBS platform>
      application_name: <EBS app>
      env_name: <EBS environment>
      region: <aws region>
      #### special tags for docker app #### 
      image_name: <image name>
      image_tag: <image tag>
      bucket_name: <s3 bucket>
      #### special tags for docker app #### 
```

* **`language`** -- this drives which Runtime image are we going to use run your Continuous Integration. We currently support 
	* [C/C++](/platform/runtime/language/cplusplus)
	* [Clojure](/platform/runtime/language/clojure)
	* [GO](/platform/runtime/language/go)
	* [Java](/platform/runtime/language/java)
	* [Node JS](/platform/runtime/language/nodejs)
	* [PHP](/platform/runtime/language/php)
	* [Python](/platform/runtime/language/python)
	* [Ruby](/platform/runtime/language/ruby)
	* [Scala](/platform/runtime/language/scala)

* **`<language version>`** -- this changes depending on which language is used and it can be more than 1 which makes it a [matrix jobs](/ci/matrix-builds/). List of available versions are on each of the language page
* **`branches`** -- used to control which branch/es does this YML actually run
 * `only` -- is used to set specific branch names to run. You can set regex here and in the case above run for master branch and all git flow based `release` branches. Both `only` and `except` cannot be used
 * `except` -- exactly the opposite of `only`
* **`gemfile `** -- used only when the language is Ruby. This sets the context for your project and having more than 1 triggers a matrix job
* **`git `** -- used to control the behaviour of how Shippable clones your repo
	* `submodules` 
* **`services `** -- if you need additional services that your CI run might need. The version that is installed on your Runtime Image will be started before any of your `ci` scripts execute
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

* **`env `** -- is used to set environment variables for your CI run. You can set as many dictionaries of envs as you want. Each dictionary is a seperate job i.e. matrix job
	* `global` -- this is a list of individual environment variable and each of it is set to all Jobs within the CI run. It does not trigger matrix jobs if you use more than one
	* `matrix` -- [this](/ci/matrix-builds/) is a complex topic and we have a whole section that talks about it. In short it creates a multi-plexed set of jobs under a single CI run and it can be used to run multiple different combinations of tests for a single commit
		* `include` -- it is used to execute specific combinations of the matrix-able tags so that you dont exponentially blow up the number of jobs
		* `exclude` -- it is the opposite of include. If you want to just exclude a few jobs from the matrix, use this
		* `allow_failures` -- this is used to ignore the result of the job from the overall status of the run
* **`build `** -- this is the section that actually runs the scripts of your CI job
	* `pre_ci` -- this is used to prep the host before starting your `ci` section. Please note anything environment variables, files etc. that you create here will not be available in ci section. Typically used to [build your own ci runtime](/ci/custom-docker-image)
	* `pre_ci_boot` -- this is used to override the default Runtime image in which your `ci` run executes
	* `ci` -- this is the meat and potatoes section of your ci commands that install dependencies, create databases and folders, and include your build and test commands.
	* `post_ci` -- includes commands that are not really a part of your core CI workflow but should be run after CI finishes. A good example is pushing artifacts to S3 or a Docker registry.
	* `on_success` -- includes commands you want to execute only if your CI workflow passes, i.e. the ci section exits with 0.
	* `on_failure` -- includes commands you want to execute only if your CI workflow fails, i.e. the ci section does not exit with a 0.
	* `cache` -- Boolean, set whether after your run, whether [caching](/ci/caching) is done or not
	* `cache_dir` -- sets the directories that you want to cache 
	* `advancedReporting` --  Boolean, used only for Java projects to turn on [advanced processing](/ci/java-continuous-integration) of test reports 
* **`integrations`** -- used to pass in 3rd party integration secrets e.g. docker hub credentials
	* `notifications` -- used to send messages about CI related events
		* `integrationName` -- name of the subscription integration to use (refer to type guides)
		* `type` -- [slack](/ci/slack-notifications), [email](/ci/email-notifications), [hipchat](/ci/hipchat-notifications) & [irc](/ci/irc-notifications) 
		* `recipients` -- an array or emails/rooms/channels etc.
		* `branches` -- limiting when to send notifications
			* `only` -- arrary of branch names
		* `on_success` -- control the behaviour when the CI run is successful
		* `on_failure` -- control the behaviour when the CI run has failed
		* `on_cancel` -- control the behaviour when the CI run is cancelled
		* `on_start` -- control the behaviour when the CI run has started
		* `on_pull_request` -- control the behaviour when the CI run is for a pull request
		* `sendConsoleLogs` -- send consoles logs as attachement (email type only)
		* `sendCoverageReports ` -- send coverage reports as attachement (email type only)
		
	* `hub` -- used to connect artifact/image registries
		* `integrationName` -- name of the subscription integration to use (refer to type guides)
		* `type` -- [artifactory](/ci/push-to-artifactory), [docker](/ci/push-docker-hub), [ecr](/ci/push-amazon-ecr), [gcr](/ci/push-gcr), [quay.io](/ci/push-quay) & [private docker registry](/ci/push-docker-private-registry) 
		* `branches` -- limiting when to send notifications
			* `only` -- arrary of branch names

	* `key` -- an ssh key integration to connect to external systems through ssh
		* `integrationName` -- name of the subscription integration to use (refer to type guides)
		* `type` -- [ssh-key](/ci/ssh-keys)

	* `deploy` -- integration used to deploy to Elastic Beanstalk (**deprecated** Use [workflows](/platform/workflow/overview) ) 
		* `integrationName` -- name of the subscription integration to use (refer to type guides)
		* `type` -- [aws](/ci/deploy-to-aws-beanstalk)
		* `target` -- eb_paas
		* `platform` -- [EBS platform Name](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/tutorials.html)
		* `application_name` -- Your EBS application name
		* `env_name` -- EBS application environment
		* `region` -- AWS Region
		* `image_name` -- Docker image name if your app is  docker based
		* `image_tag` -- Docker image tag if your app is  docker based
		* `bucket_name` -- S3 bucket name to upload your config

## Further Reading
* [Working with languages](/ci/set-language)
* [Working with services](/ci/services-overview)
* [Working with environment variables](/ci/env-vars)
* [Using Matrix Jobs](/ci/matrix-builds)
* [Building and Testing](/ci/build-and-test)
* [Building a Docker Image](/ci/build-image)
* [Using Caching to speed up your CI](/ci/caching)
* [Using Integrations](/platform/integration/overview)
* [Sending Notifications](/ci/send-notifications)
* [Pushing Artifacts](/ci/push-artifacts)
* [Connecting to external systems through SSH](/ci/ssh-keys)
