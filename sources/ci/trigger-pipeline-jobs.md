page_description: Trigger Assembly Line jobs after CI finishes
main_section: CI
sub_section: Configuration
sub_sub_section: Advanced config

# Making CI part of your Assembly Line workflow

Shippable works well as a standalone CI service focused on a simple build, test, and push workflow.

However, CI is just part of end-to-end software delivery and most customers also use Shippable to enable the rest of their Continuous Delivery workflow, including deploying the application to several successive environments like Test and Staging, running the appropriate test suite against each environment, managing release versions, and finally deploying the application to production.

In this broader end to end workflow, CI is just the first step. This page shows you how you can connect your CI job to the rest of your pipeline.

<img src="/images/ci/connect-ci-pipelines.png" alt="CI to Pipeline">

##The runCI job

The secret to connecting CI with the rest of your pipeline is the **runCI** job that gets automatically created when you enable a project for CI. You can see this job already in your pipeline by going to your subscription dashboard.

<img src="../../images/ci/runCI-job.png" alt="Subscription Dashboard">

The automatically created job is named with a standard convention of appending **_runCI** to your project name. To learn more on runCI, please reference the [runCI document](/platform/workflow/job/runci).

If you want your CI job to be part of a larger CD workflow, you will need to explicitly define it in your **shippable.yml** as explained in the sections below.

## Triggering another job after CI

You can trigger another job after CI finishes in one of two ways:

