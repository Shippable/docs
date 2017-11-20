page_main_title: Push Docker image to Amazon ECR
main_section: CI
sub_section: Pushing artifacts

#Pushing a Docker image to Amazon ECR

You can push your image to Amazon ECR in any section [of your yml](/ci/yml-structure/#anatomy-of-shippableyml). Typically, you would want to push your image at the end of the `ci` section, or in the `post_ci` or `push` sections.

##Setup

Before you start, you will need to connect your Amazon account with Shippable so we have the credentials to push your image on your behalf. We do this through <a href="/platform/integration/overview/"> Account Integrations</a>, so that your credentials are abstracted from your config file. Once you add an account integration, you can use it for all your projects without needing to add it again.

#### Generating access keys for Amazon ECR
- To generate **aws_access_key_id** and **aws_secret_access_key** please follow <a href="http://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html">Amazon's guide for Creating and Managing access keys</a>.

#### Adding Amazon Keys integration to your Shippable Account
- Follow the steps [here](/platform/integration/aws-keys).

##Basic config

After completing the Setup step, add the following to the `shippable.yml` for your project. This snippet tells our service to authenticate with Amazon ECR using your keys and pushes the image to ECR in the `post_ci` section.

**Note:** Both the deprecated [ECR integration](/platform/integration/aws-ecr) and newer [AWS keys](/platform/integration/aws-keys) integration support the same YML structure.

```
build:
  post_ci:
    - docker push aws-account-id.dkr.ecr.region.amazonaws.com/image-name:image-tag

integrations:
  hub:
    - integrationName: aws-keys-integration    #replace with your integration name
      region: us-east-1                   #replace with your AWS region
      type: ecr
```

You can replace your aws-keys-integration, aws-account-id, region, image-name and image-tag as required in the snippet above.

## Advanced config

### Limiting branches

By default, your integration is valid for all branches. If you want to only push your image for specific branch(es), you can do so with the `branches` keyword.

```
build:
  post_ci:
    - if [ "$BRANCH" == "master" ]; then docker push aws-account-id.dkr.ecr.region.amazonaws.com/image-name:image-tag; fi

integrations:                               
  hub:
    - integrationName: aws-keys-integration    #replace with your integration name
      type: ecr
      region: us-east-1                   #replace with your AWS region
      branches:
        only:
          - master

```
In addition to the `only` tag which includes specific branches, you can also use the `except` tag to exclude specific branches.

### Pushing to different accounts based on branch

You can also choose to push your images to different Amazon ECR accounts, depending on branch.

```
build:
  post_ci:
    - if [ "$BRANCH" == "master" ]; then docker push aws-account-id-one.dkr.ecr.region.amazonaws.com/image-name:image-tag; fi
    - if [ "$BRANCH" == "dev" ]; then docker push aws-account-id-two.dkr.ecr.region.amazonaws.com/image-name:image-tag; fi

integrations:                               
  hub:
    - integrationName: master-aws-keys    #replace with your integration name
      type: ecr
      region: us-east-1              #replace with your AWS region
      branches:
        only:
          - master

    - integrationName: dev-aws-keys    #replace with your integration name
      type: ecr
      region: us-east-1           #replace with your AWS region
      branches:
        only:
          - dev

```

In addition to the `only` tag which includes specific branches, you can also use the `except` tag to exclude specific branches.

### Pushing to different accounts based on release tags

You can also choose to push your images to different Docker Hub accounts, depending on the release tag.
When a release is created, a tag is specified. The account that is chosen is the one that matches the tag name.
Wild cards are supported. If a release is created without an existing tag, the tag version is used for matching.

To use release tags, please go to your project dashboard, click on Settings and enable `Releases` in `WEBHOOK CONFIG`
section.

```
build:
  post_ci:
    - if [ "$BRANCH" == "master" ]; then docker push aws-account-id-one.dkr.ecr.region.amazonaws.com/image-name:image-tag; fi
    - if [ "$BRANCH" == "dev" ]; then docker push aws-account-id-two.dkr.ecr.region.amazonaws.com/image-name:image-tag; fi

integrations:                               
  hub:
    - integrationName: master-aws-keys    #replace with your integration name   
      type: ecr    
      branches:
        only:
          - v1.* # production release tag

    - integrationName: dev-aws-keys    #replace with your integration name   
      type: ecr    
      branches:
        only:
          - v0.2-beta # beta release tag

```

In addition to the `only` tag which includes specific release tags, you can also use the `except` tag to exclude specific release tags.

### Pushing the CI container with all artifacts intact

If you are pushing your CI container to Amazon ECR and you want all build artifacts preserved, you should commit the container before pushing it as shown below:

```
build:
  post_ci:
    #Commit the container only if you want all the artifacts from the CI step
    - docker commit $SHIPPABLE_CONTAINER_NAME aws-account-id.dkr.ecr.region.amazonaws.com/image-name:image-tag
    - docker push aws-account-id.dkr.ecr.region.amazonaws.com/image-name:image-tag

integrations:                               
  hub:
    - integrationName: aws-keys-integration    #replace with your integration name
      type: ecr
      region: us-east-1                   #replace with your AWS region
```

The environment variable `$SHIPPABLE_CONTAINER_NAME` contains the name of your CI container.

###Pushing Docker images with multiple tags

If you want to push the container image with multiple tags, you can just push twice as shown below:


```
build:
  post_ci:
    - docker push aws-account-id.dkr.ecr.region.amazonaws.com/image-name:image-tag-one
    - docker push aws-account-id.dkr.ecr.region.amazonaws.com/image-name:image-tag-two

integrations:                               
  hub:
    - integrationName: aws-keys-integration    #replace with your integration name
      type: ecr
      region: us-east-1                   #replace with your AWS region
```

### Using a custom image for CI

If you are using a custom image for your CI workflow, we will try to login to ECR on your behalf from inside your CI build container. This means that you will need the **AWS Command Line Interface (CLI)** installed inside your custom image if you want this to succeed, else you will get a `aws: command` not found error.

You can solve this in 2 ways:

-  Set `agent_only: true` for ECR integration in your `shippable.yml`

```
integrations:
  hub:
    - integrationName: aws-keys-integration  #replace with your integration name
      type: ecr
      region: us-east-1                 #replace with your AWS region
      agent_only: true
```
If `agent_only` is set to `true`, we will not attempt to login to the registry from inside your CI build container. However, this also means that you will only be able to pull from or push to ECR in the `pre_ci` and `push` sections of the yml.

-  If you want to use docker commands to interact with ECR in your `ci`, `post_ci`, `on_success` or `on_failure` sections within your `shippable.yml`, then include the following in your **Dockerfile** to install the AWS CLI:
```
sudo pip install awscli
```

## Sample project

Here are some links to a working sample of this scenario. This is a simple Node.js application that runs some tests and then pushes
the image to Amazon ECR.

**Source code:**  [devops-recipes/ci-push-amazon-ecr](https://github.com/devops-recipes/ci-push-amazon-ecr).

**Build link:** <a href="https://app.shippable.com/github/himanshu0503/ci-push-amazon-ecr/runs/8/1/console"> CI build on Shippable</a>

**Build status badge:** [![Run Status](https://api.shippable.com/projects/59006c891fb3ec0700e1d646/badge?branch=master)](https://app.shippable.com/github/himanshu0503/ci-push-amazon-ecr)

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
