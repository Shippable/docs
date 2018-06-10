page_main_title: Set environment variables in jobs
main_section: Platform
sub_section: Tutorials
sub_sub_section: Workflow

# Setting environment variables in jobs

You can inject static or dynamic environment variables into your `runSh` and CI(`runCI`) jobs.

## Static environment

### In runSh jobs

You can inject static environment variables in `runSh` jobs in one of three ways:

* The simplest way is to specify them in the `runtime:options:env:` section of the `runSh` config. However, these variables are not encrypted and anyone with access to the config repository can see them. [Instructions for this method are here](#task-sec)
* You can use an `IN` [params resource](/platform/workflow/resource/params) which will automatically set the environment. The key-value pairs can be encrypted if necessary. [Instructions for this method are here](#params-res)
* You can use an `IN` [integration resource](/platform/workflow/resource/integration) with a [**Key-value** integration](/platform/integration/key-value), which will automatically set the variables. Key-value integrations are stored in Vault and encrypted in-flight and at-rest. They also provide complete abstraction since the key-value pairs are not defined in automation scripts and can hence be updated without touch automation scripts. This is the recommended approach to inject environment variables that contain sensitive information. [Instructions for this method are here](#integration-res)

<a name="task-sec"></a>
#### Using the TASK section

* To inject static environment variables, include them under the `runtime:options:env:` section in **shippable.yml** as shown below:

```
jobs:
  - name: job_1
    type: runSh
    steps:
      - TASK:
          name: task_1
          runtime:
            options:
              env:
                - CONTAINER_ENV_1: foo
                - CONTAINER_ENV_2: bar
          script:
            - echo "Checking environment variables"
            - env
```

The nice thing about this approach is that you can set different env for each `TASK` section of your job.

* Commit the changes above to **shippable.yml**. This will automatically update your existing workflow to include the env variables. If this is a brand new workflow, you can add your config to Shippable by following [instructions here](/platform/tutorial/workflow/add-assembly-line).

<a name="params-res"></a>
#### Using a params resource

You can use the `params` resource to set the environment for your job. Please read our tutorial on [Inserting secrets in jobs](/platform/tutorial/workflow/insert-secrets-in-job/#using-params-resource) to learn how to do this.

<a name="integration-res"></a>
#### Using integration resource with key-values

You can also set the environment using the `integration` resource with a [Key-value](/platform/integration/key-value) integration.

Follow the steps below to do this.

* Create a **Key-value** account integration by following instructions  [here](/platform/tutorial/integration/howto-crud-integration/#creating-an-integration). While creating the integration, please ensure that you set scopes to include the organization or project that contains your **shippable.yml** config.
As an example, let us assume you create the integration with the following key-value pairs:

```
username=admin
password=admin123
```

* Note down your account integration name.

* Define an `integration` resource in your **shippable.yml**:

```
resources:
  - name: mySecret
    type: integration
    integration: myKeyValue  # Replace with the name you created in the earlier step

```

* Update your job to include the resource:

```
jobs:
  - name: test_keyval
    type: runSh
    steps:
      - IN: myKeyValue   # Specify the resource as an IN
      - TASK:
          name: test_integration   
          script:
            - echo $username
            - echo $password
```

The `echo` commands will output `admin` and `admin123`. The environment is already set when you configure an `IN` `integration` resource pointing to a Key-value integration.

* Commit the changes above to **shippable.yml**. This will automatically update your existing workflow and you can run the job to verify that the right values are present. If this is a brand new workflow, you can add your config to Shippable by following [instructions here](/platform/tutorial/workflow/add-assembly-line).

### In CI(runCI) jobs

To inject static environment variables in your CI job, read the CI documentation for [Preparing your environment](/ci/env-vars/#user-defined-variables)

## Dynamic environment

You can also set the environment for a job from an upstream job using the `params` resource.

<img src="/images/platform/tutorial/workflow/set-env-vars-in-jobs-fig1.png" alt="Sharing information across jobs">

In the image above, the key-value pairs defined in the `params` resource are automatically set in the environment for **job_2**. Follow the instructions below to follow this method:

* Define a `params` resource in your **shippable.yml**:

```
resources:
  - name: myEnv
    type: params
    versionTemplate:
      params:
        username: tbd
        password: tbd
```
The YAML definition of the resource can contain some default values for the environment you want to set, or you can just set it to some dummy value like `SEED: initial_version`. The list of key-value pairs is dynamic, so the job that updates this resource can specify any key-value pairs it wants.

* Write to the `params` resource from the upstream job (**job_1** in the image above):

```
jobs:
  - name: job_1
    type: runSh
    steps:
      - OUT: myEnv
      - TASK:
          script:
            - shipctl put_resource_state_multi "myEnv" "username=admin password=admin123"
```

If you only want to write to it when the job succeeds, you can also put the `shipctl` statement in the `on_success` section.

* Read from the `params` resource in the downstream job (**job-2** in the image):

```
jobs:
  - name: job_2
    type: runSh
    steps:
      - IN: myEnv
      - TASK:
          script:
            - echo $username
            - echo $password
```
