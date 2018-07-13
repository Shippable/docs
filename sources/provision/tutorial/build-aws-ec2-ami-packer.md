page_main_title: Build AWS AMI with Packer
page_description: Build AWS AMI with Packer
main_section: IT Ops
sub_section: AWS infrastructure
sub_sub_section: Build VM images

# Build Amazon AMI using Packer

This tutorial explains how to automate the building of an AWS AMI using Packer.

This document assumes you're familiar with the following concepts:

* [Packer Intro](https://www.packer.io/intro)
* [Amazon Instance Builder](https://www.packer.io/docs/builders/amazon-instance.html)
* [File Provisioner](https://www.packer.io/docs/provisioners/file.html)
* [Manifest Post Processor](https://www.packer.io/docs/post-processors/manifest.html)

If you're unfamiliar with Packer, you can start with learning how to build AMIs manually. Refer to our blog for a step-by-step tutorial: [Build AWS AMI Manually](http://blog.shippable.com/build-aws-amis-using-packer).

## Automating the building of AWS AMI with Packer

You can easily automate your workflow using Shippable's Assembly Lines. The following Assembly Line features are particularly noteworthy for this scenario:

* Capability to create an event driven workflow that automates the entire software delivery lifecycle
* Ability to create RBAC and contextually inject credentials based on who/what is running the deployment job
* Using templatized spec files and dynamically inject wildcard values depending on the state of the workflow
* A graphical way to visualize your workflow and it's current status

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

The following sections explain the process of automating a workflow to build an Amazon AMI using Packer. We will demonstrate this with our sample application.

**Source code is available at [devops-recipes/aws_ami_with_packer](https://github.com/devops-recipes/aws_ami_with_packer)**

**Complete YML is at [devops-recipes/aws_ami_with_packer/shippable.yml](https://raw.githubusercontent.com/devops-recipes/aws_ami_with_packer/master/shippable.yml)**

####1. Add necessary Account Integrations

Integrations are used to connect your Shippable workflow with external providers. More information about integrations is [here](/platform/tutorial/integration/howto-crud-integration/). We will use integrations for AWS Keys and Github for this sample.

#####1a. Add **AWS Keys** Integration

To be able to interact with AWS, we need to add the `drship_aws` integration. Your AWS credentials are securely stored in this integration, and you can extract them in your job when needed.

Detailed steps on how to add an AWS Keys Integration are [here](/platform/integration/aws-keys/#creating-an-account-integration). Make sure you name the integration `drship_aws` since that is the name we're using in our sample automation scripts.

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step.

#####1b. Add `Github` Integration

In order to read your workflow configuration from Github, we need to add the `drship_github` integration. This points to the repository containing your Shippable workflow config file (**shippable.yml**) and Packer files.

In our case, we're using the repository [devops-recipes/aws_ami_with_packer](https://github.com/devops-recipes/aws_ami_with_packer).

Detailed steps on how to add a Github Integration are [here](/platform/integration/github/#creating-an-account-integration). Make sure you name the integration `drship_github` since that is the name we're using in our sample automation scripts.

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step.

####2. Author Assembly Line configuration

The platform is built with "Everything as Code" philosophy, so all configuration is in a YAML-based file called **shippable.yml**, which is parsed to create your Assembly Line workflow.

Detailed documentation on **shippable.yml** is [here](/platform/workflow/config/#assembly-lines-configuration).

If you're using our sample code, **shippable.yml** already exists and you can use it with a few modifications.

#####2a. Add empty shippable.yml to your repo

Add an empty **shippable.yml** file to the the root of repository.

#####2b. Add `resources` section of the config

`resources` section holds the config info that is necessary to build an AWS AMI. In this case we have 3 resources defined of type `integration`, `gitRepo` and `params`.

Add the following to your **shippable.yml**:

```
resources:
# Automation scripts repo
  - name: aws_ami_pack_repo
    type: gitRepo
    integration: "drship_github"
    versionTemplate:
      sourceName: "devops-recipes/aws_ami_with_packer"
      branch: master

# AWS credentials
  - name: aws_ami_pack_creds
    type: integration
    integration: "drship_aws"

# Output of Packer Image Build
  - name: aws_ami_pack_info
    type: params
    versionTemplate:
      params:
        SEED: true
```

######i. gitRepo resource named `aws_ami_pack_repo`

This resource points to the repository that contains your Packer files, so that they are accessible to your Assembly Line. For our example, these files are present in the repository [https://github.com/devops-recipes/aws_ami_with_packer](https://github.com/devops-recipes/aws_ami_with_packer), namely, [here](https://github.com/devops-recipes/aws_ami_with_packer/tree/master).

Detailed info about `gitRepo` resource is [here](/platform/workflow/resource/gitrepo).

######ii. integration resource named `aws_ami_pack_creds`

Your AWS credentials are securely stored in this integration.

To let Packer interact with AWS, we will export `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` stored in this resource as environment variables at runtime.

Detailed info about `integration` resource is [here](/platform/workflow/resource/integration).

######iii. params resource named `aws_ami_pack_info`

We store information like **ami_id**, which is created during the build process, in a `params` resource. Downstream jobs can access this information programmatically if required. For example, a separate job that provisions machines will need to know which **AMI_ID** to provision.

Detailed info about `params` resource is [here](/platform/workflow/resource/params).

#####2c. Add `jobs` section of the config

A job is an execution unit of the Assembly Line. Our job has to perform three tasks:

* Replace the wildcards needed by the Packer file
* Build the AMI
* Output `ami_id` into the `params` resource to make it available for downstream jobs

Add the following to your **shippable.yml**:

```
jobs:
# Build AWS AMI with Packer
  - name: build_aws_ami_pack
    type: runSh
    steps:
      - IN: aws_ami_pack_repo
        switch: off
      - IN: aws_vpc_tf_state
        switch: off
      - IN: aws_ami_pack_creds
        switch: off
        # The aws_vpc_tf_info resource is defined in the AWS VPC provisioning tutorial: http://docs.shippable.com/provision/tutorial/provision-aws-vpc-terraform
        # If you have not followed that tutorial, please delete this resource
      - IN: aws_vpc_tf_info        
      - TASK:
          name: build_ami
          runtime:
            options:
              env:
                - source_ami: "ami-43a15f3e"
                - instance_type: "t2.micro"
                - ssh_username: "ubuntu"
                # Uncomment and replace values with hardcoded values if you deleted the aws_vpc_tf_info resource  
                #- vpc_id:
                #- vpc_region:
                #- vpc_public_sg_id:
                #- vpc_public_sn_id:

          script:
            - pushd $(shipctl get_resource_state "aws_ami_pack_repo")
            - export AWS_ACCESS_KEY_ID=$(shipctl get_integration_resource_field aws_ami_pack_creds "accessKey")
            - export AWS_SECRET_ACCESS_KEY=$(shipctl get_integration_resource_field aws_ami_pack_creds "secretKey")
            - shipctl replace vars.json
            - packer validate -var-file=vars.json baseAMI.json
            - packer build -var-file=vars.json baseAMI.json
            - AMI_ID=$(shipctl get_json_value manifest.json builds[0].artifact_id | cut -d':' -f 2)
      - OUT: aws_ami_pack_info
        overwrite: true
    on_success:
      script:
        - shipctl post_resource_state aws_ami_pack_info versionName $AMI_ID
        - popd
```

* Adding the above config to the jobs section of **shippable.yml** will create a `runSh` job called `build_aws_ami_pack`.

* The first section of `steps` defines all the input `IN` resources that are required to execute this job.
    * Packer script files are version controlled in a repo represented by `aws_ami_pack_repo`.
    * Credentials to connect to AWS are in `aws_ami_pack_creds`. This resource has `switch: off` flag which means any changes to it will not trigger this job automatically
    * `aws_vpc_tf_info` is a **params** resource that comes from another tutorial [which explains how to provision a VPC](/provision/tutorial/provision-aws-vpc-terraform) and contains the `vpc_id, vpc_region, vpc_public_sn_id & vpc_public_sg_id`, which are required by this job. If you already have a VPC and just want to use this tutorial to build an AMI, just delete this resource and hardcode the values in the **TASK.runtime.options.env** section.
* The `TASK` section contains actual code that is executed when the job runs. We have just one task named `build_ami` which does the following:
    * First, we define environment variables required by the scripts-
        * `vpc_id` is the id of the VPC on which the temporary build machine get provisioned
        * `vpc_region` is the aws region where the VPC is present
        * `vpc_public_sn_id` is the id of a public subnet
        * `vpc_public_sg_id` is the id of the security group that has SSH access to the subnet
        *  `script` section has a list of commands to execute sequentially.
    * We then use the Shippable utility function `get_resource_state` to go to the folder where scripts are stored
    * Next, we extract the AWS credentials from the `aws_ami_pack_creds`resource, again using shipctl functions
    * Next, we replace all wildcards in the **vars.json** file
    * Lastly, we kick off the build process. This step also updates the `params` resource with `ami_id` generated during the execution.

Detailed info about `runSh` job is [here](/platform/workflow/job/runsh).

Detailed info about Shippable Utility functions is [here](/platform/tutorial/workflow/using-shipctl).

#####2d. Push changes to shippable.yml

Commit and push all the above changes to **shippable.yml**.

####3. Add the Assembly Line to your Shippable organization

In Shippable's world, a Subscription maps to an Organization or a Team, depending on the source control provider. An Assembly Line workflow is defined at a Subscription level and all jobs are resources are global to your subscription.

To add your Assembly Line to Shippable, you need to add the repository containing the configuration as a "sync repository" by [following instructions here](/platform/tutorial/workflow/add-assembly-line). This automatically parses your **shippable.yml** config and adds your workflow to Shippable. Your workflow will always be kept in sync with the config in this repository, and be automatically updated every time you push a change to **shippable.yml**.

Your view will look something like this:

<img src="/images/tutorial/build-aws-ec2-ami-packer-fig1.png" alt="Assembly Line view">

####4. Run the job `build_aws_ami_pack`

You can manually run the job by right clicking on the job and clicking on `Build job`, or by committing a change to your repository containing script files.

<img src="/images/tutorial/build-aws-ec2-ami-packer-fig2.png" alt="Build console output">

Confirm that the required AMI was created on AWS.

## Further Reading
* [Working with Integrations](/platform/tutorial/integration/howto-crud-integration/)
* [Defining Resources in shippable.yml](/platform/workflow/config/#resources)
* [Defining Jobs in shippable.yml](/platform/workflow/config/#jobs)
* [Sharing information between Jobs](/platform/tutorial/workflow/share-info-across-jobs/)
