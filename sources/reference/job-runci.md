main_section: Reference
sub_section: Jobs
page_title: DevOps pipeline runCI job
page_description: Description of the runCI job
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# runCI

Each `runCI` job represents a project enabled for CI on Shippable. This job is somewhat different from other pipeline jobs since the actual configuration is driven through [`shippable.yml`](/reference/shippable-yml/). The runCI job is just a wrapper that lets you easily integrate your CI workflow with the rest of your pipeline.

## Basic example

There are two steps involved in making your CI job an integral part of your pipeline workflow.

###1. Create a runCI job

A `runCI` job is automatically created when a [project is enabled for CI](/ci/enable-project/).  For projects enabled before March 2017, you can create this job by clicking on the **Hook** button on the Project Settings page.

<img src="/images/reference/jobs/runCI/hookPipeline.png" alt="Hook button on project settings page." style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

Once enabled or hooked, click on your **Pipelines** tab and you will see the job in your SPOG, just as though you had added it via `shippable.jobs.yml`. It will also show the a [ciRepo resource](/reference/resource-ciRepo/) as an input, which is a pointer to the repository you enabled for CI.

<img src="/images/reference/jobs/runCI/runCIInSPOG.png" alt="runCI in SPOG" style="vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

###2. Connecting with your pipeline

If you want to connect your **runCI** job with other pipeline jobs, you'll need to include it in your `shippable.jobs.yml`.

This allows you to easily set up triggers and OUT resources that will kick off various pipeline workflows when your CI tests pass.

```
jobs:
  - name: my_app_runCI      # required
    type: runCI             # required
    steps:                  # required
      - IN: my_app_ciRepo   # at least one IN or OUT required
      - OUT: <resourceName>

```

* `name` needs to match what you already can see in SPOG.  It should be in the format `<projectName>_runCI`
* `type` should always be `runCI`
* There should be at least one `<resourceName>` as an `IN` or `OUT` to the job. You can specify your `ciRepo` resource as an IN. You can also specify any other resource depending on what you need for CI, such as `image`, `file`, `params`, etc. See our [resources page](/reference/resources-overview/) for the full list of available resources.

You can configure your `shippable.yml` to update the `OUT` resources for fully integrated pipeline workflows.  For instructions on how to update resources [check out our tutorial on connecting CI with pipelines](/ci/trigger-pipeline-jobs/).

Note that runCI jobs won't process the `TASK` section.  The `TASK` section is automatically configured to run the workflow specified in your `shippable.yml`.  Because of this, you also cannot use `NOTIFY` sections in the runCI job.  Instead, notifications should be set up directly in your CI project's `shippable.yml`, which you can read about in the [Sending notifications docs](/ci/send-notifications/).

##Environment variables

In order to make it easier to write your scripts and work with `IN` and `OUT` resources, we have made several environment variables available for use within your `TASK` section of your `runCI` job.

A complete list of these variables is available in the [Environment variables for unmanaged jobs docs](/reference/jobs-unmanaged/), along with simple tutorials showing how you can work with `IN` and `OUT` resources in your scripts.  

Please note that the environment variables for a `runCI` job are in addition to the [standard variables available for every CI job](/ci/environment-variables/).
