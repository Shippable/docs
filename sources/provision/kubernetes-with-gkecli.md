page_main_title: Provision Kubernetes cluster on GKE with Google Cloud SDK (gcloud CLI)
main_section: IT Ops
sub_section: Google Cloud infrastructure
page_title: Provision Kubernetes cluster on GKE with Google Cloud SDK (gcloud CLI)
page_description: How to provision Kubernetes cluster on GKE with Google Cloud SDK (gcloud CLI) in Shippable

# Provision Kubernetes cluster on GKE with Google Cloud SDK (gcloud CLI)

The [deploy job](/platform/workflow/job/deploy) helps make your deployments very easy and quick to configure. However, you might want to write your deployment scripts yourself for added control and customization or simply to bring your existing proven CLI based deployment scripts over to Shippable.  This page walks through an example of using the Google Cloud SDK (gcloud CLI) to create a Kubernetes cluster on Google Container Engine (GKE).

## Deployment workflow

This is a pictorial representation of the workflow required to deploy your application. The green boxes are jobs and the grey boxes are the input resources for the jobs. Both jobs and inputs are specified in Shippable configuration files.

<img src="/images/provision/workflow-provision-kubecluster-gke.png"/>

These are the key components of the assembly line diagram -

**Resources (grey boxes)**

* `provgke_cluster_params` is a **required** [params](/platform/workflow/resource/params) resource that stores key-value pairs that are set as environment variables for consumption by the application.
* `provgke_gitRepo` is a **required** [gitRepo](/platform/workflow/resource/gitrepo/) resource which is a pointer to the git repository that contains your cli scripts.
* `provgke_cliConfig` is a **required** [cliConfig](/platform/workflow/resource/cliconfig/) resource which is a pointer to the private key of your service account needed to initialize the gcloud CLI.
* `provgke_trigger` is an **optional** [trigger](/platform/workflow/resource/trigger/) that can be used to trigger the workflow by committing a change to update the version of the trigger.

**Jobs (green boxes)**

* `provision_gke_cluster_job` is a **required** is a [runSh](/platform/workflow/job/runsh/) job that invokes scripts in the git repository to provision a GKE cluster.
* `deprovision_gke_cluster_job` is a **required** is a [runSh](/platform/workflow/job/runsh/) job that invokes scripts in the git repository to deprovision a GKE cluster.

## Configuration

The configuration for this Assembly Line is in the [shippable.yml](/platform/workflow/config/) file at the root of the repository -

* [Resources](/platform/workflow/resource/overview/) (grey boxes) are defined in the `resources` section of the**shippable.yml** file.

* [Jobs](/platform/workflow/job/overview/) (green boxes) are defined in the `jobs` section of the**shippable.yml** file.

## Steps

###1. Define `provgke_cluster_params`.

* **Description:** `provgke_cluster_params` is a [params](/platform/workflow/resource/params) resource used to specify key-value pairs that are set as environment variables for consumption by the application. We set environment variables needed to create  the cluster such as name, number of nodes, machine type.
* **Required:** No.

**Steps**

Add the following yml block to your [shippable.yml](/platform/workflow/config/) file.

```
resources:

- name: provgke_cluster_params
  type: params
  version:
    params:
      PROVGKE_CLUSTER_NAME: "test-kube-cluster"
      PROVGKE_CLUSTER_NUM_NODES: 1
      PROVGKE_CLUSTER_MACHINE_TYPE: "n1-standard-1"
      PROVGKE_KUBERNETES_NAMESPACE: "kube-app"
```

###2. Define `provgke_gitRepo`.

* **Description:** `provgke_gitRepo` is a [gitRepo](/platform/workflow/resource/gitrepo/) resource which is a pointer to the git repository that contains your cli scripts.
* **Required:** Yes.
* **Integrations needed:** default SCM account integration or other source control providers.

By default, you will already have an account integration with whichever SCM provider you've used to log into Shippable. If your CLI repository is on that SCM account, you should use it as is and skip Step 1 below.

If your CLI repository is on another SCM account, create an integration for it by using one of the following supported SCM docs:

- [GitHub]([instructions here](/platform/integration/github/))
- [Bitbucket](/platform/integration/bitbucket/)
- [GitLab](/platform/integration/gitlab/)
- [GitHub Enterprise](/platform/integration/github-enterprise/)

**Steps**  

