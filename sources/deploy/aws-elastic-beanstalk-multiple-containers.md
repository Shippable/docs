page_main_title: Deploying multi-container environments
main_section: Deploy
sub_section: Deploy using Cloud Native CLI
sub_sub_section: AWS Elastic Beanstalk
page_title: Deploy multiple containers to a single EB environment
page_description: How to deploy multiple containers to a single EB environment in Shippable

# Deploy multiple containers to a single EB environment.

The [deploy job](/platform/workflow/job/deploy) helps make your deployments very easy and quick to configure. However, you might want to write your deployment scripts yourself for added control and customization or simply to bring your existing proven CLI based deployment scripts over to Shippable.  This page walks through an example of using the Elastic Beanstalk (EB) CLI to  deploy a multiple container application to your EB environment.

## Topics Covered

* Deploying a multiple container application to an EB environments using EB CLI.

## Devops Assembly pipeline

This is a pictorial representation of the workflow required to deploy your application. The green boxes are jobs and the grey boxes are the input resources for the jobs. Both jobs and inputs are specified in Shippable configuration files.

<img src="/images/deploy/elasticbeanstalk/ebs_multi_container.png" alt="Final Pipeline">

We will be defining the jobs and resources in a step by step manner below.

## Configuration

They are three configuration files that are needed to achieve this usecase -

* **[shippable.yml](/platform/tutorial/workflow/shippable-yml/):** [Resources](/platform/workflow/resource/overview/) and [jobs](/platform/workflow/job/overview/) are defined in this file.

* **`Dockerrun.aws.json`**: This file specifies the image and environment configuration. Placeholders are defined in this file for the image and environment configuration. These placeholders give us flexibility to use the image and environment configuration that you will define in Shippable configuration files.

