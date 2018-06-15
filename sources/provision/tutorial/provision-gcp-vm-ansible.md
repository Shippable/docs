page_description: Using Ansible playbooks to provision a Google cloud virtual machine
main_section: Provision
sub_section: GCP infrastructure

# Provision Google Compute Engine(GCE) virtual machine with Ansible

This tutorial explains how to automate the provisioning of a Google Compute Engine(GCE) virtual machine using Ansible.

This document assumes you're familiar with the following concepts:

* [Google Cloud Engine](https://cloud.google.com/compute/docs/)
* [Ansible gce module](http://docs.ansible.com/ansible/latest/modules/gce_module.html)

## Automated workflow to provision a GCE instance with Ansible

You can easily automate your workflow using Shippable's Assembly Lines. The following Assembly Line features are particularly noteworthy for this scenario:

* Creating an event-driven, automated workflow
* Securing workflow jobs with RBAC and contextually injecting credentials depending on who/what is running the Ansible playbook
* Dynamically injecting wildcard values in template playbooks, depending on the state of the workflow
* Visualizing your workflow and it's current status in a graphical view

To jump into this tutorial, you will need to familiarize yourself with a few platform concepts.

### Concepts
* [Integrations](/platform/integration/overview/)
    * [Google Cloud](/platform/integration/gcloudKey)
    * [Github](/platform/integration/github)
* [Resources](/platform/workflow/resource/overview/)
    * [gitRepo](/platform/workflow/resource/gitrepo)
    * [integration](/platform/workflow/resource/integration)
    * [params](/platform/workflow/resource/params)
* [Jobs](/platform/workflow/job/overview/)
    * [runSh](/platform/workflow/job/runsh)

### Instructions

The following sections explain the process of automating a workflow to provision a GCE instance using Ansible. We will demonstrate this with our sample application.

**Source code is available at [devops-recipes/prov_gcp_gce_ansible](https://github.com/devops-recipes/prov_gcp_gce_ansible)**

**Complete YML is at [devops-recipes/prov_gcp_gce_ansible/shippable.yml](https://raw.githubusercontent.com/devops-recipes/prov_gcp_gce_ansible/master/shippable.yml)**

Your workflow will look like this, where the green box is the job that runs your ansible playbook, while the grey boxes are input resources that are required for your playbook:

<img src="/images/tutorial/provision-gcp-gce-ansible-fig1.png" alt="Assembly Line view">

####1. Setup Google Cloud Platform

* Create a project on GCP. [Refer to GCP docs to learn how to do this](https://cloud.google.com/resource-manager/docs/creating-managing-projects).

* Create a service account for your project. Download and save the **JSON** security key. [Refer to GCP docs](https://cloud.google.com/compute/docs/access/service-accounts)

####2. Add necessary Account Integrations

Integrations are used to connect your Shippable workflow with external providers. More information about integrations is [here](/platform/tutorial/integration/howto-crud-integration/). We will use integrations for Google Cloud Keys and Github for this sample.

#####2a. Add `Google Cloud Platform` Integration

To be able to interact with GCP, we add `drship_gcp `integration.

Detailed steps on how to add a Google Cloud Platform Integration are [here](/platform/integration/gcloudKey/#creating-an-account-integration).

> Note: You might already have this if you have done some of our other tutorials. If so, skip this step

#####2b. Add `Github` Integration

In order to read your workflow configuration from Github, we add `drship_github` integration. This points to the repository containing your Shippable workflow config file (**shippable.yml**) and Ansible playbook files.

Detailed steps on how to add a Github Integration are [here](/platform/integration/github/#creating-an-account-integration). Make sure you name the integration `drship_github` since that is the name we're using in our sample automation scripts.

> Note: You might already have this if you have done some of our other tutorials. If so, skip this step

####3. Author Assembly Line configuration

The platform is built with "Everything as Code" philosophy, so all configuration is in a YAML-based file called **shippable.yml**, which is parsed to create your Assembly Line workflow.

Detailed documentation on **shippable.yml** is [here](/deploy/configuration).

If you're using our sample code, **shippable.yml** already exists and you can use it with a few modifications.

#####2a. Add empty shippable.yml to your repo

Add an empty **shippable.yml** file to the the root of repository.

#####2b. Add `resources` section of the config

`resources` section holds the config info that is necessary to provision your GCE instance. In this case we have three resources defined, one each of `gitRepo`, `integration` and `params`.

```
resources:
# Automation scripts repo
  - name: gcp_gce_repo
    type: gitRepo
    integration: "drship_github"
    versionTemplate:
      sourceName: "devops-recipes/prov_gcp_gce_ansible"
      branch: master

# GCP credentials
  - name: gcp_gce_creds
    type: integration
    integration: "drship_gcp"

# Output of GCP provisioning
  - name: gcp_gce_info
    type: params
    versionTemplate:
      params:
        SEED: "initial_version"
```

######i. gitRepo resource named `gcp_gce_repo`

This resource points to the repository that contains your Ansible playbook files, so that they are accessible to your Assembly Line. For our example, these files are present in the repository [https://github.com/devops-recipes/prov_gcp_gce_ansible](https://github.com/devops-recipes/prov_gcp_gce_ansible), namely, [here](https://github.com/devops-recipes/prov_gcp_gce_ansible/tree/master/ansible).

Detailed info about `gitRepo` resource is [here](/platform/workflow/resource/gitrepo).

######ii. integration resource named `gcp_gce_creds`

The Google Cloud JSON file for your service account is securely stored in this integration.

To enable Ansible interaction with GCP, we will export the JSON key stored in this resource into a file at runtime.

Detailed info about `integration` resource is [here](/platform/workflow/resource/integration).

######iv. params resource named `gcp_gce_info`

We store information like **instance_ip**, **gce_tag_Role**, and **gce_name**, which are created during the execution of your playbook, in a `params` resource. Downstream jobs can access this information programmatically if required. For example, a separate job that deploys to the machine will need to know the instance IP.

Detailed info about `params` resource is [here](/platform/workflow/resource/params).

#####2c. Add `jobs` section of the config

A job is an execution unit of the Assembly Line. Our job has to perform four tasks:

* Replace wildcards needed by the Ansible playbook
* Export `JSON_key` into a file
* Run playbook
* Output `instance_ip` into the `params` resource to make it available for downstream jobs

```
jobs:
# Provision GCP GCE with Ansible
  - name: prov_gcp_gce_ans
    type: runSh
    steps:
      - IN: gcp_gce_repo
        switch: off
      - IN: gcp_gce_creds
        switch: off
      - TASK:
          name: prov_inst
          runtime:
            options:
              env:
                - STATE_RES_NAME: "gcp_gce_info"
                - gce_name: "dev"
                - gce_zone: "us-east1-d"
                - gce_machine_type: "n1-standard-1"
                - gce_image: "ubuntu-1604-xenial-v20180522"
                - gce_tag_Role: "demo-machines"
                - gce_count: 1
                - gce_volume_size: 30
                - GCE_PROJECT: "devops-recipes"
                - GCE_EMAIL: "dr-gke@devops-recipes.iam.gserviceaccount.com"
                - GCE_CREDENTIALS_FILE_PATH: "gcp_key.json"
          script:
            - pip install apache-libcloud backports.ssl_match_hostname
            - pushd $(shipctl get_resource_state "gcp_gce_repo")/ansible
            - echo $(shipctl get_integration_resource_field gcp_gce_creds JSON_key) > $GCE_CREDENTIALS_FILE_PATH
            - shipctl replace variables.yml inventory/gce.ini
            - ansible-playbook -v gce_prov_playbook.yml
      - OUT: gcp_gce_info
        overwrite: true
```

* Adding the above config to the jobs section of **shippable.yml** will create a `runSh` job called `prov_gcp_gce_ans`.
* The first section of `steps` defines all the input `IN` resources that are required to execute this job.
  * Ansible script files are under `./ansible` folder and it is version controlled in a repo represented by `gcp_gce_repo`.
  * Credentials to connect to GCP are in `gcp_gce_creds`. This resource has `switch: off` flag, so any changes to it will not trigger this job automatically
* The `TASK` section contains actual code that is executed when the job runs. We have just one task named `prov_inst` which does the following:
  * First, we define environment variables required by the ansible playbook-
    * `STATE_RES_NAME` is where we are going to store the outputs
    * `gce_name` is the name of instance
    * `gce_zone` is the GCP zone where the instance is going to be provisioned
    * `gce_machine_type` is the machine type that will be provisioned
    * `gce_image` is name of the source image that will used to provision this instance
    * `gce_tag_Role` is the role this instance plays and it is set as a tag
    * `gce_volume_size` is size of the volume attached in GB
    * `gce_count` is number of instances to provision
    * `GCE_PROJECT` is the GCP project id where the instance will be provisioned
    * `GCE_EMAIL` is service account email id of the project
    * `GCE_CREDENTIALS_FILE_PATH` is the path where the service account json key is present
  *  `script` section has a list of commands which will be executed sequentially.
    * First, Ansible's gce module requires a couple of special libraries that are being installed
    * Then, we use the Shippable utility function `get_resource_state` to go to the folder where Ansible playbook is stored
    * Next, we extract the service account json key from the `gcp_gce_creds`resource, again using shipctl functions
    * Next, we replace all wildcards in the playbook
    * Last, we execute the playbook. This step also updates the `gcp_gce_info` resource with `instance_ip`, `gce_tag_Role`, and `gce_name` generated during playbook execution. To see where this magic happens, look at the last lines in the playbook `gce_prov_playbook.yml`.

```
# update shippable resource state
    - name: run cmd
      shell: |
        shipctl put_resource_state_multi "{{ STATE_RES_NAME }}" "INST_{{ item.0 }}_PUBLIC_IP={{ item.1.public_ip }}" "gce_tag_Role={{ gce_tag_Role }}" "gce_name={{ gce_name }}"
      with_indexed_items: "{{ gce.instance_data }}"
```

Detailed info about `runSh` job is [here](/platform/workflow/job/runsh).

Detailed info about Shippable Utility functions are [here](/platform/tutorial/workflow/using-shipctl).

#####2d. Push changes to shippable.yml

Commit and push all the above changes to **shippable.yml**.

####3. Add the Assembly Line to your Shippable organization

In Shippable's world, a Subscription maps to an Organization or a Team, depending on the source control provider. An Assembly Line workflow is defined at a Subscription level and all jobs are resources are global to your subscription.

To add your Assembly Line to Shippable, you need to add the repository containing the configuration as a "sync repository" by [following instructions here](/deploy/configuration/#adding-a-syncrepo). This automatically parses your **shippable.yml** config and adds your workflow to Shippable. Your workflow will always be kept in sync with the config in this repository, and be automatically updated every time you push a change to **shippable.yml**.

Your view will look something like this:

<img src="/images/tutorial/provision-gcp-gce-ansible-fig1.png" alt="Assembly Line view">

####4. Run the build job `prov_gcp_gce_ans`

You can manually run the job by right clicking on the job and clicking on **Build job**, or by committing a change to your repository containing ansible config.

<img src="/images/tutorial/provision-gcp-gce-ansible-fig2.png" alt="Build console output">

Confirm that the required GCE instance was created in GCP.

## OPTIONAL: Automating the termination of GCE instance with Ansible

You might also want to automatically terminate GCE instances when you no longer need them. A great example is if you want to spin up a complete on-demand test environment and destroy them is tests pass.

The steps below demonstrate how to implement the automatic termination workflow.

### Instructions

For this workflow, we start with the resources and jobs that were created in the provisioning tutorial above, and just add another job that will terminate the GCE instance.

####1. Author Assembly Line configuration

In this step, we will add a new job to your **shippable.yml** that terminates the GCE instance using Ansible.

#####1a. Add `jobs` section of the config**

Our job will do the following:

* Read information from `IN` resources, including `gcp_gce_info` which contains `instance_ip`.
* Replace wildcards in Ansible playbook.
* Run the ansible playbook to terminate the instance

```
jobs:

# Terminate GCP GCE with Ansible
 - name: term_gcp_gce_ans
    type: runSh
    steps:
      - IN: gcp_gce_repo
        switch: off
      - IN: gcp_gce_creds
        switch: off
      - IN: gcp_gce_info
        switch: off
      - TASK:
          name: term_inst
          runtime:
            options:
              env:
                - gce_zone: "us-east1-d"
                - gce_name: "dev"
                - gce_tag_Role: "demo-machines"
                - GCE_PROJECT: "devops-recipes"
                - GCE_EMAIL: "dr-gke@devops-recipes.iam.gserviceaccount.com"
                - GCE_CREDENTIALS_FILE_PATH: "gcp_key.json"
          script:
            - pip install apache-libcloud backports.ssl_match_hostname
            - pushd $(shipctl get_resource_state "gcp_gce_repo")/ansible
            - echo $(shipctl get_integration_resource_field gcp_gce_creds JSON_key) > $GCE_CREDENTIALS_FILE_PATH
            - shipctl replace variables.yml inventory/gce.ini
            - ansible-playbook -v gce_term_playbook.yml
```

* Adding the above config to the jobs section of shippable.yml will create a `runSh` job called `term_gcp_gce_ans`.
* The first section of `steps` defines all the input `IN` resources that are required to execute this job.
  * Ansible script files are under `./ansible` folder and it is version controlled in a repo represented by `gcp_gce_repo`.
  * Credentials to connect to GCP are in `gcp_gce_creds`. This resource has `switch: off` flag which means any changes to it will not trigger this job automatically
  * The GCE provisioning job outputs the instance information to a resource `gcp_gce_info`. This job will take that resource as an IN to determine which instance(s) to terminate.
* The `TASK` section contains the actual code that is executed when the job runs. We have just one task named `term_inst` which does the following:
  *  `script` section has a list of commands that are executed sequentially.
    * First, ansible gce module requires a couple of special libraries that are being installed  
    * Then, we use the Shippable utility function `get_resource_state` to go to the folder where Ansible playbook **gce_term_playbook.yml** is stored
    * Next, we extract the service account json key from the `gcp_gce_creds`resource, again using shipctl functions
    * Next, we replace all wildcards in the playbook
    * Last, we execute the playbook. This finds all instances that match the specific tag Role in the zone and terminates them.

**Excerpt from gce_term_playbook.yml**
```
# actual file - https://github.com/devops-recipes/prov_gcp_gce_ansible/blob/master/ansible/gce_term_playbook.yml

  tasks:
    - name: delete instances
      # Basic termination of instance.
      gce:
        service_account_email: "{{ GCE_EMAIL }}"
        credentials_file: "{{ GCE_CREDENTIALS_FILE_PATH }}"
        project_id: "{{ GCE_PROJECT }}"
        tags: "{{ gce_tag_Role }}"
        zone: "{{ gce_zone }}"
        instance_names: "{{ gce_name }}"
        state: absent
      tags:
        - delete
```

Detailed info about `runSh` job is [here](/platform/workflow/job/runsh).

Detailed info about Shippable Utility functions is [here](/platform/tutorial/workflow/using-shipctl).

####2. Push changes to shippable.yml

Commit and push all the above changes to **shippable.yml**.

This should automatically trigger the sync process to add all the changes to the assembly line. Your view should look something like this.

<img src="/images/tutorial/provision-gcp-gce-ansible-fig3.png" alt="Assembly Line view">

Detailed info to hook your AL is [here](/deploy/configuration/#adding-a-syncrepo).

####3. Run the build job `term_gcp_gce_ans`

You can manually run the job by right clicking on the job or by triggering the job to terminate GCE instances.

<img src="/images/tutorial/provision-gcp-gce-ansible-fig4.png" alt="Build console output">

## Further Reading
* [Working with Integrations](/platform/tutorial/integration/howto-crud-integration/)
* [Defining Resources in shippable.yml](/platform/tutorial/workflow/shippable-yml/#resources-config)
* [Defining Jobs in shippable.yml](/platform/tutorial/workflow/shippable-yml/#jobs-config)
* [Sharing information between Jobs](/platform/tutorial/workflow/share-info-across-jobs/)
