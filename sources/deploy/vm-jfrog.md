page_main_title: Deploying from a JFrog Artifactory repository
main_section: CD
sub_section: Deploying app packages to VMs
page_title: Deploying an application to a VM Cluster from a JFrog Artifactory repository
page_description: How to deploy an application to a VM Cluster from a JFrog Artifactory repository in Shippable

# Deploying an application to a VM Cluster from a JFrog Artifactory repository

Shippable allows you to deploy an application to a VM cluster. A VM cluster is essentially a collection of machines with public IP addresses, which are used by the Shippable platform for application deployment.

In this tutorial, we will demonstrate how to deploy a NodeJS application package available in a repository on JFrog artifactory to a VM cluster and thereafter start the application.

## Topics Covered

- Specifying the location of the JFrog Artifactory repository containing the NodeJS application package.
- Specifying application runtime environment variables.
- Creating a Service definition of the application.
- Defining the VM cluster where the application package is deployed.
- Deploying your application.


## Deployment workflow

This is a pictorial representation of the workflow required to deploy your application. The green boxes are jobs and the grey boxes are the input resources for the jobs. Both jobs and inputs are specified in Shippable configuration files.

<img src="/images/deploy/nodecluster/basic-pipeline.png" alt="Final Pipeline">

We will now proceed to implementing the jobs and resources in the workflow.

## Configuration

The configuration for this Assembly Line is in the [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file at the root of the repository -

* [Resources](/platform/workflow/resource/overview/) (grey boxes) are defined in the `resources` section of the`shippable.yml` file.

* [Jobs](/platform/workflow/job/overview/) (green boxes) are defined in the `jobs` section of the`shippable.yml` file.

This file should be committed to your source control. Step 6 of the workflow below will describe how to add the config to Shippable.

## Prerequisites for VMs

Since we are deploying and running a NodeJS application, preinstall nodejs, npm, and forever on each VM host.

## Instructions

###1. Define `app_file`

* **Description:** `app_file` is an [file resource](/platform/workflow/resource/file/) resource that points to the URL of your application package. In our example, we're hosting the application in an public AWS S3 bucket with object versioning.
* **Required:** Yes.
* **Integrations needed:** [JFrog Artifactory](/platform/integration/jfrog-artifactoryKey/)

**Steps**  

1. Create an account integration using your Shippable account for JFrog Artifactory.
    Instructions to create an integration can be found [here](http://docs.shippable.com/platform/tutorial/integration/howto-crud-integration/).

2. Set the friendly name of the integration as `dr-artifactory`. If you change the name, please change it also in the yml below.

3. Add the following yml block to your [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file.

```
resources:

  - name: app_file
    type: file
    integration: dr-artifactory
    pointer:
      sourceName: my-artifactory-repo/package-name # in the form [repository_name]/[repository_path]
    seed:
      versionName: foo # dummy starting point. the sample uses commitsha from CI to populate this field
```

###2. Define `app_params`.

* **Description:** `app_params` is a [params](/platform/workflow/resource/params) resource used to specify key-value pairs that are set as environment variables for consumption by the application. Here we demonstrate setting two environment variables called `ENVIRONMENT` and `PORT` that are available in the running container.
* **Required:** No.

**Steps**

Add the following yml block to the existing `resources` section of your [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file.

```
resources:

  - name: app_params
    type: params
    version:
      params:
        PORT: 8888
        ENVIRONMENT: nodeCluster
```

###3. Define `app_service_def`.

* **Description:** `app_service_def` is a [manifest](/platform/workflow/job/manifest) job used to create a service definition of a deployable unit of your application. The service definition consists of the application package and environment. The definition is also versioned (any change to the inputs of the manifest creates a new version of the manifest) and is immutable.
* **Required:** Yes.

**Steps**

Add the following yml block to your [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file.

```
jobs:

  - name: app_service_def
    type: manifest
    steps:
      - IN: app_file
```

###4. Define `app_cluster`.

* **Description:** `app_cluster` is a [cluster](/platform/integration/nodeCluster) resource that represents the VM cluster where your application is deployed. In our example, the cluster points to two AWS EC2 machines.
* **Required:** Yes.
* **Integrations needed:** [Node Cluster](/platform/integration/nodeCluster/)
In this integration, we specify the public IP addresses of all the VMs where we want to deploy the application.

**Steps**

1. Create an account integration using your Shippable account for [`Node Cluster`](/platform/integration/nodeCluster/). Instructions to create an integration can be found [here](http://docs.shippable.com/platform/tutorial/integration/howto-crud-integration/).

2. Set the friendly name of the integration as `vm_nodes_int`. If you change the name, please change it also in the yml below.

3. Add the following yml block to the `resources` section of your [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file.

```
resources:

  - name: app_cluster
    type: cluster
    integration: vm_nodes_int
```

###5. Define `app_deploy`.

* **Description:** `app_deploy` is a [deploy](/platform/workflow/job/deploy) job that actually deploys the application manifest to the VM cluster.

    Without adding any custom script, this deploy job will take any files in the manifest, and copy them to the nodes in the cluster.  It doesn't take any specific action with the files, it simply downloads them to a particular location on the hosts.  Since we want this deployment to actually update our running application, we'll have to add some commands to the job.

    Unlike deployments to our supported container services, deployments to VM clusters allow for custom scripting.  This is because anything written in the `TASK` section of the job is executed *on the individual machines*, not on the Shippable platform.  So, if your VM cluster has two machines, the Shippable deployment service will ssh into each machine, one at a time, download the files from the manifest, and run the series of script commands in the `TASK` section.

* **Required:** Yes.

**Steps**

Add the following yml block to the existing `jobs` section of your [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file.

```
jobs:

  - name: app_deploy
    type: deploy
    steps:
      - IN: app_service_def
      - IN: app_params
      - IN: app_cluster
      - TASK:
        - script: forever stopall
        - script: mkdir -p ~/app_service_def
        - script: cd ~/app_service_def
        - script: source /tmp/shippable/app_service_def/app_file/package.env
        - script: tar zxf /tmp/shippable/app_service_def/app_file/app_file.tar.gz
        - script: forever start ./bin/www

```

In this case, we know that files are copied to a specific location on the host, and that is the `/tmp/shippable` directory.  From that point, there will be a directory named after the `deploy` job, and one or more directories inside that folder named for each manifest being deployed.  In this case, we're using the names of our resources to build the path to the downloaded file.

Since our application is written in nodejs, we're using foreverjs to run the process in the background.  After extracting our package, we stop any existing running forever scripts, and then we start our application.

**You'll need to make sure your host machines have pre-installed all of the applications necessary to run your software.  In our case, we've pre-installed nodejs, npm, and forever on each host.**

###6. Import configuration into your Shippable account.

Once you have the `shippable.yml` file as described above, commit it to your repository. This repository is called a [sync repository](/platform/tutorial/workflow/crud-syncrepo/).

Follow [these instructions](/platform/tutorial/workflow/crud-syncrepo/) to import your configuration files into your Shippable account.

###7. Trigger your pipeline

When you're ready for deployment, right-click on the manifest job in the [SPOG View](/platform/visibility/single-pane-of-glass-spog/), and select **Run Job**. Your Assembly Line will also trigger every time `app_file` changes, i.e. each time you have a new version of the application package.

When we visit one of our machines, we can see our application running with the correct environment settings:

<img src="/images/deploy/nodecluster/running-application.png" alt="The running application">
