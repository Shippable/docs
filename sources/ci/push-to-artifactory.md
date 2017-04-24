main_section: CI
sub_section: Pushing artifacts

#Pushing Artifacts to JFrog

You can push your artifacts to JFrog in any section [of your yml](../reference/ci-yml/). Typically, you would want to push your artifacts at the end of the `ci` section.

##Setup

Before you start, you will need to connect your JFrog account with Shippable so we have the credentials to push artifacts on your behalf. We do this through <a href="../../getting-started/integrations/" target="_blank"> Account Integrations</a>, so that your credentials are abstracted from your config file. Once you add an account integration, you can use it for all your projects without needing to add it again.

-  Go to your **Account Settings** by clicking on the gear icon in the top navigation bar.
-  Click on **Integrations** in the left sidebar menu and then click on **Add integration**.
-  Search **JFrog** in the list and click on **Create Integration**.
-  Name your integration and enter your **JFrog HTTP Endpoint**,  **JFrog Username** and **JFrog Password**.
-  Choose the Subscription which contains the repository for which you want to push the artifacts.
-  Click **Save**.

<img src="../../images/ci/jfrog-artifact-integration.png" alt="Add JFrog Keys">

## Basic Config

After completing the Setup step, add the following to the `shippable.yml` for your project. This snippet tells our service to authenticate with JFrog using your keys and pushes the artifacts the `ci` section.

```
build:
  ci:
    - jfrog rt u pages/artifact.tar

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
    - if [ "$BRANCH" == "master" ]; then jfrog rt u pages/artifact.tar; fi

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
the image to Quay.io.

**Source code:**  [devops-recipes/push-docker-hub](https://github.com/devops-recipes/push-docker-hub).

**Build link:** [CI build on Shippable](https://app.shippable.com/github/devops-recipes/push-docker-hub/runs/1/1/console)

**Build status badge:** [![Run Status](https://api.shippable.com/projects/58f002c7c585000700aef8ca/badge?branch=master)](https://app.shippable.com/github/devops-recipes/push-docker-hub)

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
