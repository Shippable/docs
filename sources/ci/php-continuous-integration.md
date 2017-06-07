page_main_title: PHP
main_section: CI
sub_section: Language guide

# Continuous Integration with PHP
This page explains yml configuration that is specific to PHP projects. For a complete yml reference, please read the [YML structure page](yml-structure/)

Our yml configuration is highly customizable. Please read the following sections carefully to learn how to
configure your builds.

-  [Basic configuration](#basic-php-config)
-  [Setting language and runtime](#language)
-  [Preparing your environment](#environment)
-  [Configuring build and test commands](#build-test)
-  [Test and code coverage visualizations](#test-coverage-reports)
-  [Advanced config](#advanced-config)

<a name="basic-php-config"></a>
##Basic configuration

The following `shippable.yml` should get you started with a simple PHP project.

```
language: php

php:
  - "7.0"
```
The snippet above will run the default command `phpunit` with PHP 7.0. To customize this configuration, please read the sections below.

Please note that the 7.0 version is inside double quotes. For any version ending with a 0, remember to use double quotes around the version number.

<a name="language"></a>
##Setting language and runtime

For PHP projects, the `language` tag should always be set to `php`. You can set the runtime to any version(s) using the `php` tag:

```
language: php

php:
  - 7.0
```

Our official build images, which are used to run your builds by default, come installed with multiple versions of PHP. Currently, the following versions are pre-installed:

-  5.6
-  7.0
-  7.1

To find out which versions are supported out of the box for your build image, read our [Machine images overview](/reference/machine-images-overview/).

If you want to test against several versions of PHP, you can specify multiple runtimes. The snippet below will trigger 2 builds, one against each version:

```
php:
  - 5.6
  - 7.0
```

**Important note:** The runtime tag only works with official CI images provided by Shippable. If you are using a custom image for your build, you will need to switch the runtime in the `ci` section of your yml.

<a name="environment"></a>
## Preparing your environment

If you're running a simple PHP build, feel free to skip this section since you should not have to do anything to prepare the environment. Read this section only if your build needs specific environment variables or you have very custom requirements for your build image.

###Setting environment variables
You can define any custom environment variables in the `env` section of your yml. Please read the [docs on Environment variables](env-vars/) for more information.

###Overriding the default build image

Depending on the `language` tag in your yml, an official build image is chosen for your build by default, and your build container is started with standard options. To find out the default image used for your builds, please read the [Machine images overview](../reference/machine-images-overview/).

If the default image does not satisfy your requirements, you can do one of three things:

-  Continue using default image and include commands to install any missing dependencies or packages in your yml
-  [Switch your Machine Image](../ci/build-image/#changing-your-default-tag) to a more recent version that contains what you need
-  [Use a custom build image](../ci/custom-docker-image/) that contains exactly what you need for your CI. Please note that this will add time to your build since the image will be pulled from a registry.

<a name="build-test"></a>
## Configuring build and test commands
The `ci` section should contain all commands you need for your `ci` workflow. Commands in this section are executed sequentially. If any command fails, we exit this section with a non zero exit code.

### Installing dependencies
If needed, you can download and install any dependencies needed for your build. This can be done using a PHP script, a shell script or with any series of commands. For example:

```
build:
  ci:
    - ./bin/ci/install_deps.sh
    - php vendor/vendors.php

```

### Running tests
Include your test command(s) in the ci section, after you've installed any required dependencies.  


```
build:
  ci:
    - phpunit <path to test file>
```

<a name="test-coverage-reports"></a>
## Test and code coverage
You can view your test and code coverage results in a consumable format and drill down further to find out which tests failed or which sections of your code were not covered by your tests.

Your tests results data needs to be in junit format and your code coverage results need to be in cobertura format in order to see these visualizations. Test and code coverage results need to be saved to shippable/testresults and shippable/codecoverage folders so that we can parse the reports.

For example, you can enable test and code coverage visualizations while using phpunit as shown below:

```
build:
  ci:  
    - mkdir -p shippable/testresults
    - mkdir -p shippable/codecoverage
    - phpunit  --log-junit shippable/testresults/junit.xml --coverage-xml shippable/codecoverage test.php
```

<a name="advanced-config"></a>
##Advanced config

### Enabling pre-installed extensions
Your build container comes pre-installed with the following extensions for versions 5.4, 5.5, 5.6: memcache, memcached, mongo, amqp-1.6.8, zmq-beta, redis

You need to enable the extensions you need in your yml. Replace the <extension> in the yml snippet below by the extension you need to enable:

```
build:
  ci:
    - echo "extension=<extension>.so" >> $HOME/.phpenv/versions/$(phpenv version-name)/etc/php.ini;
```

### Installing extensions
If you need to install an extension that is not pre-installed in your build container, you can use pickle to install and enable it as shown below:

```
build:
  ci:
    - pickle install intl
    - echo "extension=intl.so" >> $HOME/.phpenv/versions/$(phpenv version-name)/etc/php.ini;

```


### Caching PHP extensions
If you are installing php extensions s part of your build, you might want to cache the extensions folder to speed up your build. This will avoid instaling the extention each time:

```
build:
  cache: true
  cache_dir_list:
    - $HOME/.phpenv/versions/$(phpenv version-name)/lib/php/extensions/   
```

### Default commands

If the `ci` section is blank, we will run a default command. This has the same effect as the yml snippet below:

```
build:
  ci:
    - phpunit
```

To avoid executing the default command, include a simple command in like `pwd` or `ls` in this section.
