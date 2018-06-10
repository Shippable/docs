main_section: Deploy
sub_section: Deploy to VMs
page_description: Deploying a Java WAR application from Nexus Repository manager to an AWS EC2 virtual machine using Ansible playbooks

# Deploying a Java WAR package from Nexus to AWS EC2 using Ansible

This tutorial explains how to automate the deployment of a Java-based WAR package stored on Nexus Repository Manager to a virtual machine running on AWS EC2 using Ansible playbooks.

This document assumes you're familiar with the following concepts:

* [Nexus Repository Quick Start](https://help.sonatype.com/learning/repository-manager-3/proxying-maven-and-npm-quick-start-guide)
* [AWS EC2](https://aws.amazon.com/documentation/ec2/)
* [Ansible Playbooks](https://docs.ansible.com/ansible/2.3/playbooks.html)
* [Ansible maven_artifact module](https://docs.ansible.com/ansible/2.3/maven_artifact_module.html)
* [Ansible shell module](https://docs.ansible.com/ansible/2.3/shell_module.html)
* [Ansible copy module](https://docs.ansible.com/ansible/2.3/copy_module.html)

If you're unfamiliar with Ansible, it would be good to start with learning how to deploy packages manually with playbooks. Refer to our blog for a step-by-step tutorial: [Deploy a WAR package from Nexus to AWS using Ansible](http://blog.shippable.com/deploy-a-war-package-from-nexus-to-aws-using-ansible).

There are many challenges with manually running Ansible playbooks. In short, you will struggle with making playbooks reusable and injecting the right values for wildcards at runtime, and managing security and accounts on the machine used to run the playbook. Also, if you have dependent workflows, you will have to manually go trigger each one.

If you want to achieve frictionless execution of Ansible playbooks with modular, reusable playbooks, you need to templatize your playbooks and automate the workflow used to execute them.

## Automating the deployment of WAR from Nexus to an EC2 machine

You can easily automate your workflow using Shippable's Assembly Lines. The following Assembly Line features are particularly noteworthy for this scenario:

* Creating an event-driven, automated workflow
* Securing workflow jobs with RBAC and contextually injecting credentials depending on who/what is running the ansible playbook
* Dynamically injecting wildcard values in template playbooks, depending on the state of the workflow
* Visualizing your workflow and it's current status in a graphical view

To jump into this tutorial, you will need to familiarize yourself with a few platform concepts.

### Concepts

* [Workflow overview](/platform/workflow/overview/)
* [Integrations](/platform/integration/overview/)
    * [AWS](/platform/integration/aws-keys)
    * [Github](/platform/integration/github)
    * [PEM Key](/platform/integration/pemKey)
* [Resources](/platform/workflow/resource/overview/)
    * [gitRepo](/platform/workflow/resource/gitrepo)
    * [integration](/platform/workflow/resource/integration)
* [Jobs](/platform/workflow/job/overview/)
    * [runSh](/platform/workflow/job/runsh)

This example extends the work done in our CI tutorial to [Build and Push Java War to Nexus](/ci/tutorial/build-push-java-war-nexus-maven) by adding an Assembly Line that deploys the application to GKE.

It also uses the work done in our EC2 provisioning tutorial [Provision AWS EC2 machine using Ansible](/provision/tutorial/provision-aws-ec2-ansible) and deploys the WAR built in the above example to the EC2 instance provisioned in this example

### Step by Step Instructions

The following sections explain the process of automating a workflow to deploy a WAR package using Ansible. We will demonstrate this with our sample application.

**Source code is available at [devops-recipes/cd_war_vm_ansible](https://github.com/devops-recipes/cd_war_vm_ansible)**

**Complete YML is at [devops-recipes/cd_war_vm_ansible/shippable.yml](https://raw.githubusercontent.com/devops-recipes/cd_war_vm_ansible/master/shippable.yml)**

####1. Add necessary Account Integrations

Integrations are used to connect your Shippable workflow with external providers. More information about integrations is [here](/platform/tutorial/integration/howto-crud-integration/). We will use integrations for AWS Keys and Github for this sample.

#####1a. Add AWS Keys Integration

To be able to interact with AWS, we need to add the `drship_aws `integration.

Detailed steps on how to add an AWS Keys Integration are [here](/platform/integration/gcloudKey/#creating-an-account-integration). Make sure you name the integration `drship_aws` since that is the name we're using in our sample automation scripts.

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step.

#####1b. Add Github Integration

In order to read your workflow configuration from Github, we need to add the `drship_github` integration. This points to the repository containing your Shippable workflow config file (`shippable.yml`) and ansible playbook files.

In our case, we're using the repository [devops-recipes/cd_war_vm_ansible](https://github.com/devops-recipes/cd_war_vm_ansible).

Detailed steps on how to add a Github Integration are [here](/platform/integration/github/#creating-an-account-integration). Make sure you name the integration `drship_github` since that is the name we're using in our sample automation scripts.

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step.

#####1c. Add PEM Key Integration

In order to SSH into an EC2 machine, we need a PEM key that is used to provision the machine (you could also do this with custom SSH key, in this case we are using the PEM key). We add `drship_aws_pem` integration to store it.

Detailed steps on how to add a PEM Key Integration are [here](/platform/integration/pemKey/#creating-an-account-integration).

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step

####2. Author Assembly Line configuration

The platform is built with "Everything as Code" philosophy, so all configuration is in a YAML-based file called **shippable.yml**, which is parsed to create your Assembly Line workflow.

Detailed documentation on **shippable.yml** is [here](/deploy/configuration).

If you're using our sample code, **shippable.yml** already exists and you can use it with a few modifications.

#####2a. Add empty shippable.yml to your repo

Add an empty **shippable.yml** file to the the root of repository.

#####2b. Add `resources` section of the config

`resources` section holds the config info that is necessary to deploy to a Kubernetes cluster. In this case we have three resources defined, two of type `integration`, and one `gitRepo`.

```
resources:
# Automation scripts repo
  - name: repo_cd_war_vm
    type: gitRepo
    integration: "drship_github"
    versionTemplate:
      sourceName: "devops-recipes/cd_war_vm_ansible"   
      branch: master

# AWS PEM Key
  - name: pem_cd_war_vm
    type: integration
    integration: "drship_aws_pem"

# AWS Integration config
  - name: aws_cli_cd_war_vm
    type: integration
    integration: "drship_aws"
```

######i. gitRepo resource named `repo_cd_war_vm `

This resource points to the repository that contains your Ansible playbook files, so that they are accessible to your Assembly Line. For our example, these files are present in the repository [https://github.com/devops-recipes/cd_war_vm_ansible](https://github.com/devops-recipes/cd_war_vm_ansible), namely, [here](https://github.com/devops-recipes/cd_war_vm_ansible/tree/master/ansible).

Detailed info about `gitRepo` resource is [here](/platform/workflow/resource/gitrepo).

######ii. integration resource named `pem_cd_war_vm`

To be able to SSH into the EC2 machine, you need the PEM key that was used to provision it.

Detailed info about `integration` resource is [here](/platform/workflow/resource/integration).

######ii. integration resource named `aws_cli_cd_war_vm`

Your AWS credentials are securely stored in this integration.

To let ansible interact with AWS, we will export `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` stored in this resource as environment variables at runtime.

Detailed info about `integration` resource is [here](/platform/workflow/resource/integration).

#####2c. Add `jobs` section of the config

A job is an execution unit of the Assembly Line. Our job has to perform two tasks:

* Replace the wildcards needed by the ansible playbook
* Export `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` as environment variables
* Run the playbook

```
jobs:
# Deploy WAR to VM
  - name: deploy_war_vm_ans
    type: runSh
    steps:
      # This params resource is defined in the CI tutorial which pushed this file to Nexus: http://docs.shippable.com/ci/tutorial/build-push-java-war-nexus-maven
      # If you have not followed that tutorial, please delete this resource
      - IN: war_loc
      - IN: repo_cd_war_vm
        switch: off
      - IN: aws_cli_cd_war_vm
        switch: off
        # This params resource is defined in the AWS EC2 provisioning tutorial: http://docs.shippable.com/provision/tutorial/provision-aws-vpc-ansible
        # If you have not followed that tutorial, please delete this resource        
      - IN: aws_ec2_info
        switch: off
      - IN: pem_cd_war_vm
        switch: off
      - TASK:
          name: deploy_war
          runtime:
            options:
              env:
                - AWS_REGION:         "us-east-1"
                - artifact_dest:      "/tmp/jar"

              # Uncomment and replace values with hardcoded values if you deleted the aws_ec2_info resource  
              # - INST_0_PUBLIC_IP: "35.170.69.130"
              # - INST_0_ID: "i-07f2045d5e589d362"
              # - ec2_tag_Type: "t2.micro"
              # - ec2_tag_Role: "demo_machines"
              # - ec2_region: "us-east-1"

              # Uncomment and replace values with hardcoded values if you deleted the war_loc resource
              # - artifact_version: "0.0.1-SNAPSHOT"
              # - group_id: "com.demo"
              # - artifact_id: "helloworld"
              # - artifact_extension: "war"
              # - repository_url: "http://174.129.56.184:8081/repository/snapshots"

          script:
            - pushd $(shipctl get_resource_state "repo_cd_war_vm")/ansible
            - export AWS_ACCESS_KEY_ID=$(shipctl get_integration_resource_field aws_cli_cd_war_vm "accessKey")
            - export AWS_SECRET_ACCESS_KEY=$(shipctl get_integration_resource_field aws_cli_cd_war_vm "secretKey")
            - export artifact_filename=$artifact_id"-"$artifact_version"."$artifact_extension
            - shipctl replace variables.yml
            - ansible-playbook -v war_deploy_playbook.yml
            - popd
```

* Adding the above config to the jobs section of shippable.yml will create a `runSh` job called `deploy_war_vm_ans`.

* The first section of `steps` defines all the input `IN` resources that are required to execute this job.
  * `war_loc` is a params resource that is the output of another tutorial showing [how to build and push the WAR file to Nexus](/ci/tutorial/build-push-java-war-nexus-maven). It contains information of where the WAR file is located. If you already have a WAR file not created through that tutorial, just delete this resource and hardcode the necessary values in the **TASK** section. [tutorial](/ci/tutorial/build-push-java-war-nexus-maven).  
  * Ansible script files are under `./ansible` folder and it is version controlled in a repo represented by `repo_cd_war_vm`.
  * Credentials to connect to AWS are in `aws_cli_cd_war_vm`. This resource has `switch: off` flag, so any changes to it will not trigger this job automatically
  * `aws_ec2_info` is a **params** resource that comes from another tutorial [which explains how to provision EC2 machines](/provision/tutorial/provision-aws-ec2-ansible), and contains information about the EC2 instance to deploy to. If you already have an EC2 instance not created through that tutorial, just delete this resource and hardcode the necessary values in the **TASK** section.
  * PEM key is used to SSH into the EC2 machine is in `aws_ec2_pem`. This resource has `switch: off` flag, so any changes to it will not trigger this job automatically

* The `TASK` section contains the actual code that is executed when the job runs. We have just one task named `deploy_war` which does the following:
  * First, we define environment variables required by the ansible playbook-
    * `AWS_REGION` is the aws region where the EC2 is provisioned
    * `artifact_dest` is the path on EC2 where the WAR will be deployed to
    * `repository_url`, `group_id`, `artifact_id`, `artifact_version`, `artifact_extension`, and `artifact_filename` are implicitly set from `war_loc`. If you deleted that resource, hardcode these values
  *  `script` section has a list of commands which will be executed sequentially.
    * First, we use the Shippable utility function `get_resource_state` to go to the folder where Ansible playbook is stored
    * Next, we extract the AWS credentials from the `aws_cli_cd_war_vm`resource, again using shipctl functions
    * Next, we replace all wildcards in the playbook
    * Last, we execute the playbook

> You might wonder where the actual EC2 information such as instance ID, type, etc is being set and used. In our example, the input resource aws_ec2_info contains this information, and if you do not have this resource, you need to hard code it as shown. Ansible uses ec2.py to gather all facts about your artifacts in the specified region, and copies the WAR file to all machines that match the tag role. In our example, this tag role is "demo_machines". For more information on this, please refer to Ansible docs: http://docs.ansible.com/ansible/latest/user_guide/intro_dynamic_inventory.html#example-aws-ec2-external-inventory-script

Detailed info about `runSh` job is [here](/platform/workflow/job/runsh).

Detailed info about Shippable Utility functions are [here](/platform/tutorial/workflow/using-shipctl).

#####2d. Push changes to shippable.yml

Commit and push all the above changes to **shippable.yml**.

####3. Add the Assembly Line to your Shippable organization

In Shippable's world, a Subscription maps to an Organization or a Team, depending on the source control provider. An Assembly Line workflow is defined at a Subscription level and all jobs are resources are global to your subscription.

To add your Assembly Line to Shippable, you need to add the repository containing the configuration as a "sync repository" by [following instructions here](/deploy/configuration/#adding-a-syncrepo). This automatically parses your **shippable.yml** config and adds your workflow to Shippable. Your workflow will always be kept in sync with the config in this repository, and be automatically updated every time you push a change to **shippable.yml**.

Your view will look something like this:

<img src="/images/tutorial/deploy-war-nexus-ec2-ansible-fig1.png" alt="Assembly Line view">

####4. Run the build job `deploy_war_vm_ans`

You can manually run the job by right clicking on the job and clicking on **Build job**, or by committing a change to your repository containing ansible config.

<img src="/images/tutorial/deploy-war-nexus-ec2-ansible-fig2.png" alt="Build console output">

Confirm that the required WAD was deployed to the EC2 machine.

## Further Reading
* [Build and Push a Docker Image to Docker Hub](/ci/tutorial/build-push-image-to-docker-hub)
* [Working with Integrations](/platform/tutorial/integration/howto-crud-integration/)
* [Defining Resources in shippable.yml](/platform/tutorial/workflow/shippable-yml/#resources-config)
* [Defining Jobs in shippable.yml](/platform/tutorial/workflow/shippable-yml/#jobs-config)
* [Sharing information between Jobs](/platform/tutorial/workflow/share-info-across-jobs/)
