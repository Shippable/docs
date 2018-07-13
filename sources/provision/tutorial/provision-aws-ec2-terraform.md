page_main_title: Provision AWS EC2 virtual machine with Terraform
page_description: Using Terraform to provision an AWS EC2 virtual machine
main_section: IT Ops
sub_section: AWS infrastructure
sub_sub_section: Provision EC2 machines

# Provision AWS EC2 virtual machine with Terraform

This tutorial explains how to automate the provisioning of an AWS EC2 virtual machine using Terraform.

This document assumes you're familiar with the following concepts:

* [AWS EC2](https://aws.amazon.com/documentation/ec2/)
* [Terraform overview](https://www.terraform.io/intro/index.html)
* [Terraform aws_instance](https://www.terraform.io/docs/providers/aws/r/instance.html)

If you're unfamiliar with Terraform, it would be good to start with learning how to provision infrastructure manually with scripts. Refer to our blog for a step-by-step tutorial: [Provision AWS EC2 Virtual Machine with Terraform](http://blog.shippable.com/provision-aws-ec2-virtual-machines-with-terraform).

There are many challenges with manually running Terraform scripts. In short, you will struggle with always maintaining the state file, making Terraform templates reusable by injecting the right values for wildcards at runtime, and managing security and accounts on the machine used to run the script. Also, if you have dependent workflows, you will have to manually go trigger each one.

If you want to achieve frictionless execution of Terraform templates, you need to templatize your scripts and automate the workflow used to execute them.


## Automated workflow to provision an AWS EC2 instance with Terraform

You can easily automate your workflow using Shippable's Assembly Lines. The following Assembly Line features are particularly noteworthy for this scenario:

* Creating an event-driven, automated workflow
* Securing workflow jobs with RBAC and contextually injecting credentials depending on who/what is running your scripts
* Dynamically injecting wildcard values in templates, depending on the state of the workflow
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

This example extends the work done in our tutorial to [Provisioning an AWS VPC using Terraform](/provision/tutorial/provision-aws-vpc-terraform) by adding an Assembly Line that provisioning an EC2 instance in the VPC. However, you can also use it as a standalone tutorial by hardcoding values for subnet and security group IDs.

### Step by Step Instructions

The following sections explain the process of automating a workflow to provision an AWS EC2 machine using Terraform. We will demonstrate this with our sample application.

**Source code is available at [devops-recipes/prov_aws_ec2_terraform](https://github.com/devops-recipes/prov_aws_ec2_terraform)**

**Complete YML is at [devops-recipes/prov_aws_ec2_terraform/shippable.yml](https://raw.githubusercontent.com/devops-recipes/prov_aws_ec2_terraform/master/shippable.yml)**

Your workflow will look like this, where the green box is the job that runs your terraform script, while the grey boxes are input resources that are required for your scripts:

<img src="/images/tutorial/provision-aws-ec2-terraform-fig1.png" alt="Assembly Line view">

####1. Add necessary Account Integrations

Integrations are used to connect your Shippable workflow with external providers. More information about integrations is [here](/platform/tutorial/integration/howto-crud-integration/). We will use integrations for AWS Keys and Github for this sample.

#####1a. Add AWS Keys Integration

To be able to interact with AWS, we need to add the `drship_aws` integration.

Detailed steps on how to add an AWS Keys Integration are [here](/platform/integration/aws-keys/#creating-an-account-integration). Make sure you name the integration `drship_aws` since that is the name we're using in our sample automation scripts.

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step.

#####1b. Add Github Integration

In order to read your workflow configuration from Github, we need to add the `drship_github` integration. This points to the repository containing your Shippable workflow config file (**shippable.yml**) and Terraform script files.

In our case, we're using the repository [devops-recipes/prov_aws_ec2_terraform](https://github.com/devops-recipes/prov_aws_ec2_terraform).

Detailed steps on how to add a Github Integration are [here](/platform/integration/github/#creating-an-account-integration). Make sure you name the integration `drship_github` since that is the name we're using in our sample automation scripts.

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step.

####2. Author Assembly Line configuration

The platform is built with "Everything as Code" philosophy, so all configuration is in a YAML-based file called **shippable.yml**, which is parsed to create your Assembly Line workflow.

Detailed documentation on **shippable.yml** is [here](/platform/workflow/config/#assembly-lines-configuration).

If you're using our sample code, **shippable.yml** already exists and you can use it with a few modifications.

#####2a. Add empty shippable.yml to your repo

Add an empty **shippable.yml** file to the the root of repository.

#####2b. Add `resources` section of the config

`resources` section holds the config info that is necessary to provision and EC2 instance. In this case we have 4 resources defined of type `integration`, `gitRepo`, `state` and `params`.

```
resources:
# Automation scripts repo
  - name: aws_ec2_tf_repo
    type: gitRepo
    integration: "drship_github"
    versionTemplate:
      sourceName: "devops-recipes/prov_aws_ec2_terraform"
      branch: master

# AWS credentials
  - name: aws_ec2_tf_creds
    type: integration
    integration: "drship_aws"

# Terraform State
  - name: aws_ec2_tf_state
    type: state

# Output of ec2 provisioning
  - name: aws_ec2_tf_info
    type: params
    versionTemplate:
      params:
        SEED: "initial_version"
```

######i. gitRepo resource named `aws_ec2_tf_repo`

This resource points to the repository that contains your Terraform script files, so that they are accessible to your Assembly Line. For our example, these files are present in the repository [https://github.com/devops-recipes/prov_aws_ec2_terraform](https://github.com/devops-recipes/prov_aws_ec2_terraform), namely, [here](https://github.com/devops-recipes/prov_aws_ec2_terraform/tree/master).

Detailed info about `gitRepo` resource is [here](/platform/workflow/resource/gitrepo).

######ii. integration resource named `aws_ec2_tf_creds`

Your AWS credentials are securely stored in this integration.

To let Terraform interact with AWS, we will export `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` stored in this resource as environment variables at runtime.

Detailed info about `integration` resource is [here](/platform/workflow/resource/integration).

######iii. state resource named `aws_ec2_tf_state`

Every apply of Terraform scripts generates a **terraform.tfstate** file. This is a very important file as it holds the state of your provisioning. Terraform looks for this file when you apply and if it is not present, it will recreate all you resources, resulting in duplicate objects. We use the state resource to store the state file and make it available every time we run the apply command.

Detailed info about `state` resource is [here](/platform/workflow/resource/state).

######iv. params resource named `aws_ec2_tf_info`

We store information like **ec2_ins_0_ip**, which is created during the execution of your scripts, in a `params` resource. Downstream jobs can access this information programmatically if required. For example, a separate jobs that deploys to the machine will need to know the instance IP.

Detailed info about `params` resource is [here](/platform/workflow/resource/params).

#####2c. Add `jobs` section of the config

A job is an execution unit of the Assembly Line. Our job has to perform four tasks:

* Replace wildcards needed by the Terraform scripts
* Export `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` as environment variables
* Run script
* Output `instance_ip` into the `params` resource to make it available for downstream jobs

```
jobs:
# Provision AWS ec2 with Terraform
  - name: prov_aws_ec2_tf
    type: runSh
    steps:
      - IN: aws_vpc_tf_info
      - IN: aws_ec2_tf_repo
        switch: off
      - IN: aws_ec2_tf_state
        switch: off
      - IN: aws_ec2_tf_creds
        switch: off
      - TASK:
          name: prov_ec2
          runtime:
            options:
              env:
                - inst_type: "t2.micro"
                - inst_ami: "ami-43a15f3e"
                - aws_key_name: "dr_us_east_1"
          script:
            - pushd $(shipctl get_resource_state "aws_ec2_tf_repo")
            - export AWS_ACCESS_KEY_ID=$(shipctl get_integration_resource_field aws_ec2_tf_creds "accessKey")
            - export AWS_SECRET_ACCESS_KEY=$(shipctl get_integration_resource_field aws_ec2_tf_creds "secretKey")
            - shipctl copy_file_from_resource_state aws_ec2_tf_state terraform.tfstate .
            - shipctl replace terraform.tfvars
            - terraform plan -var-file=terraform.tfvars
            - terraform apply -var-file=terraform.tfvars
      - OUT: aws_ec2_tf_info
        overwrite: true
      - OUT: aws_ec2_tf_state
    on_success:
      script:
        - shipctl put_resource_state_multi aws_ec2_tf_info "versionName=$(terraform output ec2_ins_0_ip)" "ec2_ins_0_ip=$(terraform output ec2_ins_0_ip)"
    always:
      script:
        - shipctl copy_file_to_resource_state terraform.tfstate aws_ec2_tf_state
        - popd
```

* Adding the above config to the jobs section of shippable.yml will create a `runSh` job called `prov_aws_ec2_tf`.

* The first section of `steps` defines all the input `IN` resources that are required to execute this job.
    * Terraform script files are version controlled in a repo represented by `aws_ec2_tf_repo`.
    * Credentials to connect to AWS are in `aws_ec2_tf_creds`. This resource has `switch: off` flag, so any changes to it will not trigger this job automatically
    * `aws_vpc_tf_info` is a **params** resource that comes from another tutorial [which explains how to provision a VPC](/provision/tutorial/provision-aws-vpc-terraform) and contains the `vpc_region`, `vpc_public_sn_id` and `vpc_public_sg_id`, which are required to provision your instance. If you already have a VPC and just want to use this tutorial to provision an instance, just delete this resource and hardcode the values in the **TASK.runtime.options.env** section.

* The `TASK` section contains the actual code that is executed when the job runs. We have just one task named `prov_ec2` which does the following:
  * First, we define environment variables required by the scripts-
    * `inst_type` is the type of instance
    * `inst_ami` is the AMI used to provision this instance
    * `aws_key_name` is name of the AWS Key pair used to provision this instance
    * `vpc_region` is implicitly set from `aws_vpc_tf_info`. If you deleted that resource, hardcode this here
    * `vpc_public_sg_id` is implicitly set from `aws_vpc_tf_info`. If you deleted that resource, hardcode this here
    * `vpc_public_sn_id` is implicity set from `aws_vpc_tf_info`. If you deleted that resource, hardcode this here
  * `script` section has a list of commands which will be executed sequentially.
    * First, we use the Shippable utility function `get_resource_state` to go to the folder where Terraform scripts are stored
    * Next, we extract the AWS credentials from the `aws_ec2_tf_creds`resource, again using shipctl functions
    * Next, we replace all wildcards in the file `terraform.tfvars`
    * Last, we apply the scripts
  * `on_success` section is executed if the TASK succeeded. This step updates the `params` resource with `ec2_ins_0_ip` generated during the execution
  * `always` section is executed no matter what the outcome of TASK section was. Here we push the latest copy of `terraform.tfstate` back to `aws_ec2_tf_state` resource so that it is available for the next run with the latest state information. We need to do this in always section especially since Terraform does not rollback changes of a failed apply command

Detailed info about `runSh` job is [here](/platform/workflow/job/runsh).

Detailed info about Shippable Utility functions are [here](/platform/tutorial/workflow/using-shipctl).

#####2d. Push changes to shippable.yml

Commit and push all the above changes to **shippable.yml**.

####3. Add the Assembly Line to your Shippable organization

In Shippable's world, a Subscription maps to an Organization or a Team, depending on the source control provider. An Assembly Line workflow is defined at a Subscription level and all jobs are resources are global to your subscription.

To add your Assembly Line to Shippable, you need to add the repository containing the configuration as a "sync repository" by [following instructions here](/platform/tutorial/workflow/add-assembly-line). This automatically parses your **shippable.yml** config and adds your workflow to Shippable. Your workflow will always be kept in sync with the config in this repository, and be automatically updated every time you push a change to **shippable.yml**.

Your view will look something like this:

<img src="/images/tutorial/provision-aws-ec2-terraform-fig1.png" alt="Assembly Line view">

####4. Run the build job `prov_aws_ec2_tf`

You can manually run the job by right clicking on the job and clicking on **Build job**, or by committing a change to your repository containing Terraform scripts.

<img src="/images/tutorial/provision-aws-ec2-terraform-fig2.png" alt="Build console output">

Confirm that the required EC2 instance was created in AWS.

## OPTIONAL: Automating the termination of AWS EC2 with Terraform

You might also want to automatically terminate EC2 instances when you no longer need them. A great example is if you want to spin up a complete on-demand test environment and destroy them is tests pass.

The steps below demonstrate how to implement the automatic termination workflow.

### Step-by-Step Instructions

For this workflow, we start with the resources and jobs that were created in the provisioning tutorial above, and just add another job that will terminate the EC2 instance.

####1. Author Assembly Line configuration

In this step, we will add a new job to your **shippable.yml** that terminates an EC2 instance using Terraform.

#####1a. Add `jobs` section of the config**

Our job will do the following:

* Read information from `IN` resources, including `aws_ec2_tf_info` which contains `instance_id` and `instance_ip`.
* Read information from `IN` resources, including `aws_vpc_tf_info` which contains `vpc_id`.
* Replace wildcards needed by the Terraform scripts
* Export `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` as environment variables
* Initialize TF and run `terraform destroy`

```
# De-provision AWS ec2 with Terraform
jobs:
  - name: deprov_aws_ec2_tf
    type: runSh
    steps:
      - IN: aws_ec2_tf_info
        switch: off
      - IN: aws_vpc_tf_info
        switch: off
      - IN: aws_ec2_tf_repo
        switch: off
      - IN: aws_ec2_tf_state
        switch: off
      - IN: aws_ec2_tf_creds
        switch: off
      - TASK:
          name: deprov_inst
          runtime:
            options:
              env:
                - inst_type: "t2.micro"
                - inst_ami: "ami-43a15f3e"
                - aws_key_name: "dr_us_east_1"
          script:
            - pushd $(shipctl get_resource_state "aws_ec2_tf_repo")
            - export AWS_ACCESS_KEY_ID=$(shipctl get_integration_resource_field aws_ec2_tf_creds "accessKey")
            - export AWS_SECRET_ACCESS_KEY=$(shipctl get_integration_resource_field aws_ec2_tf_creds "secretKey")
            - shipctl copy_file_from_resource_state aws_ec2_tf_state terraform.tfstate .
            - shipctl replace terraform.tfvars
            - terraform init
            - terraform destroy -force -var-file=terraform.tfvars
      - OUT: aws_ec2_tf_state
    always:
      script:
        - shipctl copy_file_to_resource_state terraform.tfstate aws_ec2_tf_state
        - popd

```

* Adding the above config to the jobs section of shippable.yml will create a `runSh` job called `deprov_aws_ec2_tf`.

* The first section of `steps` defines all the input `IN` resources that are required to execute this job.
  * Teraform script files are version controlled in a repo represented by `aws_ec2_repo`.
  * Credentials to connect to AWS are in `aws_ec2_creds`. This resource has `switch: off` flag which means any changes to it will not trigger this job automatically
  * The EC2 provisioning job outputs the instance information to a resource `aws_ec2_tf_info`. This job will take that resource as an IN to determine which instance(s) to terminate.
  * The VPC provisioning job outputs the VPC information to a resource `aws_vpc_tf_info`. This job will take that resource as an IN to determine where the instance are.
* The `TASK` section contains the actual code that is executed when the job runs. We have just one task named `deprov_inst` which does the following:
  *  `script` section has a list of commands that are executed sequentially.
    * First, we use the Shippable utility function `get_resource_state` to go to the folder where TF files are present
    * Next, we extract the AWS credentials from the `aws_ec2_creds`resource, again using shipctl functions
    * Next, we copy the TF state file using Shippable utility function `copy_file_from_resource_state`. This will restore the statefile so that TF knows what to delete
    * Next, we replace all wildcards in the variables file
    * Last, we run terraform destroy. This will use the statefile and clean up the instances that were provisoned
  * `always` section is executed no matter what the outcome of TASK section was. Here we push the latest copy of `terraform.tfstate` back to `aws_ec2_tf_state` resource so that it is available for the next run with the latest state information. We need to do this in always section especially since Terraform does not rollback changes of a failed apply command

Detailed info about `runSh` job is [here](/platform/workflow/job/runsh).

Detailed info about Shippable Utility functions is [here](/platform/tutorial/workflow/using-shipctl).

####2. Push changes to shippable.yml

Commit and push all the above changes to **shippable.yml**.

This should automatically trigger the sync process to add all the changes to the assembly line. Your view should look something like this.

<img src="/images/tutorial/provision-aws-ec2-terraform-fig3.png" alt="Assembly Line view">

Detailed info to hook your AL is [here](/platform/tutorial/workflow/add-assembly-line).

####3. Run the job `deprov_aws_ec2_tf`

You can manually run the job by right clicking on the job or by triggering the job to terminate AWS EC2 instances.

<img src="/images/tutorial/provision-aws-ec2-terraform-fig4.png" alt="Build console output">

## Further Reading
* [Working with Integrations](/platform/tutorial/integration/howto-crud-integration/)
* [Defining Resources in shippable.yml](/platform/workflow/config/#resources)
* [Defining Jobs in shippable.yml](/platform/workflow/config/#jobs)
* [Sharing information between Jobs](/platform/tutorial/workflow/share-info-across-jobs/)
