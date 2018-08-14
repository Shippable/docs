page_description: Using Terraform to provision Amazon Relational Database Service (RDS)
main_section: IT Ops
sub_section: AWS infrastructure
sub_sub_section: Provision Amazon Relational Database Service (RDS)

# Provision Amazon Relational Database Service (RDS) with Terraform

This tutorial explains how to automate the provisioning of Amazon Relational Database Service (RDS) using Terraform.

This document assumes you're familiar with the following concepts:

* [Amazon Relational Database Service (RDS)](https://aws.amazon.com/rds/)
* [Terraform aws_db_instance](https://www.terraform.io/docs/providers/aws/d/db_instance.html)
* [Terraform aws_db_subnet_group](https://www.terraform.io/docs/providers/aws/r/db_subnet_group.html)

There are many challenges with manually running terraform scripts. In short, you will struggle with making scripts reusable and injecting the right values for wildcards at runtime, and maintaining the right version of the Terraform state file. Also, if you have dependent workflows, you will have to manually go trigger each one.

If you want to achieve frictionless execution of Terraform scripts that are modular and reusable, you need to templatize your scripts and automate the workflow used to execute them.


## Automated provisioning of Amazon Relational Database Service (RDS) with Terraform

In this document, we will demonstrate how you can easily automate your workflow using Shippable's Assembly Lines. The following Assembly Line features are particularly noteworthy for this scenario:

* Creating an event-driven, automated workflow
* Securing workflow jobs with RBAC and contextually injecting credentials depending on who/what is running the Terraform scripts
* Dynamically injecting wildcard values in template files, depending on the state of the workflow
* Visualizing your workflow and it's current status in a graphical view

To jump into this tutorial, you will need to familiarize yourself with a few platform concepts.

### Concepts
* [Integrations](/platform/integration/overview/)
    * [AWS](/platform/integration/aws-keys)
    * [Github](/platform/integration/github)
* [Resources](/platform/workflow/resource/overview/)
    * [gitRepo](/platform/workflow/resource/gitrepo)
    * [integration](/platform/workflow/resource/integration)
    * [params](/platform/workflow/resource/params)
    * [state](/platform/workflow/resource/state)
* [Jobs](/platform/workflow/job/overview/)
    * [runSh](/platform/workflow/job/runsh)
* [shipctl utility](/platform/tutorial/workflow/using-shipctl/)

### Step by Step Instructions

The following sections explain the process of automating a workflow to provision Amazon Relational Database Service (RDS) using Terraform. We will demonstrate this with our sample application.

**Source code is available at [devops-recipes/prov_aws_rds_terraform](https://github.com/devops-recipes/prov_aws_rds_terraform)**

**YMLs are at the following locations**

- [devops-recipes/prov_aws_rds_terraform/shippable.yml](https://raw.githubusercontent.com/devops-recipes/prov_aws_rds_terraform/master/shippable.yml)
- [devops-recipes/prov_aws_rds_terraform/postgres/shippable.yml](https://raw.githubusercontent.com/devops-recipes/prov_aws_rds_terraform/master/postgres/shippable.yml)
- [devops-recipes/prov_aws_rds_terraform/mysql/shippable.yml](https://raw.githubusercontent.com/devops-recipes/prov_aws_rds_terraform/master/mysql/shippable.yml)

####1. Add Integrations

Integrations are used to connect your Shippable workflow with external providers. More information about integrations is [here](/platform/integration/overview/). We will use integrations for AWS Keys and Github for this sample.

#####1a. Add **AWS Keys** Integration

To be able to interact with AWS, we need to add the `dr_aws` integration.

Detailed steps on how to add an AWS Keys Integration are [here](/platform/integration/aws-keys/). Make sure you name the integration `dr_aws` since that is the name we're using in our sample automation scripts.

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step.

#####1b. Add **Github** Integration

In order to read your workflow configuration from Github, we need to add the `drship_github` integration. This points to the repository containing your Shippable workflow config file (**shippable.yml**) and Terraform script files.

In our case, we're using the repository [devops-recipes/prov_aws_rds_terraform](https://github.com/devops-recipes/prov_aws_rds_terraform).

Detailed steps on how to add a Github Integration are [here](/platform/integration/github/). Make sure you name the integration `drship_github` since that is the name we're using in our sample automation scripts.

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step.

#####1c. Add **Key-Value Pair** Integrations

In order to configure the databases with given username, password and databases name, we need to add a [Key-Value Pair integrations](/platform/integration/key-value/) named `drship_aws_rds_postgres_settings` and `drship_aws_rds_mysql_settings`.

`drship_aws_rds_postgres_settings` will have the following keys
- postgres_db_name
- postgres_db_username
- postgres_db_password

`drship_aws_rds_mysql_settings` will have the following keys
- mysql_db_name
- mysql_db_username
- mysql_db_password

####2. Author Assembly Line configuration

The platform is built with "Everything as Code" philosophy, so all configuration is in a YAML-based file called **shippable.yml**, which is parsed to create your Assembly Line workflow.

Detailed documentation on **shippable.yml** is [here](/platform/workflow/config/#assembly-lines-configuration).

#####2a. Add empty shippable.yml to your repo

We will add empty **shippable.yml** files to the following places in the repository.

- prov_aws_rds_terraform/shippable.yml
- prov_aws_rds_terraform/postgres/shippable.yml
- prov_aws_rds_terraform/mysql/shippable.yml

#####2b. Add `resources` section of common config

`resources` section holds the config info that is necessary to provision an Amazon Relational Database Service (RDS). In this case we have 2 resources defined of type `integration`, `gitRepo`.

Add the following to your **prov_aws_rds_terraform/shippable.yml**:

```
resources:
# Automation scripts repo
  - name: aws_rds_tf_repo
    type: gitRepo
    integration: "drship_github"
    versionTemplate:
      sourceName: "devops-recipes/prov_aws_rds_terraform"
      branch: master

# AWS credentials
  - name: aws_rds_tf_creds
    type: integration
    integration: "dr_aws"
```

######i. gitRepo resource named `aws_rds_tf_repo`

This resource points to the repository that contains your Terraform script files, so that they are accessible to your Assembly Line. For our example, these files are present in the repository [https://github.com/devops-recipes/prov_aws_rds_terraform](https://github.com/devops-recipes/prov_aws_rds_terraform), namely, [here](https://github.com/devops-recipes/prov_aws_rds_terraform/tree/master).

Detailed info about `gitRepo` resource is [here](/platform/workflow/resource/gitrepo).

######ii. integration resource named `aws_rds_tf_creds`

Your AWS credentials are securely stored in this integration.

To let Terraform interact with AWS, we will export `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` stored in this resource as environment variables at runtime.

Detailed info about `integration` resource is [here](/platform/workflow/resource/integration).

#####2c. Add `resources` section of postgres config

Add the following to your **prov_aws_rds_terraform/postgres/shippable.yml**:

```
resources:
# Terraform State of Amazon RDS Postgres provisioning
  - name: aws_rds_postgres_tf_state
    type: state

# Output of Amazon RDS Postgres provisioning
  - name: aws_rds_postgres_tf_info
    type: params
    versionTemplate:
      params:
        SEED: "initial_version"

# AWS RDS Postgres settings like db name, username, password
  - name: aws_rds_postgres_tf_settings
    type: integration
    integration: "drship_aws_rds_postgres_settings"
```

#####2d. Add `resources` section of mysql config

Add the following to your **prov_aws_rds_terraform/mysql/shippable.yml**:

```
resources:
# Terraform State of Amazon RDS MySQL provisioning
  - name: aws_rds_mysql_tf_state
    type: state

# Output of Amazon RDS MySQL provisioning
  - name: aws_rds_mysql_tf_info
    type: params
    versionTemplate:
      params:
        SEED: "initial_version"

# AWS RDS MySQL settings like db name, username, password
  - name: aws_rds_mysql_tf_settings
    type: integration
    integration: "drship_aws_rds_mysql_settings"
```

#####2e. Add `jobs` section of the config

A job is an execution unit of the Assembly Line. Our job has to perform three tasks:

* Replace the wildcards needed by the Terraform scripts
* Run `terraform apply` to run your scripts
* Output `configuration_endpoint`, `port`, `engine_version` etc. into the `params` resource to make it available for downstream jobs

Add the following to your **prov_aws_rds_terraform/postgres/shippable.yml**:

```
templates: &terraform-init
  - pushd "$(shipctl get_resource_state "aws_rds_tf_repo")/postgres"
  - export AWS_ACCESS_KEY_ID=$(shipctl get_integration_resource_field aws_rds_tf_creds "accessKey")
  - export AWS_SECRET_ACCESS_KEY=$(shipctl get_integration_resource_field aws_rds_tf_creds "secretKey")
  - shipctl copy_file_from_resource_state aws_rds_postgres_tf_state terraform.tfstate .
  - shipctl replace terraform.tfvars
  - terraform init

jobs:
# Provision Amazon RDS Postgres with Terraform
  - name: prov_aws_rds_postgres_tf
    type: runSh
    steps:
      - IN: aws_vpc_tf_info
      - IN: aws_rds_tf_repo
        switch: off
      - IN: aws_rds_tf_creds
        switch: off
      - IN: aws_rds_postgres_tf_state
        switch: off
      - IN: aws_rds_postgres_tf_settings
        switch: off
      - TASK:
          name: prov_aws_rds_postgres
          runtime:
            options:
              env:
                - aws_region: "us-east-1"
          script:
            - *terraform-init
            - terraform apply -auto-approve -var-file=terraform.tfvars
      - OUT: aws_rds_postgres_tf_info
        overwrite: true
      - OUT: aws_rds_postgres_tf_state
    on_success:
      script:
        - shipctl put_resource_state_multi aws_rds_postgres_tf_info "engine=$(terraform output engine)" "engine_version=$(terraform output engine_version)" "endpoint=$(terraform output endpoint)"
        - shipctl put_resource_state_multi aws_rds_postgres_tf_info "port=$(terraform output port)" "db_name=$(terraform output db_name)" "db_user=$(terraform output db_user)"
    always:
      script:
        - shipctl copy_file_to_resource_state terraform.tfstate aws_rds_postgres_tf_state
        - popd
    flags:
      - aws_rds
      - postgres
      - aws
      - terraform
```

* Adding the above config to the jobs section of shippable.yml will create a `runSh` job called `prov_aws_rds_postgres_tf`.

* The first section of `steps` defines all the input `IN` resources that are required to execute this job.
  * `aws_vpc_tf_info` injects environment variables like `vpc_public_sn_id` and `vpc_private_sg_id` which will be used while provisioning the Amazon Relational Database Service (RDS). Refer [Provision AWS VPC with Terraform](/provision/tutorial/provision-aws-vpc-terraform/) for its definition.
  * Terraform script files are under the respective folders and they are version controlled in a repository represented by `aws_rds_tf_repo`.
  * Credentials to connect to AWS are in `aws_rds_tf_creds`. This resource has `switch: off` flag which means any changes to it will not trigger this job automatically
  * The `aws_rds_postgres_tf_state` resource contains the `terraform.tfstate` file from previous executions of the `apply` command, which is needed to make sure we don't provision duplicate objects

* The `TASK` section contains actual code that is executed when the job runs. We have just one task named `prov_aws_rds_postgres` which does the following:
  * First, we define environment variables required by Terraform scripts-
    * `aws_region` is the aws region where the Amazon Relational Database Service (RDS) is going to be created
  * `script` section has a list of commands to execute sequentially.
    * First, we use the Shippable utility function `get_resource_state` to go to the folder where Terraform scripts are stored
    * Next, we extract the AWS credentials from the `aws_rds_tf_creds` resource, again using shipctl functions
    * Next, we fetch the `terraform.tfstate` file and copy it into the current folder using shipctl function on `aws_rds_postgres_tf_state`
    * Next, we replace all wildcards in the `terraform.tfvars` file
    * Last, we call `terraform apply`, which provisions the DB instance
  * `on_success` section is executed if the `TASK` section succeeds. This step updates the `params` resource with `endpoint`, `port`, `engine`, `engine_version`, `db_name` and `db_user` generated during the execution.
  * `always` section is executed no matter what the outcome of TASK section was. Here we push the latest copy of `terraform.tfstate` back to `aws_rds_postgres_tf_state` resource so that it is available for the next run with the latest state information. We need to do this in always section since Terraform does not rollback changes of a failed apply command

Add the following to your **prov_aws_rds_terraform/mysql/shippable.yml**:

```
templates: &terraform-init
  - pushd "$(shipctl get_resource_state "aws_rds_tf_repo")/mysql"
  - export AWS_ACCESS_KEY_ID=$(shipctl get_integration_resource_field aws_rds_tf_creds "accessKey")
  - export AWS_SECRET_ACCESS_KEY=$(shipctl get_integration_resource_field aws_rds_tf_creds "secretKey")
  - shipctl copy_file_from_resource_state aws_rds_mysql_tf_state terraform.tfstate .
  - shipctl replace terraform.tfvars
  - terraform init

jobs:
# Provision Amazon RDS MySQL with Terraform
  - name: prov_aws_rds_mysql_tf
    type: runSh
    steps:
      - IN: aws_vpc_tf_info
      - IN: aws_rds_tf_repo
        switch: off
      - IN: aws_rds_tf_creds
        switch: off
      - IN: aws_rds_mysql_tf_state
        switch: off
      - IN: aws_rds_mysql_tf_settings
        switch: off
      - TASK:
          name: prov_aws_rds_mysql
          runtime:
            options:
              env:
                - aws_region: "us-east-1"
          script:
            - *terraform-init
            - terraform apply -auto-approve -var-file=terraform.tfvars
      - OUT: aws_rds_mysql_tf_info
        overwrite: true
      - OUT: aws_rds_mysql_tf_state
    on_success:
      script:
        - shipctl put_resource_state_multi aws_rds_mysql_tf_info "engine=$(terraform output engine)" "engine_version=$(terraform output engine_version)" "endpoint=$(terraform output endpoint)"
        - shipctl put_resource_state_multi aws_rds_mysql_tf_info "port=$(terraform output port)" "db_name=$(terraform output db_name)" "db_user=$(terraform output db_user)"
    always:
      script:
        - shipctl copy_file_to_resource_state terraform.tfstate aws_rds_mysql_tf_state
        - popd
    flags:
      - aws_rds
      - mysql
      - aws
      - terraform
```

Detailed info about `runSh` job is [here](/platform/workflow/job/runsh).

Detailed info about Shippable Utility functions is [here](/platform/tutorial/workflow/using-shipctl).


#####2d. Push changes to shippable.yml

Commit and push all the above changes to the respective **shippable.yml** files.

####3. Add the Assembly Line to your Shippable organization

In Shippable's world, a Subscription maps to an Organization or a Team, depending on the source control provider. An Assembly Line workflow is defined at a Subscription level and all jobs are resources are global to your subscription.

To add your Assembly Line to Shippable, you need to add the repository containing the configuration as a "sync repository" by [following instructions here](/platform/tutorial/workflow/add-assembly-line). This automatically parses your **shippable.yml** config and adds your workflow to Shippable. Your workflow will always be kept in sync with the config in this repository, and be automatically updated every time you push a change to **shippable.yml**.

Your view will look something like this:

<img src="/images/tutorial/provision-aws-rds-terraform-fig1.png" alt="Assembly Line view">

####4. Run the job `prov_aws_rds_postgres_tf` and `prov_aws_rds_mysql_tf`

You can manually run the job by right clicking on the job and clicking on `Build job`, or by committing a change to your repository containing Terraform scripts.

<img src="/images/tutorial/provision-aws-rds-terraform-fig2.png" alt="Build console output">

Confirm that the required Postgres and MySQL databases were created in AWS.

## OPTIONAL: Automating the termination of Amazon Relational Database Service (RDS) with Terraform
You might also want to automatically Amazon Relational Database Service (RDS) when you no longer need them. A great example is if you want to spin up a complete on-demand test environment and destroy them once the tests pass.

The steps below demonstrate how to implement the automatic termination workflow.

### Step-by-Step Instructions

For this workflow, we start with the resources and jobs that were created in the provisioning tutorial above, and just add another job that will terminate the Amazon Relational Database Service (RDS) databases.

####1. Author Assembly Line configuration

In this step, we will add a new job to your **shippable.yml** that terminates an Amazon  Relational Database Service (RDS) using Terraform.

#####1a. Add `jobs` section of the config**

Our job will do the following:

* Export `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` as environment variables
* Replace wildcards needed by the Terraform scripts
* Initialize TF and run `terraform destroy`

```
# De-provision Amazon Relational Database Service (RDS) Postgres with Terraform
  - name: deprov_aws_rds_postgres_tf
    type: runSh
    steps:
      - IN: aws_rds_tf_repo
        switch: off
      - IN: aws_rds_postgres_tf_state
        switch: off
      - IN: aws_rds_tf_creds
        switch: off
      - IN: aws_rds_postgres_tf_info
        switch: off
      - TASK:
          name: deprov_aws_rds_postgres
          runtime:
            options:
              env:
                - aws_region: "us-east-1"
          script:
            - *terraform-init
            - terraform destroy -force -auto-approve -var-file=terraform.tfvars
      - OUT: aws_rds_postgres_tf_state
    always:
      script:
        - shipctl copy_file_to_resource_state terraform.tfstate aws_rds_postgres_tf_state
        - popd
    flags:
      - aws_rds
      - postgres
      - aws
      - terraform
```

* Adding the above config to the jobs section of shippable.yml will create a `runSh` job called `deprov_aws_rds_postgres_tf`.

* The first section of `steps` defines all the input `IN` resources that are required to execute this job.
  * Teraform script files are version controlled in a repo represented by `deprov_aws_rds_postgres_tf`.
  * Credentials to connect to AWS are in `aws_rds_tf_creds`. This resource has `switch: off` flag which means any changes to it will not trigger this job automatically
  * The Amazon Relational Database Service (RDS) provisioning job outputs the clusrer information to a resource `aws_ec2_tf_info`. This job will take that resource as an IN to determine which instance(s) to terminate.
  * The provisioning job outputs the DB information to a resource `aws_rds_postgres_tf_state`. This job will take that resource as an IN to determine where the cluster instances are.
* The `TASK` section contains the actual code that is executed when the job runs. We have just one task named `deprov_aws_rds_postgres` which does the following:
  *  `script` section has a list of commands that are executed sequentially.
    * First, we use the Shippable utility function `get_resource_state` to go to the folder where TF files are present
    * Next, we extract the AWS credentials from the `aws_rds_tf_creds` resource, again using shipctl functions
    * Next, we copy the TF state file using Shippable utility function `copy_file_from_resource_state`. This will restore the statefile so that TF knows what to delete
    * Next, we replace all wildcards in the variables file
    * Last, we run terraform destroy. This will use the statefile and clean up the instances that were provisoned
  * `always` section is executed no matter what the outcome of TASK section was. Here we push the latest copy of `terraform.tfstate` back to `aws_rds_postgres_tf_state` resource so that it is available for the next run with the latest state information. We need to do this in always section especially since Terraform does not rollback changes of a failed apply command

Detailed info about `runSh` job is [here](/platform/workflow/job/runsh).

Detailed info about Shippable Utility functions is [here](/platform/tutorial/workflow/using-shipctl).

####2. Push changes to shippable.yml

Commit and push all the above changes to **shippable.yml**.

This should automatically trigger the sync process to add all the changes to the assembly line. Your view should look something like this.

<img src="/images/tutorial/provision-aws-rds-terraform-fig3.png" alt="Assembly Line view">

Detailed info to hook your AL is [here](/platform/tutorial/workflow/add-assembly-line).

####3. Run the job `deprov_aws_rds_postgres_tf`

You can manually run the job by right clicking on the job or by triggering the job to terminate the Amazon Relational Database Service (RDS) cluster.

<img src="/images/tutorial/provision-aws-rds-terraform-fig4.png" alt="Build console output">

## OPTIONAL: Refactoring using YML templates

Currently there are two jobs `prov_aws_rds_postgres_tf` and `deprov_aws_rds_postgres_tf` which are used to provision and terminate Amazon Relational Database Service (RDS) cluster. By noticing the `TASK` section of both the jobs, we could notice that the first 6 commands are the same for both the jobs.

We could refactor our script by using [YML templating](/platform/workflow/job/runsh/#yml-templates).

### Step by Step Instructions

####1. Define YML template called `terraform-init`

Add template called `terraform-init` in `shippable.yml`. This template contains code for configuring the AWS credentials and doing `terraform init` in the directory containing the terraform scripts.

```
templates: &terraform-init
  - pushd $(shipctl get_resource_state "aws_rds_tf_repo")
  - export AWS_ACCESS_KEY_ID=$(shipctl get_integration_resource_field aws_rds_tf_creds "accessKey")
  - export AWS_SECRET_ACCESS_KEY=$(shipctl get_integration_resource_field aws_rds_tf_creds "secretKey")
  - shipctl copy_file_from_resource_state aws_rds_postgres_tf_state terraform.tfstate .
  - shipctl replace terraform.tfvars
  - terraform init
```

####2. Use `terraform-init` template in the jobs
Replace `*terraform-init` in the `script` section of the jobs, to reuse the template betweeen the jobs.

Previously the `script` section might look like
```
# prov_aws_rds_postgres_tf job
- TASK:
    name: prov_aws_rds_postgres
    runtime:
      options:
        env:
          - aws_region: "us-east-1"
    script:
      - pushd $(shipctl get_resource_state "aws_rds_tf_repo")
      - export AWS_ACCESS_KEY_ID=$(shipctl get_integration_resource_field aws_rds_tf_creds "accessKey")
      - export AWS_SECRET_ACCESS_KEY=$(shipctl get_integration_resource_field aws_rds_tf_creds "secretKey")
      - shipctl copy_file_from_resource_state aws_rds_postgres_tf_state terraform.tfstate .
      - shipctl replace terraform.tfvars
      - terraform init
      - terraform apply -auto-approve -var-file=terraform.tfvars

# deprov_aws_rds_postgres_tf
- TASK:
    name: deprov_aws_rds_postgres
    runtime:
      options:
        env:
          - aws_region: "us-east-1"
    script:
      - pushd $(shipctl get_resource_state "aws_rds_tf_repo")
      - export AWS_ACCESS_KEY_ID=$(shipctl get_integration_resource_field aws_rds_tf_creds "accessKey")
      - export AWS_SECRET_ACCESS_KEY=$(shipctl get_integration_resource_field aws_rds_tf_creds "secretKey")
      - shipctl copy_file_from_resource_state aws_rds_postgres_tf_state terraform.tfstate .
      - shipctl replace terraform.tfvars
      - terraform init
      - terraform destroy -force -auto-approve -var-file=terraform.tfvars
```

Now the `script` section of the jobs would look like

```
# prov_aws_rds_postgres_tf job
- TASK:
    name: prov_aws_rds_postgres
    runtime:
      options:
        env:
          - aws_region: "us-east-1"
    script:
      - *terraform-init
      - terraform apply -auto-approve -var-file=terraform.tfvar

# deprov_aws_rds_postgres_tf
- TASK:
    name: deprov_aws_rds_postgres
    runtime:
      options:
        env:
          - aws_region: "us-east-1"
    script:
      - *terraform-init
      - terraform destroy -force -auto-approve -var-file=terraform.tfvars
```

## Further Reading
* [Managing Integrations](/platform/tutorial/integration/subscription-integrations/)
* [Defining Resources in shippable.yml](/platform/workflow/config/#resources)
* [Defining Jobs in shippable.yml](/platform/workflow/config/#jobs)
* [Sharing information between Jobs](/platform/tutorial/workflow/share-info-across-jobs/)
