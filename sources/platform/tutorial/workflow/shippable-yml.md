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
  advancedReporting: <boolean>
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
  push:
    - command1
 
integrations:
 notifications:
   - integrationName: <name of your subscription integration>
     type: <type of notification>
     recipients:
       - #recp1
       - #recp2

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

* **`language`** -- this is language that we are going to use to decide which [Runtime image](/platform/runtime/overview) to use for your CI. If this is not specified, the default language used is [Ruby]()




A brief overview of each section of the yml is provided in this table. For a detailed explanation of each tag, you can scroll to the specific section of this page.


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
