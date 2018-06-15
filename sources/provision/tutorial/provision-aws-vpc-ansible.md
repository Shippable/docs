page_description: Using Ansible playbooks to provision an AWS VPC
main_section: Provision
sub_section: AWS infrastructure
sub_sub_section: Provision a VPC

# Provision AWS VPC with Ansible

This tutorial explains how to automate the provisioning of AWS Virtual Private Cloud(VPC) using Ansible.

This document assumes you're familiar with the following concepts:

* [AWS VPC](https://aws.amazon.com/documentation/vpc/)
* [Ansible aws_vpc module](https://docs.ansible.com/ansible/2.3/ec2_vpc_module.html)

If you're unfamiliar with Ansible, it would be good to start with learning how to provision infrastructure manually with playbooks. Refer to our blog for a step-by-step tutorial: [Provision AWS VPC Virtual Machine with Ansible](http://blog.shippable.com/provision-ec2-vpc-ansible).

There are many challenges with manually running ansible playbooks. In short, you will struggle with making playbooks reusable and injecting the right values for wildcards at runtime, and managing security and accounts on the machine used to run the playbook. Also, if you have dependent workflows, you will have to manually go trigger each one.

If you want to achieve frictionless execution of Ansible playbooks with modular, reusable playbooks, you need to templatize your playbooks and automate the workflow used to execute them.


## Automating the provisioning of AWS VPC with Ansible

Next, we will demonstrate how you can easily automate your workflow using Shippable's Assembly Lines. The following Assembly Line features are particularly noteworthy for this scenario:

* Creating an event-driven, automated workflow
* Securing workflow jobs with RBAC and contextually injecting credentials depending on who/what is running the ansible playbook
* Dynamically injecting wildcard values in template playbooks, depending on the state of the workflow
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
* [Jobs](/platform/workflow/job/overview/)
    * [runSh](/platform/workflow/job/runsh)
* [shipctl utility](/platform/tutorial/workflow/using-shipctl/)

### Step by Step Instructions

The following sections explain the process of automating a workflow to provision AWS VPC using Ansible. We will demonstrate this with our sample application.

**Source code is available at [devops-recipes/prov_aws_vpc_ansible](https://github.com/devops-recipes/prov_aws_vpc_ansible)**

**Complete YML is at [devops-recipes/prov_aws_vpc_ansible/shippable.yml](https://raw.githubusercontent.com/devops-recipes/prov_aws_vpc_ansible/master/shippable.yml)**

####1. Add necessary Account Integrations

Integrations are used to connect your Shippable workflow with external providers. More information about integrations is [here](/platform/tutorial/integration/howto-crud-integration/). We will use integrations for AWS Keys and Github for this sample.

#####1a. Add **AWS Keys** Integration

To be able to interact with AWS, we need to add the `drship_aws` integration. Your AWS credentials are securely stored in this integration, and you can extract them in your job when needed.

Detailed steps on how to add an AWS Keys Integration are [here](/platform/integration//aws-keys/#creating-an-account-integration). Make sure you name the integration `drship_aws` since that is the name we're using in our sample automation scripts.

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step.

#####1b. Add `Github` Integration

In order to read your workflow configuration from Github, we need to add the `drship_github` integration. This points to the repository containing your Shippable workflow config file (**shippable.yml**) and ansible playbook files.

In our case, we're using the repository [devops-recipes/prov_aws_vpc_ansible](https://github.com/devops-recipes/prov_aws_vpc_ansible).

Detailed steps on how to add a Github Integration are [here](/platform/integration/github/#creating-an-account-integration). Make sure you name the integration `drship_github` since that is the name we're using in our sample automation scripts.

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step.

####2. Author Assembly Line configuration

The platform is built with "Everything as Code" philosophy, so all configuration is in a YAML-based file called **shippable.yml**, which is parsed to create your Assembly Line workflow.

Detailed documentation on **shippable.yml** is [here](/deploy/configuration).

If you're using our sample code, **shippable.yml** already exists and you can use it with a few modifications.

#####2a. Add empty shippable.yml to your repo

Add an empty **shippable.yml** file to the the root of repository.

#####2b. Add `resources` section of the config

`resources` section holds the config info that is necessary to provision an AWS VPC. In this case we have 3 resources defined of type `integration`, `gitRepo` and `params`.

Add the following to your **shippable.yml**:

```
resources:
# Automation scripts repo
  - name: aws_vpc_repo
    type: gitRepo
    integration: "drship_github"      # replace with Github integration name if different
    versionTemplate:
      sourceName: "devops-recipes/prov_aws_vpc_ansible"  # replace with  your org name/repo name
      branch: master

# AWS Keys integration
  - name: aws_creds
    type: integration
    integration: "drship_aws"         # replace with AWS Keys integration name if different


# Output of VPC provisioning
  - name: aws_vpc_info
    type: params
    versionTemplate:
      params:
        SEED: "initial_version"       # this will be replaced programmatically at runtime
```

######i. gitRepo resource named `aws_vpc_repo`

This resource points to the repository that contains your Ansible playbook files, so that they are accessible to your Assembly Line. For our example, these files are present in the repository [https://github.com/devops-recipes/prov_aws_vpc_ansible](https://github.com/devops-recipes/prov_aws_vpc_ansible), namely, [here](https://github.com/devops-recipes/prov_aws_vpc_ansible/tree/master/ansible).

Detailed info about `gitRepo` resource is [here](/platform/workflow/resource/gitrepo).

######ii. integration resource named `aws_creds`

To be able to interact with AWS, you need creds. Your AWS credentials are securely stored in this integration, and you can extract them in your job when needed.

Detailed info about `integration` resource is [here](/platform/workflow/resource/integration).

######iii. params resource named `aws_vpc_info`

We store information like **vpc_id** and **subnet_id**, which are created during the execution of your playbook, in a `params` resource. Downstream jobs can access this information programmatically if required. For example, a separate job that provisions machines will need to know the VPC and Subnet IDs.

Detailed info about `params` resource is [here](/platform/workflow/resource/params).

#####2c. Add `jobs` section of the config

A job is an execution unit of the Assembly Line. Our job has to perform three tasks:

* Replace the wildcards needed by the ansible playbook
* Run the playbook
* Output `vpc_id` and `subnet_id` into the `params` resource to make it available for downstream jobs

Add the following to your **shippable.yml**:

```
jobs:
  # Provision AWS VPC with Ansible
  - name: prov_aws_vpc_ans
    type: runSh
    steps:
      - IN: aws_vpc_repo
      - IN: aws_creds
        switch: off     # do not automatically trigger job when credentials change
      - TASK:
          name: prov_vpc
          runtime:
            options:
              env:
                # Values that should replace wildcards in ansible playbook
                - STATE_RES_NAME: "aws_vpc_info"
                - vpc_region: "us-east-1"
                - vpc_name: "demo_vpc"
                - vpc_cidr_block: "10.10.0.0/16"
                - vpc_access_from_ip_range: "0.0.0.0/0"
                - vpc_public_subnet_1_cidr: "10.10.10.0/24"
          script:
            - pushd $(shipctl get_resource_state "aws_vpc_repo")/ansible
            # Export access and secret keys from the aws_creds integration
            - export AWS_ACCESS_KEY_ID=$(shipctl get_integration_resource_field aws_creds "accessKey")
            - export AWS_SECRET_ACCESS_KEY=$(shipctl get_integration_resource_field aws_creds "secretKey")
            # Replace wildcards
            - shipctl replace variables.yml
            # Run playbook
            - ansible-playbook -v vpc_prov_playbook.yml
      #
      - OUT: aws_vpc_info
        overwrite: true
```

* Adding the above config to the jobs section of shippable.yml will create a `runSh` job called `prov_aws_vpc_ans`.

* The first section of `steps` defines all the input `IN` resources that are required to execute this job.
    * Ansible script files are under `./ansible` folder and it is version controlled in a repo represented by `aws_vpc_repo`.
    * Credentials to connect to AWS are in `aws_creds`. This resource has `switch: off` flag which means any changes to it will not trigger this job automatically

* The `TASK` section contains actual code that is executed when the job runs. We have just one task named `prov_vpc` which does the following:
    * First, we define environment variables required by the ansible playbook-
        * `STATE_RES_NAME` is where we are going to store the outputs
        * `vpc_region` is the aws region where the VPC is going to be created
        * `vpc_name` is the name of the VPC
        * `vpc_cidr_block` is the address space of the VPC
        * `vpc_access_from_ip_range` is the IP range that you want to limit access to resources in this VPC. Here we are opening this up to WWW
        * `vpc_public_subnet_1_cidr` is the address range of the public subnet we are creating
    *  `script` section has a list of commands to execute sequentially.
        * First, we use the Shippable utility function `get_resource_state` to go to the folder where Ansible playbook is stored
        * Next, we extract the AWS credentials from the `aws_creds`resource, again using shipctl functions
        * Next, we replace all wildcards in the playbook
        * Last, we execute the playbook. This step also updates the `params` resource with `vpc_id` and `subnet_id` generated during playbook execution. To see where this magic happens, look at the last lines in the playbook `vpc_prov_playbook.yml`.

```
- name: run cmd
  shell: |
    shipctl put_resource_state_multi "{{ STATE_RES_NAME }}" "vpc_id={{ vpc_id }}" "igw_id={{ igw_id }}" "public_subnet_id={{ public_subnet_id }}" "security_group_id={{ sg_id }}"

```

Detailed info about `runSh` job is [here](/platform/workflow/job/runsh).

Detailed info about Shippable Utility functions is [here](/platform/tutorial/workflow/using-shipctl).

#####2d. Push changes to shippable.yml

Commit and push all the above changes to **shippable.yml**.

####3. Add the Assembly Line to your Shippable organization

In Shippable's world, a Subscription maps to an Organization or a Team, depending on the source control provider. An Assembly Line workflow is defined at a Subscription level and all jobs are resources are global to your subscription.

To add your Assembly Line to Shippable, you need to add the repository containing the configuration as a "sync repository" by [following instructions here](/deploy/configuration/#adding-a-syncrepo). This automatically parses your **shippable.yml** config and adds your workflow to Shippable. Your workflow will always be kept in sync with the config in this repository, and be automatically updated every time you push a change to **shippable.yml**.

Your view will look something like this:

<img src="/images/tutorial/provision-aws-vpc-ansible-fig1.png" alt="Assembly Line view">

####4. Run the job `prov_aws_vpc_ans`

You can manually run the job by right clicking on the job and clicking on `Build job`, or by committing a change to your repository containing ansible config.

<img src="/images/tutorial/provision-aws-vpc-ansible-fig2.png" alt="Build console output">

Confirm that the required VPC was created in AWS.

## Further Reading
* [Working with Integrations](/platform/tutorial/integration/howto-crud-integration/)
* [Defining Resources in shippable.yml](/platform/tutorial/workflow/shippable-yml/#resources-config)
* [Defining Jobs in shippable.yml](/platform/tutorial/workflow/shippable-yml/#jobs-config)
* [Sharing information between Jobs](/platform/tutorial/workflow/share-info-across-jobs/)
