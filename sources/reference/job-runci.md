main_section: Reference
sub_section: Jobs
page_title: DevOps pipeline runCI job
page_description: Description of the runCI job
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# runCI

Each `runCI` job represents a project enabled for CI on Shippable. This job is somewhat different from other pipeline jobs since the actual configuration is driven through [`shippable.yml`](/reference/shippable-yml/). The runCI job is just a wrapper that lets you easily integrate your CI workflow with the rest of your pipeline.

## Basic example

A `runCI` job is automatically created when a [project is enabled for CI](/ci/enable-project/).  For projects enabled before March 2017, you can create this job by clicking on the **Hook** button on the Project Settings page.

<img src="../../images/jobs/hookPipeline.png" alt="Hook button on project settings page." style="width:800px;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

Once enabled or hooked, click on your **Pipelines** tab and you will see the job in your SPOG, just as though you had added it via `shippable.jobs.yml`. It will also show the a [ciRepo resource](/reference/resource-ciRepo/) as an input, which is a pointer to the repository you enabled for CI.

<img src="../../images/jobs/runCIInSPOG.png" alt="runCI in SPOG" style="width:800px;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

If you want to connect this job with other pipeline jobs, you'll need to include it in your `shippable.jobs.yml`. This allows you to easily set up triggers and OUT resources that will kick off various pipeline workflows when your CI tests pass.

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
* There should be at least one `<resourceName>` as an `IN` or `OUT` to the job.  It can be any type of resource that you'd like to utilize during CI, including `image`, `file`, `params`, `replicas`, `loadBalancer`, etc. See our [resources page](/reference/resources-overview/) for the full list of available resources.

Once your rSync job completes, you will see your SPOG runCI update to match the configuration in your `shippable.jobs.yml`.

<img src="../../images/jobs/runCIOutSpog.png" alt="SPOG updated to have the image as an OUT of the runCI" style="width:800px;vertical-align: middle;display: block;margin-left: auto;margin-right: auto;"/>

Now you can configure your `shippable.yml` to update your resources for fully integrated pipeline workflows.  For instructions on how to update resources [check out our tutorial].

Note that runCI jobs won't process the `TASK` section.  The `TASK` section is automatically configured to run the workflow specified in your `shippable.yml`.  Because of this, you also cannot use `NOTIFY` sections in the runCI job.  Instead, notifications should be set up directly in your CI project's `shippable.yml`, which you can read about [here].

## Utilizing a runCI job

Once your runCI is configured, you can treat your project's `shippable.yml` file like you would treat a scripted `TASK` section of a runCLI or runSH job. You can use the runCI job as an `IN` on one of your other jobs to trigger and pass state when CI completes.  For general information on how that works, as well as some of the most common use-cases, [check out the runSh reference](/reference/job-runSh/).
