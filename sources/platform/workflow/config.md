page_main_title: Workflow Configuration
main_section: Platform
sub_section: Workflow
page_title: DevOps Platform Configuration

# Configuration

Your Assembly Lines are defined through a YAML configuration file `shippable.yml`.

There are two parts to your configuration:

* A [CI portion](#ci-config), in which you can configure your CI commands. We define CI as all commands you want to execute in order to test your code, create a package, and push it to a artifact repository like Docker Hub or JFrog Artifactory, or to a Test environment.  
* An [Assembly Lines portion](#assembly-lines-config), which is used to configure Continuous Delivery workflows, with application release automation, approval gates, deployments into successive environments like Dev, Test, Staging, Prod, etc.

Let us look at both these configurations in greater detail.

<a name="ci-config"></a>
## CI configuration

To use Shippable for CI, you will need to do the following:

* Write a configuration file and commit it to the root of the repository you want to test, and,
* [Enable the repository](/ci/enable-project/) for CI through the Shippable UI.

Some things to note about CI config:

* CI config is only applied to the enabled repository. You cannot separate config from the repository you want to test.
* We automatically create a [`runCI`](/platform/workflow/job/runci) job when you enable a repository for CI. This job can be used in your Assembly Line just like any other job. The name of this job is always `(your repo name)_runCI`, so a runCI job for a repository named `apprepo` will be `apprepo_runCI`. This job executes all commands in the CI portion of your `shippable.yml`.
* Even if you have additional `shippable.yml` files in your repository, only the CI portion of the file at the root of your repository will be parsed and executed by Shippable.

A reference for the CI portion of `shippable.yml` is shown below:

```

#### CI CONFIG

language:	<Language name>

<language version>: #depending on language
  - <version>
  - <version2>

#### special tags for ruby language ####
gemfile:
  - <version>
  - <version 2>
bundler_args: arg 1
#### end special tags for ruby language ####

branches:
  only:
    - master
    - release/*
  except:
    - feat*

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
    - ENV1: "foomoo"
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
      type: sshKey

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

#### END CI CONFIG
```

### Language
* **`language`** -- this drives which Runtime image is used for your CI workflow. [Read more](/ci/set-language/). We currently support the following languages:
	* [C/C++](/ci/cpp-continuous-integration/)
	* [Clojure](/ci/clojure-continuous-integration/)
	* [GO](/ci/go-continuous-integration/)
	* [Java](/ci/java-continuous-integration/)
	* [Node JS](/ci/nodejs-continuous-integration/)
	* [PHP](/ci/php-continuous-integration/)
	* [Python](/ci/python-continuous-integration/)
	* [Ruby](/ci/ruby-continuous-integration/)
	* [Scala](/ci/scala-continuous-integration/)

* **`<language version>`** -- this tag key name changes depending on the language, for example you'll need to specify `nodejs` for Node.js. Set the value of this tag to the language version(s) you want to test against. [Read more](/ci/set-language/)

* **`gemfile `** -- is used only when the language is Ruby. If you include more than one, it will trigger a matrix build. [Read more](/ci/ruby-continuous-integration/).

* **`bundler_args `** -- is used only when the language is Ruby. It is used to specify additional arguments for `bundle install`. [Read more](/ci/ruby-continuous-integration/).

### Branches
* **`branches`** -- is used to control which branch(es) trigger a CI build

    * `only` -- is used to set which branch(es) can trigger a run. You can set branch names or regex. In the snippet above, only `master` branch and all gitflow based `release` branches will trigger a run.
    * `except` -- is used to exclude specific branch(es) names from triggering a CI run.

### Submodules
* **`git `** -- used to specify repos that contain dependencies you need for your build. [Read more](/ci/git-submodules/)
	* `submodules`

### Services
* **`services `** -- Specify the services you need for your CI workflow, e.g. postgres, mysql, etc. The service will be started before any of your `ci` scripts execute. [Read more](/ci/services-overview/). Supported services are:

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

### Environment
* **`env `** -- Set custom environment variables for your builds, including `secure` variables, i.e. encrypted variables, used to store sensitive information. [Read more](/ci/env-vars/).

	* `global` -- variables defined in this section do not trigger a matrix run even when multiple variables are defined. They are available to all jobs within the run.

### Matrix
* **`matrix`** -- Used to include or exclude only specific combination(s) from a build matrix. This is only relevant if you are triggering matrix builds, i.e. running several builds per trigger.  [Read more](/ci/matrix-builds/).

	* `include` -- used to include specific combinations in the job matrix
	* `exclude` -- used to exclude a specific combination of matrix jobs
	* `allow_failures` -- this is used to ignore the result of specific jobs in the overall status of the run

### Build
* **`build `** -- this is the section that actually runs the scripts of your CI job.

	* `pre_ci` -- this is used to prep the host before starting your `ci` section. Please note that any environment variables, files, etc. that you create here will not be available in the `ci` section. Typically used to [build your own ci runtime](/ci/custom-docker-image).
	* `pre_ci_boot` -- is used to override the default image used for CI with your own custom image. You can also set specific options for booting up the default CI container. [Read more](/ci/build-image/).
	* `ci` -- this is the meat and potatoes section of your ci commands that installs dependencies, creates databases and folders, and includes your build and test commands. [Read more](/ci/build-and-test/).
	* `post_ci` -- includes commands that are not really a part of your core CI workflow but should be run after CI finishes. A good example is pushing artifacts to S3 or a Docker registry. [Read more](/ci/build-and-test/).
	* `on_success` -- includes commands you want to execute only if your CI workflow passes, i.e. the ci section exits with 0. [Read more](/ci/build-and-test/).
	* `on_failure` -- includes commands you want to execute only if your CI workflow fails, i.e. the ci section does not exit with 0. [Read more](/ci/build-and-test/).
	* `cache` -- Boolean value, used to turn on caching. If set to true, the build directory SHIPPABLE_BUILD_DIR is cached. To cache specific folders, you can use the tag cache_dir_list. [Read more](/ci/caching/).
	* `cache_dir_list` -- Used to specify a list of folders that you want to cache between builds. [Read more](/ci/caching/).

### Integrations
* **`integrations`** -- Wrapper for several subsections like `notifications`, `hub`,  and `keys`. This overall section lets you specify sensitive information like passwords, tokens, keys, etc. needed to connect to third-party services.
	* `notifications` -- Used to send Slack, Hipchat, and IRC notifications as well as to customize default email notification settings. This section can also be used to trigger a custom webhook or to trigger another Shippable project at various points during your CI workflow. [Read more](/ci/send-notifications/).
		* `integrationName` -- name of the subscription integration to use (refer to type guides)
		* `type` -- [slack](/ci/slack-notifications), [email](/ci/email-notifications), [hipchat](/ci/hipchat-notifications) & [irc](/ci/irc-notifications)
		* `recipients` -- an array of emails/rooms/channels etc.
		* `branches` -- limiting when to send notifications
			* `only` -- an array of branch names
		* `on_success` -- control the behaviour when the CI run is successful
		* `on_failure` -- control the behaviour when the CI run has failed
		* `on_cancel` -- control the behaviour when the CI run is cancelled
		* `on_start` -- control the behaviour when the CI run has started
		* `on_pull_request` -- control the behaviour when the CI run is for a pull request
		* `sendConsoleLogs` -- send consoles logs as attachment (email type only)
		* `sendCoverageReports ` -- send coverage reports as attachment (email type only)

	* `hub` -- used to connect to artifact/Docker registries to pull/push images/artifacts. [Read more](/ci/push-artifacts/)
		* `integrationName` -- name of the subscription integration to use (refer to type guides)
		* `type` -- [artifactory](/ci/push-to-artifactory), [docker registry](/ci/push-docker-registry), [ecr](/ci/push-amazon-ecr), [gcr](/ci/push-gcr), [quay.io](/ci/push-quay)
		* `branches` -- limiting which branches this integration applies to. This lets you set different credentials for different branches.
			* `only` -- array of branch names

	* `key` -- an SSH key integration to connect to external systems. [Read more](/ci/ssh-keys/)
		* `integrationName` -- name of the subscription integration to use (refer to type guides)
		* `type` -- [sshKey](/ci/ssh-keys)

	* `deploy` -- integration used to deploy non-container apps to Amazon Elastic Beanstalk. [Read more](/ci/deploy-to-aws-beanstalk/). To deploy Docker apps, [go here](/deploy/aws-elastic-beanstalk/)
		* `integrationName` -- name of the subscription integration to use (refer to type guides)
		* `type` -- [aws](/ci/deploy-to-aws-beanstalk)
		* `target` -- eb_paas
		* `platform` -- [EBS platform Name](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/tutorials.html)
		* `application_name` -- Your EBS application name
		* `env_name` -- EBS application environment
		* `region` -- AWS Region
		* `image_name` -- Docker image name if your app is Docker-based
		* `image_tag` -- Docker image tag if your app is Docker-based
		* `bucket_name` -- S3 bucket name to upload your config


<a name="assembly-lines-config"></a>
## Assembly Lines configuration

To use Shippable's Assembly Lines which let you configure complex workflows across several jobs and resources, you will need to do the following:

* Write one or more configuration files `shippable.yml` and commit them to your source control. This is called a called the Sync repository.
* [Add one or more Sync repositories](/platform/tutorial/workflow/crud-syncrepo/#adding-a-syncrepo) through the Shippable UI, pointing to the location of your config in source control.

Some things to note about Assembly Lines config:

* **Assembly Lines config is global across your Subscription.** Even if you separate out config for various portions into separate `shippable.yml` files, the names of your jobs and resources will still need to be unique across the Subscription.
* You can have as many `shippable.yml` files as you want and distribute config across them if needed. As an example, our customers manage config in the following different ways:
    * Create a central DevOps repository and include all Assembly Lines configuration for all services and applications in that repository. This is usually done by creating a corresponding folder structure in this central DevOps repository. Organizations with central DevOps teams usually like this approach.
    * Keeping the Assembly Line config for each microservice with the source code for that microservice. This is typically the choice when the organization has decoupled teams working on microservices.
* You can separate out jobs and resources config into separate config files called `shippable.jobs.yml` and `shippable.resources.yml` respectively. You will need to add the repo/branch where these files are stored as a Syns repository so that Shippable can read your config.

A reference for the Assembly Lines portion of `shippable.yml` is shown below:

```
#### RESOURCES CONFIG (GLOBAL ACROSS SUBSCRIPTION)

resources:
  - name:           <string>
    type:           <resource type name>
    integration:    <string>
    pointer:        <object>
    seed:           <object>
    version:        <object>

#### END RESOURCES CONFIG

#### JOBS CONFIG (GLOBAL ACROSS SUBSCRIPTION)

jobs:
  - name:           <string>
    type:           <job type name>
    on_start:
      - NOTIFY:     <notification resource name>
    steps:
      - IN:         <resource>
        switch:     off
      - IN:         <job>
      - IN:         <resource>
        versionName: <name of the version you want to pin>
      - IN:         <resource>
        versionNumber: <number of the version you want to pin>
      - IN:         <params/dockerOption/replicas resource>
        applyTo:
          - <image/manifest/release>
          - <image/manifest/release>
      - IN:         <loadBalancer resource>
        applyTo:
          - manifest: <manifest>
            image:    <image>
            port:     <number>
      - IN:         <gitRepo resource with buildOnPullRequest: true>
        showBuildStatus: true
      - IN:         <manifest/release>
        force:      true
      - TASK:
        - script:   <any shell command>
        - script:   <any shell command>
      - OUT:        <resource>
      - OUT:        <resource>
        replicate:  <IN resource>
    on_success:
      - script:     echo "SUCCESS"
    on_failure:
      - script:     echo "FAILED"
      - NOTIFY:     <notification resource name>
    on_cancel:
      - script:     echo "CANCEL"
    always:
      - script:     pwd

#### END JOBS CONFIG

```

### Resources

Resources provide the information that jobs need in order to execute. For example, a pointer to a repository containing your scripts, or a pointer to a cluster you want to deploy to. A list of all supported resources is available in [Resource overview](/platform/workflow/resource/overview).

* **`resources`** -- start of the resources section

    * **`name`** -- an **alphanumeric** string (underscores are permitted) that makes it easy to infer what the resource represents, e.g., `aws_creds` to represent AWS keys. This name is used to define the IN or OUT entities to jobs, and needs to be unique across all repositories in your Subscription.

    * **`type`** -- Name of the resource type that this resource is an instance of. [Here](/platform/workflow/resource/overview#types) is a list of all types.

    * **`integration`** -- this may be required depending on the resource type. Integrations are an abstraction to 3rd party authentication secrets. For example, webhook token, Docker Hub credentials, and so on.

    * **`pointer`** -- section is used when the resource needs to reference something, usually on a third-party provider.  See the documentation for each of the resource types for more information.

    * **`seed`** -- section is used to specify a starting value for a resource. After the first run, the seed values are ignored. However, you can still use `seed` to reset the resource to start with a new value by changing it and committing the yml. This will create a new resource version as a new starting point.

    * **`version`** -- section contains information is not expected to change dynamically during a job run. Any time information changes in this section, a new version of the resource is created.

### Jobs

Jobs are the executable units of your Assembly Line.  A list of all supported jobs is available in [Job overview](/platform/workflow/job/overview).

* **`jobs`** -- start of the jobs section

    * **`name`** -- an **alphanumeric** string (underscores are permitted) that makes it easy to infer what the job does, e.g. `prov_test_env` to represent a job that provisions a test environment. Names of jobs need to be unique across all repositories in your Subscription.

    * **`type`** -- Name of the job type of which this job is an instance. [Here](/platform/workflow/job/overview#types) is a list of all types

    * **`steps`** -- is the heart of the job. It is an array of INs, TASK & OUTs.
      * `IN` -- specifies a resource or a preceding job that should be used as an input to this job. Whenever there is a change to an input, this job will be triggered. `IN`s have additional attributes that are used to control the flow.
        * `switch` -- this determines whether a change to this input entity will trigger a new run or not. The default is `on` and `switch` can be set to `off` to turn off auto triggering.
        * `versionName` -- this is used to pin a particular version of the input entity. This is a friendly name and the job will use the most recent matching version. You can pin your job to use a specific `versionName` for any of the `INs` in a job. This is typically used to control which version gets deployed or even [rollback](/deploy/rollback/) if you need to.
        * `versionNumber` -- this is used to pin a particular version of the input entity. Since every `versionNumber` is unique, this is guaranteed to give you predictable results. You can pin your job to use a specific versionNumber of any `INs` that the job uses. This is typically used to control which version gets deployed or even [rollback](/deploy/rollback/) if you need to. Both `versionName` and `versionNumber` cannot be used for the same `IN`.
        * `applyTo` - Optional setting allowed only [loadBalancer](/platform/workflow/resource/loadbalancer/), [image](/platform/workflow/resource/image/) & [dockerOptions](/platform/workflow/resource/dockeroptions/) resources when used in conjunction with a [deploy](/platform/workflow/job/deploy/) or [manifest](/platform/workflow/job/manifest/) job. In all other cases, it is ignored. If it is set in the context of a loadBalancer, it is an object that sets the manifest that the loadBalancer will connect to and the container image and port for the listener. In other cases, it expects either a manifest, release or an image name.
        * `force` -- an optional setting used only in [deploy](/platform/workflow/job/deploy/) jobs when the context is a `manifest` or `release` resource. This setting will force the deployment each time the job is triggered even if the manifest or release entity has not changed. Typically used if your images use static tags.
        * `showBuildStatus ` - this is allowed only for [gitRepo](/platform/workflow/resource/gitrepo/) resources with `buildOnPullRequest` turned on. This setting will push execution status messages to the open PR. For example, the following messages are shown in the GitHub UI:

            * Job is processing
          <img src="/images/platform/jobs/runSh/processingBuildStatus.png" alt="Build Status Processing" style="width:;vertical-align: middle;display: block;margin-right: auto;"/>

            * Job was successful
          <img src="/images/platform/jobs/runSh/successBuildStatus.png" alt="Build Status Success" style="width:800px;vertical-align: middle;display: block;margin-right: auto;"/>

            * Job was canceled or failed
          <img src="/images/platform/jobs/runSh/failedBuildStatus.png" alt="Build Status Failed" style="width:800px;vertical-align: middle;display: block;margin-right: auto;"/>


      * `TASK` -- in a [`runSh`](/platform/workflow/job/runsh/) job, this is an array of single line scripts that are executed as part of the job. These are executed in series and will stop processing the moment an exit code is encountered.  Only `runSh` jobs require a `TASK`.

      * `OUT` -- only resources can be `OUT`s. This is used when the current job is altering the state of the resource that is defined in the `OUT`. Any resource can be used for storing key-value pairs output by a job. The [state](/platform/workflow/resource/state/) resource can be used to store both key-value pairs and files. Only `state` resources can be both IN and OUT for the same job to avoid circular dependencies, which will cause a loop in your DevOps Assembly Lines.
        * `replicate` -- an optional setting that allows you to copy the current version of an `IN` resource in the context of the job to the desired `OUT` resource. This is useful if you need some pre-processing, for example, to validate the commit message of a git commit before you execute the actual job. A word of caution: this, if used improperly, can lead to unexpected behavior in your workflow
        * `overwrite` -- an optional setting that allows you to completely replace the state of the `OUT` resource. This is useful, for example, if you have multiple jobs that affect the state of the resource and you want the state of your resource to always reflect the most recent update. The default value is `false`, which means the state of your resource is always appended to by the `OUT`, never replaced.

    * **`on_start `** -- this section is executed before the `steps` are executed. You can run two types of activities here
    	* `script` -- any single line shell script can be executed here. This option is only available in `runCI` and `runSh` jobs.
    	* `NOTIFY` -- a resource of type [notification](/platform/workflow/resource/notification/) can be added to send alerts about the job.
    * **`on_success `** -- this section is executed if the `steps` execution exits with 0 as the exit code. Supports `script` for `runCI` and `runSh` and `NOTIFY` for all jobs.
    * **`on_failure `** -- this section is executed if the `steps` execution exits with non-zero exit code. Supports `script` for `runCI` and `runSh` and `NOTIFY` for all jobs.
    * **`on_cancel `** -- this section is executed if the `steps` execution is cancelled. Supports `script` for `runCI` and `runSh` and `NOTIFY` for all jobs.
    * **`always `** -- this section is executed no matter what the status is. Supports `script` for `runCI` and `runSh` and `NOTIFY` for all jobs.

## Adding configuration to Shippable

If you're using Shippable for CI only, follow [these instructions](/ci/enable-project/) to enable your repository.

If you're using Shippable's Assembly Lines, you can add your syncRepo by following instructions in the [Adding an Assembly Line](/platform/tutorial/workflow/crud-syncrepo/#adding-a-syncrepo) tutorial.


## Further Reading
* [Quick Start to CI](/getting-started/ci-sample)
* [Quick Start to CD](/getting-started/cd-sample)
