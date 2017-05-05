page_main_title: Yml structure
main_section: CI
sub_section: Overview
# Configure your build

All configuration for CI happens through shippable.yml which should be present at the root of the repository you want to build using Shippable. The following sections describe the overall structure of the shippable.yml file, as well as detailed descriptions of every section in it.

Advanced configurations are addressed in the **CI->Advanced Options** section in the left menu.

##Anatomy of shippable.yml

The structure of a basic shippable.yml is shown below. The sections below explore each section of the yml in greater detail.

```
language:

node_js:
  - #language version

services:
  - #any supported service

env:
  - #env1=foo
  - #env2=bar

matrix:

build:

  pre_ci:

  pre_ci_boot:
    image_name:
    image_tag:
    pull:
    options:
  ci:
    - #command1
    - #command2
  post_ci:
    - #command1
    - #command2
  on_success:
    - #command1
    - #command2
  on_failure:
    - #command1
    - #command2
  cache:
  cache_dir_list:
    - #dir1
  push:

integrations:
 notifications:
   - integrationName:
     type:
     recipients:
       - #recp1
       - #recp2

  hub:
    - integrationName:
      type:
      agent_only:
```

A brief overview of each section of the yml is provided in this table. For a detailed explanation of each tag, you can scroll to the specific section of this page.


| **yml tag**           |** default behavior without tag**                                                                         | **Description of usage**                                                                                                                                                                                                                                                                                                                                                |
|---------------------|------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [**language:**](set-language/)           | language gets set to ruby                                                                            | Set to the language your project is written in. e.g. node_js. [Read more](set-language/)                                                                                                                                                                                                                                                                                                        |
| [**runtime:**](set-language/)            | depends on language                                                                                  | Set to the language runtime version(s) you want to build against. [Read more](set-language/)                                                                                                                                                                                                                                                                                                  |
| [**services:**](services-overview/)           | no services are available                                                                            | Specify the services you need for your CI workflow, e.g. postgres, mysql, etc. [Read more](services-overview/)                                                                                                                                                                                                                                                                                     |
| [**env:**](env-vars/)                | Only standard environment variables are available during your CI workflow                            | Set custom environment variables for your builds. , including  `secure` variables, i.e. encrypted variables  used to store sensitive information. [Read more](env-vars/)                                                                                                                                                                                                                    |
| [**matrix:**](matrix-builds/)             | no default                                                                                           | Used to include or exclude only specific combination(s) from a build matrix. This is only relevant  if you  are triggering matrix builds, i.e. running several builds per trigger.  [Read more](matrix-builds/)                                                                                                                                                                                |
| [**build:**](build-and-test/)              | no default                                                                                           | Wrapper for several sub-sections like `pre_ci`, `ci`, `post_ci`, `on_success`, `on_failure`, `cache`, and `push`. [Read more](build-and-test/)                                                                                                                                                                                                                                                  |
|&nbsp;&nbsp;&nbsp;&nbsp;[pre_ci:](build-image/)         | no default                                                                                           | Used primarily if you need to use a custom image for your build or if you need to customize behavior of the  default CI container. You can build your image from a Dockerfile or pull an image from a Docker registry  in this section. **Commands in this section run outside the CI container**, so you should not include any commands required  for your CI workflow here. [Read more](build-image/)     |
|&nbsp;&nbsp;&nbsp;&nbsp;[pre_ci_boot:](build-image/)    | no default                                                                                           | Used to override the default image used for CI with your own custom image. You can also set specific options  for booting up the default CI container. [Read more](build-image/)                                                                                                                                                                                                             |
|&nbsp;&nbsp;&nbsp;&nbsp;[ci:](build-and-test/)             | depends on language                                                                                  | Include all commands for your CI workflow. Commands in this section are run inside your CI container,  so any dependencies you need for your build should be installed as the first set of commands in this section.  If this section is missing or empty, we call some default commands based on language, e.g. `npm install`  and `npm test` for Node.js projects. [Read more](build-and-test/)   |
|&nbsp;&nbsp;&nbsp;&nbsp;[post_ci:](build-and-test/)        | no default                                                                                           | Include commands that are not really a part of your core CI workflow but should be run after CI finishes. Commands in this section are run inside your CI container. [Read more](build-and-test/)                                                                                                                                                                                                  |
|&nbsp;&nbsp;&nbsp;&nbsp;[on_success:](build-and-test/)      | no default                                                                                           | Include commands you want to execute only if your CI workflow passes, i.e. the ci section exits with 0.  Commands in this section are run inside your CI container. [Read more](build-and-test/)                                                                                                                                                                                                  |
|&nbsp;&nbsp;&nbsp;&nbsp;[on_failure:](build-and-test/)      | no default                                                                                           | Include commands you want to execute only if your CI workflow fails, i.e. the ci section does not exit with 0.  Commands in this section are run inside your CI container. [Read more](build-and-test/)                                                                                                                                                                                           |
|&nbsp;&nbsp;&nbsp;&nbsp;[push:](#push)           | no default                                                                                           | Used to push Docker image to an image registry, especially if you are pushing to Google Container Registry  or Amazon ECR. **Commands in this section run outside your CI container.**                                                                                                                                                                                                                                           |
|&nbsp;&nbsp;&nbsp;&nbsp;[cache:](caching/)          | nothing is cached                                                                                    | Used to turn on caching. If set to true, the build directory SHIPPABLE_BUILD_DIR is cached. To cache specific folders, you can use the tag cache_dir_list. [Read more](caching/)                                                                                                                                                                                                           |
|&nbsp;&nbsp;&nbsp;&nbsp;[cache_dir_list:](caching/) | if cache is set to true, default is SHIPPABLE_BUILD_DIR                                              | Used to specify a list of folders that you want to cache between builds. [Read more](caching/)                                                                                                                                                                                                                                                                                           |
| [**integrations:**](/reference/integrations-overview/)       | no default                                                                                           | Wrapper for several subsections like `notifications`, `hub`,  and `keys`. This overall section lets you specify what third party services you want to interact with a part of your build.                                                                                                                                                                           |
|&nbsp;&nbsp;&nbsp;&nbsp;[notifications:](send-notifications/)     | Email notifications sent to last  committer and author on build  failure or status change to success | Used to send Slack, Hipchat, IRC notifications as well as to customize default email notification settings. This section can also be used to trigger a custom webhook or to trigger another Shippable project at various points during your CI workflow. [Read more](send-notifications/)                                                                                                           |
|&nbsp;&nbsp;&nbsp;&nbsp;[hub:](push-artifacts/)            | no default                                                                                           | Include this section if you want to interact with any Docker registry to pull a private image or push an image. [Read more](push-artifacts/)                                                                                                                                                                                                                                                    |
|&nbsp;&nbsp;&nbsp;&nbsp;[keys:](#keys)           | no default                                                                                           | Include this section if you need to use SSH or PEM keys to interact with services that are not natively supported on Shippable.                                                                                                                                                                                                                                     |
