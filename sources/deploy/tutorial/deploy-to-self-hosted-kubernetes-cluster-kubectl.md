page_description: Continuous Deployment to a Kubernetes cluster using kubectl
main_section: Deploy
sub_section: Kubernetes

# Deploy to self-hosted Kubernetes cluster using kubectl
This tutorial explains how to continuously deploy a Docker container to a self-hosted Kubernetes Cluster using native `kubectl` commands. It assumes that you have working knowledge of Docker and Kubernetes and understand the following concepts:

* [kubeconfig files](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/)
* [Kubernetes Deployment Spec](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.10/#deployment-v1-apps)
* [Kubernetes Services Spec](https://kubernetes.io/docs/concepts/services-networking/service/)
* [kubectl command](https://kubernetes.io/docs/reference/kubectl/overview/)
* [kubectl with multiple clusters](https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/)

You can self-host Kubenetes on any cloud using KOPS. For this e.g. we use GKE on Google Cloud and even though it is a hosted service, we use raw kubeconfig files to authenticate to it. Tutorial on how to provision a Kubernetes cluster is for another day.

## Manual Steps to Deploy
First, we will walk through a step-by-step guide on how to manually deploy a Docker image to a Kubernetes cluster.

* First is to have a Kube cluster provisioned to which you have admin access
* You can use your personal `KubeConfig` file or 
* You can use your existing config file to authenticate to your Kubernetes cluster. If you want to create a custom one that uses a service account, step by step instructions are in this [tutorial](/deploy/tutorial/create-kubeconfig-for-self-hosted-kubernetes-cluster)
* Create Deployment Spec to deploy your app, which also references the secret. Your spec will look something like this,

**Kubernetes Deployment Spec**

```
apiVersion: apps/v1beta1
kind: Deployment
metadata:
  namespace: default
  name: ${APP_LABEL}
spec:
  replicas: 1
  strategy:
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 1
  minReadySeconds: 5
  template:
    metadata:
      labels:
        app: ${APP_LABEL}
    spec:
      containers:
        - name: ${APP_LABEL}
          image: ${APP_IMG}:${APP_TAG}
          ports:
          - containerPort: 80
          resources:
            requests:
              cpu: 250m
            limits:
              cpu: 500m
```

* If you don't have one you can use our sample [appDeploy.yml](https://github.com/devops-recipes/cd_k8s_kubectl/blob/master/specs/appDeploy.yml). Make sure you replace the wildcards `${APP_LABEL}`, `${APP_IMG}` and `${APP_TAG}` in the file with information that applies to your scenario.
* Create Kubernetes Service Spec to deploy your app. This is needed to expose your app to the internet. Your spec will look something like this,

**Kubernetes Service Spec**

```
apiVersion: v1
kind: Service
metadata:
  namespace: default
  name: ${APP_LABEL}
spec:
  type: LoadBalancer
  ports:
  - port: 80
  selector:
    app: ${APP_LABEL}

```

* If you don't have one you can use our sample [appDeploy.yml](https://github.com/devops-recipes/cd_k8s_kubectl). Make sure you replace the wildcards `${APP_LABEL}` in the file with information that applies to your scenario. Make sure that you use the same label as above, otherwise the service will not bind to your app as your can see from the `selector` setting. If you change it, make sure the right values are set
* Execute the following commands to delete the app and service if it already exists. You can skip deleting the service if you dont want your IPs to change

```
kubectl delete  -f ./appDeploy.yml
kubectl delete -f ./appSvc.yml
```

* Execute these commands to create the app and the service. Run the service creation only if its the first time you are creating or you deleted the service 

```
kubectl create -o json -f ./appDeploy.yml
kubectl create -o json -f ./appSvc.yml
```

* Run this command to get the IP address for your service

```
kubectl get svc ${APP_LABEL}
```


## Challenges with manual deployments
There are a few challenges with manual deployment

* Kube Spec files are templatized and you need some programmatic way to supply those values. Creating static files will reduce re-usability and even with Helm, the variables file needs to be created. Helm just moves the wildcards into a single file, doesn't really solve the problem of how to supply it.
* Automating the build, test and deploy into a streamlined workflow when multiple components need to be tested before deployment is going to be very challenging to achieve. Continuous Delivery is not just about deploying one repo to Kube, it is about deploying multiple components that make up an app together.
* RBAC is going to be a huge problem. The machine used to deploy is authenticated to a project (even in the case of service accounts). This means that the only way you can implement RBAC across multiple projects/teams is to use multiple accounts on the machine. This is messy and painful to maintain at scale.
* The machine has to be prepped with the right version of the CLI. If multiple teams are deploying and they have a need to use different versions of the CLI, you will need different deployment machines.

## Automating Kubernetes deployments

Next, we will demonstrate how you can easily automate your workflow using Shippable's Assembly Lines. The following Assembly Line features are particularly noteworthy for this scenario:

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

The following sections explain the process of automating a workflow to continuously deploy an image to Google Kubernetes Engine using `kubectl`. We will demonstrate this with our sample application.

**Source code is available at [devops-recipes/cd_k8s_kubectl](https://github.com/devops-recipes/cd_k8s_kubectl)**

**Complete YML is at [devops-recipes/cd_k8s_kubectl/shippable.yml](https://raw.githubusercontent.com/devops-recipes/cd_k8s_kubectl/master/shippable.yml)**

####1. Add necessary Account Integrations

Integrations are used to connect your Shippable workflow with external providers. More information about integrations is [here](/platform/tutorial/integration/howto-crud-integration/). We will use integrations for GCP, Docker registry, and Github for this sample.

#####2a. Add `Kubernetes` Integration

To be able to interact with GCP, we need to add the `drship_kube` integration.

Detailed steps on how to add a Kubernetes Integration are [here](/platform/integration/kubernetes/#creating-an-account-integration). Make sure you name the integration `drship_kube` since that is the name we're using in our sample automation scripts.

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step.

#####2b. Add `Github` Integration

In order to read your workflow configuration from Github, we need to add the `drship_github` integration. This points to the repository containing your Shippable workflow config file (`shippable.yml`) and Kubernetes config files.

In our case, we're using the repository [`devops-recipes/cd_k8s_kubectl`](https://github.com/devops-recipes/cd_k8s_kubectl).

Detailed steps on how to add a Github Integration are [here](/platform/integration/github/#creating-an-account-integration). Make sure you name the integration `drship_github` since that is the name we're using in our sample automation scripts.

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step.

####3. Author Assembly Line configuration

The platform is built with "Everything as Code" philosophy, so all configuration is in a YAML-based file called `shippable.yml`, which is parsed to create your Assembly Line workflow.

Detailed documentation on `shippable.yml` is [here](/deploy/configuration).

#####3a. Add empty shippable.yml to your repo

Add an empty config file to the the root of your repo.

#####3b. Add `resources` section of the config

`resources` section holds the information that is necessary to deploy to a Kubernetes cluster. In this case we have 4 resources defined of type `cliConfig` and `gitRepo`.

Add the following to your `shippable.yml`:

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

* Prep the template Kubernetes deployment and service specs (wildcards APP_LABEL, APP_IMG & APP_TAG) with actual values from input resources. For our sample, here are the specs:
    * [Deployment spec](https://github.com/devops-recipes/cd_k8s_kubectl/blob/master/specs/appDeploy.yml)
    * [Service spec](https://github.com/devops-recipes/cd_k8s_kubectl/blob/master/specs/appSvc.yml)
* Deploy to the cluster using `kubectl`

Add the following to your `shippable.yml`:

```
jobs:
  - name: deploy_app_kctl_kube
    type: runSh
    steps:
      - IN: node_app_img_dh # defined here https://github.com/devops-recipes/node_app/blob/master/shippable.yml
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
          script:
            - pushd $(shipctl get_resource_state "cd_k8s_repo")
            - cd specs
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
* [Sharing information between Jobs](/platform/tutorial/workflow/sharing-data-between-jobs/)