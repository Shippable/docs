page_main_title: Push Docker image to GCR
main_section: CI
sub_section: Configuration
sub_sub_section: Pushing artifacts
page_title: Pushing a Docker image to GCR
page_description: How to push a Docker image to GCR in Shippable

#Pushing a Docker image to GCR

You can push your image to GCR in any section [of your yml](/ci/yml-structure/#anatomy-of-shippableyml). Typically, you would want to push your image at the end of the `ci` section, or in the `post_ci` or `push` sections.

##Setup

Before you start, you will need to connect your  Google cloud account with Shippable so we have the credentials to push your image on your behalf. We do this through <a href="/platform/integration/overview/"> Account Integrations</a>, so that your credentials are abstracted from your config file. Once you add an account integration, you can use it for all your projects without needing to add it again.

#### Generating a JSON key on Google Developers Console (GDC)
-  In the top navigation bar, select the project you want to integrate with Shippable.
-  Click on the **Products and Services** menu on the top left.
-  Click on the **Manage project settings** on the **Project info** card.
-  Click on the **Service accounts** on the left panel.
-  Click on the **Create service account**.
-  Enter the desired values and hit **Create**.
-  Now that the service account is created click on **Create key** present under the right dropdown.
-  Create a key of type **JSON** and hit **Create**.
-  Your new **JSON key** is generated and downloaded to your machine. Please store this carefully since you will not be able to retrieve this from your GDC account.
-  For more on JSON keys and Service accounts, read
<a href="https://cloud.google.com/container-registry/docs/auth#using_a_json_key_file"> Google's docs</a>.
#### Adding Google Cloud Account Integration to your Shippable Account
-  Please follow the steps mentioned [here](/platform/integration/gcloudKey/).

<img src="/images/platform/integrations/gcloud-integration.png" alt="Add  Google Cloud credentials">

- Ensure that your subscription has access to the account integration. Subscription integrations can be viewed using the steps articulated [here](http://docs.shippable.com/platform/management/subscription/integrations/#subscription-integrations).
- Use the Subscription integration name in the configuration below. If you gave access to the subscription from the account integration dashboard, then the subscription integration is automatically created and has the same name as the account integration.

##Basic config

2. After completing the Setup step, add the following to the `shippable.yml` for your project. This snippet tells our service to authenticate with GCR using your credentials.

```
integrations:
  hub:
    - integrationName: gcloud-integration    #replace with your subscription integration name
      type: gcloudKey
```
**Note:** If you're still using the deprecated [GCR integration](/platform/integration/deprecated/gcr), set the `type` here to `gcr`. Both will work exactly the same

3. Push to GCR in your `shippable.yml` file:

```
build:
  post_ci:
    - docker push gcr.io/myOrg/myImageRepo:myTag
```

You can replace your myOrg, myImageRepo, and myTag as required in the snippet above.

## Advanced config
### Limiting branches

By default, your integration is valid for all branches. If you want to only push your image for specific branch(es), you can do so with the `branches` keyword.

```
build:
  post_ci:
    - if [ "$BRANCH" == "master" ]; then docker push gcr.io/myOrg/myImageRepo:myTag; fi

integrations:
  hub:
    - integrationName: gcloud-integration    #replace with your subscription integration name
      type: gcloudKey
      branches:
        only:
          - master

```

**Note:** If you're still using the deprecated [GCR integration](/platform/integration/deprecated/gcr), set the `type` here to `gcr`. Both will work exactly the same

In addition to the `only` tag which includes specific branches, you can also use the `except` tag to exclude specific branches.

### Pushing to different accounts based on branch

You can also choose to push your images to different GCR accounts, depending on branch.

```
build:
  post_ci:
    - if [ "$BRANCH" == "master" ]; then docker push gcr.io/myOrg-One/myImageRepo:myTag; fi
    - if [ "$BRANCH" == "dev" ]; then docker push gcr.io/myOrg-Two/myImageRepo:myTag; fi

integrations:
  hub:
    - integrationName: master-gcloud    #replace with your subscription integration name
      type: gcloudKey
      branches:
        only:
          - master

    - integrationName: dev-gcloud    #replace with your subscription integration name
      type: gcloudKey
      branches:
        only:
          - dev

```

**Note:** If you're still using the deprecated [GCR integration](/platform/integration/deprecated/gcr), set the `type` here to `gcr`. Both will work exactly the same

In addition to the `only` tag which includes specific branches, you can also use the `except` tag to exclude specific branches.

### Pushing to different accounts based on release tags

You can also choose to push your images to different GCR accounts, depending on the release tag.
When a release is created, a tag is specified. The account that is chosen is the one that matches the tag name.
Wild cards are supported. If a release is created without an existing tag, the tag version is used for matching.

To use release tags, please go to your project dashboard, click on `Settings(gear icon)` and enable `Releases` in `WEBHOOK CONFIG`
section.

```
build:
  post_ci:
    - if [ "$BRANCH" == "master" ]; then docker push gcr.io/myOrg-One/myImageRepo:myTag; fi
    - if [ "$BRANCH" == "dev" ]; then docker push gcr.io/myOrg-Two/myImageRepo:myTag; fi

integrations:                               
  hub:
    - integrationName: master-gclpud    #replace with your subscription integration name   
      type: gcloudKey    
      branches:
        only:
          - v1.* # production release tag

    - integrationName: dev-gcloud    #replace with your subscription integration name   
      type: gcloudKey    
      branches:
        only:
          - v0.2-beta # beta release tag

```
**Note:** If you're still using the deprecated [GCR integration](/platform/integration/deprecated/gcr), set the `type` here to `gcr`. Both will work exactly the same

In addition to the `only` tag which includes specific release tags, you can also use the `except` tag to exclude specific release tags.

###Pushing the CI container with all artifacts intact

If you are pushing your CI container to GCR and you want all build artifacts preserved, you should commit the container before pushing it as shown below:

```
build:
  post_ci:
    #Commit the container only if you want all the artifacts from the CI step
    - docker commit $SHIPPABLE_CONTAINER_NAME gcr.io/myOrg/myImageRepo:myTag
    - docker push gcr.io/myOrg/myImageRepo:myTag

integrations:
  hub:
    - integrationName: gcloud-integration    #replace with your subscription integration name
      type: gcloudKey
```
**Note:** If you're still using the deprecated [GCR integration](/platform/integration/deprecated/gcr), set the `type` here to `gcr`. Both will work exactly the same

The environment variable `$SHIPPABLE_CONTAINER_NAME` contains the name of your CI container.

###Pushing Docker images with multiple tags

If you want to push the container image with multiple tags, you can just push twice as shown below:


```
build:
  post_ci:
    - docker push gcr.io/myOrg/myImageRepo:image-tag-1
    - docker push gcr.io/myOrg/myImageRepo:image-tag-2

integrations:
  hub:
    - integrationName: gcloud-integration   #replace with your subscription integration name
      type: gcloudKey

```
**Note:** If you're still using the deprecated [GCR integration](/platform/integration/deprecated/gcr), set the `type` here to `gcr`. Both will work exactly the same


### Using a custom image for CI

If you are using a custom image for your CI workflow, we will try to login to GCR on your behalf from inside your CI build container. This means that you will need the gcloud SDK installed inside your custom image if you want this to succeed, else you will get a `gcloud: command` not found error.

You can solve this in 2 ways:

-  Set `agent_only: true` for GCR integration in your `shippable.yml`.
```
integrations:
  hub:
    - integrationName: gcloud-integration
      type: gcloudKey
      agent_only: true
```
**Note:** If you're still using the deprecated [GCR integration](/platform/integration/deprecated/gcr), set the `type` here to `gcr`. Both will work exactly the same

If `agent_only` tag is set to `true`, we will not attempt to login to the registry from inside your CI build container. However, this also means that you will only be able to pull from or push to GCR in the `pre_ci` and `push` sections of the yml.

- If you want to use docker commands to interact with GCR in your `ci`, `post_ci`, `on_success` or `on_failure` sections within your shippable.yml, then please install the gcloud sdk in your custom image.

## Sample project

Here are some links to a working sample of this scenario. This is a simple Node.js application that runs some tests and then pushes
the image to GCR.

**Source code:**  [devops-recipes/ci-push-gcr](https://github.com/devops-recipes/ci-push-gcr).

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
