main_section: Deploy
sub_section: Deploying to Azure DC/OS

# Deploying to Azure DC/OS
There are many strategies that can be used to deploy containers to [Azure DC/OS](https://portal.azure.com/) using Shippable Pipelines.  This page will describe how you can take a single docker image and deploy it as an individual container to your cluster on Azure using orchestrator as DC/OS.

## Setup

Shippable will use a Azure DC/OS integration to communicate with your cluster on your behalf. You can add this to Shippable via Account Integrations.

-  Go to your **Account Settings** by clicking on the gear icon in the top navigation bar.

<img src="../../images/reference/integrations/account-settings.png" alt="Add Azure DC/OS credentials">

-  Click on **Integrations** in the left sidebar menu and then click on **Add integration**
-  Locate **Azure DC/OS** in the list and click on **Create Integration**
-  Name your integration and enter your Username and DNS name of Mesos master VM.
-  Choose the Subscription which contains the repository for which you want to deploy the containers.
-  Click **Save**. It will generate an public SSH key which should be added to the Mesos master VM.
-  After adding the SSH key, Click **Done**.

<img src="../../images/reference/integrations/azure-dcos-int.png" alt="Add Azure DC/OS credentials">

Now that the Azure DC/OS integration is added on Shippable, we can reference it when we create pipeline yml blocks. In this case, we want to create a cluster type block in our shippable.resources.yml file. This must reference a cluster that has been deployed in your environment and for which we created the Azure DC/OS integration in the previous step.

```
resources:

  - name: deploy-azure-basic-dcos
    type: cluster
    integration: dr-azure-cluster    #replace with your azure dc/os integration name
    flags:
      - deploy-azure-basic

```

You'll also need to create a type image resource. This will represent your Docker image in your pipeline. In our example, we're using an image hosted in Docker hub, that was created by when the repository was built.

```
resources:

  - name: deploy-azure-basic-dcos
    type: cluster
    integration: dr-azure-cluster    #replace with your azure dc/os integration name


  - name: deploy-azure-basic-img
    type: image
    integration: dr-dockerhub    #replace with your Docker Hub integration name
    pointer:
      sourceName: "library/nginx"  #replace with your image name on Docker Hub
      isPull: false
    seed:
      versionName: "latest"  #replace with your image tag on Docker Hub
```

With these resources, you're ready to start writing jobs that will help you deploy.

Now you're ready for deployment.  Right-click on the manifest job, and select **Run Job**.  Once you do this, the following steps will be taken:

- The manifest job will package your image with default settings
- The deploy job will create a group. That group will have the app which will have container with the image specified in your manifest.

After running, your pipeline will hopefully change color:
<img src="../../images/deploy/azure-dcos/shippable-azure-pipelines.png" alt="Azure Pipeline">

And  you can check your containers using Marathon UI or in the master FQDN Machine:

<img src="../../images/deploy/azure-dcos/marathon-ui-app.png" alt="Marathon UI">

<img src="../../images/deploy/azure-dcos/azure-cli.png" alt="Azure cli">


That's all there is to it!

### Advanced Configuration
In the above scenario, several options are set by default that you might want to change.

#### dockerOptions
Using [dockerOptions](http://docs.shippable.com/pipelines/resources/dockerOptions/), all of the advanced configurations of docker are available to you. In this example, we're simply exposing a port.
```
  - name: deploy-azure-basic-img-options
    type: dockerOptions
    version:
      memory: 32
      cpuShares: 1

```

#### replicas

[Replicas](http://docs.shippable.com/pipelines/resources/replicas/) is a very simple type of resource. You can use it to define how many copies of a particular manifest you want to be deployed. In this case we'll try to run two copies of our application. Note: since we've specified a port mapping, we can only run one of these containers per container instance.

```
  - name: deploy-azure-basic-replicas
    type: replicas
    version:
      count: 2
```

## Sample project
Here are some links to a working sample of this scenario. This contains all of the pipelines configuration files for deploying to Azure DC/OS.

**Source code:**  [deploy-azure-dcos-basic](https://github.com/jatindogra/sample_azure/tree/docs).

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).

