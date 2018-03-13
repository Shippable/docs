page_main_title: Multi-stage deployments to Test and Prod Environments
main_section: Deploy
sub_section: Tutorials
sub_sub_section: Kubernetes
page_title: Multi-stage deployments to Kubernetes clusters through Test and Prod Environments
page_description: How to do Multi-stage deployments to Kubernetes clusters through Test and Prod Environments in Shippable

# Multi-stage deployments to Kubernetes clusters through Test and Prod Environments

Most of the time, you will want to set up an Assembly Line which deploys your app to multiple Kubernetes environments such as Dev/Test/Staging/Prod, progressing sequentially in stages from one environment to another. Some of these environments might share clusters while others might have dedicated isolated clusters.

For example, you could have automated deployments to a Dev environment after running unit tests and pushing the application artifacts to some registry in CI, followed by deployment to a Test environment where integration tests are run, followed by a manual deployment to Production. You can easily achieve such a workflow using Shippable by following the steps below as guidelines.

Here we demonstrate a Multi-stage deployment workflow through Test/Prod environments that look like this:

```
Push app image to a Docker Registry in CI -> Define deployment artifacts -> Provision Test kubernetes cluster -> CD to Test kubernetes cluster -> De-provision Test cluster -> Creating a release version -> Manual deployment of a specific release version to Prod cluster.
```

The main idea here is that we define the configuration and the deployment artifacts of the application just once. The configuration is then overridden whenever the environment configuration differs from the default configuration. Our default configuration is the prod config.

## Assumptions

