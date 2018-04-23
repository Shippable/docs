page_description: Using Terraform to provision an AWS VPC
main_section: Provision
sub_section: AWS infrastructure

# Provision AWS VPC with Terraform

This tutorial explains how to automate the provisioning of AWS Virtual Private Cloud(VPC) using Terraform.

This document assumes you're familiar with the following concepts:

* [AWS VPC](https://aws.amazon.com/documentation/vpc/)
* [Terraform aws_vpc](https://www.terraform.io/docs/providers/aws/d/vpc.html)
* [Terraform aws_internet_gateway](https://www.terraform.io/docs/providers/aws/d/internet_gateway.html)
* [Terraform aws_subnet](https://www.terraform.io/docs/providers/aws/d/subnet.html)
* [Terraform aws_route_table](https://www.terraform.io/docs/providers/aws/d/route_table.html)
* [Terraform aws_route_table_association](https://www.terraform.io/docs/providers/aws/r/route_table_association.html)
* [Terraform aws_security_group](https://www.terraform.io/docs/providers/aws/d/security_group.html)

If you're unfamiliar with Terraform, it would be good to start with learning how to provision infrastructure manually. Refer to our blog for a step-by-step tutorial: [Provision AWS VPC and EC2 with Terraform](http://blog.shippable.com/provision-ec2-vpc-terraform).

## Automating the provisioning of AWS VPC with Terraform

Next, we will demonstrate how you can easily automate your workflow using Shippable's Assembly Lines. The following Assembly Line features are particularly noteworthy for this scenario:

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

The following sections explain the process of automating a workflow to provision AWS VPC using Terraform. We will demonstrate this with our sample application.

**Source code is available at [devops-recipes/prov_aws_vpc_terraform](https://github.com/devops-recipes/prov_aws_vpc_terraform)**

**Complete YML is at [devops-recipes/prov_aws_vpc_terraform/shippable.yml](https://raw.githubusercontent.com/devops-recipes/prov_aws_vpc_terraform/master/shippable.yml)**

####1. Add necessary Account Integrations

Integrations are used to connect your Shippable workflow with external providers. More information about integrations is [here](/platform/tutorial/integration/howto-crud-integration/). We will use integrations for AWS Keys and Github for this sample.

#####1a. Add **AWS Keys** Integration

To be able to interact with AWS, we need to add the `drship_aws` integration.

Detailed steps on how to add an AWS Keys Integration are [here](/platform/integration//aws-keys/#creating-an-account-integration). Make sure you name the integration `drship_aws` since that is the name we're using in our sample automation scripts.

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step.

#####1b. Add `Github` Integration

In order to read your workflow configuration from Github, we need to add the `drship_github` integration. This points to the repository containing your Shippable workflow config file (`shippable.yml`) and Terraform script files.

In our case, we're using the repository [devops-recipes/prov_aws_vpc_terraform](https://github.com/devops-recipes/prov_aws_vpc_terraform).

Detailed steps on how to add a Github Integration are [here](/platform/integration/github/#creating-an-account-integration). Make sure you name the integration `drship_github` since that is the name we're using in our sample automation scripts.

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step.

####2. Author Assembly Line configuration

The platform is built with "Everything as Code" philosophy, so all configuration is in a YAML-based file called `shippable.yml`, which is parsed to create your Assembly Line workflow.

Detailed documentation on `shippable.yml` is [here](/deploy/configuration).

If you're using our sample code, `shippable.yml` already exists and you can use it with a few modifications.

#####2a. Add empty shippable.yml to your repo

Add an empty `shippable.yml` file to the the root of repository.

#####2b. Add `resources` section of the config

`resources` section holds the config info that is necessary to provision and AWS VPC. In this case we have 4 resources defined of type `integration`, `gitRepo`, `state` and `params`.

Add the following to your `shippable.yml`:

```
resources:
# Automation scripts repo
  - name: aws_vpc_tf_repo
    type: gitRepo
    integration: "drship_github"
    versionTemplate:
      sourceName: "devops-recipes/prov_aws_vpc_terraform"
      branch: master

# AWS credentials
  - name: aws_vpc_tf_creds
    type: integration
    integration: "drship_aws"

# Terraform State
  - name: aws_vpc_tf_state
    type: state

# Output of VPC provisioning
  - name: aws_vpc_tf_info
    type: params
    versionTemplate:
      params:
        SEED: "initial_version"
```

######i. gitRepo resource named `aws_vpc_tf_repo`

This resource points to the repository that contains your TF script files, so that they are accessible to your Assembly Line. For our example, these files are present in the repository [https://github.com/devops-recipes/prov_aws_vpc_terraform](https://github.com/devops-recipes/prov_aws_vpc_terraform), namely, [here](https://github.com/devops-recipes/prov_aws_vpc_terraform/tree/master).

Detailed info about `gitRepo` resource is [here](/platform/workflow/resource/gitrepo).

######ii. integration resource named `aws_vpc_tf_creds`

To be able to interact with AWS, you need creds. Your AWS credentials are securely stored in this integration, and you can extract them in your job when needed.

Detailed info about `integration` resource is [here](/platform/workflow/resource/integration).

######iii. state resource named `aws_vpc_tf_state`

Every apply of TF scripts generates a terraform.tfstate file. This is a very important file as it holds the state of your provisioning. TF looks for this file when you apply and if it is not present, it will recreate all you resources resulting in duplicate objects. We use the state resource to store this and make it available everytime we need to run the apply command.

Detailed info about `state` resource is [here](/platform/workflow/resource/state).

######iv. params resource named `aws_vpc_tf_info`

We store information like **vpc_id** and **subnet_id**, which are created during the execution of your playbook, in a `params` resource. Downstream jobs can access this information programmatically if required. For example, a separate jobs that provisions machines will need to know the VPC and Subnet IDs.

Detailed info about `params` resource is [here](/platform/workflow/resource/params).

#####2c. Add `jobs` section of the config

A job is an execution unit of the Assembly Line. Our job has to perform three tasks:

* Replace the wildcards needed by the Terraform scripts
* Run the playbook
* Output `vpc_id` and `subnet_id` into the `params` resource to make it available for downstream jobs

Add the following to your `shippable.yml`:

```
jobs:
# Provision AWS VPC with Terraform
  - name: prov_aws_vpc_tr
    type: runSh
    steps:
      - IN: aws_vpc_tf_repo
      - IN: aws_vpc_tf_creds
        switch: off
      - IN: aws_vpc_tf_state
        switch: off
      - TASK:
          name: prov_vpc
          runtime:
            options:
              env:
                - vpc_region: "us-east-1"
                - vpc_name: "demo_vpc_tf"
                - vpc_cidr_block: "10.10.0.0/16"
                - vpc_access_from_ip_range: "0.0.0.0/0"
                - vpc_public_subnet_1_cidr: "10.10.10.0/24"
          script:
            - pushd $(shipctl get_resource_state "aws_vpc_tf_repo")
            - export AWS_ACCESS_KEY_ID=$(shipctl get_integration_resource_field aws_vpc_tf_creds "accessKey")
            - export AWS_SECRET_ACCESS_KEY=$(shipctl get_integration_resource_field aws_vpc_tf_creds "secretKey")
            - shipctl copy_file_from_resource_state aws_vpc_tf_state terraform.tfstate .
            - shipctl replace terraform.tfvars
            - terraform plan -var-file=terraform.tfvars
            - terraform apply -var-file=terraform.tfvars
      - OUT: aws_vpc_tf_info
        overwrite: true
      - OUT: aws_vpc_tf_state
    on_success:
      script:
        - shipctl put_resource_state_multi aws_vpc_tf_info "versionName=$vpc_name" "vpc_id=$(terraform output vpc_id)" "vpc_region=$vpc_region" "vpc_public_sg_id=$(terraform output vpc_public_sg_id)" "vpc_public_sn_id=$(terraform output vpc_public_sn_id)"
    always:
      script:
        - shipctl copy_file_to_resource_state terraform.tfstate aws_vpc_tf_state
        - popd
```

* Adding the above config to the jobs section of shippable.yml will create a `runSh` job called `prov_aws_vpc_tr`.

* The first section of `steps` defines all the input `IN` resources that are required to execute this job.
  * TF script files are under the root folder and it is version controlled in a repo represented by `aws_vpc_tf_repo`.
  * Credentials to connect to AWS are in `aws_vpc_tf_creds`. This resource has `switch: off` flag which means any changes to it will not trigger this job automatically
  * `terraform.tfstate` file of the previous apply command is present in `aws_vpc_tf_state` which is needed to make sure we dont provision duplicate objects

* The `TASK` section contains the actual code that is executed when the job runs. We have just one task named `prov_vpc` which does the following:
  * First, we define environment variables required by the scripts-
    * `vpc_region` is the aws region where the VPC is going to be created
    * `vpc_name` is the name of the VPC
    * `vpc_cidr_block` is the address space of the VPC
    * `vpc_access_from_ip_range` is the IP range that you want to limit access to resources in this VPC. Here we are opening this up to WWW
    * `vpc_public_subnet_1_cidr` is the address range of the public subnet we are creating
  * `script` section has a list of commands to execute sequentially.
    * First, we use the Shippable utility function `get_resource_state` to go to the folder where TF scripts are stored
    * Next, we extract the AWS credentials from the `aws_vpc_tf_creds`resource, again using shipctl functions
    * Next, we fetch the `terraform.tfstate` file and copy it into the current folder using shipctl function on `aws_vpc_tf_state`
    * Next, we replace all wildcards in the `terraform.tfvars` file
    * Last, we apply TF scripts which should provision the VPC
  * `on_success` section is executed if the TASK succeeded. This step updates the `params` resource with `vpc_id`, `vpc_public_sg_id` and `vpc_public_sn_id` generated during the execution
  * `always` section is executed no matter what the outcome of TASK section was. Here we push the latest copy of `terraform.tfstate` back to `aws_vpc_tf_state` resource so that it is available for the next run with the latest state information. We need to do this in always section especially since TF does not rollback changes of a failed apply command

Detailed info about `runSh` job is [here](/platform/workflow/job/runsh).

Detailed info about Shippable Utility functions is [here](/platform/tutorial/workflow/using-shipctl).

#####2d. Push changes to shippable.yml

Commit and push all the above changes to `shippable.yml`.

####3. Add the Assembly Line to your Shippable organization

In Shippable's world, a Subscription maps to an Organization or a Team, depending on the source control provider. An Assembly Line workflow is defined at a Subscription level and all jobs are resources are global to your subscription.

To add your Assembly Line to Shippable, you need to add the repository containing the configuration as a "sync repository" by [following instructions here](/deploy/configuration/#adding-a-syncrepo). This automatically parses your `shippable.yml` config and adds your workflow to Shippable. Your workflow will always be kept in sync with the config in this repository, and be automatically updated every time you push a change to `shippable.yml`.

Your view will look something like this:

<img src="/images/tutorial/provision-aws-vpc-terraform-fig1.png" alt="Assembly Line view">

####4. Run the job `prov_aws_vpc_tr`

You can manually run the job by right clicking on the job and clicking on `Build job`, or by committing a change to your repository containing Terraform scripts.

<img src="/images/tutorial/provision-aws-vpc-terraform-fig2.png" alt="Build console output">

Confirm that the required VPC was created in AWS.

## Further Reading
* [Working with Integrations](/platform/tutorial/integration/howto-crud-integration/)
* [Defining Resources in shippable.yml](/platform/tutorial/workflow/shippable-yml/#resources-config)
* [Defining Jobs in shippable.yml](/platform/tutorial/workflow/shippable-yml/#jobs-config)
* [Sharing information between Jobs](/platform/tutorial/workflow/sharing-data-between-jobs/)
