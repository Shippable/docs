page_main_title: CI Troubleshooting
main_section: CI
sub_section: Troubleshooting
page_title: Troubleshoot Continuous Integration
page_description: Commonly asked questions that will help with troubleshooting
page_keywords: concepts, documentation, shippable, CI/CD

#Troubleshooting Errors

This document helps in troubleshooting errors generated on the Shippable platform while running Continuous Integration. The document is divided into two parts:

1. Setup: Troubleshooting errors that occur during initial setup and prior to initiating a CI build.
2. Continuous Integration (CI): Troubleshooting errors that occur during the CI process and is shown in the Console output.

---
## Setup
### Owner not found
When enabling a project on Bitbucket, the following error is generated:

```
(Id: 2002) Owner not found for projectId::5762d2b72x8192902x23xxx2
warn: caller:5762x2x501346x0x00959x0x|projects|enableById:5762x2x72x8192902x23xfx2|_getValidOwner
```
Reason: Admin permissions on the repository are required to enable it as a project on Shippable's platform. This ensures Shippable can add a webhook to the repository and listen for commits and pull requests to trigger builds.

**How to avoid:** Ensure a user with Admin permissions enables the project **UpdateLink** on Shippable's platform. If you still get the error, then the permissions may be out of date and need to be udpated. Synchronize your permissions by clicking on the Account settings (gear icon in the top navigation bar) and clicking the `Sync` button.

---
## Continuous Integration
### failed to find yml file
```
- Alerts
  - Errors
    - failed to find yml file
```
Reason: All build configuration on Shippable happens through the `shippable.yml` file present at the root of your source contorl repository. If this file is missing, we don't know how to run your build and you see the error.

**How to avoid:** For any repository you enable on Shippable, create a `shippable.yml` file at the root of your repo in your source control. At a minimum, include the language used in your repo, the version used & commands for tests that you are running. This example below shows a basic shippable.yml file that uses Node.js v5.3 and runs an npm test:

```
language: node_js

node_js:
  - 5.3

build:
  ci:
    - npm install
    - npm test
```
Shippable builds all branches that have a shippable.yml at the root, unless they are explicitly excluded through the yml configuration.

The shippable.yml reference guide is the best resource to learn what's possible with Shippable and explore the full capabilities supported on the platform.

---
### Integration name specified in yml does not match
```
- Alerts
  - Errors
    - Integration name specified in yml does not match integrations present in Subscription settings: <name specified in subscription>
```
Reason: Notification and Hub integrations need to be set in two places - In the UI and in the `shippable.yml` file. You'll get this error if the name for the integration does not match in 'Subscription' Settings; 'Integrations' section and in the `shippable.yml` file.

