page_main_title: Anatomy of shippable.yml
main_section: Platform
sub_section: Tutorials
sub_sub_section: Workflow
page_title: shippable.yml
page_description: Structure of shippable.yml
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# Anatomy of shippable.yml

Shippable's DevOps Platform leverages a declarative syntax for Continuous Integration. A YML `shippable.yml` config file is used to define the tasks. It is added to your the root of your source code repo just like any other piece of code and the platform recognizes the changes you make to it through webhooks and fires CI Runs.

The anatomy of the jobs configuration generally follows the structure below

```
language:	<Language name>

<language version>: #depending on language
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

* **`language`** -- this drives which Runtime image is used for your CI workflow. [Read more](set-language/). We currently support the following languages:
	* [C/C++](/ci/cpp-continuous-integration/)
	* [Clojure](/ci/clojure-continuous-integration/)
	* [GO](/ci/go-continuous-integration/)
	* [Java](/ci/java-continuous-integration/)
	* [Node JS](/ci/nodejs-continuous-integration/)
	* [PHP](/ci/php-continuous-integration/)
	* [Python](/ci/python-continuous-integration/)
	* [Ruby](/ci/ruby-continuous-integration/)
	* [Scala](/ci/scala-continuous-integration/)

* **`<language version>`** -- this tag key name changes depending on the language, for example you'll need to specify `nodejs` for Node.js. Set the value of this tag to the language version(s) you want to test against. [Read more](set-language/)

* **`branches`** -- is used to control which branch(es) trigger a CI build
 * `only` -- is used to set which branch(es) can trigger a run. You can set branch names or regex. In the snippet above, only `master` branch and all gitflow based `release` branches will trigger a run.
 * `except` -- is used to exclude specific branch(es) names from triggering a CI run.

* **`gemfile `** -- is used only when the language is Ruby. If you include more than one, it will trigger a matrix build. [Read more](/ci/ruby-continuous-integration/).

* **`git `** -- used to specify repos that contain dependencies you need for your build. [Read more](/ci/git-submodules/)
	* `submodules`

* **`services `** -- Specify the services you need for your CI workflow, e.g. postgres, mysql, etc. The service will be started before any of your `ci` scripts execute. [Read more](services-overview/). Supported services are:

	* [Cassandra](/ci/cassandra)
	* [CouchDB](/ci/couchdb)
	* [ElasticSearch](/ci/elasticsearch)
	* [Memcached](/ci/memcached)
	* [MongoDB](/ci/mongodb)
	* [MySQL](/ci/mongodb)
	* [Neo4j](/ci/neo4j)
	* [Postgres](/ci/postgres)
	* [RabbitMQ](/ci/rabbitmq)
	* [Redis](/ci/redis)
	* [RethidDB](/ci/rethinkdb)
	* [Riak](/ci/riak)
	* [Selenium](/ciselenium)
	* [SqlLite](/ci/sqllite)

* **`env `** -- Set custom environment variables for your builds. , including  `secure` variables, i.e. encrypted variables  used to store sensitive information. [Read more](env-vars/).

	* `global` -- variables defined in this section do not trigger a matrix run even when multiple variables are defined. They are available to all jobs within the run.

* `matrix` -- Used to include or exclude only specific combination(s) from a build matrix. This is only relevant if you  are triggering matrix builds, i.e. running several builds per trigger.  [Read more](matrix-builds/).

	* `include` -- used to only include specific combinations of matrix jobs
	* `exclude` -- used to exclude a specific combination of matrix jobs
	* `allow_failures` -- this is used to ignore the result of specific jobs from the overall status of the run

* **`build `** -- this is the section that actually runs the scripts of your CI job.

	* `pre_ci` -- this is used to prep the host before starting your `ci` section. Please note anything environment variables, files etc. that you create here will not be available in `ci` section. Typically used to [build your own ci runtime](/ci/custom-docker-image).
	* `pre_ci_boot` -- is used to override the default image used for CI with your own custom image. You can also set specific options  for booting up the default CI container. [Read more](build-image/).
	* `ci` -- this is the meat and potatoes section of your ci commands that install dependencies, create databases and folders, and include your build and test commands. [Read more](build-and-test/).
	* `post_ci` -- includes commands that are not really a part of your core CI workflow but should be run after CI finishes. A good example is pushing artifacts to S3 or a Docker registry. [Read more](build-and-test/).
	* `on_success` -- includes commands you want to execute only if your CI workflow passes, i.e. the ci section exits with 0. [Read more](build-and-test/).
	* `on_failure` -- includes commands you want to execute only if your CI workflow fails, i.e. the ci section does not exit with a 0. [Read more](build-and-test/).
	* `cache` -- boolean value, used to turn on caching. If set to true, the build directory SHIPPABLE_BUILD_DIR is cached. To cache specific folders, you can use the tag cache_dir_list. [Read more](/ci/caching/).
	* `cache_dir_list` -- Used to specify a list of folders that you want to cache between builds. [Read more](/ci/caching/).

* **`integrations`** -- Wrapper for several subsections like `notifications`, `hub`,  and `keys`. This overall section lets you specify sensitive information like passwords, tokens, keys, etc needed to connect to third-party services.
	* `notifications` -- Used to send Slack, Hipchat, IRC notifications as well as to customize default email notification settings. This section can also be used to trigger a custom webhook or to trigger another Shippable project at various points during your CI workflow. [Read more](send-notifications/).
		* `integrationName` -- name of the Subscription integration to use (refer to type guides)
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

	* `hub` -- used to connect to artifact/Docker registries to pull/push images/artifacts. [Read more](push-artifacts/)
		* `integrationName` -- name of the Subscription integration to use (refer to type guides)
		* `type` -- [artifactory](/ci/push-to-artifactory), [docker](/ci/push-docker-hub), [ecr](/ci/push-amazon-ecr), [gcr](/ci/push-gcr), [quay.io](/ci/push-quay) & [private docker registry](/ci/push-docker-private-registry)
		* `branches` -- limiting which branches this integration applies to. This lets you set different credentials for different branches.
			* `only` -- array of branch names

	* `key` -- an SSH key integration to connect to external systems. [Read more](/ci/ssh-keys/)
		* `integrationName` -- name of the subscription integration to use (refer to type guides)
		* `type` -- [ssh-key](/ci/ssh-keys)

	* `deploy` -- integration used to deploy non-container apps to Amazon Elastic Beanstalk. [Read more](/ci/deploy-to-aws-beanstalk/). To deploy Docker apps, [go here](/deploy/aws-elastic-beanstalk/)
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
* [Getting started with CI](/ci/why-continuous-integration/)
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
