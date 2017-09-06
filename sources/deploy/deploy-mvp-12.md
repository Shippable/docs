page_main_title: Pinning specific versions of images to deploy to a container orchestration service.
main_section: Deploy
sub_section: How To

# Pinning specific versions of images to deploy to a container orchestration service.

By default, Shippable deploys the most recent or latest version of the image. However, you might want to 'pin' a specific version of an image for some reason. Image versions are pinned by specifying the specific image tag. In addition, image versions can be pinned either though the yml configuration or in the UI.

We will use the single container application deployment usecase defined [here](/deploy/deploy-mvp-1) and demonstrate image pinning.

##1. Building blocks
**Jobs**
- [manifest](/platform/workflow/job/manifest/) which creates a versioned, immutable service definition of a deployable unit for your application.

##2. Pinning resource versions in shippable.jobs.yml.
You can pin a specific image tag, for example `1.12.0` with the yml below:

```
jobs:

- name: deploy_manifest
  type: manifest
  steps:
   - IN: deploy_image
    versionName: "1.12.0"
   - IN: docker_options_image
```

##3. Pinning resource versions using the UI.

* Identify the `versionName` of the image you want to pin the deployment to. To do this, go to the SPOG page and click on the deploy job. Find the correct previous deploy version in the versions listed above the console logs.  Then click on "trace" to see which image version was in that deploy.  Write down the `versionName` for the image resource.

 <img src="/images/deploy/rollbackDeployTrace.png" alt="Shippable Continuous Integration and Delivery" style="width:1000px;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

* Right click on the `deploy` job in the [SPOG](/platform/visibility/single-pane-of-glass-spog/) view and click `Configure Job`.
Find and set the desired `versionName` for the image resource.

Alternatively, you can navigate to the configuration page for the `deploy` job. From the "trace" view, click the job name in the breadcrumb at the top of the page, and then the "configure job" wrench in the top right. Find and set the desired `versionName` for the image resource.

* Re-run the deploy job by going to the Single Pane of Glass (SPOG) view, right clicking on the job, and clicking on `Run`

Please remember that all future runs of the deploy job will deploy the same version since it is now pinned. When you decide to deploy the latest release, you can go back to the deploy job configuration page and unpin the release input so that all future runs deploy the latest release available.

## Improve this page
We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
