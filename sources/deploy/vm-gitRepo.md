page_main_title: Deploying from a git repository
main_section: CD
sub_section: Deploying app packages to VMs
page_title: Deploying an application to a VM Cluster from a git repository
page_description: How to deploy an application to a VM Cluster from a git repository in Shippable

# Deploying an application to a VM Cluster from a git repository

Shippable allows you to deploy an application to a VM cluster. A VM cluster is essentially a collection of machines with public IP addresses, which are used by the Shippable platform for application deployment.

In this tutorial, we will demonstrate how to deploy a NodeJS application from a git repository to a VM cluster and thereafter start the application. Please look at the sample project at the end of this document for details about how to setup CI for the NodeJS application.

## Topics Covered

- Specifying the location of the NodeJS application.
- Defining the VM cluster where the application is deployed.
- Deploying your application.

## Deployment workflow

This is a pictorial representation of the workflow required to deploy your application. The green boxes are jobs and the grey boxes are the input resources for the jobs. Both jobs and inputs are specified in Shippable configuration files.

<img src="/images/deploy/nodecluster/gitRepo-pipeline.png" alt="Final Pipeline">

We will now proceed to implementing the jobs and resources in the workflow.

## Configuration

The configuration for this Assembly Line is in the [shippable.yml](/platform/workflow/config/) file at the root of the repository -

* [Resources](/platform/workflow/resource/overview/) (grey boxes) are defined in the `resources` section of the**shippable.yml** file.

* [Jobs](/platform/workflow/job/overview/) (green boxes) are defined in the `jobs` section of the**shippable.yml** file.

This file should be committed to your source control. Step 3 of the workflow below will describe how to add the config to Shippable.

## Prerequisites for VMs

Since we are deploying and running a NodeJS application, preinstall nodejs, npm, and forever on each VM host.

## Instructions

###1. Define `app_repo`

* **Description:** `app_repo` is a [gitRepo resource](/platform/workflow/resource/gitrepo/) resource that points to a git repository with your application. In our example, the git repository is on GitHub.
* **Required:** Yes.

**Steps**

Add the following yml block to your [shippable.yml](/platform/workflow/config/) file.

```
resources:

  - name: app_repo
    type: gitRepo
    integration: github
    versionTemplate:
      sourceName: devops-recipes/deploy-nodecluster-basic # the full repository name (owner and repo)
      branch: gitRepo # This will create the first version for the gitRepo branch
      buildOnCommit: false # We don't want to automatically update this resource
```

###2. Define `app_cluster`.

* **Description:** `app_cluster` is a [cluster](/platform/integration/nodeCluster) resource that represents the VM cluster where your application is deployed. In our example, the cluster points to two AWS EC2 machines.
* **Required:** Yes.
* **Integrations needed:** [Node Cluster](/platform/integration/nodeCluster/)
In this integration, we specify the public IP addresses of all the VMs where we want to deploy the application.

**Steps**

1. Create an integration for [`Node Cluster`](/platform/integration/nodeCluster/). Instructions to create an integration can be found [here](/platform/tutorial/integration/subscription-integrations/).

2. Set the friendly name of the integration as `vm_nodes_int`. If you change the name, please change it also in the yml below.

3. Add the following yml block to the `resources` section of your [shippable.yml](/platform/workflow/config/) file.

```
resources:

  - name: app_cluster
    type: cluster
    integration: vm_nodes_int
```

###3. Import the Assembly Line configuration into your Shippable account and enable the repository for CI.

