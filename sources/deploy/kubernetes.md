main_section: Deploy
sub_section: Kubernetes

# Deploying to Kubernetes
There are many strategies that can be used to deploy containers to [Kubernetes](https://kubernetes.io/) using Shippable Pipelines.  This page will describe how you can take a single docker image and deploy it as an individual container to your Kubernetes cluster.

## The Goal
The goal of this page is to accomplish the following scenario using Shippable Pipelines.

- Create a pipeline manifest using a docker image on docker hub
- Use the manifest as an input for a deploy job
- Deploy the manifest to a Kubernetes cluster

In the end, your pipeline will look like this:
![Pipeline view](https://github.com/devops-recipes/deploy-kubernetes-basic/raw/master/public/resources/images/pipeline-view.png)


## The Setup

Shippable will use a Kubernetes integration to communicate with your cluster on your behalf. You can add this to Shippable via Account Integrations.

- Go to your **Account Settings** by clicking on the gear icon in the top navigation bar.
- Click on **Integrations** in the left sidebar menu and then click on **Add Integration**.
- Locate **Kubernetes** of type **deploy** in the list and click **Create Integration**.
- Give your integration a name, choose **Kubernete Master** in the Cluster Access type drop down and provide your kubeconfig file for your cluster.
- Here is a an example config which we are using for deploying to our kube cluster:
  ```
  apiVersion: v1
  clusters:
  - cluster:
      certificate-authority-data: <data has been removed since its confidential>
      server: https://api.devops-recipes.com
    name: devops-recipes.com
  contexts:
  - context:
      cluster: devops-recipes.com
      user: devops-recipes.com
    name: devops-recipes.com
  current-context: devops-recipes.com
  kind: Config
  preferences: {}
  users:
  - name: devops-recipes.com
    user:
      client-certificate-data: <data has been removed since its confidential>
      client-key-data: <data has been removed since its confidential>
      password: <data has been removed since its confidential>
      username: admin
  - name: devops-recipes.com-basic-auth
    user:
      password: <data has been removed since its confidential>
      username: admin
  ```
- Your kubeconfig should have all those sections for your cluster.  
- From the dropdown, select the subscription that you'll be using to create your pipelines.
- Click **Save**

<img src="../../images/deploy/kubernetes/create-kube-deploy-integration.png" alt="Add Kubernetes credentials">


Now that the Kubernetes integration is added on Shippable, we can reference it when we create pipeline yml blocks.  In this case, we want to create a `cluster` type block in our `shippable.resources.yml` file.  This must reference a cluster that has been deployed in your environment and for which we created the Kubernetes integration in the previous step.

```
resources:

  - name: deploy-kubernetes-basic-kube-cluster
    type: cluster
    integration: dr-kube-cluster    #replace with your Kubernetes integration name
    flags:
      - deploy-kubernetes-basic

```

You'll also need to create a type `image` resource.  This will represent your Docker image in your pipeline.  In our example, we're using an image hosted in Docker hub, that was created by when the repository was built.

```
resources:

  - name: deploy-kubernetes-basic-kube-cluster
    type: cluster
    integration: dr-kube-cluster    #replace with your Kubernetes integration name
    flags:
      - deploy-kubernetes-basic

  - name: deploy-kubernetes-basic-img
    type: image
    integration: dr-dockerhub    #replace with your Docker Hub integration name
    pointer:
      sourceName: "docker.io/devopsrecipes/deploy-kubernetes-basic"  #replace with your image name on Docker Hub
      isPull: false
    seed:
      versionName: "master.1"  #replace with your image tag on Docker Hub
    flags:
      - deploy-kubernetes-basic
```

With these resources, you're ready to start writing jobs that will help you deploy.

## Basic configuration

Now that we have a reference to our image, we need to package it in a way that it can easily be deployed to any endpoint.  Shippable provides users with a managed task type `manifest` that accomplishes this goal.  Define this in your `shippable.jobs.yml`.

```
jobs:

- name: deploy-kubernetes-basic-manifest
  type: manifest
  steps:
   - IN: deploy-kubernetes-basic-img

```
It's as simple as that.  When this job runs, it will take your image as input, and produce a manifest object as output.  This manifest will contain detailed information about what you're deploying, and any particular settings that you want to take effect once deployed.  The various advanced configuration options that are available are described in [this section](../reference/resource-dockeroptions).

Now we can take that manifest, and use it as input to a `deploy` type job.  This is the managed job that will actually result in our container running on GKE.

```
jobs:

  - name: deploy-kubernetes-basic-manifest
    type: manifest
    steps:
      - IN: deploy-kubernetes-basic-img

  - name: deploy-kubernetes-basic-deploy
    type: deploy
    steps:
      - IN: deploy-kubernetes-basic-manifest
      - IN: deploy-kubernetes-basic-kube-cluster

```

The deploy job expects a manifest and a cluster as input.  The cluster tells Shippable where the manifest is going, and the manifest tells Shippable which images and settings you'd like to use.

With these jobs and resources created, your pipeline should look something like this:

![Pipeline view](https://github.com/devops-recipes/deploy-kubernetes-basic/raw/master/public/resources/images/pipeline-view.png)



Now you're ready for deployment.  Right-click on the manifest job, and select **Run Job**.  Once you do this, the following steps will be taken:

- The manifest job will package your image with default settings
- The deploy job will create the appropriate namespace if it doesn't already exist
- A podSpec will be created based on your manifest settings
- A Kubernetes deployment object will be created in the namespace referencing the podSpec

After running, you can check on your pods using kubectl :

```
ambarishs-MacBook-Pro:release ambarish$ kubectl get pods
NAMESPACE     NAME                                                              READY     STATUS    RESTARTS   AGE
default       kube-deploy-20bc938e-ea98-446b-8054-403d72eea3bd-359291515ltsvz   1/1       Running   0          2h
```

That's all there is to it!

### Advanced Configuration
In the above scenario, several options are set by default that you might want to change.

#### dockerOptions
Using [dockerOptions](../reference/resource-dockeroptions), all of the advanced configurations of docker are available to you. In this example, we're simply exposing a port.
```
  - name: deploy-kubernetes-basic-img-options
    type: dockerOptions
    version:
      portMappings:
        - 80:80
    flags:
      - deploy-kubernetes-basic
```
#### params
When [params resources](../reference/resource-params) are added to a manifest, they become environment variables for any container in that manifest.  In this case, we're setting some basic variables to help our application's configuration.

```
  - name: deploy-kubernetes-basic-params
    type: params
    version:
      params:
        PORT: 80
        ENVIRONMENT: "dev"


```
#### replicas

Using the [replicas resource](../reference/resource-replicas) is quite simple. You can define how many copies of a particular manifest you want to be deployed. In this case we'll try to run two copies of our application.

```
  - name: deploy-kubernetes-basic-replicas
    type: replicas
    version:
      count: 2
```

## Sample project

Here are some links to a working sample of this scenario. This is a simple Node.js application that runs some tests and then pushes
the image to Amazon ECR. It also contains all of the pipelines configuration files for deploying to Amazon ECS.

**Source code:**  [devops-recipes/deploy-kubernetes-basic](https://github.com/devops-recipes/deploy-kubernetes-basic).

**Build link:** [CI build on Shippable](https://app.shippable.com/github/devops-recipes/deploy-kubernetes-basic/runs/7/1/console)

**Build status badge:** [![Run Status](https://api.shippable.com/projects/58fcef822ddacd090044cf75/badge?branch=master
)](https://app.shippable.com/github/devops-recipes/deploy-kubernetes-basic)

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
