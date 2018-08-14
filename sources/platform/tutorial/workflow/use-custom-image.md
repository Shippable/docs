page_main_title: Using custom images with runSh jobs
main_section: Platform
sub_section: Tutorials
sub_sub_section: Workflow

# Using custom Docker images for your jobs

By default, your jobs run inside a Docker container from [a library maintained by the Shippable team](/platform/runtime/machine-image/ami-overview/). We choose an appropriate build image based on your configuration.

However, you might want better control over your build images and what is installed on them. This can speed up your builds since you can pre-install dependencies into the image. You can also maintain consistency between development, CI, and your production environments by using your own custom images.

Shippable provides the ability to use custom images for CI jobs (i.e. `runCI`) and `runSh` jobs.

## Minimum requirements

We officially support custom images built on Ubuntu 14.04, Ubuntu 16.04, CentOS7, RHEL 7, and Windows Server 2016. However, many customers have successfully used custom images that are built on unsupported platforms, as long as they satisfy minimum requirements mentioned below.

If your custom Docker image has **apt-get** pre-installed, we will install any additional packages required at runtime.

If your image does not have **apt-get** and you do not want it on your image for some reason, you should install the following packages:

* git
* ssh-agent or openssh
* sudo
* python 2.7
* jq 1.5

We want to do our best to support your custom image, so please [open a support issue](https://github.com/Shippable/support/issues) if you're seeing errors while using your image with Shippable.

## Using a custom image for CI

Please reference our CI tutorial on [using a custom image](/ci/custom-docker-image) for step by step instructions.

## Using a custom image in runSh

Each of the `TASK` sections in a [`runSh` job](/platform/workflow/job/runsh) can be executed in a separate build container. By default, we will use the most appropriate image based on the platform (Ubuntu/CentOS/Windows) you're running the job on.

If you want to use your own custom image, you can do one of three things:

- Pull a public image and spin up a container to run your `TASK` script commands
- Pull a private image and spin up a container to run your `TASK` script commands
- Build an image from Dockerfile and use it to spin up a container to run `TASK` script commands

Let us look at each of these scenarios in greater detail.

### Pulling a public image

* To pull a public custom image, simply update your runSh job with the image information in the `runtime` section as shown below:

```
jobs:
  - name: use_custom_image
    type: runSh
    steps:
      - TASK:
          name: need_to_use_custom_container
          runtime:
            options:
              imageName: devopsrecipes/build_alpine_ci    # Replace with your image
              imageTag: 654253                            # Replace with your image tag  
              pull: true                                  # Set to true so it will be pulled
              options: --dns=4.4.4.4 --dns=8.8.8.8        # This is optional
          script:
            - echo "Checking runtime values"              # These commands will run in the container
            - sudo docker info
```

* Commit the changes above to **shippable.yml**. This will automatically update your existing workflow. If this is a brand new workflow, you can add your config to Shippable by following [instructions here](/platform/tutorial/workflow/add-assembly-line).


### Pulling a private image

If you want to pull a private custom image, you will need to do a little extra work since we will need your credentials to pull the image.

* Create an integration for the Docker registry where your private image is stored. Instructions to add an integration are [here](/platform/tutorial/integration/subscription-integrations/#create-sub-integration). For help with completing integration input fields for a specific provider, refer to the relevant document below:
    * [Docker Hub, Private/Trusted Registry](/platform/integration/dockerRegistryLogin)
    * [AWS ECR](/platform/integration/aws-keys)
    * [GCR](/platform/integration/gcloudKey)
    * [Quay](/platform/integration/quayLogin)    

While creating the integration, please ensure that you set scopes to include the project(s) that contains your **shippable.yml** config.

* Add a `cliConfig` resource with your Docker registry credentials to **shippable.yml**.

```
resources:
  - name: myDockerHubCLI
    type: cliConfig
    integration: myDockerHub
```

In our example, we are using a Docker Hub integration. For ECR or GCR, please reference the [cliConfig](/platform/workflow/resource/cliconfig) page for the exact config.

* Update the `runSh` job:

```
jobs:
  - name: use_custom_image
    type: runSh
    steps:
      - IN: myDockerHubCLI    # Configuring this as IN automatically logs you into your Docker registry
      - TASK:
          name: pull_custom_image
          script:
            - sudo docker pull devopsrecipes/build_alpine_ci:654253
      - TASK:
          name: need_to_use_custom_container
          runtime:
            options:
              imageName: devopsrecipes/build_alpine_ci    # Your image
              imageTag: 654253                            # Your image tag  
              pull: false                                 # We already pulled image
              options: --dns=4.4.4.4 --dns=8.8.8.8        # This is optional
          script:
            - echo "Checking runtime values"              # Commands will run in container
            - sudo docker info
```

* Commit the changes above to **shippable.yml**. This will automatically update your existing workflow. If this is a brand new workflow, you can add your config to Shippable by following [instructions here](/platform/tutorial/workflow/add-assembly-line).

### Building a custom image to use for runSh

There are two ways to do this:

- Build your custom image in a separate `runSh` job and push to a registry, and use that image for the `runSh` job for which you want to use it. You can implement this workflow by following the first 4 steps of the [Building custom image to use for CI tutorial](/ci/tutorial/build-custom-ci-image/#step-by-step-instructions), and then pull that custom image in your `runSh` job by following the steps in the relevant section (Pulling a public image/Pulling a private image) above.

- The second method is to build the Docker image and use it to spin up a container for another `TASK` within the same `runSh` job.

The steps below provide instructions on configuring the second option, i.e. building and using the Docker image within the same `runSh` job.

* In your **shippable.yml**, define a `gitRepo` resource pointing to the repository containing the Dockerfile for the image you want to build.

```
resources:
  - name: myGitrepo
    type: gitRepo
    integration: myGithub
    versionTemplate:     
      sourceName: devops-recipes/build_alpine_ci_image
      branch: master
    buildOnCommit: true
    buildOnTagPush: true
```

For a complete reference on `gitRepo` config, read the [gitRepo reference doc](/platform/workflow/resource/gitrepo).

* Update your `runSh` job with a `TASK` section that builds the image, and a subsequent `TASK` section that uses the image.

```
jobs:
  - name: use_custom_image
    type: runSh
    steps:
      - IN: myGitrepo    # Configuring this as IN automatically logs you into your Docker registry
      - TASK:
          name: build_custom_image
          script:
            - pushd $(shipctl get_resource_state "myGitrepo")
            # Build custom image. You can change image name and tag if needed
            - docker build -t=devopsrecipes/build_alpine_ci:$BUILD_NUMBER -f Dockerfile.alpine37 --pull .
            - popd
        - TASK:
            name: need_to_use_custom_container
            runtime:
              options:
                imageName: devopsrecipes/build_alpine_ci    # Your image
                imageTag: $BUILD_NUMBER                     # Your image tag  
                pull: false                                 # We already pulled image
                options: --dns=4.4.4.4 --dns=8.8.8.8        # This is optional
            script:
              - echo "Checking runtime values"              # Commands will run in container
              - sudo docker info
```

* Commit the changes above to **shippable.yml**. This will automatically update your existing workflow. If this is a brand new workflow, you can add your config to Shippable by following [instructions here](/platform/tutorial/workflow/add-assembly-line).
