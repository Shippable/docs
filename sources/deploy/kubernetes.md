page_main_title: Kubernetes Default scenario
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

## Building blocks

To deploy to Kubernetes, you need the following building blocks:

**Resources**

- [cluster](/platform/resource-cluster/) resource, to point to a cluster
- [image](/platform/resource-image/) resource, pointing to the Docker image

**Jobs**

- [manifest](/platform/jobs-manifest/) which creates a deployable unit for your application
- [deploy](/platform/job-deploy/), a managed job that does the deployment

## Step-by-step instructions

You will need two configuration files:

- `shippable.resources.yml` which contains resource definitions
- `shippable.jobs.yml` which contains job definitions

These files should be in your [syncRepo](/platform/resource-syncrepo/). Please read the [configuration](/deploy/configuration/) to find out how to add a syncRepo to Shippable.

Follow the steps below to set up a basic deployment to your Kubernetes cluster.

###1: Create account integrations

You need two account integrations for this scenario:

- **Kubernetes**

Shippable will use your kubernetes configuration to communicate with your cluster on your behalf. [See here](../platform/int-kubernetes) for directions on adding a Kubernetes account integration to Shippable for this.

- **Docker Hub**

You also need to configure an integration to Docker hub so that we can pull your image. Follow instructions in the [Docker Hub integration](/platform/int-docker-hub/) page.

###2: Create resources

You need the following three resources in your `shippable.resources.yml` file:

####cluster
First, we need a cluster resources which references a cluster that has been deployed in your environment and for which we created the Kubernetes integration in the previous step.

```
resources:

  - name: deploy-kubernetes-basic-kube-cluster
    type: cluster
    integration: dr-kube-cluster    #replace with your Kubernetes integration name
    flags:
      - deploy-kubernetes-basic

```

For a complete reference, check out the [cluster](/platform/resource-cluster/) page.

####image
Next, we need an `image` resource. This will represent your Docker image in your pipeline.  In our example, we're using an image hosted in Docker hub.

```
resources:
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

For a complete reference, check out the [image](/platform/resource-image/) page.

###3: Define jobs

Jobs are defined in your `shippable.jobs.yml`.

You need two jobs for this scenario:

####manifest

We need to package the image in a way that it can easily be deployed to any endpoint.  Shippable provides users with a managed task type `manifest` that accomplishes this goal.  Define this in your `shippable.jobs.yml`.

```
jobs:

- name: deploy-kubernetes-basic-manifest
  type: manifest
  steps:
   - IN: deploy-kubernetes-basic-img

```
It's as simple as that.  When this job runs, it will take your image as input, and produce a manifest object as output.  This manifest will contain detailed information about what you're deploying, and any particular settings that you want to take effect once deployed.

####deploy

Now we can take that manifest, and use it as input to a `deploy` type job.  This is the managed job that will actually result in our container running on Kubernetes cluster.

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

###4: Add your pipeline

Once you have these jobs and resources yml files as described above, push to your sync repository. You can then follow instructions to [add your pipeline to Shippable](/deploy/configuration/).

Your pipeline should look like this:
![Pipeline view](https://github.com/devops-recipes/deploy-kubernetes-basic/raw/master/public/resources/images/pipeline-view.png)

###5: Trigger your pipeline

When you're ready for deployment, right-click on the manifest job, and select **Run Job**.  Once you do this, the following steps will be taken:

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

## Advanced Configuration
In the above scenario, several options are set by default that you might want to change.

### dockerOptions
Using [dockerOptions](../platform/resource-dockeroptions), all of the advanced configurations of docker are available to you. For example, you can change the memory allocated to the container and expose a port.

```
  - name: deploy-kubernetes-basic-img-options
    type: dockerOptions
    version:
      memory: 100
      portMappings:
        - 80:80
    flags:
      - deploy-kubernetes-basic
