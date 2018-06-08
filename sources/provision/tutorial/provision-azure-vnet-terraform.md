page_main_title: Provision Azure Virtual Network with Terraform
main_section: Provision
sub_section: Microsoft Azure infrastructure
sub_sub_section: Terraform
page_title: Provision Azure Virtual Network with Terraform
page_description: Provision Azure Virtual Network with Terraform
page_keywords: Provision VNet, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, Azure, Terraform

# Provision Azure Virtual Network with Terraform

This tutorial explains how to automate the provisioning of Azure Virtual Network(VNet) using Terraform.

This document assumes you're familiar with the following concepts:

* [Azure Virtual Network](https://docs.microsoft.com/en-us/azure/virtual-network/virtual-networks-overview)
* [Terraform azurerm_resource_group](https://www.terraform.io/docs/providers/azurerm/d/resource_group.html)
* [Terraform azurerm_virtual_network](https://www.terraform.io/docs/providers/azurerm/d/virtual_network.html)
* [Terraform azurerm_subnet](https://www.terraform.io/docs/providers/azurerm/d/subnet.html)
* [Terraform azurerm_public_ip](https://www.terraform.io/docs/providers/azurerm/d/public_ip.html)
* [Terraform azurerm_network_security_group](https://www.terraform.io/docs/providers/azurerm/d/network_security_group.html)
* [Terraform azurerm_network_interface](https://www.terraform.io/docs/providers/azurerm/d/network_interface.html)

There are many challenges with manually running terraform scripts. In short, you will struggle with making scripts reusable and injecting the right values for wildcards at runtime, and maintaining the right version of the Terraform state file. Also, if you have dependent workflows, you will have to manually go trigger each one.

If you want to achieve frictionless execution of Terraform scripts that are modular and reusable, you need to templatize your scripts and automate the workflow used to execute them.

## Automated provisioning of Azure Virtual Network with Terraform

In this document, we will demonstrate how you can easily automate your workflow using Shippable's Assembly Lines. The following Assembly Line features are particularly noteworthy for this scenario:

* Creating an event-driven, automated workflow
* Securing workflow jobs with RBAC and contextually injecting credentials depending on who/what is running the Terraform scripts
* Dynamically injecting wildcard values in template files, depending on the state of the workflow
* Visualizing your workflow and it's current status in a graphical view

To jump into this tutorial, you will need to familiarize yourself with a few platform concepts.

### Concepts
* [Integrations](/platform/integration/overview/)
    * [Azure](/platform/integration/azure-keys)
    * [Github](/platform/integration/github)
* [Resources](/platform/workflow/resource/overview/)
    * [gitRepo](/platform/workflow/resource/gitrepo)
    * [integration](/platform/workflow/resource/integration)
    * [params](/platform/workflow/resource/params)
    * [state](/platform/workflow/resource/state)
* [Jobs](/platform/workflow/job/overview/)
    * [runSh](/platform/workflow/job/runsh)
* [shipctl utility](/platform/tutorial/workflow/using-shipctl/)

### Step by Step Instructions

The following sections explain the process of automating a workflow to provision Azure VNet using Terraform. We will demonstrate this with our sample application.

**Source code is available at [devops-recipes/prov_azure_vnet_terraform](https://github.com/devops-recipes/prov_azure_vnet_terraform)**

**Complete YML is at [devops-recipes/prov_azure_vnet_terraform/shippable.yml](https://raw.githubusercontent.com/devops-recipes/prov_azure_vnet_terraform/master/shippable.yml)**

####1. Add necessary Account Integrations

Integrations are used to connect your Shippable workflow with external providers. More information about integrations is [here](/platform/tutorial/integration/howto-crud-integration/). We will use integrations for Azure and Github for this sample.

#####1a. Add **Azure** Integration

To be able to interact with Azure, we need to add the `drship_azure` integration.

Please follow the tutorial on [Authenticating using a Service Principal](https://www.terraform.io/docs/providers/azurerm/authenticating_via_service_principal.html) to create a service principal in azure and obtain the credentials needed for creating the [Azure](/platform/integration/azure-keys) integration.

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step.

#####1b. Add `Github` Integration

In order to read your workflow configuration from Github, we need to add the `drship_github` integration. This points to the repository containing your Shippable workflow config file (**shippable.yml**) and Terraform script files.

In our case, we're using the repository [devops-recipes/prov_azure_vnet_terraform](https://github.com/devops-recipes/prov_azure_vnet_terraform).

Detailed steps on how to add a Github Integration are [here](/platform/integration/github/#creating-an-account-integration). Make sure you name the integration `drship_github` since that is the name we're using in our sample automation scripts.

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step.

####2. Author Assembly Line configuration

The platform is built with "Everything as Code" philosophy, so all configuration is in a YAML-based file called **shippable.yml**, which is parsed to create your Assembly Line workflow.

Detailed documentation on **shippable.yml** is [here](/deploy/configuration).

If you're using our sample code, **shippable.yml** already exists and you can use it with a few modifications.

#####2a. Add empty shippable.yml to your repo

Add an empty **shippable.yml** file to the the root of repository.

#####2b. Add `resources` section of the config

`resources` section holds the config info that is necessary to provision an Azure VNet. In this case we have 4 resources defined of type `integration`, `gitRepo`, `state` and `params`.

Add the following to your **shippable.yml**:

```
resources:
# Automation scripts repo
  - name: az_vnet_tf_repo
    type: gitRepo
    integration: "drship_github"
    versionTemplate:
      sourceName: "devops-recipes/prov_azure_vnet_terraform"
      branch: master

# Azure credentials
  - name: az_vnet_tf_creds
    type: integration
    integration: "drship_azure"

# Terraform State
  - name: az_vnet_tf_state
    type: state

# Output of Virtual Network provisioning
  - name: az_vnet_tf_info
    type: params
    versionTemplate:
      params:
        SEED: "initial_version"
```

######i. gitRepo resource named `az_vnet_tf_repo`

This resource points to the repository that contains your Terraform script files, so that they are accessible to your Assembly Line. For our example, these files are present in the repository [https://github.com/devops-recipes/prov_azure_vnet_terraform](https://github.com/devops-recipes/prov_azure_vnet_terraform), namely, [here](https://github.com/devops-recipes/prov_azure_vnet_terraform/tree/master).

Detailed info about `gitRepo` resource is [here](/platform/workflow/resource/gitrepo).

######ii. integration resource named `az_vnet_tf_creds`

Your Azure credentials are securely stored in this integration.

To let Terraform interact with Azure, we will export `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET` and `AZURE_TENANT_ID` stored in this resource as environment variables at runtime.

Detailed info about `integration` resource is [here](/platform/workflow/resource/integration).

######iii. state resource named `az_vnet_tf_state`

Every time you execute `terraform apply`, Terraform generates a **terraform.tfstate** file, which contains the state of your provisioning activity. If the file is already present, it simply updates state information each time. It is important to have this file in the right place, since Terraform will recreate all resources again if it doesn't find it, resulting in duplicate objects.  

The state resource `az_vnet_tf_state` is used in our example to store this state file and make it available to any job that executes the `terraform apply` command.

Detailed info about `state` resource is [here](/platform/workflow/resource/state).

######iv. params resource named `az_vnet_tf_info`

We store information like **resource_group_name** and **nic_id**, which are created during the execution of your scripts, in a `params` resource. Downstream jobs can access this information programmatically if required. For example, a separate job that provisions machines will need to know the VPC and Subnet IDs.

Detailed info about `params` resource is [here](/platform/workflow/resource/params).

#####2c. Add `jobs` section of the config

A job is an execution unit of the Assembly Line. Our job has to perform three tasks:

* Replace the wildcards needed by the Terraform scripts
* Run `terraform apply` to run your scripts
* Output `resource_group_name` and `nic_id` into the `params` resource to make it available for downstream jobs

Add the following to your **shippable.yml**:

```
jobs:
# Provision Azure Virtual Network with Terraform
  - name: prov_azure_vnet_tf
    type: runSh
    steps:
      - IN: az_vnet_tf_repo
        switch: off
      - IN: az_vnet_tf_state
        switch: off
      - IN: az_vnet_tf_creds
        switch: off
      - TASK:
          name: prov_vnet
          runtime:
            options:
              env:
                - resource_group_name: "demo_rg_tf"
                - resource_group_location: "eastus"
                - vnet_name: "demo_vnet_tf"
                - vnet_location: "eastus"
                - AZURE_SUBSCRIPTION_ID: "XXXXXXXXXX" # TODO: Replace Azure subscription ID
          script:
            - pushd $(shipctl get_resource_state "az_vnet_tf_repo")
            - export AZURE_CLIENT_ID=$(shipctl get_integration_resource_field az_vnet_tf_creds "appid")
            - export AZURE_CLIENT_SECRET=$(shipctl get_integration_resource_field az_vnet_tf_creds "password")
            - export AZURE_TENANT_ID=$(shipctl get_integration_resource_field az_vnet_tf_creds "tenant")
            - shipctl copy_file_from_resource_state az_vnet_tf_state terraform.tfstate .
            - shipctl replace terraform.tfvars
            - terraform init
            - terraform plan -var-file=terraform.tfvars
            - terraform apply -auto-approve -var-file=terraform.tfvars
      - OUT: az_vnet_tf_info
        overwrite: true
      - OUT: az_vnet_tf_state
    on_success:
      script:
        - shipctl put_resource_state_multi az_vnet_tf_info "versionName=$vnet_name" "resource_group_name=$resource_group_name" "nic_id=$(terraform output nic_id)"
    always:
      script:
        - shipctl copy_file_to_resource_state terraform.tfstate az_vnet_tf_state
        - popd
    flags:
      - azure_vnet
      - azure
      - terraform
```

* Adding the above config to the jobs section of shippable.yml will create a `runSh` job called `prov_azure_vnet_tf`.

* The first section of `steps` defines all the input `IN` resources that are required to execute this job.
  * Terraform script files are under the root folder and it is version controlled in a repository represented by `az_vnet_tf_repo`.
  * Credentials to connect to Azure are in `az_vnet_tf_creds`. This resource has `switch: off` flag which means any changes to it will not trigger this job automatically
  * The `az_vnet_tf_state` resource contains the `terraform.tfstate` file from previous executions of the `apply` command, which is needed to make sure we don't provision duplicate objects

* The `TASK` section contains actual code that is executed when the job runs. We have just one task named `prov_vpc` which does the following:
  * First, we define environment variables required by Terraform scripts-
    * `resource_group_name` is the name of the resource group where the Vnet is going to be created.
    * `resource_group_location` is the metadata location of resource group.
    * `vnet_name` is the name of the Virtual Network.
    * `vnet_location` is the location of the Virtual Network.
    * `AZURE_SUBSCRIPTION_ID` is the Azure Subscription ID used for authenticating.
  * `script` section has a list of commands to execute sequentially.
    * First, we use the Shippable utility function `get_resource_state` to go to the folder where Terraform scripts are stored
    * Next, we extract the Azure credentials from the `az_vnet_tf_state`resource, again using shipctl functions
    * Next, we fetch the `terraform.tfstate` file and copy it into the current folder using shipctl function on `az_vnet_tf_state`
    * Next, we replace all wildcards in the `terraform.tfvars` file
    * Last, we call `terraform apply`, which provisions the VPC
  * `on_success` section is executed if the `TASK` section succeeds. This step updates the `params` resource with `resource_group_name` and `nic_id` generated during the execution
  * `always` section is executed no matter what the outcome of TASK section was. Here we push the latest copy of `terraform.tfstate` back to `az_vnet_tf_state` resource so that it is available for the next run with the latest state information. We need to do this in always section since Terraform does not rollback changes of a failed apply command

Detailed info about `runSh` job is [here](/platform/workflow/job/runsh).

Detailed info about Shippable Utility functions is [here](/platform/tutorial/workflow/using-shipctl).

#####2d. Push changes to shippable.yml

Commit and push all the above changes to **shippable.yml**.

####3. Add the Assembly Line to your Shippable organization

In Shippable's world, a Subscription maps to an Organization or a Team, depending on the source control provider. An Assembly Line workflow is defined at a Subscription level and all jobs are resources are global to your subscription.

To add your Assembly Line to Shippable, you need to add the repository containing the configuration as a "sync repository" by [following instructions here](/deploy/configuration/#adding-a-syncrepo). This automatically parses your **shippable.yml** config and adds your workflow to Shippable. Your workflow will always be kept in sync with the config in this repository, and be automatically updated every time you push a change to **shippable.yml**.

Your view will look something like this:

<img src="/images/tutorial/provision-azure-vnet-fig1.png" alt="Assembly Line view">

####4. Run the job `prov_azure_vnet_tf`

You can manually run the job by right clicking on the job and clicking on `Build job`, or by committing a change to your repository containing Terraform scripts.

<img src="/images/tutorial/provision-azure-vnet-fig2.png" alt="Build console output">

Confirm that the required Virtual Network was created in Azure.

## Further Reading
* [Working with Integrations](/platform/tutorial/integration/howto-crud-integration/)
* [Defining Resources in shippable.yml](/platform/tutorial/workflow/shippable-yml/#resources-config)
* [Defining Jobs in shippable.yml](/platform/tutorial/workflow/shippable-yml/#jobs-config)
* [Sharing information between Jobs](/platform/tutorial/workflow/sharing-data-between-jobs/)
