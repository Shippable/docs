page_main_title: Inserting secrets in workflows
main_section: Platform
sub_section: Workflow
sub_sub_section: Tutorials

# Inserting secrets in jobs/workflows

If your workflow needs to access sensitive information like passwords, tokens, keys, etc, you need a way to insert these secrets at runtime, without including them in automation scripts. You also need a way to manage these secrets and update them without needing to update automation scripts.

An example of a job needing secrets is one that provisions an AWS instance. It would need your AWS access and secret keys in order to execute successfully.

Shippable offers three ways of inserting secrets into your jobs:

- We have a standard set of [Integrations](/platform/integration/overview) that let you store a wide variety of credentials. In particular, the [key-value](/platform/integration/key-value) integration lets you store any key-value pair with encryption at rest and in-flight.
- For `runSh` jobs, you can use the [`params` resource](/platform/workflow/resource/params) to inject encrypted secrets.
- For CI jobs, you can encrypt your secrets and set them in the `env` section of the config. This is explained in the CI docs for [secure environment variables](/ci/env-vars/#secure-variables)

Let us look at the methods with integrations and params in detail. Sample code for both these methods is available at [devops-recipes/platform_insert_secrets_in_jobs](https://github.com/devops-recipes/platform_insert_secrets_in_jobs).

## Using integrations

Integrations are the most powerful way of injecting secrets into your jobs/workflows. Here is how it works at a high level:

* A user creates an **Integration** to store a secret, and sets scope on the integration to specify which organization and/or repositories can have access to this specific integration. This ensures that secrets are not global across your organization and you can restrict access to selected repositories containing Shippable config files.
* Every integration has a friendly name. Your automation scripts use this friendly name to reference the secret. The nice thing about this is that if the secret changes in any way, you just update the integration, and do not need to touch any automation scripts.

A list of supported integrations is [available here](/platform/integration/overview). While we support a lot of specific third party integration such as [AWS keys](/platform/integration/aws-keys) and [GCP](/platform/integration/gcloudKey), we also offer a generic integration type called [Key-value](/platform/integration/key-value) which allows you to inject any secret you want.

The following instructions show you how to inject an integration into a `runSh` job.

### Instructions

* Create an integration for the secret you want to inject. Instructions to add an integration are [here](/platform/tutorial/integration/subscription-integrations/#create-sub-integration). While creating the integration, please ensure that you set scopes to include the project(s) that contains your **shippable.yml** config.
As an example, let us assume you created a **Docker Registry** integration with the following values for Docker Hub username and password:

```
username=admin
password=admin123
```

* Note down your integration name.

* Define an `integration` resource in your **shippable.yml**:

```
resources:
  - name: mySecret
    type: integration
    integration: myDockerHub  # Replace with the name you created in the earlier step

```

* Update your job to include the resource:

```
jobs:
  - name: test_secrets
    type: runSh
    steps:
      - IN: mySecret   # Specify the resource as an IN
      - TASK:
          name: test_integration   
          script:
            - DH_USR_NAME=$(shipctl get_integration_resource_field "mySecret" "username") # Retrieve username
            - DH_PASS=$(shipctl get_integration_resource_field "mySecret" "password") # Retrieve password
            - sudo docker login -u $DH_USR_NAME -p $DH_PASS

```

The `DH_USR_NAME` and `DH_PASS` environment variables will contain the right values that were set in your integration.

* Commit the changes above to **shippable.yml**. This will automatically update your existing workflow and you can run the job to verify that the right values are present. If this is a brand new workflow, you can add your config to Shippable by following [instructions here](/platform/tutorial/workflow/add-assembly-line).

Please note that to use the `shipctl` command, you will need the name of the field from the integration for which you want to retrieve the values. The name of the field should be specified in all lowercase letters and with all spaces removed. For example, the **Access Key ID** and **Secret Access Key** fields from an **AWS Keys** integration should be specified as `accesskeyid` and `secretaccesskey` respectively.


## Using params resource

The `params` resource allows you to define any key-value pairs in plain text or encrypted format in your **shippable.yml**. The main advantage of using a params resource is that you don't have to create and manage [integrations](/platform/integration/overview). The flip side of that is that your secrets will either be in clear text, or as an encrypted string that will need to be updated every time the secret changes. Due to this limitation, we recommend using the params resource to inject environment variables into jobs, and using integrations to inject secrets.

### Instructions

* If you want to encrypt your secrets, follow instructions [in this document](/platform/tutorial/security/encrypt-vars). Copy the encrypted string.

* Define a `params` resource in your **shippable.yml**. You can define key-values in plain text or copy the encrypted string as shown below:

```
resources:
  - name: mySecretParams
    type: params
    versionTemplate:
      params:
        MY_USERNAME: "admin"                    
        MY_PASSWORD: "admin123"                 
        secure: <encrypted value>               

```
A complete reference for `params` is [here](/platform/workflow/resource/params/)

* Update your job to include the resource:

```
jobs:
  - name: test_secrets
    type: runSh
    steps:
      - IN: mySecretParams   # Specify the resource as an IN
      - TASK:
          name: test_params   
          script:
            - echo $MY_USERNAME
            - echo $MY_PASSWORD
            - echo $TEST # The encrypted string was TEST=FOO

```

* Commit the changes above to **shippable.yml**. This will automatically update your existing workflow and you can run the job to verify that the right values are present. If this is a brand new workflow, you can add your config to Shippable by following [instructions here](/platform/tutorial/workflow/add-assembly-line).
