main_section: CI
sub_section: Pushing artifacts

#Pushing a Docker image to GCR

You can push your image to GCR in any section [of your yml](../reference/ci-yml/). Typically, you would want to push your image at the end of the `ci` section, or in the `post_ci` or `push` sections.

##Setup

Before you start, you will need to connect your  GCR account with Shippable so we have the credentials to push your image on your behalf. We do this through [TODO Add link] Account Integrations, so that your credentials are abstracted from your config file. Once you add an account integration, you can use it for all your projects without needing to add it again.

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
<a href="https://cloud.google.com/container-registry/docs/auth#using_a_json_key_file" target="_blank"> Google's docs</a>.
#### Adding GCR Integration to your Shippable Account
-  Go to your **Account Settings** by clicking on the gear icon in the top navigation bar.
-  Click on **Integrations** in the left sidebar menu and then click on **Add integration**.
-  Search **GCR** in the list and click on **Create Integration**.
-  Name your integration and enter your **JSON key** obtained from **GDC**.
-  Choose the Subscription which contains the repository for which you want to push the image.
-  Click **Save**.

<img src="../../images/ci/gcr-hub-integration.png" alt="Add  GCR credentials">

##Basic config

2. After completing the Setup step, add the following to the `shippable.yml` for your project. This snippet tells our service to authenticate with GCR using your credentials.

```
integrations:                               
  hub:
    - integrationName: gcr-integration    #replace with your integration name
      type: gcr                        
```

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
    - integrationName: gcr-integration    #replace with your integration name   
      type: gcr    
      branches:
        only:
          - master

```
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
    - integrationName: master-gcr    #replace with your integration name   
      type: gcr    
      branches:
        only:
          - master

    - integrationName: dev-gcr    #replace with your integration name   
      type: gcr    
      branches:
        only:
          - dev

```

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
    - integrationName: gcr-integration    #replace with your integration name   
      type: gcr              
```

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
    - integrationName: gcr-integration   #replace with your integration name   
      type: gcr

```

### Important note for customers overriding default image for CI
If you are using a custom image for your CI workflow, we will try to login to GCR on your behalf from inside your CI build container. This means that you will need the gcloud SDK installed inside your custom image if you want this to succeed, else you will get a `gcloud: command` not found error.

You can solve this in 2 ways:

-  Set `agent_only: true` for GCR integration in your `shippable.yml`.
```
integrations:
  hub:
    - integrationName: gcr-integration
      type: gcr
      agent_only: true
```

If `agent_only` tag is set to `true`, we will not attempt to login to the registry from inside your CI build container. However, this also means that you will only be able to pull from or push to GCR in the `pre_ci` and `push` sections of the yml.

- If you want to use docker commands to interact with GCR in your `ci`, `post_ci`, `on_success` or `on_failure` sections within your shippable.yml, then please install the gcloud sdk in your custom image.

## Sample project

Here are some links to a working sample of this scenario. This is a simple Node.js application that runs some tests and then pushes
the image to GCR.

**Source code:**  [devops-recipes/push-docker-hub](https://github.com/devops-recipes/push-docker-hub).

**Build link:** [CI build on Shippable](https://app.shippable.com/github/devops-recipes/push-docker-hub/runs/1/1/console)

**Build status badge:** [![Run Status](https://api.shippable.com/projects/58f002c7c585000700aef8ca/badge?branch=master)](https://app.shippable.com/github/devops-recipes/push-docker-hub)

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
