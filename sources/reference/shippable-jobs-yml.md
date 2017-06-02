page_main_title: shippable.jobs.yml
main_section: Reference
sub_section: Configuration

# shippable.jobs.yml reference

Jobs are defined through the YML and they all follow a similar format irrespective of the type of job. A more detailed explanation of what jobs are is in the [Jobs overview](/reference/jobs-overview/)

The anatomy of the jobs configuration generally follows the structure below:

```
jobs:
  - name: <string>
    type: manifest | deploy | release | runSh | runCLI | runCI | provision
    steps:
      - IN: <resource>
      - IN: <job>
        switch: on | off
      - OUT: <resource>
      - TASK:
    on_start:
      - NOTIFY: <notification resource name>
    on_success:
      - NOTIFY: <notification resource name>
    on_failure:
      - NOTIFY: <notification resource name>
    on_cancel:
      - NOTIFY: <notification resource name>
    always:
      - NOTIFY: <notification resource name>

```

* `name` should be an easy to remember text string. This will appear in the visualization of this job in the SPOG view and in the list of jobs in the Pipelines Grid View.

* `type` is always set to type of job - [runCI](/reference/job-runci), [manifest](/reference/job-manifest/), [deploy](/reference/job-deploy/), [release](/reference/job-release/), [runSh](reference/job-runsh/), [provision](/reference/job-provision/), [runCLI](/reference/job-runcLI/), or [jenkinsJob](/reference/job-jenkinsJob/).

* `steps` is an array of instructions consisting of `IN`, `OUT` & `TASK` objects.

	* `IN` is the name of the resource or job that is an input, i.e. information from the resource or job is required to run this job.

	* `OUT` is the name of the resource which is output from this job. Only certain job types support `OUT`: runSh, runCI, and runCLI.

	* `TASK` is an operation that is executed as part of this job. For runSh and runCLI jobs, these can be custom shell scripts. For other job types, specific configs are done through the TASK section.
  * `switch` can be defined for IN resources or jobs. Setting it to `off` for a specific input will turn off automatic triggering of a job when that input changes.

* `on_start` specifies that notifications are sent when the job starts.

* `on_success` specifies that notifications are sent when the job completes successfully.

* `on_failure` specifies that notifications are sent when the job fails.

* `on_cancel` specifies that notifications are sent when the job is canceled.

* `always` specifies that notifications are sent when the job succeeds, fails, errors, or is canceled.

For a detailed explanation of the yml for each job type, visit the reference page for that specific job:

- [runCI](/reference/job-runci)
- [manifest](/reference/job-manifest/)
- [deploy](/reference/job-deploy/)
- [release](/reference/job-release/)
- [provision](/reference/job-provision/)
- [runCLI](/reference/job-runcLI/)
- [runSh](reference/job-runsh/)
- [jenkinsJob](/reference/job-jenkinsJob/)
