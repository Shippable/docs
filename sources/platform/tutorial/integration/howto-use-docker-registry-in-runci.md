page_main_title: Using a Docker Registry Integration in CI
main_section: Platform
sub_section: Tutorials
sub_sub_section: Integrations
page_title: Using a Docker Registry Integration in CI
page_description: How to use a key-value pair integration in CI


###Configure Docker Registry integration in the **shippable.yml**
To enable Docker Registry integration for your project, add the following to the **shippable.yml** file for that project.
```
pre_ci_boot:
    image_name: deepikasl/myImage
    image_tag: latest
    pull: true
    options: "-e HOME=/root"

integrations:
  hub:
    - integrationName: my_docker_registry
      type: "dockerRegistryLogin"
      branches:
        only:
          - master
          - dev
```
While the above is a sample code for your **shippable.yml**, use the descriptions of each field below to modify the `yml` and tailor it to your requirements.

- `image_name:` value is in the format docker-registry-username/docker-registry-image-repo.
- `image_tag:` value is the tag for the image that you want to pull.
- `pull:` set to `true` to pull the image from the specified Image Registry.
- In the `options` tag, enter any docker options you want to use in the docker run command. You also need to include the HOME environment variable as shown if it is not already set in your image.
- `integrationName` value is the name of the Docker Registry integration you added to the 'Subscription' settings. It is important the name matches exactly. If not, the build will fail with an error. Moreover, this account should have permissions to pull the the build image specified in the `image_name` setting.
- `type` is `"dockerRegistryLogin"`.
- [optional] `branches` section: specify the branches this integration is applicable to. You can skip this if you want your integration to be applicable for all branches.. The `only` tag should be used when you want the integration on specific branches. You can also use the `except` tag to exclude specific branches.


##Build a Docker image which has a `FROM` that pulls an image from Docker Registry

If you want to build your Docker image as part of your workflow for each CI run and if your 'Dockerfile' has a `FROM` which pulls a private image from Docker Registry, then you will need to do the following steps:

1. Ensure your Subscription has access to the Docker Registry integration
2. Configure your **shippable.yml** to associate the Docker Registry integration for your project and add few options to ensure you are building the Docker image as part of CI.

###Ensure your Subscription has access to the Docker Registry integration
To ensure your Subscription has access to the Docker Registry integration, do the following:

1. Log in to [Shippable](https://app.shippable.com).
2. Select your Subscription from the left sidebar menu.
3. Click the 'gears' icon and then on 'Integrations'.
4. If you find your integration in the list, you're good to go to the next step. If not, add the account integration to the Subscription by clicking on the `+` button and completing the required fields.

###Configure Docker Registry integration in the **shippable.yml**

Add the following to your **shippable.yml** file:

```
build:
  pre_ci:
    - docker build -t myImage:tip .

  pre_ci_boot:
    image_name: myImage
    image_tag: tip
    pull: false
    options: "-e HOME=/root"

integrations:
  hub:
    - integrationName: my_docker_registry
      type: "dockerRegistryLogin"
      branches:
        only:
          - master
          - dev
```

- `image_name` value is the name of the image that was built in the `pre_ci` step.
- `image_tag` is the tag for the image that was built in the `pre_ci` step.
- set `pull` to `false` if you want to use the image you built during the pre_ci step instead of pulling from a docker registry.
- In the env section, you can enter any environment variables you want to be set inside your CI container.
- In the options tag, enter any docker options you want to use in the docker run command. You also need to include the HOME environment variable as shown if it is not already set in your 'Dockerfile'.
- `integrationName` value is the name of the Docker Registry integration you added to the 'Subscription' settings. It is important the name matches exactly. If not, the build will fail with an error. Moreover, this account should have permissions to pull the the build image specified in the `image_name` setting.
- `type` is `"dockerRegistryLogin"`.
- [optional] `branches` section: specify the branches this integration is applicable to. You can skip this if you want your integration to be applicable for all branches.. The `only` tag should be used when you want the integration on specific branches. You can also use the `except` tag to exclude specific branches.

##Push an image to Docker Registry

You can push your image to Docker Registry in the `post_ci` or `push` sections of the **shippable.yml**. The main difference is that the `post_ci` section runs inside the build container and the `push` section runs outside the build container in the Shippable Agent.

To push an image to Docker Registry, do the following:

1. Ensure your Subscription has access to the Docker Registry integration
2. Configure your **shippable.yml** to associate the Docker Registry integration for your project and add few options to ensure you are pushing the Docker image in `post_ci` section or in the `push` section.

###Ensure your Subscription has access to the Docker Registry integration
To ensure your Subscription has access to the Docker Registry integration, do the following:

1. Log in to [Shippable](https://app.shippable.com).
2. Select your Subscription from the left sidebar menu.
3. Click the 'gears' icon and then on 'Integrations'.
4. If you find your integration in the list, you're good to go to the next step. If not, add the account integration to the Subscription by clicking on the `+` button and completing the required fields.

###Configure Docker Registry integration in the **shippable.yml**

To push the Docker image to Docker Registry in the `post_ci` section, add the following to your **shippable.yml** file:

```
build:
  post_ci:
    #Commit the container only if you want all the artifacts from the CI step
    - docker commit $SHIPPABLE_CONTAINER_NAME deepikasl/sample-node:tag
    - docker push deepikasl/sample-node:tag

integrations:
  hub:
    - integrationName: my_docker_registry
      type: "dockerRegistryLoginy"
      branches:
        only:
          - master
```

Similarly to push the Docker image to Docker Registry in the `push` section, add the following to your **shippable.yml** file:

```
build:
  post_ci:

  push:
    docker push deepikasl/sample-node:tag

integrations:
  hub:
    - integrationName: my_docker_registry
      type: "dockerRegistryLogin"
      branches:
        only:
          - master
```


- `integrationName` value is the name of the Docker Registry integration you added to the 'Subscription' settings. It is important the name matches exactly. If not, the build will fail with an error. Moreover, this account should have permissions to pull the the build image specified in the `image_name` setting.
- `type` is `"dockerRegistryLogin"`.
- [optional] `branches` section: specify the branches this integration is applicable to. You can skip this if you want your integration to be applicable for all branches.. The `only` tag should be used when you want the integration on specific branches. You can also use the `except` tag to exclude specific branches.
