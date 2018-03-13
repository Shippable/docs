page_main_title: Rolling back deployments
main_section: Deploy
sub_section: Deploy to Container Orchestration Platforms
sub_sub_section: Advanced topics
page_title: Rolling back your deployments
page_description: How to roll back your deployments in Shippable

# Rolling back your deployments
As much as we want our code to work perfectly, there are situations when major bugs are discovered in a release after it is already deployed to an environment. In such cases, rolling back the deployment is the best way to recover while you fix the problems.

There are three types of rollback actions as explained in the sections below.

##Rolling back to a previous deployment

* Identify the `versionName` of the image you want to pin the deployment to.

To do this, go to the subscription dashboard, search for the deploy job and click on it. Find the correct previous deploy version in the `LATEST STATUS` section and click on jobId in the `Job` column. Then click on "trace" to see which image version was in that deploy.  Write down the `versionName` for the image resource.

 <img src="/images/deploy/rollbackDeployTrace.png" alt="Shippable Continuous Integration and Delivery" style="width:1000px;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

* Right click on the `deploy` job in the [SPOG](/platform/visibility/single-pane-of-glass-spog/) view and click `Configure Job`. Find and set the desired `versionName` for the image resource.

* Re-run the deploy job by going to the Single Pane of Glass (SPOG) view, right clicking on the job, and clicking on `Run`

Please remember that all future runs of the deploy job will deploy the same version since it is now pinned. When you decide to deploy the latest release, you can go back to the deploy job configuration page and unpin the release input so that all future runs deploy the latest release available.

##Rolling back a release

<img src="/images/deploy/rollback-release.png" alt="Shippable Continuous Integration and Delivery" style="width:500px;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

In this scenario, you have a setup where the deploy job you want to rollback is preceded by a release job in your pipeline. The easiest way to roll back to a previous deployment here is:

* Identify the `versionName` of the release you want to roll back to.

To do this, go to the subscription dashboard, search for the deploy job and click on it. Find the correct previous deploy version in the `LATEST STATUS` section and click on jobId in the `Job` column. Then click on "trace" to see which release was in that deploy.  Write down the `versionName` for the release.

<img src="/images/deploy/rollbackDeployTrace.png" alt="Shippable Continuous Integration and Delivery" style="width:1000px;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

* Navigate to the configuration page for the deploy job.

From the "trace" view, click the job name in the breadcrumb at the top of the page, and then the "configure job" wrench in the top right. Find and select the desired `versionName` for the release version. This will pin the release input so that future deployments will use this version. Alternatively, `versionName` or `versionNumber` may be [pinned in shippable.yml](/platform/tutorial/workflow/crud-job/#pinning-specific-resource-versions).

* Re-run the deploy job by going to the [SPOG](/platform/visibility/single-pane-of-glass-spog/) view, right clicking on the job, and clicking on `Run`

Your deployment should roll back to the desired release. However, please remember that all future runs of the deploy job will deploy the same release since it is now pinned. When you decide to deploy the latest release, you can go back to the deploy job configuration page and unpin the release input so that all future runs deploy the latest release available.

##Rolling back a manifest

<img src="/images/deploy/rollback-manifest.png" alt="Shippable Continuous Integration and Delivery" style="width:500px;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

In this scenario, you have a setup where the deploy job you want to rollback is preceded by a manifest job in your pipeline. The easiest way to roll back to a previous deployment here is:

* Navigate to the configuration page for the manifest job by right-clicking the job in the [SPOG](/platform/visibility/single-pane-of-glass-spog/) view and clicking the "configure job" wrench. Find and select the desired image tag for the image input. This will pin the image so that future manifests will use this version. Alternatively, the tag may be pinned as `versionName` [in shippable.yml](/platform/tutorial/workflow/crud-job/#pinning-specific-resource-versions).

* Re-run the manifest job by going to the SPOG view, right clicking on the job, and clicking on `Run`
* If the deploy job is set to run automatically after the manifest job, it will be triggered and will deploy the desired image.
* If the deploy job is not set to run automatically, you will need to right click on that and run it in order to trigger the deployment.

Please remember that all future runs of the deploy job will deploy the same image tag since it is now pinned. When you decide to deploy the latest image version, you can go back and unpin the image input so that future runs deploy the latest image available.