We assume that the application is already packaged as a Docker image. We have chosen Google Cloud as our Docker registry, but you can use any Docker registry that [Shippable supports](/platform/integration/overview/#supported-docker-registry-integrations). If you want to know how to build, test and push a Docker image through CI to a Docker registry, these links will help:

* [Getting started with CI](/ci/why-continuous-integration/)
* [CI configuration](/ci/yml-structure/)
* [Pushing artifacts after CI](/ci/push-artifacts/)
* [Sample application](/getting-started/ci-sample/)

If you're not familiar with Shippable, it is also recommended that you read the [Platform overview doc](/platform/overview/) to understand the overall structure of Shippable's DevOps Assembly Lines platform.

## Topics Covered

You can configure your deployment with Shippable's configuration files in a powerful, flexible YAML based language. The specific `YAML` blocks that need to be authored for each of the topics below are covered in the document. These topics will give you a high level picture of the steps that you will complete to get CD of your application up and running in Shippable.

* Creating a pointer to the Docker image of your application
* Specifying application options for the container
* Specifying the environment configuration for Test and Prod environments
* Creating a Service definition
* Provisioning and deprovisioning the test Kubernetes cluster
* Creating a semantic release version of the application for prod environment
* Specifying the Test and prod clusters as your deployment target
* Deploying your application to the Test and Prod clusters

## Multi-stage deployment workflow

This is a pictorial representation of a multi-stage deployment workflow. The green boxes are jobs and the grey boxes are the input resources for the jobs. Both jobs and inputs are specified in Shippable configuration files.

<img src="/images/deploy/usecases/dmsk-workflow.png"/>

These are the key components of the assembly line diagram. All jobs and resources in our example have been prefixed with `dmsk` which is an acronym for `deploy multi stage kubernetes` application.

**Resources (grey boxes)**

* `dmsk_image` is a **required** [image](/platform/workflow/resource/image/) resource that represents the docker image of the application.
* `dmsk_test_opts` is an **optional** [dockerOptions](/platform/workflow/resource/dockeroptions/#dockeroptions) resource
that represents the options of the application container.
* `dmsk_prod_opts` is an **optional** [dockerOptions](/platform/workflow/resource/dockeroptions/#dockeroptions) resource
that represents the options of the application container.
environment variables for consumption by the application in the dev environment.
* `dmsk_test_env` is an **optional** [params](/platform/workflow/resource/params) resource that stores key-value pairs that are set as environment variables for consumption by the application in the dev environment.
* `dmsk_prod_env` is an **optional** [params](/platform/workflow/resource/params) resource that stores key-value pairs that are set as environment variables for consumption by the application in the dev environment.
* `dmsk_gitRepo` is a **required** [cliConfig](/platform/workflow/resource/cliconfig/) resource which is a pointer to the private key of your service account needed to initialize the gcloud CLI.
* `dmsk_test_replicas` is an **optional** [replicas](/platform/workflow/resource/replicas) resource that specifies the number of pods that should run concurrently on the test cluster.
* `dmsk_prod_replicas` is an **optional** [replicas](/platform/workflow/resource/replicas) resource that specifies the number of pods should that should run concurrently on the prod cluster.
* `dmsk_prod_release_version` is a **required** [version](/platform/workflow/resource/version) resource the specifies the semantic release version of the application.
* `dmsk_test_cluster` is a **required** [cluster](/platform/workflow/resource/cluster/) resource that represents the test Kubernetes cluster where the application is deployed to.
* `dmsk_prod_cluster` is a **required** [cluster](/platform/workflow/resource/cluster/) resource that represents the prod Kubernetes cluster where the application is deployed to.

**Jobs (green boxes)**

* `dmsk_service_def` is a [manifest](/platform/workflow/job/manifest) job used to define the deployable artifacts of your application encompassing the docker image, configuration and environment variables that are versioned and immutable.
* `dmskTestDeploy` is a [deploy](/platform/workflow/job/deploy) job which deploys `dmsk_service_def` to the test cluster.
* `dmskProdDeploy` is a [deploy](/platform/workflow/job/deploy) job which deploys `dmsk_service_def` to the prod cluster.
* `dmsk_provision_test_cluster_job` is a [runSh](/platform/workflow/job/runsh/) job that provisions the test Kubernetes cluster.
* `dmsk_deprovision_test_cluster_job` is a [runSh](/platform/workflow/job/runsh/) job that deprovisions the test Kubernetes cluster.
* `dmsk_release` is a [release](/platform/workflow/job/release/) job that is used to create a semantically versioned object for the applications service definition.

# Configuration

The configuration for this Assembly Line is in the [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file at the root of the repository -

* [Resources](/platform/workflow/resource/overview/) (grey boxes) are defined in the `resources` section of the`shippable.yml` file.

* [Jobs](/platform/workflow/job/overview/) (green boxes) are defined in the `jobs` section of the`shippable.yml` file.

This file should be committed to your source control. Step 11 of the workflow below will describe how to add the config to Shippable.

## Instructions

###1. Define `dmsk_image`.

* **Description:** `dmsk_image` is an [image resource](/platform/workflow/resource/image/) that represents your Docker image in your pipeline. In our example, we're using an image hosted on GCR.
* **Required:** Yes.
* **Integrations needed:** [Google cloud Integration](/platform/integration/gcloudKey/), or any [supported Docker registry](/platform/integration/overview/#supported-docker-registry-integrations).

**Steps**  

1. Create an account integration using your Shippable account for your docker registry.
Instructions to create an integration can be found [here](http://docs.shippable.com/platform/tutorial/integration/howto-crud-integration/).

2. Set the friendly name of the integration as `drship_gcr`. If you change the name,
please change it also in the yml below.

3. Add the following yml block to your [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file.

```
resources:

  - name: dmsk_img
    type: image
    integration: drship_gcr
    pointer:
      sourceName: "gcr.io/fair-future-183201/node_app"
    seed:
      versionName: "master.1"
```

###2. Define `dmsk_test_opts` and `dmsk_prod_opts`.

* **Description:** `dmsk_test_opts` and `dmsk_prod_opts` are [image](/platform/workflow/resource/image/) resources that represent the options of the application container in their respective environments. Here we demonstrate setting container options such as memory and the exposed container port. Shippable platform supports a vast repertoire of container and orchestration platform options and the complete list can be found [here](/platform/workflow/resource/dockeroptions/#dockeroptions).
* **Required:** No.
* **Defaults:**
If no options are specified, the platform sets the following default options -
    - memory : 400mb
    - desiredCount : 1
    - cpuShares : 0
    - All available CPU.
    - no ENVs are added to the container.

**Steps**  

Add the following yml block to the existing `resources` section of your [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file.

```
resources:

  - name: dmsk_test_opts
    type: dockerOptions
    version:
      memory: 1024
      portMappings:
        - 80:80

  - name: dmsk_prod_opts
    type: dockerOptions
    version:
      memory: 2048
      portMappings:
        - 80:80
```

###3. Define `dmsk_test_env` and `dmsk_prod_env`.

* **Description:** `dmsk_test_env` and `dmsk_prod_env` are [params](/platform/workflow/resource/params) resources used to specify key-value pairs that are set as environment variables for consumption by the application in the specific environment. Here we demonstrate setting an environment variable called `ENVIRONMENT` that is available in the running container and that is environment specific.
* **Required:** No.

**Steps**  

Add the following yml block to the `resources` section of your [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file.

```
resources:

  - name: dmsk_test_env
    type: params
    version:
      params:
        ENVIRONMENT: "test"

  - name: dmsk_prod_env
    type: params
    version:
      params:
        ENVIRONMENT: "prod"         
```

###4. Define `dmsk_service_def`

* **Description:** `dmsk_service_def` is [manifest](/platform/workflow/job/manifest) jobs used to create the definition of the deployable unit of your application. This definition consists of the image, options and environment and is environment specific. The definition is also versioned (any change to the inputs of the manifest creates a new semantic version of the manifest) and is immutable. We create this service definition once and push it through all our environments.
* **Required:** Yes.

**Steps**  

Add the following yml block to your [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file.

```
jobs:

  - name: dmsk_service_def
    type: manifest
    steps:
     - IN: dmsk_img
     - IN: dmsk_prod_opts
     - IN: dmsk_prod_env

```

###5. Define `dmsk_gitRepo`.

* **Description:** `dmsk_gitRepo` is a [gitRepo](/platform/workflow/resource/gitrepo/) resource which is a pointer to the git repository that contains your cli scripts.
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

2. Add the following yml block to the `resources` section of your [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file.

```
resources:

  - name: dmsk_gitRepo
    type: gitRepo
    integration: dr_github # replace with your GitHub integration name
    pointer:
      # replace with source code location (e.g. GitHub) where you cloned this
      # sample project.
      sourceName: devops-recipes/deploy-multi-stage-kubernetes-app
      branch: master
```

###6. Define `dmsk_cliConfig`.

* **Description:** `dmsk_cliConfig` is a [cliConfig](/platform/workflow/resource/cliconfig/) resource which is a pointer to the private key of your service account needed to initialize the gcloud CLI.
* **Required:** Yes.
* **Integrations needed:** [Google Cloud Integration](/platform/integration/gcloudKey/)

**Steps**

1. Create an account integration using your Shippable account for Google Cloud. Instructions to create an integration can be found [here](http://docs.shippable.com/platform/tutorial/integration/howto-crud-integration/). Set the friendly name of the integration as `drship_gke`. If you change the name, please change it also in the yml below .

2. Add the following yml block to the `resources` section of your [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file.

```
resources:

  - name: dmsk_cliConfig
    type: cliConfig
    integration: drship_gke
    pointer:
      region: us-central1-b
```

###7. Define `dmsk_provision_test_cluster_job`.

* **Description:** `dmsk_provision_test_cluster_job` is a [runSh](/platform/workflow/job/runsh/) job that provisions your test Kubernetes cluster. `runSh` is one of the most versatile jobs in the arsenal and can be used to pretty much execute any DevOps activity that can be scripted.

Note that this job takes the `dmsk_cliConfig` resource as an INPUT. This initializes both jobs with the `gcloud` CLI authenticated as the service account. We also specify the `dmsk_test_cluster` as an INPUT since it injects environment variables for the cluster name and availability zone that are passed to our provisioning script.

`dmsk_app_gitRepo` is specified as an INPUT as a convenience so that any changes to the deployment scripts that are committed are tested immediately as they would trigger this job.

* **Required:** Yes.

**Steps**

Add the following yml block to your the existing `jobs` section of your [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file.

```
jobs:
# jobs for the provision-gke-kubernetes-cluster app

  # Job that provisions the GKE test cluster
  - name: dmsk_provision_test_cluster_job
    type: runSh
    steps:
      - IN: dmsk_service_def
      - IN: dmsk_gitRepo
      - IN: dmsk_cliConfig
      - IN: dmsk_test_cluster
      - TASK:
        # invoke a script that provisions the test Kubernetes Cluster
        - script: . $DMSK_APP_GITREPO_PATH/gitRepo/provision_gke_cluster.sh $DMSK_TEST_CLUSTER_POINTER_SOURCENAME $DMSK_TEST_CLUSTER_POINTER_REGION
```

###8. Define `dmsk_test_replicas` and `dmsk_prod_replicas`.

* **Description:** `dmsk_test_replicas` and `dmsk_prod_replicas` are [replicas](/platform/workflow/resource/replicas) resources that specifies the number of instances of the container you want to deploy to their respective environments. Here we show different number of replicas being set for Test/Prod environments.
* **Required:** No.
* Default: 1 (one instance of the container is deployed)

**Steps**  

Add the following yml block to the `resources` section of your [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file.

```
resources:

  - name: dmsk_test_replicas
    type: replicas
    version:
      count: 1

  - name: dmsk_prod_replicas
    type: replicas
    version:
      count: 2
```

###9. Define `dmsk_test_cluster` and `dmsk_prod_cluster`.

* **Description:** `dmsk_test_cluster` and `dmsk_prod_cluster` are [cluster](/platform/workflow/resource/cluster/) resources that represents the Test/Prod Kubernetes clusters where your application is deployed to.
* **Required:** Yes.
* Integrations needed: [Google Cloud](/platform/integration/gcloudKey/)

3. Add the following yml block to the `resources` section of your [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file.

```
resources:

  - name: dmsk_test_cluster
    type: cluster
    integration: drship_gke    #replace with your Google Cloud integration name
    pointer:
      sourceName: "dmsk-test-cluster"
      region: us-central1-b
      namespace: "dmsk-test-environment"

  - name: dmsk_prod_cluster
    type: cluster
    integration: drship_gke    #replace with your Google Cloud integration name
    pointer:
      sourceName: "dmsk-prod-cluster"
      region: us-central1-a
      namespace: "dmsk-prod-environment"
```


###10. Define `dmskTestDeploy`.

* **Description:** `dmskTestDeploy` is a [deploy](/platform/workflow/job/manifest) jobs that actually deploy the application manifest to the test kubernetes cluster, create the replication controller and starts the pods. The number of pods depends on the `replicas` resource defined earlier.

**Required:** Yes.

**Steps**  

Add the following yml block to the `jobs` section of your [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file.

```
jobs:

  - name: dmskTestDeploy
    method: replace
    type: deploy
    steps:
      - IN: dmsk_provision_test_cluster_job
      - IN: dmsk_test_replicas
      - IN: dmsk_test_opts
      - IN: dmsk_test_env
      - IN: dmsk_test_cluster
      - IN: dmsk_service_def
```

###11. Define `dmsk_deprovision_test_cluster_job`.

* **Description:** `dmsk_deprovision_test_cluster_job` is a [runSh](/platform/workflow/job/runsh/) job that deprovisions your test Kubernetes cluster. `runSh` is one of the most versatile jobs in the arsenal and can be used to pretty much execute any DevOps activity that can be scripted.

Note that this job takes the `dmsk_cliConfig` resource as an INPUT. This initializes both jobs with the `gcloud` CLI authenticated as the service account. We also specify the `dmsk_test_cluster` as an INPUT since it injects environment variables for the cluster name and availability zone that are passed to our deprovisioning script.

* **Required:** Yes.

**Steps**

Add the following yml block to the `jobs` section of your [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file.

```
jobs:

  - name: dmsk_deprovision_test_cluster_job
    type: runSh
    steps:
      - IN: dmsk_gitRepo
        switch: off
      - IN: dmsk_cliConfig
      - IN: dmskTestDeploy
      - IN: dmsk_test_cluster
      - TASK:
        # invoke a script that deprovisions the GKE cluster named test-cluster
        # $GKE_CLICONFIG_POINTER_REGION is an environment variable that is automatically created and injected
        # by the gke_cliConfig resource and points to the availability zone.
        - script: . $DMSK_APP_GITREPO_PATH/gitRepo/deprovision_gke_cluster.sh $DMSK_TEST_CLUSTER_POINTER_SOURCENAME $DMSK_TEST_CLUSTER_POINTER_REGION $DMSK_TEST_CLUSTER_POINTER_NAMESPACE

```

###12. Define `dmsk_release`.

* **Description:** `dmsk_release` is a [release](/platform/workflow/job/release/) job that is used to create a semantically versioned object for the applications service definition.

The `bump` tag specifies how the release version will be incremented each time the release job runs. The seed version is specified in the `dmsk_prod_release_version` resource. Since we are deploying to production, we are bumping the minor version of the application. You can also bump either the major or patch version. More on incrementing versions is described in our tutorial for [bumping release versions](increment-version-number/).


`dmsk_service_def` is specified as an INPUT since we are versioning the manifest which is immutable.

**Required:** Yes.

**Steps**  

Add the following yml block to the `jobs` section of your [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file.

```
jobs:

  - name: dmsk_release
    type: release
    bump: minor
    steps:
      - IN: dmsk_prod_release_version
      - IN: dmsk_service_def
      - IN: dmsk_deprovision_test_cluster_job
```

###13. Define `dmskProdDeploy`.

* **Description:** `dmskProdDeploy` is a [deploy](/platform/workflow/job/manifest) jobs that actually deploy the application manifest to the prod kubernetes cluster, create the replication controller and starts the pods. The number of pods depends on the `replicas` resource defined earlier.

**Required:** Yes.

**Steps**  

Add the following yml block to the `jobs` section of your [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file.

```
jobs:

  - name: dmskProdDeploy
    method: replace
    type: deploy
    steps:
      - IN: dmsk_release
      - IN: dmsk_prod_cluster
      - IN: dmsk_prod_replicas
```

###14. Import the configuration into your Shippable account to create the assembly line for the application.

Once you have the `shippable.yml` file as described above, commit it to your repository. You can then follow instructions to [add your assembly line to Shippable](/platform/tutorial/workflow/crud-syncrepo/).

###15. Trigger your pipeline

When you're ready for deployment, right-click on the manifest job in the [SPOG View](/platform/visibility/single-pane-of-glass-spog/), and select **Run Job**. Your Assembly Line will also trigger every time the `dmsk_image` changes, i.e. each time you have a new application Docker image.

## Sample project

Here are some links to a working sample of this scenario.

**Source code:**  [devops-recipes/deploy-multi-stage-kubernetes-app](https://github.com/devops-recipes/deploy-multi-stage-kubernetes-app)

## Improve this page

We really appreciate your help in improving our documentation. If you find any problems with this page, please do not hesitate to reach out at [support@shippable.com](mailto:support@shippable.com) or [open a support issue](https://www.github.com/Shippable/support/issues). You can also send us a pull request to the [docs repository](https://www.github.com/Shippable/docs).
