page_main_title: Provision Kubernetes cluster on GKE with Google Cloud SDK (gcloud CLI)
main_section: Provision
sub_section: Google Cloud infrastructure

# Provision Kubernetes cluster on GKE with Google Cloud SDK (gcloud CLI)

The [deploy job](/platform/workflow/job/deploy) helps make your deployments very easy and quick to configure. However, you might want to write your deployment scripts yourself for added control and customization or simply to bring your existing proven CLI based deployment scripts over to Shippable.  This page walks through an example of using the Google Cloud SDK (gcloud CLI) to create a Kubernetes cluster on Google Container Engine (GKE).

## Deployment workflow

This is a pictorial representation of the workflow required to deploy your application. The green boxes are jobs and the grey boxes are the input resources for the jobs. Both jobs and inputs are specified in Shippable configuration files.

<img src="/images/provision/workflow-provision-kubecluster-gke.png"/>

These are the key components of the assembly line diagram -

**Resources (grey boxes)**

* `app_gitRepo` is a **required** [gitRepo](/platform/workflow/resource/gitrepo/) resource which is a pointer to the git repository that contains your cli scripts.
* `gke_cliConfig` is a **required** [cliConfig](/platform/workflow/resource/cliconfig/) resource which is a pointer to the private key of your service account needed to initialize the gcloud CLI.
* `app_trigger` is an **optional** [trigger](/platform/tutorial/workflow/shippable-triggers-yml/) that can be used to trigger the workflow by committing a change to update the version of the trigger.

**Jobs (green boxes)**

* `provision_gke_cluster_job` is a **required** is a [runSh](/platform/workflow/job/runsh/) job that invokes scripts in the git repository to provision a GKE cluster.
* `deprovision_gke_cluster_job` is a **required** is a [runSh](/platform/workflow/job/runsh/) job that invokes scripts in the git repository to deprovision a GKE cluster.

## Configuration

They are three configuration files that are needed to achieve this usecase -

* Resources are defined in your [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/) file. Please find an overview of resources [here](/platform/workflow/resource/overview/).

* Jobs are defined in your [shippable.jobs.yml](/platform/tutorial/workflow/shippable-jobs-yml/) file. Please find an overview of jobs [here](/platform/workflow/job/overview/).

* Triggers are defined in your [shippable.triggers.yml](/platform/tutorial/workflow/shippable-triggers-yml/) file. Please find an overview of triggers [here](/platform/workflow/trigger/overview/).

## Steps

###1. Define `app_gitRepo`.

* **Description:** `app_gitRepo` is a [gitRepo](/platform/workflow/resource/gitrepo/) resource which is a pointer to the git repository that contains your cli scripts.
* **Required:** Yes.
* **Integrations needed:** default SCM account integration or other source control providers.

By default, you will already have an account integration with whichever SCM provider you've used to log into Shippable. If your CLI repository is on that SCM account, you should use it as is and skip Step 1 below.

If your CLI repository is on another SCM account, create an integration for it by using one of the following supported SCM docs:

- [GitHub]([instructions here](/platform/integration/github/))
- [Bitbucket](/platform/integration/bitbucket/)
- [GitLab](/platform/integration/gitlab/)
- [GitHub Enterprise](/platform/integration/github-enterprise/)

**Steps**  

