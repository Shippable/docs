page_main_title: Choosing a build image
main_section: CI
sub_section: Preparing your environment

# Choosing a build image

When a build is triggered on Shippable, we spin up a machine on AWS using the Machine Image for your Subscription, start a Docker container on this machine, and run your CI commands inside that container. The workflow is described in the [CI overview](/ci/why-continuous-integration/#ci-workflow).

The AMI used to spin up the AWS machine is called the **Machine Image**.

Each Machine Image contains Shippable Official Docker Images for all languages. By default, a Shippable Official Docker Image is used for your CI job, depending on the `language` tag in your `shippable.yml`. In most cases, this is sufficient to run your builds. You can view our [complete list of Machine Images](/platform/runtime/machine-image/ami-overview/), and click on any image to view what is installed on the image, including a detailed description of the Shippable Official Docker Image for each language.

To view the current Machine Image for your Subscription or to change it, read the [Manage machine image section](#manage-machine-image) below.

You have two other options for customizing the build image:

* [Customizing options](#customize-build-container) for the default language image, such as mounting a volume or restricting CPU/memory
* [Using a custom Docker image](#use-custom-image) for your build

<a name="manage-machine-image"></a>
## Managing your Subscription's Machine Image

Machine images are released every month, and supported for 13 months after they are first released. By default, Machine image for your subscription is usually the latest available image when the first project was enabled for CI.

You should periodically upgrade to the latest image in order to get access to newer versions of languages and services. We recommend upgrading at least once every 3-6 months to stay current, even if you do not specifically need anything in the new image.


### Viewing your Machine Image

You can view which Machine Image is used for your Subscription by following the steps below:

- From your Dashboard, click on Subscriptions in the left sidebar menu and click on your Subscription name.
<img width="30%" height="30%" src="/images/platform/integrations/list-subscriptions.png" alt="List subscriptions">

- Click on the **Gear icon** on the Subscription page and then on **Nodes**.

- You will see your current machine image in the **Machine images** section.

<img src="/images/ci/view-machine-image.png" alt="view machine image">

- For a detailed list of what is installed on your image, you can consult our reference: [Machine images reference](/platform/runtime/machine-image/ami-overview/)

### Changing Machine Image

You should consider upgrading to a newer machine image for the following reasons:

- You need newer versions of languages, services, or tools that are available in a newer image tag, or
- Your Machine image is more than 6 months old

To change to a newer image, follow the steps below:

- Follow the instructions in the section above to view custom image
- Select the image version you want from the dropdown for **Machine images**:

<img src="/images/ci/view-machine-image.png" alt="change machine image">

- Please note that once you change the tag, **all builds for all projects in the subscription will use the new image versions.**

<a name="customize-build-container"></a>
## Customizing the build container

Shippable uses the `docker run` command to spin up your build container. By default, here is how we start the container:

```
sudo docker run -d --privileged=true --net=bridge -v <volumes> --entrypoint=/home/shippable/cexec/build.sh -e <env variables> imageName:tag
```

You can customize this by specifying the options you want in the `pre_ci_boot` section of your `shippable.yml`. For a complete list of options that can be specified for `docker run`, please consult the [Docker reference document](https://docs.docker.com/engine/reference/run/#runtime-constraints-on-resources).

**Please remember that if you customize options in the `pre_ci_boot` section, we will not set the `--privileged=true --net=bridge` options while calling the docker run command. If you want to run your container in privileged mode or to create a network stack on the default Docker bridge, you will need to specify this in `pre_ci_boot` if you need them.**

### Mounting volumes

You can mount any number of folders from the host on your container with the following sample config:

```
build:
  pre_ci_boot:
    options: "-v /tmp/shared:/tmp/shared -v /tmp/myFolder:/tmp/myFolder"
```

This will mount `/tmp/shared` and `/tmp/myFolder` from the host to your CI container. Please note that the folder(s) you mount need to be available on the host, so you need to create them or copy them to the host in the `pre_ci` section.

### Restricting container resources

For some scenarios, you might want to run a container with restricted memory, CPU, etc. This can be done by configuring the `pre_ci_boot` section:

```
build:
  pre_ci_boot:
    options: "-m 300M"
```

The config shown above will restrict memory to 300MB. For a complete list of everything you can restrict, please consult the Docker documentation on [Setting runtime constraints on resources](https://docs.docker.com/engine/reference/run/#runtime-constraints-on-resources).

<a name="use-custom-image"></a>
##Using a custom Docker image for your build

In most cases, your CI workflow should work fine with our official images. However, you might want to consider using a custom Docker image in the following situations:

- Your build has dependencies that take a long time to install if installed as part of your CI workflow.
- You want to build a project written in a language not officially supported by Shippable.
- You are using a combination of languages and tools not supported together in any official images.
- You want to run CI in your own Docker image to better simulate your production environment.

Check our our docs on [Using a custom image for CI](custom-docker-image/) for more information.
