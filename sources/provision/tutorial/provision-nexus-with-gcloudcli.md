page_main_title: Provision Sonatype Nexus with Gcloud cli
main_section: IT Ops
sub_section: Google Cloud infrastructure
sub_sub_section: VM
page_title:Provision Sonatype Nexus with Gcloud cli
page_description: Provision Sonatype Nexus with Gcloud cli
page_keywords: Provision nexus, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, Google Cloud

# Provision Sonatype Nexus with Gcloud cli

This tutorial explains how to automate provisioning of Sonatype Nexus repository using the Gcloud Cli.

* [Sonatype Nexus Repository](https://www.sonatype.com/nexus-repository-sonatype)
* [Gcloud SDK](https://cloud.google.com/sdk/gcloud/)

The idea is to provision a Virtual Machine on Google Compute Engine using [a runSh job](/platform/workflow/job/runsh/) and use it to install Sonatype Nexus Repository using Gcloud Cli.

The following links contain information on how to automate provisioning of GCP Virtual Machine with Shippable Assembly lines.

* [Provision GCP virtual machines with Terraform](/provision/tutorial/provision-gcp-vm-terraform)
* [Provision GCP virtual machines with Ansible](/provision/tutorial/provision-gcp-vm-ansible)

### Step by Step Instructions

The following sections explain the process of automating a workflow to install Sonatype Nexus on already provisioned GCP Virtual Machine.

**Source code is available at [devops-recipes/install_gce_nexus](https://github.com/devops-recipes/install_gce_nexus)**

**Complete YML is at [devops-recipes/install_gce_nexus/shippable.yml](https://raw.githubusercontent.com/devops-recipes/install_gce_nexus/master/shippable.yml)**

####1. Add necessary Account Integrations

Integrations are used to connect your Shippable workflow with external providers. More information about integrations is [here](/platform/tutorial/integration/howto-crud-integration/). We will use integrations for Google Cloud and Github for this sample.

#####1a. Add Google Cloud Integration

To be able to interact with GCP, we need to add the `drship_gcp` integration.

Detailed steps on how to add a Google Cloud Integration are [here](/platform/integration/gcloudkey/#creating-an-account-integration). Make sure you name the integration `drship_gcp` since that is the name we're using in our sample automation scripts.

> Note: You might already have this if you have done some of our other tutorials. If so, skip this step.

#####1b. Add Github Integration

In order to read your workflow configuration from Github, we need to add the `drship_github` integration. This points to the repository containing your Shippable workflow config file (**shippable.yml**) and Nexus installation script files.

In our case, we're using the repository [devops-recipes/install_gce_nexus](https://github.com/devops-recipes/install_gce_nexus).

Detailed steps on how to add a Github Integration are [here](/platform/integration/github/#creating-an-account-integration). Make sure you name the integration `drship_github` since that is the name we're using in our sample automation scripts.

> Note: You might already have this if you have done some of our other tutorials. If so, skip this step.

####2. Author Assembly Line configuration

The platform is built with "Everything as Code" philosophy, so all configuration is in a YAML-based file called **shippable.yml**, which is parsed to create your Assembly Line workflow.

Detailed documentation on **shippable.yml** is [here](/platform/workflow/config/#assembly-lines-configuration).

If you're using our sample code, **shippable.yml** already exists and you can use it with a few modifications.

#####2a. Add empty shippable.yml to your repo

Add an empty **shippable.yml** file to the the root of repository.

#####2b. Add `resources` section of the config

`resources` section holds the config info that is necessary to install nexus on GCP VM. In this case we have 3 resources defined of type `cliConfig`, `gitRepo` and `params`.

Add the following to your **shippable.yml**:

```
resources:
# Automation scripts repo
  - name: install_gce_nexus_repo
    type: gitRepo
    integration: "drship_github"
    versionTemplate:
      sourceName: "devops-recipes/install_gce_nexus"
      branch: master

# cliConfig for configuring gcloud cli
  - name: gcp_gcloud_cli
    type: cliConfig
    integration: "drship_gcp"

# Output of nexus installation
  - name: gcp_nexus_info
    type: params
    versionTemplate:
      params:
        SEED: "initial_version"
```

######i. gitRepo resource named `install_gce_nexus_repo`

This resource points to the repository that contains the nexus installation script, so that they are accessible to your Assembly Line. For our example, these files are present in the repository [devops-recipes/install_gce_nexus](https://github.com/devops-recipes/install_gce_nexus), namely, [here](https://github.com/devops-recipes/install_gce_nexus/blob/master/install_nexus.sh).

Detailed info about `gitRepo` resource is [here](/platform/workflow/resource/gitrepo).

######ii. cliConfig resource named `gcp_gcloud_cli`

To be able to interact with Google Cloud, you need creds. Your Google Cloud are securely stored in this integration, and can be used to configure the Gcloud cli in the job.

Detailed info about `cliConfig` resource is [here](/platform/workflow/resource/cliconfig).

######iii. params resource named `gcp_nexus_info`

We store information like **nexus_host**, which are created during the execution of the installation job, in a `params` resource. Downstream jobs can access this information programmatically if required. For example, a separate job that uploads maven package to the installed nexus repository could use this information.

Detailed info about `params` resource is [here](/platform/workflow/resource/params).

#####2c. Add `jobs` section of the config

A job is an execution unit of the Assembly Line. Our job has to perform three tasks:

* Transfer the installation script to GCP VM
* Execute the installation script on the GCP VM
* Output `nexus_host` into the `params` resource to make it available for downstream jobs

Add the following to your **shippable.yml**:

```
jobs:
# Install nexus on gce
  - name: install_gce_nexus_job
    type: runSh
    steps:
      - IN: gcp_gcloud_cli
      - IN: install_gce_nexus_repo
        switch: off
      - IN: gcp_gce_info
        switch: off
      - TASK:
          name: install_nexus
          runtime:
            options:
              env:
                - STATE_RES_NAME: "gcp_nexus_info"
          script:
            - pushd $(shipctl get_resource_state "install_gce_nexus_repo")
            - gcloud compute scp ./install_nexus.sh $gce_name:~/install_nexus.sh --zone $gce_zone
            - gcloud compute ssh $gce_name --zone $gce_zone --command="chmod +x ~/install_nexus.sh"
            - gcloud compute ssh $gce_name --zone $gce_zone --command="~/install_nexus.sh"
            - shipctl put_resource_state_multi "$STATE_RES_NAME" "NEXUS_HOST=$INST_0_PUBLIC_IP"
            - popd
      - OUT: gcp_nexus_info
        overwrite: true
    flags:
      - gce_nexus
      - gce
      - nexus
```

* Adding the above config to the jobs section of shippable.yml will create a `runSh` job called `install_gce_nexus_job`.

* The first section of `steps` defines all the input `IN` resources that are required to execute this job.
    * Credentials to connect to Google Cloud are in `gcp_gcloud_cli`.
    * Nexus installation script is version controlled in a git repo represented by `install_gce_nexus_repo`. This resource has `switch: off` flag which means any changes to it will not trigger this job automatically.
    * `gcp_gce_info` is a params resource containing the information about the GCP virtual machine that was created in [Provision GCP virtual machines with Ansible tutorial](/provision/tutorial/provision-gcp-vm-ansible).

* The `TASK` section contains actual code that is executed when the job runs. We have just one task named `install_nexus` which does the following:
    * First, we define environment variables named `STATE_RES_NAME`, where we are going to store the outputs.
    *  `script` section has a list of commands to execute sequentially.
      * First, we use the Shippable utility function `get_resource_state` to go to the folder where Nexus installation script is stored.
      * `gcloud compute scp` is used to transfer the nexus installation script to GCP VM.
      * `gcloud compute ssh` is used to execute the nexus installation script in GCP VM.
      * `shipctl put_resource_state_multi` is used to update the `gcp_nexus_info` params resource with `NEXUS_HOST` information.

Detailed info about `runSh` job is [here](/platform/workflow/job/runsh).

Detailed info about Shippable Utility functions is [here](/platform/tutorial/workflow/using-shipctl).

#####2d. Push changes to shippable.yml

Commit and push all the above changes to **shippable.yml**.

####3. Add the Assembly Line to your Shippable organization

In Shippable's world, a Subscription maps to an Organization or a Team, depending on the source control provider. An Assembly Line workflow is defined at a Subscription level and all jobs are resources are global to your subscription.

To add your Assembly Line to Shippable, you need to add the repository containing the configuration as a "sync repository" by [following instructions here](/platform/tutorial/workflow/add-assembly-line). This automatically parses your **shippable.yml** config and adds your workflow to Shippable. Your workflow will always be kept in sync with the config in this repository, and be automatically updated every time you push a change to **shippable.yml**.

Your view will look something like this:

<img src="/images/tutorial/provision-gcp-nexus-gcloudcli-fig1.png" alt="Assembly Line view">

####4. Run the job `install_gce_nexus_job`

You can manually run the job by right clicking on the job and clicking on `Build job`, or by committing a change to your repository containing nexus config.

<img src="/images/tutorial/provision-gcp-nexus-gcloudcli-fig2.png" alt="Build console output">

Confirm that the Sonatype Nexus repository was installed at `NEXUS_HOST` address.

## Further Reading
* [Defining Resources in shippable.yml](/platform/workflow/config/#resources)
* [Defining Jobs in shippable.yml](/platform/workflow/config/#jobs)
* [Sharing information between Jobs](/platform/tutorial/workflow/share-info-across-jobs/)
