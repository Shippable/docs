page_description: Using Terraform to provision Amazon ElastiCache Memcached
main_section: IT Ops
sub_section: AWS infrastructure
sub_sub_section: Provision Amazon ElastiCache

# Provision Amazon ElastiCache Memcached with Terraform

This tutorial explains how to automate the provisioning of Amazon ElastiCache Memcached cluster using Terraform.

This document assumes you're familiar with the following concepts:

* [Amazon ElastiCache](https://aws.amazon.com/documentation/elasticache/)
* [Terraform aws_elasticache_cluster](https://www.terraform.io/docs/providers/aws/r/elasticache_cluster.html)
* [Terraform aws_elasticache_subnet_group](https://www.terraform.io/docs/providers/aws/r/elasticache_subnet_group.html)
* [Terraform aws_security_group](https://www.terraform.io/docs/providers/aws/d/security_group.html)

There are many challenges with manually running terraform scripts. In short, you will struggle with making scripts reusable and injecting the right values for wildcards at runtime, and maintaining the right version of the Terraform state file. Also, if you have dependent workflows, you will have to manually go trigger each one.

If you want to achieve frictionless execution of Terraform scripts that are modular and reusable, you need to templatize your scripts and automate the workflow used to execute them.


## Automated provisioning of Amazon ElastiCache Memcached with Terraform

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

The following sections explain the process of automating a workflow to provision Amazon ElastiCache Memcached using Terraform. We will demonstrate this with our sample application.

**Source code is available at [devops-recipes/prov_aws_memcached_terraform](https://github.com/devops-recipes/prov_aws_memcached_terraform)**

**Complete YML is at [devops-recipes/prov_aws_memcached_terraform/shippable.yml](https://raw.githubusercontent.com/devops-recipes/prov_aws_memcached_terraform/master/shippable.yml)**

####1. Add necessary Account Integrations

Integrations are used to connect your Shippable workflow with external providers. More information about integrations is [here](/platform/tutorial/integration/howto-crud-integration/). We will use integrations for AWS Keys and Github for this sample.

#####1a. Add **AWS Keys** Integration

To be able to interact with AWS, we need to add the `drship_aws` integration.

Detailed steps on how to add an AWS Keys Integration are [here](/platform/integration//aws-keys/#creating-an-account-integration). Make sure you name the integration `drship_aws` since that is the name we're using in our sample automation scripts.

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step.

#####1b. Add `Github` Integration

In order to read your workflow configuration from Github, we need to add the `drship_github` integration. This points to the repository containing your Shippable workflow config file (**shippable.yml**) and Terraform script files.

In our case, we're using the repository [devops-recipes/prov_aws_memcached_terraform](https://github.com/devops-recipes/prov_aws_memcached_terraform).

Detailed steps on how to add a Github Integration are [here](/platform/integration/github/#creating-an-account-integration). Make sure you name the integration `drship_github` since that is the name we're using in our sample automation scripts.

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step.

####2. Author Assembly Line configuration

The platform is built with "Everything as Code" philosophy, so all configuration is in a YAML-based file called **shippable.yml**, which is parsed to create your Assembly Line workflow.

Detailed documentation on **shippable.yml** is [here](/platform/workflow/config/#assembly-lines-configuration).

If you're using our sample code, **shippable.yml** already exists and you can use it with a few modifications.

#####2a. Add empty shippable.yml to your repo

Add an empty **shippable.yml** file to the the root of repository.

#####2b. Add `resources` section of the config

`resources` section holds the config info that is necessary to provision an AWS VPC. In this case we have 4 resources defined of type `integration`, `gitRepo`, `state` and `params`.

Add the following to your **shippable.yml**:

```
resources:
# Automation scripts repo
  - name: aws_memcached_tf_repo
    type: gitRepo
    integration: "drship_github"
    versionTemplate:
      sourceName: "devops-recipes/prov_aws_memcached_terraform"
      branch: master

# AWS credentials
  - name: aws_memcached_tf_creds
    type: integration
    integration: "drship_aws"

# Terraform State
  - name: aws_memcached_tf_state
    type: state

# Output of Amazon ElastiCache Memcached provisioning
  - name: aws_memcached_tf_info
    type: params
    versionTemplate:
      params:
        SEED: "initial_version"
```

######i. gitRepo resource named `aws_memcached_tf_repo`

This resource points to the repository that contains your Terraform script files, so that they are accessible to your Assembly Line. For our example, these files are present in the repository [https://github.com/devops-recipes/prov_aws_memcached_terraform](https://github.com/devops-recipes/prov_aws_memcached_terraform), namely, [here](https://github.com/devops-recipes/prov_aws_memcached_terraform/tree/master).

Detailed info about `gitRepo` resource is [here](/platform/workflow/resource/gitrepo).

######ii. integration resource named `aws_memcached_tf_creds`

Your AWS credentials are securely stored in this integration.

To let Terraform interact with AWS, we will export `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` stored in this resource as environment variables at runtime.

Detailed info about `integration` resource is [here](/platform/workflow/resource/integration).

######iii. state resource named `aws_memcached_tf_state`

Every time you execute `terraform apply`, Terraform generates a **terraform.tfstate** file, which contains the state of your provisioning activity. If the file is already present, it simply updates state information each time. It is important to have this file in the right place, since Terraform will recreate all resources again if it doesn't find it, resulting in duplicate objects.  

The state resource `aws_memcached_tf_state` is used in our example to store this state file and make it available to any job that executes the `terraform apply` command.

Detailed info about `state` resource is [here](/platform/workflow/resource/state).

######iv. params resource named `aws_memcached_tf_info`

We store information like **vpc_id** and **subnet_id**, which are created during the execution of your scripts, in a `params` resource. Downstream jobs can access this information programmatically if required. For example, a separate job that provisions machines will need to know the VPC and Subnet IDs.

Detailed info about `params` resource is [here](/platform/workflow/resource/params).

#####2c. Add `jobs` section of the config

A job is an execution unit of the Assembly Line. Our job has to perform three tasks:

* Replace the wildcards needed by the Terraform scripts
* Run `terraform apply` to run your scripts
* Output `configuration_endpoint`, `port`, `engine_version` etc. into the `params` resource to make it available for downstream jobs

Add the following to your **shippable.yml**:

```
jobs:
# Provision Amazon ElastiCache Memcached with Terraform
  - name: prov_aws_memcached_tf
    type: runSh
    steps:
      - IN: aws_vpc_tf_info
      - IN: aws_memcached_tf_repo
        switch: off
      - IN: aws_memcached_tf_state
        switch: off
      - IN: aws_memcached_tf_creds
        switch: off
      - TASK:
          name: prov_aws_elasticache_memcached
          runtime:
            options:
              env:
                - aws_region: "us-east-1"
          script:
            - pushd $(shipctl get_resource_state "aws_memcached_tf_repo")
            - export AWS_ACCESS_KEY_ID=$(shipctl get_integration_resource_field aws_memcached_tf_creds "accessKey")
            - export AWS_SECRET_ACCESS_KEY=$(shipctl get_integration_resource_field aws_memcached_tf_creds "secretKey")
            - shipctl copy_file_from_resource_state aws_memcached_tf_state terraform.tfstate .
            - shipctl replace terraform.tfvars
            - terraform init
            - terraform apply -auto-approve -var-file=terraform.tfvars
      - OUT: aws_memcached_tf_info
        overwrite: true
      - OUT: aws_memcached_tf_state
    on_success:
      script:
        - shipctl put_resource_state_multi aws_memcached_tf_info "versionName=$(terraform output configuration_endpoint)" "configuration_endpoint=$(terraform output configuration_endpoint)"
        - shipctl put_resource_state_multi aws_memcached_tf_info "port=$(terraform output port)" "engine_version=$(terraform output engine_version)" "num_cache_nodes=$(terraform output num_cache_nodes)"
        - shipctl put_resource_state_multi aws_memcached_tf_info "cache_node_0_address=$(terraform output cache_node_0_address)" "cache_node_1_address=$(terraform output cache_node_1_address)"
        - shipctl put_resource_state_multi aws_memcached_tf_info "subnet_id=$(terraform output subnet_id)" "subnet_group_name=$(terraform output subnet_group_name)"
    always:
      script:
        - shipctl copy_file_to_resource_state terraform.tfstate aws_memcached_tf_state
        - popd
    flags:
      - aws_elasticache
      - memcached
      - aws
      - terraform
```

* Adding the above config to the jobs section of shippable.yml will create a `runSh` job called `prov_aws_memcached_tf`.

* The first section of `steps` defines all the input `IN` resources that are required to execute this job.
  * `aws_vpc_tf_info` injects environment variables like `vpc_public_sn_id` and `vpc_private_sg_id` which will be used while provisioning the Amazon ElastiCache Memcached cluster.
  * Terraform script files are under the root folder and it is version controlled in a repository represented by `aws_memcached_tf_repo`.
  * Credentials to connect to AWS are in `aws_memcached_tf_creds`. This resource has `switch: off` flag which means any changes to it will not trigger this job automatically
  * The `aws_memcached_tf_state` resource contains the `terraform.tfstate` file from previous executions of the `apply` command, which is needed to make sure we don't provision duplicate objects

* The `TASK` section contains actual code that is executed when the job runs. We have just one task named `prov_aws_elasticache_memcached` which does the following:
  * First, we define environment variables required by Terraform scripts-
    * `vpc_region` is the aws region where the VPC is going to be created
  * `script` section has a list of commands to execute sequentially.
    * First, we use the Shippable utility function `get_resource_state` to go to the folder where Terraform scripts are stored
    * Next, we extract the AWS credentials from the `aws_memcached_tf_creds` resource, again using shipctl functions
    * Next, we fetch the `terraform.tfstate` file and copy it into the current folder using shipctl function on `aws_memcached_tf_state`
    * Next, we replace all wildcards in the `terraform.tfvars` file
    * Last, we call `terraform apply`, which provisions the Memcached cluster
  * `on_success` section is executed if the `TASK` section succeeds. This step updates the `params` resource with `configuration_endpoint`, `port`, `engine_version`, `num_cache_nodes`, `cache_node_0_address` and `cache_node_1_address` generated during the execution
  * `always` section is executed no matter what the outcome of TASK section was. Here we push the latest copy of `terraform.tfstate` back to `aws_memcached_tf_state` resource so that it is available for the next run with the latest state information. We need to do this in always section since Terraform does not rollback changes of a failed apply command

Detailed info about `runSh` job is [here](/platform/workflow/job/runsh).

Detailed info about Shippable Utility functions is [here](/platform/tutorial/workflow/using-shipctl).

#####2d. Push changes to shippable.yml

Commit and push all the above changes to **shippable.yml**.

####3. Add the Assembly Line to your Shippable organization

In Shippable's world, a Subscription maps to an Organization or a Team, depending on the source control provider. An Assembly Line workflow is defined at a Subscription level and all jobs are resources are global to your subscription.

To add your Assembly Line to Shippable, you need to add the repository containing the configuration as a "sync repository" by [following instructions here](/platform/tutorial/workflow/add-assembly-line). This automatically parses your **shippable.yml** config and adds your workflow to Shippable. Your workflow will always be kept in sync with the config in this repository, and be automatically updated every time you push a change to **shippable.yml**.

Your view will look something like this:

<img src="/images/tutorial/provision-aws-memcached-terraform-fig1.png" alt="Assembly Line view">

####4. Run the job `prov_aws_memcached_tf`

You can manually run the job by right clicking on the job and clicking on `Build job`, or by committing a change to your repository containing Terraform scripts.

<img src="/images/tutorial/provision-aws-vpc-terraform-fig2.png" alt="Build console output">

Confirm that the required VPC was created in AWS.

## OPTIONAL: Automating the termination of Amazon ElastiCache Memcached with Terraform
You might also want to automatically Amazon ElastiCache Memcached when you no longer need them. A great example is if you want to spin up a complete on-demand test environment and destroy them once the tests pass.

The steps below demonstrate how to implement the automatic termination workflow.

### Step-by-Step Instructions

For this workflow, we start with the resources and jobs that were created in the provisioning tutorial above, and just add another job that will terminate the Amazon ElastiCache Memcached cluster.

####1. Author Assembly Line configuration

In this step, we will add a new job to your **shippable.yml** that terminates an Amazon ElastiCache cluster using Terraform.

#####1a. Add `jobs` section of the config**

Our job will do the following:

* Export `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` as environment variables
* Replace wildcards needed by the Terraform scripts
* Initialize TF and run `terraform destroy`

```
# De-provision Amazon ElastiCache Memcached with Terraform
  - name: deprov_aws_memcached_tf
    type: runSh
    steps:
      - IN: aws_memcached_tf_repo
        switch: off
      - IN: aws_memcached_tf_state
        switch: off
      - IN: aws_memcached_tf_creds
        switch: off
      - IN: aws_memcached_tf_info
        switch: off
      - TASK:
          name: deprov_aws_elasticache_memcached
          runtime:
            options:
              env:
                - aws_region: "us-east-1"
          script:
            - pushd $(shipctl get_resource_state "aws_memcached_tf_repo")
            - export AWS_ACCESS_KEY_ID=$(shipctl get_integration_resource_field aws_memcached_tf_creds "accessKey")
            - export AWS_SECRET_ACCESS_KEY=$(shipctl get_integration_resource_field aws_memcached_tf_creds "secretKey")
            - shipctl copy_file_from_resource_state aws_memcached_tf_state terraform.tfstate .
            - shipctl replace terraform.tfvars
            - terraform init
            - terraform destroy -force -auto-approve -var-file=terraform.tfvars
      - OUT: aws_memcached_tf_state
    always:
      script:
        - shipctl copy_file_to_resource_state terraform.tfstate aws_memcached_tf_state
        - popd
    flags:
      - aws_elasticache
      - memcached
      - aws
      - terraform
```

* Adding the above config to the jobs section of shippable.yml will create a `runSh` job called `deprov_aws_memcached_tf`.

* The first section of `steps` defines all the input `IN` resources that are required to execute this job.
  * Teraform script files are version controlled in a repo represented by `deprov_aws_memcached_tf`.
  * Credentials to connect to AWS are in `aws_memcached_tf_creds`. This resource has `switch: off` flag which means any changes to it will not trigger this job automatically
  * The Amazon ElastiCache Memcached provisioning job outputs the clusrer information to a resource `aws_ec2_tf_info`. This job will take that resource as an IN to determine which instance(s) to terminate.
  * The VPC provisioning job outputs the VPC information to a resource `aws_memcached_tf_info`. This job will take that resource as an IN to determine where the cluster instances are.
* The `TASK` section contains the actual code that is executed when the job runs. We have just one task named `deprov_aws_elasticache_memcached` which does the following:
  *  `script` section has a list of commands that are executed sequentially.
    * First, we use the Shippable utility function `get_resource_state` to go to the folder where TF files are present
    * Next, we extract the AWS credentials from the `aws_memcached_tf_creds` resource, again using shipctl functions
    * Next, we copy the TF state file using Shippable utility function `copy_file_from_resource_state`. This will restore the statefile so that TF knows what to delete
    * Next, we replace all wildcards in the variables file
    * Last, we run terraform destroy. This will use the statefile and clean up the instances that were provisoned
  * `always` section is executed no matter what the outcome of TASK section was. Here we push the latest copy of `terraform.tfstate` back to `aws_memcached_tf_state` resource so that it is available for the next run with the latest state information. We need to do this in always section especially since Terraform does not rollback changes of a failed apply command

Detailed info about `runSh` job is [here](/platform/workflow/job/runsh).

Detailed info about Shippable Utility functions is [here](/platform/tutorial/workflow/using-shipctl).

####2. Push changes to shippable.yml

Commit and push all the above changes to **shippable.yml**.

This should automatically trigger the sync process to add all the changes to the assembly line. Your view should look something like this.

<img src="/images/tutorial/provision-aws-memcached-terraform-fig3.png" alt="Assembly Line view">

Detailed info to hook your AL is [here](/platform/tutorial/workflow/add-assembly-line).

####3. Run the job `deprov_aws_memcached_tf`

You can manually run the job by right clicking on the job or by triggering the job to terminate the Amazon ElastiCache Memcached cluster.

<img src="/images/tutorial/provision-aws-memcached-terraform-fig4.png" alt="Build console output">

## OPTIONAL: Refactoring using YML templates

Currently there are two jobs `prov_aws_memcached_tf` and `deprov_aws_memcached_tf` which are used to provision and terminate Amazon ElastiCache Memcached cluster. By noticing the `TASK` section of both the jobs, we could notice that the first 6 commands are the same for both the jobs.

We could refactor our script by using [YML templating](/platform/workflow/job/runsh/#yml-templates).

### Step by Step Instructions

####1. Define YML template called `terraform-init`

Add template called `terraform-init` in `shippable.yml`. This template contains code for configuring the AWS credentials and doing `terraform init` in the directory containing the terraform scripts.

```
templates: &terraform-init
  - pushd $(shipctl get_resource_state "aws_memcached_tf_repo")
  - export AWS_ACCESS_KEY_ID=$(shipctl get_integration_resource_field aws_memcached_tf_creds "accessKey")
  - export AWS_SECRET_ACCESS_KEY=$(shipctl get_integration_resource_field aws_memcached_tf_creds "secretKey")
  - shipctl copy_file_from_resource_state aws_memcached_tf_state terraform.tfstate .
  - shipctl replace terraform.tfvars
  - terraform init
```

####2. Use `terraform-init` template in the jobs
Replace `*terraform-init` in the `script` section of the jobs, to reuse the template betweeen the jobs.

Previously the `script` section might look like
```
# prov_aws_memcached_tf job
- TASK:
    name: prov_aws_elasticache_memcached
    runtime:
      options:
        env:
          - aws_region: "us-east-1"
    script:
      - pushd $(shipctl get_resource_state "aws_memcached_tf_repo")
      - export AWS_ACCESS_KEY_ID=$(shipctl get_integration_resource_field aws_memcached_tf_creds "accessKey")
      - export AWS_SECRET_ACCESS_KEY=$(shipctl get_integration_resource_field aws_memcached_tf_creds "secretKey")
      - shipctl copy_file_from_resource_state aws_memcached_tf_state terraform.tfstate .
      - shipctl replace terraform.tfvars
      - terraform init
      - terraform apply -auto-approve -var-file=terraform.tfvars

# deprov_aws_memcached_tf
- TASK:
    name: deprov_aws_elasticache_memcached
    runtime:
      options:
        env:
          - aws_region: "us-east-1"
    script:
      - pushd $(shipctl get_resource_state "aws_memcached_tf_repo")
      - export AWS_ACCESS_KEY_ID=$(shipctl get_integration_resource_field aws_memcached_tf_creds "accessKey")
      - export AWS_SECRET_ACCESS_KEY=$(shipctl get_integration_resource_field aws_memcached_tf_creds "secretKey")
      - shipctl copy_file_from_resource_state aws_memcached_tf_state terraform.tfstate .
      - shipctl replace terraform.tfvars
      - terraform init
      - terraform destroy -force -auto-approve -var-file=terraform.tfvars
```

Now the `script` section of the jobs would look like

```
# prov_aws_memcached_tf job
- TASK:
    name: prov_aws_elasticache_memcached
    runtime:
      options:
        env:
          - aws_region: "us-east-1"
    script:
      - *terraform-init
      - terraform apply -auto-approve -var-file=terraform.tfvar

# deprov_aws_memcached_tf
- TASK:
    name: deprov_aws_elasticache_memcached
    runtime:
      options:
        env:
          - aws_region: "us-east-1"
    script:
      - *terraform-init
      - terraform destroy -force -auto-approve -var-file=terraform.tfvars
```

## Further Reading
* [Working with Integrations](/platform/tutorial/integration/howto-crud-integration/)
* [Defining Resources in shippable.yml](/platform/workflow/config/#resources)
* [Defining Jobs in shippable.yml](/platform/workflow/config/#jobs)
* [Sharing information between Jobs](/platform/tutorial/workflow/share-info-across-jobs/)
