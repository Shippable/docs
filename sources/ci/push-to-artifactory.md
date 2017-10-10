page_main_title: Push to JFrog Artifactory
main_section: CI
sub_section: Pushing artifacts

#Pushing Artifacts to JFrog

You can push your artifacts to JFrog in any section [of your yml](/ci/yml-structure/#anatomy-of-shippableyml). Typically, you would want to push your artifacts at the end of the `ci` section.

##Setup

Before you start, you will need to connect your JFrog account with Shippable so we have the credentials to push artifacts on your behalf.

Please follow the steps outlined [here](/platform/integration/jfrog-artifactoryKey/). Once you add an account integration, you can use it for all your projects without needing to add it again.

## Basic Config

After completing the Setup step, add the following to the `shippable.yml` for your project. This snippet tells our service to authenticate with JFrog using your keys and pushes the artifacts in `ci` section.

```
build:
  ci:
    - jfrog rt u pages/artifact.tar target-dir/target-filename.tar

integrations:
  hub:
    - integrationName: jfrog-integration  #replace with your integration name
      type: artifactory
```

## Advanced config

### Limiting branches

By default, your integration is valid for all branches. If you want to only push your atifacts for specific branch(es), you can do so with the `branches` keyword.

```
build:
  ci:
    - if [ "$BRANCH" == "master" ]; then jfrog rt u pages/artifact.tar target-dir/target-filename.tar; fi

integrations:
  hub:
    - integrationName: jfrog-integration  #replace with your integration name
      type: artifactory
      branches:
        only:
          - master

```
In addition to the `only` tag which includes specific branches, you can also use the `except` tag to exclude specific branches.

## Sample project

Here are some links to a working sample of this scenario. This is a simple Node.js application that runs some tests and then pushes
the artifacts to JFrog.

**Source code:**  [devops-recipes/ci-push-to-jfrog](https://github.com/devops-recipes/ci-push-to-jfrog)

**Build link:** <a href="https://app.shippable.com/github/himanshu0503/ci-push-to-jfrog/runs/1/1/console" target="_blank"> CI build on Shippable</a>

**Build status badge:** [![Run Status](https://api.shippable.com/projects/5901b124cd251706003517fe/badge?branch=master)](https://app.shippable.com/github/himanshu0503/ci-push-to-jfrog)

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
