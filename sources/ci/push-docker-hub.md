main_section: CI
sub_section: Pushing artifacts

#Pushing a Docker image to Docker Hub

You can push your image to Docker Hub in any section [of your yml](../reference/ci-yml/). Typically, you would want to push your image at the end of the `ci` section, or in the `post_ci` or `push` sections.

##Basic config

1. Add an integration for Docker Hub. This is where your credentials are stored, so you do not have tp store them in the yml.
  - Go to your **Account Settings** by clicking on the gear icon in the top navigation bar.
  - Click on **Integrations** in the left sidebar menu and then click on **Add integration**
  - Locate **Docker** in the list and click on **Create Integration**
  - Name your integration and enter your Docker Hub username, password, and the email with which you registered there.
  - Choose the Subscription which contains the repository for which you want to push the image
  - Click **Save**

  <img src="../../images/ci/docker-hub-integration.png" alt="Add Docker Hub credentials">


2. Next, add the following to the `shippable.yml` for your project:

```
integrations:                               
  hub:
    - integrationName: myIntegration    #replace with your integration name   
      type: docker                        
```

3. Push to Docker hub in your `shippable.yml` file:

```
build:
  post_ci:
    - docker push docker-hub-org/image-name:image-tag
```

You can replace your docker-hub-org, image-name, and image-tag as required in the snippet above.

## Advanced config
### Limiting branches

By default, your integration is valid for all branches. If you want to only push your image for specific branch(es), you can do so with the `branches` keyword.

```
build:
  post_ci:
    - if [ "$BRANCH" == "master" ]; then docker push docker-hub-org/image-name:image-tag; fi

integrations:                               
  hub:
    - integrationName: myIntegration    #replace with your integration name   
      type: docker    
      branches:
        only:
          - master

```
In addition to the `only` tag which includes specific branches, you can also use the `except` tag to exclude specific branches.

---
### Pushing to different accounts based on branch

You can also choose to push your images to different Docker Hub accounts, depending on branch.

```
build:
  post_ci:
    - if [ "$BRANCH" == "master" ]; then docker push docker-hub-org-1/image-name:image-tag; fi
    - if [ "$BRANCH" == "dev" ]; then docker push docker-hub-org-2/image-name:image-tag; fi

integrations:                               
  hub:
    - integrationName: master-DockerHub    #replace with your integration name   
      type: docker    
      branches:
        only:
          - master

    - integrationName: dev-DockerHub    #replace with your integration name   
      type: docker    
      branches:
        only:
          - dev

```

---
###Pushing the CI container with all artifacts intact

If you are pushing your CI container to Docker Hub and you want all build artifacts preserved, you should commit the container before pushing it as shown below:

```
build:
  post_ci:
    #Commit the container only if you want all the artifacts from the CI step
    - docker commit $SHIPPABLE_CONTAINER_NAME docker-hub-org/image-name:image-tag
    - docker push docker-hub-org/image-name:image-tag

integrations:                               
  hub:
    - integrationName: myIntegration    #replace with your integration name   
      type: docker              
```

The environment variable `$SHIPPABLE_CONTAINER_NAME` contains the name of your CI container.

---
###Pushing Docker images with multiple tags

If you want to push the container image with multiple tags, you can just push twice as shown below:


```
build:
  post_ci:
    - docker push docker-hub-org/image-name:image-tag-1
    - docker push docker-hub-org/image-name:image-tag-2

integrations:                               
  hub:
    - integrationName: myIntegration    #replace with your integration name   
      type: docker

```
---
## Sample project

Here are some links to a working sample of this scenario.

**Source code:**  [devops-recipes/push-docker-hub](https://github.com/devops-recipes/push-docker-hub).

**Build link:** [CI build on Shippable](https://app.shippable.com/github/devops-recipes/push-docker-hub/runs/1/1/console)

**Docker Hub image pushed:** [devopsrecipes/push-docker-hub](https://hub.docker.com/r/devopsrecipes/push-docker-hub/)

**Build status badge:** [![Run Status](https://api.shippable.com/projects/58f002c7c585000700aef8ca/badge?branch=master)](https://app.shippable.com/github/devops-recipes/push-docker-hub)

---
## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
