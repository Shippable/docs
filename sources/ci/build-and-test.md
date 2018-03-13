page_main_title: Configuring your CI
main_section: CI
sub_section: Building and testing your project
page_title: Configuring your CI
page_description: How to configure CI for your project in shippable.yml

# Configuring your CI

The following sections of your `shippable.yml` will contain the bulk of your CI configuration:

-  The `ci` section is where you install dependencies, create databases and folders, and include your build and test commands.
-  The `post_ci` section includes commands that are not really a part of your core CI workflow but should be run after CI finishes. A good example is pushing artifacts to S3 or a Docker registry.
-  The `on_success` includes commands you want to execute only if your CI workflow passes, i.e. the `ci` section exits with 0.
-  The `on_failure` includes commands you want to execute only if your CI workflow fails, i.e. the `ci` section does not exit with a 0.

<br>
All commands in these sections are executed sequentially inside your build container in the order they appear in your yml.

##The `ci` section

The `ci` section is where you install dependencies, create databases and folders, and include your build and test commands. This section is optional, but if you don't have any commands in this section, we will run default commands based on language, e.g. `npm install` and `npm test` for Node.js projects.

A simple example of how to configure the `ci` section for a [Node.js](nodejs-continuous-integration/) project using [MySQL database](mysql/) is shown below:

```
build:
  ci:
    - npm install    
    - mkdir -p shippable/testresults
    - mkdir -p shippable/codecoverage
    - mysql -e 'create database if not exists test;'
    - grunt
    - npm test

```

In general, follow the guidelines below to write the `ci` section:

###1. Install dependencies
First, install or update any required dependencies or packages. Commands like `npm install` or `sudo apt-get update` should be at the top of this section.

###2. Create databases and folders
Next, create any databases or folders you need. For example, you could create a mysql database with a `- mysql -e 'create database myapp_test;'` or create folders for test results with the command `- mkdir -p shippable/testresults`

###3. Include build and test commands
Next, include commands for your builds and tests. This could be something like `- nosetests python/sample.py --with-xunit --xunit-file=shippable/testresults/nosetests.xml` for a python project.


Depending on the whether your `ci` section is successful or not, the `on_success` or `on_failure` sections will be executed. You can include post build actions depending on your build result in these sections.

**Things to remember**

If the `ci` section is blank, then default commands are executed, depending on the language. For more information, check out specific language pages:

-  [Node.js](nodejs-continuous-integration.md)
-  [Python](python-continuous-integration.md)
-  [Java](java-continuous-integration.md)
-  [Ruby](ruby-continuous-integration.md)
-  [Go](go-continuous-integration.md)
-  [Scala](scala-continuous-integration.md)
-  [PHP](php-continuous-integration.md)
-  [Clojure](clojure-continuous-integration.md)
-  [C/C++](cpp-continuous-integration.md)

## post_ci
The `post_ci` section of the yml is executed after the `ci` section. Similar to the `ci` section, you can include a set of commands in this section which will be executed sequentially. Please note that commands in the `post_ci` section is not executed if the ci section fails.

Example of post_ci section config:

```
build:
  post_ci:
    - ./post_CI_processing.sh

```  

## on_success

The `on_success` section is provided for any actions you want to take if your CI is successful. The commands in this section are executed only if the `ci` section exits with 0, indicating success.

For example, you can execute a script if CI succeeds with the following yml snippet:

```
build:
  on_success:
    - ./doSomething.sh

```  

## on_failure

The `on_failure` section is provided for any actions you want to take if your CI fails for any reason. The commands in this section are executed only if the `ci` section does not exits with 0, indicating failure.

For example, you can execute a script if CI fails with the following yml snippet:

```
build:
  on_failure:
    - ./doSomething.sh

```
**Things to remember**

- The `on_failure` section will not be executed for timed out, unstable builds.
- This section is also not executed if the build fails because code coverage does not meet the minimum threshold value.
