page_main_title: externalCI
main_section: Platform
sub_section: Configuration
sub_sub_section: Jobs
page_title: Unified Pipeline Jobs - externalCI
page_description: List of supported jobs
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# externalCI

The `externalCI` job is a representation of your continuous integration jobs in other CI servers such as Jenkins in Shippable Assembly Line. This job is used to integrate any job in your existing CI server with your Shippable assembly line so that you can easily view all the job metadata such as job name, status code, start and stop timestamps in your Shippable dashboard. You can also trigger upstream jobs by adding this job in your `shippable.yml` and specifying this it as IN step to the jobs you want to trigger.

You can create a `externalCI` job by [adding](/platform/tutorial/workflow/crud-job#adding) it to `shippable.yml`:

```
jobs:
  - name: 				<string>			# required
    type: 				externalCI			# required
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `externalCI`

# Updating status of externalCI jobs

You can update status of your externalCI job in Shippable Assembly Line while running the external job by calling `POST /externalCI` route.
```
POST https://api.shippable.com/externalCI
Content-Type: application/json
Authorization: apiToken <SHIPPABLE_API_TOKEN>

Body:
{
  "jobName": <name of your externalCI job>,                           # required
  "statusCode": <4001/4002/4003>,                                     # required
  "externalCIServerId": <id of the externalCIServer resource>,        # required
  "externalBuildUrl": <URL of the external CI build>,                 # required
  "externalBuildId": <id of the external CI build>,                   # required
  "versionData": {                                                    # optional
     "key1": "value1"
  }
}
```

* **`jobName`** -- is name of the externalCI job for which you want to update status. If this job is not added in `shippable.yml` then we create it.

* **`statusCode`** -- is the status code of the external build. Status can only be `processing`(4001), `success`(4002) or `failure`(4003.

* **`externalCIServerId`** -- is the id of the [externalCIServer](/platform/workflow/resource/externalciserver) resource.

* **`externalBuildUrl`** -- is the URL of the external build.

* **`externalBuildId`** -- is the ID of of the external build.

* **`versionData`** -- Optional, is an object which can be used to pass key-values pairs to other jobs that are dependent on this job.

The [jobs section of the anatomy of shippable.yml](/platform/tutorial/workflow/shippable-yml/#jobs) page contains additional descriptions of these tags.

## Further Reading
* [jobs](/platform/workflow/job/overview)
* [resources](/platform/workflow/resource/overview)
* [externalCIServer](/platform/workflow/resource/externalciserver)