1. Create an account integration using your SCM. Instructions to create an integration can be found [here](http://docs.shippable.com/platform/tutorial/integration/howto-crud-integration/). Set the friendly name of the integration as `drship_github`. If you change the name, please change it also in the yml below .

2. Add the following yml block to your [shippable.yml](/platform/workflow/config/) file.

```
resources:

  # GitHub repo holding scripts to be used in runsh pipeline job
  - name: provgke_gitRepo
    type: gitRepo
    integration: drship_github # replace with your GitHub integration name
    pointer:
      # replace with source code location (e.g. GitHub) where you cloned this
      # sample project.
      sourceName: devops-recipes/provision-gke-kubernetes-cluster
      branch: master
```

###3. Define `provgke_cliConfig`.

* **Description:** `provgke_cliConfig` is a [cliConfig](/platform/workflow/resource/cliconfig/) resource which is a pointer to the private key of your service account needed to initialize the gcloud CLI.
* **Required:** Yes.
* **Integrations needed:** [Google Cloud Integration](/platform/integration/gcloudKey/)

**Steps**  

1. Create an account integration using your Shippable account for GKE. Instructions to create an integration can be found [here](http://docs.shippable.com/platform/tutorial/integration/howto-crud-integration/). Set the friendly name of the integration as `drship_gcloud`. If you change the name, please change it also in the yml below .

2. Add the following yml block to the existing `resources` section in your [shippable.yml](/platform/workflow/config/) file.

```
resources:

  - name: provgke_cliConfig
    type: cliConfig
    integration: drship_gcloud
    pointer:
      region: us-central1-b
```

###4. Define `provgke_trigger`.
* **Description:** `provgke_trigger` is a [trigger](/platform/workflow/resource/trigger/) that can be used to trigger the workflow by committing a change to update the version of the trigger. In our example, we have used a simple `counter` attribute as the version, but you can use any attribute of your choice that represents a version such as a SHA, semantic version etc.
* **Required:** No.

**Steps**

Add the following trigger resource to the `resources` block in your [shippable.yml](/platform/workflow/config/) file.
```
resources:
# triggers for the provision-gke-kubernetes-cluster app

  - name: provgke_trigger
    type: trigger
    version:
      # update counter and commit the file to trigger the workflow
      counter: 1

```

###5. Define `provision_gke_cluster_job` and `deprovision_gke_cluster_job`.

* **Description:** `provision_gke_cluster_job` and `deprovision_gke_cluster_job` are [runSh](/platform/workflow/job/runsh/) jobs that let you run any shell script as part of your DevOps Assembly Line. `runSh` is one of the most versatile jobs in the arsenal and can be used to pretty much execute any DevOps activity that can be scripted.

Both jobs take the `gke_cliConfig` resource as an INPUT. This initializes both jobs with the `gcloud` CLI authenticated as the service account.

* **Required:** Yes.

**Steps**

Add the following yml block to your [shippable.yml](/platform/workflow/config/) file.

```
jobs:
# jobs for the provision-gke-kubernetes-cluster app

  # Job that provisions the GKE cluster
  - name: provision_gke_cluster_job
    type: runSh
    steps:
      - IN: provgke_cluster_params
      - IN: provgke_gitRepo
        # manually trigger the cluster provisioning job and not on every commit to the repository
        switch: off
      - IN: provgke_cliConfig
        scopes:
          - gke
      - IN: provgke_trigger
      - TASK:
        # invoke a script that provisions the GKE cluster defined in the provgke_cluster_params params resource
        - script: . $PROVGKE_GITREPO_PATH/gitRepo/provision_gke_cluster.sh $PROVGKE_CLUSTER_NAME $PROVGKE_CLUSTER_NUM_NODES $PROVGKE_CLUSTER_MACHINE_TYPE

  # Job that deprovisions the GKE cluster
  - name: deprovision_gke_cluster_job
    type: runSh
    steps:
      - IN: provgke_cluster_params
      - IN: provgke_gitRepo
        switch: off
      - IN: provgke_cliConfig
        scopes:
          - gke
      - IN: provision_gke_cluster_job
      - TASK:
        # invoke a script that deprovisions the GKE cluster defined in the provgke_cluster_params params resource
        # $GKE_CLICONFIG_POINTER_REGION is an environment variable that is automatically created and injected
        # by the gke_cliConfig resource and points to the availability zone.
        - script: . $PROVGKE_GITREPO_PATH/gitRepo/deprovision_gke_cluster.sh $PROVGKE_CLUSTER_NAME $PROVGKE_CLICONFIG_POINTER_REGION $PROVGKE_KUBERNETES_NAMESPACE
```

#### Provisioning script `provision_gke_cluster.sh`
```
# This script provisions a GKE cluster
#! /bin/bash -e

gcloud container clusters create $1 --num-nodes=$2 --machine-type=$3
```

#### Deprovisioning script `deprovision_gke_cluster.sh`
```
# This script deprovisions a GKE cluster
#! /bin/bash -e

# generate the kubectl config file
gcloud container clusters get-credentials $1 --zone $2

# check if services are running and delete cluster only if no service is found
response=$(kubectl get pods --namespace $3)
echo "Pods for namespace: "$response

# delete all pods and services
kubectl -n $3 delete po,svc --all

# delete the container
gcloud -q container clusters delete $1 --zone=$2
```

###6. Import configuration into your Shippable account to create the assembly line for the application.

Once you have the **shippable.yml** file as described above, commit it to your repository. This repository is called a [sync repository](/platform/tutorial/workflow/add-assembly-line/). You can then follow instructions to [add your assembly line to Shippable](/platform/tutorial/workflow/add-assembly-line/).

Once you have imported your configuration, your Assembly Line will look like this in the [SPOG View](/platform/visibility/single-pane-of-glass-spog/).

<img src="/images/provision/pipeline-provision-gkecluster.png"/>

###7. Trigger your pipeline

When you're ready for deployment, right-click on the `provision_gke_cluster_job` job in the [SPOG View](/platform/visibility/single-pane-of-glass-spog/), and select **Build Job**.

Screenshots of the jobs as viewed in the SPOG.

<img src="/images/provision/pipeline-provision-gke-job.png"/>
<img src="/images/provision/pipeline-deprovision-gke-job.png"/>

### Sample project

**Source code:**  [devops-recipes/provision-gke-kubernetes-cluster](https://github.com/devops-recipes/provision-gke-kubernetes-cluster)
