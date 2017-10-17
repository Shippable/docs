page_main_title: Building a Docker image
main_section: CI
sub_section: Building and testing your project

#Building a Docker image

If your application is packaged as a Docker image, you can build it as part of your CI workflow. Typically, you would want to build your image in the `ci` or `post_ci` sections, depending on your scenario.

## Instructions

###1. Commit your Dockerfile

Your Dockerfile needs to be committed to the repository. It doesn't have to be at the root of the repository since we can specify a path while calling the `docker build` command.

###2. Specifying hub integration

If your Dockerfile specifies a private image in its `FROM` section, we need to authenticate against the registry it is stored in. If your `FROM` image is  a public image which can be pulled without authentication, skip this step.

* Add an integration for the Docker registry where the private image is stored. Instructions are here:

    - [Docker Hub](/platform/integration/docker-hub)
    - [Docker Trusted Registry](/platform/integration/docker-trusted-registry)
    - [AWS Elastic Container Registry](/platform/integration/aws-keys)
    - [Google Container Registry](/platform/integration/gcr)
    - [Quay](/platform/integration/quayLogin)
    - [JFrog Artifactory](/platform/integration/jfrog-artifactoryKey)

  Write down the friendly name of the integration you just created.

* Include the integration in your `shippable.yml`.

For example, here is a snippet for Docker Hub:

```
integrations:
  hub:
    - integrationName: myIntegration    #replace with your integration name   
      type: docker     
```

For other registries, the `type` is set as follows:

  - Amazon ECR: `type: ecr`
  - GCR: `type: gcr`
  - Docker Private/Trusted Registry: `type: private docker registry`
  - CoreOS Quay: `type: quay`

###3. Building Docker image

You can include the  `docker build` command in your `shippable.yml` as shown below:

```
build:
  ci:
    - docker build -t myImageRepo/myImageName:$BRANCH.BUILD_NUMBER .

```

Please note that the `docker build` command can be in the `ci` or `post_ci` sections. Also, `myImageRepo` is the **fully qualified repository name**, depending on the Docker registry.

If your Dockerfile is not at the root, but is in the `base_image` folder for example, your snippet would look like this:

```
build:
  ci:
    - docker build -t myImageRepo/myImageName:$BRANCH.BUILD_NUMBER ./base_image

```

If you want to then push your image to a Docker registry, read our docs on [Pushing artifacts](/ci/push-artifacts/)

## Advanced config

### Building different images based on branch

You can build different Docker images for different branches even authenticate against different Docker registry accounts to push them to different orgs. The config is as shown below:


```
build:
  post_ci:
    - if [ "$BRANCH" == "master" ]; then docker build -t docker-hub-org-1/image-name:image-tag .; fi
    - if [ "$BRANCH" == "dev" ]; then docker build -t docker-hub-org-2/image-name:image-tag .; fi

integrations:                               
  hub:
    - integrationName: master-DockerHub    #replace with your integration name   
      type: docker                #replace with your registry type   
      branches:                   # use this integration only for master branch
        only:
          - master

    - integrationName: dev-DockerHub    #replace with your integration name   
      type: docker                 #replace with your registry type   
      branches:                   # use this integration only for dev branch
        only:
          - dev

```

###Building Docker images with multiple tags

If you want to build images with multiple tags, you can do so as shown below:

```
build:
  post_ci:
    - docker build -t docker-hub-org/image-name:image-tag-1 -t docker-hub-org/image-name:image-tag-2 .

integrations:                               
  hub:
    - integrationName: myIntegration    #replace with your integration name   
      type: docker     #replace with your registry type   

```

## Sample project

Here are some links to a working sample of this scenario. This is a simple Node.js application that runs some tests and builds a Docker image.

**Source code:**  [devops-recipes/ci-push-docker-hub](https://github.com/devops-recipes/ci-push-docker-hub).


## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