* [Direct trigger](#direct-trigger), where the `runCI` job can be defined as an `IN` for another job
* [Update a resource](#update-resource), which triggers downstream jobs that have the resource as an `IN`

Both approaches are explained in the sub-sections below.

<a name="direct-trigger"></a>
### Direct trigger

You can configure your CI job to trigger another downstream job, as shown below:

<img src="/images/ci/trigger-pipeline-jobs-fig1.png" alt="Directly triggering a downstream job">

To do this, you can directly specify the automatically created `runCI` job as an `IN` to the downstream job. The runCI job name is your CI repository name, appended with a **_runCI**.


```
jobs:
  - name: next-job-in-pipeline
    type: runSh               #This can be any type, including another runCI job
    steps:
      - IN: myapp_runCI       # replace with auto-created runCI job name
    # rest of job definition    

```

If this repository has already been added as an Assembly Line syncRepo, just commit it and your workflow will be updated to trigger `next-job-in-pipeline` when `myapp_runCI` finishes.

If this repository is not yet a [syncRepo](/platform/workflow/resource/syncRepo), follow [these instructions](/platform/tutorial/workflow/crud-syncrepo/#adding-a-syncrepo) to add your Assembly Line config to Shippable.

<a name="update-resource"></a>
### Updating a resource

If your CI job updates an `OUT` resource which in turn triggers another job, your workflow is as shown below:

<img src="/images/ci/trigger-pipeline-jobs-fig2.png" alt="Updating a resource which triggers a downstream job">

The example below shows a workflow where a CI job builds a Docker image. The image information is stored in an `image` resource, and every update of the image resource triggers the next job which can take any action, such as a deployment of the image. You can do the same thing with any type of resource.

####1. Add the resource

First, add a definition for the resource. The syntax for the `image` resource [is here](/platform/workflow/resource/image).

####2. Add runCI definition

The `runCI` job can be used as a standard job in your pipeline workflow. You will need to define it in the `jobs` section of your **shippable.yml** to connect it to another job in your pipeline. Note that the name of your job must match the runCI job name created for you.

```
jobs:
  - name: my_app_runCI          # replace with auto-created runCI job name
    type: runCI
    steps:
      - OUT: my_image           # replace with image resource name

  - name: next-job-in-pipeline
    type: runSh                 # replace with your job type
    steps:
      - IN: my_image            # replace with image resource name
    # rest of job definition
```

As shown above, the `runCI` job should have an `OUT` tag which specifies the resource `my_image` that is updated as a result of this CI job. As long as the next job in your pipeline has the same resource as an `IN`, any change to the resource by the CI job will trigger the next job.

####3. Update resource version

Now that your pipeline is set up, you need to trigger an update for the `OUT` resource from your CI workflow.

To do this, you will need to make a simple change to your **shippable.yml** and call a [shippable utility method](/platform/tutorial/workflow/using-shipctl/#post_resource_state) to increment the image resource version, which will trigger any job that has the image resource as an `IN`.

```
build:
  ci:
    - ./runTests.sh
    - docker build -t myImageRepo/myImageName:myImageTag .
    - shipctl post_resource_state "my_image" "versionName" "myImageTag"
```

Couple of things:

* We usually recommend using $BRANCH.$BUILD_NUMBER as the tag for your image, so that it is versioned.
* The `shipctl` method shown in the example will update the image version, which triggers the next job in your workflow, `next-job-in-pipeline` in this example.


## Triggering CI after another job

You can also trigger `runCI` after another upstream job if needed. Typical use cases are when you have dependent CI jobs, or need to define a job that runs before CI, such as building a custom Docker image.

This scenario has two flavors:

* [Direct trigger](#direct-trigger-ci), where the upstream job is defined as an `IN` to the `runCI` job
* [Update a resource](#update-resource-ci), which triggers the `runCI` job when an `IN` resource is updated.

Both approaches are explained in the sub-sections below.

<a name="direct-trigger-ci"></a>
### Direct trigger
You can configure your CI job to trigger when an upstream job finishes, as shown below:

<img src="/images/ci/trigger-pipeline-jobs-fig3.png" alt="Directly triggering a downstream job">

To do this, you will need to define the `runCI` job in your **shippable.yml** and specify the upstream job as an `IN` as shown below. The runCI job name must match your CI repository name, appended with a **_runCI**.


```
jobs:
  - name: myapp_runCI         # replace with auto-created runCI job name
    type: runCI               
    steps:
      - IN: upstream_job       # replace with upstrea job name     

  - name: upstream_job
    type: runSh               #This can be any type, including another runCI job
    steps:
    # Rest of job definition    

```

If this repository has already been added as an Assembly Line syncRepo, just commit it and your workflow will be updated to trigger `myapp_runCI` when `upstream_job` finishes.

If this repository is not yet a [syncRepo](/platform/workflow/resource/syncRepo), follow [these instructions](/platform/tutorial/workflow/crud-syncrepo/#adding-a-syncrepo) to add your Assembly Line config to Shippable.

<a name="update-resource-ci"></a>
### Updating a resource

If your upstream job updates an `OUT` resource which in turn triggers your `runCI` job, your workflow is as shown below:

<img src="/images/ci/trigger-pipeline-jobs-fig4.png" alt="Updating a resource which triggers a downstream job">

The example below shows a workflow where an upstream job builds a Docker image and updates image information in an `OUT` `image` resource. The update to the image resource triggers the `runCI` job which uses the image information to spin up a CI container.

You can implement a similar workflow with any type of resource in between your upstream job and `runCI`, such as a `params` resource that sets some environment variables needed for your CI job.

####1. Add the resource

First, add a definition for the resource. The syntax for the `image` resource [is here](/platform/workflow/resource/image).

####2. Add job definitions

The `runCI` job can be used as a standard job in your pipeline workflow. You will need to define it in the `jobs` section of your **shippable.yml** to connect it to another job in your pipeline. Note that the name of your job must match the runCI job name created for you.

```
jobs:
  - name: my_app_runCI          # replace with auto-created runCI job name
    type: runCI
    steps:
      - IN: my_image            # replace with image resource name

  - name: previous-job-in-pipeline
    type: runSh                 # replace with your job type
    steps:
      - OUT: my_image            # replace with image resource name
      - TASK:
          script:
            - docker build -t myImageRepo/myImageName:myImageTag .
            - shipctl post_resource_state "my_image" "versionName" "myImageTag"   #replace image resource name and tag"
```

A few things to note here:

* The upstream job has an `OUT` tag which specifies the resource `my_image` that is updated as part of the job. As long as the `runCI` job has the same resource as an `IN`, any change to the resource by the upstream job will trigger the next job.
* The upstream job uses a [shippable utility method](/platform/tutorial/workflow/using-shipctl/#post_resource_state) to increment the image resource version, which will trigger any job that has the image resource as an `IN`. The `shipctl post_resource_state` method shown in the example will update the image version, which triggers the next job in your workflow, `next-job-in-my_app_runCI` in this example.
* We usually recommend using $BUILD_NUMBER as the tag for your image, so that it is versioned. However, you can use any tag you want.
