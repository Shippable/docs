page_main_title: Private registry
main_section: Platform
sub_section: Integrations
page_title: Private registry integration

# Private registry integration
The Private registry integration is required in order to pull or push images from a private Image registry.

This page explains how you can add a Private registry integration to your
account by providing the credentials and URL to access your Private registry.

##Adding your Private registry integration

- Click on Integrations in the left sidebar menu followed by the '+' icon in the **Account Integrations** panel.

<img width="75%" height="75%" src="../../images/platform/integrations/account-settings.png" alt="Add ECR credentials">

-  Select **hub** as the Integration family.
-  Choose **Private registry** from the list of integration types.
-  You need to generate an API token for your Private registry account to use with shippable.
-  Name your integration.
-  Enter the URL of your private registry and your credentials.
-  Choose the Subscription which contains the repository for which you want to deploy the containers.
-  Click **Save**

<img src="../../images/platform/integrations/private-registry-integration.png" alt="Add Private registry credentials">

##Pull an image from a Private Docker Registry
You can pull any image you have access to, from Private Docker Registry and use that to spin up your CI build container.

To pull an image, you'll need to do the following:

1. Ensure your subscription has access to the Private Docker Registry integration.
2. Configure your `shippable.yml` to associate the Private Docker Registry integration for your project.

###Ensure your Subscription has access to the Private Docker Registry integration
To ensure your Subscription has access to the Private Docker Registry integration, do the following:

