page_main_title: Specifying the version to deploy.
main_section: Deploy
sub_section: Deploy to Container Orchestration Platforms
sub_sub_section: Advanced topics

# Specifying input version to deploy

By default, the `deploy` job always deploys the latest version of the input manifest.

In some scenarios (e.g. rollback), you might want to deploy a specific image version/tag or a specific manifest version to an environment. This is called 'version pinning'. This document describes two ways you can pin the version of an input manifest when running the `deploy` job.

## Topics Covered

* Pinning using YAML config
* Pinning using Shippable UI.

## Instructions

### Pinning using YAML config

There are two ways to achieve pinning in your `shippable.jobs.yml`.

####**Pinning an input image for a manifest job**

This method is especially useful in a mult-container manifest where you want to test changes to one image against pinned versions of other images. For example, in the snippet below, we keep the `app_image` version at `master.12` while allowing latest versions of `app_image_2`.

For the input [image](/platform/workflow/resource/image) resource, add a `versionName` tag and set it to the image tag you want to deploy:

```
jobs:
  - name: app_service_def
    type: manifest
    steps:
     - IN: app_image
       versionName: "master.12"         # this pins master.12 image version
     - IN: app_image_2  
     - IN: app_options
     - IN: app_environment

```

Please be aware that while a specific image tag is pinned in the manifest job, any new tags for that image will not create new manifest versions.


####**Pinning an input manifest for a deploy job**

You can also pin a [manifest](/platform/workflow/job/manifest) version in your `deploy` job. The snippet below shows how this code will look for our [Single container application](/deploy/cd_of_single_container_applications_to_orchestration_platforms):

```
jobs:
  - name: app_deploy_job
    type: deploy
    steps:
      - IN: app_service_def
        versionNumber: "2"              # this pins manifest version 2
      - IN: op_cluster
      - IN: app_replicas
```

This will always deploy version 2 of the input manifest. If you want to figure out which manifest version has the config you want to deploy, you can dig down into the [manifest job to identify the version](/platform/tutorial/workflow/crud-job/#viewing-job-information).

### Pinning resource versions using the Shippable UI.

In the Shippable UI, you can see the specific versions of an input resource that is being deployed by a job. By default, the latest versions of all input resources are deployed by a job.

However, a job can be configured to use a specific version of any of any of its inputs. Pinning an input to a specific version will always deploy that version, but other inputs will continue to be deployed with the latest version as long as they are not gated.

####**Pinning an input image for a manifest job**

**Steps**

1. Click on your image resource in the [Subscription dashboard](/platform/visibility/subscription/dashboard/) and note the version of the docker image you want to pin.

2. Click on your manifest job in the [Subscription dashboard](/platform/visibility/subscription/dashboard/) and click on the wrench icon.

3. Click on the drop down for your image resource in the `Input` table and select the right version.

4. Rerun the manifest job by clicking on the job name in the bread crumbs on the top and thereafter on the build button.

Please remember that all future runs of the manifest job will build this version of the image resource since it is now pinned. When you decide to deploy the latest version of the image resource, you can go back to the manifest job configuration page and unpin the image resource by setting the `Version` to `Latest version` so that all future runs build the latest version available.

####**Pinning an input manifest for a deploy job**

**Steps**

1. Click on your manifest job in the [Subscription dashboard](/platform/visibility/subscription/dashboard/) and note the version of the job you want to pin.

2. Click on your deploy job in the [Subscription dashboard](/platform/visibility/subscription/dashboard/) and click on the wrench icon.

3. Click on the drop down for the manifest job in the `Input` table, and select the right version.

4. Rerun the deploy job by clicking on the job name in the bread crumbs on the top and thereafter on the build button.

Please remember that all future runs of the deploy job will deploy this version of manifest since it is now pinned. When you decide to deploy the latest version of the manifest job, you can go back to the deploy job configuration page and unpin the manifest job by setting the `Version` to `Latest version`  so that all future runs deploy the latest release available.


## Ask questions on Chat

Feel free to engage us on Chat if you have any questions about this document. Simply click on the Chat icon on the bottom right corner of this page and someone from our customer success team will get in touch with you.

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
