main_section: CI
sub_section: Overview

# Triggering other jobs after CI

Shippable works well as a standalone CI service and you just need the CI configuration file `shippable.yml` at the root of your repository.

However, CI is just part of end to end software delivery and most customers also use Shippable to enable the rest of their Continuous Delivery workflow, including deploying the application to several successive environments like Test and Staging, running the appropriate test suite against each environment, managing release versions, and finally deploying the application to production.

In this broader end to end workflow, CI is just the first step. This page shows you how you can connect your CI job to the rest of your pipeline.

<img src="../../images/ci/connect-ci-pipelines.png" alt="Add Docker Hub credentials">

##The runCI job

The secret to connecting CI with the rest of your pipeline is the **runCI** job that gets automatically created when you enable a project for CI. You can see this job already in your pipeline by going to the **Pipelines** tab of your Subscription.

<img src="../../images/ci/runCI-job.png" alt="Add Docker Hub credentials">

The automatically created job is named with a standard convention of appending **_runCI** to your project name. Follow the steps below to connect it to the next job in your pipeline.

###1. Adding runCI to your shippable.jobs.yml

The runCI job can be used as a standard job in your pipeline workflow. You will to define it in your `shippable.jobs.yml` to connect it to another job in your pipeline. Note that the name of your job in the jobs yml has to match the runCI job name created for you.

```
jobs:
  - name: my_app_runCI
    type: runCI
    steps:
      - OUT: my_image

  - name: next-job-in-pipeline
    type: deploy/manifest/runSh/runCLI
    steps:
      - IN: my_image

```

As shown above, the runCI job should have an OUT tag which specifies the resource that is updated as a result of this CI job. As long as the next job in your pipeline has that resource as an IN, any change to the resource by the CI job will trigger the next job.

###2. Updating the resource version

Now that your pipeline is set up, you need to trigger an update for the OUT resource from your CI workflow.

To do this, you will need to make a simple change to your `shippable.yml` to write a payload of your choice to the `<resourceName>.env` file during your CI build.  A change in the `.env` file will trigger a POST later on that will update your resource version and start subsequent pipeline jobs.

```
build:
  ci:
    - ./runTests.sh
    - ./buildAndPush.sh
    - echo "versionName=$BRANCH.$BUILD_NUMBER" >> $JOB_STATE/my_image.env
```