Content of [`Dockerrun.aws.json`](https://raw.githubusercontent.com/devops-recipes/deploy-beanstalk-basic/master/multi_container/Dockerrun.aws.json)
```
{
  "AWSEBDockerrunVersion": 2,
  "containerDefinitions": [
    {
      "name": "application",
      "image": "${IMAGE}",
      "environment": [
        {
          "name": "ENVIRONMENT",
          "value": "${ENVIRONMENT}"
        }
      ],
      "essential": true,
      "memory": 128
    },
    {
      "name": "nginx-proxy",
      "image": "${DEPLOYEBNGINXIMAGE_SOURCENAME}:${DEPLOYEBNGINXIMAGE_VERSIONNAME}",
      "essential": true,
      "memory": 128,
      "portMappings": [
        {
          "hostPort": 80,
          "containerPort": 80
        }
      ],
      "links": [
        "application"
      ]
    }
  ]
}
```

* **`config.yml`**:

In your source code, alongside the `Dockerrun.aws.json` file, create a `.elasticbeanstalk` directory and create a `config.yml` file inside it. In our sample, we have a `multi_container` folder that contains our `Dockerrun.aws.json` for this example. The file tree looks like this:
```
multi_container/
├── Dockerrun.aws.json
└── .elasticbeanstalk
    └── config.yml

1 directory, 2 files
```

Content of [config.yml](https://raw.githubusercontent.com/devops-recipes/deploy-beanstalk-basic/master/multi_container/.elasticbeanstalk/config.yml)
```
branch-defaults:
  default:
    environment: ${AWS_EB_ENVIRONMENT_MULTI}
environment-defaults:
  ${AWS_EB_ENVIRONMENT_MULTI}:
    branch: null
    repository: null
global:
  application_name: ${AWS_EB_APPLICATION}
  default_ec2_keyname: null
  default_platform: null
  default_region: ${DEPLOYEBBASICCONFIG_POINTER_REGION}
  instance_profile: null
  platform_name: null
  platform_version: null
  profile: null
  sc: null
  workspace_type: Application
```

Inside `config.yml`, you will see placeholders defined for application, environment, and region. These placeholders will be replaced dynamically with your Shippable configuration giving you tremendous flexibility and reuse.

## Prerequisites

### Create a Beanstalk application and environment

If you've already got an environment ready to go, you can skip this section. Select "sample application" while creating the environment, because we'll be updating it with our own image pretty soon anyway. It'll take a few minutes to start.

<img src="../../images/deploy/elasticbeanstalk/create-a-web-app.png" alt="create a new beanstalk app">
<img src="../../images/deploy/elasticbeanstalk/creating-app.png" alt="waiting to create application">

Once the creation is done, you should see this:
<img src="../../images/deploy/elasticbeanstalk/completed-creation.png" alt="application created">

## Steps

###1. Define `deploy-eb-basic-image` and `deploy-eb-nginx-image`.

* **Description:** `deploy-eb-basic-image` and `deploy-eb-nginx-image` represent the Docker images of our sample application. In our example, these images hosted on Amazon ECR.
* **Required:** Yes.

2. Add the following yml block to your [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file.

```
resources:

  - name: deploy-eb-basic-image
    type: image
    pointer:
      sourceName: "679404489841.dkr.ecr.us-east-1.amazonaws.com/nodeapp"
    seed:
      versionName: "latest"

  - name: deploy-eb-nginx-image
    type: image
    integration: dr-ecr
    pointer:
      sourceName: "679404489841.dkr.ecr.us-east-1.amazonaws.com/nginx"
    seed:
      versionName: "1.12.0"
```


###2. Define `deploy-eb-basic-config`.

* **Description:** `deploy-eb-basic-config` is a [cliConfig](/platform/workflow/resource/cliconfig/) resource that references credentials needed to setup a CLI for EB.

* **Required:** Yes.

* **Integrations needed:** [Amazon ECR](/platform/integration/aws-keys).

    The integration defines the AWS key/secret pair that Shippable platform will use to communicate with EB on our behalf. Make sure that the key has appropriate permissions for the different actions required for EB deployments.

**Steps**  

1. Create an account integration using your Shippable account for Amazon ECR.
    Instructions to create an integration can be found [here](http://docs.shippable.com/platform/tutorial/integration/howto-crud-integration/). Copy the friendly name of the integration.

2. Add the following yml block to the existing `resources` section in your [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file.

```
resources:
  - name: deploy-eb-basic-config
    type: cliConfig
    integration: dr-aws           # The integration created above
    pointer:
      region: us-east-1           # region where you want to deploy
```

###3. Define `deploy-eb-basic-params`

* **Description:** `deploy-eb-basic-params` is a [params](/platform/workflow/resource/params/) resource that defines variables we want to make easily configurable. These variables are used to replace the placeholders in the `Dockerrun.aws.json` and `config.yml` files.

* **Required:** Yes.

**Steps**

Add the following yml block to the existing `resources` section in your [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file.

```
resources:
  - name: deploy-eb-basic-params
    type: params
    version:
      params:
        ENVIRONMENT: "sample" # used inside our sample image
        PORT: 80  # tells app which port to listen to
        AWS_EB_ENVIRONMENT_MULTI: "Sample-env-1" # for the multi-container example
        AWS_EB_APPLICATION: "deploy-eb-basic" # the name you gave your eb application
```

###4. Define `deploy-eb-basic-repo`

* **Description:** `deploy-eb-basic-repo` is a [gitRepo](/platform/workflow/resource/gitrepo/) resource which represents our application repository that has all the source and the configuration files we created earlier. We need this resource to access and replace content dynamically in the `Dockerrun.aws.json` and `config.yml` files.  

* **Required:** Yes.

**Steps**

Add the following yml block to the `resources` section in your [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file.

```
resources:
  - name: deploy-eb-basic-repo
    type: gitRepo
    integration: dr-github
    pointer:
      sourceName: devops-recipes/deploy-beanstalk-basic
      branch: master
```

###5. Define `deploy-eb-basic-deploy`

* **Description:** `deploy-eb-basic-deploy` is a [runSh](/platform/workflow/job/runsh/) job that lets you run any shell script as part of your DevOps Assembly Line. It is one of the most versatile jobs in the arsenal and can be used to pretty much execute any DevOps activity that can be scripted.

    We're going to use the eb CLI to perform the deployment, since it comes pre-installed on the build image, and it takes care of a lot of the work for us.  Since we've manually added the config.yml, and our aws cli is already configured with our credentials, all we have to do is execute `eb deploy` (-v for verbose mode). This will package and deploy our code automatically based on the settings in our `config.yml`.

    Our job does following:

    - Utilize the built-in `shippable_replace` utility on the `Dockerrun.aws.json` file as well as the `config.yml` file to replace placeholders with the actual configuration.
    - Export the `IMAGE` env variable using the image resource environment variable.
    - Make sure all inputs have `switch: off` except the image resources. We only want to deploy when the image changes.

* **Required:** Yes.

**Steps**

Add the following yml block to your [shippable.yml](/platform/tutorial/workflow/shippable-yml/) file.


```
jobs:
  - name: deploy-eb-basic-deploy
    type: runSh
    steps:
      - IN: deploy-eb-basic-image
      - IN: deploy-eb-nginx-image
        switch: off
      - IN: deploy-eb-basic-config
        switch: off
      - IN: deploy-eb-env-params
        switch: off
      - IN: deploy-eb-basic-repo
        switch: off
      - TASK:
        - script: aws elasticbeanstalk describe-applications
        - script: pushd $DEPLOYEBBASICREPO_STATE/multi_container && ls -al
        - script: export IMAGE="${DEPLOYEBBASICIMAGE_SOURCENAME}:${DEPLOYEBBASICIMAGE_VERSIONNAME}"
        - script: shippable_replace Dockerrun.aws.json .elasticbeanstalk/config.yml
        - script: eb deploy -v
```

##6. Import configuration into your Shippable account.

Once you have the `shippable.yml` file as described above, commit it to your repository. This repository is called a [sync repository](/platform/tutorial/workflow/crud-syncrepo/). You can then follow instructions to [add your assembly line to Shippable](/platform/tutorial/workflow/crud-syncrepo/).

##7. Trigger your pipeline

When you're ready for deployment, right-click on the `deploy-eb-basic-deploy` job in the [SPOG View](/platform/visibility/single-pane-of-glass-spog/), and select **Run Job**.

<img src="/images/deploy/elasticbeanstalk/multi-running-on-ecs.png" alt="Multi Container Beanstalk on ECS">

## Sample project

Here are some links to a working sample of this scenario. This is a simple Node.js application that runs some tests and then pushes the image to Amazon ECR. It also contains all of the pipelines configuration files for deploying to Elastic Beanstalk.

**Source code:**  [devops-recipes/deploy-beanstalk-basic](https://github.com/devops-recipes/deploy-beanstalk-basic).
