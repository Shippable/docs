page_main_title: Provision AWS EC2 with Ansible
main_section: Tutorial
sub_section: AWS
sub_sub_section: EC2
page_title: Provision AWS EC2 with Ansible
page_description: Automated Provisioning of AWS Elastic Compute virtual machine with Ansible
page_keywords: Provision EC2, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, AWS, Ansible

# Provision AWS EC2 virtual machine with Ansible

This tutorial explains how to automate the provisioning of an AWS EC2 virtual machine using Ansible.

This document assumes you're familiar with the following concepts:

* [AWS EC2](https://aws.amazon.com/documentation/ec2/)
* [Ansible aws_ec2 module](https://docs.ansible.com/ansible/2.3/ec2_module.html)

## Manual Steps to provision an EC2 instance

You can run your ansible scripts manually on your local machine to provision a VM. This is the best way to get started, and once you know how it works, you can automate it.

* Have your security credentials handy to authenticate to your AWS Account. [AWS Creds](https://docs.aws.amazon.com/general/latest/gr/aws-security-credentials.html)

* Install Ansible based on the OS of the machine from which you plan to execute the script. [Ansible Install](http://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html)

* Ansible uses a convention of folder structure that looks something like below
    * **ansible.cfg** holds configuration info
    * **inventory** has the inventory of artifacts
    * **variables.yml** has the vars that you need for your scripts to make it more reusable
    * **ec2_prov_playbook.yml** is the playbook which has a list of tasks to provision an EC2 instance
    * **ec2_term_playbook.yml** is the playbook which has a list of tasks to terminate an EC2 instance

```
├── ansible.cfg
├── inventory
│   ├── base
│   ├── ec2.ini
│   ├── ec2.py
│   ├── static_hosts
├── variables.yml
├── ec2_prov_playbook.yml
├── ec2_term_playbook.yml
```

* If you do not have your own ansible playbooks, please feel free to clone our sample playbook here: [https://github.com/devops-recipes/prov_aws_ec2_ansible](https://github.com/devops-recipes/prov_aws_ec2_ansible)

* In our scenario, the important files are:
    * [ec2_prov_playbook.yml](https://github.com/devops-recipes/prov_aws_vpc_ansible/blob/master/ansible/vpc_prov_playbook.yml), which is the playbook that provisions an EC2 instance
    * [variables.yml](https://github.com/devops-recipes/prov_aws_vpc_ansible/blob/master/ansible/variables.yml), which contains wildcard settings for the playbook.
    * [ec2_term_playbook.yml](https://github.com/devops-recipes/prov_aws_vpc_ansible/blob/master/ansible/vpc_prov_playbook.yml), which is the playbook that terminates the EC2 instance

* It is important to note the following:
    * **ec2_prov_playbook.yml** and **ec2_term_playbook.yml** scripts have some wildcards, which ansible replaces with values from **variables.yml**.
    * Since we want to create a reusable playbook, we have not hardcoded values in **variables.yml** but left it up to the user to replace these when needed. This will be done in a later step, just before running the playbook.   

* Execute the following commands to set up your AWS credentials as environment variables. The playbook will need these at runtime.

```
export AWS_ACCESS_KEY_ID=<replace your key>
export AWS_SECRET_ACCESS_KEY=<replace your secret>
```

* In **ansible.cfg**, Replace `${AWS_EC2_PEM_KEYPATH}` with the path to the PEM key that is going to be used to provision this machine.

* In **variables.yml**, replace these wildcards with your desired values: `${ec2_region} ${ec2_tag_Type} ${ec2_image} ${ec2_keypair} ${ec2_volume_size} ${ec2_count} ${security_group_id} ${public_subnet_id} ${ec2_tag_Type} ${ec2_tag_Role}`.

* Execute the following command to run the ansible playbook from the directory that contains the playbook.

```
ansible-playbook -v ec2_prov_playbook.yml
```

* Verify on AWS if the EC2 machine was provisioned.

* You can terminate the instance by running the command below:

```
ansible-playbook -v ec2_term_playbook.yml
```

## Challenges with manually provisioning an EC2 instance with Ansible

There are a few challenges with manual execution of Ansible playbooks:

* Ansible playbook templates can be reused since they have wildcards. However, you need a programmatic way to replace wildcards at runtime. Creating static variables files is an option, but reduces reusability.
* Automating provisioning for different environments and creating a dependency tree of all applications that are deployed into that environment is tedious to achieve with manual steps. You need an automated workflow to effectively transfer information like subnet_id, security_group_id to downstream activities. for e.g. EC2 provisioners.
* Security with RBAC is a problem. The machine used to provision is authenticated to an AWS account (even in the case of service accounts). This means that the only way you can implement RBAC across multiple projects/teams is to use multiple accounts on the machine. This is messy and painful to maintain at scale.
* The machine has to be prepped with the right version of the CLI. If multiple teams are deploying and they have a need to use different versions of the CLI, you will need different deployment machines for each team.

In a nutshell, if you want to achieve frictionless execution of Ansible playbooks with modular, reusable playbooks, you need to templatize your playbooks and automate the workflow used to execute them.

## Automating the provisioning of AWS EC2 with Ansible

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
    * [PEM Key](/platform/integration/pemKey)
* [Resources](/platform/workflow/resource/overview/)
    * [gitRepo](/platform/workflow/resource/gitrepo)
    * [cliConfig](/platform/workflow/resource/cliconfig)
    * [integration](/platform/workflow/resource/integration)
    * [params](/platform/workflow/resource/params)
* [Jobs](/platform/workflow/job/overview/)
    * [runSh](/platform/workflow/job/runsh)

### Step by Step Instructions

The following sections explain the process of automating a workflow to provision AWS EC2 machine using Ansible. We will demonstrate this with our sample application.

**Source code is available at [devops-recipes/prov_aws_ec2_ansible](https://github.com/devops-recipes/prov_aws_ec2_ansible)**

**Complete YML is at [devops-recipes/prov_aws_ec2_ansible/shippable.yml](https://raw.githubusercontent.com/devops-recipes/prov_ec2_vpc_ansible/master/shippable.yml)**

####1. Add necessary Account Integrations

Integrations are used to connect your Shippable workflow with external providers. More information about integrations is [here](/platform/tutorial/integration/howto-crud-integration/). We will use integrations for AWS Keys and Github for this sample.

#####1a. Add AWS Keys Integration

To be able to interact with AWS, we need to add the `drship_aws `integration.

Detailed steps on how to add an AWS Keys Integration are [here](/platform/integration/gcloudKey/#creating-an-account-integration). Make sure you name the integration `drship_aws` since that is the name we're using in our sample automation scripts.

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step.

#####1b. Add Github Integration

In order to read your workflow configuration from Github, we need to add the `drship_github` integration. This points to the repository containing your Shippable workflow config file (`shippable.yml`) and ansible playbook files.

In our case, we're using the repository [devops-recipes/prov_aws_vpc_ansible](https://github.com/devops-recipes/prov_aws_vpc_ansible).

Detailed steps on how to add a Github Integration are [here](/platform/integration/github/#creating-an-account-integration). Make sure you name the integration `drship_github` since that is the name we're using in our sample automation scripts.

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step.

#####1c. Add PEM Key Integration

In order to SSH into an EC2 machine, we need a PEM key that is used to provision the machine (you could also do this with custom SSH key, in this case we are using the PEM key). We add `drship_aws_pem` integration to store it.

Detailed steps on how to add a PEM Key Integration are [here](/platform/integration/pemKey/#creating-an-account-integration).

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step

####2. Author Assembly Line configuration

The platform is built with "Everything as Code" philosophy, so all configuration is in a YAML-based file called `shippable.yml`, which is parsed to create your Assembly Line workflow.

Detailed documentation on `shippable.yml` is [here](/deploy/configuration).

If you're using our sample code, `shippable.yml` already exists and you can use it with a few modifications.

#####2a. Add empty shippable.yml to your repo

Add an empty `shippable.yml` file to the the root of repository.

#####2b. Add `resources` section of the config

`resources` section holds the config info that is necessary to deploy to a Kubernetes cluster. In this case we have four resources defined of type `integration`, `gitRepo` and `params`.

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

This resource points to the repository that contains your Ansible playbook files, so that they are accessible to your Assembly Line. For our example, these files are present in the repository [https://github.com/devops-recipes/prov_aws_vpc_ansible](https://github.com/devops-recipes/prov_aws_ec2_ansible), namely, [here](https://github.com/devops-recipes/prov_aws_ec2_ansible/tree/master/ansible).

Detailed info about `gitRepo` resource is [here](/platform/workflow/resource/gitrepo).

######ii. integration resource named `aws_ec2_creds`

To be able to interact with AWS, you need to configure your aws CLI. Your AWS credentials are securely stored in this integration, and you can extract them in your job and call `aws configure` with that information.

Detailed info about `integration` resource is [here](/platform/workflow/resource/integration).

######ii. integration resource named `aws_ec2_pem`

To be able to SSH into the EC2 machine, you need the PEM key that was used to provision it.

Detailed info about `integration` resource is [here](/platform/workflow/resource/integration).

######iv. params resource named `aws_ec2_info`

We store information like **instance_id** and **instance_ip**, which are created during the execution of your playbook, in a `params` resource. Downstream jobs can access this information programmatically if required. For example, a separate jobs that deploys to the machine will need to know the instance IP and ID.

Detailed info about `params` resource is [here](/platform/workflow/resource/params).

#####2c. Add `jobs` section of the config

A job is an execution unit of the Assembly Line. Our job has to perform three tasks:

* Replace the wildcards needed by the ansible playbook
* Run the playbook
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
          script:
            - pushd $(shipctl get_resource_state "aws_ec2_repo")/ansible
            - export AWS_ACCESS_KEY_ID=$(shipctl get_integration_resource_field aws_ec2_creds "accessKey")
            - export AWS_SECRET_ACCESS_KEY=$(shipctl get_integration_resource_field aws_ec2_creds "secretKey")
            - shipctl replace variables.yml
            - ansible-playbook -v ec2_prov_playbook.yml
      - OUT: aws_ec2_info
        overwrite: true
```

* Adding the above config to the jobs section of shippable.yml will create a `runSh` job called `prov_aws_ec2_ans`.

* The first section of `steps` defines all the input `IN` resources that are required to execute this job.
    * Ansible script files are under `./ansible` folder and it is version controlled in a repo represented by `aws_ec2_repo`.
    * Credentials to connect to AWS are in `aws_ec2_creds`. This resource has `switch: off` flag, so any changes to it will not trigger this job automatically

* The `TASK` section contains the actual code that is executed when the job runs. We have just one task named `prov_ec2` which does the following:
    * First, we define environment variables required by the ansible playbook-
        * `STATE_RES_NAME` is where we are going to store the outputs
        * `ec2_region` is the aws region where the EC2 is going to be provisioned
        * `ec2_tag_Type` is the type of instance and we also store that as a tag
        * `ec2_image` is AMI used to provision this instance
        * `ec2_keypair` is name of the AWS Key pair used to provision this instance
        * `ec2_tag_Role` is the role this instance plays and it is set as a tag
        * `ec2_volume_size` is size of the volume attached in GB
        * `ec2_count` is number of instances to provision
        * `security_group_id` get set implicity from `aws_vpc_info`
        * `public_subnet_id` get set implicity from `aws_vpc_info`
    *  `script` section has a list of commands which will be executed sequentially.
        * First, we use the Shippable utility function `get_resource_state` to go to the folder where Ansible playbook is stored
        * Next, we extract the AWS credentials from the `aws_ec2_creds`resource, again using shipctl functions
        * Next, we replace all wildcards in the playbook
        * Last, we execute the playbook. This step also updates the `aws_ec2_info` resource with `instance_id` and `instance_id` generated during playbook execution. To see where this magic happens, look at the last lines in the playbook `ec2_prov_playbook.yml`.

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

Commit and push all the above changes to `shippable.yml`.

####3. Add the Assembly Line to your Shippable organization

In Shippable's world, a Subscription maps to an Organization or a Team, depending on the source control provider. An Assembly Line workflow is defined at a Subscription level and all jobs are resources are global to your subscription.

To add your Assembly Line to Shippable, you need to add the repository containing the configuration as a "sync repository" by [following instructions here](/deploy/configuration/#adding-a-syncrepo). This automatically parses your `shippable.yml` config and adds your workflow to Shippable. Your workflow will always be kept in sync with the config in this repository, and be automatically updated every time you push a change to `shippable.yml`.

Your view will look something like this:

<img src="/images/tutorial/provision-aws-ec2-ansible-fig1.png" alt="Assembly Line view">

####4. Run the build job `prov_aws_ec2_ans`

You can manually run the job by right clicking on the job and clicking on `Build job`, or by committing a change to your repository containing ansible config.

<img src="/images/tutorial/provision-aws-ec2-ansible-fig2.png" alt="Build console output">

Confirm that the desired EC2 instance was created in AWS.

## OPTIONAL: Automating the termination of AWS EC2 with Ansible

You might also want to automatically terminate EC2 instances when you no longer need them. A great example is if you want to spin up a complete on-demand test environment and destroy them is tests pass.

The steps below demonstrate how to implement the automatic termination workflow.

### Step-by-Step Instructions

For this workflow, we start with the resources and jobs that were created in the provisioning tutorial above, and just add another job that will terminate the EC2 instance.

####1. Author Assembly Line configuration

In this step, we will add a new job to your `shippable.yml` that terminates an EC2 instance using Ansible.

#####1a. Add `jobs` section of the config**

Our job will do the following:

* Read information from `IN` resources, including `aws_ec2_info` which contains `instance_id` and `instance_ip`.
* Replace wildcards in the Ansible playbook.
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
    * EC2 provisioning scripts require two variables, `security_group_id` & `public_subnet_id`. These can be hardcoded, or they can be obtained from a `params` resource `aws_vpc_info`, which is updated by a job which provisions the VPC. To see how you can create a job to provision the VPC and output this information, read our tutorial on [Provisioning AWS VPC using Ansible](/provision/tutorial/provision-aws-vpc-ansible)

* The `TASK` section contains the actual code that is executed when the job runs. We have just one task named `term_ec2` which does the following:
    *  `script` section has a list of commands that are executed sequentially.
        * First, we use the Shippable utility function `get_resource_state` to go to the folder where Ansible playbook **ec2_term_playbook,yml** is stored
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

Commit and push all the above changes to shippable.yml.

This should automatically trigger the sync process to add all the changes to the assembly line. Your view should look something like this.

<img src="/images/tutorial/provision-aws-ec2-ansible-fig3.png" alt="Assembly Line view">

Detailed info to hook your AL is [here](/deploy/configuration/#adding-a-syncrepo).

####3. Run the build job `term_aws_ec2_ans`

You can manually run the job by right clicking on the job or by triggering the job to terminate AWS EC2 instances.

<img src="/images/tutorial/provision-aws-ec2-ansible-fig4.png" alt="Build console output">

## Further Reading
* [Working with Integrations](/platform/tutorial/integration/howto-crud-integration/)
* [Defining Resources in shippable.yml](/platform/tutorial/workflow/shippable-yml/#resources-config)
* [Defining Jobs in shippable.yml](/platform/tutorial/workflow/shippable-yml/#jobs-config)
* [Sharing information between Jobs](/platform/tutorial/workflow/sharing-data-between-jobs/)
