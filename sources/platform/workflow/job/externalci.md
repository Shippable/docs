page_main_title: externalCI
main_section: Platform
sub_section: Workflow
sub_sub_section: Jobs
page_title: Unified Pipeline Jobs - externalCI
page_description: List of supported jobs
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc

# externalCI

The `externalCI` job is a representation of external pipeline jobs in Shippable Assembly Lines.
This job is used to integrate non-Shippable CI-CD platform jobs to Shippable. You can also trigger upstream jobs by adding this job in your `shippable.yml` and specifying this it as IN step to the jobs you want to trigger.

You can create a `externalCI` job by [adding](/platform/tutorial/workflow/crud-job#adding) it to `shippable.yml`:

```
jobs:
  - name: 				<string>			# required
    type: 				externalCI			# required
    steps:
      - IN:             <any job>
      - IN:             <any resource>
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `externalCI`

* **`steps`** -- is an object which contains specific instructions to run this job. Currently, when these IN jobs/resources get updated externalCI will not run. This is work in progress.

# Updating status of externalCI jobs

You can update status of your externalCI job in Shippable Assembly Lines while running the external job
by calling `POST /externalCI` route.
This is the sample API call to update status of externalCI job:
```
POST api.shippable.com/externalCI
Content-Type: application/json
Authorization: apiToken <SHIPPABLE_API_TOKEN>

Body:
{
  "jobName": <name of your external job>,
  "statusCode": <4001/4002/4003>,
  "externalCIServerId": <id of the externalCIServer resource>,
  "externalBuildUrl": <URL of the external CI build>,
  "externalBuildId": <id of the external CI build>,
  "versionData": {                        # optional
     "key1": "value1"
  }
}
```

* **`jobName`** -- is name of the externalCI job that you added in then `shippable.yml` file. If this job is not added in `shippable.yml` then we create it. You can add it later if you want IN steps to it.

* **`statusCode`** -- is the status of the build you want to set. Status can only be `processing`(4001), `success`(4002) or `failure`(4003.

* **`externalCIServerId`** -- is the id of the [externalCIServer](/platform/workflow/resource/externalciserver) resource.

* **`externalBuildUrl`** -- is the URL of the external build.

* **`externalBuildId`** -- is the ID of of the external build.

* **`versionData`** -- Optional, is an object which can be use to pass key-values pairs to other jobs that are dependent on this job.

The [jobs section of the anatomy of shippable.yml](/platform/tutorial/workflow/shippable-yml/#jobs) page contains additional descriptions of these tags.

## Further Reading
* [jobs](/platform/workflow/job/overview)
* [resources](/platform/workflow/resource/overview)
* [externalCIServer](/platform/workflow/resource/externalciserver)
