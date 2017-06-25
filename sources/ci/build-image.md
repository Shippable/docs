page_main_title: Choosing a build image
main_section: CI
sub_section: Preparing your environment

# Choosing a build image

When a build is triggered on Shippable, we spin up a machine on AWS, start a Docker container on the machine using a Docker image, and run your builds inside that container.

We have an official list of Docker images that are used to spin up CI containers. New images are released every month with latest language, service, and tool versions.  Images are organized by image tags, so a new tag is released for each image every month.

If you do not specify a build image for your CI, we will use a default image tag depending on the `language` tag in your `yml` config. In most cases, this is sufficient to run your builds.

##Viewing your current default tag

You can view which images are used for your Subscription by following the steps below:

- From your Dashboard, click on Subscriptions in the left sidebar menu and click on your subscription.
<img width="30%" height="30%" src="/images/reference/integrations/list-subscriptions.png" alt="List subscriptions">

- Click on the **gear icon** on the Subscription page and then on **Nodes**.

- You will see your current machine image in the **Machine images** section.

<img src="/images/ci/view-machine-image.png" alt="view machine image">

- For a detailed list of what is installed on your image, you can consult our reference: [Machine images reference](../reference/machine-images-overview/)

##Changing your default tag

In most cases, the default images are sufficient to run your builds. You should consider overriding the default for the following reasons:

- You need newer versions of languages, services, or tools that are available in a newer image tag.
- You have your own custom Docker image that you want to use for your builds. To do this, please read our [custom docker image docs.](custom-docker-image/)

To change to a newer image tag, follow the steps below:

- From your Dashboard, click on Subscriptions in the left sidebar menu and click on your subscription.
<img width="30%" height="30%" src="/images/reference/integrations/list-subscriptions.png" alt="List subscriptions">
- Click on the **gear icon** on the Subscription page and then on **Nodes**.
- Select the image tag you want from the dropdown for **Machine images**:

<img src="/images/ci/view-machine-image.png" alt="change machine image">

- Once you change the tag, **all builds for all projects in the subscription will use the new default image tags.**

##Using a custom Docker image for your build

In most cases, your CI workflow should work fine with our official images. However, you might want to consider using a custom Docker image in the following situations:

- Your build has dependencies that take a long time to install if installed as part of your CI workflow.
- You want to build a project written in a language not officially supported by Shippable.
- You are using a combination of languages and tools not supported together in any official images.
- You want to run CI in your own Docker image to better simulate your production environment.

Check our our docs on [Using a custom image for CI](custom-docker-image/) for more information.
