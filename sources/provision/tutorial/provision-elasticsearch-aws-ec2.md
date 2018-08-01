page_main_title: Provision Elasticsearch on AWS EC2
main_section: IT Ops
sub_section: AWS infrastructure
page_title: Provision Elasticsearch on AWS EC2
page_description: Provision Elasticsearch on AWS EC2
page_keywords: Provision elasticsearch, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, AWS

# Provision Elasticsearch on AWS EC2

This tutorial explains how to automate provisioning of Elasticsearch on a AWS EC2 machine.

* [Elasticsearch](https://www.elastic.co/products/elasticsearch)
* [AWS EC2](https://aws.amazon.com/ec2/)

The idea is to provision a Virtual Machine on AWS using [a runSh job](/platform/workflow/job/runsh/) and use it to install Elasticsearch over SSH.

The following links contain information on how to automate provisioning of AWS EC2 Virtual Machine with Shippable Assembly lines.

* [Provision AWS EC2 virtual machines with Terraform](/provision/tutorial/provision-aws-ec2-terraform)
* [Provision AWS EC2 virtual machines with Ansible](/provision/tutorial/provision-aws-ec2-ansible)

### Step by Step Instructions

The following sections explain the process of automating a workflow to install Elasticsearch on already provisioned AWS EC2 Virtual Machine.

**Source code is available at [devops-recipes/install_ec2_elasticsearch](https://github.com/devops-recipes/install_ec2_elasticsearch)**

**Complete YML is at [devops-recipes/install_ec2_elasticsearch/shippable.yml](https://raw.githubusercontent.com/devops-recipes/install_ec2_elasticsearch/master/shippable.yml)**

####1. Add necessary Account Integrations

Integrations are used to connect your Shippable workflow with external providers. More information about integrations is [here](/platform/tutorial/integration/howto-crud-integration/). We will use integrations for Google Cloud and Github for this sample.

#####1a. Add Github Integration

In order to read your workflow configuration from Github, we need to add the `drship_github` integration. This points to the repository containing your Shippable workflow config file (**shippable.yml**) and Elasticsearch installation script files.

In our case, we're using the repository [devops-recipes/install_ec2_elasticsearch](https://github.com/devops-recipes/install_ec2_elasticsearch).

Detailed steps on how to add a Github Integration are [here](/platform/integration/github/#creating-an-account-integration). Make sure you name the integration `drship_github` since that is the name we're using in our sample automation scripts.

> Note: You might already have this if you have done some of our other tutorials. If so, skip this step.

####2. Author Assembly Line configuration

The platform is built with "Everything as Code" philosophy, so all configuration is in a YAML-based file called **shippable.yml**, which is parsed to create your Assembly Line workflow.

Detailed documentation on **shippable.yml** is [here](/platform/workflow/config/#assembly-lines-configuration).

If you're using our sample code, **shippable.yml** already exists and you can use it with a few modifications.

#####2a. Add empty shippable.yml to your repo

Add an empty **shippable.yml** file to the the root of repository.

#####2b. Add `resources` section of the config

`resources` section holds the config info that is necessary to install elasticsearch on AWS EC2 VM. In this case we have 1 resource defined of type `gitRepo`.

Add the following to your **shippable.yml**:

```
resources:
  - name: install_ec2_elasticsearch_repo
    type: gitRepo
    integration: "drship_github"
    versionTemplate:
      sourceName: "devops-recipes/install_ec2_elasticsearch"
      branch: master
```

######i. gitRepo resource named `install_ec2_elasticsearch_repo`

This resource points to the repository that contains the elasticsearch installation script, so that they are accessible to your Assembly Line. For our example, these files are present in the repository [devops-recipes/install_ec2_elasticsearch](https://github.com/devops-recipes/install_ec2_elasticsearch), namely, [here](https://github.com/devops-recipes/install_ec2_elasticsearch/blob/master/install_elasticsearch.sh).

Detailed info about `gitRepo` resource is [here](/platform/workflow/resource/gitrepo).

#####2c. Add `jobs` section of the config

A job is an execution unit of the Assembly Line. Our job has to perform three tasks:

* Transfer the installation script to AWS EC2 VM
* Execute the installation script on the AWS EC2 VM

Add the following to your **shippable.yml**:

```
jobs:
  - name: install_ec2_elasticsearch_job
    type: runSh
    steps:
      - IN: install_ec2_elasticsearch_repo
        switch: off
      - IN: aws_ec2_tf_ssh
        switch: off
      - IN: aws_ec2_tf_info
        switch: off
      - TASK:
          name: install_elasticsearch
          script:
            - pushd $(shipctl get_resource_state "install_ec2_elasticsearch_repo")
            - scp -i $AWS_EC2_TF_SSH_KEYPATH ./install_elasticsearch.sh ubuntu@$ec2_ins_0_ip:install_elasticsearch.sh
            - ssh -i $AWS_EC2_TF_SSH_KEYPATH ubuntu@$ec2_ins_0_ip "chmod +x install_elasticsearch.sh"
            - ssh -i $AWS_EC2_TF_SSH_KEYPATH ubuntu@$ec2_ins_0_ip "sudo ./install_elasticsearch.sh"
            - popd
    flags:
      - aws
      - elasticsearch

  - name: uninstall_ec2_elasticsearch_job
    type: runSh
    steps:
      - IN: install_ec2_elasticsearch_repo
        switch: off
      - IN: aws_ec2_tf_ssh
        switch: off
      - IN: aws_ec2_tf_info
        switch: off
      - TASK:
          name: uninstall_elasticsearch
          script:
            - ssh -i $AWS_EC2_TF_SSH_KEYPATH ubuntu@$ec2_ins_0_ip "sudo apt-get --purge autoremove -y elasticsearch"
    flags:
      - aws
      - elasticsearch
```

* Adding the above config to the jobs section of shippable.yml will create a `runSh` jobs called `install_ec2_elasticsearch_job` and `uninstall_ec2_elasticsearch_job`.

* The first section of `steps` defines all the input `IN` resources that are required to execute this job.
    * Elasticsearch installation script is version controlled in a git repo represented by `install_ec2_elasticsearch_repo`. This resource has `switch: off` flag which means any changes to it will not trigger this job automatically.
    * SSH Credentials to connect to AWS EC2 machine are in `aws_ec2_tf_ssh`.
    * `aws_ec2_tf_info` is a params resource containing the information about the AWS EC2 virtual machine that was created in [Provision AWS EC2 virtual machines with Terraform](provision/tutorial/provision-aws-ec2-terraform).

* The `TASK` section contains actual code that is executed when the job runs. We have just one task named `install_elasticsearch` which does the following:
    *  `script` section has a list of commands to execute sequentially.
      * First, we use the Shippable utility function `get_resource_state` to go to the folder where Elasticsearch installation script is stored.
      * `scp` is used to transfer the Elasticsearch installation script to AWS EC2 VM.
      * `ssh` is used to execute the Elasticsearch installation script in AWS EC2 VM.

Detailed info about `runSh` job is [here](/platform/workflow/job/runsh).

Detailed info about Shippable Utility functions is [here](/platform/tutorial/workflow/using-shipctl).

#####2d. Push changes to shippable.yml

Commit and push all the above changes to **shippable.yml**.

####3. Add the Assembly Line to your Shippable organization

In Shippable's world, a Subscription maps to an Organization or a Team, depending on the source control provider. An Assembly Line workflow is defined at a Subscription level and all jobs are resources are global to your subscription.

To add your Assembly Line to Shippable, you need to add the repository containing the configuration as a "sync repository" by [following instructions here](/platform/tutorial/workflow/add-assembly-line). This automatically parses your **shippable.yml** config and adds your workflow to Shippable. Your workflow will always be kept in sync with the config in this repository, and be automatically updated every time you push a change to **shippable.yml**.

Your view will look something like this:

<img src="/images/tutorial/provision-elasticsearch-aws-ec2-fig1.png" alt="Assembly Line view">

####4. Run the job `install_ec2_elasticsearch_job` and `uninstall_ec2_elasticsearch_job`

You can manually run the job by right clicking on the job and clicking on `Build job`.

<img src="/images/tutorial/provision-elasticsearch-aws-ec2-fig2.png" alt="Build console output">

For uninstalling Elasticsearch from the AWS EC2 machine, run `uninstall_ec2_elasticsearch_job`

<img src="/images/tutorial/provision-elasticsearch-aws-ec2-fig3.png" alt="Build console output">

## Further Reading
* [Defining Resources in shippable.yml](/platform/workflow/config/#resources)
* [Defining Jobs in shippable.yml](/platform/workflow/config/#jobs)
* [Sharing information between Jobs](/platform/tutorial/workflow/share-info-across-jobs/)
