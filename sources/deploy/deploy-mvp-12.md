page_main_title: Specifying the version to deploy.
main_section: Deploy
sub_section: How To

# Specifying the version to deploy.

By default, Shippable platform deploys the most recent or latest version of the image. However, you might want to deploy a specific image version/tag to some environment. This document describes two ways you can pin the version of the image.

## Assumptions

We will use the [Single container application](/deploy/cd_of_single_container_applications_to_orchestration_platforms) as a starting point and demonstrate how to configure it to deploy specific versions of the image.

## Topics Covered

* Specifying the version of the image to deploy in Shippable configuration files.
* Specifying the version of the image to deploy using Shippable UI.

## Step by Step instructions

### Pinning resource versions in shippable.jobs.yml.

* Update `app_service_def`, the [manifest](/platform/workflow/job/manifest) job used to create a service definition of your application .
* A `versionName` attribute is specified for the image resource to set the specific version of the image to be deployed.
* Yml block:


```
jobs:

- name: app_service_def
  type: manifest
  steps:
   - IN: app_image
     versionName: "master.12"
   - IN: app_options
   - IN: app_environment
jobs:
```

### Pinning resource versions using the Shippable UI.

* Identify the `versionName` of the image you want to pin the deployment to. To do this, go to the SPOG page and click on the deploy job. Find the correct previous deploy version in the versions listed above the console logs.  Then click on "trace" to see which image version was in that deploy.  Write down the `versionName` for the image resource.

 <img src="/images/deploy/rollbackDeployTrace.png" alt="Shippable Continuous Integration and Delivery" style="width:1000px;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

* Right click on the `deploy` job in the [SPOG](/platform/visibility/single-pane-of-glass-spog/) view and click `Configure Job`. Find and set the desired `versionName` for the image resource.

Alternatively, you can navigate to the configuration page for the `deploy` job. From the "trace" view, click the job name in the breadcrumb at the top of the page, and then the "configure job" wrench in the top right. Find and set the desired `versionName` for the image resource.

* Re-run the deploy job by going to the Single Pane of Glass (SPOG) view, right clicking on the job, and clicking on `Run`

Please remember that all future runs of the deploy job will deploy the same version since it is now pinned. When you decide to deploy the latest release, you can go back to the deploy job configuration page and unpin the release input so that all future runs deploy the latest release available.

## Ask questions on Chat

Feel free to engage us on Chat if you have any questions about this document. Simply click on the Chat icon on the bottom right corner of this page and someone from our customer success team will get in touch with you.

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
