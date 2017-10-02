page_main_title: Deploying artifacts
main_section: Deploy
sub_section: Deploy to VMs

# Deploying an application to a VM Cluster

Shippable allows you to deploy an application to a VM cluster. A VM cluster is essentially a collection of machines with public IP addresses, which are used by the Shippable platform for application deployment.

In this tutorial, we will demonstrate how to deploy a NodeJS application package available in an S3 bucket to a VM cluster and thereafter start the application. Please look at the sample project at the end of this document for details about how to setup CI for the NodeJS application where we package and copy the application to an S3 bucket.

## Topics Covered

- Specifying the location of the NodeJS application package
- Specifying application runtime environment variables  
- Creating a Service definition of the application
- Defining the VM cluster where the application package is deployed
- Deploying your application


## Deployment workflow

This is a pictorial representation of the workflow required to deploy your application. The green boxes are jobs and the grey boxes are the input resources for the jobs. Both jobs and inputs are specified in Shippable configuration files.

<img src="../../images/deploy/nodecluster/basic-final-pipeline.png" alt="Final Pipeline">

We will now proceed to implementing the jobs and resources in the workflow.

## Configuration

They are two configuration files that are needed to achieve this usecase -

* Resources (grey boxes) are defined in your [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/) file, that should be created at the root of your repository. Please find an overview of resources [here](/platform/workflow/resource/overview/).

* Jobs (green boxes) are defined in your [shippable.jobs.yml](/platform/tutorial/workflow/shippable-jobs-yml/) file, that should be created at the root of your repository. Please find an overview of jobs [here](/platform/workflow/job/overview/).

These files should be committed to your source control. Step 8 of the workflow below will describe how to add the config to Shippable.

## Instructions

###1. Define `deploy-clusternode-basic-appfile`

