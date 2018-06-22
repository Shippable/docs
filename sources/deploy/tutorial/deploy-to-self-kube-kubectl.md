page_description: Continuous Deployment to a Kubernetes cluster using kubectl
main_section: CD
sub_section: Deploying containers using popular tools
sub_sub_section: Kubernetes

# Deploy to self-hosted Kubernetes cluster using kubectl

This tutorial explains how to continuously deploy a Docker container to a self-hosted Kubernetes Cluster using native `kubectl` commands. It assumes you're familiar with the following concepts:

* [Kubernetes Intro](https://kubernetes.io/docs/user-journeys/users/application-developer/foundational/)
* [Docker Getting Started](https://docs.docker.com/v17.09/get-started/part1/)
* [kubectl command](https://kubernetes.io/docs/reference/kubectl/overview/)
* [kubeconfig files](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/)

If you're unfamiliar with Docker or kubectl, you should start with learning how to deploy Docker containers manually. Refer to our blog for a step-by-step tutorial: [Deploy a Docker container to a self-hosted Kubernetes cluster using kubectl](http://docs.shippable.com/deploy/tutorial/deploy-to-self-hosted-kubernetes-cluster-kubectl/).

You can self-host Kubernetes on any cloud using KOPS. For our example, we'll use GKE on Google Cloud and even though it is a hosted service, we'll use raw kubeconfig files to authenticate to it. The steps outlined in this tutorial will work for any self-hosted Kubernetes cluster.

There are many challenges with manually doing Docker deployments. In short, you will struggle with making your Kubernetes specs reusable and injecting the right values for wildcards at runtime, and managing security and accounts on the machine used to run the deployments. Also, if you have dependent workflows, you will have to manually go trigger each one.

If you want to achieve frictionless Docker deployments with modular, reusable specs, you need to templatize your specs and automate the workflow used to execute them.

## Automating Kubernetes deployments

You can easily automate your workflow using Shippable's Assembly Lines. The following Assembly Line features are particularly noteworthy for this scenario:

* Creating an event-driven workflow that automates the entire software delivery lifecycle
* Securing workflow jobs with RBAC and contextually injecting credentials based on who/what is running the deployment job
* Dynamically injecting wildcard values in template spec files, depending on the state of the workflow
* Visualize your workflow and it's current status in a graphical view

To jump into this tutorial, you will need to familiarize yourself with a few platform concepts.

### Concepts

* [Workflow overview](/platform/workflow/overview/)
* [Integrations](/platform/integration/overview/)
  * [Kubernetes](/platform/integration/kubernetes)
  * [Docker Registry](/platform/integration/dockerRegistryLogin)
  * [Github](/platform/integration/github)
* [Resources](/platform/workflow/resource/overview/)
  * [image](/platform/workflow/resource/image)
  * [gitRepo](/platform/workflow/resource/gitrepo)
  * [cliConfig](/platform/workflow/resource/cliconfig)
* [Jobs](/platform/workflow/job/overview/)
  * [runSh](/platform/workflow/job/runsh)

This example extends the work done in our CI tutorial to [Build and Push a Docker Image to Docker Hub](/ci/tutorial/build-push-image-to-docker-hub) by adding an Assembly Line that deploys the application to GKE.

### Step by step instructions

The following steps explain the process of automating a workflow to continuously deploy an image to a self-hosted Kubernetes cluster using `kubectl`. We will demonstrate this with our sample application.

**Source code is available at [devops-recipes/cd_k8s_kubectl](https://github.com/devops-recipes/cd_k8s_kubectl)**

**Complete YML is at [devops-recipes/cd_k8s_kubectl/shippable.yml](https://raw.githubusercontent.com/devops-recipes/cd_k8s_kubectl/master/shippable.yml)**

Before you start with the steps below, please ensure you have a Kubernetes cluster to which you have admin access. If you're just trying out the steps, you can use your own **kubeconfig** file. If you want to use a **kubeconfig** file that uses a service account, follow the instructions in our tutorial showing [how to authenticate against a self-hosted Kubernetes cluster using a service account](https://blog.shippable.com/authenticating-against-a-self-hosted-kubernetes-cluster-with-a-service-account).

####1. Add necessary Account Integrations

Integrations are used to connect your Shippable workflow with external providers. More information about integrations is [here](/platform/tutorial/integration/howto-crud-integration/). We will use integrations for GCP, Docker registry, and Github for this sample.

#####2a. Add `Kubernetes` Integration

To be able to interact with your Kubernetes cluster, we need to add the `drship_kube` integration.

Detailed steps on how to add a Kubernetes Integration are [here](/platform/integration/kubernetes/#creating-an-account-integration). Make sure you name the integration `drship_kube` since that is the name we're using in our sample automation scripts.

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step.

#####2b. Add `Github` Integration

In order to read your workflow configuration from Github, we need to add the `drship_github` integration. This points to the repository containing your Shippable workflow config file (`shippable.yml`) and Kubernetes config files.

In our case, we're using the repository [`devops-recipes/cd_k8s_kubectl`](https://github.com/devops-recipes/cd_k8s_kubectl).

Detailed steps on how to add a Github Integration are [here](/platform/integration/github/#creating-an-account-integration). Make sure you name the integration `drship_github` since that is the name we're using in our sample automation scripts.

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step.

####3. Author Assembly Line configuration

The platform is built with "Everything as Code" philosophy, so all configuration is in a YAML-based file called **shippable.yml**, which is parsed to create your Assembly Line workflow.

Detailed documentation on **shippable.yml** is [here](/deploy/configuration).

#####3a. Add empty shippable.yml to your repo

Add an empty **shippable.yml** file to the the root of repository.

#####3b. Add `resources` section of the config

`resources` section holds the information that is necessary to deploy to a Kubernetes cluster. In this case we have 2 resources defined of type `cliConfig` and `gitRepo`.

Add the following to your **shippable.yml**:

```
resources:
# Kubernetes Config
  - name: cd_k8s_kube_config
    type: cliConfig
    integration: "drship_kube"           

# REPO of Scripts
  - name: cd_k8s_repo
    type: gitRepo
    integration: "drship_github"
    versionTemplate:
      sourceName: "devops-recipes/cd_k8s_kubectl"
      branch: master
```
######i. cliConfig resource named `cd_k8s_kube_config`

To be able to interact with your Kubernetes cluster, you need provide authentication info to kubectl. Shippable does this for you automatically with the `cliConfig` resource.

Detailed info about `cliConfig` resource is [here](/platform/workflow/resource/cliconfig).

######ii. `gitRepo` resource named `cd_k8s_kube_config`

This resource points to the repository that contains your Kubernetes spec files, so that they are accessible to your Assembly Line. For our example, these files are present in the repository `https://github.com/devops-recipes/cd_k8s_kubectl `, namely, [here](https://github.com/devops-recipes/cd_k8s_kubectl/tree/master/specs).

Detailed info about `gitRepo` resource is [here](/platform/workflow/resource/gitrepo).

#####3c. Add `jobs` section of the config

A job is an execution unit of the Assembly Line. Our job has to perform three tasks:

* Prep the template Kubernetes deployment and service specs (wildcards `APP_LABEL`, `APP_IMG` & `APP_TAG`) with actual values from input resources. For our sample, here are the specs:
    * [Deployment spec](https://github.com/devops-recipes/cd_k8s_kubectl/blob/master/specs/appDeploy.yml)
    * [Service spec](https://github.com/devops-recipes/cd_k8s_kubectl/blob/master/specs/appSvc.yml)
* Deploy to the cluster using `kubectl`

Add the following to your `shippable.yml`:

```
jobs:
  - name: deploy_app_kctl_kube
    type: runSh
    steps:
      # The node_app_img_dh image resource is defined in the CI tutorial which pushed this image to Docker Hub: http://docs.shippable.com/ci/tutorial/build-push-image-to-docker-hub
      # If you have not followed that tutorial, please delete this resource
      - IN: node_app_img_dh
      - IN: cd_k8s_kube_config
        switch: off
      - IN: cd_k8s_repo
        switch: off
      - TASK:
          name: deploy_app
          runtime:
            options:
              env:
                - APP_LABEL: "k8s-app"
                # Uncomment and replace values with hardcoded values if you deleted the node_app_img_dh resource  
                # - APP_IMG: "image name"
                # - APP_TAG: "image tag"    

          script:
            - pushd $(shipctl get_resource_state "cd_k8s_repo")
            - cd specs
            # Delete the 2 lines below if you deleted the node_app_img_dh resource
            - export APP_IMG=$(shipctl get_resource_version_key node_app_img_dh sourceName)
            - export APP_TAG=$(shipctl get_resource_version_key node_app_img_dh versionName)
            - shipctl replace appDeploy.yml appSvc.yml
            - kubectl delete  -f ./appDeploy.yml 2>/dev/null || echo ""
            - kubectl delete -f ./appSvc.yml  2>/dev/null || echo ""
            - kubectl create -o json -f ./appDeploy.yml
            - kubectl create -o json -f ./appSvc.yml
            - popd
```

* Adding the above config to the jobs section of shippable.yml will create a `runSh` job called `deploy_app_kctl_kube`.

* The first section of `steps` defines all the input `IN` resources that are required to execute this job.
  * Kubernetes spec files are version controlled in a repo represented by `cd_k8s_repo`.
  * Credentials to connect to Cluster are in `cd_k8s_kube_config`. This resource has `switch: off` flag which means any changes to it will not trigger this job automatically
  * `node_app_img_dh` is an **image** resource that comes from another tutorial [which explains how to build and push a Docker image](/ci/tutorial/build-push-image-to-docker-hub) and contains the image name and tag in `sourceName & versionName ` fields, which are required by this job. If you already have this and just want to use this tutorial to deploy, just delete this resource and hardcode the values APP_IMG and APP_TAG in the **TASK.runtime.options.env** section.
* The `TASK` section contains actual code that is executed when the job runs. We have just one task named `deploy_app` which does the following:
  * First, we define environment variables required by the scripts-
    * `APP_LABEL` which is the label we use to the tie the service and the app
  *  `script` section has a list of commands to execute sequentially.
    * First, we use the Shippable utility function `get_resource_state` to go to the folder where scripts are stored
    * Next, we extract the image info and set APP_IMG and APP_TAG from the `node_app_img_dh` resource, again using shipctl functions
    * Next, we replace all wildcards in appDeploy.yml appSvc.yml files
    * Last, we execute kubectl commands to create the app and the service

Detailed info about `runSh` job is [here](/platform/workflow/job/runsh).

Detailed info about Shippable Utility functions is [here](/platform/tutorial/workflow/using-shipctl).

#####3d. Push changes to shippable.yml

Commit and push all the above changes to `shippable.yml`.

####4. Add the Assembly Line to your Shippable organization

In Shippable's world, a Subscription maps to an Organization or a Team, depending on the source control provider. An Assembly Line workflow is defined at a Subscription level and all jobs are resources are global to your subscription.

To add your Assembly Line to Shippable, you need to add the repository containing the configuration as a "sync repository" by [following instructions here](/deploy/configuration/#adding-a-syncrepo). This automatically parses your `shippable.yml` config and adds your workflow to Shippable. Your workflow will always be kept in sync with the config in this repository, and be automatically updated every time you push a change to `shippable.yml`.

Your view will look something like this:

<img src="/images/tutorial/deploy-to-self-hosted-kubernetes-cluster-kubectl-fig1.png" alt="Assembly Line view">

> Note: This assembly line is incorporating [Build and Push a Docker Image to Docker Hub](/ci/tutorial/build-push-image-to-docker-hub) to dynamically build `app_be_img`, if you are using static image tag, then you will not see the CI section to the left of the image

####5. Run the deploy job `deploy_app_kctl_gke`

You can manually run the job by right clicking on the job or by triggering the CI process to generate a new image tag and deploy that new image to GKE. You should see your app & service deployed to the Kubernetes cluster you created on GCP.

<img src="/images/tutorial/deploy-to-self-hosted-kubernetes-cluster-kubectl-fig2.png" alt="Deploy console output">

## Further Reading
* [Build and Push a Docker Image to Docker Hub](/ci/tutorial/build-push-image-to-docker-hub)
* [Working with Integrations](/platform/tutorial/integration/howto-crud-integration/)
* [Defining Resources in shippable.yml](/platform/tutorial/workflow/shippable-yml/#resources-config)
* [Defining Jobs in shippable.yml](/platform/tutorial/workflow/shippable-yml/#jobs-config)
* [Sharing information between Jobs](/platform/tutorial/workflow/share-info-across-jobs/)
