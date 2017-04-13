main_section: CI
sub_section: Pushing artifacts

#Pushing a Docker image to Docker Hub

You can push your image to Docker Hub in any section [of your yml](../reference/ci-yml/). Typically, you would want to push your image at the end of the `ci` section, or in the `post_ci` or `push` sections.

##Basic config

1. Add an integration for Docker Hub. This is where your credentials are stored, so you do not have tp store them in the yml.
  - Go to your **Account Settings** by clicking on the gear icon in the top navigation bar.
  - Click on **Integrations** in the left sidebar menu and then click on **Add integration**
  - Select **Docker** from the list
  -

Next, customize the following snippet and include it in the `shippable.yml` for your project:

```
integrations:                               #required only for private images
  hub:
    - integrationName: myIntegration    
      type: docker                        
```
- `integrationName` value is the name of the Docker Hub integration you added to the 'Subscription' settings. It is important the name matches exactly. If not, the build will fail with an error as  [described here](/ci/troubleshoot/#integration-name-specified-in-yml-does-not-match). Moreover, this account should have permissions to pull the the build image specified in the `image_name` setting.
- `type` is `docker`.
- [optional] `branches` section: specify the branches this integration is applicable to. You can skip this if you want your integration to be applicable for all branches.. The `only` tag should be used when you want the integration on specific branches. You can also use the `except` tag to exclude specific branches.

* Add the following to your `shippable.yml` file:

```
build:
  post_ci:
    - docker push docker-hub-org/image-name:image-tag
```

You can replace your docker-hub-org, image-name, and image-tag as required in the snippet above. If you also want to build the image as part of your CI workflow, check out the tutorial for [building a Docker image](/tutorials/ci/hub-docker-build-image/).

## Advanced config

### Specifying branches

###

###Pushing the CI container with all artifacts intact

If you are pushing your CI container to Docker Hub and you want all build artifacts preserved, you should commit the container before pushing it as shown below:

```
build:
  post_ci:
    #Commit the container only if you want all the artifacts from the CI step
    - docker commit $SHIPPABLE_CONTAINER_NAME docker-hub-org/image-name:image-tag
    - docker push docker-hub-org/image-name:image-tag

```

The environment variable `$SHIPPABLE_CONTAINER_NAME` contains the name of your CI container.

###Pushing Docker images with multiple tags

If you want to push the container image with multiple tags, you can just push twice as shown below:


```
build:
  post_ci:
    - docker push docker-hub-org/image-name:image-tag-1
    - docker push docker-hub-org/image-name:image-tag-2

```

##Sample code