1. Create an account integration using your SCM. Instructions to create an integration can be found [here](http://docs.shippable.com/platform/tutorial/integration/howto-crud-integration/). Set the friendly name of the integration as `dr_github`. If you change the name, please change it also in the yml below .

2. Add the following yml block to your [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/) file.

```
resources:

  # GitHub repo holding scripts to be used in runsh pipeline job
  - name: app_gitRepo
    type: gitRepo
    integration: dr_github # replace with your GitHub integration name
    pointer:
      # replace with source code location (e.g. GitHub) where you cloned this
      # sample project.
      sourceName: devops-recipes/provision-gke-kubernetes-cluster
      branch: master
```

###2. Define `gke_cliConfig`.

* **Description:** `gke_cliConfig` is a [cliConfig](/platform/workflow/resource/cliconfig/) resource which is a pointer to the private key of your service account needed to initialize the gcloud CLI.
* **Required:** Yes.
* **Integrations needed:** [Google Cloud Integration](/platform/integration/gcloudKey/)

**Steps**  

1. Create an account integration using your Shippable account for GKE. Instructions to create an integration can be found [here](http://docs.shippable.com/platform/tutorial/integration/howto-crud-integration/). Set the friendly name of the integration as `drship_gke`. If you change the name, please change it also in the yml below .

2. Add the following yml block to your [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/) file.

```
resources:

  - name: gke_cliConfig
    type: cliConfig
    integration: drship_gke
    pointer:
      region: us-central1-b
```

###3. Define `app_trigger`.
* **Description:** `app_trigger` is a [trigger](/platform/tutorial/workflow/shippable-triggers-yml/) that can be used to trigger the workflow by committing a change to update the version of the trigger. In our example, we have used a simple `counter` attribute as the version, but you can use any attribute of your choice that represents a version such as a SHA, semantic version etc.
* **Required:** No.

**Steps**

Add the following yml block to your [shippable.triggers.yml](/platform/tutorial/workflow/shippable-triggers-yml/) file.
```
triggers:
# triggers for the provision-gke-kubernetes-cluster app

  - name: app_trigger
    type: trigger
    version:
      # update counter and commit the file to trigger the workflow
      counter: 1

```

###4. Define `provision_gke_cluster_job` and `deprovision_gke_cluster_job`.

* **Description:** `provision_gke_cluster_job` and `deprovision_gke_cluster_job` are [runSh](/platform/workflow/job/runsh/) jobs that let you run any shell script as part of your DevOps Assembly Line. `runSh` is one of the most versatile jobs in the arsenal and can be used to pretty much execute any DevOps activity that can be scripted.

Both jobs take the `gke_cliConfig` resource as an INPUT. This initializes both jobs with the `gcloud` CLI authenticated as the service account.

* **Required:** Yes.

**Steps**

Add the following yml block to your [shippable.jobs.yml](/platform/tutorial/workflow/shippable-jobs-yml/) file.

```
jobs:
# jobs for the provision-gke-kubernetes-cluster app

  # Job that provisions the GKE cluster
  - name: provision_gke_cluster_job
    type: runSh
    steps:
      - IN: app_gitRepo
        # manually trigger the cluster provisioning job and not on every commit to the repository
        switch: off
      - IN: gke_cliConfig
      - IN: app_trigger
      - TASK:
        # invoke a script that provisions the GKE cluster named test-cluster
        - script: . $APP_GITREPO_PATH/gitRepo/provision_gke_cluster.sh test-cluster

  # Job that deprovisions the GKE cluster
  - name: deprovision_gke_cluster_job
    type: runSh
    steps:
      - IN: app_gitRepo
        switch: off
      - IN: gke_cliConfig
      - IN: provision_gke_cluster_job
      - TASK:
        # invoke a script that deprovisions the GKE cluster named test-cluster
        # $GKE_CLICONFIG_POINTER_REGION is an environment variable that is automatically created and injected
        # by the gke_cliConfig resource and points to the availability zone.
        - script: . $APP_GITREPO_PATH/gitRepo/deprovision_gke_cluster.sh test-cluster $GKE_CLICONFIG_POINTER_REGION
```

#### Provisioning script `provision_gke_cluster.sh`
```
# This script provisions a GKE cluster
#! /bin/bash -e

gcloud container clusters create $1 --num-nodes=1 --machine-type=n1-standard-1
```

#### Deprovisioning script `deprovision_gke_cluster.sh`
```
# This script deprovisions a GKE cluster
#! /bin/bash -e

# generate the kubectl config file
gcloud container clusters get-credentials $1 --zone $2

# replace service with your own service name
service="hello-world"

# check if services are running and delete cluster only if no service is found
response=$(kubectl get service $service || echo "ServiceNotFound")
echo "service query response: "$response

if [[ $response = "ServiceNotFound" ]]
then
   echo "no service found, deleting cluster"
   gcloud -q container clusters delete $1 --zone=$2
fi
```

###5. Import configuration into your Shippable account to create the assembly line for the application.

Once you have these jobs and resources yml files as described above, commit them to your repository. This repository is called a [sync repository](/platform/tutorial/workflow/crud-syncrepo/). You can then follow instructions to [add your assembly line to Shippable](/platform/tutorial/workflow/crud-syncrepo/).

Once you have imported your configuration, your assemble line will look like this in the [SPOG View](/platform/visibility/single-pane-of-glass-spog/).

<img src="/images/provision/pipeline-provision-gkecluster.png"/>

###6. Trigger your pipeline

When you're ready for deployment, right-click on the `provision_gke_cluster_job` job in the [SPOG View](/platform/visibility/single-pane-of-glass-spog/), and select **Build Job**.

Screenshots of the jobs as viewed in the SPOG.

<img src="/images/provision/pipeline-provision-gke-job.png"/>
<img src="/images/provision/pipeline-deprovision-gke-job.png"/>

### Sample project

**Source code:**  [devops-recipes/provision-gke-kubernetes-cluster](https://github.com/devops-recipes/provision-gke-kubernetes-cluster)
