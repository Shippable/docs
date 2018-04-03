page_main_title: Build GCE VM image with Packer
main_section: Tutorial
sub_section: GCE
sub_sub_section: Packer
page_title: Build Google Compute Engine VM image using Packer
page_description: Automated Google Compute Engine VM image baking with Packer.io
page_keywords: VM Image Build, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, Google Compute Engine, GCE

# Build Google Compute Engine VM image using Packer
This tutorial explains how to automate the build process of a GCE VM image using Packer.

## Introduction

Here is why you should be using Shippable. 

## Pre-requisites
To jump into this tutorial, you will need to familiarize yourself with the platform as well some of the pre-requisite usecases

### Platform Features
* [Google Cloud integration](/platform/integration/gcloudKey)
* [gitRepo resource](/platform/workflow/resource/gitrepo)
* [cliConfig resource](/platform/workflow/resource/cliconfig)
* [runSh job](/platform/workflow/job/runsh)

### Usecases
* [Working with Integrations](/platform/tutorial/integration/howto-crud-integration/)
* [Defining Resources in shippable.yml](/platform/tutorial/workflow/shippable-yml/#resources-config)
* [Defining Jobs in shippable.yml](/platform/tutorial/workflow/shippable-yml/#jobs-config)
* [Sharing information between Jobs](/platform/tutorial/workflow/sharing-data-between-jobs/)
* Using specific version of Google CLI
* Creating parametrized Jobs
* Using templates inside your Job
* Logging into your deployment cluster using CLI

### Google Cloud Concepts
* [GCE Virtual Machines](https://cloud.google.com/compute/docs/instances/)
* [GCE Images](https://cloud.google.com/compute/docs/images)

### Packer Concepts
* [Packer Intro](https://www.packer.io/intro)
* [Google Compute Builder](https://www.packer.io/docs/builders/googlecompute.html)
* [Shell Provisioner](https://www.packer.io/docs/provisioners/shell.html)

## Step by Step Instructions
The following sections explain the process of setting up a workflow to continuously build an GCE VM image using Packer.

**Source code is available at [devops-recipes/app_be](https://github.com/devops-recipes/cd_gke_kubectl)**

**Complete YML is at [devops-recipes/cd_gke_kubectl/shippable.yml](https://raw.githubusercontent.com/devops-recipes/cd_gke_kubectl/master/shippable.yml)**

###1. Add the account integrations 
Integrations are used to connect Shippable Platform with external providers. More information about integrations is [here](/platform/tutorial/integration/howto-crud-integration/)

The following are the integrations that we will use in this sample

####a. Add `Google Cloud Platform` Integration
To be able to interact with GCP, we need an integration. Add `drship_gcp `integration.

Detailed steps on how to add a Google Cloud Platform Integration are [here](/platform/integration/gcloudKey/#creating-an-account-integration).

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step

####b. Add `Github` Integration
In order to read your Assembly Line configuration from Github, we need an integration. Add `drship_github` integration.

Detailed steps on how to add a Github Integration are [here](/platform/integration/github/#creating-an-account-integration).

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step

###2. Add Assembly Line to Org
Next, add the configuration to your Shippable subscription. Jobs and resources section from your `shippable.yml` are parsed to create the workflow.

Detailed steps to add an Assembly Line are [here](/deploy/configuration).

###3. Define the `resources` section of the shippable.yml
`resources` section holds the config info that is necessary to deploy to a Kubernetes cluster. shippable.yml has 4 resources defined of type `image`, `gitRepo`, `cliConfig` and `cluster`. 

**Shippable Resources configuration stored in pack_conf_repo - shippable.yml**
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

####a. `gitRepo` resource named `pack_conf_repo `
Packer template file is stored in this repo and the assembly line needs to know where to find them. For this e.g. configs are present in `https://github.com/devops-recipes/cd_gke_kubectl`

Packer config files for this app are [here](https://github.com/devops-recipes/gcp_image_with_packer/tree/master/u16img)

Detailed info about `gitRepo` resource is [here](/platform/workflow/resource/gitrepo).

####b. `cliConfig` resource named `img_gcp_cli`
To be able to interact with Google Cloud Platform, you need to authenticate your gcloud cli. Shippable does this for you automatically when a `cliConfig` resource is present in a job.

Detailed info about `cliConfig` resource is [here](/platform/workflow/resource/cliconfig).

###4. Define the `jobs` section of the shippable.yml
A job is the actual execution unit of the assembly line.

In this job, we are going to do three things

* First, we are going to generate the authentication key for Packer to use
* Second, we are going validate the template
* Lastly, we are going build the image with Packer

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

**Shippable Jobs configuration stored in pack_conf_repo - shippable.yml**

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

###5. Push changes to shippable.yml
Commit and push all the above changes to shippable.yml. This should automatically trigger the sync process to add all the changes to the assembly line. Your view should look something like this. 

<img src="/images/tutorial/build-google-compute-engine-image-packer-fig1.png" alt="Assembly Line view">


###6. Run the deploy job `deploy_app_kctl_gke`
You can manually run the job by right clicking on the job or by triggering the CI process to generate a new image tag and deploy that new image to GKE. 

<img src="/images/tutorial/build-google-compute-engine-image-packer-fig2.png" alt="Build console output">

## Further Reading
*
