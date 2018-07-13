page_main_title: Provision AWS EC2 virtual machine with Ansible
page_description: Using Ansible playbooks to provision an AWS EC2 virtual machine
main_section: IT Ops
sub_section: AWS infrastructure
sub_sub_section: Provision EC2 machines

# Provision AWS EC2 virtual machine with Ansible

This tutorial explains how to automate the provisioning of an AWS EC2 virtual machine using Ansible.

This document assumes you're familiar with the following concepts:

* [AWS EC2](https://aws.amazon.com/documentation/ec2/)
* [Ansible aws_ec2 module](https://docs.ansible.com/ansible/2.3/ec2_module.html)

If you're unfamiliar with Ansible, it would be good to start with learning how to provision infrastructure manually with playbooks. Refer to our blog for a step-by-step tutorial: [Provision AWS EC2 Virtual Machine with Ansible](http://blog.shippable.com/provision-ec2-vm-ansible).

There are many challenges with manually running ansible playbooks. In short, you will struggle with making playbooks reusable and injecting the right values for wildcards at runtime, and managing security and accounts on the machine used to run the playbook. Also, if you have dependent workflows, you will have to manually go trigger each one.

If you want to achieve frictionless execution of Ansible playbooks with modular, reusable playbooks, you need to templatize your playbooks and automate the workflow used to execute them.

## Automated workflow to provision an AWS EC2 instance with Ansible

You can easily automate your workflow using Shippable's Assembly Lines. The following Assembly Line features are particularly noteworthy for this scenario:

* Creating an event-driven, automated workflow
* Securing workflow jobs with RBAC and contextually injecting credentials depending on who/what is running the Ansible playbook
* Dynamically injecting wildcard values in template playbooks, depending on the state of the workflow
* Visualizing your workflow and it's current status in a graphical view

To jump into this tutorial, you will need to familiarize yourself with a few platform concepts.

### Concepts
* [Integrations](/platform/integration/overview/)
    * [AWS](/platform/integration/aws-keys)
    * [Github](/platform/integration/github)
    * [PEM Key](/platform/integration/pemKey)
* [Resources](/platform/workflow/resource/overview/)
    * [gitRepo](/platform/workflow/resource/gitrepo)
    * [integration](/platform/workflow/resource/integration)
    * [params](/platform/workflow/resource/params)
* [Jobs](/platform/workflow/job/overview/)
    * [runSh](/platform/workflow/job/runsh)

This example extends the work done in our tutorial to [Provisioning an AWS VPC using Ansible](/provision/tutorial/provision-aws-vpc-ansible) by adding an Assembly Line that provisioning an EC2 instance in the VPC. However, you can also use it as a standalone tutorial by hardcoding values for subnet and security group IDs.

### Instructions

The following sections explain the process of automating a workflow to provision an AWS EC2 machine using Ansible. We will demonstrate this with our sample application.

**Source code is available at [devops-recipes/prov_aws_ec2_ansible](https://github.com/devops-recipes/prov_aws_ec2_ansible)**

**Complete YML is at [devops-recipes/prov_aws_ec2_ansible/shippable.yml](https://raw.githubusercontent.com/devops-recipes/prov_aws_ec2_ansible/master/shippable.yml)**

Your workflow will look like this, where the green box is the job that runs your ansible playbook, while the grey boxes are input resources that are required for your playbook:

<img src="/images/tutorial/provision-aws-ec2-ansible-fig1.png" alt="Assembly Line view">

####1. Add necessary Account Integrations

Integrations are used to connect your Shippable workflow with external providers. More information about integrations is [here](/platform/tutorial/integration/howto-crud-integration/). We will use integrations for AWS Keys and Github for this sample.

#####1a. Add AWS Keys Integration

To be able to interact with AWS, we need to add the `drship_aws `integration. Your AWS credentials are securely stored in this integration, and you can extract them in your job when needed.

Detailed steps on how to add an AWS Keys Integration are [here](/platform/integration/aws-keys/#creating-an-account-integration). Make sure you name the integration `drship_aws` since that is the name we're using in our sample automation scripts.

> Note: You might already have this if you have done some of our other tutorials. If so, skip this step.

#####1b. Add Github Integration

In order to read your workflow configuration from Github, we need to add the `drship_github` integration. This points to the repository containing your Shippable workflow config file (**shippable.yml**) and Ansible playbook files.

In our case, we're using the repository [devops-recipes/prov_aws_ec2_ansible](https://github.com/devops-recipes/prov_aws_ec2_ansible).

Detailed steps on how to add a Github Integration are [here](/platform/integration/github/#creating-an-account-integration). Make sure you name the integration `drship_github` since that is the name we're using in our sample automation scripts.

> Note: You might already have this if you have done some of our other tutorials. If so, skip this step.

#####1c. Add PEM Key Integration

In order to SSH into an EC2 machine, we need a PEM key that is used to provision the machine (you could also do this with custom SSH key, in this case we are using the PEM key). We add `drship_aws_pem` integration to store it.

Detailed steps on how to add a PEM Key Integration are [here](/platform/integration/pemKey/#creating-an-account-integration).

> Note: You might already have this if you have done some of our other tutorials. If so, skip this step

####2. Author Assembly Line configuration

The platform is built with "Everything as Code" philosophy, so all configuration is in a YAML-based file called **shippable.yml**, which is parsed to create your Assembly Line workflow.

Detailed documentation on **shippable.yml** is [here](/platform/workflow/config/#assembly-lines-configuration).

If you're using our sample code, **shippable.yml** already exists and you can use it with a few modifications.

#####2a. Add empty shippable.yml to your repo

Add an empty **shippable.yml** file to the the root of repository.

#####2b. Add `resources` section of the config

`resources` section holds the config info that is necessary to provision your EC2 instance. In this case we have four resources defined, two of type `integration`, and one each of `gitRepo` and `params`.

```
resources:
# Automation scripts repo
  - name: aws_ec2_repo
    type: gitRepo
    integration: "drship_github"
    versionTemplate:
      sourceName: "devops-recipes/prov_aws_ec2_ansible"
      branch: master

# AWS credentials
  - name: aws_ec2_creds
    type: integration
    integration: "drship_aws"      

# AWS PEM Key
  - name: aws_ec2_pem
    type: integration
    integration: "drship_aws_pem"    

# Output of EC2 provisioning
  - name: aws_ec2_info
    type: params
    versionTemplate:
      params:
        SEED: "initial_version"
```

######i. gitRepo resource named `aws_ec2_repo`

This resource points to the repository that contains your Ansible playbook files, so that they are accessible to your Assembly Line. For our example, these files are present in the repository [https://github.com/devops-recipes/prov_aws_ec2_ansible](https://github.com/devops-recipes/prov_aws_ec2_ansible), namely, [here](https://github.com/devops-recipes/prov_aws_ec2_ansible/tree/master/ansible).

Detailed info about `gitRepo` resource is [here](/platform/workflow/resource/gitrepo).

######ii. integration resource named `aws_ec2_creds`

Your AWS credentials are securely stored in this integration.

To enable Ansible interaction with AWS, we will export `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` stored in this resource as environment variables at runtime.

Detailed info about `integration` resource is [here](/platform/workflow/resource/integration).

######ii. integration resource named `aws_ec2_pem`

To be able to SSH into the EC2 machine, you need the PEM key that was used to provision it.

Detailed info about `integration` resource is [here](/platform/workflow/resource/integration).

######iv. params resource named `aws_ec2_info`

We store information like **instance_id** and **instance_ip**, which are created during the execution of your playbook, in a `params` resource. Downstream jobs can access this information programmatically if required. For example, a separate job that deploys to the machine will need to know the instance IP and ID.

Detailed info about `params` resource is [here](/platform/workflow/resource/params).

#####2c. Add `jobs` section of the config

A job is an execution unit of the Assembly Line. Our job has to perform four tasks:

* Replace wildcards needed by the Ansible playbook
* Export `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` as environment variables
* Run playbook
* Output `instance_id` and `instance_ip` into the `params` resource to make it available for downstream jobs


```
jobs:
# Provision AWS EC2 with Ansible
  - name: prov_aws_ec2_ans
    type: runSh
    steps:
      - IN: aws_ec2_repo
        switch: off
      - IN: aws_ec2_creds
        switch: off
      - IN: aws_ec2_pem
        switch: off
      # This resource is defined in the AWS VPC provisioning tutorial: http://docs.shippable.com/provision/tutorial/provision-aws-vpc-ansible
      # If you have not followed that tutorial, please delete this resource
      - IN: aws_vpc_info  
        switch: off
      - TASK:
          name: prov_ec2
          runtime:
            options:
              env:
                - STATE_RES_NAME: "aws_ec2_info"
                - ec2_region: "us-east-1"
                - ec2_tag_Type: "t2.micro"
                - ec2_image: "ami-43a15f3e"
                - ec2_keypair: "dr_us_east_1"
                - ec2_tag_Role: "demo_machines"
                - ec2_volume_size: 30
                - ec2_count: 1
                # - security_group_id: <hardcoded value> # Uncomment if you deleted the aws_vpc_info resource
                # - public_subnet_id: <hardcoded value>  # Uncomment if you deleted the aws_vpc_info resource            
          script:
            # Change directory to the folder containing ansible scripts
            - pushd $(shipctl get_resource_state "aws_ec2_repo")/ansible
            # Export access and secret keys from the aws_ec2_creds integration
            - export AWS_ACCESS_KEY_ID=$(shipctl get_integration_resource_field aws_ec2_creds "accessKey")
            - export AWS_SECRET_ACCESS_KEY=$(shipctl get_integration_resource_field aws_ec2_creds "secretKey")
            # Replace wildcards
            - shipctl replace variables.yml
            # Run playbook
            - ansible-playbook -v ec2_prov_playbook.yml
      - OUT: aws_ec2_info
        overwrite: true
```

* Adding the above config to the jobs section of **shippable.yml** will create a `runSh` job called `prov_aws_ec2_ans`.

* The first section of `steps` defines all the input `IN` resources that are required to execute this job.
    * Ansible script files are under `./ansible` folder and it is version controlled in a repo represented by `aws_ec2_repo`.
    * Credentials to connect to AWS are in `aws_ec2_creds`. This resource has `switch: off` flag, so any changes to it will not trigger this job automatically
    * PEM key is used to SSH into the EC2 machine is in `aws_ec2_pem`. This input creates an ENV var called `$AWS_EC2_PEM_KEYPATH` which has path to the key file on the machine on which the job executes. We use this in `ansible.cfg`.  
    * `aws_vpc_info` is a **params** resource that comes from another tutorial [which explains how to provision a VPC](/provision/tutorial/provision-aws-vpc-ansible) and contains the `security_group_id` and `public_subnet_id`, which are required to provision your instance. If you already have a VPC and just want to use this tutorial to provision an instance, just delete this resource and hardcode the values in the **TASK** section.

* The `TASK` section contains actual code that is executed when the job runs. We have just one task named `prov_ec2` which does the following:
    * First, we define environment variables required by the ansible playbook-
        * `STATE_RES_NAME` is where we are going to store the outputs
        * `ec2_region` is the aws region where the EC2 is going to be provisioned
        * `ec2_tag_Type` is the type of instance
        * `ec2_image` is the AMI used to provision this instance
        * `ec2_keypair` is name of the AWS Key pair used to provision this instance
        * `ec2_tag_Role` is the role this instance plays and it is set as a tag
        * `ec2_volume_size` is size of the volume attached in GB
        * `ec2_count` is number of instances to provision
        * `security_group_id` is implicitly set from `aws_vpc_info`. If you deleted that resource, hardcode this here
        * `public_subnet_id` is implicity set from `aws_vpc_info`. If you deleted that resource, hardcode this here
    *  `script` section has a list of commands which will be executed sequentially.
        * First, we use the Shippable utility function `get_resource_state` to go to the folder where Ansible playbook is stored
        * Next, we extract the AWS credentials from the `aws_ec2_creds`resource, again using shipctl functions
        * Next, we replace all wildcards in the playbook
        * Last, we execute the playbook. This step also updates the `aws_ec2_info` resource with `instance_id`, `instance_id`, `ec2_tag_Type`, `ec2_tag_Role`, and `ec2_region` generated during playbook execution. To see where this magic happens, look at the last lines in the playbook `ec2_prov_playbook.yml`.

```
# update shippable resource state
  - name: run cmd
    shell: |
      shipctl put_resource_state "{{ STATE_RES_NAME }}" "INST_{{ item.ami_launch_index }}_PUBLIC_IP" "{{ item.public_ip }}"
      shipctl put_resource_state "{{ STATE_RES_NAME }}" "INST_{{ item.ami_launch_index }}_ID" "{{ item.id }}"
      shipctl put_resource_state_multi "{{ STATE_RES_NAME }}" "ec2_tag_Type={{ ec2_tag_Type }}" "ec2_tag_Role={{ ec2_tag_Role }}" "ec2_region={{ ec2_region }}"
    with_items: "{{ ec2.instances }}"
```

Detailed info about `runSh` job is [here](/platform/workflow/job/runsh).

Detailed info about Shippable Utility functions are [here](/platform/tutorial/workflow/using-shipctl).

#####2d. Push changes to shippable.yml

Commit and push all the above changes to **shippable.yml**.

####3. Add the Assembly Line to your Shippable organization

In Shippable's world, a Subscription maps to an Organization or a Team, depending on the source control provider. An Assembly Line workflow is defined at a Subscription level and all jobs are resources are global to your subscription.

To add your Assembly Line to Shippable, you need to add the repository containing the configuration as a "sync repository" by [following instructions here](/platform/tutorial/workflow/add-assembly-line). This automatically parses your **shippable.yml** config and adds your workflow to Shippable. Your workflow will always be kept in sync with the config in this repository, and be automatically updated every time you push a change to **shippable.yml**.

Your view will look something like this:

<img src="/images/tutorial/provision-aws-ec2-ansible-fig1.png" alt="Assembly Line view">

####4. Run the build job `prov_aws_ec2_ans`

You can manually run the job by right clicking on the job and clicking on **Build job**, or by committing a change to your repository containing ansible config.

<img src="/images/tutorial/provision-aws-ec2-ansible-fig2.png" alt="Build console output">

Confirm that the required EC2 instance was created in AWS.

## OPTIONAL: Automating the termination of AWS EC2 with Ansible

You might also want to automatically terminate EC2 instances when you no longer need them. A great example is if you want to spin up a complete on-demand test environment and destroy them is tests pass.

The steps below demonstrate how to implement the automatic termination workflow.

### Instructions

For this workflow, we start with the resources and jobs that were created in the provisioning tutorial above, and just add another job that will terminate the EC2 instance.

####1. Author Assembly Line configuration

In this step, we will add a new job to your **shippable.yml** that terminates an EC2 instance using Ansible.

#####1a. Add `jobs` section of the config**

Our job will do the following:

* Read information from `IN` resources, including `aws_ec2_info` which contains `instance_id` and `instance_ip`.
* Replace wildcards in Ansible playbook.
* Run the ansible playbook to terminate the instance

```
jobs:

# Terminate AWS EC2 with Ansible
  - name: term_aws_ec2_ans
    type: runSh
    steps:
      - IN: aws_ec2_repo
      - IN: aws_ec2_creds
        switch: off
      - IN: aws_ec2_pem
        switch: off
      - IN: aws_ec2_info
        switch: off
      - TASK:
          name: term_ec2
          script:
            - pushd $(shipctl get_resource_state "aws_ec2_repo")/ansible
            - export ec2_region="us-east-1"
            - export AWS_ACCESS_KEY_ID=$(shipctl get_integration_resource_field aws_ec2_creds "accessKey")
            - export AWS_SECRET_ACCESS_KEY=$(shipctl get_integration_resource_field aws_ec2_creds "secretKey")
            - shipctl replace variables.yml
            - ansible-playbook -v ec2_term_playbook.yml


```

* Adding the above config to the jobs section of shippable.yml will create a `runSh` job called `term_aws_ec2_ans`.

* The first section of `steps` defines all the input `IN` resources that are required to execute this job.
    * Ansible script files are under `./ansible` folder and it is version controlled in a repo represented by `aws_ec2_repo`.
    * Credentials to connect to AWS are in `aws_ec2_creds`. This resource has `switch: off` flag which means any changes to it will not trigger this job automatically
    * PEM key that can be used to SSH into the EC2 machine is in `aws_ec2_pem`. This input creates an ENV var called `$AWS_EC2_PEM_KEYPATH` which has path to the key file on the machine on which the job executes. We use this in `ansible.cfg`.  
    * The EC2 provisioning job outputs the instance information to a resource `aws_ec2_info`. This job will take that resource as an IN to determine which instance(s) to terminate.

* The `TASK` section contains the actual code that is executed when the job runs. We have just one task named `term_ec2` which does the following:
    *  `script` section has a list of commands that are executed sequentially.
        * First, we use the Shippable utility function `get_resource_state` to go to the folder where Ansible playbook **ec2_term_playbook.yml** is stored
        * Next, we extract the AWS credentials from the `aws_ec2_creds`resource, again using shipctl functions
        * Next, we replace all wildcards in the playbook
        * Last, we execute the playbook. This finds all instances that match the specific tag Type and Role and terminates them.

**Excerpt from ec2_term_playbook.yml**

```
# actual file - https://github.com/devops-recipes/prov_aws_ec2_ansible/blob/master/ansible/ec2_term_playbook.yml

- name: Get EC2 instance IDs
  run_once: true
  ec2_remote_facts:
    filters:
      "tag:Type": "{{ ec2_tag_Type }}"
      "tag:Role": "{{ ec2_tag_Role }}"
    region: "{{ ec2_region }}"
  register: instances

...and more

```

Detailed info about `runSh` job is [here](/platform/workflow/job/runsh).

Detailed info about Shippable Utility functions is [here](/platform/tutorial/workflow/using-shipctl).

####2. Push changes to shippable.yml

Commit and push all the above changes to **shippable.yml**.

This should automatically trigger the sync process to add all the changes to the assembly line. Your view should look something like this.

<img src="/images/tutorial/provision-aws-ec2-ansible-fig3.png" alt="Assembly Line view">

Detailed info to hook your AL is [here](/platform/tutorial/workflow/add-assembly-line).

####3. Run the build job `term_aws_ec2_ans`

You can manually run the job by right clicking on the job or by triggering the job to terminate AWS EC2 instances.

<img src="/images/tutorial/provision-aws-ec2-ansible-fig4.png" alt="Build console output">

## Further Reading
* [Working with Integrations](/platform/tutorial/integration/howto-crud-integration/)
* [Defining Resources in shippable.yml](/platform/workflow/config/#resources)
* [Defining Jobs in shippable.yml](/platform/workflow/config/#jobs)
* [Sharing information between Jobs](/platform/tutorial/workflow/share-info-across-jobs/)
