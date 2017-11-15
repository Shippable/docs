page_main_title: release
main_section: Platform
sub_section: Workflow
sub_sub_section: Jobs
page_title: Unified Pipeline Jobs - release
page_description: Create and increment semantic version for a service definition
page_keywords: release management, semantic versioning, continuous delivery


# release
`release` is a job that is used to create a semantically versioned object that represents an immutable list of service definitions, in our case a [manifest](/platform/workflow/job/manifest/). The benefit of using this job would be if you have multiple services that make up your application and you want them all to be deployed as a unit.

This job can also be used to simply maintain an incrementing version number, without being associated with any particular set of manifests.


Shippable DevOps Assembly Lines store the service definitions in the versions of the following jobs:

* [manifest](/platform/workflow/job/manifest) is a single service definition.
* [deploy](/platform/workflow/job/deploy) is a collection of one or more manifests that have been deployed to a [cluster](/platform/workflow/resource/cluster/).
* [release](/platform/workflow/job/release) is a collection of one or more manifests that have been associated with a version number.

All of the above jobs can be used as `IN`s to create a new `release`. A new version is created anytime this job is executed.

You can create a `release` job by [adding](/platform/tutorial/workflow/crud-job#adding) it to `shippable.yml` and these jobs execute on Shippable provided shared runtime.


## YML Definition

```
jobs:
  - name:               <string>                    # required
    type:               release                     # required
    bump:               <bump strategies>           # optional, defaults to minor
    on_start:                                       # optional
      - NOTIFY:         <notification resource name>
    steps:
      - IN:             <version>                   # optional
      - IN:             <manifest/release/deploy>   # optional
      - IN:             <manifest/release>          # optional
      - IN:             <any job or resource>       # optional
    on_success:                                     # optional
      - NOTIFY:         <notification resource name>
    on_failure:                                     # optional
      - NOTIFY:         <notification resource name>
    on_cancel:                                      # optional
      - NOTIFY:         <notification resource name>
    always:                                         # optional
      - NOTIFY:         <notification resource name>
```

* **`name`** -- should be an easy to remember text string

* **`type`** -- is set to `manifest`

* **`bump`** -- This is used to control the strategy used to bump your seed version. Subsequent executions of this job will increment the last bumped value if it is semantically greater than the `seed`. If you want to reset, then just change the seed and it will start from the new seed again. Below is a list of accepted strategies and how they behave if a seed version of `v1.0.0` was used.
    * `major` -- increments the major bit. So, first pass it will be `v2.0.0` and next one will be `v3.0.0`.
    * `minor` -- increments the minor bit. So, first pass it will be `v1.1.0` and next one will be `v1.2.0`.
    * `patch` -- increments the patch bit. So, first pass it will be `v1.0.1` and next one will be `v1.0.2`.
    * `alpha` -- increments the alpha bit. So, first pass it will be `v1.0.0-alpha` and next one will be `v1.0.0-alpha.1`.
    * `beta` -- increments the beta bit. So, first pass it will be `v1.0.0-beta` and next one will be `v1.0.0-beta.1`.
    * `rc` -- increments the alpha bit. So, first pass it will be `v1.0.0-rc` and next one will be `v1.0.0-rc.1`.
    * `final` -- removes pre-release flags on your incoming version, so if your input was `v4.0.0-rc.5`, then output version would be `v4.0.0`.

* **`steps `** -- is an object which contains specific instructions to run this job
    * `IN` -- You need at least one source of a semVer string, and one `manifest`-based input (`manifest`, `release`, or `deploy`).  If you use multiple of them, then they will be deployed as a whole. Below is the list of all Resources and Jobs that can be supplied as `IN`
        * [version](/platform/workflow/resource/version/) -- This is used as the seed version that you want to start from. You can also use this to reset the current version back to a specific value.  This `IN` is optional if the job already has another source of a base version (such as a previous `release` job).

        * [manifest](/platform/workflow/job/manifest)/[release](/platform/workflow/job/release)/[deploy](/platform/workflow/job/deploy) -- You can add zero or more of these. When you add a release job, the version produced from the incoming release job will be used as the base for the `bump` action instead of the `IN` version resource.

        * [deploy](/platform/workflow/job/deploy) -- You can add zero or more of these. Since a `deploy` job's output is a list of manifests, using it as an `IN` to a release job will result in that list of manifests being tagged with the version produced by the `release` job.

        * Any other job or resource will only participate in triggering `release` job but not in of the processing of it.

* **`on_start`**, **`on_success`**, **`on_failure`**, **`on_cancel`**, **`always`** are used to send notifications for those events. You need to provide a [**notification**](/platform/workflow/resource/notification) resource pointing to the provider like Slack, Email, IRC, Hipchat, etc.

The [jobs section of the anatomy of shippable.yml](/platform/tutorial/workflow/shippable-yml/#jobs) page contains additional descriptions of these tags.

**Notes:**

- Since `release` jobs are managed jobs, free-form scripting is not allowed. `on_start`, `on_success`, `on_failure`, `on_cancel` and `always` only support `NOTIFY` tag.

- A new version of the `release` job is created every time it is executed. Since the job executions are versioned, it is easy to **Replay** an old version to trigger your Assembly Line with the old settings. However, you should only do so if you understand the impact to your Assembly Lines.

## Further Reading
* [jobs](/platform/workflow/job/overview)
* [resources](/platform/workflow/resource/overview)