In order to set up the jobs for this assembly line, we need to first enable the repository for CI.  So, we will enable it for CI and add it as a syncRepo (to add the resources we've defined) now.  Then we will add the jobs and trigger the pipeline.

Once you have the resources defined in your **shippable.yml** file as described above, commit it to your repository. This repository is called a [sync repository](/platform/tutorial/workflow/add-assembly-line/).

Follow [these instructions](/platform/tutorial/workflow/add-assembly-line/) to import your configuration files into your Shippable account.

And [enable the project for CI](/ci/enable-project/).

At this point, you should be able to see the CI project and rSync job on your SPOG, with ciRepo and syncRepo inputs.  The resources will also be visible on your SPOG if you have "show orphaned" selected.

###4. Add `app_runCI` to shippable.yml.

* **Description:** `app_runCI` is the [runCI](/platform/workflow/job/runci) job created when the project was enabled for CI.  We'll add an output to the runCI job that will trigger our Assembly Line.

    We want this job to be able to update `app_repo`, so `app_repo` is listed as an `OUT` resource.  The job name (`app_runCI` in the example) must match the one automatically created for CI exactly.

* **Required:** Yes.

**Steps**

Add the following yml block to your [shippable.yml](/platform/workflow/config/) file to add a `jobs` section.

```
jobs:

- name: app_runCI
  type: runCI
  steps:
    - OUT: app_repo

```

We will also need to tell the CI job what we want to update in `app_repo`.  To do this, add a `post_ci` section to your **shippable.yml** to update the gitRepo `versionName` and `shaData` to match the version of the ciRepo when it is not a pull request.  When CI runs for a pull request, we'll run the tests and skip the deployment.

```
post_ci:
  - if [ $IS_PULL_REQUEST == "false" ] ; then shipctl put_resource_state  app_repo "versionName" $(shipctl get_resource_version_name app_ciRepo); fi;
  - if [ $IS_PULL_REQUEST == "false" ] ; then jq -M --argfile ciRepo $APP_CIREPO_PATH/version.json '.version.propertyBag.shaData = $ciRepo.version.propertyBag.shaData' $APP_REPO_PATH/version.json > tmp.json && mv tmp.json $APP_REPO_PATH/version.json; fi;
```

If you get an error with a `shipctl` command, make sure that your subscription is on a recent [machine image](/platform/runtime/machine-image/ami-overview/).  Or specify a more recent build image for CI in [pre_ci_boot](/platform/workflow/config/#build).

###5. Define `app_deploy`.

* **Description:** `app_deploy` is a [deploy](/platform/workflow/job/deploy) job that actually deploys the application to the VM cluster.

    A deploy job, without further directions, will take any gitRepo inputs and copy the files to the nodes in the cluster.  It doesn't take any specific action with the files, it simply downloads them to a particular location on the hosts.  Since we want this deployment to actually update our running application, we'll have to add some commands to the job.

    Unlike deployments to our supported container services, deployments to VM clusters allow for custom scripting.  This is because anything written in the `TASK` section of the job is executed *on the individual machines*, not on the Shippable platform.  So, if your VM cluster has two machines, the Shippable deployment service will ssh into each machine, one at a time, download the files from the manifest, and run the series of script commands in the `TASK` section.

* **Required:** Yes.

**Steps**

Add the following yml block to the existing `jobs` section of your [shippable.yml](/platform/workflow/config/) file.

```
jobs:

  - name: app_deploy
    type: deploy
    steps:
      - IN: app_repo
      - IN: app_cluster
      - TASK:
        - script: forever stopall
        - script: rm -r ~/app_repo
        - script: mv /tmp/shippable/app_repo/gitRepo ~/app_repo
        - script: cd ~/app_repo
        - script: npm install
        - script: PORT=8888 ENVIRONMENT=nodeCluster forever start ./bin/www
```

  In this case, we know that files are copied to a specific location on the host, the `/tmp/shippable` directory.  From that point, there will be a directory named after the `deploy` job, and one or more directories inside that folder named for each gitRepo being deployed.  In this case, we're using the names of our resources to build the path to the downloaded file and then moving that file to the `shippable` user's home directory.

  Since our application is written in NodeJS, we're using foreverjs to run the process in the background.  We stop any existing running forever scripts, and then we start our application with the required environment variables.

  **You'll need to make sure your host machines have pre-installed all of the applications necessary to run your software.  In our case, we've pre-installed nodejs, npm, and forever on each host.**

  If you do not want the deployment to be triggered automatically after CI, you can add `switch: off` to the `app_repo` input as described [here](/platform/tutorial/workflow/insert-approval-gate/) and trigger the deploy job manually.

###6. Trigger your pipeline

This Assembly Line has been set up to trigger automatically after successful CI runs. If you wish to trigger the deploy job without running CI, click the deploy job in the [SPOG View](/platform/visibility/single-pane-of-glass-spog/), and select **Run Job**.

When we visit one of our machines, we can see our application running with the correct environment settings:

<img src="/images/deploy/nodecluster/running-application.png" alt="The running application">

## Sample project

Here is a link to a working sample of this scenario. This is a simple Node.js application that runs some tests and then archives and pushes the source code to Amazon S3. It also contains all of the pipelines configuration files for deploying and running the application on a node cluster.

**Source code:**  [devops-recipes/deploy-nodecluster-basic](https://github.com/devops-recipes/deploy-nodecluster-basic/tree/gitRepo).
