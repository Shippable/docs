page_main_title: Deploy to Amazon Fargate using AWS CLI
main_section: Tutorial
sub_section: Fargate
sub_sub_section: AWS CLI
page_title: Continuous Deployment to Amazon Fargate using AWS CLI
page_description: Automated deployments to Amazon Fargate using AWS CLI
page_keywords: Deploy docker containers, Fargate, Continuous Integration, Continuous Deployment, CI/CD, testing, automation, pipelines, AWS CLI

# Continuous Replace deployments to Amazon Fargate using AWS CLI

This tutorial explains how to continuously deploy a Docker container to AWS Fargate using native `AWS CLI` commands. We will use the `Replace` deployment strategy where your existing running services are stopped and removed before updating your service.  This results in downtime for your deployed service, but allows your cluster to use the bare minimum resources to run your deployments. This strategy is thus useful in scenarios where infrastructure cost savings are more important than service uptime.

This document assumes you're familiar with the following concepts:

* [AWS CLI](https://aws.amazon.com/cli/)
* [AWS Fargate](https://aws.amazon.com/fargate/)
* [AWS ECS Services](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html)
* [AWS ECS Service definition Parameters](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service_definition_parameters.html)
* [AWS ECS Task Definitions](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definitions.html)
* [AWS ECS Task Definition Parameters](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html)
* [Docker Getting Started](https://docs.docker.com/v17.09/get-started/part1/)

If you're unfamiliar with Docker or AWS CLI, you should start with learning how to deploy Docker containers manually.

There are many challenges with manually doing Docker deployments. In short, you will struggle with making your Fargate Service and Task definition specs reusable and injecting the right values for wildcards at runtime, and managing security and accounts on the machine used to run the deployments. Also, if you have dependent workflows, you will have to manually go trigger each one.

If you want to achieve frictionless Docker deployments with modular, reusable specs, you need to templatize your specs and automate the workflow used to execute them.

## Automating Fargate deployments

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

The following sections explain the process of automating a workflow to continuously deploy a Docker container to AWS Fargate using native `AWS CLI` commands. We will demonstrate this with our sample application.

**Source code is available at [devops-recipes/cd_replace_ecs_fargate_awscli](https://github.com/devops-recipes/cd_replace_ecs_fargate_awscli/)**

**Complete YML is at [devops-recipes/cd_replace_ecs_fargate_awscli/blob/master/shippable.yml](https://github.com/devops-recipes/cd_replace_ecs_fargate_awscli/blob/master/shippable.yml)**

Your workflow will look like this, where the green box is the job that runs your deployment, while the grey boxes are input resources that are required for your playbook:

<img src="/images/tutorial/deploy-replace-aws-fargate-awscli-fig1.png" alt="Assembly Line view">

####1. Add Integrations

Integrations are used to connect your Shippable workflow with external providers. More information about integrations is [here](/platform/integration/overview/). We will use integrations for AWS Keys and Github for this sample.

#####1a. Add **AWS Keys** Integration

To be able to interact with AWS, we need to add the `dr_aws` integration.

Detailed steps on how to add an AWS Keys Integration are [here](/platform/integration/aws-keys/). Make sure you name the integration `dr_aws` since that is the name we're using in our sample automation scripts.

> Note: You might already have this if you have done any of our other tutorials. If so, skip this step.

#####1b. Add `Github` Integration

In order to read your workflow configuration from Github, we need to add the `drship_github` integration. This points to the repository containing your Shippable workflow config file (**shippable.yml**) and Terraform script files.

In our case, we're using the repository [devops-recipes/cd_replace_ecs_fargate_awscli](https://github.com/devops-recipes/cd_replace_ecs_fargate_awscli).

Detailed steps on how to add a Github Integration are [here](/platform/integration/github/). Make sure you name the integration `drship_github` since that is the name we're using in our sample automation scripts.

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
  - name: cd_replace_ecs_fargate_repo
    type: gitRepo
    integration: "drship_github"
    versionTemplate:
      sourceName: "ambarish2012/cd_replace_ecs_fargate_awscli"
      branch: master

# AWS Integration config
  - name: cd_replace_ecs_fargate_creds
    type: integration
    integration: "dr_aws"
```

######i. gitRepo resource named `cd_replace_ecs_fargate_repo `

This resource points to the repository that contains your specs for Service and Task definitions, so that they are accessible to your Assembly Line. For our example, these files are present in the repository [https://github.com/devops-recipes/cd_replace_ecs_fargate_awscli](https://github.com/devops-recipes/cd_replace_ecs_fargate_awscli), namely, [here](https://github.com/devops-recipes/cd_replace_ecs_fargate_awscli/tree/master/specs).

Detailed info about `gitRepo` resource is [here](/platform/workflow/resource/gitrepo).

######ii. integration resource named `cd_replace_ecs_fargate_creds`

Your AWS credentials are securely stored in this integration.

To authenticate the AWS CLI, we will use the credentials stored in this resource.

Detailed info about `integration` resource is [here](/platform/workflow/resource/integration).

#####2c. Add `jobs` section of the config

A job is an execution unit of the Assembly Line. Our job has to perform four tasks:

* Authenticate the AWS CLI. We use AWS CLI commands to set values for `aws_access_key_id`, `aws_secret_access_key` and `default.region` that get writen to the shared credentials file (~/.aws/credentials).
* Prep the template service and task definition specs (wildcards such as CLUSTER, FAMILY, APP_IMG, APP_TAG etc.) with actual values from input resources. For our sample, here are the specs:
    * [Service definition spec](https://github.com/devops-recipes/cd_replace_ecs_fargate_awscli/blob/master/specs/servicedefinition.json)
    * [Task definition spec](https://github.com/devops-recipes/cd_replace_ecs_fargate_awscli/blob/master/specs/taskdefinition.json)
* Register the Task definition using AWS CLI.     
* Create an ECS Fargate cluster using AWS CLI.
* Use Shippable utilities that will create the Service using the replace deployment strategy.
* Use Shippable utilities to monitor the deployment until the Cluster reaches steady state.
* If the deployment is successful, use Shippable utilities to extract the Public IP of the deployed Service and run `curl` on it as a deployment validation activity.

Add the following to your **shippable.yml**:

```
jobs:
  - name: deploy_app_ecs_fargate_deployment_strategy_replace
    type: runSh
    steps:
      - IN: node_app_img_dh # defined here https://github.com/devops-recipes/node_app/blob/master/shippable.yml
      - IN: cd_replace_ecs_fargate_repo
        switch: off
      - IN: cd_replace_ecs_fargate_creds
        switch: off
      - TASK:
          name: deployment_strategy_replace
          runtime:
            options:
              env:
                - CLUSTER_NAME: "deploy-ecs-fargate"
                - SERVICE_NAME: "node_app_service"
                - FAMILY: "ecs_fargate_task"
                - DESIRED_TASK_COUNT: 1
                - CPU: 1024
                - MEMORY: 2048
                - SUBNET_ID: "subnet-34378e50"
                - SECURITY_GROUP_ID: "sg-a23ee1d0"
                - AWS_REGION: "us-east-1"
          script:
            - aws configure set aws_access_key_id $(shipctl get_integration_resource_field cd_replace_ecs_fargate_creds "accessKey")
            - aws configure set aws_secret_access_key $(shipctl get_integration_resource_field cd_replace_ecs_fargate_creds "secretKey")
            - aws configure set default.region ${AWS_REGION}
            - REPO_DIR=$(shipctl get_resource_state "cd_replace_ecs_fargate_repo")
            - pushd $REPO_DIR/specs
            - export APP_IMG=$(shipctl get_resource_version_key node_app_img_dh sourceName)
            - export APP_TAG=$(shipctl get_resource_version_name node_app_img_dh)
            - shipctl replace taskdefinition.json
            - aws ecs register-task-definition --cli-input-json file://${REPO_DIR}/specs/taskdefinition.json > output.json
            - export REVISION=$(cat output.json | jq '.taskDefinition.revision')
            - export DEPLOYED_SERVICE_NAME=${SERVICE_NAME}
            - shipctl replace servicedefinition.json
            - popd
            - aws ecs create-cluster --cluster-name ${CLUSTER_NAME}
            - ${REPO_DIR}/utilities/replace_deployment_strategy.sh ${CLUSTER_NAME} ${SERVICE_NAME} ${REPO_DIR}
            - source ${REPO_DIR}/utilities/check_service_stability.sh
            - check_service_stability ${CLUSTER_NAME} ${SERVICE_NAME} ${DESIRED_TASK_COUNT} 5
            - retVal=$?
            - if [ $retVal -ne 0 ]; then exit 1; fi
            - PUBLIC_IP=$(${REPO_DIR}/utilities/get_ecs_service_public_ip.sh ${CLUSTER_NAME} ${SERVICE_NAME} ${REPO_DIR})
            - curl ${PUBLIC_IP}
    flags:
      - cd
      - awscli
      - fargate
```

* Adding the above config to the jobs section of shippable.yml will create a `runSh` job called `deploy_app_ecs_fargate_deployment_strategy_replace`.

* The first section of `steps` defines all the input `IN` resources that are required to execute this job.
  * Fargate service and task definition spec files are version controlled in a repo represented by `cd_replace_ecs_fargate_repo`.
  * AWS Credentials are in `cd_replace_ecs_fargate_creds`. This resource has `switch: off` flag which means any changes to it will not trigger this job automatically.
  * `node_app_img_dh` is an **image** resource that comes from another tutorial [which explains how to build and push a Docker image](/ci/tutorial/build-push-image-to-docker-hub) and contains the image name and tag in `sourceName & versionName ` fields, which are required by this job. If you already have this and just want to use this tutorial to deploy, just delete this resource and hardcode the values `APP_IMG` and `APP_TAG` in the **taskdefinition.json** file [here](https://github.com/devops-recipes/cd_replace_ecs_fargate_awscli/blob/master/specs/taskdefinition.json).

* The `TASK` section contains actual code that is executed when the job runs. In this example, we have hardcoded values for subnet and security group IDs for the Fargate service. To learn how to provision these dynamically, look at [Provisioning an AWS VPC using Ansible](/provision/tutorial/provision-aws-vpc-ansible).

We have just one task named `deployment_strategy_replace` which does the following:
  * First, we define environment variables required by the scripts-
    * `CLUSTER_NAME` is the name of the Fargate cluster.
    * `SERVICE_NAME` is the name of the Fargate service.
    * `FAMILY` is the name of the Fargate task definition.
    * `DESIRED_TASK_COUNT` is the number of instances of the task that you want to run in the cluster.
    * `CPU` represents the amount of CPU units needed by the task.
    * `Memory` represents the amount of memory needed by the task.
    * `SUBNET_ID` is the subnet id.
    * `SECURITY_GROUP_ID` is the security group id.
    * `AWS_REGION` is the region of your Fargate cluster.
  * `script` section has a list of commands to execute sequentially.
    * First, we use the Shippable utility function `get_resource_state` to go to the folder where scripts are stored
    * Next, we extract the image info and set APP_IMG and APP_TAG from the `node_app_img_dh` resource, again using shipctl functions
    * Next, we replace all wildcards in taskdefinition.json and servicedefinition.yml files
    * Next, we execute AWS CLI commands to create the task definition.
    * Next, we use a Shippable utility `replace_deployment_strategy.sh` to deploy the image using replace strategy that creates the Fargate service.
    * Next, we validate that the service reached the steady state using a Shippable utility function `check_service_stability`
    * Lastly , extract the public IP of the service using a Shippable utility script `get_ecs_service_public_ip.sh` and run a final curl command to get the HTML content.

Supported task CPU and memory values for Fargate tasks can be found [here](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-cpu-memory-error.html).

Detailed info about `runSh` job is [here](/platform/workflow/job/runsh).

Detailed info about Shippable Utility functions are [here](/platform/tutorial/workflow/using-shipctl).

#####2d. Push changes to shippable.yml

Commit and push all the above changes to **shippable.yml**.

####3. Add the Assembly Line to your Shippable organization

In Shippable's world, a Subscription maps to an Organization or a Team, depending on the source control provider. An Assembly Line workflow is defined at a Subscription level and all jobs are resources are global to your subscription.

To add your Assembly Line to Shippable, you need to add the repository containing the configuration as a "sync repository" by [following instructions here](/platform/tutorial/workflow/add-assembly-line). This automatically parses your **shippable.yml** config and adds your workflow to Shippable. Your workflow will always be kept in sync with the config in this repository, and be automatically updated every time you push a change to **shippable.yml**.

Your view will look something like this:

<img src="/images/tutorial/deploy-replace-aws-fargate-awscli-fig1.png" alt="Assembly Line view">

####4. Run the deploy job `deploy_app_ecs_fargate_deployment_strategy_replace`

You can manually run the job by right clicking on the job or by triggering the CI process to generate a new image tag and deploy that new image to your Fargate cluster. You should see your service in the AWS ECS cluster console.

<img src="/images/tutorial/deploy-replace-aws-fargate-awscli-fig2.png" alt="AWS ECS Deploy console output">

<img src="/images/tutorial/deploy-replace-aws-fargate-awscli-fig3.png" alt="AWS ECS Deploy console output">

<img src="/images/tutorial/deploy-replace-aws-fargate-awscli-fig4.png" alt="AWS ECS Deploy console output">

## Further Reading
* [Provisioning an AWS VPC using Ansible](/provision/tutorial/provision-aws-vpc-ansible).
* [Managing Integrations](/platform/tutorial/integration/subscription-integrations/)
* [Defining Resources in shippable.yml](/platform/workflow/config/#resources)
* [Defining Jobs in shippable.yml](/platform/workflow/config/#jobs)
* [Sharing information between Jobs](/platform/tutorial/workflow/share-info-across-jobs/)
