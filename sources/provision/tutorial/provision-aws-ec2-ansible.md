page_main_title: Provision AWS EC2 with Ansible
main_section: Tutorial
sub_section: AWS
sub_sub_section: EC2
page_title: Provision AWS EC2 with Ansible
page_description: Automated Provisioning of AWS Elastic Compute virtual machine with Ansible
page_keywords: Provision EC2, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, AWS, Ansible

# Provision AWS EC2 virtual machine with Ansible
This tutorial explains how to automate the provisioning of AWS EC2 virtual machine using Ansible. It also assumes that you have working knowledge of AWS EC2 and Ansible and understand the following concepts.

* [AWS EC2](https://aws.amazon.com/documentation/ec2/)
* [Ansible aws_ec2](https://docs.ansible.com/ansible/2.3/ec2_module.html)

## Manual Steps to Deploy
This section covers step by step instructions to manually run an ansible script to provision AWS EC2 VM.

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
│   ├── base
│   ├── ec2.ini
│   ├── ec2.py
│   ├── static_hosts
├── variables.yml
├── ec2_prov_playbook.yml
├── ec2_term_playbook.yml
├── roles/
│   ├── ec2_provision/
│   │   ├── tasks/
│   │   │   ├── main.yml
│   ├── ec2_terminate/
│   │   ├── tasks/
│   │   │   ├── main.yml

```
The main files in our case are the following

**ansible.cfg** 

```
# actual file - https://github.com/devops-recipes/prov_aws_ec2_ansible/blob/master/ansible/ansible.cfg

[defaults]
# update, as needed, for your scenario
host_key_checking=false
inventory = inventory/

# replace with your private key file or other auth method
private_key_file=${AWS_EC2_PEM_KEYPATH}

# for running on Ubuntu
control_path=%(directory)s/%%h-%%r
```


**variables.yml** 

```
# actual file - https://github.com/devops-recipes/prov_aws_ec2_ansible/blob/master/ansible/variables.yml

ec2_region: "${ec2_region}"
ec2_instance_type: "${ec2_tag_Type}"
ec2_image: "${ec2_image}"
ec2_keypair: "${ec2_keypair}"
ec2_volume_size: ${ec2_volume_size}
ec2_count: ${ec2_count}
ec2_security_group_id: "${security_group_id}"
ec2_subnet_id: "${public_subnet_id}"
ec2_tag_Type: "${ec2_tag_Type}"
ec2_tag_Role: "${ec2_tag_Role}"

```

**ec2_prov_playbook.yml** 

```
# actual file - https://github.com/devops-recipes/prov_aws_ec2_ansible/blob/master/ansible/ec2_prov_playbook.yml
---
### provision AWS EC2 instance
- hosts: localhost
  connection: local
  gather_facts: false
  user: root
  pre_tasks:
    - include_vars: variables.yml
  roles:
    - ec2_provision
  post_tasks:
    - name: refresh hosts inventory list
      meta: refresh_inventory

```

**roles/ec2_provision/tasks/main.yml** 

```
# actual file - https://github.com/devops-recipes/prov_aws_ec2_ansible/blob/master/ansible/roles/ec2_provision/tasks/main.yml

---
---
- name: Provision {{ ec2_count }} instances with tag {{ ec2_tag_Role }}
  local_action:
    module: ec2
    key_name: "{{ ec2_keypair }}"
    group_id: "{{ ec2_security_group_id }}"
    instance_type: "{{ ec2_instance_type }}"
    image: "{{ ec2_image }}"
    vpc_subnet_id: "{{ ec2_subnet_id }}"
    region: "{{ ec2_region }}"
    instance_tags: '{"Type":"{{ec2_instance_type}}", "Role":"{{ec2_tag_Role}}"}'
    assign_public_ip: yes
    wait: true
    exact_count: "{{ ec2_count }}"
    count_tag:
      Role: "{{ ec2_tag_Role }}"
    volumes: 
      - device_name: /dev/xvda
        volume_type: gp2
        volume_size: "{{ ec2_volume_size }}"
        delete_on_termination: true
  register: ec2

- add_host: 
    name: "{{ item.public_ip }}" 
    groups: tag_Type_{{ec2_tag_Type}}
    ec2_region: "{{ ec2_region }}"
    ec2_tag_Type: "{{ ec2_tag_Type}}"
    ec2_tag_Role: "{{ ec2_tag_Role }}"
    ec2_ip_address: "{{ item.public_ip }}"
  with_items: "{{ ec2.instances }}"

- name: Wait for the instances to boot by checking the ssh port
  wait_for: host={{item.public_ip}} port=22 delay=15 timeout=300 state=started
  with_items: "{{ ec2.instances }}"

```

* This is very straightforward ansible code that should be easy to follow. If you need a full working project, you can use this as a template [prov_aws_ec2_ansible](https://github.com/devops-recipes/prov_aws_ec2_ansible). You can replace all the variables in variable.yml and you should be able to run it.
* Execute the following commands to set AWS creds as environment variable

```
export AWS_ACCESS_KEY_ID=<replace your key>
export AWS_SECRET_ACCESS_KEY=<replace your secret>

```
* Replace `${AWS_EC2_PEM_KEYPATH}` with the path to the PEM key that is going to be used to provision this machine. 

* Replace these `${ec2_region} ${ec2_tag_Type} ${ec2_image} ${ec2_keypair} ${ec2_volume_size} ${ec2_count} ${security_group_id} ${public_subnet_id} ${ec2_tag_Type} ${ec2_tag_Role}` with your desired values in variables.yml.
* Execute the following command to run the ansible playbook. Run this from the directory that contains the ansible playbook.

```
ansible-playbook -v ec2_term_playbook.yml

```

* Verify on AWS if the EC2 machine was provisioned.

## Challenges with manual deployments
There are a few challenges with manual deployment

* Ansible templates can be reused since they have variables, if you can somehow find a programmatic way to supply those values. Creating static files will reduce re-usability. Even with a variables file, it somehow needs the values.
* Automating provisioning for different environments and creating a dependency tree of all apps that are deployed into your VPC is going to be very challenging to achieve with manual steps. You need an automated workflow to effectively transfer infromation like subnet_id, security_group_id to downstream jobs. for e.g. EC2 provisioners etc. 
* RBAC is going to be a huge problem. The machine used to provision is authenticated to an AWS Account (even in the case of service accounts). This means that the only way you can implement RBAC across multiple projects/teams is to use multiple user accounts on the machine. This is messy and painful to maintain at scale.
* The machine has to be prepped with the right version of the CLI. If multiple teams are deploying and they have a need to use different versions of the CLI, you will need different deployment machines


## Automating the provisioning of AWS EC2 with Ansible
We are going to address the challenges above in a systematic way by using Assembly Lines (AL) that Shippable provides. AL offers a variety of benefits, the prominent being

* Capability to create an event driven workflow that automates the entire software delivery lifecycle
* Ability to create RBAC and contextually inject credentials based on who/what is running the deployment job
* Using templatized spec files and dynamically inject wildcard values depending on the state of the workflow
* A graphical way to visualize your workflow and it's current status

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
The following sections explain the process of setting up a workflow to automate the provisioning of AWS Ec2 using Ansible.

**Source code is available at [devops-recipes/prov_aws_ec2_ansible](https://github.com/devops-recipes/prov_aws_ec2_ansible)**

**Complete YML is at [devops-recipes/prov_aws_ec2_ansible/shippable.yml](https://raw.githubusercontent.com/devops-recipes/prov_ec2_vpc_ansible/master/shippable.yml)**

####1. Add necessary Account Integrations
Integrations are used to connect Shippable Platform with external providers. More information about integrations is [here](/platform/tutorial/integration/howto-crud-integration/). The following are the integrations that we will use in this sample

**1a. Add `AWS Keys` Integration**

To be able to interact with AWS, we add `drship_aws` integration.

Detailed steps on how to add a AWS Keys Integration are [here](/platform/integration/aws-keys/#creating-an-account-integration).

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step

**1b. Add `Github` Integration**

In order to read your AL configuration from Github, we add `drship_github` integration. This is the repo where you are going to store your AL config file (`shippable.yml`) and Ansible script files.

In this case this we are using repo [`devops-recipes/prov_aws_ec2_ansible`](https://github.com/devops-recipes/prov_aws_ec2_ansible).

Detailed steps on how to add a Github Integration are [here](/platform/integration/github/#creating-an-account-integration).

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step

**1c. Add `PEM Key` Integration**

In order to SSH into an EC2 machine, we need the PEM key that is used to provision the machine (you could also do this with custom SSH key, in this case we are using the PEM key). We add `drship_aws_pem` integration to store it. 

Detailed steps on how to add a PEM Key Integration are [here](/platform/integration/pemKey/#creating-an-account-integration).

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step

####2. Author Assembly Line configuration
The platform is built with "Everything as Code" philosophy and it uses YAML based configuration file called `shippable.yml`. Jobs and Resources section from your `shippable.yml` are parsed to create the AL.

Detailed AL configuration info is [here](/deploy/configuration).

**2a. Add empty shippable.yml to your repo**

Add an empty config file to the the root of your repo.

**2b. Add `resources` section of the config**

`resources` section holds the config info that is necessary to deploy to a Kubernetes cluster. In this case we have 4 resources defined of type `cliConfig`, `gitRepo`, `integration` and `params`.

```
resources:
# Automation scripts repo
  - name: aws_ec2_repo
    type: gitRepo
    integration: "drship_github"
    versionTemplate:
      sourceName: "devops-recipes/prov_aws_ec2_ansible"
      branch: master

# AWS CLI config
  - name: aws_cli_ec2
    type: cliConfig
    integration: "drship_aws"
    pointer:
      region: us-east-1

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
#####i. gitRepo resource named `aws_ec2_repo`
Your Ansible scripts will be placed in a repo and the assembly line needs to know where to find them. For this e.g. scripts are present in `https://github.com/devops-recipes/prov_aws_ec2_ansible`

Ansible script files for this app are [here](https://github.com/devops-recipes/prov_aws_ec2_ansible/tree/master/ansible)

Detailed info about `gitRepo` resource is [here](/platform/workflow/resource/gitrepo).

#####ii. cliConfig resource named `aws_cli_ec2`
To be able to interact with AWS Cloud, you need to authenticate your aws cli. Shippable does this for you automatically when a `cliConfig` resource is present in a job.

Detailed info about `cliConfig` resource is [here](/platform/workflow/resource/cliconfig).

#####ii. integration resource named `aws_ec2_pem`
To be able to SSH into EC2 machine, you need the PEM key that was used to provision it. 

Detailed info about `integration` resource is [here](/platform/workflow/resource/integration).

#####iv. params resource named `aws_ec2_info`
If downstream jobs need information like instance_id, instance_ip etc. we need to store that info so that downstream jobs can access it systematically. Hence we are creating a params resource to store the output information from the job.

Detailed info about `params` resource is [here](/platform/workflow/resource/params).

**2c. Add `jobs` section of the config**

A job is the actual execution unit of the assembly line. In this job, we are going to do three things

* First, we define the variables that are needed by ansible.
* Second, we are going run the ansible playbook
* Lastly, we are going to output the key information into a params resource

```
jobs:
# Provision AWS EC2 with Ansible
  - name: prov_aws_ec2_ans
    type: runSh
    steps:
      - IN: aws_ec2_repo
        switch: off
      - IN: aws_cli_ec2
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
            - shipctl replace group_vars/variables.yml
            - ansible-playbook -v ec2_prov_playbook.yml
      - OUT: aws_ec2_info
        overwrite: true
```
* Adding the above config to the jobs section of shippable.yml will create a `runSh` job called `prov_aws_ec2_ans`.
* The first section of `steps` defines all the input `IN` resources that are required to execute this job.
  * Ansible script files are under `./ansible` folder and it is version controlled in a repo represented by `aws_ec2_repo`.
  * Credentials to connect to AWS is in `aws_cli_ec2`. This resource has `switch: off` flag which means any changes to it will not trigger this job automatically.
  * PEM key that can be used to SSH into the EC2 machine is in `aws_ec2_pem`. This input creates an ENV var called `$AWS_EC2_PEM_KEYPATH` which has path to the key file on the machine on which the job executes. We use this in `ansible.cfg`.
  * EC2 provisioning scripts require 2 variables, `security_group_id` & `public_subnet_id`. These can be hardcoded, but we want to build Assembly Lines. So we get this from an upstream VPC provisioning job that output a params resource that has this information. The advantage of doing it this way is that we have built a dependency tree between VPC and the machines that exist in it. `aws_vpc_info` has that information and hence we are adding that as an input. This tutorial has [step by step information of provisioning AWS VPC using Ansible](/provision/tutorial/provision-aws-vpc-ansible) and it generates the values stored in the param.
* The `TASK` section is the actual code that is executed when the job runs. 
  *  Name of the task is `prov_ec2`
  *  It sets up an environment variables required by ansible playbook during execution
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
  *  `script` section has the list of commands to execute. The commands are preforming 3 core things
    *  First is the "We define variables". Here we are using utility function `get_resource_state` on `aws_ec2_repo` to get the folder where ansible files are stored. Then we replace the `variables.yml` with current values using the utility function `shipctl replace`
    *  Second, we "run the playbook". We supply all the variables needed by the playbook and execute it
    *  Last step is "Output critical info". The way we do this is by adding this to the `main.yml`. Since its gathering all the facts at each step, we then output all of that info into STATE_RES_NAME which was defined in the variables.yml

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

**2d. Push changes to shippable.yml**

Commit and push all the above changes to shippable.yml.

####3. Attach the AL to your Repo's Subscription
In Shippable's world, an Org or a Group depending on the SCM system you are using equate to a Subscription. We will hook the YML so that the platform can render the AL.

This should automatically trigger the sync process to add all the changes to the assembly line. Your view should look something like this.

<img src="/images/tutorial/provision-aws-ec2-ansible-fig1.png" alt="Assembly Line view">

Detailed info to hook your AL is [here](/deploy/configuration/#adding-a-syncrepo).

###4. Run the build job `prov_aws_ec2_ans`
You can manually run the job by right clicking on the job or by triggering the job to provision AWS EC2.

<img src="/images/tutorial/provision-aws-ec2-ansible-fig2" alt="Build console output">

## Further Reading
* [Working with Integrations](/platform/tutorial/integration/howto-crud-integration/)
* [Defining Resources in shippable.yml](/platform/tutorial/workflow/shippable-yml/#resources-config)
* [Defining Jobs in shippable.yml](/platform/tutorial/workflow/shippable-yml/#jobs-config)
* [Sharing information between Jobs](/platform/tutorial/workflow/sharing-data-between-jobs/)
* Using specific version of Google CLI
* Creating parametrized Jobs
* Using templates inside your Job
* Logging into your deployment cluster using CLI