```
The `dockerOptions` resource can then be an IN for your `manifest` or `deploy` job.

For a complete reference of all customizable options, check out our [dockerOptions reference](/platform/resource-dockeroptions/)

### params
When [params resources](../platform/resource-params) are added to a manifest, they become environment variables for any container in that manifest.  In this case, we're setting some basic variables to help our application's configuration.

```
  - name: deploy-kubernetes-basic-params
    type: params
    version:
      params:
        PORT: 80
        ENVIRONMENT: "dev"
```
These environment variables will be available in the running container.

### Scaling instances

You can use the [replicas resource](../platform/resource-replicas) to scale the number of instances of your manifest. You can define how many copies of a particular manifest you want to be deployed. This maps directly to the 'replicas' setting in the pod template.  In this case we'll try to run two copies of our application.

```
  - name: deploy-kubernetes-basic-replicas
    type: replicas
    version:
      count: 2
```

###Customizing deployment names

We use a default naming convention for deployment names:

| Deploy Method | Default Naming Convention |
|--------------|---------------------------|
| blueGreen (default) | deployJobName-manifestJobName-buildNumber |
| upgrade | deployJobName-manifestJobName |
| replace |deployJobName-manifestJobName |

Read more on [deployment strategies](/deploy/kubernetes-strategy/) to understand them in detail.

To override the default name, you can use the `deployName` tag.

```
jobs:
  - name: deploy-kubernetes-basic-deploy
    type: deploy
    steps:
      - IN: deploy-kubernetes-basic-manifest                  #required
        deployName: myApplication
      - IN: deploy-kubernetes-basic-cluster                   #required
      - TASK: managed
        deployMethod: upgrade | replace | blueGreen           #defaults to blueGreen
```

Some things to remember:

- The name generated with the blueGreen strategy, will include a suffix of build number. So the deployment name will be of format deployName-buildNumber.

- **upgrade** and **replace** deployments expect `deployName` to be present during the first deployment. The name of the first deployed service will be the name that will be used in subsequent deployments for upgrade/replace deploy methods. Hence, modifying the deployName will not take effect in a job for those types.

Shippable also injects some labels into your deployment objects, so that you can more easily set up kube services that talk to your pods.

| Label Key | Label Value |
|--------------|---------------------------|
| shippable.deploymentName | deployJobName-manifestJobName-buildNumber (buildNumber only if blueGreen)|
| shippable.jobName | deployJobName |
| shippable.manifestName | manifestJobName |

The `shippable.deploymentName` label is also used as the deployment selector label.

You can also add any custom labels that you wish by using the [dockerOptions resource](../platform/resource-dockeroptions)

### Forcing deployments for static tags

Shippable assumes that your images are versioned with unique names (we recommend tagging with `$BRANCH.$BUILD_NUMBER`). When your deploy job is triggered, it will deploy the latest version of the IN manifests if something has changed in the manifest, i.e. image tag, dockerOptions settings, or params.

If you tag your images with static tags like `latest` or `$BRANCH_NAME`, Shippable cannot detect if the underlying image has changed, and hence it is not deployed. To force deployments in this scenario, you need to set a flag in your deploy job that tells Shippable to deploy the image each time the job is triggered, regardless of whether anything has changed in the manifest.

You can set the `force` flag for a manifest in your deploy job as shown below:

```
jobs:
  - name: deploy-kubernetes-basic-deploy
    type: deploy
    steps:
      - IN: deploy-kubernetes-basic-manifest         #required
        force: true
      - IN: deploy-kubernetes-basic-cluster          #required
```

## Sample project

Here are some links to a working sample of this scenario. This is a simple Node.js application that runs some tests and then pushes
the image to Docker Hub. It also contains all of the pipelines configuration files for deploying to Kubernetes.

**Source code:**  [devops-recipes/deploy-kubernetes-basic](https://github.com/devops-recipes/deploy-kubernetes-basic).

**Build link:** [CI build on Shippable](https://app.shippable.com/github/devops-recipes/deploy-kubernetes-basic/runs/7/1/console)

**Build status badge:** [![Run Status](https://api.shippable.com/projects/58fcef822ddacd090044cf75/badge?branch=master
)](https://app.shippable.com/github/devops-recipes/deploy-kubernetes-basic)

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
