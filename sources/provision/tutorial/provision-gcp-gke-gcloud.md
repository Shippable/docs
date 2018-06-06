page_description: Using gcloud to provision a GCP GKE cluster
main_section: Provision
sub_section: GCP infrastructure

# Provision GCP GLE with gcloud

This tutorial explains how to automate the provisioning of an Google Kubernetes Engine with gcloud.

This document assumes you're familiar with the following concepts:

* [Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine)
* [GCloud and it's SDK](https://cloud.google.com/sdk/gcloud/)
* [Kubernetes Intro](https://kubernetes.io/docs/user-journeys/users/application-developer/foundational/)

If you're unfamiliar with GKE, it would be good to start with learning how to provision infrastructure manually with scripts. Refer to our blog for a step-by-step tutorial: [Provision GCP GKE with gcloud](http://blog.shippable.com/provision-gcp-gke-gcloud).

## Manual Steps
* install gcloud
* create a service account on gcp
* run the create cluster command


There are many challenges with manually running scripts. In short, injecting the right values for creds, params at runtime, and managing security and accounts on the machine used to run the script. Also, if you have dependent workflows, you will have to manually go trigger each one.

If you want to achieve frictionless execution of Terraform templates, you need to templatize your scripts and automate the workflow used to execute them.


## Automated workflow to provision GKE with gcloud

You can easily automate your workflow using Shippable's Assembly Lines. The following Assembly Line features are particularly noteworthy for this scenario:

* Creating an event-driven, automated workflow
* Securing workflow jobs with RBAC and contextually injecting credentials depending on who/what is running your scripts
* Dynamically injecting wildcard values in templates, depending on the state of the workflow
* Visualizing your workflow and it's current status in a graphical view

To jump into this tutorial, you will need to familiarize yourself with a few platform concepts.

### Concepts
* [Workflow overview](/platform/workflow/overview/)
* [Integrations](/platform/integration/overview/)
  * [Google Cloud](/platform/integration/gcloudKey)
* [Resources](/platform/workflow/resource/overview/)
  * [cliConfig](/platform/workflow/resource/cliconfig)
  * [cluster](/platform/workflow/resource/cluster)
* [Jobs](/platform/workflow/job/overview/)
  * [runSh](/platform/workflow/job/runsh)

### Step by Step Instructions

The following sections explain the process of automating a workflow to provision AWS ECS using Terraform. We will demonstrate this with our sample application.

**Source code is available at [devops-recipes/prov_gcp_gke_gcloud](https://github.com/devops-recipes/prov_gcp_gke_gcloud)**

**Complete YML is at [devops-recipes/prov_gcp_gke_gcloud/shippable.yml](https://raw.githubusercontent.com/devops-recipes/prov_gcp_gke_gcloud/master/shippable.yml)**

Your workflow will look like this, where the green box is the job that runs your terraform script, while the grey boxes are input resources that are required for your scripts:

<img src="/images/tutorial/provision-gcp-gke-gcloud-fig1.png" alt="Assembly Line view">

####1. Add necessary Account Integrations

Integrations are used to connect your Shippable workflow with external providers. More information about integrations is [here](/platform/tutorial/integration/howto-crud-integration/). We will use integrations for AWS Keys and Github for this sample.

#####1a. Add AWS Keys Integration

To be able to interact with GCP, we need to add the `drship_aws` integration.

Detailed steps on how to add an AWS Keys Integration are [here](/platform/integration/aws-keys/#creating-an-account-integration). Make sure you name the integration `drship_gcp` since that is the name we're using in our sample automation scripts.

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step.

####2. Author Assembly Line configuration

The platform is built with "Everything as Code" philosophy, so all configuration is in a YAML-based file called **shippable.yml**, which is parsed to create your Assembly Line workflow.

Detailed documentation on **shippable.yml** is [here](/deploy/configuration).

If you're using our sample code, **shippable.yml** already exists and you can use it with a few modifications.

#####2a. Add empty shippable.yml to your repo

Add an empty **shippable.yml** file to the the root of repository.

#####2b. Add `resources` section of the config

`resources` section holds the config info that is necessary to provision and ecs instance. In this case we have 4 resources defined of type `integration`, `gitRepo`, `state` and `cluster`.

```
resources:
# GCP credentials
  - name: prov_gcp_gke_creds
    type: cliConfig
    integration: "drship_gcp"
    versionTemplate:
      region: "us-east1"

# Output of provisioning
# GKE cluster info
  - name: gcp_gke_cluster
    type: cluster
    integration: "drship_gcp"
    versionTemplate:
      sourceName: "tbd"
      region: "us-west1-a"
```
######i. cliConfig resource named `prov_gcp_gke_creds`

Your GCP credentials are securely stored in this integration.

Detailed info about `cliConfig` resource is [here](/platform/workflow/resource/cliConfig).

######ii. params resource named `gcp_gke_cluster`

We store information like **clusterName** and **region**, which is created during the execution of your scripts, in a `cluster` resource. Downstream jobs can access this information programmatically if required. For example, a separate jobs that deploys to the cluster will need to know the connection information to the cluster.

Detailed info about `cluster` resource is [here](/platform/workflow/resource/cluster).

#####2c. Add `jobs` section of the config

A job is an execution unit of the Assembly Line. Our job has to perform four tasks:

* Check to see if the cluster already exists
* If the cluster does not exisit, provision it by using the supplied values. (cliConfig has auto logged you into GCP and hence not auth needs to be performed)
* If the job succeed, output `clusterName` and `region` into the `cluster` resource to make it available for downstream jobs

```
jobs:
# Provision GCP GKE with gcloud
  - name: prov_gcp_gke
    type: runSh
    steps:
      - IN: prov_gcp_gke_creds
        switch: off
      - TASK:
          name: prov_cluster
          runtime:
            options:
              env:
                - cluster_name: "test-cluster"
                - cluster_zone: "us-east1-d"
                - machine_type: "n1-standard-1"
                - machine_count: 3
                - volume_size: 30
          script:
            - |
                # check if the cluster already exists on GKE
                response=$(gcloud container clusters describe $cluster_name --zone $cluster_zone || echo "ClusterNotFound")
                if [[ $response = "ClusterNotFound" ]]
                  then
                    echo "cluster not found, creating cluster"
                    gcloud container clusters create $cluster_name --num-nodes=$machine_count --machine-type=$machine_type --disk-size=$volume_size --zone=$cluster_zone
                  else
                    echo "cluster already exists, skipping creating cluster"
                fi
      - OUT: gcp_gke_cluster
        overwrite: true
    on_success:
      script:
        - shipctl put_resource_state_multi gcp_gke_cluster "versionName=$cluster_name" "sourceName=$cluster_name" "region=$cluster_zone"
```

* Adding the above config to the jobs section of shippable.yml will create a `runSh` job called `prov_gcp_gke`.

* The first section of `steps` defines all the input `IN` resources that are required to execute this job.
  * Credentials to connect to GCP are in `prov_gcp_gke_creds`. This resource has `switch: off` flag, so any changes to it will not trigger this job automatically

* The `TASK` section contains the actual code that is executed when the job runs. We have just one task named `prov_ecs` which does the following:
  
  * First, we define environment variables required by the scripts-
    * `cluster_name` is name of the cluster to be provisioned
    * `cluster_zone` is the zone where the cluster is provisioned
    * `machine_type` is the type of machines used for the nodes
    * `machine_count` is the number of nodes the cluster will use
    * `volume_size` is the storage available on the nodes in GB
  
  * `script` section has a list of commands which will be executed sequentially.
    * First, we check if the cluster is already present
    * If it's not present, provison using the `gcloud container clusters` command
 
  * `on_success` section is executed if the TASK succeeded. This step updates the `cluster` resource with `sourceName` & `region` which were provisioned as part of this script

Detailed info about `runSh` job is [here](/platform/workflow/job/runsh).

#####2d. Push changes to shippable.yml

Commit and push all the above changes to **shippable.yml**.

####3. Add the Assembly Line to your Shippable organization

In Shippable's world, a Subscription maps to an Organization or a Team, depending on the source control provider. An Assembly Line workflow is defined at a Subscription level and all jobs are resources are global to your subscription.

To add your Assembly Line to Shippable, you need to add the repository containing the configuration as a "sync repository" by [following instructions here](/deploy/configuration/#adding-a-syncrepo). This automatically parses your **shippable.yml** config and adds your workflow to Shippable. Your workflow will always be kept in sync with the config in this repository, and be automatically updated every time you push a change to **shippable.yml**.

Your view will look something like this:

<img src="/images/tutorial/provision-gcp-gke-gcloud-fig1.png" alt="Assembly Line view">

####4. Run the build job `prov_gcp_gke`

You can manually run the job by right clicking on the job and clicking on **Build job**

<img src="/images/tutorial/provision-gcp-gke-gcloud-fig2.png" alt="Console view">

Confirm that the required cluster was created on GCP.

## Further Reading
* [Working with Integrations](/platform/tutorial/integration/howto-crud-integration/)
* [Defining Resources in shippable.yml](/platform/tutorial/workflow/shippable-yml/#resources-config)
* [Defining Jobs in shippable.yml](/platform/tutorial/workflow/shippable-yml/#jobs-config)
* [Sharing information between Jobs](/platform/tutorial/workflow/sharing-data-between-jobs/)