* **Description:** `deploy-clusternode-basic-appfile` is an [file resource](/platform/workflow/resource/file/#file) resource that points to the URL of your application package. In our example, we're hosting the application in an public AWS S3 bucket with object versioning.
* **Required:** Yes.

**Steps**

Add the following yml block to your [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/) file.

```
- name: deploy-clusternode-basic-appfile
  type: file
  pointer:
    sourceName: https://s3.amazonaws.com/devops.recipes.nodecluster.packages/deploy-nodecluster-basic-appfile.tar.gz
    # points directly to publicly available file
  seed:
    versionName: foo # Dummy starting point. Later on, we'll use commitsha from CI to populate this field.
```

###2. Define `nodecluster-params`.

* **Description:** `nodecluster-params` is a [params](/platform/workflow/resource/params) resource used to specify key-value pairs that are set as environment variables for consumption by the application. Here we demonstrate setting two environment variables called `ENVIRONMENT` and `PORT` that are available in the running container.
* **Required:** No.

**Steps**

Add the following yml block to your [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/) file.

```
resources:

  - name: nodecluster-params
    type: params
    version:
      params:
        PORT: 8888
        ENVIRONMENT: nodeCluster
```

###3. Define `deploy-nodecluster-basic-manifest`.

* **Description:** `deploy-nodecluster-basic-manifest` is a [manifest](/platform/workflow/job/manifest) job used to create a service definition of a deployable unit of your application. The service definition consists of the application package and environment. The definition is also versioned (any change to the inputs of the manifest creates a new semantic version of the manifest) and is immutable.
* **Required:** Yes.

**Steps**

Add the following yml block to your [shippable.jobs.yml](/platform/tutorial/workflow/shippable-jobs-yml/) file.

```
jobs:

  - name: deploy-nodecluster-basic-manifest
    type: manifest
    steps:
      - IN: nodecluster-params
      - IN: deploy-nodecluster-basic-appfile
```

###4. Define `deploy-nodecluster-basic-cluster`.

* **Description:** `deploy-nodecluster-basic-cluster` is a [cluster](/platform/integration/node-cluster) resource that represents the VM cluster where your application is deployed to. In our example, the cluster points to two AWS EC2 machines.
* **Required:** Yes.
* **Integrations needed:** [Node Cluster](/platform/integration/node-cluster/)
In this integration, we specify the public IP addresses of all the VMs where we want to deploy the application to.

**Steps**

1. Create an account integration using your Shippable account for [`Node Cluster`](/platform/integration/node-cluster/). Instructions to create an integration can be found [here](http://docs.shippable.com/platform/tutorial/integration/howto-crud-integration/).

2. Set the friendly name of the integration as `dr-nc`. If you change the name, please change it also in the yml below.

3. Add the following yml block to your [shippable.resources.yml](/platform/tutorial/workflow/shippable-resources-yml/) file.

```
resources:

  - name: deploy-nodecluster-basic-cluster
    type: cluster
    integration: dr-nc
```

###5. Define `deploy-nodecluster-basic-deploy`.

* **Description:** `deploy-nodecluster-basic-deploy` is a [deploy](/platform/workflow/job/deploy) job that actually deploys the application manifest to the VM cluster.

    Without adding any custom script, this deploy job will take any files in the manifest, and copy them to the nodes in the cluster.  It doesn't take any specific action with the files, it simply downloads them to a particular location on the hosts.  Since we want this deployment to actually update our running application, we'll have to add some commands to the job.

    Unlike deployments to our supported container services, deployments to VM clusters allow for custom scripting.  This is because anything written in the `TASK` section of the job is executed *on the individual machines*, not on the Shippable platform.  So, if your VM cluster has two machines, the Shippable deployment service will ssh into each machine, one at a time, download the files from the manifest, and run the series of script commands in the `TASK` section.

    In this case, we know that files are copied to a specific location on the host, and that is the `/tmp/shippable` directory.  From that point, there will be a directory named after the `deploy` job, and one or more directories inside that folder named for each manifest being deployed.  In this case, we're using the names of our resources to build the path to the downloaded file.

    Since our application is written in nodejs, we're using foreverjs to run the process in the background.  After extracting our package, we stop any existing running forever scripts, and then we start our application.

    You'll need to make sure your host machines have pre-installed all of the applications necessary to run your software.  In our case, we've pre-installed nodejs, npm, and forever on each host.

* **Required:** Yes.

**Steps**

Add the following yml block to your [shippable.jobs.yml](/platform/tutorial/workflow/shippable-jobs-yml/) file.

```
jobs:

  - name: deploy-nodecluster-basic-deploy
    type: deploy
    steps:
      - IN: deploy-nodecluster-basic-manifest
      - IN: deploy-nodecluster-basic-cluster
      - TASK:
        - script: forever stopall
        - script: mkdir -p ~/deploy-nodecluster-basic-manifest && mkdir -p deploy-nodecluster-basic-manifest-2
        - script: cd ~/deploy-nodecluster-basic-manifest
        - script: source /tmp/shippable/deploy-nodecluster-basic-manifest/deploy-nodecluster-basic-appfile/package.env
        - script: tar zxf /tmp/shippable/deploy-nodecluster-basic-manifest/deploy-nodecluster-basic-appfile/deploy-nodecluster-basic-appfile.tar.gz
        - script: forever start ./bin/www
```

###6. Import configuration into your Shippable account.

Once you have these jobs and resources yml files as described above, commit them to your repository. This repository is called a [Sync repository](/platform/tutorial/workflow/crud-syncrepo/).

Follow [these instructions](/platform/tutorial/workflow/crud-syncrepo/) to import your configuration files into your Shippable account.

###7. Trigger your pipeline

Once you're all set up, you can start the workflow by running the CI job.  This should push the package, which triggers the file resource, and so on.  Eventually your deploy job should run and in our case, we see these successful logs:
<img src="/images/deploy/nodecluster/deploy-logs.png" alt="Deploy job output">

You can see the custom deployment script is executed twice. Once for each machine in our Node Cluster.  And when we visit one of our machines, we can see our application running with the correct environment settings:

<img src="/images/deploy/nodecluster/running-application.png" alt="The running application">

## Sample project

Here are some links to a working sample of this scenario. This is a simple Node.js application that runs some tests and then archives and pushes the source code to Amazon S3. It also contains all of the pipelines configuration files for deploying and running the application on a node cluster.

**Source code:**  [devops-recipes/deploy-nodecluster-basic](https://github.com/devops-recipes/deploy-nodecluster-basic).

**Build status badge:** [![Run Status](https://api.shippable.com/projects/59023242cd25170600356e72/badge?branch=master)](https://app.shippable.com/github/devops-recipes/deploy-nodecluster-basic)
