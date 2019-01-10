page_main_title: Retrying a command
main_section: CI
sub_section: Configuration
sub_sub_section: Advanced config
page_title: Retrying a command during CI
page_description: How do get around network glitches by retrying commands during CI
page_keywords: retry, shippable docs, config, yml, network, latency, performance


# Retrying a command

Sometimes, commands like `npm install` fail due to the intermittent network issues and this affects your build result since the command returns a non-zero exit code.

To avoid this, you can use `shippable_retry` in the yml to try the command up to 3 times if it returns a non-zero code.

`shippable_retry` functionality is available for all default installation commands. You can
also use it for any custom installation from external resources. See examples below for some typical uses of this command.


## Retrying apt-get commands

```
build:
  ci:
    - shippable_retry sudo apt-get update
    - shippable_retry sudo apt-get install something
```

## Retrying pip commands

```
build:
  ci:
    - shippable_retry pip install
```

## Retrying docker commands

```
build:
  pre_ci:
    - shippable_retry docker pull manishas/sample-node:tag
  post_ci:
    #Commit the container only if you want all the artifacts from the CI step
    - docker commit $SHIPPABLE_CONTAINER_NAME manishas/sample-node:tag
    - shippable_retry docker push manishas/sample-node:tag
```
