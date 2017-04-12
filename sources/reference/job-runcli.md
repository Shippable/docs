main_section: Reference
sub_section: Jobs

# runCLI job

runCLI jobs combine the unlimited flexibility of runSh jobs with the added
convenience of automatically configured environments and tools. In addition to
running custom scripts as described in runSh, you can also add
[cliConfig](resource-cliconfig.md) resources as inputs to this job. The relevant
CLI tools will be preconfigured for your scripts to use. runCLI jobs also give
you access to the `shippable_replace` tool to help with replacing placeholders
in files with values from the environment.

## Basic example

````yaml
jobs:
  - name: myRunCLIJob
    type: runCLI
    steps:
      - IN: awsCLIConfig
      - TASK:
        - script: aws s3 ls
````

## Configuration reference

Required parameters:

  - [name](job-runcli.md#name): The name of your job. Set it to something that
describes what the job does and ie easy to remember. This will be the display
name of the job in your pipeline visualization.

  - [type](job-runcli.md#type): The type of your job. This must be `runCLI`.

  - [steps](job-runcli.md#steps): The steps that should be executed in your job.
Steps can have any number of `IN` and `OUT` resources. `IN` resources that are
[cliConfig](resource-cliconfig.md) will configure the appropriate CLI tools
before your job starts running. You can have a single `TASK` property in your
steps to specify your script commands. Everything under the `steps` section
executes sequentially.


Optional parameters:

  - [on_start](job-runcli.md#on_start): Specify `script` or `NOTIFY` sections
that are executed when the job starts.

  - [on_success](job-runcli.md#on_success): Specify `script` or `NOTIFY`
sections that executed only if the `TASK` section succeeds.

  - [on_failure](job-runcli.md#on_success): Specify `script` or `NOTIFY`
sections that executed only if the `TASK` section fails.

  - [always](job-runcli.md#always): Specify `script` or `NOTIFY` sections that
are always executed at the end of the job, regardless of whether the `TASK`
section failed or succeeded.

## Configured CLI tools

The runCLI job uses the subscription integration specified in the
[cliConfig](resource-cliconfig.md) to determine which CLI tools to configure.
These tools are configured with the credentials contained in the subscription
integration. Here is a list of the tools configured for each integration type:

| Integration Type                    | Configured Tools           |
| ------------------------------------|-------------|
| AWS                                 | [AWS CLI](https://aws.amazon.com/cli/); [EB (Elastic Beanstalk) CLI](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3.html) |
| Amazon EC2 Container Registry (ECR) | [Docker Engine](https://docs.docker.com/engine/reference/commandline/docker/) |
| Docker Hub                          | [Docker Engine](https://docs.docker.com/engine/reference/commandline/docker/) |
| Docker Trusted Registry             | [Docker Engine](https://docs.docker.com/engine/reference/commandline/docker/) |
| Google Container Engine             | [gcloud](https://cloud.google.com/sdk/gcloud/); [kubectl](https://kubernetes.io/docs/user-guide/kubectl/) |
| Google Container Registry (GCR)     | [Docker Engine](https://docs.docker.com/engine/reference/commandline/docker/) |
| JFrog Artifactory                   | [JFrog CLI](https://www.jfrog.com/confluence/display/CLI/CLI+for+JFrog+Artifactory) |
| Kubernetes                          | [kubectl](https://kubernetes.io/docs/user-guide/kubectl/) |
| Private Docker Registry             | [Docker Engine](https://docs.docker.com/engine/reference/commandline/docker/) |
| Quay.io                             | [Docker Engine](https://docs.docker.com/engine/reference/commandline/docker/) |

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
documentation](job-runsh.md) for the list of available environment
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

## Resource variables

Variables are added to the environment for all `IN` and `OUT` resources defined
for the runCLI job. The environment variables are the same as those available
for [runSh](./runSh/) jobs.
