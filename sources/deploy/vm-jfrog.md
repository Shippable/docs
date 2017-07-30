page_main_title: Deploying from JFrog Artifactory
main_section: Deploy
sub_section: Node Cluster on any cloud

# Deploying From JFrog Artifactory to a Node Cluster
Shippable allows users to add one or more machine IPs as an integration in the form of a [Node Cluster](../platform/int-node-cluster).  A node cluster is basically a collection of machines that you want treat as a single endpoint for artifact deployment.

## The Goal
The goal of this page is to accomplish the following scenario using Shippable Pipelines.

- Package some source during Shippable CI.
- Upload the package to JFrog Artifactory
- Automatically trigger a pipeline after Shippable CI
- Deploy the file from Artifactory to a node cluster

In the end, your pipeline will look like this:
<img src="../../images/deploy/nodecluster/basic-final-pipeline.png" alt="Final Pipeline">

## Setup

For the CI portion of this sample, check out our page on [triggering pipeline jobs from CI](../ci/trigger-pipeline-jobs).  In order to complete this end-to-end, you'll need to set up your CI to push your build artifacts to Artifactory, so that the deployment can pull them.  This means you'll need an [artifactory integration](../platform/int-jfrog-artifactory).

For our pipeline, we'll start by adding a `cluster node` integration.  Ours will be called `dr-cn` and will have two machines associated with it.  [See here](../platform/int-node-cluster) for instructions on creating the integration.

Now we need a cluster resource that references the integration we created:

```
resources:
  - name: deploy-clusternode-jfrog-cluster
    type: cluster
    integration: dr-cn

```

Next we'll need a resource that acts as a representation of our software package.  In this sample, we'll be using a repository on Artifactory.  By specifying the `integration` section of the file resource, our deploy job will be able to use our Artifactory credentials to download the files from our private repository.
```
- name: deploy-clusternode-jfrog-appfile
  type: file
  integration: dr-artifactory
  pointer:
    sourceName: my-artifactory-repo/package-name # in the form [repository_name]/[repository_path]
  seed:
    versionName: foo # dummy starting point. the sample uses commitsha from CI to populate this field
```


## Managed
Shippable provides a type of managed job called [deploy](../platform/jobs-deploy), which can take an input of a [manifest job](../platform/jobs-manifest).  A manifest is made up of one or more files that you'd like to deploy to your nodecluster.  Each manifest can have its own set of customizable environment variables.

To run this deployment using Shippable managed jobs, we'll need a few more resources:

```
resources:

  - name: deploy-nodecluster-basic-cluster
    type: cluster
    integration: dr-nc
```

Here we've set up a cluster resource and attached a Node Cluster integration to it.  In our case, this is pointing to a cluster of two machines on Amazon EC2.

<img src="../../images/deploy/nodecluster/nodecluster-int.png" alt="Two nodes in this cluster">

```
resources:

  - name: nodecluster-params
    type: params
    version:
      params:
        PORT: 8888
        ENVIRONMENT: nodeCluster
```
This is a [params](../platform/workflow/resource/params) resource. it can be used to add environment variables to our manifest, which in turn adds these variables to the environment where our custom deployment script is executed.  Our sample application is looking for `PORT` and `ENVIRONMENT` when it boots, so we set those here.

We'll also need some jobs that utilize these new resources.
```
jobs:

  - name: deploy-nodecluster-jfrog-manifest
    type: manifest
    steps:
      - IN: nodecluster-params
      - IN: deploy-nodecluster-jfrog-appfile

  - name: deploy-nodecluster-jfrog-deploy
    type: deploy
    steps:
      - IN: deploy-nodecluster-jfrog-manifest
      - IN: deploy-nodecluster-jfrog-cluster


```

Here we've got one [manifest job](../platform/jobs-manifest) and one [deploy job](../platform/jobs-deploy).  The manifest job takes the file resource and params resource inputs.  The deploy job takes the manifest job and the cluster resource as inputs.

Without adding any custom script, this deploy job will take any files in the manifest, and copy them to the nodes in the cluster.  It doesn't take any specific action with the files, it simply downloads them to a particular location on the hosts.  Since we want this deployment to actually update our running application, we'll have to add some commands to the job.

```
jobs:

  - name: deploy-nodecluster-jfrog-manifest
    type: manifest
    steps:
      - IN: nodecluster-params
      - IN: deploy-nodecluster-jfrog-appfile

  - name: deploy-nodecluster-jfrog-deploy
    type: deploy
    steps:
      - IN: deploy-nodecluster-jfrog-manifest
      - IN: deploy-nodecluster-jfrog-cluster
      - TASK:
        - script: forever stopall
        - script: mkdir -p ~/deploy-nodecluster-basic-manifest && mkdir -p deploy-nodecluster-basic-manifest-2
        - script: cd ~/deploy-nodecluster-basic-manifest
        - script: source /tmp/shippable/deploy-nodecluster-basic-manifest/deploy-nodecluster-basic-appfile/package.env
        - script: tar zxf /tmp/shippable/deploy-nodecluster-basic-manifest/deploy-nodecluster-basic-appfile/deploy-nodecluster-basic-appfile.tar.gz
        - script: forever start ./bin/www
```

Unlike deployments to our supported container services, deployments to nodeclusters allow for custom scripting.  This is because anything written in the `TASK` section of the job is executed *on the individual machines*, not on the Shippable platform.  So, if your nodecluster has two machines, the Shippable deployment service will ssh into each machine, one at a time, download the files from the manifest, and run the series of script commands in the `TASK` section.

In this case, we know that files are copied to a specific location on the host, and that is the `/tmp/shippable` directory.  From that point, there will be a directory named after the `deploy` job, and one or more directories inside that folder named for each manifest being deployed.  In this case, we're using the names of our resources to build the path to the downloaded file.

Since our application is written in nodejs, we're using foreverjs to run the process in the background.  After extracting our package, we stop any existing running forever scripts, and then we start our application.

You'll need to make sure your host machines have pre-installed all of the applications necessary to run your software.  In our case, we've pre-installed nodejs, npm, and forever on each host.

Once you're all set up, you can start the workflow by running your CI job.  This should push the package, which triggers the file resource, and so on.  Eventually your deploy job should run and in our case, we see these successful logs:
<img src="../../images/deploy/nodecluster/deploy-logs.png" alt="Deploy job output">

You can see the custom deployment script is executed twice. Once for each machine in our Node Cluster.  And when we visit one of our machines, we can see our application running with the correct environment settings:

<img src="../../images/deploy/nodecluster/running-application.png" alt="The running application">

## Unmanaged
 coming soon
