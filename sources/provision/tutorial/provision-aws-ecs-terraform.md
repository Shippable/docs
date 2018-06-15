page_description: Provision an Amazon ECS cluster with Terraform
main_section: Provision
sub_section: AWS infrastructure

# Provision an Amazon ECS cluster with Terraform

This tutorial explains how to automate the provisioning of an Amazon Elastic Container Service cluster using Terraform.

This document assumes you're familiar with the following concepts:

* [AWS ECS](https://aws.amazon.com/documentation/ecs/)
* [Terraform overview](https://www.terraform.io/intro/index.html)
    * [aws_autoscaling_group](https://www.terraform.io/docs/providers/aws/d/autoscaling_groups.html)
    * [aws_ecs_cluster](https://www.terraform.io/docs/providers/aws/d/ecs_cluster.html)
    * [aws_iam_policy_document](https://www.terraform.io/docs/providers/aws/d/iam_policy_document.html)
    * [aws_launch_configuration](https://www.terraform.io/docs/providers/aws/r/launch_configuration.html)
    * [aws_iam_role](https://www.terraform.io/docs/providers/aws/d/iam_role.html)
    * [aws_iam_instance_profile](https://www.terraform.io/docs/providers/aws/d/iam_instance_profile.html)
    * [aws_iam_role_policy_attachment](https://www.terraform.io/docs/providers/aws/r/iam_role_policy_attachment.html)


## Automated workflow to provision an AWS ECS cluster with Terraform

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
    * [cluster](/platform/workflow/resource/cluster)
    * [state](/platform/workflow/resource/state)
* [Jobs](/platform/workflow/job/overview/)
    * [runSh](/platform/workflow/job/runsh)

This example extends the work done in our tutorial to [Provisioning an AWS VPC using Terraform](/provision/tutorial/provision-aws-vpc-terraform) by adding an Assembly Line that provisioning an ECS cluster in the VPC. However, you can also use it as a standalone tutorial by hardcoding values for subnet and security group IDs.

### Instructions

 We will demonstrate this scenario with our sample application.

**Source code is available at [devops-recipes/prov_aws_ecs_terraform](https://github.com/devops-recipes/prov_aws_ecs_terraform)**

**Complete YML is at [devops-recipes/prov_aws_ecs_terraform/shippable.yml](https://raw.githubusercontent.com/devops-recipes/prov_aws_ecs_terraform/master/shippable.yml)**

Your workflow will look like this, where the green box is the job that runs your terraform script, while the grey boxes are input resources that are required for your scripts:

<img src="/images/tutorial/provision-aws-ecs-terraform-fig1.png" alt="Assembly Line view">

####1. Add necessary Account Integrations

Integrations are used to connect your Shippable workflow with external providers. More information about integrations is [here](/platform/tutorial/integration/howto-crud-integration/). We will use integrations for AWS Keys and Github for this sample.

#####1a. Add AWS Keys Integration

To be able to interact with AWS, we need to add the `drship_aws` integration.

Detailed steps on how to add an AWS Keys Integration are [here](/platform/integration/aws-keys/#creating-an-account-integration). Make sure you name the integration `drship_aws` since that is the name we're using in our sample automation scripts.

> Note: You might already have this if you have done some of our other tutorials. If so, skip this step.

#####1b. Add Github Integration

In order to read your workflow configuration from Github, we need to add the `drship_github` integration. This points to the repository containing your Shippable workflow config file (**shippable.yml**) and your Terraform script files.

In our case, we're using the repository [devops-recipes/prov_aws_ecs_terraform](https://github.com/devops-recipes/prov_aws_ecs_terraform).

Detailed steps on how to add a Github Integration are [here](/platform/integration/github/#creating-an-account-integration). Make sure you name the integration `drship_github` since that is the name we're using in our sample automation scripts.

> Note: You might already have this if you have done some of our other tutorials. If so, skip this step.

####2. Author Assembly Line configuration

The platform is built with "Everything as Code" philosophy, so all configuration is in a YAML-based file called **shippable.yml**, which is parsed to create your Assembly Line workflow.

Detailed documentation on **shippable.yml** is [here](/deploy/configuration).

If you're using our sample code, **shippable.yml** already exists and you can use it with a few modifications.

#####2a. Add empty shippable.yml to your repo

Add an empty **shippable.yml** file to the the root of repository.

#####2b. Add `resources` section of the config

`resources` section holds the config info that is necessary to provision and ecs instance. In this case we have 4 resources defined of type `integration`, `gitRepo`, `state` and `cluster`.

```
resources:
# Terraform files repo
  - name: aws_ecs_repo
    type: gitRepo
    integration: "drship_github"
    versionTemplate:
      sourceName: "devops-recipes/prov_aws_ecs_terraform"
      branch: master

# AWS integration needed by Terraform
  - name: aws_ecs_keys
    type: integration
    integration: "drship_aws"

# State resource to store Terraform State
  - name: aws_ecs_tf_state
    type: state

# Cluster info output
  - name: aws_ecs_cluster
    type: cluster
    integration: "drship_aws"
    pointer:
      sourceName : "tbd" #name of the cluster
      region: "tbd"
```

######i. gitRepo resource named `aws_ecs_repo`

This resource points to the repository that contains your Terraform script files, so that they are accessible to your Assembly Line. For our example, these files are present in the repository [https://github.com/devops-recipes/prov_aws_ecs_terraform](https://github.com/devops-recipes/prov_aws_ecs_terraform), namely, [here](https://github.com/devops-recipes/prov_aws_ecs_terraform/tree/master).

Detailed info about `gitRepo` resource is [here](/platform/workflow/resource/gitrepo).

######ii. integration resource named `aws_ecs_keys`

Your AWS credentials are securely stored in this integration.

To let Terraform interact with AWS, we will export `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` stored in this resource as environment variables at runtime.

Detailed info about `integration` resource is [here](/platform/workflow/resource/integration).

######iii. state resource named `aws_ecs_tf_state`

Every apply of Terraform scripts generates a **terraform.tfstate** file. This is a very important file as it holds the state of your provisioning. Terraform looks for this file when you apply and if it is not present, it will recreate all your resources, resulting in duplicate objects. We use the `state` resource to store the state file and make it available every time we run the apply command.

Detailed info about `state` resource is [here](/platform/workflow/resource/state).

<a name="define-aws_ecs_cluster"></a>
######iv. params resource named `aws_ecs_cluster`

We store information like **clusterName** and **region**, which is created during the execution of your scripts, in a `cluster` resource. Downstream jobs can access this information programmatically if required. For example, a separate job that deploys to the cluster will need to know the connection information to the cluster.

Detailed info about `cluster` resource is [here](/platform/workflow/resource/cluster).

#####2c. Add `jobs` section of the config

A job is an execution unit of the Assembly Line. Our job has to perform four tasks:

* Replace wildcards needed by the Terraform scripts
* Export `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` as environment variables
* Run script
* Output `clusterName` and `region` into the `cluster` resource to make it available for downstream jobs

```
jobs:
# Provision Cluster
  - name: prov_aws_ecs_tf
    type: runSh
    steps:
      - IN: aws_ecs_repo
      - IN: aws_vpc_tf_info
      - IN: aws_ecs_keys
        switch: off
      - IN: aws_ecs_tf_state
        switch: off
      - TASK:
          name: prov_cluster
          runtime:
            options:
              env:
                # Uncomment and hardcode if you deleted the aws_vpc_tf_info resource
                #- vpc_id: ""
                #- vpc_region: ""
                #- vpc_public_sg_id: ""
                #- vpc_public_sn_id: ""
                - ECS_KEY_PAIR_NAME: "dr_us_east_1"
                - MAX_INSTANCE_SIZE: 3
                - MIN_INSTANCE_SIZE: 1
                - DESIRED_CAPACITY: 2
                - ECS_INSTANCE_TYPE: "t2.micro"
                - ECS_AMI_ID: "ami-fad25980"
          script:
            - export AWS_ACCESS_KEY_ID=$(shipctl get_integration_resource_field aws_ecs_keys "accessKey")
            - export AWS_SECRET_ACCESS_KEY=$(shipctl get_integration_resource_field aws_ecs_keys "secretKey")
            - export ECS_CLUSTER=$(shipctl get_integration_resource_field "aws_ecs_cluster" "sourceName")
            - pushd $(shipctl get_resource_state "aws_ecs_repo")
            - shipctl replace terraform.tfvars
            - shipctl copy_file_from_resource_state aws_ecs_tf_state terraform.tfstate .
            - terraform init
            - terraform apply -auto-approve -var-file=terraform.tfvars
      - OUT: aws_ecs_cluster
        overwrite: true
      - OUT: aws_ecs_tf_state
    on_success:
      script:
        - shipctl put_resource_state_multi aws_ecs_cluster "versionName=$ECS_CLUSTER" "sourceName=$ECS_CLUSTER" "region=$vpc_region"
    always:
      script:
        - shipctl copy_file_to_resource_state terraform.tfstate aws_ecs_tf_state
```

* Adding the above config to the jobs section of shippable.yml will create a `runSh` job called `prov_aws_ecs_tf`.

* The first section of `steps` defines all the input `IN` resources that are required to execute this job.
  * Terraform script files are version controlled in a repo represented by `aws_ecs_tf_repo`.
  * Credentials to connect to AWS are in `aws_ecs_tf_keys`. This resource has `switch: off` flag, so any changes to it will not trigger this job automatically
  * `aws_ecs_keys` contains the creds necessary to login into AWS
  * `aws_ecs_tf_state` is where the tfstate file is stored permanently. If you need to rerun the job, you can restore the state file from here
  * `aws_vpc_tf_info` is a **params** resource that comes from another tutorial [which explains how to provision a VPC](/provision/tutorial/provision-aws-vpc-terraform) and contains the `vpc_id`, `vpc_region`, `vpc_public_sn_id` and `vpc_public_sg_id`, which are required to provision ECS. If you already have a VPC and just want to use this tutorial to provision an instance, just delete this resource and hardcode the values in the **TASK.runtime.options.env** section.

* The `TASK` section contains the actual code that is executed when the job runs. We have just one task named `prov_ecs` which does the following:

  * First, we define environment variables required by the scripts-
    * `vpc_id, vpc_region, vpc_public_sg_id & vpc_public_sn_id` are implicity set from `aws_vpc_tf_info`. If you deleted that resource and you want to manually provide this info, hardcode this here
    * `ECS_KEY_PAIR_NAME` is name of the AWS Key pair used to provision instances for ECS
    * `MAX_INSTANCE_SIZE` is the maximum number of instances that auto scaling will go up to
    * `MIN_INSTANCE_SIZE` is the minimum number of instances that auto scaling will go down to
    * `DESIRED_CAPACITY` is the ideal number of instances
    * `ECS_INSTANCE_TYPE` is the type of instance to be provisioned
    * `ECS_AMI_ID ` is the AMI used to provision instances

  * `script` section has a list of commands which will be executed sequentially.
    * First, we extract the AWS credentials from the `aws_ecs_tf_creds`resource, again using shipctl functions
    * Then, we use the Shippable utility function `get_resource_state` to go to the folder where Terraform scripts are stored
    * Next, we replace all wildcards in the file `terraform.tfvars`
    * Then, we restore the tf state using Shippable utility function `copy_file_from_resource_state`
    * Last, we apply the scripts

  * `on_success` section is executed if the TASK succeeded. This step updates the `cluster` resource with `sourceName` & `region` which were provisioned as part of this script

  * `always` section is executed no matter what the outcome of TASK section was. Here we push the latest copy of `terraform.tfstate` back to `aws_ecs_tf_state` resource so that it is available for the next run with the latest state information. We need to do this in the `always` section since Terraform does not rollback changes of a failed apply command

Detailed info about `runSh` job is [here](/platform/workflow/job/runsh).

Detailed info about Shippable Utility functions are [here](/platform/tutorial/workflow/using-shipctl).

#####2d. Push changes to shippable.yml

Commit and push all the above changes to **shippable.yml**.

####3. Add the Assembly Line to your Shippable organization

In Shippable's world, a Subscription maps to an Organization or a Team, depending on the source control provider. An Assembly Line workflow is defined at a Subscription level and all jobs are resources are global to your subscription.

To add your Assembly Line to Shippable, you need to add the repository containing the configuration as a "sync repository" by [following instructions here](/deploy/configuration/#adding-a-syncrepo). This automatically parses your **shippable.yml** config and adds your workflow to Shippable. Your workflow will always be kept in sync with the config in this repository, and be automatically updated every time you push a change to **shippable.yml**.

Your view will look something like this:

<img src="/images/tutorial/provision-aws-ecs-terraform-fig1.png" alt="Assembly Line view">

####4. Run the build job `prov_aws_ecs_tf`

You can manually run the job by right clicking on the job and clicking on **Build job**, or by committing a change to your repository containing Terraform scripts.

<img src="/images/tutorial/provision-aws-ecs-terraform-fig2.png" alt="Build console output">

Confirm that the required ECS instance was created.

## OPTIONAL: Automating the termination of AWS ECS with Terraform

You can also automatically terminate ECS when you no longer need it. A great example is if you want to spin up a complete on-demand test environment and destroy it after tests pass.

The steps below demonstrate how to implement the automatic termination workflow.

### Instructions

For this workflow, we start with the resources and jobs that were created in the provisioning tutorial above, and just add another job that will terminate the ECS instance.

####1. Author Assembly Line configuration

In this step, we will add a new job to your **shippable.yml** that terminates an ECS instance using Terraform.

#####1a. Add `jobs` section of the config**

Our job will do the following:

* Read information from `IN` resources, including `aws_ecs_cluster` which contains `sourceName` (clusterName) and `region`.
* Read information from `IN` resources, including `aws_vpc_tf_info` which contains `vpc_id`. If you deleted this resource in the tutorial above, you can hardcode the information required in the **TASK.runtime.options.env** section.
* Replace wildcards needed by the Terraform scripts
* Export `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` as environment variables
* Initialize TF and run `terraform destroy`

```
jobs:
# De-Provision Cluster
  - name: deprov_aws_ecs_tf
    type: runSh
    steps:
      - IN: aws_ecs_repo
        switch: off
      - IN: aws_vpc_tf_info
        switch: off
      - IN: aws_ecs_cluster
        switch: off
      - IN: aws_ecs_tf_state
        switch: off
      - IN: aws_ecs_keys
        switch: off
      - TASK:
          name: deprov_cluster
          runtime:
            options:
              env:
                - ECS_KEY_PAIR_NAME: "dr_us_east_1"
                - MAX_INSTANCE_SIZE: 3
                - MIN_INSTANCE_SIZE: 1
                - DESIRED_CAPACITY: 2
                - ECS_INSTANCE_TYPE: "t2.micro"
                - ECS_AMI_ID: "ami-fad25980"
          script:
            - export AWS_ACCESS_KEY_ID=$(shipctl get_integration_resource_field "aws_ecs_keys" "accessKey")
            - export AWS_SECRET_ACCESS_KEY=$(shipctl get_integration_resource_field "aws_ecs_keys" "secretKey")
            - export ECS_CLUSTER=$(shipctl get_integration_resource_field "aws_ecs_cluster" "sourceName")
            - pushd $(shipctl get_resource_state "aws_ecs_repo")
            - shipctl copy_file_from_resource_state aws_ecs_tf_state terraform.tfstate .
            - shipctl replace terraform.tfvars
            - terraform init
            - terraform destroy -force -auto-approve -var-file=terraform.tfvars
      - OUT: aws_ecs_tf_state
    always:
      script:
        - shipctl copy_file_to_resource_state terraform.tfstate aws_ecs_tf_state
```

* Adding the above config to the jobs section of shippable.yml will create a `runSh` job called `deprov_aws_ecs_tf`.

* The first section of `steps` defines all the input `IN` resources that are required to execute this job.
  * Terraform script files are version controlled in a repo represented by `aws_ecs_repo`.
  * Credentials to connect to AWS are in `aws_ecs_creds`. This resource has `switch: off` flag which means any changes to it will not trigger this job automatically
  * The ecs provisioning job outputs the instance information to a resource `aws_ecs_cluster`. This job will take that resource as an IN to determine which ECS to terminate.
  * The VPC provisioning job outputs the VPC information to a resource `aws_vpc_tf_info`. This job will take that resource as an IN to determine where the instance are.
* The `TASK` section contains the actual code that is executed when the job runs. We have just one task named `deprov_ecs` which does the following:
  *  `script` section has a list of commands that are executed sequentially.
    * First, we extract the AWS credentials from the `aws_ecs_creds`resource, again using shipctl functions
    * Then, we use the Shippable utility function `get_resource_state` to go to the folder where TF files are present
    * Next, we copy the TF state file using Shippable utility function `copy_file_from_resource_state`. This will restore the statefile so that TF knows what to delete
    * Next, we replace all wildcards in the variables file
    * Last, we run terraform destroy. This will use the statefile and clean up the instances that were provisoned
  * `always` section is executed no matter what the outcome of TASK section was. Here we push the latest copy of `terraform.tfstate` back to `aws_ecs_tf_state` resource so that it is available for the next run with the latest state information. We need to do this in always section especially since Terraform does not rollback changes of a failed apply command

Detailed info about `runSh` job is [here](/platform/workflow/job/runsh).

Detailed info about Shippable Utility functions is [here](/platform/tutorial/workflow/using-shipctl).

####2. Push changes to shippable.yml

Commit and push all the above changes to **shippable.yml**.

This should automatically trigger the sync process to add all the changes to the assembly line. Your view should look something like this.

<img src="/images/tutorial/provision-aws-ecs-terraform-fig3.png" alt="Assembly Line view">

Detailed info to hook your AL is [here](/deploy/configuration/#adding-a-syncrepo).

####3. Run the job `deprov_aws_ecs_tf`

You can manually run the job by right clicking on the job or by triggering the job to terminate AWS ecs instances.

<img src="/images/tutorial/provision-aws-ecs-terraform-fig4.png" alt="Build console output">

## Further Reading
* [Working with Integrations](/platform/tutorial/integration/howto-crud-integration/)
* [Defining Resources in shippable.yml](/platform/tutorial/workflow/shippable-yml/#resources-config)
* [Defining Jobs in shippable.yml](/platform/tutorial/workflow/shippable-yml/#jobs-config)
* [Sharing information between Jobs](/platform/tutorial/workflow/share-info-across-jobs/)
