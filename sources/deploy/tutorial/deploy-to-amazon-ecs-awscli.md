page_main_title: Automated deployments to Amazon ECS using AWS CLI
page_description: Automated deployments to Amazon ECS using AWS CLI
main_section: CD
sub_section: Custom deployments with CLIs/SDKs/tools
sub_sub_section: Amazon ECS

# Deploy to Amazon ECS using AWS CLI

This tutorial explains how to automate the deployment of a Docker container to Amazon ECS using native **AWS CLI** commands.

This document assumes you're familiar with the following concepts:

* [AWS CLI](https://aws.amazon.com/cli/)
* [AWS ECS Services](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html)
* [AWS ECS Service definition Parameters](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service_definition_parameters.html)
* [AWS ECS Task Definitions](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definitions.html)
* [AWS ECS Task Definition Parameters](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html)
* [Docker Getting Started](https://docs.docker.com/v17.09/get-started/part1/)

## Automating Amazon ECS deployments

You can easily automate your workflow using Shippable's Assembly Lines. The following Assembly Line features are particularly noteworthy for this scenario:

* Creating an event-driven workflow that automates the entire software delivery lifecycle
* Securing workflow jobs with RBAC and contextually injecting credentials based on who/what is running the deployment job
* Dynamically injecting wildcard values in template spec files, depending on the state of the workflow
* Visualize your workflow and it's current status in a graphical view

To jump into this tutorial, you will need to familiarize yourself with a few platform concepts.

### Concepts

* [Platform overview](/platform/overview/)
* [Integrations](/platform/integration/overview/)
    * [AWS](/platform/integration/aws-keys)
    * [Github](/platform/integration/github)
* [Resources](/platform/workflow/resource/overview/)
    * [gitRepo](/platform/workflow/resource/gitrepo)
    * [integration](/platform/workflow/resource/integration)
* [Jobs](/platform/workflow/job/overview/)
    * [runSh](/platform/workflow/job/runsh)

### Step by Step Instructions

The following sections explain the process of automating a workflow to continuously deploy a Docker container to Amazon ECS using native `AWS CLI` commands. We will demonstrate this with our sample application.

**Source code is available at [devops-recipes/cd_ecs_cli](https://github.com/devops-recipes/cd_ecs_cli/)**

**Complete YML is at [devops-recipes/cd_ecs_cli/blob/master/shippable.yml](https://github.com/devops-recipes/cd_ecs_cli/blob/master/shippable.yml)**

Your workflow will look like this, where the green box is the job that runs your deployment, while the grey boxes are input resources that are required for your playbook:

<img src="/images/tutorial/deploy-to-amazon-ecs-awscli-fig1.png" alt="Assembly Line view">

####1. Add necessary Account Integrations

Integrations are used to connect your Shippable workflow with external providers. More information about integrations is [here](/platform/tutorial/integration/howto-crud-integration/). We will use integrations for AWS Keys and Github for this sample.

#####1a. Add **AWS Keys** Integration

To be able to interact with AWS, we need to add the `dr_aws` integration.

Detailed steps on how to add an AWS Keys Integration are [here](/platform/integration/aws-keys/#creating-an-account-integration). Make sure you name the integration `dr_aws` since that is the name we're using in our sample automation scripts.

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step.

#####1b. Add `Github` Integration

In order to read your workflow configuration from Github, we need to add the `drship_github` integration. This points to the repository containing your Shippable workflow config file (**shippable.yml**) and Terraform script files.

In our case, we're using the repository [devops-recipes/cd_ecs_cli](https://github.com/devops-recipes/cd_ecs_cli).

Detailed steps on how to add a Github Integration are [here](/platform/integration/github/#creating-an-account-integration). Make sure you name the integration `drship_github` since that is the name we're using in our sample automation scripts.

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step.

####2. Author Assembly Line configuration

The platform is built with "Everything as Code" philosophy, so all configuration is in a YAML-based file called **shippable.yml**, which is parsed to create your Assembly Line workflow.

Detailed documentation on **shippable.yml** is [here](/platform/workflow/config/#assembly-lines-configuration).

If you're using our sample code, **shippable.yml** already exists and you can use it with a few modifications.

#####2a. Add empty shippable.yml to your repo

Add an empty **shippable.yml** file to the the root of repository.

#####2b. Add `resources` section of the config

`resources` section holds the config info that is necessary to deploy to a Kubernetes cluster. In this case we have two resources defined, one of type `integration`, and the other of type `gitRepo`.

```
resources:
# Automation scripts repo
  - name: cd_ecs_cli_repo
    type: gitRepo
    integration: "drship_github"
    versionTemplate:
      sourceName: "devops-recipes/cd_ecs_cli"
      branch: master

# AWS ECS Cluster Resource "aws_ecs_cluster" is aleardy defined in [Provision ECS with Terraform](/provision/tutorial/provision-aws-ecs-terraform), and we refer to it here. If this is static define it here with the same syntax from that tutorial

# Docker image Resource "node_app_img_dh" is aleardy defined in [Build and Push a Docker Image to Docker Hub](/ci/tutorial/build-push-image-to-docker-hub), and we refer to it here. If this is static define it here with the same syntax from that tutorial

```

######i. gitRepo resource named `cd_ecs_cli_repo`

This resource points to the repository that contains your specs for Service and Task definitions, so that they are accessible to your Assembly Line. For our example, these files are present in the repository [https://github.com/devops-recipes/cd_ecs_cli](https://github.com/devops-recipes/cd_ecs_cli), namely, [here](https://github.com/devops-recipes/cd_ecs_cli/tree/master/temmplates).

Detailed info about `gitRepo` resource is [here](/platform/workflow/resource/gitrepo).

#####2c. Add `jobs` section of the config

A job is an execution unit of the Assembly Line. Our job has to perform six tasks:

* Export `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `ECS_CLUSTER_REGION` & `ECS_CLUSTER` as environment variables
* Export env vars needed to setup the template service and task definition
* Configure aws cli
* Replace the templates with values from the current execution environment
* Create a new revision of the ECS task definiton
* Either update or create the service with the current revision of task definition

Add the following to your **shippable.yml**:

```
jobs:
  - name: deploy_ecs_cli
    type: runSh
    steps:
      - IN: cd_ecs_cli_repo
      - IN: node_app_img_dh # defined here https://github.com/devops-recipes/node_app/blob/master/shippable.yml
      - IN: aws_ecs_cluster # defined here https://github.com/devops-recipes/prov_aws_ecs_terraform/blob/master/shippable.yml
        switch: off
      - TASK:
          name: deploy_app
          runtime:
            options:
              env:
                - APP_NAME: "app_cli"
                - REPLICAS: 1
                - ENVIRONMENT: "test"
                - FAMILY: "app_cli"
          script:
            - |
                AWS_ACCESS_KEY_ID=$(shipctl get_integration_resource_field aws_ecs_cluster "accessKey")
                AWS_SECRET_ACCESS_KEY=$(shipctl get_integration_resource_field aws_ecs_cluster "secretKey")
                ECS_CLUSTER_REGION=$(shipctl get_resource_version_key "aws_ecs_cluster" "region")
                ECS_CLUSTER=$(shipctl get_resource_version_key "aws_ecs_cluster" "sourceName")
            - |
                SVCS_NAME=$APP_NAME"_svcs"
                export APP_IMG=$(shipctl get_resource_version_key "node_app_img_dh" sourceName)
                export APP_IMG_TAG=$(shipctl get_resource_version_key "node_app_img_dh" "versionName")
            - |
                aws configure set aws_access_key_id "$AWS_ACCESS_KEY_ID"
                aws configure set aws_secret_access_key "$AWS_SECRET_ACCESS_KEY"
                aws configure set region "$ECS_CLUSTER_REGION"
            - aws ecs list-clusters
            - |
                REPO_PATH=$(shipctl get_resource_state "cd_ecs_cli_repo")
                pushd $REPO_PATH
            - |
                shipctl replace templates/service.json templates/task.json
                REVISION=$(aws ecs register-task-definition --cli-input-json file://$REPO_PATH/templates/task.json --output json --query taskDefinition.revision)
                echo "revision is $REVISION"
            - |
                EXISTS=$(aws ecs describe-services --cluster $ECS_CLUSTER --services $SVCS_NAME --output json --query failures[0].reason)
                if [ $EXISTS == "\"MISSING\"" ]
                then
                  aws ecs create-service --service-name $SVCS_NAME --cluster $ECS_CLUSTER --task-definition $FAMILY:$REVISION --desired-count $REPLICAS;
                else
                  aws ecs update-service --service $SVCS_NAME --cluster $ECS_CLUSTER --task-definition $FAMILY:$REVISION;
                fi
```

* Adding the above config to the jobs section of shippable.yml will create a `runSh` job called `deploy_ecs_cli`.

* The first section of `steps` defines all the input `IN` resources that are required to execute this job.
  * Service and task definition spec files are version controlled in a repo represented by `cd_ecs_cli_repo`.
  * `node_app_img_dh` is an **image** resource that comes from another tutorial [which explains how to build and push a Docker image](/ci/tutorial/build-push-image-to-docker-hub) and contains the image name and tag in `sourceName & versionName ` fields, which are required by this job. If you already have this and just want to use this tutorial to deploy, just delete this resource and hardcode the values `APP_IMG` and `APP_IMG_TAG` in the **taskdefinition.json** file [here](https://github.com/devops-recipes/cd_ecs_cli/blob/master/templates/taskdefinition.json).
  * AWS Credentials and cluster information is in `aws_ecs_cluster`. This resource has `switch: off` flag which means any changes to it will not trigger this job automatically.
* The `TASK` section contains actual code that is executed when the job runs.
We have just one task named `deploy_app` which does the following:
  * First, we define environment variables required by the scripts-
    * `APP_NAME` is the name of the app
    * `REPLICAS` has the number of copies of the app to be deployed
    * `ENVIRONMENT` is the name of the environment of the app
    * `FAMILY` is the name of the task definition group
  * `script` section has a list of commands to execute sequentially
    * First, we get AWS login and cluster information from the cluster resource using Shippable utility functions `get_integration_resource_field` and `get_resource_version_key`
    * Next, we extract the image info and set APP_IMG and APP_IMG_TAG from the `node_app_img_dh` resource, again using shipctl function `get_resource_version_key`
    * Then, we configure the awscli utility and test to see if the configuration succeed by listing the clusters available
    * Next, we use the Shippable utility function `get_resource_state` switch to the folder where scripts are stored and replace the templates with the current environment context using shipctl `replace` function
    * We then execute AWS CLI commands to create the task definition and extract the revision number
    * lastly, check whether the service if already present, if so we update the service else create it

Supported task CPU and memory values for Fargate tasks can be found [here](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-cpu-memory-error.html).

Detailed info about `runSh` job is [here](/platform/workflow/job/runsh).

Detailed info about Shippable Utility functions are [here](/platform/tutorial/workflow/using-shipctl).

#####2d. Push changes to shippable.yml

Commit and push all the above changes to **shippable.yml**.

####3. Add the Assembly Line to your Shippable organization

In Shippable's world, a Subscription maps to an Organization or a Team, depending on the source control provider. An Assembly Line workflow is defined at a Subscription level and all jobs are resources are global to your subscription.

To add your Assembly Line to Shippable, you need to add the repository containing the configuration as a "sync repository" by [following instructions here](/platform/tutorial/workflow/add-assembly-line). This automatically parses your **shippable.yml** config and adds your workflow to Shippable. Your workflow will always be kept in sync with the config in this repository, and be automatically updated every time you push a change to **shippable.yml**.

Your view will look something like this:

<img src="/images/tutorial/deploy-to-amazon-ecs-awscli-fig1.png" alt="Assembly Line view">

####4. Run the deploy job `deploy_ecs_cli`

You can manually run the job by right clicking on the job or by triggering the CI process to generate a new image tag and deploy that new image to your Fargate cluster. You should see your service in the AWS ECS cluster console.

<img src="/images/tutorial/deploy-to-amazon-ecs-awscli-fig2.png" alt="AWS ECS Deploy console output">

## Further Reading
* [Provisioning an AWS VPC using Ansible](/provision/tutorial/provision-aws-vpc-ansible).
* [Working with Integrations](/platform/tutorial/integration/howto-crud-integration/)
* [Defining Resources in shippable.yml](/platform/workflow/config/#resources)
* [Defining Jobs in shippable.yml](/platform/workflow/config/#jobs)
* [Sharing information between Jobs](/platform/tutorial/workflow/share-info-across-jobs/)