1. Log in to [Shippable](https://app.shippable.com).
2. Select your Subscription from the left sidebar menu.
3. Click the 'gears' icon and then on 'Integrations'.
4. If you find your integration in the list, you're good to go to the next step. If not, add the account integration to the Subscription by clicking on the `+` button and completing the required fields.

###Configure Private Docker Registry integration in the `shippable.yml`
To enable Private Docker Registry integration for your project, add the following to the `shippable.yml` file for that project.
```
pre_ci_boot:
    image_name: manishas/myImage
    image_tag: latest
    pull: true
    options: "-e HOME=/root"

integrations:
  hub:
    - integrationName: my_private_registry
      type: "private docker registry"
      branches:
        only:
          - master
          - dev
```
While the above is a sample code for your `shippable.yml`, use the descriptions of each field below to modify the `yml` and tailor it to your requirements.

- `image_name:` value is in the format docker-registry-username/docker-registry-image-repo.
- `image_tag:` value is the tag for the image that you want to pull.
- `pull:` set to `true` to pull the image from the specified Image Registry.
- In the `options` tag, enter any docker options you want to use in the docker run command. You also need to include the HOME environment variable as shown if it is not already set in your image.
- `integrationName` value is the name of the Private Docker Registry integration you added to the 'Subscription' settings. It is important the name matches exactly. If not, the build will fail with an error. Moreover, this account should have permissions to pull the the build image specified in the `image_name` setting.
- `type` is `"private docker registry"`.
- [optional] `branches` section: specify the branches this integration is applicable to. You can skip this if you want your integration to be applicable for all branches.. The `only` tag should be used when you want the integration on specific branches. You can also use the `except` tag to exclude specific branches.


##Build a Docker image which has a `FROM` that pulls an image from Private Docker Registry

If you want to build your Docker image as part of your workflow for each CI run and if your 'Dockerfile' has a `FROM` which pulls a private image from Private Docker Registry, then you will need to do the following steps:

1. Ensure your Subscription has access to the Private Docker Registry integration
2. Configure your `shippable.yml` to associate the Private Docker Registry integration for your project and add few options to ensure you are building the Docker image as part of CI.

###Ensure your Subscription has access to the Private Docker Registry integration
To ensure your Subscription has access to the Private Docker Registry integration, do the following:

1. Log in to [Shippable](https://app.shippable.com).
2. Select your Subscription from the left sidebar menu.
3. Click the 'gears' icon and then on 'Integrations'.
4. If you find your integration in the list, you're good to go to the next step. If not, add the account integration to the Subscription by clicking on the `+` button and completing the required fields.

###Configure Private Docker Registry integration in the `shippable.yml`

Add the following to your `shippable.yml` file:

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
    - integrationName: my_private_registry
      type: "private docker registry"
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
- `integrationName` value is the name of the Private Docker Registry integration you added to the 'Subscription' settings. It is important the name matches exactly. If not, the build will fail with an error. Moreover, this account should have permissions to pull the the build image specified in the `image_name` setting.
- `type` is `"private docker registry"`.
- [optional] `branches` section: specify the branches this integration is applicable to. You can skip this if you want your integration to be applicable for all branches.. The `only` tag should be used when you want the integration on specific branches. You can also use the `except` tag to exclude specific branches.

##Push an image to Private Docker Registry

You can push your image to Private Docker Registry in the `post_ci` or `push` sections of the `shippable.yml`. The main difference is that the `post_ci` section runs inside the build container and the `push` section runs outside the build container in the Shippable Agent.

To push an image to Private Docker Registry, do the following:

1. Ensure your Subscription has access to the Private Docker Registry integration
2. Configure your `shippable.yml` to associate the Private Docker Registry integration for your project and add few options to ensure you are pushing the Docker image in `post_ci` section or in the `push` section.

###Ensure your Subscription has access to the Private Docker Registry integration
To ensure your Subscription has access to the Private Docker Registry integration, do the following:

1. Log in to [Shippable](https://app.shippable.com).
2. Select your Subscription from the left sidebar menu.
3. Click the 'gears' icon and then on 'Integrations'.
4. If you find your integration in the list, you're good to go to the next step. If not, add the account integration to the Subscription by clicking on the `+` button and completing the required fields.

###Configure Private Docker Registry integration in the `shippable.yml`

To push the Docker image to Private Docker Registry in the `post_ci` section, add the following to your `shippable.yml` file:

```
build:
  post_ci:
    #Commit the container only if you want all the artifacts from the CI step
    - docker commit $SHIPPABLE_CONTAINER_NAME manishas/sample-node:tag
    - docker push manishas/sample-node:tag

integrations:
  hub:
    - integrationName: my_private_registry
      type: "private docker registry"
      branches:
        only:
          - master
```

Similarly to push the Docker image to Private Docker Registry in the `push` section, add the following to your `shippable.yml` file:

```
build:
  post_ci:

  push:
    docker push manishas/sample-node:tag

integrations:
  hub:
    - integrationName: my_private_registry
      type: "private docker registry"
      branches:
        only:
          - master
```


- `integrationName` value is the name of the Private Docker Registry integration you added to the 'Subscription' settings. It is important the name matches exactly. If not, the build will fail with an error. Moreover, this account should have permissions to pull the the build image specified in the `image_name` setting.
- `type` is `"private docker registry"`.
- [optional] `branches` section: specify the branches this integration is applicable to. You can skip this if you want your integration to be applicable for all branches.. The `only` tag should be used when you want the integration on specific branches. You can also use the `except` tag to exclude specific branches.

##Editing your Private registry integration

Click on **Integrations** in the left sidebar menu and then click on your integration. You can then change integration name, URL and credentials.

##Deleting your Private registry integration

If you no longer need the integration, you can delete it by following the steps below.

- Click on **Integrations** in the left sidebar menu, and click on your integration.
- Scroll to the bottom of the page and click on the **Delete** button.
- If there are no Subscriptions using this integration, you will be able to delete it by clicking on **Yes**. You are done at this point.

<img width="50%" height="50%" src="../../images/platform/integrations/confirm-delete-integration.png" alt="Delete integration confirmation screen">

- If your integration is being used by any Subscriptions, you will see a message telling you which Subscriptions are still using the integration.

<img width="50%" height="50%" src="../../images/platform/integrations/cannot-delete-integration.png" alt="Cannot delete integration because of dependencies">

- Go to each Subscription listed in the dependencies and delete it from each.
    - Locate your subscription in the left sidebar menu and click on the dependent Subscription.

    <img width="30%" height="30%" src="/images/platform/integrations/list-subscriptions.png" alt="List subscriptions">

    - Click on the **gears** icon and then on **Integrations**.
    - Click on the integration and the **Delete** button.
    - Delete the integration.
- Once you have deleted the integration from all Subscriptions, you can go back to your integration and delete the integration.
