page_main_title: Using Packer to build a Google Cloud Platform VM image
page_description: Using Packer to build a Google Cloud Platform VM image
main_section: IT Ops
sub_section: Google Cloud infrastructure
sub_sub_section: Build VM images

# Build Google Compute Engine VM image using Packer

This tutorial explains how to automate the build process of a GCE VM image using Packer.

This document assumes you're familiar with the following concepts:

* [GCE Virtual Machines](https://cloud.google.com/compute/docs/instances/)
* [GCE Images](https://cloud.google.com/compute/docs/images)
* [Packer Intro](https://www.packer.io/intro)
* [Google Compute Builder](https://www.packer.io/docs/builders/googlecompute.html)
* [Shell Provisioner](https://www.packer.io/docs/provisioners/shell.html)

If you're unfamiliar with Packer, you should start by building an image manually. Refer to our blog for a step-by-step tutorial: [Build a GCP VM image with Packer](http://blog.shippable.com/build-a-gcp-vm-image-using-packer).

## Automating GCE Image builds with Packer and Shippable

You can easily automate your workflow using Shippable's Assembly Lines. The following Assembly Line features are particularly noteworthy for this scenario:

* Capability to create an event-driven workflow that automates the entire software delivery lifecycle
* Ability to create RBAC and contextually inject credentials based on who/what is running the deployment job
* Using template spec files and dynamically inject wildcard values depending on the state of the workflow
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

### Instructions

The following sections explain the process of automating a workflow to that builds a virtual machine image for GCE using Packer. We will demonstrate this with our sample application.

**Source code is available at [devops-recipes/gcp_image_with_packer](https://github.com/devops-recipes/gcp_image_with_packer)**

**Complete YML is at [devops-recipes/gcp_image_with_packer/shippable.yml](https://raw.githubusercontent.com/devops-recipes/gcp_image_with_packer/master/shippable.yml)**

####1. Setup Google Cloud Platform

* Create a project on GCP. [Refer to GCP docs to learn how to do this](https://cloud.google.com/resource-manager/docs/creating-managing-projects).

* Create a service account for your project, download and store the `JSON` security key in a secure place. [Refer to GCP docs](https://cloud.google.com/compute/docs/access/service-accounts)


####2. Add Integrations

Integrations are used to connect Shippable Platform with external providers. More information about integrations is [here](/platform/integration/overview/). The following are the integrations that we will use in this sample

#####2a. Add `Google Cloud Platform` Integration

To be able to interact with GCP, we add `drship_gcp `integration.

Detailed steps on how to add a Google Cloud Platform Integration are [here](/platform/integration/gcloudKey/).

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step

#####2b. Add `Github` Integration

In order to read your AL configuration from Github, we add `drship_github` integration. This points to the repository containing your Shippable workflow config file (**shippable.yml**) and Packer files.

In this case this we are using repo [`devops-recipes/gcp_image_with_packer `](https://github.com/devops-recipes/gcp_image_with_packer).

Detailed steps on how to add a Github Integration are [here](/platform/integration/github/).

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step

####3. Author Assembly Line configuration

The platform is built with "Everything as Code" philosophy, so all configuration is in a YAML-based file called **shippable.yml**, which is parsed to create your Assembly Line workflow.

Detailed documentation on **shippable.yml** is [here](/platform/workflow/config/#assembly-lines-configuration).

If you're using our sample code, **shippable.yml** already exists and you can use it with a few modifications.

#####3a. Add empty shippable.yml to your repo

Add an empty **shippable.yml** file to the the root of repository.

#####3b. Add `resources` section of the config

`resources` section holds the config info that is necessary to run your Packer build. In this case we have two resources defined, and one each of `gitRepo` and `cliConfig`.

```
resources:
  - name: pack_conf_repo
    type: gitRepo
    integration: drship_github
    versionTemplate:
      sourceName: devops-recipes/gcp_image_with_packer
      branch: master

  - name: img_gcp_cli
    type: cliConfig
    integration: drship_gcp
    versionTemplate:
      region: "us-west1-a"
```

######i. `gitRepo` resource named `config_repo`

This resource points to the repository that contains your Packer files, so that they are accessible to your Assembly Line. For our example, these files are present in the repository [https://github.com/devops-recipes/gcp_image_with_packer](https://github.com/devops-recipes/gcp_image_with_packer), namely, [here](https://github.com/devops-recipes/gcp_image_with_packer/tree/master/u16img).

Detailed info about `gitRepo` resource is [here](/platform/workflow/resource/gitrepo).

######ii. `cliConfig` resource named `gcp_cli`

To be able to interact with Google Cloud Platform, you need to authenticate your gcloud cli. Shippable does this for you automatically when a `cliConfig` resource is present in a job.

Detailed info about `cliConfig` resource is [here](/platform/workflow/resource/cliconfig).

#####3c. Add `jobs` section of the config


A job is an execution unit of the Assembly Line. Our job has to perform four tasks:

* Generate the authentication key for Packer to use
* Validate Packer template
* Run Packer build to build the image

```
jobs:
  - name: prep_u16_gce_image
    type: runSh
    triggerMode: parallel
    dependencyMode: strict
    steps:
      - IN: pack_conf_repo
      - IN: img_gcp_cli
        switch: off
      - TASK:
          name: prep_u16_gce_image
          runtime:
            options:
              env:
                - SOURCE_IMAGE_FAMILY: "ubuntu-1604-lts"
                - MACHINE_TYPE: "n1-standard-1"
                - REGION: "us-west1"
                - ZONE: "us-west1-b"
                - PROJECT_ID: "devops-recipes"
                - SERVICE_ACCOUNT_JSON: "gcp_key.json"
          script:
            # Create Auth Key section
            - pushd $(shipctl get_resource_state "pack_conf_repo")/u16img
            - echo $(shipctl get_integration_resource_field img_gcp_cli JSON_key) > $SERVICE_ACCOUNT_JSON
            # Validate Template section
            - packer validate -var service_account_json=$SERVICE_ACCOUNT_JSON -var region=$REGION -var source_image_family=$SOURCE_IMAGE_FAMILY -var machine_type=$MACHINE_TYPE -var zone=$ZONE -var project_id=$PROJECT_ID packer.json
            # Build Image section
            - packer build -machine-readable -var service_account_json=$SERVICE_ACCOUNT_JSON -var region=$REGION -var source_image_family=$SOURCE_IMAGE_FAMILY -var machine_type=$MACHINE_TYPE -var zone=$ZONE -var project_id=$PROJECT_ID packer.json 2>&1 | tee output.txt
            - export IMAGE_NAME=$(cat output.txt | awk -F, '$0 ~/artifact,0,id/ {print $6}' | cut -d':' -f 2)
            - popd
    on_success:
      script:
        - shipctl put_resource_state $JOB_NAME versionName $IMAGE_NAME
```

* Adding the above config to the jobs section of shippable.yml will create a `runSh` job called `prep_u16_gce_image`.
* The first section of `steps` defines all the input `IN` resources that are required to execute this job.
  * Packer config files `packer.json` is version controlled in a repo represented by `pack_conf_repo`.
  * Credentials to connect to Google Cloud is in `img_gcp_cli`. This resource has `switch: off` flag which means any changes to it will not trigger this job automatically
* The `TASK` section is the actual code that is executed when the job runs.
  *  Name of the task is `prep_u16_gce_image`
  *  It sets up an environment variables required by `packer.json` template during execution
    * `SOURCE_IMAGE_FAMILY` is the base image from which this image will be built
    * `MACHINE_TYPE` is the size of the machine used to build the image
    * `REGION` is the region in which the builder machine will be provisioned
    * `ZONE` is the zone where the builder machine will be provisioned
    * `PROJECT_ID` is the Google Cloud project that will own the image
    * `SERVICE_ACCOUNT_JSON` is the location of Google Service Account Key
  *  `script` section has the list of commands to execute. The commands are preforming 3 core things
    *  First is the "Create Auth Key section". Here we are using utility function `get_resource_state` on `config_repo` to get the folder where Packer files are stored. We then extract the Google Service Account key stored in the field `JSON_key` of resource `img_gcp_cli` using the utility `get_integration_resource_field`. The key is pushed into a file located at `SERVICE_ACCOUNT_JSON`.   
    *  Second is the "Validate Template section". We supply all the variables needed by the Packer template and validate the file
    *  Last step is the "Build Image section". Now that template has been validated, we build the image after supplying all the necessary variables. We use `machine-readable` option so that we can extract the image information from the output console
*  Finally, if the job was successful, we store the name of the image we just built in the `versionName` for the job, As a result, we maintain the history of every image built so that downstream jobs could systematically fetch them. We use utility `put_resource_state` to achieve this

Detailed info about `runSh` job is [here](/platform/workflow/job/runsh).

Detailed info about Shippable Utility functions are [here](/platform/tutorial/workflow/using-shipctl).

**Packer Build template stored in pack_conf_repo - packer.json**

```
{
  "variables": {
    "source_image_family": "var",
    "machine_type": "var",
    "region": "var",
    "zone": "var",
    "project_id": "var",
    "service_account_json": "var"
  },
  "builders": [
    {
      "type": "googlecompute",
      "project_id": "{{user `project_id`}}",
      "machine_type": "{{user `machine_type`}}",
      "source_image_family": "{{user `source_image_family`}}",
      "region": "{{user `region`}}",
      "zone": "{{user `zone`}}",
      "image_description": "Demo Ubuntu Machine Image",
      "image_name": "u16demo-{{timestamp}}",
      "disk_size": 16,
      "disk_type": "pd-ssd",
      "ssh_username": "root",
      "account_file": "{{ user `service_account_json`}}"
    }
  ],
  "provisioners": [
    {
      "type": "shell",
      "inline": [
        "sleep 10",
        "uname -a",
        "uptime"
      ]
    },
    {
      "type": "shell",
      "script": "init.sh",
      "execute_command": "echo 'packer' | sudo -S sh -c '{{ .Vars }} {{ .Path }}'"
    }
  ]
}
```

**3d. Push changes to shippable.yml**

Commit and push all the above changes to shippable.yml.

####4. Attach the AL to your Repo's Subscription

In Shippable's world, a Subscription maps to an Organization or a Team, depending on the source control provider. An Assembly Line workflow is defined at a Subscription level and all jobs are resources are global to your subscription.

To add your Assembly Line to Shippable, you need to add the repository containing the configuration as a "sync repository" by [following instructions here](/platform/tutorial/workflow/add-assembly-line). This automatically parses your **shippable.yml** config and adds your workflow to Shippable. Your workflow will always be kept in sync with the config in this repository, and be automatically updated every time you push a change to **shippable.yml**.

Your view should look something like this.

<img src="/images/tutorial/build-google-compute-engine-image-packer-fig1.png" alt="Assembly Line view">

###6. Run the build job `prep_u16_gce_image`

You can manually run the job by right clicking on the job and clicking on **Build job**, or by committing a change to your repository that will generate a new image tag and deploy that new image to GKE.

<img src="/images/tutorial/build-google-compute-engine-image-packer-fig2.png" alt="Build console output">

## Further Reading
* [Managing Integrations](/platform/tutorial/integration/subscription-integrations/)
* [Defining Resources in shippable.yml](/platform/workflow/config/#resources)
* [Defining Jobs in shippable.yml](/platform/workflow/config/#jobs)
* [Sharing information between Jobs](/platform/tutorial/workflow/share-info-across-jobs/)
