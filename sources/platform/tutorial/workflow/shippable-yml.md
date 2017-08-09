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
      image_name: <in case of docker app>
      image_tag: <in case of docker app>
      bucket_name: <in case of docker app>
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
	* `notifications` -- used to send  


| **yml tag**           |** default behavior without tag**                                                                         | **Description of usage**                                                                                                                                                                                                                                                                                                                                                |
|---------------------|------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [**language:**](/ci/set-language/)           | language gets set to ruby                                                                            | Set to the language your project is written in. e.g. node_js. [Read more](/ci/set-language/)                                                                                                                                                                                                                                                                                                        |
| [**runtime:**](/ci/set-language/)            | depends on language                                                                                  | Set to the language runtime version(s) you want to build against. [Read more](/ci/set-language/)                                                                                                                                                                                                                                                                                                  |
| [**services:**](/ci/services-overview/)           | no services are available                                                                            | Specify the services you need for your CI workflow, e.g. postgres, mysql, etc. [Read more](/ci/services-overview/)                                                                                                                                                                                                                                                                                     |
| [**env:**](/ci/env-vars/)                | Only standard environment variables are available during your CI workflow                            | Set custom environment variables for your builds. , including  `secure` variables, i.e. encrypted variables  used to store sensitive information. [Read more](/ci/env-vars/)                                                                                                                                                                                                                    |
| [**matrix:**](/ci/matrix-builds/)             | no default                                                                                           | Used to include or exclude only specific combination(s) from a build matrix. This is only relevant  if you  are triggering matrix builds, i.e. running several builds per trigger.  [Read more](/ci/matrix-builds/)                                                                                                                                                                                |
| [**build:**](/ci/build-and-test/)              | no default                                                                                           | Wrapper for several sub-sections like `pre_ci`, `ci`, `post_ci`, `on_success`, `on_failure`, `cache`, and `push`. [Read more](/ci/build-and-test/)                                                                                                                                                                                                                                                  |
|&nbsp;&nbsp;&nbsp;&nbsp;[pre_ci:](/ci/build-image/)         | no default                                                                                           | Used primarily if you need to use a custom image for your build or if you need to customize behavior of the  default CI container. You can build your image from a Dockerfile or pull an image from a Docker registry  in this section. **Commands in this section run outside the CI container**, so you should not include any commands required  for your CI workflow here. [Read more](/ci/build-image/)     |
|&nbsp;&nbsp;&nbsp;&nbsp;[pre_ci_boot:](/ci/build-image/)    | no default                                                                                           | Used to override the default image used for CI with your own custom image. You can also set specific options  for booting up the default CI container. [Read more](/ci/build-image/)                                                                                                                                                                                                             |
|&nbsp;&nbsp;&nbsp;&nbsp;[ci:](/ci/build-and-test/)             | depends on language                                                                                  | Include all commands for your CI workflow. Commands in this section are run inside your CI container,  so any dependencies you need for your build should be installed as the first set of commands in this section.  If this section is missing or empty, we call some default commands based on language, e.g. `npm install`  and `npm test` for Node.js projects. [Read more](/ci/build-and-test/)   |
|&nbsp;&nbsp;&nbsp;&nbsp;[post_ci:](/ci/build-and-test/)        | no default                                                                                           | Include commands that are not really a part of your core CI workflow but should be run after CI finishes. Commands in this section are run inside your CI container. [Read more](/ci/build-and-test/)                                                                                                                                                                                                  |
|&nbsp;&nbsp;&nbsp;&nbsp;[on_success:](/ci/build-and-test/)      | no default                                                                                           | Include commands you want to execute only if your CI workflow passes, i.e. the ci section exits with 0.  Commands in this section are run inside your CI container. [Read more](/ci/build-and-test/)                                                                                                                                                                                                  |
|&nbsp;&nbsp;&nbsp;&nbsp;[on_failure:](/ci/build-and-test/)      | no default                                                                                           | Include commands you want to execute only if your CI workflow fails, i.e. the ci section does not exit with 0.  Commands in this section are run inside your CI container. [Read more](/ci/build-and-test/)                                                                                                                                                                                           |
|&nbsp;&nbsp;&nbsp;&nbsp;[push:](#push)           | no default                                                                                           | Used to push Docker image to an image registry, especially if you are pushing to Google Container Registry  or Amazon ECR. **Commands in this section run outside your CI container.**                                                                                                                                                                                                                                           |
|&nbsp;&nbsp;&nbsp;&nbsp;[cache:](/ci/caching/)          | nothing is cached                                                                                    | Used to turn on caching. If set to true, the build directory SHIPPABLE_BUILD_DIR is cached. To cache specific folders, you can use the tag cache_dir_list. [Read more](/ci/caching/)                                                                                                                                                                                                           |
|&nbsp;&nbsp;&nbsp;&nbsp;[cache_dir_list:](/ci/caching/) | if cache is set to true, default is SHIPPABLE_BUILD_DIR                                              | Used to specify a list of folders that you want to cache between builds. [Read more](/ci/caching/)                                                                                                                                                                                                                                                                                           |
| [**integrations:**](/platform/integration/overview/)       | no default                                                                                           | Wrapper for several subsections like `notifications`, `hub`,  and `keys`. This overall section lets you specify what third party services you want to interact with a part of your build.                                                                                                                                                                           |
|&nbsp;&nbsp;&nbsp;&nbsp;[notifications:](/ci/send-notifications/)     | Email notifications sent to last  committer and author on build  failure or status change to success | Used to send Slack, Hipchat, IRC notifications as well as to customize default email notification settings. This section can also be used to trigger a custom webhook or to trigger another Shippable project at various points during your CI workflow. [Read more](/ci/send-notifications/)                                                                                                           |
|&nbsp;&nbsp;&nbsp;&nbsp;[hub:](/ci/push-artifacts/)            | no default                                                                                           | Include this section if you want to interact with any Docker registry to pull a private image or push an image. [Read more](/ci/push-artifacts/)                                                                                                                                                                                                                                                    |
|&nbsp;&nbsp;&nbsp;&nbsp;[keys:](#keys)           | no default                                                                                           | Include this section if you need to use SSH or PEM keys to interact with services that are not natively supported on Shippable.                                                                                                                                                                                                                                     |
