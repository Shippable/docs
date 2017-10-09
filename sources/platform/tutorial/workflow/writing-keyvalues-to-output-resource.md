page_main_title: Share data between Jobs
main_section: Platform
sub_section: Tutorials
sub_sub_section: Workflow
page_title: Share data between Jobs

# Updating versions for an OUT resource

Resource updates for `OUT` resources are automatically handled by managed jobs, but custom jobs need to update these resources as part of their custom scripts. Updating these `OUT` resources is essential to trigger subsequent portions of your deployment pipeline.

Updating the `versionName` for `OUT` resources will trigger a new version of the resource and any jobs that depend on the resource will be triggered.

Let us assume you have an unmanaged job `myCustomJob` that takes two input resources: a [gitRepo resource](/platform/workflow/resource/gitrepo/) `myRepo` and a Docker registry [integration resource](/platform/workflow/resource/integration/) `myIntegration`. It builds a Docker image `myImage` as part of the custom script `doSomething.sh` and wants to push the image to a Docker registry. The next job in the pipeline, `nextJob` depends on myImage, so every time myImage changes, the version needs to be updated. Visually, it looks like this:

<img src="/images/platform/jobs/runSh/runShUpdateResource.png" alt="Updating a custom job's resource" style="width:700px;"/>
<br>

Let us define the resources in `shippable.resources.yml`:

```
resources:
  #define gitRepo: myRepo

  #define docker registry integration: myIntegration

  #define image resource
  - name: myImage							#required
    type: image								#required
    integration: myIntegration				#required
    pointer:
      sourceName: "myRepo/myImage"			#required
    seed:
      versionName: 1.1						#required

```


The custom job will be defined in `shippable.jobs.yml` as shown below. myRepo and myIntegration are `IN` values and `myImage` is the `OUT` value:

```
jobs:
  - name: myCustomJob
    type: runSh
    steps:
      - IN: myRepo
      - IN: myIntegration
      - TASK:
        - script: ./IN/mexec-repo/gitRepo/doSomething.sh
      - OUT: myImage
```

In order to increment resource version for `myImage` and ensure that `nextJob` is triggered each time the image is updated, you will need to update the `versionName` of the image resource after building and pushing the image in doSomething.sh:


```
#build image command

#push image command

#update output image
createOutState() {
  echo versionName=$IMAGE_TAG > $JOB_STATE/myImage.env
  cat /build/state/myImage.env
}

```

When you update the `versionName`, Shippable creates a new version for this resource and this triggers the rest of your deployment pipeline.

**This method of updating versions works for all types of resources.**
