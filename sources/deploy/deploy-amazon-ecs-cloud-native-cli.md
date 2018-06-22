page_main_title: Using Cloud native CLI to deploy.
main_section: CD
sub_section: Deploying containers using popular tools
sub_sub_section: Amazon ECS
page_title: Deploying to Amazon ECS using cloud-native CLI
page_description: How to deploy to Amazon ECS using cloud-native CLI in Shippable

# Deploying to Amazon ECS using cloud-native CLI

The [deploy job](/platform/workflow/job/deploy) helps make your deployments very easy and quick to configure. However, you might want to write your deployment scripts yourself for added control and customization or simply to bring your existing proven CLI based deployment scripts over to Shippable.  This page walks through an example of using the AWS CLI to deploy a Docker image to one ECS cluster.

## Topics Covered

* Deploying a single container application to an ECS cluster using AWS CLI.

<img src="/images/deploy/usecases/deploy_cli.png"/>

## Configuration

The configuration for this Assembly Line is in the [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file  -

* [Resources](/platform/workflow/resource/overview/) are defined in the `resources` section of the`shippable.yml` file.

* [Jobs](/platform/workflow/job/overview/) are defined in the `jobs` section of the`shippable.yml` file.

## Steps

###1. Define `app_image`.

* **Description:** `app_image` represents your Docker image in your pipeline. In our example, we're using an image hosted on Docker Hub.
* **Required:** Yes.
* **Integrations needed:** any [supported Docker registry](/platform/integration/overview/#supported-docker-registry-integrations).

**Steps**  

1. Create an account integration using your Shippable account for your Docker registry.
    Instructions to create an integration can be found [here](http://docs.shippable.com/platform/tutorial/integration/howto-crud-integration/). Copy the friendly name of the integration.

2. Add the following yml block to your [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file.

```
  resources:
    - name: app_image # resource friendly name
      type: image
      integration: app_docker_hub # friendly name of your integration          
      pointer:
        sourceName: devops/deploy_node_app #this will change based on registry
      seed:
        versionName: "master.1"  #Specify the tag of your image.
```

###2. Define `app_gitRepo`.

* **Description:** `app_gitRepo` is a [gitRepo](/platform/workflow/resource/gitrepo/) resource which is a pointer to the git repository that contains your cli scripts.
* **Required:** Yes.
* **Integrations needed:** default SCM account integration or other source control providers.

By default, you will already have an account integration with whichever SCM provider you've used to log into Shippable. If your CLI repository is on that SCM account, you should use it as is and skip Step 1 below.

If your CLI repository is on another SCM account, create an integration for it by using one of the following supported SCM docs:

- [GitHub](/platform/integration/github/)
- [Bitbucket](/platform/integration/bitbucket/)
- [GitLab](/platform/integration/gitlab/)
- [GitHub Enterprise](/platform/integration/github-enterprise/)

**Steps**  

1. Create an account integration using your SCM. Instructions to create an integration can be found [here](http://docs.shippable.com/platform/tutorial/integration/howto-crud-integration/).

Set the friendly name of the integration as `app_scm`. If you change the name, please change it also in the yml below .

2. Add the following yml block to the existing `resources` section of your [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file.

```
resources:
  - name: app_gitRepo  # resource friendly name
    type: gitRepo
    integration: app_scm  # scm integration
    pointer:
      sourceName: scm_organization/app_repository # org and repository containing code
      branch: master # branch of repository
```

###3. Define `app_cliConfig`.

* **Description:** `app_cliConfig` is a [cliConfig](/platform/workflow/resource/cliconfig/) resource used to store configuration information needed to setup a CLI for your orchestration platform.
* **Required:** Yes.
* **Integrations needed:** AWS. The complete list of supported CLI integrations can be found [here](/platform/workflow/resource/cliconfig/#configured-cli-tools).

**Steps**  

1. Create an account integration using your Shippable account for AWS. Instructions to create an integration can be found [here](http://docs.shippable.com/platform/tutorial/integration/howto-crud-integration/).

Set the friendly name of the integration as `op_int`. If you change the name, please change it also in the yml below .

2. Add the following yml block to the `resources` section of your [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file.

```
resources:
  - name: app_cliConfig   # resource friendly name
    type: cliConfig
    integration: op_int                 # The integration created in step 1
    pointer:
      region: us-east-1                 # region where you want to deploy
```

###4. Create an ECS task Definition.

Create a file called `taskdef.json` in your repository that contains an ECS task definition. For example, your task definition could look like this:

```
{
    "family": "shippable",
    "containerDefinitions": [
        {
            "name": "node-app",
            "image": "${APP_IMAGE_SOURCENAME}/${APP_IMAGE_VERSIONNAME}",

            "portMappings": [
                {
                    "containerPort": 80,
                    "hostPort": 80
                }
            ],
            "memory": 100,
            "essential": true,
            "environment": [
                {
                    "name": "ENVIRONMENT",
                    "value": "cli"
                }
            ]
        }
    ]
}
```

${APP_IMAGE_SOURCENAME} and ${APP_IMAGE_VERSIONNAME} are variables that will get populated later on by their actual values.

###5. Define `app_cli_job`.

* **Description:** `app_cli_job` is a [runSh](/platform/workflow/job/runsh/) job that lets you run any shell script as part of your DevOps Assembly Line. It is one of the most versatile jobs in the arsenal and can be used to pretty much execute any DevOps activity that can be scripted. Note that we have set `switch: off` for `app_gitRepo` since we do not want to trigger the runSh job every time a commit occurs on the repo. We want the runSh job to trigger only after the container image has been built.

* **Required:** Yes.

**Steps**

Add the following yml block to your [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file.

```
jobs:
  - name: app_cli_job
    type: runSh
    steps:
      - IN: app_image
      - IN: app_gitRepo
        switch: off
      - IN: app_cliConfig
      - TASK:
        - script: shippable_replace ${APP_GITREPO_STATE}/taskdef.json
        - script: aws ecs register-task-definition --cli_input-json file://${APP_GITREPO_STATE}/taskdef.json > output.json
        - script: REVISION=$(cat output.json | jq '.taskDefinition.revision')
        - script: echo "revision is $REVISION"
        - script: aws ecs update-service --cluster deploy_ecs_basic --service ${JOB_NAME} --task-definition shippable:${REVISION} --desired-count 1
```

The snippet above does the following:

- Uses `shippable_replace` utility to fill in environment variables for our task definition template.
- Registers a new task definition on Amazon ECS based on our json file using the AWS CLI.
- Captures the revision number from the output, stores it in the ENV, and echos it to the console.
- Updates the service using the `--task-definition family:revision` syntax.

##6. Import the configuration into your Shippable account to create the assembly line for the application.

Once you have the `shippable.yml` file as described above, commit it to your repository. This repository is called a [sync repository](/platform/tutorial/workflow/crud-syncrepo/). You can then follow instructions to [add your assembly line to Shippable](/platform/tutorial/workflow/crud-syncrepo/).

##7. Trigger your pipeline

When you're ready for deployment, right-click on the `app_cli_job` job in the [SPOG View](/platform/visibility/single-pane-of-glass-spog/), and select **Run Job**.

## Sample project

Here are some links to a working sample of this scenario. This is a simple Node.js application that runs some tests and then pushes
the image to Amazon ECR. It also contains all of the pipelines configuration files for deploying to Amazon ECS via runSh job.

**Source code:**  [devops-recipes/deploy-ecs-unmanaged](https://github.com/devops-recipes/deploy-ecs-unmanaged)
