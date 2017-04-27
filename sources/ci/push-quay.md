main_section: CI
sub_section: Pushing artifacts

#Pushing a Docker image to Quay.io

You can push your image to Quay.io in any section [of your yml](../reference/ci-yml/). Typically, you would want to push your image at the end of the `ci` section, or in the `post_ci` or `push` sections.

##Setup

Before you start, you will need to connect your Quay.io account with Shippable so we have the credentials to push your image on your behalf. We do this through <a href="../../getting-started/integrations/" target="_blank"> Account Integrations</a>, so that your credentials are abstracted from your config file. Once you add an account integration, you can use it for all your projects without needing to add it again.

#### Generating access token for Quay.io
-  Login to your Quay.io account and click on **Applications** in the top menu.
-  Select the organization under which you want to create an **access token**.
-  Select the organization under which you want to create an **access token**.
-  Click on **Applications** in the left side panel.
-  Click on **Create New Application**.
-  Enter the application name and hit enter.
-  Click on the application link that was created.
-  Click on **Generate Token** in the left side panel.
-  Check **Read/Write to any accessible repositories** box and click **Generate Access Token**.
-  **Authorize Application** and copy the **Access Token**.

#### Adding Quay.io Integration to your Shippable Account
-  Go to your **Account Settings** by clicking on the gear icon in the top navigation bar.
-  Click on **Integrations** in the left sidebar menu and then click on **Add integration**.
-  Search **Quay.io** in the list and click on **Create Integration**.
-  Name your integration and enter your **Quay Username**,  **Quay Password**, **Access Token**,  **Quay Email**.
-  Choose the Subscription which contains the repository for which you want to push the image.
-  Click **Save**.

<img src="../../images/ci/quay-hub-integration.png" alt="Add Quay.io keys">

##Basic config

After completing the Setup step, add the following to the `shippable.yml` for your project. This snippet tells our service to authenticate with Quay.io using your keys and pushes the image to ECR in the `post_ci` section.

```
build:
  post_ci:
    - docker push quay.io/organization/repository-name:image-tag

integrations:
  hub:
    - integrationName: quay-integration    #replace with your integration name
      type: quay.io
```

You can replace your quay-integration, organization, repository-name and image-tag as required in the snippet above.

## Advanced config

### Limiting branches

By default, your integration is valid for all branches. If you want to only push your image for specific branch(es), you can do so with the `branches` keyword.

```
build:
G  post_ci:
    - if [ "$BRANCH" == "master" ]; then docker push quay.io/organization/repository-name:image-tag; fi

integrations:
  hub:
    - integrationName: quay-integration    #replace with your integration name
      type: quay.io
      branches:
        only:
          - master

```
In addition to the `only` tag which includes specific branches, you can also use the `except` tag to exclude specific branches.

### Pushing to different accounts based on branch

You can also choose to push your images to different Quay.io accounts, depending on branch.

```
build:
  post_ci:
    - if [ "$BRANCH" == "master" ]; then docker push quay.io/organization-1/repository-name:image-tag; fi
    - if [ "$BRANCH" == "dev" ]; then docker push quay.io/organization-2/repository-name:image-tag; fi

integrations:
  hub:
    - integrationName: master-quay    #replace with your integration name
      type: quay.io
      branches:
        only:
          - master

    - integrationName: dev-quay    #replace with your integration name
      type: quay.io
      branches:
        only:
          - dev

```

###Pushing the CI container with all artifacts intact

If you are pushing your CI container to Quay.io and you want all build artifacts preserved, you should commit the container before pushing it as shown below:

```
build:
  post_ci:
    #Commit the container only if you want all the artifacts from the CI step
    - docker commit $SHIPPABLE_CONTAINER_NAME quay.io/organization/repository-name:image-tag
    - docker push quay.io/organization/repository-name:image-tag

integrations:
  hub:
    - integrationName: quay-integration    #replace with your integration name
      type: quay.io
```

The environment variable `$SHIPPABLE_CONTAINER_NAME` contains the name of your CI container.

###Pushing Docker images with multiple tags

If you want to push the container image with multiple tags, you can just push twice as shown below:


```
build:
  post_ci:
    - docker push quay.io/organization/repository-name:image-tag-one
    - docker push quay.io/organization/repository-name:image-tag-two

integrations:
  hub:
    - integrationName: quay-integration    #replace with your integration name
      type: quay.io

```

## Sample project

Here are some links to a working sample of this scenario. This is a simple Node.js application that runs some tests and then pushes
the image to Quay.io.

**Source code:**  [devops-recipes/ci-push-quay](https://github.com/devops-recipes/ci-push-quay).

**Build link:** [CI build on Shippable](https://app.shippable.com/github/himanshu0503/ci-push-quay/runs/1/1/console)

**Build status badge:** [![Run Status](https://api.shippable.com/projects/5900754c614d120700088a0d/badge?branch=master)](https://app.shippable.com/github/himanshu0503/ci-push-quay)

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
