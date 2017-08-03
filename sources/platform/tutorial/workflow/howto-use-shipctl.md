page_main_title: Working with Jobs
main_section: Platform
sub_section: Tutorials
sub_sub_section: Workflow
page_title: DevOps Assembly Line Jobs
page_description: How to add, delete and update jobs
page_keywords: Deploy multi containers, microservices, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, docker, lxc


## shippable_replace

When you create a `runCLI` job, the `shippable_replace` command-line tool is
automatically installed. `shippable_replace` looks for placeholders in one or
more files and replaces them with the values of the corresponding environment
variables.

`shippable_replace` is used as follows:

```
shippable_replace [paths to files]
```

The files passed to `shippable_replace` may contain one or more placeholders
for environment variables. Placeholders are strings of the form
`$ENVIRONMENT_VARIABLE_NAME` or `${ENVIRONMENT_VARIABLE_NAME}`. We recommend
`${ENVIRONMENT_VARIABLE_NAME}`, as it is less likely to cause errors if you have
an environment variable name that is a substring of another environment
variable's name.

For example, say you wanted to insert the current job name into two different
files: `file1.json` and `test/file2.txt`. The name of the environment variable
containing the job name is `JOB_NAME`. (See the [runSh
documentation](/platform/workflow/job/runsh.md) for the list of available environment
variables.)

`file1.json` might look like this:
```
{
  "foo": "bar",
  "jobName": "${JOB_NAME}"
}
```

`test/file2.txt` contains this:

```
This job, ${JOB_NAME}, is the coolest job ever.
```

`shippable_replace` is then added to the task section of the `runCLI` job:

```
jobs:
  - name: myRunCLIJob
    type: runCLI
    steps:
      - IN: <resource>
      - TASK:
        - script: shippable_replace file1.json test/file2.txt
```

After `shippable_replace`, `file1.json` now looks like this:

```
{
  "foo": "bar",
  "jobName": "myRunCLIJob",
  "fizz": "buzz"
}
```

And `test/file2.txt` looks like this:

```
This job, myRunCLIJob, is the coolest job ever.
```

## Further Reading
* [Jobs](/platform/workflow/job/overview)
* [Resources](/platform/workflow/resource/overview)
* [Integrations](/platform/workflow/integration/overview)