**How to avoid:** Ensure the integration name are exactly the same in both `shippable.yml` and the integration in the UI. Read our documentation on enabling [notifications](/platform/integration/slackKey/#slack-integration) and [hub](/platform/integration/overview/) integration for more details.

---
### common2| cleanRunYml|callerId:
```
- Alerts
  - Errors
    - common2|_cleanRunYml|callerId:!xxxxxxxxx prjectId: yyyyy
```
Reason: The language configured in the `shippable.yml` file should have the correct syntax in order to be recognized. You will also get this error if you have enabled a project in the 'Infra' tab instead of the 'CI' tab. Infra projects are meant for terraform deployments and do not allow languages to be specified in the YML.

**How to avoid:** Ensure the correct syntax is used when specifying a language in the `shippable.yml`. All supported langagues and configuration syntax is [available here](/ci/set-language/#setting-language-and-runtime).

If you have indeed enabled the project through the 'Infra' tab instead of the 'CI' tab, then go to the 'Settings' page for your project, under the 'Options' tab, click the 'Delete' button. Go to the CI tab and enable the project from there and run your build.

---
### invalid yml format
```
- Alerts
  - Errors
    - invalid yml format
```
Reason: This error is shown when the overall structure and syntax of the `shippable.yml` file needs to be fixed

**How to avoid:** Use online tools such as [YAML Lint](http://www.yamllint.com/) or [YAML Online Parser](http://yaml-online-parser.appspot.com/) to check the overall structure and syntax of the `shippable.yml` file

---
### bad YML data
```
- Alerts
  - Errors
    - Bad YML data in build.ci. Only strings allowed
```
Reason: This error is shown when a particular line or section within the `shippable.yml` file needs to be fixed.

**How to avoid:** Refer our documentation **UpdateLink** on the `shippable.yml` file for the syntax of a specific section called out in the error.

---
### Permission denied (publickey)
Build fails with the following error in the console:

```
- git_sync
  - ssh-agent bash -c 'ssh-add /tmp/ssh/01_deploy; git clone ssh://git@bitbucket.org/..........'
    Permission denied (publickey).
    fatal: Could not read from remote repository.
    Please make sure you have the correct access rights and the repository exists.
```
Reason: The webhook to the source control system needs to be reset.

**How to avoid:** Follow the steps below:
- Click on your project from the Shippable dashboard
- Click the `Settings` tab
- Scroll all the way down and click the `Reset` button under the 'Reset' section
- Click `Confirm`.

The reset action will do the following things:
1. Reset the webhook for Shippable
2. Generate a new deploy key and update the repository

If you are using encrypted variables for this project, they'll need to be re-encrypted. Integrations and other settings will not be affected.

---
### Host key verification failed
Build fails with the following error in the console:

```
Host key verification failed.
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

Reason: There are two reasons why you get this error:

1. You are using a custom image & the $HOME environment variable is not set. When we update your ~/.ssh/config file to insert `StrictHostKeyChecking` to `no`, it throws up the error.
2. If you are using an image from **shippableimages** repo. We have deprecated support for those images and our official images are now in the [drydock repo on Docker Hub](https://hub.docker.com/u/drydock/).

How to avoid: For the reasons above, follow these steps:

1. To fix this error, you can either update your Dockerfile to set the $HOME environment variable, or you can set it in the `pre_ci_boot` section in the options tag within `shippable.yml` as shown:

    ```
build:
  pre_ci_boot:
    image_name: your/image
    image_tag: your_tag
    options: "-e HOME=/root"
	```

2. Start using one of the new, official images to avoid running into this error. Switching to the new yml format automatically selects one of the new, official images for your build, by default. The naming convention for these images is explained here **UpdateLink**.

For more information, view the [migration guide](http://blog.shippable.com/migrating-to-the-new-build-platform) and the [Top 5 tips for a successful migration](http://blog.shippable.com/5-tips-for-a-successful-migration).

---
### gcloud: command not found
Build fails with the following error:

```
gcr_login
   - cd /tmp && gcloud -q auth activate-service-account --key-file key.json
    /root/xxx.sh: line 58: gcloud: command not found

```

Reason: When you are using a custom image for your CI & you have specified a Google Container Registry (GCR) in the hub integration and in your `shippable.yml`, we try to log into GCR from inside the CI build container. Hence you would need the gcloud SDK (or awscli for ECR integrations) installed inside your custom image.

**How to avoid:** To avoid this, set the `agent_only: true` in the `shippable.yml` as shown below:

```
integrations:
  hub:
    - integrationName: gcloudKey_int_name
      type: gcloudKey
      agent_only: true
```
If you would like to push your image to GCR, then use the `push` section after the `build: ci` section, which ensures the image is pushed after the CI is completed and this command is run outside the build container.

Refer our documentation on this topic **UpdateLink** for more details.

---
### Error: Allowed memory size exhausted

Build fails as it runs out of memory while installing PHP or Drupal, etc. with the following error:

```
Error: Allowed memory size of 134217728 bytes exhausted (tried to
allocate 913408 bytes)
```

Reason: The default memory_limit in the php.ini has been reached.

**How to avoid:** You can add/change the settings of the php.ini file located at `~/.phpenv/versions/$(phpenv version-name)/etc/php.ini`. Add the following to the `ci` section of the `shippable.yml`:

```
- echo "memory_limit = 256M" >> $HOME/.phpenv/versions/$(phpenv version-name)/etc/php.ini
```

---
### no basic auth credentials
When pushing a Docker image to a Docker Registry (Docker Hub, Amazon ECR, Google Container Registry, etc.), build fails with the following error:

```
- docker push 604622019445.dkr.ecr.us-east-1.amazonaws.com/xxxxxx/node:latest 0s
The push refers to a repository [xxxxxx.dkr.ecr.us-east-1.amazonaws.com/xxxxx/node] (len: 1)
25ce9d9cdec1: Preparing
Post https://xxxxxx.dkr.ecr.us-east-1.amazonaws.com/v2/xxxxx/node/blobs/uploads/: no basic auth credentials
```
Reason: The Hub integration needs to be configured correctly.

**How to avoid:** Check the following settings to ensure the Hub/Generic integration has been configured correctly.

1. Ensure the Hub integration has been correctly set in the 'Account' settings based on the Docker Registry used **UpdateLink**
2. Check the 'Project' Settings to ensure the above integration is listed under the 'Hub Integration'. Read instructions on setting it up **UpdateLink**, if it is not.
3. Ensure it is listed in the `shippable.yml` file under the `integration` section and the `integrationName` is exactly the same as the one specified in the UI.
4. Ensure the indentation in the `shippable.yml` is correct. Here is an example

```
integration:
  hub:
    - integrationName:
      type:
      agent_only:
      branches:
```
---
### No such file or directory
When using the `cd` command, build fails with the following error:
```
cd micro-www .
/root/9a8ff880-7a6f-4b3e-b464-d3c709399e60.sh: line 58: cd: micro-www: No such file or directory
```
Reason: The folder (`micro-www` in this example) either does not exist or is a sub-folder and hence is unreachable.

**How to avoid:** Check the path to the folder on your source control system. Include the entire path to the folder in the `cd` command. For example: `cd /root/src/github.com/Shippable-Demo/micro-sample/micro-www .`

---
### ImportError: cannot import name Config
For integrations with AWS Elastic Beanstalk, builds fail when running the `eb init` command with the following error:
```
File "/usr/local/lib/python2.7/dist-packages/boto3/__init__.py", line 16, in <module>
    from boto3.session import Session
File "/usr/local/lib/python2.7/dist-packages/boto3/session.py", line 17, in <module>
    from botocore.client import Config
ImportError: cannot import name Config
```
Reason: A new version of `awsebcli` was released, and pip is installing the new version. While 3.7.6 runs without an error, 3.7.7 needs a newer version of 'botocore'.

**How to avoid:** Upgrade 'botocore' to the latest version at the end of the `post_ci` section by including the command below in the `shippable.yml` file:
```
post_ci:
  - pip install --upgrade botocore
```

---
### The Docker Engine version is less than the minimum
When using Docker Compose in the `post_ci` section, the build fails with the following error:

```
The Docker Engine version is less than the minimum required by Compose. Your current project requires a Docker Engine of version 1.10.0 or greater
```

Reason: The standard AMI uses Docker Engine of version 1.9. Our normal policy is to upgrade Docker version on our AMI every quarter after extensive testing. Since Docker Compose will not work on this version, we've created a new AMI and allow users to choose that for the build from the 'Subscription Settings'

**How to avoid:** Navigate to the subscription settings page and select the unstable image which has docker version 1.11.1 available on it and all the builds for your subscription will be using this image to run your builds. For more info check out the Machine Images Section **UpdateLink**.

---
###Slack notifications do not occur after the July 1st service maintenance
On July 1, 2016, Shippable underwent a scheduled service maintenance. Since then Slack notifications is not triggered for few customers.

Reason: Legacy users who have Slack integration configured only in the UI ('Subscription' settings; 'Integrations' section; 'Notification Integration') and not in the `shippable.yml` had Slack notifications triggered for all events. Since the service update, Slack notifications are required to be configured both in the UI and in the `shippable.yml`. Hence legacy users who have Slack notifications configured only in the UI no longer receive the notifications.

**How to avoid:** In order to ensure Slack notifications are triggered for the legacy users, just like before, for all events, use the following code in your `shippable.yml` file:

```
integrations:
  notifications:
    - integrationName: foobar-slack
      type: slack
      recipients:
        - "#shippable"
      on_start: always
      on_success: always
```

Note that `on_start` defaults to `never` and `on_success` defaults to `change` if these tags are not specified in the `shippable.yml` file. Changing both to `always` matches the previous fallback behavior for legacy users.

Read more about [configuring Slack notifications](/platform/integration/slackKey/#slack-integration) in our documentation.

---
### I have enabled my repository and committed code, but my build doesn't start. What could be wrong?

A couple of reasons why this could happen:

(1) Missing YML in the branch you are building. Create a `shippable.yml` file in the root of your repository. Here is the [reference](/ci/yml-structure/#anatomy-of-shippableyml) for a `shippable.yml` file

(2) Shippable YML is invalid. Please validate your YML using either of the links below:

* [YAML Lint](http://www.yamllint.com/)
* [YAML Online Parser](http://yaml-online-parser.appspot.com/)

---
### How do I set desired timezones inside the minions?

By default, our minions are configured with ETC/UTC timezone which is
set in /etc/timezone file for ubuntu minions. However, we allow you to
set a specific time zone for the minion in before\_script section of
your yml file . For example, you can do the following in your yml:

```
build:
  ci:
    - echo 'Europe/Paris' | sudo tee /etc/timezone
    - sudo dpkg-reconfigure --frontend noninteractive tzdata
```

This will change your minion timezone to paris time. Refer the article
[list of tz database time zones](http://en.wikipedia.org/wiki/List_of_tz_database_time_zones) to select the timezone for your location.

---
### How do I skip webhook builds?

Any changes to your source code will trigger a build automatically on Shippable. If you do not want to run build for a particular commit,
then add ```ci skip``` or ```skip ci``` to your commit message.

Our webhook processor will look for the string ```ci skip``` or ```skip ci``` in the commit message and if it exists, then that particular
webhook build will not be executed.

**PR Builds:** To skip a PR build, the ```ci skip``` or ```skip ci``` needs to be part of your PR title, since that's what GitHub sends us as part of the webhook.

**PR Build with multiple commits:** If the original commit did not include the skip flags and subsequent commits do, the PR build will _not_ skip a build.

---
### In my total build time, provisioning a node takes the longest time. How can I reduce the node provisioning time?
When you trigger a build, we spin up a build machine and run your build. This provisioning takes approximately 2-3 minutes.

If you want your builds to start immediately and avoid the node provisioning time, you can use our feature that lets you run builds on your own infrastructure. You can buy a machine from AWS or Digital Ocean or Linode and attach it to your Shippable subscription. We will run all your builds on your attached machines, and since your machines are always up, we will not need to provision nodes and this will save ~3 mins per build. You can read more about [Bringing Your Own Node - BYON](/platform/runtime/nodes/#custom-nodes).
---
### I am pushing to Heroku as part of my build. Why is this suddenly failing?

We have made a change as to where your keys are stored on your minion.

You probably have a command in your yml that looks something like this:

```
- test -f ~/.ssh/id_rsa.heroku || ssh-keygen -y -f ~/.ssh/id_rsa > ~/.ssh/id_rsa.heroku && heroku keys:add ~/.ssh/id_rsa.heroku
```

You will need to replace the `~/.ssh/id_rsa` to `/tmp/ssh/00_sub` since that is the new location for keys. Your command will now look like this:
```
- test -f ~/.ssh/id_rsa.heroku || ssh-keygen -y -f /tmp/ssh/00_sub > ~/.ssh/id_rsa.heroku && heroku keys:add ~/.ssh/id_rsa.heroku
```
Your push to Heroku should succeed with this change.

---
### I cannot start a manual build for my Bitbucket project. Why is it not working?

Check your branch name to see if it contains a ```/```. The Bitbucket API currently does not support branch names with a ```/``` in them. We opened a support issue with them - [Get commit/{revision} API does not accept branch names with "/"](https://bitbucket.org/site/master/issues/9969/get-commit-revision-api-does-not-accept) over 1 year ago and there is still no resolution for this. This is not a Shippable bug and while we understand that this affects everyone who uses Gitflow+Shippable+Bitbucket, we cannot fix this at our end.

---
### I am using PHP 7.0 and am unable to install extensions as part of my yml config.

We use pickle to install extensions for PHP. This works for all versions of PHP except 7.0.

Pickle requires `php$ver-dev` environment (which has development modules) to compile extensions. At this time, there is no official php7-dev environment, so pickle is unable to find dependent modules and cannot compile extensions like intl, redis, and gettext.

We will watch for updates and as soon as `php7-dev` is available, the next image update will address this.

---
###How do pull request builds work?
The usual workflow for a pull request is:

* Developer commits to his branch/fork: This will trigger a build on Shippable if the branch/fork is enabled for CI
* Developer opens a pull request with the changes. This will trigger a pull request build if the branch that is being merged to is enabled on Shippable. We will execute your CI workflow on temporarily merged code and let you know if everything works as expected. A couple of things to know about pull request builds:
  - The YML is always picked from the destination(base) branch.
  - If the pull request comes from a private fork of the project and the subscription key is not added as a deploy key for the fork, the pull request build will fail at the `git_sync` CI step. This is due to the way Bitbucket handles permissions on private forks. To fix this:
     - Copy the subscription deploy key from Shippable Subscription page > gear icon > Setting > Deployment Key section.
     - Next, add it as a deploy key for the private fork: Bitbucket Project Settings > Deploy Key > Add.
* The pull request is merged. This will trigger a build if the destination (base) branch is enabled on Shippable.

---
### How do I specify a region while setting up AWS Keys Integration for ECR?
When you set up the [AWS keys integration](/platform/integration/aws-keys), the default region is set to  `us-east-1`. You can override the default region by configuring the `shippable.yml` file as shown below.

```
integrations:
  hub:
    - integrationName: your_integration_name
      type: ecr
      region: us-west-2
```

---
### Can I use multiple languages in a build?

Yes. The [language tag in the yml](/ci/set-language/#setting-language-and-runtime) mainly tells us which default build image to use and any default handling for that language.

If you want to use multiple languages, you should:

1. Specify your primary [language](/ci/set-language/#setting-language-and-runtime) as usual. For example: `language: node_js`. This will cause your build to run on the default Shippable image for that language.
1. In the `ci` section of your yml, first install the dependencies for the other language(s) in the build.

You can also build your own Docker image with all the dependencies you need for both languages and then [override the default build image](/ci/custom-docker-image/#pulling-your-custom-image-and-using-it-for-ci) to use your Docker image.

Let's look at an example of using Node.js & Ruby in a build.

Specify your [language](/ci/set-language/#setting-language-and-runtime) in the `shippable.yml`. For example: `language: node_js`. This will cause your build to run on the [default Shippable image](/ci/build-image/) for that language.

All [official Shippable images](https://hub.docker.com/u/drydock/) have rvm installed, with a default version of Ruby. However, the rvm location is not added to the $PATH environment variable, so you will need to `source` rvm in your YML. This will give you access to both `ruby` and `rvm`. Your `shippable.yml` should look like this:

```
language: node_js

#desired Node.js version(s)
node_js:
  - "0.12"

build:
  ci:
    - source /usr/local/rvm/scripts/rvm
```

---
### Can I run unit tests in multiple languages in the same repository?

Yes, you can run unit tests in multiple languages in the same repo. Let's look at an example of running Javascript and Python unit tests in the same build on Shippable.

The easiest way to do this would be to specify `node_js` as your language in the `shippable.yml` file, since python already comes installed on our node images by default. Your `shippable.yml` should look like this:


```
language: node_js

# specify node version(s)
node_js:
  - "0.12"

build:
  ci:
    # check the python version; it will be 2.7 by default
    - python --version
    # check the node version; it will be whatever you specified under node_js, above
    - node --version
    - npm install
    - pip install -r requirements.txt
    # now run your tests
```


This `yml` configuration should cover a lot of scenarios. If you want a more tailor-made set-up, you can always create a custom image, install what you want in that image, and then use that for your build. Feel free to use our [drydock images](https://github.com/dry-dock) as a starting place; these are our build images. For more info on how to use custom images with a build, check out our [docs](/ci/custom-docker-image/#pulling-your-custom-image-and-using-it-for-ci).


---
### How do I identify the node on which the job ran?

There are two ways to identify the node on which the job ran:

1. In the UI, the job console has a section called `Job node info`, under which is `uname -a` that shows you the hostname of the node
1. For API users, each job has a "nodeId" property that can be used to identify the node

While the job is running, you can view the job being run on a particular node by going into your Subscription Settings>Nodes section

---
### Builds fail on all my custom nodes
We've made key changes to the Shippable agent that runs on custom nodes (BYON). To implement this change, all custom nodes were reset in the [5.2.3 release](https://github.com/Shippable/support/wiki/5-2-3). With this release, builds will fail on *un-reset* custom nodes that were initialized using a script. [Reset all your custom nodes](/platform/runtime/nodes/#custom-nodes) for builds to run successfully.
