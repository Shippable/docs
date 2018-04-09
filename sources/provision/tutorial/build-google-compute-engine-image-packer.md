page_main_title: Build GCE VM image with Packer
main_section: Tutorial
sub_section: GCE
sub_sub_section: Packer
page_title: Build Google Compute Engine VM image using Packer
page_description: Automated Google Compute Engine VM image baking with Packer.io
page_keywords: VM Image Build, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, Google Compute Engine, GCE

# Build Google Compute Engine VM image using Packer
This tutorial explains how to automate the build process of a GCE VM image using Packer. It also assumes that you have working knowledge of Packer and GCE and undestand the following concepts.

* [GCE Virtual Machines](https://cloud.google.com/compute/docs/instances/)
* [GCE Images](https://cloud.google.com/compute/docs/images)
* [Packer Intro](https://www.packer.io/intro)
* [Google Compute Builder](https://www.packer.io/docs/builders/googlecompute.html)
* [Shell Provisioner](https://www.packer.io/docs/provisioners/shell.html)

## Manual Steps to Deploy
This section covers step by step instructions to manually build the VM image starting from a vanilla Ubuntu 16.04 image.

* Create a project on Google Cloud Platform and note down the `Project ID`. [GCP Info](https://cloud.google.com/resource-manager/docs/creating-managing-projects)
* Install the version of gcloud CLI based on the OS of the machine from which you plan to build the image. [GCP Info](https://cloud.google.com/sdk/gcloud/)
* Install the version of Packer based on the OS of the machine from which you plan to build the image. [Packer Info](https://www.packer.io/docs/install/index.html)
* Create a Packer template for your image. Your template will look something like this,

**Packer Template**

```
{
  "variables": {
    "source_image_family": "var",
    "machine_type": "var",
    "region": "var",
    "zone": "var",
    "project_id": "var"
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
      "ssh_username": "root"
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

* If you don't have one you can use our sample [packer.json](https://github.com/devops-recipes/gcp_image_with_packer/blob/master/u16img/packer.json). You can replace all the variables with values or supply it during runtime. 
* Authenticate the newly installed gcloud to GCP. You do this with the following command `gcloud auth login`. [GCP Info](https://cloud.google.com/sdk/gcloud/reference/auth/login)
* Execute the following command to validate the template. Be sure to replace the project_id with your project

```
packer validate -var region="us-west1" -var source_image_family="ubuntu-1604-lts" -var machine_type="n1-standard-1" -var zone="us-west1-b" -var project_id=$PROJECT_ID packer.json` 
```

* Execute the following command to build the image. Be sure to replace the project_id with your project

```
packer build -var region="us-west1" -var source_image_family="ubuntu-1604-lts" -var machine_type="n1-standard-1" -var zone="us-west1-b" -var project_id=$PROJECT_ID packer.json` 
```

## Challenges with manual deployments
There are a few challenges with manual deployment

* Packer templates can be reused since they have variables, if you can somehow find a programmatic way to supply those values. Creating static files will reduce re-usability. Even with a variables file, it somehow needs the values.
* Automating the building images for different apps and creating a dependency tree of your images is going to be very challenging to achieve with manual steps. You need workflow to effectively build all dependent images when upstream images change
* RBAC is going to be a huge problem. The machine used to deploy is authenticated to a project (even in the case of service accounts). This means that the only way you can implement RBAC across multiple projects/teams is to use multiple accounts on the machine. This is messy and painful to maintain at scale.
* The machine has to be prepped with the right version of the CLI. If multiple teams are deploying and they have a need to use different versions of the CLI, you will need different deployment machines


## Automating Packer GCE Image builds
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
The following sections explain the process of setting up a workflow to continuously build an GCE VM image using Packer.

**Source code is available at [devops-recipes/gcp_image_with_packer](https://github.com/devops-recipes/gcp_image_with_packer)**

**Complete YML is at [devops-recipes/gcp_image_with_packer/shippable.yml](https://raw.githubusercontent.com/devops-recipes/gcp_image_with_packer/master/shippable.yml)**

####1. Setup Google Cloud Platform 
If you have already done the manual steps, you might not need these, except for creating a service account

* Create a project on GCP
* Create a service account for your project, download and store the `JSON` security key in a secure place. [GCP Info](https://cloud.google.com/compute/docs/access/service-accounts)

Integrations are used to connect Shippable Platform with external providers. More information about integrations is [here](/platform/tutorial/integration/howto-crud-integration/)

The following are the integrations that we will use in this sample

####2. Add necessary Account Integrations
Integrations are used to connect Shippable Platform with external providers. More information about integrations is [here](/platform/tutorial/integration/howto-crud-integration/). The following are the integrations that we will use in this sample

**2a. Add `Google Cloud Platform` Integration**

To be able to interact with GCP, we add `drship_gcp `integration.

Detailed steps on how to add a Google Cloud Platform Integration are [here](/platform/integration/gcloudKey/#creating-an-account-integration).

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step

**2b. Add `Github` Integration**

In order to read your AL configuration from Github, we add `drship_github` integration. This is the repo where you are going to store your AL config file (`shippable.yml`) and Kubernetes config files.

In this case this we are using repo [`devops-recipes/gcp_image_with_packer `](https://github.com/devops-recipes/gcp_image_with_packer).

Detailed steps on how to add a Github Integration are [here](/platform/integration/github/#creating-an-account-integration).

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step


####3. Author Assembly Line configuration
The platform is built with "Everything as Code" philosophy and it uses YAML based configuration file called `shippable.yml`. Jobs and Resources section from your `shippable.yml` are parsed to create the AL.

Detailed AL configuration info is [here](/deploy/configuration).

**3a. Add empty shippable.yml to your repo**

Add an empty config file to the the root of your repo.

**3b. Add `resources` section of the config**

`resources` section holds the config info that is necessary to deploy to a Kubernetes cluster. In this case we have 4 resources defined of type `cliConfig` and `gitRepo`.

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
#####i. `gitRepo` resource named `config_repo`
Your Kubernetes config files will be placed in a repo and the assembly line needs to know where to find them. For this e.g. configs are present in `https://github.com/devops-recipes/gcp_image_with_packer`

Packer config files for this app are [here](https://github.com/devops-recipes/gcp_image_with_packer/tree/master/u16img)

Detailed info about `gitRepo` resource is [here](/platform/workflow/resource/gitrepo).

#####ii. `cliConfig` resource named `gcp_cli`
To be able to interact with Google Cloud Platform, you need to authenticate your gcloud cli. Shippable does this for you automatically when a `cliConfig` resource is present in a job.

Detailed info about `cliConfig` resource is [here](/platform/workflow/resource/cliconfig).

**3c. Add `jobs` section of the config**

A job is the actual execution unit of the assembly line. In this job, we are going to do three things

* First, we are going to generate the authentication key for Packer to use
* Second, we are going validate the template
* Lastly, we are going build the image with Packer

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
In Shippable's world, an Org or a Group depending on the SCM system you are using equate to a Subscription. We will hook the YML so that the platform can render the AL.

This should automatically trigger the sync process to add all the changes to the assembly line. Your view should look something like this.

<img src="/images/tutorial/build-google-compute-engine-image-packer-fig1.png" alt="Assembly Line view">

Detailed info to hook your AL is [here](/deploy/configuration/#adding-a-syncrepo).

###6. Run the build job `prep_u16_gce_image`
You can manually run the job by right clicking on the job or by triggering the CI process to generate a new image tag and deploy that new image to GKE. 

<img src="/images/tutorial/build-google-compute-engine-image-packer-fig2.png" alt="Build console output">

## Further Reading
* [Working with Integrations](/platform/tutorial/integration/howto-crud-integration/)
* [Defining Resources in shippable.yml](/platform/tutorial/workflow/shippable-yml/#resources-config)
* [Defining Jobs in shippable.yml](/platform/tutorial/workflow/shippable-yml/#jobs-config)
* [Sharing information between Jobs](/platform/tutorial/workflow/sharing-data-between-jobs/)
* Using specific version of Google CLI
* Creating parametrized Jobs
* Using templates inside your Job
* Logging into your deployment cluster using CLI
