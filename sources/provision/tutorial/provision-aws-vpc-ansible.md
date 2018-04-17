page_main_title: Provision AWS VPC with Ansible
main_section: Tutorial
sub_section: AWS
sub_sub_section: VPC
page_title: Provision AWS Virtual Private Cloud with Ansible
page_description: Automated Provisioning of AWS VPC with Ansible
page_keywords: Provision VPC, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, AWS, Ansible

# Provision AWS VPC with Ansible
This tutorial explains how to automate the provisioning of AWS Virtual Private Cloud using Ansible. It also assumes that you have working knowledge of AWS VPC and Ansible and understand the following concepts.

* [AWS VPC](https://aws.amazon.com/documentation/vpc/)
* [Ansible aws_vpc](https://docs.ansible.com/ansible/2.3/ec2_vpc_module.html)

## Manual Steps to Deploy
This section covers step by step instructions to manually run an ansible script to provision AWS VPC.

* Have your security credentials handy to authenticate to your AWS Account. [AWS Creds](https://docs.aws.amazon.com/general/latest/gr/aws-security-credentials.html)
* Install Ansible based on the OS of the machine from which you plan to execute the script. [Ansible Install](http://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html)
* Ansible uses a convention of folder structure that looks something like below
 * `ansible.cfg` holds configuration info
 * `inventory` has the inventory of artifacts
 * `variables.yml` has the vars that you need for your scripts to make it more reusable
 * `vpc_prov_playbook.yml` is the playbook which has a list of what roles to execute where
 * `roles` is the stuff that playbooks execute. `main.yml` is where the actual ansible modules are defined

```
├── ansible.cfg
├── inventory
├── variables.yml
├── vpc_prov_playbook.yml
├── roles/
│   ├── vpc_provision/
│   │   ├── tasks/
│   │   │   ├── main.yml
```
The main files in our case are the following

**variables.yml** 

```
# actual file - https://github.com/devops-recipes/prov_aws_vpc_ansible/blob/master/ansible/variables.yml

# AWS region
aws_region:     "${vpc_region}"

# VPC Information
vpc_name:       "${vpc_name}"
vpc_cidr_block: "${vpc_cidr_block}"

# For Security Group Rule
my_ip_range:          "${vpc_access_from_ip_range}"

# Subnets
public_subnet_1_cidr:  "${vpc_public_subnet_1_cidr}"

```

**vpc_prov_playbook.yml** 

```
# actual file - https://github.com/devops-recipes/prov_aws_vpc_ansible/blob/master/ansible/vpc_prov_playbook.yml

---
### provision AWS VPC
- hosts: localhost
  connection: local
  gather_facts: false
  user: root
  pre_tasks:
    - include_vars: variables.yml
  roles:
    - vpc_provision

```

**roles/vpc_provision/tasks/main.yml** 

```
# actual file - https://github.com/devops-recipes/prov_aws_vpc_ansible/blob/master/ansible/roles/vpc_provision/tasks/main.yml

---

# roles/vpc_provision/tasks/main.yml

# First task : creating the VPC.
# We are using the variables set in the vars.yml file.
# The module gives us back its result,
# which contains information about our new VPC.
# We register it in the variable my_vpc.

- name:               Create VPC
  ec2_vpc_net:
    name:             "{{ vpc_name }}"
    cidr_block:       "{{ vpc_cidr_block }}"
    region:           "{{ aws_region }}"
    state:            "present"
  register: my_vpc


- name: sleep for 30 seconds and continue with play
  wait_for: timeout=30
  delegate_to: localhost

# We now use the set_fact module
# to save the id of the VPC in a new variable.

- name:               Set VPC ID in variable
  set_fact:
    vpc_id:           "{{ my_vpc.vpc.id }}"

# Creating our only Subnet in the VPC.
# A subnet needs to be located in an Availability Zone (or AZ).
# Again, we register the results in a variable for later.

- name:               Create Public Subnet
  ec2_vpc_subnet:
    state:            "present"
    vpc_id:           "{{ vpc_id }}"
    cidr:             "{{ public_subnet_1_cidr }}"
    az:               "{{ aws_region }}a"
    region:           "{{ aws_region }}"
    resource_tags:
      Name:           "Public Subnet"
  register: my_public_subnet


# We save the id of the Public Subnet in a new variable.

- name:               Set Public Subnet ID in variable
  set_fact:
    public_subnet_id: "{{ my_public_subnet.subnet.id }}"


# Every VPC needs at least one Internet Gateway.
# This component allows traffic between the VPC and the outside world.

- name:               Create Internet Gateway for VPC
  ec2_vpc_igw:
    vpc_id:           "{{ vpc_id }}"
    region:           "{{ aws_region }}"
    state:            "present"
  register: my_vpc_igw


# We save the id of the Internet Gateway in a new variable.

- name:               Set Internet Gateway ID in variable
  set_fact:
    igw_id:           "{{ my_vpc_igw.gateway_id }}"


# Now we set up a Route Table.
# We attach that Route Table to the Public Subnet.
# The route we create here defines the default routing
# of the table, redirecting requests to the Internet Gateway.
# We don't see it here, but the route table will also contain
# a route for resources inside the VPC, so that if we need
# to reach an internal resource, we don't go to the Internet
# Gateway.

- name:               Set up public subnet route table
  ec2_vpc_route_table:
    vpc_id:           "{{ vpc_id }}"
    region:           "{{ aws_region }}"
    tags:
      Name:           "Public"
    subnets:
      - "{{ public_subnet_id }}"
    routes:
      - dest:         "0.0.0.0/0"
        gateway_id:   "{{ igw_id }}"


# Finally, we create our Main Security Group.
# Basically the idea here is to allow SSH access
# from your IP to the EC2 resources you will
# start in your VPC.

- name:               Create Main Security Group
  ec2_group:
    name:             "My Security Group"
    description:      "My Security Group"
    vpc_id:           "{{ vpc_id }}"
    region:           "{{ aws_region }}"
    rules:
      - proto:        "tcp"
        from_port:    "22"
        to_port:      "22"
        cidr_ip:      "{{ my_ip_range }}"
  register: my_vpc_sg

- name:               Set Security Group ID in variable
  set_fact:
    sg_id:           "{{ my_vpc_sg.group_id }}"


```

* This is very straightforward ansible code that should be easy to follow. If you need a full working project, you can use this as a template [prov_aws_vpc_ansible](https://github.com/devops-recipes/prov_aws_vpc_ansible). You can replace all the variables in variable.yml and you should be able to run it.
* Execute the following commands to set AWS creds as environment variable

```
export AWS_ACCESS_KEY_ID=<replace your key>
export AWS_SECRET_ACCESS_KEY=<replace your secret>

```

* Replace these `${vpc_region} ${vpc_name} ${vpc_cidr_block} ${vpc_access_from_ip_range} ${vpc_public_subnet_1_cidr}` with your desired values in variables.yml
* Execute the following command to run the ansible playbook. Run this from the directory that contains the ansible playbook.

```
ansible-playbook -v vpc_prov_playbook.yml

```

* Verify on AWS if the VPC was created.

## Challenges with manual deployments
There are a few challenges with manual deployment

* Ansible templates can be reused since they have variables, if you can somehow find a programmatic way to supply those values. Creating static files will reduce re-usability. Even with a variables file, it somehow needs the values.
* Automating provisioning for different environments and creating a dependency tree of all apps that are deployed into your VPC is going to be very challenging to achieve with manual steps. You need an automated workflow to effectively transfer infromation like subnet_id, security_group_id to downstream jobs. for e.g. EC2 provisioners etc. 
* RBAC is going to be a huge problem. The machine used to provision is authenticated to an AWS Account (even in the case of service accounts). This means that the only way you can implement RBAC across multiple projects/teams is to use multiple user accounts on the machine. This is messy and painful to maintain at scale.
* The machine has to be prepped with the right version of the CLI. If multiple teams are deploying and they have a need to use different versions of the CLI, you will need different deployment machines


## Automating the provisioning of AWS VPC with Ansible
We are going to address the challenges above in a systematic way by using Assembly Lines (AL) that Shippable provides. AL offers a variety of benefits, the prominent being

* Capability to create an event driven workflow that automates the entire software delivery lifecycle
* Ability to create RBAC and contextually inject credentials based on who/what is running the deployment job
* Using templatized spec files and dynamically inject wildcard values depending on the state of the workflow
* A graphical way to visualize your workflow and it's current status

To jump into this tutorial, you will need to familiarize yourself with a few platform concepts.

### Concepts
* [Integrations](/platform/integration/overview/)
  * [Google Cloud](/platform/integration/gcloudKey)
  * [Github](/platform/integration/github)
* [Resources](/platform/workflow/resource/overview/)
  * [gitRepo](/platform/workflow/resource/gitrepo)
  * [cliConfig](/platform/workflow/resource/cliconfig)
* [Jobs](/platform/workflow/job/overview/)
  * [runSh](/platform/workflow/job/runsh)

### Step by Step Instructions
The following sections explain the process of setting up a workflow to automate the provisioning of AWS VPC using Ansible.

**Source code is available at [devops-recipes/prov_aws_vpc_ansible](https://github.com/devops-recipes/prov_aws_vpc_ansible)**

**Complete YML is at [devops-recipes/prov_aws_vpc_ansible/shippable.yml](https://raw.githubusercontent.com/devops-recipes/prov_aws_vpc_ansible/master/shippable.yml)**

####1. Add necessary Account Integrations
Integrations are used to connect Shippable Platform with external providers. More information about integrations is [here](/platform/tutorial/integration/howto-crud-integration/). The following are the integrations that we will use in this sample

**1a. Add `AWS Keys` Integration**

To be able to interact with AWS, we add `drship_aws` integration.

Detailed steps on how to add a AWS Keys Integration are [here](/platform/integration/aws-keys/#creating-an-account-integration).

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step

**1b. Add `Github` Integration**

In order to read your AL configuration from Github, we add `drship_github` integration. This is the repo where you are going to store your AL config file (`shippable.yml`) and Kubernetes config files.

In this case this we are using repo [`devops-recipes/gcp_image_with_packer `](https://github.com/devops-recipes/prov_aws_vpc_ansible).

Detailed steps on how to add a Github Integration are [here](/platform/integration/github/#creating-an-account-integration).

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step

####2. Author Assembly Line configuration
The platform is built with "Everything as Code" philosophy and it uses YAML based configuration file called `shippable.yml`. Jobs and Resources section from your `shippable.yml` are parsed to create the AL.

Detailed AL configuration info is [here](/deploy/configuration).

**2a. Add empty shippable.yml to your repo**

Add an empty config file to the the root of your repo.

**2b. Add `resources` section of the config**

`resources` section holds the config info that is necessary to deploy to a Kubernetes cluster. In this case we have 4 resources defined of type `cliConfig` and `gitRepo`.

```
resources:
# Automation scripts repo
  - name: aws_vpc_repo
    type: gitRepo
    integration: "drship_github"
    versionTemplate:
      sourceName: "devops-recipes/prov_aws_vpc_ansible"
      branch: master

# AWS CLI config
  - name: aws_cli_vpc
    type: cliConfig
    integration: "drship_aws"
    pointer:
      region: us-east-1

# Output of VPC provisioning
  - name: aws_vpc_info
    type: params
    versionTemplate:
      params:
        SEED: "initial_version"
```
#####i. gitRepo resource named `aws_vpc_repo`
Your Ansible scripts will be placed in a repo and the assembly line needs to know where to find them. For this e.g. scripts are present in `https://github.com/devops-recipes/prov_aws_vpc_ansible`

Ansible script files for this app are [here](https://github.com/devops-recipes/prov_aws_vpc_ansible/tree/master/ansible)

Detailed info about `gitRepo` resource is [here](/platform/workflow/resource/gitrepo).

#####ii. cliConfig resource named `aws_cli_vpc`
To be able to interact with AWS Cloud, you need to authenticate your aws cli. Shippable does this for you automatically when a `cliConfig` resource is present in a job.

Detailed info about `cliConfig` resource is [here](/platform/workflow/resource/cliconfig).

#####iii. params resource named `aws_vpc_info`
If downstream jobs need information like vpc_id, subnet_id etc. we need to store that info that downstream jobs can access it systematically. Hence we are creating a params resource to store the output information from the job.

Detailed info about `params` resource is [here](/platform/workflow/resource/params).

**2c. Add `jobs` section of the config**

A job is the actual execution unit of the assembly line. In this job, we are going to do three things

* First, we define the variables that are needed by ansible.
* Second, we are going run the ansible playbook
* Lastly, we are going to output the key information into a params resource

```
jobs:
  - name: prov_aws_vpc_ans
    type: runSh
    steps:
      - IN: aws_vpc_repo
      - IN: aws_cli_vpc
        switch: off
      - TASK:
          name: prov_vpc
          runtime:
            options:
              env:
                - STATE_RES_NAME: "aws_vpc_info"
                - vpc_region: "us-east-1"
                - vpc_name: "demo_vpc"
                - vpc_cidr_block: "10.10.0.0/16"
                - vpc_access_from_ip_range: "0.0.0.0/0"
                - vpc_public_subnet_1_cidr: "10.10.10.0/24"
          script:
            - pushd $(shipctl get_resource_state "aws_vpc_repo")/ansible
            - shipctl replace variables.yml
            - ansible-playbook -v vpc_prov_playbook.yml
      - OUT: aws_vpc_info
        overwrite: true
```
* Adding the above config to the jobs section of shippable.yml will create a `runSh` job called `prov_aws_vpc_ans`.
* The first section of `steps` defines all the input `IN` resources that are required to execute this job.
  * Ansible script files are under `./ansible` folder and it is version controlled in a repo represented by `aws_vpc_repo`.
  * Credentials to connect to AWS is in `aws_cli_vpc`. This resource has `switch: off` flag which means any changes to it will not trigger this job automatically
* The `TASK` section is the actual code that is executed when the job runs. 
  *  Name of the task is `prov_vpc`
  *  It sets up an environment variables required by ansible playbook during execution
    * `STATE_RES_NAME` is where we are going to store the outputs
    * `vpc_region` is the aws region where the VPC is going to be created
    * `vpc_name` is the name of the VPC
    * `vpc_cidr_block` is the address space of the VPC
    * `vpc_access_from_ip_range` is the IP range that you want to limit access to resources in this VPC. Here we are opening this up to WWW
    * `vpc_public_subnet_1_cidr` is the address range of the public subnet we are creating
  *  `script` section has the list of commands to execute. The commands are preforming 3 core things
    *  First is the "We define variables". Here we are using utility function `get_resource_state` on `aws_vpc_repo` to get the folder where ansible files are stored. Then we replace the `variables.yml` with current values using the utility function `shipctl replace`
    *  Second, we "run the playbook". We supply all the variables needed by the playbook and execute it
    *  Last step is "Output critical info". The way we do this is by adding this to the `main.yml`. Since its gathering all the facts at each step, we then output all of that info into STATE_RES_NAME which was defined in the variables.yml

```
- name: run cmd
  shell: |
    shipctl put_resource_state_multi "{{ STATE_RES_NAME }}" "vpc_id={{ vpc_id }}" "igw_id={{ igw_id }}" "public_subnet_id={{ public_subnet_id }}" "security_group_id={{ sg_id }}"

```

Detailed info about `runSh` job is [here](/platform/workflow/job/runsh).

Detailed info about Shippable Utility functions are [here](/platform/tutorial/workflow/using-shipctl).

**2d. Push changes to shippable.yml**

Commit and push all the above changes to shippable.yml.

####3. Attach the AL to your Repo's Subscription
In Shippable's world, an Org or a Group depending on the SCM system you are using equate to a Subscription. We will hook the YML so that the platform can render the AL.

This should automatically trigger the sync process to add all the changes to the assembly line. Your view should look something like this.

<img src="/images/tutorial/provision-aws-vpc-ansible-fig1.png" alt="Assembly Line view">

Detailed info to hook your AL is [here](/deploy/configuration/#adding-a-syncrepo).

###4. Run the build job `prov_aws_vpc_ans`
You can manually run the job by right clicking on the job or by triggering the job to provision AWS VPC.

<img src="/images/tutorial/provision-aws-vpc-ansible-fig2.png" alt="Build console output">

## Further Reading
* [Working with Integrations](/platform/tutorial/integration/howto-crud-integration/)
* [Defining Resources in shippable.yml](/platform/tutorial/workflow/shippable-yml/#resources-config)
* [Defining Jobs in shippable.yml](/platform/tutorial/workflow/shippable-yml/#jobs-config)
* [Sharing information between Jobs](/platform/tutorial/workflow/sharing-data-between-jobs/)
* Using specific version of Google CLI
* Creating parametrized Jobs
* Using templates inside your Job
* Logging into your deployment cluster using CLI
